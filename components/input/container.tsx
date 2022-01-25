import styles from './input.module.css';
import SemesterInput from './semesterInput';
import { useEffect, useRef, useState } from 'react';
import LineChart from 'common/chart';

export type Semester = {
  name?: string,
  sgpa: number,
  crd: number
};

export default function Container() {
  const [cgpaValues, setCgpaValues] = useState<number[]>([]);
  const [semesterValues, setSemesterValues]
    = useState<Semester[]>([{ sgpa: 0, crd: 0 }]);
  const scrollNeeded = useRef(false);

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
    const cgpa = [];
    let accumulatedGPA = 0, credits = 0;
    semesterValues.forEach(({ sgpa, crd }) => {
      console.log(sgpa, crd)
      accumulatedGPA += +sgpa * +crd
      credits += +crd;
      cgpa.push(accumulatedGPA / credits || 0);
    });
    setCgpaValues(cgpa);
    console.log(cgpa);
  }, [semesterValues])

  return (
    <div className={styles.container}>
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
        // values={semesterValues.map(({sgpa}) => sgpa)}
        values={{
          sgpa: semesterValues.map(({ sgpa }) => sgpa),
          cgpa: cgpaValues
        }}
        labels={semesterValues.map(({ name }) => name || ``)}
      />
    </div>
  )
}