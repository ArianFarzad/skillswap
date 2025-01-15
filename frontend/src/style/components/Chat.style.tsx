import styled from 'styled-components';

export const ChatContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 95vh;
    gap: 1em;
`;

export const MessageInput = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0;
    padding-bottom: 1em;
`;

export const MsgTextField = styled.input`
    flex: 1;
    padding: var(--input-padding);
    font-size: 1rem;
    border: var(--input-border);
    border-radius: 5px 0 0 5px;
    box-shadow: var(--input-box-shadow);
`;

export const SendMsgBtn = styled.button`
    padding: 0.75rem;
    font-size: 1rem;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 0 5px 5px 0;

    &:hover {
        background-color: var(--primary-color-hover);
    }
`;

export const MyMessage = styled.div`
    background-color: #7fa9c7;
    color: white;
    padding: 0.5em;
    border-radius: 10px;
    margin-bottom: 0.5em;
    align-self: flex-end;

    & > p {
        color: white;
    }
`;

export const TheirMessage = styled.div`
    background-color: #e0e0e0; 
    color: black;
    padding: 0.5em;
    border-radius: 10px;
    margin-bottom: 0.5em;
    align-self: flex-start;

    & > p {
        color: black;
    }
`;

export const MessagesList = styled.div`
    height: 30em;
    overflow-y: scroll;
`;
