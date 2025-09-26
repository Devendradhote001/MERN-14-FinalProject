import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ddhote780@gmail.com",
    pass: "lxbtuydurvqjqulp",
  },
});

export const sendMail = async (to, subject, htmlContent) => {
  let info = {
    from: "ddhote780@gmail",
    to,
    subject,
    html: htmlContent,
  };

  return await transporter.sendMail(info);
};
