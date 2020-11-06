<template>
  <div class="medium-3 bg-white contact--panel">
    <div class="contact--profile">
      <span class="close-button" @click="onPanelToggle">
        <i class="ion-chevron-right" />
      </span>
      <div class="contact--info">
        <thumbnail
          :src="contact.thumbnail"
          size="64px"
          :badge="channelType"
          :username="contact.name"
          :status="contact.availability_status"
        />
        <div class="contact--details">
          <div class="contact--name">
            <editable-input
              :value="contact.name"
              :id="this.contactId"
              field="name"
            />
          </div>
          <div class="contact--email">
            <editable-input
              :value="contact.email"
              :id="this.contactId"
              field="email"
            />
          </div>
          <a
            v-if="contact.phone_number"
            :href="`tel:${contact.phone_number}`"
            class="contact--email"
          >
            {{ contact.phone_number }}
          </a>

          <div
            v-if="
              contact.additional_attributes &&
                contact.additional_attributes.screen_name
            "
            class="contact--location"
          >
            {{ `@${contact.additional_attributes.screen_name}` }}
          </div>
          <div class="contact--location">
            {{ contact.location }}
          </div>
        </div>
      </div>
      <div v-if="contact.bio" class="contact--bio">
        {{ contact.bio }}
      </div>
      <div
        v-if="
          contact.additional_attributes &&
            contact.additional_attributes.description
        "
        class="contact--bio"
      >
        {{ contact.additional_attributes.description }}
      </div>
    </div>
    <vsa-list>
      <vsa-item v-if="browser.browser_name">
        <vsa-heading>
          <h4>About</h4>
        </vsa-heading>
        <vsa-icon>
          <svg
            class="open svg"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <svg
            class="close svg"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </vsa-icon>
        <vsa-content>
          <div class="conversation--details">
            <contact-details-item
              v-if="browser.browser_name"
              :title="$t('CONTACT_PANEL.BROWSER')"
              :value="browserName"
              icon="ion-ios-world-outline"
            />
            <contact-details-item
              v-if="browser.platform_name"
              :title="$t('CONTACT_PANEL.OS')"
              :value="platformName"
              icon="ion-laptop"
            />
            <contact-details-item
              v-if="referer"
              :title="$t('CONTACT_PANEL.INITIATED_FROM')"
              :value="referer"
              icon="ion-link"
            />
            <contact-details-item
              v-if="initiatedAt"
              :title="$t('CONTACT_PANEL.INITIATED_AT')"
              :value="initiatedAt.timestamp"
              icon="ion-clock"
            />
          </div>
        </vsa-content>
      </vsa-item>
      <vsa-item>
        <vsa-heading>
          <h4>Conversation Labels</h4>
        </vsa-heading>
        <vsa-icon>
          <svg
            class="open svg"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <svg
            class="close svg"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </vsa-icon>
        <vsa-content>
          <conversation-labels :conversation-id="conversationId" />
        </vsa-content>
      </vsa-item>
      <vsa-item>
        <vsa-heading>
          <h4>{{ $t('CONTACT_PANEL.CONVERSATIONS.TITLE') }}</h4>
        </vsa-heading>
        <vsa-icon>
          <svg
            class="open svg"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <svg
            class="close svg"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </vsa-icon>
        <vsa-content>
          <contact-conversations
            v-if="contact.id"
            :contact-id="contact.id"
            :conversation-id="conversationId"
          />
        </vsa-content>
      </vsa-item>
    </vsa-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Thumbnail from 'dashboard/components/widgets/Thumbnail.vue';
import ContactConversations from './ContactConversations.vue';
import ContactDetailsItem from './ContactDetailsItem.vue';
import ConversationLabels from './labels/LabelBox.vue';
import EditableInput from '../../../components/EditableInput.vue';
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';

