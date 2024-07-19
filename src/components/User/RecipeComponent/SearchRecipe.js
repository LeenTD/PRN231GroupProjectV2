// src/SearchRecipe.js
import React from 'react';
import { Container, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';

const Input = styled('input')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  padding: '8px',
  borderRadius: '10px 0 0 10px', // Adjusted border radius
  border: '1px solid #ccc',
  borderRight: 'none', // Remove right border to blend with the icon button
  outline: 'none',
  height: '100%',
  width: '100%'
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

const SearchRecipe = () => {
  const items = [
    'Apple Pie',
    'Banana Bread',
    'Cherry Tart',
    'Date Cookies',
    'Elderberry Jam',
    'Fig Bars',
    'Grape Salad'
  ];

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: items,
    getOptionLabel: (option) => option,
  });

  return (
    <Container sx={{ borderRadius: '8px' }}>
      <Box mt={2}>
        <Box display="flex" alignItems="center" {...getRootProps()} sx={{width:"full", height:"30px"}}  >
          <Input {...getInputProps()} placeholder="Search for a recipe..." />
          
            <SearchIcon style={{borderRadius: "0 10px 10px 0", border:'1px solid rgba(0,0,0,.25)',width:"50px", height:"30px", padding:"1px"}} />
          
        </Box>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li key={index} {...getOptionProps({ option, index })}>
                {option}
              </li>
            ))}
          </Listbox>
        ) : null}
      </Box>
    </Container>
  );
};

export default SearchRecipe;
