import dayjs from 'dayjs';
import { Box, Button, ButtonGroup, CircularProgress, Modal, Pagination, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import axios from 'axios';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Slot from './Slot';
import Navbar from '../Navbar/Navbar';
import { url } from '../config';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const SubArea = ({ path, setPath, notify, check, setCheck, timeInfo, timeInfo2, selectObj, setCheck3, closeCheck, setCloseCheck, subArea, setSubArea }) => {
    const [confirm, setConfirm] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [ind, setInd] = useState(false)
    const [ wait, setWait ] = useState(false)
    const [ slotData, setSlotData ] = useState(false)
    const [ checkShow, setCheckShow ] = useState(ind)
    const [ check4, setCheck4 ] = useState(false)
    const [error, setError] = useState(false)
    const [ loading, setLoading ] = useState(false)
    // const navigate = useNavigate()

    const bookCondition = (item) => { 
    let filteredData = item?.book && Object?.values(item?.book)?.filter((item2, index) =>(
        !dayjs(item2?.booklasttime).isBefore(dayjs()) &&
        (
        (!dayjs(timeInfo)?.isBefore(dayjs(item2?.bookstarttime))
        && !dayjs(timeInfo)?.isAfter(dayjs(item2?.booklasttime)))
        ||
        (!dayjs(timeInfo2)?.isBefore(dayjs(item2?.bookstarttime))
        && !dayjs(timeInfo2)?.isAfter(dayjs(item2?.booklasttime)))
        || (!dayjs(timeInfo)?.isAfter(dayjs(item2?.bookstarttime))
        && !dayjs(timeInfo2)?.isBefore(dayjs(item2?.booklasttime))))
    ))
    return filteredData
}
    const { userDetail, area } = useSelector((e) => e)
    const config = {
        headers: {
            'Authorization': `Bearer ${userDetail?.token}`,
            'Context-Type': 'application/json'
        }
    }

    const postConfig = {
        headers: {
            'Context-Type': 'application/json'
        }
    }

    const ShowSlot = () => {
        setLoading(true)
        axios.post((`${url}/parking/getBook`), subArea?.array[checkShow-1], config).then(async (res2) => {
            let data = await res2?.data ? [...res2?.data?.array] : false
            const dataMap = data && data?.map((item2, index2) => (
              axios.get((`${url}/parking/getUsers`), config).then(async (res) => {
                let tempData = []
      
                res?.data?.filter((item, index) => item?._id == item2?.person)?.map((item, index) => {
                  item.index = index + 1
                  tempData.push(item)
                })
                item2.name = tempData[0]?.name
                item2.email = tempData[0]?.email
                item2.uid = tempData[0]?._id;
            })
            ))
                Promise.all(dataMap).then(() => {
                setSlotData(data)
                setCheck2(ind || checkShow)
                setLoading(false)
            })
          }).catch(() => setLoading(false))      
    }


    const Book = () => {
        setWait(true)
        axios.post((`${url}/parking/book`), {
            slotNo: confirm, bookDetail: {
                person: userDetail?._id, bookstarttime: timeInfo, booklasttime: timeInfo2
            }, 
            slotObj: subArea
        }, postConfig).then(async (res) => {
            notify('Booking Successful')
            setPath('/booking-history')
            setWait(false)
            setConfirm(false)
            setInd(false)
            setCheckShow(false)
        }).catch((err) => {
            notify(err
                ?.response?.data ? err?.response?.data : err
                )
            setCheck(false)
            setCheck2(false)
            setCheck3(false)
        })
    }
    const setSubAreaFunc = () => {
        axios.post((`${url}/parking/getSlots`), Object?.values(area)[check?.index],
            config).then(async (res) => {
                setError(false)
                let temp = await res?.data ? { ...res?.data } : {}
                const promiseMap = await Object?.values(temp.array).map((item, index) =>
                    axios.post((`${url}/parking/getBook`), item, config).then(async (res2) => {
                        item.book = await res2?.data ? { ...res2?.data?.array }
                            : false
                    }))
                    Promise.all(promiseMap).then(() => {
                        setSubArea({ ...temp })
                    })
            }).catch(async (err) => {
                alert(err)
                setError(await err ? err : false)
            })
    }
    useEffect(() => {
        setSubAreaFunc()
    }, [timeInfo, timeInfo2])

    
    const style = {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500,
        bgcolor: 'background.paper', border: '0', outline: 'none', boxShadow: 24, p: 3, paddingBottom: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif', 
        borderRadius: '4px' };




    const ShowOption = async(item, index) => {
        if(userDetail?.status != 'User' ? !!Object.values(item.book)?.length : !bookCondition(item)?.length){
            setInd(index + 1)
            setCheckShow(index + 1)}
            else {
                setInd(false)
                setCheckShow(false)
            }
    } 

    const ShowOption2 = () => {
        if(userDetail?.status == 'User')
        setConfirm( ind ? ind : checkShow )
        else ShowSlot()
    }

    return (
        <>
        { loading || wait? <Loading /> : 
        check2 ? 
        <Slot check2={check2} setCheck2={setCheck2} setCheck={setCheck} check={check} 
        setCheck3={setCheck3} selectObj={selectObj} subArea={subArea} dataSource={slotData} setDataSource={setSlotData}/>
        : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', 
            width: '100%', height: '100%', maxWidth: '1280px' }}>
            <Modal open={ userDetail?.status == "User" && !!confirm} aria-labelledby="modal-modal-title" onClose={() => {
                setConfirm(false)
                setInd(false)
            }}
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    { 
                    // wait ?             
                    // <CircularProgress disableShrink style={{width:'60px', height:'60px'}}/> :
                    <>
                    <h2 style={{ margin: '4px 0 23px', color: 'rgb(20, 20, 20)', letterSpacing: '0.15px' }}>Book</h2>
                    <p style={{ lineHeight: '1.5', color: 'rgb(150, 150, 150)', marginBottom: '19px', letterSpacing: '0.15px' }}>Are you sure you want to book slot {ind} from {timeInfo.replace('T', ' ').slice(0, timeInfo?.length-9)} to {timeInfo2.replace('T', ' ').slice(0, timeInfo2?.length-9)} ? It will cost ${(dayjs(timeInfo2) - dayjs(timeInfo))/120000} only <b><i>!</i></b></p>
                    <ButtonGroup style={{ display: 'flex', width: '100%', height: '50px' }} variant="text" aria-label="text button group">
                        <Button onClick={() => Book(ind)} variant="outline" style={{ fontSize: '14px', color: 'rgb(211, 47, 47)', borderTop: '1px solid rgb(200, 200, 200)', display: 'flex', width: '50%', borderColor: 'rgb(200, 200, 200)', textTransform: 'none' }}>Yes</Button>
                        <Button onClick={() => {
                            setConfirm(false)
                            setInd(false)
                        }} variant="outline" style={{ fontSize: '14px', color: 'rgb(235, 180, 30)', borderTop: '1px solid', display: 'flex', width: '50%', borderColor: 'rgb(200, 200, 200)', textTransform: 'none' }}>No</Button>
                    </ButtonGroup>
                    </>}
                </Box>
            </Modal>
            <Navbar closeCheck={closeCheck} setCloseCheck={setCloseCheck} back={true} heading={
                      <>
                      <a style={{cursor: 'pointer'}} onClick={() => {
                        setCheck3(false)
                        setCheck(false)
                    }}>
                        All-Parking</a>
                        <a onClick={() => setCheck(false)} style={{cursor: 'pointer'}} >
                        {' / ' + selectObj?.name}</a><a style={{cursor: 'pointer'}}>
                        {' / ' + Object?.values(area)[check?.index]?.name}</a>
                      </>
                } className={'ProfileHeading previousJobHeading'} setCheck={setCheck}/>
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {subArea?.array?.map((item, index) =>
                    <button
                        onClick={() => ShowOption(item, index)} onBlur={() => setInd(false)}
                        className={
                            (typeof item?.book == 'object' && 
                                userDetail?.status == 'User' && !!bookCondition(item)?.length && 
                                !!bookCondition(item)?.filter((item2) => item2?.person == userDetail?._id)?.length) 
                                || (userDetail?.status == 'Admin' && !item.book)
                                ?
                                "previousJobBox previousJobBox3 previousJobBoxRed" :
                                userDetail?.status == 'User' && !!bookCondition(item)?.length ? 
                                "previousJobBox previousJobBox3 previousJobBoxRed" : 
                                (
                                    ind !== index + 1 ?
                                        "previousJobBox previousJobBox3"
                                        : 'previousJobBox previousJobBox3 previousJobSelect'
                                )
                        }
                        >
                        <p>{item?.no}</p>
                    </button>
                )
                }
            </div>
            {
            checkShow 
            || 
            ind
             ? <div className='subAreaBookButtonDiv'>
                <button onBlur={() => setCheckShow(false)} onClick={() => ShowOption2()}>{<EventAvailableIcon />} {userDetail?.status== 'User'? 
                'Book slot': 'View slot'} {ind || checkShow}</button>
            </div> : false}
        </div>}
    </>
    )
}
export default SubArea