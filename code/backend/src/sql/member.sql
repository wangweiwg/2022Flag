CREATE TABLE IF NOT EXISTS `member` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '会员id',
  `name` varchar(50) DEFAULT NULL COMMENT '会员名',
  `phone` varchar(64) DEFAULT NULL COMMENT '会员电话',
  `charge_amount` varchar(10) DEFAULT NULL COMMENT '充值金额',
  `charge_num` varchar(20) DEFAULT NULL COMMENT '充值次数',
  `charge_type` int(1) DEFAULT NULL COMMENT '充值类型(1: 充返 2:固定次数剪发) 3:其它',
  `charge_rest_num` int(1) DEFAULT NULL COMMENT '还剩余几次剪发',
  `create_time` varchar(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(11) DEFAULT NULL COMMENT '修改时间',
  `remark` varchar(50) DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
