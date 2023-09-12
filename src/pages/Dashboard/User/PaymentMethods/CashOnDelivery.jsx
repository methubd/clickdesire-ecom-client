import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import useCartItems from "../../../../hooks/useCartItems";
import Swal from "sweetalert2";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CashOnDelivery = () => {
    const {user} = useAuth();
    const [cartItems, refetch] = useCartItems();
    const navigate = useNavigate();
    const [orderLoading, setOrderLoading] = useState(false);
    const totalPayable = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const handleRefetchPrice = () => {
        refetch()
    };

    if(cartItems.length === 0) {
        return <Navigate to='/'></Navigate>
    }

    const handleOrderSubmit = (event) => {
        event.preventDefault();
        setOrderLoading(true);
        const form = event.target;
        const name = form.name.value;
        const contact = form.contact.value;
        const address = form.address.value;
        const area = form.area.value;
        const message = form.message.value;
        const status = 'Pending';
        const paymentType = "Cash on Delivery"
        const placeDate = new Date();
        const email = user?.email;
        const amount = totalPayable;
        const newOrder = {name, contact, address, area, message, status, paymentType, email, amount, placeDate};

        axios.post('https://ecom-server-hmqo5krgf-methubd.vercel.app/orders', newOrder)
        .then(res => {
            if (res.data.insertedId) {
                setOrderLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Order Submitted, Order Id: ${res.data.insertedId}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                form.reset();
                navigate('/');
            }
        })
    }

    return (
        <section onClick={handleRefetchPrice} className="flex justify-center items-center h-screen">
            <div className=" p-5 border rounded-md">
                <h1 className="text-xl font-semibold">Please provide your information</h1>
                <hr className="border-gray-500 border-y-1 my-3" />
                <p className="text-center">Total Payable Amount : <span className="font-semibold">${totalPayable}</span></p>
                <form onSubmit={handleOrderSubmit} className="flex flex-col">
                    <input name="name" type="text" placeholder="Your Name" className="input input-bordered input-sm w-full max-w-xs my-1" required defaultValue={user?.displayName} readOnly />
                    <input name="contact" type="number" placeholder="Contact Number" className="input input-bordered input-sm w-full max-w-xs my-1" required defaultValue={user?.contact}/>
                    <textarea name="address" placeholder="Shipping Address * Street Address" className="textarea textarea-bordered textarea-sm w-full max-w-xs my-1" required ></textarea>
                    <input name="area" type="text" placeholder="Area" className="input input-bordered input-sm w-full max-w-xs my-1" required />
                    <input name="message" type="text" placeholder="Message for Delivery Person" className="input input-bordered input-sm w-full max-w-xs my-1" required />
                    { orderLoading ||
                        <input className="btn btn-sm btn-neutral my-2" type="submit" value='Place Order' />
                    }
                </form>
            </div>
        </section>
    );
};

export default CashOnDelivery;