import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";

@Injectable()
export class FindByUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}