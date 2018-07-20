module.exports = {
    getOptions: function(className) {
        switch(className){
            case 'select-product':
                sql.query('select p_id, p_name from products;', function(options){
                    setOptions(className, options, 'Select product...', ['p_id', 'p_name'])
                })
                break
            case 'select-category':
                sql.query('select c_id, c_name from categories;', function(options){
                    setOptions(className, options, 'Select category...', ['c_id', 'c_name'])
                })
                break
            case 'select-project':
                sql.query('select pj_id, pj_name from projects;', function(options){
                    setOptions(className, options, 'Select project...', ['pj_id', 'pj_name'])
                })
                break
            case 'select-supplier':
                sql.query('select s_id, s_name from suppliers;', function(options){
                    setOptions(className, options, 'Select supplier...', ['s_id', 's_name'])
                })
                break
            case 'select-user-category':
                sql.query('select categoryid, category_name from usercategories;', function(options){
                    setOptions(className, options, 'Select category...', ['categoryid', 'category_name'])
                })
                break
            case 'select-user':
                sql.query("select u_name, concat(u_fname, ' ', u_lname) as fullName from users;", function(options){
                    setOptions(className, options, 'Select user...', ['u_name', 'fullName'])
                })
                break
        }
    },

    update: function(data){
        var selects = $('.' + data.className)
        for(var i = 0; i < selects.length; i++){
            selects[i].sumo.add(data.value, data.text);
        }
    },

    setingSelectProduct: function(sel, categories){
        var options = sel.childNodes
        for(var i=options.length; i>=1; i--)
        {
            sel.sumo.remove(i-1);
        }
        var sqlStatement = 'select * from products'
        if(categories.length == 1){
            sqlStatement += " where c_id=" + categories[0]
        }
        else if(categories.length > 1){
            sqlStatement += " where (c_id=" + categories[0]
            for(var i = 1; i < categories.length; i++){
                sqlStatement += " or c_id=" + categories[i]
            }
            sqlStatement += ")"
        }
        sqlStatement += ";"
        sql.query(sqlStatement, function(check){
            for(var i = 0; i < check.length; i++){
                sel.sumo.add(check[i].p_id, check[i].p_name);
            }
        })
    }
}

function setOptions(className, options, ph, keys){
    $('.' + className).off()
    $('.' + className).innerHTML = ''
    for(var i in options){
        $('.' + className).append('<option value="' + options[i][keys[0]] + '">' + options[i][keys[1]] + '</option>')
    }
    $('.' + className).SumoSelect({search: true, placeholder: ph});
}