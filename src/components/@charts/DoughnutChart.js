import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
    const data = {
        labels: [
          'Approved',
          'Pending',
          'Under review',
          // 'Rejected'
        ],
        datasets: [{
          label: 'Monthly Activity',
          data: [300, 50, 100],
          backgroundColor: [
            '#634DEE',
            '#DFDAFF',
            '#4BCA69',
            // 'rgba(75, 192, 192, 0.2)'
          ],
          hoverOffset: 4
        }]
      };
  return (
    <div className='flex flex-col'>
      <h2 className='font-medium text-base text-[#334D6E] mb-2'>Monthly activity</h2>
      <hr className='mb-4 text-[#E5E5EF]'/>
      <Doughnut data={data} />
    </div>
  )
}

export default DoughnutChart




