

/*
 Declare module
 */
 const express = require('express');
 const router = express.Router();
 const async = require('async');
 const bodyParser = require('body-parser');

 const jwt = require('../../module/jwt.js');
 const db = require('../../module/pool.js');
 const sql = require('../../module/sql.js');


/*
 Method : Get
 */

//written By 성찬
//강좌id로 챕터목록 반환 
//http://ip/content/courses/{courseID}/chapters
router.get('/:courseID/chapters', async(req, res, next) => {

	
	let courseID = req.params.courseID;
	let result = [];

	let selectChapterByCourseId =
	`
	select id, course_id, info, title, priority from comman_db.chapter where course_id = ? order by priority asc
	`;

	let selectOpenChapterByCourseId =
	`
	select opened_chapter from comman_db.course where id = ?
	`;

	var openChapterNum = await db.queryParamCnt_Arr(selectOpenChapterByCourseId, courseID);
	console.log("openedChapter: " + openChapterNum[0].opened_chapter);


	var data = await db.queryParamCnt_Arr(selectChapterByCourseId, courseID);

	for(var i=0;i<data.length;i++){
		let chapter = {};
		chapter.chapterID = data[i].id;
		chapter.info = data[i].info;
		chapter.title = data[i].info;
		chapter.priority = data[i].priority;
		chapter.open = (i < openChapterNum[0].opened_chapter || openChapterNum[0].opened_chapter==-1)

		result.push(chapter);
	}
	

	res.status(200).send(
		result
		);

});



//written By 성찬
//강좌id로 오픈된 챕터 개수 반환 
//http://ip/content/courses/{courseID}/openChapter
// router.get('/:courseID/openChapter', async(req, res, next) => {

// 	let courseID = req.params.courseID;

// 	let selectOpenChapterByCourseId =
// 	`
// 	select opened_chapter from comman_db.course where id = ?
// 	`;

// 	var data = await db.queryParamCnt_Arr(selectOpenChapterByCourseId, courseID);

// 	res.status(200).send(
// 		data
// 		);

// });


module.exports = router;
