import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AuthDto } from "./dto";
import * as argon from 'argon2';


@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        // generate the password hash
        // save the new user in the database
        try {
            const hash = await argon.hash(dto.password);

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })

            delete user.hash;
    
            // return saved user
            return user;

        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
                throw error;
            }
        }

    }

    signin() {
        return { message: 'I have sign in' };
    }

}
