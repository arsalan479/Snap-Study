import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import Button from 'react-bootstrap/Button';

const Navbar = ({ isSidebarOpen }) => {
  const [user, setuser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosinstance.get("/auth/userfetch");
        if (response.status === 200) {
          setuser(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <header
      className={`fixed top-0 ${
        isSidebarOpen ? "left-50" : "left-0"
      } right-0 bg-[var(--background)] h-16 flex items-center justify-end px-6 text-white z-10 transition-all duration-300`}
    >
      {/* <div className="w-10 h-10">
  <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="avatar" />
</div> */}

         <Button variant="primary" >Primary</Button>

   
      
    </header>
  );
};

export default Navbar;
