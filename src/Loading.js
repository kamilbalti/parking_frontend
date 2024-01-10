import { CircularProgress } from "@mui/material"
import { ColorRing } from "react-loader-spinner"

const Loading = () => {
    return(
        <div style={{width: '100%', backgroundColor: 'rgba(255,255,255, 0.6)' ,height: '100vh', display: 'flex', alignItems: "center", justifyContent: 'center'}} role="status">
            <CircularProgress disableShrink style={{width:'60px', height:'60px', color: 'rgb(255, 180, 30)'}}/>
            {/* <ColorRing visible={true} height="100" width="100" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/> */}
        </div>
    )
}
export default Loading