import { CustomPasswordInput } from '@/components/custom-password-input/custom-password-input';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useForm } from '@/hooks/useForm';
import { useUpdateUserMutation } from '@/services/api/authApi';
import { userSelector } from '@/services/slices/userSlice';
import { getRtkError } from '@/utils/getRtkError';
import { Button, Input, Preloader } from '@krgaa/react-developer-burger-ui-components';

export const ProfilePage = (): React.JSX.Element => {
  const user = useAppSelector(userSelector);

  const initialValues = {
    name: user ? user.name : '',
    email: user ? user.email : '',
    updatePassword: '',
  };

  const {
    fieldValues,
    setFieldValues,
    fieldErrors,
    setFieldErrors,
    handleChange,
    handleBlur,
    validValues,
  } = useForm(initialValues);

  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const handleReset = (): void => {
    setFieldValues(initialValues);

    const initialFieldErrors = Object.fromEntries(
      Object.entries(initialValues).map(([fieldName]) => [fieldName, null])
    );
    setFieldErrors(initialFieldErrors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const values = validValues();

    if (!values) {
      return;
    }

    void updateUser(values);
  };

  return (
    <div className="flex-container">
      {isLoading && <Preloader />}
      {!isLoading && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="centered-24">
              <Input
                name="name"
                placeholder="Имя"
                type="text"
                value={fieldValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(fieldErrors.name)}
                errorText={fieldErrors.name ?? ''}
                icon="EditIcon"
              />
              <Input
                name="email"
                placeholder="Email"
                type="text"
                value={fieldValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(fieldErrors.email)}
                errorText={fieldErrors.email ?? ''}
                icon="EditIcon"
              />
              <CustomPasswordInput
                name="updatePassword"
                placeholder="Пароль"
                value={fieldValues.updatePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(fieldErrors.updatePassword)}
                errorText={fieldErrors.updatePassword ?? ''}
              />
              {isError && <p className="input__error">{getRtkError(error)}</p>}
              <div className="ml-auto">
                <Button
                  onClick={handleReset}
                  size="medium"
                  type="secondary"
                  htmlType="reset"
                >
                  Отмена
                </Button>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
