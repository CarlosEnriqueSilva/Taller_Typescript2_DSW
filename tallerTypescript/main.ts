import {dataCourses} from './dataCourses.js'
import { Course } from './course.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

const coursesTbody: HTMLElement = document.getElementById('courses')!; // Nodo tbody que tiene el id="courses"
const nombreStudTbody: HTMLElement = document.getElementById('nombreEstudiante')!;
const studentInf: HTMLElement = document.getElementById('studentInfo')!;
let creditsTBody: HTMLElement = document.getElementById('totalCreditos')!;
let inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById('search-box')!;
let btnfilterByName: HTMLElement = document.getElementById('button-filterByName')!;
let btnfilterByCredits: HTMLElement = document.getElementById('button-filterByCredits')!;
let inputMinCredits: HTMLInputElement = <HTMLInputElement>document.getElementById('minCreditos')!;
let inputMaxCredits: HTMLInputElement = <HTMLInputElement>document.getElementById('maxCreditos')!;


function informacionStudent(studentInfo: Student): void {
      nombreStudTbody.innerHTML = studentInfo.nombre;
      let trElements = document.createElement("tr");
      trElements.innerHTML = `<td>Código</td>
                              <td>${studentInfo.codigo}</td>`;
      studentInf.appendChild(trElements);
      trElements = document.createElement("tr");
      trElements.innerHTML = `<td>Cédula</td>
                              <td>${studentInfo.cedula}</td>`;
      studentInf.appendChild(trElements);
      trElements = document.createElement("tr");
      trElements.innerHTML = `<td>Edad</td>
                              <td>${studentInfo.edad}</td>`;
      studentInf.appendChild(trElements);
      trElements = document.createElement("tr");
      trElements.innerHTML = `<td>Dirección</td>
                               <td>${studentInfo.direccion}</td>`;
      studentInf.appendChild(trElements);
      trElements = document.createElement("tr");
      trElements.innerHTML = `<td>Teléfono</td>
                              <td>${studentInfo.telefono}</td>`;
      studentInf.appendChild(trElements);
}

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

function applyFilterByCredits() {
  if(inputMaxCredits.value=="" || inputMinCredits.value == "")
  {
    alert("Ingrese un numero mínimo y maximo de creditos a revisar");
  }
  else
  {
    let min = inputMinCredits.valueAsNumber;
    let max = inputMaxCredits.valueAsNumber;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(min,max,dataCourses);
    renderCoursesInTable(coursesFiltered);
    escribirTotalCreditos(coursesFiltered);
  }
}

function searchCourseByCredits(numCredsMin: number, numCredsMax: number, courses: Course[]){
  let cursosNuevos: Course[] = [];
  for(let curso of courses)
  {
    if(curso.credits <= numCredsMax && curso.credits >= numCredsMin)
    {
      cursosNuevos.push(curso);
    }
  }
  return cursosNuevos;
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function clearCoursesInTable(): void {
  coursesTbody.innerHTML = "";
}

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();
renderCoursesInTable(dataCourses);
escribirTotalCreditos(dataCourses);
informacionStudent(dataStudent);