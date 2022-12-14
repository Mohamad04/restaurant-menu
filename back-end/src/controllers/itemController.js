const Item = require("../models/snackItemModel"); // model
const  mongoose  = require("mongoose");


class itemController {
  async getAllMenuItems(req, res) {
    try {
      const menuItems = await Item.find();
      return res.status(200).json({
        menuItems: menuItems,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  async getCategories(req, res) {
    try {
      const menuItems = await Item.find();
      const allCategories = [
        "all",
        ...new Set(menuItems.map((item) => item.category)),
      ];
      return res.status(200).send({
        allCategories,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  async getItem(req, res) {
    try {
      const item = await Item.findById(req.params.item_id);
      return res.status(200).send({
        item,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  async createItem(req, res) {
    try {
    // multer not only gives req.file, but also req.body
      // console.log(req);
      // we can get the image url from multer
      let img;
      if (req.file) {
        // for local hostheroku --version
        const host = req.host;
        // const filePath = req.protocol + "://" + host + ":8080/" + req.file.path;
        // for API 
        const filePath = req.protocol + "://" + host  + "/" + req.file.path;
        // console.log(filePath);
        img = filePath;
      }

      // get the item's details from req.body
      const { title, category, price,  ingrediants } = req.body;

      // Check if the item is in use
      const existingItem = await Item.findOne({ title }).exec();
      if (existingItem) {
        return res.status(400).send({
          message: "Item is already there! use different title",
        });
      }

      // create item's object
      const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        category: category,
        price: price,
        img: img,
        ingrediants: ingrediants,
      });

      const newItem = await new Item(item).save();
      if (!newItem) {
        return res.status(400).send({
          message: "Something went wrong",
        });
      }

      return res.status(200).send({
        created: true,
        newItem,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }


  

  async editItem(req, res) {
    try {
       let img;
       if (req.file) {
         // for local hostheroku --version
         const host = req.host;
         // const filePath = req.protocol + "://" + host + ":8080/" + req.file.path;
         const filePath = req.protocol + "://" + host + "/" + req.file.path;
         // console.log(filePath);
         img = filePath;
       }

        const updatedItem = await Item.updateOne(
          { _id: req.params.item_id },
          {
            $set: {
              title: req.body.title,
              category: req.body.category,
              price: req.body.price,
              img: img,
              ingrediants: req.body.ingrediants,
            },
          }
        );

      return res.status(200).send({
        updatedItem
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }



  async deleteItem(req, res) {
    try {
    
        const removedItem = await Item.deleteOne({ _id: req.params.item_id });

      return res.status(200).send({
        deleted: true,
        message: "removed Successfully"
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }


}

module.exports = new itemController();


