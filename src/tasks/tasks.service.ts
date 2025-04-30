import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  findAll() {
    return this.taskModel.find().exec();
  }

  create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);

    return createdTask.save();
  }

  async update(id: string, data: Partial<CreateTaskDto>) {
    return this.taskModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
