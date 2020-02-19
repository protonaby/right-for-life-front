import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClickAway } from 'react-use';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Select = ({
  classNames,
  optAdd,
  optEdit,
  optDelete,
  optPinToHomePage,
  chooseOptionHandler,
}) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const componentRef = useRef(null);
  const location = useLocation();
  useClickAway(componentRef, () => setIsSelectOpened(false));

  function handleSelectListClick(event) {
    const chosenOption = event.target.dataset.role;
    if (chosenOption === 'delete') {
      const isUserWantToDelete = window.confirm('Удалить запись?');
      if (!isUserWantToDelete) {
        setIsSelectOpened(false);
        return;
      }
    }
    chooseOptionHandler(chosenOption);
    setIsSelectOpened(false);
  }

  return (
    <>
      {optAdd ? (
        <div className={`inline-block ${classNames}`}>
          <div className="relative inline-block">
            <Link to={`${location.pathname}/new`}>
              <i className="fas fa-plus text-2xl hover:bg-gray-200 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center shadow-xl bg-white" />
            </Link>
          </div>
        </div>
      ) : (
        <div className={`inline-block font-bold ${classNames}`}>
          <div ref={componentRef} className="relative inline-block">
            <i
              onClick={() => !isSelectOpened && setIsSelectOpened(true)}
              className="fas fa-pencil-alt text-2xl hover:bg-gray-200 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center shadow-xl bg-white"
            />
            <ul
              className={cn(
                { 'w-56': isSelectOpened },
                { 'w-0 h-0': !isSelectOpened },
                'absolute top-100plus10 right-0 bg-white rounded-lg overflow-hidden shadow-xl py-1 text-lightgray-600 select-none',
              )}
              onClick={handleSelectListClick}
            >
              {optPinToHomePage ? (
                <li
                  data-role="pinToHomePage"
                  className="py-2 pl-2 pr-4 text-right cursor-pointer hover:bg-gray-200"
                >
                  Прикрепить на главную
                </li>
              ) : null}
              {optEdit ? (
                <li
                  data-role="edit"
                  className="py-2 pl-2 pr-4 text-right cursor-pointer hover:bg-gray-200"
                >
                  Редактировать
                </li>
              ) : null}
              {optDelete ? (
                <li
                  data-role="delete"
                  className="py-2 pl-2 pr-4 text-right cursor-pointer hover:bg-red-200 text-red-600 text-xs"
                >
                  <i className="fas fa-trash pr-3" />
                  Удалить
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

Select.propTypes = {
  classNames: PropTypes.string.isRequired,
  optAdd: PropTypes.bool,
  optEdit: PropTypes.bool,
  optDelete: PropTypes.bool,
  optPinToHomePage: PropTypes.bool,
  chooseOptionHandler: PropTypes.func,
};

Select.defaultProps = {
  optAdd: false,
};
