const mongoose = require("mongoose");
const dotenv = require("dotenv");
const products = require("./data/product");
const User = require("./model/user.model");
const Product = require("./model/product.model");
const Cart = require("./model/cart.model");

dotenv.config();

//connect DB
mongoose.connect(process.env.MONGO_URL);

const seedData = async () => {
  try {
    // clear the previous data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //create a default admin user

    const createUser = await User.create({
      name: "Ashpak Andewadi",
      email: "ashpakandewadi@gmail.com",
      password: "ashpak027",
      role: "admin",
    });

    //Assign default product Id to each product
    const userId = createUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    //Insert into database
    await Product.insertMany(sampleProducts);
    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data", error);
    process.exit(1);
  }
};


seedData();
