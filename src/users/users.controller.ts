import { Body, Controller, Get, Post, Req, Res, UnsupportedMediaTypeException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import {JoinRequestDto} from'./dto/join.request.dto'
import { UsersService } from './users.service';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor} from 'src/common/interceptors/undefinedToNull.interceptor'
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';


@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService){

    }
    @ApiResponse({
        type: UserDto
    })
    @ApiOperation({summary : '내 정보 조회'})
    @Get()
    getUsers(@User() user) {
        return user;
    }

    @UseGuards(NotLoggedInGuard)
    @ApiOperation({summary : '회원가입'})
    @Post()
    join(@Body() data: JoinRequestDto){
        this.userService.join(data.email, data.nickname, data.password)
    }

    @ApiResponse({
        status: 200,
        description : '성공',
        type: UserDto
    })
    @ApiOperation({summary : '로그인'})
    @UseGuards(LocalAuthGuard)
    
    @Post('login')
    logIn(@User() user){
        return user;
    }

    @UseGuards(LoggedInGuard)
    @ApiOperation({summary : '로그아웃'})
    @Post('logout')
    logOut(@Req() req, @Res() res){
        req.logout()
        res.clearCookie('connect.sid', {httpOnly: true})
        res.send('ok')
    }
}
