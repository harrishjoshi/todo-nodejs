const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const app = express();

// Configure environment variables
dotenv.config();

// To serve static files
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Set view templates config
app.set("view engine", "ejs");

// MongoDB connection URL
const mongoUrl =
  process.env.MONGO_URL || "mongodb://username:password@localhost:27017";
const mongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
};

// Middleware to handle MongoDB connection
app.use(async (req, res, next) => {
  const client = new MongoClient(mongoUrl, mongoClientOptions);
  try {
    await client.connect();
    req.db = client.db("todos-app");
    req.client = client;
    next();
  } catch (err) {
    next(err);
  }
});

// GET METHOD
app.get("/", async (req, res) => {
  console.log("FindAll Method");
  try {
    const collection = req.db.collection("todos");
    const todos = await collection.find({}).toArray();
    res.render("todo.ejs", { todos });
  } finally {
    await req.client.close();
  }
});

// SAVE METHOD
app.post("/", async (req, res) => {
  console.log("Save Method");
  try {
    const collection = req.db.collection("todos");
    await collection.insertOne({ content: req.body.content });
    console.log("Save successfully");
    res.redirect("/");
  } catch (err) {
    console.log("Failed to save, please try again");
    res.redirect("/");
  } finally {
    await req.client.close();
  }
});

// UPDATE METHOD
app
  .route("/edit/:id")
  .get(async (req, res) => {
    console.log("Edit Method");
    const id = req.params.id;
    try {
      const collection = req.db.collection("todos");
      const todos = await collection.find({}).toArray();
      res.render("todoEdit.ejs", { todos, todoId: id });
    } finally {
      await req.client.close();
    }
  })
  .post(async (req, res) => {
    const id = req.params.id;
    try {
      const collection = req.db.collection("todos");
      const result = await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: { content: req.body.content } }
      );
      if (!result.matchedCount) throw new Error("No document found");
      res.redirect("/");
    } catch (err) {
      res.status(500).send(err.message);
    } finally {
      await req.client.close();
    }
  });

// DELETE METHOD
app.route("/remove/:id").get(async (req, res) => {
  console.log("Remove Method");
  const id = req.params.id;
  try {
    const collection = req.db.collection("todos");
    await collection.deleteOne({ _id: ObjectId(id) });
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await req.client.close();
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
