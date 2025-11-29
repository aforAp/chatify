//todo
import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL:process.env.CLIENT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
};

// PORT=3000
// NODE_ENV=development
// MONGO_URI=mongodb://localhost:27017/chatifyApp
// JWT_SECRET=jwt
// RESEND_API_KEY=re_6AMAgHtg_NJzgjP3xixJWaVu9S1RqtAkT
// EMAIL_FROM="onboarding@resend.dev"
// EMAIL_FROM_NAME="Satheesh Subramani"
// CLIENT_URL=http://localhost:3000/