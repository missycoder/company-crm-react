import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListCustomerPage from "./pages/ListCustomerPage";
import AddCustomerPage from "./pages/AddNewCustomerPage";
import "bootstrap/dist/css/bootstrap.min.css"
import CustomerContextData from "./CustomerContext";
import EditCustomerPage from "./pages/EditCustomerPage";
import DeleteCustomerPage from "./pages/DeleteCustomerPage";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-sm bg-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">All Customers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add New</Link>
              </li>
            </ul>
          </div>
        </nav>
        <CustomerContextData>
          <Routes>
            <Route path="/" element={ <ListCustomerPage/> } />
            <Route path="/add" element={ <AddCustomerPage/> } />
            <Route path="/edit/:customerId" element={ <EditCustomerPage/> } />
            <Route path="/delete/:customerId" element={ <DeleteCustomerPage/> } />
          </Routes>
        </CustomerContextData>
      </div>
    </Router>
  );
}

export default App;
