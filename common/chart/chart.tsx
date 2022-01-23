import { ReactElement, useState } from "react";
import Line from './line';
import Labels from './labels';

export type ChartData = {
    labels: string[],
    values: number[],
    height?: number,
    width?: number
}

export type ClipPath = {
    x: [number, number],
    y: [number, number]
}

export function LineChart(props: ChartData) {
    const { width = 500, height = 300, values, labels } = props;
    const yLabels = [0, 1, 2, 3, 4];
    const clipPath: ClipPath = {x: [50, width-100], y: [50, height-50]}
    return (
        <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={height}>
            <style 
                dangerouslySetInnerHTML={{__html: `
                @keyframes animLine{
                    0% {
                        stroke-dashoffset: 3000;
                    }
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes animRadius{
                    0% {
                        r: 0;
                    }
                    100% {
                        r: auto;
                    }
                }`}}>
            </style>
            <Labels
                labels={['0','1','2','3','4']}
                start={clipPath.x[0] - 25}
                length={clipPath.y}
                direction="vertical"
            />
            <Line
                clipPath={clipPath}
                yDivisions={yLabels.length - 1}
                values={values} />
        </svg>
    )
}