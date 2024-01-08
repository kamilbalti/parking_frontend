import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const DonutChart = ({ heading, dataset, dcNo }) => {
  const [array, setArray] = useState(false)
  const data = dataset
  const series = data?.map((value, index) => ({
    label: value?.label,
    value: value?.value,
    backgroundColor: value?.backgroundColor
  }))
  let margin = document.getElementById('DonutChart')?.clientWidth
  // alert(margin)
  // console.log(series)
  return (
    <div className='DonutChartDiv'>
      <h1>{heading}</h1>
      <div className='DonutChartLabel'>
        {series.map((item, index) =>
          <div style={{ display: 'flex', gap: '3px', fontSize: '12px', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{
              backgroundColor: `rgba(${item?.backgroundColor})`, width: '13px', height: '13px',
              display: 'flex'
            }}></span>
            <span>{item?.label}</span>
          </div>
        )}
      </div>
      <div id={'DonutChart'} className={dcNo == 1 ? 'DonutChart' : 'DonutChart DonutChart2'}>
        <PieChart
          series={[{ startAngle: 0, endAngle: 360
            , cx: '65%'
            , cy: 160
            , data: series, innerRadius: 65, outerRadius: 160 }]}
          height={300}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </div>
    </div>
  )
}
export default DonutChart