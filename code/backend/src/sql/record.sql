CREATE TABLE IF NOT EXISTS `record` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '消费记录id',
  `name` varchar(50) DEFAULT NULL COMMENT '消费者姓名',
  `phone` varchar(50) DEFAULT NULL COMMENT '消费者电话',
  `amount` varchar(50) DEFAULT NULL COMMENT '消费金额',
  `num` varchar(64) DEFAULT NULL COMMENT '消费次数',
  `type` varchar(20) DEFAULT NULL COMMENT '消费类型(1:男士剪发  2:男士烫发型 3:男士烫染  4:女士剪发 5:女士烫发 6:女士烫染 7:儿童剪发 8: 购买附加产品)',
  `pay_type` varchar(10) DEFAULT NULL COMMENT '支付类型(1:现金 2:划卡 3:微信 4:支付宝)',
  `rest_amount` varchar(11) DEFAULT NULL COMMENT '剩余金额',
  `rest_num` varchar(11) DEFAULT NULL COMMENT '剩余次数',
  `create_time` varchar(11) DEFAULT NULL COMMENT '消费时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
