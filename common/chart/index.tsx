import Line from './line';
import Labels from './labels';
import Grid from './grid';

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

export default function LineChart(props: ChartData) {
    const { width = 600, height = 300, values, labels } = props;
    const yLabels = [0, 1, 2, 3, 4];
    const clipPath: ClipPath = {x: [50, width-100], y: [20, height-100]}
    const xs = labels.map((_,i) => {
        return 50 + i * (width-100) / (values.length - 1)
    })
    const ys = yLabels.map((_,i) => {
        const y = height-100;
        return 20 - y / (yLabels.length-1) * i + y
    })

    console.log(xs, ys);

    return (
        <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={height}>
            <defs>
                <linearGradient id="cyan-gradient">
                <stop offset="5%" stopColor="#00CEF1" />
                <stop offset="95%" stopColor="#01FFFF" />
                </linearGradient>
            </defs>

            <style 
                dangerouslySetInnerHTML={{__html: `
                g > circle:hover + g{
                    visibility: visible !important;
                }
                g > circle:hover {
                    fill: cyan !important;
                    stroke: cyan !important;
                }
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
                }
                @keyframes animScale{
                    0% {
                        opacity: 0;
                        transform-origin: center;
                        transform: scale(0);
                    }
                    100% {
                        opacity: 1;
                        transform-origin: center;
                        transform: scale(1);
                    }
                }`}}>
            </style>
            <Grid
                xs={xs}
                ys={ys}
                width={width}
                height={height}
            />
            <Labels
                labels={['0 -','1 -','2 -','3 -','4 -']}
                start={clipPath.x[0] - 25}
                points={ys}
                direction="vertical"
            />
            <Labels
                labels={labels}
                start={clipPath.y[1] + 50}
                points={xs}
                direction="horizontal"
            />
            <Line
                clipPath={clipPath}
                yDivisions={yLabels.length - 1}
                values={values}
                color="cyan"/>
        </svg>
    )
}