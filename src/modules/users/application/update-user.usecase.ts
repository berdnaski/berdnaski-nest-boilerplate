import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/user.repository";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../domain/user.entity";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.update(id, data);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}