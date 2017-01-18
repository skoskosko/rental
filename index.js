
var express = require('express')
var app = express()
var MongoUrl = "localhost.fi";///////////////////MONGO ADDRESSS ///////////////////
var fs = require('fs');
const path = require('path');
var fileUpload = require('express-fileupload');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
const crypto = require('crypto');

app.use(bodyParser.json());
app.use(fileUpload());

//         :::   :::    ::::::::  ::::    :::  ::::::::   ::::::::
//       :+:+: :+:+:  :+:    :+: :+:+:   :+: :+:    :+: :+:    :+:
//     +:+ +:+:+ +:+ +:+    +:+ :+:+:+  +:+ +:+        +:+    +:+
//    +#+  +:+  +#+ +#+    +:+ +#+ +:+ +#+ :#:        +#+    +:+
//   +#+       +#+ +#+    +#+ +#+  +#+#+# +#+   +#+# +#+    +#+
//  #+#       #+# #+#    #+# #+#   #+#+# #+#    #+# #+#    #+#
// ###       ###  ########  ###    ####  ########   ########

for making admins
// function makeadmin(email,res){
//
//   MongoClient.connect(MongoUrl, function(err, db) {
//       if (err) {
//           console.log('Unable to connect to the mongoDB server. Error:', err);
//       } else {
//           console.log('Connection established to', MongoUrl);
//           var collection = db.collection('users');
//           collection.update(
//                  { email : email},
//                  { $set: { admin: true} }
//               );  console.log("adminded " + email );
//               res.send("adminded " + email);
//
//       }
//   });
// }


//  ####  ###### #    # #    # #####  #####    ##   ##### ######
// #    # #      ##   # #    # #    # #    #  #  #    #   #
// #      #####  # #  # #    # #    # #    # #    #   #   #####
// #  ### #      #  # # #    # #####  #    # ######   #   #
// #    # #      #   ## #    # #      #    # #    #   #   #
//  ####  ###### #    #  ####  #      #####  #    #   #   ######




function genericmongoupdate(data, collectionname, res) {
    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection(collectionname);
            var idon = data._id;
            delete data._id;
            collection.update({
                _id: new ObjectId(idon)
            }, {
                $set: data
            }, {
                multi: false
            });
            res.send("done");
            db.close();
        }
    });

}


//  ####  ###### #    # ###### #####  #  ####   ####  ###### #####
// #    # #      ##   # #      #    # # #    # #    # #        #
// #      #####  # #  # #####  #    # # #      #      #####    #
// #  ### #      #  # # #      #####  # #  ### #  ### #        #
// #    # #      #   ## #      #   #  # #    # #    # #        #
//  ####  ###### #    # ###### #    # #  ####   ####  ######   #

function generigmongoget(collectionname, res, func, limitation ,data) {
    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection(collectionname);

            var document = collection.find(
                limitation
            ).toArray(function(err, document) {

                func(document, res ,data);


            });
            db.close();
        }
    });

}


//  ####  ###### #    # ###### #####  #  ####   ####  ###### #####
// #    # #      ##   # #      #    # # #    # #      #        #
// #      #####  # #  # #####  #    # # #       ####  #####    #
// #  ### #      #  # # #      #####  # #  ###      # #        #
// #    # #      #   ## #      #   #  # #    # #    # #        #
//  ####  ###### #    # ###### #    # #  ####   ####  ######   #

function genericmongoobject(data, collectionname, func, res) {

    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection(collectionname);
            //console.log(data);
            console.log(data);
            collection.insert(data, function(err, result) {
                if (err) {
                    func(false, res);
                    console.log(err);
                } else {
                    func(true, res);
                    //console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });
        }
    });

}

//  ####  ###### #    # #####  ###### #
// #    # #      ##   # #    # #      #
// #      #####  # #  # #    # #####  #
// #  ### #      #  # # #    # #      #
// #    # #      #   ## #    # #      #
//  ####  ###### #    # #####  ###### ######


function mongodel(collectionname, limitation) {
    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection(collectionname);

            var document = collection.remove(
                limitation
            );
db.close();
        }
    });

}




