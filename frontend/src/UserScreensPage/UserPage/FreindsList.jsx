import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { axiosinstance } from "../../AxiosInstance/axios.js";
import toast from "react-hot-toast";
import { useContext } from "react";
import { FlashContext } from "../../Context/FlashCardsContext";

export default function BasicTable() {
  const { userfetch } = useContext(FlashContext);
  const {setreceiveId} = useContext(FlashContext)

  const [alluser, setAllUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosinstance.get("/api/room/fetchuser");
        
        setAllUser(response.data.users || []);

        setFilteredUsers(response.data.users || []);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch users");
        setAllUser([]);
        setFilteredUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search.trim()) {
        setFilteredUsers(alluser);
        return;
      }

      // First try client-side filtering for instant results
      const clientFiltered = alluser.filter((user) =>
        user.displayName.toLowerCase().includes(search.toLowerCase())
      );

      if (clientFiltered.length > 0) {
        setFilteredUsers(clientFiltered);
      } else {
        // If no local results, try API search
        performSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, alluser]);

  const performSearch = async () => {
    if (!search.trim()) return;

    try {
      setIsLoading(true);
      const response = await axiosinstance.get("/api/room/friendsearch", {
        params: { displayName: search },
      });

      if (response.data?.users) {
        setFilteredUsers(response.data.users);
      } else {
        setFilteredUsers([]);
        toast.error("No users found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error.response?.data?.message || "Search failed");
      setFilteredUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const sendrequest = async (receiveId) => {
    try {
     
      const userIdcurrent = userfetch._id

      const response = await axiosinstance.post("/api/room/sendrequest", {
        senderId: userIdcurrent,
        receiverId: receiveId,
      });
      setreceiveId(receiveId)

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-center gap-2">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchChange}
          className="border border-white w-full px-4 py-2 rounded-2xl"
          placeholder="Enter User Name"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Profile Picture</TableCell>
                <TableCell align="right">UserName</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Add Friend</TableCell>
                <TableCell align="right">Send Request</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
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
                      <button className="bg-blue-500 cursor-pointer px-3 py-3 rounded-full">
                        Add Friend
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => sendrequest(user._id)}
                        className="bg-red-500 cursor-pointer px-3 py-3 rounded-full"
                      >
                        Send Request
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    {search.trim()
                      ? "No matching users found"
                      : "No users available"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
