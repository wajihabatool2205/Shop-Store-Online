
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Furniture' | 'Lighting' | 'Decor' | 'Wellness';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
