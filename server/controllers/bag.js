const e = require("express");

module.exports = {
  createBag: async (req, res) => {
    console.log('session.user.bag_id ' + req.session.user.bagId)
    if (req.session.user.bagId === -1) {
      // const { checked_out } = req.body;
      const { id } = req.session.user;
      const db = req.app.get('db')
      const date_created = new Date
      if (!id) {
        return res.sendStatus(403);
      }
      const [bag] = await db.bag.create_bag([id, date_created])
      console.log(bag)
      req.session.user.bag = bag
      return res.status(200).send(bag)
    } else {
      return res.sendStatus(403);
    }


  },
  readBag: (req, res) => {
    req.app.get('db').bag.read_bag(req.params.id)
      .then(bag => bag[0] ? res.status(200).send(bag[0]) : res.status(200).send({}))
  },
  createBagList: (req, res) => {
    const db = req.app.get('db')
    const { bag_id, flavor_id } = req.body

    db.bag.create_bag_list([bag_id, flavor_id])
      .then(bag => res.status(200).send(bag)

      )
  },
  getOrderedFlavors: (req, res) => {
    req.app.get('db').bag.read_bag_list(+req.params.id)
      .then(bag => res.status(200).send(bag))
  },
  deleteBag: (req, res) => {
    req.app.get('db').bag.delete_bag(+req.params.id)
      .then(_ => res.sendStatus(200))
  },
  deleteBagList: async (req, res) => {
    const db = req.app.get('db')
    const bagList = await db.bag.delete_bag_list(+req.params.id, +req.session.user.bag.id)
    res.status(200).send(bagList)
  },
  updateBag: (req, res) => {
    req.app.get('db').bag.update_bag(+req.params.id)
      .then(res => res.sendStatus(200))
  }
}