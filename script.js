    let btn_start = document.querySelector('.btn_start')
    let body = document.querySelector('body')
    let canvas = document.querySelector('.canvas')
    let board = document.querySelector('.board')
    let paint_btn = document.querySelector('.draw')
    let eraser_btn = document.querySelector('.del')
    let reset_btn = document.querySelector('.reset')
    let fill_btn = document.querySelector('.fill')
    let save_btn = document.querySelector('.save')
    let color_select = document.querySelector('.color')
   
    let current_color = "#000000" 
    let isErasing = false  //не стираем
    let isMousedown = false //не рисуем

    color_select.addEventListener('input', function(){
        isErasing = false  
        current_color = color_select.value       
    })
    
    paint_btn.addEventListener('click', function(){
        isErasing = false
        isMousedown = true
    })
    eraser_btn.addEventListener('click', function(){
        isErasing = true
    })

    let canvas_animation = document.querySelector('#myCanvas')

    body.addEventListener('click', function(){
        canvas_animation.style.display = 'none'
        const script = document.querySelector('script[src="scriptanime.js"]');
        if (script) script.remove();
        canvas.style.display = 'flex'
            createBoard()
            anime({
            targets:body,
            backgroundColor:'#ffffff',
            duration:2000,
            easing:'linear'
        })

    })

    function createBoard(){         // создать
        board.innerHTML = ''
        for (let i = 0; i < 900; i++){
            let cell = document.createElement('div')
            cell.classList.add('cell')
            board.appendChild(cell)

            
                cell.addEventListener('mousedown', function(){
                    if(isMousedown){
                    cell.style.backgroundColor = isErasing ? 'white' : current_color
                    }
            })            
        }
        let save_picture = JSON.parse(localStorage.getItem('pixel'))
        if (save_picture){
            save_btn.style.backgroundColor = '#95F3DC'
            let cells = document.querySelectorAll('.cell')
            cells.forEach((cell, index) => {
                cell.style.backgroundColor = save_picture[index]
            })
        }
    }

    document.addEventListener('mousedown', function(){
        document.addEventListener('mouseover', paint)
    })

    document.addEventListener('mouseup', function(){
        document.removeEventListener('mouseover', paint)
    })

    function paint(e){
        if (!isMousedown) return
        if (e.target.classList.contains('cell')){
            e.target.style.backgroundColor = isErasing ? 'white' : current_color
        }
    }


    reset_btn.addEventListener('click', function(){
        save_btn.style.backgroundColor = 'transparent'
        window.localStorage.removeItem('pixel') 
        let cells = document.querySelectorAll('.cell')
         cells.forEach(cell => {
        anime({
            targets: cell,
            backgroundColor: '#fff',
            duration: 500,
            easing: 'linear',
            delay: (item, index) => index*5
        })
       });
    })

    fill_btn.addEventListener('click', function(){
        let cells = document.querySelectorAll('.cell')
        anime({
            targets: cells,
            backgroundColor: current_color,
            duration: 500,
            easing: 'linear',
            delay: (item, index) => index*3

        })
    })

    save_btn.addEventListener('click', function(){
        save_btn.style.backgroundColor = '#95F3DC'
        let cell_colors = []
        let cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            cell_colors.push(cell.style.backgroundColor || 'white') 
        })
        localStorage.setItem('pixel', JSON.stringify(cell_colors))
    })

    document.addEventListener('click', function (e){
        console.log(e.pageX)
        
    })