const nodemailer = require('nodemailer');
exports.sendEmail = async function (req, res,data) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:  process.env.correo_app,
            pass:  process.env.correo_contrasenia
        }
    });
    var mailOptions = {
        from: process.env.correo_app,
        to: data.correo,
        subject: data.titulo,
        html: data.contenidoHtml
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(502).json({error: "Error al enviar correo electrónico"});
        } else {
           return res.status(200).json({titulo: data.titulo,msj: data.mensajeConfirmacion});
          
        }
    });
};
