import React from 'react';

import { WhiteBlock, AddressInput } from '@/components/shared';
import { FormTextarea } from '@/components/shared/form';

interface Props {
  className?: string;
}

export const CheckoutDeliveryForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <AddressInput label="Адрес" name="address" />
        <FormTextarea
          className="text-base"
          name="comment"
          label="Комментарий к заказу"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
