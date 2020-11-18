import dotenv from "dotenv";

dotenv.config();

export default {
  url: process.env.BASE_URL || "http://localhost",

  locale: "en",

  name: process.env.VUE_APP_NAME || "app",

  version: "1.0.0"
};
