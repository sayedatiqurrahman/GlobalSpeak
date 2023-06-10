// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// Lottie
import Lottie from "lottie-react";
import languageLearning from '../../../../public/classroom.json'
import LanguageLearningAnimation from '../../../../public/language.json'
import TrAnimation from '../../../../public/translator.json'

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper';
import Button from '../../../Components/Button';
import SliderText from '../../../Components/SliderText';

const Banner = () => {

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,

                }}
                loop={true}

                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}

                className="MyContainer h-full w-full text-sm bg-[#eeeeee11]"
            >
                <SwiperSlide>
                    <div className='flex  flex-col-reverse md:flex-row items-center justify center md:mt-10  '>
                        <div className='flex flex-col items-center md:items-start  max-w-md w-[90%] mx-auto'>
                            <SliderText title={'Study Languages Having Fun! '} subTitle={`We Have The International Reputation for Hign  Quality Teaching And Success`} />

                            <Button>Click Here</Button>

                        </div>
                        <div>
                            <div className="h-[500px] w-full">
                                {/* Language lerning animation */}
                                <Lottie className='h-full w-full' animationData={LanguageLearningAnimation} loop={true} />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className='md:mt-10  flex flex-col-reverse md:flex-row items-center justify-center '>
                        <div className='flex flex-col items-center md:items-start  max-w-md w-[90%] mx-auto'>
                            <SliderText title={'We Are Trusted Institution ! '} subTitle={`We Offer Programs Designed to Meet the Needs of Individuals from All Around the World`} />

                            <Button>Click Here</Button>

                        </div>
                        <div>
                            <div className="h-[500px] w-full">
                                {/* Language learning animation */}
                                <Lottie className='h-full w-full ' animationData={TrAnimation} loop={true} />
                                <div className='border-b-2 border-gray-600 w-full -mt-[6px]  hidden xl:block'></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className='md:mt-10  flex flex-col-reverse md:flex-row justify-center items-center '>
                        <div className='flex flex-col items-center md:items-start  max-w-md w-[90%] mx-auto'>
                            <SliderText title={'Classes Now Forming!'} subTitle={`Our Courses Are Taught at Beginner to Advanced Lavels on a Uear Round Basis`} />

                            <Button>Click Here</Button>

                        </div>
                        <div>
                            <div className="h-[500px] w-full">
                                {/* Language learning animation */}
                                <Lottie className='h-full w-full' animationData={languageLearning} loop={true} />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;