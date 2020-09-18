export const initialState = {
  onIntro: false,
  onHome: false,
  onChatList: false,
  onMessages: false,
  onBackHome: false,
  onClose: false,
  onLogoOutro: false,
  onLogoOutroComplete: false,
  startChatButtonVisible: true,
  openChat: false,
  currentConversation: {},
  senderTyping: false,
  userData: [],
  messages: [],
  websiteToken: null,
  webWidget: null,
  previewFile: {},
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
  UPDATE_MESSAGE: 'chat/UPDATE_MESSAGE',
  UPDATE_MESSAGE_DATA: 'chat/UPDATE_MESSAGE_DATA',
  APPEND_IP_MESSAGE: 'chat/APPEND_IP_MESSAGE',
  SET_WIDGET_TOKEN: 'chat/SET_WIDGET_TOKEN',
  SET_PREVIEW_FILE_UPLOAD: 'chat/SET_PREVIEW_FILE_UPLOAD',
  TOGGLE_AGENT_TYPING: 'chat/TOGGLE_AGENT_TYPING',
};

const findUndeliveredMessage = (state, { content, attachments }) =>
  state.messages.filter(message => {
    if (attachments && attachments.length > 0) {
      return (
        message.status === 'in_progress' &&
        message.attachments &&
        message.attachments[0].fileName === attachments[0].file_name
      );
    }

    return message.status === 'in_progress' && message.content === content;
  });

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
    case types.SET_PREVIEW_FILE_UPLOAD:
      return {
        ...state,
        previewFile: action.payload,
      };
    case types.SET_WIDGET_TOKEN:
      return {
        ...state,
        websiteToken: action.payload.websiteToken,
        webWidget: action.payload.webWidget,
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
        currentConversation: {},
      };
    case types.ON_BACK_CLICK_MESSAGES:
      return {
        ...state,
        onChatList: true,
        onMessages: false,
        currentConversation: {},
      };
    case types.ON_LIST_ITEM_CLICK:
      return {
        ...state,
        currentConversation: action.payload,
        onChatList: false,
        messages: action.payload.uuid === 'volatile' ? [] : state.messages,
        onHome: false,
        onMessages: true,
        onBackHome: false,
      };
    case types.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case types.TOGGLE_AGENT_TYPING:
      if (action.payload.conversationId === state.currentConversation.id) {
        return {
          ...state,
          senderTyping: action.payload.status === 'on',
        };
      }
      return state;
    case types.APPEND_IP_MESSAGE:
      return {
        ...state,
        messages: [...[action.payload], ...state.messages],
      };
    case types.UPDATE_MESSAGE_DATA:
      return {
        ...state,
        messages: state.messages.map(message => {
          if (action.payload.id === message.id) {
            return {
              ...message,
              ...action.payload,
            };
          }
          return message;
        }),
      };
    case types.APPEND_MESSAGE: {
      const [message] = findUndeliveredMessage(state, action.payload);

      if (message) {
        return {
          ...state,
          senderTyping: false,
          currentConversation: {
            ...state.currentConversation,
            uuid: action.payload.conversation_uuid,
          },
          messages: state.messages.map(m => {
            if (message.id === m.id) {
              return {
                id: m.id,
                createdAt: new Date(action.payload.created_at).toISOString(),
                status: action.payload.status,
                attachments:
                  action.payload.attachments &&
                  action.payload.attachments.length > 0
                    ? [
                        {
                          id: action.payload.attachments[0].id,
                          fileName: action.payload.attachments[0].file_name,
                          fileType: action.payload.attachments[0].file_type,
                          thumbUrl: action.payload.attachments[0].thumb_url,
                        },
                      ]
                    : m.attachments || [],
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
        currentConversation: {
          ...state.currentConversation,
          uuid: action.payload.conversation_uuid,
        },
        messages: [
          ...[
            {
              id: action.payload.id,
              createdAt: new Date(action.payload.created_at).toISOString(),
              status: action.payload.status,
              attachments:
                action.payload.attachments &&
                action.payload.attachments.length > 0
                  ? [
                      {
                        id: action.payload.attachments[0].id,
                        fileName: action.payload.attachments[0].file_name,
                        fileType: action.payload.attachments[0].file_type,
                        thumbUrl: action.payload.attachments[0].thumb_url,
                      },
                    ]
                  : [],
              assignee: action.payload.sender
                ? {
                    avatarUrl: action.payload.sender.avatar_url,
                  }
                : null,
              content: action.payload.content,
              contentAttributes: action.payload.content_attributes,
              contentType: action.payload.content_type,
              messageType: messageTypes[action.payload.message_type],
            },
          ],
          ...state.messages,
        ],
      };
    }
    case types.UPDATE_MESSAGE: {
      return {
        ...state,
        messages: state.messages.map(m => {
          if (action.payload.id.toString() === m.id.toString()) {
            return {
              id: action.payload.id.toString(),
              createdAt: new Date(action.payload.created_at).toISOString(),
              status: action.payload.status,
              attachments:
                action.payload.attachments &&
                action.payload.attachments.length > 0
                  ? [
                      {
                        id: action.payload.attachments[0].id,
                        fileName: action.payload.attachments[0].file_name,
                        fileType: action.payload.attachments[0].file_type,
                        thumbUrl: action.payload.attachments[0].thumb_url,
                        fileUrl: action.payload.attachments[0].data_url,
                      },
                    ]
                  : [],
              assignee: action.payload.sender
                ? {
                    avatarUrl: action.payload.sender.avatar_url,
                  }
                : null,
              content: action.payload.content,
              contentAttributes: action.payload.content_attributes,
              contentType: action.payload.content_type,
              messageType: messageTypes[action.payload.message_type],
            };
          }
          return m;
        }),
      };
    }
    default:
      return state;
  }
};

export default reducer;
