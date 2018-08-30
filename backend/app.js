var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const { DocumentStore } = require("ravendb");
const store = new DocumentStore("http://localhost:8080", "db_parking");
store.findCollectionNameForObjectLiteral = doc => {
  return doc["collection"] || null;
};
store.initialize();
const session = store.openSession();

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Add parking area
app.use("/addParkingArea", async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  data = req.body;
  let parking_area = {
    collection: "ParkingArea",
    name: data.name,
    weekday_rate: data.weekday_rate,
    weekend_rate: data.weekend_rate,
    discount_rate: data.discount_rate,
    image: data.image
  };

  await session.store(parking_area, "ParkingArea/");
  await session.saveChanges();

  let result = await session.load(parking_area.id);

  res.status(200);
  res.type("application/json");
  res.send(result);
});

//Get parking area
app.use("/getParkingArea", async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const query = await session.query({ collection: "ParkingArea" }).all();

  res.status(200);
  res.type("application/json");
  res.send(query);
});

//Edit parking area
app.use("/editParkingArea", async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");

  data = req.body;

  let product = await session.load(data.id);
  product.name = data.name;
  product.weekday_rate = data.weekday_rate;
  product.weekend_rate = data.weekend_rate;
  product.discount_rate = data.discount_rate;
  product.image = data.image;

  await session.saveChanges();
  product = await session.load(data.id);

  res.status(200);
  res.type("application/json");
  res.send(product);
});

//Delete parking area
app.use("/delParkingArea", async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");

  data = req.body;

  let product = await session.load(data.id);
  await session.delete(product);
  await session.saveChanges();

  product = await session.load(data.id);

  res.status(200);
  res.type("application/json");
  res.send(data.id);
});

//Pay
app.use("/payParkingArea", async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");

  data = req.body;
  console.log(data);

  let pay = {
    collection: "Pay",
    parking_area_id: data.id,
    start_date: data.start_date,
    start_time: data.start_time,
    end_date: data.end_date,
    end_time: data.end_time,
    pay_amount: data.pay_amount
  };

  await session.store(pay, "Pay/");
  await session.saveChanges();

  let result = await session.load(pay.id);

  res.status(200);
  res.type("application/json");
  res.send(result);
});

//Get Book List
app.use("/getBookList", async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const query = await session.query({ collection: "Pay" }).all();

  res.status(200);
  res.type("application/json");
  res.send(query);
});

//Delete book list
app.use("/delBookList", async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");

  data = req.body;
  console.log(data);

  let book = await session.load(data.id);
  await session.delete(book);
  await session.saveChanges();

  book = await session.load(data.id);

  res.status(200);
  res.type("application/json");
  res.send(data.id);
});

module.exports = app;
