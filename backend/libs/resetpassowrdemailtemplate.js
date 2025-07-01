export const resetPasswordEmailTemplate = (displayName, resetLink) => {
  return `
    <h2>Password Reset Request</h2>
    <p>Hello ${displayName || 'User'},</p>
    <p>We received a request to reset your password.</p>
    <p>
      Click the link below to reset your password:<br/>
      <a href="${resetLink}" target="_blank">Click On Reset Password</a>
    </p>
    <p>If you did not request this, please ignore this email.</p>
  `;
};
