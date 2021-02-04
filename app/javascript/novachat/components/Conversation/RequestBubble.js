import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import variables from '../../utils/variables';
import mixins from '../../utils/mixins';
import IconRight from '../../img/IconRight.svg';
import IconCheck from '../../img/IconCheck.svg';
import Spinner from '../shared/Spinner';
import { useTracked } from '../../App';

const UPDATE_CONTACT_EMAIL = gql`
  mutation updateContactEmail(
    $websiteToken: String!
    $token: String!
    $messageId: ID!
    $email: String!
  ) {
    updateContactEmail(
      input: {
        websiteToken: $websiteToken
        token: $token
        messageId: $messageId
        email: $email
      }
    ) {
      message {
        contentAttributes
      }
    }
  }
`;

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function RequestBubble({ label, contentAttributes, messageId }) {
  const [{ websiteToken }] = useTracked();
  const [updateContactEmail, { loading }] = useMutation(UPDATE_CONTACT_EMAIL);
  const [value, setValue] = useState(
    (contentAttributes && contentAttributes.submitted_email) || ''
  );
  return (
    <styles.RequestBubble
      className="RequestBubble"
      sent={contentAttributes && contentAttributes.submitted_email}
    >
      {label}
      <form
        onSubmit={e => {
          e.preventDefault();
          updateContactEmail({
            variables: {
              websiteToken,
              token: Cookies.get('cw_conversation'),
              email: value,
              messageId,
            },
          });
        }}
      >
        <div className="Form">
          <input
            type="text"
            value={value}
            disabled={contentAttributes && contentAttributes.submitted_email}
            onChange={e => setValue(e.target.value)}
          />
          {contentAttributes && contentAttributes.submitted_email ? (
            <img src={IconCheck} className="Check" alt="Icon Check" />
          ) : (
            <>
              {loading && <Spinner size="small" ml="10" />}
              {!loading && (
                <button disabled={!validateEmail(value)} type="submit">
                  <img src={IconRight} alt="Icon Right" />
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </styles.RequestBubble>
  );
}

RequestBubble.propTypes = {
  label: PropTypes.string,
  contentAttributes: PropTypes.object,
  messageId: PropTypes.string,
};

const styles = {};

styles.RequestBubble = styled.div`
  width: 284px;
  background: white;
  border-radius: 5px;
  padding: 18px 23px;
  margin: 0 0 0 15px;
  box-sizing: border-box;
  ${mixins.dropShadow};
  border-top: 2px solid ${variables.BrandMainColor};
  .Form {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    input {
      flex: 1;
      padding: 11px 5px;
      border: 1px solid #e1e1e1;
      border-right: none;
      outline: none;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      ${sent =>
        sent &&
        `
        border-radius: 5px;
        padding-right: 36px;
      `}
      box-shadow: inset 0 0 7px #E1E1E1;
      font-family: ${variables.MainFontFamily};
    }
    button {
      background: ${variables.BrandMainColor};
      color: white;
      border: none;
      outline: none;
      cursor: pointer;
      width: 39px;
      height: 39px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      img {
        position: relative;
        top: 1px;
      }

      &:disabled {
        background: #6a5cab;
        cursor: not-allowed;
      }
    }
    .Check {
      position: absolute;
      right: 15px;
      top: 13px;
    }
  }
`;

export default RequestBubble;
