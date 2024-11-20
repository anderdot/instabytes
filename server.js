import express from "express";

const posts = [
    {
      id: 1,
      description: "A cat smiling",
      image: "http://placecats.com/millie/300/150"
    },
    {
      id: 2,
      description: "A sad cat",
      image: "http://placecats.com/millie/300/150"
    },
    {
      id: 3,
      description: "A cat with a hat",
      image: "http://placecats.com/millie/300/150"
    },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});
