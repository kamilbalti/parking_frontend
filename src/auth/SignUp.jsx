import './SignUp.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios';
import { setUserArr, setUserDetail } from '../Redux-Toolkit/ParkingSlice';
import Input from '../input';
import Option from './Option';
import { url } from '../config';
const SignUp = ({authOpt, setAuthCheck, notify}) => {
    const [reqCheck, setReqCheck] = useState(false)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ name, setName ] = useState("")
    const [check, setCheck] = useState(false)
    const [error, setError] = useState(false)
    const [condition, setCondition] = useState(true)
    const [ tempOpt, setTempOpt ] = useState(false)

let tempObj = {name, email, password}
useEffect(() => {
    if(Object.values(reqCheck)?.length >= 5)
    Object.values(tempObj)?.map((item2) => {
        if ( error || item2.length != 0) {
            setCondition(false)
            Object.values(reqCheck)?.map((item) => {
                if (item2 && item)
                setCondition(true)
            })
        }
    })
}, [email, password, name])

useEffect(() => {
    if(!authOpt)
    setTimeout(() => setTempOpt(false),300)
    else setTempOpt(true)
    setEmail('')
    setPassword('')
},[authOpt])

    const Submit = (e) => {
        e.preventDefault()
        setCheck(true)
        CreateUser()
    }
    const config = {
            headers: {
                'Context-Type': 'application/json'
            }
    }

    const CreateUser = () => {
        const response = axios.post((`${url}/auth/register`),{
            email, password, name
        }, config).then(async(res) => {
            setError(false)
            console.log( await res.data)
            setAuthCheck('Registeration')
            localStorage.setItem("token", res.data && JSON.stringify(res.data))
            dispatch(setUserDetail( await res.data? res.data : false))
            // alert(res?.data)
            setName("")
            setEmail("")
            setPassword("")
        }).catch(async(err) => {
            setError( await err ? err : false)
        })
    }
    return(
            <form className='authDiv' onSubmit={Submit}>
                <h1 className='authHeading'>Signup Form</h1>
                {tempOpt ?
                <>
                <Input authOpt={authOpt} reqCheck={reqCheck} setReqCheck={setReqCheck} su={true} name={'Name'} inputClass={'signUpTextInput'} inputVal={name} setInputVal={setName}/>
                <Input authOpt={authOpt} setErr={setError} su={true} reqCheck={reqCheck} setReqCheck={setReqCheck} checkVal={true} name={'Email'} inputClass={'signUpTextInput'} inputVal={email} setInputVal={setEmail}/>
                <Input authOpt={authOpt} err={error} reqCheck={reqCheck} setReqCheck={setReqCheck} su={true} name={'Password'} inputClass={'signUpTextInput signUpPassInput'} type={'pass'} inputVal={password} setInputVal={setPassword}/>
                <button disabled={condition || error} className={condition || error ? 'signUpButton signUpDisable' : 'signUpButton'} type='submit'>Sign Up</button>
                </> : false
                }
            </form>
    )
}
export default SignUp