import { Request, Response, NextFunction } from 'express';

// Define the type for the async function
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Define and export the catchAsyncErrors function
module.exports = (theFunc: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};


