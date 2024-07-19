import * as React from "react";
import {
  Box,
  Card,
  CardHeader,
  TextField,
  Avatar,
  styled,
  IconButton,
  Divider,
  Typography,
  CardContent,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useParams } from 'react-router-dom';
import dishimg from '~/assets/Img/image 23.png';
import Header from "../Header";
import Footer from "~/components/Footer";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const posts = [
  {
    id: 1,
    author: "Hai Dang",
    date: "September 14, 2016",
    content: "Món ăn ngon quá",
    avatar: "/assets/Img/26.png",
    image: dishimg,
    title: "Chinese cuisine",
    description: "Comprises cuisines originating from China, as well as from Chinese people from other parts of the world. Because of the Chinese diaspora and historical power of the country, Chinese cuisine has profoundly influenced many other cuisines in Asia and beyond, with modifications made to cater to local palates. Chinese food staples such as rice, soy sauce, noodles, tea, chili oil, and tofu, and utensils such as chopsticks and the wok, can now be found worldwide."
  },
  {
    id: 2,
    author: "Van Hai",
    date: "October 1, 2018",
    content: "Bài viết rất hay",
    avatar: "/assets/Img/26.png",
    image: dishimg,
    title: "Vietnamese cuisine",
    description: "Vietnamese cuisine encompasses the foods and beverages of Vietnam, and features a combination of five fundamental tastes (ngũ vị) in the overall meal. Each Vietnamese dish has a distinctive flavor which reflects one or more of these elements. Common ingredients include fish sauce, shrimp paste, soy sauce, rice, fresh herbs, fruit and vegetables."
  }
];

function BlogDetail() {
  const { id } = useParams();  // Get the blog ID from the URL
  const post = posts.find(p => p.id === parseInt(id));  // Find the post based on the ID

  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [label, setLabel] = React.useState("Post your comment...");

  const handleFocus = () => {
    setLabel("");
  };

  const handleBlur = () => {
    if (label === "") {
      setLabel("Post your comment...");
    }
  };

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <>
      <Box>
        <Header />
      </Box>
      <Card
        sx={{
          display: "flex",
          width: "670px",
          m: "auto",
          mt: "100px",
          paddingTop: "15px",
          paddingBottom: "20px",
          boxShadow: 3,
          border: post.id === 1 ? '2px solid #1976d2' : 'none' // Highlight the first card
        }}
      >
        <CardHeader
          sx={{ pr: 0 }}
          avatar={
            <Avatar
              sx={{ width: "56px", height: "56px", p: 0 }}
              aria-label="recipe"
              src={post.avatar}
            ></Avatar>
          }
        />
        <CardContent sx={{ pl: 0 }}>
          <h4>{post.author}</h4>
        </CardContent>
      </Card>
      <Divider
        sx={{
          my: 0,
          bgcolor: "#015E4",
          height: "0.1px",
          mt: 3,
        }}
      />
      <Box sx={{ width: '670px', m: 'auto' }}>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}
        >
          <h1>{post.title}</h1>
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          {post.description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Typography sx={{ textAlign: "center", mb: 3 }}>
          The world's earliest eating establishments recognizable
          as restaurants in the modern sense first emerged in Song dynasty China
          during the 11th and 12th centuries. Street food became an
          integral aspect of Chinese food culture during the Tang dynasty, and
          the street food culture of much of Southeast Asia was established by
          workers imported from China during the late 19th century.
        </Typography>
        <Box
          sx={{
            width: '100%',
            m: "auto",
            mt: "40px",
            mb: "40px",
            position: "relative",
          }}
        >
          <TextField
            id="filled-basic"
            fullWidth
            label={label}
            multiline
            rows={6}
            variant="outlined"
            onFocus={handleFocus}
            onBlur={handleBlur}
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "white", // Background color for filled variant
              },
              "& .MuiFilledInput-root::before": {
                borderBottom: "none", // Remove bottom border
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled)::before": {
                borderBottom: "none", // Remove bottom border on hover
              },
              "& .MuiFilledInput-root.Mui-focused::before": {
                borderBottom: "none", // Remove bottom border when focused
              },
              "& .MuiFilledInput-root::after": {
                borderBottom: "none", // Remove bottom border after input
              },
              "& .MuiFilledInput-root.Mui-focused": {
                boxShadow: "none", // Remove box shadow when focused
              },
            }}
            InputLabelProps={{
              sx: {
                color: "black", // Label color
              },
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: 8,
              bottom: 8,
            }}
            color="primary"
            onClick={handleClose}
          >
            <SendOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
     <Footer/>
    </>
  );
}

export default BlogDetail;
