import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, Typography, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios'; // Import axios  

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Addbook = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [fileName, setFileName] = useState('');
  const [categories, setCategories] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch data from the API using axios  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://freetestapi.com/api/v1/books');
        const genres = response.data.map(book => book.genre[0]); // Get the first genre from each book  
        setCategories([...new Set(genres)]); // Use set to avoid duplicates  
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const getStyles = (name) => {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  };

  const handleSubmit = () => {
    // Validation logic
    const bookName = document.getElementById('book-name').value;
    const author = document.getElementById('author').value;
    const amount = document.getElementById('outlined-adornment-amount').value;
    const quantity = document.getElementById('quantity').value;

    if (!bookName || !author || !amount || !quantity || personName.length === 0 || !fileName) {
      setSnackbarMessage('Please fill in all fields and upload a file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // If validation passes, you can proceed with form submission logic here
    setSnackbarMessage('Book added successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ backgroundColor: '#f6f6f6', marginTop: 5, borderRadius: 5, marginBottom: 5, padding: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Book
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="book-name"
            label="Name Of Book"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="author"
            label="Author"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              label="Amount"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Category" />}
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                  style={getStyles(category)}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="quantity"
            label="Quantity No.s"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: 2,
              border: '1px dashed #ccc',
              borderRadius: 2,
              width: '100%',
              maxWidth: 400,
              margin: 'auto',
              position: 'relative',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload a File
            </Typography>
            <input
              accept="*"
              style={{ display: 'none' }}
              id="file-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <Button variant="contained" component="span" sx={{ marginTop: 1 }}>
                Choose File
              </Button>
            </label>
            {fileName && (
              <TextField
                variant="outlined"
                value={fileName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ marginTop: 2, width: '100%' }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Snackbar for validation messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Addbook;


