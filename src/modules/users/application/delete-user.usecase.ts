import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/user.repository";

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        await this.userRepository.delete(id);
    }
}