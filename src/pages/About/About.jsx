import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Footer from '../../components/Footer';
import { Navbar } from '../../components';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 3, py: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>About The Book Bliss</Typography><hr />
        <Typography variant="body1" align="center" paragraph>At The Book Bliss, we believe that every book holds a world of magic, waiting to be discovered. Nestled in the heart of Thrissur, Kerala, our bookstore is more than just a place to buy books—it's a haven for book lovers, a community hub, and a sanctuary for the curious mind.</Typography>
        <Typography variant="h5" align="center" gutterBottom>Our Book Collection</Typography>
        <Grid container spacing={3}>
          {[{ title: "Fiction", imgSrc: "https://images.squarespace-cdn.com/content/v1/5979efb7197aeafed276c1de/1588324189321-2PDOO8SM8MT1QF2NA0DG/How+to+write+a+science+fiction+story" },
          { title: "Non-Fiction", imgSrc: "https://www.slj.com/binaries/content/gallery/Jlibrary/2021/10/browsable-nonfiction-feat-img-800px.jpg" },
          { title: "Children's Books", imgSrc: "https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
          { title: "Classics", imgSrc: "https://m.media-amazon.com/images/I/91-RdlKP-qL._AC_UF1000,1000_QL80_.jpg" }]

            .map((book, index) =>

            (<Grid item xs={12} sm={6} md={3} key={index}><Card elevation={3}
              sx={{ borderRadius: 2 }}>
              <CardMedia component="img" height="160" image={book.imgSrc} alt={book.title} />
              <CardContent><Typography variant="h6" align="center">{book.title}</Typography>
              </CardContent></Card></Grid>))}</Grid>
        <Typography variant="h5" align="center" gutterBottom sx={{ mt: 5 }}>Visit Us</Typography>
        <Grid container justifyContent="center"><Grid item xs={12} md={8}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.2821606547873!2d76.11457659999999!3d10.3991498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7f49ea786b6f5%3A0x117573c2f22a4644!2sManappuram%20Finance%20Limited%20-%20Head%20Office!5e0!3m2!1sen!2sin!4v1727436236936!5m2!1sen!2sin" width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></Grid></Grid></Container><Footer /></>
  );
};

export default AboutPage;
