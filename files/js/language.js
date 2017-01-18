app.service('language', function(Cookies) {


    this.setLanguage = function() {

        var lang = Cookies.getLangCookies();


        if (lang == "eng") {
             lang = [];
            lang.banner = 'Welcome';
            lang.footer1 = "ratstreets of new orleans";
            lang.text = 'Hello and welcome to our service for you. You must remember all those times you want to just a little brake from it all. Brake from the rat race of life. Please feel free to browse our options and contact us with any problems. Remember that all rented rats must be picked up and returned in accepted rental time. All payments are made with physical or emailed bill to the customers location.';
            lang.message = 'Hello from BlogController';
            lang.loginhere = "Login Here"
            lang.email = "Email address";
            lang.password = "Password";
            lang.signin = "Sign in";
            lang.register = "Register new user"
            lang.registernew = "Give your basic information"
            lang.name = "Full name";
            lang.save = "Register";
            lang.close = "Close";
            lang.pswdinst = "Repeat same over 6 character password"
            lang.terms = "I Agree terms and conditions and my given information is correct";
            lang.link = "https://www.youtube.com";


            lang.renting = "Renting";
            lang.rentalstop = "Rats to rent";
            lang.ratname = "Rats name";
            lang.weight = "Weight";
            lang.gender = "Gender";
            lang.color = "Color";
            lang.age = "Age";
            lang.salary ="Salary";
            lang.months = "Months";
            lang.description = "Description";
            lang.loginorder = "Please login to make orders";
            lang.rentarat = "Rent this rat!";
            lang.giverentformation = "Give renting information";
            lang.orderdate = "Orderdate";
            lang.ordertime = "Ordertime (o'clock)";
            lang.orderlength = "Orderlength(h)";
            lang.priceperhour = "Price €/h";
            lang.eurotoh = "€/h";
            lang.searhtagsbla = "Tag search. Press enter to add tag to search terms.";
            lang.rentingthisrat ="You are trying to rent this rat in following time";
            lang.totalprice = "Total price";
            lang.makeorder ="Make order";
            lang.areyousure ="You are going to rent rat ";
            lang.areyousure2 =" for ";
            lang.areyousure3 ="€ this action is legally binding and canceling this order will result in a cancelin cost. Every rat rent will be individially checked to make sure rat is right match for the task. PLease check your profile for rental confirmation";
            lang.starttime = "Starttime";
            lang.endtime = "Endtime";
            lang.renttext = "Please enter text here to descripe your renting needs. This will help us determinate are you good enough for the rent you are going to place.";
            lang.setordertime = "Set Order Time";
            lang.setordertime2 = "Your order is overlapping with old orders";
            lang.renter = "renter";

            lang.profile = "Profile";
            lang.userinfo = "Personal Information";
            lang.userinfoinfo = "here we have profile editing and stuff";
            lang.activerents = "Active rents";
            lang.activerentsinfo = "get active rents from server";
            lang.renthistory = "Renting history";
            lang.renthistoryinfo = "History of rented rats";
            lang.email = "Email";
            lang.name = "Name";
            lang.town = "Town";
            lang.postal = "Postalcode";
            lang.address = "Address";
            lang.freeword = "Free word";
            lang.edit = "Edit";
            lang.savesave ="Save";
            lang.status = "Status";
            lang.ratsname = "Rats name";
            lang.starttime = "Rent start";
            lang.endtime = "Rent end";
            lang.price = "Rent price";
            lang.close = "close";
            lang.makesureprofile ="Make sure your profile is complete. We will not confirm rents for incomplete profiles";
            lang.editrent ="Edit rent";
            lang.descipreWHY = "Please descripe reason of your edit";
            lang.editorder = "Edit Order";
            lang.cancelorder = "Cancel Order";
            lang.message ="Message";
            lang.from = "from";

            lang.home = "Home";
            lang.rentals ="Rentals";
            lang.ContactUs ="Contact us";

            return lang;
        }
        if (lang == "fin") {
             lang = [];
            lang.banner = 'Tervetuloa';
            lang.footer1 = "New Orleanssin rottakadut";
            lang.text = 'Hei! ja tervetuloa tarjoamaamme palveluun. Muistat varmasti ne kaikki hetket kun olet halunnut pienen tauon. Tauon elämän rotanpyöräsrä.Toivotamme teidät tervetulleeksi tutustumaan tarjontaamme ja ottamaan meihin yhteyttä kaikkiin ongelmissa. Muista kuitenkin että kaikki vuokraamasi rotat tulee noutaa ja palauttaa vuokra ajan sisällä. Maksut suoritetaan joko fyysisellä tai sähköpostiinlähetettävällä laskuslla.';
            lang.loginhere = "Kirjaudu sisään täällä"
            lang.email = "Sähköposti";
            lang.password = "Salasana";
            lang.signin = "Kirjaudu sisään";
            lang.register = "Rekisteröi uusi käyttäjä"
            lang.registernew = "Anna tietosi"
            lang.name = "Koko nimi";
            lang.save = "Rekisteröidy";
            lang.close = "Sulje";
            lang.pswdinst = "Toista sama yli kuuden merkin salasana"
            lang.terms = "Hyväksyn käyttäjäehdot ja palvelun toimintamallin";
            lang.link = "https://www.youtube.fi";


            lang.renting = "Vuokrataan";
            lang.rentalstop = "Vuokrattavat rotat";
            lang.ratname = "Rotan nimi";
            lang.weight = "Paino";
            lang.gender = "Sukupuoli";
            lang.color = "Väri";
            lang.age = "Ikä";
            lang.salary ="Palkka";
            lang.months = "Kuukautta";
            lang.description = "Kuvaus";
            lang.loginorder = "Kirjaudu sisään tilataksesi";
            lang.rentarat = "Vuokraa rotta!";
            lang.giverentformation = "Anna vuokraustiedot";
            lang.orderdate = "vuokran alku";
            lang.ordertime = "vuokran alku aika";
            lang.orderlength = "Vuokran pituus (t)";
            lang.priceperhour = "Hinta €/h";
            lang.eurotoh = "€/t";
            lang.searhtagsbla = "Tagi haku. Lisää tägejä hakuun enter näppäimellä.";
            lang.rentingthisrat ="Olet vuokraamassa tätä rottaa seuraavalle ajalle";
            lang.totalprice = "Kokonaishinta";
            lang.makeorder ="Tee tilaus";
            lang.areyousure ="Olet tilaamassa rotan ";
            lang.areyousure2 =" ja maksamassa ";
            lang.areyousure3 ="€ Tämä on laillinen ostos ja sitoudut maksamaan perumisesta koituvat maksut. Jokainen vuokraus tarkastetaan yksittäin jotta varmistetaan oikean rotan vuokraus oikeaan tilanteeseen. Ole hyvä ja tarkasta profiilisi uudelta vuokralta";
            lang.starttime = "Aloitusaika";
            lang.endtime = "Lopetusaika";
            lang.renttext = "Kirjoita tähän kuvaus vuokraustarpeestasi. Tämä auttaa meitä arvostelemaan arvoisuutesi rotan vuokraan.";
            lang.setordertime = "Aseta tilaus aika";
            lang.setordertime2 = "Tilauksesi on päällekkäinen muiden tilausten kanssa";

            lang.profile = "Profiili";
            lang.userinfo = "Henkilökohtaiset tiedot";
            lang.userinfoinfo = "Täälä voit muokata profiiliasi";
            lang.activerents = "Aktiiviset vuokraukset";
            lang.activerentsinfo = "Hae aktiiviset vuokraukset";
            lang.renthistory = "Vuokraus historia";
            lang.renthistoryinfo = "Rottien vuokraus historia";
            lang.email = "Sähköposti";
            lang.name = "Nimi";
            lang.town = "Kunta";
            lang.postal = "Postikoodi";
            lang.address = "Osoite";
            lang.freeword = "Vapaa sana";
            lang.edit = "Muokkaa";
            lang.savesave ="Tallenna";
            lang.status = "Tila";
            lang.ratsname = "Rotan nimi";
            lang.starttime = "Vuokran aloitus";
            lang.endtime = "Vuokran lopetus";
            lang.price = "Vuokrahinta";
            lang.close = "sulje";
            lang.makesureprofile ="Tarkist että profiilisi on valmis. Emme hyväksy vuokraustasi jos profiilisi ei ole täydellinen";
            lang.editrent ="Muokkaa vuokraa";
            lang.descipreWHY = "Kuvaile vuokrauksesi syy";
            lang.editorder = "Muokkaa tilausta";
            lang.cancelorder = "Peru tilaus";
            lang.ContactUs ="Ota yhteyttä";
            lang.message ="Viesti";
            lang.from = "lähettäjä";
            lang.renter = "vuokraaja";

            lang.home = "Koti";
            lang.rentals ="Vuokrat";

            return lang;
        }

    }
});
