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

const AllParkingCarousal = ({ timeInfo, setSlots, setTimeInfo, setTimeInfo2, index, applyInd, deleteInd,
    setApplyInd, check, setCheck, timeInfo2, setCheckAdd, checkAdd, selectObj, setSelectObj,
    slots, place, setPlace, item, notify }) => {
    const postConfig = {
        headers: {
            'Context-Type': 'application/json'
        }
    }

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { parkingData, userDetail } = useSelector(e => e)
    const minCondition1 = dayjs()
    const submit = ({ e, index }) => {
        e.preventDefault()
        add(index)
    }


    const add = (index) => {
        setLoading(true)
        let temp = [...parkingData]
        axios.post((`${url}/parking/addSubArea`),
            { areaName: temp[index].name, subName: place, slots }, postConfig)
            .then(async (res) => {
                let temp = [...parkingData]
                temp[index] = res?.data
                dispatch(setParkingData(temp))
                notify(`Place added to area ${temp[index]?.name} with ${slots} slots Successful`)
                setLoading(false)
                setPlace('')
                setSlots('')
            }).catch((err) => {
                setCheck(false)
                setPlace('')
                setSlots('')
                setLoading(false)
                notify(!!err?.response?.data ? err?.response?.data : err)
            })
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
        !dayjs(timeInfo2).isAfter(maxCondition2)
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

    const showArea = () => {
        if (userDetail?.status == 'Admin' || allCondition)
            axios.post((`${url}/parking/getSubArea`), parkingData[index], config).then(async (res) => {
                dispatch(setArea(res?.data?.array))
                setCheck({ state: "userview", ind: index })
                setSelectObj(parkingData[index])
            })
        else notify(`You are not valid because you didn't enter valid time`)
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
                        <DateTimeInput minCondition={minCondition1} maxCondition={maxCondition1} timeInfo={timeInfo} setTimeFunc={setTimeFunc} />
                        <DateTimeInput minCondition={minCondition2} maxCondition={maxCondition2} timeInfo={timeInfo} timeInfo2={timeInfo2} setTimeFunc2={setTimeFunc2} />
                        <div className='previousJobButtonDiv previousJobButton2'>
                            <Button className="previousJobButton" onClick={() => {
                                setCheck({ state: "test", ind: index })
                                setCheckAdd(0)
                            }
                            } variant="contained">Back</Button>
                            <Button className="previousJobButton" onClick={showArea} variant="contained">View</Button>
                        </div>
                    </div>
                    {userDetail?.status == 'Admin' ? <div
                        className='previousJobBox'
                    >
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
                    </div> :
                        <div className='previousJobBox'>
                            <div>
                                <h3>Total Places: {item?.areaQuantity}</h3>
                                <h3>Total Slots: {item?.slotQuantity}</h3>
                            </div>
                            <div className='previousJobButtonDiv previousJobButton2'>
                                <Button className="previousJobButton" onClick={() => {
                                    setSelectObj(parkingData[index])
                                    setCheck({ state: "view", ind: index })
                                    setTimeInfo(dayjs(dayjs().add(5, 'minute')).format())
                                    setTimeInfo2(dayjs(dayjs().add(10, 'minute')).format())
                                }} variant="contained">View More</Button>
                            </div>
                        </div>
                    }
                    {
                        loading ? <Loading /> :
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