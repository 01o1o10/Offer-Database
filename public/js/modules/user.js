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

    addUserCategory: function(category, cb){
        if(!category){
            ui.alert('add-user-category-failed', 'Category name can not be empty!', false)
        }
        else{
            sql.query("select * from usercategories where category_name='" + category + "';", function(categoryCheck){
                if(categoryCheck.length != 0){
                    ui.alert('add-user-category-failed', 'This category is already exists!', false)
                }
                else{
                    var sqlStatement = "insert into usercategories(category_name) values('" + category + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        if(check){
                            select.update({className: 'select-user-category', value: check.insertId, text: category})
                            ui.alert('add-user-category-succes', 'Category saved succesfully!', true)
                        }
                    })
                }
            })
        }
    },

    updateUserCategory: function(data){
        if(!data.category){
            ui.alert('update-user-category-failed', 'Category name can not be empty!', false)
        }
        else{
            var sqlStatement = "update usercategories set category_name='" + data.category + "' where categoryid=" + data.id + ";"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                ui.alert('update-user-category-succes', 'Category udated succesfully!', true)
            })
        }
    },

    filterUserCategories: function(){
        sql.query('select * from usercategories;', function(data){
            ui.setResults(data, ['Category'], 'delete-user-categories')
        })
    },

    changePassword: function(passInfo){
        if(!passInfo){
            ui.alert('user-change-password-failed', 'Password data is empty!', false)
        }
        else if(!passInfo.oldPass || !passInfo.newPass || !passInfo.newPassCheck){
            ui.alert('user-change-password-failed', 'Any field can not be empty!', false)
        }
        else if(passInfo.newPass != passInfo.newPassCheck){
            ui.alert('user-change-password-failed', 'Verify is not ok!', false)
        }
        else{
            sql.query("select * from users where u_name='" + userInfo.u_name + "';", function(check){
                if(check[0].u_pass != passInfo.oldPass){
                    ui.alert('user-change-password-failed', 'Old password is incorrect!', false)
                }
                else{
                    var sqlStatement = "update users set u_pass='" + passInfo.newPass + "' where u_name='" + userInfo.u_name + "';"
                    sql.query(sqlStatement, function(check){
                        ui.alert('user-change-password-succes', 'Password changed successfully!', true)
                    })
                }
            })
        }
    }
}