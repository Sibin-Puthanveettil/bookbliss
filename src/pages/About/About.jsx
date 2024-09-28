import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Footer from '../../components/Footer'; // Adjust the import path if needed
import { Navbar } from '../../components';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 3, py: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <hr />
        <Typography variant="body1" align="center" paragraph>
          At The Enchanted Shelf, we believe that every book holds a world of magic, waiting to be discovered. Nestled in the heart of Thrissur, Kerala, our bookstore is more than just a place to buy books—it’s a haven for book lovers, a community hub, and a sanctuary for the curious mind.
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          Our Products
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: "Men's Clothing",
              imgSrc: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
              title: "Women's Clothing",
              imgSrc: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
              title: "Jewelry",
              imgSrc: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
              title: "Electronics",
              imgSrc: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
          ].map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={product.imgSrc}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {product.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" align="center" gutterBottom sx={{ mt: 5 }}>
          Visit Us
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.2821606547873!2d76.11457659999999!3d10.3991498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7f49ea786b6f5%3A0x117573c2f22a4644!2sManappuram%20Finance%20Limited%20-%20Head%20Office!5e0!3m2!1sen!2sin!4v1727436236936!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;