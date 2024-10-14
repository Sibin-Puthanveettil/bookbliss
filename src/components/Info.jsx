import React from 'react';  
import clip1 from '../images/c4.png';  
import clip2 from '../images/clip1.png';  
import clip3 from '../images/c6.png';  

const Info = () => {  
  return (  
    <div style={styles.container}>  
      <Box   
        title="Read"   
        description="Discover thousands of stories, poems, articles, magazines, novels, essays, etc for free. Read popular genres. Save your favourites in your own library. Contents present in the Pratilipi library are filled with endless emotions, thoughts, verses, and possibilities."   
        src={clip1}  
      />  
      <Box   
        title="Write"   
        description="Self-publish on Pratilipi and join the largest community of writers. Create new drafts, add images and publish right from the app. Pratilipi provides a hassle free and advanced writer panel to make your act of writing a little less scary and a whole lot comforting."   
        src={clip2}  
      />  
      <Box   
        title="Get Involved"   
        description="Pratilipi brings writers and readers on a single platform. Follow authors to see what they are publishing next, review and discuss. Share your favourites with your fellow readers. Here writers can interact directly with readers and readers can often evolve into writers."   
        src={clip3}  
      />  
    </div>  
  );  
};  

const Box = ({ title, description, src }) => {  
  return (  
    <div style={styles.box}>  
      <img style={styles.clipart} src={src} alt="Clipart" />  
      <h2 style={styles.infoTitle}>{title}</h2>  
      <p style={styles.infoDescription}>{description}</p>  
    </div>  
  );  
};  

const styles = {  
  container: {  
    display: 'flex',  
    justifyContent: 'space-between',  
    padding: '20px',  
  },  
  box: {  
    backgroundColor: '#f2f4f8',  
    borderRadius: '8px',  
    padding: '20px',  
    margin: '0 10px',  
    width: '30%',  
    textAlign: 'center',  
    cursor: 'pointer',  
    transition: 'transform 0.3s ease',  
    display: 'flex', // Use flexbox for alignment  
    flexDirection: 'column', // Stack children vertically  
    alignItems: 'center', // Center horizontally  
    justifyContent: 'space-between', // Space between children  
  },  
  clipart: {  
    width: '160px',  // Set a consistent width for images  
    height: '175px', // Set a consistent height for images  
    marginBottom: '10px',  
    objectFit: 'cover', // Maintain aspect ratio and cover the area  
  },  
  infoTitle: {  
    fontSize: '18px', // Consistent font size  
    fontWeight: 'bold',  
    color: '#333',  
  },  
  infoDescription: {  
    fontSize: '14px', // Consistent font size  
    color: '#666',  
  },  
};  

// Global CSS for hover animation  
const stylesAnimation = `  
.box:hover {  
  transform: scale(1.05); /* Scale up the entire box on hover */  
}  
`;  

const GlobalStyle = () => {  
  return <style>{stylesAnimation}</style>;  
};  

const App = () => {  
  return (  
    <div>  
      <GlobalStyle />  
      <Info />  
    </div>  
  );  
};  

export default App;