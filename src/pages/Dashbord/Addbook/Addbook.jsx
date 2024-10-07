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
import axios from 'axios';

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
  const [fileUrl, setFileUrl] = useState(null); // New state for file URL  
  const [categories, setCategories] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://freetestapi.com/api/v1/books');
        const genres = response.data.map(book => book.genre[0]);
        setCategories([...new Set(genres)]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleChange = (event) => {
    const { target: { value } } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileUrl(URL.createObjectURL(file)); // Set the file URL for display  
      setFileName(file.name);
    } else {
      setFileName('');
      setFileUrl(null);
    }
  };

  const getStyles = (name) => ({
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  });

  const handleSubmit = () => {
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

    // If validation passes  
    setSnackbarMessage('Book added successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 3, padding: 4, boxShadow: 3 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Add New Book
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField id="book-name" label="Name Of Book" fullWidth sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="author" label="Author" fullWidth sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              label="Amount"
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
            <Select labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Category" />}
              MenuProps={MenuProps}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' } }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category} style={getStyles(category)}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="quantity" label="Quantity No.s" fullWidth sx={{ mb: 2 }} />
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
              bgcolor: '#f9f9f9',
              transition: 'background-color 0.3s',
              '&:hover': {
                bgcolor: '#e1f5fe',
              },
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
              <Button
                variant="contained"
                component="span"
                sx={{
                  marginTop: 1,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#1565c0',
                  },
                }}
              >
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
            {/* Display the uploaded file */}
            {fileUrl && (
              <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                {fileName.endsWith('.pdf') ? (
                  <iframe
                    src={fileUrl}
                    title="Uploaded PDF"
                    style={{ width: '100%', height: '400px', border: 'none' }}
                  />
                ) : (
                  <img
                    src={fileUrl}
                    alt="Uploaded"
                    style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                  />
                )}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={{
                bgcolor: '#4caf50',
                '&:hover': {
                  bgcolor: '#388e3c',
                },
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                borderColor: '#f44336',
                '&:hover': {
                  bgcolor: '#f44336',
                  color: '#fff',
                },
              }}
              onClick={() => {/* Add any cancel logic here */ }}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Snackbar for validation messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Addbook;