CREATE TABLE IF NOT EXISTS `store` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '店铺id',
  `account` varchar(50) DEFAULT NULL COMMENT '用户名',
  `password` varchar(64) DEFAULT NULL COMMENT '用户密码',
  `store_name` varchar(20) DEFAULT NULL COMMENT '店铺名字',
  `contact` varchar(10) DEFAULT NULL COMMENT '店铺联系人',
  `phone` varchar(11) DEFAULT NULL COMMENT '联系人电话',
  `create_time` varchar(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(11) DEFAULT NULL COMMENT '修改时间',
  `is_forbidden` int(1) DEFAULT 0 COMMENT '是否禁用(0: 否 1: 是)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `store` SET account='wangwei', password='123456', store_name='顶尖烫染', contact='王伟', phone='15356183205';