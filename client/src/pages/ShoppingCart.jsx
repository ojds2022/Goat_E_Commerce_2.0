import React from "react";

import AnyDoubtHat from "../assets/productImages/any-doubt-hat.png";

const loggedIn = true;

const product = [
    { id: 1, name: 'Product 1', price: 10.00, quantity:'2', image: AnyDoubtHat },
    { id: 2, name: 'Product 2', price: 10.00, quantity:'4', image: AnyDoubtHat },
    { id: 3, name: 'Product 3', price: 10.00, quantity:'5', image: AnyDoubtHat },
    { id: 4, name: 'Product 4', price: 10.00, quantity:'9', image: AnyDoubtHat },
    { id: 5, name: 'Product 5', price: 10.00, quantity:'1', image: AnyDoubtHat },
    { id: 6, name: 'Product 6', price: 10.00, quantity:'8', image: AnyDoubtHat },
]

export default function ShoppingCart() {
    return (
        <>
        {loggedIn  ? ( 
            <section className = "container"> 
                <div className = "row">
                    <div className="col-10">
                        <div className = "row">
                            <div className = "col-3">
                                <h3>Product and product name</h3>
                            </div>
                            <div className="col-2">
                                <h3>Price</h3>
                            </div>
                            <div className="col-2">
                                <h3>Quantity</h3>
                            </div>
                            <div className="col-2">
                                <h3>Total Cost</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-10">
                        {product.map((product) => (
                            <div key={product.id} className = "row">
                                <div  className = "col-3">
                                    <p> {product.id} </p>
                                    <img src={product.image} style={{ width: '100%', height: 'auto' }} alt="xxx" />
                                </div>
                                <div className="col-2">
                                    <p>{product.price}</p>
                                </div>
                                <div className="col-2">
                                    {product.quantity}
                                </div>
                                <div className="col-2">
                                    <p>$100.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className = "col-2 orderSummary">
                        <h2 className = "bold">Order Summary</h2>
                        <p>Order Subtotal: $ </p>
                        <p>Tax: %</p>
                        <p>Total: $</p>
                        <button type="button" id="backToProduct" className="btn btn-light btn-lg btn-block ">Continue Shopping</button>
                        <button type="button" id="transaction" className="btn btn-dark btn-lg btn-block " >Buy! Buy! Buy!</button>
                    </div>
                </div>

            </section>

        ) : (
            <h1>LOGIN TO SEE SHOPPING CART</h1>
        )}
        </>
    );
}