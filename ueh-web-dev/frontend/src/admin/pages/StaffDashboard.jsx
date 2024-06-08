import useAxios from "../../client/utils/useAxios"
import { useState, useEffect }  from "react"

const StaffDashboard = () =>{
    const isStaff = useAxios() 
    const [staffList, Makestafflist] = useState([]);
    useEffect(() => {
        fetchStafflist();
      }, []);


    const fetchStafflist = async () => {
        try {
            const response = await isStaff.get('accounts/admin/staff-list/');
            // setUserProfile(response.data);
            // checkStaff(response.data.is_staff)
            console.log(response.data)
            // Makestafflist(response.data)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };




}

export default StaffDashboard