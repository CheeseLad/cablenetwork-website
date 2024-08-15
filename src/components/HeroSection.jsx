import React from 'react';
import Slider from 'react-slick';
import background from '../assets/background.jpg';

const HeroSection = () => {
  // Settings for the main background slideshow
  const backgroundSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  // Settings for the screenshot slideshow
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
    <div className="relative py-10 overflow-hidden">
      {/* Background Slideshow */}
      <Slider {...backgroundSliderSettings} className="absolute top-0 left-0 w-full h-full">
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: `url(${background})` }}></div>
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: `url(${background})` }}></div>
        <div className="bg-cover bg-center h-full" style={{ backgroundImage: `url(${background})` }}></div>
      </Slider>

      {/* Centered Content */}
      <div className="flex justify-center items-center h-full relative z-10">
        <div className="flex w-full max-w-6xl px-4 py-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
          {/* Info on the Left */}
          <div className="w-1/2 pr-8">
            <h1 className="text-4xl font-bold mb-4">Cable Network</h1>
            <h2 className="text-2xl font-semibold mb-4">An Unturned Creative Roleplay Experience Like No Other!</h2>
            <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel dui in lorem convallis mattis vel ut diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce laoreet nisi eu maximus molestie. Praesent malesuada felis ac ante finibus, ac pretium nibh finibus. Donec viverra lorem sit amet pretium fringilla.
            </p>
          </div>
          
          {/* Screenshot Slideshow on the Right */}
          <div className="w-1/2">
            <Slider {...screenshotSliderSettings}>
              <div className="p-2">
                <img src={background} alt="Screenshot 1" className="w-full rounded-lg shadow-md"/>
              </div>
              <div className="p-2">
                <img src={background} alt="Screenshot 2" className="w-full rounded-lg shadow-md"/>
              </div>
              <div className="p-2">
                <img src={background} alt="Screenshot 3" className="w-full rounded-lg shadow-md"/>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
