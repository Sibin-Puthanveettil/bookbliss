import React, { useEffect, useState } from 'react';  
import { useLocation } from 'react-router-dom';  
import axios from 'axios';  

function OrdersTracking() {  
    const location = useLocation();  
    const { orderId } = location.state || {}; // Get the order ID from state  
    const [orderDetails, setOrderDetails] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState('');  

    useEffect(() => {  
        const fetchOrderDetails = async () => {  
            if (!orderId) return; // If there is no orderId, return immediately  
            try {  
                const response = await axios.get(`https://freetestapi.com/api/v1/books/${orderId}`);  
                setOrderDetails(response.data);  
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
            margin: '20px',  
            padding: '20px',  
            backgroundColor: '#f8f9fa',  
            borderRadius: '8px',  
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  
        },  
        title: {  
            textAlign: 'center',  
            marginBottom: '20px',  
            fontSize: '26px',  
            color: '#343a40',  
        },  
        detail: {  
            marginBottom: '10px',  
        },  
        trackingContainer: {  
            marginTop: '20px',  
            padding: '15px',  
            border: '2px solid #007bff',  
            borderRadius: '5px',  
            backgroundColor: '#e7f3ff',  
            color: '#0c5460',  
            fontWeight: 'bold',  
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
                    <h2 style={styles.detail}>Title: {orderDetails.title}</h2>  
                    <p style={styles.detail}>Author: {orderDetails.author}</p>  
                    <p style={styles.detail}>Publication Year: {orderDetails.publication_year}</p>  
                    <p style={styles.detail}>Genre: {orderDetails.genre.join(', ')}</p>  
                    <p style={styles.detail}>Description: {orderDetails.description}</p>  
                    <img src={'https://getmybooks.sgp1.cdn.digitaloceanspaces.com/images/33634959_1.jpg'} alt={orderDetails.title} style={{ width: '100px', height: '150px' }} />  

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