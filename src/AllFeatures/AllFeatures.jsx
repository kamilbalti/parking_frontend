import CloseIcon from '@mui/icons-material/Close';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import GridViewIcon from '@mui/icons-material/GridView';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LogoutIcon from '@mui/icons-material/Logout';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import React, { useEffect, useState } from 'react'
import './AllFeatures.css'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetail } from '../Redux-Toolkit/ParkingSlice';
import { Box, Button, ButtonGroup, Modal } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import logo from '../photos/logo.png'



const AllFeatures = ({ status, closeCheck, setCloseCheck, setAuthCheck
    // , setSelect, select 
}) => {
    const  navigate = useNavigate()
    const { pathname } = useLocation()
    // const [pathname, setPathname] = useState(typeof window != undefined && window?.location?.pathname)
    const [logOutCheck, setLogOutCheck] = useState(false)
    const [select, setSelect] = useState(false)
    const dispatch = useDispatch()
    const userDetail = useSelector((e) => e?.userDetail)

    const arr = [
        ["Dashboard", "All Parking", "Booking History", 'Profile'],
        ["Dashboard", "All Parking", "Users", "Profile"],
    ]
    const iconArr = [
        [<GridViewIcon className='AllFeaturesIcon' />, <LocalParkingIcon className='AllFeaturesIcon' />,
        <EventAvailableIcon className='AllFeaturesIcon' />, <PersonPinIcon className='AllFeaturesIcon' />],
        [<GridViewIcon className='AllFeaturesIcon' />, <LocalParkingIcon className='AllFeaturesIcon' />,
        <PersonOutlineIcon className='AllFeaturesIcon' />,
        <PersonPinIcon className='AllFeaturesIcon' />]
    ]

    let arrNum = status == "Admin" ? 1 : 0


    // const changeSelect = (index) => {
    //     if (select !== index && closeCheck !== 'profile')
    //         setSelect(index);
    //     if ((window !== 'undefined') && window.innerWidth <= 600 && closeCheck !== 'profile')
    //         close()
    // }
    const logOut = () => {
        const token = false
        localStorage.setItem("token", token)
        setAuthCheck(false)
        dispatch(setUserDetail(token))
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '0',
        outline: 'none',
        boxShadow: 24,
        p: 3,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '4px'
    };

    return (
        <>
        {userDetail?.status ? <>
            <div className={closeCheck ? "AllFeaturesColumnDiv" : 'AllFeaturesColumnDiv AllFeaturesDiv2'}>
                <div onClick={() => setCloseCheck(false)} className='closeIconDiv'><CloseIcon /></div>
                <Modal open={logOutCheck} aria-labelledby="modal-modal-title" onClose={() => setLogOutCheck(false)}
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <h2 style={{ margin: '4px 0 23px', color: 'rgb(20, 20, 20)', letterSpacing: '0.15px' }}>Logout</h2>
                        <p style={{ color: 'rgb(150, 150, 150)', marginBottom: '19px', letterSpacing: '0.15px' }}>Are you sure you want to logout?</p>
                        <ButtonGroup style={{ display: 'flex', width: '100%', height: '50px' }} variant="text" aria-label="text button group">
                            <Button onClick={logOut} variant="outline" style={{ fontSize: '14px', color: 'rgb(211, 47, 47)', borderTop: '1px solid rgb(200, 200, 200)', display: 'flex', width: '50%', borderColor: 'rgb(200, 200, 200)', textTransform: 'none' }}>Yes</Button>
                            <Button onClick={() => setLogOutCheck(false)} variant="outline" style={{ fontSize: '14px', color: 'rgb(235, 180, 30)', borderTop: '1px solid', display: 'flex', width: '50%', borderColor: 'rgb(200, 200, 200)', textTransform: 'none' }}>No</Button>
                        </ButtonGroup>
                    </Box>
                </Modal>
                <div className={"AllFeaturesMainDiv"}>
                    <div onClick={() => navigate('/dashboard')} className='AllFeaturesFirstDiv'>
                        <div className='AllFeaturesMainHeading'>
                            <img width="65px" src={logo} />
                            <div>
                                <h2 className='AllFeaturesHeading2'>ParkEasy</h2>
                                <p className='AllFeaturesPara'>Parking Made Effortless</p>
                            </div>
                        </div>
                    </div>
                    <h2 onClick={() => navigate('/dashboard')} className='AllFeaturesHeading AllFeaturesCenter'>
                        {userDetail?.status == 'Admin' ? 'Hi Admin' : 'Hi User'}
                    </h2>
                    <div>
                        {arr[arrNum].map((item, index) =>
                            <Link key={index} onClick={() => setCloseCheck(false)}
                                to={`/${item.replace(' ', '-').toLowerCase()}`}
                                // onClick={() => changeSelect(index)} 
                                // key={index} 
                                className={pathname && pathname.includes(`/${item?.replace(' ', '-').toLowerCase()}`) ? 'AllFeaturesHeadingChildDiv AllFeaturesSelect' : 'AllFeaturesHeadingChildDiv'}>
                                {iconArr[arrNum][index]}
                                <h3 className='AllFeaturesHeading'>{item}</h3>
                            </Link>
                        )}
                    </div>
                </div>
                <div className='AllFeaturesHeadingChildDiv LogOut' onClick={() => setLogOutCheck(true)}>
                    <LogoutIcon className='AllFeaturesIcon' />
                    <h3 className='AllFeaturesHeading'>Log out</h3>
                </div>
            </div>
            <div className={!closeCheck? 'AllFeaturesGrayDiv AllFeaturesGrayHide' : 'AllFeaturesGrayDiv'} 
            onClick={() => setCloseCheck(false)}></div>
        </> : 
        false
        // <Loading />
        }
        </>
    )
}
export default AllFeatures