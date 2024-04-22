import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const CustomerContext = createContext();
const BASE_API_URL = "https://3000-missycoder-companycrma-u2d4p6k0z17.ws-us110.gitpod.io"

// create component that can inject the context data to its children
export default function CustomerContextData(props) {
    
    useEffect(() => {
        
        const fetchData = async() => {
            const response = await axios.get(BASE_API_URL + "/api/customers");
            setCustomers(response.data.customers)
        }

        fetchData();
        
    }, []) // if dependeny array is empty, it means to call the effect function once and only once after the first render

    const [customers, setCustomers] = useState([]);

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
        deleteCustomer: async (customer_id) => {
            const response = await axios.delete(BASE_API_URL + "/api/customers/" + customer_id);
        }
    }

    return (
        <CustomerContext.Provider value={dataOperations}>
            {props.children}
        </CustomerContext.Provider>
    )
}