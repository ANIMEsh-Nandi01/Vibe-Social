const mongoose = require('mongoose');

const uri = "mongodb+srv://nandiani76817_db_user:social123@cluster0.5qaxesg.mongodb.net/social_app?appName=Cluster0";

console.log("Attempting to connect to:", uri.replace(/:([^:@]+)@/, ':****@'));

mongoose.connect(uri)
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ ERROR: Connection failed");
        console.error("Name:", err.name);
        console.error("Code:", err.code);
        console.error("CodeName:", err.codeName);
        console.error("Message:", err.message);
        process.exit(1);
    });
