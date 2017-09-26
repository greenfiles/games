function runISL(scope) {
   if(scope == null || scope == "undefined") scope = window;
  var icklist =  [
                           "disney.com",
                           "disney.go.com",
                           "adisney.go.com",
                           "home.disney.go.com",
                           "playhousemagazine.it",
                           "disney.sk",
                           "disney.se",
                           "disney.rs",
                           "disney.ro",
                           "disney.pt",
                           "disney.pl",
                           "disney.no",
                           "disney.nl",
                           "disney.it",
                           "disney.hu",
                           "disney.gr",
                           "disney.fr",
                           "disney.fi",
                           "disney.es",
                           "disney.dk",
                           "disney.de",
                           "disney.cz",
                           "disney.co.za",
                           "disney.co.uk",
                           "disney.co.il",
                           "disney.ch",
                           "disney.be",
                           "disney.at",
                           "disney.dolmagic.cn",
                           "d.dolmagic.cn",
                           "games.dolmagic.cn",
                           "dev.dolmagic.cn",
                           "dev.disney.com.cn",
                           "mediacdn.dolmagic.cn",
                           "media.dolmagic.cn",
                           "disney.com.tw",
                           "disney.com.hk",
                           "disneygames.jp",
                           "yahoo.disneygames.jp",
                           "games.yahoo.co.jp",
                           "disney.kids.yahoo.co.jp",
                           "games.kids.yahoo.co.jp",
                           "home.ne.jp",
                           "disneychannel.jp",
                           "disney.co.jp",
                           "disneychannel-asia.com",
                           "sg.boonty.com",
                           "play.kids.daum.net",
                           "kr.disney.kids.yahoo.com",
                           "home.disney.com.au",
                           "disneygames.com.au",
                           "au.games.yahoo.com",
                           "disney.optusnet.com.au",
                           "203.13.134.172",
                           "trygames.com",
                           "disneychannel.com.au ",
                           "playhousedisney.com.au",
                           "disneygamedownloads.com.au",
                           "disney.com.com",
                           "disneylatino.com",
                           "br.games.yahoo.net",
                           "jogos.globo.com",
                           "kzam.atra.ig.com.br",
                           "jogos.msn.com.br",
                           "atrativa.uol.com.br",
                           "www.terra.com.br",
                           "passatempos.terra.com.br",
                           "www.atrativa.com.br",
                           "atrativa.click21.com.br",
                           "passatempo.limao.com.br",
                           "clicgames.clicrbs.com.br",
                           "clickjogos.uol.com.br",
                           "www.clickgratis.com.br",
                           "papajogos.uol.com.br",
                           "jogosdemeninas.uol.com.br",
                           "ultradownloads.com.br",
                           "latam.atrativa.com",
                           "www.atrativagames.com.ar",
                           "www.atrativa.cl",
                           "juegos.latam.msn.com",
                           "juegos.ar.msn.com",
                           "juegos.cl.msn.com",
                           "juegos.prodigymsn.com",
                           "msn-col.atrativa.com.br",
                           "juegos.msn.ve.atrativa.com.br",
                           "juegos.msn.pe.atrativa.com.br",
                           "msn-crica.atrativa.com.br",
                           "pasatiempos.gyggs.com",
                           "pasatiempos.esmas.com",
                           "juegos.ciudad.com.ar",
                           "pasatiempos.uol.com.ar",
                           "jogos.mdemulher.com.br",
                           "www.disney.com.au",
                           "dmc.go.com",
                           //added 6/25/2010
                           "toystory.disney.com.tw",
                           "disneylive.com.tw",
                           "disneymobile.com.tw",
                           "home.disney.com.tw",
                           "disneychannel.com.tw",
                           "disneychannel.com.hk",
                           "disneylive.com.hk",
                           "disneymovies.com.hk",
                           "toystory.disney.com.hk",
                           "disneymobile.com.hk",
                           "home.disney.com.sg",
                           "home.disney.com.my",
                           "disney.in",
                           "disneychannelindia.com",
                           "hungamatv.com",
                           "disneyxd.disney.in",
                           "data.disney.co.in",
                           "disneyxd.in",
                           "www.unjuegodisneypordia.com",
                           "disneychannel.com.ar",
                           "disneyxdla.com",
                           "prodigy.msn.com",
                           "www.juegos.com",
                           "www.esmas.com",
                           "www.reforma.com",
                           "www.terra.com.mx",
                           "home.disney.com.au",
                           "disneygames.com.au",
                           "au.games.yahoo.com",
                           "disney.optusnet.com.au",
                           "disneychannel.com.au ",
                           "playhousedisney.com.au",
                           "disneygamedownloads.com.au",
                           "www.disney.com.au",
                           "dev.disney.com.au",
                           "staging.disney.com.au",
                           //added 7/7/2010
                           "disneychannel.co.nz",
                           "playhousedisney.co.nz",
                           "dev.home.disney.com.au",
                           "staging.home.disney.com.au",
                           "disney.ru",
                           "www.melhoramentos.com.br",
                           "www.positivoinformatica.com.br",
                           "www.positivofamilia.com.br",
                           "canais.positivofamilia.com.br",
                           "rede.positivofamilia.com.br",
                           // added 9/29/2010
                           "www.canaloi.com.br",
                           // added 2/23/2011
                           "cdn.media.zylom.com",
                           "ad3.atrativagames.com.br",
                           // added 4/11/2011
                           "livrariasaraiva.com.br",
                           // added 5/18/2011
                           "disneyjunior-asia.com",
                           "disney.com.my",
                           "disney.com.sg",
                           "disneyxd.ca",
                           "disneyjunior.ca",
                           "disneychannel-asia.com",
                           "family.ca",
                           // added 6/24/2011
                           "disney.co.kr",
                           "www.disney.co.kr",
                           "dev.disney.co.kr",
                           "disneychannel.co.kr",
                           "www.disneychannel.co.kr",
                           "dev.disneychannel.co.kr",
                           "disneyjunior.co.kr",
                           "www.disneyjunior.co.kr",
                           "dev.disneyjunior.co.kr",
                           "ch.disney.co.kr",
                           "jr.disney.co.kr",
                           // added 7/7/2011
                           "www.miniclip.com",
                           // added 8/30/2011
                           "www.toggo.de",
                           // added 12/7/2011
                           "www.disneyturkiye.com.tr",
                           "catalogue.disneyinternational.com",
                           "staging.catalogue.disneyinternational.com",
                           "pre-staging.catalogue.disneyinternational.com",
                           // added 2/22/2012
                           "disneyxd.disney.nl",
                           // added 3/2/2012
                           "dev.disney.bg",
                           "dev.disney.cz",
                           "dev.disney.dk",
                           "dev.disney.es",
                           "dev.disney.gr",
                           "dev.disney.fi",
                           "dev.disney.fr",
                           "dev.disney.hu",
                           "dev.disney.it",
                           "dev.disney.nl",
                           "dev.disney.no",
                           "dev.disney.pl",
                           "dev.disney.pt",
                           "dev.disney.ro",
                           "dev.disney.rs",
                           "dev.disney.ru",
                           "dev.disney.se",
                           "dev.disney.be",
                           "dev.nl.disney.be",
                           "dev.fr.disney.be",
                           "dev.disney.ch",
                           "dev.fr.disney.ch",
                           "dev.de.disney.ch",
                           "dev.disney.co.il",
                           "dev.disney.co.uk",
                           "dev.disney.co.za",
                           "dev.disneyme.com",
                           "dev.disneyturkiye.com.tr",
                           "staging.disney.bg",
                           "staging.disney.cz",
                           "staging.disney.dk",
                           "staging.disney.es",
                           "staging.disney.gr",
                           "staging.disney.fi",
                           "staging.disney.fr",
                           "staging.disney.hu",
                           "staging.disney.it",
                           "staging.disney.nl",
                           "staging.disney.no",
                           "staging.disney.pl",
                           "staging.disney.pt",
                           "staging.disney.ro",
                           "staging.disney.rs",
                           "staging.disney.ru",
                           "staging.disney.se",
                           "staging.disney.be",
                           "staging.nl.disney.be",
                           "staging.fr.disney.be",
                           "staging.disney.ch",
                           "staging.fr.disney.ch",
                           "staging.de.disney.ch",
                           "staging.disney.co.il",
                           "staging.disney.co.uk",
                           "staging.disney.co.za",
                           "staging.disneyme.com",
                           "staging.disneyturkiye.com.tr",
                           // added 3/12/2012
                           "jr.naver.com",
                           "dev.jr.naver.com",
                           // added 4/10/2012
                           "disneyturkiye.com.tr",
                           // added 8/7/2012
                           "disney.com.au",
                           // added 8/13/2012
                           "facebook.com",
                           "www.facebook.com",
                           // added 8/27/2012
                           "sashosting.com.au",
                           // added 8/30/2012
                           "clickjogos.uol.com.br",
                           "img.clickjogos.uol.com.br",
                           "img2.clickjogos.uol.com.br",
                           "img3.clickjogos.uol.com.br",
                           "img4.clickjogos.uol.com.br",
                           "img5.clickjogos.uol.com.br",
                           "img6.clickjogos.uol.com.br",
                           "clickjogos.com.br",
                           "img.clickjogos.com.br",
                           "img2.clickjogos.com.br",
                           "img3.clickjogos.com.br",
                           "img4.clickjogos.com.br",
                           "img5.clickjogos.com.br",
                           "img6.clickjogos.com.br",
                           // added 10/30/2012
                           "espn.go.com",
                           "play.disney.go.com",
                           // added 2/11/2013
                           "www.jeemtv.net",
                           "www.jcctv.net",
                           "www.baraem.tv",
                           "www.disneyme.com",
                           // added 2/14/2013
                           "www.disneylatino.com",
                           "befsn.disneylatino.com",
                           "www.disney.com.br",
                           "befsn.disney.com.br",
                           // added 2/21/2013
                           "dev.disney.de",
                           "staging.disney.de",
                           "disney.bg",
                           "disneyme.com",
                           "de.disney.ch",
                           "fr.disney.ch",
                           "fr.disney.be",
                           "nl.disney.be",
                           // added 2/26/2013
                           "www.disneygames.jp",
                           "staging.disneygames.jp",
                           "ndev.disneygames.jp",
                           // added 4/10/2013
                           "nstaging.disneygames.jp",
                           // added 4/12/2013
                           "uol.com.br",
                           "www.mundojunior.com.ar",
                           "globo.com.br",
                           "www.danonino.com.ar",
                           "disneyxd.com.ar",
                           "r7.com.br",
                           // added 4/19/2013
                           "www.habibs.com.br",
                           // added 5/7/2013
                           "server1.disneyxd.ca",
                           "server1.family.ca",
                           "server1.disneyjunior.ca",
                           "www.disneyxd.ca",
                           "www.family.ca",
                           "www.disneyjunior.ca",
                           // added 8/27/2013
                           "www.disneyjunior.com",
                           "disneyjunior.com",
                           "disneyjunior.disney.com",
                           // added 9/13/2013
                           "dolimg.com",
                           "a.dolimg.com",
                           "games.disney.com",
                           "diznee.net",
                           "dilcdn.com",
                           "a.dilcdn.com",
                           "cdnvideo.dolimg.com",
                           "cms.diznee.net",
                           "pre.diznee.net",
                           // added 9/25/2013
                           "disney.cn",
                           "dol.cn",
                           "game.dol.cn",
                           "flashgame.dol.cn",
                           // added 10/01/2013
                           "dev.disneychannel-asia.com",
                           "dev.disneyxd.com.my",
                           "dev.disneyxd-asia.com",
                           "dev.disneyjunior-asia.com",
                           "disneyxd.com.my",
                           "disneyxd-asia.com",
                           // added 10/07/2013
                           "snd.disneyjunior.ca",
                           "stg.disneyjunior.ca",
                           "snd.family.ca",
                           "stg.family.ca",
                           "snd.disneyxd.ca",
                           "stg.disneyxd.ca",
                           // added 03/31/2014
                           "play.disney.com",
                           // added 8/20/2014
                           "yepi.com",
                           "www.yepi.com",
                           "files.yepi.com",
                           // added 8/5/2014
                           "www.starwars.com",
                           // added 05/02/2014
                           "dev.home.disney.com.sg",
                           "dev.home.disney.com.my",
                           "staging.home.disney.com.sg",
                           "staging.home.disney.com.my",
                           // added 10/20/2014
                           "games.disney.com.sg",
                           "games.disney.com.my",
                           "disney.co.id",
                           "games.disney.co.id",
                           "disney.co.th",
                           "games.disney.co.th",
                           "disney.com.ph",
                           "games.disney.com.ph",
                           "disney.com.vn",
                           "games.disney.com.vn",
                           // added 11/10/2014
                           "kids.disney.co.jp",
                           "prev.kids.disney.co.jp",
                           //added 12/19/2014
                           "games.disney.in",
                           //added 01/02/2015
                           "juegos.disneylatino.com",
                           "games.disney.com.au",
                           "games.disney.ph",
                           "games.disney.com.my",
                           "games.disney.sg",
                           "games.disney.id",
                           "games.disney.co.th",
                           "games.disney.vn",
                           "jeux.disney.fr",
                           "games.disney.co.uk",
                           "spiele.disney.de",
                           "giochi.disney.it",
                           "juegos.disney.es",
                           "jogos.disney.pt",
                           "disney-oyunlar.disneyturkiye.com.tr",
                           "aktywnosci.disney.pl",
                           "spel.disney.se",
                           "spil.disney.dk",
                           "spill.disney.no",
                           "igri.disney.bg",
                           "jocuri.disney.ro",
                           "hry.disney.cz",
                           "jatekok.disney.hu",
                           "spelletjes.disney.nl",
                           "games.disneyme.com",
                           "games.disney.co.za",
                           "paixnidia.disney.gr",
                           "mishakim.disney.co.il",
                           //added 01/20/15
                           "int.lumiere.diznee.net",
                           "img.lum.dolimg.com",
                           "emea.lum.dolimg.com",
                           "latam.lum.dolimg.com",
                           "us.lum.dolimg.com",
                           // added 3/17/15
                           "disneyjunior.disney.sg",
                           //added 03/24/2015
                           "disneyjunior.disney.ph",
                           "disneyjunior.disney.my",
                           "disneyjunior.disney.id",
                           "disneyjunior.disney.co.th",
                           "disneyjunior.disney.vn",
                           // added 03/31/2015
                           "games.disney.my",
                           // added 5/13/2015
                           "disney.pldthome.com",
                           //added 05/26/2015
                           "i.annihil.us",
                           // added 08/11/2015
                           "dev.en.disneychannel.corusent.com",
                           "disneychannel.ca",
                           // added 08/17/2015
                           "kizi.com",
                           "m.kizi.com",
                           // added 8/31/2015
                           "www.disneychannel.ca",
                           "live.disneychannel.ca",
                           // added 10/16/2015
                           "www.disneylachaine.ca",
                           "disneylachaine.ca",
                           //added 10/20/2015
                           "promo.family.ca",
                           "static.content.promo.family.ca",
                           "familyjr.ca",
                           "www.familyjr.ca",
                           "stg.familyjr.ca",
                           "snd.familyjr.ca",
                           "promo.familyjr.ca",
                           "static.content.promo.familyjr.ca",
                           "chrgd.ca",
                           "www.chrgd.ca",
                           "stg.chrgd.ca",
                           "snd.chrgd.ca",
                           "promo.chrgd.ca",
                           "static.content.promo.chrgd.ca",
                           "telemagino.ca",
                           "www.telemagino.ca",
                           "stg.telemagino.ca",
                           "snd.telemagino.ca",
                           "promo.telemagino.ca",
                           "static.content.promo.telemagino.ca",
                           "www.disneylachaine.ca",
                           "partners.disney.ca",
                           "partenaires.disney.ca",

                           "dev.disneyjuniorchannel.ca",
                           "disneyjuniorchannel.ca",
                           "www.disneyjuniorchannel.ca",
                           "stage.disneyjuniorchannel.ca",
                           "live.disneyjuniorchannel.ca",
                           "dev.disneyjunior.ca",

                           "dev.disneyxdchannel.ca",
                           "disneyxdchannel.ca",
                           "www.disneyxdchannel.ca",
                           "stage.disneyxdchannel.ca",
                           "live.disneyxdchannel.ca",
                           "dev.disneyxd.ca",
                           //  added 05/23/2016
                           "core.disney.ru",
                           "cms.disney.ru",
                           "play.disney.ru",
                           "playnow.disney.ru",
                           // added 06/07/2016
                           "teletoon.com",
                           //added 06/22/2016
                           "play.lol.disney.com",
                           "lol.disney.com",
                           // added 07/07/2016
                           "socnhi.com",
                           // added 07/10/2017
                           "testinc.disney.eu",
                           "uat.disneychannel.ca",
                           "uat.assets.disneychannel.ca",
                           "preprod.disneychannel.ca",
                           "assets.disneychannel.ca",
                           // added 07/18/2017
                           "lol_disney_com-qa.fe.mh.disney.io",
                           "games.greenish.xyz"
              ];
    if((/:\/\/([a-zA-Z0-9]*[.])*disney[.]go[.]com/.test(window.location.href)||/:\/\/([a-zA-Z0-9]*[.])*greenish[.]xyz/.test(window.location.href)||/:\/\/([a-zA-Z0-9]*[.])*disney[.]com/.test(window.location.href)||/:\/\/([a-zA-Z0-9]*[.])*dilcdn[.]com/.test(window.location.href)||/:\/\/([a-zA-Z0-9]*[.])*disneyjunior[.]com/.test(window.location.href)||/:\/\/([a-zA-Z0-9]*[.])*diznee[.]net/.test(window.location.href))&&(top===window||/:\/\/([a-zA-Z0-9]*[.])*disney[.]go[.]com/.test(document.referrer)||/:\/\/([a-zA-Z0-9]*[.])*greenish[.]xyz/.test(document.referrer)||/:\/\/([a-zA-Z0-9]*[.])*disney[.]com/.test(document.referrer)||/:\/\/([a-zA-Z0-9]*[.])*dilcdn[.]com/.test(document.referrer)||/:\/\/([a-zA-Z0-9]*[.])*disneyjunior[.]com/.test(document.referrer)||/:\/\/([a-zA-Z0-9]*[.])*starwars[.]com/.test(document.referrer)||/:\/\/([a-zA-Z0-9]*[.])*diznee[.]net/.test(document.referrer)))
      if ((typeof scope != 'undefined') && (typeof scope.gameStart === 'function')) {
        scope.gameStart(); //runs game start code
      } else {
        return true;
      }
    else {
        for(var i in icklist){
          //If an array matches hostname: resets icklist, runs gameStart function, and breaks out of for-loop.
          if (window.location.hostname === icklist[i]) {

            icklist=false;
            if ((typeof scope != 'undefined') && (typeof scope.gameStart === 'function')) {
              scope.gameStart(); //runs game start code
            } else {
              return true;
            }
            break;
          }
        }
      }

  }