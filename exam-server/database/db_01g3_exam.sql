-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.20 - MySQL Community Server (GPL)
-- 服务器OS:                        Win32
-- HeidiSQL 版本:                  10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for db_01g3_exam
DROP DATABASE IF EXISTS `db_01g3_exam`;
CREATE DATABASE IF NOT EXISTS `db_01g3_exam` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_01g3_exam`;

-- Dumping structure for table db_01g3_exam.api_authority
DROP TABLE IF EXISTS `api_authority`;
CREATE TABLE IF NOT EXISTS `api_authority` (
  `api_authority_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '接口权限id',
  `api_authority_text` varchar(255) NOT NULL COMMENT '接口名称',
  `api_authority_url` varchar(255) NOT NULL COMMENT '接口',
  `api_authority_method` varchar(255) NOT NULL COMMENT '接口请求方式',
  PRIMARY KEY (`api_authority_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='api 接口权限';

-- Dumping data for table db_01g3_exam.api_authority: ~3 rows (大约)
DELETE FROM `api_authority`;
/*!40000 ALTER TABLE `api_authority` DISABLE KEYS */;
INSERT INTO `api_authority` (`api_authority_id`, `api_authority_text`, `api_authority_url`, `api_authority_method`) VALUES
	(1, '获取用户身份类型·', '/user/identityId', 'GET'),
	(2, '添加新用户', '/user/addUser', 'POST'),
	(3, '更新用户', '/user/updateUser', 'POST');
/*!40000 ALTER TABLE `api_authority` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.classnumber
DROP TABLE IF EXISTS `classnumber`;
CREATE TABLE IF NOT EXISTS `classnumber` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_number` char(50) DEFAULT NULL COMMENT '教室号',
  `options` char(50) DEFAULT NULL COMMENT '操作',
  `key` int(11) DEFAULT NULL COMMENT 'key',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table db_01g3_exam.classnumber: ~3 rows (大约)
DELETE FROM `classnumber`;
/*!40000 ALTER TABLE `classnumber` DISABLE KEYS */;
INSERT INTO `classnumber` (`id`, `class_number`, `options`, `key`) VALUES
	(1, '34402', '删除', 1),
	(2, '34401', '删除', 2),
	(3, '34409', '删除', 3);
/*!40000 ALTER TABLE `classnumber` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.exam_type
DROP TABLE IF EXISTS `exam_type`;
CREATE TABLE IF NOT EXISTS `exam_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='考试类型';

-- Dumping data for table db_01g3_exam.exam_type: ~4 rows (大约)
DELETE FROM `exam_type`;
/*!40000 ALTER TABLE `exam_type` DISABLE KEYS */;
INSERT INTO `exam_type` (`id`, `text`) VALUES
	(1, '周考一'),
	(2, '周考二'),
	(3, '周考三'),
	(4, '月考');
/*!40000 ALTER TABLE `exam_type` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.grade
DROP TABLE IF EXISTS `grade`;
CREATE TABLE IF NOT EXISTS `grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class` char(50) DEFAULT NULL COMMENT '班级名',
  `courseName` char(50) DEFAULT NULL COMMENT '课程名',
  `classroomnumber` char(50) DEFAULT NULL COMMENT '教室号',
  `key` char(50) DEFAULT NULL COMMENT 'key',
  `options` char(50) DEFAULT NULL COMMENT '操作',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- Dumping data for table db_01g3_exam.grade: ~12 rows (大约)
DELETE FROM `grade`;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` (`id`, `class`, `courseName`, `classroomnumber`, `key`, `options`) VALUES
	(42, '1703A\r\n\r\n', 'javaScript下', '34405', NULL, NULL),
	(43, '1703B', 'node高级', '34406', NULL, NULL),
	(50, '1701G', '渐进式开发(react)', '34402', NULL, NULL),
	(57, '1702G', '模块化开发', '34403', NULL, NULL),
	(60, '1702H', 'javaScript上', '34404', NULL, NULL),
	(64, '1704A', 'javaScript高级', '34407', NULL, NULL),
	(65, '1801A', '项目实战', '34408', NULL, NULL),
	(66, '1802D', 'node高级', '34409', NULL, NULL),
	(67, '1803A', 'node高级', '34410', NULL, NULL),
	(70, '1701E', 'node高级', '34401', NULL, NULL),
	(71, '1702C', 'node高级', '34416', NULL, NULL),
	(72, '1703C', 'node高级', '34413', NULL, NULL);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.identity
DROP TABLE IF EXISTS `identity`;
CREATE TABLE IF NOT EXISTS `identity` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `identity_id` int(255) NOT NULL,
  `identity` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户的身份类型';

-- Dumping data for table db_01g3_exam.identity: ~4 rows (大约)
DELETE FROM `identity`;
/*!40000 ALTER TABLE `identity` DISABLE KEYS */;
INSERT INTO `identity` (`id`, `identity_id`, `identity`) VALUES
	(0, 0, '管理员'),
	(1, 1, '出题者'),
	(2, 2, '浏览者'),
	(3, 666, '超级管理员');
/*!40000 ALTER TABLE `identity` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.identity_api_authority_relation
DROP TABLE IF EXISTS `identity_api_authority_relation`;
CREATE TABLE IF NOT EXISTS `identity_api_authority_relation` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `api_authority_id` int(255) NOT NULL,
  `identity_id` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table db_01g3_exam.identity_api_authority_relation: ~3 rows (大约)
DELETE FROM `identity_api_authority_relation`;
/*!40000 ALTER TABLE `identity_api_authority_relation` DISABLE KEYS */;
INSERT INTO `identity_api_authority_relation` (`id`, `api_authority_id`, `identity_id`) VALUES
	(1, 1, 0),
	(2, 2, 0),
	(3, 3, 0);
/*!40000 ALTER TABLE `identity_api_authority_relation` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.identity_view_authority_relation
DROP TABLE IF EXISTS `identity_view_authority_relation`;
CREATE TABLE IF NOT EXISTS `identity_view_authority_relation` (
  `identity_view_authority_relation_id` int(255) NOT NULL AUTO_INCREMENT,
  `identity_id` int(255) NOT NULL,
  `view_authority_id` int(255) NOT NULL,
  PRIMARY KEY (`identity_view_authority_relation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table db_01g3_exam.identity_view_authority_relation: ~12 rows (大约)
DELETE FROM `identity_view_authority_relation`;
/*!40000 ALTER TABLE `identity_view_authority_relation` DISABLE KEYS */;
INSERT INTO `identity_view_authority_relation` (`identity_view_authority_relation_id`, `identity_id`, `view_authority_id`) VALUES
	(1, 0, 1),
	(2, 1, 2),
	(3, 1, 3),
	(4, 2, 4),
	(5, 0, 5),
	(6, 0, 6),
	(7, 1, 7),
	(8, 2, 8),
	(9, 0, 9),
	(10, 0, 10),
	(11, 0, 11),
	(12, 1, 12);
/*!40000 ALTER TABLE `identity_view_authority_relation` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.question
DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_name` char(50) DEFAULT NULL COMMENT '题目名称',
  `question_type` char(50) DEFAULT NULL COMMENT '题目类型',
  `question_class_type` char(50) DEFAULT NULL COMMENT '课程类型',
  `question_exam_type` char(50) DEFAULT NULL COMMENT '考试类型',
  `question_body` varchar(50) DEFAULT NULL COMMENT '题目主题',
  `question_answer` varchar(50) DEFAULT NULL COMMENT '题目答案',
  `user` varchar(50) DEFAULT NULL COMMENT '出题人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Dumping data for table db_01g3_exam.question: ~8 rows (大约)
DELETE FROM `question`;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`id`, `question_name`, `question_type`, `question_class_type`, `question_exam_type`, `question_body`, `question_answer`, `user`) VALUES
	(1, '机器人归位5555', '代码阅读题', 'javaScript下', '周考一', '1+1=？', '2', 'heinan'),
	(2, '创建一副扑克牌', '代码补全', '模块化开发', '周考一', '1+2=？', '3dsad', 'heinan'),
	(3, '洗牌', '代码阅读题', '组件化开发', '周考二', '1？', '嗯', 'heinan'),
	(5, 'eq', '代码补全', '模块化开发', '周考三', 'wqeqw', '7f6ffaa6bb0b408017b62254211691b5', 'heinan'),
	(6, '项目实战', '简答题', '项目实战', '周考一', '阿萨德，妈妈说，单面，对你妈说你爹妈水泥地面，三段码三段码，安达曼都没，三面单吗，但面对那什么', '757c1a70f13b71eda107b38c491cb410', 'heinan'),
	(7, '这里是题目66', '代码阅读题', '模块化开发', '周考三', '请问额外企鹅666', 'fd23f9ca73f2b5704189d20ee27099b9', 'heinan'),
	(8, '创建试题', '代码补全', '模块化开发', '周考三', '111', '934b535800b1cba8f96a5d72f72f1611', 'heinan'),
	(9, 'react', '简答题', 'javaScript上', '周考一', '1', 'c81e728d9d4c2f636f067f89cc14862c', 'heinan');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.room
DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` char(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COMMENT='教室';

-- Dumping data for table db_01g3_exam.room: ~12 rows (大约)
DELETE FROM `room`;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` (`room_id`, `room_name`) VALUES
	(62, '34402'),
	(63, '34403'),
	(64, '34404'),
	(65, '34405'),
	(66, '34406'),
	(67, '34407'),
	(68, '34408'),
	(69, '34409'),
	(70, '34410'),
	(73, '34413'),
	(74, '34414'),
	(76, '34416');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.shiti
DROP TABLE IF EXISTS `shiti`;
CREATE TABLE IF NOT EXISTS `shiti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` char(50) DEFAULT NULL COMMENT '类型id',
  `typename` char(50) DEFAULT NULL COMMENT '类型名称',
  `options` char(50) DEFAULT NULL COMMENT '操作',
  `key` char(50) DEFAULT NULL COMMENT 'key',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table db_01g3_exam.shiti: ~5 rows (大约)
DELETE FROM `shiti`;
/*!40000 ALTER TABLE `shiti` DISABLE KEYS */;
INSERT INTO `shiti` (`id`, `typeid`, `typename`, `options`, `key`) VALUES
	(1, '774318-730z8m', '简答题', '', '1'),
	(2, 'br9d6s-wh46i', '代码阅读题', '', '2'),
	(3, 'fwf0t-wla1q', '代码补全', '', '3'),
	(4, 'n66k4n-i9zpen', '修改bug', '', '4'),
	(5, '8i73-r8oai', '手写代码', '', '5');
/*!40000 ALTER TABLE `shiti` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.student
DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL COMMENT '姓名',
  `student_number` char(50) DEFAULT NULL COMMENT '学号',
  `class_number` char(50) DEFAULT NULL COMMENT '班级',
  `password` char(50) DEFAULT NULL COMMENT '密码',
  `classroom` char(50) DEFAULT NULL COMMENT '教室号',
  `operation` char(50) DEFAULT NULL COMMENT '操作',
  `key` char(50) DEFAULT NULL COMMENT 'key',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='学生管理';

-- Dumping data for table db_01g3_exam.student: ~17 rows (大约)
DELETE FROM `student`;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`id`, `name`, `student_number`, `class_number`, `password`, `classroom`, `operation`, `key`) VALUES
	(1, '徐彪', '1', '1701G', '111', '34402', '删除', '1'),
	(2, '张艺贤', '2', '1701G', '222', '34402', '删除', '2'),
	(3, '贾泽', '3', '1701G', '333', '34402', '删除', '3'),
	(4, '郑玉洁', '4', '1701G', '444', '34402', '删除', '4'),
	(5, '朱家辉', '5', '1701G', '555', '34402', '删除', '5'),
	(6, '国华', '6', '1701G', '666', '34402', '删除', '6'),
	(7, '徐强', '7', '1702G', '777', '34403', '删除', '7'),
	(8, '假贾泽', '8', '1702G', '123', '34403', '删除', '8'),
	(9, '张艺娴', '9', '1703A', '123', '34405', '删除', '9'),
	(10, '张咿娴', '10', '1703B', '123', '34406', '删除', '10'),
	(11, 'xiaoyu', '11', '1704A', '456', '34407', '删除', '11'),
	(12, '张三', '12', '1801A', '223', '34408', '删除', '12'),
	(13, '李四', '13', '1802B', '233', '34409', '删除', '13'),
	(14, '蜡笔小新', '14', '1803A', '165', '34410', '删除', '14'),
	(15, '喜羊羊', '15', '1804A', '468', '34411', '删除', '15'),
	(16, '懒羊羊', '16', '1805G', '646', '34412', '删除', '16'),
	(17, '灰太狼', '17', '1702H', '4868', '34404', '删除', '17');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.subject
DROP TABLE IF EXISTS `subject`;
CREATE TABLE IF NOT EXISTS `subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_name` char(50) DEFAULT '0' COMMENT '课程',
  `uid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='课程表';

-- Dumping data for table db_01g3_exam.subject: ~10 rows (大约)
DELETE FROM `subject`;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` (`id`, `subject_name`, `uid`) VALUES
	(1, 'javaScript上', '1001'),
	(2, 'javaScript下', '1002'),
	(3, '模块化开发', '1003'),
	(4, '移动端开发', '1004'),
	(5, 'node基础', '1005'),
	(6, '组件化开发(vue)', '1006'),
	(7, '渐进式开发(react)', '1007'),
	(8, '项目实战', '1008'),
	(9, 'javaScript高级', '1009'),
	(10, 'node高级', '1010');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.testlist
DROP TABLE IF EXISTS `testlist`;
CREATE TABLE IF NOT EXISTS `testlist` (
  `key` int(20) NOT NULL AUTO_INCREMENT,
  `uid` char(50) NOT NULL,
  `info` char(50) DEFAULT '0' COMMENT '试卷信息',
  `classtest` char(50) DEFAULT '0' COMMENT '班级',
  `createman` char(50) DEFAULT '0' COMMENT '创建人',
  `startDate` char(100) DEFAULT '0' COMMENT '开始时间',
  `endtDate` char(100) DEFAULT '0' COMMENT '结束时间',
  `action` char(50) DEFAULT '0' COMMENT '操作',
  `type` char(50) DEFAULT '0' COMMENT '1：进行中；2：已结束',
  `examtype` char(50) DEFAULT '0' COMMENT '考试类型',
  `course` char(50) DEFAULT '0' COMMENT '课程',
  `cont` char(50) DEFAULT NULL COMMENT '试题量',
  PRIMARY KEY (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='添加考试';

-- Dumping data for table db_01g3_exam.testlist: ~4 rows (大约)
DELETE FROM `testlist`;
/*!40000 ALTER TABLE `testlist` DISABLE KEYS */;
INSERT INTO `testlist` (`key`, `uid`, `info`, `classtest`, `createman`, `startDate`, `endtDate`, `action`, `type`, `examtype`, `course`, `cont`) VALUES
	(1, '3', 'javaScript上第一周摸底考试', '考试班级 1702H', 'xuiaoyu', '1567470600000', '1567478400000', '详情', '2', '周考一', 'javaScript上', '1'),
	(3, '4', '项目实战第一周摸底考试', '考试班级 1801A', 'xuiaoyu', '1567470600000', '1567478400000', '详情', '2', '周考一', '项目实战', '1'),
	(4, '2', 'javaScript下第一周摸底考试', '考试班级 1703A', 'xuiaoyu', '1567989000000', '1567996800000', '详情', '2', '周考一', 'javaScript下', '1'),
	(17, '1568547128722', '模块化开发第三周摸底考试', '考试班级 1702G', 'jiaze', '1568563200000', '1568606399000', '详情', '1', '周考三', '模块化开发', '3');
/*!40000 ALTER TABLE `testlist` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `username` char(50) DEFAULT NULL,
  `password` char(50) DEFAULT NULL,
  `token` char(50) DEFAULT NULL,
  `identity_id` int(255) NOT NULL COMMENT '0：管理员  1：出题者  2：浏览者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COMMENT='用户';

-- Dumping data for table db_01g3_exam.user: ~14 rows (大约)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user_id`, `username`, `password`, `token`, `identity_id`) VALUES
	(21, '02c425157ecd32f259548b33402ff6d3', 'xubiao', '123321', 'e09487362b8267f547c5116bdb2727e3', 2),
	(23, '8cc77fa41b0b160f3ea2a884eb615312', 'xiaoyu', '123', '71fbff214b5cfd40d65d1cb85a8d3db3', 0),
	(25, 'c0f8bd58f2aa3a14ca717ca7b7cf98da', 'zhangguohua', '123321', '4ef5c691d37d72c8bc202bfe55065862', 1),
	(26, '7c63b15ff57e196c6cd233d893dd8dcd', 'jiaze123', '123', NULL, 0),
	(27, '1f6f47d80ba4fedf7f7cf5869f8b1f4e', 'zyx222', '222', '54b652cef3929576df3c2f120ea25aee', 1),
	(28, '4d539617d79c6dc05ec70695b10a7d76', 'jiaze6', '123', '36dab1bb8ab39b9c8bcfd79ee0f921fd', 2),
	(29, 'c9f2b6891abe01dc4b872ca5e70e9d7b', 'jiaze', '123', 'c845d7a8f6c4cee81e14f15ace565077', 666),
	(30, 'd9296ce56b3623d1df78aba92ac4b369', 'liulanzhe', '123', 'c1c888d60f44af47b5cc8f63324cd9af', 2),
	(31, '937f7c59a7cc82063a924fa20b473285', 'guanlizhe', '123', '7635c15f7491c9a53f3018b18c039a14', 0),
	(32, '16edc5d9bb61c525cc3281cf9e78823a', 'chutiren', '123', 'b13fe6874706d46c44422599849b7d7c', 1),
	(33, 'fac97e579639be3f10db671a4462ed91', 'zyx', '123', '4c192b9201ef3e762c83f45c42c2aa6d', 666),
	(34, '202cb962ac59075b964b07152d234b70', '123', '123', NULL, 1),
	(35, '0a089649013ceb383c3a477c435b7def', 'heinan', '1qaz', 'fb205239f19454c55fadc50b6a2c358b', 666),
	(36, 'dd305eab9b42cb3713d4f964ea53b642', 'jz', '123321', NULL, 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table db_01g3_exam.view_authority
DROP TABLE IF EXISTS `view_authority`;
CREATE TABLE IF NOT EXISTS `view_authority` (
  `view_authority_id` int(255) NOT NULL AUTO_INCREMENT,
  `view_authority_text` varchar(255) NOT NULL,
  `view_id` varchar(255) NOT NULL,
  PRIMARY KEY (`view_authority_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table db_01g3_exam.view_authority: ~12 rows (大约)
DELETE FROM `view_authority`;
/*!40000 ALTER TABLE `view_authority` DISABLE KEYS */;
INSERT INTO `view_authority` (`view_authority_id`, `view_authority_text`, `view_id`) VALUES
	(1, '登录', 'login'),
	(2, '添加试题', 'addQuestions'),
	(3, '试题分类', 'questionsType'),
	(4, '查看试题', 'watchQuestions'),
	(5, '添加用户', 'addUser'),
	(6, '用户展示', 'showUser'),
	(7, '添加考试', 'addExam'),
	(8, '试卷列表', 'exam'),
	(9, '班级管理', 'grade'),
	(10, '教室管理', 'room'),
	(11, '学生管理', 'student'),
	(12, '待批班级', 'paper');
/*!40000 ALTER TABLE `view_authority` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
