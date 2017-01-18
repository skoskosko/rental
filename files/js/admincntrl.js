//   ##   #####  #    # # #    #  ####  #    # ##### #####  #
//  #  #  #    # ##  ## # ##   # #    # ##   #   #   #    # #
// #    # #    # # ## # # # #  # #      # #  #   #   #    # #
// ###### #    # #    # # #  # # #      #  # #   #   #####  #
// #    # #    # #    # # #   ## #    # #   ##   #   #   #  #
// #    # #####  #    # # #    #  ####  #    #   #   #    # ######

app.controller('AdminController', function($scope, alwaysRun, language, $location, Cookies, PostThings) {
    // $scope.makeadmin = function(email){
    //  var asd = {};
    //  asd.email = email;
    // PostThings.makeadmin(asd);
    //
    // }





    $("#input-id").fileinput({
        showCaption: false,
        allowedFileExtensions: ['jpg', 'png', 'dankmeme'],
        allowedPreviewTypes: ['image'],
        maxFileCount: 1,
        showPreview: true,
        showUpload: false,
        showRemove: false
    });

    $('#input-id').change(function() {
        if (!this.files.length) return;
        $scope.ratimage = this.files[0];
    });
    $scope.currentrat;
    $scope.newrat = {};
    $scope.newrat.tags = [];
    $scope.newrat.status = "hidden";
    alwaysRun.setBanner(3);
    alwaysRun.forAccordion();
    $scope.lang = [];
    $scope.lang = language.setLanguage(kieli);
    Cookies.safe(outtahere);
    PostThings.isadmin(Cookies.getCookies(), outtahere);

    function outtahere(i) {
        if (i == 0) {
            $location.path("/");
        } else {
            PostThings.getstuff(admingetrats,completerats);
            PostThings.getstuff(node+'/userlistadmin',userfunction);
            PostThings.getstuff(node+'/rentlistadmin', rentsresponse);
            PostThings.getstuff(node+'/getmessagesadmin', setmessages);

        }
    }
  $scope.incomingrents = [];
  $scope.historyrents = [];

function setmessages(data){

$scope.messagethingy = [];
  for(i = 0 ;  i < data.length; i++ ){
    if(data[i].responded == false){
      $scope.messagethingy.push(data[i]);
    }

  }


}
    function rentsresponse(data){
      $scope.incomingrents = [];
        $scope.historyrents = [];
        angular.forEach(data, function(value, key) {


          var today = new Date().getTime();
          var endtime = new Date(value.endtime).getTime();
          if(today < endtime && value.status != "Canceled" &&  value.status != "Done"){
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

function userfunction(data){
  $scope.users = data;
}

function ratupdate(){
PostThings.getstuff(admingetrats,completerats);
}
function completerats(data){
data.forEach(function(entry,id) {
                    data[id].number = id;
                    });
$scope.completeratlist = data;
}

    $scope.addTag = function(tag) {
      //alert();
        var itsin = true;
        angular.forEach($scope.newrat.tags, function(value, key) {
            if ($scope.newrat.tags[key].tag == tag) {
                itsin = false;
            }
        });
        if (itsin) {
            if (tag != "") {
                $scope.newrat.tags.push({
                    'tag': tag
                });
                $scope.tag = "";
            }
        }
    }
    $scope.addTag2 = function(tag) {

        var itsin = true;
        angular.forEach($scope.currentrat.tags, function(value, key) {
            if ($scope.currentrat.tags[key].tag == tag) {
                itsin = false;
            }
        });
        if (itsin) {
          //alert();
            if (tag != "") {
                $scope.currentrat.tags.push({
                    'tag': tag
                });
                $scope.tag = "";
            }
        }
    }

    $scope.addCurTag = function(tag) {
        var itsin = true;
        angular.forEach($scope.currentrat.tags, function(value, key) {
            if ($scope.currentrat.tags[key].tag == tag) {
                itsin = false;
            }
        });
        if (itsin) {
            if (tag != "") {
                $scope.currentrat.tags.push({
                    'tag': tag
                });
                $scope.tag = "";
            }
        }
    }


    $scope.delTag = function(index) {
        $scope.newrat.tags.splice(index, 1);
    }
    $scope.delCurTag = function(index) {
        $scope.currentrat.tags.splice(index, 1);
    }


    $scope.submitnewrat = function() {
        PostThings.newratmachine($scope.ratimage, $scope.newrat, getratlist);
    }

    $scope.updaterat = function(){

        var sendtomong = $scope.currentrat;
          delete sendtomong.$$hashKey;
          delete sendtomong.number;
          PostThings.genericpost(adminupdaterat, sendtomong, getratlist);
    }

    $scope.infomodal = function(i){
      $scope.currentrat = $scope.completeratlist[i];
    }

    function getratlist() {    PostThings.getstuff(admingetrats,completerats);}

    $scope.delrat = function(datas){
      var asd = {};
      asd._id = datas;
      PostThings.genericpost(admindelrat, asd,ratupdate)
    }
$scope.modaltext = {};

    $scope.readinmodal = function(asd){
      $scope.modaltext.text = asd;
    }
$scope.rentedit = {};
$scope.editrents= function(data){
$scope.rentedit = data;

}

$scope.editrent= function(data){
console.log();
PostThings.genericpost(node+'/editrentadmin", $scope.rentedit,ratupdate)
}
function ratstatusdone(done){
PostThings.getstuff(node+'/rentlistadmin', rentsresponse);
}





$scope.messagemodal = {};
$scope.messagemodalfunc = function(mes){
$scope.messagemodal  = mes;
}




$scope.sendmessage = function(data){
  var object = {};
  object.message = data;
  object.to =   $scope.messagemodal.owner;
  PostThings.genericpost(node+'/adminsendmessage", object, messageres);

}
function messageres(){
  PostThings.getstuff(node+'/getmessagesadmin', setmessages);
}








});
