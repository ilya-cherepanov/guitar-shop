import { User } from "./user.interface";

export interface CommentContent {
  advantages: string;
  disadvantages: string;
  text: string;
  rating: number;
}

export interface Comment extends CommentContent {
  id?: number;
  author: Pick<User, 'id' | 'name'>
  authorId: number;
  createdAt: Date;
  productId: number;
}
