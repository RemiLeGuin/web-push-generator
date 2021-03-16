const compression = require('compression');
const helmet = require('helmet');
var express = require('express');
var webPush = require('web-push');
var app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;
const DIST_DIR = './dist';
app.use(express.static(DIST_DIR));

app.listen(PORT, () => {
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}`
    )
});

app.post('/sendNotifications', (req, res) => {
    const payloads = req.body.payloads;
    const subscriptions = req.body.subscriptions;
    webPush.setVapidDetails('mailto:remileguin@live.fr', req.body.vapidPublicKey, req.body.vapidPrivateKey);

    payloads.forEach((payload) => {
        subscriptions.forEach((subscription) => {
            let pushSubscription = {
                endpoint: subscription.endpoint,
                expirationTime: null,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth,
                },
            };
            webPush.sendNotification(pushSubscription, JSON.stringify(payload));
        });
    });
    res.status(201).send('Notifications sent');
});