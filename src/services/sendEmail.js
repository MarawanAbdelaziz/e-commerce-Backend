import nodemailer from "nodemailer";

export const htmlEmailVerify = (link, name) => {
  const greeting = name ? `Hello ${name},` : "Welcome back,";

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 420px;
                    width: 100%;
                }

                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    border-radius: 8px 8px 0 0;
                    margin: -20px -20px 20px -20px;
                }

                h1, h2 {
                    margin: 0;
                }

                h2 {
                    color: #333;
                    font-size: 20px;
                    margin: 10px 0 20px 0;
                }

                p {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }

                a {
                    color: #4CAF50; /* Set the color to match your design */
                    text-decoration: none; /* Remove underline */
                }

                .token {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    font-size: 18px;
                    border-radius: 4px;
                    text-decoration: none;
                    margin: 20px 0;
                }

                .footer {
                    color: #999;
                    font-size: 12px;
                }

                @media only screen and (max-width: 600px) {
                    body {
                        padding: 20px;
                        height: auto;
                    }
                    
                    .container {
                        padding: 15px;
                        max-width: 100%;
                        box-shadow: none;
                    }

                    h2 {
                        font-size: 18px;
                    }

                    .token {
                        font-size: 16px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                <div class="content">
                    <h2>${greeting}</h2>
                    <p>Please use the following token to verify your email address:</p>
                    <a href="${link}" class="token">Verify Email</a>
                    <p>If you did not request this email, please ignore it.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Marawan Abdelaziz. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Marawan.abdelaziz33@gmail.com",
      pass: "gdixqasgrmaojlxq",
    },
  });

  const info = await transporter.sendMail({
    from: '"OTP code" <Marawan.abdelaziz33@gmail.com>',
    to: to,
    subject: subject || "Hello ✔",
    html: html || "<b>Hello world?</b>",
  });

  return info;
};

export default sendMail;
