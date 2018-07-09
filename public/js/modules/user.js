module.exports = {
    login: function(userInfo){
        if(!userInfo.userName){
            ui.alert('login-modal-failed', 'Please enter a username!', false)
        }
        else if(!userInfo.password){
            ui.alert('login-modal-failed', 'Please enter password!', false)
        }
        else{
            sql.query("select * from users where u_name='" + userInfo.userName + "';", function(data){
                if(data[0]){
                    if(data[0].u_name != userInfo.userName || data[0].u_pass != userInfo.password){
                        ui.alert('login-modal-failed', 'Usernamo or password is incorrect!', false)
                    }
                    else{
                        ui.alert('login-modal-succes', 'Login succes!', true)
                    }
                }
            })
        }
    }
}