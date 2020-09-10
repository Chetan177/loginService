const client = require("./loginClient");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login/", (req, res) => {
	let user = {
		username: req.body.username,
		password: req.body.password
	};

	client.login(user, (err, data) => {
		if (err) throw err;

        console.log("Login Sucessfull", data);
        res.send({
            msg : "Login Sucessfull",
            status: "200"
        })
	});
});

app.post("/signup/", (req, res) => {
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server running at port %d", PORT);
});
