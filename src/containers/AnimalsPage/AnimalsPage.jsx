import React from 'react';
import { AnimalsList } from '../../components/AnimalsList';
import { Filters } from '../../components/Filters';
import { Select } from '../../components/Select';

export const AnimalsPage = () => {
  const isEdit = true;
  const filters = [
    ['type', 'пес'],
    ['type', 'кот'],
    ['gender', 'М'],
    ['gender', 'Ж'],
  ];

  return (
    <div className="animals-page -mx-4">
      <div className="flex items-center">
        <h2 className="mb-6 px-4 font-bold text-lightgray-700 text-4xl uppercase">
          Питомцы
        </h2>
        {isEdit && <Select classNames="mb-6" optAdd />}
      </div>
      <Filters filters={filters} />
      <AnimalsList />
    </div>
  );
};
