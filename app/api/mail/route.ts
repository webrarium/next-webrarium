import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, name, message, honeypot, startedAt } = await request.json();

  if (honeypot) {
    return NextResponse.json({ error: "Rejected" }, { status: 400 });
  }
  if (
    typeof name !== "string" || !name.trim() || name.length > 200 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" || !message.trim() || message.length > 5000
  ) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  // Bots usually submit instantly; a person needs a few seconds to fill in the form.
  if (typeof startedAt !== "number" || Date.now() - startedAt < 3000) {
    return NextResponse.json({ error: "Too fast" }, { status: 400 });
  }
  // Links are the main payload of contact-form spam.
  if ((message.match(/https?:\/\//g) || []).length > 3) {
    return NextResponse.json({ error: "Too many links" }, { status: 400 });
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    replyTo: email,
    subject: `Message from ${name.slice(0, 100)} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
