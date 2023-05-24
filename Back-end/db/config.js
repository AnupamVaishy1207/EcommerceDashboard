const mongoose = require("mongoose");
const DB =
    "mongodb+srv://anupamvaishy1207:Anupam1207@cluster0.mwfm8qa.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose
    .connect(DB, {
        useNewUrlParser: true,

        useUnifiedTopology: true,

    })
    .then(() => {
        console.log(`connection successfull`);
    })
    .catch((err) => console.log(`no connection`));