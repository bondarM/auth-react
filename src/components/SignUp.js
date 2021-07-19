import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "../firebaseConfig.js";
import { Form } from "./Form.js";



const SignUp = ({ history }) => {
    const [errorUser, setErrorUser] = useState(false)


    const signUp = useCallback(async event => {
        event.preventDefault();

        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setErrorUser("Enter a valid email")
            }
            else if (error.code === "auth/weak-password") {
                setErrorUser("Password should be at least 6 characters")
            }
            else if(error.code === "auth/email-already-in-use"){
                setErrorUser( "The email address is already in use by another account.")
            }
        }
    }, [history]);

    return (
        <>
            <h1>Sign up</h1>
            <Form errorUser={errorUser} textBtn={'Sign up'} propsFunc={signUp} />
        </>
    );
};

export default withRouter(SignUp);