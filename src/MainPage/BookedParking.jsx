import { Table } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Navbar from "../Navbar/Navbar"

const BookedParking = ({closeCheck, setCloseCheck, data, setData}) => {
    const userDetail = useSelector((e) => e?.userDetail)
    const columns = [
        { title: 'Slot', dataIndex: 'slotNo', width: '2%' }, 
        { title: 'Area', dataIndex: 'area', width: '16%' }, { title: 'Place', dataIndex: 'subArea', width: '16%' },
        { title: 'Start', dataIndex: 'bookstarttime', width: '33%' }, { title: 'End', dataIndex: 'booklasttime', width: '33%' }
    ];
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 10 } });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({ pagination, filters, ...sorter });
        if (pagination.pageSize !== tableParams.pagination?.pageSize)
            setData([]);
    }

    return (
        <div className='previousJobMainDiv'>
        <Navbar closeCheck={closeCheck} setCloseCheck={setCloseCheck} heading={'Booking-Details'} className={'ProfileHeading previousJobHeading'} />
            <Table className="AllUserTable" bordered columns={columns} dataSource={data} onChange={handleTableChange} />
        </div>
    )
}
export default BookedParking