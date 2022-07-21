import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './Login.css';

const Login = ({setUser}) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const onSubmit = async (userData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(userData)
      })
      if (res.status === 401) {
        alert("Wrong username or password");
        reset()
        return
      } else {
        const data = await res.json()
        if (data.status === 1) {
          setUser(data)
        }
      }
    } catch (error) {
    }
  }

  return (
    <div className="login-container">
      <form className='entry-form login' onSubmit={handleSubmit((data) => onSubmit(data))}>
        <input className='form-item' {...register("username", { required: "Enter Username" })} type='text' placeholder="Username" />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => <p className='fill_out_form'>{message}</p>}
        />
        <input className='form-item' {...register("password", { required: "Enter Password" })} type='password' placeholder="Password" />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className='fill_out_form'>{message}</p>}
        />
        <input className='form-item submit-btn' type="submit" value={'Login'} />
      </form>
    </div>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
