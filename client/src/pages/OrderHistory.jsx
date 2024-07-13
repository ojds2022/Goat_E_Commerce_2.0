import React from "react";
import AnyDoubtHat from "../assets/productImages/any-doubt-hat.png";


const product = [
    { id: 1, name: 'Product 1', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 2, name: 'Product 2', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 3, name: 'Product 3', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 4, name: 'Product 4', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 5, name: 'Product 5', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 6, name: 'Product 6', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 7, name: 'Product 7', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 8, name: 'Product 8', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 9, name: 'Product 9', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 10, name: 'Product 10', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 11, name: 'Product 11', price: 10.00, description: 'product description', image: AnyDoubtHat },
    { id: 12, name: 'Product 12', price: 10.00, description: 'product description', image: AnyDoubtHat },
];

const transaction_id = 12345;


export default function OrderHistory() {
    return (
        <div class="containerFluid mt-5">
            <h1 class="text-center mb-4">Order History</h1>
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <div class="tableResponsive">
                        <table class="table tableBordered">
                            <thead>
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            {product.map(order => (
                            <tbody>
                                    <tr class="clickableRow" data-href="/orderDetail/{{order.transaction_id}}" target="blank">
                                        <td>{transaction_id}</td>
                                        <td>10/2023</td>
                                        <td>${order.price}</td>
                                    </tr>   
                            </tbody>
                               ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};