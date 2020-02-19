import React, { useState } from 'react';
import { API } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import TabBar from '../../components/TabBar';
import { Select } from '../../components/Select';

const DonatePage = ({ data: { title, manager, summary, paymentMethodsInfo, moneyTransferInfo } }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(false);

  const updateIsEdit = (value) => setIsEdit(value);
  const updateIsEditModeBarOpen = (value) => setIsEditModeBarOpen(value);

  const selectOptionChoseHandler = selectedOption => {
    switch (selectedOption) {
      case 'edit':
        setIsEditModeBarOpen(true);
        setIsEdit(true);
        break;
      default:
        return null;
    }
  };

  return (
    <div className="text-lightgray-700">
      {!isEditModeBarOpen && <Select
        classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
        chooseOptionHandler={selectOptionChoseHandler}
        optEdit
      />
      }
      <header className="mb-6">
        <h1 className="text-4xl uppercase font-bold">{title}</h1>
      </header>
      <section className="mb-5">
        <h2 className="text-2xl font-bold mb-3">
          Куратор мини-приюта — {manager}
        </h2>
        <p className="text-lg">{summary}</p>
      </section>
      <TabBar
        isEdit={isEdit}
        updateIsEdit={updateIsEdit}
        isEditModeBarOpen={isEditModeBarOpen}
        updateIsEditModeBarOpen={updateIsEditModeBarOpen}
        paymentMethodsInfo={paymentMethodsInfo}
        moneyTransferInfo={moneyTransferInfo}
      />
    </div>
  );
};

const wrappedComponent = withFetchDataIndicators(DonatePage, API.DONATE);

export { wrappedComponent as DonatePage };
