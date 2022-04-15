import { Request, Response, NextFunction } from "express"

export default function handleErrors(
  error, req: Request, res: Response, next: NextFunction
) {
  if (error) {
    return res.status(error.status).send(error.message)
  }

  res.sendStatus(500);
}