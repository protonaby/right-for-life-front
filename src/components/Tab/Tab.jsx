import React from 'react';

const Tab = ({ label, onClick, active }) => {
  const colors = active
    ? 'bg-green-300 hover:bg-green-400 text-green-700 cursor-pointer'
    : 'bg-gray-300 hover:bg-gray-400 text-gray-700 cursor-pointer';

  return (
    <li
      className={`flex-1 mr-2 text-center rounded-full py-2 px-4 ${colors}`}
      onClick={() => onClick(label)}
    >
      <button className="outline-none font-bold" style={{ outline: 'none' }}>
        {label}
      </button>
    </li>
  );
};

export default Tab;
