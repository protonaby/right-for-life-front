import React from 'react';

import { DonateButton } from '../DonateButton';

const PaymentMethod = ({ name, details }) => {
  return (
    <section className="mb-3">
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p>{details}</p>
    </section>
  );
};

const MoneyTransfer = ({ accounts, details, paymentPurpose }) => {
  return (
    <section className="moneyTransfer mb-5">
      <ul className="mb-2">
        {accounts.map((account, i) => (
          <li key={i}>{account}</li>
        ))}
      </ul>
      <pre className="font-display mb-2">{details}</pre>
      <p>
        Назначение: <span className="italic">{paymentPurpose}</span>
      </p>
    </section>
  );
};

const DonateInfo = ({ paymentMethodsInfo, moneyTransferInfo }) => {
  if (paymentMethodsInfo) {
    return (
      <article className="payment_methods mt-10 text-center">
        <DonateButton />
        <h2 className="text-2xl font-bold mb-3">{paymentMethodsInfo.title}</h2>
        {paymentMethodsInfo.paymentMethods.map((method, i) => (
          <PaymentMethod key={i} {...method} />
        ))}
        <h3 className="text-lg font-bold mb-3">{moneyTransferInfo.title}</h3>
        <MoneyTransfer {...moneyTransferInfo} />
      </article>
    );
  }
  return null;
};

export default DonateInfo;
