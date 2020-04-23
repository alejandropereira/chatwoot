<template>
  <div class="conv-header">
    <div class="user">
      <Thumbnail
        :src="contact.thumbnail"
        size="40px"
        :badge="contact.channel"
        :username="contact.name"
      />
      <div class="user--profile__meta">
        <h3 v-if="!isContactPanelOpen" class="user--name text-truncate">
          <editable-input :value="contact.name" :id="contact.id" field="name" />
        </h3>
        <button
          class="user--profile__button clear button small"
          @click="$emit('contactPanelToggle')"
        >
          {{ viewProfileButtonLabel }}
        </button>
      </div>
    </div>
    <div class="flex-container">
      <div class="multiselect-box ion-headphone">
        <multiselect
          v-model="currentChat.meta.assignee"
          :options="agentList"
          label="name"
          :allow-empty="true"
          deselect-label="Remove"
          placeholder="Select Agent"
          selected-label=""
          select-label="Assign"
          track-by="id"
          @select="assignAgent"
          @remove="removeAgent"
        >
          <span slot="noResult">{{ $t('AGENT_MGMT.SEARCH.NO_RESULTS') }}</span>
        </multiselect>
      </div>
      <ResolveButton />
    </div>
  </div>
</template>
<script>
/* eslint no-console: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */
/* global bus */

import { mapGetters } from 'vuex';
import Thumbnail from '../Thumbnail';
import ResolveButton from '../../buttons/ResolveButton';
import EditableInput from '../../EditableInput';

export default {
  components: {
    Thumbnail,
    ResolveButton,
    EditableInput,
  },

  props: {
    chat: {
      type: Object,
      default: () => {},
    },
    isContactPanelOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentChatAssignee: null,
    };
  },

  mounted() {
    this.$store.dispatch('contacts/show', {
      id: this.chat.meta.sender.id,
    });
  },

  computed: {
    ...mapGetters({
      agents: 'agents/getVerifiedAgents',
      currentChat: 'getSelectedChat',
    }),
    contact() {
      console.log({ chat: this.chat });
      return this.$store.getters['contacts/getContact'](
        this.chat.meta.sender.id
      );
    },
    agentList() {
      return [
        {
          confirmed: true,
          name: 'None',
          id: 0,
          role: 'agent',
          account_id: 0,
          email: 'None',
        },
        ...this.agents,
      ];
    },
    viewProfileButtonLabel() {
      return `${
        this.isContactPanelOpen
          ? this.$t('CONVERSATION.HEADER.CLOSE')
          : this.$t('CONVERSATION.HEADER.OPEN')
      } ${this.$t('CONVERSATION.HEADER.DETAILS')}`;
    },
  },

  methods: {
    assignAgent(agent) {
      this.$store
        .dispatch('assignAgent', {
          conversationId: this.currentChat.id,
          agentId: agent.id,
        })
        .then(() => {
          bus.$emit('newToastMessage', this.$t('CONVERSATION.CHANGE_AGENT'));
        });
    },

    removeAgent() {},
  },
};
</script>

<style lang="scss" scoped>
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
