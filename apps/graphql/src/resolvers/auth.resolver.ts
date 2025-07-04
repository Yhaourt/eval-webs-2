import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {LoginType} from '../types/user.type';

@Resolver(() => LoginType)
export class AuthResolver {
    @Mutation(() => LoginType)
    login(
        @Args('email') email: string,
        @Args('password') password: string
    ): { access_token: string } {
        console.log({email, password});
        return {
            access_token: 'mocked_access_token',
        };
    }
}
