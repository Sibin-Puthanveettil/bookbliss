import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Container, Typography } from '@mui/material';
import artic1 from '../images/artic.jpg';
import tourist from '../images/tourist.jpg';
import traveling from '../images/traveling.jpg'
const BookCarousel = () => {
  return (
    <Container>  
    <h2>Best Travel Books Of All Time</h2>  
  
    <Carousel   
      showArrows={true}   
      showThumbs={false}   
      infiniteLoop={true}   
      autoPlay={true} // Enable auto play  
      interval={3000} // Duration between slides in milliseconds (5 seconds)  
      transitionTime={500} // Transition duration in milliseconds  
    >  
      <div style={{ position: 'relative' }}>  
        <img src={artic1} alt="Slide 1" />  
        <div style={{  
          position: 'absolute',  
          top: '50%',  
          left: '50%',  
          transform: 'translate(-50%, -50%)',  
          color: 'white',  
          textAlign: 'center',  
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability  
          padding: '10px',  
          borderRadius: '5px'  
        }}>  
          <Typography variant="h3">Arctic Dreams, Barry Lopez (1986)</Typography>  
          <p> "Imagination and Desire in a Northern Landscape is a 1986 nonfiction book by Barry Lopez. It won the National Book Award for Nonfiction, the Christopher Medal, a Pacific Northwest Booksellers Association Award, and an Oregon Book Award for literary nonfiction " </p>  
        </div>  
      </div>  
      <div style={{ position: 'relative' }}>  
        <img src={tourist} alt="Slide 2" />  
        <div style={{  
          position: 'absolute',  
          top: '50%',  
          left: '50%',  
          transform: 'translate(-50%, -50%)',  
          color: 'white',  
          textAlign: 'center',  
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability  
          padding: '10px',  
          borderRadius: '5px'  
        }}>  
          <Typography variant="h3">A Tourist in the Arab Spring</Typography>  
          <p> "While everyone else was pressing their way out, Tom Chesshyre was booking his ticket in to experience the Arab Spring revolutions as a tourist. With no political agenda, he journeyed to Tunisia, Libya, and Egypt to explore and to see popular tourist attractions. In this humorous and touching story, Chesshyre was excited by the energy of the people and their willingness to take time and talk with him"  </p>  
        </div>  
      </div>  
      <div style={{ position: 'relative' }}>  
        <img src={traveling} alt="Slide 3" />  
        <div style={{  
          position: 'absolute',  
          top: '50%',  
          left: '50%',  
          transform: 'translate(-50%, -50%)',  
          color: 'white',  
          textAlign: 'center',  
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability  
          padding: '10px',  
          borderRadius: '5px'  
        }}>  
          <Typography variant="h3">A Good Girl’s Guide to Getting Lost</Typography>  
          <p> "Rachel Friedman’s coming-of-age memoir reminds us to live for the moment. In an effort to prolong “adulting”, the straight-laced good girl surprises everyone when she books a trip to Ireland on a whim. Encouraged by an adventurous Australian, she continues to discover more about herself as she takes a year-long journey that spans three continents" </p>  
        </div>  
      </div>  
    </Carousel>  
  </Container>
  );
};

export default BookCarousel;