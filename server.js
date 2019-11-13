const express = require("express");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();

const connectMongoDB = require("./database/mongo-db");
connectMongoDB();

// Init Middleware
app.use(compression());
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routers
app.use("/api/users", require("./routes/user/sign"));
app.use("/api/users", require("./routes/user/passwords"));
app.use("/api/users", require("./routes/user/delete"));
app.use("/api/users", require("./routes/user/contact-us"));

app.use("/api/employees", require("./routes/employee/employee-info"));
app.use("/api/employees", require("./routes/employee/education"));
app.use("/api/employees", require("./routes/employee/languages"));
app.use("/api/employees", require("./routes/employee/skills"));
app.use("/api/employees", require("./routes/employee/interests"));
app.use("/api/employees", require("./routes/employee/references"));
app.use("/api/employees", require("./routes/employee/social-profiles"));
app.use("/api/employees", require("./routes/employee/serve-images"));
app.use("/api/employers", require("./routes/employer/employer-info"));
app.use("/api/employers", require("./routes/employer/serve-images"));

app.use("/api/jobs", require("./routes/job/setters"));
app.use("/api/jobs", require("./routes/job/getters"));
app.use("/api/jobs", require("./routes/job/delete"));

app.use("/api/applications", require("./routes/application/setters"));
app.use("/api/applications", require("./routes/application/getters"));
app.use("/api/applications", require("./routes/application/delete"));

app.use("/api/savedjobs", require("./routes/saved/setters"));
app.use("/api/savedjobs", require("./routes/saved/getters"));
app.use("/api/savedjobs", require("./routes/saved/delete"));

app.use("/api/follows", require("./routes/follow/setters"));
app.use("/api/follows", require("./routes/follow/getters"));
app.use("/api/follows", require("./routes/follow/delete"));

app.use("/api/admin", require("./routes/admin/create"));
app.use("/api/admin", require("./routes/admin/update"));
app.use("/api/admin", require("./routes/admin/getters"));
app.use("/api/admin", require("./routes/admin/delete"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
