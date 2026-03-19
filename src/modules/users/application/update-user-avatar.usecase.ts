import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository';
import { StorageService } from 'src/shared/domain/services/storage.service';
import { User } from '../domain/user.entity';

@Injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly storageService: StorageService
    ) { }

    async execute(userId: string, file: Express.Multer.File): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new NotFoundException('Usuário não encontrado');

        if (user.avatarUrl) {
            await this.storageService.delete(user.avatarUrl);
        }

        const uploadResult = await this.storageService.upload({
            buffer: file.buffer,
            filename: file.originalname,
            mimetype: file.mimetype,
            folder: 'avatars',
        });

        return this.userRepository.updateAvatar(userId, uploadResult.path);
    }
}
