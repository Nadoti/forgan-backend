import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repository/implementations/UsersRepository";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error(" Token missing")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "b047c9b348d53435a54258114f926d82") as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if(!user) {
      throw new Error("User does not exists!")
    }

    next()
  } catch {
    throw new Error("Invalid token!")
  }

}