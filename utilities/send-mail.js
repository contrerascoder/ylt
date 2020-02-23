const {API_EMAIL_KEY, API_SECRET_EMAIL_KEY} = require(`../config/vars`)
const mailjet = require(`node-mailjet`).connect(API_EMAIL_KEY, API_SECRET_EMAIL_KEY)

console.log(API_EMAIL_KEY, API_SECRET_EMAIL_KEY)


module.exports = (to, subject, html) => mailjet
    .post(`send`, {'version': `v3.1`})
    .request({
        "Messages": [
            {
                "From": {
                    "Email": `sarmanulco@gmail.com`,
                    "Name": `raul`,
                },
                "To": [
                    {
                        "Email": to,
                    },
                ],
                "Subject": subject,
                "HTMLPart": html,
            },
        ],
    })
