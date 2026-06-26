import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (
    modulo: string,
    handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      const params = {
        data: result,
        modulo,
      };
      const { data } = params;
      res.status(200).json(data);
    } catch (e: any) {
      next(e);
    }
  };
