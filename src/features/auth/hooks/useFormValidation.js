import { useState, useEffect } from 'react'

export const useFormValidation = (initialState, schema, options=[]) => {

    const [values, setValues] = useState (initialState);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {

        const {name, value} = e.target;

        setValues((prev)=>({
            ...prev,
            [name]:value
        }));

        if (errors[name]) {
            setErrors((prev)=>({
                ...prev,
                [name]:null,
            }));
        }
    }

    const handleOption = (data, valueKey = 'id', labelKey = 'name') => {
        if (!Array.isArray(data)) return [];

        return data.map((item) => ({
            value: item[valueKey],
            label: item[labelKey],
        }));
    };

    const validate = () => {
    
        const result = schema.safeParse(values);

        if (!result.success) {

            const formattedErrors = {};

            result.error.issues.forEach(issue => {
                
                const fieldName = issue.path[0]
                if(!formattedErrors[fieldName]) {

                    formattedErrors[fieldName] = issue.message;
                }
            });

            setErrors(formattedErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const resetForm = () => {
        setValues(initialState);
        setErrors({});
    };

    return { values, errors, handleChange, handleOption, validate, resetForm };
};
