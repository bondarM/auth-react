import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import app from "../firebaseConfig.js";
import { AuthContext } from "../context/AuthContext.js";
import { Form } from "./Form.js";
import validate from './Validate/validate.jsx';
import useForm from "./Validate/useForm.jsx";


const LogIn = ({ history }) => {

  const [errorUser, setErrorUser] = useState(false)

      const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(validate);


  const login = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {

        if (error.code === "auth/user-not-found") {
          setErrorUser("User with this email is not registered")
        }
        else if (error.code === "auth/wrong-password") {
          setErrorUser("Invalid password")
        }

      }
    },
    [history]
  );


  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Log in</h1>
      <Form type={"login"} errorUser={errorUser}
       values={values} errors={errors} 
       handleChange={handleChange} login={login}  textBtn={'Log in'}
        propsFunc={handleSubmit} />
    </>
  );
};

export default withRouter(LogIn);