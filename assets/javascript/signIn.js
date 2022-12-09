let switchButton = document.getElementById("switch");
let staffForm = document.getElementById("staff-form");
let studentForm = document.getElementById("student-form");

let count = 0;
switchButton.addEventListener("click", () => {
  count++;
  if (count % 2) {
    document.querySelector("h1").innerText = "Staff Sign In";
    studentForm.style.display = "none";
    staffForm.style.display = "flex";
    switchButton.innerText = "Sign In as student";
  } else {
    document.querySelector("h1").innerText = "Student Sign In";
    studentForm.style.display = "flex";
    staffForm.style.display = "none";
    switchButton.innerText = "Sign In as staff";
  }
});
