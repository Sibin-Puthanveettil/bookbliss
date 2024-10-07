import React, { useState } from 'react';
import { Snackbar, Button, Autocomplete, TextField } from '@mui/material';
import { CheckCircle } from '@mui/icons-material'; // Import an icon
import axios from 'axios'; // Import Axios

const LanguagePage = () => {
    // Static array of Indian languages
    const languageOptions = [
        "Hindi",
        "Bengali",
        "Telugu",
        "Marathi",
        "Tamil",
        "Urdu",
        "Gujarati",
        "Malayalam",
        "Kannada",
        "Odia",
        "Punjabi",
        "Assamese",
        "Maithili",
        "Santali",
        "Kashmiri",
        "Nepali",
        "Sindhi",
        "Dogri",
        "Manipuri",
        "Bodo",
        "English"
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [addedLanguages, setAddedLanguages] = useState([]); // State to hold added languages
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleAddLanguage = async () => {
        if (!selectedLanguage) {
            setSnackbarMessage('Please select a language.');
            setSnackbarOpen(true);
            return;
        }

        // Check for duplicate entries
        if (addedLanguages.includes(selectedLanguage)) {
            setSnackbarMessage('This language has already been added.');
            setSnackbarOpen(true);
            return;
        }

        try {
            // Make API call to add the language using Axios
            const response = await axios.post(`https://localhost:7042/API/AddLanguage?languageName=${selectedLanguage}`);

            if (response.data.status === 1) {
                // Add the selected language to the list
                setAddedLanguages([...addedLanguages, selectedLanguage]);
                setSnackbarMessage(`Language added: ${selectedLanguage}`);
            } else {
                setSnackbarMessage(response.data.message || 'Failed to add language.');
            }
        } catch (error) {
            setSnackbarMessage('An error occurred while adding the language.');
        } finally {
            setSnackbarOpen(true);
            setSelectedLanguage(null); // Clear the selection after adding
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={styles.languagePage}>
            <h1 style={styles.header}>Create a New Language</h1>
            <div style={styles.warningContainer}>
                <div style={styles.marquee}>
                    <span style={styles.warningText}>
                        ⚠️ Warning: Please do not add duplicate entries! ⚠️
                    </span>
                </div>
            </div>
            <div style={styles.inputContainer}>
                <Autocomplete
                    options={languageOptions}
                    getOptionLabel={(option) => option}
                    value={selectedLanguage}
                    onChange={(event, newValue) => setSelectedLanguage(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Language" variant="outlined" style={styles.languageInput} />
                    )}
                />
                <button onClick={handleAddLanguage} style={styles.addButton}>
                    Add Language
                </button>
            </div>
            {/* Display added languages */}
            <div style={styles.addedLanguagesContainer}>
                <h3>Added Languages:</h3>
                <div style={styles.languageList}>
                    {addedLanguages.map((lang, index) => (
                        <div key={index} style={styles.addedLanguageItem}>
                            <CheckCircle style={styles.icon} />
                            <span>{lang}</span>
                        </div>
                    ))}
                </div>
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
    languagePage: {
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
    languageInput: {
        width: '250px',
        margin: '10px 0',
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
    addedLanguagesContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    languageList: {
        display: 'flex',
        flexWrap: 'wrap', // Allow items to wrap to the next line
        alignItems: 'center',
        marginTop: '10px',
        justifyContent: 'center', // Center items horizontally
    },
    addedLanguageItem: {
        display: 'flex', // Use flex for alignment
        alignItems: 'center',
        backgroundColor: '#e0f7fa', // Light blue background for added languages
        borderRadius: '5px',
        padding: '10px',
        margin: '5px', // Adjust margin for spacing
        minWidth: '250px', // Set a minimum width for each item
        maxWidth: '300px', // Optional: Set a maximum width for each item
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    },
    icon: {
        color: '#007bff',
        marginRight: '10px',
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

export default LanguagePage;

