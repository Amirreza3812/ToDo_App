const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware");
const controller = require("../controllers/task.controller");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /task/getTasks:
 *   get:
 *     summary: Get all active tasks of the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
router.get("/getTasks", [authCheck.verifyToken], controller.getTasks);

/**
 * @swagger
 * /task/markDone:
 *   post:
 *     summary: Mark a task as completed
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task marked as done
 *       400:
 *         description: Task not found
 */
router.post("/markDone", [authCheck.verifyToken], controller.markDone);

/**
 * @swagger
 * /task/markUnDone:
 *   post:
 *     summary: Mark a task as not completed
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task marked as not done
 */
router.post("/markUnDone", [authCheck.verifyToken], controller.markUnDone);

/**
 * @swagger
 * /task/deActivateTask:
 *   post:
 *     summary: Deactivate a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task deactivated
 */
router.post(
  "/deActivateTask",
  [authCheck.verifyToken],
  controller.deActivateTask
);

/**
 * @swagger
 * /task/activateTask:
 *   post:
 *     summary: Activate a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task activated
 */
router.post("/activateTask", [authCheck.verifyToken], controller.activateTask);

/**
 * @swagger
 * /task/createTask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task created
 *       400:
 *         description: Task has no title
 */
router.post("/createTask", [authCheck.verifyToken], controller.createTask);

module.exports = router;
