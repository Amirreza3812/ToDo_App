module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modifyDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: "tasks", // اختیاری: برای کنترل دقیق نام جدول
    timestamps: false,   // چون خودت تاریخ رو کنترل می‌کنی
  });

  return Task;
};
