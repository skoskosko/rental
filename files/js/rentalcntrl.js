

//       :::::::::  :::::::::: ::::    ::: ::::::::::: ::::::::  ::::    ::: ::::::::::: :::::::::  :::
//      :+:    :+: :+:        :+:+:   :+:     :+:    :+:    :+: :+:+:   :+:     :+:     :+:    :+: :+:
//     +:+    +:+ +:+        :+:+:+  +:+     +:+    +:+        :+:+:+  +:+     +:+     +:+    +:+ +:+
//    +#++:++#:  +#++:++#   +#+ +:+ +#+     +#+    +#+        +#+ +:+ +#+     +#+     +#++:++#:  +#+
//   +#+    +#+ +#+        +#+  +#+#+#     +#+    +#+        +#+  +#+#+#     +#+     +#+    +#+ +#+
//  #+#    #+# #+#        #+#   #+#+#     #+#    #+#    #+# #+#   #+#+#     #+#     #+#    #+# #+#
// ###    ### ########## ###    ####     ###     ########  ###    ####     ###     ###    ### ##########

app.controller('RentalController', function($scope, $location, alwaysRun, language ,PostThings,Cookies) {
    $scope.ratlist = [];
    $scope.profilerat = {};
    $scope.profilerat.location = "/rentarat/states/img/ratbanner.png";
    $scope.newrent = {};
    alwaysRun.setBanner(1);
    $scope.lang = [];
    $scope.lang = language.setLanguage(kieli);
    $scope.message = {};
    $scope.message.info = $scope.lang.setordertime;
    $scope.search = {};
    $scope.search.tags = [];
    PostThings.getstuff(getratsurl, assignRatlist);

    PostThings.getstuff(getrenttimes, assignOldrents);

    $scope.search.price = []
    $scope.search.price[0] = 0;
    $scope.search.price[1] = 500;
    $scope.retrunfromthing = {};
    $scope.search.newrenthings = [];
    $scope.today = new Date().toISOString().split('T')[0];

    function assignOldrents(data){

      $scope.search.newrenthings = data;

    }

    Cookies.safe(outtahere);

    function outtahere(i) {
        if (i == 0) {

          $("#notloggedin").css("display","inline-block");
          $("#loggedin").css("display","none");

        } else {
              $("#notloggedin").css("display","none");
              $("#loggedin").css("display","inline-block");

            //  console.log("datahakuun");

        }

    }
//data-slider-id='ex1Slider' data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"
$("#ex2").slider({ id: "slider2", min: 1, max: 500, range: true, value: [1, 500] });
$("#ex1").slider({ id: "slider1", min: 0, max: 100, value: 0 });


$scope.search.orderlength = 0;
    $('#ex1').slider({
    	formatter: function(value) {
    		return 'Current value: ' + value;
    	}
    });

    $("#ex1").on("slide", function(slideEvt) {
      $scope.search.orderlength =slideEvt.value;;
      $scope.$apply();
    });

    $("#ex3").on("slide", function(slideEvt) {
      $scope.search.orderlength =slideEvt.value;;
      $scope.$apply();
    });

    $("#ex2").on("slide", function(slideEvt) {

      $scope.search.price =slideEvt.value;;
      $scope.$apply();

    });



    function addSearchTag() {

    var itsin = true;
    angular.forEach($scope.search.tags, function(value, key) {
        if ($scope.search.tags[key].tag == $scope.search.tag) {
            itsin = false;
        }
    });
    if (itsin) {
        var element = {};
        element.tag = $scope.search.tag;
        $scope.search.tags.push(element);
        $scope.search.tag = "";
    }


}




    var taginput = document.getElementById("searchBar");
    taginput.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
            addSearchTag();
            $scope.$apply();

        }
    });


    $scope.loginmodal = function(){
      alert("modal auki ja paikat paskaksi");
    }

    $scope.delSearchTag = function(index) {

        $scope.search.tags.splice(index, 1);


    }


    $scope.editarray = function(array){
      $scope.taglist = [];

      angular.forEach(array, function(value, key) {
        angular.forEach(value.tags, function(value2, key2) {
           var index = $scope.taglist.indexOf(value2.tag)
           if (index === -1) {
              $scope.taglist.push(value2.tag);
           }
        });
      });
  }


    function assignRatlist(data){

      $scope.ratlist=data;

      angular.forEach($scope.ratlist, function(value, key) {
          $scope.ratlist[key].number = key;
          var thing = $scope.ratlist[key].birthdate.split("T");
          thing = thing[0];
          thing  = thing.split("-");
          var dat = getAge(thing[0]-1,thing[1]-1,thing[2]-1);
          $scope.ratlist[key].age = dat;

      });



      $scope.colorlist = [];
      var colorarray = [];

      angular.forEach($scope.ratlist, function(value, key) {
          var index = colorarray.indexOf(value.color);
          if (index === -1) {
            colorarray.push(value.color);
             $scope.colorlist.push({"color" : value.color, "amount" : 1});
          }else{
             $scope.colorlist[index].amount++;
          }

      });

    }


    function getAge(a,b,c) {
        var today = new Date();
        var birthDate = new Date(a,b,c);
        var time = today- birthDate;
        return Math.floor(time/1000/60/60/24/30);
    }

    $scope.infocardclicked = function(id){
      $("#ex3").slider({ id: "slider1", min: 0, max: 100, value: $scope.search.orderlength });
      $scope.profilerat = $scope.ratlist[id];

//.css("display" , "none")   .css("display","inline-block")


    $(".profileleft").css("width", $(window).width()/3 );
    $(".profileright").css("min-width", $(window).width()/2 );



      $(".rentarea").fadeOut();
      $(".profilearea").fadeIn();
      $(".profilearea").css("min-height", function(){
        if($('footer').is(':visible')) {
            return $(window).height() - $(".navbar").height() - 150 ;
        }else{
            return $(window).height() - $(".navbar").height();
        }
    });
      $("html, body").stop().animate({scrollTop:150}, '500');


 //alert($("#sataimage").height());


    }


    $scope.backtorents = function(){
      $("html, body").stop().animate({scrollTop:0}, '500')
        $(".profilearea").fadeOut();
        $(".rentarea").fadeIn();

        //$(".profilearea").fadeOut().css("display" , "none");
        //$(".rentarea").fadeIn().css("display" , "inline");

    }


