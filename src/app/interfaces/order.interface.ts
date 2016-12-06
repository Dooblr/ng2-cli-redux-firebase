export interface Order {
  key: string;
  name: string;
  items: Item[];
}

export interface Item {
  text: string;
  quantity: number;
}
