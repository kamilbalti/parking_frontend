import AllFeatures from "../../AllFeatures/AllFeatures"
import { useEffect, useState } from 'react'
import './style.css'
import Option from '../../auth/Option'
import DashboardChild from './DashboardChild';
import { useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar";
import dayjs from "dayjs";
const Dashboard = ({ closeCheck, setCloseCheck, user, AllBookingDetail, totalSlots }) => {
    const { userDetail } = useSelector(e => e)
    const [statsOpt, setStatsOpt] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    const CheckFunc = (array) => {
        return !array ? false : array?.filter((item) =>
            dayjs(item?.createdAt)?.isSame(dayjs(), 'day') ||
            item?.bookstarttime && item?.booklasttime && 
            (dayjs(item?.bookstarttime)?.isSame(dayjs(), 'day') ||
            dayjs(item?.booklasttime)?.isSame(dayjs(), 'day') ||
            (!dayjs(item?.bookstarttime)?.isAfter(dayjs()) && !dayjs(item?.booklasttime)?.isBefore(dayjs())))
        )
    }
    console.log(AllBookingDetail)
    const todaysAllBookingDetail = CheckFunc(AllBookingDetail)
    // !AllBookingDetail ? false : AllBookingDetail?.filter((item) => dayjs(item?.createdAt)?.isSame(dayjs(), 'day'))
    // const 
    const todaysUser = user && user?.filter((item) => dayjs(item?.createdAt)?.isSame(dayjs(), 'day'))
    const todaysSlots = CheckFunc(totalSlots)
    // !totalSlots ? false : totalSlots?.filter((item) => dayjs(item?.createdAt)?.isSame(dayjs(), 'day') || dayjs(item?.bookstarttime)?.isSame(dayjs(), 'day') || dayjs(item?.booklasttime)?.isSame(dayjs(), 'day') || (!dayjs(item?.bookstarttime)?.isBefore(dayjs()) && !dayjs(item?.booklasttime)?.isAfter(dayjs()))) 
    window.addEventListener('resize', handleResize);
    const option = width > 400 ? ['Today Statistic', 'All Statistic'] : ['Today', 'All']
    let padding = 0
    return (
        // <div className='MainPageMainDiv'>
        <div className='DashboardMainDiv'>
            <div className='DashboardFirstFixDiv'>
                <Navbar heading={'Dashboard'} closeCheck={closeCheck} setCloseCheck={setCloseCheck}
                    className={'ProfileHeading'} />
                {/* <h1 className='ProfileHeading'>Dashboard</h1> */}
                <div className='OptionMainDivParent'>
                    <Option cl={statsOpt ? 'right' : 'left'} divClass={'OptionMainDiv'} opt={statsOpt} setOpt={setStatsOpt} option={option} />
                </div>
            </div>
            <div className={
                // closeCheck? 'DashboardSecondFixDiv' : 
                'DashboardSecondFixDiv DashboardFix2'}>
                <div style={{ paddingRight: '10px' }} className={
                    'DashboardSecondFixDivChild'}>
                    <div className="DashboardCarousal" style={{ transform: `translateX(${statsOpt ? 'calc(-50% - 25px)' : '0%'})` }}>
                        <DashboardChild totalSlots={todaysSlots} totalBooking={todaysAllBookingDetail} user={todaysUser} opt={false} />
                        <DashboardChild totalSlots={totalSlots} totalBooking={AllBookingDetail} user={user} opt={true} />
                    </div>
                </div>
            </div>
        </div>
        // </div>

    )
}
export default Dashboard