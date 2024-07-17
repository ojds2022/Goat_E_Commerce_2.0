import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_TRANSACTION_MAIN } from "../utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';



const loggedIn = true;

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

    const handleAddToCart = async () => {
        navigate(`/shoppingCart`);
        try {
            const customer = Auth.getProfile().data;
            const customerId = customer.id;

            const total = product.price;
            const ordered = false;

            const response = await addTransactionMain({
                variables: { ordered, customer_id: customerId, total }
            })
        } catch (err) {
            console.error(err);
            alert('Error adding product to cart. Please try again later.');
        }
    }

    return (
        <>
        {loggedIn ? (
            <section className = "container">
                { allProductData && (
                    <section className="product text-center">
                    <img src={product.product_url} alt={product.product_name} height="400" width="400" id="product-image" />
                    <div className="product-details">
                        <h4 id="product-name">{product.product_name}</h4>
                        <h5 id="product-description">{product.product_description}</h5>
                        <h6 id="product-price">Cost: ${product.price}</h6>
                        <form className="product-bought mx-auto" style={{width: "25%"}}>
                            <button onClick={handleAddToCart} className="btn btn-warning btn-sm mt-2">ADD</button>
                        </form>
                    </div>
                    </section>  
                )}
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

