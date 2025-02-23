import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SessionsContainer = styled.div`
  background: linear-gradient(
    135deg,
    var(--background-color-secondary) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-left: 4px solid var(--primary-color);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  margin: 2rem 2rem 2rem 0;
  width: 25%;
`;

export const SessionTitle = styled.h1`
  color: var(--text-color);
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  font-weight: 800;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--secondary-color)
    );
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

export const SessionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 130vh;
  overflow-y: auto;
  scrollbar-width: none;
  justify-content: flex-start;
  align-items: center;
`;

export const SessionItem = styled.div`
  background: var(--background-color);
  border-radius: 16px;
  padding: 1.5rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 80%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const SessionContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const RoleBadge = styled.span`
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    )
    border-box;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const UserName = styled.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Divider = styled.span`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin: 0 1rem;
  opacity: 0.6;
`;

export const ContinueButton = styled.button`
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 25%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 75%
    );
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover {
    box-shadow: 0 4px 15px rgba(var(--primary-color), 0.4);

    &::after {
      transform: translateX(100%);
    }
  }
`;

export const NoSessionsMessage = styled.p`
  text-align: center;
  color: var(--text-color-secondary);
  font-size: 1.2rem;
  padding: 3rem;
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 500px;
`;
