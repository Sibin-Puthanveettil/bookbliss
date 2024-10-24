import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, Typography, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const Addbook = () => {
  const theme = useTheme();
  const [fileName, setFileName] = useState('');
  const [fileNamepdf, setFileNamepdf] = useState('');

  const [fileUrl, setFileUrl] = useState(null);
  const [fileUrlPDF, setFileUrlPDF] = useState(null);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // States for the form inputs  
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    price: '',
    description: '',
    category: [],
    language: '',
    qnt: 40, // Assuming a default quantity  
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44302/API/Getcategorydata');
        const categoryNames = response.data.map(category => category.categoryname);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://localhost:44302/API/GetLanguage');
        const languageNames = response.data.map(language => language.languageName);
        setLanguages(languageNames);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchCategories();
    fetchLanguages();
  }, []);

  const handleChange = (event) => {
    const { target: { value, id } } = event;

    if (id === 'categories') {
      setBookData(prev => ({ ...prev, category: value }));
    } else {
      setBookData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleFileChange = (event) => {
    alert("handleFileChange");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('');
      setFileUrl(null);
    }
  };


  const handleFileChangePDF = (event) => {
    alert("handleFileChangePDF");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrlPDF(reader.result);
        setFileNamepdf(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setFileNamepdf('');
      setFileUrlPDF(null);
    }
  };

  const handleSubmit = async () => {
    const data = {
      id: 0,
      name: bookData.name,
      description: bookData.description,
      price: parseFloat(bookData.price),
      category: bookData.category,
      author: bookData.author,
      qnt: bookData.qnt,
      language: bookData.language,
      img: fileUrl ? fileUrl.split(',')[1] : '',
      doctype: fileUrl ? fileUrl.split(',')[0] : '',
      Doc:fileUrlPDF ? fileUrlPDF.split(',')[1] : '',
      doctypeDoc: fileUrlPDF ? fileUrlPDF.split(',')[0] : '',
    };

    try {
      const response = await axios.post('https://localhost:44302/API/Addproducts', data);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Error submitting data: ' + error.message);
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id="name"
            label="Book Name"
            fullWidth
            value={bookData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="author"
            label="Author"
            fullWidth
            value={bookData.author}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={bookData.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete

            options={categories || []} // Ensure categories are never undefined  
            onChange={(event, newValue) => {
              setBookData({ ...bookData, category: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Categories" placeholder="Select Categories" />
            )}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={languages}
            onChange={(event, newValue) => {
              setBookData({ ...bookData, language: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Language" placeholder="Select Language" />
            )}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={bookData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sx={{
          display: 'flex'
        }}>
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
              Upload a Cover Photo
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
              Upload a Book PDF
            </Typography>
            <input
              accept="PDF"
              style={{ display: 'none' }}
              id="file-input2"
              type="file"
              onChange={handleFileChangePDF}
            />
            <label htmlFor="file-input2">
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
            {fileNamepdf && (
              <TextField
                variant="outlined"
                value={fileNamepdf}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ marginTop: 2, width: '100%' }}
              />
            )}
            {fileUrlPDF && (
              <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                {fileNamepdf.endsWith('.pdf') ? (
                  <iframe
                    src={fileUrlPDF}
                    title="Uploaded PDF"
                    style={{ width: '100%', height: '400px', border: 'none' }}
                  />
                ) : (
                  <img
                    src={fileUrlPDF}
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
              onClick={() => {
                setFileName('');
                setFileUrl(null);
                setBookData({
                  name: '',
                  author: '',
                  price: '',
                  description: '',
                  category: [],
                  language: '',
                  qnt: 40,
                });
              }}
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