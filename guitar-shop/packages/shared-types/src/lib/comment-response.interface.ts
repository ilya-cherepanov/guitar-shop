export interface CommentResponse {
  id: number;
  advantages: string;
  disadvantages: string;
  text: string;
  rating: number;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
  productId: number;
}
