import { useAppSelector } from '../../utils/hooks'
import { selectAuth, authenticate, hideError } from '../../features/auth'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../utils/hooks'
import { useEffect, useRef } from 'react'

export function LogIn() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const remember = useRef<HTMLInputElement>(null)
  useEffect(() => {
    dispatch(hideError())
  }, [dispatch])

  if (auth.token !== '') {
    return <Navigate to="/user" />
  }
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    await authenticate({
      email: email!.current!.value,
      password: password!.current!.value,
      rememberToken: remember!.current!.checked,
      dispatch,
    })
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={email} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={password} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" ref={remember} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {auth.loginFailed ? (
            <div className="sign-in-error">Username or Password is wrong.</div>
          ) : (
            ''
          )}
          <button className="sign-in-button" onClick={(e) => handleSubmit(e)}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}
