import React, {useContext, useState, useEffect} from 'react';
import { CustomerContext } from '../CustomerContext';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCustomerPage = () => {
    const context = useContext(CustomerContext);
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            const fetchedCustomer = await context.getCustomer(customerId);
            setCustomer(fetchedCustomer);
        };
        fetchCustomer();
    }, [context, customerId]);

    return (
        <>
            <h1>Delete</h1>
            {customer && (
                <>
                    <div>Are you sure you want to delete {customer.first_name} {customer.last_name}?</div>
                    <div>
                        <button className="btn btn-secondary m-2" onClick={() => navigate("/")}>Cancel</button>
                        <button className="btn btn-danger" onClick={() => {
                                                            context.deleteCustomer(customerId);
                                                            navigate("");
                        }}>Comfirm</button>
                    </div>
                </>
            )}
        </>
    )
}

export default DeleteCustomerPage;