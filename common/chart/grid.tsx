export default function Grid(props: {
  xs: number[],
  ys: number[],
  width: number,
  height: number
}) {

  return (
    <g>
      {props.xs.map((x, i) =>
        <line
          key={i}
          x1={x}
          x2={x}
          y1={Math.max(...props.ys)}
          y2={Math.min(...props.ys)}
          shapeRendering="crispEdges"
          stroke="#53c3df"
          strokeWidth="1"
          style={{
            animation: 'animLine 5s ease 0s 1',
            strokeDasharray: "3000,3000"
          }}
        />
      )}
    </g>
  )
}