<template>
  <loading-state :message="$t('CONFIRM_EMAIL')"></loading-state>
</template>
<script>
/* eslint-disable */
import LoadingState from '../../components/widgets/LoadingState';
import Auth from '../../api/auth';
export default {
  props: {
    confirmationToken: String,
    redirectUrl: String,
    config: String,
  },
  components: {
    LoadingState,
  },
  mounted() {
    this.confirmToken();
  },
  methods: {
    confirmToken() {
      Auth.verifyPasswordToken({
        confirmationToken: this.confirmationToken,
      })
        .then((res) => {
          const [path, queryString] =
            res.data &&
            res.data.redirect_url &&
            res.data.redirect_url.split('?');
          const urlParams = new URLSearchParams(queryString);
          if (path && queryString) {
            return this.$router.push({
              path,
              query: {
                reset_password_token: urlParams.get('reset_password_token'),
              },
            });
          }

          window.location = '/';
        })
        .catch((res) => {
          window.location = '/';
        });
    },
  },
};
</script>
