import { React, useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Modal from "./Modal";
import useModal from './useModal';
import '../App.css'
  
const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 }
  ]
  
function DataTable() {
    const {isShowing, toggle} = useModal();
    const [tableData, setTableData] = useState([])
    const [selectedData, setSelectedRows] = useState(null);

    useEffect(() => {
        const getApiCall = async() => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts")
            const res = await response.json()
            setTableData(res)
        }
        getApiCall();
    },[])

    return (
        <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={12}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = tableData.filter((row) =>
              selectedIDs.has(row.id),
            );
            toggle();
            setSelectedRows(selectedRows);
            console.log(selectedData)
          }}
        />
        <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectedData, null, 4)}
      </pre>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
      </div>
    );
  }

  export default DataTable;

