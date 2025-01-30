import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user || user.password !== pass) {
      return null;
    }

    return user;
  }

  async login({ email, password }) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
