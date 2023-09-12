import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import useCartItems from "../../../../hooks/useCartItems";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const CartItems = () => {
    const [cartItems, refetch] = useCartItems();
    const totalPayable = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
    const handleDeleteCartItem = (product) => {
        const id = product._id;
        axios.delete(`https://ecom-server-hmqo5krgf-methubd.vercel.app/added-cart-items/${id}`)
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Deleted!',
                showConfirmButton: false,
                timer: 1500
              })
            refetch();
        })
    }

    return (
        <section className="container mx-auto">
            <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th>
                    <label>
                        #
                    </label>
                    </th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Action</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    cartItems?.map((product, index) => <tr
                    key={product._id}
                    >
                    <th>
                        <label>
                            {index + 1}
                        </label>
                    </th>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={product?.itemPhoto} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{product?.itemName.slice(0, 25)}</div>
                                </div>
                            </div>
                        </td>
                        <td>{product?.quantity}</td>
                        <td className="text-right" >${product?.itemPrice}</td>
                        <td className="text-right">${product?.totalPrice}</td>
                        <td>
                        <button onClick={() => handleDeleteCartItem(product)} className="btn btn-ghost btn-xs">delete</button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
        <div className="text-center md:px-24 border-t-4">
                <h1 className="py-2">Total Amount: <span className="font-bold">${totalPayable}</span></h1>
                <div className="p-5 border">
                    <h1 className="pb-5 text-2xl font-semibold">Proceed to Checkout</h1>
                    <Link to='/cash-on-delivery' className="btn btn-sm btn-warning mr-2" > <BanknotesIcon width={18}/> Cash on delivery</Link>
                    <Link className="btn btn-sm btn-warning"> <CreditCardIcon width={18}/> Credit Card</Link>
                </div>
        </div>
        </section>
    );
};

export default CartItems;