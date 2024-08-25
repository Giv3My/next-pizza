'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useClickAway, useDebounce } from 'react-use';

import { cn } from '@/common/utils';
import type { AddressResponse } from '@/common/services/addresses';

import { FormInput, type FormInputProps } from './form';
import { Api } from '@/common/services/api-client';

export const AddressInput: React.FC<FormInputProps> = ({ className, name, ...props }) => {
  const { watch, setValue } = useFormContext();

  const [addressList, setAddressList] = React.useState<AddressResponse[]>([]);
  const [focused, setFocused] = React.useState(false);

  const ref = React.useRef(null);

  const text = watch(name);

  React.useEffect(() => {
    if (!text) {
      setAddressList([]);
    }
  }, [text]);

  useDebounce(
    () => {
      if (!text) {
        return;
      }

      fetchAddresses();
    },
    250,
    [text]
  );

  useClickAway(ref, () => {
    setFocused(false);
  });

  const fetchAddresses = async () => {
    const data = await Api.addresses.getAddresses(text);
    setAddressList(data);
  };

  const handleSelectAdress = (address: string) => () => {
    setValue(name, address);
    setFocused(false);
  };

  const handleOnFocus = () => {
    setFocused(true);
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <FormInput
        className="text-base"
        name={name}
        placeholder="Адрес"
        required
        onFocus={handleOnFocus}
        {...props}
      />
      <div
        className={cn(
          'max-h-[180px] w-full p-4 absolute top-[calc(100%+15px)] left-0 rounded-md z-10 invisible opacity-0 overflow-y-auto scrollbar transition-[top,opacity] bg-neutral-100',
          {
            'opacity-100 visible top-[calc(100%+5px)]':
              focused && Boolean(addressList.length),
          }
        )}
      >
        {addressList.map((address) => (
          <div
            key={address.place_id}
            className="p-1 transition-[background] cursor-pointer hover:bg-neutral-200"
            onClick={handleSelectAdress(address.display_name)}
          >
            {address.display_name}
          </div>
        ))}
      </div>
    </div>
  );
};
