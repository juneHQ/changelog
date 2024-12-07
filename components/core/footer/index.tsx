import React, { useState } from 'react';
import Link from 'next/link';
import { classNames } from 'lib/utils';
import { motion } from 'framer-motion';
import { BoardingPass } from 'components/core/footer/boarding-pass';

type FooterProps = {
  hideCTA?: boolean;
  className?: string;
};

export const Footer = ({ hideCTA = false, className = '' }: FooterProps) => {
  const [openEasterEgg, setOpenEasterEgg] = useState(false);


  return (
    <div className="z-50 w-full max-w-full overflow-x-hidden overflow-y-hidden">
      <div className={classNames('flex flex-col items-center mt-[64px] lg:mt-40 font-hero', className)}>
        <div className="flex flex-col items-center">
        <BoardingPass hideCTA={hideCTA} />
      </div>
      <div className="w-full bg-gradient-to-t from-[#8AE7FD]">
        <div className="m-auto lg:px-8 flex flex-col relative h-[848px] lg:h-[691px] w-[345px] lg:w-full items-center font-normal text-primary text-[24px] lg:text-[32px] leading-[42px]">
          <div className="flex gap-x-[98px] mt-60 lg:relative ">
            <a
              className="absolute lg:relative left-0 top-[181.2px] lg:left-auto lg:top-auto hover:underline"
              href={'https://www.june.so/blog'}
            >
              Blog
            </a>
            <a
              className="absolute lg:relative left-[190px] top-[180px] lg:left-auto lg:top-auto hover:underline"
              href={'https://www.june.so/docs'}
            >
              Docs
            </a>
            <a
              className="absolute lg:relative left-[6px] top-[530px] lg:left-auto lg:top-auto hover:underline"
              href={'https://www.june.so/integration/attio'}
              target="_blank"
              rel="noreferrer"
            >
              Attio integration
            </a>
            <a
              className="absolute lg:relative left-[106px] top-[334px] lg:left-auto lg:top-auto hover:underline"
              href="https://help.june.so/en/articles/6823521-privacy-policy"
            >
              Privacy
            </a>
            <a
              className="absolute lg:relative left-[61px] top-[246px] lg:left-auto lg:top-auto hover:underline"
              href={'https://www.june.so/security'}
            >
              Security
            </a>
          </div>
          <div className="flex gap-x-[176px] mt-10 lg:relative ">
            <a
              className="absolute lg:relative left-[130px] top-[464px] lg:left-auto lg:top-auto hover:underline"
              href={'https://www.june.so/integration/hubspot'}
              target="_blank"
              rel="noreferrer"
            >
              HubSpot integration
            </a>
            <a
              className="absolute lg:relative left-[189.27px] top-[268px] lg:left-auto lg:top-auto hover:underline"
              href={'https://www.june.so/benchmarks'}
            >
              Benchmarks
            </a>
            <a
              className="absolute lg:relative left-0 top-[401px] lg:left-auto lg:top-auto hover:underline"
              href={'https://www.june.so/integration/salesforce'}
              target="_blank"
              rel="noreferrer"
            >
              Salesforce integration
            </a>
            <a
              className="absolute lg:relative left-0 top-[312px] lg:left-auto lg:top-auto hover:underline"
              href="https://help.june.so/en/articles/6823511-terms-of-service"
            >
              Terms
            </a>
          </div>
          <div className="hidden lg:absolute w-[859px] h-[530px] left-[-24px] bottom-[-6px] pointer-events-none lg:left-[-405px] lg:bottom-[-174px] transform lg:scale-x-[-1]">
            <img src="/footer/heavy-cloud.svg" alt="Cloud" />
          </div>
          <div className="hidden lg:block right-[-429px] bottom-[-165px] pointer-events-none">
            <img src="/footer/heavy-cloud.svg" alt="Cloud" />
          </div>
          <div
            id="backed-by"
            className={`hidden ${openEasterEgg ? '' : 'lg:block'} absolute bottom-[90px] left-[280px] z-20`}
          >
            <img src="/footer/backed-by.svg" alt="Backed-by" />
          </div>
          <div className="lg:absolute flex flex-col lg:flex-row justify-between bottom-[64px] w-full lg:px-[80px] items-center">
            <div className="hidden lg:flex lg:visible lg:relative bottom-[312.58px] lg:bottom-auto gap-x-[40px] left-[12px] lg:left-auto lg:gap-x-[62px] items-center">
              <div className="cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-[16px]">
                <img src="/footer/june.svg" alt="June" />
              </div>
              <div
                className={`cursor-pointer relative overflow-visible transition duration-300 ease-in-out transform ${
                  openEasterEgg ? '' : 'hover:-translate-y-[16px]'
                }`}
                onClick={() => setOpenEasterEgg(!openEasterEgg)}
              >
                <motion.img
                  animate={
                    !openEasterEgg
                      ? {
                          y: [0, -6, -6, 0, 0, 0, 0, 0, 0 - 16, -16, -16, -16, -16, -16, 0, 0, 0, 0],
                          rotate: [
                            0, 0, 0, 0, 0, 0, 0, 0, -2, 3, -3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, -3, 4, -5, 4, -3, 4, -4, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute bottom-[23.1px] left-[8.92px]"
                  src="/footer/michael-seibel.svg"
                  alt="Michael"
                />
                <a href={'https://www.youtube.com/watch?v=q-qfrNYPOkA'} target="_blank" rel="noreferrer noopener">
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: openEasterEgg ? 1 : 0,
                    }}
                    transition={{ duration: 1 }}
                    style={{ rotate: '4deg' }}
                    className={`absolute ${
                      openEasterEgg ? '' : 'pointer-events-none'
                    } flex justify-center items-center z-20 bottom-[34.06px] -left-[74.55px] w-[358px] h-[483px] object-cover`}
                  >
                    <img src="/footer/easter-egg.svg" alt="Y" className="absolute pointer-events-none" />
                    <div className="mb-[82.22px] relative flex justify-center items-center h-16 w-[64px] shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.20)] overflow-hidden rounded-full text-primary bg-white hover:scale-105 transition">
                      <img className="w-12 h-12" src="/play-icon.svg" alt="Arrow-secondary" />
                    </div>
                  </motion.div>
                </a>
                <img className="relative bottom-0 left-0 z-30" src="/footer/y.svg" alt="Y" />
              </div>
            </div>
            <div className="flex absolute lg:relative bottom-[140.98px] lg:bottom-auto gap-x-[16px] lg:gap-x-[38px] items-center">
              <a
                href="https://twitter.com/JuneDotSo"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition mr-[16px] lg:mr-0 duration-300 ease-in-out transform hover:-translate-y-[16px]"
              >
                <img src="/footer/x.svg" alt="X" />
              </a>
              <a
                href="https://www.linkedin.com/company/juneso"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-[16px]"
              >
                <img src="/footer/linkedin.svg" alt="linkedin" />
              </a>
              <Link href="https://www.june.so/security" passHref>
                <a className="cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-[16px]">
                  <img src="/footer/aicpa.svg" alt="Aicpa" />
                </a>
              </Link>
              <Link href="https://www.june.so/security" passHref>
                <a className="cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-[16px]">
                  <img src="/footer/lock.svg" alt="Lock" />
                </a>
              </Link>
            </div>
          </div>
          <div className="absolute w-[859px] h-[530px] left-[-184px] bottom-[-246px] lg:left-[-405px] lg:bottom-[-294px]  transform lg:scale-x-[-1] pointer-events-none">
            <img className="object-contain" src="/footer/heavy-cloud.svg" alt="Cloud" />
          </div>
          <div className="hidden lg:block absolute right-[-429px] bottom-[-285px] pointer-events-none">
            <img src="/footer/heavy-cloud.svg" alt="Cloud" />
          </div>
          <div className="hidden lg:block pointer-events-none absolute right-[-89px] bottom-[-295px]">
            <img src="/footer/heavy-cloud.svg" alt="Cloud" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
