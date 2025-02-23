import styled from 'styled-components';
import '../index.css';

export const FooterContainer = styled.footer`
  background: var(--background-color-secondary);
  padding: 2rem 1rem;
  margin-top: auto;
  position: relative;
  border-top: 1px solid var(--border-color);
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CopyrightText = styled.p`
  color: var(--text-color);
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    color: var(--primary-color);
    width: 16px;
    height: 16px;
  }
`;

export const TeamList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const TeamMember = styled.li`
  position: relative;

  &:not(:last-child)::after {
    content: '•';
    color: var(--text-color);
    position: absolute;
    right: -1rem;
  }
`;

export const FooterLink = styled.a`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--border-color),
    transparent
  );
  margin: 0.5rem 0;
`;
