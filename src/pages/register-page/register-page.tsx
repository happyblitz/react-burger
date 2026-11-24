import { CenteredBlock } from '@/components/centered-block/centered-block';
import { CustomPasswordInput } from '@/components/custom-password-input/custom-password-input';
import { ProtectedRoute } from '@/components/protected-route/protected-route';
import { useForm } from '@/hooks/useForm';
import { useRegisterMutation } from '@/services/api/authApi';
import { getRtkError } from '@/utils/getRtkError';
import { Button, Input, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const RegisterPage = (): React.JSX.Element => {
  const { fieldValues, fieldErrors, handleChange, handleBlur, validValues } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const values = validValues();

    if (!values) {
      return;
    }

    void register(values);
  };

  return (
    <ProtectedRoute auth={false}>
      <CenteredBlock>
        {isLoading && <Preloader />}
        {!isLoading && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="centered-24">
                <h2>Регистрация</h2>
                <Input
                  name="name"
                  placeholder="Имя"
                  type="text"
                  value={fieldValues.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.name)}
                  errorText={fieldErrors.name ?? ''}
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
                />
                <CustomPasswordInput
                  name="password"
                  placeholder="Пароль"
                  value={fieldValues.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.password)}
                  errorText={fieldErrors.password ?? ''}
                />
                {isError && <p className="input__error">{getRtkError(error)}</p>}
                <Button type="primary" htmlType="submit">
                  Зарегистрироваться
                </Button>
              </div>
            </form>
            <div className="centered mt-15 text text_type_main-default text_color_inactive">
              <p>
                Уже зарегистрированы? <Link to="/login">Войти</Link>
              </p>
            </div>
          </>
        )}
      </CenteredBlock>
    </ProtectedRoute>
  );
};
