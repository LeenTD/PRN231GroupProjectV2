import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import HandleApproveButton from "~/components/Seller/HandleApproveButton";
import HandleDeleteButton from "~/components/Seller/HandleDeleteButton";
import Chip from "@mui/material/Chip";

export default function TableSeller({
  columns,
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  filteredRows,
  onDelete
}) {
  const getChipColor = (status) => {
    switch (status) {
      case "pending":
        return "primary"; // Or any other color you want for Pending
      case "resolved":
        return "success";
      case "unresolved":
        return "error";
      default:
        return "default"; // Fallback color
    }
  };

  return (
    <Box p={1}>
      <TableContainer
        sx={{
          height: "calc(100vh - 270px)",
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
                              <HandleApproveButton
                                id={row.id}
                              />
                              <HandleDeleteButton
                                id={row.id}
                                onDelete={onDelete}
                              />
                            </>
                          ) : (
                            <>
                              {column.id === "report_status" ? (
                                <>
                                  <Chip
                                    size="small"
                                    label={value}
                                    color={getChipColor(value)}
                                  />
                                </>
                              ) : (
                                value
                              )}
                            </>
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
    </Box>
  );
}
