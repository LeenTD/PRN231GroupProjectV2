import React from "react";

import Grid from "@mui/material/Grid";
import SidebarSeller from "../../components/SidebarSeller";
import ListofIngredients from "../../components/Seller/ListofIngredients";
import { Box } from "@mui/material";
import HeaderSeller from "~/components/Seller/HeaderSeller";


export default function SellerListOfIngredientPage() {

  const breadcrumbs = [
    { label: "Shop", path: "/", active: false },
    { label: "Ingredients", path: "/user", active: true },
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
              <HeaderSeller title="Ingredients" breadcrumbs={breadcrumbs} />
              <ListofIngredients />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
