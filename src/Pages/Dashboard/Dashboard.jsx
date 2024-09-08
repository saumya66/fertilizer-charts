import React from 'react'
import { data } from "../../result"
import ReactGridLayout from 'react-grid-layout'
import useWindowWidth from '../../Hooks/useWindowWidth'
import PlotSection from '../../Components/Dashboard/PlotSection'
import PieChartSection from '../../Components/Dashboard/PieChartSection'
import "./Dashboard.css"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import DataTableSection from '../../Components/Dashboard/DataTableSection'

function Dashboard() {
    const isMobile = window.innerWidth < 1400;
    const [windowWidth] = useWindowWidth()

    const gridLayout = [
        { i: "table", x: 0, y: 0, w: 12, h: 1, isDraggable: false },
        { i: "plot", x: 0, y: 1, w: 12, h: 0.96, },
        { i: "pieChart1", x: 0, y: 2, w: 6, h: 0.8 },
        { i: "pieChart2", x: isMobile ? 0 : 6, y: isMobile ? 3 : 2, w: 6, h: 0.8 },
    ];

    return (
        <div className='max-h-[calc(100vh-60px)] w-full overflow-y-auto bg-slate-200'>
            <ReactGridLayout
                className="layout"
                layout={gridLayout}
                cols={12}
                width={windowWidth - 180}
                rowHeight={600}
                preventCollision={false}
                isResizable={false}
                isDraggable={true}
            >
                <div key="table"   >
                    <DataTableSection />
                </div>

                <div key="plot" className='z-50'>
                    <PlotSection />
                </div>

                <div key="pieChart1" className='flex  flex-col min-w-[600px] w-full justify-center items-center  bg-white   rounded-xl shadow-lg'>
                    <PieChartSection
                        data={data}
                        label={"Top 5 Most Required Fertilizers"}
                        customColors={["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#8884D8"]}
                        dataKey="requirement_in_mt_"
                    />
                </div>

                <div key="pieChart2" className='flex  flex-col min-w-[600px] w-full justify-center items-center  bg-white   rounded-xl shadow-lg'>
                    <PieChartSection
                        data={data}
                        label={"Top 5 Least Available Fertilizers"}
                        customColors={["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#8884D8"]}
                        leastDataFirst={true}
                        dataKey="availability_in_mt_" />
                </div>
            </ReactGridLayout>
        </div>
    )
}

export default Dashboard