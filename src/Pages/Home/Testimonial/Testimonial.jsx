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
import Fade from 'react-reveal/Fade';

const Testimonial = () => {
    const [testData, setTestData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/testimonials').then(res => res.json()).then(data => setTestData(data))
    }, [])
    const ratings = 5.00
    return (
        <>

            <div className="mt-52 mb-28">
                <Fade up>

                    <SectionTItle title={'Testimonials'} subTitle={'Voices of Success: Inspiring'} />
                </Fade>
            </div>
            <Fade down>
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
                    className="mySwiper shadow-2xl md:border-x-2  border-[#f55400]"
                >
                    {
                        testData.map(test => <SwiperSlide style={{ height: '350px' }} key={test._id}
                            className="bg-gray-200 shadow-2xl border-2 border-[#f55400] py-3 px-2 rounded-lg group h-[300px]"
                        >
                            <div className="h-32 w-32 rounded-full relative overflow-hidden border-2 border-[#f55400]">
                                <img className="h-full transition-all duration-200 w-full rounded-full  group-hover:scale-150" src={test.image} alt="" />
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
            </Fade>
        </>
    );
};

export default Testimonial;