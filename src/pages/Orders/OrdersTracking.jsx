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
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '32px',
            color: '#333',
        },
        detail: {
            marginBottom: '20px',
            fontSize: '16px',
            color: '#555',
        },
        trackingContainer: {
            marginTop: '30px',
            padding: '20px',
            border: '2px solid #007bff',
            borderRadius: '8px',
            backgroundColor: '#f0f8ff',
            color: '#007bff',
            fontWeight: 'bold',
        },
        image: {
            display: 'block',
            margin: '20px auto',
            maxWidth: '150px',
            height: 'auto',
        },
        photo: {
            display: 'block',
            margin: '20px auto',
            maxWidth: '300px',
            height: 'auto',
            borderRadius: '8px',
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
                    <img src={orderDetails.doctypeDoc+','+orderDetails.img} alt={orderDetails.name} style={styles.image} />

                    {/* Tracking Status Section */}
                    <div style={styles.trackingContainer}>
                        <h3>Tracking Information</h3>
                        <p>Tracking Status: Shipped</p>
                        <p>Tracking Number: {orderDetails.id}</p>
                        <p>Expected Delivery Date: June 10, 2023</p> {/* Hardcoded expected delivery date */}
                    </div>
                </>
            ) : (
                <p>No order details found.</p>
            )}
        </div>
    );
}


export default OrdersTracking;
