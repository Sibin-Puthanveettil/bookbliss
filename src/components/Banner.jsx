import React from 'react';

const Banner = () => {
  return (
    <div style={styles.banner}>
      <h2 style={styles.typingAnimation}>Books Bliss is India's largest digital platform connecting readers and writers in Multi Indian languages</h2>
      <img 
        src="https://www.pratilipi.com/images/home-main.webp" 
        alt="Banner" 
        style={styles.image} // Makes the image responsive
      />
    </div>
  );
}

const styles = {
  banner: {
    textAlign: 'center', // Center the text
    padding: '20px', // Padding
  },
  image: {
    width: '100%', // Responsive width
    height: 'auto', // Maintain aspect ratio
  },
  typingAnimation: {
    display: 'inline-block', // Make the text inline-block for animation
    color: '#333', // Text color
    fontSize: '24px', // Font size
    overflow: 'hidden', // Ensures the text is hidden during animation
    whiteSpace: 'nowrap', // Prevents text wrapping
    borderRight: '4px solid', // Creates a cursor effect
    width: '0', // Start with width 0 for animation
    animation: 'typing 5s steps(40, end) infinite, blink-caret 0.75s step-end infinite', // Endless animation for typing and blinking cursor
  },
};

// Adding CSS keyframes for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: black; }
}`, styleSheet.cssRules.length);

export default Banner;
