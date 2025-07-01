import crypto from 'crypto';

export const getEmailAvatar = (email) => {
  const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
};
