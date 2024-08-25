import React from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Lock, LockOpen, ResetTv } from "@mui/icons-material";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import { useGetAdminQuery } from "state/apiSpring";
import httpClient from "utils/apiMethods";
import { toast } from "react-toastify";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetAdminQuery();
  console.log("🚀 ~ Admin ~ data:", data);

  const handleEnableAccount = async (id) => {
    // Implement your enable account logic here
    console.log(`Enabling account for ID: ${id}`);
    try {
      const response = await httpClient.get(
        `api/v1/auth/activate-admin?id=${id}`
      );
      toast.success("account added successfully");
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.businessErrorDescription);
      toast.error(error.response?.data?.businessErrorDescription);
    }
    refetch();
  };

  const handleLockAccount = (id) => {
    // Implement your lock account logic here
    console.log(`Locking account for ID: ${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Role",
      flex: 0.5,
      valueGetter: (params) => params.row.roles[0]?.name,
    },
    {
      field: "accountLocked",
      headerName: "Account Locked",
      flex: 1,
    },
    {
      field: "enabled",
      headerName: "Enabled",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<LockOpen />}
          label="Enable Account"
          onClick={() => handleEnableAccount(params.id)}
        />,
        <GridActionsCellItem
          icon={<Lock />}
          label="Lock Account"
          onClick={() => handleLockAccount(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
