import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

// `CustomerContext`: component that allows to store data
//  component to get customers and add customers
// 'context is like a `frontend db for react` (store 1 value)
export const CustomerContext = createContext();
const BASE_API_URL = "https://3000-missycoder-05expressmys-2oo6mezb7lv.ws-us110.gitpod.io"

// create component that can inject the context data to its children
export default function CustomerContextData(props) {

    // `useEffect` hook calls function after component renders for 1st time
    useEffect(() => {

        // proxy function inside the `useEffect` function that is async
        const fetchData = async () => {
            const response = await axios.get(BASE_API_URL + "/api/customers");
            setCustomers(response.data.customers)
        }

        fetchData();

    }, []) // if dependency array is empty, it means to call the effect function once & only once after the first render

    // state data stored in `CustomerContext` data component above
    const [customers, setCustomers] = useState([]);

    // `dataOperations` object contains CRUD functions
    const dataOperations = {
        getCustomers: () => {
            return customers
        },
        getCustomer: async (customer_id) => {
            const response = await axios.get(BASE_API_URL + "/api/customers/" + customer_id);
            const customer = response.data.customer[0];
            return customer
        },
        addCustomers: async (firstName, lastName, companyId, rating, employees) => {
            const response = await axios.post(BASE_API_URL + "/api/customers", {
                first_name: firstName,
                last_name: lastName,
                company_id: companyId,
                rating: rating,
                employees: employees
            });

            const newCustomer = {
                customer_id: response.data.new_customer_id,
                first_name: firstName,
                last_name: lastName,
                company_id: companyId,
                rating: rating,
                employees: employees
            }

            const modified = [...customers, newCustomer];
            setCustomers(modified)
        },
        updateCustomer: async (customerId, firstName, lastName, companyId, rating, employees) => {
            const response = await axios.put(BASE_API_URL + `/api/customers/${customerId}`, {
                first_name: firstName,
                last_name: lastName,
                company_id: companyId,
                rating: rating,
                employees: parseInt(employees)
            })

            const newCustomer = {
                customer_id: response.data.new_customer_id,
                first_name: firstName,
                last_name: lastName,
                company_id: companyId,
                rating: rating,
                employees: employees
            }

            const modified = [...customers, newCustomer];
            setCustomers(modified)
        },
        // Delete an existing customer
        // `customers.filter` is used to create new array(modified)
        // that excludes the deleted customer based on its ID
        // aka local state reflect updated list of customers w/o the deleted one.
        deleteCustomer: async (customer_id) => {
            try {
                await axios.delete(BASE_API_URL + "/api/customers/" + customer_id);
                const modified = customers.filter(customer => customer.customer_id !== customer_id);
                setCustomers(modified); // to update the state
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };
    

    // JSX
    //data stored in `CustomerContext` is in `const dataOperations` above
    // `Provider`: any children component can access the `value`
    // `props.children` refers to `app.js > `CustomerContextData` 
    // inside `Routes`
    return (
        <CustomerContext.Provider value={dataOperations}>
            {props.children}
        </CustomerContext.Provider>
    )
}