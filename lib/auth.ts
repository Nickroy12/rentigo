import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('rentigo');

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    client
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "renter",
        input: true // 👈 Allows the field to be received from the client signup form
      }
    }
  }
});