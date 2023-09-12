import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import SectionTitle from "../../../components/sectionTitle/sectionTitle";
import Loading from "../../../components/Loading/Loading";

const AllProducts = () => {
    
    const {data: allProducts = [], isLoading: isAllProductsLoading} = useQuery({
        queryKey: ['allProducts'], 
        queryFn: 
        async () => {
            const res = await axios.get('https://ecom-server-hmqo5krgf-methubd.vercel.app/products')
            return res.data;
        }
    })
    
    if (isAllProductsLoading) {
        return <Loading></Loading>        
    }

    return (
        <div>
            <SectionTitle heading="Our Featured Products"/>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 container mx-auto">
                {
                    allProducts?.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProducts;