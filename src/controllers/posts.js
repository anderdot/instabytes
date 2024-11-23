import fs from "fs";
import { getAllPosts, createNewPost, updatePostById } from "../models/posts.js";
import generateDescription from "../services/gemini.js"

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

export async function updatePost (req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`storages/${id}.png`);
        const description = await generateDescription(imageBuffer);

        const post = {
            description: description,
            img_url: urlImage,
            alt: req.body.alt
        }

        const updatedPost = await updatePostById(id, post);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "request failed" });
    }
}