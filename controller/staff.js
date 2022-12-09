const Staff = require("../models/Staff");
const Student = require("../models/Student");

module.exports.staffHome = async (req, res) => {
  let staff = await Staff.findOne({ email: req.cookies.email });
  if (!staff || staff.email !== req.cookies.email) {
    console.log(staff);
    return res.redirect("/login");
  }
  let students = await Student.find({});

  res.render("staffDashboard", {
    title: "Staff Dashboard",
    students: students,
  });
};

module.exports.staffSignIn = async (req, res) => {
  const staff = await Staff.findOne({ email: req.body.email });

  console.log(staff);
  if (staff.password == req.body.password) {
    console.log("password match");
    res.cookie("name", staff.name);
    res.cookie("email", staff.email);
    return res.redirect("/staff/dashboard");
  }
  return res.redirect("/login");
};

module.exports.staffSignUp = async (req, res) => {
  if (req.body.confirm_password != req.body.password) {
    console.log("password and confirm password doesnt match");
    return res.redirect("back");
  }
  Staff.findOne({ email: req.body.email }, (err, staff) => {
    if (err) {
      console.log("error in signing up staff");
      return res.redirect("back");
    }
    if (staff) {
      console.log("staff already exist with this email");
      return res.redirect("/");
    }
    Staff.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      (err, staff) => {
        if (err) {
          console.log("error in creating staff", err);
          return res.redirect("/");
        }
        console.log("staff member created successfully");
        return res.redirect("/login");
      }
    );
  });
};
