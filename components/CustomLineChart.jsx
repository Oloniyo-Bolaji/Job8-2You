'use client'

import React, { PureComponent } from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from 'recharts'

const CustomLineChart = ({ chartData }) => {
  return (
    <div className="rounded-[10px] bg-[white] h-[300px] sm:w-[60%] w-[100%]">
      <h5 className="m-[5px] font-bold text-[15px]">Appliations Received</h5>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          isAnimationActive={true}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="name"
            tickFormatter={(name) => name.length > 10 && name.slice(0, 4) + '…'}
          />
          <Bar dataKey="applications" fill="#17a2b8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
