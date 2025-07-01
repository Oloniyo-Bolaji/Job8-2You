"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const CustomPieChart = ({value, colour}) => {
  const data = [
    { name: 'Value', value: value },
    { name: 'Remaining', value: 100 - value },
  ]

  const COLORS = [colour, '#e0e0e0'] // [valueColor, grey]

  return (
    <PieChart width={60} height={60}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={20}
        outerRadius={28}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`slice-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default CustomPieChart
