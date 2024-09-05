import React, { useEffect, useState } from 'react'
import { data } from "../../result"
import { capitalize } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import NewPiechart from '../../Components/NewPiechart'
import Selector from '../../Components/Selector'

const PlotType = {
    AVAILABILITY_PLOT: 'availability_in_mt_',
    REQUIREMENT_PLOT: 'requirement_in_mt_',
    AVAILABILITY_AND_REQUIREMENT_PLOT: 'AVAILABILITY_AND_REQUIREMENT_PLOT',
};

const PlotTypes = [
    { name: "Availbility", key: 'availability_in_mt_' },
    { name: "Requirement", key: 'requirement_in_mt_' },
    { name: "Availbility & Requirement", key: 'AVAILABILITY_AND_REQUIREMENT_PLOT' }
]

function Dashboard() {
    const [rows, setRows] = useState(data)
    const [columns, setColumns] = useState([])

    const [selectedFertilizerType, setSelectedFertilizerType] = useState("NPK")
    const [selectedState, setSelectedState] = useState("Bihar")
    const [selectedPlotType, setSelectedPlotType] = useState(PlotType.AVAILABILITY_PLOT)

    let uniqueStates = [...new Set(data?.map((each) => each?.state))]
    let uniqueFertilizerType = [...new Set(data?.map((each) => each?.product))]

    let filterByStateAndFertilizerType = (data) => {
        return data?.product === selectedFertilizerType && data?.state === selectedState
    }

    let filteredData = data?.filter(filterByStateAndFertilizerType)
    filteredData = filteredData?.map((each) => {
        return {
            ...each, availability_in_mt_: parseFloat(each?.availability_in_mt_),
            requirement_in_mt_: parseFloat(each?.requirement_in_mt_)
        }
    })

    const currAvailabilityData = filteredData?.map((each) => parseFloat(each?.availability_in_mt_))
    const currRequrirementData = filteredData?.map((each) => parseFloat(each?.requirement_in_mt_))
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
        <div className='flex min-h-[calc(100vh-60px)] h-full w-full bg-slate-200 p-4 flex-col'>
            <div id="myGrid" className='ag-theme-quartz w-full bg-white h-[800px] rounded-xl shadow-lg mb-4'>
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
            <div className=' min-w-[650px] w-full bg-white rounded-xl shadow-lg p-4'>
                <div className='flex flex-row w-full'>
                    {uniqueStates?.length ?
                        <Selector
                            label={"State"}
                            options={uniqueStates}
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                        />
                        : <></>}

                    {uniqueFertilizerType?.length ?
                        <Selector
                            label={"Fertilizer"}
                            options={uniqueFertilizerType}
                            value={selectedFertilizerType}
                            onChange={(e) => setSelectedFertilizerType(e.target.value)}
                        />
                        : <></>}

                    <Selector
                        label={"Plot Type"}
                        options={uniqueFertilizerType}
                        value={selectedPlotType}
                        onChange={(e) => setSelectedPlotType(e.target.value)}
                    />
                </div>
                <div className='pt-8 flex  '>
                    {
                        filteredData?.length ?
                            <ResponsiveContainer width={"90%"} height={400}>
                                <LineChart data={filteredData}>
                                    <Legend verticalAlign="top" height={36} />
                                    {
                                        selectedPlotType === PlotType.AVAILABILITY_PLOT ?
                                            <Line type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" strokeWidth={2} />
                                            : selectedPlotType === PlotType.REQUIREMENT_PLOT ?
                                                //set karnataka dap to see this
                                                <Line type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#8884d8" strokeWidth={2} />
                                                : <>
                                                    <Line type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" strokeWidth={2} />
                                                    <Line type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#d88c4a" strokeWidth={2} />
                                                </>
                                    }
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                            : <p>...loading</p>
                    }
                </div>
            </div>
            <div className='w-[100%] flex lg:flex-row flex-col  md:justify-between mt-4'>
                <div className='flex flex-col min-w-[650px] w-full justify-center items-center  bg-white lg:mt-0 mt-4 rounded-xl shadow-lg p-4'>
                    <p className='mr-auto text-lg font-bold'>Top 5 Most Required Fertilizers</p>
                    <NewPiechart
                        data={data}
                        customColors={["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#8884D8"]}
                        title="Top 5 Required products"
                        dataKey="requirement_in_mt_"
                    />
                </div>
                <div className='flex flex-col min-w-[650px] lg:ml-4 ml-0 lg:mt-0 mt-4 w-full justify-center items-center  bg-white  rounded-xl shadow-lg p-4'>
                    <p className='mr-auto text-lg font-bold'>Top 5 Least Available Fertilizers</p>
                    <NewPiechart
                        data={data}
                        customColors={["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#8884D8"]}
                        title="Top 5 Required products"
                        dataKey="availability_in_mt_"
                        leastDataFirst={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard