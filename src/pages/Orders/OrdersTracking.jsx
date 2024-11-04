import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function OrdersTracking() {
    const location = useLocation();
    const { orderId } = location.state || {}; // Get the order ID from state
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = () => {
            if (!orderId) return; // If there is no orderId, return immediately
            try {
                const addedCartItems = JSON.parse(localStorage.getItem('AddedCart')) || [];
                const orderItem = addedCartItems.find((item) => item.id === orderId);
                if (orderItem) {
                    setOrderDetails(orderItem);
                } else {
                    setError('Order details not found in localStorage.');
                }
            } catch (err) {
                setError('Error fetching order details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '40px auto',
            padding: '40px',
            backgroundColor: '#f8f8f8',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '40px',
            fontSize: '36px',
            color: '#333',
            fontWeight: 'bold',
        },
        detail: {
            marginBottom: '25px',
            fontSize: '18px',
            color: '#555',
            lineHeight: '1.6',
        },
        trackingContainer: {
            marginTop: '40px',
            padding: '30px',
            border: '2px solid #007bff',
            borderRadius: '12px',
            backgroundColor: '#f0f8ff',
            color: '#007bff',
            fontWeight: 'bold',
        },
        image: {
            display: 'block',
            margin: '30px auto',
            maxWidth: '200px',
            height: 'auto',
            borderRadius: '12px',
        },
        photo: {
            display: 'block',
            margin: '30px auto',
            maxWidth: '400px',
            height: 'auto',
            borderRadius: '12px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Order Tracking</h1>
            {loading ? (
                <p>Loading order details...</p>
            ) : error ? (
                <p>{error}</p>
            ) : orderDetails ? (
                <>
                    <h2 style={styles.detail}>Title: {orderDetails.name}</h2>
                    <p style={styles.detail}>Author: {orderDetails.author}</p>
                    <p style={styles.detail}>Price: {orderDetails.price}</p>
                    <p style={styles.detail}>Category: {orderDetails.category}</p>
                    <p style={styles.detail}>Description: {orderDetails.description}</p>
                    <img src={orderDetails.doctypeDoc + ',' + orderDetails.img} alt={orderDetails.name} style={styles.image} />

                    {/* Tracking Status Section */}
                    <div style={styles.trackingContainer}>
                        <h3>Tracking Information</h3>
                        <p>Tracking Status: Shipped</p>
                        <p>Tracking Number: {orderDetails.id}</p>
                        <p>Expected Delivery Date: June 10, 2023</p> {/* Hardcoded expected delivery date */}
                    </div>
                </>
            ) : (<p>No order details found.</p>
            )}
        </div>
    );
}

export default OrdersTracking;

