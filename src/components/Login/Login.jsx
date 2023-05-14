import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);

    console.log(location);

    const from = location.state?.from?.pathname || '/';

    console.log(from);


    const handleLogin =event=>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace: true})
        })
        .catch(error=>{
            console.log(error);
        })
    }


    return (
        <div className='form-contaoner'>
            <h2 className='form-title'>Login</h2>
            
            <form onSubmit={handleLogin}>
                <div className='form-control'>
                    <label htmlFor="password">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name='password' required />
                    <p onClick={()=>setShow(!show)}><span>
                        {
                            show ? <span>Hide password</span> : <span>Show password</span>
                        }
                        </span></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />

            </form>

            <p><small>New to Ema-Jon? <Link to='/signup'>Create new account</Link></small></p>
        </div>
    );
};

export default Login;