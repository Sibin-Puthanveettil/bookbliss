import React from 'react';  

const App = () => {  
    const books = [  
        {  
            title: "Book Title 1",  
            description: "This is a brief description of Book Title 1.",  
            image: "https://via.placeholder.com/300" // Placeholder image URL  
        },  
        {  
            title: "Book Title 2",  
            description: "This is a brief description of Book Title 2.",  
            image: "https://via.placeholder.com/300"  
        },  
        {  
            title: "Book Title 3",  
            description: "This is a brief description of Book Title 3.",  
            image: "https://via.placeholder.com/300"  
        },  
        {  
            title: "Book Title 4",  
            description: "This is a brief description of Book Title 4.",  
            image: "https://via.placeholder.com/300"  
        },  
    ];  

    return (  
        <div style={styles.app}>  
            <h1 style={styles.title}>Book Information</h1>  
            {books.map((book, index) => (  
                <div   
                    key={index}   
                    style={{   
                        ...styles.bookItem,   
                        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'   
                    }}  
                    onMouseEnter={e => e.currentTarget.style.boxShadow = styles.bookItemHover.boxShadow}  
                    onMouseLeave={e => e.currentTarget.style.boxShadow = styles.bookItem.boxShadow}  
                >  
                    <div style={styles.bookText}>  
                        <h2 style={styles.bookTitle}>{book.title}</h2>  
                        <p>{book.description}</p>  
                    </div>  
                    <div style={styles.bookImage}>  
                        <img src={'https://bookshub.co.in/public/books/9788172242190.jpg'} alt={book.title} style={styles.image} />  
                    </div>  
                </div>  
            ))}  
        </div>  
    );  
};  

// Styles  
const styles = {  
    app: {  
        fontFamily: 'Arial, sans-serif',  
        margin: 0,  
        padding: '20px',  
        backgroundColor: '#f5f5f5',  
        maxWidth: '100%', // Make it full width  
        boxSizing: 'border-box',  
    },  
    title: {  
        textAlign: 'center',  
        color: '#333',  
        marginBottom: '30px',  
        fontSize: '2.5rem',  
    },  
    bookItem: {  
        display: 'flex',  
        alignItems: 'center',  
        margin: '20px 0',  
        backgroundColor: '#fff',  
        border: '1px solid #e0e0e0',  
        borderRadius: '8px',  
        overflow: 'hidden',  
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
        transition: 'box-shadow 0.3s ease',  
    },  
    bookItemHover: {  
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',  
    },  
    bookText: {  
        flex: 1,  
        padding: '20px',  
        transition: 'transform 0.3s ease',  
    },  
    bookTitle: {  
        margin: '0 0 10px 0',  
        color: '#007BFF', // Add a color to the title  
    },  
    bookImage: {  
        maxWidth: '150px',  
        borderRadius: '0 8px 8px 0',  
    },  
    image: {  
        width: '100%', // Responsive image  
        height: 'auto',  
        borderRadius: '8px',  
        transition: 'transform 0.3s ease',  
    },  
};  

// Adding hover scale effect on image  
const handleMouseEnterImage = (e) => {  
    e.currentTarget.style.transform = 'scale(1.1)';  
}  

const handleMouseLeaveImage = (e) => {  
    e.currentTarget.style.transform = 'scale(1)';  
}  

export default function Root() {  
    return (  
        <div>  
            <App />  
        </div>  
    );  
}