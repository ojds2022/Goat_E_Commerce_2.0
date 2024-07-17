import React from "react";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import AuthService from '../utils/auth';

export default function Products() {
    const loggedIn = AuthService.loggedIn();
    const navigate = useNavigate();
    const { data } = useQuery(GET_PRODUCTS);

    const products = data?.products || [];

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    return (
        <>
        {loggedIn ? (
            <section className="container border border-secondary" style={{width: "75%"}}>
                <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-3 border border-secondary">
                        <button className="cursor-pointer border-0 bg-transparent" onClick={() => handleProductClick(product)}>
                            <div className="d-block mt-4 mx-auto" style={{width: "100%", height: "180px", overflow: "hidden"}}>
                                <img src={product.product_url} style={{width: "100%"}} alt={product.product_name} />
                            </div>
                            <p className="text-secondary">{product.product_name}</p>
                            <p className="fw-bold m-auto">${product.price}</p>                    
                        </button>
                    </div>
                ))}
                </div>
            </section>
        ) : (
            <section className="container" style={{width: "75%"}}>
                <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-3 border border-secondary">
                        <button className="cursor-pointer border-0 bg-transparent" onClick={() => handleProductClick(product)}>
                            <div className="d-block mt-4 mx-auto" style={{width: "100%", height: "180px", overflow: "hidden"}}>
                                <img src={product.product_url} style={{width: "100%"}} alt={product.product_name} />
                            </div>
                            <p className="text-secondary">{product.product_name}</p>
                            <p className="fw-bold m-auto">Login to view price</p>                    
                        </button>
                    </div>
                ))}
                </div>
            </section>
        )}
        </>
    );
}