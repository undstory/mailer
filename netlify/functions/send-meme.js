require('dotenv').config();
const axios = require('axios')
const nodemailer = require('nodemailer')


const apiKey = process.env.API_KEY

exports.handler = async function(event, context) {

    try {
        const response = await axios.get(`https://api.humorapi.com/memes/random?api-key=${apiKey}&keywords=men,women&keywords-in-image=false&min-rating=9&media-type=png`)
        console.log(response);
        const url = response.data.url;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'undrul.undrul@gmail.com',
                pass: 'nymvsexziabtjyfw'
            }
        })

        let mailOptions = {
            from: 'undrul.undrul@gmail.com',
            to: 'undstory@gmail.com',
            subject: 'Codziennka dawka uśmiechu',
            html: `
                <h1>Oto Twoja codzienna dawka uśmiechu</h1>
                <img src="getRandomMeme" alt="Random meme" style="width:500px" />
                <p>Pozdrawiam,<br />Agus</p>
            `
        }

        await transporter.sendMail(mailOptions)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email send!"})
        }

    } catch (error) {
        console.log("Sorry, we have an error: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Errorek!"})
        }
    }
}
