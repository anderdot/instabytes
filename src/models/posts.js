import "dotenv/config";
import { ObjectId } from "mongodb";
import connectDatabase from "../config/database.js";

const database = await connectDatabase()

export async function getAllPosts () {
    const posts = database.collection("posts");
    return posts.find().toArray();
}

export async function createNewPost (post) {
    const posts = database.collection("posts");
    const result = await posts.insertOne(post);
    return result.insertedId;
}

export async function updatePostById (id, post) {
    const posts = database.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    const result = await posts.updateOne({ _id: new ObjectId(objectId)}, { $set: post });
    return result;
}