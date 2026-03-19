import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { StorageService, UploadProps, UploadResult } from '../../domain/services/storage.service';

@Injectable()
export class CloudflareStorageService implements StorageService {
    private readonly s3: S3Client;
    private readonly bucket: string;

    constructor(private readonly config: ConfigService) {
        this.s3 = new S3Client({
            endpoint: this.config.getOrThrow<string>('CLOUDFLARE_ENDPOINT'),
            credentials: {
                accessKeyId: this.config.getOrThrow<string>('CLOUDFLARE_ACCESS_KEY_ID'),
                secretAccessKey: this.config.getOrThrow<string>('CLOUDFLARE_SECRET_ACCESS_KEY'),
            },
            region: 'auto',
        });
        this.bucket = this.config.getOrThrow<string>('CLOUDFLARE_BUCKET');
    }

    async upload(props: UploadProps): Promise<UploadResult> {
        const { buffer, filename, mimetype, folder } = props;

        const randomHash = crypto.randomBytes(16).toString('hex');
        const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
        const finalName = `${randomHash}-${safeFilename}`;
        const path = folder ? `${folder}/${finalName}` : finalName;

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: path,
            Body: buffer,
            ContentType: mimetype,
        });

        await this.s3.send(command);

        return { path, filename, mimetype, folder };
    }

    async getUrl(key: string): Promise<{ signedUrl: string }> {
        try {
            const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
            const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
            return { signedUrl };
        } catch (error) {
            throw new Error('Failed to generate file URL');
        }
    }

    async delete(key: string): Promise<void> {
        try {
            const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
            await this.s3.send(command).catch(() => {});
        } catch (error) {
            throw error;
        }
    }
}
