const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Sisteme kaydınız yapılmıştır!<br><br></h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("istek geldi");
  let user = req.body;
  console.log(user.emailAddress);
  sendMail(user, info => {
    console.log(`Mail gönderildi ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Kayıt Tamam"<example.gimail.com>', // sender address
    to: user.emailAddress, // list of receivers
    subject: "Sisteme Kaydınız Tamamlandı", // Subject line
    html: `<h1>Merhaba sisteme giriş yapabilmek için şifreniz: ${user.password}</h1><br>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

//sendMail().catch(console.error);
