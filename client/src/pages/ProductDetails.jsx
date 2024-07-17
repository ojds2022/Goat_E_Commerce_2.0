import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_TRANSACTION_MAIN } from "../utils/mutations";
import { useMutation } from '@apollo/client';


const loggedIn = false;

//const customer_id = 12345;

export default function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [addTransactionMain, {data, loading, error}] = useMutation(ADD_TRANSACTION_MAIN);
    
    useEffect(() => {
        if (!location.state) {
            navigate('/'); // Redirect to products list if no state is available
        }
    }, [location, navigate]);

    if (!location.state) {
        return null; // Return null or a loading indicator while redirecting
    }

    const { product } = location.state;

    // const handleAddToCart = async () => {
    //     if (!loggedIn) {

    //     }
    // }

    const getQuantity = () => {
        navigate(`/shoppingCart`);
    }

    return (
        <>
        {loggedIn ? (
            <section className="product text-center">
                <img src={product.product_url} alt={product.product_name} width="400" id="product-image" />
                <div className="product-details">
                    <h4 id="product-name">{product.product_name}</h4>
                    <h5 id="product-description">{product.product_description}</h5>
                    <h6 id="product-price">Cost: ${product.price}</h6>
                    <div className="product-bought mx-auto" style={{width: "25%"}}>
                        {/* <input type="number" style={{width: "4em"}} id="product-quantity" placeholder="0"/> */}
                        <button onClick={getQuantity} className="btn btn-warning btn-sm mt-2">ADD</button>
                    </div>
                </div>
            </section>
        ) : (
            <section className="product text-center">
                <img src={product.product_url} alt={product.product_name} height="400" width="400" id="product-image" />
                <div className="product-details">
                    <h4 id="product-name">{product.product_name}</h4>
                    <h5 id="product-description">{product.product_description}</h5>
                    <h6 id="product-price"><strong>LOGIN TO VIEW PRICE</strong></h6>
                </div>
            </section>
        )}
        </>
    );
}

