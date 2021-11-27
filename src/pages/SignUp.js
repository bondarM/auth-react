import React, { useCallback, useState } from "react";
import { Form } from "../components/Form.js";
import validate from '../utils/Validate/validate.jsx';
import useForm from "../utils/Validate/useForm.jsx";
import { ValidateRes } from "../utils/Validate/validateResponse.jsx";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../redux/store.js";
import { signUp } from "../redux/authReducer.js";
import { unwrapResult } from "@reduxjs/toolkit";
import * as routes from '../utils/routes'

const SignUp = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [errorUser, setErrorUser] = useState(false)
  const callbackFunc = () => signUpHandler(values.email, values.password)
  const {
    values,
    errors,
    handleChangeInput,
    handleSubmit,
    setErrors
  } = useForm(callbackFunc, validate);

  const signUpHandler = useCallback(
    async (email, password) => {
      await dispatch(signUp({email, password}))
          .then(unwrapResult)
          .then(() => history.push(routes.home))
          .catch((error) => {
            setErrors(prevErr => ({ ...prevErr, backend: "error" }))
            setErrorUser(ValidateRes(error.code).catchError())
          })
    }, [history, setErrors, dispatch]);

  return (
    <div className="auth-container">
      <h1>Sign up</h1>
      <Form
        errorUser={errorUser}
        link={routes.signIn}
        text={"Already a member?"}
        textLink={"Sign In"}
        values={values}
        errors={errors}
        handleChangeInput={handleChangeInput}
        textBtn={"Sign up"}
        submit={handleSubmit} />
    </div>
  );
};

export default SignUp;