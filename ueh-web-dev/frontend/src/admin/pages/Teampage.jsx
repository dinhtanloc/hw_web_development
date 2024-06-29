import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import useAxios from "../../client/utils/useAxios";

const Teampage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isStaff = useAxios() 
  const [staffList, Makestafflist] = useState([]);



    useEffect(() => {
      fetchStafflist();
    }, []);


  const fetchStafflist = async () => {
    try {
        const response = await isStaff.get('accounts/admin/staff-list/');
        // setUserProfile(response.data);
        // checkStaff(response.data.is_staff)
        Makestafflist(response.data)
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex:1,
    },
    {
      field: "full_name",
      headerName: "Full name",
      flex:1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "is_superuser",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { is_superuser } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              is_superuser
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {is_superuser ? (
              <AdminPanelSettingsOutlinedIcon />
            ) : (
              <SecurityOutlinedIcon />
            )}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {is_superuser ? "Admin" : "Staff"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // const columnNames = columns.map(column => column.field);
    
  //     // Lọc mockDataContacts để chỉ giữ lại các keys có trong columnNames
  //     const filteredStaffData = staffList.map(contact =>
  //       Object.keys(contact).reduce((acc, key) => {
  //         if (columnNames.includes(key)) {
  //           acc[key] = contact[key];
  //         }
  //         return acc;
  //       }, {})
  //     );

    const formatStaffData = staffList.map((staff) => ({
      ...staff,
      full_name: staff.profile?.full_name || "",
      address: staff.profile?.address || "",
      job: staff.profile?.job || "",
    }));

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={formatStaffData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Teampage;
