import React from 'react';

import { WhiteBlock } from '@/components/shared';
import { FormInput } from '@/components/shared/form';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          className="text-base"
          name="firstName"
          label="Имя"
          placeholder="Имя"
          required
        />
        <FormInput
          className="text-base"
          name="lastName"
          label="Фамилия"
          placeholder="Фамилия"
          required
        />
        <FormInput
          className="text-base"
          name="email"
          label="E-mail"
          placeholder="E-mail"
          required
        />
        <FormInput
          className="text-base"
          name="phone"
          label="Телефон"
          placeholder="Телефон"
          required
        />
      </div>
    </WhiteBlock>
  );
};
