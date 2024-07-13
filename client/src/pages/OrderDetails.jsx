// Page to show the orders in one order\

import React from 'react';
import AnyDoubtHat from "../assets/productImages/any-doubt-hat.png";
import '../styles/orderDetails.css'; 

const transaction_id = 12345;


const order = [
    { id: 1, name: 'Product 1', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 2, name: 'Product 2', price: 100.00, description: 'product description car', image: AnyDoubtHat},
    { id: 3, name: 'Product 3', price: 160.00, description: 'product description vv', image: AnyDoubtHat},
    { id: 4, name: 'Product 4', price: 180.00, description: 'product description watch ', image: AnyDoubtHat},
    { id: 5, name: 'Product 5', price: 190.00, description: 'product descriptiong g g', image: AnyDoubtHat}
];




export default function OrderDetails() {
    return (

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center mb-4">Order Details</h2>
          <div className="card order-card mb-4">
            <div className="card-header">
              Order Number: #{transaction_id}
            </div>
            <div className="card-body">
              {order.map(order => (
                <div className="row">
                  <div className="col-md-4 ">
                    <img src={order.image} className="img-fluid order-image" alt={order.name} />
                  </div>

                  <div className="text col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item"><strong>order: </strong> {order.name}</li>
                      <li className="list-group-item"><strong>Description: </strong> {order.description}</li>
                      <li className="list-group-item"><strong>Total with tax: </strong> ${order.price} ({order.price} @ ${order.price})</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    };