var node  = YOUR NODE ADDRESS
var newuserurl = node+"/rentarat/newuser";
var loginurl = node+"/rentarat/login";
var safechec = node+"/rentarat/check";
var makeadmin = node+"/rentarat/makeadmin";
var isadminurl = node+"/rentarat/isadmin";
var newraturl = node+"/rentarat/makenewrat";
var admingetrats = node+"/ratlistadmin";
var getratsurl = node+"/ratlist";
var getrenttimes = node+"/rentlist";
var admindelrat = node+"/deleterat";
var adminupdaterat = "node/updaterat";
var makerent = node+"/makerent";
var getprofileinfo = node+"/getprofileinfo";
var updateprofile = node+"/updateprofile";
var getusersrents =node+"/getusersrents";
var getratsinfo =node+"/getratsinfo";
var editrent = node+"/editrents";
var getmessages =  node+"/getmessages";
var kieli = "eng";


app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    //modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

//  ####   ####   ####  #    # # ######
// #    # #    # #    # #   #  # #
// #      #    # #    # ####   # #####
// #      #    # #    # #  #   # #
// #    # #    # #    # #   #  # #
//  ####   ####   ####  #    # # ######
app.service('Cookies', function($cookies, PostThings) {
    this.setcookies = function(email, safeid) {
        $cookies.put('safeid', safeid);
        $cookies.put('email', email);
        $(".fname").text(email);
    }


    this.setlangcookies = function(lang) {
        $cookies.put('lang', lang);
    }

    this.getLangCookies = function() {
        if ($cookies.get('lang')) {
            asd = $cookies.get('lang');
            return asd;
        } else {
            return "eng";
        }
    }

    this.getCookies = function() {
        if ($cookies.get('email') && $cookies.get('safeid')) {
            asd = {};
            asd.email = $cookies.get('email');
            asd.safeid = $cookies.get('safeid');
            return asd;

        } else {
            asd = {};
            return asd;
        }
    }



    this.cookiesSet = function() {
        if ($cookies.get('email') && $cookies.get('safeid')) {
            return true;
        } else {
            return false;
        }
    }

    this.safe = function(func) {

        if (this.cookiesSet()) {

            var asd = {};
            asd = this.getCookies();
            PostThings.checksafe(asd, isSafe)
        } else {

            func(0);
        }

        function isSafe(result) {

            if (result == $cookies.get('safeid')) {
                func(1);
            } else {
                func(0);
            }
        }



    }


});




//   ##   #      #    #   ##   #   #  ####  #####  #    # #    #
//  #  #  #      #    #  #  #   # #  #      #    # #    # ##   #
// #    # #      #    # #    #   #    ####  #    # #    # # #  #
// ###### #      # ## # ######   #        # #####  #    # #  # #
// #    # #      ##  ## #    #   #   #    # #   #  #    # #   ##
// #    # ###### #    # #    #   #    ####  #    #  ####  #    #

app.service('alwaysRun', function(Cookies) {
    this.setBanner = function(i) {
        if (i == 0) {
            $('#Home').addClass("active");
            $('#Rentals').removeClass("active");
            $('#Profile').removeClass("active");
        } else if (i == 1) {
            $('#Rentals').addClass("active");
            $('#Home').removeClass("active");
            $('#Profile').removeClass("active");
        } else if (i == 2) {
            $('#Profile').addClass("active");
            $('#Rentals').removeClass("active");
            $('#Home').removeClass("active");
        } else if (i == 3) {
            $('#Profile').removeClass("active");
            $('#Rentals').removeClass("active");
            $('#Home').removeClass("active");
        }

        if (Cookies.cookiesSet()) {
            $("footer").css("visibility", "visible");
            $(".fname").text(Cookies.getCookies().email);
        } else {
            $("footer").css("visibility", "hidden");
        }
    }
this.date = function(today){
var dd = today.getDate();
var mm = today.getMonth()+1;
var hh = today.getHours();
var mmm = today.getMinutes();
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd;
}
if(mm<10){
  mm='0'+mm;
}
if(mmm<10){
  mmm='0'+mmm;
}
var today = dd+'.'+mm+'.'+yyyy + " " + hh+":"+mmm;
return today;

}
    this.forAccordion = function() {

        var acc = document.getElementsByClassName("accordion");
        for (var i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }

    }

});


//         :::   :::       :::     ::::::::::: ::::    :::  :::::::: ::::::::::: :::::::::  :::
//       :+:+: :+:+:    :+: :+:       :+:     :+:+:   :+: :+:    :+:    :+:     :+:    :+: :+:
//     +:+ +:+:+ +:+  +:+   +:+      +:+     :+:+:+  +:+ +:+           +:+     +:+    +:+ +:+
//    +#+  +:+  +#+ +#++:++#++:     +#+     +#+ +:+ +#+ +#+           +#+     +#++:++#:  +#+
//   +#+       +#+ +#+     +#+     +#+     +#+  +#+#+# +#+           +#+     +#+    +#+ +#+
//  #+#       #+# #+#     #+#     #+#     #+#   #+#+# #+#    #+#    #+#     #+#    #+# #+#
// ###       ### ###     ### ########### ###    ####  ########     ###     ###    ### ##########


