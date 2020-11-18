import dotenv from "dotenv";

dotenv.config();

export default {
  host: process.env.VUE_APP_API_HOST || "http://localhost/",

  timeoute: 5000
};
