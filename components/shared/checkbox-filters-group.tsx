'use client';

import React from 'react';

import type { CheckboxItem } from './filters/types';

import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { Skeleton } from '../ui/skeleton';

interface Props {
  className?: string;
  title: string;
  name: string;
  items: CheckboxItem[];
  loading?: boolean;
  limit?: number;
  selected: Set<string>;
  searchInputPlaceholder?: string;
  onClickCheckbox: (id: string) => void;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  className,
  title,
  name,
  items,
  limit = 6,
  loading,
  selected,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const sortSelectedItems = (items: CheckboxItem[]) => {
    return items
      .reduce<[CheckboxItem[], CheckboxItem[]]>(
        (acc, item) => {
          const isSelected = selected.has(String(item.value));
          isSelected ? acc[0].push(item) : acc[1].push(item);

          return acc;
        },
        [[], []]
      )
      .flat();
  };

  const defaultItems = React.useMemo(
    () => (!showAll ? sortSelectedItems(items) : items).slice(0, limit),
    [items, showAll]
  );

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : defaultItems;

  const handleChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleClickCheckbox = (id: string) => () => {
    onClickCheckbox(id);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {[...new Array(limit)].map((_, index) => (
          <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
        ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            className="bg-gray-50 border-none"
            placeholder={searchInputPlaceholder}
            value={searchValue}
            onChange={handleChangeSearchInput}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            name={name}
            text={item.text}
            value={item.value}
            checked={selected.has(String(item.value))}
            onCheckedChange={handleClickCheckbox(String(item.value))}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button className="text-primary mt-3" onClick={toggleShowAll}>
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
