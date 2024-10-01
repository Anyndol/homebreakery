const express = require('express');
const cors = require('cors');
const session = require('express-session');
const {MongoClient, ObjectId} = require("mongodb");
require('dotenv').config()

const app = express();
const PORT = 3008;

let db;

(async () => {
    const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);
    const conn = await client.connect();
    db = conn.db("homebrewery");
})();

app.use(express.json());
app.use(cors({origin:process.env.APP_URL, credentials: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.post('/login', async (req, res) => {
    console.log(req.session.access_token);
    const {code} = req.body;

    if (code && !req.session.access_token) {
		try {
			const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: process.env.DISCORD_CLIENT_ID,
					client_secret: process.env.DISCORD_SECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: process.env.APP_URL,
					scope: 'identify',
				}).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await tokenResponseData.json();
            if(oauthData.access_token) {
                console.log(oauthData.access_token);
                req.session.access_token = oauthData.access_token;
            }
		} catch (error) {
			console.error(error);
		}
    }
    res.status(200).send("");
});

app.get('/profile', async (req, res) => {
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${req.session.access_token}`,
        },
    });

    if(userResult.status === 401) {
        res.status(401).send();
        return;
    }
    const data = await userResult.json();
    res.send(data);
});

app.get('/adversaries', async (req, res) => {
    const filters = {};
    if(req.query.name)
        filters.name = req.query.name;
    if(req.query.author)
        filters.author = req.query.author;
    if(req.query.menace)
        filters.menace = req.query.menace;
    let collection = await db.collection("adversaries");
    let results;
    if(req.query.id) {
        results = await collection.findOne({...filters, _id: new ObjectId(req.query.id)});
        if(!results)
            res.send("Not found").status(404);
    } else {
        results = await collection.find(filters).toArray();
    }
    res.send(results).status(200);
});

app.get('/species', async (req, res) => {
    const filters = {};
    if(req.query.name)
        filters.name = req.query.name;
    if(req.query.author)
        filters.author = req.query.author;
    if(req.query.size)
        filters.size = req.query.size;
    let collection = await db.collection("species");
    let results;
    if(req.query.id) {
        results = await collection.findOne({...filters, _id: new ObjectId(req.query.id)});
        if(!results)
            res.send("Not found").status(404);
    } else {
        results = await collection.find(filters).toArray();
    }
    res.send(results).status(200);
});

app.post('/adversary', async (req, res) => {
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${req.session.access_token}`,
        },
    });

    if(userResult.status === 401) {
        res.status(401).send();
        return;
    }

    const item = {...req.body};
    const discordUser = await userResult.json();
    item.user_id = discordUser.id;
    item.author = discordUser.username
    let collection = await db.collection("adversaries");
    let result;

    if(item._id) {
        const fieldsToUpdate = {...item};
        delete fieldsToUpdate._id;
        result = await collection.updateOne({_id: new ObjectId(item._id), author: discordUser.username}, updates = {
            $set: {...fieldsToUpdate}
        });
    } else {
        result = await collection.insertOne(item);
    }
    res.send(result).status(204);
});

app.post('/species', async (req, res) => {
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${req.session.access_token}`,
        },
    });

    if(userResult.status === 401) {
        res.status(401).send();
        return;
    }

    const item = {...req.body};
    const discordUser = await userResult.json();
    item.user_id = discordUser.id;
    item.author = discordUser.username
    let collection = await db.collection("species");
    let result;

    if(item._id) {
        const fieldsToUpdate = {...item};
        delete fieldsToUpdate._id;
        result = await collection.updateOne({_id: new ObjectId(item._id), author: discordUser.username}, updates = {
            $set: {...fieldsToUpdate}
        });
    } else {
        result = await collection.insertOne(item);
    }
    res.send(result).status(204);
});

app.delete('/adversary', async (req, res) => {
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${req.session.access_token}`,
        },
    });

    if(userResult.status === 401) {
        res.status(401).send();
        return;
    }
    const discordUser = await userResult.json();

    let collection = await db.collection("adversaries");
    let result = await collection.deleteOne({_id: new ObjectId(req.query.id), author: discordUser.username});
    res.send(result).status(200);
});

app.delete('/species', async (req, res) => {
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${req.session.access_token}`,
        },
    });

    if(userResult.status === 401) {
        res.status(401).send();
        return;
    }
    const discordUser = await userResult.json();

    let collection = await db.collection("species");
    let result = await collection.deleteOne({_id: new ObjectId(req.query.id), author: discordUser.username});
    res.send(result).status(200);
});

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);    
});