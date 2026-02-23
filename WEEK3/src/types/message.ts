export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  room: string;
  type?: 'chat' | 'system';
}

export interface User {
  id: string;
  name: string;
}
