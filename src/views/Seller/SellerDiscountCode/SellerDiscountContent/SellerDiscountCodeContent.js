import * as React from "react";
import Paper from "@mui/material/Paper";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SellerDiscountTable from "./SellerDiscountTable/SellerDiscountTable";
import CreateNewButton from "./SellerDiscountTable/Buttons/CreateNewButton";
import { fetchAllDiscountCodes } from "~/api/discountCodeAPI";

const columns = [
  { id: "id", label: "ID", minWidth: 50, align: "center" },
  {
    id: "discount_code",
    label: "Discount Code",
    align: "start",
    minWidth: 100,
  },
  {
    id: "discount_type",
    label: "Discount Type",
    minWidth: 100,
    align: "center",
  },
  {
    id: "discount_amount",
    label: "Discount Amount",
    minWidth: 100,
    align: "center",
  },
  {
    id: "expires",
    label: "Expires",
    align: "center",
    minWidth: 50,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

function createData(id,discount_code_id, discount_code, discount_type, discount_amount, expires) {
  return { id,discount_code_id, discount_code, discount_type, discount_amount, expires };
}
export default function SellerDiscountCodeContent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const refreshData = async () => {
    try {
      const discountCodes = await fetchAllDiscountCodes();
      const formattedRows = discountCodes.map((code, index) =>
        createData(
          index + 1,
          code._id,
          code.discount_code,
          code.discount_type,
          `${code.discount_type === 'percentage' ? `${code.discount_value}%` : `$${code.discount_value}`}`,
          new Date(code.end_date).toLocaleDateString()
        )
      );
      setRows(formattedRows);
    } catch (error) {
      console.error("Error fetching discount codes:", error);
    }
  };

  // Get all data discount code
  React.useEffect(() => {
    refreshData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter(row =>
    row.discount_code.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOnSubmit = () => {
    if (!searchValue) {
      toast.error("Please enter discount name to search!");
      return;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <Paper
        className="SellerMenuContent"
        sx={{ width: "90%", overflow: "hidden", boxShadow: 3 }}
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
              placeholder="Search by discount name!"
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
            <CreateNewButton refreshData={refreshData} />
          </Box>
        </Box>

        {/* Table */}
        <SellerDiscountTable
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filteredRows={filteredRows}
          refreshData={refreshData}
        />
      </Paper>
    </div>
  );
}




