import React, { useEffect, useRef, useState } from 'react';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Tooltip from '@mui/material/Tooltip';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { IMessage, IUser } from '../models/models.ts';
import socket, {
  connectSocket,
  disconnectSocket,
  onNewMessage,
  sendMessage,
} from '../utils/socket';
import {
  ChatContainer,
  ChatHeader,
  FilePreviewContainer,
  FilePreviewItem,
  MessageInputContainer,
  MessageInputField,
  MessagesContainer,
  MyMessageBubble,
  RemoveFileButton,
  ScrollToBottomButton,
  SendButton,
  StyledFileContainer,
  StyledFileLink,
  StyledFileName,
  StyledImage,
  StyledImagePreview,
  StyledTimestamp,
  TheirMessageBubble,
} from '../style/components/Chat.style';
import { formatTimestamp } from '../utils/chatUtils.ts';
import { handleEnterKeyPress } from '../utils/helpers.ts';

interface ChatParams {
  sessionId: string | undefined;
  senderId: string;
  onMessagesCountChange: (count: number) => void;
}

const Chat: React.FC<ChatParams> = ({
  sessionId,
  senderId,
  onMessagesCountChange,
}) => {
  const { t } = useTypedTranslation();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [otherPerson, setOtherPerson] = useState<IUser | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [exchangedMessagesCount, setExchangedMessagesCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages and set up socket connection
  useEffect(() => {
    if (!sessionId) return;

    axios
      .get(`/api/sessions/${sessionId}`)
      .then((res) => {
        setMessages(res.data.messages);
        const otherPerson =
          res.data.tutor._id === senderId ? res.data.student : res.data.tutor;
        setOtherPerson(otherPerson);
      })
      .catch((error) => log.error('Error fetching messages:', error));

    connectSocket(sessionId);

    // Handle new messages from socket
    const handleNewMessage = (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setExchangedMessagesCount((prevCount) => prevCount + 1);
    };
    onNewMessage(handleNewMessage);

    // Cleanup socket on unmount
    return () => {
      socket.off('newMessage', handleNewMessage);
      disconnectSocket();
    };
  }, [sessionId, senderId]);

  useEffect(() => {
    onMessagesCountChange(exchangedMessagesCount);
  }, [exchangedMessagesCount, onMessagesCountChange]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('attachments', file));

    try {
      const { data } = await axios.post('/api/messages/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      sendMessage(sessionId!, senderId, newMessage, data.attachments);
      setNewMessage('');
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      log.error('Error sending message:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  function handleRemoveFile(index: number) {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  // Handle scroll events to show/hide scroll-to-bottom button
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    setShowScrollToBottom(scrollHeight - clientHeight - scrollTop > 100);
  };

  return (
    <ChatContainer>
      {/* Chat Header */}
      <ChatHeader>
        <h2>{otherPerson?.name}</h2>
      </ChatHeader>

      {/* Messages List */}
      <MessagesContainer onScroll={handleScroll}>
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.sender._id === senderId ? (
              <MyMessageBubble>
                {msg.content && <p>{msg.content}</p>}
                {msg.attachments?.map((file, i) => (
                  <div key={i}>
                    {file.type === 'image' ? (
                      <StyledImage
                        src={file.url}
                        alt={'attachment'}
                        onClick={() => window.open(file.url, '_blank')}
                      />
                    ) : (
                      <StyledFileContainer>
                        <InsertDriveFileIcon fontSize={'large'} />
                        <StyledFileLink href={file.url} target={'_blank'}>
                          <Tooltip title={file.url} arrow>
                            <StyledFileName>
                              {file.url.split('/').pop()}
                            </StyledFileName>
                          </Tooltip>
                        </StyledFileLink>
                      </StyledFileContainer>
                    )}
                  </div>
                ))}
                <StyledTimestamp>
                  {formatTimestamp(msg.timestamp)}
                </StyledTimestamp>
              </MyMessageBubble>
            ) : (
              <TheirMessageBubble key={index}>
                {msg.content && <p>{msg.content}</p>}
                {msg.attachments?.map((file, i) => (
                  <div key={i}>
                    {file.type === 'image' ? (
                      <StyledImage
                        src={file.url}
                        alt={'attachment'}
                        onClick={() => window.open(file.url, '_blank')}
                      />
                    ) : (
                      <StyledFileContainer>
                        <InsertDriveFileIcon fontSize={'large'} />
                        <StyledFileLink href={file.url} target={'_blank'}>
                          <Tooltip title={file.url} arrow>
                            <StyledFileName>
                              {file.url.split('/').pop()}
                            </StyledFileName>
                          </Tooltip>
                        </StyledFileLink>
                      </StyledFileContainer>
                    )}
                  </div>
                ))}
                <StyledTimestamp>
                  {formatTimestamp(msg.timestamp)}
                </StyledTimestamp>
              </TheirMessageBubble>
            )}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {/* Scroll-to-bottom Button */}
      {showScrollToBottom && (
        <ScrollToBottomButton
          onClick={() =>
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <KeyboardDoubleArrowDownIcon />
        </ScrollToBottomButton>
      )}

      {/* File Preview Area */}
      {selectedFiles.length > 0 && (
        <FilePreviewContainer>
          {selectedFiles.map((file, index) => (
            <FilePreviewItem key={index}>
              {file.type.startsWith('image') ? (
                <StyledImagePreview
                  src={URL.createObjectURL(file)}
                  alt={'preview'}
                />
              ) : (
                <StyledFileContainer>
                  <InsertDriveFileIcon fontSize={'small'} />
                  <Tooltip title={file.name} arrow>
                    <StyledFileName>{file.name}</StyledFileName>
                  </Tooltip>
                </StyledFileContainer>
              )}
              <RemoveFileButton onClick={() => handleRemoveFile(index)}>
                <CloseIcon fontSize={'small'} />
              </RemoveFileButton>
            </FilePreviewItem>
          ))}
        </FilePreviewContainer>
      )}

      {/* Message Input Area */}
      <MessageInputContainer>
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <AttachFileIcon
            fontSize={'large'}
            style={{ color: 'var(--primary-color)' }}
          />
        </label>
        <input
          id={'file-upload'}
          type={'file'}
          multiple
          accept={'image/*,.pdf'}
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <MessageInputField
          type="text"
          placeholder={t('type_message')}
          maxLength={2000}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => handleEnterKeyPress(e, handleSendMessage)}
        />
        <SendButton onClick={handleSendMessage}>
          <SendIcon />
        </SendButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