// #    #   ##   #    # ###### #    # ###### #    # #    #  ####  ###### #####
// ##  ##  #  #  #   #  #      ##   # #      #    # #    # #      #      #    #
// # ## # #    # ####   #####  # #  # #####  #    # #    #  ####  #####  #    #
// #    # ###### #  #   #      #  # # #      # ## # #    #      # #      #####
// #    # #    # #   #  #      #   ## #      ##  ## #    # #    # #      #   #
// #    # #    # #    # ###### #    # ###### #    #  ####   ####  ###### #    #

function makenewuser(data) {

    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection('users');
            //console.log(data);
            collection.insert(data, function(err, result) {
                if (err) {
                    //console.log(err);
                } else {
                    //console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });
        }
    });

}

//                             #######
// ###### #####  ###### ###### #       #    #   ##   # #
// #      #    # #      #      #       ##  ##  #  #  # #
// #####  #    # #####  #####  #####   # ## # #    # # #
// #      #####  #      #      #       #    # ###### # #
// #      #   #  #      #      #       #    # #    # # #
// #      #    # ###### ###### ####### #    # #    # # ######

function freeEmail(datas, res, func) {
    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection('users');

            var document = collection.find({
                email: datas.email
            }).toArray(function(err, document) {

                if (document[0] && document[0].email == datas.email) {
                    db.close();
                    res.send("{what:'email failure!'}");
                } else {
                    func(datas, res);
                }

            });
            db.close();
        }
    });

}

//   ##   #####  #    # # #    # #####  #  ####  #    # #####  ####
//  #  #  #    # ##  ## # ##   # #    # # #    # #    #   #   #
// #    # #    # # ## # # # #  # #    # # #      ######   #    ####
// ###### #    # #    # # #  # # #####  # #  ### #    #   #        #
// #    # #    # #    # # #   ## #   #  # #    # #    #   #   #    #
// #    # #####  #    # # #    # #    # #  ####  #    #   #    ####

function adminrights(datas, res, func, post, file) {
    //datas email, safeid
    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection('users');

            var document = collection.find({
                email: datas.email
            }).toArray(function(err, document) {
                if (document[0] && document[0].email == datas.email &&
                    document[0].admin == true && document[0].safeid == datas.safeid) {
                    func(true, res, post, file)
                } else {
                    func(false, res, post, file)
                }

            });
            db.close();
        }
    });

}

//                               #     #
// #       ####   ####  # #    # ##   ##  ####  #    #  ####   ####
// #      #    # #    # # ##   # # # # # #    # ##   # #    # #    #
// #      #    # #      # # #  # #  #  # #    # # #  # #      #    #
// #      #    # #  ### # #  # # #     # #    # #  # # #  ### #    #
// #      #    # #    # # #   ## #     # #    # #   ## #    # #    #
// ######  ####   ####  # #    # #     #  ####  #    #  ####   ####

function loginMongo(postData, res, func) {
    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection('users');
            var document = collection.find({
                email: postData.email
            }).toArray(function(err, document) {
                if (document[0]) {
                    func(document[0], res, postData);
                } else {
                    res.send("wrong pass");

                }
                db.close();

            });
            db.close();
        }
    });

}

//  ####  ###### #####  ####    ##   ###### ###### # #####
// #      #        #   #       #  #  #      #      # #    #
//  ####  #####    #    ####  #    # #####  #####  # #    #
//      # #        #        # ###### #      #      # #    #
// #    # #        #   #    # #    # #      #      # #    #
//  ####  ######   #    ####  #    # #      ###### # #####

function setsafeid(email, res) {

    MongoClient.connect(MongoUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //console.log('Connection established to', MongoUrl);
            var collection = db.collection('users');
            var safe = crypt(email, makeid(10));
            collection.update({
                email: email
            }, {
                $set: {
                    safeid: safe
                }
            });
            res.send(safe);
            db.close();
        }
    });
}

