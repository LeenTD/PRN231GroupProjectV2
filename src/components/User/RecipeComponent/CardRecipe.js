import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import dishimg from '~/assets/Img/Thai.jpg';

const cardData = [
  {
    id: 1,
    title: "Som Tam Salad",
    time: "30 minutes",
    country: "Thai",
    category: "Vegan",
    description: "Super dry",
    image: dishimg,
  },
  {
    id: 2,
    title: "Som Tam Salad",
    time: "30 minutes",
    country: "Thai",
    category: "Vegan",
    description: "Super dry",
    image: dishimg,
  },
  {
    id: 3,
    title: "Som Tam Salad",
    time: "30 minutes",
    country: "Thai",
    category: "Vegan",
    description: "Super dry",
    image: dishimg,
  },
  {
    id: 4,
    title: "Som Tam Salad",
    time: "30 minutes",
    country: "Thai",
    category: "Vegan",
    description: "Super dry",
    image: dishimg,
  },
  {
    id: 5,
    title: "Som Tam Salad",
    time: "30 minutes",
    country: "Thai",
    category: "Vegan",
    description: "Super dry",
    image: dishimg,
  },
  {
    id: 6,
    title: "Som Tam Salad",
    time: "30 minutes",
    country: "Thai",
    category: "Vegan",
    description: "Super dry",
    image: dishimg,
  },
  // Add more cards as needed
];

function MediaCard({ id, title, time, country, category, description, image }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto", marginTop: "20px", marginBottom: "20px", borderRadius: "10px" }}>
      <Link to={`/recipe/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia sx={{ height: 300, width: "100%", boxShadow: 3 }} image={image} />
        <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography gutterBottom variant="h6" sx={{ mb: 1, fontWeight: "bold", m: "auto" }}>
            {title}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "6px", mb: 1, "& .MuiTypography-root": { fontSize: "0.875rem" } }}>
          <Typography sx={{ marginTop: "6px", padding: "5px" }}>{time}</Typography>
          <Typography sx={{ padding: "5px" }}>{description}</Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
            <Typography sx={{ marginTop: "6px" }}>{category}</Typography>
            <Typography sx={{ marginTop: "6px" }}>{country}</Typography>
          </Box>
        </Box>
      </Link>
    </Card>
  );
}

export default function MediaCardGrid() {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "100px", marginBottom: "100px" }}>
      {cardData.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
          <MediaCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
