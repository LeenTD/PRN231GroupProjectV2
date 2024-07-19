import React from "react";

import Grid from "@mui/material/Grid";
import SidebarSeller from "~/components/SidebarSeller";
import AdminResolveReportsContent from "./AdminResolveReportsContent/AdminResolveReportsContent";
import Box from "@mui/material/Box";
import HeaderSeller from "~/components/Seller/HeaderSeller";


export default function AdminResolveReportsPage() {
  const breadcrumbs = [
    { label: "Reports", path: "/", active: false }
    // { label: "Profile", path: "/user/profile", active: true },
  ];
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          bgcolor: "#F4FFEC",
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={2} sx={{ position: "relative" }}>
            <SidebarSeller />
          </Grid>
          <Grid item xs={10} sx={{ position: "relative" }}>
            <Box sx={{maxHeight: '100vh'}}>
              <HeaderSeller title="Reports" breadcrumbs={breadcrumbs} />
              <AdminResolveReportsContent />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
