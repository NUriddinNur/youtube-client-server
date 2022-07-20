const express = require('express')
const PORT = process.env.PORT || 4000
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
    res.render = (htmlFileName) => {
        res.sendFile(path.join(app.get('views'), htmlFileName + '.html'))
    }
    next()
})

app.get('/login', (req, res) => res.render('login'))
app.get('/', (req, res) => res.render('index'))
app.get('/register', (req, res) => res.render('register'))
app.get('/admin', (req, res) => res.render('admin'))

app.listen(PORT, () => console.log('server is ready at http://localhost:' + PORT))