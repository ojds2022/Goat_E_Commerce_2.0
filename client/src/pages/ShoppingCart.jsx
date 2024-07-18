import React, { useEffect, useState } from "react";
import { QUERY_USER, GET_TRANSACTIONS_BY_CUSTOMER,GET_TRANSACTIONS_BY_ID,GET_PRODUCT_IN_CART} from "../utils/queries";
import { UPDATING_DATA_AFTER_CART } from "../utils/mutations";
import Auth from '../utils/auth'
import { Link } from "react-router-dom";

import { useLazyQuery,useQuery, useMutation } from '@apollo/client';

const loggedIn = true;

export default function ShoppingCart() {
    const token = Auth.getProfile();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { email:token.data.email },
    });


    const [getUserData, { data:data2 }] = useLazyQuery(GET_TRANSACTIONS_BY_CUSTOMER);
    const [getProductTransaction,{data:data3}] =useLazyQuery(GET_TRANSACTIONS_BY_ID);
    const [getProductData,{data:productData}] =useLazyQuery(GET_PRODUCT_IN_CART);

    const userID = data && data.customer._id;

    useEffect(()=>{
        if(userID){
            getUserData({ variables: { 
                customer_id: userID,
                ordered:false
            }})
        }        
    },[getUserData,userID])

    useEffect(() => {
        if(data2){
            getProductTransaction({ variables: {
                transaction_id:data2.transactionMain2[0]._id,
                ordered:false
            }})
        }   
    },[data2])
    
    

    // if(data3){
    //     console.log(data3.transactionDetail);
    // }
    const [allProduct, setAllProduct] = useState([]);

    useEffect(() => {
        async function passingData (){
            const allProduct = [];
            for (let i = 0; i < data3.transactionDetail.length ;i++) {
                
                const intermediate = await getProductData({ variables: {
                    _id:data3.transactionDetail[i].product_id
                }})
                if (intermediate){
                    allProduct.push(intermediate.data.productDataforCart[0]);
                }
            }
            
            allProduct.sort((a, b) => a.price - b.price);
            const uniqueAllProduct = allProduct.reduce((uniqueAllProduct,currentValue)=>{
                if(!uniqueAllProduct[currentValue._id]){
                    uniqueAllProduct[currentValue._id] = {...currentValue, quantity : 1, totalPrice : 1};
                }
                else{
                    uniqueAllProduct[currentValue._id].quantity += 1;
                                       
                }
                uniqueAllProduct[currentValue._id].totalPrice = uniqueAllProduct[currentValue._id].price * uniqueAllProduct[currentValue._id].quantity; 
                return uniqueAllProduct
            },{})

            setAllProduct(Object.values(uniqueAllProduct));
        }
        if(data3){
            passingData();
        }
        
    },[data3])

    const [updatetransaction, {error, data:updateTransactionData}] = useMutation(UPDATING_DATA_AFTER_CART)
    const updateTransactionIntermediate = async (event) => {
        event.preventDefault();
        try {
          const mutationResponse = await  updatetransaction({
            variables: {customer_id: data.customer._id},
          });
          console.log(mutationResponse);

          window.location.href = '/orderComplete';
        } catch (e) {
          console.log(e);
        }
    };
    


    return (
        <>
        {loggedIn  ? (
            <section className = "container"> 
            {allProduct.length && (
                <div className = "container">
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
                            {allProduct.map(({product_name,product_url,price,quantity},index) => (
                                <div key={index} className = "row">
                                    <div  className = "col-3">
                                        <p> {product_name} </p>
                                        <img src={product_url} alt={product_name} style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                    <div className="col-2">
                                        <p>{price}</p>
                                    </div>
                                    <div className="col-2">
                                        <p>{quantity}</p>
                                    </div>
                                    <div className="col-2">
                                        <p>{Number(price) * Number(quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className = "col orderSummary">
                            
                            <h2 className = "bold">Order Summary</h2>
                            <div>Order Subtotal:  {allProduct.reduce((total, { totalPrice }) => total + Number(totalPrice), 0)}
                            </div>
                            <p>Tax: 10%</p>
                            <p>Total: ${(allProduct.reduce((total, { totalPrice }) => total + Number(totalPrice), 0) * 1.1).toFixed(2)}</p>
                            <Link to='/'>
                                <button type="button" id="backToProduct" className="btn btn-danger btn-lg btn-block m-1 fs-6 p-1" style={{width: "150px"}}>Continue Shopping</button>
                            </Link>
                            <button type="button" id="transaction" onClick={updateTransactionIntermediate} className="btn btn-dark btn-lg btn-block m-1" style={{width: "150px"}} >Place Order</button>
                        </div>
                    </div>
                </div>
            )}
                

            </section>

        ) : (
            <h1>LOGIN TO SEE SHOPPING CART</h1>
        )}
        </>
    );
}