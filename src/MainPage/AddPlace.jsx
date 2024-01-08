import { Button } from "@mui/material"


const AddPlace = ({ submit, index, place, setPlace, slots, setCheck, setSlots }) => {
    const setSlotFunc = (e) => {
        let val = e.target.value
        if ((Number(val) && !val.includes('.') && val <= 100) || (val == ''))
            setSlots(val)
    }
    return(
        // {userDetail?.status == 'Admin' && 
        <form onSubmit={(e) => submit({ e, index })} className="previousJobBox">
            <div style={{ display: "flex", flexDirection: 'column', gap: '15px 15px', flexWrap: 'wrap', marginTop: '15px', width: '100%' }}>
                <input style={{ padding: '10px', width: 'calc(100% - 30px)', margin: '8px 15px' }} value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Name of Place :" />
                <input style={{ padding: '10px', width: 'calc(100% - 30px)', margin: '8px 15px' }} value={slots} onChange={setSlotFunc} placeholder="No of Slots: " />
            </div>
            <div className='previousJobButtonDiv previousJobButton2'>
                <Button className="previousJobButton" onClick={() => setCheck(false)} variant="contained">Back</Button>
                <Button className="previousJobButton" type='submit' variant="contained">Add</Button>
            </div>
        </form>
                    // }
    )
}
export default AddPlace