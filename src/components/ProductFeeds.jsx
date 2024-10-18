import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import BookCarousel from '../components/BookCarousel';
import { useNavigate } from 'react-router-dom';
import  Banner from '../components/Banner';
import  Info from '../components/Info';

const ProductFeeds = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(8); // Number of books to display per page
    const [cart, setCart] = useState({}); // State to track added books
    const navigate = useNavigate();
    const [languages, setLanguages] = useState([]);  
   
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://localhost:44302/API/Getproductdata');
                console.log(response.data);
                setBooks(response.data);
            } catch (err) {
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);


    useEffect(() => {  
        const fetchLanguages = async () => {  
          try {  
            const response = await axios.get('https://localhost:44302/API/GetLanguage');  
            // Check if response exists and is an array  
            if (Array.isArray(response.data)) {  
              // Extract language names  
              const languageNames = response.data.map(language => language.languageName);  
              setLanguages(languageNames); // Update state with language names  
            } else {  
              console.warn("Unexpected response format:", response.data);  
            }  
          } catch (error) {  
            console.error('Error fetching languages:', error);  
          }  
        };  
    
        fetchLanguages(); // Call the function to fetch languages  
      }, []); // Empty dependency array to run only once on mount  

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        console.log('Selected Language:', language);
    };

    const handleReadClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    // Pagination logic
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddClick = (book) => {
        navigate('/login');
        setCart((prevCart) => ({
            ...prevCart,
            [book.id]: !prevCart[book.id], // Toggle the added state
        }));
    };

    if (loading) return <p style={styles.loadingText}>Loading...</p>;
    if (error) return <p style={styles.errorText}>{error}</p>;

    return (
        
        <div style={styles.container}>
             
            {/* <h1 style={styles.title}>Unleash Your Imagination: Experience Book of the Day</h1> */}

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
            {selectedLanguage && (<h4 style={styles.SelectLang}> SELECTED LANGUAGE : {selectedLanguage.toUpperCase()}</h4>
            )}

            <BookCarousel/>
            <div style={styles.gallery}>
                {currentBooks.map((book) => (
                    <div key={book.id} style={styles.bookCard}>
                        <img src={book.doctype + "," + book.img || 'https://bookshub.co.in/public/books/9788172242190.jpg'} alt={book.name} style={styles.bookImage} loading='lazy' />
                        <div style={styles.bookInfo}>
                            <h3 style={styles.bookTitle}>{book.name}</h3>
                            <p style={styles.author}>by {book.author}</p>
                            {/* <p style={styles.year}>Published: {book.id}</p> */}
                            <p style={styles.description}>{book.description}</p>
                            <p style={styles.genres}>Genres: {book.category}</p>
                            <p style={styles.price}>₹ {book.price}</p>

                            {/* Action buttons */}
                            <div style={styles.buttonContainer}>
                                <button style={styles.button} onClick={() => handleReadClick(book)}>
                                    <FontAwesomeIcon icon={faBook} style={styles.icon} /> Read
                                </button>
                                <button style={styles.button} onClick={() => navigate('/cart')}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} /> Purchase
                                </button>
                                <button style={styles.button} onClick={() => handleAddClick(book)}>
                                    <FontAwesomeIcon icon={faCartPlus} style={styles.icon}  /> {cart[book.id] ? 'Added' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div style={styles.paginationContainer}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        style={{
                            ...styles.pageButton,
                            backgroundColor: currentPage === index + 1 ? '#6a0dad' : '#22183b',
                        }}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal for iframe viewer */}
            {isModalOpen && selectedBook && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button style={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <h2 style={styles.bookTitle}>Please Purchase at  ₹ {selectedBook.price} for Full version of {selectedBook.name}</h2>
                        <iframe
                            src={selectedBook.doctype + "," + selectedBook.img } // Assuming each book has a `read_url` field  
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
        fontSize: '2em',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff',
        background: 'linear-gradient(90deg, #6a0dad, #9c27b0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        padding: '10px 0',
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
        padding: '10px 15px',
        fontSize: '0.7em',
        color: 'white',
        backgroundColor: '#a42a26',
        backgroundImage: 'linear-gradient(45deg, #a42a26, #9c27b0)',
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
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    SelectLang: {
        color: '#7b16ae',
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
        height: '350px',
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
        fontWeight: 'bold',
        fontSize: '1.5em',
        color: '#333',
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        overflow: 'auto',
        maxWidth: '100%'
    },
    pageButton: {
        padding: '10px 15px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default ProductFeeds;

