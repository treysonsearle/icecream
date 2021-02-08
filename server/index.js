require("dotenv").config();


const express = require('express');
const Stripe = require('stripe')
const stripe = Stripe("sk_test_51IGYRdBdX1pC86gACcwVxT4ViMJoNCYlQ2tyFJffRcQx8aSYF3TeOxu4AApIM6HsSLZ6kHTzBWEfYBlf9E3QqPON00PhxzI99t")
const { v4: uuidv4 } = require("uuid");
const session = require('express-session');
const massive = require("massive");
const userCtrl = require('./controllers/user')
const flavorCtrl = require('./controllers/flavors')
const bagCtrl = require('./controllers/bag')

const PORT = process.env.SERVER_PORT


const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());



massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(db => {
    app.set("db", db);
    console.log('im working')
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
  })
)

app.post('/api/login/register', userCtrl.register_user);
app.post('/api/login/login', userCtrl.login);
app.get('/api/login/me', userCtrl.getUser);
app.post('/api/login/logout', userCtrl.logout);



app.post('/api/flavor', flavorCtrl.createFlavor);
app.get('/api/flavors', flavorCtrl.readFlavors);
app.get('/api/flavor/:id', flavorCtrl.readFlavor);
app.delete('/api/flavor/:id', flavorCtrl.deleteFlavor)
// app.put('/api/flavor/:id', flavorCtrl.updateFlavor);


app.post('/api/bag', bagCtrl.createBag);
// app.put('/api/bag/:id', bagCtrl.UpdateBag);
app.post('/api/bag_list', bagCtrl.createBagList)
// app.get('/api/bag_list/:id', bagCtrl.readBagList)
app.get(`/api/orderedFlavors/:id`, bagCtrl.getOrderedFlavors)
app.delete(`/api/bag/:id`, bagCtrl.deleteBag);
app.delete(`/api/bagList/:id`, bagCtrl.deleteBagList);


//stripe
app.post("/api/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { token, price } = req.body;

    console.log(token)
    console.log(price)
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuidv4();
    console.log(idempotency_key)
    const charge = await stripe.charges.create(
      {
        amount: price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${price}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  res.json({ error, status });
});


app.listen(PORT, _ => console.log(`running on ${PORT}`));