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
    } = useForm(callbackFunc, validate);


  const login = useCallback(
    async (email, password) => {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password);
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

  function callbackFunc(){
    login(values.email, values.password)
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Log in</h1>
      <Form textLink={'not register ?'} typeLink={"/signup"} errorUser={errorUser}
       values={values} errors={errors} 
       handleChange={handleChange} login={login}  textBtn={'Log in'}
        propsFunc={handleSubmit} />
    </>
  );
};

export default withRouter(LogIn);