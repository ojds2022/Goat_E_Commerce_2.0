import React, { useEffect, useNavigate } from "react";
import { QUERY_USER, GET_TRANSACTIONS_BY_CUSTOMER } from "../utils/queries";
import { Link } from "react-router-dom";
import AnyDoubtHat from "../assets/productImages/any-doubt-hat.png";
import Auth from '../utils/auth';

import { useLazyQuery,useQuery, useMutation } from '@apollo/client';

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

    const token = Auth.getProfile();

    //const navigate = useNavigate();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { email:token.data.email },
    });
    console.log(data);

    const [getUserData, { data:data2 }] = useLazyQuery(GET_TRANSACTIONS_BY_CUSTOMER);

    const userID = data && data.customer._id;
    console.log(userID);
    useEffect(()=>{
        console.log(userID);
        if(userID){
            getUserData({ variables: { customer_id: userID } })
        }
        
    },[userID])
    
    console.log(data2)
    // const dataAfter = data2 && data2.transaction

    // const handleOrderCompleteClick = () => {  // Saim added this. Trying to send the transaction id to the order complete page.
    //     navigate(`/orderComplete`, { state: { transaction_id } });
    // }

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
                    <div className = "col orderSummary">
                        <h2 className = "bold">Order Summary</h2>
                        <p>Order Subtotal: $ </p>
                        <p>Tax: %</p>
                        <p>Total: $</p>
                        <Link to='/'>
                            <button type="button" id="backToProduct" className="btn btn-danger p-1">Continue Shopping</button>
                        </Link>
                        <Link to='/orderComplete'>
                            <button type="button" id="transaction" className="btn btn-dark" >Complete Order</button>
                        </Link>
                    </div>
                </div>

            </section>

        ) : (
            <h1>LOGIN TO SEE SHOPPING CART</h1>
        )}
        </>
    );
}