const cheerio = require('cheerio')
const request = require('request')
const path = require('path')

const fs = require('fs')

module.exports = (app, Celeb) => {
    app.get('/api/image/:name', (req,res) => {
        const {name} = req.params
        console.log(name)
        res.sendFile(path.join(__dirname,`./../client/images/${name}.jpg`))
    })
    app.get('/api/leaderboard',(req,res) => {
        Celeb.find({}).sort({'ratio':-1}).limit(10).exec(function(err, results){
            const r = []
            r.push(results)
            Celeb.find({}).sort({'ratio':1}).limit(10).exec(function(err, results){
                r.push(results)
                // console.log(r)
                res.send(r)
            })
        })
    })
    app.get('/api/vote', (req,res) => {
        Celeb.count().exec(function(err, count) {
            const two = []
            let r = Math.floor(Math.random() * count)
            Celeb.findOne().skip(r).exec(
                function(err, result){
                    two.push(result)
                    let r = Math.floor(Math.random() * count)
                    Celeb.findOne().skip(r).exec(
                        function(err, result) {
                            two.push(result)
                            res.send(two)
                        }
                    )
                }
            )
        })
    })
    app.post('/api/vote', (req,res) => {
        console.log(req.body)
        const name1 = req.body[0][0]
        const name2 = req.body[1][0]
        const guess = req.body[0][1] == 'win' ? 1 : 2
        Celeb.findOneAndUpdate({name:name1},{$inc: {
            [req.body[0][1] == 'win' ? 'yes' : 'no']:1
        }}).exec(function(err, result){
            // console.log(result)
        })
        var ratio1, ratio2
        (async () => {
            ratio1 = await Celeb.find({name:name1}).then(d => {
                d = d[0]
                const ratio = d.yes / (d.yes + d.no)
                console.log(ratio)
                Celeb.findOneAndUpdate({name:name1},{ratio:ratio})
                    .then(d => console.log(''))
                return ratio
            })
            ratio2 = await Celeb.find({name:name2}).then(d => {
                d = d[0]
                const ratio = d.yes / (d.yes + d.no)
                console.log(ratio)
                Celeb.findOneAndUpdate({name:name2},{ratio:ratio})
                    .then(d => console.log(''))
                return ratio
            })
            //console.log('ratios', ratio1, ratio2)
            if(ratio1 == ratio2){ res.send('tie'); return }
            const winner = ratio1 > ratio2 ? 1 : 2
            //console.log('winner', winner)
            res.send(winner == guess ? 'correct' : 'wrong' )
        })().catch(err => console.log(err))
        Celeb.findOneAndUpdate({name:name2},{$inc:{
            [req.body[1][1] == 'win' ? 'yes' : 'no']:1
        }}).exec(function(err,result){
            // console.log(result)
        })
    })
    saveImg = (img, name) => {
        const imgPath = name.replace(/\s/g,'_')
        console.log(imgPath)
        .on('error', err => console.log(err))
        request(img)
            .pipe(fs.createWriteStream(`./client/images/${name.replace(/\s/g,'_')}.jpg`))
    }
    app.get('/api/api-refresh', (req,res) => {
        // res.send('asdf')
        Celeb.update({},{'ratio':0},{multi:true})
            .then(d => {res.send(d); console.log(d)})
            .catch(err => {res.send(err); console.log(err)})
        // request('https://www.usmagazine.com/celebrities/a/', (err, response, body) => {
        //     const $ = cheerio.load(body)
        //     $('ul.celebrity-listing > li').each(function(i,e){
        //         const name = $(this).find('.celebrity-name').text()
        //         const img = $(this).find('img').attr('src').split('?')[0]
        //         // saveImg(img,name)
        //         Celeb.find({name:name})
        //             .then(d => {
        //                 if(d.length){ return }
        //                 const c = new Celeb({name:name})
        //                 // c.save()
        //             })
        //             .catch(err => console.log(err))
        //     })
        // })
    })

}