app.controller('MainCtrl', function($scope, language, Cookies,$cookies, $location) {
    $scope.lang = language.setLanguage(kieli);
    $scope.logout = function() {

        if ($cookies.get('email') && $cookies.get('safeid')) {
            $cookies.remove('safeid');
            $cookies.remove('email');
            $location.path("/login");
        }
    }

 $scope.langfunc = function(a){
  Cookies.setlangcookies(a);
  $scope.lang = language.setLanguage(kieli);
  $location.path("/");
 }

});

//       :::    :::  ::::::::    :::   :::   :::::::::: ::::::::   ::::::::  ::::    ::: ::::::::::: :::::::::   ::::::::  :::        :::        :::::::::: :::::::::
//      :+:    :+: :+:    :+:  :+:+: :+:+:  :+:       :+:    :+: :+:    :+: :+:+:   :+:     :+:     :+:    :+: :+:    :+: :+:        :+:        :+:        :+:    :+:
//     +:+    +:+ +:+    +:+ +:+ +:+:+ +:+ +:+       +:+        +:+    +:+ :+:+:+  +:+     +:+     +:+    +:+ +:+    +:+ +:+        +:+        +:+        +:+    +:+
//    +#++:++#++ +#+    +:+ +#+  +:+  +#+ +#++:++#  +#+        +#+    +:+ +#+ +:+ +#+     +#+     +#++:++#:  +#+    +:+ +#+        +#+        +#++:++#   +#++:++#:
//   +#+    +#+ +#+    +#+ +#+       +#+ +#+       +#+        +#+    +#+ +#+  +#+#+#     +#+     +#+    +#+ +#+    +#+ +#+        +#+        +#+        +#+    +#+
//  #+#    #+# #+#    #+# #+#       #+# #+#       #+#    #+# #+#    #+# #+#   #+#+#     #+#     #+#    #+# #+#    #+# #+#        #+#        #+#        #+#    #+#
// ###    ###  ########  ###       ### ########## ########   ########  ###    ####     ###     ###    ###  ########  ########## ########## ########## ###    ###

app.controller('HomeController', function($scope, alwaysRun, language, $location,Cookies) {
    alwaysRun.setBanner(0);
    $scope.lang = [];
    $scope.lang = language.setLanguage(kieli);














});


//       :::::::::  :::::::::   ::::::::  :::::::::: ::::::::::: :::        :::::::::: ::::::::  ::::    ::: ::::::::::: :::::::::  :::
//      :+:    :+: :+:    :+: :+:    :+: :+:            :+:     :+:        :+:       :+:    :+: :+:+:   :+:     :+:     :+:    :+: :+:
//     +:+    +:+ +:+    +:+ +:+    +:+ +:+            +:+     +:+        +:+       +:+        :+:+:+  +:+     +:+     +:+    +:+ +:+
//    +#++:++#+  +#++:++#:  +#+    +:+ :#::+::#       +#+     +#+        +#++:++#  +#+        +#+ +:+ +#+     +#+     +#++:++#:  +#+
//   +#+        +#+    +#+ +#+    +#+ +#+            +#+     +#+        +#+       +#+        +#+  +#+#+#     +#+     +#+    +#+ +#+
//  #+#        #+#    #+# #+#    #+# #+#            #+#     #+#        #+#       #+#    #+# #+#   #+#+#     #+#     #+#    #+# #+#
// ###        ###    ###  ########  ###        ########### ########## ########## ########  ###    ####     ###     ###    ### ##########

