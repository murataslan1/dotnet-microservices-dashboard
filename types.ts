
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  items: OrderItem[];
}

export enum Status {
  Idle,
  Loading,
  Success,
  Error,
}
