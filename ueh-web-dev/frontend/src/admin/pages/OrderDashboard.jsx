import useAxios from "../../client/utils/useAxios"
import { useState, useEffect }  from "react"

const OrderDashboard = () =>{
    const isOrders = useAxios() 
    const [orderList, MakeorderList] = useState([]);
    useEffect(() => {
        fetchOrderlist();
      }, []);


    const fetchOrderlist = async () => {
        try {
            const response = await isOrders.get('accounts/admin/staff-list/');
            // setUserProfile(response.data);
            // checkStaff(response.data.is_staff)
            console.log(response.data)
            // Makestafflist(response.data)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };




}

export default OrderDashboard