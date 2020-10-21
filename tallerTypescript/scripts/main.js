import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses'); // Nodo tbody que tiene el id="courses"
var nombreStudTbody = document.getElementById('nombreEstudiante');
var studentInf = document.getElementById('studentInfo');
var creditsTBody = document.getElementById('totalCreditos');
var inputSearchBox = document.getElementById('search-box');
var btnfilterByName = document.getElementById('button-filterByName');
var btnfilterByCredits = document.getElementById('button-filterByCredits');
var inputMinCredits = document.getElementById('minCreditos');
var inputMaxCredits = document.getElementById('maxCreditos');
function informacionStudent(studentInfo) {
    nombreStudTbody.innerHTML = studentInfo.nombre;
    var trElements = document.createElement("tr");
    trElements.innerHTML = "<td>C\u00F3digo</td>\n                              <td>" + studentInfo.codigo + "</td>";
    studentInf.appendChild(trElements);
    trElements = document.createElement("tr");
    trElements.innerHTML = "<td>C\u00E9dula</td>\n                              <td>" + studentInfo.cedula + "</td>";
    studentInf.appendChild(trElements);
    trElements = document.createElement("tr");
    trElements.innerHTML = "<td>Edad</td>\n                              <td>" + studentInfo.edad + "</td>";
    studentInf.appendChild(trElements);
    trElements = document.createElement("tr");
    trElements.innerHTML = "<td>Direcci\u00F3n</td>\n                               <td>" + studentInfo.direccion + "</td>";
    studentInf.appendChild(trElements);
    trElements = document.createElement("tr");
    trElements.innerHTML = "<td>Tel\u00E9fono</td>\n                              <td>" + studentInfo.telefono + "</td>";
    studentInf.appendChild(trElements);
}
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function escribirTotalCreditos(courses) {
    creditsTBody.innerHTML = "<strong>Total Créditos: </strong>" + getTotalCredits(courses);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    escribirTotalCreditos(coursesFiltered);
}
function applyFilterByCredits() {
    if (inputMaxCredits.value == "" || inputMinCredits.value == "") {
        alert("Ingrese un numero mínimo y maximo de creditos a revisar");
    }
    else {
        var min = inputMinCredits.valueAsNumber;
        var max = inputMaxCredits.valueAsNumber;
        clearCoursesInTable();
        var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
        renderCoursesInTable(coursesFiltered);
        escribirTotalCreditos(coursesFiltered);
    }
}
function searchCourseByCredits(numCredsMin, numCredsMax, courses) {
    var cursosNuevos = [];
    for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
        var curso = courses_1[_i];
        if (curso.credits <= numCredsMax && curso.credits >= numCredsMin) {
            cursosNuevos.push(curso);
        }
    }
    return cursosNuevos;
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function clearCoursesInTable() {
    coursesTbody.innerHTML = "";
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
escribirTotalCreditos(dataCourses);
informacionStudent(dataStudent);
