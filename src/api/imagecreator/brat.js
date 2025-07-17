module.exports = function app(app) {
    app.get('/imagecreator/brat', async (req, res) => {
        try {
            const { text } = req.query
            const pedo = await getBuffer(`https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}&mode=image`)
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': pedo.length
            })
            res.end(pedo)
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`)
        }
    })

    app.get('/imagecreator/bratvideo', async (req, res) => {
        try {
            const { text } = req.query
            const pedo = await getBuffer(`https://fastrestapis.fasturl.cloud/maker/brat/animated?text=${text}&mode=animated`)
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': pedo.length
            })
            res.end(pedo)
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`)
        }
    })
}