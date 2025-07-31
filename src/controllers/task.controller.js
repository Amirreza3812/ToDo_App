const db = require("../models");
const Task = db.task;

// ارسال تسک‌های فعال کاربر
const sendTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.userId,
        active: true,
      },
      order: [["modifyDate", "DESC"]],
    });

    res.status(200).send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

exports.getTasks = sendTasks;

// ایجاد تسک جدید
exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).send({ message: "Task has no title" });
    }

    await Task.create({
      userId: req.userId,
      title,
    });

    sendTasks(req, res, next);
  } catch (err) {
    next(err);
  }
};

// بروزرسانی تسک (فعال/غیرفعال، انجام شده/نشده)
const updateTask = (prop, value) => async (req, res, next) => {
  try {
    const updated = await Task.update(
      {
        [prop]: value,
        modifyDate: new Date(),
      },
      {
        where: {
          id: req.body._id,
          userId: req.userId,
        },
      }
    );

    if (updated[0] === 0) {
      return res.status(400).send({ message: "Task not found or not updated" });
    }

    sendTasks(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.markDone = updateTask("completed", true);
exports.markUnDone = updateTask("completed", false);
exports.deActivateTask = updateTask("active", false);
exports.activateTask = updateTask("active", true);
