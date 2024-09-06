import React from "react";
import NewPiechart from "../NewPiechart";



const PieChartSection = ({ data, label, customColors, dataKey, leastDataFirst = false }) => {

    return (
        <>
            <p className='mr-auto text-lg font-bold pt-4 pl-4'>{label}</p>
            <NewPiechart
                data={data}
                customColors={customColors}
                dataKey={dataKey}
                leastDataFirst={leastDataFirst}
            />
        </>

    )
}
export default PieChartSection