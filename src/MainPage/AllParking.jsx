// // import { onValue, ref, set } from "firebase/database"
// import { useEffect, useState } from "react"
// // import { db } from "./firebase"
// import { useDispatch, useSelector } from "react-redux"
// import { setParkingData } from "../Redux-Toolkit/ParkingSlice"
// import axios from "axios"
// import { Button } from "@mui/material"
// import Area from "./Area"
// // import { setParkingData } from "../Redux-Toolkit/ParkingSlice"
// const AllParking = () => {

//     const { userDetail, parkingData } = useSelector((e) => e)
//     const [ check, setCheck ] = useState(false)
//     const dispatch = useDispatch()
//     const [applyInd, setApplyInd] = useState(false)
//     const [place, setPlace] = useState("")
//     const [slots, setSlots] = useState("")
//     const uid = userDetail?._id
//     let deleteInd = false
//     const area = ''
//     useEffect(() => {
//         axios.get(('http://localhost:4000/parking/getArea'), config).then(async (res) => {
//             dispatch(setParkingData(res?.data))
//             console.log(res?.data, " res?.data")
//         })
//     },[])

//     const config = {
//         headers: {
//             'Context-Type': 'application/json'
//         }
//     }
//     const add = (index) => {
//         let temp = [...parkingData]
//         axios.post(('http://localhost:4000/parking/addSubArea'), 
//         { areaName: temp[index].name, subName: place, slots}, config)
//         .then(async (res) => {
//             console.log({...res?.data} + " resdatas frontend")
//             temp[index] = res?.data ? {...res?.data} : {}
//             console.log(temp[index], 'tempIndex')
//             dispatch(setParkingData(temp))
//             setPlace('')
//             setSlots('')
//         })

//     }
//     return (
//         <div className="previousJobMainDiv">
//             { check?.state != 'view' && parkingData ? parkingData?.map((item, index) =>
//                 <div onClick={() => index !== applyInd && deleteInd == false && setApplyInd(index)} className={
//                     "previousJobBox"}>
//                     <h1 style={{margin: '10px'}}>
//                         <p>{item?.name}</p>
//                     </h1>
//                     <div style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
//                     { !!item?.subArea?.length && item?.subArea?.map((item2, index2) => 
//                         <span style={{height: '40px', width: '25%'}}>
//                         <b>{item2.name}</b>
//                         </span>
//                     )}
//                     </div>
//                     <p style={{width: '100%', display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px'}}>
//                         {/* <button onClick={() => setCheck({state: "add", ind: index})}>add place</button> */}
//                         {/* <button onClick={() => setCheck({state: "view", ind: index})}>view place</button> */}
//                         <Button onClick={() => setCheck({state: 'view', ind: index})} variant="contained">View places</Button>
//                     </p>
//                     {check?.state == 'add' && check?.ind == index? 
//                     <div>
//                         <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Place :"/>
//                         <input value={slots} onChange={(e) => setSlots(e.target.value)} placeholder="No of Slots: "/>
//                         <button onClick={() => add(index)}>Add</button>
//                     </div>: false    
//                 }
//                 </div>
//             ) : <Area check={check} setCheck={setCheck}/>}
//         </div> 
//     )
// }
// export default AllParking