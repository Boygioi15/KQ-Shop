import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { UserDetails } from './dto/user-details.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
}