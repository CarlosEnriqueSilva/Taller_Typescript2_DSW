import {dataCourses} from './dataCourses.js'
import { Course } from './course.js';

const coursesTbody: HTMLElement = document.getElementById('courses')!; // Nodo tbody que tiene el id="courses"
let creditsTBody: HTMLElement = document.getElementById('totalCreditos')!;
let inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById('search-box')!;
let btnfilterByName: HTMLElement = document.getElementById('button-filterByName')!;

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function escribirTotalCreditos(courses: Course[]): void{
  creditsTBody.innerHTML = "<strong>Total Créditos: </strong>" + getTotalCredits(courses);
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  escribirTotalCreditos(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function clearCoursesInTable(): void {
  coursesTbody.innerHTML = "";
}

btnfilterByName.onclick = () => applyFilterByName();
renderCoursesInTable(dataCourses);
escribirTotalCreditos(dataCourses);