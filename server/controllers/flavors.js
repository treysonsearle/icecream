module.exports = {
  readFlavors: async (req, res) => {
    // console.log('session.user ' + req.session.user.id)
    // let { id } = req.session.user;
    // let { mine, search, oldest } = req.query;
    const db = await req.app.get('db')
    db.flavor.read_all_flavors()
      .then(flavor => res.status(200).send(flavor))

  },
  createFlavor: async (req, res) => {
    const { flavorName, flavors, addIns, price } = req.body;
    let [flavor1, flavor2, flavor3] = flavors
    let [addIn1, addIn2, addIn3] = addIns
    const { id } = req.session.user
    const db = req.app.get('db')
    const date_created = new Date
    if (!id) {
      return res.sendStatus(403);
    }
    const [flavor] = await db.flavor.create_flavor([id, flavorName, flavor1, flavor2, flavor3, addIn1, addIn2, addIn3, price, date_created])
    return res.status(200).send(flavor)

  },
  readFlavor: (req, res) => {
    req.app.get('db').flavor.read_flavor(+req.params.id)
      .then(flavor => flavor[0] ? res.status(200).send(flavor[0]) : res.status(200).send({}))
  },
  deleteFlavor: (req, res) => {
    req.app.get('db').flavor.delete_flavor(+req.params.id)
      .then(_ => res.sendStatus(200))
  },
  updateFlavor: (req, res) => {
    const { id, author_id, product, price } = req.body
    const db = req.app.get('db');
    const date_created = new Date
    const { params, query } = req;

    db.flavor.update_flavor([params.id, query.desc])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "Hello there" });
        console.log(err)
      });
  },
}