import styles from './input.module.css';
import SemesterInput from './semesterInput';
import ApiLink from './apiLink';
import React, { useEffect, useRef, useState, MouseEvent, RefObject } from 'react';
import LineChart from 'common/chart';

export type Semester = {
  name?: string,
  sgpa: number,
  crd: number
};

export default function Container() {
  const [semesterValues, setSemesterValues]
    = useState<Semester[]>([{ sgpa: 0, crd: 0 }]);
  const scrollNeeded = useRef(false);
  const containerWidth = useRef<HTMLDivElement>(null);

  function addSemester() {
    scrollNeeded.current = true;
    setSemesterValues((oldValues) => [...oldValues, { sgpa: 0, crd: 0 }]);
  }

  function handleUpdate(key: number, value: Semester) {
    setSemesterValues(oldValues =>
      oldValues.map((v, i) => {
        if (i == key)
          return value
        return v
      })
    )
  }

  useEffect(() => {
    if (scrollNeeded.current === true) {
      window.scrollTo(0, document.body.scrollHeight);
      scrollNeeded.current = false;
    }
  }, [semesterValues])

  function getCGPA() : number[] {
    const cgpa = [];
    let accumulatedGPA = 0, credits = 0;
    semesterValues.forEach(({ sgpa, crd }) => {
      accumulatedGPA += +sgpa * +crd
      credits += +crd;
      if(accumulatedGPA/credits)
        cgpa.push( +(accumulatedGPA/credits).toFixed(2) )
      else
        cgpa.push(0);
    });
    return cgpa;
  }

 

  return (
    <div className={styles.container} ref={containerWidth}>
      <h4>generate your cgpa graph</h4>
      <hr />
      {semesterValues.map((sem, idx) =>
        <SemesterInput
          key={idx}
          semester={idx + 1}
          onUpdate={(newValue: Semester) => handleUpdate(idx, newValue)}
        />
      )}
      <button className={styles.plus} onClick={addSemester}>Add Semester</button>
      <hr />
      <LineChart
        values={{
          sgpa: semesterValues.map(({ sgpa }) => sgpa),
          cgpa: getCGPA()
        }}
        labels={semesterValues.map(({ name }) => name || ``)}
        width={containerWidth.current ? containerWidth.current.offsetWidth : 300}
      />
      <ApiLink
        sgpa = {semesterValues.map(({sgpa})=>+sgpa.toFixed(2))}
        cgpa = {getCGPA()}
        labels = {semesterValues.map(({name}) => name).filter(name => name)}
      />
    </div>
  )
}