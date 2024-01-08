import { useState } from "react"
import { Link } from "react-router-dom"
import Input from "../input"

const ForgetPass = () => {
    const [email, setEmail] = useState("")
    const [reqCheck, setReqCheck] = useState(false)
    const [error, setError] = useState(false)
    const condition = reqCheck.invEmail || error || email == ''
    const Submit = () => {

    }
    return (
        <div className="signUpMainDiv">
            <form onSubmit={Submit} className="signUpDiv">
                <h1 className='authHeading'>Forgot Password</h1>
                <Input setErr={setError} su={true} reqCheck={reqCheck} setReqCheck={setReqCheck} checkVal={true} name={'Email'} inputClass={'signUpTextInput'} inputVal={email} setInputVal={setEmail} />

                {/* <h2 className='signUpIntroName'>Email:</h2> */}
                {/* <div className='signUpRowDiv'>
                <input placeholder='Email' name="email" value={email} onChange={(e) => {
                let temp = {...reqCheck}
                temp.email = e.target.value.length == 0
                setReqCheck(temp)
                setEmail(e.target.value)
            }}
            className='signUpTextInput'/>
            {reqCheck.invEmail? <p>Invalid Email</p>: false}
            </div> */}
                <button disabled={condition || error} className={condition ? 'signUpButton signUpDisable' : 'signUpButton'} type='submit'>Forget Password</button>
                <p className='signUpPara'>Remember your password <Link className='signUpLink' to={'/'}>Sign In</Link></p>
            </form>
        </div>

    )
}
export default ForgetPass