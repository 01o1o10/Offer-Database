module.exports = {
    addUser: function(data){
        if(!data){
            ui.alert('add-user-failed', 'User data is empty!', false)
        }
        else if(!data.fname || !data.lname || !data.uname || !data.pass || !data.vpass){
            ui.alert('add-user-failed', 'Any field can not be empty!', false)
        }
        else if(data.pass != data.vpass){
            ui.alert('add-user-failed', 'Passwords do not match!', false)
        }
        else{
            sql.query("select u_name from users where u_name='" + data.uname + "';", function(check){
                if(check.length != 0){
                    ui.alert('add-user-failed', 'This user name is already exists!', false)
                }
                else{
                    sqlStatement = "insert into users(u_name, u_fname, u_lname, u_categoryid, u_pass, u_aut) values('" + data.uname + "', '" + data.fname + "', '" + data.lname + "', " + data.category + ", '" + data.pass + "', '" + data.auth + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        if(check){
                            ui.alert('add-user-succes', 'User saved succesfully!', true)
                            //var select = {className: 'select-user-category', value: check.insertedId, text: }
                        }
                    })
                }
            })
        }
    },

    filterUser: function(userCategories){
        var sqlStatement = "select u_id, u_fname, u_lname, u_categoryid, u_name, u_aut from users u, usercategories uc where u.u_categoryid=uc.categoryid" 
        if(userCategories.length == 1){
            sqlStatement += " and u.u_categoryid=" + userCategories[0]
        }
        else if(userCategories.length > 1){
            sqlStatement += " and (u.u_categoryid=" + userCategories[0]
            for(var i = 1; i < userCategories.length; i++){
                sqlStatement += " or u.u_categoryid=" + userCategories[i]
            }
            sqlStatement += ")"
        }
        sqlStatement += ";"

        console.log(sqlStatement)
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Firstname', 'Lastname', 'Category', 'Username', 'Authority'], 'delete-users')
        })
    },

    updateUser: function(data){
        console.log(data)
        if(!data){
            ui.alert('update-user-failed', 'Entered user data is empty!', false)
        }
        else{
            if(!data.category){
                ui.alert('update-user-failed', 'Please select a category!', false)
            }
            else if(!data.fname || !data.lname || !data.uname || !data.auth){
                ui.alert('update-user-failed', '    !', false)
            }
            else{
                var sqlStatement = "update users set u_categoryid=" + data.category + ", u_fname='" + data.fname + "', u_lname='" + data.lname + "', u_name='" + data.uname + "', u_aut='" + data.auth + "';"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    ui.alert('update-user-succes', 'User updated succesfully!', true)
                })
            }
        }
    },
}