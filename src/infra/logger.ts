import pino from "pino";

export const logger = pino({
  transport: {
    options: {
      ignore: "pid,hostname",
    },
    target: "pino-pretty",
  },
});
