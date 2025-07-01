export const welcomeemailverification =  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to SnapStudy</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      padding-bottom: 20px;
    }

    .header h1 {
      color: #333333;
    }

    .content {
      font-size: 16px;
      color: #555555;
      line-height: 1.6;
    }

    .code-box {
      background-color: #f0f0f0;
      border: 1px dashed #aaa;
      color: #222;
      font-size: 20px;
      font-weight: bold;
      padding: 15px;
      text-align: center;
      margin: 20px 0;
      letter-spacing: 2px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to SnapStudy 👋</h1>
    </div>
    <div class="content">
      <p>Hi <strong>{name}</strong>,</p>
      <p>Thanks for joining SnapStudy! Please verify your email using the code below:</p>
      <p>This code is valid for 10 minutes.</p>
      <p>If you didn't request this, feel free to ignore it.</p>
      <p>— The SnapStudy Team</p>
    </div>
    <div class="footer">
      &copy; 2025 SnapStudy. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
