import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { Card, Typography } from '@mui/material'
// import DonutChart from '../DonutChart';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DashboardChildBox from './DashboardChildBox';
import { useSelector } from 'react-redux';
// import Loading from '../../Loading';
const DashboardChild = ({ opt, user, totalBooking, totalSlots }) => {
    const { userDetail } = useSelector(e => e)
    const [timeNow, setTimeNow] = useState(false)
    // alert(opt)
    const select = userDetail?.status == 'Admin' ? 0 : 1
    // totalBooking ? totalBooking?.reduce((acc, item) => acc + ((dayjs(item?.booklasttime) - dayjs(item?.bookstarttime)) / 120000), 0) : 0)
    const completed = (totalBooking && totalBooking?.filter((item, index) => !dayjs(item.booklasttime).isAfter(dayjs()) && ((userDetail?.status == 'User' && userDetail?._id == item?.person) || userDetail?.status == 'Admin')))
    const myCompleted = userDetail?.status == 'User' ? completed && completed?.filter((item, index) => item?.person == userDetail?._id) : false
    const placed = totalBooking && totalBooking?.filter((item, index) => !dayjs(item.bookstarttime).isAfter(dayjs()) && !dayjs(item.booklasttime)?.isBefore(dayjs()))
    const myPlaced = userDetail?.status == 'User' ? placed && placed?.filter((item) => item?.person == userDetail?._id) : false
    const myTotal = userDetail?.status == 'User' ? totalBooking && totalBooking?.filter((item, index) => item.person == userDetail._id) : false
    const active = totalBooking?.length - placed?.length - completed?.length
    const myActive = userDetail?.status == 'User' ? (myTotal?.length - myPlaced?.length - myCompleted?.length)+1 : false
    const tempTotal = myTotal ? myTotal : totalBooking
    const [earning, setEarning] = useState(tempTotal
        ? tempTotal?.reduce((acc, item) => {
            // if (userDetail?.status == 'Admin' || (userDetail?.status == 'User' && userDetail?._id == item?.person)) {
                let itemEarning = (dayjs(item?.booklasttime) - dayjs(item?.bookstarttime)) / 120000;
                return acc + ((itemEarning > 720) && !opt ? 720 : itemEarning)
            // }
        }, 0)
        : 0
    )
    // alert(myTotal?.length - myPlaced?.length - myCompleted?.length)
    useEffect(() => {
        setEarning(tempTotal
            ? tempTotal?.reduce((acc, item) => {
                // if (userDetail?.status == 'Admin' || (userDetail?.status == 'User' && userDetail?._id == item?.person)) {
                    let itemEarning = (dayjs(item?.booklasttime) - dayjs(item?.bookstarttime)) / 120000;
                    return acc + ((itemEarning > 720) && !opt ? 720 : itemEarning)
                // }
            }, 0)
            : 0)
    }, [totalBooking, opt])
    // console.log(completed, ' my Complted')
    const infoArr = [[
        { name: `${!opt ? "Today's " : ''}Total Bookings`, num: totalBooking?.length, icon: <LocationOnIcon className='DashboardCardIcon' /> },
        { name: `${!opt ? "Today's New " : 'Total '}Users`, num: user?.length, icon: <GroupIcon className='DashboardCardIcon' /> },
        { name: `${!opt ? "Today's New " : 'Total '}Parkings`, num: totalSlots?.length, icon: <LocalParkingIcon className='DashboardCardIcon' /> },
        { name: `${!opt ? "Today's " : ''}Total Earning`, num: earning ? '$' + earning : 0, icon: <LocalAtmIcon className='DashboardCardIcon' /> },
        { name: `${!opt ? "Today's " : ''}Total Admin Commission`, num: earning ? '$' + earning / 50 : 0, icon: <AccountBalanceWalletIcon className='DashboardCardIcon' /> },
    ], [
        { name: `${!opt ? "Today's " : 'Total '} Bookings`, num: myTotal?.length, icon: <LocationOnIcon className='DashboardCardIcon' /> },
        { name: `${!opt ? "Today's New " : 'Total '}Parkings`, num: totalSlots?.length, icon: <LocalParkingIcon className='DashboardCardIcon' /> },
        { name: `${!opt ? "Today's " : 'Total '} Fees`, num: earning ? '$' + earning : 0, icon: <LocalAtmIcon className='DashboardCardIcon' /> },
    ]]
    const bookingInfoArr = [
        { name: `${!opt ? "Today's " : ''}Booking Placed`, num: myPlaced ? myPlaced?.length : placed?.length, icon: <CheckCircleIcon className='DashboardCardIcon DashboardMiniCardIcon' /> },
        { name: `${!opt ? "Today's " : ''}Booking Active`, num: myActive ? myActive-1 : active, icon: <LocalTaxiIcon className='DashboardCardIcon DashboardMiniCardIcon' /> },
        { name: `${!opt ? "Today's " : ''}Booking Completed`, num: myCompleted ? myCompleted?.length : completed?.length, icon: <CheckCircleOutlineIcon className='DashboardCardIcon DashboardMiniCardIcon' /> },
    ]
    // const datasets1 = [
    //     { label: 'Total Earning', value: 980, backgroundColor: '2, 178, 175' },
    //     { label: 'Total Admin Commision', value: 20, backgroundColor: '46, 150, 255' },
    // ]
    // const datasets2 = [
    //     { label: 'Total Parking', value: 10, backgroundColor: '2, 178, 175' },
    //     { label: 'Total Booking', value: 30, backgroundColor: '46, 150, 255' },
    //     { label: 'Total Users', value: 22, backgroundColor: '184, 0, 216' },
    //     { label: 'Booking Placed', value: 25, backgroundColor: '96, 0, 155' },
    //     { label: 'Booking Active', value: 42, backgroundColor: '39, 49, 200' },
    //     { label: 'Booking Completed', value: 10, backgroundColor: '3, 0, 141' },
    // ]
    return (
        // earning == 'loading' ? <Loading /> : 
        <div className='DashboardChildParent'>
            <DashboardChildBox data={infoArr[select]} parentDivClass={'DashboardCardParent'}
                cardClass={'DashboardCard'} />
            <h1 className='ProfileHeading BookDetailHeading'>Booking Details</h1>
            <DashboardChildBox data={bookingInfoArr} parentDivClass={'DashboardCardParent DashboardMiniCardParent'}
                cardClass={'DashboardCard DashboardMiniCard'} />
            {/* <div className='DonutChartMainDiv'>
                <DonutChart dcNo={1} dataset={datasets1} heading={'Sales Statistics'} />
                <DonutChart dcNo={2} dataset={datasets2} heading={'Service Statistics'} />
            </div> */}
        </div>
    )
}
export default DashboardChild