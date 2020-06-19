export const initialState = {
  //1:
  onIntro: false,
  //2:
  onHome: false,
  //3:
  onChatList: false,
  //4:
  onMessages: false,
  //5:
  onBackHome: false,
  //6:
  onClose: false,
  //7:
  onLogoOutro: false,
  //8:
  onLogoOutroComplete: false,
  startChatButtonVisible: true,
  openChat: false,
  currentConversation: {},
  senderTyping: false,
  userData: [],
  messages: [],
};

const messageTypes = {
  0: 'incoming',
  1: 'outgoing',
  2: 'activity',
  3: 'template',
};

export const types = {
  OPEN_CHAT: 'chat/OPEN_CHAT',
  ON_INTRO_COMPLETE: 'chat/ON_INTRO_COMPLETE',
  ON_INTRO_COMPLETE_CLOSE: 'chat/ON_INTRO_COMPLETE_CLOSE',
  ON_CLOSE_CLICK: 'chat/ON_CLOSE_CLICK',
  ON_HOME_OUT_DONE: 'chat/ON_HOME_OUT_DONE',
  ON_BACK_CLICK: 'chat/ON_BACK_CLICK',
  ON_BACK_CLICK_MESSAGES: 'chat/ON_BACK_CLICK_MESSAGES',
  ON_LIST_ITEM_CLICK: 'chat/ON_LIST_ITEM_CLICK',
  OUTRO_COMPLETE: 'chat/OUTRO_COMPLETE',
  ON_PREV_CHAT_CLICK: 'chat/ON_PREV_CHAT_CLICK',
  SET_MESSAGES: 'chat/SET_MESSAGES',
  APPEND_MESSAGE: 'chat/APPEND_MESSAGE',
  APPEND_IP_MESSAGE: 'chat/APPEND_IP_MESSAGE',
};

const findUndeliveredMessage = (state, { content }) =>
  state.messages.filter(
    message => message.content === content && message.status === 'in_progress'
  );

const reducer = (state, action) => {
  switch (action.type) {
    case types.OPEN_CHAT:
      return {
        ...state,
        openChat: true,
        onHome: true,
        onIntro: true,
        startChatButtonVisible: false,
        onLogoOutroComplete: false,
        onChatList: false,
      };
    case types.ON_INTRO_COMPLETE_CLOSE:
      return {
        ...state,
        onClose: false,
        onLogoOutro: true,
      };
    case types.ON_INTRO_COMPLETE:
      return {
        ...state,
        onIntro: false,
      };
    case types.ON_PREV_CHAT_CLICK:
      return {
        ...state,
        onHome: false,
        onBackHome: false,
      };
    case types.ON_CLOSE_CLICK:
      return {
        ...state,
        onClose: true,
        openChat: false,
      };
    case types.OUTRO_COMPLETE:
      return {
        ...state,
        ...initialState,
        onLogoOutroComplete: true,
        startChatButtonVisible: true,
      };
    case types.ON_HOME_OUT_DONE:
      return {
        ...state,
        onChatList: true,
      };
    case types.ON_BACK_CLICK:
      return {
        ...state,
        onChatList: false,
        onMessages: false,
        onHome: true,
        onBackHome: true,
      };
    case types.ON_BACK_CLICK_MESSAGES:
      return {
        ...state,
        onChatList: true,
        onMessages: false,
      };
    case types.ON_LIST_ITEM_CLICK:
      return {
        ...state,
        currentConversation: action.payload,
        onChatList: false,
        onHome: false,
        onMessages: true,
      };
    case types.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case types.APPEND_IP_MESSAGE:
      return {
        ...state,
        messages: [...[action.payload], ...state.messages],
      };
    case types.APPEND_MESSAGE:
      const [message] = findUndeliveredMessage(state, action.payload);
      if (message) {
        return {
          ...state,
          messages: state.messages.map(m => {
            if (message.id === m.id) {
              return {
                id: action.payload.id,
                createdAt: new Date(action.payload.created_at).toISOString(),
                status: action.payload.status,
                assignee: action.payload.sender
                  ? {
                      avatarUrl: action.payload.sender.avatar_url,
                    }
                  : null,
                content: action.payload.content,
                messageType: messageTypes[action.payload.message_type],
              };
            }
            return m;
          }),
        };
      }

      return {
        ...state,
        messages: [
          ...[
            {
              id: action.payload.id,
              createdAt: new Date(action.payload.created_at).toISOString(),
              status: action.payload.status,
              assignee: action.payload.sender
                ? {
                    avatarUrl: action.payload.sender.avatar_url,
                  }
                : null,
              content: action.payload.content,
              messageType: messageTypes[action.payload.message_type],
            },
          ],
          ...state.messages,
        ],
      };
    default:
      return state;
  }
};

export default reducer;