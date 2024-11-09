import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles  
import { Container, Typography, Box, Modal, Button } from '@mui/material';
import artic1 from '../images/artic.jpg';
import tourist from '../images/tourist.jpg';
import traveling from '../images/traveling.jpg';

const BookCarousel = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000); // Show modal after 2 seconds  

    return () => clearTimeout(timer); // Cleanup timer on unmount  
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  // New arrivals data  
  const newArrivals = [
    { img: 'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855652.jpg', title: "Horry Potter", author: "J. K. Rowling" },
    { img: 'https://m.media-amazon.com/images/I/91j1X1QhvpL._AC_UF1000,1000_QL80_.jpg', title: "Interstellar", author: " Christopher Nolan" },
    { img: 'https://kms.jadaliyya.com/content/jad_export_content_images/var/www/sites/jadaliyya/content_images/fck_images/Goat%20Days_Malayalam_Aadujeevitam_Cover.jpg', title: "Aadujeevitham", author: "Benyamin" },
  ];

  return (
    <Container
      sx={{
        padding: '40px',
        // backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        marginTop: '20px'
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'transparent', // Make text color transparent
          background: 'linear-gradient(to right, #800080, #4B0082)', // Define your gradient colors (purple to dark purple)
          backgroundClip: 'text', // Clip the background to the text
          WebkitBackgroundClip: 'text', // For Safari compatibility
          textTransform: 'uppercase',
          letterSpacing: '1px',
          padding: '10px 0',
          animation: 'blink 1.5s infinite' // Apply blinking animation  
        }}
      >
        Best Travel Books Of All Time
      </Typography>

      <style>
        {`  
          @keyframes blink {  
            0%, 100% {  
              opacity: 1;  
            }  
            50% {  
              opacity: 0.5;  
            }  
          }  
          
          @keyframes blink-color {  
            0% {  
              color: red;  
            }  
            50% {  
              color: yellow;  
            }  
            100% {  
              color: blue;  
            }  
          }  
        `}
      </style>

      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true} // Enable auto play  
        interval={3000} // Duration between slides in milliseconds (3 seconds)  
        transitionTime={500} // Transition duration in milliseconds  
        emulateTouch={true} // Enable touch support for mobile devices  
      >
        {[
          { img: artic1, title: "Arctic Dreams, Barry Lopez (1986)", description: "Imagination and Desire in a Northern Landscape is a 1986 nonfiction book by Barry Lopez. It won the National Book Award for Nonfiction, the Christopher Medal, a Pacific Northwest Booksellers Association Award, and an Oregon Book Award for literary nonfiction." },
          { img: tourist, title: "A Tourist in the Arab Spring", description: "While everyone else was pressing their way out, Tom Chesshyre was booking his ticket in to experience the Arab Spring revolutions as a tourist. With no political agenda, he journeyed to Tunisia, Libya, and Egypt to explore and to see popular tourist attractions." },
          { img: traveling, title: "A Good Girl’s Guide to Getting Lost", description: "Rachel Friedman’s coming-of-age memoir reminds us to live for the moment. In an effort to prolong 'adulting', the straight-laced good girl surprises everyone when she books a trip to Ireland on a whim." }
        ].map((book, index) => (
          <div key={index} style={{ position: 'relative', height: '500px' }}>
            <img src={book.img} alt={`Slide ${index + 1}`} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for better readability  
                padding: '20px',
                borderRadius: '10px',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)', // Darker on hover  
                }
              }}
            >
              <Typography variant="h4">{book.title}</Typography>
              <Typography variant="body1" sx={{ marginTop: '10px' }}>
                {book.description}
              </Typography>
            </Box>
          </div>
        ))}
      </Carousel>

      {/* Modal for New Arrivals */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="new-arrivals-title"
        aria-describedby="new-arrivals-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%', // Set width to 60% for a smaller modal  
            bgcolor: 'white',
            borderRadius: '10px',
            boxShadow: 24,
            p: 3 // Adjust padding for a more compact look  
          }}
        >
          <Typography
            id="new-arrivals-title"
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              animation: 'blink-color 1.5s infinite', // Apply blinking color animation  
            }}
          >
            New Arrivals
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {newArrivals.map((book, index) => (
              <Box key={index} sx={{ textAlign: 'center', margin: '10px' }}>
                <img
                  src={book.img}
                  alt={`New Arrival ${index + 1}`}
                  style={{ width: '100%', maxWidth: '150px' }}
                />
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">{book.author}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{
                padding: '10px 20px',
                backgroundColor: '#3f51b5', // Primary color  
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#303f9f', // Darker shade on hover  
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default BookCarousel;