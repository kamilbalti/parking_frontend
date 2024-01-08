import { Button, Card, Typography } from '@mui/material'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import ProfileInput from "./ProfileInput"
import axios from 'axios'
import { setUserDetail } from '../../Redux-Toolkit/ParkingSlice'
import Navbar from '../../Navbar/Navbar'
import dayjs from 'dayjs'
import { url } from '../../config'
const Profile = ({closeCheck, setCloseCheck, notify}) => {
    const dispatch = useDispatch()
    const { userDetail } = useSelector(e => e)
    const [name, setName] = useState(userDetail?.name)
    const email = userDetail?.email
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const profileDetail = [{ name: 'Name', inputVal: name, setInputVal: setName }, { name: 'Email', inputVal: email }]
    const changePassword = [{ name: 'Old Password', inputVal: oldPassword, setInputVal: setOldPassword },
    { name: 'New Password', inputVal: newPassword, setInputVal: setNewPassword },
    { name: 'Confirm New Password', inputVal: confirmPassword, setInputVal: setConfirmPassword }]
    const submit = (e) => {
        e.preventDefault()
        update()
    }
    const update = () => {
        let obj = { email: userDetail?.email, password: oldPassword }
        // alert(dayjs(userDetail?.updatedAt)?.isSame(dayjs(), 'day'))
        if (userDetail?.name !== name)
            obj['name'] = name
        if (newPassword == confirmPassword && newPassword?.length >= 8 && oldPassword?.length >= 8)
            obj['newPassword'] = newPassword
        // else notify('Password not match')
        if (Object?.values(obj)?.length != 2 && (!dayjs(userDetail?.updatedAt)?.isSame(dayjs(), 'day') || userDetail?.status === 'Admin'))
            axios.post((`${url}/profile`), { ...obj }).then(async (res) => {
                let tempUpdate = { ...res?.data }
                let temp = { ...userDetail }
                console.log(res?.data, ' res data Update')
                if (res?.data?.name)
                    temp.name = tempUpdate?.name
                else if (res?.data?.password)
                    temp.password = tempUpdate?.password
                // console.log(res?.data, 'mydata')
                localStorage.setItem("token", temp && JSON.stringify(temp))
                notify('Profile Updated Successful')
                dispatch(setUserDetail(temp))
                console.log(temp, " TempUser Check")
            }).catch((err) => notify(err?.response?.data))
        else 
            (dayjs(userDetail?.updatedAt)?.isSame(dayjs(), 'day'))?
            notify('You can only update your profile once a day') 
            :
            notify( !obj?.newPassword && (!!newPassword || !!confirmPassword || !!oldPassword) ? 
            // oldPassword === newPassword ? 
            // "The Password is not Updated because new Password is same as old password!" : 
            newPassword != confirmPassword ? 
            "New Password and Confirm Password Doesn't Match!" 
            : 
            'All Passwords should be atleast 8 letters!' 
            :!obj?.name  && 'Profile is not Changed Please fill the fields to update Profile!' )
        // else notify('The Name and Password is upto date')
    }
    return (
        <div className="ProfileMainDiv">
            <Navbar closeCheck={closeCheck} setCloseCheck={setCloseCheck} heading={'Profile'} className={'ProfileHeading'} />
            <Card className="ProfileCard">
                <form onSubmit={submit}>
                    <h1 className='ProfileHeading'>Profile Details</h1>
                    <Typography className="ProfileRow">
                        {profileDetail?.map((item, index) => (
                            <Typography className={`ProfileColumn ${item?.name == 'Email' ? 'ProfileEmailColumn' : ''}`}>
                                <p>{item?.name} *</p>
                                <input disabled={item?.name == 'Email'} type="text" placeholder={'Enter ' + item?.name.toLowerCase()} value={item?.inputVal} onChange={(e) => {
                                    item?.name !== "Email" &&
                                        item?.setInputVal(e.target.value)
                                }} />
                            </Typography>
                        ))}
                    </Typography>
                    <h1 className='ProfileHeading'>Change Password</h1>
                    <Typography className="ProfileRow">
                        {changePassword?.map((item, index) => (
                            <ProfileInput item={item} />
                        ))}
                    </Typography>
                    <Typography className='ProfileUpdateDiv'>
                        <Button disabled={(dayjs(userDetail?.updatedAt)?.isSame(dayjs(), 'day') && userDetail?.status != 'User')} type="submit" variant='contained' className='ProfileUpdate'>Update</Button>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}
export default Profile