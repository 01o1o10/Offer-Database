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
        }
    },

    update: function(data){
        var selects = $('.' + data.className)
        for(var i = 0; i < selects.length; i++){
            selects[i].sumo.add(data.value, data.text);
        }
    }
}

function setOptions(className, options, ph, keys){
    $('.' + className).off()
    $('.' + className).innerHTML = ''
    for(var i in options){
        $('.' + className).append('<option value="' + options[i][keys[0]] + '">' + options[i][keys[1]] + '</option>')
    }
    $('.' + className).SumoSelect({search: true, searchText: 'Enter here.', placeholder: ph});
}