import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const response = ctx.switchToHttp().getRequest()
        return response.user
    }
)

//@Token() token 으로 사용 가능