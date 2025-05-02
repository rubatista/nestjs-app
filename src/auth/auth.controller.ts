import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async regisetr(@Body() body: RegisterUserDto): Promise<{ message: string }> {
    const existing = await this.userService.findByEmail(body.email);
    if (existing) {
      throw new UnauthorizedException('Email já registado');
    }

    await this.userService.create(body);
    return { message: 'Utilizador criado com sucesso' };
  }
}
