import React, { useEffect, useState } from "react";
import { axiosinstance } from "../AxiosInstance/axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import toast from "react-hot-toast";

// Custom ProgressBar Component
const ProgressBar = ({ label, value, total, color }) => {
  const percent = total > 0 ? (value / total) * 100 : 0;
  return (
    <Box sx={{ my: 2, p: 5, bgcolor: "#1F1F1F", borderRadius: 2 }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        color="white"
      >
        {label}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#333", // progress track ka color
          "& .MuiLinearProgress-bar": {
            backgroundColor: color, // progress bar ka color
          },
        }}
      />
      <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
        {value} / {total} Users
      </Typography>
    </Box>
  );
};

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UsersData = () => {
  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    const response = async () => {
      try {
        const response = await axiosinstance.get("/admin/alluserdata");
        if (response.status === 200) {
          setuserdata(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, []);

  const userdelete = async (userId) => {
    try {
      const res = await toast.promise(
        axiosinstance.delete(`/admin/userdelete/${userId}`),
        {
          loading: "user deleting...",
          success: "user delete successfully",
        }
      );
      if (res.status === 200) {
        setuserdata((prev) => prev.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Counts
  const totalUsers = userdata.length;
  const githubUsers = userdata.filter(
    (u) => u?.authMethods?.github?.verified
  ).length;
  const googleUsers = userdata.filter(
    (u) => u?.authMethods?.google?.verified
  ).length;
  const emailUsers = userdata.filter(
    (u) => u?.authMethods?.googleuserbyemail?.verified
  ).length;

  return (
    <>
      {/* Stats Section */}
      <Box className="flex flex-col items-center justify-center gap-8 mb-10 w-full">
        <Typography variant="h4" fontWeight="bold" className="text-white">
          <span>
            <i className="text-[var(--primary)] ri-group-line"></i>
          </span>{" "}
          User Login Statistics
        </Typography>
        <div className="flex items-center justify-center gap-10 flex-wrap">
          <div className="min-w-[250px]">
            <ProgressBar
              label={
                <span>
                  <i className="ri-github-line text-[var(--primary)]"></i>{" "}
                  GitHub Users
                </span>
              }
              value={githubUsers}
              total={totalUsers}
              color="#fff"
            />
          </div>
          <div className="min-w-[250px]">
            <ProgressBar
              label={
                <span>
                  <i className="ri-google-line text-[var(--primary)] "></i>{" "}
                  Google Users
                </span>
              }
              value={googleUsers}
              total={totalUsers}
              color="#fff"
            />
          </div>
          <div className="min-w-[250px]">
            <ProgressBar
              label={
                <span>
                  <i className="ri-mail-line text-[var(--primary)]"></i> Email
                  Login Users
                </span>
              }
              value={emailUsers}
              total={totalUsers}
              color="#fff"
            />
          </div>
        </div>
      </Box>

      {/* Users Table */}
     <TableContainer component={Paper} className="p-5">
  <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell>Email</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        <StyledTableCell>Plans</StyledTableCell>
        <StyledTableCell>Credits</StyledTableCell>
        <StyledTableCell>Created At</StyledTableCell>
        <StyledTableCell>Action</StyledTableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {userdata.length === 0 ? (
        <TableRow>
          <TableCell sx={{color:"#99A19F",fontSize:25}} colSpan={7} align="center">
           <span><i className="text-[var(--primary)] ri-bubble-chart-line"></i></span> No record found
          </TableCell>
        </TableRow>
      ) : (
        userdata.map((row) => (
          <StyledTableRow key={row._id}>
            <StyledTableCell>{row.displayName}</StyledTableCell>
            <StyledTableCell>{row.email}</StyledTableCell>
            <StyledTableCell>{row.status}</StyledTableCell>
            <StyledTableCell>{row.Plans}</StyledTableCell>
            <StyledTableCell>{row.credits}</StyledTableCell>
            <StyledTableCell>
              {new Date(row.createdAt).toLocaleDateString()}
            </StyledTableCell>
            <StyledTableCell>
              <button
                onClick={() => userdelete(row._id)}
                className="bg-red-500 px-6 py-3 rounded-md cursor-pointer text-white"
              >
                Delete
              </button>
            </StyledTableCell>
          </StyledTableRow>
        ))
      )}
    </TableBody>
  </Table>
</TableContainer>

    </>
  );
};

export default UsersData;
