const express = require("express");
const Staff = require("../models/Staff");
const Student = require("../models/Student");
const multer = require("multer");

const {
  studentHome,
  studentUpload,
  studentSignIn,
  studentSignUp,
} = require("../controller/student");
const { staffHome, staffSignIn, staffSignUp } = require("../controller/staff");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;

    cb(null, originalname);
  },
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.render("signUp", { title: "Sign Up" });
});

router.get("/login", (req, res) => {
  res.render("signIn", { title: "Sign In" });
});

router.get("/student/dashboard", studentHome);

router.get("/staff/dashboard", staffHome);

router.get("/resume/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  res.download(student.path, student.resume);
});

router.post("/student/upload/:id", upload.single("resume"), studentUpload);

router.post("/student/sign-in", studentSignIn);

router.post("/staff/sign-in", staffSignIn);

router.post("/student/sign-up", studentSignUp);

router.post("/staff/sign-up", staffSignUp);
router.get("/signOut", function (req, res) {
  res.clearCookie("name");
  res.clearCookie("email");
  return res.redirect("/login");
});
module.exports = router;
