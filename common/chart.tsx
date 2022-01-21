import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"
import React, { useState, useEffect } from "react";

export function generateChart({data}) {
    const chart = new Chart( "#chart", {
        data: data,
        type: 'line',
        height: 180,
        colors: ['red']
    });

    console.log(chart);
}

export function ReactChart({data}) {
    const [chart, setChart] = useState<any>();

    function exportChart(){
        console.log('hello')
        if(chart)
            chart.export();
    }

    function calculateChartData(data) {
        const labels = [], sgpaValues = [], cgpaValues = [];
        let cgpaSum = 0, creditsSum = 0;

        data.forEach(({name, sgpa, crd}, i) => {
            labels.push(name || 'Semester ' + i);
            sgpaValues.push(sgpa);
            cgpaSum += +sgpa * +crd;
            creditsSum += +crd;
            cgpaValues.push(cgpaSum/creditsSum); 
        });

        return {
            labels: labels,
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
        };
    }

    useEffect(()=>{
        const chartData = calculateChartData(data);

        if(!chart)
            setChart(
                new Chart('#chart', {
                    type: 'line',
                    height: 180,
                    colors: ['red', 'yellow'],
                    data: chartData
                })
            )

        else
            chart.update(chartData)
    }, [data])

    return <div id="chart"></div>
}