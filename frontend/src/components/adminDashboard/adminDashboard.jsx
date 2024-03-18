import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./adminDashboard.css"

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    // Fetch sales data
    // axios.get('/api/eventRe')
    //   .then(response => {
    //     setSalesData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching sales data:', error);
    //   });

    // Fetch order details
    axios.get('http://localhost:5000/api/eventRegister/')
      .then(response => {
        setOrderDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching order details:', error);
      });
  }, []);

  return (
    <div className="historyCont">
        <div className="d-flex justify-content-center " >
          <table className="table text-center align-items-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Eamil</th>
              <th scope="col">Ticket Quantity</th>
              <th scope="col">Order Date</th>
             
            </tr>
          </thead>
          <tbody>
          {orderDetails.map(order => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.ticketQuantity}</td>
              <td>{order.registrationDate}</td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>

      </div>
    
  );
};

export default AdminDashboard;
