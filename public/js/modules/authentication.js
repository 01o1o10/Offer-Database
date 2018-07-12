const sql = require('./sql')

module.exports = {
    
    login: function(userInfo, cb){
        if(!userInfo){
            cb('Entry data is empty!')
        }
        else if(!userInfo.uname || !userInfo.password){
            cb('Any field can not be empty!')
        }
        else{
            sqlStatement = "select u_fname, u_lname, u_name, u_aut from users where u_name='" + userInfo.uname + "' and u_pass='" + userInfo.password + "';"
            sql.query(sqlStatement, function(check){
                if(check && check.length == 1){
                    cb('succes', check[0])
                }
                else{
                    cb('Username or password is incorrect!')
                }
            })
        }
    }
}