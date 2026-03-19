import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";

@Injectable()
export class ListUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(): Promise<User[]> {
        const users = await this.userRepository.list();

        if (!users) {
            throw new Error("Users not found");
        }

        return users;
    }
}