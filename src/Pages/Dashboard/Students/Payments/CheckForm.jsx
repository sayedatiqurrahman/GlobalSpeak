import React, { useEffect, useState } from 'react';
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useSelectedData from '../../../../Hooks/useSelectedData';
import useToast from '../../../../Hooks/useToast';
import useAuth from '../../../../Hooks/useAuth';
const CheckForm = () => {
    const stripe = useStripe();
    const { user } = useAuth()
    const [processing, setProcessing] = useState(false)
    const [transaction, setTransiction] = useState('')
    const [Toast] = useToast()
    const [clientSecret, setClientSecret] = useState()
    const [axiosSecure] = useAxiosSecure()
    const [cart] = useSelectedData()
    const element = useElements()

    
    const totalPrice = cart?.reduce((sum, item) => item.price + sum, 0);
    if (totalPrice <= 0) {
        Toast.fire({
            icon: 'error',
            title: "Make sure you have selected your course"
        })
    }
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret)

                })
        }

    }, [totalPrice, cart])
    console.log(clientSecret);

    // const items = {
    //     selUpID: _id, bookedClass, foreignLanguageName, price, languageImage, teacherName, StudentEmail
    // }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !element) return;

        const card = element.getElement(CardElement)
        if (card === null) return;

        setProcessing(true)
        // Use your card Element with other Stripe.js APIs
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setProcessing(false)
            Toast.fire({
                icon: 'error',
                title: error.message
            })
        } else {
            setTransiction('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Unknown',
                        name: user?.displayName || 'Anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            Toast.fire({
                icon: 'error',
                title: confirmError.message
            }
            )
            setProcessing(false)
        }
        if (paymentIntent.status === 'succeeded') {
            setTransiction(paymentIntent.id)

            const payment = {
                email: user?.email,
                name: user?.displayName,
                transictionId: paymentIntent.id,
                price: totalPrice,
                status: 'Enrolled',
                quantity: cart.length,
                BookedId: cart.map(bookedID => bookedID.bookedClass),
                LanguageNames: cart.map(bookedItem => bookedItem?.foreignLanguageName)
            }
            console.log(payment);
            axiosSecure.post('/payment', payment).then(res => {
                if (res.data.insertedId) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Payment successful'
                    })
                    axiosSecure.patch('/availableSeat')

                }

            })
            setProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full md:w-[60%] mx-auto'>
            <CardElement className='bg-base-100 p-5 rounded-2xl shadow-2xl'
                options={{
                    style: {
                        base: {
                            fontSize: '18px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='text-center'>

                <button type="submit" className='btn  border-2 border-[#f55400] text-[#f55400] mt-3 px-10 hover:bg-[#f55400] shadow-inherit hover:text-white' disabled={!stripe || !element}>
                    Pay
                </button>
            </div>
            {/* Show error message to your customers */}
            {
                transaction && <p className='mt-10 text-green-800'>Transiction is Successfully Done ,Transiction ID: <span className='text-[#835D23]'>{transaction}</span></p>
            }
        </form>
    );
};

export default CheckForm;