import dayjs from 'dayjs';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setParkingData } from "../Redux-Toolkit/ParkingSlice"
import axios from "axios"
import * as React from 'react';
import Area from "./Area";
import SubArea from './SubArea';
import Navbar from '../Navbar/Navbar';
import AddArea from './AddArea';
import AllParkingCarousal from './AllParkingCarousal';

const PrevParking = ({ closeCheck, setCloseCheck, notify }) => {
  const [check, setCheck] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [error, setError] = useState(false)
  const { parkingData, userDetail } = useSelector(e => e)
  const [timeInfo, setTimeInfo] = useState(dayjs().add(5, 'minute').format());
  const [timeInfo2, setTimeInfo2] = useState(dayjs().add(10, 'minute').format());
  const [area, setArea] = useState('')
  const [ subArea, setSubArea ] = useState(false)
  const [checkAdd, setCheckAdd] = useState(0)
  const [selectObj, setSelectObj] = useState(false)
  const dispatch = useDispatch()
  const [applyInd, setApplyInd] = useState(false)
  const [place, setPlace] = useState("")
  const [slots, setSlots] = useState("")
  let deleteInd = false



  
  return (
    <div className='previousJobMainDiv'>
      <div className="previousJobChildDiv">
        {
          check2?.state == 'subareaview' ?
            <SubArea subArea={subArea} setSubArea={setSubArea} selectObj={selectObj} check={check2} setCheck={setCheck2} 
            timeInfo={timeInfo} timeInfo2={timeInfo2} setCheck3={setCheck}
            closeCheck={closeCheck} setCloseCheck={setCloseCheck}/>
            :
            check?.state !== 'userview' ?
              <>
                <Navbar heading={<a>All-Parking</a>} className={'ProfileHeading previousJobHeading'} 
                closeCheck={closeCheck} setCloseCheck={setCloseCheck}/>
                {
                  userDetail?.status == 'Admin' ?
                    <AddArea notify={notify} error={error} setError={setError} check={check} area={area} setArea={setArea} checkAdd={checkAdd}
                      setCheckAdd={setCheckAdd} />
                    : false
                }
                {parkingData && parkingData?.map((item, index) =>
                  <AllParkingCarousal notify={notify} timeInfo={timeInfo} setSlots={setSlots} setTimeInfo={setTimeInfo}
                    setTimeInfo2={setTimeInfo2} index={index} applyInd={applyInd} deleteInd={deleteInd}
                    setApplyInd={setApplyInd} check={check} setCheck={setCheck} timeInfo2={timeInfo2}
                    setCheckAdd={setCheckAdd} checkAdd={checkAdd} selectObj={selectObj} setSelectObj={setSelectObj}
                    slots={slots} place={place} setPlace={setPlace} item={item}
                  />
                )}
              </>
              :
              <Area setSubArea={setSubArea} selectObj={selectObj} setSelectObj={setSelectObj} 
              setCheck2={setCheck2} check2={check2} setCheck={setCheck} check={check} closeCheck={closeCheck} setCloseCheck={setCloseCheck} />
        }
      </div>
    </div>
  )
}
export default PrevParking