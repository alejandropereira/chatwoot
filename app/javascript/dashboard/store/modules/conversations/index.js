/* eslint no-console: 0 */
/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import * as types from '../../mutation-types';
import getters, { getSelectedChatConversation } from './getters';
import actions from './actions';
import wootConstants from '../../../constants';

const initialSelectedChat = {
  id: null,
  meta: {},
  status: null,
  seen: false,
  agentTyping: 'off',
  dataFetched: false,
};
const state = {
  allConversations: [],
  convTabStats: {
    mineCount: 0,
    unAssignedCount: 0,
    allCount: 0,
  },
  selectedChat: { ...initialSelectedChat },
  listLoadingStatus: true,
  chatStatusFilter: wootConstants.STATUS_TYPE.OPEN,
  currentInbox: null,
};

// mutations
const mutations = {
  [types.default.SET_ALL_CONVERSATION](_state, conversationList) {
    const newAllConversations = [..._state.allConversations];
    conversationList.forEach(conversation => {
      const indexInCurrentList = newAllConversations.findIndex(
        c => c.id === conversation.id
      );
      if (indexInCurrentList < 0) {
        newAllConversations.push(conversation);
      }
    });
    _state.allConversations = newAllConversations;
  },
  [types.default.EMPTY_ALL_CONVERSATION](_state) {
    _state.allConversations = [];
    _state.selectedChat = { ...initialSelectedChat };
  },
  [types.default.SET_ALL_MESSAGES_LOADED](_state) {
    const [chat] = getSelectedChatConversation(_state);
    Vue.set(chat, 'allMessagesLoaded', true);
  },

  [types.default.CLEAR_ALL_MESSAGES_LOADED](_state) {
    const [chat] = getSelectedChatConversation(_state);
    Vue.set(chat, 'allMessagesLoaded', false);
  },
  [types.default.CLEAR_CURRENT_CHAT_WINDOW](_state) {
    _state.selectedChat.id = null;
    _state.selectedChat.agentTyping = 'off';
  },

  [types.default.SET_PREVIOUS_CONVERSATIONS](_state, { id, data }) {
    if (data.length) {
      const [chat] = _state.allConversations.filter(c => c.id === id);
      chat.messages.unshift(...data);
    }
  },

  [types.default.SET_CONV_TAB_META](
    _state,
    {
      mine_count: mineCount,
      unassigned_count: unAssignedCount,
      all_count: allCount,
    } = {}
  ) {
    Vue.set(_state.convTabStats, 'mineCount', mineCount);
    Vue.set(_state.convTabStats, 'allCount', allCount);
    Vue.set(_state.convTabStats, 'unAssignedCount', unAssignedCount);
  },

  [types.default.CURRENT_CHAT_WINDOW](_state, activeChat) {
    if (activeChat) {
      Object.assign(_state.selectedChat, activeChat);
      Vue.set(_state.selectedChat.meta, 'assignee', activeChat.meta.assignee);
      Vue.set(_state.selectedChat.meta, 'status', activeChat.meta.status);
    }
  },

  [types.default.UPDATE_CONV_SENDER](_state, data) {
    _state.allConversations.forEach(element => {
      if (element.meta.sender.id === data.id) {
        Vue.set(element.meta, 'sender', {
          ...element.meta.sender,
          ...data,
        });
      }
    });
  },

  [types.default.APPEND_MESSAGES](_state, { id, data }) {
    if (data.length) {
      const [chat] = _state.allConversations.filter(c => c.id === id);
      chat.messages = data;
      Vue.set(chat, 'dataFetched', true);
    }
  },

  [types.default.SET_CHAT_META](_state, { id, data }) {
    const [chat] = _state.allConversations.filter(c => c.id === id);
    if (data !== undefined) {
      Vue.set(chat, 'labels', data.labels);
    }
  },

  [types.default.ASSIGN_AGENT](_state, assignee) {
    const [chat] = getSelectedChatConversation(_state);
    chat.meta.assignee = assignee;
    if (assignee === null) {
      Object.assign(_state.selectedChat.meta.assignee, assignee);
    }
  },

  [types.default.RESOLVE_CONVERSATION](_state, status) {
    const [chat] = getSelectedChatConversation(_state);
    chat.status = status;
    _state.selectedChat.status = status;
  },

  [types.default.SEND_MESSAGE](_state, currentMessage) {
    const [chat] = getSelectedChatConversation(_state);
    const allMessagesExceptCurrent = (chat.messages || []).filter(
      message => message.id !== currentMessage.id
    );
    allMessagesExceptCurrent.push(currentMessage);
    chat.messages = allMessagesExceptCurrent;
  },

  [types.default.ADD_MESSAGE](_state, message) {
    const [chat] = _state.allConversations.filter(
      c => c.id === message.conversation_id
    );
    if (!chat) return;
    const previousMessageIndex = chat.messages.findIndex(
      m => m.id === message.id
    );
    if (previousMessageIndex === -1) {
      chat.messages.push(message);
      if (_state.selectedChat.id === message.conversation_id) {
        window.bus.$emit('scrollToMessage');
      }
    } else {
      chat.messages[previousMessageIndex] = message;
    }
  },

  [types.default.ADD_CONVERSATION](_state, conversation) {
    _state.allConversations.push(conversation);
  },

  [types.default.UPDATE_CONVERSATION](_state, conversation) {
    const { allConversations } = _state;
    const currentConversationIndex = allConversations.findIndex(
      c => c.id === conversation.id
    );
    if (currentConversationIndex > -1) {
      const currentConversation = {
        ...allConversations[currentConversationIndex],
        status: conversation.status,
      };
      Vue.set(allConversations, currentConversationIndex, currentConversation);
      if (_state.selectedChat.id === conversation.id) {
        _state.selectedChat.status = conversation.status;
        window.bus.$emit('scrollToMessage');
      }
    }
  },

  [types.default.MARK_SEEN](_state) {
    _state.selectedChat.seen = true;
  },

  [types.default.SET_AGENT_TYPING](_state, { status }) {
    _state.selectedChat.agentTyping = status;
  },

  [types.default.SET_LIST_LOADING_STATUS](_state) {
    _state.listLoadingStatus = true;
  },

  [types.default.CLEAR_LIST_LOADING_STATUS](_state) {
    _state.listLoadingStatus = false;
  },

  [types.default.MARK_MESSAGE_READ](_state, { id, lastSeen }) {
    const [chat] = _state.allConversations.filter(c => c.id === id);
    chat.agent_last_seen_at = lastSeen;
  },

  [types.default.CHANGE_CHAT_STATUS_FILTER](_state, data) {
    _state.chatStatusFilter = data;
  },

  // Update assignee on action cable message
  [types.default.UPDATE_ASSIGNEE](_state, payload) {
    const [chat] = _state.allConversations.filter(c => c.id === payload.id);
    chat.meta.assignee = payload.assignee;
  },

  [types.default.SET_ACTIVE_INBOX](_state, inboxId) {
    _state.currentInbox = inboxId;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
