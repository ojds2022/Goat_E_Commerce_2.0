import React from "react";
import { useNavigate } from "react-router-dom";
import AnyDoubtHat from "../assets/productImages/any-doubt-hat.png";

// const importAll = (requireContext) => requireContext.keys().map(requireContext);

// const productImages = importAll(require.context('../assets/productImages', false, /\.png$/));

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

export default function Products() {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <>
        {loggedIn ? (
            <section className="container" style={{width: "60%"}}>
                <div className="row">
                {product.map(product => (
                    <div key={product.id} className="col-3 border border-secondary">
                        <button className="cursor-pointer border-0 bg-transparent" onClick={() => handleProductClick(product.id)}>
                            <div className="d-block mt-4 mx-auto" style={{width: "80%", height: "200px", overflow: "hidden"}}>
                                <img src={product.image} style={{width: "100%"}} alt={product.name} />
                            </div>
                            <p className="ml-3 mb-0 fs-5 text-secondary">{product.name}</p>
                            <p className="ml-3 fs-6 fw-bold">${product.price}</p>                    
                        </button>
                    </div>
                ))}
                </div>
            </section>
        ) : (
            <section className="container" style={{width: "60%"}}>
                <div className="row">
                {product.map(product => (
                    <div key={product.id} className="col-3 border border-secondary">
                        <button className="cursor-pointer border-0 bg-transparent" onClick={() => handleProductClick(product.id)}>
                            <div className="d-block mt-4 mx-auto" style={{width: "80%", height: "200px", overflow: "hidden"}}>
                                <img src={product.image} style={{width: "100%"}} alt={product.name} />
                            </div>
                            <p className="ml-3 mb-0 fs-5 text-secondary">{product.name}</p>
                            <p className="ml-3 fs-6 fw-bold">Login to view price</p>                    
                        </button>
                    </div>
                ))}
                </div>
            </section>
        )}
        </>
    );
}