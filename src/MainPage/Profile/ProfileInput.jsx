import './style.css'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { Typography } from "@mui/material"
import { useState } from "react"

const ProfileInput = ({item}) => {
    const [ passType, setPassType ] = useState('password')
    return (
        <Typography className="ProfileColumn ProfileChangeColumn">
            <p>{item?.name} *</p>
            <input disabled={item?.name == 'Email'} type={passType} placeholder={'Enter ' + item?.name.toLowerCase()} value={item?.inputVal} onChange={(e) => {
                item?.name !== "Email *" &&
                item?.setInputVal(e.target.value)
            }} />
            <button type='button' className='signUpPassIcon ProfileEyeIcon' onClick={() => passType == 'password' ? setPassType('text') : setPassType('password')}>
                {passType == 'password' ?
                    <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
        </Typography>
    )
}
export default ProfileInput