'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUpdateEffect } from 'react-use';

import { cn } from '@/common/utils';
import { sortItems } from './data';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { ArrowUpDown } from 'lucide-react';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const selectedItem = sortItems.find((item) => searchParams.get('sort') === item.sortBy);

  const [selectedSortItem, setSelectedSortItem] = React.useState<(typeof sortItems)[0]>(
    selectedItem ?? sortItems[0]
  );

  useUpdateEffect(() => {
    params.set('sort', selectedSortItem.sortBy);
    router.push(`?${params}`, { scroll: false });
  }, [selectedSortItem]);

  const sortItemName = selectedSortItem.name.split(' ')[1];

  const handleSortChange = (item: (typeof sortItems)[0]) => () => {
    setSelectedSortItem(item);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
            className
          )}
        >
          <ArrowUpDown size={16} />
          <strong>Сортировка:</strong>
          <strong className="text-primary select-none">{sortItemName}</strong>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <ul>
          {sortItems.map((item) => (
            <li
              key={item.name}
              className={cn(
                'hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md',
                {
                  'bg-secondary text-primary': selectedSortItem.name === item.name,
                }
              )}
              onClick={handleSortChange(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
