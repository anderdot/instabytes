import fs from "fs";
import { getAllPosts, createNewPost } from "../models/posts.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
};

export async function createPost (req, res) {
    const post = req.body;
    try {
        const newPost = await createNewPost(post);
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "request failed" });
    }
};

export async function saveImage (req, res) {
    const post = {
        description: "",
        img_url: req.file.originalname,
        alt: ""
    }

    try {
        const newPost = await createNewPost(post);
        const updatedImage = `storages/${newPost}.png`
        fs.renameSync(req.file.path, updatedImage)
        res.status(201).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "request failed" });
    }
}
