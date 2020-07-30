import { useQuery, gql } from '@apollo/client';

const PING = gql`
  query Messenger {
    messenger {
      enabledForUser
      # updateData
      app {
        greetings
        intro
        tagline
        activeMessenger
        inBusinessHours
        replyTime
        inboundSettings
        emailRequirement
        businessBackIn
        tasksSettings
        customizationColors
        encryptionKey
        articleSettings {
          subdomain
        }
        domainUrl
        theme
      }
      agents {
        email
        name
        avatarUrl
      }
    }
  }
`;

export default function useAccount() {
  const { data, loading, error } = useQuery(PING);

  return { data, loading, error };
}
