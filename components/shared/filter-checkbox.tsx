import React from 'react';
import { Checkbox } from '../ui/checkbox';

export interface FilterCheckboxProps {
  name?: string;
  text: string;
  value: number;
  checked?: boolean;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  name,
  text,
  value,
  checked,
  endAdornment,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className="rounded-[8px] w-6 h-6"
        id={`checkbox-${name}-${value}`}
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
      />
      <label
        htmlFor={`checkbox-${name}-${value}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
