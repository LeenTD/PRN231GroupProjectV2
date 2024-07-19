import * as React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function HandleApproveButton({ id }) {
  const handleApprove = () => {
    toast.success(`Approved row with id: ${id}`);
  };

  return (
    <>
      <Button
        sx={{
          backgroundColor: "#6DF292",
          p: "8px",
          minWidth: "0px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#6DF292",
          }
        }}
        onClick={handleApprove}
      >
        <EditIcon style={{ color: "#fff" }} />
      </Button>
    </>
  );
}