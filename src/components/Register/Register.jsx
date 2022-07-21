import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const Register = ({setIsRegisterOpen}) => {
  const { register, handleSubmit, formState: { errors }, clearErrors, setError, reset } = useForm();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = async (userData) => {
    clearErrors();
    const { username, password , email } = userData
    try {
      if (!validateEmail(email)){
        setError(
            "email",
            {
                type: "manual",
                message: "Invalid email address"
            },
            { shouldFocus: true }
        );
        return;
      }
      const data = {
        username,
        password,
        email
      }
      const req = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      })
      const res = await req.json()
      if (res.success) {
        alert('User Registered Succefully')
        setIsRegisterOpen(false)
      } else {
        alert('Username or email taken!')
        reset()
      }
    } catch(err) {
    }
  }

  return (
    <form className='entry-form register' onSubmit={handleSubmit((data) => onSubmit(data))}>
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
      <input className='form-item' {...register("email", { required: "Enter email!" })} type='email' placeholder="Email" />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <p className='fill_out_form'>{message}</p>}
        />
      <input className='form-item submit-btn' type="submit" value='Register User' />
    </form>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
