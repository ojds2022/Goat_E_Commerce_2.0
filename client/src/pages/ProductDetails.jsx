import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_TRANSACTION_MAIN } from "../utils/mutations";
import { GET_TRANSACTIONSMAIN_BY_CUSTOMER } from "../utils/queries";
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const loggedIn = Auth.loggedIn();

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

    // // const checkForShoppingCart = async () => {
    //     const { data: transactionData } = useQuery(GET_TRANSACTIONSMAIN_BY_CUSTOMER, {
    //         variables: { customer_id: Auth.getProfile().data._id }
    //     });
    //     // if ()
    //     console.log(transactionData)
    // // }

    const handleAddToCart = async () => {
        navigate(`/shoppingCart`);
        try {
            const customer = Auth.getProfile().data;
            const customerId = customer._id;

            const total = product.price;
            const ordered = false;

            const response = await addTransactionMain({
                variables: { ordered, customer_id: customerId, total }
            })
        } catch (err) {
            console.error(err);
            alert('Error adding product to cart. Please try again.');
        }
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
                        <button onClick={handleAddToCart} className="btn btn-warning btn-sm mt-2">ADD</button>
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

