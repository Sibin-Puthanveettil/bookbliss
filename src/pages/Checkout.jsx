import React, { useState } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Checkout = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Product 1",
      price: 20.0,
      qty: 1,
    },
    {
      id: 2,
      title: "Product 2",
      price: 30.0,
      qty: 2,
    },
  ]);

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
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item md={5}>
            <Card>
              <Typography variant="h6" className="card-header">
                Order Summary
              </Typography>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary={`Products (${totalItems})`} />
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Shipping" />
                    <Typography>${shipping}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<strong>Total amount</strong>} />
                    <Typography>
                      <strong>${(subtotal + shipping).toFixed(2)}</strong>
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={7}>
            <Card>
              <Typography variant="h6" className="card-header">
                Billing Address
              </Typography>
              <CardContent>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        type="email"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address 2 (Optional)"
                        fullWidth
                      />
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
                      <TextField
                        label="Zip"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Payment</Typography>
                      <TextField
                        label="Name on card"
                        required
                        fullWidth
                      />
                      <TextField
                        label="Credit card number"
                        required
                        fullWidth
                      />
                      <TextField
                        label="Expiration"
                        required
                        fullWidth
                      />
                      <TextField
                        label="CVV"
                        required
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    style={{ marginTop: 16 }}
                    disabled
                  >
                    Continue to checkout
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
        <Typography variant="h4" align="center">Checkout</Typography>
        <hr />
        {cartItems.length ? <ShowCheckout /> : <EmptyCart />}
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;