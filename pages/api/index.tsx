// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { defaultChartOptions } from "common/chart";
import { Chart, ChartData, ChartOptions } from "frappe-charts"

export default function handler(req, res) {
  const {sgpa, cgpa, semester} = req.query;
  if(!sgpa && !cgpa) return res.send(400);

  const sgpaValues = sgpa ? sgpa.split(',') : [];
  const cgpaValues = cgpa ? cgpa.split(',') : [];
  const semesterList = semester ? semester.split(',') : [];
  const semesterValues = []

  for(let i = 1; i < Math.max(sgpaValues.length, cgpaValues.length) + 1; i++) {
    semesterValues.push(semesterList[i-1] || 'Semester ' + i);
  } 

  const chart = new Chart('#chart', {
    ...defaultChartOptions,
    data: {
      labels: semesterValues,
        datasets: [
            {
                name: 'cgpa',
                values: cgpaValues
            },
            {
                name: 'sgpa',
                values: sgpaValues
            }
        ]
      }
    }
  ); 
  
  res.send(chart.svg);
}
  