app.controller('ProfileController', function($scope, alwaysRun, language, $location, $cookies, PostThings, Cookies) {
    Cookies.safe(outtahere);
    $scope.profile = {};
    $scope.profilerat = {};
    $scope.profilerat.location = "/rentarat/states/img/ratbanner.png";
    $scope.incomingrents = [];
    $scope.historyrents = [];
    $scope.profrat = {};
    $scope.editpost = {};
    $scope.message ="";
    $scope.messages = [];
    function outtahere(i) {
        if (i == 0) {
            $location.path("/login");
        } else {
            PostThings.getstuff(getprofileinfo, profileresponse);
            PostThings.getstuff(getusersrents, rentsresponse);
            PostThings.getstuff(getmessages , setmessages);


            //  console.log("datahakuun");
        }
    }
function setmessages(data){
  if(data[0]){
  $scope.messages = data[0].messages;
  }
}

function profileresponse(data){
  $scope.message ="";
  if(!data.address || !data.town ||!data.postal ||!data.address){
        $scope.message = $scope.lang.makesureprofile;
  }

  $scope.profile = data;
}
function rentsresponse(data){

    angular.forEach(data, function(value, key) {
      var today = new Date().getTime();
      var endtime = new Date(value.endtime).getTime();
      if(today < endtime && value.status != "canceled"  &&  value.status != "done"){
        value.endtime =  alwaysRun.date(new Date(value.endtime));
        value.starttime =  alwaysRun.date(new Date(value.starttime));
        $scope.incomingrents.push(value);
      }else{
        value.endtime =  alwaysRun.date(new Date(value.endtime));
        value.starttime =  alwaysRun.date(new Date(value.starttime));
        $scope.historyrents.push(value);

      }
    });
}

    alwaysRun.setBanner(2);
    $scope.lang = [];
    $scope.lang = language.setLanguage(kieli);
    alwaysRun.forAccordion();








$scope.editprofile = function(){
$(".profileProfile").css("display","none");
$(".profileEdit").css("display","inline-block");


}


$scope.profiledited = function(){
  PostThings.genericpost(updateprofile, $scope.profile, profiledited);
}
function profiledited(){
  $(".profileEdit").css("display","none");
  $(".profileProfile").css("display","inline-block");
  PostThings.getstuff(getprofileinfo, profileresponse);
}



$scope.ratmodal = function(id){
  var asd = {};
  asd._id = id;
  PostThings.genericpost(getratsinfo, asd, posted);
}

function posted(data){
  //console.log(data);
  $scope.profilerat = data;
}

$scope.infomodal = function(data){
  $scope.thingy = data;
}


$scope.editorder = function(data){
var editorder = {};
editorder.reason = "edit";
editorder.data = data;
editorder.id = $scope.thingy;
PostThings.genericpost(editrent, editorder, orderinfo)
}

$scope.cancelorder = function(data){
  var editorder = {};
  editorder.reason = "cancel";
  editorder.data = data;
  editorder.id = $scope.thingy;
  PostThings.genericpost(editrent, editorder, orderinfo)
}

function orderinfo(data){
console.log(data);

}




$scope.sendmessage = function(mes){
var asd = {};
asd.message = mes;
PostThings.genericpost(node+"/sendmessage", asd, messageres);
}
function messageres(asd){

PostThings.getstuff(getmessages , setmessages);

}





});


// #       ####   ####  # #    #  ####   ####  #    # ##### #####   ####  #
// #      #    # #    # # ##   # #    # #    # ##   #   #   #    # #    # #
// #      #    # #      # # #  # #      #    # # #  #   #   #    # #    # #
// #      #    # #  ### # #  # # #      #    # #  # #   #   #####  #    # #
// #      #    # #    # # #   ## #    # #    # #   ##   #   #   #  #    # #
// ######  ####   ####  # #    #  ####   ####  #    #   #   #    #  ####  ######
app.controller('LoginController', function($scope, alwaysRun, language, PostThings, $location, Cookies) {

    $scope.new = {};
    alwaysRun.setBanner(3);
    $scope.lang = [];
    $scope.lang = language.setLanguage(kieli);
    $("#newuserreg").css("visibility", "hidden");

    $scope.newuser = function() {
      //console.log($scope.new);
      PostThings.genericpost(newuserurl,$scope.new, $scope.newusermade);
    }


    $scope.newusermade = function(data) {
            $scope.login($scope.new.email, $scope.new.Pwd1);
    }

    $scope.logindone = function(data, mail) {

        if (data.data == "wrong pass") {
            //failure"
        } else {
            Cookies.setcookies(mail, data.data);
            $location.path("/profile")
        }

    }


    $scope.login = function(mail, pwd) {
        var asd = {};
        asd.email = mail;
        asd.pwd = pwd;
        PostThings.loginuser(asd, $scope.logindone);
    }


    $scope.checkdata = function() {
        if ($scope.new.Terms = true) {
            var trues = 0;
            if ($scope.new.Pwd1 == $scope.new.Pwd2 && $scope.new.Pwd1.length >= 6) {
                trues++;
            } else {
                $scope.new.Pwd1 = "";
                $scope.new.Pwd2 = "";
            }
            if ($scope.new.email) {
                trues++;
            } else {
                $scope.new.email = "";
            }
            if ($scope.new.Name) {
                trues++
            }
            if (trues == 3) {
                $("#newuserreg").css("visibility", "visible");
            } else {
                $("#newuserreg").css("visibility", "hidden");
                $scope.new.Terms = false;
            }
        } else {
            $("#newuserreg").css("visibility", "hidden");
        }

    }

});
