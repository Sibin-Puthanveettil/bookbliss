import React, { useState } from 'react';
import { Snackbar, Button } from '@mui/material';
import axios from 'axios'; // Import Axios

const Categories = () => {
    const [category, setCategory] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleInputChange = (e) => {
        setCategory(e.target.value);
    };

    const handleAddCategory = async () => {
        if (!category) {
            setSnackbarMessage('Please enter a category.');
            setSnackbarOpen(true);
            return;
        }
        
        try {
            // Make API call to add the category using Axios
            const response = await axios.post(`https://localhost:44302/API/Addcategory?categoryname=${category}`);

            if (response.data.status === 1) {
                setSnackbarMessage(`Category added: ${category}`);
                setCategory(''); // Clear the input after adding
            } else {
                setSnackbarMessage(response.data.message || 'Failed to add category.');
            }
        } catch (error) {
            setSnackbarMessage('An error occurred while adding the category.');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={styles.categoriesPage}>
            <h1 style={styles.header}>Create a New Category</h1>
            <div style={styles.warningContainer}>
                <div style={styles.marquee}>
                    <span style={styles.warningText}>
                        ⚠️ Warning: Please do not add duplicate entries! ⚠️
                    </span>
                </div>
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={category}
                    onChange={handleInputChange}
                    placeholder="Enter category name"
                    style={styles.categoryInput}
                />
                <button onClick={handleAddCategory} style={styles.addButton}>
                    Add Category
                </button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={
                    <Button color="inherit" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
            />
        </div>
    );
};

// Inline styles
const styles = {
    categoriesPage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        color: '#333',
    },
    warningContainer: {
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        backgroundColor: '#ffcccc', // Light red background for warning
        padding: '10px 0',
    },
    marquee: {
        display: 'inline-block',
        animation: 'marquee 10s linear infinite',
    },
    warningText: {
        color: 'red',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    categoryInput: {
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '250px',
        fontSize: '16px',
    },
    addButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

// CSS for marquee animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`, styleSheet.cssRules.length);

export default Categories;
