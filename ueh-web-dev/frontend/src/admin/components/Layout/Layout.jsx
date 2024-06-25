import "../../styles/page.css"
import { useEffect, useState, Fragment } from "react";
import { useMode } from "../../theme";

import Routers from "../../routers/Router";
import Topbar from "../global/Topbar"
import Sidebar from "../global/Sidebar"
import useAxios from "../../../client/utils/useAxios";

const Layout =() =>{
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const isStaff = useAxios() 
    const [checkedStaff, checkStaff ] = useState(false)
    const [staffInfo, ListstaffInfo] = useState([])



    useEffect(() => {
      fetchStaffChecking();
    }, []);

    const fetchStaffChecking = async () => {
        try {
            const response = await isStaff.get('accounts/staff/');
            // setUserProfile(response.data);
            checkStaff(response.data.is_staff);
            ListstaffInfo(response.data.staff)
            
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
    
    
    if(!checkedStaff){
      return(<div>You can not access here</div>);
    }
    return(
        <Fragment>

        <div className="app">
          <Sidebar isSidebar={isSidebar}  data={staffInfo} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routers/>
            {/* <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes> */}
          </main>
        </div>
        </Fragment>
    )

}

export default Layout