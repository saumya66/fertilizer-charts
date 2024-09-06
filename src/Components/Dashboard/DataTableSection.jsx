import { capitalize } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { data } from "../../result";

const DataTableSection = () => {
    const [rows, setRows] = useState(data)
    const [columns, setColumns] = useState([])

    useEffect(() => {
        if (data.length) {
            const sampleRow = data[0]
            let columnInfo = Object.keys(sampleRow).map((key) => {
                return {
                    field: key,
                    filter: "agTextColumnFilter",
                    headerName: capitalize(key[0] === "_" ? key.substring(1).replaceAll("_", " ") : key.replaceAll("_", " ")),
                    flex: 1,
                    minWidth: 150,
                    sortable: true,
                    // floatingFilter: true,
                }
            })
            setColumns(columnInfo)
        }
    }, [data])

    return (
        <div className='ag-theme-quartz min-w-[600px] w-full bg-white  h-[600px] rounded-xl shadow-lg  '>
            {
                columns?.length && rows?.length ?
                    <AgGridReact
                        rowData={rows}
                        columnHoverHighlight={true}
                        columnDefs={columns}
                    ></AgGridReact>
                    : <p>...loading</p>
            }
        </div>
    )
}
export default DataTableSection