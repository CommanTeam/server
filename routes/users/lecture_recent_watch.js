/*
 Default module
 */
 const express = require('express');
 const router = express.Router();
 const async = require('async');
 const bodyParser = require('body-parser');
 const hangul = require('hangul-js');

/*
 Router.use
 */
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({ extended: false }));

/*
 Custom module
 */
 const jwt = require('../../module/jwt.js');
 const db = require('../../module/pool.js');
 const sql = require('../../module/sql.js');



/*
 Method : Get
 */





//written By 형민
//강의 id, user email로 마지막으로 들은 강의 이름, 강의 priority, 단원 이름, 단원 priority, 진도  가져오기  
//http://ip/content/lectures?lectureID={lectureID}
router.get('/:lectureID', async(req, res, next) => {
    
  
    const chkToken = jwt.verify(req.headers.authorization);
    if(chkToken == -1) {
        res.status(401).send({
            message : "Access Denied"
        });
    }
    
    let lecture_ID = req.params.lectureID


    //let user_email =  chkToken.email;

    // //이메일로 찾기
    // let getUserIDbyEmail = 
    // `
    // SELECT * 
    // FROM comman_db.user as u,             user_history as uh,             lecture as l
    // where u.id = uh.user_id
    // and uh.lecture_id = l.id
    // and u.email = 'user@user'


    // `
    //lectureID로 chapter_title, chapter_priority, lecture_title, leacture_priority 가져오기
    let selectQuery =
    `   
        SELECT c.title as course_title, ch.priority as chapter_priority, l.title as lecture_title, l.priority as lecture_priority, l.lecture_type as lecture_type
        FROM comman_db.course c, chapter ch, lecture l 
        WHERE c.id = ch.course_id
        AND ch.id = l.chapter_id
        AND l.id = ?
    `;


    let lectureInfo = [];
    let _lectureInfo = {};

    let data = await db.queryParamCnt_Arr(selectQuery,lecture_ID);
    _lectureInfo.course_title = data[0].course_title;
    _lectureInfo.chapter_priority = data[0].chapter_priority;
    _lectureInfo.lecture_title = data[0].lecture_title;
    _lectureInfo.lecture_priority = data[0].lecture_priority;
    _lectureInfo.lecture_type = data[0].lecture_type;


    
    var result = _lectureInfo;

    res.status(200).send({
       "result" : result
    });
});


module.exports = router;