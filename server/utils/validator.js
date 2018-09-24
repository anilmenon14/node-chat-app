

var isValidJoin = function (params) {

return typeof params.name === 'string' && params.name.trim().length > 0 &&  typeof params.room === 'string' && params.room.trim().length > 0
}

var isRealString = function (params) {

return typeof params === 'string' && params.trim().length > 0
}


module.exports = {isValidJoin,isRealString};
