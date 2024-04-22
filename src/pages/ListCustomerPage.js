import React, {useContext} from 'react';
import { CustomerContext } from '../CustomerContext';
import { useNavigate } from 'react-router-dom';

// `useContext` will return `dataOperations` (in CustomerContext.js)
// returned data saved to `context` object and able to 
// call `context.getCustomers`
const ListCustomerPage = () => {
    const context = useContext(CustomerContext);
    const navigate = useNavigate();

    return (
        <>
            <h1>List All Customers</h1>
            {
                context.getCustomers().map( c => 
                <div className='card'>
                    <div className='card-body'>
                        <h2>{c.first_name} {c.last_name}</h2>
                        <ul>
                            <li>Company ID: {c.company_id}</li>
                            <li>Rating: {c.rating}</li>
                            <li>Employees: {c.employees}</li>
                        </ul>
                        <div>
                            <button className="btn btn-secondary m-2" onClick={() => navigate(`/edit/${c.customer_id}`)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => navigate(`/delete/${c.customer_id}`)}>Delete</button>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

export default ListCustomerPage;