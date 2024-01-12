import dayjs from 'dayjs';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import AddPlace from './AddPlace';
import DateTimeInput from './DateTimeInput';
import axios from 'axios';
import { setArea, setParkingData } from '../Redux-Toolkit/ParkingSlice';
import Loading from '../Loading';
import { useState } from 'react';
import { url } from '../config';

const AllParkingCarousal = ({ timeInfo, setTimeInfo, setTimeInfo2, index, applyInd, deleteInd,
    setApplyInd, check, setCheck, timeInfo2, setCheckAdd, checkAdd, selectObj, setSelectObj,
    item, notify, setLoading }) => {
    const [place, setPlace] = useState("")
    const [slots, setSlots] = useState("")

    const postConfig = {
        headers: {
            'Context-Type': 'application/json'
        }
    }

    const dispatch = useDispatch()
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const { parkingData, userDetail, area } = useSelector((e) => e)
    const minCondition1 = dayjs()
    const submit = ({ e, index }) => {
        e.preventDefault()
        add(index)
    }


    const add = (index) => {
        setLoading2(true)
        let temp = [...parkingData]
        if (!!place?.trim() && slots > 0)
            axios.post((`${url}/parking/addSubArea`),
                { areaName: temp[index].name, subName: place.trim(), slots }, postConfig)
                .then(async (res) => {
                    let temp = [...parkingData]
                    temp[index] = res?.data
                    dispatch(setParkingData(temp))
                    notify(`Place added to area ${temp[index]?.name} with ${slots} slots Successful`)
                    setLoading2(false)
                    setPlace('')
                    setSlots('')
                    setCheck(false)
                }).catch((err) => {
                    setCheck(false)
                    setPlace('')
                    setSlots('')
                    setLoading2(false)
                    notify(!!err?.response?.data ? err?.response?.data : err)
                })
        else {
            setLoading2(false)
            notify('You may forgot to Enter the data')
        }
    }



    const maxCondition1 =
        timeInfo2 && dayjs(timeInfo).add(1, 'year')
    dayjs().add(1, 'year')
    const minCondition2 = timeInfo2 && (
        dayjs(timeInfo)?.isAfter(dayjs()) ?
            dayjs(timeInfo).add(5, 'minute') :
            dayjs(timeInfo).add(2, 'month'))
    const maxCondition2 = timeInfo2 && dayjs(timeInfo).add(1, 'year')
    const allCondition = !!timeInfo && !!timeInfo2 && !dayjs(timeInfo).isBefore(minCondition1) &&
        !dayjs(timeInfo2).isBefore(!!minCondition2) && !dayjs(timeInfo).isAfter(maxCondition1) &&
        !dayjs(timeInfo2).isAfter(maxCondition2) && !dayjs(timeInfo2).isBefore(dayjs(timeInfo)) &&
        !dayjs(timeInfo2).isBefore(dayjs())
    const setTimeFunc = (e) => {
        if (e)
            setTimeInfo(dayjs(dayjs(e)).format())
        else notify('invalid')
    }
    const setTimeFunc2 = (e) => {
        if (e)
            setTimeInfo2(dayjs(dayjs(e)).format())
        else notify('invalid')
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${userDetail?.token}`,
            'Context-Type': 'application/json'
        }
    }
    const showParking = () => {
        setSelectObj(parkingData[index])
        axios.post((`${url}/parking/getSubArea`), parkingData[index], config).then(async (res) => {
            dispatch(setArea(res?.data?.array))
            setCheck({ state: "view", ind: index })
            setTimeInfo(dayjs(dayjs().add(5, 'minute')).format())
            setTimeInfo2(dayjs(dayjs().add(10, 'minute')).format())
            setLoading(false)
            setLoading3(false)
        })
        // return area
    }
    const showArea = () => {
        setLoading(true)
        if (userDetail?.status == 'Admin' ||
            allCondition
        ) {
            axios.post((`${url}/parking/getSubArea`), parkingData[index], config).then(async (res) => {
                dispatch(setArea(res?.data?.array))
                setCheck({ state: "userview", ind: index })
                setSelectObj(parkingData[index])
                setLoading(false)
            })
        }
        else {
            setLoading(false)
            notify(`Invalid time Please set the time correctly`)
        }
    }

    return (
        <div onClick={() => index !== applyInd && deleteInd == false && setApplyInd(index)} className={
            "previousJobBox"} style={{
                backgroundColor:
                    userDetail?.status != 'Admin' ? index.toString()[(index.toString()?.length) - 1] > 4 ? `rgb(${180 + (index) % 5 * 15}, ${180 + (index) % 5 * 15}, ${180 + (index) % 5 * 15})` : `rgb(${255 - (index) % 5 * 15}, ${255 - (index) % 5 * 15}, ${255 - (index) % 5 * 15})`
                        : index.toString()[(index.toString()?.length) - 1] > 4 ? `rgb(${195 + (index) % 5 * 15}, ${195 + (index) % 5 * 15}, ${195 + (index) % 5 * 15})` : `rgb(${240 - (index) % 5 * 15}, ${240 - (index) % 5 * 15}, ${240 - (index) % 5 * 15})`
            }}>
            <h1><p>{item?.name}</p></h1>
            <div className={`previousJobBox previousJobBoxMax ${userDetail?.status == 'Admin' ? 'previousAbsolute' : 'previousAbsolute previousAbsolute2'}`}>
                <div style={{
                    transform: `translateY(${check?.ind == index ? (check?.state == 'add' ? -520 : check?.state == 'view' ? 0 : -260) : -260
                        }px)`
                }} className="previousJobBox previousJobBoxCarousal">
                    <div className='previousJobBox'>
                        <h3 style={{ display: 'flex', width: `calc(100% - 30px)` }}>Booking Schedule:</h3>
                        {!!selectObj && !area?.length ?
                            // <div className='previousJobBox'>
                            <b>No slots are available here</b>
                            // </div>
                            :
                            <>
                                <DateTimeInput minCondition={minCondition1} maxCondition={maxCondition1} timeInfo={timeInfo} setTimeFunc={setTimeFunc} />
                                <DateTimeInput minCondition={minCondition2} maxCondition={maxCondition2} timeInfo={timeInfo} timeInfo2={timeInfo2} setTimeFunc2={setTimeFunc2} />
                            </>}
                        <div className='previousJobButtonDiv previousJobButton2'>
                            <Button className="previousJobButton" onClick={() => {
                                setCheck({ state: "test", ind: index })
                                setCheckAdd(0)
                            }
                            } variant="contained">Back</Button>
                            {!!selectObj && !!area?.length ? <Button className="previousJobButton" onClick={showArea} variant="contained">View</Button> : false}
                        </div>
                    </div>
                    {userDetail?.status == 'Admin' ? <div
                        className='previousJobBox'
                    >
                        {loading3 ? <Loading /> :
                            <>
                                <div>
                                    <h3>Total Places: {item?.areaQuantity}</h3>
                                    <h3>Total Slots: {item?.slotQuantity}</h3>
                                </div>
                                <div className='previousJobButtonDiv previousJobButton2'>
                                    <Button className="previousJobButton" onClick={() => {
                                        setCheck({ state: "add", ind: index })
                                    }
                                    } variant="contained">Add place</Button>
                                    <Button className="previousJobButton" onClick={showArea}
                                        variant="contained">View</Button>
                                </div>
                            </>
                        }
                    </div> :
                        <div className='previousJobBox'>
                            <div>
                                <h3>Total Places: {item?.areaQuantity}</h3>
                                <h3>Total Slots: {item?.slotQuantity}</h3>
                            </div>
                            <div className='previousJobButtonDiv previousJobButton2'>
                                <Button className="previousJobButton" onClick={() => {
                                    setLoading3(true)
                                    showParking()
                                }}
                                    variant="contained">View More</Button>
                            </div>
                        </div>
                    }
                    {
                        loading2 ? <Loading /> :
                            userDetail?.status == 'Admin' &&
                            <AddPlace submit={submit} index={index} place={place} setPlace={setPlace}
                                slots={slots} setCheck={setCheck} setSlots={setSlots} />
                    }
                </div>
            </div>
        </div>
    )
}
export default AllParkingCarousal   