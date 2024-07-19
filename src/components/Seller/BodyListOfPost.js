import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HandleDeleteButton from "~/components/Seller/HandleDeleteButton";
import UpdateIngredientModal from "./UpdateIngredientModal";

export default function BodyListOfPost({
  columns,
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  filteredRows,
  onDelete,
  refreshData
}) {

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <Box p={1}>
      <TableContainer
        sx={{
          height: "calc(100vh - 280px)",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: "#015E44",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: "#015E44",
                            fontSize: 16,
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: 300,
                          }}
                        >
                          {column.id === "action" ? (
                            <>
                              <Button
                                sx={{
                                  backgroundColor: "#6DF292",
                                  p: "8px",
                                  minWidth: "0px",
                                  borderRadius: "10px",
                                  "&:hover": {
                                    backgroundColor: "#6DF292",
                                  },
                                }}
                                onClick={() => handleOpen(row)}
                              >
                                <EditIcon style={{ color: "#fff" }} />
                              </Button>
                              <HandleDeleteButton id={row.id} onDelete={onDelete} />
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedRow && (
        <UpdateIngredientModal open={open} handleClose={handleClose} row={selectedRow} />
      )}
    </Box>
  );
}
