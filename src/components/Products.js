import React from "react";
import AnyDoubtHat from "../assets/productImages/any-doubt-hat.png";

// const importAll = (requireContext) => requireContext.keys().map(requireContext);

// const productImages = importAll(require.context('../assets/productImages', false, /\.png$/));

const productImages = [
    { id: 1, name: 'Product 1', image: AnyDoubtHat },
    { id: 2, name: 'Product 2', image: AnyDoubtHat },
    { id: 3, name: 'Product 3', image: AnyDoubtHat },
    { id: 4, name: 'Product 4', image: AnyDoubtHat },
    { id: 5, name: 'Product 5', image: AnyDoubtHat },
    { id: 6, name: 'Product 6', image: AnyDoubtHat },
    { id: 7, name: 'Product 7', image: AnyDoubtHat },
    { id: 8, name: 'Product 8', image: AnyDoubtHat },
    { id: 9, name: 'Product 9', image: AnyDoubtHat },
    { id: 10, name: 'Product 10', image: AnyDoubtHat },
    { id: 11, name: 'Product 11', image: AnyDoubtHat },
    { id: 12, name: 'Product 12', image: AnyDoubtHat },
];




export default function Products() {
    return (
        <>
        <section className="container" style={{width: "60%"}}>
            <div className="row">
            {productImages.map(product => (
                <div key={product.id} className="col-3 border border-secondary">
                    <a className="cursor-pointer text-decoration-none" href="/">
                        <div className="d-block mt-4 mx-auto" style={{width: "80%", height: "200px", overflow: "hidden"}}>
                            <img src={product.image} style={{width: "100%"}} alt={product.name} />
                        </div>
                        <p className="ml-3 mb-0 fs-5 text-secondary"></p>
                        <p className="ml-3 fs-6 fw-bold"></p>                    
                    </a>
                </div>
            ))}
                    {/* <div class="col-3 border border-secondary" style="">
                        <a class="cursor-pointer text-decoration-none" href="/products/{{Product.product_id}}">
                            <div class="d-block mt-4 mx-auto" style="width: 90%; height: 220px; overflow: hidden;">
                                <img src="{{Product.product_url}}" style="width: 100%;" alt="" />
                            </div>
                            <p class="ml-3 mb-0 fs-5 text-secondary"></p>
                            <p class="ml-3 fs-6 fw-bold">Login to view price</p>                  
                        </a>
                    </div> */}
                
            </div>
        </section>
        </>
    );
}