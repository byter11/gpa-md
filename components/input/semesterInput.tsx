import styles from './input.module.css';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Semester } from './container';

type Course = {
	gpa: number,
	crd: number
};

type SemesterInputProps = {
	key?: any,
	semester: number,
	onUpdate: (sgpa: Semester) => void
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

	function handleNextInput (e: KeyboardEvent<HTMLElement>) {
		if (e.key === "Enter") {
			(e.target as HTMLElement).parentElement.nextElementSibling.querySelector('input').focus();
		}
	}

	useEffect(() => {
		var accumulatedGPA: number = 0, totalCredits : number = 0;
		courseValues.forEach(({gpa, crd}: Course) => {
			accumulatedGPA += +gpa * +crd;
			totalCredits += +crd;
		})
		onUpdate({sgpa: accumulatedGPA/totalCredits || 0, crd: totalCredits});
	}, [courseValues])

	return (
		<div className={styles.semester}>
			<span contentEditable suppressContentEditableWarning className={styles.header}>Semester<br/>{semester}</span>
			
			{courseValues.map( (course: Course, idx) => 
				<div className={styles.course} key={idx}>
					<div>
						{idx==0 && <label htmlFor="gpa">gpa</label>}
						<input 
							autoComplete="off"
							name="gpa" 
							value={course.gpa} 
							onChange={(e) => handleUpdate(e, idx)}
							onKeyPress={handleNextInput}
							/>
					</div>
					<div>
						{idx==0 && <label>credits</label>}
						<input 
							autoComplete="off"
							name="crd" 
							value={course.crd} 
							onChange={(e) => handleUpdate(e, idx)}/>
					</div>
					
				</div>
			)}
			
			<button className={styles.plus} onClick={addCourse}>Add Course</button>
		</div>
	)
}