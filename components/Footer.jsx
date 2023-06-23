import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="md:px-8 px-4 lg:px-4 xl:px-0 bg-gradient-to-tr from-[#66D3E1] to-[#FDFF96]">
        <div className="hidden md:block ">
          <div className="max-w-[1212px] mx-auto h-[200px]  flex justify-between items-center">
            <div>
              <h1 className="text-[50px] text-white">LOGO</h1>
            </div>
            <div className="flex gap-x-8">
              <div>
                <p className="text-[14px] font-bold text-white">
                  PRIVACY POLICY
                </p>
              </div>

              <div>
                <p className="text-[14px] font-bold text-white">
                  TERMS AND CONDITIONS
                </p>
              </div>
            </div>
            <div className="flex flex-col pt-7 ">
              <div className="flex flex-col gap-y-4 ">
                <div className="text-[14px] text-white font-bold">
                  <p>CONTACT US </p>
                </div>
                <div className=" text-[16px] text-white leading-[154%]">
                  <p> amit@ranchigmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className=" flex flex-col h-full items-center">
            <div className="pt-9">
              <h1 className="text-[50px] ">LOGO</h1>
            </div>
            <div className=" pt-8 font-bold">
              <p>PRIVACY POLICY</p>
            </div>
            <div className=" pt-[30px] font-bold">
              <p>TERMS AND CONDITIONS</p>
            </div>
            <div className=" pt-[30px] font-bold">
              <p>CONTACT US </p>
            </div>
            <div className=" pt-2 pb-2">
              <p> amit@ranchigmail.com </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
