import { createContext, useContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({children}) => {
    const [formData, setFormData] = useState({
        step: 1,
        fullname: '',
        username: '',
        email: '',
        phone_number: '',
        password: '',
        street_name: '',
        street_number: '',
        location: '',
        lga: '',
        state: '',
        city: ''
    });

    const [errors, setErrors] = useState({});
    
    return (
        <FormContext.Provider value={{ formData, setFormData, errors, setErrors }}>
            {children}
        </FormContext.Provider>
    )
}


export const useFormContext = () => useContext(FormContext);
