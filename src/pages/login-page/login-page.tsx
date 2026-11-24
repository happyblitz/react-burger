import { CenteredBlock } from '@/components/centered-block/centered-block';
import { CustomPasswordInput } from '@/components/custom-password-input/custom-password-input';
import { ProtectedRoute } from '@/components/protected-route/protected-route';
import { useForm } from '@/hooks/useForm';
import { useLoginMutation } from '@/services/api/authApi';
import { getRtkError } from '@/utils/getRtkError';
import { Button, Input, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const LoginPage = (): React.JSX.Element => {
  const { fieldValues, fieldErrors, handleChange, handleBlur, validValues } = useForm({
    email: '',
    currentPassword: '',
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const values = validValues();

    if (!values) {
      return;
    }

    void login({ email: values.email, password: values.currentPassword });
  };

  return (
    <ProtectedRoute auth={false}>
      <CenteredBlock>
        {isLoading && <Preloader />}
        {!isLoading && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="centered-24">
                <h2>Вход</h2>

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
                  name="currentPassword"
                  placeholder="Пароль"
                  value={fieldValues.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.currentPassword)}
                  errorText={fieldErrors.currentPassword ?? ''}
                />
                {isError && <p className="input__error">{getRtkError(error)}</p>}
                <Button type="primary" htmlType="submit">
                  Войти
                </Button>
              </div>
            </form>
            <div className="centered-8 mt-15 text text_type_main-default text_color_inactive">
              <p>
                Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
              </p>
              <p>
                Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
              </p>
            </div>
          </>
        )}
      </CenteredBlock>
    </ProtectedRoute>
  );
};
