export type Category = 'All' | 'Headphones' | 'Speakers' | 'Wearables' | 'Accessories';

export type Product = {
  id: number;
  title: string;
  price: number;
  category: Exclude<Category, 'All'>;
  image: string;
  tag: string;
};
