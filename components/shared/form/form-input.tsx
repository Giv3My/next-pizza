'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/common/utils';

import { Input, type InputProps } from '@/components/ui';
import { RequiredSymbol } from './required-symbol';
import { ClearButton } from './clear-button';
import { ErrorText } from './error-text';

export interface FormInputProps extends InputProps {
  className?: string;
  name: string;
  label: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const text = watch(name);
  const errorText = errors?.[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md pr-[40px]" {...register(name)} {...props} />
        {text && <ClearButton onClick={onClickClear} />}
      </div>
      {
        <ErrorText
          className={cn('invisible opacity-0 transition-opacity ease-in', {
            'mt-2 visible opacity-100': Boolean(errorText),
          })}
          text={errorText}
        />
      }
    </div>
  );
};
