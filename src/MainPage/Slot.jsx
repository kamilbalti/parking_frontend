import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import { Form, Input, Popconfirm, Table } from "antd"
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";



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




const Slot = ({ check2, setCheck2, subArea, setCheck, setCheck3, check, selectObj, closeCheck, setCloseCheck, dataSource, setDataSource }) => {
  const { userDetail, area } = useSelector((e) => e)
  const config = {
    headers: {
      'Authorization': `Bearer ${userDetail?.token}`,
      'Context-Type': 'application/json'
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  // const [dataSource, setDataSource] = useState(false)
  // useEffect(() => {

  // }, [])

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.index === item.index);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  let defaultColumns = [
    { title: 'Name', dataIndex: 'name', width: '20%' },
    { title: 'Email', dataIndex: 'email', width: '20%' },
    { title: 'Starting Time', dataIndex: 'bookstarttime', width: '20%' },
    { title: 'Ending Time', dataIndex: 'booklasttime', width: '20%' }
  ];
  if (userDetail?.status == 'User') {
    defaultColumns.push(...[
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record, index) =>
          dataSource.length >= 1 ? (
            <div className='deleteViewButton'>
              <a onClick={() => {
                setCheck2({ state: 'subareaview', index: ((currentPage - 1) * 10) + index })
              }
              }
              >View</a>
            </div>
          ) : null,
      }]
    )
  }
  // else if (userDetail?.status == 'Admin')
  //   defaultColumns.push(...[
  //     {
  //       title: 'operation',
  //       dataIndex: 'operation',
  //       render: (_, record, index) =>
  //         dataSource.length >= 1 ? (
  //           <div className='deleteViewButton'>
  //             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(index + 1)}>
  //               <a>Delete</a>
  //             </Popconfirm>
  //           </div>
  //         ) : null,
  //     }]
  //   )

  // const handleDelete = (key) => {
  //   let tempData = []
  //   dataSource.filter((item) => item.index !== key).map((item, index) => {
  //     let tempItem = { ...item }
  //     tempItem.index = index + 1
  //     tempData.push(tempItem)
  //   });
  //   setDataSource(tempData);
  // };


  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };


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


  return (
    <>
      <Navbar closeCheck={closeCheck} setCloseCheck={setCloseCheck} back={true} heading={
        <>
          <a style={{ cursor: 'pointer' }} onClick={() => {
            setCheck3(false)
            setCheck(false)
          }}>
            All-Parking</a>
            <a onClick={() => setCheck(false)} style={{ cursor: 'pointer' }}>{' / ' + selectObj?.name}</a>
            <a onClick={() => setCheck2(false)} style={{ cursor: 'pointer' }}>
            {' / ' + Object?.values(area)[check?.index]?.name}
            </a>
            <a style={{ cursor: 'pointer' }}>{' / ' + Object?.values(subArea?.array)[check2 - 1]?.no}</a>
        </>

      } className={'ProfileHeading previousJobHeading'} setCheck={setCheck2} />
      <Table className='AllUserTable' style={{ width: '100%' }} columns={columns}
        bordered
        components={components}
        rowClassName={() => 'editable-row'}
        shouldCellUpdate
        dataSource={dataSource}
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </>
  )
}
export default Slot