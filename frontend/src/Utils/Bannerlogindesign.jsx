import React from "react";
import CurvedLoop from "../../ReactBits/CurvedLoop/CurvedLoop.jsx";
import TextType from "../../ReactBits/TextType/TextType.jsx";

const Bannerlogindesign = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white">
      <div className="flex flex-col text-black justify-center items-center w-full h-full ">
        <h1 className="text-6xl lg:text-8xl tracking-tight">
          <TextType
            text={["SnapStudy"]}
            typingSpeed={70}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter={
              <span>
                <i className="text-lg ri-circle-fill"></i>
              </span>
            }
          />
        </h1>
        <p className="tracking-tight pt-5 text-center p-6">
          Join thousands of learners on SnapStudy and unlock powerful tools
          designed to help you study smarter.
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
