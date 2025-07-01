'use client'

import React, { PureComponent } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#FF8042', '#17a2b8']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomPieChart = ({ pieData }) => {
  return (
    <div className='sm:w-[30%] w-[100%]'
      style={{
        height: '350px',
        borderRadius: '10px',
        backgroundColor: 'white',
        padding: '30px',
      }}
    >
      <h5 className="m-[5px] font-bold text-[15px]"> Jobs Statistics</h5>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={250} height={250}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            label={renderCustomizedLabel}
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            legendType="circle"
            labelLine={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart
