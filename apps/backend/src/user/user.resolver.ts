import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserType } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType, { nullable: true })
  async getUserByAuth0Id(
    @Args('auth0Id') auth0Id: string,
  ): Promise<User | null> {
    return this.userService.findUserByAuth0Id(auth0Id);
  }

  @Mutation(() => UserType)
  async createUserIfNotExists(
    @Args('auth0Id') auth0Id: string,
    @Args('email') email: string,
    @Args('name') name: string,
  ): Promise<User> {
    return this.userService.createUserIfNotExists(auth0Id, email, name);
  }
}
