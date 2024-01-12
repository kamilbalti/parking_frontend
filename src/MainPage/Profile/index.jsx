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
const Profile = ({ closeCheck, setCloseCheck, notify }) => {
    const [disable, setDisable] = useState(false)
    const dispatch = useDispatch()
    const userDetail = useSelector((e) => e?.userDetail)
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
        if (userDetail?.name !== name)
            obj['name'] = name
        if (newPassword == confirmPassword && newPassword?.length >= 8 && oldPassword?.length >= 8)
            obj['newPassword'] = newPassword
        if (Object?.values(obj)?.length != 2 && ((!dayjs(userDetail?.updatedAt)?.isSame(dayjs(), 'day') || userDetail?.status === 'Admin'))) {
            setDisable(false)
            axios.post((`${url}/profile`), { ...obj }).then(async (res) => {
                let tempUpdate = { ...res?.data }
                let temp = { ...userDetail }
                if (res?.data?.name) {
                    temp.name = tempUpdate?.name
                    temp.updatedAt = tempUpdate?.updatedAt
                }
                else if(res?.data?.name == '')
                    notify(`You can't set name Empty`)
                else if (res?.data?.password) {
                    temp.password = tempUpdate?.password
                    temp.updatedAt = tempUpdate?.updatedAt
                }
                // notify('')
                if (res?.data?.name || res?.data?.password) {
                    localStorage.setItem("token", temp && JSON.stringify(temp))
                    notify('Profile Updated Successful')
                    dispatch(setUserDetail(temp))
                }
            }).catch((err) => notify(err?.response?.data))
        }
        else
            ((dayjs(userDetail?.updatedAt)?.format('YYYY-MM-DD')) === (dayjs()?.format('YYYY-MM-DD'))
                && userDetail?.status !== 'Admin') ?
                notify('You can only update your profile once a day')
                :
                notify(!obj?.newPassword && (!!newPassword || !!confirmPassword || !!oldPassword) ?
                    newPassword != confirmPassword ?
                        "New Password and Confirm Password Doesn't Match!"
                        :
                        'All Passwords should be atleast 8 letters!'
                    : !obj?.name && 'Profile is not Changed Please fill the fields to update Profile!')
        setDisable(true)
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
                                    if (userDetail?.status === 'Admin' && disable)
                                        setDisable(false)
                                    item?.name !== "Email" && e.target.value?.length <= 35 &&
                                        item?.setInputVal(e.target.value)
                                }} />
                            </Typography>
                        ))}
                    </Typography>
                    <h1 className='ProfileHeading'>Change Password</h1>
                    <Typography className="ProfileRow">
                        {changePassword?.map((item, index) => (
                            <ProfileInput disable={disable} setDisable={setDisable} item={item} />
                        ))}
                    </Typography>
                    <Typography className='ProfileUpdateDiv'>
                        <Button disabled={disable} type="submit" variant='contained' className='ProfileUpdate'>Update</Button>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}
export default Profile