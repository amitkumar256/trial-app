import React, { useState } from "react";

const SuperSimpleThree = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="h-[3000px] ">
      {/* <div className="bg-black inset-0 fixed"> */}
      {/* <h1>scroll screen</h1> */}
      {/* <div className="bg-black right-5 bottom-5 fixed text-white">
        Bottom right
      </div> */}
      {/* 14 d */}
      {/* <div className="bg-green-500 text-white right-0 top-0 bottom-0 w-[100px] fixed">
        right sidebar
      </div>
      <div className="bg-[#000000cc] fixed inset-0 flex justify-center items-center">
        <div className="bg-white w-[300px] px-4 py-4 rounded-[5px]">
          <div className="mb-3">
            <h1>Modal Title</h1>
          </div>
          <div className="mb-3">
            <h3>This is a modal</h3>
          </div>
          <button className="bg-slate-100 border-blue-500 border-2">
            close
          </button>
        </div>
      </div> */}

      {/* 14 e */}
      {/* <div className="h-20 px-20 fixed top-0 bg-slate-200 mx-auto inset-x-0 flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <div className="bg-red-300 h-14 w-14 rounded-full "></div>
          <h1>Oliver Cat</h1>
        </div>
        <div className="flex space-x-5 ">
          <button className="bg-blue-500 text-white rounded-[5px] h-10 w-20">
            Add Friend
          </button>
          <button className="bg-slate-100 text-black rounded-[5px] h-10 w-20">
            Message
          </button>
        </div>
      </div> */}

      {/* 14 f */}
      <div className="bg-gray-900 text-white left-0 top-0 bottom-0 w-[100px] fixed pt-9 flex flex-col items-center space-y-7">
        <div className="bg-red-300 h-14 w-14 rounded-full "></div>
        <div className="bg-blue-300 h-14 w-14 rounded-full "></div>
        <div className="bg-yellow-300 h-14 w-14 rounded-full "></div>
      </div>
      <div className="bg-gray-700 text-white left-[100px] top-0 bottom-0 w-[300px] pt-9 fixed px-4">
        <div className="flex justify-between">
          <div className="pb-6">
            <h1>Info</h1>
          </div>
          <div>
            <h1>+</h1>
          </div>
        </div>
        <div className="pb-6">
          <h1># new - videos</h1>
        </div>
        <div className="pb-6">
          <h1># updates</h1>
        </div>
        <div className="">
          <h1># Faq</h1>
        </div>
      </div>
      {/* <div
        className="relative bg-red-400 rounded-full w-20 h-20"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {isHovered && (
          <div className="absolute bottom-[-50px]">
            <button className="bg-black text-white">absolute</button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default SuperSimpleThree;
