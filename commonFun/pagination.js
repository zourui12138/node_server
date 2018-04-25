import connection from '../config'

export const jobs_pagination = (req, res) => {
    let start = (req.query.page-1)*req.query.size,
        size = parseInt(req.query.size),
        resObj = {};
    connection.query('SELECT * FROM jobs limit ?, ?',[start,size], (error, results) => {
        if (error) throw error;
        resObj.content = results;
        connection.query('SELECT COUNT(*) AS totalElements FROM jobs', (error, results) => {
            if (error) throw error;
            resObj.totalElements = results[0].totalElements;
            res.json(resObj);
        });
    });
};