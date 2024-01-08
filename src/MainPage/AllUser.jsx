import './MainPage.css'
import axios from "axios"
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
const AllUser = ({closeCheck, setCloseCheck, data, setData}) => {
  const { userDetail } = useSelector((e) => e)
  const columns = [
    { title: 'Index', dataIndex: 'index', width: '20%' }, { title: 'User Id', dataIndex: '_id', width: '20%' },
    { title: 'Name', dataIndex: 'name', width: '20%' }, { title: 'Email', dataIndex: 'email', width: '20%' }
  ];
  // const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 10 } });
  const config = { headers: { 'Context-Type': 'application/json' } }
  // useEffect(() => {
  //   axios.get(('http://localhost:4000/parking/getUsers'), {
  //     headers: {
  //       'Authorization': `Bearer ${userDetail?.token}`,
  //       'Content-Type': 'application/json',
  //     }
  //   }, config).then(async (res) => {
  //     let tempData = []
  //     res?.data?.filter((item, index) => item?.email != userDetail?.email)?.map((item, index) => {
  //       item.index = index + 1
  //       tempData.push(item)
  //     })
  //     setData(tempData)
  //   })
  // }, [])
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({ pagination, filters, ...sorter });
    if (pagination.pageSize !== tableParams.pagination?.pageSize)
      setData([]);
  }
  return (
    <div className='ProfileMainDiv'>
      <Navbar closeCheck={closeCheck} setCloseCheck={setCloseCheck} heading={'All-Users'}
        className={'ProfileHeading AllUserHeading'} />
      <Table style={{marginTop: '17px'}} className="AllUserTable" bordered columns={columns} dataSource={data} onChange={handleTableChange} />
    </div>
  );
};
export default AllUser;