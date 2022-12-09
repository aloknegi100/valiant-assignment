const Staff = require("../models/Staff");
const Student = require("../models/Student");

module.exports.studentHome = async (req, res) => {
  const user = await Student.findOne({ email: req.cookies.email });
  if (!user || user.email != req.cookies.email) {
    return res.redirect("/login");
  }
  res.render("studentHome", {
    title: "Student Dashboard",
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    userId: user._id,
    resume: user.resume,
  });
};

module.exports.studentUpload = async (req, res) => {
  let student = await Student.findById(req.params.id);
  console.log(req.body);
  student.mobile = req.body.mobile;
  student.email = req.body.email;
  student.name = req.body.name;
  if (req.file) {
    student.path = req.file.path;
    student.resume = req.file.originalname;
  }
  await student.save();
  console.log(student);
  res.redirect("back");
};

module.exports.studentSignIn = async (req, res) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student) {
    console.log("Student not found");
    return res.redirect("/login");
  }
  console.log(student);
  if (student.password == req.body.password) {
    console.log("password match");
    res.cookie("name", student.name);
    res.cookie("email", student.email);
    return res.redirect("/student/dashboard");
  }
  return res.redirect("/login");
};

module.exports.studentSignUp = async (req, res) => {
  if (req.body.confirm_password != req.body.password) {
    console.log("password and confirm password doesnt match");
    return res.redirect("back");
  }
  Student.findOne({ email: req.body.email }, (err, student) => {
    if (err) {
      console.log("error in signing up student");
      return res.redirect("back");
    }
    if (student) {
      console.log("student already exist with this email");
      return res.redirect("/");
    }
    Student.create(
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
      },
      (err, student) => {
        if (err) {
          console.log("error in creating student", err);
          return res.redirect("/");
        }
        console.log("student created successfully");
        return res.redirect("/login");
      }
    );
  });
};
