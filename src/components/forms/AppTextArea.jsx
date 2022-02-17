import { useField } from 'formik';
import React from 'react';
import { FormField, Label } from 'semantic-ui-react';

function AppTextArea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea rows={2} {...field} {...props}></textarea>
      {meta.touched && meta.error ? (
        <Label basic color='red' content={meta.error} />
      ) : null}
    </FormField>
  );
}

export default AppTextArea;