export default {
  components: {
    ContactConversations,
    ContactDetailsItem,
    ConversationLabels,
    Thumbnail,
    EditableInput,
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
  },
  props: {
    conversationId: {
      type: [Number, String],
      required: true,
    },
    onToggle: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      currentChat: 'getSelectedChat',
    }),
    currentConversationMetaData() {
      return this.$store.getters[
        'conversationMetadata/getConversationMetadata'
      ](this.conversationId);
    },
    additionalAttributes() {
      return this.currentConversationMetaData.additional_attributes || {};
    },
    browser() {
      return this.additionalAttributes.browser || {};
    },
    referer() {
      return this.additionalAttributes.referer;
    },
    initiatedAt() {
      return this.additionalAttributes.initiated_at;
    },
    browserName() {
      return `${this.browser.browser_name || ''} ${this.browser
        .browser_version || ''}`;
    },
    platformName() {
      const {
        platform_name: platformName,
        platform_version: platformVersion,
      } = this.browser;
      return `${platformName || ''} ${platformVersion || ''}`;
    },
    channelType() {
      return this.currentChat.meta?.channel;
    },
    contactId() {
      return this.currentChat.meta?.sender?.id;
    },
    contact() {
      return this.$store.getters['contacts/getContact'](this.contactId);
    },
  },
  watch: {
    conversationId(newConversationId, prevConversationId) {
      if (newConversationId && newConversationId !== prevConversationId) {
        this.getContactDetails();
      }
    },
    contactId() {
      this.getContactDetails();
    },
  },
  mounted() {
    this.getContactDetails();
  },
  methods: {
    onPanelToggle() {
      this.onToggle();
    },
    getContactDetails() {
      if (this.contactId) {
        this.$store.dispatch('contacts/show', { id: this.contactId });
      }
    },
    openTranscriptModal() {
      this.showTranscriptModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~dashboard/assets/scss/variables';
@import '~dashboard/assets/scss/mixins';

.contact--panel {
  @include border-normal-left;

  background: white;
  font-size: $font-size-small;
  overflow-y: auto;
  overflow: auto;
  position: relative;
  padding: $space-normal;
}

.close-button {
  position: absolute;
  right: $space-normal;
  top: $space-slab;
  font-size: $font-size-default;
  color: $color-heading;
}

.contact--profile {
  align-items: center;
  padding: $space-medium 0 $space-one;

  .user-thumbnail-box {
    margin-right: $space-normal;
  }
}

.contact--details {
  margin-top: $space-small;

  p {
    margin-bottom: 0;
  }
}

.contact--info {
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.contact--name {
  @include text-ellipsis;
  text-transform: capitalize;

  font-weight: $font-weight-bold;
  font-size: $font-size-default;
}

.contact--email {
  @include text-ellipsis;

  color: $color-gray;
  display: block;
  line-height: $space-medium;

  &:hover {
    color: $color-woot;
  }
}

.contact--bio {
  margin-top: $space-normal;
}

.conversation--details {
  padding: $space-large $space-normal;
}

.conversation--labels {
  padding: $space-medium;

  .icon {
    margin-right: $space-micro;
    font-size: $font-size-micro;
    color: #fff;
  }

  .label {
    color: #fff;
    padding: 0.2rem;
  }
}

.contact--mute {
  color: $alert-color;
  display: block;
  text-align: left;
}

.contact--actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.vsa-list {
  --vsa-min-width: 100%;
  --vsa-default-icon-size: 0.4;
  --vsa-border-color: #f0f4f5;
  --vsa-highlight-color: #f4f6fb;
  --vsa-text-color: #1f2d3d;
  border-radius: 0.4rem;
  margin-top: 10px;

  h4 {
    font-size: 1.4rem;
    font-weight: 700;
  }
  .vsa-item {
    &__trigger {
      cursor: pointer;
    }
  }
}
.vsa-item {
  &--is-active {
    .vsa-item__trigger__icon {
      .open {
        display: none;
      }

      .close {
        display: block;
      }
    }
  }
  &__trigger__icon {
    .open {
      display: block;
    }

    .close {
      display: none;
    }
  }
}
svg {
  color: #1f2d3d !important;
}
</style>
