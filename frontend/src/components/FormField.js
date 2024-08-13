import React from 'react';
import '../index.css'

const FormField = ({ label, type, id, value, onChange, required }) => {
  return (
    <div className="mb-4 w-full">
      <label className="form-label mb-1" htmlFor={id}>
        {label}
      </label> <br/>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded input-field"
        required={required}
      />
    </div>
  );
};

export default FormField;
