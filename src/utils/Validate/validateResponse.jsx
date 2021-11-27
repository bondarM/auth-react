export const ValidateRes = (errorRes) => {
    const errorCodes = [
        { error: "auth/user-not-found", message: "User with this email is not registered" },
        { error: "auth/wrong-password", message: "Invalid password" },
        { error: "auth/too-many-requests", message: "To many requests, try again later" },
        { error: "auth/invalid-email", message: "Enter a valid email" },
        { error: "auth/weak-password", message: "Password should be at least 6 characters" },
        { error: "auth/email-already-in-use", message: "The email address is already in use by another account." }
    ]
    const catchError = () => {
        let newErr
        errorCodes.map((errCode) => {
            if (errCode.error === errorRes) {
                newErr = errCode.message
                return errCode.message
            }
            return "Error, Please enter valid data"
        })
        return newErr
    }
    return {
        catchError
    }
}
