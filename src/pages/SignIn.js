import React, { useCallback, useState } from "react";
import { Form } from "../components/Form.js";
import validate from '../utils/Validate/validate.jsx';
import useForm from "../utils/Validate/useForm.jsx";
import { ValidateRes } from "../utils/Validate/validateResponse.jsx";
import { signIn } from "../redux/authReducer.js";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../redux/store.js";
import { useHistory } from "react-router-dom";
import * as routes from '../utils/routes'

const LogIn = () => {
  const history = useHistory()
  const [errorUser, setErrorUser] = useState(false)
  const callbackFunc = () => loginHandler(values.email, values.password)
  const dispatch = useAppDispatch()
  const {
    values,
    errors,
    handleChangeInput,
    handleSubmit,
    setErrors
  } = useForm(callbackFunc, validate);

  const loginHandler = useCallback(
    async (email, password) => {
       await dispatch(signIn({email, password}))
       .then(unwrapResult)
       .then(() => {
            setErrors({})
            history.push(routes.home);
          })
          .catch((error) => {
            setErrors(prevErr => ({ ...prevErr, backend: "error" }))
            setErrorUser(ValidateRes(error.code).catchError())
          })
    },
    [history, setErrors, dispatch]
  );

  return (
    <div className="auth-container">
      <h1>Log in</h1>
      <Form
        text={"Not a member yet?"}
        textLink={"Sign Up"}
        link={routes.signUp}
        errorUser={errorUser}
        values={values}
        errors={errors}
        handleChangeInput={handleChangeInput}
        textBtn={"Sign in"}
        submit={handleSubmit} />
    </div>
  );
};

export default LogIn;