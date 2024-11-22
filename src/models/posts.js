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
