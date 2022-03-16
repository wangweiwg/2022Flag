import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.end(
        `
            <html>
                <head>
                    <title>hello</title>
                </head>
            </html>
            <body>
                <h1>hello world</h1>
                <p>ssr</p>
            </body>
        `
    )
})

app.listen(3000, () => {
    console.log('server listen at 3000 port');
})