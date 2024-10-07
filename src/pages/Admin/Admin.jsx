import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate(); // Hook to access the navigate function

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div style={styles.adminContainer}>
            <h1 style={styles.adminTitle}>Admin Dashboard</h1>
           
            <div style={styles.buttonContainer}>
                <button style={styles.adminButton} onClick={() => handleNavigation('/Categories')}>
                    Add Categories
                </button>
                <button style={styles.adminButton} onClick={() => handleNavigation('/LanguagePage')}>
                    Add Language
                </button>
                <button style={styles.adminButton} onClick={() => handleNavigation('/addbook')}>
                    Add Books
                </button>
            </div>

            <div style={styles.warningContainer}>
                <div style={styles.marquee}>
                    <span style={styles.warningText}>
                        ⚠️ Warning: Please check every entries before add, Make sure that products or data are proper and purchased! ⚠️
                    </span>
                </div>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    adminContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
    },
    adminTitle: {
        fontSize: '2.5rem',
        marginBottom: '20px',
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
    buttonContainer: {
        display: 'flex',
        gap: '20px', // Space between buttons
    },
    adminButton: {
        padding: '15px 30px',
        fontSize: '1.2rem',
        color: 'white',
        backgroundColor: '#4a4a4a', // Dark grey color
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    },
};

// Adding hover effect using JavaScript
const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#333'; // Darker grey on hover
    e.target.style.transform = 'scale(1.05)'; // Slightly enlarge on hover
};

const handleMouseOut = (e) => {
    e.target.style.backgroundColor = styles.adminButton.backgroundColor; // Reset color
    e.target.style.transform = 'scale(1)'; // Reset scale
};

// Adding event listeners to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('mouseover', handleMouseOver);
    button.addEventListener('mouseout', handleMouseOut);
});

// CSS for marquee animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
`, styleSheet.cssRules.length);

export default Admin;
