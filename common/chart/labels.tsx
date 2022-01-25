
export default function Labels(props: {
  labels: string[],
  start: number,
  points: number[],
  direction: "vertical" | "horizontal"
}) {
  const { labels, start, points, direction } = props;

  const labelledPoints = labels.map((label, i) => {
    if (props.direction === "horizontal")
      return { x: points[i], y: start, label: label }
    else
      return { x: start, y: points[i], label: label }
  })

  return <g>
    {labelledPoints.map(({ x, y, label }, i) =>
      <text
        key={i}
        x={x} y={y}
        textAnchor="middle"
        fontSize={12}
        fill="gray"
        className="text-muted">
        <tspan alignmentBaseline="middle">
          {label}
        </tspan>
      </text>
    )}
  </g>
}