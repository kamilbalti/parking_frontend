import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setParkingData } from '../Redux-Toolkit/ParkingSlice';
import { url } from '../config';
import { useState } from 'react';

const AddArea = ({ checkAdd, setCheckAdd, check, error, setError, notify }) => {
    const [area, setArea] = useState('')
    const { parkingData, userDetail } = useSelector((e) => e)
    const dispatch = useDispatch()
    const submit2 = (e) => {
        e.preventDefault()
        addArea()
    }
    const postConfig = {
        headers: {
          'Context-Type': 'application/json'
        }
      }
    
    const addArea = () => {
        let temp = [...parkingData]
        if(!!area?.trim())
        axios.post((`${url}/parking/addArea`), { name: area.trim() }, postConfig).then(async (res) => {
            setError(false)
            temp.push(res?.data ? { ...res?.data } : {})
            dispatch(setParkingData(temp))
            notify(`Area ${res?.data?.name} added Successful`)
        }).catch(async (err) => {
            notify(err?.response?.data ? err?.response?.data : err)
            // alert(err)
            setError(await err ? err : false)
        })
        else notify('You forgot to enter the name of Area')
        setArea("")
        setCheckAdd(0)
    }

    return (
        <div className="previousJobBox previousJobBoxMax">
            <div style={{ transform: `translateY(${checkAdd}px)` }} className="previousJobBox previousJobBoxCarousal">
                <div onClick={() => check?.state != 'add' && setCheckAdd(-260)} className="previousJobBox">
                    <AddIcon className='previousJobAddIcon' />
                    <p>Add parking area here</p>
                </div>
                <form onSubmit={submit2} className="previousJobBox previousNoCursor">
                    <h3>Add Area Here</h3>
                    <input style={{
                        padding: '10px', width: 'calc(100% - 20px)'
                        // , marginLeft: '0px' 
                    }} value={area} onChange={(e) => setArea(e.target.value)} placeholder="Name of Area :" />
                    <p className='previousJobButtonDiv'>
                        <Button className="previousJobButton" onClick={() => setCheckAdd(0)} variant="contained">Cancel</Button>
                        <Button className="previousJobButton" type='submit' variant="contained">Add</Button>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default AddArea