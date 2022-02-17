import { useField, useFormikContext } from 'formik';
import React from 'react';
import { FormField, Label } from 'semantic-ui-react';

function AppFileInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  console.log(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input
        type='file'
        {...props}
        {...field}
        onChange={e => setFieldValue(props.name, e.target.files[0])}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red' content={meta.error} />
      ) : null}
    </FormField>
  );
}

export default AppFileInput;
