import { useNavigate } from 'react-router-dom';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import axios from '../utils/axiosInstance.ts';
import log from '../utils/loggerInstance.ts';
import { showToast } from '../utils/toastUtils.ts';

export const useHandleChatRequest = () => {
  const navigate = useNavigate();
  const { t } = useTypedTranslation();

  const handleChatRequest = async (otherUserId: string) => {
    const myUserId = localStorage.getItem('myUserId') || '';

    try {
      const response = await axios.get(`/api/sessions/check`, {
        params: { user1: myUserId, user2: otherUserId },
      });

      let sessionId = response.data.sessionId;

      if (!sessionId) {
        const createResponse = await axios.post('/api/sessions', {
          tutor: myUserId,
          student: otherUserId,
          date: new Date(),
        });
        sessionId = createResponse.data._id;
      }

      void navigate(`/chat/${sessionId}`);
    } catch (error) {
      log.error('Error handling chat request:', error);
      showToast('error', error, t);
    }
  };

  return handleChatRequest;
};
