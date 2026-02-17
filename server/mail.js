const nodemailer = require("nodemailer");
const process = require('process');

async function sent(body) {
  // Create ONE transporter instance and reuse it throughout your application.
  // The transporter manages up to `maxConnections` persistent connections internally.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "stathmaj@gmail.com",
      pass: process.env.pw,
    },
  });

  console.log(body)

  // Send emails using the shared transporter.
  // Do NOT create a new transporter for each message - that defeats the purpose of pooling.
  const info = await transporter.sendMail({
    from: `Миша <stathmaj@gmail.com>`,
    to: "stathmaj@gmail.com",
    subject: "Новый заказ",
    text: "Hello world?", // Plain-text version of the message
    html:`
    <h1>Имя - ${body.name}</h1>
    <br>
    <h1>Email - ${body.email}<h1/>
    <br>
    <h1>Площадь - ${body.square}<h1/>
    <br>
    <h1>Телефон - ${body.phone}
    <br>
    <h1>Тип объекта - ${body.type}
    `,
  });
};

module.exports = sent;
