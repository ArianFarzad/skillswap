import React, { startTransition, useEffect, useRef, useState } from 'react';
import axios from '../utils/axiosInstance';
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
  AttachFileButton,
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
import { showToast } from '../utils/toastUtils.ts';

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [otherPerson, setOtherPerson] = useState<IUser | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [exchangedMessagesCount, setExchangedMessagesCount] = useState(0);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages and set up socket connection
  useEffect(() => {
    if (!sessionId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/sessions/${sessionId}`);
        setMessages(res.data.messages);
        const otherPerson =
          res.data.tutor._id === senderId ? res.data.student : res.data.tutor;
        setOtherPerson(otherPerson);
      } catch (error) {
        showToast('error', error, t);
      }
    };

    void fetchMessages();
    connectSocket(sessionId);

    // Handle new messages from socket
    const handleNewMessage = (message: IMessage) => {
      startTransition(() => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setExchangedMessagesCount((prevCount) => prevCount + 1);
      });
    };

    onNewMessage(handleNewMessage);

    // Cleanup socket on unmount
    return () => {
      socket.off('newMessage', handleNewMessage);
      disconnectSocket();
    };
  }, [sessionId, senderId, t]);

  useEffect(() => {
    onMessagesCountChange(exchangedMessagesCount);
  }, [exchangedMessagesCount, onMessagesCountChange]);

  const handleSendMessage = async () => {
    const messageValue = messageInputRef.current?.value.trim();
    if (!messageValue && selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('attachments', file));

    try {
      let uploadedFiles = [];
      if (selectedFiles.length > 0) {
        const { data } = await axios.post('/api/messages/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        uploadedFiles = data.attachments;
      }

      sendMessage(sessionId!, senderId, messageValue || '', uploadedFiles);

      setSelectedFiles([]);
      if (messageInputRef.current) messageInputRef.current.value = '';
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    startTransition(() => {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    });

    setFileInputKey(Date.now());
  };

  function handleRemoveFile(index: number) {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }

  // Handle scroll events to show/hide scroll-to-bottom button
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    setShowScrollToBottom(scrollHeight - clientHeight - scrollTop > 100);
  };

  const MessageAttachments: React.FC<{
    attachments?: { type: string; url: string }[];
  }> = ({ attachments }) => {
    return (
      <>
        {attachments?.map((file, i) => (
          <div key={i}>
            {file.type === 'image' ? (
              <StyledImage
                src={file.url}
                alt={'attachment'}
                onClick={() => window.open(file.url, '_blank')}
                onLoad={() => messagesEndRef.current?.scrollIntoView()}
              />
            ) : (
              <StyledFileContainer>
                <InsertDriveFileIcon fontSize={'large'} />
                <StyledFileLink href={file.url} target={'_blank'}>
                  <Tooltip title={file.url} arrow>
                    <StyledFileName>{file.url.split('/').pop()}</StyledFileName>
                  </Tooltip>
                </StyledFileLink>
              </StyledFileContainer>
            )}
          </div>
        ))}
      </>
    );
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
                <MessageAttachments attachments={msg.attachments} />
                <StyledTimestamp>
                  {formatTimestamp(msg.timestamp)}
                </StyledTimestamp>
              </MyMessageBubble>
            ) : (
              <TheirMessageBubble key={index}>
                {msg.content && <p>{msg.content}</p>}
                <MessageAttachments attachments={msg.attachments} />
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
        <MessageInputField
          id={'message-input'}
          type="text"
          placeholder={t('type_message')}
          maxLength={2000}
          onKeyDown={(e) => handleEnterKeyPress(e, handleSendMessage)}
          ref={messageInputRef}
          autoComplete={'off'}
          autoCorrect={'off'}
          spellCheck={'false'}
        />
        <AttachFileButton htmlFor={'file-upload'}>
          <AttachFileIcon />
        </AttachFileButton>
        <input
          key={fileInputKey}
          id={'file-upload'}
          type={'file'}
          multiple
          accept={'image/*,.pdf'}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <SendButton onClick={handleSendMessage}>
          <SendIcon />
        </SendButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
