import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Marawan.abdelaziz33@gmail.com",
      pass: "gdixqasgrmaojlxq",
    },
  });

  const info = await transporter.sendMail({
    from: '"OTP code from Job Search App" <Marawan.abdelaziz33@gmail.com>',
    to: to,
    subject: subject ? subject : "Hello ✔",
    html: html ? html : "<b>Hello world?</b>",
  });

  return info;
};

export default sendMail;
