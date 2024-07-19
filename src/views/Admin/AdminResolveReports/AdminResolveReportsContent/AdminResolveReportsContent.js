import * as React from "react";
import Paper from "@mui/material/Paper";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import TableSeller from '~/components/Seller/TableSeller';

const columns = [
  { id: "id", label: "ID", minWidth: 50, align: "center" },
  {
    id: "report_title",
    label: "Report",
    align: "center",
    minWidth: 100,
  },
  {
    id: "date_init",
    label: "Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "user_name",
    label: "Username",
    minWidth: 100,
    align: "center",
  },
  {
    id: "user_email",
    label: "Email",
    minWidth: 50,
    align: "center",
  },
  {
    id: "report_status",
    label: "Status",
    minWidth: 50,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

function createData(id, report_title, date_init, user_name, user_email, report_status) {
  return { id, report_title, date_init, user_name, user_email, report_status};
}

const initialRows = [
  createData(1, "Rob", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(2, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "resolved"),
  createData(3, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "unresolved"),
  createData(4, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(5, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(6, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(7, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(8, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(9, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(10, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(11, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending"),
  createData(12, "Shop like s***", "01/01/2024", "Văn Hải", "hai123@.com.anipen", "pending")
];

export default function AdminResolveReportsContent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [rows, setRows] = React.useState(initialRows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter(row =>
    row.report_title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOnSubmit = () => {
    if (!searchValue) {
      toast.error("Please enter report to search!");
      return;
    }
  };

  const onDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    console.log(`Deleted row with id: ${id}`);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <Paper
        className="SellerMenuContent"
        sx={{ width: "70vw", overflow: "hidden", boxShadow: 3 }}
      >
        {/* Search in table and create new  */}
        <Box
          sx={{
            width: "100%",
            padding: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Search by report name!"
              variant="outlined"
              size="small"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              sx={{
                "& label": { color: "#015E44" },
                "& input": { color: "#015E44" },
                "& label.Mui-focused": { color: "#015E44" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#015E44" },
                  "&:hover fieldset": { borderColor: "#015E44" },
                  "&.Mui-focused fieldset": { borderColor: "#015E44" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon
                      fontSize="medium"
                      sx={{
                        color: searchValue ? "#015E44" : "transparent",
                        cursor: "pointer",
                        mr: "4px",
                      }}
                      onClick={() => setSearchValue("")}
                    />

                    <SearchIcon
                      fontSize="medium"
                      sx={{ color: "#015E44", cursor: "pointer" }}
                      onClick={handleOnSubmit}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Button
              size="large"
              variant="outlined"
              sx={{
                color: "#015E44",
                borderColor: "#015E44",
                borderWidth: 1,
                "&:hover": {
                  borderColor: "#015E44",
                },
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "bolder" }}>
                Create New
              </Typography>
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableSeller
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filteredRows={filteredRows}
          onDelete={onDelete}
        />
      </Paper>
    </div>
  );
}




