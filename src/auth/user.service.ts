import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async createUser(name: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, password: hashedPassword });
    return this.userRepository.save(user);
  }  

  async validateUser(username: string, password: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { name: username } });
    if (user && await bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return undefined;
  }
  
  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
