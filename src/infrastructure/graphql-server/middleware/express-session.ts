
import RedisStore from "connect-redis"
import { redisClient } from "../../services/redisService";
const session = require('express-session');

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})


export const EXPRESS_SESSION=session({
    store: redisStore,
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production' ? true : false,
      secure: process.env.NODE_ENV === 'production' ? true : false, // Set to 'true' if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Expiration time in milliseconds (1 day)
    }
  })


