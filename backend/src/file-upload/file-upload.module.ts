import { Module } from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileUploadController } from './file-upload.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [FileUploadController],
	providers: [FileUploadService, PrismaService],
})
export class FileUploadModule {}
