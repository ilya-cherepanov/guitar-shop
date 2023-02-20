import { FormEventHandler, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkUser, loginUser, selectAuthorizationStatus } from '../../store/slices/user-slice';

export default function LoginPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to="/" />
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      return;
    }

    await dispatch(loginUser({email, password})).unwrap();
    await dispatch(checkUser()).unwrap();
    navigate('/');
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">
            Hовый пользователь?{' '}
            <Link className="login__link" to="/registration">
              Зарегистрируйтесь
            </Link>{' '}
            прямо сейчас
          </p>
          <form method="post" action="/" onSubmit={handleSubmit}>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                value={email ?? ''}
                onChange={({target: {value}}) => setEmail(value)}
              />
              {email !== null && email === '' && <p className="input-login__error">Заполните поле</p>}
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label>
              <span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="• • • • • • • • • • • •"
                  id="passwordLogin"
                  name="password"
                  autoComplete="off"
                  required
                  value={password ?? ''}
                  onChange={({target: {value}}) => setPassword(value)}
                />
                <button className="input-login__button-eye" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              {password !== null && password === '' && <p className="input-login__error">Заполните поле</p>}
            </div>
            <button
              className="button login__button button--medium"
              type="submit"
            >
              Войти
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
