import styles from './input.module.css';

import { useEffect, useState } from 'react';

export default function SemesterInput({semester, onUpdate}){
	const [courseValues, setCourseValues] = useState([{gpa: 0, crd: 0}]);

	const addCourse = () => {
		setCourseValues( oldValues => [...oldValues, {gpa: 0, crd: 0}])
	}

	const handleUpdate = (e, key) => {
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
		const accumulated = courseValues.reduce( (a, b ) => a.gpa*a.crd + b.gpa*b.crd, {gpa: 0, crd: 0});
		const totalCredits = courseValues.reduce( (a, b) => a.crd + b.crd, {gpa: 0, crd: 0});

		onUpdate(accumulated/totalCredits);	// sgpa
	}, [courseValues])

	return (
		<div className={styles.semester}>
			<span class={styles.header}>Semester {semester}</span>
			<span>hello</span>
			{courseValues.map( (course, idx) => 
				<div className={styles.course} key={idx}>
					<input name="gpa" value={course.gpa} onChange={(e) => handleUpdate(e, idx)}/>
					<input name="crd" value={course.crd} onChange={(e) => handleUpdate(e, idx)}/>
				</div>
			)}
			
			<button className={styles.plus} onClick={addCourse}/>
		</div>
	)
}