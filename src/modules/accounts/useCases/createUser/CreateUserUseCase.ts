import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repository/IUsersRepository";


@injectable()
class CreateUserUseCase {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}

  async execute({name, email, password}: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email)

    if(userAlreadyExist) {
      // throw new AppError("User Already Exist")
      throw new Error("Email ja está em uso")
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name, email, password: passwordHash
    })
  }
}

export { CreateUserUseCase }