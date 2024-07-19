import React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import avatar from "~/assets/Img/26.png";
import axios from "axios";

const CreatePost = ({ open, handleClose, handleSubmit }) => {
  const [label, setLabel] = React.useState("What's on your mind, Pickky?");
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleFocus = () => {
    setLabel("");
  };

  const handleBlur = () => {
    if (content === "") {
      setLabel("What's on your mind, Pickky?");
    }
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async () => {
    if (!content && !file) {
      alert("Content or file is required to post.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("author", "60d21b4667d0d8992e610c85"); // Thay thế ID thực tế của tác giả
    if (file) {
      formData.append("file", file);
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
      console.log(response.data);
      handleSubmit(response.data);
    } catch (error) {
      console.error(
        "Error posting data",
        error.response ? error.response.data : error.message
      );
    }

    setContent("");
    setFile(null);
    setPreview(null);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-post-modal-title"
      aria-describedby="create-post-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 470,
          bgcolor: "background.paper",
          border: "2px solid #00CA92",
          boxShadow: 24,
        }}
      >
        <h2
          id="create-post-modal-title"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Post Blog
        </h2>
        <Divider
          sx={{
            my: 0,
            bgcolor: "#00CA92",
            height: "0.2px",
          }}
        />
        <Box sx={{ display: "flex", gap: 1, p: 2 }}>
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt="Remy Sharp"
            src={avatar}
          />
          <Typography sx={{ mt: 2 }}>Pickky</Typography>
        </Box>
        <TextField
          id="filled-basic"
          fullWidth
          label={label}
          multiline
          rows={6}
          variant="filled"
          value={content}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: "white",
            },
            "& .MuiFilledInput-root::before": {
              borderBottom: "none",
            },
            "& .MuiFilledInput-root:hover:not(.Mui-disabled)::before": {
              borderBottom: "none",
            },
            "& .MuiFilledInput-root.Mui-focused::before": {
              borderBottom: "none",
            },
            "& .MuiFilledInput-root::after": {
              borderBottom: "none",
            },
            "& .MuiFilledInput-root.Mui-focused": {
              boxShadow: "none",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "black",
            },
          }}
        />
        {preview && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <img
              src={preview}
              alt="preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <input
            accept="image/*,video/*"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              color="success"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ImageOutlinedIcon />
              picture/video
            </Button>
          </label>
        </Box>
        <Divider
          sx={{
            my: 2,
            bgcolor: "#00CA92",
            height: "0.2px",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, ml: 4, pl: 6, pr: 6 }}
            onClick={onSubmit}
          >
            Post
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, mb: 2, ml: 4 }}
            onClick={handleClose}
          >
            Save Draft
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePost;
