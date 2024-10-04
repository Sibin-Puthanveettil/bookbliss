import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import './ProductFeeds.css'; // Import styles (adjust if necessary)  

const ProductFeeds = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const languages = [
        'English',
        'Hindi',
        'Bengali',
        'Marathi',
        'Tamil',
        'Telugu',
        'Gujarati',
        'Malayalam',
        'Kannada',
        'Odia',
        'Punjabi',
        'Assamese',
        'Maithili',
        'Urdu',
        'Manipuri',
        'Dogri',
        'Sanskrit',
        'Santali',
        'Konkani',
        'Nepali',
        'Bodo',
        'Sindhi',
        'Rajasthani',
        'Marwari'
    ];

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://freetestapi.com/api/v1/books');
                setBooks(response.data);
            } catch (err) {
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        console.log('Selected Language:', language);
    };

    // Open modal with selected book's URL  
    const handleReadClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    // Close modal  
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    if (loading) return <p style={styles.loadingText}>Loading...</p>;
    if (error) return <p style={styles.errorText}>{error}</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Unleash Your Imagination: Experience Book of the Day</h1>

            {/* Language Buttons */}
            <div style={styles.languageButtonContainer}>
                <div style={styles.languageButtonWrapper}>
                    {languages.map((language) => (
                        <button
                            key={language}
                            style={styles.languageButton}
                            onClick={() => handleLanguageSelect(language)}
                        >
                            {language}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.gallery}>
                {books.map((book) => (
                    <div key={book.id} style={styles.bookCard}>
                        <img src={book.imageurl || 'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855652.jpg'} alt={book.title} style={styles.bookImage} loading='lazy' />
                        <div style={styles.bookInfo}>
                            <h3 style={styles.bookTitle}>{book.title}</h3>
                            <p style={styles.author}>by {book.author}</p>
                            <p style={styles.year}>Published: {book.publication_year}</p>
                            <p style={styles.description}>{book.description}</p>
                            <p style={styles.genres}>Genres: {book.genre.join(', ')}</p>
                            <p style={styles.price}>₹ 299 /- {book.price}</p> {/* Added price here */}

                            {/* Action buttons */}
                            <div style={styles.buttonContainer}>
                                <button style={styles.button} onClick={() => handleReadClick(book)}>
                                    <FontAwesomeIcon icon={faBook} style={styles.icon} /> Read
                                </button>
                                <button style={styles.button}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} /> Purchase
                                </button>
                                <button style={styles.button}>
                                    <FontAwesomeIcon icon={faCartPlus} style={styles.icon} /> Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Modal for iframe viewer */}
            {isModalOpen && selectedBook && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button style={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <iframe
                            src={'https://english.pratilipi.com/read/my-brother-ki-dulhan-my-brother-ki-dulhan-qpijgp9qgsww-g785688b193y44n?redirectTo=%2Fseries%2Fmy-brother-ki-dulhan-completed-by-s-d-otsix63fzh0f'} // Assuming each book has a `read_url` field  
                            title={selectedBook.title}
                            style={styles.iframe}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: '2em',  // Increased font size for prominence  
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'bold',  // Makes the font bold  
        color: '#ffffff',    // White color for visibility  
        background: 'linear-gradient(90deg, #6a0dad, #9c27b0)', // Gradient background  
        WebkitBackgroundClip: 'text', // Clips the background to the text  
        WebkitTextFillColor: 'transparent', // Makes the text fill transparent to show the gradient  
        letterSpacing: '2px',  // Increases the spacing between letters  
        textTransform: 'uppercase', // Transforms the text to uppercase for a bold look  
        padding: '10px 0',     // Adds some padding around the header  
    },
    languageButtonContainer: {
        whiteSpace: 'nowrap',
        padding: '10px 0',
        marginBottom: '20px',
        overflow: 'auto'
    },
    languageButtonWrapper: {
        display: 'inline-flex',
    },
    languageButton: {
        padding: '10px',
        fontSize: '1em',
        margin: '5px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#22183b',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        overflow: 'hidden', // or 'auto', depending on your requirements  
        maxWidth: '100%',
        textOverflow: 'ellipsis', // Optional: Use ellipsis if the text overflows  
        whiteSpace: 'nowrap', // Optional: Prevents wrapping to a new line  
    },
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    bookCard: {
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        textAlign: 'left',
        position: 'relative',
        padding: '10px',
        cursor: 'pointer',
    },
    bookImage: {
        width: '100%',
        height: 'auto',
        borderBottom: '2px solid #eaeaea',
    },
    bookInfo: {
        padding: '10px',
    },
    bookTitle: {
        fontSize: '1em',
        margin: '10px 0',
        color: 'transparent',
        background: 'linear-gradient(90deg, #6a0dad, #333333)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        transition: 'transform 0.2s',
    },
    author: {
        fontSize: '1em',
        color: '#555',
        margin: '5px 0',
    },
    year: {
        fontSize: '0.9em',
        color: '#777',
    },
    description: {
        fontSize: '0.85em',
        color: '#666',
        marginTop: '10px',
    },
    genres: {
        fontSize: '0.85em',
        color: '#888',
        marginTop: '5px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '10px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '0.7em',
        color: 'white',
        backgroundColor: '#444',
        backgroundImage: 'linear-gradient(45deg, #6a2c91, #9c27b0)',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.3s',
        margin: '0 5px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    icon: {
        marginRight: '5px',
    },
    loadingText: {
        fontSize: '1.5em',
    },
    errorText: {
        color: 'red',
        fontSize: '1.5em',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        position: 'relative',
        width: '80%',
        maxWidth: '600px',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        background: 'none',
        fontSize: '1.5em',
        cursor: 'pointer',
    },
    iframe: {
        width: '100%',
        height: '400px',
        border: 'none',
    },

    price: {
        fontWeight: 'bold', // Make the text bold
        fontSize: '1.2em',  // Optional: Adjust the font size
        color: '#333',      // Optional: Change the color if needed
    },
};

export default ProductFeeds;