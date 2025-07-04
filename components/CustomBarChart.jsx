'use client'

import React, { PureComponent } from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from 'recharts'

const CustomBarChart = ({ chartData }) => {
  return (
    <div
      className="sm:w-[70%] w-[100%]"
      style={{ height: '350px', borderRadius: '10px', backgroundColor: 'white', padding: '10px' }}
    >
      <h5 className="m-[5px] font-bold text-[15px]">Impressions</h5>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          barGap={0}
          isAnimationActive={true}
        >
          <XAxis
            dataKey="name"
            tickFormatter={(name) => (name.length > 5 &&  name.slice(0, 4) + '…' )}
          />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="clicks" stackId="a" fill="#17a2b8" barSize={30} />
          <Bar dataKey="bookmarks" stackId="a" fill="#82ca9d" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
