import { cn } from '@/common/utils';

interface Props {
  className?: string;
  src: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ className, src }) => {
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} />;
};
