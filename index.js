var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')
var $gameOver = document.querySelector('#gameoyertitle')
hide($gameOver)
$game.style.borderRadius = '10px'
$resultHeader.style.fontFamily = 'Roboto'
$timeHeader.style.fontFamily = 'Roboto'
$gameOver.style.fontFamily = 'Roboto'

var box = document.createElement('div')
const gameOverTitle = document.createElement('div')

var score = 0
var isGameStarted = false
var interval
// var trueFalse = 1

$start.addEventListener('click', startgame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)
gameOverTitle.addEventListener('click', () => {
    $gameTime.value = 5
    gameOverTitle.remove()
    $time.textContent = '5.0'
    $game.style.backgroundColor = '#ccc'
    hide($gameOver)
    show($timeHeader)
    show($start)
    $gameTime.removeAttribute('disabled')
}) 


var colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

function colorPicker() {
    var color = ''
    for(var i = 0; i < 6; i++ ) {
        var randomIndex = getRandom(0, 15)
        var hexindex = (colors[randomIndex]).toString()
        color += hexindex
    }
    return color
}

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startgame() {
    score = 0
    setGameTime()
    hide($gameOver)
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)
    interval = setInterval(function() {
        var time = parseFloat($time.textContent)
        
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
       }
    }, 100)
    
    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    show($start)
    $game.innerHTML = ''
    $gameTime.removeAttribute('disabled')
    setGameScore()
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    
}

function handleBoxClick(event) {
    if(!isGameStarted) {
        return
    }
    
    if(event.target.dataset.box) {
        score++
        renderBox()
    }
    if (event.target.classList.contains('game')) {
        renderGameOver()
    }
    
}


function renderGameOver() {
    console.log('Click on game')
    hide($timeHeader)
    $game.innerHTML = ''
    show($gameOver)
    $game.style.backgroundColor = 'red'
    gameOverTitle.textContent = 'Нажмите чтобы начать с начала'
    gameOverTitle.style.backgroundColor = '#ccc'
    gameOverTitle.style.fontFamily = 'Roboto'
    gameOverTitle.style.fontSize = '30px'
    gameOverTitle.style.fontWeight = 'bold'
    gameOverTitle.style.textAlign = 'center'
    gameOverTitle.style.padding = '15px 0'
    gameOverTitle.style.borderRadius = '10px'
    // gameOverTitle.setAttribute('data-title', 'true')
    gameOverTitle.style.cursor = 'pointer'
    $game.append(gameOverTitle)
    clearInterval(interval)
}


function renderBox() {
    $game.innerHTML = ''
    
    var boxSize = getRandom(30, 100)
    var boxSize2 = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize2
    var hexcolor = '#' + colorPicker()
    
    box.style.height = boxSize + 'px'
    box.style.width = boxSize2 + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = hexcolor
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.style.borderRadius = '10px'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}