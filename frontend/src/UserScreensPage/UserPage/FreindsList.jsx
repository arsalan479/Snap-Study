import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";


const FreindsList = () => {
  const [alluser, setalluser] = useState([]);

  useEffect(() => {
    const userfetch = async () => {
      try {
        const response = await axiosinstance.get("/api/room/fetchuser");
        if (response.status === 200) {
          setalluser(response.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userfetch();
  }, []);

  return (
    <div>
      {alluser.map((user) => (
        <div>
          <img src={user.avatar} className="w-14 h-14 rounded-full" alt="" />
          <div key={user._id}>
            <h1>{user.displayName}</h1>

            <h1 className={user.status === "online" ? "text-green-500" : "text-red-500"}>
                {user.status}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreindsList;