//alligator
//       :::::::::: :::    ::: :::::::::  :::::::::  :::::::::: ::::::::   ::::::::
//      :+:        :+:    :+: :+:    :+: :+:    :+: :+:       :+:    :+: :+:    :+:
//     +:+         +:+  +:+  +:+    +:+ +:+    +:+ +:+       +:+        +:+
//    +#++:++#     +#++:+   +#++:++#+  +#++:++#:  +#++:++#  +#++:++#++ +#++:++#++
//   +#+         +#+  +#+  +#+        +#+    +#+ +#+              +#+        +#+
//  #+#        #+#    #+# #+#        #+#    #+# #+#       #+#    #+# #+#    #+#
// ########## ###    ### ###        ###    ### ########## ########   ########

app.use('/rentarat', express.static(path.join(__dirname, 'files/index.htm')))
app.use('/js', express.static(path.join(__dirname, 'files/js/')))
app.use('/rentarat/states', express.static(path.join(__dirname, 'files/paths')))
app.use('/rentarat/pics', express.static(path.join(__dirname, 'files/pics')))
app.use('/favicon.ico', express.static(path.join(__dirname, 'files/paths/img/favicon.ico')))
app.use('/', express.static(path.join(__dirname, 'files/paths/img/favicon.ico')))

app.get('/ratlist', function(req, res) {
    generigmongoget('rats', res, sendresjson, {
        status: "visible"
    });
});

app.get('/comingrents', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
    adminrights(auth, res, getadminrats);
});

app.get('/rentlist', function(req, res) {
  generigmongoget('rents', res, rentlistres)
});

app.get('/getprofileinfo', function(req, res) {
  var auth = getheadersSafeidEmail(req.headers.cookie);
  generigmongoget('users', res, pofilehandling, {'email':auth.email} ,auth);
});

app.get('/getusersrents', function(req, res) {
  var auth = getheadersSafeidEmail(req.headers.cookie);
  generigmongoget('users', res, getusersrentts, {'email':auth.email} ,auth);
});

app.get('/getmessages', function(req, res) {
  var auth = getheadersSafeidEmail(req.headers.cookie);
  generigmongoget('users', res, getusermessages, {'email':auth.email} ,auth);
});

app.get('/getmessagesadmin', function(req, res) {
  var auth = getheadersSafeidEmail(req.headers.cookie);
  adminrights(auth, res, getadminmessages);
});


function getadminmessages(bool,res){
if(bool){
  generigmongoget('messages', res, senduserrents);
}else{
  res.send("gitgut");
}

}



app.post('/getratsinfo', function(req, res) {
  generigmongoget('rats', res, getratsinfo, {_id: new ObjectId(req.body._id)});
});


app.post('/editrents', function(req, res) {
  var auth = getheadersSafeidEmail(req.headers.cookie);
  var asd = req.body;
  asd.auth = auth;
  if(req.body.data){
  generigmongoget('users', res, editrent, {'email':auth.email} ,asd);
}else{
  res.send("");
}

});


app.post('/updateprofile', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
    req.body.auth = auth;

    generigmongoget('users', res, updateprofile,
    {_id: new ObjectId(req.body._id)} ,req.body);

});

app.post('/sendmessage', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
    req.body.auth = auth;
    generigmongoget('users', res, handlemessage,
    {email: auth.email} ,req.body);

});

app.post('/adminsendmessage', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
      adminrights(auth, res, adminsendmessage,req.body);

});


app.post('/updaterat', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);

    adminrights(auth, res, updaterat, req.body);
});


app.post('/editrentadmin', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
    adminrights(auth, res, editrentadmin, req.body);
});


app.post('/makerent', function(req, res) {
var thing = getheadersSafeidEmail(req.headers.cookie);
thing.post =  req.body;
generigmongoget('users', res, makerentfunc, {
    email :  thing.email
} ,thing)
});


app.post('/deleterat', function(req, res) {
    //console.log(req.body);
    var auth = getheadersSafeidEmail(req.headers.cookie);
    adminrights(auth, res, delrat, req.body);
});


app.get('/ratlistadmin', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
    adminrights(auth, res, getadminrats);
});

app.get('/rentlistadmin', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
    adminrights(auth, res, getadminrents);
});



app.get('/userlistadmin', function(req, res) {
    var auth = getheadersSafeidEmail(req.headers.cookie);
    adminrights(auth, res, getusers);
});


