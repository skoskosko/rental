//       :::::::::   ::::::::   :::::::: :::::::::::   ::: ::::::::  :::::::::: :::::::::::
//      :+:    :+: :+:    :+: :+:    :+:    :+:      :+: :+:    :+: :+:            :+:
//     +:+    +:+ +:+    +:+ +:+           +:+     +:+  +:+        +:+            +:+
//    +#++:++#+  +#+    +:+ +#++:++#++    +#+    +#+   :#:        +#++:++#       +#+
//   +#+        +#+    +#+        +#+    +#+   +#+    +#+   +#+# +#+            +#+
//  #+#        #+#    #+# #+#    #+#    #+#  #+#     #+#    #+# #+#            #+#
// ###         ########   ########     ### ###       ########  ##########     ###

app.service('PostThings', function($http) {
    //made with post because no need for 2 directional mambo jambo (expect in chat)
    this.getstuff = function(thisurl, func) {
        // Simple GET request example:

        $http({
            method: 'GET',
            url: thisurl
        }).then(function successCallback(response) {
          func(response.data);
        }, function errorCallback(response) {
        });

    }



    this.genericpost = function(thisurl, myObject, func) {

        $http({
            method: 'POST',
            url: thisurl,
            data: myObject
        }).then(function successCallback(response) {
            func(response.data);
        }, function errorCallback(response) {
            func(response.data);
        });
    }


    this.loginuser = function(datas, func) {

        $http({
            method: 'POST',
            url: loginurl,
            data: datas
        }).then(function successCallback(response) {
            func(response, datas.email);
        }, function errorCallback(response) {
            func(response, datas.email);
        });


    }

    this.checksafe = function(safe, func) {

        $http({
            method: 'POST',
            url: safechec,
            data: safe
        }).then(function successCallback(response) {
            func(response.data);
        }, function errorCallback(response) {
            func(response.data);
        });

    }

    this.isadmin = function(datas, func) {

        $http({
            method: 'POST',
            url: isadminurl,
            data: datas
        }).then(function successCallback(response) {
            if (response.data == "true") {
                func(1);
            } else {
                func(0);
            }
        }, function errorCallback(response) {
            func(0);
        });
    }

    // this.makeadmin = function(safe) {
    //   $http({
    //       method: 'POST',
    //       url: makeadmin,
    //       data: safe
    //   }).then(function successCallback(response) {
    //       console.log(response);
    //   }, function errorCallback(response) {
    //       console.log(response);
    //   });
    //
    // }

    // @@@  @@@ @@@@@@@@ @@@  @@@  @@@ @@@@@@@   @@@@@@  @@@@@@@ @@@@@@@@@@   @@@@@@   @@@@@@@ @@@  @@@ @@@ @@@  @@@ @@@@@@@@
    // @@!@!@@@ @@!      @@!  @@!  @@! @@!  @@@ @@!  @@@   @!!   @@! @@! @@! @@!  @@@ !@@      @@!  @@@ @@! @@!@!@@@ @@!
    // @!@@!!@! @!!!:!   @!!  !!@  @!@ @!@!!@!  @!@!@!@!   @!!   @!! !!@ @!@ @!@!@!@! !@!      @!@!@!@! !!@ @!@@!!@! @!!!:!
    // !!:  !!! !!:       !:  !!:  !!  !!: :!!  !!:  !!!   !!:   !!:     !!: !!:  !!! :!!      !!:  !!! !!: !!:  !!! !!:
    // ::    :  : :: ::    ::.:  :::    :   : :  :   : :    :     :      :    :   : :  :: :: :  :   : : :   ::    :  : :: ::

    this.newratmachine = function(file, data, func) {
    console.log("newratmachine");
        var fd = new FormData();
        fd.append('file', file);
        fd.append('data', JSON.stringify(data));

        $http.post(newraturl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })

        .success(function(response) {
            func();
        })

        .error(function(response) {
            console.log(response);
        });
    }



});
