// import {
//     createParamDecorator,
//     ExecutionContext,
//   } from '@nestjs/common';
  
//   export const GetUser = createParamDecorator(
//     (
//       data: string | undefined,
//       ctx: ExecutionContext,
//     ) => {
//       const request: Express.Request = ctx
//         .switchToHttp()
//         .getRequest();
//         console.log(request);
//       if (data) {
//         return request.user[data];
//       }
//       return request.user;
//     },
//   );

  import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);