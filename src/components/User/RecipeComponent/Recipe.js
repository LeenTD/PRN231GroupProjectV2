import React from "react";
import Carousel from "./CarouselRecipe";
import SearchRecipe from "./SearchRecipe";
import MediaCardGrid from "./CardRecipe"; // Ensure this is the correct path
import FilterRecipe from "./FilterRecipe";
import Grid from "@mui/material/Grid";
import anh1 from "~/assets/Img/an-chay-healthy-1.jpg";
import anh2 from "~/assets/Img/12_grande.jpg";
import anh3 from "~/assets/Img/buncha.jpg";
import Header from "../Header";
import { Box } from "@mui/material";

function Recipe() {
  const carousel3Items = [
    {
      title: "Waffle",
      description: "Waffle is a type of baked cake, originating from Belgium",
      imageUrl: anh1, // Ensure the image path is correct
    },
    {
      title: "Waffle",
      description: "Waffle is a type of baked cake, originating from Belgium",
      imageUrl: anh2, // Ensure the image path is correct
    },
    {
      title: "Waffle",
      description: "Waffle is a type of baked cake, originating from Belgium",
      imageUrl: anh3, // Ensure the image path is correct
    },
  ];

  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Header />
      </Box>
      <Box sx={{ marginTop: "64px" }}>
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={12} sm={3} md={2} sx={{ position: "relative" }}>
            <FilterRecipe />
          </Grid>
          <Grid item xs={12} sm={9} md={10} sx={{ height: "100vh" }}>
            <Carousel carouselItems={carousel3Items} />
            <SearchRecipe />
            <MediaCardGrid />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Recipe;
