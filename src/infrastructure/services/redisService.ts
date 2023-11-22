import { createClient } from "redis";
import { logErrorToFile } from "../graphql-server/winston/logger";

export const redisClient = createClient();

export async function connectToRedis() {
  try {
    await redisClient.connect();
    console.log('connected to redis');
  } catch (error) {
    console.log("Redis Error : ", error.message);
    await logErrorToFile(error, "Redis-error");
  }
}


