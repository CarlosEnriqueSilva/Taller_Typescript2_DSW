import { dataCourses } from "./dataCourses";
var coursesTbody = document.getElementById('courses'); // Nodo tbody que tiene el id="courses"
var creditsTbody = document.getElementById('totalCreditos');
var btnfilterByName = document.getElementById('button-filterByName');
var inputSearchBox = document.getElementById('search-box');
renderCoursesInTable(dataCourses);
console.log(dataCourses);
btnfilterByName.onclick = function () { return applyFilterByName(); };
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
function applyFilterByName() {
    var text = inputSearchBox.nodeValue;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function clearCoursesInTable() {
    var nodes = coursesTbody.childNodes;
    var nods;
    for (nods in nodes) {
        coursesTbody.removeChild;
    }
}
