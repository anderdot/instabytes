import { MongoClient } from "mongodb";

export default async function connectDatabase() {
    try {
        const client = await MongoClient.connect(process.env.CONNECTION_STRING);
        console.log("Connected to MongoDB");
        return client.db("instabytes");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}