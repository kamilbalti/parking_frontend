import { Card, Typography } from "@mui/material";
import { useState } from "react";

const DashboardChildBox = ({ data, parentDivClass, cardClass }) => {
    const [width, setWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);
    return (
        <div className={parentDivClass}>
            {data.map((item, index) => (
                <Card key={index} variant="outlined" className={cardClass}>
                    <Typography className='DashboardColumn DashboardCardIconDiv'>{item?.icon}</Typography>
                    <Typography className='DashboardColumn DashboardTextColumn'>
                        {/* <div className='DashboardColumnName'> */}
                            <span className="DashboardColumnName">
                            <span>{item?.name}</span>
                            <span><b>{width ? ` (${item?.num}) ` : false}</b></span>
                            </span>
                        {/* </div> */}
                        <b className='DashboardColumnNum'>{item?.num}</b>
                    </Typography>
                </Card>
            ))}
        </div>
    )
}
export default DashboardChildBox