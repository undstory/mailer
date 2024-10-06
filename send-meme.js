require('dotenv').config();
const axios = require('axios')
const nodemailer = require('nodemailer')
const cron = require('node-cron')

const apiKey = process.env.API_KEY

async function getMeme() {

    try {
        const response = await axios.get(`https://api.humorapi.com/memes/random?api-key=${apiKey}&keywords=men,women&keywords-in-image=false&min-rating=9&media-type=png`)
        console.log(response);
        const url = response.data.url;
        return url;

    } catch (error) {
        console.log("Sorry, we have an error: ", error);
        return null;
    }
}

async function sendDailyEmail () {
    const getRandomMeme = await getMeme()
    if(!getRandomMeme){
        console.log("Something went wrong");
        return;
    }

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

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Everything went well ", info.response)
    } catch (error) {
        console.error('Huston, we have an isssue: ', error)
    }
}

sendDailyEmail();
