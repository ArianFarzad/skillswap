import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 6em;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 10px var(--box-shadow-color);

  @media (max-width: 768px) {
    padding-top: 4em;
    margin: 4em 0;
  }
`;

export const ProfilePageHeadline = styled.h2`
  text-align: center;
  color: var(--primary-color);
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileInfo = styled.div`
  display: flex;
  padding: 3em;
  justify-content: space-between;
  gap: 7.5em;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2em;

  @media (max-width: 768px) {
    gap: 1em;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2em;

  @media (max-width: 768px) {
    gap: 1em;
  }
`;

export const UserName = styled.div`
  flex: 1;
`;

export const UserEmail = styled.div`
  flex: 1;
`;

export const ColumnHeading = styled.h3`
  margin-bottom: 10px;
  color: var(--primary-color);
`;

export const ColumnText = styled.p`
  margin: 0;
  color: var(--secondary-color);
`;

export const ScrollArea = styled.div`
  overflow-y: scroll;
  min-height: 10em;
  padding-right: 0.5em;

  @media (max-width: 768px) {
    min-height: 5em;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  background-color: var(--background-color-secondary);
  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 5px;
  box-shadow: 0 0 5px var(--box-shadow-color);
`;
