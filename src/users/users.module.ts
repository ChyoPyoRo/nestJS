import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Users} from '../entities/Users'
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
@Module({
  imports: [TypeOrmModule.forFeature([Users, WorkspaceMembers, ChannelMembers])],
  providers: [UsersService],
  controllers: [UsersController, ]
})
export class UsersModule {}
