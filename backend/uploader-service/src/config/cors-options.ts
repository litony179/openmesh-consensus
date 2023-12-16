import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowedOrigins";
// cross origin resource sharing

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.indexOf(origin) !== 1 || !origin) {
      callback(null, true);
      // callback(new Error("Not allowed by CORS"));
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export { corsOptions };
