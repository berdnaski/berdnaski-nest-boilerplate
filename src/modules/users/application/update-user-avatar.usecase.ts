import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository';
import { StorageService } from 'src/shared/domain/services/storage.service';
import { User } from '../domain/user.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueName, JobName } from 'src/shared/infrastructure/queue/queue.constants';
import { ProcessAvatarPayload } from '../domain/user.repository';

@Injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly storageService: StorageService,
        @InjectQueue(QueueName.CORE)
        private readonly avatarQueue: Queue<ProcessAvatarPayload>
    ) { }

    async execute(userId: string, file: Express.Multer.File): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.avatarUrl) {
            await this.storageService.delete(user.avatarUrl);
        }

        const uploadResult = await this.storageService.upload({
            buffer: file.buffer,
            filename: file.originalname,
            mimetype: file.mimetype,
            folder: 'avatars',
        });

        await this.avatarQueue.add(JobName.PROCESS_AVATAR, {
            userId: user.id,
            avatarUrl: uploadResult.path,
        });

        return { ...user, avatarUrl: uploadResult.path } as User;
    }
}
