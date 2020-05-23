import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, title, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className="group-fields">
      <label for={name} className="field-title">
        {title}
      </label>
      <input
        ref={inputRef}
        className={"input" + (error ? "has-error" : "")}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && (
        <label for={name} className="text-danger error">
          {error}
        </label>
      )}
    </div>
  );
}
