import styles from './input.module.css';
import { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

type Course = {
	gpa: number,
	crd: number
};

type SemesterInputProps = {
	semester: number,
	onUpdate: (sgpa: number) => void
}

export default function SemesterInput(
	{semester, onUpdate}: SemesterInputProps){
	const [courseValues, setCourseValues] = useState<Course[]>([{gpa: 0, crd: 0}]);

	function addCourse() {
		setCourseValues( oldValues => [...oldValues, {gpa: 0, crd: 0}])
	}

	function handleUpdate (e: ChangeEvent<HTMLInputElement>, key: number) {
		const {name, value} = e.target;
		setCourseValues(oldValues => 
			oldValues.map( (v, i) => {
				if(i == key)
					return {...v, [name]: value}
				return v
			})
		)
	}

	useEffect(() => {
		var accumulatedGPA: number = 0, totalCredits : number = 0;
		courseValues.forEach(({gpa, crd}: Course) => {
			accumulatedGPA += +gpa * +crd;
			totalCredits += +crd;
		})

		console.log(accumulatedGPA, totalCredits);
		onUpdate(accumulatedGPA/totalCredits);	// sgpa
	}, [courseValues])

	return (
		<div className={styles.semester}>
			<span className={styles.header}>Semester {semester}</span>
			<div className={styles.course}>
				<p>GPA</p>
				<p>Credits</p>
			</div>
			{courseValues.map( (course: Course, idx) => 
				<div className={styles.course} key={idx}>
					<input name="gpa" value={course.gpa} onChange={(e) => handleUpdate(e, idx)}/>
					<input name="crd" value={course.crd} onChange={(e) => handleUpdate(e, idx)}/>
				</div>
			)}
			
			<button className={styles.plus} onClick={addCourse}/>
		</div>
	)
}