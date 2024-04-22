import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerContext } from '../CustomerContext';

const EditCustomerPage = () => {
    
    const context = useContext(CustomerContext);
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            const fetchedCustomer = await context.getCustomer(customerId);
            setCustomer(fetchedCustomer);
            setFormState({
                firstName: fetchedCustomer.first_name,
                lastName: fetchedCustomer.last_name,
                companyId: fetchedCustomer.company_id,
                rating: fetchedCustomer.rating,
                employees: ""
            });
        };
        fetchCustomer();
    }, [context, customerId]);
    
    const [formState, setFormState] = useState({
        "firstName": "",
        "lastName": "",
        "companyId": 0,
        "rating": 1,
        "employees": ""
    })

    const updateFormField = (event) => {
        setFormState({
            ...formState,
            [event.target.name] : event.target.value
        }) 
    }

    return (
        <>
            <h1>Add New Customer</h1>
            <div>
                <label>First Name</label>
                <input type="text" className="form-control" 
                                    name="firstName" 
                                    onChange={updateFormField}
                                    value={formState.firstName}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" 
                        className="form-control" 
                        name="lastName"
                        onChange={updateFormField}
                        value={formState.lastName}
                />
            </div>
            <div>
                <label>Company ID</label>
                <input type="text" 
                        className="form-control" 
                        name="companyId"
                        onChange={updateFormField}
                        value={formState.companyId}
                />
            </div>
            <div>
                <label>Rating</label>
                <input type="text" 
                        className="form-control" 
                        name="rating"
                        onChange={updateFormField}
                        value={formState.rating}
                />
            </div>
            <div>
                <label>Employees</label>
                <input type="text" 
                        className="form-control" 
                        name="employees"
                        onChange={updateFormField}
                        value={formState.employees}
                />
            </div>
            <button className='btn btn-primary mt-3'
                    onClick={() => {
                        context.updateCustomer(
                            customerId,
                            formState.firstName,
                            formState.lastName,
                            parseInt(formState.companyId),
                            parseInt(formState.rating),
                            formState.employees.split(",")
                        );
                        navigate("/") 
                    }}
            >Update Customer</button>
        </>
    )
}

export default EditCustomerPage;