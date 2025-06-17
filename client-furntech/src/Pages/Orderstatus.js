import React, { useEffect, useState } from 'react';
import { ApiServices } from '../services/apiServices';
import { GET_ORDERS_BY_ID } from '../services/url_helper';
import service from '../services/constant';

function Orderstatus() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const [orders, setOrders] = useState([]);

    const getData = async () => {
        try {
            const uri = `${GET_ORDERS_BY_ID}/${userDetails._id}`;
            const result = await ApiServices.callServiceGet(uri);
            if(result?.response === true){
                setOrders(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const renderOrderStatus = (status) => {
        const stages = ['pending', 'in progress', 'delivered'];
        const currentStage = stages.indexOf(status);
        return (
            <ul className="list-group">
                {stages.map((stage, index) => (
                    <li key={index} className={`list-group-item d-flex align-items-center ${index <= currentStage ? 'bg-dark text-white' : ''}`}>
                        <span className="me-2">{index < currentStage ? '✔️' : '🚆'}</span>
                        {stage}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Order Status</h2>
            {orders.length > 0 ? (
                <div>
                    {orders.map(order => (
                        order.productId.map(product => (
                            <div key={product._id} className="mb-4 p-3 border rounded">
                                <div className="d-flex align-items-center mb-3">
                                    <img src={`${service.API_URL}${product.productImage}`} alt={product.name} width="50" height="50" className="me-3" />
                                    <div>
                                        <p className="mb-1"><strong>Product:</strong> {product.name}</p>
                                        <p className="mb-1"><strong>Category:</strong> {product.category}</p>
                                        <p className="mb-1"><strong>Price:</strong> ₹{product.price}</p>
                                        <p className="mb-1"><strong>Order ID:</strong> {order._id}</p>
                                    </div>
                                </div>
                                {renderOrderStatus(order.orderStatus)}
                            </div>
                        ))
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

export default Orderstatus;
