export default function validate(values) {

    let errors = {};

    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

  

    if(values.password){
        values.password = values.password.trim();
    }

    if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be 8 or more characters';
      }
    return errors;
  };