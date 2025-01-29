import styled from 'styled-components';

export const InfoMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
`;

export const StyledImage = styled.img`
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  border-radius: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 80%);
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;

    &::after {
      opacity: 1;
    }
  }
`;

export const InfoText = styled.h2`
  font-size: 0.8em;
  text-align: center;
  margin: 0 2em;
  padding-top: 1.5em;
  color: var(--text-color);
`;
