import React from "react";
import AnyDoubtHat from "../assets/productImages/any-doubt-hat.png";

const loggedIn = false;

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

const customer_id = 12345;

export default function ProductDetails() {
    return (
        <>
        {loggedIn ? (
            <section class="product text-center">
                <img src={product[0].image} alt={product[0].name} height="400" width="400" id="product-image" />
                <div class="product-details">
                    <h4 id="product-name">{product[0].name}</h4>
                    <h5 id="product-description">{product[0].description}</h5>
                    <h6 id="product-price">Cost: ${product[0].price}</h6>
                    <form class="product-bought mx-auto" style={{width: "25%"}}>
                        <input type="number" style={{width: "4em"}} id="product-quantity" placeholder="0"/>
                        <button type="submit" class="btn btn-warning btn-sm mt-2">ADD</button>
                    </form>
                </div>
            </section>
        ) : (
            <section class="product text-center">
                <img src={product[0].image} alt={product[0].name} height="400" width="400" id="product-image" />
                <div class="product-details">
                    <h4 id="product-name">{product[0].name}</h4>
                    <h5 id="product-description">{product[0].description}</h5>
                    <h6 id="product-price">Login to view price</h6>
                    <form class="product-bought mx-auto" style={{width: "25%"}}>
                        <input type="number" style={{width: "4em"}} id="product-quantity" placeholder="0"/>
                        <button type="submit" class="btn btn-warning btn-sm mt-2">ADD</button>
                    </form>
                </div>
                <p class="d-none" id="customerID">{customer_id}</p>
            </section>
        )}
        </>
    );
}

