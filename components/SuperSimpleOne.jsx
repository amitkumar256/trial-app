import React from "react";

const SuperSimpleOne = () => {
  return (
    <div className="max-w-[1208px] mx-auto px-4 xl:px-0 ">
      {/* lesson 12 */}
      <div className="flex ">
        <div className="bg-pink-200 w-[200px]">200px</div>
        <div className="bg-blue-200 w-[75px]">75px</div>
      </div>
      <div className="flex mt-10">
        <div className="bg-blue-200 w-[50px]">item1</div>
        <div className="bg-pink-200 flex flex-grow">item2</div>
        <div className="bg-blue-200 w-[75px]">item3</div>
      </div>
      <div className="flex mt-10 justify-between">
        <div className="bg-pink-200 w-[75px]">item1</div>
        <div className="bg-pink-200 w-[75px]">item2</div>
        <div className="bg-pink-200 w-[75px]">item3</div>
        <div className="bg-pink-200 w-[75px]">item3</div>
      </div>
      <div className="mt-10 flex h-[50px] justify-between border-gray-400 border-2 items-center ">
        <div className="bg-pink-200 w-[75px]">item1</div>
        <div className="bg-blue-200 w-[75px]">item2</div>
      </div>

      {/* 12e */}
      <div className="mt-10 w-[500px] h-[150px] rounded-[10px] border-gray-400 border-2 px-4 space-y-5 flex flex-col justify-center  ">
        <div className="flex justify-between items-center">
          <div>
            <h2>Home</h2>
          </div>
          <div className="bg-blue-400 text-white rounded-xl w-10 text-center ">
            14
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h2>Notifications</h2>
          </div>
          <div className="bg-blue-400 text-white rounded-xl w-7 text-center ">
            3
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h2>Messages</h2>
          </div>
          <div className="bg-blue-400 text-white rounded-xl w-7 text-center ">
            5
          </div>
        </div>
      </div>
      {/* lesson 12f */}
      <div className="mt-10 h-14 bg-blue-600  flex justify-between items-center px-4">
        <div className="text-white">
          <h1>Home</h1>
        </div>
        <div className=" w-3/5 ">
          <input
            type="text"
            placeholder="search"
            className="focus:outline-none w-full  px-8 rounded-3xl h-10 "
          />
        </div>
        <div className=" flex items-center justify-center text-white h-10 border-white border-2 w-[100px]">
          <button className="">Download</button>
        </div>
      </div>
      {/* lesson 12g */}
      <div className="mt-10 bg-slate-100 w-[500px] px-4 py-4 flex flex-col mb-10 justify-center space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-red-300 h-14 w-14 rounded-full "></div>
            <div>
              <h1 className="font-bold">Oliver</h1>
              <p>the cat</p>
              <p>popular</p>
            </div>
          </div>
          <button className="rounded-[10px] text-white h-10 bg-blue-400 border-2 w-[100px]">
            Follow
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-red-300 h-14 w-14 rounded-full "></div>
            <div>
              <h1 className="font-bold">Mimi</h1>
              <p>the cat</p>
              <p>popular</p>
            </div>
          </div>
          <button className="rounded-[10px] text-white h-10 bg-blue-400 border-2 w-[100px]">
            Follow
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-red-300 h-14 w-14 rounded-full "></div>
            <div>
              <h1 className="font-bold">Rex</h1>
              <p>the cat</p>
              <p>popular</p>
            </div>
          </div>

          <button className="rounded-[10px] text-white h-10 bg-blue-400 border-2 w-[100px]">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperSimpleOne;
