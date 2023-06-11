import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import Rating from 'react-rating'
// import required modules
import { Pagination } from "swiper";
import { FaStar } from "react-icons/fa";
import SectionTItle from "../../../Components/SectionTItle";

const Testimonial = () => {
    const [testData, setTestData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/testimonials').then(res => res.json()).then(data => setTestData(data))
    }, [])
    const ratings = 5.00
    return (
        <>

            <div className="mt-52 mb-28">
                <SectionTItle title={'Testimonials'} subTitle={'Voices of Success: Inspiring'} />
            </div>
            <Swiper

                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    }
                }}
                modules={[Pagination]}
                className="mySwiper shadow-2xl border-x-2  border-[#f55400]"
            >
                {
                    testData.map(test => <SwiperSlide key={test._id}
                        className="bg-gray-200 shadow-2xl border-2 border-[#f55400] py-3 px-2 rounded-lg "
                    >
                        <div className="h-32 w-32">
                            <img className="h-full w-full rounded-full border-2 border-[#f55400]" src={test.image} alt="" />
                        </div>

                        <h1 className="text-xl mt-4 font-semibold fontB">{test.name}</h1>
                        <p className="">{test.testimonial}</p>

                        <Rating className="text-yellow-500"
                            placeholderRating={ratings}
                            emptySymbol={<FaStar />}
                            placeholderSymbol={<FaStar />}
                            readonly
                            fullSymbol={<FaStar />}
                        />
                    </SwiperSlide>)
                }

            </Swiper>
        </>
    );
};

export default Testimonial;