import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: '王鹏',
    password: 'xiaohouzi',
    avatar: 'http://img4.duitang.com/uploads/item/201511/26/20151126112617_vUaQf.jpeg',
    name: '小猴子'
  }
];

const ReportCard = [];

for (let i = 0; i < 86; i++) {
  ReportCard.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    sex: Mock.Random.integer(0, 1),
    class: Mock.Random.integer(0, 1),//班级
    chinese:Mock.Random.integer(40,100),//语文
    math:Mock.Random.integer(40,100),//数学
    english:Mock.Random.integer(40,100),//英语
    history:Mock.Random.integer(40,100),//历史
    geography:Mock.Random.integer(40,100),//地理
    biology:Mock.Random.integer(40,100),//生物
    politics:Mock.Random.integer(40,100),//政治
  }));
}

export { LoginUsers, ReportCard };
