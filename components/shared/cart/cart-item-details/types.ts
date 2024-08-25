export interface CartItemProps {
  id: number;
  name: string;
  imageUrl: string;
  details: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}

export interface CountButtonProps {
  className?: string;
  value: number;
  onClick: (type: 'plus' | 'minus') => void;
}
