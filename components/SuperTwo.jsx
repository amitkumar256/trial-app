import React from "react";

const SuperTwo = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="mt-10 flex h-16">
        <div className="w-[100px] bg-blue-300 flex justify-center items-center">
          <div className="bg-black text-white">item1</div>
        </div>
        <div className="w-[200px] bg-pink-300"></div>
      </div>

      <div className="mt-10 flex h-16">
        <div className="w-[100px] bg-blue-300 "></div>
        <div className="w-[200px] bg-pink-300">
          <div>row1</div>
          <div className="flex justify-between">
            <h2 className="bg-black text-white">row2</h2>
            <h2 className="bg-black text-white">row2</h2>
          </div>
        </div>
      </div>
      <div className=" mt-10 px-4 pt-2 w-[500px] h-[450px] rounded-[10px] bg-slate-50 border-gray-400 border-2">
        <div>All inboxes</div>
        <div className="flex flex-col  justify-center pt-10">
          <div className="flex items-center  pb-10 ">
            <div className="bg-red-300 h-14 w-14 rounded-full "></div>
            <div className="content pl-2  flex-1 ">
              <div className="flex justify-between ">
                <div>Chewy Promotions</div>
                <div>4:58 pm</div>
              </div>
              <div>Biggest sales of the year!</div>
              <div>hey there! we are writing here to tell us about..</div>
            </div>
          </div>

          <div className="flex items-center pb-10 ">
            <div className="bg-red-300 h-14 w-14 rounded-full "></div>
            <div className="content pl-2  flex-1 ">
              <div className="flex justify-between ">
                <div>Chewy Promotions</div>
                <div>4:58 pm</div>
              </div>
              <div>Biggest sales of the year!</div>
              <div>hey there! we are writing here to tell us about..</div>
            </div>
          </div>

          <div className="flex items-center  ">
            <div className="bg-red-300 h-14 w-14 rounded-full "></div>
            <div className="content pl-2  flex-1 ">
              <div className="flex justify-between ">
                <div>Chewy Promotions</div>
                <div>4:58 pm</div>
              </div>
              <div>Biggest sales of the year!</div>
              <div>hey there! we are writing here to tell us about..</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperTwo;
