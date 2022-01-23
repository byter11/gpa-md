import type { ClipPath } from '.';

export default function Line(props: {
	clipPath: ClipPath
	yDivisions: number,
	values: number[],
	color: string}) {
	const [x, width] = props.clipPath.x;
	const [y, height] = props.clipPath.y;
	const {values} = props;

	const points =
		values.map((value, i) => {
			return {
				x: x + i * width / (values.length - 1),
				y: height - height / props.yDivisions * value + y,
				value: value
			}
		})

	return (
		<>
		<g>
		<path
			d={`M${points.map(({x,y})=>`${x},${y}L`).join('')}`}
			fill="none" fillOpacity={1}
			stroke={`url(#${props.color}-gradient)`} stroke-width="2"
			style={{
				animation: 'animLine 8s ease 0s 1',
				strokeDasharray: "3000,3000"
			}}
		/>
		{points.map(({x, y, value}, i) =>
			<g>
            <circle cx={x} cy={y} r="6"
				key={i}
				style={{
					animation: 'animRadius 0.7s ease 0s 1'
				}}
				fill={props.color}
                stroke="white" strokeWidth="2"
				
                />
			<g
			style={{visibility: 'hidden'}}>
			<polygon
				points={`${x-50},${y-10} ${x-5},${y-10} ${x},${y-6} ${x+5},${y-10} ${x+50},${y-10} ${x+50},${y-35} ${x-50},${y-35}`}
				fill="gray"
				fillOpacity={0.9}
			/>
			<text 
			x={x} 	
			y={y-18}
			textAnchor="middle"
			fontSize={15}
			fill="white"
			>
			CGPA: {value}</text>
			</g>
			
			
			</g>
            )}
		</g>
		</>
	)
}