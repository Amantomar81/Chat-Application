import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {

  messages: Message[] = [
    { name: 'user1', text: 'Welcome to the chat.' },
    { name: 'user2', text: 'Thanks bro.' },
  ];

  clientToUser = {}

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    // we can use this return value to get which users are online
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string ) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }
}
