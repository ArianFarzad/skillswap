import React, { useState } from 'react';
import {
  FilterContainer,
  FilterInput,
  KeywordInput,
  ListArea,
  NavArea,
} from '../style/components/NavBar.style';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import Search from './Search';
import MyProfile from './MyProfile.tsx';
import { IProfile } from '../models/models.ts';

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
          data-testid="keyword-input"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
        />
        <FilterInput
          type="number"
          min="0"
          placeholder={t('filter_by_points')}
          data-testid="filter-input"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
        />
      </FilterContainer>
    </NavArea>
  );
};

export default NavBar;
