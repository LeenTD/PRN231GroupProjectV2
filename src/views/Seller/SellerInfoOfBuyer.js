import React from "react";

import Grid from "@mui/material/Grid";
import SidebarSeller from "~/components/SidebarSeller";
import Box from "@mui/material/Box";
import HeaderSeller from "~/components/Seller/HeaderSeller";
import InformationOfBuyer from "~/components/Seller/InformationOfBuyer";


export default function SellerInfoOfBuyer() {
    const breadcrumbs = [
        { label: "Shop", path: "/", active: false },
        { label: "List of Buyer", path: "/user", active: true },
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
                  <HeaderSeller title="List of Order" breadcrumbs={breadcrumbs} />
                  <InformationOfBuyer />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      );
}
