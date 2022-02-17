import { useField } from 'formik';
import React from 'react';
import { FormField, Label, Select } from 'semantic-ui-react';

function AppSelectInput({ label, onSelectValue = null, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, d) => {
          helpers.setValue(d.value);
          onSelectValue && onSelectValue(d.value);
        }}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.error && meta.touched ? (
        <Label basic color='red' content={meta.error} />
      ) : null}
    </FormField>
  );
}

export default AppSelectInput;