app.post('/rentarat/newuser', function(req, res) {
    //console.log(req.body);
    if (req.body.Pwd1 == req.body.Pwd2) {
        freeEmail(req.body, res, makeuser);
    } else {
        res.send("password failure");
    }
});

app.post('/rentarat/login', function(req, res) {
    //console.log(req.body);
    if (req.body.email && req.body.pwd) {
        loginMongo(req.body, res, loginHandler);
    } else {
        res.send("failures");
    }
});

app.post('/rentarat/check', function(req, res) {
    if (req.body.email && req.body.safeid) {
        loginMongo(req.body, res, checksafeid);
    } else {
        res.send("wrong pass");
    }
});

app.post('/rentarat/isadmin', function(req, res) {
    //console.log(req.body);
    if (req.body.email && req.body.safeid) {
        adminrights(req.body, res, isadminresfunc);
    } else {
        res.send("wrong pass");
    }
});

app.post('/rentarat/makenewrat', function(req, res) { //Tarkista admin   console.log(req.headers.cookie);
    //  console.log(req);
    if (req.files) {
        req.files.file;
        var auth = getheadersSafeidEmail(req.headers.cookie);
        var data = JSON.parse(req.body.data);
        adminrights(auth, res, makenewrat, data, req.files.file);
    } else {
        res.send("fail");
    }
});



// app.post('/rentarat/makeadmin', function(req, res) {
//     makeadmin(req.body.email , res);
// });


app.listen(8080, function() {
    console.log('Port s 8080')
})





//       :::::::::: :::    ::: ::::    :::  :::::::: ::::::::::: ::::::::::: ::::::::  ::::    :::  ::::::::
//      :+:        :+:    :+: :+:+:   :+: :+:    :+:    :+:         :+:    :+:    :+: :+:+:   :+: :+:    :+:
//     +:+        +:+    +:+ :+:+:+  +:+ +:+           +:+         +:+    +:+    +:+ :+:+:+  +:+ +:+
//    :#::+::#   +#+    +:+ +#+ +:+ +#+ +#+           +#+         +#+    +#+    +:+ +#+ +:+ +#+ +#++:++#++
//   +#+        +#+    +#+ +#+  +#+#+# +#+           +#+         +#+    +#+    +#+ +#+  +#+#+#        +#+
//  #+#        #+#    #+# #+#   #+#+# #+#    #+#    #+#         #+#    #+#    #+# #+#   #+#+# #+#    #+#
// ###         ########  ###    ####  ########     ###     ########### ########  ###    ####  ########



function getheadersSafeidEmail(hsg) { //headerstring = hsg
    if (!hsg) {
        return "rip"
    }
    var values = hsg.split(";");
    var returnvalue = {};
    var asd = {};
    for(i = 0 ; i < values.length ; i++){
      var temp = values[i].split("=");
      temp[0] = temp[0].replace(/ /g, '');
      temp[0] = temp[0].replace(/:/g, '');
      temp[1] = temp[1].replace(/ /g, '');
      temp[1] = temp[1].replace(/:/g, '');
      asd[temp[0]] = temp[1];
    }


    //returnvalue.safeid = values[0].split("=")[1];
    //returnvalue.email = values[1].split("=")[1];

    returnvalue = asd;
    returnvalue.email = returnvalue.email.replace("%40", "@");
    return returnvalue
}


function checksafeid(mongoData, res, postData) {
    //console.log(mongoData);
    //console.log(postData);
    if (mongoData.safeid == postData.safeid) {
        res.send(postData.safeid);
    } else {
        res.send("wrong pass")
    }

}


function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


function crypt(pwd, salt) {
    //var hash = crypto.createHmac('sha256', pwd+salt);
    var hash = crypto.createHash("sha256").update(pwd + salt).digest("hex");
    return hash;
}


function encrypt(pwd, salt, hash) {
    if (hash == crypto.createHash("sha256").update(pwd + salt).digest("hex")) {
        return true;
    } else {
        return false;
    }
}


function loginHandler(mongoData, res, postData) {
    if (mongoData.email == postData.email) {
        //console.log(mongoData);
        if (encrypt(postData.pwd, mongoData.salt, mongoData.pwd)) {
            setsafeid(mongoData.email, res);
        } else {
            res.send("wrong pass");
        }
    }
}


