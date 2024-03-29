'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const LorenIpsum = require('lorem-ipsum').loremIpsum
const port = 3000
const { uuid } = require('uuidv4')

router.use(express.json())
router.use(express.urlencoded({extended: true}))

let DevCop = []

//Create a board with 3 sample notes
router.get("/", function(req, res){
    let board = {
        board_id: uuid(),
        board_notes: [
            {
                "note_id":uuid(),
                "topic": new LorenIpsum(),
                "creation_date": Date.now()
            },
            {
                "note_id":uuid(),
                "topic":new LorenIpsum(),
                "creation_date": Date.now()
            },
            {
                "note_id":uuid(),
                "topic":new LorenIpsum(),
                "creation_date": Date.now()
            }
        ]
    }
    devcop.push(board);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(DevCop));
})

//List all boards in memory
router.get("/board", async(req, res) => {
res.send(JSON.stringify(DevCop))
})

router.get("/board/boardId", async(req,res) => {

    let board_id
    if (!('/board_id' in req.params)){
        board_id = ""
    }
    else {
        board_id = req.params.board_id
    }

    let data = {}
    for (board in DevCop){
        if(DevCop[board] === board_id){
            data = DevCop[board]
        }
    }
    res.send(JSON.stringify(data))
})

router.post('/board', async(req, res) => {
    const boardId = uuid()

    let board = {
        boardId: boardId,
        board_notes: [

        ]
    }
    DevCop.push(board)
    res.send(JSON,stringify(board))
})

router.post('/board/:boardId/note',async(req, res) => {
    let board_id
    if (!('board_id' in req.params)){
        board_id = ""
    }
    else{
        board_id = req.params.board_id
    }

    const textForNote = req.body.note;

    const singleNote = {
                "note_id":uuid(),
                "topic": textForNote,
                "creation_date": Date.now()
    }

    for (board in DevCop){
        if((DevCop[board].board_id) === board_id){
            DevCop[board].notes.push(singleNote)
            res.send(JSON.stringify(DevCop[board]))
        }
    }
})

app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;