const nodemailer = require("nodemailer");
const process = require('process');
const dotenv = require('dotenv');
dotenv.config()

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
  console.log(process.env.pw)

  // Send emails using the shared transporter.
  // Do NOT create a new transporter for each message - that defeats the purpose of pooling.
  const info1 = await transporter.sendMail({
    from: `Миша <stathmaj@gmail.com>`,
    to: "Vlbelotserkovets@gmail.com",
    subject: "Тест",
    text: "Тест", // Plain-text version of the message
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

  const info2 = await transporter.sendMail({
    from: `Миша <stathmaj@gmail.com>`,
    to: "stathmaj@gmail.com",
    subject: "Тест",
    text: "Тест", // Plain-text version of the message
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
