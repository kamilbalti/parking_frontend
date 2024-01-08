import './Area.css'
import { useDispatch, useSelector } from "react-redux"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { setArea } from '../Redux-Toolkit/ParkingSlice';
import axios from 'axios';
import { Form, Input, Popconfirm, Table } from 'antd';
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import Navbar from '../Navbar/Navbar';
// import Loading from '../Loading';
import { url } from '../config';



const EditableContext = createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const form = useContext(EditableContext);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};










const Area = ({ setLoading, check2, setCheck2, check, setCheck, selectObj, setSelectObj, closeCheck, setCloseCheck, setSubArea }) => {
  const userDetail = useSelector((e) => e?.userDetail)
  const area = useSelector((e) => e?.area)
  const [ currentPage, setCurrentPage ] = useState(1)
  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // const [dataSource, setDataSource] = useState(false)
  const dispatch = useDispatch()


  const showSubArea = (index2) => {
    setLoading(true)
    axios.post((`${url}/parking/getSlots`), Object?.values(area)[index2],
    config).then(async (res) => {
        // console.log(res?.data)
        setError(false)
        let temp = await res?.data ? { ...res?.data } : {}
        const tempMap = await Object?.values(temp.array).map((item, index) =>
            axios.post((`${url}/parking/getBook`), item, config).then(async (res2) => {
                item.book = await res2?.data ? { ...res2?.data?.array }
                    : false
                    // alert(((currentPage-1) * 10) + index2)
            }))
            Promise.all(tempMap).then(() => {
              setSubArea({ ...temp })
              setCheck2({ state: 'subareaview', index: ((currentPage-1) * 10) + index2 })
              setLoading(false)
            }).catch((error) => console.log(error))
    }).catch(async (err) => {
        alert(err)
        setError(await err ? err : false)
        setCheck2(false)
        setLoading(false)
    })

    }
    



  useEffect(() => {
    console.log(selectObj, ' SelectObj')
    console.log(selectObj?._id, ' SelectObj')
  }, [])

  const config = {
    headers: {
      'Authorization': `Bearer ${userDetail?.token}`,
      'Context-Type': 'application/json'
    }
  }
  const handleSave = (row) => {
    const newData = [...area];
    const index = newData.findIndex((item) => row.index === item.index);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    dispatch(setArea(newData));
  };
  let defaultColumns = [
    { title: 'Name', dataIndex: 'name', width: '25%', editable: userDetail?.status == 'Admin' },
    { title: 'Total Slots', dataIndex: 'quantity', width: '25%' },
    { title: 'Total Booking', dataIndex: 'bookQuantity', width: '25%' },
  ];
  if (userDetail?.status == 'User') {
    defaultColumns.push(...[
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record, index) =>
          area.length >= 1 ? (
            <div className='deleteViewButton'>
              <a onClick={() => showSubArea(index)}
              >View</a>
            </div>
          ) : null,
      }]
    )
  }
  else if (userDetail?.status == 'Admin')
    defaultColumns.push(...[
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record, index) =>
          area.length >= 1 ? (
            <div className='deleteViewButton'>
              <div className='deleteViewButton'>
                <a onClick={() => showSubArea(index)}>View</a>
              </div>
            </div>
          ) : null,
      }]
    )


  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleDelete = (key) => {
    let tempData = []
    area.filter((item) => item.index !== key).map((item, index) => {
      let tempItem = { ...item }
      tempItem.index = index + 1
      tempData.push(tempItem)
    });
    dispatch(setArea(tempData));
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    // loading? <Loading /> :
    <div style={{width: '100%'}}>
      <Navbar closeCheck={closeCheck} setCloseCheck={setCloseCheck} back={true} heading={
      <>
      <a onClick={() => setCheck(false)}>All-Parking</a><a>{' / ' + selectObj?.name}</a>
      </>
       } className={'ProfileHeading previousJobHeading'} setCheck={setCheck}/>
      <Table className='AllUserTable' style={{ width: '100%' }} columns={columns}
        bordered
        components={components}
        rowClassName={() => 'editable-row'}
        shouldCellUpdate
        dataSource={area} 
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        />
    </div>
  )
}
export default Area
