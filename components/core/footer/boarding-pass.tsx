import React, { useEffect, useState } from 'react';
import { classNames } from 'lib/utils';

type FooterProps = {
  hideCTA?: boolean;
};

export const BoardingPass = ({ hideCTA = false }: FooterProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [nearestAirport, setNearestAirport] = useState<{
    name: string;
    city: string;
    country: string;
  }>({
    name: 'WTF',
    city: 'What the f***',
    country: 'WTF',
  });

  useEffect(() => {
    const getTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setCurrentTime(formattedTime);
    };
    getTime();

    const getUserLocationFromIP = async () => {
      try {
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;
        const response = await fetch(`https://backend.june.so/public/airports?ip=${ipAddress}`);
        const data: {
          name: string;
          city: string;
          country: string;
        } = await response.json();

        setNearestAirport(data);
      } catch (error) {
        setNearestAirport({
          name: 'WTF',
          city: 'What the f***',
          country: 'WTF',
        });
      }
    };
    getUserLocationFromIP();
  }, []);

  return (
    <div
      className={classNames(
        'relative w-[345px] overflow-hidden h-[580px] lg:h-[346px] lg:w-[1012px] xl:w-[1192px] p-6 lg:p-16 text-white rounded-[20px] bg-[#6868F7] shadow-[0_0_1px_0_rgba(13,19,27,0.25),0_2px_1px_0_rgba(13,19,27,0.05)]',
        hideCTA ? 'hidden' : undefined,
      )}
    >
      <div className="flex flex-col ">
        <div className="font-black text-[24px] leading-[32px] lg:text-[40px] lg:leading-[50px]">
          <h2>Let's meet for 30 mins</h2>
        </div>
        <div className="text-[18px] tracking-[-0.015em] font-bold leading-[28px] w-[290px] lg:w-[480px] mt-2 lg:mt-4">
          <p>
            We're here to help you provide an exceptional experience to your customers.
          </p>
        </div>
        <a
          className="cursor-pointer relative flex items-center pl-[40px] h-16 w-[223px] shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.20)] overflow-hidden rounded-[20px] text-[#6868F7] mt-6 lg:mt-8 bg-white text-[20px] leading-[24px] font-semibold hover:scale-110 ease-in-out duration-300"
          href={`https://cal.com/alberto-incisa/demo`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div>Book a demo</div>
          <img className="absolute top-[12px] right-[18px]" src="/footer/right-arrow.svg" alt="Arrow-secondary" />
        </a>
        <div className="absolute hidden lg:block top-0 lg:-right-40 xl:right-0">
          <img src="/footer/onboarding-cloud.svg" alt="Cloud" />
        </div>
        <div className="absolute bottom-0 right-0 lg:hidden">
          <div className="flex gap-4 items-center justify-center bg-white rounded-tl-lg">
            <div className="flex items-center justify-center bg-[#FFA340] p-2 h-full rounded-tl-lg">
              <img src="/footer/ticket-barcode.svg" alt="Barcode" />
            </div>
            <div className="flex flex-col px-4">
              <div className="flex gap-6">
                <div className="font-hero text-3xl font-black text-primary">{nearestAirport.name}</div>
                <img src="/footer/plane.svg" alt="Plane" />
                <div className="font-hero text-3xl font-black text-primary">OMG</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex flex-col items-center pt-2 border-t-[1px] border-gray-200">
                  <span className="text-gray-400">FROM</span>
                  <span className="font-bold text-primary">{nearestAirport.city}</span>
                </div>
                <div className="flex flex-col items-center pt-2 border-t-[1px] border-gray-200">
                  <span className="text-gray-400">TO</span>
                  <span className="font-bold text-primary">"Oh my God!"</span>
                </div>
                <div className="flex flex-col items-center pt-2 border-t-[1px] border-gray-200">
                  <span className="text-gray-400">DEPARTURE</span>
                  <span className="font-bold text-primary">{currentTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden absolute shadow-[0_2px_10px_0_rgba(13,19,27,0.1),0_0_2px_0_rgba(13,19,27,0.2)] bg-white h-[306px] lg:w-[400px] xl:w-[497px] bottom-0 right-0 lg:block rounded-tl-[12px] overflow-hidden">
          <div className="flex">
            <div className="w-[77px] h-[306px] bg-[#FFA340] flex items-center justify-center">
              <img src="/footer/ticket-barcode.svg" alt="Barcode" />
            </div>
            <div className="relative flex flex-col w-full font-hero font-black text-primary p-[24px] pb-[13px]">
              <div className="text-[40px] leading-[50px] flex w-full justify-between">
                <div>{nearestAirport.name}</div>
                <img className="absolute left-[143px] top-[29px] " src="/footer/plane.svg" alt="Plane" />
                <div className="absolute left-[213px]">OMG</div>

                <div className="relative items-center justify-center hidden xl:flex">
                  <img className="relative" src="/footer/logo-background.svg" alt="Background" />
                  <img className="absolute" src="/footer/june-logo-white.svg" alt="customer analytics software" />
                </div>
              </div>
              <div className="mt-[32px] text-[12px] leading-[14.32px] text-gray-400 flex w-full">
                <div>FROM</div>
                <div className="absolute left-[213px]">TO</div>
              </div>
              <div className="mt-[12px] flex text-[18px] leading-[28px] font-bold h-[60px] w-full items-center border-t-[1px] border-gray-200">
                <div className="w-[162px] h-full flex items-center">{nearestAirport.city}</div>

                <div className="absolute flex items-center left-[189px] border-l-[1px] border-gray-200 h-[60px] pl-[24px]">
                  "Oh my God!"
                </div>
              </div>
              <div className="mt-[16px] text-[12px] leading-[14.32px] text-gray-400 flex w-full">
                <div>DEPARTURE</div>
                <div className="absolute left-[213px]">FLIGHT TIME</div>
              </div>
              <div className="mt-[12px] flex text-[18px] leading-[28px] font-bold h-[60px] w-full items-center border-t-[1px] border-gray-200">
                <div className="w-[162px] h-full flex items-center">{currentTime}</div>
                <div className="absolute flex items-center left-[189px] border-l-[1px] border-gray-200 h-[60px] pl-[24px]">
                  30 mins
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
