import React from 'react';
import Slider from 'react-slick';
import background1 from '../assets/background1.jpg';
import background2 from '../assets/background2.jpg';
import background3 from '../assets/background3.png';

const HeroSection = () => {
  const backgroundSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const screenshotSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="relative pb-10 pt-20 overflow-hidden bg-gradient-to-r from-green-400 to-green-500">
      <Slider {...backgroundSliderSettings} className="absolute top-0 left-0 w-full h-full">
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: `url(${background1})` }}></div>
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: `url(${background2})` }}></div>
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: `url(${background3})` }}></div>
      </Slider>

      <div className="flex justify-center items-center h-full relative z-10 ">
        <div className="flex w-full max-w-6xl px-4 py-8 bg-white rounded-lg shadow-lg">
          <div className="w-1/2 pr-8">
            <h1 className="text-4xl font-bold mb-4">Cable Creative Roleplay</h1>
            <h2 className="text-2xl font-semibold mb-4">An Unturned Creative Roleplay Experience Like No Other!</h2>
            <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui in lorem convallis mattis vel ut diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce laoreet nisi eu maximus molestie. Praesent malesuada felis ac ante finibus, ac pretium nibh finibus. Donec viverra lorem sit amet pretium fringilla.
            </p>
          </div>
          
          <div className="w-1/2">
            <Slider {...screenshotSliderSettings}>
              <div className="p-2">
                <img src={background1} alt="Screenshot 1" className="w-full rounded-lg shadow-md"/>
              </div>
              <div className="p-2">
                <img src={background2} alt="Screenshot 2" className="w-full rounded-lg shadow-md"/>
              </div>
              <div className="p-2">
                <img src={background3} alt="Screenshot 3" className="w-full rounded-lg shadow-md"/>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
