import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  useGetAdminCountQuery,
  useGetBankCountQuery,
  useGetCountManagerQuery,
  useGetRequestQuery,
  useGetUserCountQuery,
  useGetallUserCountQuery,
  useGetUserQuery,
} from "state/apiSpring";
import PersonIcon from "@mui/icons-material/Person";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: adminCount, isLoading1 } = useGetAdminCountQuery();
  const { data: userCount, isLoading2 } = useGetUserCountQuery();
  const { data: managerCount, isLoading3 } = useGetCountManagerQuery();
  const { data: bankCount, isLoading4 } = useGetBankCountQuery();
  const { data, isLoading } = useGetUserQuery();
  console.log("🚀 ~ Dashboard ~ bankcount:", bankCount);
  console.log("🚀 ~ Dashboard ~ data:", data);

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
      headerName: "account Locked",
      flex: 1,
    },
    {
      field: "enabled",
      headerName: "enabled",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total client"
          value={userCount}
          increase=""
          description="users"
          icon={
            <PersonIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total admin"
          value={adminCount}
          increase=""
          description=" admins"
          icon={
            <AdminPanelSettingsOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="total banks"
          value={bankCount}
          increase=""
          description="banks"
          icon={
            <AccountBalanceIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="total managers"
          value={managerCount}
          increase=""
          description="managers"
          icon={
            <AdminPanelSettingsIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            User by Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            this chart represent how mush user we have by role
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
