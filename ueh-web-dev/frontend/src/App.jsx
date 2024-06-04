// import Layout from "./components/Layout/Layout";

// function App() {
//   return <Layout />;
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import các thành phần của client và admin
import Clientpage from './client/Clientpage';
import AdminPage from './admin/AdminPage';
const App = () => {
  return (
    <Router>
      <Switch>
        {/* Định nghĩa route cho client side */}
        <Route path="/" component={Clientpage} />

        {/* Định nghĩa route cho admin side */}
        <Route path="/admin" component={AdminPage} />

        {/* Định nghĩa route mặc định, có thể chuyển hướng đến client hoặc trang chủ */}
        {/* <Route path="/" exact>
          <Redirect to="/client" />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
