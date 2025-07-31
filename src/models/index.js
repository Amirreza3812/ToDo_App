const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// اتصال به دیتابیس MySQL با اطلاعات محیطی
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // اگر می‌خوای لاگ کوئری‌ها نیاد
  }
);

// ساخت آبجکت اصلی db
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// بارگذاری مدل‌ها
db.task = require("./task.model")(sequelize, DataTypes);
db.user = require("./user.model")(sequelize, DataTypes);

// هر تسک متعلق به یک کاربر است
db.user.hasMany(db.task, { foreignKey: "userId" });
db.task.belongsTo(db.user, { foreignKey: "userId" });


module.exports = db;
