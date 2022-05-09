import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repository/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repository/IUsersRepository";





container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)