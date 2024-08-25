import React from 'react';

import { cn, calcTaxPrice } from '@/common/utils';
import { DELIVERY_PRICE } from '@/common/constants';

import { WhiteBlock } from '../white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { Button } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

interface Props {
  className?: string;
  loading: boolean;
  isSubmitting: boolean;
  totalAmount: number;
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  loading,
  isSubmitting,
  totalAmount,
}) => {
  const taxPrice = calcTaxPrice(totalAmount);
  const totalPrice = totalAmount + DELIVERY_PRICE + taxPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-[46px] w-48" />
        ) : (
          <span className="my-2 text-[34px] font-extrabold leading-none">
            {totalPrice} ₴
          </span>
        )}
      </div>
      <CheckoutItemDetails
        title="Стоимость корзины:"
        icon={<Package className="mr-2 text-gray-400" size={18} />}
        value={
          loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${totalAmount} ₴`
        }
      />
      <CheckoutItemDetails
        title="Доставка:"
        icon={<Truck className="mr-2 text-gray-400" size={18} />}
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₴`
          )
        }
      />
      <CheckoutItemDetails
        title="Налог:"
        icon={<Percent className="mr-2 text-gray-400" size={18} />}
        value={
          loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${taxPrice} ₴`
        }
      />
      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        loading={loading || isSubmitting}
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
