import React from "react";
import { Form } from "react-bootstrap";

export const CustomInput = ({ label, forwardRef, ...rest }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...rest} ref={forwardRef} />
    </Form.Group>
  );
};

export const CustomSelect = ({
  label,
  options = [],
  onChange,
  value,
  ...rest
}) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select onChange={onChange} value={value} {...rest}>
        <option value=""> -- Select --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};
