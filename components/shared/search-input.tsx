'use client';

import React from 'react';
import Link from 'next/link';
import { useClickAway, useDebounce } from 'react-use';
import toast from 'react-hot-toast';

import { cn } from '@/common/utils';
import { Api } from '@/common/services/api-client';
import type { Product } from '@prisma/client';

import { Search } from 'lucide-react';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  const ref = React.useRef(null);

  useDebounce(
    () => {
      getProducts();
    },
    250,
    [searchValue]
  );

  useClickAway(ref, () => {
    setFocused(false);
  });

  const getProducts = async () => {
    try {
      const data = await Api.products.search(searchValue);

      setProducts(data);
    } catch {
      toast.error('Во время выполнения запроса произошла ошибка', {
        icon: '❌',
      });
    }
  };

  const handleChangeSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  const handleChangeFocus = (value: boolean) => () => {
    setFocused(value);
  };

  const handleProductClick = () => {
    setFocused(false);
    setSearchValue('');
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 opacity-0 invisible transition-opacity',
          {
            'opacity-100 visible z-30': focused,
          }
        )}
      />
      <div
        ref={ref}
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          value={searchValue}
          onChange={handleChangeSearch}
          onFocus={handleChangeFocus(true)}
        />
        <div
          className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-[calc(100%+15px)] shadow-md invisible transition-[top,opacity] duration-200 opacity-0 z-30',
            {
              'visible opacity-100 top-[calc(100%+5px)]':
                focused && Boolean(products.length),
            }
          )}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              className=" flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
              href={`/product/${product.id}`}
              onClick={handleProductClick}
            >
              <img
                className="rounded-sm w-8 h-8"
                src={product.imageUrl}
                alt={product.name}
              />
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
