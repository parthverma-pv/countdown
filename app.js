$(function(){
    let hourval = 0;
    let minuteval = 0;
    let secondval = 0;
    let pausehrs = 0;
    let pausemins = 0;
    let pausesecs = 0;
    var target;
    var remain;
    (function (){
        for(let i = 0 ; i<24 ; i++){
            item = document.createElement('li');
            item.textContent = i;
            $('#hours .list').append(item);
        }
        for(let i = 0 ; i<60 ; i++){
            item = document.createElement('li');
            item.textContent = i;
            $('#minutes .list').append(item);
        }
        for(let i = 0 ; i<60 ; i++){
            item = document.createElement('li');
            item.textContent = i;
            $('#seconds .list').append(item);
        }
    })();

    function updateCount(){
        var current = new Date().getTime();
        const remaining = target - current + 1000;
        remain = remaining;
        const hours = padzero(Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = padzero(Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = padzero(Math.floor((remaining % (1000 * 60)) / 1000));
        $('#main-display').text(`${hours}:${minutes}:${seconds}`)
        if(remaining <=1000){
            pauseCount();
            $('#main-display').css('color','red');
            return;
        }  

        
    }

    function padzero(num){
        return num.toString().padStart(2,'0');
    }

    function startCount(){
        let currDate = new Date();
        let currhrs = parseInt(currDate.getHours());
        let currmins = parseInt(currDate.getMinutes());
        let currsecs = parseInt(currDate.getSeconds());
        target = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), hourval + currhrs,minuteval + currmins,secondval + currsecs).getTime();
        updateCount();
        inter = setInterval(updateCount,1000);
    }

    function pauseCount(){
        clearInterval(inter);
        pausehrs = Math.floor((remain % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        pausemins = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
        pausesecs = Math.floor((remain % (1000 * 60)) / 1000);
    }

    function resumeCount(){
        clearInterval(inter);
        let currDate = new Date();
        target = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), currDate.getHours() + pausehrs,currDate.getMinutes() + pausemins,currDate.getSeconds() + pausesecs).getTime();
        updateCount();
        inter = setInterval(updateCount,1000);
    }


    function getTime(){
        $('#hours .list li').click(function(){
            hourval = parseInt($(this).text());
            $('#select-hrs').text(padzero(hourval));
        })
        $('#minutes .list li').click(function(){
            minuteval = parseInt($(this).text());
            $('#select-mins').text(padzero(minuteval));

        })
        $('#seconds .list li').click(function(){
            secondval = parseInt($(this).text());
            $('#select-secs').text(padzero(secondval));

        })
        $('#start-button').click(function(){
                
        startCount();
            $('#input-window').fadeOut(100,function(){
                $('#output-window').fadeIn(100);
            });
        });
    }

    $('#pause-resume-button').click(function(){
        if($(this).text() === 'Pause'){
            pauseCount();
            $(this).text('Resume');
        }
        else if ($(this).text() === 'Resume'){
            resumeCount();
            $(this).text('Pause');
        }
        else{
            startCount();
            $(this).text('Pause');
        }
    });

    $('#reset-button').click(function(){
        $('#main-display').text(`${padzero(hourval)}:${padzero(minuteval)}:${padzero(secondval)}`)
        $('#pause-resume-button').text('Start');
        $('#main-display').css('color','white');
        clearInterval(inter);

    })

    $('#restart-button').click(function(){
        $('#main-display').html(`<span id="select-hrs">00</span>:<span id="select-mins">00</span>:<span id="select-secs">00</span>`)
        pauseCount();
        $('#output-window').fadeOut(100,function(){
            $('#input-window').fadeIn(100);
            $('#pause-resume-button').text('Pause');
            hourval = 0;
            minuteval = 0;
            secondval = 0;
            $('#hours .list , #minutes .list, #seconds .list').scrollTop(0);
            $('#main-display').css('color','white');
        });
    });

    getTime();
})