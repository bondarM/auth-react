import React from 'react'
import { Link } from 'react-router-dom'
export const Form = (
  { submit,
    textBtn,
    textLink,
    link,
    errorUser,
    handleChangeInput,
    values,
    errors,
    text }
) => {

  return (
    <div className="wrapp__form">
      <form onSubmit={(event) => { submit(event) }}>
        <label>
          Email
          <input className={`${errors.email && 'is-danger'}`} onChange={handleChangeInput} value={values.email || ''} name="email" placeholder="Email" />
          {errors.email ? <span>Email address is invalid</span> : ""}
        </label>
        <label>
          Password
          <input className={`${errors.password && 'is-danger'}`} onChange={handleChangeInput} value={values.password || ''} name="password" type="password" placeholder="Password" />
          {errors.password ? <span>Password is invalid</span> : ""}
        </label>
        <button type="submit">{textBtn}</button>
      </form>

      {errorUser ? <div style={{ "color": "red", "marginTop": "10px" }}> {errorUser} </div> : ""}
      
      <div className="go__reg">{text} <Link to={link}>{textLink}</Link></div>
    </div>
  )
}