import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(auth0Id: string, email: string, name: string) {
    return this.prisma.user.create({
      data: {
        auth0Id,
        email,
        name,
      },
    });
  }

  async findUserByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });
  }
}
