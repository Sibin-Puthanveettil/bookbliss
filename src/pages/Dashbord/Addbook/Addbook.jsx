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

const Addbook = () => {  
  const theme = useTheme();  
  const [personName, setPersonName] = useState([]);  
  const [fileName, setFileName] = useState('');  
  const [fileUrl, setFileUrl] = useState(null);  
  const [categories, setCategories] = useState([]);  
  const [languages, setLanguages] = useState([]); // State to hold languages  
  const [snackbarOpen, setSnackbarOpen] = useState(false);  
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');  

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
    fetchLanguages(); // Fetch languages on mount  
  }, []);  

  const handleChange = (event) => {  
    const { target: { value } } = event;  
    setPersonName(typeof value === 'string' ? value.split(',') : value);  
  };  

  const handleFileChange = (event) => {  
    const file = event.target.files[0];  
    if (file) {  
      setFileUrl(URL.createObjectURL(file));  
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

  const handleSubmit = async () => {  
    // ... (Implementation for submitting the form)  
  };  

  const handleSnackbarClose = () => {  
    setSnackbarOpen(false);  
  };  

  return (  
    <Container>  
      <Grid container spacing={2}>  
        <Grid item xs={12}>  
          <Typography variant="h4" gutterBottom>  
            Add a New Book  
          </Typography>  
        </Grid>  
        {/* Book Name Field */}  
        <Grid item xs={12} sm={6}>  
          <TextField id="book-name" label="Book Name" fullWidth sx={{ mb: 2 }} />  
        </Grid>  
        {/* Author Field */}  
        <Grid item xs={12} sm={6}>  
          <TextField id="author" label="Author" fullWidth sx={{ mb: 2 }} />  
        </Grid>  
        {/* Price Field */}  
        <Grid item xs={12} sm={6}>   
          <TextField  
            id="outlined-adornment-amount"  
            label="Price"  
            type="number"  
            fullWidth  
            sx={{ mb: 2 }}  
            InputProps={{  
              startAdornment: <InputAdornment position="start">$</InputAdornment>,  
            }}  
          />  
        </Grid>  
        {/* Category Selection */}  
        <Grid item xs={12} sm={6}>  
          <FormControl fullWidth>  
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>  
            <Select  
              labelId="demo-multiple-name-label"  
              id="demo-multiple-name"  
              multiple  
              value={personName}  
              onChange={handleChange}  
              input={<OutlinedInput label="Category" />}  
              renderValue={(selected) => selected.join(', ')}  
              MenuProps={{  
                PaperProps: {  
                  style: {  
                    maxHeight: 48 * 4.5 + 8,  
                    width: 250,  
                  },  
                },  
              }}  
              sx={{ borderColor: '#1976d2' }}  
            >  
              {categories.map((category) => (  
                                <MenuItem key={category} value={category} style={getStyles(category)}>  
                  {category}  
                </MenuItem>  
              ))}  
            </Select>  
          </FormControl>  
        </Grid>  
        {/* Language Selection */}  
        <Grid item xs={12} sm={6}>  
          <FormControl fullWidth>  
            <InputLabel id="language-select-label">Language</InputLabel>  
            <Select  
              labelId="language-select-label"  
              id="language-select"  
              value={personName} // You can maintain a separate state if needed  
              onChange={handleChange}  
              menuProps={{  
                PaperProps: {  
                  style: {  
                    maxHeight: 48 * 4.5 + 8,  
                    width: 250,  
                  },  
                },  
              }}  
            >  
              {languages.map((language) => (  
                <MenuItem key={language} value={language} style={getStyles(language)}>  
                  {language}  
                </MenuItem>  
              ))}  
            </Select>  
          </FormControl>  
        </Grid>  
        {/* Description Field */}  
        <Grid item xs={12}>  
          <TextField  
            variant="outlined"  
            label="Description"  
            fullWidth  
            multiline  
            rows={4}  
            sx={{ mb: 2 }}  
          />  
        </Grid>  
        {/* File Upload Section */}  
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
        {/* Submit and Cancel Buttons */}  
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
                // Implement cancel logic if needed  
                setFileName('');  
                setFileUrl(null);  
                setPersonName([]); // Reset selected categories/languages  
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