import * as React from "react";
import Paper from "@mui/material/Paper";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SellerMenuTable from "./SellerMenuTable/SellerMenuTable";

import CreateNewButton from "./SellerMenuTable/Buttons/CreateNewButton";

import { fetchAllRecipes } from "~/api/recipeAPI";

const columns = [
  { id: "id", label: "ID", minWidth: 50, align: "center" },
  {
    id: "title",
    label: "Dish Name",
    align: "start",
    minWidth: 100,
  },
  {
    id: "serving_number",
    label: "Servings",
    align: "center",
    minWidth: 50,
  },
  {
    id: "total_time",
    label: "Time",
    minWidth: 50,
    align: "center",
  },
  {
    id: "process_material",
    label: "Process Material",
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

function createData(id,recipe_id, title, serving_number, total_time, process_material) {
  return { id,recipe_id, title, serving_number, total_time, process_material };
}

export default function SellerMenuContent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const refreshData = async () => {
    try {
      const recipes = await fetchAllRecipes();
      const formattedRows = recipes.map((recipe, index) =>
        createData(
          index + 1,
          recipe._id,
          recipe.title,
          recipe.serving_number,
          recipe.total_time,
          recipe.process_material,
        )
      );
      setRows(formattedRows);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  React.useEffect(() => {
    // Call API
    refreshData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter(row =>
    row.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOnSubmit = () => {
    if (!searchValue) {
      toast.error("Please enter dish name to search!");
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
              placeholder="Search by dish name!"
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
            <CreateNewButton refreshData={refreshData}/>
          </Box>
        </Box>

        {/* Table */}
        <SellerMenuTable
          columns={columns}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filteredRows={filteredRows}
          onDelete={onDelete}
          refreshData={refreshData}
        />
      </Paper>
    </div>
  );
}




