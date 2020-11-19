class Ghost {
    constructor(name, startIndex, speed) {
        this.name = name
        this.startIndex = startIndex
        this.speed = speed
        this.enemyCurrentIndex = startIndex
        this.timerId = NaN
        this.isScared = false;
    }
}

ghosts = [
    new Ghost('blinky', 349, 250),
    new Ghost('pinky', 377, 500),
    new Ghost('inky',350, 300),
    new Ghost('clyde',378, 500)    
]

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28
    let score = 0

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,1,1,2,2,1,1,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

// 0 - pac-dot
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const squares = []

function createBoard() {
    for(var i = 0; i < layout.length ; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}

createBoard()

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pac-man')

function movePacMan(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    
    switch(e.keyCode) {
        case 37 :
            if(squares[pacmanCurrentIndex-1].classList.contains('wall')) break
            if(pacmanCurrentIndex % width != 0) pacmanCurrentIndex -= 1
            break
        case 38 :
            if(squares[pacmanCurrentIndex-width].classList.contains('wall')) break
            if(pacmanCurrentIndex - width > 0) pacmanCurrentIndex -= width
            break
        case 39 :
            if(squares[pacmanCurrentIndex+1].classList.contains('wall')) break
            if(pacmanCurrentIndex % width < width - 1) pacmanCurrentIndex += 1
            break
        case 40 :
            if(squares[pacmanCurrentIndex+width].classList.contains('wall')) break
            if(pacmanCurrentIndex + width < width*width) pacmanCurrentIndex += width
            break
    }

    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacdotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
}

// pacdotEaten
function pacdotEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score += 1
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

// powerPelletEaten
function powerPelletEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score += 5
        scoreDisplay.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScaredGhost, 10000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}
// Ghosts when times out, they should be unscared 
function unScaredGhost() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// checkForGameOver
function checkForGameOver() {
    if(squares[pacmanCurrentIndex].classList.contains('ghost') && 
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacMan)
        setTimeout(function(){alert(`Game Over! Score is ${score}`)}, 500)
    }
}
// checkForWin
function checkForWin() {
    if(score > 450) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacMan)
        alert(`You Won!`)
    }
    // programming close
}

document.addEventListener('keyup', movePacMan)


ghosts.forEach(ghost => {
    squares[ghost.enemyCurrentIndex].classList.add(ghost.name)
    squares[ghost.enemyCurrentIndex].classList.add('ghost')
});

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random()*directions.length)]

    ghost.timerId = setInterval(() => {
        if(!squares[ghost.enemyCurrentIndex + direction].classList.contains('wall') && 
        !squares[ghost.enemyCurrentIndex + direction].classList.contains('ghost')) {
            squares[ghost.enemyCurrentIndex].classList.remove(ghost.name, 'ghost', 'scared-ghost')
            ghost.enemyCurrentIndex += direction
            squares[ghost.enemyCurrentIndex].classList.add(ghost.name, 'ghost')
        } else direction = directions[Math.floor(Math.random()*directions.length)]

        if(ghost.isScared) {
            squares[ghost.enemyCurrentIndex].classList.add('scared-ghost')
        }

        if(ghost.isScared && squares[ghost.enemyCurrentIndex].classList.contains('pac-man')) {
            squares[ghost.enemyCurrentIndex].classList.remove(ghost.name, 'ghost', 'scared-ghost')
            ghost.enemyCurrentIndex = ghost.startIndex
            score += 100
            scoreDisplay.innerHTML = score
            squares[ghost.enemyCurrentIndex].classList.add(ghost.name, 'ghost')
        }
        checkForWin()
        checkForGameOver()
    }, ghost.speed)
}
})