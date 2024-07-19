import React, { useState } from 'react';
import {
  Box,
  Drawer,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

const filters = {
  Time: ['10-20 min', '20-30 min', '30-45 min'],
  Country: ['Vietnamese', 'India', 'Chinese', 'Thailand', 'Korea'],
  Category: ['Vegan', 'Non-Vegan'],
};

const FilterSection = ({ title, options, selectedOptions, handleChange }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
      {title}
    </Typography>
    <FormGroup>
      {options.map((option) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedOptions.includes(option)}
              onChange={() => handleChange(title, option)}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 20, color: 'primary.main' } }}
            />
          }
          label={option}
          key={option}
          sx={{ mb: 1, '& .MuiTypography-root': { fontSize: '0.875rem' } }}
        />
      ))}
    </FormGroup>
  </Box>
);

const FilterRecipe = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    Time: [],
    Country: [],
    Category: [],
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleFilterChange = (category, option) => {
    setSelectedFilters((prevFilters) => {
      const isSelected = prevFilters[category].includes(option);
      if (isSelected) {
        return {
          ...prevFilters,
          [category]: prevFilters[category].filter((item) => item !== option),
        };
      } else {
        return {
          ...prevFilters,
          [category]: [...prevFilters[category], option],
        };
      }
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 2, marginTop: "64px" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Filter
      </Typography>
      {Object.keys(filters).map((category) => (
        <FilterSection
          key={category}
          title={category}
          options={filters[category]}
          selectedOptions={selectedFilters[category]}
          handleChange={handleFilterChange}
        />
      ))}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile || isTablet ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'block', md: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'block', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 250,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box', p: 2, marginTop: "64px" },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default FilterRecipe;
