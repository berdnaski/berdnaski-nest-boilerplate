export interface UploadProps {
    buffer: Buffer;
    filename: string;
    mimetype: string;
    folder?: string;
}

export interface UploadResult {
    path: string;
    filename: string;
    mimetype: string;
    folder?: string;
}

export abstract class StorageService {
    abstract upload(props: UploadProps): Promise<UploadResult>;
    abstract getUrl(key: string): Promise<{ signedUrl: string }>;
    abstract delete(key: string): Promise<void>;
}
