import './MainPage.css'
import React, { useState } from 'react';
import { Table } from 'antd';
import Navbar from '../Navbar/Navbar';
const AllUser = ({closeCheck, setCloseCheck, data, setData}) => {
  const columns = [
    { title: 'Index', dataIndex: 'index', width: '20%' }, { title: 'User Id', dataIndex: '_id', width: '20%' },
    { title: 'Name', dataIndex: 'name', width: '20%' }, { title: 'Email', dataIndex: 'email', width: '20%' }
  ];
  
  const [tableParams, setTableParams] = useState( data?.length > 10 ? { pagination: { current: 1, pageSize: 10 } } : false);

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