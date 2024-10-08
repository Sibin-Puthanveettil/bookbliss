import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Product 1",
      image: "https://via.placeholder.com/100",
      price: 20.0,
      qty: 1,
    },
    {
      id: 2,
      title: "Product 2",
      image: "https://via.placeholder.com/100",
      price: 30.0,
      qty: 2,
    },
  ]);

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
                        <img src={'https://bookshub.co.in/public/books/9788172242190.jpg'} alt={item.title} width={100} style={{ borderRadius: '8px' }} />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.title}
                        </Typography>
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
                          ${(item.price * item.qty).toFixed(2)}
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
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Shipping" />
                    <Typography>${shipping.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<strong>Total amount</strong>} />
                    <Typography>
                      <strong>${(subtotal + shipping).toFixed(2)}</strong>
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

