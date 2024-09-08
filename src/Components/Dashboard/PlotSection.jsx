import React, { useState } from "react";
import Selector from "../Selector";
import { data } from "../../result";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

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

const PlotSection = () => {

    const [selectedFertilizerType, setSelectedFertilizerType] = useState("NPK")
    const [selectedState, setSelectedState] = useState("Whole India")
    const [selectedPlotType, setSelectedPlotType] = useState(PlotType.AVAILABILITY_AND_REQUIREMENT_PLOT)

    let uniqueStates = ["Whole India", ...new Set(data?.map((each) => each?.state))]
    let uniqueFertilizerType = [...new Set(data?.map((each) => each?.product))]

    let filterByStateAndFertilizerType = (data) => {
        if (selectedState === 'Whole India')
            return data?.product === selectedFertilizerType
        else
            return data?.product === selectedFertilizerType && data?.state === selectedState
    }

    let filteredData = data?.filter(filterByStateAndFertilizerType)
    filteredData = filteredData?.map((each) => {
        return {
            ...each, availability_in_mt_: parseFloat(each?.availability_in_mt_),
            requirement_in_mt_: parseFloat(each?.requirement_in_mt_)
        }
    })

    let dataForUniqueMonth = filteredData.reduce((finalData, item) => {
        let curItemMonth = item?.month

        if (!(curItemMonth in finalData)) {
            finalData[curItemMonth] = {
                'availability_in_mt_': 0,
                'requirement_in_mt_': 0,
                'month': curItemMonth,
            }
        }
        finalData[curItemMonth]['availability_in_mt_'] += item["availability_in_mt_"]
        finalData[curItemMonth]['requirement_in_mt_'] += item["requirement_in_mt_"]
        return finalData
    }, {})

    let finalData = Object.values(dataForUniqueMonth)

    return (
        <div className='min-w-[600px] w-full bg-white rounded-xl shadow-lg p-4'>
            <p className='mr-auto text-lg font-bold  mb-4'>{"Availability & Requirement"}</p>
            <div className='flex flex-row w-full'>
                {uniqueStates?.length ?
                    <Selector
                        label={"State"}
                        options={uniqueStates}
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)} />
                    : <></>}

                {uniqueFertilizerType?.length ?
                    <Selector
                        label={"Fertilizer"}
                        options={uniqueFertilizerType}
                        value={selectedFertilizerType}
                        onChange={(e) => setSelectedFertilizerType(e.target.value)} />
                    : <></>}

                <Selector
                    label={"Plot Type"}
                    options={PlotTypes}
                    value={selectedPlotType}
                    onChange={(e) => setSelectedPlotType(e.target.value)} />
            </div><div className='pt-8 flex  '>
                {finalData?.length ?
                    <ResponsiveContainer width={"90%"} height={400}>
                        {/*
                        //ENABLE THIS TO SEE JUST LINE GRAPH
                        //     <LineChart data={finalData}>
                        //         <Tooltip   />
                        //         <Legend verticalAlign="top" height={36} />
                        //         {selectedPlotType === PlotType.AVAILABILITY_PLOT ?
                        //             <Line type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" strokeWidth={2} />
                        //             : selectedPlotType === PlotType.REQUIREMENT_PLOT ?
                        //                 //set karnataka dap to see this
                        //                 <Line type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#8884d8" strokeWidth={2} />
                        //                 : <>
                        //                     <Line type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" strokeWidth={2} />
                        //                     <Line type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#d88c4a" strokeWidth={2} />
                        //                 </>}
                        //         <CartesianGrid stroke="#ccc" />
                        //         <XAxis dataKey="month" />
                        //         <YAxis />
                        //     </LineChart> */}
                        <AreaChart data={finalData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip active />
                            <Legend verticalAlign="top" height={36} />
                            {selectedPlotType === PlotType.AVAILABILITY_PLOT ?
                                <Area type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                : selectedPlotType === PlotType.REQUIREMENT_PLOT ?
                                    //set karnataka dap to see this
                                    <Area type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                    : <>
                                        <Area type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                        <Area type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                    </>}
                        </AreaChart>
                    </ResponsiveContainer>
                    : <p>...loading</p>}
            </div></div >
    )
}
export default PlotSection