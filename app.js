const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

app.use(express.static(path.resolve(__dirname)))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

// app.get('/api/callback', (req, res) => {
// 	const code = req.query.code
// 	console.log('CODE', code)
// 	if (code) {
// 		res.send({
// 			type: 'login',
// 			message: 'Successful login',
// 			data: code
// 		})
// 	} else {
// 		res.send({
// 			type: 'login',
// 			message: 'Unsuccessful login',
// 			data: undefined
// 		})
// 	}
// })

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})
