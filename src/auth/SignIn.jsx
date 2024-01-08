import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetail } from '../Redux-Toolkit/ParkingSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Input from '../input';
import Option from './Option';
import SignUp from './SignUp';
import { ToastContainer, toast } from 'react-toastify';
import { url } from '../config';

const SignIn = ({setAuthCheck}) => {
    const [email, setEmail] = useState("")
    const [ wait, setWait ] = useState(false)
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const [ authOpt, setAuthOpt ] = useState(false)
    const [passBorder, setPassBorder] = useState(false)
    const [check, setCheck] = useState(false)
    const [error, setError] = useState(false)
    const condition = email == '' || password == ''
    const Submit = (e) => {
        e.preventDefault()
        setCheck(true)
        LogIn()
    }
    const notify = (message) => toast(message)
    const LogIn = (e) => {
        setWait(true)
        // dispatch(setUserDetail('loading'))
        // const response = 
        axios.post((`${url}/auth/logIn`), {
            email, password
        }).then(async (res) => {
            // console.log(res.data)
            setAuthCheck('Login')
            localStorage.setItem("token", res.data && JSON.stringify(res.data))
            // notify('Login Successful')
            dispatch(setUserDetail(res.data ? res.data : false))
            setWait(false)
        }).catch(async (err) => {
            notify('UnSuccessful: ' + (typeof err?.response?.data == 'string' ? err?.response?.data : err))
            console.log(err)
            setError(err)
            dispatch(setUserDetail(false))
            setWait(false)
        })
    }

    useEffect(() => {
        setEmail('')
        setPassword('')
    },[authOpt])
    const option = ['Login', 'SignUp']
    return (
        <>
        <div className="signUpMainDiv">
            <div className="signUpDiv">
            <Option divClass={'OptionDiv'} option={option} setOpt={setAuthOpt} opt={authOpt} cl={authOpt ? 'right' : 'left'} />
            <div className="signUpDiv2">
            <div className="signUpDiv3" style={{transform: `translateX(${authOpt? 'calc(-50% - 25px)' : '0%'})`}}>
                {/* <p className='forgetPara'><Link className='forgetPara' to={'/forget-password'}>Forgot Password</Link></p> */}
            <form className='authDiv' onSubmit={Submit}>
                <h1 className='authHeading authHeading1'>LOGIN</h1>
                <>
                <Input authOpt={authOpt} si={true} setErr={setError} name={'Email'} inputClass={'signUpTextInput'} inputVal={email} setInputVal={setEmail} />
                <Input authOpt={authOpt} si={true} err={error} setErr={setError} passBorder={passBorder} setPassBorder={setPassBorder} name={'Password'} inputClass={'signUpTextInput signUpPassInput'} inputVal={password} setInputVal={setPassword} type='pass' />
                <button disabled={wait || condition || error} className={condition || error ? 'signUpButton signUpDisable' : 'signUpButton'} type='submit'>Sign In</button>
                </>
                <p className='signUpPara'>Don't have an account <Link className='signUpLink' onClick={() => setAuthOpt(true)}>Register</Link></p>
            </form>
            <SignUp notify={notify} setAuthCheck={setAuthCheck} authOpt={authOpt}/>
            </div>
            </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}
export default SignIn