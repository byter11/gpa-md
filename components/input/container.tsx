import styles from './input.module.css';
import SemesterInput from './semesterInput';
import { useEffect, useRef, useState } from 'react';
import { ReactChart} from 'common/chart';

export type Semester = {
	name?: string ,
	sgpa: number,
	crd: number
};

export default function Container() {
	const [cgpa, setCgpa] = useState<number>(0);
	const [semesterValues, setSemesterValues] 
		= useState<Semester[]>([{sgpa: 0, crd: 0}]);

	function addSemester() {
		setSemesterValues( (oldValues) => [...oldValues, {sgpa: 0, crd: 0}]);
	}

	function handleUpdate(key: number, value: Semester) {
		setSemesterValues(oldValues =>
			oldValues.map( (v, i) => {
				if(i == key)
					return value
				return v
			})
		)
	}

	useEffect(()=>{
		let accumulatedGPA = 0, credits = 0;
		semesterValues.forEach(({sgpa, crd}) => {
			accumulatedGPA += +sgpa * +crd
			credits += +crd;
		});
		setCgpa(accumulatedGPA/credits);
	},[semesterValues])


	return (
		<div className={styles.container}>
			<h4>generate your cgpa graph</h4>
			<hr/>
			{semesterValues.map( (sem, idx ) => 
				<SemesterInput 
					key={idx}
					semester={idx+1}
					onUpdate={(newValue: Semester)=>handleUpdate(idx, newValue)}
				/>
			)}
			<button className={styles.plus} onClick={addSemester}>Add Semester</button>
			<hr/>

			<ReactChart data={semesterValues}/>
		</div>
	)
}