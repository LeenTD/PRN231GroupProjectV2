import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  TextField,
  Avatar,
  styled,
  IconButton,
  Grid,
  Divider,
  CardMedia,
  CardActions,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreatePost from "./createpost";
import { Link } from "react-router-dom";
import avatar from "../../../assets/Img/26.png";
import dishimg from "~/assets/Img/Thai.jpg";
import Header from "../Header";
import Footer from "~/components/Footer";
import axios from "axios";

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

function RecipeReviewCard({ handleOpen }) {
  return (
    <Card
      sx={{
        display: "flex",
        width: "670px",
        m: "auto",
        mt: "10px",
        paddingTop: "15px",
        paddingBottom: "20px",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
      className="card"
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={avatar}
          ></Avatar>
        }
      />
      <TextField
        id="outlined-basic"
        fullWidth
        sx={{ mt: "5px", padding: "10px" }}
        placeholder="Post something today..."
        variant="outlined"
        onClick={handleOpen}
      />
    </Card>
  );
}

function OutlinedCard({ id, author, date, content, avatar, image }) {
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);
  const [showCommentBox, setShowCommentBox] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  const handleCommentClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          m: "auto",
          boxShadow: 3,
          borderRadius: 2,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
        className="card"
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={avatar}
            />
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              </Menu>
            </>
          }
          title={author}
          subheader={
            <div style={{ textAlign: "left" }}>
              <div>{date}</div>
            </div>
          }
          titleTypographyProps={{ textAlign: "left" }}
          subheaderTypographyProps={{ textAlign: "left" }}
        />
        <Typography sx={{ textAlign: "left", ml: "75px" }}>
          {content}
        </Typography>

        <Grid className="imgdish" container spacing={2}>
          <Grid item xs={6} sx={{ paddingRight: 1 / 2 }}>
            <Link to={`/blog/${id}`} style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Dish image"
                sx={{ width: "80%", display: "block", ml: 9 }}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sx={{ paddingLeft: 1 / 2 }}>
            <Link to={`/blog/${id}`} style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Dish image"
                sx={{ width: "80%", display: "block" }}
              />
            </Link>
          </Grid>
        </Grid>
        <CardActions disableSpacing sx={{ ml: 7 }}>
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
          >
            <FavoriteIcon sx={{ color: favorite ? "red" : "inherit" }} />
          </IconButton>
          <IconButton aria-label="comment" onClick={handleCommentClick}>
            <CommentIcon />
          </IconButton>
        </CardActions>
        {showCommentBox && (
          <Box sx={{ ml: 7, mr: 7, mt: 2 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Write a comment..."
              variant="outlined"
            />
          </Box>
        )}
      </Card>
    </>
  );
}

export default function Blog() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Hai Dang",
      date: "September 14, 2016",
      content: "Món ăn ngon quá",
      avatar: avatar,
      image: dishimg,
    },
    {
      id: 2,
      author: "Van Hai",
      date: "October 1, 2018",
      content: "Bài viết rất hay",
      avatar: avatar,
      image: dishimg,
    },
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (postData) => {
    const formData = new FormData();
    formData.append("content", postData.content);
    if (postData.file) {
      formData.append("file", postData.file);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created:", response.data);

      setPosts((prevPosts) => [
        ...prevPosts,
        {
          id: response.data.id,
          author: "New Author",
          date: new Date().toLocaleDateString(),
          content: postData.content,
          avatar: avatar,
          image: postData.file ? URL.createObjectURL(postData.file) : dishimg,
        },
      ]);

      handleClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Box sx={{ position: "sticky", top: "0px", zIndex: "4" }}>
            <Header />
          </Box>
          <Box sx={{ marginTop: "100px" }}>
            <RecipeReviewCard handleOpen={handleOpen} />
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
            color: "#2FD642",
            "& svg": {
              m: 1,
            },
          }}
        />
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <OutlinedCard {...post} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 10 }}>
        <Footer />
      </Box>
      <CreatePost
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
