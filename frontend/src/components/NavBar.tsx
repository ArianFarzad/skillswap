import React, { useState } from 'react';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import Search from './Search';
import MyProfile from './MyProfile.tsx';
import { IProfile } from '../models/models.ts';
import {
  FilterContainer,
  FilterInput,
  KeywordInput,
  ListArea,
  NavArea,
} from '../style/components/NavBar.style';
import { handleInputFieldChange } from '../utils/helpers.ts';

interface NavBarProps {
  profile: IProfile | null;
}

const NavBar: React.FC<NavBarProps> = ({ profile }) => {
  const { t } = useTypedTranslation();
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <NavArea>
      <ListArea>
        <MyProfile profile={profile} />
      </ListArea>
      <Search keyword={keyword} filter={filter} />
      <FilterContainer>
        <KeywordInput
          type="text"
          placeholder={t('keyword')}
          maxLength={50}
          data-testid="keyword-input"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputFieldChange(e, setKeyword, 50)
          }
        />
        <FilterInput
          type="number"
          min="0"
          placeholder={t('filter_by_points')}
          maxLength={15}
          data-testid="filter-input"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputFieldChange(e, setFilter, 15)
          }
        />
      </FilterContainer>
    </NavArea>
  );
};

export default NavBar;
