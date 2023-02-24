import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    await user.hashPassword();
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (user && await user.checkPassword(password)) {
      return user;
    }
    return null;
  }

  async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateJWTUser(decodedToken: any): Promise<User> {
    const { sub: userId } = decodedToken;
    const user = await this.userRepository.findOneBy({ id: userId });
    user.password = '';
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

}
