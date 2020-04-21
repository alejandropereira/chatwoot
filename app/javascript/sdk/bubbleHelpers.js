import { addClass, toggleClass, wootOn } from './DOMHelpers';
import { IFrameHelper } from './IFrameHelper';
import { BUBBLE_DESIGN } from './constants';

export const bubbleImg =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY2MCIgdmlld0JveD0iMCAwIDY0MCA2NjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDUuMjk5OCAxNzFMMTgyLjU1IDkxLjc1ODdMMTgyLjU1IDI1MC4yNDFMNDUuMjk5OCAxNzFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ1LjI5OTggMzMxTDE4Mi41NSAyNTEuNzU5TDE4Mi41NSA0MTAuMjQxTDQ1LjI5OTggMzMxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMjAgMTcwLjhMMTgyLjc1IDI1MC4wNDFMMTgyLjc1IDkxLjU1ODVMMzIwIDE3MC44WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xODMgMjUxLjhMNDUuNzUgMzMxLjA0MUw0NS43NSAxNzIuNTU4TDE4MyAyNTEuOFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTgzIDQwOC44TDQ1Ljc1IDQ4OC4wNDFMNDUuNzUgMzI5LjU1OEwxODMgNDA4LjhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMyMCA0ODguOEwxODIuNzUgNTY4LjA0MUwxODIuNzUgNDA5LjU1OEwzMjAgNDg4LjhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4Mi44IDkxLjVMMzIwLjA1IDEyLjI1ODdWMTcwLjc0MUwxODIuOCA5MS41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMTkuOCAxNzAuNUw0NTcuMDUgOTEuMjU4N1YyNDkuNzQxTDMxOS44IDE3MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NTYuOCAyNTAuNUw1OTQuMDUgMTcxLjI1OVYzMjkuNzQxTDQ1Ni44IDI1MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NTYuOCA0MDguNUw1OTQuMDUgMzI5LjI1OVY0ODcuNzQxTDQ1Ni44IDQwOC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NTYuOCA1NjcuNUw1OTQuMDUgNDg4LjI1OVY2NDYuNzQxTDQ1Ni44IDU2Ny41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMTkuOCA0ODguNUw0NTcuMDUgNDA5LjI1OVY1NjcuNzQxTDMxOS44IDQ4OC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NTcuMzUgOTEuNUwzMjAuMSAxNzAuNzQxTDMyMC4xIDEyLjI1ODdMNDU3LjM1IDkxLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ1Ny4zNSA1NjcuNUwzMjAuMSA2NDYuNzQxTDMyMC4xIDQ4OC4yNTlMNDU3LjM1IDU2Ny41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01OTQuMzUgNDg4LjVMNDU3LjEgNTY3Ljc0MUw0NTcuMSA0MDkuMjU5TDU5NC4zNSA0ODguNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTk0LjM1IDMyOS41TDQ1Ny4xIDQwOC43NDFMNDU3LjEgMjUwLjI1OUw1OTQuMzUgMzI5LjVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTU5NCAxNzAuOEw0NTYuNzUgMjUwLjA0MUw0NTYuNzUgOTEuNTU4NUw1OTQgMTcwLjhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ1LjI5OTggNDg4TDE4Mi41NSA0MDguNzU5TDE4Mi41NSA1NjcuMjQxTDQ1LjI5OTggNDg4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xODMuMyA1NjhMMzIwLjU1IDQ4OC43NTlWNjQ3LjI0MUwxODMuMyA1NjhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
export const body = document.getElementsByTagName('body')[0];
export const widgetHolder = document.createElement('div');

export const bubbleHolder = document.createElement('div');
export const chatBubble = document.createElement('div');
export const closeBubble = document.createElement('div');
export const notificationBubble = document.createElement('span');

export const getBubbleView = type =>
  BUBBLE_DESIGN.includes(type) ? type : BUBBLE_DESIGN[0];
export const isExpandedView = type => getBubbleView(type) === BUBBLE_DESIGN[1];

export const setBubbleText = bubbleText => {
  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.getElementById('woot-widget--expanded__text');
    textNode.innerHTML = bubbleText;
  }
};

export const createBubbleIcon = ({ className, src, target }) => {
  let bubbleClassName = `${className} woot-elements--${window.$chatwoot.position}`;
  const bubbleIcon = document.createElement('img');
  bubbleIcon.src = src;
  target.appendChild(bubbleIcon);

  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.createElement('div');
    textNode.id = 'woot-widget--expanded__text';
    textNode.innerHTML = '';
    target.appendChild(textNode);
    bubbleClassName += ' woot-widget--expanded';
  }

  target.className = bubbleClassName;
  return target;
};

export const createBubbleHolder = () => {
  addClass(bubbleHolder, 'woot--bubble-holder');
  body.appendChild(bubbleHolder);
};

export const createNotificationBubble = () => {
  addClass(notificationBubble, 'woot--notification');
  return notificationBubble;
};

export const onBubbleClick = (props = {}) => {
  const { toggleValue } = props;
  const { isOpen } = window.$chatwoot;
  if (isOpen !== toggleValue) {
    const newIsOpen = toggleValue === undefined ? !isOpen : toggleValue;
    window.$chatwoot.isOpen = newIsOpen;

    toggleClass(chatBubble, 'woot--hide');
    toggleClass(closeBubble, 'woot--hide');
    toggleClass(widgetHolder, 'woot--hide');
    IFrameHelper.events.onBubbleToggle(newIsOpen);
  }
};

export const onClickChatBubble = () => {
  wootOn(bubbleHolder, 'click', onBubbleClick);
};
