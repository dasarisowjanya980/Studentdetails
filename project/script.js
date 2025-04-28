let students = [];

function generateStudentId(index) {
  return "stu" + String(index + 1).padStart(3, '0');
}

document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const address = document.getElementById("address").value;
  const course = document.getElementById("course").value;
  const dob = document.getElementById("dob").value;
  const editIndex = document.getElementById("editIndex").value;

  
  let storedStudents = sessionStorage.getItem("students");
  if (storedStudents) {
    students = JSON.parse(storedStudents);
  }

  if (editIndex === "-1") {
    if (students.length >= 5) {
      alert("Maximum 5 student records allowed.");
      return;
    }

    const studentId = generateStudentId(students.length);
    const student = { studentId, name, gender, age, address, course, dob };
    students.push(student);
  } else {
    const existingStudent = students[editIndex];
    students[editIndex] = {
      studentId: existingStudent.studentId,
      name,
      gender,
      age,
      address,
      course,
      dob
    };
    document.getElementById("editIndex").value = -1;
  }

  
  sessionStorage.setItem("students", JSON.stringify(students));

 
  window.location.href = "students.html";
});

function clearForm() {
  document.getElementById("studentForm").reset();
  document.getElementById("editIndex").value = -1;
}


let editingIndex = sessionStorage.getItem("editIndex");
if (editingIndex !== null && editingIndex !== "-1") {
  let storedStudents = sessionStorage.getItem("students");
  if (storedStudents) {
    students = JSON.parse(storedStudents);
    const student = students[editingIndex];
    document.getElementById("name").value = student.name;
    document.getElementById("gender").value = student.gender;
    document.getElementById("age").value = student.age;
    document.getElementById("address").value = student.address;
    document.getElementById("course").value = student.course;
    document.getElementById("dob").value = student.dob;
    document.getElementById("editIndex").value = editingIndex;
    sessionStorage.removeItem("editIndex");
  }
}