import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { json, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve the items from localStorage
    const addedCart = localStorage.getItem("AddedCart");
    if (addedCart) {
      const products = JSON.parse(addedCart);
      // Ensure products is an array
      const productsArray = Array.isArray(products) ? products : [products];

      // Create a new cartItems array without duplicates
      const updatedCartItems = productsArray.reduce((acc, product) => {
        const existingItem = acc.find(item => item.id === product.id);
        if (existingItem) {
          // If it exists, update the quantity
          existingItem.qty += 1;
        } else {
          // If it doesn't exist, add it to the cart with a quantity of 1
          acc.push({ ...product, qty: 1 });
        }
        return acc;
      }, []);

      setCartItems(updatedCartItems);
    }
  }, []); // Empty dependency array to run only once on mount

  const addItem = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.id === product.id ? { ...item, qty: Math.max(item.qty - 1, 0) } : item
    );
    setCartItems(updatedCart.filter((item) => item.qty > 0));
  };

  const EmptyCart = () => (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Your Cart is Empty
      </Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" color="primary">
          <ShoppingCartIcon /> Continue Shopping
        </Button>
      </Link>
    </Container>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const PriceList={
      subtotal:subtotal,
      totalItems,totalItems
    }


    localStorage.setItem('PriceList', JSON.stringify(PriceList));

    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ padding: 2, bgcolor: '#1976d2', color: 'white', borderRadius: '2px 2px 0 0' }}>
                Item List
              </Typography>
              <CardContent>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 2 }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={4}>
                        <img src={item.doctype + "," + item.img} alt={item.name} width={100} style={{ borderRadius: '8px' }} />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2">{item.description}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <CardActions>
                          <Button onClick={() => removeItem(item)} sx={{ minWidth: 0, color: '#d32f2f' }}>
                            <RemoveIcon />
                          </Button>
                          <Typography>{item.qty}</Typography>
                          <Button onClick={() => addItem(item)} sx={{ minWidth: 0, color: '#4caf50' }}>
                            <AddIcon />
                          </Button>
                        </CardActions>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          ₹{(item.price * item.qty).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ padding: 2, bgcolor: '#1976d2', color: 'white', borderRadius: '2px 2px 0 0' }}>
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
                    <Typography>₹{shipping.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<strong>Total amount</strong>} />
                    <Typography>
                      <strong>₹{(subtotal + shipping).toFixed(2)}</strong>
                    </Typography>
                  </ListItem>
                </List>
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Go to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  };

  return (
    <>
      <Container className="my-3 py-3">
        <Typography variant="h4" align="center" gutterBottom>
          Cart
        </Typography>
        <hr />
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </Container>
    </>
  );
};

export default Cart;
