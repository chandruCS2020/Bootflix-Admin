import "./chart.css";
import {
LineChart,
Line,
XAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {

return (
    <div className="chart">
    <h3 className="chartTitle">{title}</h3>
    <ResponsiveContainer width="99.9%" aspect={4 / 1} > 
        <LineChart data={data} width={500} height={500}>
        <XAxis dataKey="name" stroke="#7D8FF4" />
        <Line type="monotone" dataKey={dataKey} stroke="#7D8FF4" />
        <Tooltip />
        {grid && <CartesianGrid stroke="#FF726A" strokeDasharray="5 5" />}
        </LineChart>
    </ResponsiveContainer>
    </div>
);
}