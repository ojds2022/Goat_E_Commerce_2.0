import { useMutation, useLazyQuery } from "@apollo/client";
import {ADD_TRANSACTION_MAIN} from "../utils/mutations"
import { QUERY_USER } from "../utils/queries";
import Auth from '../utils/auth';
import { useEffect } from'react';

export default function OrderComplete() {
    const [addTransactionMain, {data:data2, error}] = useMutation(ADD_TRANSACTION_MAIN);

    const [getCurrentUser, {data}] = useLazyQuery(QUERY_USER);

    const loggedIn = Auth.loggedIn();
    
    const token = Auth.getProfile();

        useEffect(() => {
            if (loggedIn) {
                getCurrentUser({
                    variables: { email:token.data.email },
                });
            }
        },[loggedIn])

    const userID = data && data.customer._id;

    async function intermediate(){
        const ordered = false;
        const total = 0;
        const response = await addTransactionMain({
            variables: { ordered, customer_id: userID, total }
        })
    }

    useEffect(()=>{
        try{
            if(userID){
                intermediate();
            }        
        } catch (e){
            console.log(e,e.message);
        }
    },[userID])

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "60vh"}}>
            <h1>Order Complete!</h1>
            <h2 className="m-4">Thank you for shopping</h2>
        </div>
    );
}