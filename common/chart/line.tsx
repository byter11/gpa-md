import type { ClipPath } from '.';
type Points = {
	[key: string]: { x: number, y: number, value: number }[]
}

export default function Line(props: {
	clipPath: ClipPath
	yDivisions: number,
	values: { [key: string]: number[] },
	colors: string[]
}) {
	const [x, width] = props.clipPath.x;
	const [y, height] = props.clipPath.y;
	const { values } = props;

	const points: Points = {};
	Object.entries(values).forEach(([key, value]) => {
		Object.assign(points, {
			[key]: value.map((v, i) => ({
				x: x + i * width / ((value.length - 1) || 1),
				y: height - height / props.yDivisions * v + y,
				value: v
			}))
		})
	});

	console.log(points);
	return (
		<>
			<g>
				{Object.entries(points).map(([name, namedPoints], lineIdx) =>
					namedPoints.map(({ x, y, value }, i) =>
						<g key={i}>
							{namedPoints[i + 1] &&
								<path
									d={`M${x},${y}${`L${namedPoints[i + 1].x},${namedPoints[i + 1].y}`}`}
									fill="none" fillOpacity={1}
									stroke={`url(#${props.colors[lineIdx]}-gradient)`} strokeWidth="2"
									style={{
										strokeDasharray: "3000,3000"
									}}
								/>
							}
							<circle cx={x} cy={y} r="6"
								style={{
									animation: 'animRadius 0.7s ease 0s 1'
								}}
								fill={props.colors[lineIdx]}
								stroke="white" strokeWidth="2"

							/>
							<g style={{ visibility: 'hidden' }}>
								<polygon
									points={`${x - 50},${y - 10} ${x - 5},${y - 10} ${x},${y - 6} ${x + 5},${y - 10} ${x + 50},${y - 10} ${x + 50},${y - 35} ${x - 50},${y - 35}`}
									fill="gray"
									fillOpacity={0.9}
								/>
								<text
									x={x}
									y={y - 18}
									textAnchor="middle"
									fontSize={15}
									fill="white">
									{name}: {value.toFixed(2)}</text>
							</g>
						</g>
					)
				)}
			</g>
		</>
	)
}