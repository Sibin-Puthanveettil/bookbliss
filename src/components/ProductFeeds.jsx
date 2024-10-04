import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faBook, faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';  

const ProductFeeds = () => {  
    const [books, setBooks] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [selectedLanguage, setSelectedLanguage] = useState('');  

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
                        <img src={book.imageUrl || 'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855652.jpg'} alt={book.title} style={styles.bookImage} />  
                        <div style={styles.bookInfo}>  
                            <h3 style={styles.bookTitle}>{book.title}</h3>  
                            <p style={styles.author}>by {book.author}</p>  
                            <p style={styles.year}>Published: {book.publication_year}</p>  
                            <p style={styles.description}>{book.description}</p>  
                            <p style={styles.genres}>Genres: {book.genre.join(', ')}</p>  

                            {/* Action buttons */}  
                            <div style={styles.buttonContainer}>  
                                <button style={styles.button}>  
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
        </div>  
    );  
};  

const styles = {  
    container: {  
        textAlign: 'center',  
        padding: '20px',  
        backgroundColor: '#f4f4f4',  
        minHeight: '100vh',  
    },  
    title: {  
        color: '#333',  
        marginBottom: '20px',  
    },  
    languageButtonContainer: {  
        overflowX: 'auto', // Enable horizontal scrolling  
        whiteSpace: 'nowrap', // Prevent wrapping  
        padding: '10px 0', // Optional padding  
        marginBottom: '20px',  
    },  
    languageButtonWrapper: {  
        display: 'inline-flex', // Arrange buttons in a horizontal line  
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
        fontSize: '1.2em',  
        margin: '10px 0',  
        color: '#333',  
        fontWeight: 'bold',  
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
        fontSize: '0.8em',  
        color: 'white',  
        backgroundColor: '#333333',  
        border: 'none',  
        borderRadius: '5px',  
        cursor: 'pointer',  
        transition: 'background-color 0.3s',  
        margin: '0 5px',  
        display: 'flex',  
        alignItems: 'center',  
        width: '100%',  
        boxSizing: 'border-box',  
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
};  

export default ProductFeeds;