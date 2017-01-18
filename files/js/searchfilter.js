app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.filter('searchFiltering', function() {




  function objectid(object, attr, searchterm) {
    var returnthing = -1;
      angular.forEach(object, function(value, key) {
        if(value[attr].toUpperCase() == searchterm.toUpperCase()){
          returnthing = key;
        }
      });
      return returnthing;

  }
  function objectidinc(object, attr, searchterm) {
    var returnthing = -1;
      angular.forEach(object, function(value, key) {
        if(value[attr].toUpperCase().indexOf(searchterm.toUpperCase()) !== -1 ){
          returnthing = key;
        }
      });
      return returnthing;

  }




    return function(items, object ,functio) {
      var endresult = [];
      var filtered = [];
      var isin = [];
      var isout = [];
      var nothigs = 0;





      // Yksittäisen hakusanan käsittely

      if(object.tag ){

          angular.forEach(items, function(value, key) {

            if(objectidinc(value.tags,"tag",object.tag) > -1){
                //löytyi


              if(isin.indexOf(value._id) != -1){
                //on taulukossa jo
              }else{
                //ei ole taulukossa
                isin.push(value._id);
                endresult.push(value);
              }
            }else{
              //not here
              if(isout.indexOf(value._id) != -1){
                //on taulukossa jo
              }else{
                //ei ole taulukossa
                isout.push(value._id);
              }
            }


          });



      }else{
        nothigs++;
      }






        //tägien käsittely
          if(object.tags.length > 0){
      angular.forEach(items, function(value, key) {
        angular.forEach(object.tags, function(tagValue, tagKey) {


            if(objectid(value.tags,"tag",tagValue.tag) > -1){
                //löytyi


              if(isin.indexOf(value._id) != -1){
                //on taulukossa jo
              }else{
                //ei ole taulukossa

                isin.push(value._id);
                endresult.push(value);
              }
            }else{
              //not here
              if(isout.indexOf(value._id) != -1){
                //on taulukossa jo
              }else{
                //ei ole taulukossa
                isout.push(value._id);
              }
            }




        });
      });
    }else{
      nothigs++;
    }




    // värin käsittely

if(object.color){



  angular.forEach(items, function(value, key) {

        if(value.color.toUpperCase() == object.color.toUpperCase()){
            //löytyi
            if(isin.indexOf(value._id) != -1){
              //on taulukossa jo
            }else{
              //ei ole taulukossa
              isin.push(value._id);
              endresult.push(value);
            }

          }else{
            //not here
            if(isout.indexOf(value._id) != -1){
              //on taulukossa jo
            }else{
              //ei ole taulukossa
              isout.push(value._id);
            }

          }
});
}else{
  nothigs++;
}





if(object.color){



  angular.forEach(items, function(value, key) {

        if(value.color.toUpperCase() == object.color.toUpperCase()){
            //löytyi
            if(isin.indexOf(value._id) != -1){
              //on taulukossa jo
            }else{
              //ei ole taulukossa
              isin.push(value._id);
              endresult.push(value);
            }

          }else{
            //not here
            if(isout.indexOf(value._id) != -1){
              //on taulukossa jo
            }else{
              //ei ole taulukossa
              isout.push(value._id);
            }

          }
});
}else{
  nothigs++;
}


//Gender



if(object.gender){




    angular.forEach(items, function(value, key) {

          if(value.gender.toUpperCase() == object.gender.toUpperCase()){
              //löytyi
              if(isin.indexOf(value._id) != -1){
                //on taulukossa jo
              }else{
                //ei ole taulukossa
                isin.push(value._id);
                endresult.push(value);
              }

            }else{
              //not here
              if(isout.indexOf(value._id) != -1){
                //on taulukossa jo
              }else{
                //ei ole taulukossa
                isout.push(value._id);
              }

            }
  });






}else{
  nothigs++;
}



//pricehandling







// loppu käsittely muuta numeroa functioiden mukjaan
if(nothigs == 5){
endresult = items;
}else{
for(i = 0; i < isin.length; i++){
      if(isout.indexOf(isin[i]) != -1){
        //oli oikeasti väärin
        isin.splice(i, 1);
        endresult.splice(i,1);
      }
}

}

var returnthing = [];

angular.forEach(endresult, function(value, key) {
if(value.salary >= object.price[0] && value.salary <= object.price[1]){
returnthing.push(value);
}else{}
});



Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}


if(object.orderdate && object.orderlength > 0){



  isin = [];
  isout = [];
  var OrderStart = new Date(object.orderdate).getTime();
  var OrderEnd = new Date(object.orderdate).addHours(object.orderlength).getTime();
  var rattata = [];
  angular.forEach(returnthing, function(value, key) { //jokanen hyväksyttävä rotta läpi Tältä otetaan id
    var ratId = value._id;
      angular.forEach(object.newrenthings, function(rentValue, rentKey) {
         // jokanen tuleva vuokra läpi ja vverrataan object.startdate; ja object.endingdate;

        if(rentValue.ratid == ratId){
          //mahdollisuusconflicktille
          var OldOrderStart =  new Date(rentValue.starttime).getTime();
          var OldOrderEnd =  new Date(rentValue.endtime).getTime();

          if( OrderStart < OldOrderEnd && OldOrderStart < OrderEnd){
              // overlappaa
                 isout.push(ratId);

          }else{
            //ei overlappaa
            if(isin.indexOf(ratId) == -1){
            isin.push(ratId);
            rattata.push(value);
          }
          }
        }else{

          if(isin.indexOf(value._id) == -1){
          isin.push(value._id);
          rattata.push(value);
        }

        }
    });
});


//looppi tarkistus
for(i = 0; i < isin.length; i++){
      if(isout.indexOf(isin[i]) != -1){
        //oli oikeasti väärin
        isin.splice(i, 1);
        rattata.splice(i,1);
      }
}



functio(rattata);
return rattata;

}else{

  functio(returnthing);
  return returnthing;
}






    };





});
