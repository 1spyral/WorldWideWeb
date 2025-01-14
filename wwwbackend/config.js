import dotenv from "dotenv";

dotenv.config();

const env = process.env;

export const OPENAI_API_KEY = env.OPENAI_API_KEY;