function makeuser(data, res) {
    if (data.Terms == true) {
        var sendToDatabase = {};
        sendToDatabase.salt = makeid(15);
        sendToDatabase.name = data.Name;
        sendToDatabase.pwd = crypt(data.Pwd1, sendToDatabase.salt);
        sendToDatabase.email = data.email;
        makenewuser(sendToDatabase);
        res.send("{what:'fugu!'}");
    } else {
        es.send("{what:'agreement failure!'}");
    }
}


function isadminresfunc(todo, res) {
    if (todo) {
        res.send("true");
    } else {
        res.send("false");
    }
}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

function isInFolder(name) {
    var amount = getDirectories("files/pics");
    //console.log(amount);
    if (amount.indexOf(name) > -1) {
        return 1;
    }
    return -1;
}


function makenewrat(bool, res, post, file) {

    if (bool) {
        console.log("makenewrat");
        var filePath = "files/pics/";
        // make folder for file
        var folder = makeid(10);
        var loopyloop = true;
        while (loopyloop) {
            if (isInFolder(folder) > 0) {
                folder = makeid(10);
            } else {
                loopyloop = false;
            }
        }
        fs.mkdir(filePath + folder);
        var filename = filePath + folder + "/" + file.name;
        var loc = "/rentarat/pics/" + folder + "/" + file.name;
        file.mv(filename, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                var ding = [];
                for (i = 0; i < post.tags.length; i++) {
                    ding.push({
                        'tag': post.tags[i].tag
                    });
                }
                post.tags = ding;
                post.location = loc;
                var rats = "rats";
                genericmongoobject(post, rats, isadminresfunc, res);
            }
        });
    } else {
        res.send("fail");
    }
}



function sendresjson(data, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
}

function senderusers(data, res) {
    for(i = 0 ; i < data.length ; i++){
      delete data[i].salt;
      delete data[i].pwd;
      delete data[i].safeid
    }



    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
}

function getadminrats(bool, res) {
    if (bool) {
        generigmongoget('rats', res, sendresjson);
    } else {
        res.send("gitgut");
    }
}


function getadminrents(bool, res){
  if (bool) {
      generigmongoget('rents', res, sendresjson);
  } else {
      res.send("gitgut");
  }
}

function getusers(bool, res) {
    if (bool) {
        generigmongoget('users', res, senderusers);
    } else {
        res.send("gitgut");
    }
}





function updaterat(bool, res, post) {

    if (bool) {
        genericmongoupdate(post, "rats", res)
    } else {
        res.send("git gut");
    }

}

function delrat(bool, res, body) {
    //console.log("menoo on");
    if (bool) {
        mongodel('rats', {
            _id: new ObjectId(body._id)
        })
        res.send("what is done is done");
    } else {
        res.send("git gut");

    }

}


function makerentfunc(thingy , res ,data){
if (thingy[0].safeid == data.safeid){
//do stuff
//rats
//thingy[0] profiilitietotarkistus ei tähän

//PÄÄLLEKKÄISYYS
data.post.edits = [];
data.post.status = "unconfirmed";
genericmongoobject(data.post, 'rents', makerentfuncres, res);
}else{
  res.send("FAILURE RENT NOT REGISTERED1");
}
}


function makerentfuncres(bool, res){
if(bool){
res.send("RENT SUCCESFUL GO TO PROFILE TO CHECK IT");
}else{
  res.send("FAILURE RENT NOT REGISTERED2");
}

}

function rentlistres(data, res){
  var asd = [];
  var today =  new Date();
  for(i = 0 ; i < data.length ; i++){
    var start =  new Date(data[i].starttime);
    if( data[i].status != "canceled" && start.getTime() >= today.getTime()){
    asd[i] = {};
    asd[i].ratid =  data[i].ratid;
    asd[i].starttime = data[i].starttime;
    asd[i].endtime = data[i].endtime;
    }

  }
  res.send(asd);
}

function pofilehandling(response,res,data){
if(response[0].safeid == data.safeid){
delete response[0].salt;
delete response[0].safeid;
delete response[0].pwd;
res.send(response[0]);
}else{
res.send("U trying to trick me?")
}
}

