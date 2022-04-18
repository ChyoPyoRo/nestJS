import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService}from '@nestjs/config'
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig'
import { Users } from './entities/Users'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true
  }),
     UsersModule,
      WorkspacesModule,
      ChannelsModule, 
      DmsModule,
      TypeOrmModule.forRoot(ormconfig),
      TypeOrmModule.forFeature([Users]),
      AuthModule,
    ],
      
  /* configService를 사용하는 예제 > 이렇게 하면 dotenv를 사용하지 않을 수 있다
  실제 배포시엔 다른곳에서 dotenv를 받아오는 경우가 많기 때문에 이것이 더 많이 활용된다.
  imprts : [
    Configmodule.forRoot({ isGlobal : true, load : getData })
    TypeOrmModule.ForRootAsync({
      inject : [ConfigService] //인젝트 했으므로 사용이 가능해짐
      useFactory: async(configService : ConfigService) =>{
        return{
          type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABSE'),
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true,
  logging: true,
  keepConnectionAlive: true,
        }
      }
    })
  ] */
  
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule{
  configure(consumer : MiddlewareConsumer): any{
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
