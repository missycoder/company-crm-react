import React, { useContext, useState, useEffect } from 'react';
import { CustomerContext } from '../CustomerContext';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCustomerPage = () => {
    const context = useContext(CustomerContext);
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const fetchedCustomer = await context.getCustomer(customerId);
                setCustomer(fetchedCustomer);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [context, customerId]);

    const handleDelete = async () => {
        try {
            const deletionResult = await context.deleteCustomer(customerId);
            if (!deletionResult.success) {
                setError(deletionResult.message);
            } else {
                navigate("/");
            }
        } catch (error) {
            setError("An error occurred while deleting the customer.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1>Delete Customer</h1>
            {customer && (
                <>
                    <div>Are you sure you want to delete {customer.first_name} {customer.last_name}?</div>
                    <div>
                        <button className="btn btn-secondary m-2" onClick={() => navigate("/")}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Confirm</button>
                    </div>
                </>
            )}
        </>
    );
};

export default DeleteCustomerPage;
