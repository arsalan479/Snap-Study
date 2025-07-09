import React, { useState } from "react";
import snaplogo from "../../assets/WebsiteLogo/snapstudylogo.png";
import Navbar from "./Navbar";
import MainQuizCardFile from "../../UserScreensPage/QuizCardSystem/MainQuizCardFile";

const SideBar2 = () => {
  const [activeLink, setActiveLink] = useState("Quiz Generate");

  // Sidebar navigation items
  const navItems = ["Quiz Generate", "Images", "Videos", "Top", "Likes"];

  const libraryItems = [
    "My media",
    "Favorites",
    "Uploads",
    "Trash",
    "New folder",
  ];

  return (
    <div className="flex justify-center">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#000] text-white flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <div className="w-10 h-10">
            <img
              src={snaplogo}
              className="h-full w-full object-cover"
              alt="Logo"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-10">
          {/* Main links */}
          <div>
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => setActiveLink(item)}
                className="py-1 px-3 text-white hover:bg-[var(--bg2)] font-semibold tracking-tight rounded-[10px] cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Library */}
          <div className="mt-8">
            <h3 className="text-gray-400 text-[1.6vw] tracking-tight font-semibold mb-3 px-3">
              Library
            </h3>
            <div>
              {libraryItems.map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveLink(item)}
                  className="py-1 px-3 text-white hover:bg-[var(--bg2)] font-semibold rounded-[10px] tracking-tight cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full overflow-auto h-screen">
        <div className="bg-green-500 fixed top-0 w-full flex justify-start px-5 items-center h-16">
          <h1 className="text-lg font-semibold mr-4">{activeLink}</h1>
          <Navbar />
        </div>

        <div className="mt-30 flex justify-center  ">
          <div>
            <MainQuizCardFile />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloremque beatae dignissimos iure recusandae commodi cum maxime
              aliquam ea officia tempora esse doloribus eveniet est non sapiente
              quia illo consequuntur facere quisquam aperiam, modi rerum ipsum
              magnam. Modi laudantium, magni delectus quidem provident incidunt,
              alias temporibus a reprehenderit dolor sunt quae odio nesciunt
              officia aliquam distinctio doloribus deserunt, harum perferendis
              labore architecto! Beatae, eveniet laborum, eos dicta sint dolore
              quo dignissimos possimus expedita exercitationem ut illo
              perferendis, aperiam animi impedit tempora quisquam. Aspernatur
              officia optio iusto? Eveniet fugiat dolore debitis. Numquam enim
              assumenda molestiae pariatur temporibus animi, veniam sequi
              quisquam non.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar2;
