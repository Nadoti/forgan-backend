import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repository/IUsersRepository"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}

  async execute({ email, password}: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email)
    
    if(!user) {
      throw new Error("Email or Password incorrect! ")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error("Email or Password incorrect! ")
    }

    const token = sign({}, "b047c9b348d53435a54258114f926d82", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    } 

    return tokenReturn

  }
}



export { AuthenticateUserUseCase }