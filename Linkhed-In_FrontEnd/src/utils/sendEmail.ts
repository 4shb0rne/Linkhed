import emailjs from "@emailjs/browser";

const sendEmail = (message: string, email: string) => {
  const templateParams = {
    message: message,
    email: email,
  };
  emailjs.init("F6CyNGT3ww2wBRGcE");
  emailjs.send("service_zjfg78i", "template_a3xxt1q", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
};
export default sendEmail;
