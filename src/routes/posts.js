import express from "express";
import listPosts from "../controllers/posts.js";

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listPosts);

    app.get("/posts/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const post = posts.find((post) => post.id === id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    });

}

export default routes;