$scope.gotologin = function(){

$location.path("/login")
}







function logindone(data, mail) {

    if (data.data == "wrong pass") {
        //failure"
    } else {
        Cookies.setcookies(mail, data.data);
            alwaysRun.setBanner(2);
            Cookies.safe(outtahere);

    }

}


$scope.login = function(mail, pwd) {
    var asd = {};
    asd.email = mail;
    asd.pwd = pwd;
    PostThings.loginuser(asd, logindone);
}





Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

 // #    #   ##   #####  ####  #    #
 // #    #  #  #    #   #    # #    #
 // #    # #    #   #   #      ######
 // # ## # ######   #   #      #    #
 // ##  ## #    #   #   #    # #    #
 // #    # #    #   #    ####  #    #

$scope.$watchGroup([ 'search.orderdate','search.orderlength'], function(newValues, oldValues, scope) {

  if($scope.search.orderdate && $scope.search.orderlength && $scope.profilerat && $scope.profilerat._id){
    var d = new Date($scope.search.orderdate);
    $scope.search.endingdate = d.addHours($scope.search.orderlength).toString();
    $scope.search.startdate =  new Date($scope.search.orderdate).toString();
    var OrderStart = new Date( $scope.search.orderdate).getTime();
    var OrderEnd = new Date( $scope.search.endingdate).getTime();


if($scope.search.newrenthings.length > 0){
  var keepGoing = true;
    angular.forEach($scope.search.newrenthings, function(rentValue, rentKey) {
      if(keepGoing) {

       // jokanen tuleva vuokra läpi ja vverrataan object.startdate; ja object.endingdate;

      if(rentValue.ratid == $scope.profilerat._id){
        //mahdollisuusconflicktille

        var OldOrderStart =  new Date(rentValue.starttime).getTime();
        var OldOrderEnd =  new Date(rentValue.endtime).getTime();

        if( OrderStart < OldOrderEnd && OldOrderStart < OrderEnd){

            // overlappaa
            $scope.message.info =$scope.lang.setordertime2;
            $("#makeorder").css("visibility","hidden");
            keepGoing = false;
        }else{
          
          //ei overlappaa
          $scope.message.info ="";
          $("#makeorder").css("visibility","visible");
      }
    }else{
      $scope.message.info ="";
      $("#makeorder").css("visibility","visible");
    }
    }
  });


}else{
  $scope.message.info ="";
  $("#makeorder").css("visibility","visible");
}


  }else{
    $scope.message.info = $scope.lang.setordertime;
    $("#makeorder").css("visibility","hidden");
  }






  // newValues array contains the current values of the watch expressions
  // with the indexes matching those of the watchExpression array
  // i.e.
  // newValues[0] -> $scope.foo
  // and
  // newValues[1] -> $scope.bar
});



 // #####  ###### #    # #####     ####  ###### #    # #####
 // #    # #      ##   #   #      #      #      ##   #   #
 // #    # #####  # #  #   #       ####  #####  # #  #   #
 // #####  #      #  # #   #           # #      #  # #   #
 // #   #  #      #   ##   #      #    # #      #   ##   #
 // #    # ###### #    #   #       ####  ###### #    #   #

$scope.sendingthing = function(){
  var asd = $scope.rentingrat;
  PostThings.genericpost(makerent,asd ,changestufonmodal);
}
$scope.clsoingsending = function(){



  $("#beforerentretunr").css("display","inline-block");
  $("#rentretunr").css("display","none");
  $location.path("/profile");
}

function changestufonmodal(data){


$("#beforerentretunr").css("display","none");
$("#sendrentbutton").css("display","none");
$("#rentretunr").css("display","inline-block");
$scope.retrunfromthing.return = data;

}
 // #####  ###### #    # #####    #####    ##   #####    ##   #    # ###### ##### ###### #####   ####      ####  ###### #####
 // #    # #      ##   #   #      #    #  #  #  #    #  #  #  ##  ## #        #   #      #    # #         #      #        #
 // #    # #####  # #  #   #      #    # #    # #    # #    # # ## # #####    #   #####  #    #  ####      ####  #####    #
 // #####  #      #  # #   #      #####  ###### #####  ###### #    # #        #   #      #####       #         # #        #
 // #   #  #      #   ##   #      #      #    # #   #  #    # #    # #        #   #      #   #  #    #    #    # #        #
 // #    # ###### #    #   #      #      #    # #    # #    # #    # ######   #   ###### #    #  ####      ####  ######   #

$scope.setRental = function(){

$scope.rentingrat = {};
$scope.rentingrat.renter = Cookies.getCookies().email;
$scope.rentingrat.starttime = $scope.search.startdate;
$scope.rentingrat.endtime = $scope.search.endingdate;
$scope.rentingrat.ratid = $scope.profilerat._id;
$scope.rentingrat.ratname = $scope.profilerat.name;
$scope.rentingrat.text = $scope.search.text;
$scope.rentingrat.price = $scope.search.orderlength*$scope.profilerat.salary;

//console.log($scope.rentingrat);


}








});
