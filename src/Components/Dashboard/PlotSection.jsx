import React, { useState } from "react";
import Selector from "../Selector";
import { data } from "../../result";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "@mui/material";

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
                {filteredData?.length ?
                    <ResponsiveContainer width={"90%"} height={400}>
                        <LineChart data={filteredData}>
                            <Legend verticalAlign="top" height={36} />
                            {selectedPlotType === PlotType.AVAILABILITY_PLOT ?
                                <Line type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" strokeWidth={2} />
                                : selectedPlotType === PlotType.REQUIREMENT_PLOT ?
                                    //set karnataka dap to see this
                                    <Line type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#8884d8" strokeWidth={2} />
                                    : <>
                                        <Line type="monotone" dataKey={PlotType.AVAILABILITY_PLOT} stroke="#8884d8" strokeWidth={2} />
                                        <Line type="monotone" dataKey={PlotType.REQUIREMENT_PLOT} stroke="#d88c4a" strokeWidth={2} />
                                    </>}
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                    : <p>...loading</p>}
            </div></div>
    )
}
export default PlotSection