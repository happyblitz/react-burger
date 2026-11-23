/**
 * Валидация полей форм
 */

const VALIDATION_RULES = {
  name: {
    validator: /^.{2,40}$/,
    error: '2–40 символов',
  },
  email: {
    validator:
      /^[0-9A-Za-z]+([-_+.][0-9A-Za-z]+)*@[0-9A-Za-z]+(-[0-9A-Za-z]+)*\.[A-Za-z]{2,}$/,
    error: `некорректный email`,
  },
  password: {
    validator: /^\S{6,40}$/,
    error: '6–40 символов',
  },
  updatePassword: {
    validator: (value: string) => {
      return value === '' || /^\S{6,40}$/.test(value);
    },
    error: '6–40 символов',
  },
  currentPassword: {
    validator: /\S/,
    error: 'Введите ваш текущий пароль',
  },
  token: {
    validator: /\S/,
    error: 'Поле не может быть пустым',
  },
} as const;

export const fieldValidator = (fieldName: string, value: string): null | string => {
  if (!(fieldName in VALIDATION_RULES)) {
    return null;
  }

  const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];
  const { validator, error } = rule;
  const type = validator.constructor.name;

  let isValid;
  if (type === 'RegExp') {
    isValid = (validator as RegExp).test(value);
  } else if (type === 'Function') {
    isValid = (validator as (v: string) => boolean)(value);
  }

  return isValid ? null : error;
};
