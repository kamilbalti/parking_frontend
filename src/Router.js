import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SignUp from "./auth/SignUp"
import SignIn from "./auth/SignIn"
import { useDispatch, useSelector } from "react-redux"
import { setParkingData, setUserDetail } from "./Redux-Toolkit/ParkingSlice"
import { useEffect, useState } from "react"
// import { CirclesWithBar, ColorRing } from "react-loader-spinner"
// import io from 'socket.io-client'
import Loading from "./Loading"
import ForgetPass from "./auth/ForgetPass"
import Dashboard from "./MainPage/Dashboard"
import AllFeatures from "./AllFeatures/AllFeatures"
import Profile from "./MainPage/Profile"
import AllUser from "./MainPage/AllUser"
import PrevParking from "./MainPage/PrevParking"
import BookedParking from "./MainPage/BookedParking"
import axios from "axios"
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { url } from './config';


const MyRouter = () => {
    const dispatch = useDispatch()
    const [closeCheck, setCloseCheck] = useState(false)
    const [authCheck, setAuthCheck] = useState('loading')
    const [check, setCheck] = useState(false)
    const { pathname } = useLocation()
    const userDetail = useSelector((e) => e?.userDetail)
    const temptoken = localStorage.getItem("token")
    const [AllUserData, setAllUserData] = useState('loading');
    const [AllBookDetail, setAllBookDetail] = useState('loading')
    const [AllSlotDetail, setAllSlotDetail] = useState('loading')
    const [BookingData, setBookingData] = useState('loading')
    const notify = (message) => toast(message)

    useEffect(() => {
        if (authCheck && authCheck != 'loading') {
            notify(`${authCheck} Successful!`)
        }
        else if (!authCheck)
            notify('You are logged out!')
    }, [authCheck])

    useEffect(() => {
        if (!!temptoken && temptoken != 'false' && temptoken != null) {
            const user = typeof temptoken == 'string' ? JSON.parse(temptoken) : false
            if (user && user != 'false')
                dispatch(setUserDetail((user == "false" || !user) ? false : user))
            else dispatch(setUserDetail(false))
            setCheck(true)

            if (user?.token) {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                        'Content-Type': 'application/json'
                    }
                }
                axios.get((`${url}/parking/getUsers`), config).then(async (res) => {
                    let tempData = []
                    res?.data?.filter((item, index) => item?.email != user?.email)?.map((item, index) => {
                        item.index = index + 1
                        tempData.push(item)
                    })
                    setAllUserData(tempData)
                })
                axios.get((`${url}/parking/getAllBook`), config).then(async (res) => {
                    setAllBookDetail(res?.data?.flatMap((item, index) => item.array))
                }, config)
                axios.get((`${url}/parking/getAllSlots`), config).then(async (res) => {
                    setAllSlotDetail(res?.data?.flatMap((item, index) => item.array))
                }, config)
                axios.post((`${url}/parking/getBookDetail`), { person: user && user?._id }, config).then((res) => {
                    setBookingData(res?.data)
                }).catch((err) => {
                    // console.log(err)
                    setBookingData(false)
                })
                axios.get((`${url}/parking/getArea`), config)
                    .then(async (res) => {
                        dispatch(setParkingData(res?.data))
                    })
            }
            else {
                dispatch(setUserDetail(false))
                setAllUserData(false)
                setAllBookDetail(false)
                setAllSlotDetail(false)
                setBookingData(false)
            }
        }
        else {
            dispatch(setUserDetail(false))
            setAllUserData(false)
            setAllBookDetail(false)
            setAllSlotDetail(false)
            setBookingData(false)
        }
    }, [temptoken])

    // useEffect(() => {
    //     // setTimeout(() => {    
    //         const socket = io.connect('http://localhost:4000/')
    //         const data = 'room'
    //         socket.emit("join_room", data)
    //     //     console.log(socket)
    //     // },10000)

    // },[])
    const condition = userDetail != 'loading' || String(userDetail) != 'loading'
    return (
        <div className="App">
            <ToastContainer />
            {userDetail ?
                <AllFeatures setAuthCheck={setAuthCheck} status={userDetail.status} closeCheck={closeCheck}
                    setCloseCheck={setCloseCheck} name={userDetail.name} />
                : false}
            <div className={(
                !userDetail) ? "MainPageMainDiv" :
                'MainPageMainDiv MainPageDiv2'
            }>
                {condition &&
                    AllSlotDetail != 'loading' &&
                    BookingData != 'loading' &&
                    AllUserData != 'loading' && AllBookDetail != 'loading' ?
                    <Routes>
                        <Route path={'/auth'} element={condition && userDetail ? <Navigate to={'/dashboard'} /> : <SignIn setAuthCheck={setAuthCheck} />} />
                        <Route path={'/dashboard'} element={condition && userDetail ?
                            <Dashboard totalSlots={AllSlotDetail} AllBookingDetail={AllBookDetail} user={AllUserData} closeCheck={closeCheck} setCloseCheck={setCloseCheck} />
                            : <Navigate to={'/auth'} />} />
                        <Route path={'/profile'} element={condition && userDetail ?
                            <Profile notify={notify} closeCheck={closeCheck} setCloseCheck={setCloseCheck} />
                            : <Navigate to={'/auth'} />} />
                        <Route path={'/all-parking'} element={condition && userDetail ?
                            <PrevParking notify={notify} closeCheck={closeCheck} setCloseCheck={setCloseCheck} />
                            : <Navigate to={'/auth'} />} />
                        <Route path={'/booking-history'} element={condition && userDetail ?
                            <BookedParking data={BookingData} setData={setBookingData} closeCheck={closeCheck} setCloseCheck={setCloseCheck} />
                            : <Navigate to={'/auth'} />} />
                        <Route path={'/users'} element={condition && userDetail ?
                            <AllUser data={AllUserData} setData={setAllUserData} closeCheck={closeCheck} setCloseCheck={setCloseCheck} /> :
                            <Navigate to={'/auth'} />} />
                        <Route path={'*'} element={condition && userDetail ? <Navigate to={'/dashboard'} /> : <Navigate to={'/auth'} />} />
                    </Routes>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}
export default MyRouter