import { useState } from "react";
import type { ClipPath } from './chart';

export default function Line(props: {
	clipPath: ClipPath
	yDivisions: number,
	values: number[] }) {
	const [x, width] = props.clipPath.x;
	const [y, height] = props.clipPath.y;
	const {values} = props;

	const points =
		values.map((value, i) => {
			return {
				x: x + i * width / (values.length - 1),
				y: y + height - height / props.yDivisions * value
			}
		})

	return (
		<>
		<g>
		<path
			d={`M${points.map(({x,y})=>`${x},${y}L`).join('')}`}
			xmlns="http://www.w3.org/2000/svg"
			fill="none" fillOpacity={1}
			stroke="red" stroke-width="2"
			style={{
				animation: 'animLine 5s ease 0s 1',
				strokeDasharray: "3000,3000"
			}}
		/>
		{points.map(({x,y}) => 
            <circle cx={x} cy={y} r="4"
				style={{
					animation: 'animRadius 0.7s ease 0s 1'
				}}
				fill="red"
                stroke="white" stroke-width="2"
                />
            )}
		</g>
		</>
	)
}