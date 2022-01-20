import styles from './input.module.css';
import SemesterInput from './semesterInput';
import { useState } from 'react';

export default function Container() {
	const [semesterValues, setSemesterValues] 
		= useState<number[]>([0,0]);

	function addSemester() {
		setSemesterValues( (oldValues) => [...oldValues, 0]);
	}

	function handleUpdate(key: number, value: number) {
		setSemesterValues(oldValues => 
			oldValues.map( (v, i) => {
				if(i == key)
					return value
				return v
			})
		)
	}

	return (
		<div className={styles.container}>
			{semesterValues.map( (sem, idx ) => 
				<SemesterInput 
					key={idx}
					semester={idx+1}
					onUpdate={(newValue: number)=>handleUpdate(idx, newValue)}
				/>
			)}
		</div>
	)
}