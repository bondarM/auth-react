import React from 'react'
import { Link } from 'react-router-dom'
export const Form = ({ propsFunc, textBtn, textLink, typeLink, errorUser, handleChange, values, errors }) => {

    return (
        
        <div className="wrapp__form">
                <>
                    <form onSubmit={(event) => { propsFunc(event) }}>
                        <label>
                            Email
                            <input className={`${errors.email && 'is-danger'}`} onChange={handleChange} value={values.email || ''} name="email"  placeholder="Email" />
                            {errors.email ? <span>Email address is invalid</span> : "" }
                        </label>
                        <label>
                            Password
                            <input className={`${errors.password && 'is-danger'}`} onChange={handleChange} value={values.password || ''} name="password" type="password" placeholder="Password" />
                            {errors.password  ? <span>Password is invalid</span> : "" }
                        </label>

                        <button type="submit">{textBtn}</button>
                    </form>
                    {errorUser ? <div style={{ "color": "red", "marginTop": "10px" }}> {errorUser} </div> : ""}

                    <div className="go__reg">{textLink} <Link to={typeLink}>go</Link></div>
                </>
        </div>
    )
}

