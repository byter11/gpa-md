import Line from './line';
import Labels from './labels';
import Grid from './grid';

export type ChartData = {
  labels: string[],
  values: { [key: string]: number[] },
  height?: number,
  width?: number
}

export type ClipPath = {
  x: [number, number],
  y: [number, number]
}

export default function LineChart(props: ChartData) {
  const { width = 600, values, labels } = props;
  const height = width/2;
  const yLabels = ['0 -', '1 -', '2 -', '3 -', '4 -'];
  const clipPath: ClipPath = { x: [50, width - 100], y: [50, height - 100] }

  const maxX = Math.max(...Object.values(values).map(v => v.length))
  const xs = labels.map((_, i) => {
    return 50 + (i * (clipPath.x[1]) / (maxX - 1) || 1)
  })

  const ys = yLabels.map((_, i) => {
    const y = height - 100;
    return 50 - y / (yLabels.length - 1) * i + y
  })

  const colors = [{ color: "cyan", a: "#00CEF1", b: "#01FFFF" },
  { color: "orangered", a: "#FF416C", b: "#FF4B2B" },
  { color: "lime", a: "#FFE000", b: "#799F0C" }];

  return (
    <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={height}>
      <defs>
        {colors.map(({ color, a, b }, i) =>
          <linearGradient key={i} id={`${color}-gradient`} gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor={a} />
            <stop offset="95%" stopColor={b} />
          </linearGradient>
        )}
      </defs>

      <style
        dangerouslySetInnerHTML={{
          __html: `
                g > circle:hover + g{
                    z-index: 1000;
                    visibility: visible !important;
                }
                g > circle:hover {
                    stroke: none !important;
                }
                path {
                    animation: animLine 5s ease 0s 1;
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
        labels={yLabels}
        start={clipPath.x[0] - 25}
        points={ys}
        direction="vertical"
      />
      <Labels
        labels={labels}
        start={clipPath.y[1] + 80}
        points={xs}
        direction="horizontal"
      />
      <Line
        clipPath={clipPath}
        yDivisions={yLabels.length - 1}
        values={values}
        colors={colors.map(c => c.color)} />
    </svg>
  )
}