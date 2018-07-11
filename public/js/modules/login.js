const ipc = require('electron').ipcRenderer

$(document).ready(function(){
    $('#login-submit').click(function(){
        var loginData = readLoginInfo()
        ipc.send('login', loginData)
    })

    ipc.on('login-reply', function(event, err){
        alert('login-failed', err, false)
    })

    function readLoginInfo(){
        var data = {}
        data.uname = document.getElementById('uname').value
        data.password = document.getElementById('password').value
        return data
    }

    function alert(id, message, succes){
        var alrt = $('#' + id)
        alrt.html('')
        if(succes){
            alrt.html('<strong>Succes!</strong> ' + message)
        }
        else{
            alrt.html('<strong>Failed!</strong> ' + message)
        }
        alrt.slideToggle('slow');
        setTimeout(function(){
            alrt.slideToggle('slow');
        }, 3000);
    }
})