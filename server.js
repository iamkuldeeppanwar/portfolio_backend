require("dotenv").config();
const cors = require("cors");
const express = require("express");
const projectRouter = require("./router/project");
const skillRouter = require("./router/skills");
const userRouter = require("./router/user");
const resumeRouter = require("./router/resume");

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(projectRouter);
app.use(skillRouter);
app.use(userRouter);
app.use(resumeRouter);

app.listen(port, () => console.log(`Server is running on ${port}`));
