import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, styled } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import sitelogo from '../LOGO 2.png';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
  },
}));

const Footer = () => {
  return (
    <FooterContainer component="footer" sx={{ backgroundColor: '#294769' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              <b>Welcome to Book Bliss !!!!</b>
              <br />
              At The Enchanted Shelf, we believe that every book holds a world of magic, waiting to be discovered. Nestled in the heart of Thrissur, Kerala, our bookstore is more than just a place to buy books—it’s a haven for book lovers, a community hub, and a sanctuary for the curious mind.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <FooterLink href="#" variant="body2" display="block">Home</FooterLink>
              <FooterLink href="#" variant="body2" display="block">Products</FooterLink>
              <FooterLink href="#" variant="body2" display="block">Services</FooterLink>
              <FooterLink href="#" variant="body2" display="block">Contact</FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Main Street<br />
              Anytown, USA 12345<br />
              Email: info@example.com<br />
              Phone: (123) 456-7890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <SocialIcon aria-label="Facebook" component="a" href="https://facebook.com">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon aria-label="Twitter" component="a" href="https://twitter.com">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon aria-label="Instagram" component="a" href="https://instagram.com">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon aria-label="LinkedIn" component="a" href="https://linkedin.com">
                <FaLinkedin />
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            <img src={sitelogo} width={150} /><br />
            © {new Date().getFullYear()}   All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

