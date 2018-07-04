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
                sql.query('select p_id, p_name from projects;', function(options){
                    setOptions(className, options, 'Select project...', ['p_id', 'p_name'])
                })
                break
            case 'select-supplier':
                sql.query('select s_id, s_name from suppliers;', function(options){
                    setOptions(className, options, 'Select supplier...', ['s_id', 's_name'])
                })
                break
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