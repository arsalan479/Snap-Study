import React from "react";
import { Link } from "react-router-dom";

const Plans = () => {

  return (
    <div className="h-full  text-white py-10  px-4 flex flex-col items-center space-y-8 overflow-hidden">
      <h1 className="text-3xl font-bold text-center">Start Free Grow Limitlessly</h1>
      <p className="text-gray-400 text-center max-w-xl">
        You're currently on the{" "}
        <span className="font-semibold text-white">SnapStudy Free</span> plan.
        Upgrade options will be available soon to unlock more powerful features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">

        {/* Free Plan */}
        <div className="bg-[#1f1f1f] border border-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <i className="ri-leaf-line text-[#5227FF] text-xl"></i> SnapStudy Free
          </h2>
          <p className="text-gray-300 mb-4">Enjoy core features at no cost.</p>
          <ul className="text-sm list-none space-y-2 text-gray-400 mb-6">
            <li><i className="ri-checkbox-circle-line text-white mr-2"></i> Access to daily quizzes</li>
            <li><i className="ri-checkbox-circle-line text-white mr-2"></i> Basic competition mode</li>
            <li><i className="ri-checkbox-circle-line text-white mr-2"></i> Limited history tracking</li>
          </ul>
          <Link to={"/home"}>
          <span className="inline-block px-4 cursor-pointer py-2 bg-white  text-black text-sm rounded-full ">
            Free  of Cost <span><i className="ri-arrow-right-up-long-line"></i></span>
          </span>
          </Link>
        </div>

        {/* Plus Plan */}
        <div className="bg-gradient-to-br from-[#1c1c1c] to-[#000000] rounded-2xl p-6 shadow-lg opacity-70 relative pointer-events-none">
          
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <i className="ri-rocket-line text-[#5227FF] text-xl"></i> SnapStudy Plus
          </h2>
          <p className="text-gray-400 mb-4">Unlock advanced features & analytics.</p>
          <ul className="text-sm list-none space-y-2 text-gray-500 mb-6">
            <li><i className="ri-lock-2-line mr-2"></i> Advanced performance insights</li>
            <li><i className="ri-lock-2-line mr-2"></i> Unlimited quiz attempts</li>
            <li><i className="ri-lock-2-line mr-2"></i> Custom room creation</li>
            <li><i className="ri-lock-2-line mr-2"></i> Priority support</li>
          </ul>
          <span className="inline-block px-4 py-2 bg-[#5227FF]  text-white  text-sm rounded-full">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default Plans;
