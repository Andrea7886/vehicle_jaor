import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateDriverDto) {
    return this.prisma.driver.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.driver.findMany({
      include: {
        vehicles: true,
      },
    });
  }
}