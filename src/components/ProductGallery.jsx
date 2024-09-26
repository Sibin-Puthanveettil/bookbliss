import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    toast.success(`${product.title} added to cart!`);
  };

  const handleBuyNow = (product) => {
    toast.success(`Navigating to buy ${product.title}!`);
    // Add your buy now logic here, e.g., navigate to a detailed product page
  };

  const filteredProducts = filter === 'All' ? products : products.filter((p) => p.category === filter);

  const categories = ['All', "men's clothing", "women's clothing", 'jewelery', 'electronics'];

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Product Gallery
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="outlined"
            onClick={() => setFilter(cat)}
            style={{ margin: '0 5px' }}
          >
            {cat}
          </Button>
        ))}
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia component="img" height="300" image={product.image} alt={product.title} />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description.substring(0, 60)}...
                  </Typography>
                  <Typography variant="h5">${product.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    style={{ marginRight: '10px',backgroundColor:'black'}} // Add margin for spacing
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBuyNow(product)}
                    style={{backgroundColor:'black'}}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Toaster />
    </Container>
  );
};

export default ProductGallery;