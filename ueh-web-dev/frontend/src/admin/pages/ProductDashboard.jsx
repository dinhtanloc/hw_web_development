import useAxios from "../../client/utils/useAxios"
import { useState, useEffect }  from "react"

const ProductDashboard = () =>{
    const isProducts = useAxios() 
    const [productList, MakeproductList] = useState([]);
    useEffect(() => {
        fetchProductlist();
      }, []);


    const fetchProductlist = async () => {
        try {
            const response = await isProducts.get('accounts/admin/staff-list/');
            // setUserProfile(response.data);
            // checkStaff(response.data.is_staff)
            console.log(response.data)
            // Makestafflist(response.data)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };




}

export default ProductDashboard