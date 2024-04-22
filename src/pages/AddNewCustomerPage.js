import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerContext } from '../CustomerContext';

const AddCustomerPage = () => {
    // hooks must be used at the start of component and cannot be inside any if else
    const context = useContext(CustomerContext);
    const navigate = useNavigate();
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
            [event.target.name] : event.target.value // if want value from javascript expression then use `[]` 
        }) // clone the original object, then replace key with `event.target.value `
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
                        context.addCustomers(
                            formState.firstName,
                            formState.lastName,
                            parseInt(formState.companyId),
                            parseInt(formState.rating),
                            formState.employees.split(",")
                        );
                        navigate("/") 
                    }}
            >Create Customer</button>
        </>
    )
}

export default AddCustomerPage;