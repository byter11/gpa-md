import { Chart, ChartData, ChartOptions } from "frappe-charts"
import React, { useRef, useEffect } from "react";
import type { Semester } from 'components/input/container';


export const defaultChartOptions: ChartOptions = {
    type: 'line',
    height: 180,
    axisOptions: {
        xAxisMode: 'span',
        xIsSeries: true,
        yAxisMode: 'tick',
    },
    colors: ['red', 'light-blue'],
    data: null
}

export function ReactChart(props: {data: Semester[]}) {
    const chart = useRef<any>(null);

    function calculateChartData(data): ChartData {
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
        const chartData = calculateChartData(props.data);

        if(!chart || !chart.current) {
            chart.current = new Chart('#chart', {
                ...defaultChartOptions,
                data: chartData
            })
        }
        else {
            chart.current.update(chartData)
        }
    }, [props.data])

    return <div id="chart"></div>
}