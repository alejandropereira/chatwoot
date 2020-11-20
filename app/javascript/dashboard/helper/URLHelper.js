import queryString from 'query-string';

export const frontendURL = (path, params) => {
  const stringifiedParams = params ? `?${queryString.stringify(params)}` : '';
  return `/app/${path}${stringifiedParams}`;
};

export const conversationUrl = ({ activeInbox, id, label }) => {
  if (activeInbox) {
    return `accounts/inbox/${activeInbox}/conversations/${id}`;
  }
  if (label) {
    return `accounts/label/${label}/conversations/${id}`;
  }
  return `accounts/conversations/${id}`;
};

export const accountIdFromPathname = pathname => {
  const isInsideAccountScopedURLs = pathname.includes('/app/accounts');
  const urlParam = pathname.split('/')[3];
  // eslint-disable-next-line no-restricted-globals
  const isScoped = isInsideAccountScopedURLs && !isNaN(urlParam);
  const accountId = isScoped ? Number(urlParam) : '';
  return accountId;
};

export const subdomainFromHost = host => {
  return host.split('.')[0];
};
