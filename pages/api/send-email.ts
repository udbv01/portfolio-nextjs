import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
    name: string;
    email: string;
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message }: EmailRequestBody = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Alle Felder sind erforderlich.' });
        }

        // Erstelle Transporter für GMX
        const transporter = nodemailer.createTransport({
            host: 'mail.gmx.net',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMX_EMAIL,
                pass: process.env.GMX_PASSWORD,
            },
        });
        
        transporter.verify((error, success) => {
            if (error) {
                console.error('Transporter-Verifizierung fehlgeschlagen:', error);
            } else {
                console.log('Transporter ist bereit:', success);
            }
        });
        

        try {
            // E-Mail senden
            await transporter.sendMail({
                from: process.env.GMX_EMAIL,
                to: process.env.GMX_EMAIL, // Deine eigene GMX-Adresse für den Empfang
                subject: `Neue Nachricht von ${name}`,
                text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
            });

            res.status(200).json({ success: 'Nachricht wurde gesendet.' });
        } catch (error) {
            console.error('Fehler beim Senden der E-Mail:', error);
            res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}
