import "../../styles/page.css"
import { useState, Fragment } from "react";
import { useMode } from "../../theme";

import Routers from "../../routers/Router";
import Topbar from "../global/Topbar"
import Sidebar from "../global/Sidebar"

const Layout =() =>{
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return(
        <Fragment>

        <div className="app">
          <Sidebar isSidebar={isSidebar} />
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