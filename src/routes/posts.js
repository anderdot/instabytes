import express from "express";
import multer from "multer";
import { listPosts, createPost, saveImage } from "../controllers/posts.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storages/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listPosts);
    app.post("/posts", createPost);
    app.post("/upload", upload.single("image"), saveImage)
}

export default routes;
