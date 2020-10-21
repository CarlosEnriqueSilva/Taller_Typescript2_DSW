import { dataCourses } from './dataCourses.js';
var coursesTbody = document.getElementById('courses'); // Nodo tbody que tiene el id="courses"
var creditsTBody = document.getElementById('totalCreditos');
var inputSearchBox = document.getElementById('search-box');
var btnfilterByName = document.getElementById('button-filterByName');
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
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function clearCoursesInTable() {
    coursesTbody.innerHTML = "";
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
escribirTotalCreditos(dataCourses);
