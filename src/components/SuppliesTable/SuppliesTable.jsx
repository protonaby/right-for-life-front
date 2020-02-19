import React, { useState } from 'react';
import { API } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import SuppliesCategoryButtons from '../SuppliesCategoryButtons';
import SuppliesTableRow from '../SuppliesTableRow';
import { EditModeBar } from '../EditModeBar';
import { CUDService } from '../../services/CUDService';
import './SuppliesTable.css';

const SuppliesTable = ({ isEdit, isEditModeBarOpen, updateIsEdit, updateIsEditModeBarOpen, data }) => {
  const [supplies, setSupplies] = useState(data);
  const [category, setCategory] = useState({ name: null, label: null });

  const createSupplie = (id, supplie) => {

  }
  const updateSupplie = (id, nameOrInfo, value) => {
    let supplieIndex;
    const supplie = supplies.find((item, index) => {
      if (item._id === id) {
        supplieIndex = index;
        return true;
      };
      return false;
    });

    supplie[nameOrInfo] = value;

    setSupplies([...supplies.slice(0, supplieIndex), supplie, ...supplies.slice(supplieIndex + 1)])
  }
  const deleteSupplie = (id) => {
    let supplieIndex;
    supplies.find((item, index) => {
      if (item._id === id) {
        supplieIndex = index;
        return true;
      };
      return false;
    });

    setSupplies([...supplies.slice(0, supplieIndex), ...supplies.slice(supplieIndex + 1)])
  }

  const selectOptionChoseHandler = selectedOption => {
    switch (selectedOption) {
      case 'edit':
        updateIsEditModeBarOpen(true);
        updateIsEdit(true);
        break;
      case 'no-edit':
        updateIsEditModeBarOpen(false);
        updateIsEdit(false);
        break;
      case 'cancel-edit':
        // eslint-disable-next-line
        location.reload();
        break;
      case 'save':
        (() => {
          CUDService.PUT('/supplies', supplies);
          selectOptionChoseHandler('no-edit');
        })();
        break;
      default:
        return null;
    }
  };

  const TableHeader = ({ hasAnyElements }) => {
    let headerRow = null;
    const trClass = 'text-2xl uppercase font-bold text-lightgray-700';

    if (hasAnyElements) {
      headerRow = (
        <tr className={trClass}>
          <th className="px-4 py-2">Товар</th>
          <th className="px-4 py-2">Инфо</th>
        </tr>
      );
    } else {
      headerRow = (
        <tr className={trClass}>
          <th className="px-4 py-2">В данной категории нет товаров</th>
        </tr>
      );
    }

    return <thead>{headerRow}</thead>;
  };
  const getTableBody = suppliesArr => {
    return suppliesArr.map(el => {
      return (
        <SuppliesTableRow
          isEdit={isEdit}
          createSupplie={createSupplie}
          updateSupplie={updateSupplie}
          deleteSupplie={deleteSupplie}
          itemData={el}
          key={el._id}
        />
      );
    });
  };

  const categoryBtnHandlers = {
    onAllClick() {
      setCategory({ name: 'all', label: 'Все' });
    },
    onFoodClick() {
      setCategory({ name: 'food', label: 'Корма' });
    },
    onProductsClick() {
      setCategory({ name: 'products', label: 'Продукты' });
    },
    onMedicineClick() {
      setCategory({ name: 'medicine', label: 'Медикаменты' });
    },
    onHouseholdClick() {
      setCategory({ name: 'household', label: 'Хозяйственные нужды' });
    },
    onNeedsClick() {
      setCategory({ name: 'needs', label: 'Важности и нужности' });
    },
  };

  let table = null;
  if (category.name) {
    if (category.name !== 'all') {
      data = supplies.filter(supply => supply.type === category.label);
    }
    else {
      data = [...supplies];
    }
    table = (
      <table className="table-fixed mx-auto mt-6">
        <TableHeader hasAnyElements={data.length} />
        <tbody>{getTableBody(data)}</tbody>
      </table>
    );
  }

  return (
    <div>
      {isEditModeBarOpen &&
        <EditModeBar
          data={supplies}
          onEdit={() => updateIsEdit(!isEdit)}
          onSave={() => selectOptionChoseHandler('save')}
          onCancel={() => selectOptionChoseHandler('cancel-edit')}
        />}
      <SuppliesCategoryButtons
        clickHandlers={categoryBtnHandlers}
        activeCategory={category.name}
      />
      {table}
    </div>
  );
};

export default withFetchDataIndicators(SuppliesTable, API.SUPPLIES);