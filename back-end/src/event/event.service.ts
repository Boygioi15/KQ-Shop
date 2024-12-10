import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from './event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event')
    private readonly eventModel: Model<EventDocument>,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    return await newEvent.save();
  }

  findAll() {
    return this.eventModel.find()
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
