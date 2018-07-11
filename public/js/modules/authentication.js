const sql = require('./sql')

module.exports = {

    userInfo: {ufname: '', ulname: '', uname: '', auth: 0b0000000000000000000000000000000},

    login: function(userData, cb){
        if(!userData){
            cb('Entry data is empty!')
        }
        else if(!userData.uname || !userData.password){
            cb('Any field can not be empty!')
        }
        else{
            sqlStatement = "select u_fname, u_lname, u_name, u_aut from users where u_name='" + userData.uname + "' and u_pass='" + userData.password + "';"
            sql.query(sqlStatement, function(check){
                if(check && check.length == 1){
                    this.userInfo.ufname = check[0].u_fname
                    this.userInfo.ulname = check[0].u_lname
                    this.userInfo.uname = check[0].uname
                    this.userInfo.auth = check[0].u_aut
                    cb('succes')
                }
                else{
                    cb('The user name or password you entered is incorrect!')
                }
            })
        }
    }
}