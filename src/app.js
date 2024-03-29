const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 8000;

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../partials");

// Setup Handlebar engine and view location
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather Saga",
		name: "Gunjan Raj Tiwari",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Gunjan Raj Tiwari",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		message: "For any help you can mail me at: roarout20@gmail.com",
		name: "Gunjan Raj Tiwari",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Address must be provided.",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(
				latitude,
				longitude,
				(
					error,
					{
						type,
						description,
						temp,
						minTemp,
						maxTemp,
						pressure,
						humidity,
						clouds,
						dew,
					}
				) => {
					if (error) {
						return res.send({ error });
					}
					return res.send({
						location,
						type,
						description,
						temp,
						minTemp,
						maxTemp,
						pressure,
						humidity,
						clouds,
						dew,
					});
				}
			);
		}
	);
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Gunjan Raj Tiwari",
		message: "For any help you can mail me at: roarout20@gmail.com",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Gunjan Raj Tiwari",
		message: "Page not found.",
	});
});

app.listen(port, () => {
	console.log("Server is up on port " + port);
});
