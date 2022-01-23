
export default function Labels(props: {
	labels: string[],
	start: number,
	length: [number, number],
	direction: "vertical" | "horizontal"	
}) {
	const { labels, start, length, direction } = props;
	const points = labels.map((label, i) => {
		const offset = i * length[1]/(labels.length-1) - label.length*3;
		if(props.direction === "horizontal")
			return {x: length[0] + offset , y: start, label: label}
		else
			return {x: start, y: length[0] + length[1] - offset, label: label}
	})

	return <g>
		{points.map(({x,y, label}) => 
			<text
				x={x} y={y}
			>
				{label}
			</text>
		)}
	</g>
}