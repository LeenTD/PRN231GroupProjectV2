import React from "react";

import Grid from "@mui/material/Grid";
import SidebarSeller from "../../components/SidebarSeller";
import { Box } from "@mui/material";
import HeaderSeller from "~/components/Seller/HeaderSeller";
import ListOfPosts from "~/components/Seller/ListofPosts";


export default function SellerListOfPost() {
    const breadcrumbs = [
        { label: "Shop", path: "/", active: false },
        { label: "Posts", path: "/user", active: true },
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
                  <HeaderSeller title="Posts" breadcrumbs={breadcrumbs} />
                  <ListOfPosts/>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      );
}
