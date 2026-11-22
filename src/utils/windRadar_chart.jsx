import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, Tooltip } from "recharts"

const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const series = [
  {dataKey: "low", name: "0-10 km/h", fill: "lightblue"},
  {dataKey: "medium", name: "10-20 km/h", fill: "lightgreen"},
  {dataKey: "high", name: "20+ km/h", fill: "orangered"}
]
function WindRoseLegend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 16px', fontSize: 12}}>
      {series.map(({ name, fill }) => (
        <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, backgroundColor: fill}} />
          {name}
        </span>
      ))}
    </div>
  );
}
const formatAngle = (angle) => directions[angle / 45 ] ?? ""
const formatTooltipAngle = (label) => formatAngle(Number(label))

export default function WeeklyWindRadar({weather}) {
    const windRadar = weather.daily.time.map((data, index)=>({
        day: new Date(data + "T12:00:00").toLocaleDateString("en-GB", {weekday: "short"}),
        Wind: weather.daily.wind_speed_10m_max[index],
        Direction: weather.daily.wind_direction_10m_dominant[index]
    }))
    const data = directions.map((direction, i) => {
        const sector = windRadar.filter(item => Math.round(item.Direction / 45) % 8 === i)
        return {
            direction,
            angle: i * 45,
            low: sector.filter(d => d.Wind < 10).length,
            medium: sector.filter(d => d.Wind >= 10 && d.Wind < 20).length,
            high: sector.filter(d => d.Wind >= 20).length,
        }
    })

    const maxTotal = Math.max(...data.map(entry => entry.low + entry.medium + entry.high))
    const radiusDomain = [0, maxTotal]
    const angleDomain = [0, 360]
  return(
    <>
    <div className="w-[90%] mx-auto my-1 p-5 items-center justify-center">
    <RadialBarChart style={{width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1}} layout="centric" cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" startAngle={90} endAngle={-270} responsive data={data}>
        <PolarGrid gridType="circle" stroke="white"/>
        <PolarAngleAxis dataKey="angle" domain={angleDomain} tickCount={8} niceTicks="none" tickFormatter={formatAngle} axisLine={false} tickLine={false} tick={{fill: "white"}}/>
        <PolarRadiusAxis domain={radiusDomain} stroke="white"/>
        {series.map((entry)=>(
         <RadialBar key={entry.dataKey} dataKey={entry.dataKey} stackId="wind" name={entry.name} fill={entry.fill} /> 
        ))}
        <Legend content={WindRoseLegend}/>
        <Tooltip labelFormatter={formatTooltipAngle} />
    </RadialBarChart>

    <div className="grid grid-cols-7 gap-5 sm:gap-0 md:gap-2 mt-3 items-center justify-between">
      {windRadar.map((item, index)=>(
        <div key={index} className="font-semibold text-xs sm:text-base md:text-xl text-white">
          <p>{item.day}</p>
          <div style={{fontFamily:"math", display:"inline-block", alignItems:"center", justifyContent:"center", transform: `rotate(${item.Direction}deg)`}}>&uarr;</div>
          <p className="text-xs">{(item.Direction)}&#176;</p>
        </div>
      ))}
    </div>
    </div>
    </>
  )  
}