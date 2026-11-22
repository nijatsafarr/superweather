import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts"

export default function WeeklyHumidity({ weather }) {

  const chartHumidity = weather.daily.time.map((date, index) => ({
    day: new Date(date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short"}),
    Humidity: weather.daily.relative_humidity_2m_mean[index]
  }))

  return (
    <div className="w-[90%] mx-auto my-1 p-5 rounded-xl">
      <AreaChart style={{width: "100%", maxWidth: "700px", maxHeight: "70vh", aspectRatio: 2.200}} responsive data={chartHumidity} margin={{top: 10, right: 10, left: 0, bottom: 0}}>
        <defs>
          <linearGradient id="splitColor" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity={0.9} />
            <stop offset="100%" stopColor="white" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="day" tick={{fill: "white"}} axisLine={{stroke:"white"}} />
        <YAxis domain={[0, 100]} unit="%" tick={{fill:"white"}} axisLine={{stroke:"white"}} />
        <Tooltip labelStyle={{color:"blue"}} itemStyle={{color:"gray"}}/>
        <Area type="monotone" dataKey="Humidity" stroke="#000" fill="url(#splitColor)"/>
      </AreaChart>
    </div>
  )
}