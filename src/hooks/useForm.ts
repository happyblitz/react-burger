import { fieldValidator } from '@/utils/validator';
import { useState } from 'react';

type TFieldValues = Record<string, string>;
type TFieldErrors = Record<string, string | null>;

type TUseForm = {
  fieldValues: TFieldValues;
  setFieldValues: React.Dispatch<React.SetStateAction<TFieldValues>>;
  fieldErrors: TFieldErrors;
  setFieldErrors: React.Dispatch<React.SetStateAction<TFieldErrors>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  validValues: () => Record<string, string> | null;
};

export const useForm = (initialValue: TFieldValues): TUseForm => {
  const initialFieldErrors: TFieldErrors = Object.fromEntries(
    Object.entries(initialValue).map(([fieldName]) => [fieldName, null])
  );

  const [fieldValues, setFieldValues] = useState(initialValue);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldValues({
      ...fieldValues,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value.trim();
    const fieldName = event.currentTarget.name;
    if (!value) {
      setFieldErrors({ ...fieldErrors, [fieldName]: null });
      return;
    }

    setFieldErrors({ ...fieldErrors, [fieldName]: fieldValidator(fieldName, value) });
  };

  const validValues = (): Record<string, string> | null => {
    const values = Object.fromEntries(
      Object.entries(fieldValues).map(([fieldName, fieldValue]) => [
        fieldName,
        fieldValue.trim(),
      ])
    );

    const errors = Object.fromEntries(
      Object.entries(values).map(([fieldName, fieldValue]) => [
        fieldName,
        fieldValidator(fieldName, fieldValue),
      ])
    );

    for (const field in errors) {
      if (errors[field]) {
        setFieldErrors({ ...fieldErrors, ...errors });
        return null;
      }
    }

    return values;
  };

  return {
    fieldValues,
    setFieldValues,
    fieldErrors,
    setFieldErrors,
    handleChange,
    handleBlur,
    validValues,
  };
};
