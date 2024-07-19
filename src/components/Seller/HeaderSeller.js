import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const HeaderSeller = ({ title, breadcrumbs }) => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <div
      role="presentation"
      onClick={handleClick}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: '30px',
      }}
    >
      <Box sx={{ width: "70vw", overflow: "hidden" }}>
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#015E44",
          }}
        >
          {title}
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#015E44" }}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${breadcrumb.active ? "active" : ""}`}
            aria-current={breadcrumb.active ? "page" : undefined}
          >
            {breadcrumb.active ? (
              breadcrumb.label
            ) : (
              <Link underline="hover" color="inherit" href={breadcrumb.path}>
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </Breadcrumbs>
      </Box>
    </div>
  );
};

export default HeaderSeller;
