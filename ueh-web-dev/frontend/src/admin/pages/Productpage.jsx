import { useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../assets/data/mockData";
import Header from "./Header";
import { useTheme } from "@mui/material";
import useAxios from "../../client/utils/useAxios";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const productList = useAxios()

  useEffect(() => {
    fetchproductList();
  }, []);

  const fetchproductList = async () => {
      try {
          const response = await productList.get('categories/admin/products/');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
          console.log('meomeo')
          console.log(response)
          
          // console.log(checkedStaff)
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };
  // const fetchStafflist = async () => {
  //     try {
  //         const response = await isStaff.get('accounts/staff-list/');
  //         // setUserProfile(response.data);
  //         // checkStaff(response.data.is_staff)
          
  //         console.log(response)
  //     } catch (error) {
  //         console.error('Error fetching user profile:', error);
  //     }
  // };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
