import { CenteredBlock } from '@/components/centered-block/centered-block';
import { CustomPasswordInput } from '@/components/custom-password-input/custom-password-input';
import { ProtectedRoute } from '@/components/protected-route/protected-route';
import { useForm } from '@/hooks/useForm';
import { useResetPasswordMutation } from '@/services/api/authApi';
import { getRtkError } from '@/utils/getRtkError';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';

export const ResetPasswordPage = (): React.JSX.Element => {
  const { fieldValues, fieldErrors, handleChange, handleBlur, validValues } = useForm({
    password: '',
    token: '',
  });

  const [resetPassword, { isError, error, data }] = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const values = validValues();

    if (!values) {
      return;
    }

    void resetPassword(values as { password: string; token: string });
  };

  if (data?.success) {
    localStorage.removeItem('isResetPasswordRequested');
    return <Navigate to={'/login'} />;
  }

  return (
    <ProtectedRoute auth={false}>
      <CenteredBlock>
        <form onSubmit={handleSubmit}>
          <div className="centered-24">
            <h2>Восстановление пароля</h2>
            <CustomPasswordInput
              name="password"
              placeholder="Введите новый пароль"
              value={fieldValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(fieldErrors.password)}
              errorText={fieldErrors.password ?? ''}
            />
            <Input
              name="token"
              placeholder="Введите код из письма"
              type="text"
              value={fieldValues.token}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(fieldErrors.token)}
              errorText={fieldErrors.token ?? ''}
            />
            {isError && <p className="input__error">{getRtkError(error)}</p>}
            <Button type="primary" htmlType="submit">
              Сохранить
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
