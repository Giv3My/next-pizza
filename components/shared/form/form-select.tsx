'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { RequiredSymbol } from './required-symbol';
import { ErrorText } from './error-text';

interface SelectItem {
  value: string;
  label: React.ReactNode;
}

interface Props extends SelectProps {
  className?: string;
  label: string;
  required?: boolean;
  name: string;
  items: SelectItem[];
  placeholder?: string;
}

export const FormSelect: React.FC<Props> = ({
  className,
  label,
  required,
  name,
  items,
  placeholder,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errotText = errors?.[name]?.message as string;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={className}>
          <p className="font-medium mb-2">
            {label}
            {required && <RequiredSymbol />}
          </p>
          <Select onValueChange={field.onChange} defaultValue={field.value} {...props}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errotText && <ErrorText className="mt-2" text={errotText} />}
        </div>
      )}
    />
  );
};
