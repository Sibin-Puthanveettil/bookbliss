import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { Payment } from "@mui/icons-material";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const shipping = 30.0; // Fixed shipping cost
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar

  useEffect(() => {
    const addedCart = localStorage.getItem("AddedCart");
    if (addedCart) {
      const products = JSON.parse(addedCart);
      const productsArray = Array.isArray(products) ? products : [products];
      setCartItems(productsArray);
    }

    const priceList = localStorage.getItem("PriceList");
    if (priceList) {
      const priceData = JSON.parse(priceList);
      setSubtotal(priceData.subtotal || 0);
      setTotalItems(priceData.totalItems || 0);
    }
  }, []);

  const clearCart = () => {
    localStorage.removeItem("AddedCart");
    localStorage.removeItem("PriceList");
    setCartItems([]);
    setSubtotal(0);
    setTotalItems(0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    localStorage.setItem("purchase", JSON.stringify({ purchase: true }));
    setOpenSnackbar(true);
  };

  const EmptyCart = () => (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        No items in Cart
      </Typography>
      <Link to="/" className="btn btn-outline-dark mx-4">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </Container>
  );

  const ShowCheckout = () => {
    return (
      <Container>
        <Link to="/cart" style={{ textDecoration: 'none', marginBottom: '16px' }}>
          <Button variant="outlined" color="default">
            Back to Cart
          </Button>
        </Link>
        <Grid container spacing={3}>
          <Grid item md={5}>
            <Card elevation={3}>
              <Typography variant="h6" className="card-header" style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                Order Summary
              </Typography>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary={`Products (${totalItems})`} />
                    <Typography>₹{subtotal.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Shipping" />
                    <Typography>₹{shipping}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<strong>Total amount</strong>} />
                    <Typography>
                      <strong>₹{(subtotal + shipping).toFixed(2)}</strong>
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={7}>
            <Card elevation={3}>
              <Typography variant="h6" className="card-header" style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                Billing Address
              </Typography>
              <CardContent>
                <form onSubmit={handleCheckout}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="First Name" required fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Last Name" required fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Email" type="email" required fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Address" required fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Address 2 (Optional)" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Country</InputLabel>
                        <Select defaultValue="">
                          <MenuItem value="">Choose...</MenuItem>
                          <MenuItem value="India">India</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>State</InputLabel>
                        <Select defaultValue="">
                          <MenuItem value="">Choose...</MenuItem>
                          <MenuItem value="Punjab">Punjab</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Zip" required fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" style={{ marginTop: '16px' }}>Payment</Typography>
                      {/* Payment Mode Selection */}
                      <FormControl component="fieldset" required style={{ marginBottom: '16px' }}>
                        <RadioGroup
                          
                          
                        >
                          <FormControlLabel
                            value="credit-card"
                            control={<Radio />}
                            label="Credit Card"
                          />
                          <FormControlLabel
                            value="paypal"
                            control={<Radio />}
                            label="PayPal"
                          />
                          <FormControlLabel
                            value="bank-transfer"
                            control={<Radio />}
                            label="Bank Transfer"
                          />
                        </RadioGroup>
                      </FormControl>
                      <TextField
                        label="Name on card"
                        required
                        fullWidth
                        style={{ marginBottom: '16px' }}
                      />
                      <TextField
                        label="Credit card number"
                        required
                        fullWidth
                        style={{ marginBottom: '16px' }}
                      />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Expiration"
                            required
                            fullWidth
                            style={{ marginBottom: '16px' }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="CVV"
                            required
                            fullWidth
                            style={{ marginBottom: '16px' }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    style={{ marginTop: 16, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
                  >
                    <Payment style={{ marginRight: '8px' }} /> Continue to Checkout
                  </Button>
                  {/* Cancel Purchase Button */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={clearCart}
                    style={{ marginTop: 16 }}
                  >
                    Cancel Purchase
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  };

  return (
    <>
      <Navbar />
      <Container className="my-3 py-3">
        <Typography variant="h4" align="center" gutterBottom>Checkout</Typography>
        <hr />
        {cartItems.length ? <ShowCheckout /> : <EmptyCart />}
      </Container>
      <Footer />
      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Purchase successful!"
      />
    </>
  );
};

export default Checkout;

