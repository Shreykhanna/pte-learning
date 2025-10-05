import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const startHrTime = process.hrtime();
  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(startHrTime);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    let itemCount = Array.isArray(res.locals.items)
      ? res.locals.items.length
      : typeof res.locals.items === "number"
      ? res.locals.items
      : "N/A";
    console.log("Method", req.method);
    console.log("Path", req.path);
    console.log("Status Code", res.statusCode);
    console.log("Duration (ms)", duration);
    console.log("Item Count", itemCount);
  });
  next();
};

export default logger;
