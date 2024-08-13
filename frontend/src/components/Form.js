import React from 'react';
import FormField from './FormField';

const Form = ({ fields, onSubmit, submitText }) => {
  if (!fields || !Array.isArray(fields)) {
    console.error('Invalid fields prop:', fields);
    return <p>Error: Fields are not provided correctly.</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <FormField
          key={field.id}
          label={field.label}
          type={field.type}
          id={field.id}
          value={field.value}
          onChange={field.onChange}
          required={field.required}
        />
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-black rounded"
      >
        {submitText}
      </button>
    </form>
  );
};

export default Form;
