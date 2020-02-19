import React from 'react';

export const DonateButton = ({ href, className, style }) => {
  return (
    <a
      className={className}
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      style={style}
    >
      Помочь
    </a>
  );
};
/*
https://next.privat24.ua/payments/form/{"token":"cc67a469-2b4a-419a-8850-f52c596fd1b0"}
*/
DonateButton.defaultProps = {
  style: null,
  href: 'https://next.privat24.ua/payments',
  className:
    'min-w-5/12 bg-yellow-300 text-yellow-700 hover:bg-yellow-400 hover:text-yellow-800 font-bold py-1 px-3 rounded-xl',
};
