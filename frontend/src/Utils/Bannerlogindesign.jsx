import React from 'react';
import CurvedLoop from '../../ReactBits/CurvedLoop/CurvedLoop.jsx';

const Bannerlogindesign = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white">
      <div className="flex flex-col text-black justify-center items-center w-full h-full ">
        <h1 className="text-6xl lg:text-8xl tracking-tight">
          SnapStudy
          <span>
            <i className="text-2xl ri-circle-fill"></i>
          </span>
        </h1>
          <p className="tracking-tight pt-5 text-center p-6">
          Join thousands of learners on SnapStudy and unlock powerful tools
          designed to help you study smarter. Sign up now to access
          personalized resources, save your progress, and collaborate with
          peers all in one place. Start your learning journey with SnapStudy
          and reach your academic goals faster.
        </p>
        <CurvedLoop 
          marqueeText="Be ✦ Creative ✦ With ✦ Snap ✦ Study ✦"
          speed={4}
          curveAmount={500}
          direction="left"
          interactive={true}
          className="custom-text-style"
        />
      </div>
    </div>
  );
};

export default Bannerlogindesign;
