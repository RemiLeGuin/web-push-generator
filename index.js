const compression = require("compression");
const helmet = require("helmet");
var express = require("express");
var webPush = require("web-push");
const bodyParser = require("body-parser");
var app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3002;
const DIST_DIR = "./dist";
app.use(express.static(DIST_DIR));

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});

app.post("/sendNotification", (req, res) => {
    var endpoint = req.body.endpoint;
    var p256dh = req.body.p256dh;
    var auth = req.body.auth;

    var vapidPublicKey = req.body.vapidPublicKey;
    var vapidPrivateKey = req.body.vapidPrivateKey;

    var pushSubscription = {
        endpoint: endpoint,
        expirationTime: null,
        keys: {
            p256dh: p256dh,
            auth: auth,
        },
    };

    var payload = req.body.payload;

    var options = {
        vapidDetails: {
            subject: "mailto:remileguin@live.fr",
            publicKey: vapidPublicKey,
            privateKey: vapidPrivateKey,
        },
        TTL: 60,
    };

    res.status(201).send(webPush.sendNotification(pushSubscription, payload, options));
});

app.post("/sendNotifications", (req, res) => {
    const subscriptions = req.body.subscriptions;
    const payloads = req.body.payloads;
    const options = {
        vapidDetails: {
            subject: "mailto:remileguin@live.fr",
            publicKey: req.body.vapidPublicKey,
            privateKey: req.body.vapidPrivateKey,
        },
        TTL: 60,
    };

    payloads.forEach((payload) => {
        subscriptions.forEach((subscription) => {
            var pushSubscription = {
                endpoint: subscription.endpoint,
                expirationTime: null,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth,
                },
            };
            webPush.sendNotification(pushSubscription, payload, options);
        });
    });
    res.status(201).send('Notifications sent');
});