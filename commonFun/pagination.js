import connection from '../config'
// 'select count(*) from jobs'
export const pagination = (req, res) => {
    let start = (req.query.page-1)*req.query.size,
        size = parseInt(req.query.size),
        resObj = {};
    connection.query('SELECT * FROM jobs limit ?, ?',[start,size], function (error, results) {
        if (error) throw error;
        resObj.content = results;
        connection.query('select count(*) from jobs', function (error, results) {
            if (error) throw error;
            resObj.totalElements = results;
            res.json(resObj);
        });
    });
};