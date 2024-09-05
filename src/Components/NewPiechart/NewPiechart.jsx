import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { getPieData } from "../../utils.js"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    value
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    const percentage = (percent * 100).toFixed(1)
    console.log(name, percentage, percent, parseFloat(percentage))
    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            className="font-semibold text-sm"
        >
            {`${!parseFloat(percentage) ? "" : `${name} - `} ${!parseFloat(percentage) ? "" : `${percentage}%`}`}
        </text>
    )
}
// ${!percent ? "*" : `${name} - `}
function NewPiechart({ data, title, dataKey, leastDataFirst = false, customColors = [] }) {
    let chartData = getPieData(data, dataKey, leastDataFirst)
    let dataWithZeroValue = chartData?.filter((each) => !each?.value)
    console.log(chartData)
    return (
        <>
            <ResponsiveContainer width={400} height={400}>
                <PieChart width={400} height={400} >
                    <Pie
                        data={chartData}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={170}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={customColors?.length ? customColors[index % customColors.length] : COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            {
                dataWithZeroValue?.length ?
                    <p className="mr-auto">{`*${dataWithZeroValue?.map(each => each?.name).join(', ')} fertilizers lie in 0%`}</p>
                    : <></>
            }
        </>

    )
}

export default NewPiechart
