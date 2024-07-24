const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
// 데이터베이스 연결을 위한 sequelize 인스턴스 생성
let sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.subscriber = require("./subscriber.js")(sequelize, Sequelize);
db.machine = require("./machine.js")(sequelize, Sequelize);
db.reservation = require("./reservation.js")(sequelize, Sequelize);
db.notice = require("./notice.js")(sequelize, Sequelize);
db.Review = require("./reviews.js")(sequelize, Sequelize);
db.branch = require("./branch.js")(sequelize, Sequelize);
db.qna = require("./qna.js")(sequelize, Sequelize);
// 모델 관계 설정
db.qna.belongsTo(db.branch, {
    foreignKey: 'branchID',
    targetKey: 'branchID'
});

db.qna.belongsTo(db.subscriber, {
    foreignKey: 'userEmail',
    targetKey: 'email'
});
module.exports = db;
