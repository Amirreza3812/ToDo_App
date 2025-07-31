const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger"); // مسیر دقیق به فایل swagger.js

dotenv.config();
const db = require("./models");

const app = express();

// اتصال به دیتابیس MySQL
db.sequelize.authenticate()
  .then(() => {
    console.log("Connection to MySQL has been established successfully.");
    return db.sequelize.sync(); // ساخت جدول‌ها از روی مدل‌ها
  })
  .then(() => {
    console.log("All models synced.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error.message);
  });

// Middlewareها
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// روت‌ها
app.use("/task", require("./routes/task.route"));
app.use("/auth", require("./routes/auth.route"));

// مسیر نمایش مستندات
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// هدرها
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// هندل ارورها
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
    },
  });
});

// روت اصلی
app.get("/", (req, res) => {
  res.json({ message: "Server active." });
});

// اجرای سرور
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
