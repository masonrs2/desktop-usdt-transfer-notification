const express = require('express');
const app = express()
const port = 3002
const notifier = require("node-notifier");

app.use(express.json())

app.post('/webhook', (req, res) => {
    const webhook = req.body;

    for(const erc20Transfer of webhook.erc20Transfers) {
        const addr = 
        `${erc20Transfer.to.slice(0,4)}...${erc20Transfer.to.slice(38)}`;
        
        const amount = Number(erc20Transfer.valueWithDecimals).toFixed(0);

        notifier.notify({
            title: "NEW USDT Transfer",
            message: `${addr} just sent \n$${amount}`,
        })
    }

    return res.status(200).json();
})

app.listen(port, () => {
    console.log("Listening to streams")
}) 