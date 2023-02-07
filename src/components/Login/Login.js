import React, { useContext, useEffect, useReducer, useState } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false }
}

const passReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false }
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredCollage, setEnteredCollage] = useState('');
  //const [validEnteredCollage, setValidEnteredCollage] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,
    {
      value: '',
      isValid: null
    }
  );

  const [passState, dispatchPass] = useReducer(passReducer,
    {
      value: '',
      isValid: null
    }
  );

  const authCtx = useContext(AuthContext);
  // useEffect(()=>{
  //   console.log("Effect");
  // },)//runs on every time component reneder.
  // useEffect(()=>{
  //   console.log("Effect");
  // },[])//runs only one time.

  const {isValid : emailIsValid} = emailState;
  const {isValid : passwordIsValid} = passState;

  useEffect(() => {
    const indentifier = setTimeout(()=>{
      console.log('Cheking form validity!');
      setFormIsValid(
        emailState.isValid && passState.isValid
      );
    },500)
    return ()=>{
      console.log('CLEANUP');
      clearTimeout(indentifier);
    }
  }, [emailState.isValid, passState.isValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passState.isValid && enteredCollage.trim().length !== 0
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPass({ type: 'USER_INPUT', val: event.target.value })

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid && enteredCollage.trim().length !== 0
    // );
  };

  // const collageChnageHAndler = (event) => {
  //   setEnteredCollage(event.target.value);
  // }

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPass({ type: 'INPUT_BLUR' });
  };

  // const validateCollageHandler = () => {
  //   setValidEnteredCollage(enteredCollage.trim().length !== 0);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogIn(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input
          type="email"
          id="email"
          label = "E-Mail"
          isValid = {emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          type="password"
          id="password"
          label = "Password"
          isValid = {passwordIsValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {/* <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${validEnteredCollage === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collage">Collage Name</label>
          <input
            type="text"
            id="collage"
            value={enteredCollage}
            onChange={collageChnageHAndler}
            onBlur={validateCollageHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
