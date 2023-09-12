import { useLoaderData } from "react-router-dom";
import AllProducts from "./AllProducts";

const ProductDetails = () => {
    const product = useLoaderData();
    const {_id, availableQuantity, productName, productPhoto, productPrice, productDescription} = product;

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 container mx-auto p-10">
                <div className="">
                    <img className="w-full" src={productPhoto} alt={productName} />
                </div>
                <div>
                    <h1 className="font-semibold">{productName}</h1>
                    <p className="text-xl font-bold py-3">${productPrice}</p> 
                    <h2 className="font-semibold py-2">Description:</h2>
                    <p>{productDescription}</p>
                </div>
            </div>
            <AllProducts></AllProducts>
        </section>
    );
};

export default ProductDetails;