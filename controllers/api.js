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
        function updateCeleb () {
            Celeb.findOneAndUpdate({name:name1},{$inc: {
                [req.body[0][1] == 'win' ? 'yes' : 'no']:1
            }}).exec(function(err, result){
                // console.log(result)
            })
        }
        function updateCelebWin () {
            Celeb.findOneAndUpdate({name:name2},{$inc:{
                [req.body[1][1] == 'win' ? 'yes' : 'no']:1
            }}).exec(function(err,result){
                // console.log(result)
            })
        }
        updateCeleb()
        updateCelebWin()
        var ratio1, ratio2

        const promise = new Promise((resolve, reject) => {
            Celeb.find({name:name1}).then(d => {
                d = d[0]
                const ratio = d.yes / (d.yes + d.no)
                console.log(ratio)
                Celeb.findOneAndUpdate({name:name1},{ratio:ratio})
                    .then(() => resolve(ratio))
                    .catch(reject)
                return ratio
            })
        });

        const promise2 = new Promise((resolve, reject) => {
            Celeb.find({name:name2}).then(d => {
                d = d[0]
                const ratio = d.yes / (d.yes + d.no)
                console.log(ratio)
                Celeb.findOneAndUpdate({name:name2},{ratio:ratio})
                    .then(() => resolve(ratio))
                    .catch(reject)
            })
        })

        Promise.all([promise, promise2]).then(data => {
            const ratio1 = data[0]
            const ratio2 = data[1]
            if(ratio1 == ratio2){ res.send('tie'); return }
            const winner = ratio1 > ratio2 ? 1 : 2
            res.send(winner == guess ? 'correct' : 'wrong' )
        })

        
    })
    saveImg = (img, name) => {
        const imgPath = name.replace(/\s/g,'_')
        //.on('error', err => console.log(err))
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
    app.get('/api/api-refresh-muppets', (req, res) => {
        request('https://muppet.fandom.com/wiki/Category:Sesame_Street_Characters', (err, response, body) => {
            const $ = cheerio.load(body)
            $('li.category-page__trending-page').each( function (i,e) {
                const name = $(this).find('.category-page__trending-page-title').text()
                const image = $(this).find('img').attr('src')
                console.log($(this).html())
                console.log(name, image)
                saveImg(image, name)
                Celeb.find({name:name})
                    .then(d => {
                        if(d.length){return}
                        const celeb = new Celeb({name:name})
                        celeb.save()
                    })
                    .catch(err => console.log(err))
            } )
        })
    })

}