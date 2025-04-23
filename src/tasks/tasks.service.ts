import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    findAll() {
        return this.tasks;
    }

    create(task: CreateTaskDto) {
        const newTask = {
            id: Date.now(),
            ...task,
        }

        this.tasks.push(newTask);
    }

    update(id: number, data: Partial<CreateTaskDto>) {
        const task = this.tasks.find(t => t.id === id);

        if(!task) return null;

        Object.assign(task, data);

        return task;
    }

    delete(id: number) {
        this.tasks = this.tasks.filter(t => t.id !== id);

        return {deleted: true}
    }
}
