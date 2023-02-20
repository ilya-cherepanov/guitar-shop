import { FormEventHandler, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthorizationStatus } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { checkUser, registerUser, selectAuthorizationStatus } from "../../store/slices/user-slice";

export default function RegistrationPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
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

    if (!email || !password || !name) {
      return;
    }

    await dispatch(registerUser({email, password, name})).unwrap();
    await dispatch(checkUser()).unwrap();
    navigate('/');
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleSubmit}>
            <div className="input-login">
              <label htmlFor="name">Введите имя</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                value={name ?? ''}
                onChange={({target: {value}}) => setName(value)}
                required
              />
              {name !== null && name === '' && <p className="input-login__error">Заполните поле</p>}
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                value={email ?? ''}
                onChange={({target: {value}}) => setEmail(value)}
                required
              />
              {email !== null && email === '' && <p className="input-login__error">Заполните поле</p>}
            </div>
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label>
              <span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="• • • • • • • • • • • •"
                  id="password"
                  name="password"
                  autoComplete="off"
                  value={password ?? ''}
                  onChange={({target: {value}}) => setPassword(value)}
                  required
                />
                <button className="input-login__button-eye" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              {password !== null && password ==='' && <p className="input-login__error">Заполните поле</p>}
            </div>
            <button
              className="button login__button button--medium"
              type="submit"
            >
              Зарегистрироваться
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
