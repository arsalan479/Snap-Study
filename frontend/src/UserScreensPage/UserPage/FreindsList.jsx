import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { axiosinstance } from "../../AxiosInstance/axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
  const [alluser, setalluser] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    const friends = async () => {
      try {
        const response = await axiosinstance.get("/api/room/fetchuser");
        setalluser(response.data.users);
      } catch (error) {
        console.log("freind error", error);
      }
    };
    friends();
  }, []);

  const usersearch = async () => {
  try {
      const response = await axiosinstance.get("/api/room/friendsearch", {
      params: {displayName:search},
    });
    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error)
  }
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          name="search"
          id=""
          onChange={(e) => setsearch(e.target.value)}
          className="border border-white w-full px-4 py-3 rounded-2xl"
          placeholder="Enter User Name"
        />
        <button onClick={usersearch} className="bg-blue-500 px-3 py-3 rounded-full">Search</button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Profile Picture</TableCell>
              <TableCell align="right">UserName</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Request</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alluser.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={user.avatar}
                    className="w-10 rounded-full h-10"
                    alt=""
                  />
                </TableCell>
                <TableCell align="right">{user.displayName}</TableCell>
                <TableCell align="right">
                  <h1
                    className={
                      user.status === "online"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    <i className="ri-circle-fill mr-1 text-[1.2vw]"></i>
                    {user.status}
                  </h1>
                </TableCell>
                <TableCell align="right">
                  <button className="bg-red-500 px-3 py-3 rounded-full">
                    Send Request
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
