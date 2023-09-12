import { Link, useNavigate } from "react-router-dom";
import { addToDb } from "../../../utility/tempDB";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCartItems from "../../../hooks/useCartItems";

const ProductCard = ({product}) => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {_id, availableQuantity, productName, productPhoto, productPrice} = product;
    const [reqQty, setReqQty] = useState(1);
    const navigate = useNavigate();
    const [cartItems, refetch] = useCartItems();
    
    const increseQty = () => {
        setReqQty(reqQty + 1)
    }
    
    const decreseQty = () => {
        if(reqQty < 2){
            return;
        }
        setReqQty(reqQty - 1)
    }

    const handleAddToCart = (event) => {
        event.preventDefault();
        if(!user){
            Swal.fire({
                title: 'Please login to continue shopping!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login')
                }
              })
            return
        }

        const form = event.target;
        const itemID = _id;
        const quantity = form.quantity.value;
        const itemName = productName;
        const itemPhoto = productPhoto;
        const itemPrice = productPrice;
        const totalPrice = productPrice * quantity;
        const customerEmail = user.email;
        const newCartItem = {itemID, quantity, itemName, itemPrice, totalPrice, itemPhoto, customerEmail}

        axiosSecure.post('/cart-items', newCartItem)
        .then(res => {
            if (res.data.insertedId) {
                refetch()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product Added to your Cart',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
    
    return (
        <div className="card w-full glass">
        <figure><img className="h-auto p-5" src={productPhoto} alt={productName}/></figure>
        <div className="card-body flex justify-between">
            <h2 className="card-title text-sm">{productName.slice(0, 35)}</h2>
            <div className="flex text-sm">
                <p>Price: <span className="text-gray-500 font-bold">${productPrice}</span></p>
                <p>In Stock: <span className="text-gray-500 font-bold">{availableQuantity}</span></p>
            </div>
            <hr />
            <div className="card-actions">
                <form className="flex flex-col justify-center items-center w-full gap-1" onSubmit={handleAddToCart}>
                    <div>
                    <input onClick={decreseQty} type="button" value="-" className="px-2 bg-gray-300 hover:bg-gray-200 active:bg-gray-400 font-bold rounded-l-lg cursor-pointer"/>
                    <input className="border w-10 mx-2 outline-none text-center" type="text" name="quantity" value={reqQty} readOnly />
                    <input onClick={increseQty} type="button" value="+" className="px-2 bg-gray-300 hover:bg-gray-200 active:bg-gray-400 font-bold rounded-r-lg cursor-pointer"/>
                    </div>
                    <input type="submit" value="Add to Cart" className="btn btn-xs btn-neutral"/>
                    <Link to={`/product-details/${product._id}`} className="btn btn-xs btn-warning">Details</Link>
                </form>
            </div>
        </div>
        </div>
    );
};

export default ProductCard;