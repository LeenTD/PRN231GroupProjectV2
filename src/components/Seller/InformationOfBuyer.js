import * as React from "react";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BodyListOfBuyer from '~/components/Seller/BodyListOfBuyer';
import Button from "@mui/material/Button";
import { fetchAllIngredients } from "~/api/ingredientsAPI";

const columns = [
  { id: "id", label: "ID", minWidth: 50, align: "center" },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "phone", label: "Phone Number", minWidth: 100, align: "left" },
  { id: "address", label: "Address", minWidth: 200, align: "left" },
  { id: "details", label: "Details", minWidth: 300, align: "center" },
  { id: "totalPrice", label: "Total Price", minWidth: 100, align: "center" },
  { id: "date", label: "Order Date", minWidth: 100, align: "center" },
  { id: "status", label: "Status", minWidth: 100, align: "center" },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

function createData(id, name, phone, address, details, totalPrice, date, status, action) {
  return { id, name, phone, address, details, totalPrice, date, status, action };
}

export default function SellerMenuContent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const refreshData = async () => {
    try {
      const storedOrders = localStorage.getItem('orders');
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      const formattedRows = orders.map((order, index) =>
        createData(
          index + 1,
          order.name,
          order.phone,
          order.address,
          order.purchasedIngredients.map(ing => `${ing.name} (${ing.quantity})`).join(", "),
          `$${order.totalPrice.toFixed(2)}`,
          new Date(order.orderDate).toLocaleDateString("vi-VI"),
          order.status,
          <Button variant="contained" color="primary" onClick={() => handleConfirmOrder(index)}>
            Confirm
          </Button>
        )
      );
      setRows(formattedRows);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleConfirmOrder = (index) => {
    // Tạo một bản sao của mảng rows để không thay đổi trực tiếp state
    const updatedRows = [...rows];
    // Cập nhật trạng thái của đơn hàng trong mảng rows
    updatedRows[index].status = "Confirmed";
    // Cập nhật state với mảng mới đã cập nhật
    setRows(updatedRows);

    // Lấy danh sách đơn hàng từ localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders'));
    // Cập nhật trạng thái của đơn hàng trong localStorage
    storedOrders[index].status = "Confirmed";
    // Lưu lại danh sách đơn hàng đã cập nhật vào localStorage
    localStorage.setItem('orders', JSON.stringify(storedOrders));

    // Hiển thị thông báo xác nhận
    toast.success("Order confirmed!");
  };

  // Get all orders from local storage
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
    row.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOnSubmit = () => {
    if (!searchValue) {
      toast.error("Please enter a name to search!");
      return;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <Paper
        className="SellerMenuContent"
        sx={{ width: "70vw", overflow: "hidden", boxShadow: 3 }}
      >
        {/* Search in table and create new */}
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
              placeholder="Search by name!"
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
        </Box>

        {/* Table */}
        <BodyListOfBuyer
  columns={columns}
  rows={rows}
  page={page}
  rowsPerPage={rowsPerPage}
  handleChangePage={handleChangePage}
  handleChangeRowsPerPage={handleChangeRowsPerPage}
  filteredRows={filteredRows}
  onConfirmOrder={handleConfirmOrder} // Truyền hàm handleConfirmOrder xuống
/>

      </Paper>
    </div>
  );
}
