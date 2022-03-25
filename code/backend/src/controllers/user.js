const { query } = require('../utils/db.js');

const getUserList = () => {
    return query('select * from test')
}

module.exports = {
    getUserList
};