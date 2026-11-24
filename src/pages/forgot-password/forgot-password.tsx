import { CenteredBlock } from '@/components/centered-block/centered-block';
import { ProtectedRoute } from '@/components/protected-route/protected-route';
import { useForm } from '@/hooks/useForm';
import { useForgotPasswordMutation } from '@/services/api/authApi';
import { getRtkError } from '@/utils/getRtkError';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const { fieldValues, fieldErrors, handleChange, handleBlur, validValues } = useForm({
    email: '',
  });

  const [forgotPassword, { isError, error, data }] = useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const values = validValues();

    if (!values) {
      return;
    }

    void forgotPassword({ email: values.email });
  };

  if (data?.success) {
    localStorage.setItem('isResetPasswordRequested', 'ok');
    return <Navigate to={'/reset-password'} />;
  }

  return (
    <ProtectedRoute auth={false}>
      <CenteredBlock>
        <form onSubmit={handleSubmit}>
          <div className="centered-24">
            <h2>Восстановление пароля</h2>
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
            {isError && <p className="input__error">{getRtkError(error)}</p>}
            <Button type="primary" htmlType="submit">
              Восстановить
            </Button>
          </div>
        </form>
        <div className="centered mt-15 text text_type_main-default text_color_inactive">
          <p>
            Вспомнили пароль? <Link to="/login">Войти</Link>
          </p>
        </div>
      </CenteredBlock>
    </ProtectedRoute>
  );
};
