const { exec }                  = require('child_process');
var { Connection, sequelize }   = require('../context/mysql.connection');
var { Sequelize}                = require('sequelize');
var uuid                        = require('uuid');

var records = require('../entity/post.entity');

function findAll(sequelize){
    var my_instance = records.PostInstance(sequelize);
    //{logging: console.log}
    return my_instance.findAll({logging: console.log, where:{active:1} }).then(function(result){
        return result;
    });
}

function findById(sequelize,id){
    var my_instance = records.PostInstance(sequelize);
    return my_instance.findAll({logging: console.log, where:{Id:id,active:1} }).then(function(result){
        return result;
    });
}

function findByName(sequelize,name){
    var my_instance = records.PostInstance(sequelize);
    console.log('found:' + name);
    return my_instance.findAll({logging: console.log, where:{
        name: name
        ,active:1} ,order: [['orderpost', 'ASC']] }).then(function(result){
        return result;
    });
}

function add(sequelize,
      name,description,content
      ,status,schedule,orderpost
    ){
    var my_instance = records.PostInstance(sequelize);
    //console.log(Sequelize.UUID());
    console.log(name);
    console.log(description);
    console.log(content);
    var id = uuid.v4().toString();
    console.log(id);

    return my_instance.create({
        Id:id,
        name: name,
        description: description,
        content: content,
        active:1,
        createdAt: new Date(),
        status:status,
        schedule:schedule,
        orderpost:orderpost
    }).then(function (result) {
        if (result) {
            return result.id;
        } else {
            console.log('error insert');
            console.log(result);
            return 0;
        }
    });
}

function remove(sequelize,id,active){
    var my_instance = records.PostInstance(sequelize);

    my_instance.update({
        active: active,
      }, {
        where: { id: id }
    });
}

function removeByName(sequelize,name,active){
    var my_instance = records.PostInstance(sequelize);

    my_instance.update({
        active: active,
      }, {
        where: { name: name }
    });
}

function updateAll(sequelize,id,
    name,description,content
    ,status,schedule
    ){
    var my_instance = records.PostInstance(sequelize);

    my_instance.update({
        name: name,
        description: description,
        content: content,
        status:status,
        schedule:schedule
      }, {
        where: { id: id }
    });
}

module.exports = {findAll,findById,findByName,add,remove,removeByName,updateAll};