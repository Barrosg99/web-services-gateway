import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserDto, LoggedUserResponse } from './dto/logged-user.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private usersService: UserService) {}

  @Query((returns) => User)
  async me(@Context('userId') userId: string) {
    console.log(userId);

    return this.usersService.findOne(userId);
  }

  @Mutation((returns) => User)
  async createUser(@Args('createUserData') createUserData: CreateUserDto) {
    return this.usersService.create(createUserData);
  }

  @Mutation((returns) => LoggedUserResponse)
  async login(@Args('userLoginData') userLoginData: LoggedUserDto) {
    const loginData = await this.usersService.login(userLoginData);

    return loginData;
  }
}
