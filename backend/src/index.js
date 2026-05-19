import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log("Erreur MongoDB :", err));

/* =========================
   TASK SCHEMA
========================= */

const taskSchema = new mongoose.Schema({
  title: String,

  description: String,

  assignedTo: String,

  status: {
    type: String,
    default: "À faire",
  },

  completed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

/* =========================
   ROUTE TEST
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "API Task Manager OK",
  });
});

/* =========================
   GET TASKS
========================= */

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   CREATE TASK
========================= */

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   UPDATE TASK
========================= */

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   DELETE TASK
========================= */

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Tâche supprimée",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});