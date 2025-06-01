const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: asunto,
        text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el correo', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});