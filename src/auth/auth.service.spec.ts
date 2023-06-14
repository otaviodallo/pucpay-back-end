import { Test } from '@nestjs/testing'
import { AuthService } from '../auth/auth.service'
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';


describe('AuthService', () => {
    let service: AuthService
    beforeEach(async() => {
        const fakeUsersService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email:string , password: string) => Promise.resolve({ id: 1, email, password } as User),
        }
    
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();
    
        service = module.get(AuthService);
    })
    
    
    it('can create an instance of AuthService', async () => {
        expect(service).toBeDefined()
    })

})

