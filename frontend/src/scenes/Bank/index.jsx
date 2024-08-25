import React, { useState } from "react";
import { Box, IconButton, useTheme, Avatar, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetBankQuery } from "state/apiSpring";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Refresh } from "@mui/icons-material";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const Bank = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowDelete, setSelectedRowDelete] = useState(null);
  const { data, isLoading, refetch } = useGetBankQuery();
  const handleOpen = (content) => {
    setModalContent(content);
    setSelectedRow(content);
    setOpen(true);
  };
  const handleOpenDelete = (content) => {
    setModalContent(content);
    setSelectedRowDelete(content);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    refetch();
    setOpenDelete(false);
  };
  console.log(data);
  const handelOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    refetch();
    setOpenAdd(false);
  };
  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image Bank",
      flex: 0.25,
      renderCell: (params) => {
        console.log(params.value);
        const newPath = params.value.replace("../frontend/public/", "/");
        return (
          <Avatar
            src={newPath}
            alt="Bank Image"
            sx={{ width: 40, height: 40, borderRadius: "10px" }}
          />
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.25,
    },

    {
      field: "nom",
      headerName: "Name",
      flex: 0.25,
    },
    {
      field: "contactEmail",
      headerName: "contact Email",
      flex: 0.25,
    },
    {
      field: "contactPhone",
      headerName: "contact phone",
      flex: 0.25,
    },

    {
      field: "gouvernorat",
      headerName: "# of gouvernorat",
      flex: 0.25,
      sortable: false,
    },

    {
      field: "agents",
      headerName: "Agent Names",
      flex: 0.5,
      renderCell: (params) => {
        // Concatenate all agent names, separated by a comma
        const agentNames = params.value
          .map((agent) => `${agent.firstname} ${agent.lastname}`)
          .join(", ");
        return <div>{agentNames || "No Agents"}</div>;
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Banks" subtitle="Entire list of banks" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => handelOpenAdd()}
        >
          add new Bank
        </Button>
      </Box>
      <Box
        height="80vh"
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
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
      <AddModal open={openAdd} handleClose={handleCloseAdd} />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        row={selectedRowDelete}
      />
      <UpdateModal open={open} handleClose={handleClose} row={selectedRow} />
    </Box>
  );
};

export default Bank;
