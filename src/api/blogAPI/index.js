import React, { useState, useEffect } from "react";
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
import Header from "../Header";
import Footer from "~/components/Footer";
import {
  fetchAllPosts,
  deletePostById,
  updatePostById,
} from "~/api/blogAPI/index";

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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatar}></Avatar>
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

function OutlinedCard({ id, author, date, content, avatar, image, onDelete, onEdit }) {
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
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatar} />
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { onEdit(id); handleMenuClose(); }}>Edit</MenuItem>
                <MenuItem onClick={() => { onDelete(id); handleMenuClose(); }}>Delete</MenuItem>
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
        <Typography sx={{ textAlign: "left", ml: "75px" }}>{content}</Typography>

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
          <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
            <FavoriteIcon sx={{ color: favorite ? "red" : "inherit" }} />
          </IconButton>
          <IconButton aria-label="comment" onClick={handleCommentClick}>
            <CommentIcon />
          </IconButton>
        </CardActions>
        {showCommentBox && (
          <Box sx={{ ml: 7, mr: 7, mt: 2 }}>
            <TextField fullWidth id="outlined-basic" placeholder="Write a comment..." variant="outlined" />
          </Box>
        )}
      </Card>
    </>
  );
}

export default function Blog() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Lấy tất cả bài viết
    const fetchPosts = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (postData) => {
    try {
      const newPost = await createPost(postData);
      setPosts((prevPosts) => [
        ...prevPosts,
        {
          id: newPost._id,
          author: "New Author",
          date: new Date(newPost.created_at).toLocaleDateString(),
          content: newPost.content,
          avatar: avatar,
          image: newPost.images.length > 0 ? `http://localhost:3000${newPost.images[0].url}` : dishimg,
        },
      ]);
      handleClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePostById(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    const updatedContent = prompt("Edit your post content:", postToEdit.content);

    if (updatedContent === null || updatedContent === postToEdit.content) {
      return; // User cancelled the prompt or didn't change the content
    }

    try {
      const updatedPost = await updatePostById(postId, { content: updatedContent });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, content: updatedPost.content } : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
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
            <OutlinedCard {...post} onDelete={handleDelete} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 10 }}>
        <Footer />
      </Box>
      <CreatePost open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
    </>
  );
}
