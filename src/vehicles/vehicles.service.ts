import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateVehicleDto } from './dto/vehicle.dto';
import { UpdateVehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        brand: dto.brand,
        model: dto.model,
        plate: dto.plate,
        color: dto.color,
        year: dto.year,
        driverId: dto.driverId,
      },
    });
  }

  async findAll() {
    return this.prisma.vehicle.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        driver: true,
      },
    });
  }

  async findOne(id: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        driver: true,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle ${id} no existe`,
      );
    }

    return vehicle;
  }

  async update(id: number, dto: UpdateVehicleDto) {
    await this.findOne(id);

    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.vehicle.delete({
      where: { id },
    });
  }
}