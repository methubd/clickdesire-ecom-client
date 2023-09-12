import { useState } from "react";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
const imageKey = import.meta.env.VITE_Image_Upload_Token

const AddProduct = () => {
    const {user} = useAuth();
    const [imgUrl, setImgURL] = useState();
    const [isUploadLoading, setIsUploadLoading] = useState(false)
    const img_hosting_url = `https://api.imgbb.com/1/upload?&key=${imageKey}`
    const [axiosSecure] = useAxiosSecure();

    const UploadImage = e => {
        const formData = new FormData();
            formData.append('image', e.target.files[0])            
            setIsUploadLoading(true)
            fetch(img_hosting_url, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(imgResponse => {
                setImgURL(imgResponse.data.display_url)
                setIsUploadLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Image Uploaded!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })   
    }

    if(isUploadLoading){
        return <Loading></Loading>
    }

    const handleAddProduct = (event) => {
        event.preventDefault();
        const form = event.target;
        const productPhoto = imgUrl;
        const productName = form.productName.value;
        const availableQuantity = form.availableQuantity.value;
        const productPrice = form.productPrice.value;
        const productDescription = form.productDescription.value;
        const newProduct = {productPhoto, productName, availableQuantity, productPrice, productDescription, vendorEmail: user.email};

        axiosSecure.post('/products', newProduct)
        .then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New Product Added!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            form.reset();
        })
    } 

    return (
        <div className="flex flex-col items-center w-full md:w-1/2 mx-auto">
            <h1 className="text-2xl text-gray-500 font-bold py-2">Add a Product</h1>
            <form className="p-5" onSubmit={handleAddProduct}>
                <input onChange={UploadImage} type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" name="photoUrl" />
                <input type="text" placeholder="Product Name" className="input input-bordered w-full max-w-full my-1" name="productName" required />
                <input type="number" placeholder="Available Quantity" className="input input-bordered w-full max-w-full my-1" name="availableQuantity" required />
                <input type="number" placeholder="Price" className="input input-bordered w-full max-w-full my-1" name="productPrice" required />
                <textarea type="text" placeholder="Description / Specifications" className="input input-bordered w-full max-w-full my-1 py-2" name="productDescription" required />
                <input type="submit" value="Add Product" className="btn btn-neutral btn-sm w-full"/>
            </form>
        </div>
    );
};

export default AddProduct;