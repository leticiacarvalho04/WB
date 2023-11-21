import express from 'express'

const app = express()
const router = require('../routes/index.ts')

app.use(router)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Express server is listening at http://localhost:${PORT}`);
});