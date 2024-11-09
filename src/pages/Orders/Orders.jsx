import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch books from API
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://freetestapi.com/api/v1/books');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();

        // Retrieve order details from local storage
        const storedOrders = localStorage.getItem('AddedCart');
        if (storedOrders) {
            const parsedOrders = JSON.parse(storedOrders);
            setOrders(parsedOrders); // Update state with orders from local storage
        }
    }, []);

    const handleOrderClick = (orderId) => {
        navigate('/OrdersTracking', { state: { orderId } }); // Pass only the order ID  
    };

    const styles = {
        container: { margin: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' },
        title: { textAlign: 'center', marginBottom: '20px', fontSize: '26px', color: '#343a40' },
        card: { margin: '10px 0', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', transition: 'transform 0.2s, background-color 0.2s', cursor: 'pointer', display: 'flex', alignItems: 'center' },
        cardHover: { backgroundColor: '#e6e6fa' },
        orderDetails: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 },
        image: { width: '80px', height: '120px', marginRight: '15px', borderRadius: '4px' },
        orderButton: { backgroundColor: '#800080', color: '#ffffff', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.2s', marginTop: '10px' },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Your Orders</h1>
           
            {orders!=null ? (
                orders.map(order => (
                    <div
                        key={order.id}
                        style={styles.card}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = styles.cardHover.backgroundColor)}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = styles.card.backgroundColor)}
                    >
                        <img src={order.doctype+","+order.img} alt={order.name} style={styles.image} />
                        <div style={styles.orderDetails}>
                            <div>
                                <h3>{order.name}</h3>
                                <p>Author: {order.author}</p>
                                <p>Price: ${order.price}</p>
                                <p>Category: {order.category}</p>
                                <p>Description: {order.description}</p>
                                <button
                                    style={styles.orderButton}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click  
                                        handleOrderClick(order.id); // Pass the order ID  
                                    }}
                                >
                                    Track Order
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

export default Orders;