function updateprofile(mongo, res , data){

if(data.auth.safeid == mongo[0].safeid){
  delete data.auth;
  delete data.email;
genericmongoupdate(data, 'users', res);
}else{
res.send("FAILURE");
}
}

function getusersrentts(response,res,data){
if(response[0].safeid == data.safeid){
  generigmongoget('rents', res, senduserrents, {'renter':data.email});
  }else{
    res.send("U trying to trick me?")
  }
}

function senduserrents(response,res){
res.send(response);
}

function getratsinfo(response,res){
//  console.log(response);
  res.send(response[0]);
}


function editrent(mongo,res,data){

if(mongo[0].safeid == data.auth.safeid){

var thingy = data;

delete thingy.auth;
generigmongoget('rents', res, editrentedits, {_id: new ObjectId(thingy.id)} ,thingy);
  //genericmongoupdate(data, collectionname, res);

}else{
res.send("fail");
}
}


function editrentedits(mongo,res,data){
delete data.id;
mongo[0].edits.push(data);
genericmongoupdate(mongo[0], 'rents', res);

}

function editrentadmin(bool, res, post) {

      if (bool) {
        delete post.edits;
        genericmongoupdate(post, "rents", res)

      } else {
          res.send("git gut");
      }
}



function handlemessage(mongo,res,data){
if(data.auth.safeid == mongo[0].safeid){
  delete data.auth;
  var toarray = {};
  toarray.sender = mongo[0].email;
  toarray.message = data.message;
  toarray.stamp = new Date();
  toarray.to = "admin";

  generigmongoget('messages', res, handlemessagemongos,
  {owner: toarray.sender} ,toarray);
}else{
  res.send("fail");
}
}

function handlemessagemongos(mongo,res,data){
if(mongo[0]){
  mongo[0].responded = false;
  mongo[0].messages.push(data);
  genericmongoupdate(mongo[0], 'messages', res);
}else{
  var object = {};
  object.owner = data.sender;
  object.responded = false;
  object.messages = [];
  object.messages.push(data);
  genericmongoobject(object, 'messages', handlemoremessages, res);
}
}

function handlemessagemongosadmin(mongo,res,data){
if(mongo[0]){
  var message = {};
  message.to=data.to;
  message.stamp = new Date();
  message.sender = "admin";
  message.message = data.message;
  mongo[0].responded = true;
  mongo[0].messages.push(message);
  genericmongoupdate(mongo[0], 'messages', res);
}else{
res.send("fail");
}
}


function adminsendmessage(bool, res, post){
  if(bool){
    //console.log(post);
    generigmongoget('messages', res, handlemessagemongosadmin,  {owner: post.to},post);

  }else{
  res.send("fail");
  }
}

function handlemoremessages(boool,res){
  if(boool){
res.send("done");
  }else{
res.send("fail");
  }

}

function getusermessages(response,res,data){
if(response[0].safeid == data.safeid){
  generigmongoget('messages', res, senduserrents, {'owner':data.email});
  }else{
    res.send("U trying to trick me?")
  }
}


 //  ####  #    # ######  ####  #    #     ####  #      #####     #####  ###### #    # #####  ####
 // #    # #    # #      #    # #   #     #    # #      #    #    #    # #      ##   #   #   #
 // #      ###### #####  #      ####      #    # #      #    #    #    # #####  # #  #   #    ####
 // #      #    # #      #      #  #      #    # #      #    #    #####  #      #  # #   #        #
 // #    # #    # #      #    # #   #     #    # #      #    #    #   #  #      #   ##   #   #    #
 //  ####  #    # ######  ####  #    #     ####  ###### #####     #    # ###### #    #   #    ####


function tayte(){
  this.send = null;
}

function checkforrents(mongo){
for(i = 0; i< mongo.length;i++){
if(mongo[i].status = 'Confirmed'){
var today = new Date().getTime();
var endtime = new Date(mongo[i].endtime).getTime();
if(today > endtime){
mongo[i].status = "done";
genericmongoupdate(mongo[i], 'rents' ,tayte);
}

}
}


}

 setInterval(function() {
  generigmongoget('rents', null, checkforrents);



},60 * 60 * 1000);
