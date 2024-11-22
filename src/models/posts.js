import connectDatabase from "../config/database.js";

const database = await connectDatabase()

export default async function getAllPosts () {
    const posts = database.collection("posts");
    return posts.find().toArray();
}
