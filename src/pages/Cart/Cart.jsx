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
} from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    // Sample data structure
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
      <Link to="/" className="btn btn-outline-dark mx-4">
        <i className="fa fa-arrow-left"></i> Continue Shopping
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
            <Card>
              <Typography variant="h6" className="card-header">
                Item List
              </Typography>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={4}>
                        <img src={item.image} alt={item.title} width={100} />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1">
                          <strong>{item.title}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <CardActions>
                          <Button onClick={() => removeItem(item)}>-</Button>
                          <Typography>{item.qty}</Typography>
                          <Button onClick={() => addItem(item)}>+</Button>
                        </CardActions>
                        <Typography>
                          <strong>${(item.price * item.qty).toFixed(2)}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                    <hr />
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
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
                    <Typography>${shipping.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={<strong>Total amount</strong>} />
                    <Typography>
                      <strong>${(subtotal + shipping).toFixed(2)}</strong>
                    </Typography>
                  </ListItem>
                </List>
                <Link to="/checkout" className="btn btn-dark btn-lg btn-block">
                  Go to checkout
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
        <Typography variant="h4" align="center">Cart</Typography>
        <hr />
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </Container>
    </>
  );
};

export default Cart;