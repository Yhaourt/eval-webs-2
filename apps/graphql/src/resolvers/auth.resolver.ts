import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInputType, LoginType } from '../types/user.type';

@Resolver(() => LoginType)
export class AuthResolver {
  @Mutation(() => LoginType)
  login(@Args('input') input: LoginInputType): { access_token: string } {
    console.log(input);
    return {
      access_token: 'mocked_access_token',
    };
  }
}
