import { Controller, Get, Post , Query, Body, Param} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { getHeapCodeStatistics } from 'v8';


@ApiTags('DM'
)
@Controller('api/workspace/:url/dms')
export class DmsController {
    @ApiParam({
        name: 'url',
        required: true,
        description : '워크스페이스 url'
    })

    @ApiQuery({
        name : 'perPage',
        required: true,
        description : '한번에 가져오는개수'
    })
    @ApiQuery({
        name : 'page',
        required: true,
        description : '불러올 페이지'
    })
    @Get(':id/chats')
    getChat(@Query() query, @Param() param){
        console.log(query.perPage, query.page)
        console.log(param.id, param.url)
    }   

    @Post(':id/chats')
    postChat(@Body() body) {

    }
}
