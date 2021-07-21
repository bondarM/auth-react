import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "../firebaseConfig.js";
import { Form } from "./Form.js";
import validate from './Validate/validate.jsx';
import useForm from "./Validate/useForm.jsx";


const SignUp = ({ history }) => {
    const [errorUser, setErrorUser] = useState(false)


    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(callbackFunc, validate);



    const signUp = useCallback(
        async (email, password) => {

            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                history.push("/");
            } catch (error) {
                if (error.code === "auth/invalid-email") {
                    setErrorUser("Enter a valid email")
                }
                else if (error.code === "auth/weak-password") {
                    setErrorUser("Password should be at least 6 characters")
                }
                else if (error.code === "auth/email-already-in-use") {
                    setErrorUser("The email address is already in use by another account.")
                }
            }
        }, [history]);


    function callbackFunc() {
        signUp(values.email, values.password)
    }


    return (
        <>
            <h1>Sign up</h1>
            <Form errorUser={errorUser} typeLink={"/login"}
                textLink={'are you already registered ?'}
                values={values} errors={errors}
                handleChange={handleChange} textBtn={'Sign up'} propsFunc={handleSubmit} />
        </>
    );
};

export default withRouter(SignUp);