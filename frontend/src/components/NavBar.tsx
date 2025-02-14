import React, { useState } from 'react';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import Search from './Search';
import {
  FilterContainer,
  FilterInput,
  KeywordInput,
  NavArea,
} from '../style/components/NavBar.style';
import { handleInputFieldChange } from '../utils/helpers.ts';


const NavBar: React.FC = () => {
  const { t } = useTypedTranslation();
  const [keyword, setKeyword] = useState('');
  const [points, setPoints] = useState('');

  return (
    <NavArea>
      <Search keyword={keyword} points={points} />
      <FilterContainer>
        <KeywordInput
          type="text"
          placeholder={t('keyword')}
          maxLength={50}
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputFieldChange(e, setKeyword, 50)
          }
          data-testid="keyword-input"
        />
        <FilterInput
          type="number"
          min="0"
          placeholder={t('filter_by_points')}
          maxLength={15}
          data-testid="filter-input"
          value={points}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputFieldChange(e, setPoints, 15)
          }
        />
      </FilterContainer>
    </NavArea>
  );
};

export default NavBar;
