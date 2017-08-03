if (!jQuery.support.cors && jQuery.ajaxTransport && window.XDomainRequest) {
    var httpRegEx = /^https?:\/\//i,
        getOrPostRegEx = /^get|post$/i,
        sameSchemeRegEx = RegExp("^" + location.protocol, "i"),
        htmlRegEx = /text\/html/i,
        jsonRegEx = /\/json/i,
        xmlRegEx = /\/xml/i;
    jQuery.ajaxTransport("text html xml json", function(a, b) {
        if (a.crossDomain && a.async && getOrPostRegEx.test(a.type) && httpRegEx.test(a.url) && sameSchemeRegEx.test(a.url)) {
            var c = null,
                d = (b.dataType || "").toLowerCase();
            return {
                send: function(e, f) {
                    c = new XDomainRequest;
                    /^\d+$/.test(b.timeout) &&
                        (c.timeout = b.timeout);
                    c.ontimeout = function() {
                        f(500, "timeout")
                    };
                    c.onload = function() {
                        var a = "Content-Length: " + c.responseText.length + "\r\nContent-Type: " + c.contentType,
                            b = 200,
                            e = "success",
                            g = {
                                text: c.responseText
                            };
                        try {
                            if ("html" === d || htmlRegEx.test(c.contentType)) g.html = c.responseText;
                            else if ("json" === d || "text" !== d && jsonRegEx.test(c.contentType)) try {
                                g.json = jQuery.parseJSON(c.responseText)
                            } catch (l) {
                                b = 500, e = "parseerror"
                            } else if ("xml" === d || "text" !== d && xmlRegEx.test(c.contentType)) {
                                var n = new ActiveXObject("Microsoft.XMLDOM");
                                n.async = !1;
                                try {
                                    n.loadXML(c.responseText)
                                } catch (q) {
                                    n = void 0
                                }
                                if (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) throw "Invalid XML: " + c.responseText;
                                g.xml = n
                            }
                        } catch (p) {
                            throw p;
                        } finally {
                            f(b, e, g, a)
                        }
                    };
                    c.onprogress = function() {};
                    c.onerror = function() {
                        f(500, "error", {
                            text: c.responseText
                        })
                    };
                    var g = "";
                    b.data && (g = "string" === jQuery.type(b.data) ? b.data : jQuery.param(b.data));
                    c.open(a.type, a.url);
                    c.send(g)
                },
                abort: function() {
                    c && c.abort()
                }
            }
        }
    })
}
eval(function(a, b, c, d, e) {
    for (e = function(a) {
            return (a < b ? "" : e(a / b)) + String.fromCharCode(a % b + 161)
        }; c--;) d[c] && (a = a.replace(RegExp(e(c), "g"), d[c]));
    return a
}("\u00d6 \u00a1(){\u00ae \u00d8\x3d{'\u00a5':\u00a1(){\u00a2 \u00a3.\u00a5},'\u00a9':{'\u00b1':\u00a1(){\u00a2 \u00a3.\u00a9.\u00b1},'\u00af':\u00a1(){\u00a2 \u00a3.\u00a9.\u00af}},'\u00ac':\u00a1(){\u00a2 \u00a3.\u00ac},'\u00b6':\u00a1(){\u00a2 \u00a3.\u00b6},'\u00ba':\u00a1(){\u00a2 \u00a3.\u00ba},'\u00c1':\u00a1(){\u00a2 \u00a3.\u00c1},'\u00c0':\u00a1(){\u00a2 \u00a3.\u00c0},'\u00bd':\u00a1(){\u00a2 \u00a3.\u00bd},'\u00be':\u00a1(){\u00a2 \u00a3.\u00be},'\u00bc':\u00a1(){\u00a2 \u00a3.\u00bc},'\u00b7':\u00a1(){\u00a2 \u00a3.\u00b7},'\u00c2':\u00a1(){\u00a2 \u00a3.\u00c2},'\u00b3':\u00a1(){\u00a2 \u00a3.\u00b3},'\u00c4':\u00a1(){\u00a2 \u00a3.\u00c4},'\u00c3':\u00a1(){\u00a2 \u00a3.\u00c3},'\u00c5':\u00a1(){\u00a2 \u00a3.\u00c5},'\u00b8':\u00a1(){\u00a2 \u00a3.\u00b8}};$.\u00a5\x3d\u00d8;\u00ae \u00a3\x3d{'\u00a5':'\u00bf','\u00a9':{'\u00b1':\u00b2,'\u00af':'\u00bf'},'\u00ac':'\u00bf','\u00b6':\u00a7,'\u00ba':\u00a7,'\u00c1':\u00a7,'\u00c0':\u00a7,'\u00bd':\u00a7,'\u00be':\u00a7,'\u00bc':\u00a7,'\u00b7':\u00a7,'\u00c2':\u00a7,'\u00b3':\u00a7,'\u00c4':\u00a7,'\u00c3':\u00a7,'\u00c5':\u00a7,'\u00b8':\u00a7};\u00ce(\u00ae i\x3d0,\u00ab\x3d\u00bb.\u00ec,\u00b0\x3d\u00bb.\u00ed,\u00a6\x3d[{'\u00a4':'\u00dd','\u00a5':\u00a1(){\u00a2/\u00d9/.\u00a8(\u00b0)}},{'\u00a4':'\u00da','\u00a5':\u00a1(){\u00a2 \u00db.\u00b3!\x3d\u00b2}},{'\u00a4':'\u00c8','\u00a5':\u00a1(){\u00a2/\u00c8/.\u00a8(\u00b0)}},{'\u00a4':'\u00dc','\u00a5':\u00a1(){\u00a2/\u00de/.\u00a8(\u00b0)}},{'\u00aa':'\u00b6','\u00a4':'\u00df \u00d1','\u00a5':\u00a1(){\u00a2/\u00e0 \u00e1 \u00e2/.\u00a8(\u00ab)},'\u00a9':\u00a1(){\u00a2 \u00ab.\u00b9(/\u00e3(\\d+(?:\\.\\d+)+)/)}},{'\u00a4':'\u00cc','\u00a5':\u00a1(){\u00a2/\u00cc/.\u00a8(\u00ab)}},{'\u00a4':'\u00cd','\u00a5':\u00a1(){\u00a2/\u00cd/.\u00a8(\u00b0)}},{'\u00a4':'\u00cf','\u00a5':\u00a1(){\u00a2/\u00cf/.\u00a8(\u00ab)}},{'\u00a4':'\u00d0','\u00a5':\u00a1(){\u00a2/\u00d0/.\u00a8(\u00ab)}},{'\u00aa':'\u00b7','\u00a4':'\u00e5 \u00d1','\u00a5':\u00a1(){\u00a2/\u00d2/.\u00a8(\u00ab)},'\u00a9':\u00a1(){\u00a2 \u00ab.\u00b9(/\u00d2 (\\d+(?:\\.\\d+)+(?:b\\d*)?)/)}},{'\u00a4':'\u00d3','\u00a5':\u00a1(){\u00a2/\u00e6|\u00d3/.\u00a8(\u00ab)},'\u00a9':\u00a1(){\u00a2 \u00ab.\u00b9(/\u00e8:(\\d+(?:\\.\\d+)+)/)}}];i\x3c\u00a6.\u00cb;i++){\u00b5(\u00a6[i].\u00a5()){\u00ae \u00aa\x3d\u00a6[i].\u00aa?\u00a6[i].\u00aa:\u00a6[i].\u00a4.\u00d5();\u00a3[\u00aa]\x3d\u00c9;\u00a3.\u00a5\x3d\u00a6[i].\u00a4;\u00ae \u00ad;\u00b5(\u00a6[i].\u00a9!\x3d\u00b2\x26\x26(\u00ad\x3d\u00a6[i].\u00a9())){\u00a3.\u00a9.\u00af\x3d\u00ad[1];\u00a3.\u00a9.\u00b1\x3d\u00ca(\u00ad[1])}\u00ea{\u00ae \u00c7\x3d\u00d6 \u00eb(\u00a6[i].\u00a4+'(?:\\\\s|\\\\/)(\\\\d+(?:\\\\.\\\\d+)+(?:(?:a|b)\\\\d*)?)');\u00ad\x3d\u00ab.\u00b9(\u00c7);\u00b5(\u00ad!\x3d\u00b2){\u00a3.\u00a9.\u00af\x3d\u00ad[1];\u00a3.\u00a9.\u00b1\x3d\u00ca(\u00ad[1])}}\u00d7}};\u00ce(\u00ae i\x3d0,\u00b4\x3d\u00bb.\u00e4,\u00a6\x3d[{'\u00aa':'\u00b8','\u00a4':'\u00e7','\u00ac':\u00a1(){\u00a2/\u00e9/.\u00a8(\u00b4)}},{'\u00a4':'\u00d4','\u00ac':\u00a1(){\u00a2/\u00d4/.\u00a8(\u00b4)}},{'\u00a4':'\u00c6','\u00ac':\u00a1(){\u00a2/\u00c6/.\u00a8(\u00b4)}}];i\x3c\u00a6.\u00cb;i++){\u00b5(\u00a6[i].\u00ac()){\u00ae \u00aa\x3d\u00a6[i].\u00aa?\u00a6[i].\u00aa:\u00a6[i].\u00a4.\u00d5();\u00a3[\u00aa]\x3d\u00c9;\u00a3.\u00ac\x3d\u00a6[i].\u00a4;\u00d7}}}();",
    77, 77, "function return Private name browser data false test version identifier ua OS result var string ve number undefined opera pl if aol msie win match camino navigator mozilla icab konqueror Unknown flock firefox netscape linux safari mac Linux re iCab true parseFloat length Flock Camino for Firefox Netscape Explorer MSIE Mozilla Mac toLowerCase new break Public Apple Opera window Konqueror Safari KDE AOL America Online Browser rev platform Internet Gecko Windows rv Win else RegExp userAgent vendor".split(" ")));
var FacebookAPI = {
    loggedIn: !1,
    postToFeed: function() {
        var a = {
            method: "feed",
            redirect_uri: "http://m.your-website-name.co.uk/spicy.php",
            link: "http://m.your-website-name.co.uk/spicy.php",
            picture: REMOTE_PATH + "img/FB_Post_icon.png",
            name: "Spicy McBites\u00ae adventure",
            caption: "Can you handle the heat?",
            description: "I got " + formatScore(APP.score) + " points going on an epic Spicy McBites\u00ae adventure. Play Super Spice Dash and see if you can beat my score."
        };
        FB.getLoginStatus(function(b) {
            "connected" === b.status ||
                "not_authorized" === b.status || !isIpad ? FB.ui(a, function() {
                    console.log("COOL")
                }) : window.location = "https://www.facebook.com/dialog/feed?app_id\x3d#\x26link\x3d" + a.link + "\x26picture\x3d" + a.picture + "\x26caption\x3d" + a.caption + "\x26description\x3d" + a.description + "\x26redirect_uri\x3d" + a.redirect_uri
        })
    },
    checkLoggedIn: function(a) {
        FB.getLoginStatus(function(b) {
            "connected" === b.status ? (console.log("User logged into Facebook and has APP"), FacebookAPI.uid = b.authResponse.userID, FacebookAPI.accessTocken =
                b.authResponse.accessToken, FacebookAPI.loggedIn = !0, FB.api("/me", function(b) {
                    FacebookAPI.data = b;
                    console.log("Facebook userdata recieved");
                    console.log(b);
                    a()
                })) : (FacebookAPI.loggedIn = !1, a())
        })
    },
    loginAndGetData: function(a) {
        FacebookAPI.loggedIn ? a() : FB.login(function(b) {
            b.authResponse ? (_gaq.push(["_trackEvent", "Spicy mcbites", "logged in to facebook", "logged in to facebook"]), FacebookAPI.uid = b.authResponse.userID, FacebookAPI.accessTocken = b.authResponse.accessToken, FacebookAPI.loggedIn = !0, console.log("User logged in Fetching your information.... "),
                FB.api("/me", function(b) {
                    console.log(b);
                    console.log("Facebook userdata recieved");
                    FacebookAPI.data = b;
                    FacebookAPI.loggedIn = !0;
                    a()
                })) : console.log("User cancelled login or did not fully authorize.")
        }, {
            scope: ""
        })
    },
    loginAndGetDataAPP: function() {},
    getFriendsUsingApp: function(a) {
        var b = encodeURIComponent("SELECT uid FROM user WHERE is_app_user\x3d1 AND uid IN (SELECT uid2 FROM friend WHERE uid1 \x3d me())");
        FB.api("/fql?q\x3d" + b, a)
    },
    requestChallange: function(a) {
        APP.score ? FB.ui({
            method: "apprequests",
            message: "Can you handle the heat? I got " +
                APP.score + " points going on an epic Spicy McBites\u00ae adventure. Play Super Spice Dash and see if you can beat my score."
        }, a) : FB.ui({
            method: "apprequests",
            message: "Try a taste of adventure Come and play Super Spice Skytrak and join me on an epic Spicy McBites\u00ae adventure. Can you handle the heat?"
        }, a)
    },
    createLikeButton: function(a, b) {
        var c = $(document.createElement("fb:like"));
        c.attr("href", b);
        c.attr("layout", "button_count");
        c.attr("send", "false");
        c.attr("show_faces", "true");
        c.attr("width", "450");
        $(a).empty().append(c);
        FB.XFBML.parse($(a).get(0));
        return c
    }
};
SoundButton = function() {
    PIXI.DisplayObjectContainer.call(this);
    SoundButton.instance = this;
    this.interactive = !0;
    this.hitArea = new PIXI.Rectangle(-40, 0, 40, 40);
    this.buttonMode = !0;
    this.base = PIXI.Sprite.fromFrame("soundON.png");
    this.base.anchor.x = 1;
    this.over = PIXI.Sprite.fromFrame("soundOFF.png");
    this.over.anchor.x = 1;
    this.over.alpha = 0;
    this.over.visible = !1;
    this.addChild(this.base);
    this.addChild(this.over);
    this.mute = !1;
    PROFILE.music ? this.music2 = new Howl({
        urls: [REMOTE_PATH + "snd/music-1.mp3",
            "sound.ogg", "sound.wav"
        ],
        loop: !0,
        volume: 0.01,
        onend: function() {}
    }) : this.visible = !1;
    PROFILE.sfx && (APP.pickupSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/crumbGet.mp3", "sound.ogg", "sound.wav"]
        }), APP.jumpSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/biteJump.mp3", "sound.ogg", "sound.wav"]
        }), APP.powerupSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/powerUp.mp3", "sound.ogg", "sound.wav"]
        }), APP.crashSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/collide_treetop.mp3", "sound.ogg", "sound.wav"]
        }), APP.ascentionSound =
        new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/levelUp.mp3", "sound.ogg", "sound.wav"]
        }), APP.packLandSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/packLand.mp3", "sound.ogg", "sound.wav"]
        }), APP.magnetEndSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/powerUpEnding.mp3", "sound.ogg", "sound.wav"]
        }), APP.chargeSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/powerUpSpeed.mp3", "sound.ogg", "sound.wav"]
        }), APP.chargeEndSound = new Howl({
            urls: [REMOTE_PATH + "snd/soundFX/powerUpSpeedEnd.mp3", "sound.ogg", "sound.wav"]
        }));
    this.firstRun = !0
};
SoundButton.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
SoundButton.prototype.click = SoundButton.prototype.tap = function() {
    (this.mute = !this.mute) ? (this.over.setTexture(PIXI.Texture.fromFrame("soundON.png")), this.base.setTexture(PIXI.Texture.fromFrame("soundOFF.png")), Howler.mute()) : (this.base.setTexture(PIXI.Texture.fromFrame("soundON.png")), this.over.setTexture(PIXI.Texture.fromFrame("soundOFF.png")), APP.isIpad && this.firstRun && (this.firstRun = !1), Howler.unmute());
    this.over.alpha = 0
};
SoundButton.prototype.mouseover = function() {
    this.over.visible = !0;
    TweenLite.to(this.over, 0.2, {
        alpha: 1,
        ease: Expo.easeOut
    })
};
SoundButton.prototype.mouseout = function() {
    TweenLite.to(this.over, 0.2, {
        alpha: 0,
        ease: Sine.easeOut,
        onComplete: function() {
            this.visible = !1
        }
    })
};
McBiteButton = function(a, b, c) {
    PIXI.DisplayObjectContainer.call(this);
    var d = PIXI.Sprite.fromFrame(a);
    this.addChild(d);
    d.anchor.x = 0.5;
    c = c || a;
    b && c && (this.overFrame = PIXI.Sprite.fromFrame(b), this.downFrame = PIXI.Sprite.fromFrame(c), this.overFrame.anchor.x = 0.5, this.downFrame.anchor.x = 0.5, this.addChild(this.overFrame), this.addChild(this.downFrame))
};
McBiteButton.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
var SteveAPI = {
        sevrerPath: "http://mcbites.sh75.net/rest/",
        submitScore: function(a, b) {
            $.support.cors = !0;
            console.log("Score being submitted: " + a);
            for (var c = a.toString().split(""), d = "spicydream".split(""), e = 0; e < c.length; e++) c[e] = d[c[e]];
            c = c.join("");
            c = SteveAPI.sevrerPath + "genHashReq?dsChk\x3d" + c + "\x26fbToken\x3d" + FacebookAPI.accessTocken + "\x26cb\x3d" + Math.floor(99999 * Math.random());
            $.ajax({
                type: "POST",
                url: c,
                data: {},
                crossDomain: !0,
                dataType: "json",
                success: function(a) {
                    console.log(a);
                    b && b(a)
                }
            })
        },
        loginAndGetDataFromAPP: function(a) {
            FacebookAPI.loggedIn ?
                a() : (appCallback = a, window.open("mcd://webapp/promptFacebookToken"))
        }
    },
    appCallback;

function handleCoreAppCallback(a) {
    FacebookAPI.accessTocken = a.fbtoken;
    FacebookAPI.accessTocken ? (FacebookAPI.loggedIn = !0, appCallback && appCallback(!0)) : appCallback && appCallback(!1)
}
SteveAPI.checkIsLoggedIn = function(a) {
    $.support.cors = !0;
    $.ajax({
        type: "POST",
        url: SteveAPI.sevrerPath + "check-is-logged-in",
        data: {
            fbToken: FacebookAPI.accessTocken
        },
        crossDomain: !0,
        dataType: "json",
        success: function(b) {
            a && a(b)
        }
    })
};
SteveAPI.getUserScore = function(a) {
    $.support.cors = !0;
    var b = SteveAPI.sevrerPath + "get-user-score?fbToken\x3d" + FacebookAPI.accessTocken + "\x26cb\x3d" + Math.floor(99999 * Math.random());
    $.ajax({
        type: "GET",
        url: b,
        dataType: "json",
        crossDomain: !0,
        data: {},
        success: function(b) {
            console.log(b);
            b.score || (b.score = {
                score: 10
            });
            a && a(b)
        }
    })
};
SteveAPI.getTop20 = function(a) {
    $.support.cors = !0;
    $.ajax({
        type: "POST",
        url: SteveAPI.sevrerPath + "get-public-top-scores",
        crossDomain: !0,
        dataType: "json",
        success: function(b) {
            a && a(b)
        }
    })
};
SteveAPI.getTop20Friends = function(a) {
    $.support.cors = !0;
    console.log(FacebookAPI.accessTocken);
    var b = SteveAPI.sevrerPath + "get-friends-scores?fbToken\x3d" + FacebookAPI.accessTocken + "\x26cb\x3d" + Math.floor(99999 * Math.random());
    $.ajax({
        type: "POST",
        url: b,
        crossDomain: !0,
        dataType: "json",
        data: {
            fbToken: FacebookAPI.accessTocken
        },
        success: function(b) {
            console.log(b);
            a && a(b)
        }
    })
};
var Profile = function() {};
checkIsMobile = function() {
    var a = !1,
        b = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
            4))) a = !0;
    return a
};
Profile.prototype.buildProfile = function() {
    this.flipTilt = -1 < navigator.userAgent.toLowerCase().indexOf("android") ? -1 : 1;
    this.noCanvas = !Modernizr.canvas;
    this.firefox = -1 < navigator.userAgent.toLowerCase().indexOf("firefox");
    this.mobile = checkIsMobile();
    var a = window.navigator.userAgent;
    this.msie = -1 != window.navigator.userAgent.toLowerCase().indexOf("msie");
    this.ipad = null != a.match(/iPad/i);
    this.ipod = null != a.match(/iPod/i);
    this.iphone = null != a.match(/iPhone/i);
    this.ios = this.ipad || this.ipod || this.iphone;
    this.is3g = !(1 < window.devicePixelRatio) && this.iphone;
    this.needsProfile = this.ipad || this.mobile;
    this.ios || (this.needsProfile = !1)
};
Profile.prototype.setup = function(a) {
    22 > a ? (this.extra = this.particles = !1, this.drawDistance = 4620, this.trackSize = 15, this.canTilt = this.sfx = this.music = this.drawPosts = !1) : (this.extra = this.particles = !0, this.drawDistance = 7E3, this.trackSize = 32, this.canTilt = this.sfx = this.music = this.drawPosts = !0);
    this.mobile && (this.sfx = this.music = !1)
};
var BasicButton = {
        apply: function(a, b) {
            a.interactive = !0;
            a.buttonMode = !0;
            a.click = a.tap = b;
            a.enable = function() {
                this.interactive = !0;
                TweenLite.to(this, 0.3, {
                    alpha: 1,
                    ease: Sine.easeOut
                })
            };
            a.disable = function() {
                this.interactive = !1;
                TweenLite.to(this, 0.3, {
                    alpha: 0.6,
                    ease: Sine.easeOut
                })
            };
            a.overFrame && (a.overFrame.alpha = 0, a.mouseover = function() {
                a.overFrame.visible = !0;
                TweenLite.to(a.overFrame, 0.2, {
                    alpha: 1,
                    overwrite: !0,
                    ease: Sine.easeOut
                })
            }, a.mouseout = function() {
                TweenLite.to(a.overFrame, 0.2, {
                    alpha: 0,
                    ease: Sine.easeOut,
                    overwrite: !0,
                    onComplete: function() {
                        this.visible = !1
                    }
                })
            });
            a.downFrame && (a.downFrame.visible = !1, a.downFrame.alpha = 0, a.mousedown = function() {
                a.downFrame.visible = !0;
                TweenLite.to(a.downFrame, 0.3, {
                    alpha: 1,
                    overwrite: !0,
                    ease: Sine.easeOut
                })
            }, a.mouseup = a.mouseupoutside = function() {
                TweenLite.to(a.downFrame, 0.3, {
                    alpha: 0,
                    ease: Sine.easeOut,
                    overwrite: !0,
                    onComplete: function() {
                        this.visible = !1
                    }
                })
            })
        }
    },
    Spring = function() {
        this.tx = this.dx = this.ax = this.x = 0;
        this.max = 60;
        this.damp = 0.25;
        this.springiness = 0.9
    };
max = 30;
damp = 0.85;
springiness = 0.09;
Spring.prototype.update = function() {
    this.ax = (this.tx - this.x) * springiness;
    this.dx += this.ax;
    this.dx *= damp;
    this.dx < -max ? this.dx = -max : this.dx > max && (this.dx = max);
    this.x += this.dx
};
Spring.prototype.reset = function() {
    this.tx = this.dx = this.ax = this.x = 0
};
PixiTrackpad = function(a, b) {
    this.freeRollin = !!b;
    this.target = a;
    this.dragOffset = this.easingValue = this.value = 0;
    this.dragging;
    this.speed = 0;
    this.size = 284;
    this.prevPositionY = this.speedY = this.dragOffsetY = this.easingValueY = this.valueY = this.prevPosition = 0;
    this.didMove = !0;
    this.target.interactive = !0;
    this.target.touchstart = this.target.mousedown = this.onDown.bind(this);
    this.spring = new Spring
};
PixiTrackpad.constructor = PixiTrackpad;
PixiTrackpad.prototype.unlock = function() {
    this.locked = !1;
    this.speed = 0;
    this.easingValue = this.value
};
PixiTrackpad.prototype.lock = function() {
    this.locked = !0
};
PixiTrackpad.prototype.update = function() {
    0 < this.easingValueY && (this.easingValueY = 0);
    this.easingValueY < -this.max && (this.easingValueY = -this.max);
    this.value = this.easingValue;
    this.valueY = this.easingValueY;
    if (this.dragging) {
        var a = this.easingValue - this.prevPosition;
        this.speed += 0.5 * (0.7 * a - this.speed);
        this.prevPosition = this.easingValue;
        a = this.easingValueY - this.prevPositionY;
        this.speedY += 0.5 * (0.7 * a - this.speedY);
        this.prevPositionY = this.easingValueY
    } else this.freeRollin ? (this.spring.update(), this.easingValue =
        this.spring.x) : (this.speed *= 0.95, this.easingValue += this.speed, this.speedY *= 0.95, this.easingValueY += this.speedY)
};
PixiTrackpad.prototype.setPosition = function(a, b) {
    this.value = this.easingValue = a;
    this.valueY = this.easingValueY = b
};
PixiTrackpad.prototype.onDown = function(a) {
    this.locked || (this.didMove = !1, this.checkX = a.global.x, max = 30, damp = 0.85, springiness = 0.09, this.dragging = !0, this.dragOffset = a.global.x - this.value, this.dragOffsetY = a.global.y - this.valueY, this.target.touchend = this.target.touchendoutside = this.target.mouseup = this.target.mouseupoutside = this.onUp.bind(this), this.target.touchmove = this.target.mousemove = this.onMove.bind(this))
};
PixiTrackpad.prototype.onUp = function() {
    this.locked || (this.dragging = !1, this.didMove && (this.spring.dx = this.speed, this.spring.tx = 0 > this.speed ? Math.floor(this.easingValue / this.size) * this.size : Math.ceil(this.easingValue / this.size) * this.size), this.spring.x = this.easingValue, this.target.mouseup = null, this.target.mousemove = null)
};
PixiTrackpad.prototype.onMove = function(a) {
    2 < Math.abs(this.checkX - a.global.x) && (this.didMove = !0);
    this.easingValue = a.global.x - this.dragOffset;
    this.easingValueY = a.global.y - this.dragOffsetY
};
SimpleApp = function(a) {
    this.container = a;
    this.screens = {};
    this.currentScreen;
    this.fading = !1;
    this.w = $(window).width();
    this.h = $(window).height();
    this.white = new PIXI.Graphics;
    this.white.beginFill(16777215);
    this.white.drawRect(0, 0, 100, 100);
    this.zoomy = new PIXI.DisplayObjectContainer;
    this.container.addChild(this.zoomy);
    this.container.addChild(this.white)
};
SimpleApp.constructor = SimpleApp;
SimpleApp.prototype.gotoScreenByID = function(a) {
    this.gotoScreen(this.screens[a])
};
SimpleApp.prototype.gotoScreen = function(a) {
    if (this.currentScreen != a && (this.nextScreen = a, !this.fading)) {
        this.fading = !0;
        if (this.nextScreen.onShow) this.nextScreen.onShow();
        if (this.currentScreen) {
            if (this.currentScreen.onHide) this.currentScreen.onHide();
            this.white.visible = !0;
            TweenLite.to(this.white, 0.4, {
                alpha: 1,
                onComplete: $.proxy(this.onFadeout, this)
            });
            TweenLite.to(this.zoomy.scale, 0.8, {
                x: 1.1,
                y: 1.1,
                ease: Cubic.easeOut
            });
            TweenLite.to(this.zoomy.position, 0.8, {
                x: this.w / 2 - 1.1 * this.w / 2,
                y: this.h / 2 - 1.1 * this.h /
                    2,
                ease: Cubic.easeOut
            })
        } else this.onFadeout()
    }
};
SimpleApp.prototype.onFadeout = function() {
    if (this.currentScreen) {
        if (this.currentScreen.onHidden) this.currentScreen.onHidden();
        this.zoomy.removeChild(this.currentScreen)
    }
    this.currentScreen = this.nextScreen;
    this.currentScreen.resize && this.currentScreen.resize(this.w, this.h);
    TweenLite.to(this.white, 0.4, {
        alpha: 0,
        onComplete: $.proxy(this.onFadein, this)
    });
    TweenLite.to(this.zoomy.scale, 0.8, {
        x: 1,
        y: 1,
        ease: Expo.easeOut
    });
    TweenLite.to(this.zoomy.position, 0.8, {
        x: 0,
        y: 0,
        ease: Expo.easeOut
    });
    this.zoomy.addChildAt(this.currentScreen,
        0)
};
SimpleApp.prototype.onFadein = function() {
    this.fading = this.white.visible = !1;
    if (this.currentScreen.onShown) this.currentScreen.onShown();
    this.currentScreen != this.nextScreen && this.gotoScreen(this.nextScreen)
};
SimpleApp.prototype.resize = function(a, b) {
    this.w = a;
    this.h = b;
    this.white.scale.x = a / 100;
    this.white.scale.y = b / 100;
    this.currentScreen;
    this.currentScreen && this.currentScreen.resize && this.currentScreen.resize(a, b)
};
Startup = function() {
    this.loaderLoader = new PIXI.AssetLoader([REMOTE_PATH + "img/UI/loaderCrumbScale.png", REMOTE_PATH + "img/UI/loaderPanel.png", REMOTE_PATH + "img/UI/intro_BG.jpg", REMOTE_PATH + "img/loadingText.png"], !0);
    this.loaderLoader.onComplete = this.onLoaderLoaded.bind(this);
    this.loader = APP.profile.mobile ? new PIXI.AssetLoader([REMOTE_PATH + "img/pickups/magnet/magnetTexture.json", REMOTE_PATH + "img/UI/uiSpriteSheet.json", REMOTE_PATH + "img/player/ballSpriteSheet.json", REMOTE_PATH + "img/tutorial/tutorial.json",
        REMOTE_PATH + "img/pickups/pickups.json", REMOTE_PATH + "img/UI/HOME_mobile_panelBG.png", REMOTE_PATH + "img/UI/intro_heroPack.png", REMOTE_PATH + "img/UI/HOME_desktop_logo.png", REMOTE_PATH + "img/UI/HOME_mobile_play.png", REMOTE_PATH + "img/UI/HOME_mobile_more.png", REMOTE_PATH + "img/UI/HOME_mobile_leaderboard.png"
    ], !0) : new PIXI.AssetLoader([REMOTE_PATH + "img/pickups/magnet/magnetTexture.json", REMOTE_PATH + "img/UI/uiSpriteSheet.json", REMOTE_PATH + "img/tutorial/tutorial.json", REMOTE_PATH + "img/player/ballSpriteSheet.json",
        REMOTE_PATH + "img/pickups/pickups.json", REMOTE_PATH + "img/UI/intro_vidPanel_base.png", REMOTE_PATH + "img/UI/intro_heroPack.png", REMOTE_PATH + "img/UI/HOME_desktop_logo.png", REMOTE_PATH + "img/UI/intro_vidPanel_TEMP.png", REMOTE_PATH + "img/UI/HOME_desktop_play.png", REMOTE_PATH + "img/UI/HOME_desktop_more.png", REMOTE_PATH + "img/UI/HOME_desktop_leaderboard.png"
    ], !0);
    APP.loader = this.loader;
    APP.loader.loadCount = APP.loader.assetURLs.length;
    APP.loadingScreen = new LoadingScreen;
    this.loader.addEventListener("onComplete",
        function() {
            APP.highscoreScreen = new HighscoreScreen;
            APP.gameoverScreen = new GameoverScreen;
            APP.leaderboardScreen = new LeaderboardScreen;
            APP.titleScreen = APP.profile.mobile ? new MobileTitleScreen : new TitleScreen;
            APP.gameScreen = new GameScreen;
            transition = new TransitionAnimation;
            APP.stage.addChildAt(transition, 1);
            APP.simpleApp.gotoScreen(APP.titleScreen);
            "ondevicemotion" in window && (APP.tiltAvailable = !0);
            "ontouchstart" in window && (APP.touchAvailable = !0);
            APP.tiltAvailable && APP.touchAvailable && (APP.controlOverlay =
                new ControlSelectOverlay, APP.stage.addChild(APP.controlOverlay), APP.controlOverlay.visible = !1);
            APP.resize(APP.w, APP.h)
        })
};
Startup.constructor = Startup;
Startup.prototype.run = function() {
    this.loaderLoader.load()
};
Startup.prototype.onLoaderLoaded = function() {
    APP.simpleApp.gotoScreen(APP.loadingScreen);
    APP.background = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/intro_BG.jpg", !0);
    APP.background.anchor.x = APP.background.anchor.y = 0.5;
    APP.stage.addChildAt(APP.background, 0);
    APP.background.alpha = 0;
    TweenLite.to(APP.background, 0.3, {
        alpha: 1,
        ease: Sine.easeOut
    });
    APP.resize(APP.w, APP.h);
    WebFontConfig = {
        google: {
            families: ["Pathway+Gothic+One::latin"]
        },
        active: function() {
            World.processAll(function() {
                this.loader.load()
            }.bind(this))
        }.bind(this)
    };
    var a = document.createElement("script");
    a.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    a.type = "text/javascript";
    a.async = "true";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
};
Startup.prototype.onLoginCheckComplete = function() {};
LoadingScreen = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.loading = PIXI.Sprite.fromImage(REMOTE_PATH + "img/loading.png", !0);
    this.crumb = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/crumbScale.png", !0);
    this.crumbPanal = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/loaderPanel.png", !0);
    this.loadingText = PIXI.Sprite.fromImage(REMOTE_PATH + "img/loadingText.png", !0);
    this.crumbPanal.addChild(this.crumb);
    this.crumbPanal.anchor.x = this.crumbPanal.anchor.y = 0.5;
    this.crumb.anchor.x = this.crumb.anchor.y = 0.5;
    this.loadingText.position.y =
        100;
    this.loadingText.anchor.x = this.loadingText.anchor.y = 0.5;
    this.target = this.crumb.scale.x = this.crumb.scale.y = 0;
    this.tint = new PIXI.Graphics;
    this.tint.beginFill(0, 0.5);
    this.tint.drawRect(0, 0, 100, 100);
    this.addChild(this.tint);
    this.addChild(this.crumbPanal);
    this.addChild(this.loadingText);
    this.count = 0
};
LoadingScreen.constructor = LoadingScreen;
LoadingScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
LoadingScreen.prototype.updateTransform = function() {
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    var a = World.percentLoaded();
    this.target += 0.1 * (0.5 * (a + (1 - APP.loader.loadCount / APP.loader.assetURLs.length)) - this.target);
    this.crumb.scale.x = this.crumb.scale.y = this.target;
    this.count += 0.1;
    this.crumbPanal.scale.x = this.crumbPanal.scale.y = 0.8 + 0.05 * (Math.sin(this.count) + 1);
    this.crumbPanal.rotation = 0.1 * Math.sin(this.count / 3.2)
};
LoadingScreen.prototype.resize = function(a, b) {
    this.crumbPanal.position.x = a / 2;
    this.crumbPanal.position.y = b / 2;
    this.loadingText.position.x = a / 2;
    this.loadingText.position.y = b / 2 + 80;
    this.tint.scale.x = a / 100;
    this.tint.scale.y = b / 100
};
TitleScreen = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.pivot.x = -140;
    this.screenPanal = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/intro_vidPanel_TEMP.png");
    this.screenPanal.anchor.x = this.screenPanal.anchor.y = 0.5;
    this.addChild(this.screenPanal);
    this.screenPanal.position.y = -75;
    this.panal = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/intro_vidPanel_base.png");
    this.panal.anchor.x = this.panal.anchor.y = 0.5;
    this.panal.position.y = 180;
    this.addChild(this.panal);
    this.pack = PIXI.Sprite.fromImage(REMOTE_PATH +
        "img/UI/intro_heroPack.png");
    this.pack.position.x = -734;
    this.pack.position.y = 0;
    this.addChild(this.pack);
    this.logo = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/HOME_desktop_logo.png");
    this.logo.anchor.x = this.logo.anchor.y = 0.5;
    this.logo.position.x = -501;
    this.logo.position.y = -107;
    this.addChild(this.logo);
    this.text2 = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/intro_BIGflava.png");
    this.text2.position.x = -590;
    this.text2.position.y = 290;
    this.addChild(this.text2);
    this.playAgainButton = new McBiteButton("HOME_desktop_play.png",
        "HOME_desktop_play_press.png");
    this.productInfoButton = new McBiteButton("HOME_desktop_more.png", "HOME_desktop_more_press.png");
    this.leaderBoardButton = new McBiteButton("HOME_desktop_leaderboard.png", "HOME_desktop_leaderboard_press.png");
    this.panal.addChild(this.playAgainButton);
    this.panal.addChild(this.productInfoButton);
    this.panal.addChild(this.leaderBoardButton);
    this.playAgainButton.position.y = -31;
    this.productInfoButton.position.y = -24;
    this.leaderBoardButton.position.y = -24;
    this.productInfoButton.position.x = -192;
    this.playAgainButton.position.x = -0;
    this.leaderBoardButton.position.x = 190;
    BasicButton.apply(this.playAgainButton, function() {
        _gaq.push(["_trackEvent", "Spicy mcbites", "Play", "Play"]);
        APP.controlOverlay ? APP.controlSelected ? APP.simpleApp.gotoScreen(APP.gameScreen) : PROFILE.canTilt ? (APP.controlSelected = !0, APP.controlOverlay.visible = !0, APP.controlOverlay.show(), APP.controlOverlay.onSelect = function() {
                APP.simpleApp.gotoScreen(APP.gameScreen)
            }) : (APP.gameScreen.game.controller.setTouch(), APP.simpleApp.gotoScreen(APP.gameScreen)) :
            APP.simpleApp.gotoScreen(APP.gameScreen)
    });
    BasicButton.apply(this.leaderBoardButton, function() {
        _gaq.push(["_trackEvent", "Spicy mcbites", "Leaderboard clicks", "Leaderboard clicks"]);
        APP.fromTitle = !0;
        APP.simpleApp.gotoScreen(APP.leaderboardScreen)
    });
    BasicButton.apply(this.productInfoButton, function() {
        _gaq.push(["_trackEvent", "Spicy mcbites", "Product Info clicks", "Product Info clicks"]);
        window.open(PROFILE.mobile ? "http://m.your-website-name.co.uk/food_single_item.php?item_id\x3d11589" : "http://greenish.xyz",
            "_blank")
    });
    var a = document.createElement("div");
    a.className = "legals";
    a.innerHTML = "\x3cdiv style\x3d'margin-left:10px;'\x3eCopyright © 2017 - Greenish Games in association with McDonald’s Corporation.\x3ca style\x3d'color:#fae5be' href\x3d" + APP.tc + "\x3e\x3cu\x3eGame Ts \x26 Cs\x3c/u\x3e\x3c/a\x3e.\x3c/div\x3e";
    var b = document.createElement("div");
    b.innerHTML = '\x3ciframe src\x3d"//www.facebook.com/plugins/like.php?href\x3dhttp%3A%2F%2Fm.your-website-name.co.uk%2Fspicy.php;width\x3d100\x26amp;height\x3d21\x26amp;colorscheme\x3dlight\x26amp;layout\x3dbutton_count\x26amp;action\x3dlike\x26amp;show_faces\x3dfalse\x26amp;send\x3dfalse\x26amp;appId\x3d" scrolling\x3d"no" frameborder\x3d"0" style\x3d"border:none; overflow:hidden; width:100px; height:21px;" allowTransparency\x3d"true"\x3e\x3c/iframe\x3e';
    b.style.position = "absolute";
    b.style.right = "10px";
    b.style.top = "6px";
    a.appendChild(b);
    document.body.appendChild(a);
    legals = a;
    legals.show = function() {
        $(this).fadeIn()
    };
    legals.hide = function() {
        console.log(this);
        $(this).fadeOut()
    };
    PROFILE.ipad || (this.video = document.createElement("video"), this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = 10, this.video.width = 628, this.video.height = 354, "boolean" == typeof this.video.loop ? this.video.loop = !0 : this.video.addEventListener("ended",
        function() {
            this.currentTime = 0;
            this.play()
        }, !1), this.source = document.createElement("source"), this.source.setAttribute("src", REMOTE_PATH + "vid/video.mp4"), this.video.appendChild(this.source))
};
TitleScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TitleScreen.prototype.onShow = function() {
    APP.background.visible = !0
};
TitleScreen.prototype.onShown = function() {
    this.video && (document.body.appendChild(this.video), this.video.play(), this.video.style.display = "block")
};
TitleScreen.prototype.onHide = function() {
    this.video && (this.video.pause(), this.video.style.display = "none")
};
TitleScreen.prototype.onHidden = function() {
    this.video && document.body.removeChild(this.video)
};
TitleScreen.prototype.updateTransform = function() {
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    this.video && (this.video.style.left = this.screenPanal.worldTransform[2] - this.video.width / 2 + -2 * APP.container.scale.y + "px", this.video.style.top = this.screenPanal.worldTransform[5] - this.video.height / 2 + 14 * APP.container.scale.y + "px")
};
TitleScreen.prototype.resize = function(a, b) {
    this.position.x = Math.floor(a / 2);
    this.position.y = Math.floor(b / 2);
    this.video && (this.video.width = 628 * APP.container.scale.y, this.video.height = 354 * APP.container.scale.y);
    PROFILE.ipad && (this.scale.x = APP.w > APP.h ? this.scale.y = 1 : this.scale.y = 540 / APP.w)
};
MobileTitleScreen = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.panal = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/HOME_mobile_panelBG.png");
    this.panal.anchor.x = this.panal.anchor.y = 0.5;
    this.panal.position.y = 240;
    this.addChild(this.panal);
    this.pack = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/intro_heroPack.png");
    this.pack.anchor.x = this.pack.anchor.y = 0.5;
    this.pack.position.x = 0;
    this.pack.position.y = 20;
    this.pack.scale.x = this.pack.scale.y = 0.9;
    this.addChild(this.pack);
    this.logo = PIXI.Sprite.fromImage(REMOTE_PATH +
        "img/UI/HOME_desktop_logo.png");
    this.logo.anchor.x = this.logo.anchor.y = 0.5;
    this.logo.position.x = 0;
    this.logo.position.y = -220;
    this.addChild(this.logo);
    this.text2 = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/intro_BIGflava.png");
    this.text2.anchor.x = this.text2.anchor.y = 0.5;
    this.text2.position.x = 0;
    this.text2.position.y = 140;
    this.addChild(this.text2);
    this.playAgainButton = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/HOME_mobile_play.png");
    this.productInfoButton = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/HOME_mobile_more.png");
    this.leaderBoardButton = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/HOME_mobile_leaderboard.png");
    this.panal.addChild(this.playAgainButton);
    this.panal.addChild(this.productInfoButton);
    this.panal.addChild(this.leaderBoardButton);
    this.playAgainButton.anchor.x = this.playAgainButton.anchor.y = 0.5;
    this.productInfoButton.anchor.x = this.productInfoButton.anchor.y = 0.5;
    this.leaderBoardButton.anchor.x = this.leaderBoardButton.anchor.y = 0.5;
    this.playAgainButton.position.y = -30;
    this.productInfoButton.position.y = 34;
    this.leaderBoardButton.position.y =
        34;
    this.productInfoButton.position.x = 85;
    this.playAgainButton.position.x = 1;
    this.leaderBoardButton.position.x = -85;
    BasicButton.apply(this.playAgainButton, function() {
        this.playAgainButton.disable();
        APP.controlOverlay ? APP.controlSelected ? APP.simpleApp.gotoScreen(APP.gameScreen) : PROFILE.canTilt ? (APP.controlSelected = !0, APP.controlOverlay.visible = !0, APP.controlOverlay.show(), APP.controlOverlay.onSelect = function() {
                APP.simpleApp.gotoScreen(APP.gameScreen)
            }) : (APP.gameScreen.game.controller.setTouch(), APP.simpleApp.gotoScreen(APP.gameScreen)) :
            APP.simpleApp.gotoScreen(APP.gameScreen)
    }.bind(this));
    this.playAgainButton.disable();
    BasicButton.apply(this.leaderBoardButton, function() {
        APP.fromTitle = !0;
        APP.simpleApp.gotoScreen(APP.leaderboardScreen)
    });
    BasicButton.apply(this.productInfoButton, function() {
        window.open("http://m.your-website-name.co.uk/food_single_item.php?item_id\x3d11589", "_blank")
    });
    var a = document.createElement("div");
    a.className = "legals";
    legals = a;
    legals.show = function() {};
    legals.hide = function() {}
};
MobileTitleScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
MobileTitleScreen.prototype.onShow = function() {
    this.playAgainButton.enable();
    APP.background.visible = !0
};
MobileTitleScreen.prototype.resize = function(a, b) {
    this.position.x = Math.floor(a / 2);
    this.position.y = Math.floor(b / 2)
};
HighscoreScreen = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.label = new PIXI.Text("hi Mum", {
        font: "35px Snippet",
        fill: "white",
        align: "left"
    });
    this.addChild(this.label);
    BasicButton.apply(this.label, this.onLoginPressed.bind(this))
};
HighscoreScreen.constructor = HighscoreScreen;
HighscoreScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
HighscoreScreen.prototype.onLoginPressed = function() {
    FacebookAPI.loginAndGetData(this.onLoginSuccess.bind(this))
};
HighscoreScreen.prototype.resize = function(a, b) {
    this.label.position.x = a / 2;
    this.label.position.y = b / 2
};
HighscoreScreen.prototype.onLoginSuccess = function(a) {
    this.label.setText(a.name);
    console.log(a)
};
GameScreen = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.game = new Game(this)
};
GameScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GameScreen.prototype.onShow = function() {
    legals.hide();
    this.game.start();
    APP.lowRez();
    PROFILE.music && !SoundButton.instance.musicOn && (SoundButton.instance.musicOn = !0, SoundButton.instance.music2.play())
};
GameScreen.prototype.onShown = function() {
    APP.background.visible = !1;
    PROFILE.music && SoundButton.instance.music2.fadeIn(0.5, 1E3)
};
GameScreen.prototype.onHidden = function() {
    APP.highRez()
};
GameScreen.prototype.resize = function(a, b) {
    this.game.resize(a, b)
};
GameoverScreen = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.tint = new PIXI.Graphics;
    this.tint.beginFill(0, 0.5);
    this.tint.drawRect(0, 0, 100, 100);
    this.tint.visible = !1;
    this.ga = new GAME.GameoverAnimation;
    this.addChild(this.ga);
    this.addChild(this.tint);
    this.ga.position.x = Math.floor(14) + 12;
    this.ga.position.y = Math.floor(-306.95 + 210) + 100;
    this.gameoverContainer = new PIXI.DisplayObjectContainer;
    this.gameoverContainer.position.x = Math.floor(-196);
    this.gameoverContainer.position.y = Math.floor(-306.95);
    this.addChild(this.gameoverContainer);
    this.gameoverContainer.alpha = 0;
    this.gameoverContainer.visible = !1;
    this.bg = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/largePanel.png", !0);
    this.gameoverContainer.addChild(this.bg);
    this.bg2 = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/GO_panel_button-recesses.png");
    this.gameoverContainer.addChild(this.bg2);
    this.bg2.position.y = Math.floor(210);
    this.bg2.position.x = Math.floor(7);
    this.box = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/GO_panel_packshot.png", !0);
    this.gameoverContainer.addChild(this.box);
    this.boxHome =
        this.box.texture.frame.x;
    this.submitButton = new McBiteButton("facebookSubmit.png", "facebookSubmit_press.png");
    this.playAgainButton = new McBiteButton("GO_button_play.png", "GO_button_play_press.png", "GO_button_play_press.png");
    this.productInfoButton = new McBiteButton("GO_button_more.png", "GO_button_more_press.png", "GO_button_more_press.png");
    this.leaderBoardButton = new McBiteButton("GO_button_leaderboard.png", "GO_button_leaderboard_press.png", "GO_button_leaderboard_press.png");
    this.scoreLabel = PIXI.Sprite.fromFrame("yourScore_text.png");
    this.scoreLabel.anchor.x = 0.5;
    this.scoreLabel.position.x = Math.floor(196);
    this.scoreLabel.position.y = Math.floor(56);
    this.scoreText = new PIXI.Text(APP.score || 101, {
        font: "90px Pathway Gothic One",
        fill: "#de571c"
    });
    this.scoreText.position.x = Math.floor(196);
    this.scoreText.anchor.x = 0.5;
    this.gameoverContainer.addChild(this.scoreLabel);
    this.gameoverContainer.addChild(this.scoreText);
    this.scoreText.position.y = Math.floor(70) - 7;
    PROFILE.firefox && (this.scoreText.position.y += 7);
    this.gameoverContainer.addChild(this.submitButton);
    this.gameoverContainer.addChild(this.playAgainButton);
    this.gameoverContainer.addChild(this.productInfoButton);
    this.gameoverContainer.addChild(this.leaderBoardButton);
    this.submitButton.position.y = Math.floor(154);
    this.playAgainButton.position.y = Math.floor(424.9) + 1;
    this.productInfoButton.position.y = Math.floor(524.3) - 1;
    this.leaderBoardButton.position.y = Math.floor(473.2) + 1;
    this.playAgainButton.position.x = Math.floor(274 * 0.7) + 1;
    this.productInfoButton.position.x = Math.floor(274 * 0.7) + 1;
    this.leaderBoardButton.position.x =
        Math.floor(274 * 0.7) + 1;
    this.rankSection = new RankSection;
    this.rankSection.position.x = Math.floor(196);
    this.rankSection.position.y = Math.floor(273);
    this.gameoverContainer.addChild(this.rankSection);
    BasicButton.apply(this.playAgainButton, this.onPlayAgainPressed.bind(this));
    BasicButton.apply(this.submitButton, this.onLoginPressed.bind(this));
    BasicButton.apply(this.leaderBoardButton, function() {
        _gaq.push(["_trackEvent", "Spicy mcbites", "Leaderboard clicks", "Leaderboard clicks"]);
        APP.fromTitle = !1;
        APP.simpleApp.gotoScreen(APP.leaderboardScreen)
    });
    BasicButton.apply(this.productInfoButton, function() {
        _gaq.push(["_trackEvent", "Spicy mcbites", "Product Info clicks", "Product Info clicks"]);
        window.open(PROFILE.mobile ? "http://m.your-website-name.co.uk/food_single_item.php?item_id\x3d11589" : "http://greenish.xyz", "_blank")
    });
    this.boxMask = new PIXI.Graphics;
    this.boxMask.beginFill(16711680);
    this.boxMask.drawRect(0, 105, 700 * 0.7, 322);
    this.boxMask.rotation = -0.03;
    this.boxMask.position.x = 1;
    this.gameoverContainer.addChild(this.boxMask);
    this.box.mask = this.boxMask;
    this.tc = new PIXI.Sprite.fromFrame("gameTsCs.png");
    this.gameoverContainer.addChild(this.tc);
    this.tc.anchor.x = 0.5;
    this.tc.position.x = Math.floor(196);
    this.tc.position.y = 574;
    BasicButton.apply(this.tc, function() {
        window.open(APP.tc, "_blank")
    })
};
GameoverScreen.constructor = GameoverScreen;
GameoverScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GameoverScreen.prototype.onShow = function() {
    APP.fromGame ? (this.ga.visible = !0, this.gameoverContainer.alpha = 0, this.gameoverContainer.visible = !1, this.tint.visible = !1, this.tint.alpha = 0, this.ga.currentFrame = 0, this.ga.onComplete = this.onDropped.bind(this)) : (this.ga.visible = !1, this.onDropped());
    APP.fromGame = !1;
    this.scoreText.setText(formatScore(APP.score || 9));
    FacebookAPI.loggedIn ? (this.submitButton.visible = !1, SteveAPI.getUserScore(this.onScoreRecieved.bind(this)), this.box.position.x = Math.floor(35), this.box.position.y =
        Math.floor(224), this.box.anchor.x = 0.5, this.rankSection.visible = !0, this.rankSection.alpha = 0) : (this.box.texture.frame.x = this.boxHome, this.submitButton.position.x = Math.floor(196), this.submitButton.position.y = Math.floor(164.5), this.box.anchor.x = 0.5, this.box.position.x = Math.floor(196), this.box.position.y = Math.floor(224), this.rankSection.visible = !1, this.submitButton.visible = !0)
};
GameoverScreen.prototype.onScoreRecieved = function(a) {
    APP.userRank = a.rank;
    APP.userScore = a.score.score;
    APP.userName = a.score.username;
    this.rankSection.rankLabel.setText(APP.userRank || "n/a");
    this.rankSection.pbLabel.setText(formatScore(APP.userScore || "0"));
    this.rankSection.setData(a.score.facebookId);
    console.log(APP.userName + " is ranked " + APP.userRank + " and the score is " + APP.userScore);
    TweenLite.to(this.rankSection, 0.3, {
        alpha: 1
    })
};
GameoverScreen.prototype.onDropped = function() {
    APP.background.visible = !0;
    legals.show();
    this.ga.onComplete = null;
    this.gameoverContainer.visible = !0;
    TweenLite.to(this.gameoverContainer, 0.3, {
        alpha: 1,
        delay: 1.1
    });
    this.tint.visible = !0;
    TweenLite.to(this.tint, 0.3, {
        alpha: 1,
        delay: 1
    })
};
GameoverScreen.prototype.onPlayAgainPressed = function() {
    _gaq.push(["_trackEvent", "Spicy mcbites", "Play again", "Play again"]);
    APP.simpleApp.gotoScreen(APP.gameScreen)
};
GameoverScreen.prototype.onLoginPressed = function() {
    APP.inAPP ? SteveAPI.loginAndGetDataFromAPP(this.onLoginSuccess.bind(this)) : FacebookAPI.loginAndGetData(this.onLoginSuccess.bind(this))
};
GameoverScreen.prototype.onLoginSuccess = function() {
    SteveAPI.submitScore(APP.score || 100, function(a) {
        a.success ? SteveAPI.getUserScore(function(a) {
            APP.userRank = a.rank;
            APP.userScore = a.score.score;
            APP.userName = a.score.username;
            console.log(APP.userName + " is ranked " + APP.userRank + " and the score is " + APP.userScore);
            APP.simpleApp.gotoScreen(APP.leaderboardScreen)
        }) : APP.simpleApp.gotoScreen(APP.leaderboardScreen)
    })
};
GameoverScreen.prototype.resize = function(a, b) {
    this.position.x = Math.floor(a / 2);
    this.position.y = Math.floor(b / 2);
    this.tint.scale.x = a / 100;
    this.tint.scale.y = b / 100;
    this.tint.position.x = -a / 2;
    this.tint.position.y = -b / 2;
    this.ga.resize(a, b)
};
RankSection = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.maskImage = new Image;
    this.maskImage.crossOrigin = "";
    this.maskImage.src = REMOTE_PATH + "img/bigCircleMask.png";
    this.canvas = document.createElement("canvas");
    this.canvas.context = this.canvas.getContext("2d");
    this.canvas.width = 100;
    this.canvas.height = 100;
    this.canvasTexture = PIXI.Texture.fromCanvas(this.canvas);
    this.image = new Image;
    this.imageSprite = new PIXI.Sprite(this.canvasTexture);
    this.imageSprite.anchor.x = this.imageSprite.anchor.y = 0.5;
    this.imageSprite.position.x =
        20;
    this.imageSprite.position.y = 17;
    this.addChild(this.imageSprite);
    this.rankLabel = new PIXI.Text("hi rank", {
        font: "24px Pathway Gothic One",
        fill: "#4b4b4b",
        align: "left"
    });
    this.pbLabel = new PIXI.Text("hi pb", {
        font: "24px Pathway Gothic One",
        fill: "#4b4b4b",
        align: "left"
    });
    this.addChild(this.rankLabel);
    this.addChild(this.pbLabel);
    this.rankTitle = PIXI.Sprite.fromFrame("GO_panel_rank.png");
    this.pbTitle = PIXI.Sprite.fromFrame("GO_panel_PB.png");
    this.addChild(this.rankTitle);
    this.addChild(this.pbTitle);
    this.rankTitle.position.x =
        Math.floor(42) + 5;
    this.rankTitle.position.y = 6;
    this.pbTitle.position.x = Math.floor(42) + 5;
    this.pbTitle.position.y = -35;
    this.addChild(this.rankLabel);
    this.addChild(this.pbLabel);
    this.rankLabel.position.x = Math.floor(42) + 5;
    this.pbLabel.position.x = Math.floor(42) + 5;
    this.rankLabel.position.y = Math.floor(7) + 13 - 4;
    this.pbLabel.position.y = Math.floor(-28) + 7 - 4;
    this.recess = PIXI.Sprite.fromFrame("GO_panel_singleRecess.png");
    this.pbText = PIXI.Sprite.fromFrame("sharePBtext.png");
    this.pbText.position.x = Math.floor(14) - 4;
    this.pbText.position.y = Math.floor(17.5);
    this.addChild(this.recess);
    this.recess.addChild(this.pbText);
    this.faceButton = new McBiteButton("facebook_button_up.png", "facebook_button_press.png");
    this.twitterButton = new McBiteButton("twitter_button_up.png", "twitter_button_press.png");
    BasicButton.apply(this.faceButton, function() {
        _gaq.push(["_trackEvent", "Spicy mcbites", "Social shares", "Facebook"]);
        FacebookAPI.postToFeed()
    });
    BasicButton.apply(this.twitterButton, function() {
        _gaq.push(["_trackEvent", "Spicy mcbites",
            "Social shares", "Twitter"
        ]);
        var a = encodeURIComponent("http://m.your-website-name.co.uk/spicy.php"),
            a = "https://twitter.com/intent/tweet?text\x3d" + encodeURIComponent("I got " + APP.score + " points going on an epic Spicy McBites\u00ae adventure. Play Super Spice Dash and see if you can beat my score") + "\x26url\x3d" + a;
        window.open(a, "_blank", "height\x3d300,width\x3d550,resizable\x3d1")
    });
    this.recess.addChild(this.faceButton);
    this.recess.addChild(this.twitterButton);
    this.faceButton.position.x = Math.floor(130.9) +
        4 + 17;
    this.faceButton.position.y = Math.floor(5.6) + 1;
    this.twitterButton.position.x = Math.floor(173.6) + 17;
    this.twitterButton.position.y = Math.floor(5.6) + 1;
    this.recess.position.x = Math.floor(-45 * 0.7);
    this.recess.position.y = Math.floor(66.5)
};
RankSection.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
RankSection.prototype.setData = function(a) {
    this.imageSprite.scale.x = this.imageSprite.scale.y = 0;
    this.image.src = null;
    this.image = new Image;
    this.image.crossOrigin = "";
    this.image.onload = function() {
        this.canvas.context.drawImage(this.maskImage, 0, 0, 70, 70);
        this.canvas.context.globalCompositeOperation = "source-in";
        var a = Math.max(70 / this.image.width, 70 / this.image.height);
        this.canvas.context.drawImage(this.image, 35 - this.image.width * a / 2, 35 - this.image.height * a / 2, this.image.width * a, this.image.height * a);
        this.canvas.context.globalCompositeOperation =
            "source-over";
        TweenLite.to(this.imageSprite.scale, 1, {
            x: 1,
            y: 1,
            ease: Elastic.easeOut
        })
    }.bind(this);
    this.image.src = "https://graph.facebook.com/" + a + "/picture?type\x3dlarge"
};
var animData = {
        mc16: {
            view: "intro_BG.png",
            depth: 0,
            startFrame: 74,
            endFrame: 89,
            position: [-25.6, 1102.85, -25.6, 837.55, -25.6, 613.05, -25.6, 429.35, -25.6, 286.5, -25.6, 184.5, -25.6, 123.25, -25.6, 102.85, -25.6, 102.85, -25.6, 102.85, -25.6, 102.85, -25.6, 102.85, -25.6, 102.85, -25.6, 102.85, -25.6, 102.85]
        },
        mc1: {
            view: "testLineOutro.png",
            depth: 1,
            startFrame: 0,
            endFrame: 8,
            position: [-20.55, 444.5, -20.55, 316.8, -20.55, 189.1, -20.55, 61.4, -20.55, -66.35, -20.55, -194.05, -20.55, -321.75, -20.55, -449.45],
            scale: [0.52020263671875, 0.52020263671875,
                0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875
            ]
        },
        mc2: {
            view: "testLineOutro.png",
            depth: 1,
            startFrame: 11,
            endFrame: 19,
            position: [19.45, 444.5, 19.45, 319.65, 19.45, 194.8, 19.45, 69.95, 19.45, -54.9, 19.45, -179.75, 19.45, -304.6, 19.45, -429.45],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875,
                0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875
            ]
        },
        mc3: {
            view: "testLineOutro.png",
            depth: 2,
            startFrame: 16,
            endFrame: 22,
            position: [-210.55, 444.5, -210.55, 273.7, -210.55, 102.9, -210.55, -67.85, -210.55, -238.65, -210.55, -409.45],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875,
                0.52020263671875, 0.52020263671875, 0.52020263671875
            ]
        },
        mc4: {
            view: "testLineOutro.png",
            depth: 2,
            startFrame: 19,
            endFrame: 27,
            position: [-20.55, 384.5, -20.55, 276.8, -20.55, 169.1, -20.55, 61.4, -20.55, -46.35, -20.55, -154.05, -20.55, -261.75, -20.55, -369.45],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875]
        },
        mc5: {
            view: "cloud.png",
            depth: 0,
            startFrame: 26,
            endFrame: 58,
            position: [-58.95, 580.15, -58.95, 545.1, -58.95, 510.1, -58.95, 475.05, -58.95, 440, -58.95, 404.95, -58.95, 369.9, -58.95, 334.85, -58.95, 299.8, -58.95, 264.8, -58.95, 229.75, -58.95, 194.7, -58.95, 159.65, -58.95, 124.65, -58.95, 89.6, -58.95, 54.55, -58.95, 19.5, -58.95, -15.55, -58.95, -50.55, -58.95, -85.6, -58.95, -120.65, -58.95, -155.7, -58.95, -190.75, -58.95, -225.75, -58.95, -260.85, -58.95, -295.85, -58.95, -330.9, -58.95, -365.95, -58.95, -401, -58.95, -436, -58.95, -471.05, -58.95, -506.1],
            scale: [0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875,
                0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875,
                0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875
            ]
        },
        mc6: {
            view: "cloud.png",
            depth: 2,
            startFrame: 29,
            endFrame: 45,
            position: [61.05, 693.9, 61.05, 613.9, 61.05, 533.9, 61.05, 453.9, 61.05, 373.9, 61.05, 293.9, 61.05, 213.9, 61.05, 133.9, 61.05, 53.9, 61.05, -26.1, 61.05, -106.1, 61.05, -186.1, 61.05, -266.1, 61.05, -346.1, 61.05, -426.1, 61.05, -506.1],
            scale: [1.5, 1.5, 1.500030517578125,
                1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.5, 1.5
            ],
            alpha: [0.69921875,
                0.71875, 0.73828125, 0.7578125, 0.78125, 0.80078125, 0.8203125, 0.83984375, 0.859375, 0.87890625, 0.8984375, 0.91796875, 0.94140625, 0.9609375, 0.98046875, 1
            ]
        },
        mc7: {
            view: "testLineOutro.png",
            depth: 3,
            startFrame: 30,
            endFrame: 38,
            position: [19.45, 344.5, 19.45, 242.5, 19.45, 140.5, 19.45, 38.5, 19.45, -63.45, 19.45, -165.45, 19.45, -267.45, 19.45, -369.45],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875,
                0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875
            ]
        },
        mc8: {
            view: "testLineOutro.png",
            depth: 4,
            startFrame: 35,
            endFrame: 41,
            position: [209.45, 344.5, 209.45, 205.7, 209.45, 66.9, 209.45, -71.85, 209.45, -210.65, 209.45, -349.45],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875]
        },
        mc9: {
            view: "testLineOutro.png",
            depth: 3,
            startFrame: 43,
            endFrame: 51,
            position: [-20.55, 364.5, -20.55, 262.5, -20.55, 160.5, -20.55, 58.5, -20.55, -43.45, -20.55, -145.45, -20.55, -247.45, -20.55, -349.45],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875]
        },
        mc10: {
            view: "cloud.png",
            depth: 2,
            startFrame: 47,
            endFrame: 65,
            position: [-283.45, 693.9, -283.45,
                618.6, -283.45, 543.3, -283.45, 468, -283.45, 392.75, -283.45, 317.45, -283.45, 242.15, -283.45, 166.85, -283.45, 91.55, -283.45, 16.25, -283.45, -59.05, -283.45, -134.35, -283.45, -209.65, -283.45, -284.95, -283.45, -360.2, -283.45, -435.5, -283.45, -510.8, -283.45, -586.1
            ],
            scale: [1.5, 1.5, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125,
                1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.500030517578125, 1.5, 1.5
            ],
            alpha: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
        },
        mc11: {
            view: "cloud.png",
            depth: 0,
            startFrame: 49,
            endFrame: 81,
            position: [181.05, 580.15, 181.05,
                545.1, 181.05, 510.1, 181.05, 475.05, 181.05, 440, 181.05, 404.95, 181.05, 369.9, 181.05, 334.85, 181.05, 299.8, 181.05, 264.8, 181.05, 229.75, 181.05, 194.7, 181.05, 159.65, 181.05, 124.65, 181.05, 89.6, 181.05, 54.55, 181.05, 19.5, 181.05, -15.55, 181.05, -50.55, 181.05, -85.6, 181.05, -120.65, 181.05, -155.7, 181.05, -190.75, 181.05, -225.75, 181.05, -260.85, 181.05, -295.85, 181.05, -330.9, 181.05, -365.95, 181.05, -401, 181.05, -436, 181.05, -471.05, 181.05, -506.1
            ],
            scale: [0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875,
                0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875,
                0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875,
                0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875, 0.6999969482421875
            ],
            alpha: [1, 0.984375, 0.96875, 0.953125, 0.93359375, 0.91796875, 0.90234375, 0.88671875, 0.87109375, 0.85546875, 0.83984375, 0.82421875, 0.8046875, 0.7890625, 0.7734375, 0.7578125, 0.7421875, 0.7265625, 0.7109375, 0.6953125, 0.67578125, 0.66015625, 0.64453125, 0.62890625, 0.61328125, 0.59765625, 0.58203125, 0.56640625, 0.546875, 0.53125, 0.515625, 0.5]
        },
        mc12: {
            view: "testLineOutro.png",
            depth: 4,
            startFrame: 54,
            endFrame: 62,
            position: [19.45, 344.5,
                19.45, 248.2, 19.45, 151.95, 19.45, 55.65, 19.45, -40.6, 19.45, -136.9, 19.45, -233.15, 19.45, -329.45
            ],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875]
        },
        mc13: {
            view: "testLineOutro.png",
            depth: 3,
            startFrame: 62,
            endFrame: 68,
            position: [-10.55, 324.5, -10.55, 189.7, -10.55, 54.9, -10.55, -79.85, -10.55, -214.65, -10.55, -349.45],
            scale: [0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875, 0.52020263671875]
        },
        mc14: {
            view: "packRear.png",
            depth: 0,
            startFrame: 71,
            endFrame: 89,
            position: [-2, 420.5, -2, 280.95, -2, 162.85, -2, 66.25, -2, -8.9, -2, -62.55, -2, -94.75, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5, -2, -105.5]
        },
        mc18: {
            view: "packShadow.png",
            depth: 2,
            startFrame: 77,
            endFrame: 89,
            position: [-0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260, -0.5, 260]
        },
        mc19: {
            view: "McBite.png",
            depth: 6,
            startFrame: 79,
            endFrame: 88,
            position: [-30, -2.85, -57.8, -30.65, -74.5, -47.25, -80, -52.85, -80.45, -50.85, -81.6, -44.9, -83.6, -34.85, -86.45, -20.9, -90, -2.85],
            scale: [0.5749868879948276, 0.5749868879948276, 0.5745822234987104, 0.5745822234987104, 0.5744250492191856, 0.5744250492191856, 0.5749929670057295, 0.5749929670057295, 0.5741578255498468,
                0.5741578255498468, 0.5741403497401855, 0.5741403497401855, 0.5741159777324942, 0.5741159777324942, 0.5740616238366861, 0.5740616238366861, 0.5749774230341977, 0.5749774230341977
            ],
            rotation: [66.74151611328125, 12.821273803710938, -19.082916259765625, -29.998565673828125, -30.572891235351562, -32.34239196777344, -35.34825134277344, -39.599822998046875, -44.99781799316406]
        },
        mc0: {
            view: "McBite2.png",
            depth: 0,
            startFrame: 0,
            endFrame: 89,
            position: [0, -398, 0, -359.35, 0, -322.45, 0, -287.25, 0, -253.75, 0, -222, 0, -191.95, 0, -163.65, 0, -137, 0, -112.1, 0, -88.95, 0, -67.5, 0, -47.75, 0, -29.7, 0, -13.4, 0, 1.2, 0, 14.1, 0, 25.25, 0, 34.7, 0, 42.4, 0, 48.4, 0, 52.7, 0, 55.3, 0, 56.15, 0, 49.75, 0, 43.95, 0, 38.65, 0, 33.95, 0, 29.75, 0, 26.15, 0, 23.1, 0, 20.6, 0, 18.65, 0, 17.25, 0, 16.45, 0, 16.15, 0, 16.35, 0, 16.95, 0, 18.1, 0, 19.75, 0, 22.05, 0, 25.1, 0, 28.9, 0, 33.45, 0, 38.6, 0, 44.05, 0, 49.4, 0, 54.2, 0, 58.15, 0, 61.3, 0, 63.55, 0, 65.05, 0, 65.9, 0, 66.15, 0, 65.1, 0, 61.6, 0, 55.1, 0, 45, 0, 30.8, 0, 13.05, 0, -6.25, 0, -23.75, 0, -37.15, 0, -45.9, 0, -50.65, 0, -52.05, 0, -51.5, 0, -49.95, 0, -47.3, 0, -43.6, 0, -38.85, 0, -33.05, 0, -26.2,
                0, -18.25, 0, -9.3, 0, 0.75, 0, 11.8, 0, 23.95, 0, 37.15, 0, 37.15, 0, 37.15, 0, -2.85, 0, -30.65, 0, -47.3, 0, -52.85, 0, -49.25, 0, -38.45, 0, -20.45, 0, 4.75
            ],
            scale: [0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875,
                0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875,
                0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875,
                0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875,
                0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875,
                0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875,
                0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875, 0.5749969482421875
            ]
        },
        mc20: {
            view: "McBite.png",
            depth: 7,
            startFrame: 80,
            endFrame: 89,
            position: [31,
                12, 52.1, -24, 64.8, -45.65, 69, -52.8, 70.05, -50.5, 73.1, -43.7, 78.35, -32.4, 85.65, -16.35, 95, 4.15
            ],
            scale: [0.5749861024260317, 0.5749861024260317, 0.5743002381616792, 0.5743002381616792, 0.5742013794435232, 0.5742013794435232, 0.5749950108752246, 0.5749950108752246, 0.5742031270856971, 0.5742031270856971, 0.5742694313769313, 0.5742694313769313, 0.5743995751986338, 0.5743995751986338, 0.574650407998059, 0.574650407998059, 0.5749969482421875, 0.5749969482421875],
            rotation: [74.99862670898438, 66.7001953125, 61.68678283691406, 59.99882507324219,
                61.193084716796875, 64.91671752929688, 70.93035888671875, 79.23092651367188, 90
            ]
        },
        mc15: {
            view: "packFront.png",
            depth: 3,
            startFrame: 71,
            endFrame: 89,
            position: [-0.5, 587, -0.5, 447.45, -0.5, 329.35, -0.5, 232.75, -0.5, 157.6, -0.5, 103.95, -0.5, 71.75, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61, -0.5, 61]
        }
    },
    GAME = GAME || {};
GAME.GameoverAnimation = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.sprites = [];
    for (var a in animData) {
        var b = animData[a];
        if ("McBite2.png" == b.view) {
            var c = [];
            for (a = 0; 15 > a; a++) {
                var d = a + 1;
                10 > d && (d = "0" + d);
                c.push(PIXI.Texture.fromFrame("bitesFrames_" + d + ".png"))
            }
            c = new PIXI.MovieClip(c);
            c.animationSpeed = 0.5;
            c.play()
        } else "intro_BG.png" == b.view ? (c = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/intro_BG.jpg"), d = PIXI.Sprite.fromFrame("whiteGradient.png"), d.width = 1024, d.anchor.x = 0.5, d.position.y = -512, this.grad =
            d, this.bg = c, this.bg.addChild(d)) : c = PIXI.Sprite.fromFrame(b.view);
        this.addChild(c);
        b.sprite = c;
        b.sprite.anchor.x = b.sprite.anchor.y = 0.5;
        c.visible = !1
    }
    this.currentFrame = 0
};
GAME.GameoverAnimation.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.GameoverAnimation.prototype.updateTransform = function() {
    this.currentFrame += 0.6;
    if (88 <= this.currentFrame && (this.currentFrame = 88, this.onComplete)) this.onComplete();
    var a = this.currentFrame,
        a = Math.round(a),
        b;
    for (b in animData) {
        var c = animData[b];
        if (a >= c.startFrame && a < c.endFrame) {
            c.sprite.visible = !0;
            var d = a - c.startFrame,
                e = Math.floor(d),
                f = Math.round(d),
                d = d - e,
                g = c.position[2 * e + 1];
            c.sprite.position.x = c.position[2 * e];
            c.sprite.position.y = g;
            var h = g = 1;
            c.scale && (g = c.scale[2 * e], g += (c.scale[2 * f] - g) * d, h = c.scale[2 *
                e + 1], h += (c.scale[2 * f + 1] - h) * d, c.sprite.scale.x = g, c.sprite.scale.y = h);
            g = 1;
            c.alpha && (g = c.alpha[e], g += (c.alpha[f] - g) * d);
            c.sprite.alpha = g;
            c.rotation && (e = c.rotation[e], interRotation = e + (c.rotation[f] - e) * d, c.sprite.rotation = interRotation * (Math.PI / 180))
        } else c.sprite.visible = !1
    }
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
};
GAME.GameoverAnimation.prototype.resize = function(a) {
    this.bg.width = a;
    this.bg.scale.y = this.bg.scale.x
};
ControlSelectOverlay = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.bg = PIXI.Sprite.fromFrame("mobileControlMethod.png");
    this.bg.anchor.x = this.bg.anchor.y = 0.5;
    this.tint = new PIXI.Graphics;
    this.tint.beginFill(0, 0.7);
    this.tint.drawRect(-1E3, -1E3, 2E3, 2E3);
    this.tint.endFill();
    this.hitAreaView = new PIXI.Graphics;
    this.hitAreaView.beginFill(0, 0.7);
    this.hitAreaView.drawRect(-160, -30, 330, 100);
    this.hitAreaView.endFill();
    this.hitArea = new PIXI.Rectangle(-160, -30, 330, 100);
    this.interactive = !0;
    this.click = this.tap =
        function(a) {
            if (0 < a.getLocalPosition(this).x) this.onTouchPressed();
            else this.onTiltPressed()
        }.bind(this);
    this.addChild(this.tint);
    this.addChild(this.bg)
};
ControlSelectOverlay.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
ControlSelectOverlay.prototype.show = function() {
    this.tint.alpha = 0;
    this.bg.alpha = 0;
    TweenLite.to(this.tint, 0.4, {
        alpha: 1
    });
    TweenLite.to(this.bg, 0.4, {
        alpha: 1,
        delay: 0.4
    })
};
ControlSelectOverlay.prototype.hide = function() {
    this.visible = !1
};
ControlSelectOverlay.prototype.onTiltPressed = function() {
    APP.gameScreen.game.controller.setTilt();
    this.hide();
    if (this.onSelect) this.onSelect()
};
ControlSelectOverlay.prototype.onTouchPressed = function() {
    APP.gameScreen.game.controller.setTouch();
    this.hide();
    if (this.onSelect) this.onSelect()
};
HelpOverlay = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.colorBlock = new PIXI.Graphics;
    this.colorBlock.beginFill(16381680, 0.6);
    this.colorBlock.moveTo(4, -20);
    this.colorBlock.lineTo(283, -20);
    this.colorBlock.lineTo(283, 297);
    this.colorBlock.lineTo(14, 297);
    this.colorBlock.endFill();
    this.addChild(this.colorBlock);
    this.trackpad = new PixiTrackpad(this, !0);
    this.pageContainer = new PIXI.DisplayObjectContainer;
    this.pageContainer.mask = this.colorBlock;
    this.pageContainer.position.x = -5;
    this.pageContainer.position.y = -20;
    this.addChild(this.pageContainer);
    this.pages = [];
    for (var a = 0; 3 > a; a++) {
        var b = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/howToPlay_0" + ((a + 1) % 3 + 1) + ".png", !0);
        this.pages.push(b);
        this.pageContainer.addChild(b)
    }
    this.label = PIXI.Sprite.fromFrame("howToPlay.png");
    this.label.anchor.x = 0.5;
    this.label.position.x = 142.5;
    this.label.position.y = -60;
    this.addChild(this.label)
};
HelpOverlay.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
HelpOverlay.prototype.updateTransform = function() {
    this.trackpad.update();
    for (var a = this.trackpad.size * this.pages.length, b = 0; b < this.pages.length; b++) {
        var c = this.pages[b];
        c.position.x = b * this.trackpad.size - a / 3 + this.trackpad.value;
        c.position.x %= a;
        0 > c.position.x && (c.position.x += a);
        c.position.x -= this.trackpad.size
    }
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
};
HelpOverlay.prototype.show = function() {};
HelpOverlay.prototype.hide = function() {
    this.visible = !1
};
Leaderboard = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.list = [];
    for (var a = this.realHeight = 0; 20 > a; a++) {
        var b = new ScoreView(a);
        this.addChild(b);
        b.position.y = 0.7 * 83 * a;
        this.list.push(b)
    }
};
Leaderboard.constructor = Leaderboard;
Leaderboard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Leaderboard.prototype.setData = function(a) {
    for (var b = 0; 20 > b; b++) {
        var c = this.list[b];
        c.visible = !1;
        c.alpha = 0
    }
    for (b = this.realHeight = 0; b < a.length; b++) c = this.list[b], c.visible = !0, c.setScore(a[b]), this.realHeight += 83 * 0.7, TweenLite.to(c, 0.3, {
        alpha: 1,
        delay: b / 8
    })
};
Leaderboard.prototype.resize = function() {};
ScoreView = function(a) {
    PIXI.DisplayObjectContainer.call(this);
    this.maskImage = new Image;
    this.maskImage.crossOrigin = "";
    this.maskImage.src = REMOTE_PATH + "img/maskTest.png";
    this.canvas = document.createElement("canvas");
    this.canvas.context = this.canvas.getContext("2d");
    this.canvas.width = 35;
    this.canvas.height = 35;
    this.canvasTexture = PIXI.Texture.fromCanvas(this.canvas);
    this.image = new Image;
    this.imageSprite = new PIXI.Sprite(this.canvasTexture);
    this.imageSprite.anchor.x = this.imageSprite.anchor.y = 0.5;
    this.addChild(this.imageSprite);
    this.labelNumber = new PIXI.Text(a + 1 + ".", {
        font: "23px Pathway Gothic One",
        fill: "#4b4b4b",
        align: "left"
    });
    this.labelName = new PIXI.Text("0", {
        font: "21px Pathway Gothic One",
        fill: "#4b4b4b",
        align: "left"
    });
    this.labelScore = new PIXI.Text("0", {
        font: "21px Pathway Gothic One",
        fill: "#4b4b4b",
        align: "left"
    });
    this.imageSprite.position.x = 73.5;
    this.imageSprite.position.y = 10.5;
    this.labelName.position.x = 180 * 0.7;
    this.labelScore.anchor.x = 1;
    this.labelScore.position.x = 322;
    this.addChild(this.labelNumber);
    this.addChild(this.labelName);
    this.addChild(this.labelScore);
    this.divider = PIXI.Sprite.fromFrame("dividerScore.png");
    this.divider.position.y = 37.8;
    this.addChild(this.divider)
};
ScoreView.constructor = ScoreView;
ScoreView.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
ScoreView.prototype.setScore = function(a) {
    a.facebookId && (this.imageSprite.scale.x = this.imageSprite.scale.y = 0, this.image.src = null, this.image = new Image, this.image.crossOrigin = "", this.image.onload = function() {
        this.canvas.context.drawImage(this.maskImage, 0, 0, 35, 35);
        this.canvas.context.globalCompositeOperation = "source-in";
        var a = Math.max(35 / this.image.width, 35 / this.image.height);
        this.canvas.context.drawImage(this.image, 17.5 - this.image.width * a / 2, 17.5 - this.image.height * a / 2, this.image.width * a, this.image.height *
            a);
        this.canvas.context.globalCompositeOperation = "source-over";
        TweenLite.to(this.imageSprite.scale, 1, {
            x: 1,
            y: 1,
            ease: Elastic.easeOut
        })
    }.bind(this), this.image.src = "https://graph.facebook.com/" + a.facebookId + "/picture?type\x3dlarge", this.labelName.setText(a.username.toUpperCase()), this.labelScore.setText(formatScore(a.score).toUpperCase()))
};
LeaderboardScreen = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.bg = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/largePanel.png", !0);
    this.addChild(this.bg);
    this.top20Button = PIXI.Sprite.fromFrame("top20_button_highlight.png");
    this.friend20Button = PIXI.Sprite.fromFrame("friends_button_highlight.png");
    this.top20Button.active = PIXI.Sprite.fromFrame("top20_button_up.png");
    this.top20Button.active.position.x = -3;
    this.top20Button.active.position.y = -1;
    this.top20Button.addChild(this.top20Button.active);
    this.top20Button.over =
        PIXI.Sprite.fromFrame("top20_button_press.png");
    this.top20Button.over.position.x = -3;
    this.top20Button.over.position.y = -1;
    this.top20Button.over.alpha = 0;
    this.top20Button.addChild(this.top20Button.over);
    this.top20Button.mouseover = function() {
        TweenLite.to(this.over, 0.1, {
            alpha: 1
        })
    };
    this.top20Button.mouseout = function() {
        TweenLite.to(this.over, 0.1, {
            alpha: 0
        })
    };
    this.friend20Button.active = PIXI.Sprite.fromFrame("friends_button_up.png");
    this.friend20Button.active.position.y = -1;
    this.friend20Button.addChild(this.friend20Button.active);
    this.friend20Button.over = PIXI.Sprite.fromFrame("friends_button_press.png");
    this.friend20Button.over.position.x = -3;
    this.friend20Button.over.position.y = -1;
    this.friend20Button.over.alpha = 0;
    this.friend20Button.addChild(this.friend20Button.over);
    this.friend20Button.mouseover = function() {
        TweenLite.to(this.over, 0.1, {
            alpha: 1
        })
    };
    this.friend20Button.mouseout = function() {
        TweenLite.to(this.over, 0.1, {
            alpha: 0
        })
    };
    this.challangeButton = new McBiteButton("challenge_friends_up.png", "challenge_friends_press.png");
    this.closeButton =
        new McBiteButton("back_button_up.png", "back_button_press.png");
    this.addChild(this.closeButton);
    this.addChild(this.top20Button);
    this.addChild(this.friend20Button);
    this.addChild(this.challangeButton);
    this.challangeButton.position.x = Math.floor(84) - 7 + 125;
    this.challangeButton.position.y = Math.floor(535.5) - 5;
    this.top20Button.position.x = Math.floor(46 * 0.7);
    this.friend20Button.position.x = Math.floor(282 * 0.7);
    this.top20Button.position.y = Math.floor(147 * 0.7);
    this.friend20Button.position.y = Math.floor(147 * 0.7);
    this.closeButton.position.x =
        Math.floor(343) + 10;
    this.closeButton.position.y = Math.floor(10.5) + 33;
    this.label = PIXI.Sprite.fromFrame("leaderboardTitle.png");
    this.label.anchor.x = 0.5;
    this.label.position.x = Math.floor(196);
    this.label.position.y = Math.floor(42);
    this.addChild(this.label);
    this.addChild(this.top20Button);
    this.addChild(this.friend20Button);
    this.leaderboardContainer = new PIXI.DisplayObjectContainer;
    this.addChild(this.leaderboardContainer);
    this.leaderboardContainer.position.x = Math.floor(38.5);
    this.leaderboardContainer.position.y =
        Math.floor(154);
    this.leaderboardMask = new PIXI.Graphics;
    this.leaderboardMask.beginFill(16711680);
    this.leaderboardMask.drawRect(0, -21, 700 * 0.7, 423 * 0.7);
    this.leaderboardContainer.addChild(this.leaderboardMask);
    this.leaderboard = new Leaderboard;
    this.leaderboardContainer.hitArea = new PIXI.Rectangle(0, 0, 700 * 0.7, 423 * 0.7);
    this.leaderboardContainer.addChild(this.leaderboard);
    this.friendMode = !0;
    this.trackpad = new PixiTrackpad(this.leaderboardContainer);
    this.trackpad.max = 1;
    BasicButton.apply(this.top20Button, this.showTop20.bind(this));
    BasicButton.apply(this.friend20Button, this.showTopfriendTop20.bind(this));
    BasicButton.apply(this.closeButton, this.onClosePressed.bind(this));
    BasicButton.apply(this.challangeButton, this.onChallangePressed.bind(this));
    this.userRank = new ScoreView;
    this.userRank.position.y = Math.floor(650 * 0.7) + 7;
    this.userRank.position.x = Math.floor(38.5);
    this.userRank.divider.visible = !1;
    this.addChild(this.userRank);
    this.colorBlock = new PIXI.Graphics;
    this.colorBlock.beginFill(16381680);
    this.colorBlock.moveTo(-24, -20);
    this.colorBlock.lineTo(348, -20);
    this.colorBlock.lineTo(348, 60);
    this.colorBlock.lineTo(-22, 60);
    this.colorBlock.endFill();
    this.colorBlock.position.y = -7;
    this.userRank.addChildAt(this.colorBlock, 0);
    this.tc = new PIXI.Sprite.fromFrame("gameTsCs.png");
    this.addChild(this.tc);
    this.tc.anchor.x = 0.5;
    this.tc.position.x = Math.floor(196);
    this.tc.position.y = 577;
    BasicButton.apply(this.tc, function() {
        window.open(APP.tc, "_blank")
    })
};
LeaderboardScreen.constructor = LeaderboardScreen;
LeaderboardScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
LeaderboardScreen.prototype.onShow = function() {
    this.showTop20();
    this.trackpad.setPosition(0, 0);
    this.leaderboard.mask = this.leaderboardMask;
    this.userRank.visible = !1;
    FacebookAPI.loggedIn && SteveAPI.getUserScore(this.onUserScoreRecieved.bind(this))
};
LeaderboardScreen.prototype.onUserScoreRecieved = function(a) {
    a.rank && (this.userRank.visible = !0, this.userRank.labelNumber.setText(a.rank + "."), this.userRank.setScore(a.score))
};
LeaderboardScreen.prototype.onHidden = function() {
    this.leaderboard.mask = null
};
LeaderboardScreen.prototype.updateTransform = function() {
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    423 < this.leaderboard.realHeight ? (this.trackpad.max = this.leaderboard.realHeight - 423 + 150, this.trackpad.update(), this.leaderboard.position.y = Math.floor(this.trackpad.valueY)) : this.leaderboard.position.y = 0
};
LeaderboardScreen.prototype.showTop20 = function() {
    this.friendMode && (this.friendMode = !1, this.top20Button.interactive = !1, this.friend20Button.interactive = !0, TweenLite.to(this.top20Button.over, 0.1, {
        alpha: 0
    }), TweenLite.to(this.leaderboard, 0.3, {
        alpha: 0
    }), TweenLite.to(this.top20Button.active, 0.3, {
        alpha: 0
    }), TweenLite.to(this.friend20Button.active, 0.3, {
        alpha: 1
    }), SteveAPI.getTop20(this.onScoresRecieved.bind(this)))
};
LeaderboardScreen.prototype.showTopfriendTop20 = function() {
    FacebookAPI.loggedIn ? this.friendMode || (this.friendMode = !0, this.top20Button.interactive = !0, this.friend20Button.interactive = !1, TweenLite.to(this.leaderboard, 0.3, {
            alpha: 0
        }), TweenLite.to(this.top20Button.active, 0.2, {
            alpha: 1
        }), TweenLite.to(this.friend20Button.active, 0.2, {
            alpha: 0
        }), TweenLite.to(this.friend20Button.over, 0.1, {
            alpha: 0
        }), SteveAPI.getTop20Friends(this.onScoresRecieved.bind(this))) : APP.inAPP ? SteveAPI.loginAndGetDataFromAPP(this.showTopfriendTop20.bind(this)) :
        FacebookAPI.loginAndGetData(this.showTopfriendTop20.bind(this))
};
LeaderboardScreen.prototype.onScoresRecieved = function(a) {
    TweenLite.to(this.leaderboard, 0.3, {
        alpha: 1
    });
    this.leaderboard.setData(a.scores)
};
LeaderboardScreen.prototype.onChallangePressed = function() {
    _gaq.push(["_trackEvent", "Spicy mcbites", "Social shares", "Challange"]);
    FacebookAPI.requestChallange(function(a) {
        console.log(a)
    })
};
LeaderboardScreen.prototype.onClosePressed = function() {
    APP.fromTitle ? APP.simpleApp.gotoScreen(APP.titleScreen) : APP.simpleApp.gotoScreen(APP.gameoverScreen)
};
LeaderboardScreen.prototype.resize = function(a, b) {
    this.position.x = Math.floor(a / 2 - 196);
    this.position.y = Math.floor(b / 2 - 306.95)
};
GAME = GAME || {};
World = function() {
    this.floorColors = [];
    this.underfloorColors = [];
    this.leftWallColors = [];
    this.rightWallColors = [];
    this.rightAlpha = this.leftAlpha = this.floorAlpha = 1;
    this.background = new Image;
    this.background.crossOrigin = "";
    this.leftPosts = [];
    this.rightPosts = [];
    this.leftStump = [];
    this.rightStump = []
};
World.prototype.process = function(a) {
    this.callback = a;
    this.allImages = [];
    this.loadCount = 0;
    this.processUrls(this.leftStump);
    this.processUrls(this.rightStump);
    this.processUrls(this.walls);
    this.processUrls(this.baddy);
    this.processUrls(this.extras);
    this.processUrls(this.jumpPosts);
    this.processUrls(this.dust);
    this.dropEdge = this.extras[1]
};
World.prototype.processUrls = function(a) {
    for (var b = 0; b < a.length; b++) {
        var c = a[b],
            d = new Image;
        d.crossOrigin = "";
        d.src = REMOTE_PATH + c;
        a[b] = d;
        this.allImages.push(d);
        d.onload = function() {
            this.loadCount++;
            this.loadCount == this.allImages.length && (console.log("LOADED"), this.callback && this.callback())
        }.bind(this)
    }
};
World.ice = new World;
World.ice.background.src = REMOTE_PATH + "img/snowWorld/snow_BG.jpg";
World.ice.floorColors = "#61dafe #32b7fc #9fb0ff #32ffd3 #6ebbeb #61dafe #00ffe5".split(" ");
World.ice.rightWallColors = "#9fedff #59d7fe #d9dbff #59fffa #aee0f9 #9fedff #00fcff".split(" ");
World.ice.leftWallColors = "#0084d8 #0047d5 #4a50d9 #00d9c1 #015cbb #0084d8 #0047d5".split(" ");
World.ice.floorAlpha = 0.7;
World.ice.leftAlpha = 0.9;
World.ice.rightAlpha = 0.9;
World.ice.rightStump = ["img/snowWorld/iceHorn_left_01.png", "img/edgeTuftLeft.png"];
World.ice.leftStump = ["img/snowWorld/iceHorn_right_01.png", "img/edgeTuft.png"];
World.ice.walls = ["img/snowWorld/iceWall_small.png", "img/snowWorld/iceWall_mid.png"];
World.ice.dust = ["img/snowTriangle_01.png", "img/snowTriangle_02.png", "img/snowTriangle_03.png"];
World.ice.baddy = ["img/snowWorld/snowDude.png"];
World.ice.extras = ["img/snowWorld/snowArch.png", "img/snowWorld/drop_edge_face.png", "img/snowWorld/floatingIsland.png"];
World.ice.bgColor = 2041680;
World.ice.jumpPosts = ["img/snowWorld/flameTorch_frame01.png", "img/snowWorld/flameTorch_frame02.png", "img/snowWorld/flameTorch_frame03.png", "img/snowWorld/flameTorch_frame04.png"];
World.jungle = new World;
World.jungle.background.src = REMOTE_PATH + "img/treetopWorld/background_JUNGLE.jpg";
World.jungle.floorColors = "#87be32 #5cb51c #7cd07b #b8ae1c #6fac3e #87be32 #a4b31c".split(" ");
World.jungle.rightWallColors = "#b7e2a0 #8bdd76 #c9e7d5 #c8df76 #addca6 #b7e2a0 #acda41".split(" ");
World.jungle.leftWallColors = "#567824 #3d7423 #598d59 #777224 #466b29 #567824 #3d7423".split(" ");
World.jungle.floorAlpha = 0.8;
World.jungle.leftAlpha = 1;
World.jungle.rightAlpha = 1;
World.jungle.walls = ["img/treetopWorld/killBush_mid.png", "img/treetopWorld/killBush_wide.png"];
World.jungle.baddy = ["img/treetopWorld/treeStump_right.png"];
World.jungle.extras = ["img/treetopWorld/checkpointArch.png", "img/treetopWorld/drop_edge_face.png", "img/treetopWorld/floatingIsland.png"];
World.jungle.leftStump = ["img/jungleEdgeMarkerLeft.png", "img/jungleEdgeMarkerLeft.png"];
World.jungle.rightStump = ["img/jungleEdgeMarkerRight.png", "img/jungleEdgeMarkerRight.png"];
World.jungle.dust = ["img/treetopWorld/dust01.png", "img/treetopWorld/dust02.png", "img/treetopWorld/dust03.png"];
World.jungle.bgColor = 1534184;
World.jungle.jumpPosts = ["img/treetopWorld/flameTorch_frame01.png", "img/treetopWorld/flameTorch_frame02.png", "img/treetopWorld/flameTorch_frame03.png", "img/treetopWorld/flameTorch_frame04.png"];
World.rainbow = new World;
World.rainbow.background.src = REMOTE_PATH + "img/dessertWorld/desert_BG.jpg";
World.rainbow.floorColors = "#802b77 #c9385a #f1666a #f29a6f #f3e773 #dce477 #a6cf6e #91ba9a #7ea5c9 #9280ba #8860a9 #603492".split(" ");
World.desert = new World;
World.desert.background.src = REMOTE_PATH + "img/desertWorld/desert_BG.jpg";
World.desert.floorColors = "#f1aa4d #ff8551 #f67d11 #eb6133 #ff8527 #ffa32c #fc9751".split(" ");
World.desert.leftWallColors = "#89612c #914c2e #8c470a #914c34 #914c16 #915d19 #8f562e".split(" ");
World.desert.rightWallColors = "#f8d776 #ffc67c #fbbf1a #ffc68d #ffc63c #ffd443 #fece7c".split(" ");
World.desert.floorAlpha = 0.8;
World.desert.leftAlpha = 1;
World.desert.rightAlpha = 1;
World.desert.rightStump = ["img/desertWorld/trackPost.png", "img/edgeTuftLeft.png"];
World.desert.leftStump = ["img/desertWorld/trackPost.png", "img/edgeTuft.png"];
World.desert.walls = ["img/desertWorld/midWall.png", "img/desertWorld/bigWall.png"];
World.desert.baddy = ["img/desertWorld/cactus.png"];
World.desert.extras = ["img/desertWorld/arch.png", "img/desertWorld/drop_edge_face.png", "img/desertWorld/floatingIsland.png"];
World.desert.jumpPosts = ["img/desertWorld/flameTorch_frame01.png", "img/desertWorld/flameTorch_frame02.png", "img/desertWorld/flameTorch_frame03.png", "img/desertWorld/flameTorch_frame04.png"];
World.desert.dust = ["img/desertWorld/dust01.png", "img/desertWorld/dust02.png", "img/desertWorld/dust03.png"];
World.desert.bgColor = 16070182;
World.rainbow.rightWallColors = "#802b77 #c9385a #f1666a #f29a6f #f3e773 #dce477 #a6cf6e #91ba9a #7ea5c9 #9280ba #8860a9 #603492".split(" ");
World.rainbow.leftWallColors = "#802b77 #c9385a #f1666a #f29a6f #f3e773 #dce477 #a6cf6e #91ba9a #7ea5c9 #9280ba #8860a9 #603492".split(" ");
World.rainbow.floorAlpha = 0.8;
World.rainbow.leftAlpha = 0.5;
World.rainbow.rightAlpha = 1;
World.rainbow.leftStump = ["img/jungleEdgeMarkerLeft.png", "img/jungleEdgeMarkerLeft.png"];
World.rainbow.rightStump = ["img/jungleEdgeMarkerRight.png", "img/jungleEdgeMarkerRight.png"];
World.rainbow.walls = ["img/snowWorld/iceWall_mid.png", "img/treetopWorld/killBush_wide.png"];
World.rainbow.baddy = ["img/snowWorld/snowDude.png"];
World.rainbow.extras = ["img/treetopWorld/checkpointArch.png", "img/treetopWorld/drop_edge_face.png", "img/treetopWorld/floatingIsland.png"];
World.rainbow.dust = ["img/desertWorld/dust01.png", "img/desertWorld/dust02.png", "img/desertWorld/dust03.png"];
World.rainbow.jumpPosts = ["img/desertWorld/flameTorch_frame01.png", "img/desertWorld/flameTorch_frame02.png", "img/desertWorld/flameTorch_frame03.png", "img/desertWorld/flameTorch_frame04.png"];
World.testWorld = new World;
World.testWorld.background.src = REMOTE_PATH + "img/desertWorld/desert_BG.jpg";
World.testWorld.floorColors = ["red"];
World.testWorld.leftWallColors = ["white"];
World.testWorld.rightWallColors = ["black"];
World.processAll = function(a) {
    this.callback = a;
    this.worlds = [World.ice, World.desert, World.rainbow, World.jungle];
    this.position = 0;
    a = this.onWorldLoaded.bind(this);
    World.ice.process(a);
    World.desert.process(a);
    World.rainbow.process(a);
    World.jungle.process(a);
    this.total = World.ice.allImages.length + World.desert.allImages.length + World.rainbow.allImages.length + World.jungle.allImages.length
};
World.percentLoaded = function() {
    return !this.total ? 0 : (World.ice.loadCount + World.desert.loadCount + World.rainbow.loadCount + World.jungle.loadCount) / this.total
};
World.onWorldLoaded = function() {
    this.position++;
    this.position == this.worlds.length && this.callback && this.callback()
};
GAME = GAME || {};
GAME.LOW = !1;
Game = function(a) {
    GAME.LOW = APP.inAPP;
    this.isGameover = !1;
    this.view = new View(this, a);
    this.pickupManager = new GAME.PickupManager(this);
    this.enemyManager = new GAME.EnemyManager(this);
    this.collisionManager = new GAME.CollisionManager(this);
    this.trackManager = new GAME.TrackManager(this);
    this.extraManager = new GAME.ExtraManager(this);
    this.difficulty = 2;
    this.ballSpeed = 1;
    this.ball = new Ball(this);
    this.view.add(this.ball);
    this.controller = new Controller(this);
    this.worlds = [World.jungle, World.ice, World.desert];
    this.worldCount =
        0;
    APP.startLevel ? (3 < APP.startLevel ? APP.startLevel = 3 : 1 > APP.startLevel && (APP.startLevel = 1), this.worldCount = APP.startLevel - 1, this.setWorld(this.worlds[APP.startLevel - 1])) : this.setWorld(World.jungle);
    this.pickupCount = 0;
    this.pickupTarget = 150;
    this.score = 0;
    APP.view = this;
    APP.stage.click = APP.stage.tap = function() {}.bind(this);
    this.diffStep = 0
};
Game.prototype.start = function() {
    this.playing || (this.restart(), this.playing = !0, this.view.white.visible = !1, this.view.visible = !0, requestAnimationFrame(this.update.bind(this)))
};
Game.prototype.stop = function() {
    this.playing = !1;
    this.view.visible = !1;
    requestAnimationFrame(this.update.bind(this))
};
Game.prototype.setWorld = function(a) {
    this.world = a;
    this.view.setWorld(this.world)
};
Game.prototype.fadeWorld = function(a) {
    this.view.hud.ascension();
    APP.ascentionSound && APP.ascentionSound.play();
    this.ball.ascend();
    this.nextWorld = a;
    this.view.white.visible = !0;
    this.view.white.alpha = 0;
    TweenLite.to(this, 0.3, {
        ballSpeed: 0
    });
    TweenLite.to(this.view.camera, 1, {
        ratio: 0,
        ease: Sine.easeOut
    });
    TweenLite.to(this.view.white, 1.5, {
        delay: 0.5,
        alpha: 1,
        ease: Sine.easeIn,
        onComplete: this.onWorldComplete.bind(this)
    })
};
Game.prototype.onWorldComplete = function() {
    this.trackManager.showTutorial = !1;
    this.ball.reset();
    this.ballSpeed = 1;
    TIME.speed = 1;
    this.trackManager.restart(!0);
    this.pickupManager.restart();
    this.enemyManager.restart();
    this.extraManager.restart();
    this.setWorld(this.nextWorld);
    this.view.reset();
    TweenLite.to(this.view.white, 2, {
        delay: 0,
        alpha: 0,
        ease: Sine.easeIn,
        onComplete: this.onWorldShown.bind(this)
    })
};
Game.prototype.onWorldShown = function() {
    this.view.white.visible = !1
};
Game.prototype.update = function() {
    this.playing && requestAnimationFrame(this.update.bind(this));
    if (!this.paused) {
        TIME.update();
        this.trackManager.update();
        this.controller.update();
        this.pickupManager.update();
        this.enemyManager.update();
        this.extraManager.update();
        this.collisionManager.update();
        this.view.hud.setScore(this.pickupCount / this.pickupTarget, this.score);
        this.pickupCount >= this.pickupTarget && (this.pickupCount = 0, this.worldCount++, 3 < this.worldCount && (this.pickupTarget = 200), this.fadeWorld(this.worlds[this.worldCount %
            this.worlds.length]));
        this.diffStep += TIME.DELTA_TIME;
        1200 < this.diffStep && (this.diffStep = 0, this.difficulty += 0.025);
        var a = 1 * (30 * TIME.DELTA_TIME * this.ballSpeed) * this.difficulty * PROFILE.speedMod;
        this.score += 0.1 * a;
        this.ball.position.z += a
    }
};
Game.prototype.gameover = function() {
    this.isGameover || (this.isGameover = !0, APP.fromGame = !0, this.trackManager.showTutorial = !1, this.ball.state != Ball.FALLING && TweenLite.to(TIME, 0.6, {
        speed: 0.1,
        ease: Sine.easeOut
    }), TweenLite.to(TIME, 1.5, {
        delay: 0.7,
        speed: 1,
        ease: Sine.easeIn
    }), this.view.white.visible = !0, this.view.white.alpha = 0, this.view.camera.lock = !0, this.ball.state != Ball.FALLING ? TweenLite.to(this.view.white, 2, {
        delay: 1,
        alpha: 1,
        ease: Sine.easeIn,
        onComplete: this.onFadeComplete.bind(this)
    }) : TweenLite.to(this.view.white,
        1, {
            delay: 0.5,
            alpha: 1,
            ease: Sine.easeIn,
            onComplete: this.onFadeComplete.bind(this)
        }), TweenLite.to(this.view.camera, 1, {
        ratio: 0,
        ease: Sine.easeOut
    }), this.score = Math.floor(this.score), APP.score = this.score, this.saved = !0, this.faded = !1, APP.pb = !1, FacebookAPI.loggedIn && (this.saved = !1, SteveAPI.submitScore(this.score, this.onSaveComplete.bind(this))))
};
Game.prototype.onSaveComplete = function(a) {
    this.saved = !0;
    APP.pb = a.success;
    this.faded && (this.stop(), APP.simpleApp.gotoScreen(APP.gameoverScreen))
};
Game.prototype.onFadeComplete = function() {
    APP.stage.setBackgroundColor(16777215);
    this.faded = !0;
    this.saved && (this.stop(), APP.simpleApp.gotoScreen(APP.gameoverScreen))
};
Game.prototype.restart = function() {
    this.pickupCount = 0;
    APP.startLevel && (3 < APP.startLevel ? APP.startLevel = 3 : 1 > APP.startLevel && (APP.startLevel = 1), this.worldCount = APP.startLevel - 1, this.setWorld(this.worlds[APP.startLevel - 1]));
    this.pickupTarget = 150;
    this.isGameover = !1;
    this.ball.reset();
    this.pickupManager.restart();
    this.enemyManager.restart();
    this.extraManager.restart();
    this.trackManager.restart();
    this.view.camera.lock = !1;
    this.view.camera.z = 1E4;
    this.ball.position.z = 7E3 != PROFILE.drawDistance ? 0 : 1E4;
    this.ball.lastPosition.x =
        this.ball.position.x;
    this.ball.lastPosition.y = this.ball.position.y;
    this.ball.lastPosition.z = this.ball.position.z;
    this.trackManager.update();
    this.view.reset();
    this.paused = !1;
    this.difficulty = 1;
    this.score = 0;
    this.trackManager.showTutorial && (this.pickupManager.spawnCount -= 1E3)
};
Game.prototype.pause = function() {
    this.paused = !0
};
Game.prototype.resume = function() {
    this.paused = !1
};
Game.prototype.resize = function(a, b) {
    this.view.resize(a, b)
};
GAME = GAME || {};
GAME.TrackManager = function(a) {
    this.countY = this.count = 0;
    this.engine = a;
    this.trackStream = [];
    this.coinStream = [];
    this.wallStream = [];
    this.showTutorial = !0;
    this.index = this.offset = this.count = 0;
    this.indexOffset = PROFILE.trackSize;
    this.lastWallIndex = this.lastCoinIndex = this.lastTutIndex = this.lastIndex = this.offsetIndex = this.trackIndex = this.xOffset = this.segmentId = 0;
    this.positionObjectIndex;
    this.lastObjectIndex;
    this.lastObjectZ = this.wallObjectIndex = this.objectIndex = 0;
    this.trackLayout = [1, 1, 1, 1];
    this.overallOffset =
        this.tutObjectIndex = 0;
    this.xFrequancy = 0.5;
    this.xSize = 0;
    this.yFrequancy = 0.3;
    this.ySize = 0;
    this.flat = {
        xFrequancy: 0.5,
        xSize: 0,
        yFrequancy: 0.3,
        ySize: 0
    };
    this.twisty = {
        xFrequancy: 0.5,
        xSize: 400,
        yFrequancy: 0.3,
        ySize: 800
    };
    this.rollerCoaster = {
        xFrequancy: 0.5,
        xSize: 0,
        yFrequancy: 0.3,
        ySize: 800
    };
    this.sideSwipe = {
        xFrequancy: 0.3,
        xSize: 600,
        yFrequancy: 0.5,
        ySize: 400
    };
    this.oceanic = {
        xFrequancy: 0.1,
        xSize: 800,
        yFrequancy: 0.1,
        ySize: 3500
    };
    this.tutStream = [];
    trackData[0].isTut = !0;
    this.tut = trackData[0];
    this.curves = [this.flat, this.twisty,
        this.rollerCoaster, this.sideSwipe, this.oceanic
    ];
    this.setCurve(this.flat)
};
GAME.TrackManager.prototype.setCurve = function(a) {
    if (this.curve != a) {
        this.curve || (this.curve = a);
        var b = a.xFrequancy - this.curve.xFrequancy;
        0 > a.yFrequancy - this.curve.yFrequancy ? (TweenLite.to(this, 3, {
            yFrequancy: a.yFrequancy
        }), TweenLite.to(this, 3, {
            ySize: a.ySize,
            overwrite: !1,
            delay: 3
        })) : (TweenLite.to(this, 3, {
            ySize: a.ySize
        }), TweenLite.to(this, 3, {
            yFrequancy: a.yFrequancy,
            overwrite: !1,
            delay: 3
        }));
        0 > b ? (TweenLite.to(this, 3, {
                xFrequancy: a.yFrequancy,
                overwrite: !1
            }), TweenLite.to(this, 3, {
                xSize: a.xSize,
                overwrite: !1,
                delay: 3
            })) :
            (TweenLite.to(this, 3, {
                xSize: a.xSize,
                overwrite: !1
            }), TweenLite.to(this, 3, {
                xFrequancy: a.xFrequancy,
                overwrite: !1,
                delay: 3
            }));
        this.curve = a
    }
};
GAME.TrackManager.prototype.runNumbers = function() {};
GAME.TrackManager.prototype.update = function() {
    for (this.positionIndex = Math.floor(this.engine.ball.position.z / 500); this.lastIndex <= this.positionIndex;) {
        this.lastIndex++;
        var a = this.lastIndex - this.offsetIndex,
            b = trackData[this.segmentId % trackData.length],
            c = b.floor;
        this.trackStream.push(c[3 * a], c[3 * a + 1] + this.xOffset, c[3 * a + 2]);
        if (a + 1 >= c.length / 3) {
            this.xOffset += c[3 * a + 1];
            this.segmentId++;
            this.segmentId % trackData.length || this.segmentId++;
            var d = trackData[this.segmentId % trackData.length];
            10 != d.curveType ? this.setCurve(this.curves[d.curveType]) :
                this.setCurve(this.curves[Math.floor(Math.random() * this.curves.length)]);
            this.offsetIndex += c.length / 3;
            this.lastWallIndex = this.lastCoinIndex = 0
        }
        for (var e = trackData[this.segmentId % trackData.length].coins, c = 500 * (a + 1);;)
            if (d = e[2 * this.lastCoinIndex], d < c) this.coinStream.push(d + 500 * (this.offsetIndex + PROFILE.trackSize - 1), e[2 * this.lastCoinIndex + 1] + this.xOffset), this.lastCoinIndex++;
            else break;
        e = trackData[this.segmentId % trackData.length].walls;
        for (c = 500 * (a + 1);;)
            if (d = e[3 * this.lastWallIndex], d < c) this.wallStream.push(d +
                500 * (this.offsetIndex + PROFILE.trackSize - 1), e[3 * this.lastWallIndex + 1] + this.xOffset, e[3 * this.lastWallIndex + 2]), this.lastWallIndex++;
            else break;
        if (b.tuts) {
            b = b.tuts;
            for (c = 500 * (a + 1);;)
                if (a = b[3 * this.lastTutIndex], a < c) this.tutStream.push(a + 500 * (this.offsetIndex + PROFILE.trackSize), b[3 * this.lastTutIndex + 1] + this.xOffset, b[3 * this.lastTutIndex + 2]), this.lastTutIndex++;
                else break
        }
    }
    b = PROFILE.drawDistance;
    d = this.coinStream[2 * this.objectIndex];
    d < -this.engine.view.camera.z + b && (this.pasued || this.engine.pickupManager.addPickup(d,
        this.coinStream[2 * this.objectIndex + 1]), this.objectIndex++);
    d = this.wallStream[3 * this.wallObjectIndex];
    d < -this.engine.view.camera.z + b && (a = this.wallStream[3 * this.wallObjectIndex + 1], c = this.wallStream[3 * this.wallObjectIndex + 2], this.pasued || this.engine.enemyManager.addWall(d, a, c), this.wallObjectIndex++);
    a = this.tutStream[3 * this.tutObjectIndex];
    a < -this.engine.view.camera.z + b && (b = this.tutStream[3 * this.tutObjectIndex + 1], c = this.tutStream[3 * this.tutObjectIndex + 2], this.pasued || this.engine.extraManager.addTut(a,
        b, c), this.tutObjectIndex++)
};
GAME.TrackManager.prototype.flatternOut = function() {};
GAME.TrackManager.prototype.restart = function(a) {
    this.index = this.offset = 0;
    this.indexOffset = PROFILE.trackSize;
    a || (this.segmentId = this.showTutorial ? 0 : 1, trackData.shift(), trackData = shuffle(trackData), trackData.unshift(this.tut));
    this.lastIndex = this.offsetIndex = this.trackIndex = this.xOffset = 0;
    this.pasued = !1;
    this.tutObjectIndex = this.wallObjectIndex = this.objectIndex = this.lastTutIndex = this.lastWallIndex = this.lastCoinIndex = this.positionIndex = 0;
    this.trackStream = [];
    this.wallStream = [];
    this.coinStream = [];
    this.tutStream = [];
    this.countY = this.count = 0;
    this.xFrequancy = 0.5;
    this.xSize = 0;
    this.yFrequancy = 0.3;
    this.ySize = 0;
    this.curve = this.flat;
    TweenLite.killTweensOf(this)
};
GAME.TrackManager.prototype.modifyNumber = function() {};
GAME.TrackManager.prototype.pause = function() {
    this.pasued = !0
};
GAME.TrackManager.prototype.resume = function() {
    this.pasued = !1
};
GAME.TrackManager.prototype.setSeg = function(a) {
    var b = Math.floor(a.position / 500) - PROFILE.trackSize,
        c = this.trackStream[3 * b],
        d = this.trackStream[3 * b + 1];
    c ? (a.hole = 1 == this.trackStream[3 * b + 2], a.wall = 2 != this.trackStream[3 * b + 2], a.p1.x = d + c, a.p2.x = d, this.count += this.xFrequancy, this.countY += this.yFrequancy, a.p1.y = a.p2.y = 1E3 + Math.sin(this.countY) * this.ySize, a.p1.offsetVal = a.p2.offsetVal = Math.sin(this.count) * this.xSize, a.p1.x += a.p1.offsetVal, a.p2.x += a.p2.offsetVal, a.p1.x += 100 * Math.random(), a.p2.x -= 100 * Math.random()) :
        (a.p1.x = this.xOffset, a.p2.x = this.xOffset, a.wall = !0, a.hole = !1)
};

function shuffle(a) {
    for (var b = a.length, c, d; 0 !== b;) d = Math.floor(Math.random() * b), b -= 1, c = a[b], a[b] = a[d], a[d] = c;
    return a
}
GAME = GAME || {};
GameElement = function() {
    this.view = new Image;
    this.frame = !1;
    this.position = {
        x: 0,
        y: 0,
        z: 0
    };
    this.screenPosition = {
        x: 0,
        y: 0
    };
    this.scale = 0.8;
    this.rotation = 0;
    this.heightRatio = this.timeModifyer = 1;
    this.height = this.width = 100;
    this.alpha = 1
};
GameElement.prototype.addMovement = function() {
    this.ax = this.dx = 0;
    this.fx = 0.5;
    this.max = 30;
    this.dy = 0;
    this.ay = 3;
    this.fy = 0;
    this.max = 30;
    this.targetSpeed = 0
};
GameElement.prototype.computeVelocity = function(a, b, c, d) {
    c = c * TIME.DELTA_TIME * this.timeModifyer;
    a = (0 < a - c ? a - c : 0 > a + c ? a + c : 0) + b * TIME.DELTA_TIME * this.timeModifyer;
    0 != a && 1E4 != d && (a > d ? a = d : a < -d && (a = -d));
    return a
};
Hud = function(a) {
    this.engine = a;
    PIXI.DisplayObjectContainer.call(this);
    this.scoreLabel = new PIXI.Text("101293043", {
        font: "30px Pathway Gothic One",
        fill: "#de571c"
    });
    this.scoreLabel.anchor.x = 0;
    this.bg = PIXI.Sprite.fromFrame(PROFILE.music ? "scorePanel.png" : "scorePanelMobile.png");
    this.addChild(this.bg);
    this.bg.anchor.x = 1;
    this.soundButton = new SoundButton;
    this.bg.addChild(this.soundButton);
    this.soundButton.position.y = 103;
    this.soundButton.position.x = 0;
    this.crumbPanel = PIXI.Sprite.fromFrame("crumbPanel.png");
    this.crumbScale =
        PIXI.Sprite.fromFrame("crumbScale.png");
    this.crumbPanel.anchor.x = this.crumbPanel.anchor.y = 0.5;
    this.crumbScale.anchor.x = this.crumbScale.anchor.y = 0.5;
    this.crumbScale.position.x = 1;
    this.crumbScale.position.y = -3;
    this.crumbPanel.addChild(this.crumbScale);
    this.bg.addChild(this.scoreLabel);
    this.bg.addChild(this.crumbPanel);
    this.crumbPanel.position.x = -230;
    this.crumbPanel.position.y = this.crumbPanel.height / 2 - 20 + 3;
    this.pauseButton = new McBiteButton("pause_button_up.png", "pause_button_press.png");
    this.bg.addChild(this.pauseButton);
    this.pauseButton.position.x = -50;
    this.pauseButton.position.y = 55;
    PROFILE.mobile && (this.pauseButton.hitArea = new PIXI.Rectangle(-200, -200, 300, 300));
    this.pauseMenu = new PIXI.DisplayObjectContainer;
    this.menuHolder = new PIXI.DisplayObjectContainer;
    this.pauseMenuBackground = PIXI.Sprite.fromImage(REMOTE_PATH + "img/UI/pausePanel.png", !0);
    this.pauseMenuBackground.anchor.x = 0.5;
    this.pauseMenuBackground.anchor.y = 0.5;
    this.pauseMenuLogo = PIXI.Sprite.fromFrame("pauseLogo.png");
    this.pauseMenuLogo.anchor.x = 0.5;
    this.pauseMenuLogo.anchor.y =
        0.5;
    this.pauseMenuLogo.position.y = -135;
    this.menuHolder.addChild(this.pauseMenuBackground);
    this.menuHolder.addChild(this.pauseMenuLogo);
    this.tc = new PIXI.Sprite.fromFrame("gameTsCs.png");
    this.tc.anchor.x = 0.5;
    this.tc.position.y = 167;
    BasicButton.apply(this.tc, function() {
        window.open(APP.tc, "_blank")
    });
    this.resumeButton = new McBiteButton("pause_resume_up.png", "pause_resume_press.png");
    this.restartButton = new McBiteButton("pause_restart_up.png", "pause_restart_press.png");
    this.homeButton = new McBiteButton("pause_main_up.png",
        "pause_main_press.png");
    this.helpButton = new McBiteButton("pause_howto_up.png", "pause_howto_press.png");
    this.background = new PIXI.Graphics;
    this.background.beginFill(0, 0.75);
    this.background.drawRect(0, 0, 300, 300);
    this.background.endFill();
    this.pauseMenu.addChild(this.background);
    this.pauseMenu.addChild(this.menuHolder);
    this.menuHolder.addChild(this.resumeButton);
    this.menuHolder.addChild(this.restartButton);
    this.menuHolder.addChild(this.homeButton);
    this.menuHolder.addChild(this.helpButton);
    this.menuHolder.addChild(this.tc);
    this.resumeButton.position.y = -32;
    this.restartButton.position.y = 17;
    this.homeButton.position.y = 66;
    this.helpButton.position.y = 115;
    BasicButton.apply(this.pauseButton, this.onPausePressed.bind(this));
    BasicButton.apply(this.resumeButton, this.onResumePressed.bind(this));
    BasicButton.apply(this.homeButton, this.onHomePressed.bind(this));
    BasicButton.apply(this.restartButton, this.onRestartPressed.bind(this));
    BasicButton.apply(this.helpButton, this.onHelpPressed.bind(this));
    this.backButton = new McBiteButton("back_button_up.png",
        "back_button_press.png");
    this.backButton.alpha = 0;
    this.menuHolder.addChild(this.backButton);
    this.backButton.position.x = 100;
    this.backButton.position.y = -176;
    BasicButton.apply(this.backButton, this.onBackPressed.bind(this));
    this.backButton.interactive = !1;
    this.resumeButton.alpha = 0;
    this.homeButton.alpha = 0;
    this.timeline = new TimelineLite({
        onReverseComplete: this.onPauseHidden.bind(this)
    });
    this.background.alpha = 0;
    this.timeline.to(this.pauseButton, 0.3, {
        alpha: 0
    });
    this.timeline.to(this.background, 0.3, {
            alpha: 1
        },
        0);
    this.timeline.to(this.resumeButton, 0.3, {
        alpha: 1
    }, 0.2);
    this.timeline.to(this.homeButton, 0.3, {
        alpha: 1
    }, 0.4);
    this.timeline.stop();
    this.timeline.timeScale(2);
    this.ascensionText = PIXI.Sprite.fromFrame("tutorialBG.png");
    this.ascensionText2 = PIXI.Sprite.fromFrame("levelUP.png");
    this.ascensionText.anchor.x = 0.5;
    this.ascensionText.anchor.y = 0.5;
    this.ascensionText2.anchor.x = 0.5;
    this.ascensionText2.anchor.y = 0.5;
    this.ascensionText.position.y = -300;
    this.addChild(this.ascensionText);
    this.ascensionText.addChild(this.ascensionText2);
    this.spring = new Spring
};
Hud.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Hud.prototype.setScore = function(a, b) {
    this.spring.update();
    a != this.spring.tx && (this.spring.dx = 0.1, this.spring.tx = a);
    this.crumbScale.scale.x = this.crumbScale.scale.y = 0.55 * this.spring.x;
    this.scoreLabel.setText(formatScore(10 * Math.floor(b / 10)))
};
Hud.prototype.reset = function() {
    this.pauseMenu.parent && this.removeChild(this.pauseMenu);
    this.crumbScale.scale.x = this.crumbScale.scale.y = 0;
    this.timeline.reverse(!0, !1);
    this.spring.x = 0;
    this.spring.tx = 0;
    this.bg.scale.x = 1;
    this.bg.scale.y = 1
};
Hud.prototype.onPausePressed = function() {
    this.engine.pause();
    this.addChild(this.pauseMenu);
    this.timeline.play();
    APP.highRez();
    this.bg.scale.x = 0.95 * (1 / (APP.height / 690));
    this.bg.scale.y = 0.95 * (1 / (APP.height / 690))
};
Hud.prototype.onRestartPressed = function() {
    APP.emptyScreen || (APP.emptyScreen = new PIXI.DisplayObjectContainer, APP.emptyScreen.onShown = function() {
        APP.simpleApp.gotoScreen(APP.gameScreen)
    });
    this.engine.stop();
    APP.simpleApp.gotoScreen(APP.emptyScreen)
};
Hud.prototype.ascension = function() {
    this.ascensionText.position.y = -300;
    TweenLite.to(this.ascensionText.position, 1, {
        y: 345,
        ease: Expo.easeOut,
        onComplete: function() {
            TweenLite.to(this.ascensionText.position, 1, {
                y: 830,
                ease: Expo.easeIn
            })
        }.bind(this)
    })
};
Hud.prototype.onHomePressed = function() {
    legals.show();
    this.engine.stop();
    APP.simpleApp.gotoScreen(APP.titleScreen)
};
Hud.prototype.onResumePressed = function() {
    this.timeline.reverse(!1)
};
Hud.prototype.onPauseHidden = function() {
    this.bg.scale.x = 1;
    this.bg.scale.y = 1;
    APP.lowRez();
    this.engine.resume();
    this.pauseMenu.parent && this.removeChild(this.pauseMenu)
};
Hud.prototype.onBackPressed = function() {
    TweenLite.to(this.backButton, 0.3, {
        alpha: 0
    });
    this.backButton.interactive = !1;
    TweenLite.to(this.pauseMenuLogo, 0.3, {
        alpha: 1
    });
    TweenLite.to(this.help, 0.3, {
        alpha: 0,
        onComplete: function() {
            this.menuHolder.removeChild(this.help)
        }.bind(this)
    });
    this.resumeButton.interactive = !0;
    this.homeButton.interactive = !0;
    this.restartButton.interactive = !0;
    this.helpButton.interactive = !0
};
Hud.prototype.onHelpPressed = function() {
    this.help || (this.help = new HelpOverlay, this.help.position.x = -142.5, this.help.position.y = -116);
    this.menuHolder.addChild(this.help);
    this.help.alpha = 0;
    TweenLite.to(this.help, 0.3, {
        alpha: 1
    });
    TweenLite.to(this.backButton, 0.3, {
        alpha: 1
    });
    this.backButton.interactive = !0;
    TweenLite.to(this.pauseMenuLogo, 0.3, {
        alpha: 0
    });
    this.resumeButton.interactive = !1;
    this.homeButton.interactive = !1;
    this.restartButton.interactive = !1;
    this.helpButton.interactive = !1
};
Hud.prototype.resize = function(a, b) {
    this.bg.position.x = Math.ceil(a / 2);
    this.bg.position.y = 20;
    this.pauseButton.position.x = -20;
    this.pauseButton.position.x = -20;
    this.scoreLabel.position.x = -145;
    this.scoreLabel.position.y = 1;
    this.background.position.x = Math.floor(-a / 2);
    this.menuHolder.position.y = Math.floor(b / 2);
    this.background.scale.x = a / 300 + 3;
    this.background.scale.y = b / 300
};

function formatScore(a) {
    a = a.toString().split("");
    for (var b = "", c = a.length, d = c % 3 - 1, e = 0; e < c; e++) b += a[e], 0 == (e - d) % 3 && e != c - 1 && (b += ",");
    return b
}
GAME = GAME || {};
View = function(a, b) {
    this.game = a;
    this.shakeCount = 0;
    PIXI.CustomRenderable.call(this);
    this.children = [];
    this.rotContainer = new PIXI.DisplayObjectContainer;
    b.addChild(this.rotContainer);
    this.rotContainer.addChild(this);
    this.white = new PIXI.Graphics;
    this.white.beginFill(16777215);
    this.white.drawRect(-960, 0, 1920, 690);
    this.white.visible = !1;
    this.white.alpha = 0;
    b.addChild(this.white);
    this.gamePos = 0;
    this.viewContainer = b;
    this.direction = 1;
    this.camera = {
        x: 0,
        y: 1500,
        z: 0,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        focus: 300,
        zoom: 1,
        dist: 400,
        distY: 1E3,
        ratio: 1,
        shake: 0
    };
    this.items = [];
    this.road = new Road(this);
    this.count = 0;
    this.background = new Image;
    this.background.crossOrigin = "";
    this.background.src = "img/background_SNOW.jpg";
    this.pixiDust = new PixiDust;
    this.speedLines = new SpeedLines;
    PROFILE.particles && b.addChild(this.speedLines);
    this.hud = new Hud(a);
    b.addChild(this.hud);
    this.spawnCount = this.shakeCount = 0;
    this.signElement = new GameElement;
    this.signElement.view.src = "img/signPost.png";
    this.ratio = this.cameraBall = this.cameraGround = this.lastDepth =
        0
};
View.prototype = Object.create(PIXI.CustomRenderable.prototype);
View.prototype.setWorld = function(a) {
    this.worldData = a;
    PROFILE.particles && this.pixiDust.update(a.dust);
    this.road.setWorld(this.worldData);
    APP.stage.setBackgroundColor(this.worldData.bgColor)
};
View.prototype.add = function(a) {
    this.items.push(a)
};
View.prototype.remove = function(a) {
    a = this.items.indexOf(a); - 1 !== a && this.items.splice(a, 1)
};
View.prototype.reset = function() {
    this.hud.reset();
    this.rotation = 0;
    this.road.reset();
    APP.stage.setBackgroundColor(this.worldData.bgColor);
    this.camera.dist = 400;
    this.camera.distY = 1E3;
    this.camera.shake = 0;
    this.camera.z = 0;
    this.camera.ratio = 1;
    this.camera.y = 1E3;
    this.lastDepth = 501
};
View.prototype.renderCanvas = function(a) {
    a = a.context;
    var b = this.worldAlpha;
    a.globalAlpha = b;
    var c = this.w / 1024;
    1 > c && (c = 1.3);
    c *= 1.3;
    this.game.ball.state == Ball.CRASHING || this.game.ball.state == Ball.FALLING ? (this.rotation += 0.0020 * this.game.ball.bashDirection, c *= 1 + 0.3 * Math.abs(this.rotation)) : this.game.controller.controlMode == Controller.TILT ? this.rotContainer.rotation += 0.1 * (-this.game.controller.lean / Math.PI - this.rotContainer.rotation) : this.rotation += 0.05 * (0.1 * this.game.controller.lean - this.rotation);
    this.drop =
        200 * Math.sin(this.game.ball.position.z / 1E4) + 300;
    a.drawImage(this.game.world.background, -(1024 * c) / 2, 200 - this.drop * c + 100, 1024 * c, 1024 * c);
    this.road.getOffset(this.game.ball.position.z);
    this.shakeCount += TIME.DELTA_TIME;
    3 < this.shakeCount && (this.shakeCount = 0, this.position.y = -200 + Math.sin(this.shakeCount) + (Math.random() - 0.5) * (this.camera.shake + 3), this.position.x = Math.sin(this.shakeCount / 2) + (Math.random() - 0.5) * (this.camera.shake + 2));
    this.game.paused && (this.position.y = -200, this.position.x = 0);
    this.camera.x = -this.game.ball.position.x;
    this.cameraBall += 0.1 * (this.camera.distY - this.game.ball.position.y - this.cameraBall);
    this.cameraGround = this.camera.distY - this.game.ball.realGround;
    this.camera.y = this.cameraBall + (this.cameraGround - this.cameraBall) * this.camera.ratio;
    this.count += 0.1;
    this.pivot.y = 300;
    this.camera.lock || (this.camera.z = -this.game.ball.position.z + this.camera.dist);
    this.road.render(a, this.camera);
    for (var c = this.camera, d = c.focus, e = c.zoom, f = PROFILE.drawDistance, g = this.items.length - 1; 0 <= g; g--) {
        var h =
            this.items[g];
        if (h instanceof Segment) h.visible && (this.road.renderSegment(h, a), h.depth = h.z + 1500);
        else {
            var m = h.position.x + c.x,
                j = h.position.y + c.y,
                k = h.position.z + c.z;
            if (!(k < -d || k > f)) {
                a.globalAlpha = b * h.alpha;
                k > f - 1E3 ? a.globalAlpha = (f - k) / 1E3 * b : 299 > k && (a.globalAlpha = 0 > k ? 0 : k / 300 * b);
                var l = d / (d + k) * e;
                h.depth = k;
                h.screenPosition.x = m * l;
                h.screenPosition.y = j * l + 345;
                l *= h.scale;
                h instanceof Enemy ? h.exploding ? (a.save(), a.translate(h.screenPosition.x, h.screenPosition.y - h.wallHeight / 2 * h.heightRatio * l), h.position.y += h.directionY,
                    h.position.x += h.directionX, h.rotation += 0.2, a.rotate(h.rotation), a.drawImage(h.view, -h.wallWidth / 2 * l, -h.wallHeight / 2 * l, h.wallWidth * l, h.wallHeight * l), a.restore()) : a.drawImage(h.view, h.screenPosition.x - h.visualWidth / 2 * l, h.screenPosition.y - (h.visualHeight - 35) * l, h.visualWidth * l, h.visualHeight * l) : h instanceof Ball ? (a.save(), h.depth -= 1E3, h.isFalling && (h.depth += 2E3), m = (h.realGround + c.y + 50) * l, j = h.shadow, k = 1 - (h.realGround - h.position.y) / 700, 0 > k ? k = 0 : 1 < k && (k = 1), k *= 0.8, a.globalAlpha = b * k, a.drawImage(j.view, h.screenPosition.x -
                    j.view.width / 2 * k, m - j.view.height / 2 * k, j.view.width * k, j.view.height * k), a.globalAlpha = b * h.alpha, a.translate(h.screenPosition.x, h.screenPosition.y - h.view.height / 2 * h.heightRatio * l), a.rotate(h.rotation), m = h.view, j = m.frame, a.drawImage(m.baseTexture.source, j.x, j.y, j.width, j.height, 0.5 * (-j.width + m.realSize.x) * l, 0.5 * (-j.height + m.realSize.y - 40) * l, j.width * l, j.height * l), a.restore()) : h.frame ? (m = h.view, j = m.frame, a.drawImage(m.baseTexture.source, j.x, j.y, j.width, j.height, h.screenPosition.x + 0.5 * -j.width * l, h.screenPosition.y +
                    0.5 * -j.height * h.heightRatio * l, j.width * l, j.height * l)) : a.drawImage(h.view, h.screenPosition.x - h.view.width / 2 * l, h.screenPosition.y - h.view.height * h.heightRatio * l, h.view.width * l, h.view.height * l)
            }
        }
    }
    500 < -this.camera.z - this.lastDepth && (this.lastDepth = -this.camera.z);
    this.items.sort(compareNumbers);
    PROFILE.particles && (this.pixiDust.render(a, this.camera), this.speedLines.visible = !1, h.powermode == Ball.CHARGE && (this.speedLines.visible = !0, this.speedLines.render(a, this.camera)))
};
View.prototype.renderStuff = function() {};

function compareNumbers(a, b) {
    return a.depth - b.depth
}
View.prototype.resize = function(a, b) {
    this.w = a;
    this.viewContainer.position.x = Math.floor(a / 2);
    this.speedLines.position.y = 200;
    this.rotContainer.position.y = Math.floor(b / 2);
    this.hud.resize(a, b)
};
PixiDust = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.particals = [];
    this.max = 20;
    this.count = 0;
    this.maxDist = 1E3;
    this.maxWidth = 4E3;
    this.images = [];
    for (var a = 0; 3 > a; a++) {
        var b = new Image;
        b.crossOrigin = "";
        b.src = REMOTE_PATH + "img/treetopWorld/dust0" + (a + 1) + ".png";
        this.images.push(b)
    }
    for (a = 0; a < this.max; a++) b = new ParticalDust, b.position.x = 5E3 * (Math.random() - 0.5), b.position.y = -500 + 2E3 * Math.random(), b.position.z = 110640 * Math.random(), this.particals.push(b);
    this.focalLength = 150
};
PixiDust.constructor = PixiDust;
PixiDust.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PixiDust.prototype.update = function(a) {
    this.images = a
};
PixiDust.prototype.render = function(a, b) {
    for (var c = 0; c < this.particals.length; c++) {
        var d = this.particals[c],
            e = d.position.z + 2 * b.z,
            e = e % this.maxWidth;
        0 > e && (e += this.maxWidth);
        e = b.focus / (b.focus + e);
        d.position.x += d.speedX;
        var f = d.position.x + b.x + 4E3,
            f = f % 8E3;
        0 > f && (f += 8E3);
        f -= 4E3;
        d.position.y += d.speedY;
        var g = d.position.y + b.y + 500,
            g = g % 2E3;
        0 > g && (g += 2E3);
        g -= 500;
        f *= e;
        g *= e;
        e *= 2.5;
        d = this.images[d.imageId];
        a.drawImage(d, f, g + 345, d.width * e, d.height * e)
    }
};
PixiDust.prototype.resize = function() {
    for (var a = 0; a < this.particals.length; a++) {
        var b = this.particals[a];
        b.position.x = b.home.x = 110640 * Math.random()
    }
};
ParticalDust = function() {
    this.position = {
        x: 0,
        y: 0,
        z: 0
    };
    this.speedY = 10 + 20 * Math.random();
    this.speedX = 5 + 10 * Math.random();
    this.imageId = ParticalDust.count % 3;
    ParticalDust.count++;
    this.alpha = 0.5 + 0.5 * Math.random()
};
ParticalDust.count = 0;
SpeedLines = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.particals = [];
    this.max = 10;
    this.count = 0;
    this.maxDist = 1E3;
    this.maxWidth = 7E3;
    this.images = [];
    for (var a = 0; 3 > a; a++) {
        var b = new Image;
        b.src = "img/testLine.png";
        this.images.push(b)
    }
    for (a = 0; a < this.max; a++) b = new SpeedLine, b.position.x = 5E3 * (Math.random() - 0.5), b.position.y = -1E3 + 3E3 * Math.random(), b.position.z = 110640 * Math.random(), this.particals.push(b), this.addChild(b.view);
    this.focalLength = 150
};
SpeedLines.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
SpeedLines.prototype.render = function(a, b) {
    for (var c = 0; c < this.particals.length; c++) {
        var d = this.particals[c],
            e = d.position.z + 5 * b.z,
            e = e % this.maxWidth;
        0 > e && (e += this.maxWidth);
        d.view.alpha = (this.maxWidth - e) / 2E3;
        0.6 < d.view.alpha && (d.view.alpha = 0.6);
        var e = b.focus / (b.focus + e + 100),
            f = d.position.x + b.x + 4E3,
            f = f % 8E3;
        0 > f && (f += 8E3);
        var f = f - 4E3,
            g = d.position.y + b.y + 1E3,
            g = g % 4E3;
        0 > g && (g += 4E3);
        g -= 1E3;
        f *= e;
        g *= e;
        d.view.rotation = Math.atan2(g, f);
        d.view.position.x = f;
        d.view.position.y = g;
        d.view.scale.x = d.view.scale.y = 2.5 * e
    }
};
SpeedLines.prototype.resize = function() {
    for (var a = 0; a < this.particals.length; a++) {
        var b = this.particals[a];
        b.position.x = b.home.x = 110640 * Math.random()
    }
};
SpeedLine = function() {
    this.view = PIXI.Sprite.fromImage(REMOTE_PATH + "img/testLine.png", !0);
    this.view.alpha = 0.6;
    this.position = {
        x: 0,
        y: 0,
        z: 0
    };
    this.speedY = 10 + 20 * Math.random();
    this.speedX = 5 + 10 * Math.random();
    this.imageId = ParticalDust.count % 3;
    ParticalDust.count++;
    this.alpha = 0.5 + 0.5 * Math.random()
};
SpeedLine.prototype = Object.create(PIXI.Sprite.prototype);
ParticalDust.count = 0;
Time = function() {
    this.DELTA_TIME = 1;
    this.lastTime = Date.now();
    this.frames = 0;
    this.speed = 1
};
Time.constructor = Time;
Time.prototype.update = function() {
    this.frames++;
    var a = Date.now();
    this.frames = 0;
    this.DELTA_TIME = 0.06 * (a - this.lastTime);
    3 < this.DELTA_TIME && (this.DELTA_TIME = 3);
    this.DELTA_TIME *= this.speed;
    this.lastTime = a
};
TIME = new Time;
GAME = GAME || {};
GAME.GameObjectPool = function(a, b) {
    this.classType = a;
    this.pool = [];
    for (var c = b || 20, d = 0; d < c; d++) this.pool.push(new this.classType)
};
GAME.GameObjectPool.constructor = GAME.GameObjectPool;
GAME.GameObjectPool.prototype.getObject = function() {
    var a = this.pool.pop();
    a || (a = new this.classType);
    return a
};
GAME.GameObjectPool.prototype.returnObject = function() {};
SpeedLines = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.particals = [];
    this.max = 10;
    this.count = 0;
    this.maxDist = 1E3;
    this.maxWidth = 7E3;
    this.images = [];
    for (var a = 0; 3 > a; a++) {
        var b = new Image;
        b.src = "img/testLine.png";
        this.images.push(b)
    }
    for (a = 0; a < this.max; a++) b = new SpeedLine, b.position.x = 5E3 * (Math.random() - 0.5), b.position.y = -1E3 + 3E3 * Math.random(), b.position.z = 110640 * Math.random(), this.particals.push(b), this.addChild(b.view);
    this.focalLength = 150
};
SpeedLines.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
SpeedLines.prototype.render = function(a, b) {
    for (var c = 0; c < this.particals.length; c++) {
        var d = this.particals[c],
            e = d.position.z + 5 * b.z,
            e = e % this.maxWidth;
        0 > e && (e += this.maxWidth);
        d.view.alpha = (this.maxWidth - e) / 2E3;
        0.6 < d.view.alpha && (d.view.alpha = 0.6);
        var e = b.focus / (b.focus + e + 100),
            f = d.position.x + b.x + 4E3,
            f = f % 8E3;
        0 > f && (f += 8E3);
        var f = f - 4E3,
            g = d.position.y + b.y + 1E3,
            g = g % 4E3;
        0 > g && (g += 4E3);
        g -= 1E3;
        f *= e;
        g *= e;
        d.view.rotation = Math.atan2(g, f);
        d.view.position.x = f;
        d.view.position.y = g;
        d.view.scale.x = d.view.scale.y = 2.5 * e
    }
};
SpeedLines.prototype.resize = function() {
    for (var a = 0; a < this.particals.length; a++) {
        var b = this.particals[a];
        b.position.x = b.home.x = 110640 * Math.random()
    }
};
SpeedLine = function() {
    this.view = PIXI.Sprite.fromImage(REMOTE_PATH + "img/testLine.png", !0);
    this.view.alpha = 0.6;
    this.position = {
        x: 0,
        y: 0,
        z: 0
    };
    this.speedY = 10 + 20 * Math.random();
    this.speedX = 5 + 10 * Math.random();
    this.imageId = ParticalDust.count % 3;
    ParticalDust.count++;
    this.alpha = 0.5 + 0.5 * Math.random()
};
SpeedLine.prototype = Object.create(PIXI.Sprite.prototype);
ParticalDust.count = 0;
var GAME = GAME || {},
    laserCount = 0;
GAME.PickupManager = function(a) {
    this.engine = a;
    this.pickups = [];
    this.pickupPool = new GAME.GameObjectPool(Pickup);
    this.offsetCount = this.count = this.spawnCount = 0;
    this.textures = [];
    for (a = 0; 40 > a; a += 2) {
        var b = 8 > a ? "0" + (a + 2) : a + 2;
        this.textures.push(PIXI.Texture.fromFrame("crumb00" + b + ".png"))
    }
    this.powerupTexture = [];
    for (a = 0; 40 > a; a += 2) b = 8 > a ? "0" + (a + 2) : a + 2, this.powerupTexture.push(PIXI.Texture.fromFrame("magChill00" + b + ".png"));
    this.powerupTexture2 = [];
    for (a = 0; 40 > a; a += 2) b = 8 > a ? "0" + (a + 2) : a + 2, this.powerupTexture2.push(PIXI.Texture.fromFrame("powerUps_rainbow00" +
        b + ".png"));
    this.powerupTexture3 = [];
    for (a = 0; 10 > a; a++) b = new Image, b.crossOrigin = "", b.src = REMOTE_PATH + "img/pickups/pickupDestructo.png", this.powerupTexture3.push(b);
    this.pos = 0
};
GAME.PickupManager.constructor = GAME.PickupManager;
GAME.PickupManager.prototype.update = function() {
    if (this.joyrideMode && (this.spawnCount += TIME.DELTA_TIME, 45 < this.spawnCount)) {
        this.pos += 0.15;
        this.spawnCount = 0;
        var a = 0.5 * (Math.sin(3 * this.pos) + 1);
        this.addSuperPowerup(this.engine.ball.position.z + PROFILE.drawDistance, 0.3 + 0.4 * a)
    }
    this.spawnCount += TIME.DELTA_TIME;
    1E3 < this.spawnCount && (this.pos += 0.15, this.spawnCount = 0, this.addPowerup(this.engine.ball.position.z + PROFILE.drawDistance, 0.5, Math.floor(2 * Math.random())));
    this.count += 0.3 * TIME.DELTA_TIME;
    for (a = 0; a <
        this.pickups.length; a++) {
        var b = this.pickups[a];
        b.view = b.powerup ? b.frames[Math.round(b.offset + this.count) % b.frames.length] : this.textures[Math.round(b.offset + this.count) % 20];
        b.isPickedUp ? (b.scale = 3 * (1 - 0.5 * b.ratio), b.position.x = b.pickupPosition.x + (this.engine.ball.position.x - b.pickupPosition.x) * b.ratio, b.position.y = b.pickupPosition.y + (this.engine.ball.position.y - b.pickupPosition.y - 50) * b.ratio, b.position.z = b.pickupPosition.z + (this.engine.ball.position.z - b.pickupPosition.z + 10) * b.ratio, 0.99 < b.ratio && (APP.pickupSound &&
            APP.pickupSound.play(), this.pickupPool.returnObject(b), this.pickups.splice(a, 1), this.engine.view.remove(b), a--)) : b.position.z < -this.engine.view.camera.z && (this.engine.view.remove(b), this.pickupPool.returnObject(b), this.pickups.splice(a, 1), a--)
    }
};
GAME.PickupManager.prototype.restart = function() {
    this.destroyAll();
    this.spawnCount = 0;
    this.joyrideMode = !1
};
GAME.PickupManager.prototype.addPickup = function(a, b) {
    var c = this.pickupPool.getObject();
    c.powerup = !1;
    c.position.z = a;
    c.position.x = b;
    c.offset = this.offsetCount;
    this.offsetCount += Math.floor(40 / 6);
    this.engine.view.road.mapPosition(c.position);
    this.pickups.push(c);
    this.engine.view.add(c)
};
GAME.PickupManager.prototype.addSuperPowerup = function(a, b) {
    var c = this.pickupPool.getObject();
    c.position.z = a;
    c.position.x = b;
    c.offset = this.offsetCount;
    this.offsetCount++;
    this.engine.view.road.mapPowerup(c.position, b);
    this.pickups.push(c);
    this.engine.view.add(c)
};
GAME.PickupManager.prototype.addPowerup = function(a, b, c) {
    var d = this.pickupPool.getObject();
    d.powerup = !0;
    d.id = c;
    d.frames = 0 == d.id ? this.powerupTexture : 1 == d.id ? this.powerupTexture2 : this.powerupTexture3;
    d.position.z = a;
    d.position.x = b;
    d.offset = this.offsetCount;
    this.offsetCount++;
    this.engine.view.road.mapPowerup(d.position, 0.5);
    d.position.y -= 700;
    this.pickups.push(d);
    this.engine.view.add(d)
};
GAME.PickupManager.prototype.removePickup = function(a) {
    if (a = this.pickups[a]) a.isPickedUp = !0, a.steve = this.engine.ball, a.pickupPosition = {
        x: a.position.x,
        y: a.position.y,
        z: a.position.z
    }, a.ratio = 0, this.engine.ball.powermode == Ball.MAGNET ? TweenLite.to(a, 0.3, {
        ratio: 1,
        ease: Sine.easeIn
    }) : TweenLite.to(a, 0.1, {
        ratio: 1,
        ease: Sine.easeOut
    })
};
GAME.PickupManager.prototype.destroyAll = function() {
    for (var a = 0; a < this.pickups.length; a++) {
        var b = this.pickups[a];
        this.pickupPool.returnObject(b);
        this.engine.view.remove(b)
    }
    this.pickups = []
};
GAME.PickupManager.prototype.destroyAllOffScreen = function() {
    for (var a = 0; a < this.pickups.length; a++) {
        var b = this.pickups[a];
        b.x > GAME.camera.x + GAME.width && (this.pickupPool.returnObject(b), this.engine.view.game.removeChild(b.view), this.pickups.splice(a, 1), a--)
    }
};
GAME = GAME || {};
laserCount = 0;
GAME.ExtraManager = function(a) {
    this.engine = a;
    this.pickups = [];
    this.extraPool = new GAME.GameObjectPool(SignPost);
    this.offsetCount = this.spawnCount3 = this.spawnCount2 = this.count = this.spawnCount = 0;
    this.textures = [];
    for (a = 0; 10 > a; a++) {
        var b = new Image;
        b.src = REMOTE_PATH + "img/pickups/nugget.png";
        this.textures.push(b)
    }
    this.powerupTexture = [];
    for (a = 0; 10 > a; a++) b = new Image, b.src = REMOTE_PATH + "img/rainbowChilly.png", this.powerupTexture.push(b);
    this.cloudImage = new Image;
    this.cloudImage.crossOrigin = "";
    this.cloudImage.src =
        REMOTE_PATH + "img/forest_cloud_01.png";
    this.signImage = new Image;
    this.signImage.crossOrigin = "";
    this.signImage.src = REMOTE_PATH + "img/signPost.png";
    this.pos = this.county2 = 0;
    this.tutImage = new Image;
    this.tutImage.crossOrigin = "";
    this.tutImage.src = REMOTE_PATH + "img/desert_cloud.png"
};
GAME.ExtraManager.constructor = GAME.ExtraManager;
GAME.ExtraManager.prototype.update = function() {
    this.spawnCount += TIME.DELTA_TIME;
    PROFILE.extra && (225 < this.spawnCount && (this.pos += 0.15, this.spawnCount = 0, this.addSign(this.engine.ball.position.z + 7E3, 0.5)), this.spawnCount2 += TIME.DELTA_TIME, 45 < this.spawnCount2 && (this.pos += 0.15, this.spawnCount2 = 0, this.addCloud(this.engine.ball.position.z + 7E3, 0.5)), this.spawnCount3 += TIME.DELTA_TIME, 157.5 < this.spawnCount3 && (this.pos += 0.15, this.spawnCount3 = 500 * -Math.random(), this.addIsland(this.engine.ball.position.z + 7E3, 0.5)));
    for (var a = 0; a < this.pickups.length; a++) {
        var b = this.pickups[a];
        b.position.z < -this.engine.view.camera.z && (this.engine.view.remove(b), this.extraPool.returnObject(b), this.pickups.splice(a, 1), a--)
    }
};
GAME.ExtraManager.prototype.restart = function() {
    this.destroyAll()
};
GAME.ExtraManager.prototype.addIsland = function(a, b) {
    var c = this.extraPool.getObject();
    c.view = this.engine.world.extras[2];
    c.frame = !1;
    var d = Math.random();
    c.position.z = a;
    c.position.x = b;
    this.engine.view.road.mapPowerup(c.position, b);
    c.position.x = 0.5 > d ? c.position.x + 5E3 : c.position.x - 5E3;
    c.position.y += 1E3;
    this.pickups.push(c);
    this.engine.view.add(c)
};
GAME.ExtraManager.prototype.addSign = function(a, b) {
    var c = this.extraPool.getObject();
    c.frame = !1;
    c.view = this.engine.world.extras[0];
    c.position.z = a;
    c.position.x = b;
    this.engine.view.road.mapPowerup(c.position, b);
    c.position.y += 100;
    c.scale = 5 * c.position.width / 804;
    c.scale = 10;
    this.pickups.push(c);
    this.engine.view.add(c)
};
GAME.ExtraManager.prototype.addCloud = function(a, b) {
    var c = this.extraPool.getObject();
    c.view = this.cloudImage;
    c.frame = !1;
    c.scale = 17 + 6 * Math.random();
    c.position.z = a;
    this.county2 += 0.5;
    this.county2 = Math.random() * Math.PI;
    this.county2 %= Math.PI;
    this.county2 *= 1.2;
    c.position.x = 5E3 * Math.sin(this.county2 - Math.PI / 2);
    this.engine.view.road.mapPowerup(c.position, b);
    c.position.y += 5E3 * Math.cos(this.county2 - Math.PI / 2);
    c.position.y += 2E3;
    this.pickups.push(c);
    this.engine.view.add(c)
};
GAME.ExtraManager.prototype.addTut = function(a, b, c) {
    var d = this.extraPool.getObject();
    if (!this.tutMap) {
        this.tutMap = {
            tutObstacles: "avoid_obstacles.png",
            tutControl: "steer_keys.png",
            tutPickup: "collect_crumbs.png",
            tutJump: "jump_desktop.png",
            tutPowerup: "collect_powewrups.png",
            tutReady: "readyGO.png"
        };
        var e = APP.gameScreen.game.controller.controlMode;
        e == Controller.TOUCH ? (this.tutMap.tutControl = "steer_touch.png", this.tutMap.tutJump = "jump_mobile.png") : e == Controller.TILT && (this.tutMap.tutControl = "steer_tilt.png",
            this.tutMap.tutJump = "jump_mobile.png")
    }
    d.view = PIXI.Texture.fromFrame(this.tutMap[c]);
    d.frame = !0;
    e = this.extraPool.getObject();
    e.frame = !0;
    e.view = PIXI.Texture.fromFrame("tutorialBG.png");
    d.position.z = a;
    d.position.x = b;
    "tutPowerup" == c && this.engine.pickupManager.addPowerup(a - 400, b, 0);
    this.engine.view.road.mapPosition(d.position);
    d.position.y -= 1300;
    d.position.y -= 300;
    d.scale = 10;
    e.position.x = d.position.x;
    e.position.y = d.position.y - 100;
    e.position.z = d.position.z + 500;
    e.scale = d.scale;
    this.pickups.push(d);
    this.engine.view.add(d);
    this.pickups.push(e);
    this.engine.view.add(e)
};
GAME.ExtraManager.prototype.removeExtra = function(a) {
    if (a = this.pickups[a]) a.isPickedUp = !0, a.steve = this.engine.ball, a.pickupPosition = {
        x: a.position.x,
        y: a.position.y,
        z: a.position.z
    }, a.ratio = 0, TweenLite.to(a, 0.1, {
        ratio: 1,
        ease: Sine.easeOut
    })
};
GAME.ExtraManager.prototype.destroyAll = function() {
    for (var a = 0; a < this.pickups.length; a++) {
        var b = this.pickups[a];
        this.extraPool.returnObject(b);
        this.engine.view.remove(b)
    }
    this.pickups = []
};
SignPost = function() {
    GameElement.call(this);
    this.view.crossOrigin = "";
    this.view.src = REMOTE_PATH + "img/signPost.png";
    this.scale = 9;
    this.width = 100;
    this.heightRatio = 0.85;
    this.currentFrame = 0
};
SignPost.prototype = Object.create(GameElement.prototype);
GAME = GAME || {};
GAME.EnemyManager = function(a) {
    this.engine = a;
    this.pickups = [];
    this.pickupPool = new GAME.GameObjectPool(Enemy);
    this.pos = this.spawnCount = 0
};
GAME.EnemyManager.constructor = GAME.EnemyManager;
GAME.EnemyManager.prototype.update = function() {
    this.engine.joyrideMode || (this.spawnCount += TIME.DELTA_TIME, 105 < this.spawnCount && (this.pos += 0.15, this.spawnCount = 0));
    for (var a = 0; a < this.pickups.length; a++) {
        var b = this.pickups[a];
        b.isPickedUp ? (b.ratio += 0.3 * (1 - b.ratio) * GAME.time.DELTA_TIME, 0.99 < b.ratio && (this.pickupPool.returnObject(b), this.pickups.splice(a, 1), this.engine.view.game.removeChild(b.view), a--)) : b.position.z < -this.engine.view.camera.z && (this.engine.view.remove(b), this.pickupPool.returnObject(b),
            this.pickups.splice(a, 1), a--)
    }
};
GAME.EnemyManager.prototype.addPickup = function(a, b) {
    var c = this.pickupPool.getObject();
    c.exploding = !1;
    c.position.z = a;
    c.position.x = b;
    this.engine.view.road.mapPosition(c.position);
    this.pickups.push(c);
    this.engine.view.add(c)
};
GAME.EnemyManager.prototype.addWall = function(a, b, c) {
    var d = this.pickupPool.getObject();
    d.exploding = !1;
    d.position.z = a;
    d.position.x = b + c / 2;
    c ? (d.wallWidth = d.visualWidth = c, d.wallHeight = d.visualHeight = 300, d.view = 1005 > c ? this.engine.world.walls[0] : this.engine.world.walls[1]) : (d.wallWidth = 1.5 * this.engine.world.baddy[0].width, d.wallHeight = 2 * this.engine.world.baddy[0].height, d.visualWidth = 2 * this.engine.world.baddy[0].width, d.visualHeight = 2 * this.engine.world.baddy[0].height, d.view = this.engine.world.baddy[0]);
    this.engine.view.road.mapPosition(d.position);
    this.pickups.push(d);
    this.engine.view.add(d)
};
GAME.EnemyManager.prototype.removePickup = function(a) {
    a = this.pickups[a];
    a.isPickedUp = !0;
    a.steve = this.engine.steve;
    a.pickupPosition = {
        x: a.position.x,
        y: a.position.y
    };
    a.ratio = 0
};
GAME.EnemyManager.prototype.restart = function() {
    this.destroyAll()
};
GAME.EnemyManager.prototype.destroyAll = function() {
    for (var a = 0; a < this.pickups.length; a++) {
        var b = this.pickups[a];
        this.pickupPool.returnObject(b);
        this.engine.view.remove(b)
    }
    this.pickups = []
};
GAME.EnemyManager.prototype.destroyAllOffScreen = function() {
    for (var a = 0; a < this.pickups.length; a++) {
        var b = this.pickups[a];
        b.x > GAME.camera.x + GAME.width && (this.pickupPool.returnObject(b), this.engine.view.game.removeChild(b.view), this.pickups.splice(a, 1), a--)
    }
};
GAME = GAME || {};
Pickup = function() {
    GameElement.call(this);
    this.view.crossOrigin = "";
    this.frame = !0;
    this.view.src = REMOTE_PATH + "img/pickups/nugget.png";
    this.scale = 3.4;
    this.width = 100;
    this.heightRatio = 0.85;
    this.currentFrame = 0
};
Pickup.prototype = Object.create(GameElement.prototype);
GAME = GAME || {};
Enemy = function() {
    GameElement.call(this);
    this.view.crossOrigin = !0;
    this.view.src = REMOTE_PATH + "img/title.png";
    this.scale = 1;
    this.wallWidth = 750;
    this.wallHeight = 800;
    this.exploding = !1
};
Enemy.prototype = Object.create(GameElement.prototype);
Enemy.flip = !0;
Enemy.prototype.explode = function() {
    this.exploding || (this.exploding = !0, this.directionY = -100, this.directionX = 100, Enemy.flip = !Enemy.flip, Enemy.flip && (this.directionX *= -1))
};
GAME = GAME || {};
laserCount = 0;
GAME.CollisionManager = function(a) {
    this.engine = a
};
GAME.CollisionManager.constructor = GAME.CollisionManager;
GAME.CollisionManager.prototype.update = function() {
    this.engine.ball.isDead || (this.playerVsPickup(), this.playerVsEnemy())
};
GAME.CollisionManager.prototype.playerVsEnemy = function() {
    for (var a = this.engine.enemyManager.pickups, b = this.engine.ball, c = 0; c < a.length; c++) {
        var d = a[c],
            e = d.position.z + 100 - b.position.z; - 5 < e && e < b.width / 2 && (e = d.position.x - b.position.x, e > -d.wallWidth / 2 && e < d.wallWidth / 2 && b.position.y > d.position.y - (d.wallHeight - 100) && (b.powermode != Ball.GIANT ? (b.deathHit(), this.engine.gameover()) : d.explode()))
    }
};
GAME.CollisionManager.prototype.playerVsPickup = function() {
    for (var a = this.engine.pickupManager.pickups, b = this.engine.ball, c = 0; c < a.length; c++) {
        var d = a[c];
        if (!d.isPickedUp) {
            var e = d.position.z - b.position.z;
            if (e > 500 + b.hitDistance) break;
            var f = d.width + b.width + b.hitDistance;
            if (e > -f / 2 && e < f / 2 && (e = d.position.x - b.position.x, e > -f / 2 && e < f / 2)) {
                if (d.powerup) {
                    if (!b.jumping) break;
                    Math.random();
                    0 == d.id ? b.magnetMode() : 1 == d.id ? b.chargeMode() : b.giantMode()
                }
                b.pulse();
                this.engine.pickupManager.removePickup(c);
                this.engine.pickupCount++;
                this.engine.score += 100
            }
        }
    }
};
Road = function(a) {
    this.drawDistance = 1E4;
    this.view = a;
    this.segs = [];
    this.segSize = 500;
    this.offset = 0;
    this.baseWidth = 1500;
    this.dangerStrip = new Image;
    this.dangerStrip.crossOrigin = "";
    this.dangerStrip.src = REMOTE_PATH + "img/stripFloor.png";
    this.testLedge = new Image;
    this.testLedge.crossOrigin = "";
    this.testLedge.src = REMOTE_PATH + "img/testLedge.png";
    this.testHoleSign = new Image;
    this.testHoleSign.crossOrigin = "";
    this.testHoleSign.src = REMOTE_PATH + "img/treetopWorld/flameTorch_frame01.png";
    this.testHoleSign2 = new Image;
    this.testHoleSign2.crossOrigin =
        "";
    this.testHoleSign2.src = REMOTE_PATH + "img/treetopWorld/flameTorch_frame02.png";
    this.testHoleSign3 = new Image;
    this.testHoleSign3.crossOrigin = "";
    this.testHoleSign3.src = REMOTE_PATH + "img/treetopWorld/flameTorch_frame03.png";
    this.testHoleSign4 = new Image;
    this.testHoleSign4.crossOrigin = "";
    this.testHoleSign4.src = REMOTE_PATH + "img/treetopWorld/flameTorch_frame04.png";
    this.signFrames = [this.testHoleSign, this.testHoleSign2, this.testHoleSign3, this.testHoleSign4];
    for (var b = this.frameCount = 0; b < PROFILE.trackSize; b++) {
        var c =
            new Segment(b * this.segSize);
        this.segs.push(c);
        a.items.push(c)
    }
    this.post = new Image;
    this.post.crossOrigin = "";
    this.post2 = new Image;
    this.post2.crossOrigin = "";
    this.trackIndex = 0
};
Road.prototype.reset = function() {
    this.flatMode = this.isFlat = !1;
    var a = this.view.game.world;
    this.offset = 0;
    for (var b = this.segs.length - 1; 0 <= b; b--) {
        var c = this.segs[b];
        c.position = b * this.segSize;
        c.p1.z = c.position;
        c.p2.z = c.position;
        c.p1.x = 500;
        c.p2.x = -500;
        c.p1.y = 1E3;
        c.p2.y = 1E3;
        c.color = a.floorColors[this.trackIndex % a.floorColors.length];
        c.edgeColorDark = a.leftWallColors[this.trackIndex % a.floorColors.length];
        c.edgeColorLight = a.rightWallColors[this.trackIndex % a.floorColors.length];
        c.leftAlpha = a.leftAlpha;
        c.rightAlpha =
            a.rightAlpha;
        c.floorAlpha = a.floorAlpha;
        c.wall = !0;
        c.hole = !1;
        this.trackIndex++
    }
};
Road.prototype.setWorld = function(a) {
    this.worldData = a;
    this.leftStump = this.worldData.leftStump;
    this.rightStump = this.worldData.rightStump
};
Road.prototype.mapPosition = function(a) {
    var b = a.z % (this.segSize * PROFILE.trackSize),
        b = Math.floor(b / this.segSize),
        c = this.segs[b % this.segs.length],
        b = this.segs[(b + 1) % this.segs.length],
        d = a.z % this.segSize,
        d = d / this.segSize;
    a.seg = c;
    a.x += c.p1.offsetVal + (b.p1.offsetVal - c.p1.offsetVal) * d;
    a.y = c.p1.y + (b.p1.y - c.p1.y) * d
};
Road.prototype.mapPowerup = function(a, b) {
    var c = a.z % (this.segSize * PROFILE.trackSize),
        c = Math.floor(c / this.segSize),
        d = this.segs[c % this.segs.length],
        c = this.segs[(c + 1) % this.segs.length],
        e = a.z % this.segSize,
        e = e / this.segSize;
    a.seg = d;
    var f = d.p1.x + (c.p1.x - d.p1.x) * e,
        g = d.p2.x + (c.p2.x - d.p2.x) * e;
    a.x += f + (g - f) * b;
    a.width = f - g;
    a.y = d.p1.y + (c.p1.y - d.p1.y) * e
};
Road.prototype.getOffset = function(a) {
    var b = a % (this.segSize * PROFILE.trackSize),
        b = Math.floor(b / this.segSize),
        c = this.segs[b % this.segs.length],
        b = this.segs[(b + 1) % this.segs.length];
    if (c.hole) return 12E3;
    a %= this.segSize;
    a /= this.segSize;
    return {
        x: c.p1.offsetVal + (b.p1.offsetVal - c.p1.offsetVal) * a
    }
};
Road.prototype.hitTest = function(a) {
    if (!a.isDead) {
        var b = a.tempPosition;
        a.hit = !1;
        a.isFalling = !1;
        var c = b.z % (this.segSize * PROFILE.trackSize),
            c = Math.floor(c / this.segSize),
            d = this.segs[c % this.segs.length],
            e = this.segs[(c + 1) % this.segs.length],
            c = b.z % this.segSize,
            c = c / this.segSize,
            f = d.p1.x + (e.p1.x - d.p1.x) * c,
            g = d.p2.x + (e.p2.x - d.p2.x) * c,
            e = d.p1.y + (e.p1.y - d.p1.y) * c;
        a.realGround = e;
        if (d.hole) return a.powermode != Ball.GIANT ? 0.15 < c && !a.jumping ? (b.y > e && (a.isFalling = !0), 12E3) : e : e + 100;
        if (d.wall)
            if (b.x > f - a.width / 2) {
                if (!(b.y <
                        e - d.wallHeight)) {
                    if (b.x > f && a.jumping) return b.y > e && (a.isFalling = !0), 12E3;
                    0 < a.dx && (a.dx *= -0.4);
                    b.x = f - a.width / 2;
                    a.hit = !0
                }
            } else {
                if (b.x < g + a.width / 2 && !(b.y < e - d.wallHeight)) {
                    if (b.x < g && a.jumping) return b.y > e && (a.isFalling = !0), 12E3;
                    0 > a.dx && (a.dx *= -0.4);
                    b.x = g + a.width / 2;
                    a.hit = !0
                }
            } else if (b.x > f + a.width / 4 || b.x < g - a.width / 4) return b.y > e && (a.isFalling = !0), 12E3;
        a.powermode == Ball.GIANT && f - g < a.width && (a.position.x = g + 0.5 * (f - g));
        return e
    }
};
Road.prototype.flatten = function() {
    this.flatMode = !0;
    for (var a = World.rainbow, b = 0; b < this.segs.length; b++) {
        var c = this.segs[(b + this.offset) % this.segs.length];
        c.hole = !1;
        c.wall = !0;
        c.color = a.floorColors[b % a.floorColors.length];
        c.edgeColorDark = a.leftWallColors[b % a.floorColors.length];
        c.edgeColorLight = a.rightWallColors[b % a.floorColors.length];
        c.leftAlpha = a.leftAlpha;
        c.rightAlpha = a.rightAlpha;
        c.floorAlpha = a.floorAlpha;
        var d = c.p2.x - (c.p2.x - c.p1.x) / 2,
            e = c.p1.y + 500 * Math.sin(c.p2.z / 500 / 2);
        c.p1.tweening = !0;
        c.p1.ymod =
            e;
        TweenLite.to(c.p1, 1, {
            x: d + 1E3,
            y: e,
            ease: Elastic.easeOut,
            delay: 0.05 * b
        });
        TweenLite.to(c.p2, 1, {
            x: d - 1E3,
            y: e,
            ease: Elastic.easeOut,
            delay: 0.05 * b
        })
    }
};
Road.prototype.unFlatten = function() {
    for (var a = this.view.game.world, b = 0; b < this.segs.length; b++) {
        var c = this.segs[(b + this.offset) % this.segs.length];
        c.p1.ymod = c.p1.home;
        c.p1.tweening = !0;
        TweenLite.to(c.p1, 1, {
            y: c.p1.home,
            ease: Elastic.easeOut,
            delay: 0.05 * b
        });
        TweenLite.to(c.p2, 1, {
            y: c.p1.home,
            ease: Elastic.easeOut,
            delay: 0.05 * b
        });
        c.color = a.floorColors[b % a.floorColors.length];
        c.edgeColorDark = a.leftWallColors[b % a.floorColors.length];
        c.edgeColorLight = a.rightWallColors[b % a.floorColors.length];
        c.leftAlpha = a.leftAlpha;
        c.rightAlpha = a.rightAlpha;
        c.floorAlpha = a.floorAlpha
    }
};
Road.prototype.renderSegment = function(a, b) {
    var c = a.prev,
        d = a.scaleRatio;
    if (!(0 > c.p1.z - a.p2.z)) {
        a.gradient = a.p2Screen.y / c.p2Screen.y;
        0 > d && (d *= -1);
        var e = 2 * d;
        if (a.hole) {
            e = c.p1Screen.x - c.p2Screen.x;
            b.globalAlpha = 1;
            var f = Math.round(this.frameCount),
                g = this.worldData.jumpPosts[f % 4],
                h = g.width,
                m = g.height,
                f = this.worldData.jumpPosts[(f + 2) % 4],
                j = f.width,
                k = f.height,
                d = 3 * d,
                l = this.view.game.world.dropEdge,
                n = e / l.width;
            b.drawImage(l, c.p2Screen.x, c.p2Screen.y - 10 * n, e, l.height * n);
            c = a.p1Screen.x - a.p2Screen.x;
            n = c / this.dangerStrip.width;
            b.drawImage(this.dangerStrip, a.p2Screen.x, a.p2Screen.y - 5 * n, c, this.dangerStrip.height * n);
            b.drawImage(g, a.p1Screen.x - 0.5 * h * d, a.p1Screen.y - (m - 20) * d, h * d, m * d);
            b.drawImage(f, a.p2Screen.x - 0.5 * j * d, a.p2Screen.y - (k - 20) * d, j * d, k * d)
        } else b.globalAlpha = a.floorAlpha, b.fillStyle = a.color, b.beginPath(), b.moveTo(a.p1Screen.x, a.p1Screen.y), b.lineTo(a.p2Screen.x, a.p2Screen.y), b.lineTo(c.p2Screen.x, c.p2Screen.y), b.lineTo(c.p1Screen.x, c.p1Screen.y), b.closePath(), b.fill(), a.z < this.drawDistance && a.wall && (b.globalAlpha = a.rightAlpha,
            b.fillStyle = a.edgeColorDark, b.beginPath(), b.moveTo(a.p1Screen.x, a.p1Screen.y), b.lineTo(c.p1Screen.x, c.p1Screen.y), b.lineTo(c.p1Screen.x, c.p1Screen.y - c.wallHeight * c.scaleRatio), b.lineTo(a.p1Screen.x, a.p1Screen.y - a.wallHeight * d), b.closePath(), b.fill(), b.globalAlpha = a.leftAlpha, b.fillStyle = a.edgeColorLight, b.beginPath(), b.moveTo(a.p2Screen.x, a.p2Screen.y), b.lineTo(c.p2Screen.x, c.p2Screen.y), b.lineTo(c.p2Screen.x, c.p2Screen.y - c.wallHeight * c.scaleRatio), b.lineTo(a.p2Screen.x, a.p2Screen.y - a.wallHeight *
                d), b.closePath(), b.fill(), PROFILE.drawPosts && (b.globalAlpha = 1, g = this.leftStump[0], h = g.width, m = g.height, f = this.rightStump[0], j = f.width, k = f.height, b.drawImage(g, a.p1Screen.x - 0.5 * h * e, a.p1Screen.y - m * e, h * e, m * e), b.drawImage(f, a.p2Screen.x - 0.5 * j * e, a.p2Screen.y - k * e, j * e, k * e)))
    }
};
Road.prototype.render = function(a, b) {
    var c = b.focus,
        d = b.zoom;
    this.frameCount += 0.25 * TIME.DELTA_TIME;
    for (var e = this.segs.length - 1; 0 <= e; e--) {
        a.globalAlpha = 1;
        var f = this.segs[(e + this.offset) % this.segs.length],
            g = f.p1.z + b.z,
            h = f.p1.x + b.x,
            m = f.p1.y + b.y,
            j = f.p1.z + b.z,
            k = c / (c + j) * d;
        f.scaleRatio = k;
        f.p1Screen.x = h * k;
        f.p1Screen.y = m * k + 345;
        m = f.p2.y + b.y;
        j = f.p2.z + b.z;
        h = f.p2.x + b.x;
        k = c / (c + j) * d;
        f.z = j;
        f.depth = j;
        f.p2Screen.x = h * k;
        f.p2Screen.y = m * k + 345;
        f.prev = this.segs[(e + this.offset + 1) % this.segs.length];
        g > -c + 30 ? f.visible = e != this.segs.length -
            1 : (f.position += this.segSize * this.segs.length, f.p1.z = f.position, f.p2.z = f.position, g = this.view.game.world, this.view.game.trackManager.setSeg(f), f.p1.home = f.p1.y, f.p1.tweening && (f.p1.tweening = !1, TweenLite.killTweensOf(f.p1), TweenLite.killTweensOf(f.p2)), this.flatMode && (g = World.rainbow, h = f.p2.x - (f.p2.x - f.p1.x) / 2, f.p1.x = h + 1E3, f.p2.x = h - 1E3, f.hole = !1, f.wall = !0, f.p1.y = f.p2.y = f.p1.y + 500 * Math.sin(f.p2.z / 500 / 2), f.p1.ymod = f.p1.y), f.color = g.floorColors[this.trackIndex % g.floorColors.length], f.edgeColorDark = g.leftWallColors[this.trackIndex %
                g.floorColors.length], f.edgeColorLight = g.rightWallColors[this.trackIndex % g.floorColors.length], f.leftAlpha = g.leftAlpha, f.rightAlpha = g.rightAlpha, f.floorAlpha = g.floorAlpha, this.trackIndex++, this.offset++)
    }
    for (e = this.segs.length - 1; 0 <= e; e--) a.globalAlpha = 1;
    a.globalAlpha = 1
};

function Segment(a) {
    this.scale = 1;
    this.position = a;
    this.scaleLamp = Math.random();
    Segment.colorCount++;
    this.color = Segment.colors[Segment.colorCount % Segment.colors.length];
    this.edgeColorDark = Segment.edgeColorDark[Segment.colorCount % Segment.colors.length];
    this.edgeColorLight = Segment.edgeColorLight[Segment.colorCount % Segment.colors.length];
    this.p1 = {
        x: 500,
        y: 0,
        z: a
    };
    this.p2 = {
        x: -500,
        y: 0,
        z: a
    };
    this.p1Screen = {
        x: 0,
        y: 0
    };
    this.p2Screen = {
        x: 0,
        y: 0
    };
    this.p1.offsetVal = 0;
    this.p2.offsetVal = 0;
    this.wallHeight = 100 + 150 * Math.random();
    this.wall = !0;
    this.modY = this.modX = 0;
    this.p1.ymod = 1E3
}
Segment.colors = "#32ffef #66c7ff #32e4f8 #32d1fd #39b8ff #66c7ff".split(" ");
Segment.edgeColorDark = ["#596bff", "#5c96ff"];
Segment.edgeColorLight = ["#5c96ff", "#5c96ff"];
Segment.colorCount = 0;
GAME = GAME || {};
Ball = function(a) {
    GameElement.call(this);
    this.shadow = new GameElement;
    this.shadow.view.crossOrigin = "";
    this.shadow.view.src = REMOTE_PATH + "img/shadow.png";
    this.shadow.scale = 1.4;
    this.ax = 0;
    this.engine = a;
    this.realy = this.speedY = this.speed = 0;
    this.addMovement();
    this.width = 250;
    this.heightRatio = 0.7;
    this.isDead = !1;
    this.scale = 1.5;
    this.state = Ball.NORMAL;
    this.powerupTimer = 0;
    this.powermode = Ball.NONE;
    this.spring = new Spring;
    this.baseScale = 1;
    this.frame = this.frameCount = this.hitDistance = this.pulseValue = 0;
    this.textures = [];
    for (a = 0; 15 > a; a++) {
        var b = a + 1;
        10 > b && (b = "0" + b);
        this.textures.push(PIXI.Texture.fromFrame("bitesFrames_" + b + ".png"))
    }
    this.view = this.textures[0];
    this.texturesMagnet = [];
    for (a = 0; 15 > a; a++) b = a + 1, 10 > b && (b = "0" + b), this.texturesMagnet.push(PIXI.Texture.fromFrame("powerUpsMAG00" + b + ".png"));
    this.lastPosition = {
        x: 0,
        y: 0,
        z: 0
    };
    this.tempPosition = {
        x: 0,
        y: 0,
        z: 0
    }
};
Ball.NORMAL = 0;
Ball.ACSENDING = 1;
Ball.DROPPING = 2;
Ball.FALLING = 3;
Ball.CRASHING = 4;
Ball.NONE = 0;
Ball.MAGNET = 1;
Ball.GIANT = 2;
Ball.CHARGE = 3;
Ball.prototype = Object.create(GameElement.prototype);
Ball.prototype.deathHit = function() {
    this.isDead || (APP.crashSound && APP.crashSound.play(), this.state = Ball.CRASHING, this.isDead = !0, this.dy = -100, this.targetSpeed = 0 < this.targetSpeed ? 100 : -100, this.bashDirection = 0 < this.targetSpeed ? 1 : -1)
};
Ball.prototype.update = function() {
    this.spring.update();
    var a = TIME.DELTA_TIME * this.engine.difficulty * PROFILE.speedMod;
    this.frameCount += 0.34 * a;
    this.frame = Math.floor(this.frameCount);
    this.view = this.textures[this.frame % this.textures.length];
    this.scale = 1.7 * this.baseScale;
    var b = this.engine.view.road.hitTest(this, this.engine.view.camera);
    this.tempPosition = this.position;
    this.ground = b;
    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;
    this.lastPosition.z = this.position.z;
    b -= this.realGround;
    this.powermode == Ball.CHARGE && (a = TIME.DELTA_TIME);
    var c = a + 0.5 * (TIME.DELTA_TIME - a);
    this.state == Ball.NORMAL ? (this.targetSpeed += 0.2 * (12 * this.ax - this.targetSpeed), this.rotation = 0.02 * this.targetSpeed, this.isFalling && (this.deathFall(), this.engine.gameover()), this.dy += 2.5 * c, this.realy += this.dy * c, this.realy > b && (this.jumping = !1, this.dy = 0, this.realy = b)) : this.state == Ball.ACSENDING ? (this.targetSpeed *= 0.8, this.dy -= 2.5 * a, this.realy += this.dy * a) : this.state == Ball.DROPPING ? (this.dy += 2.5 * a, this.realy += this.dy * a, this.realy >
        b && (this.state = Ball.NORMAL)) : this.state == Ball.CRASHING ? (this.rotation += this.bashDirection * a, this.dy += 2.5 * a, this.realy += this.dy * a, this.targetSpeed = 50 * this.bashDirection) : this.state == Ball.FALLING && (this.rotation += this.bashDirection * a, this.dy += 2.5 * a, this.realy += this.dy * a, this.targetSpeed = 50 * this.bashDirection);
    this.position.x += this.targetSpeed * a;
    this.position.y = this.realGround + this.realy;
    this.powermode == Ball.MAGNET ? (this.powerupTimer -= TIME.DELTA_TIME, 0 >= this.powerupTimer && (APP.magnetEndSound && APP.magnetEndSound.play(),
        this.hitDistance = 0, this.powermode = Ball.NONE)) : this.powermode == Ball.GIANT ? (this.powerupTimer -= TIME.DELTA_TIME, 0 >= this.powerupTimer && (this.hitDistance = 0, this.width = 250, TweenLite.to(this, 0.4, {
        baseScale: 1
    }), this.powermode = Ball.NONE, TweenLite.to(TIME, 0.4, {
        speed: 1
    }), TweenLite.to(this.engine.view.camera, 0.4, {
        dist: 400,
        distY: 1E3,
        shake: 0
    }))) : this.powermode == Ball.CHARGE && (this.powerupTimer -= a, this.engine.view.road.flatMode && 360 > this.powerupTimer && (this.engine.view.road.flatMode = !1), 0 >= this.powerupTimer && (APP.chargeEndSound &&
        APP.chargeEndSound.play(), this.engine.view.road.unFlatten(), this.engine.pickupManager.joyrideMode = !1, this.hitDistance = 0, this.width = 250, this.powermode = Ball.NONE, TweenLite.to(TIME, 0.1, {
            speed: 1
        }), this.engine.trackManager.resume(), TweenLite.to(this.engine.view.camera, 0.4, {
            dist: 400,
            distY: 1E3,
            shake: 0
        })));
    this.engine.view.road.hitTest(this, this.engine.view.camera)
};
Ball.prototype.magnetMode = function() {
    APP.powerupSound && APP.powerupSound.play();
    this.hitDistance = 1500;
    this.powerupTimer = 900;
    this.powermode = Ball.MAGNET
};
Ball.prototype.giantMode = function() {
    this.powerupTimer = 900;
    this.powermode = Ball.GIANT;
    this.width = 875;
    TweenLite.to(this, 0.4, {
        baseScale: 3.5,
        ease: Sine.easeOut,
        delay: 0
    });
    TweenLite.to(TIME, 0.2, {
        speed: 1.5,
        delay: 0
    });
    TweenLite.to(this.engine.view.camera, 0.6, {
        delay: 0,
        dist: 800,
        distY: 1800,
        shake: 10,
        ease: Sine.easeOut
    })
};
Ball.prototype.chargeMode = function() {
    APP.chargeSound && APP.chargeSound.play();
    this.powerupTimer = 900;
    this.powermode = Ball.CHARGE;
    TweenLite.to(this.engine.view.camera, 0.6, {
        delay: 0,
        dist: 230,
        distY: 800,
        shake: 5,
        ease: Sine.easeOut
    });
    this.engine.pickupManager.destroyAll();
    this.engine.pickupManager.joyrideMode = !0;
    this.engine.trackManager.pause();
    this.engine.enemyManager.destroyAll();
    TweenLite.to(TIME, 0.2, {
        speed: 2,
        delay: 0
    });
    this.engine.view.road.flatten(this)
};
Ball.prototype.jump = function() {
    this.state == Ball.NORMAL && (this.jumping = !0, 0 <= this.realy && !this.isFalling && (APP.jumpSound && APP.jumpSound.play(), this.dy = -60))
};
Ball.prototype.ascend = function() {
    this.isAsending = !0;
    this.state = Ball.ACSENDING
};
Ball.prototype.desend = function() {
    this.dy = 0;
    this.isAsending = !1
};
Ball.prototype.deathFall = function() {
    this.isDead || (this.isDead = !0, this.state = Ball.FALLING, this.bashDirection = 0)
};
Ball.prototype.pulse = function() {
    this.spring.dx = 0.08
};
Ball.prototype.reset = function() {
    this.isDead = !1;
    this.speedY = this.speed = this.targetSpeed = this.dx = this.dy = 0;
    this.isAsending = !1;
    this.realy = -1500;
    this.state = Ball.DROPPING;
    this.position.z = 0;
    this.hitDistance = this.powerupTimer = this.position.x = 0;
    this.width = 250;
    this.baseScale = 1;
    this.powermode = Ball.NONE
};
Controller = function(a) {
    this.game = a;
    this.tilt = !1;
    this.setKeys();
    this.leftTouch;
    this.rightTouch;
    this.jumpTouch;
    this.accelerationY = this.keyState = this.lean = 0;
    this.controlMode = Controller.KEYS
};
Controller.KEYS = 0;
Controller.TILT = 1;
Controller.TOUCH = 2;
Controller.prototype.removeControl = function() {
    this.controlMode == Controller.KEYS ? (document.body.onkeydown = null, document.body.onkeyup = null) : this.controlMode == Controller.TILT ? (this.tilt = !1, window.ondevicemotion = null, APP.renderer.view.ontouchstart = null) : this.controlMode == Controller.TOUCH && (APP.renderer.view.ontouchstart = null, APP.renderer.view.ontouchend = null)
};
Controller.prototype.setTilt = function() {
    this.removeControl();
    this.controlMode = Controller.TILT;
    this.tilt = !0;
    window.ondevicemotion = this.onDeviceMotion.bind(this);
    APP.renderer.view.ontouchstart = this.onTiltTouch.bind(this);
    PROFILE.speedMod = 0.6
};
Controller.prototype.setKeys = function() {
    this.removeControl();
    this.controlMode = Controller.KEYS;
    document.body.onkeydown = this.onKeyDown.bind(this);
    document.body.onkeyup = this.onKeyUp.bind(this);
    PROFILE.speedMod = 1
};
Controller.prototype.setTouch = function() {
    this.removeControl();
    this.controlMode = Controller.TOUCH;
    APP.renderer.view.ontouchstart = this.onTouchStart.bind(this);
    APP.renderer.view.ontouchend = this.onTouchEnd.bind(this);
    PROFILE.speedMod = 0.8
};
Controller.prototype.update = function() {
    this.tilt ? (this.lean = this.accelerationY * APP.profile.flipTilt, -1 > this.lean ? this.lean = -1 : 1 < this.lean && (this.lean = 1)) : (this.lean = 0, this.leftDown && this.rightDown ? this.lean = 0 : this.leftDown ? this.lean = -1 : this.rightDown && (this.lean = 1));
    var a = this.game.ball;
    a.isDead && (this.lean = 0, a.ax = a.bashDirection);
    a.state == Ball.NORMAL && (a.ax = 2.5 * this.lean);
    a.update()
};
Controller.prototype.onDeviceMotion = function(a) {
    this.accelerationY = 90 == window.orientation ? -a.accelerationIncludingGravity.y : -90 == window.orientation ? a.accelerationIncludingGravity.y : 0 == window.orientation ? a.accelerationIncludingGravity.x : -a.accelerationIncludingGravity.x;
    this.accelerationY *= 0.5
};
Controller.prototype.onTouchStart = function(a) {
    var b = 0.1 * window.innerWidth;
    60 > b && (b = 60);
    for (var c = event.changedTouches, d = 0; d < c.length; d++) {
        var e = c[d];
        e.clientX < b ? (this.leftTouch = e.identifier, this.leftDown = !0) : e.clientX > window.innerWidth - b ? (this.rightTouch = e.identifier, this.rightDown = !0) : this.game.ball.jump()
    }
    a.preventDefault()
};
Controller.prototype.onTiltTouch = function(a) {
    a.preventDefault();
    this.game.ball.jump()
};
Controller.prototype.onTouchEnd = function() {
    for (var a = event.changedTouches, b = 0; b < a.length; b++) {
        var c = a[b];
        this.leftTouch == c.identifier && (this.leftTouch = null, this.leftDown = !1);
        this.rightTouch == c.identifier && (this.rightTouch = null, this.rightDown = !1)
    }
};
Controller.prototype.onKeyDown = function(a) {
    if (37 == a.keyCode) this.leftDown = !0, this.keyState = -1, this.lastKey = a.keyCode;
    else if (39 == a.keyCode) this.rightDown = !0, this.keyState = 1, this.lastKey = a.keyCode;
    else if (38 == a.keyCode || 32 == a.keyCode) this.game.ball.jump();
    else if (80 == a.keyCode)
        if (this.game.paused) this.game.view.hud.onResumePressed();
        else this.game.view.hud.onPausePressed()
};
Controller.prototype.onKeyUp = function(a) {
    37 == a.keyCode ? this.leftDown = !1 : 39 == a.keyCode && (this.rightDown = !1)
};
TransitionAnimation = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.halfSprite = PIXI.Sprite.fromImage("img/BG_col_01.png");
    this.halfSprite.skew = -0.2;
    this.halfSprite.scale.x = 5;
    this.halfSprite.scale.y = APP.height / 50;
    this.halfSprite.alpha = 0.5;
    this.halfSprite.position.y = APP.height / 2;
    this.halfSprite.anchor.y = 0.5;
    this.sprite = PIXI.Sprite.fromImage("img/BG_col_01.png");
    this.sprite.skew = -0.2;
    this.sprite.scale.x = (APP.width + 200) / 50;
    this.sprite.scale.y = APP.height / 50;
    this.sprite.position.x = 200;
    this.sprite.position.y =
        APP.height / 2;
    this.sprite.anchor.y = 0.5;
    this.halfSprite.updateTransform = TransitionAnimation.skewTransform;
    this.sprite.updateTransform = TransitionAnimation.skewTransform;
    this.addChild(this.halfSprite);
    this.addChild(this.sprite);
    this.visible = !1
};
TransitionAnimation.skewTransform = function() {
    this.localTransform[0] = this.scale.x;
    this.localTransform[1] = Math.tan(this.skew) * this.scale.y;
    this.localTransform[3] = 0;
    this.localTransform[4] = this.scale.y;
    this.localTransform[2] = this.position.x;
    this.localTransform[5] = this.position.y;
    mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
    this.worldAlpha = this.alpha * this.parent.worldAlpha
};
TransitionAnimation.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TransitionAnimation.prototype.start = function(a) {
    this.color = a;
    this.sprite.alpha = 1;
    this.sprite.setTexture(PIXI.Texture.fromImage(backgroundColorsName2[a]));
    this.halfSprite.setTexture(PIXI.Texture.fromImage(backgroundColorsName2[a]));
    this.sprite.position.x = APP.width + 60;
    this.halfSprite.position.x = APP.width + 60;
    this.halfSprite.visible = !0;
    TweenLite.to(this.halfSprite.position, 2, {
        x: -100,
        ease: Sine.easeInOut
    });
    TweenLite.to(this.sprite.position, 2, {
        x: -100,
        delay: 0.23,
        ease: Sine.easeInOut,
        onComplete: this.onCovered.bind(this)
    });
    this.visible = !0
};
TransitionAnimation.prototype.onCovered = function() {
    stage.setBackgroundColor(backgroundColors[this.color]);
    this.halfSprite.visible = !1;
    TweenLite.to(this.sprite, 0.5, {
        alpha: 0,
        ease: Sine.easeInOut,
        onComplete: this.onTransitionComplete.bind(this)
    });
    if (this.onComplete) this.onComplete()
};
TransitionAnimation.prototype.onTransitionComplete = function() {
    this.visible = !1;
    if (this.onCompleteReal) this.onCompleteReal()
};
var PIXI = PIXI || {};
PIXI.StressTest = function(a) {
    this.callback = a;
    this.stage = new PIXI.Stage(16777215);
    this.renderer = new PIXI.CanvasRenderer(500, 500);
    document.body.appendChild(this.renderer.view);
    this.cover = document.createElement("div");
    this.cover.style.width = this.cover.style.height = "500px";
    this.cover.style.background = "#FFFFFF";
    document.body.appendChild(this.cover);
    this.renderer.view.style.position = "absolute";
    this.cover.style.position = "absolute";
    this.cover.style.zIndex = 2;
    this.duration = 3;
    var b = this;
    a = document.createElement("canvas");
    a.width = 52;
    a.height = 74;
    a.context = a.getContext("2d");
    a.context.fillRect(0, 0, 52, 74);
    this.texture = PIXI.Texture.fromCanvas(a);
    this.texture.baseTexture.addEventListener("loaded", function() {
        b.begin()
    });
    this.frameRate = []
};
PIXI.StressTest.constructor = PIXI.StressTest;
PIXI.StressTest.prototype.begin = function() {
    this.testSprites = [];
    for (var a = 0; 300 > a; a++) {
        var b = new PIXI.Sprite(this.texture);
        b.anchor.x = 0.5;
        b.anchor.y = 0.5;
        this.stage.addChild(b);
        b.position.x = 50 + 400 * Math.random();
        b.position.y = 50 + 400 * Math.random();
        this.testSprites.push(b)
    }
    this.renderer.render(this.stage);
    this.startTime = Date.now();
    this.lastTime = Date.now();
    var c = this;
    requestAnimFrame(function() {
        c.update()
    })
};
PIXI.StressTest.prototype.update = function() {
    for (var a = Date.now(), b = 0; b < this.testSprites.length; b++) this.testSprites[b].rotation += 0.3;
    this.renderer.render(this.stage);
    b = a - this.lastTime;
    this.frameRate.push(0.06 * b);
    this.lastTime = a;
    if (a - this.startTime < 1E3 * this.duration) {
        var c = this;
        requestAnimFrame(function() {
            c.update()
        })
    } else console.log(this.frameRate), document.body.removeChild(this.renderer.view), document.body.removeChild(this.cover), this.renderer = this.cover = null, this.result = this.frameRate.length / this.duration,
        this.callback && this.callback(this.result)
};
window.console = {};
window.console.log = function() {};
PIXI.JsonLoader.prototype.loadIe = function() {
    $.ajax({
        type: "GET",
        url: this.url,
        async: !0,
        crossDomain: !0,
        dataType: "json",
        success: this.onJSONLoadedIE.bind(this),
        error: function(a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c)
        }
    })
};
PIXI.JsonLoader.prototype.onJSONLoadedIE = function(a) {
    a instanceof String && (a = JSON.parse(a));
    this.json = a;
    if (this.json.frames) {
        var b = this;
        a = new PIXI.ImageLoader(this.baseUrl + this.json.meta.image, this.crossorigin);
        var c = this.json.frames;
        this.texture = a.texture.baseTexture;
        a.addEventListener("loaded", function() {
            b.onLoaded()
        });
        for (var d in c) {
            var e = c[d].frame;
            e && (PIXI.TextureCache[d] = new PIXI.Texture(this.texture, {
                x: e.x,
                y: e.y,
                width: e.w,
                height: e.h
            }), c[d].trimmed && (PIXI.TextureCache[d].realSize = c[d].spriteSourceSize,
                PIXI.TextureCache[d].trim.x = 0))
        }
        a.load()
    } else this.json.bones && (d = (new spine.SkeletonJson).readSkeletonData(this.json), PIXI.AnimCache[this.url] = d), this.onLoaded()
};
var McBites = function() {
    APP = this;
    this.isHigh = !0;
    APP.tc = PROFILE.mobile ? "http://m.your-website-name.co.uk/terms.php" : "https://www.greenish.xyz/";
    this.profile = PROFILE;
    var a = getUrlVars();
    this.inAPP = "true" == a.inapp;
    this.startLevel = a.level;
    this.inAPP || (FB.init({
        appId: "",
        status: !1,
        cookie: !0
    }), FacebookAPI.checkLoggedIn(function() {
        FacebookAPI.loggedIn ? SteveAPI.getUserScore(function(a) {
            APP.userRank = a.rank;
            APP.userScore = a.score.score;
            APP.userName = a.score.username;
            console.log(APP.userName + " is ranked " + APP.userRank + " and the score is " + APP.userScore)
        }) : console.log("NOT LOGGED IN")
    }));
    this.width = 800;
    this.height = 600;
    this.renderer = new PIXI.CanvasRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
    this.renderer.view.style["-webkit-transform"] = "translate3d(0,0,0)";
    this.renderer.context.imageSmoothingEnabled = !1;
    this.renderer.context.webkitImageSmoothingEnabled = !1;
    this.renderer.context.mozImageSmoothingEnabled = !1;
    this.stage =
        new PIXI.Stage(16777215);
    this.container = new PIXI.DisplayObjectContainer;
    this.stage.addChild(this.container);
    this.simpleApp = new SimpleApp(this.container);
    this.startup = new Startup;
    this.startup.run();
    requestAnimationFrame(this.update.bind(this));
    this.keyAvailable = this.touchAvailable = this.tiltAvailable = !1;
    this.resize(window.innerWidth || document.documentElement.clientWidth, window.innerHeight || document.documentElement.clientHeight);
    stats = new Stats;
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left =
        "0px";
    stats.domElement.style.top = "0px";
    stats.domElement.style.zIndex = "3"
};
McBites.prototype.update = function() {
    stats.update();
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this))
};
McBites.prototype.highRez = function() {
    this.isHigh || (this.isHigh = !0, this.resize(this.w, this.h))
};
McBites.prototype.lowRez = function() {
    this.isHigh && (this.isHigh = !1, this.resize(this.w, this.h))
};
McBites.prototype.resize = function(a, b) {
    this.w = a;
    this.h = b;
    this.renderer.view.style.width = a + "px";
    this.renderer.view.style.height = b + "px";
    var c = b,
        d = a;
    this.container.scale.x = this.container.scale.y = 1;
    if (690 > b || !this.isHigh) c = Math.min(b, 690), d = a * (c / b), this.container.scale.x = this.container.scale.y = c / 690, b = 690;
    APP.controlOverlay && (APP.controlOverlay.position.x = d / 2, APP.controlOverlay.position.y = c / 2);
    APP.background && (APP.background.position.x = d / 2, APP.background.position.y = c / 2, APP.background.scale.x = APP.background.scale.y =
        d < c ? c / 1024 : d / 1024);
    this.renderer.resize(d, c);
    this.simpleApp.resize(d / this.container.scale.x, Math.max(b, 690))
};
$(document).ready(function() {
    -1 != navigator.userAgent.toLowerCase().indexOf("msie") && (PIXI.JsonLoader.prototype.load = PIXI.JsonLoader.prototype.loadIe);
    PROFILE = new Profile;
    PROFILE.buildProfile();
    if (PROFILE.mobile) {
        var a = document.getElementById("mcTab");
        2 != window.devicePixelRatio ? (a.src = REMOTE_PATH + "img/super-spice-dash_m.png", a.className = "mobileTab") : a.src = REMOTE_PATH + "img/super-spice-dash.png";
        a = document.getElementById("topStrip");
        a.style.display = "none";
        document.getElementById("mcdlink").href = "http://m.your-website-name.co.uk"
    } else a =
        document.getElementById("mcTab"), a.src = REMOTE_PATH + "img/super-spice-dash.png";
    2 == window.devicePixelRatio && !PROFILE.ipad ? $("meta[name\x3dviewport]").attr("content", "width\x3ddevice-width, user-scalable\x3dno,initial-scale\x3d.5, maximum-scale\x3d.5, minimum-scale\x3d.5") : $("meta[name\x3dviewport]").attr("content", "width\x3ddevice-width, user-scalable\x3dno,initial-scale\x3d1, maximum-scale\x3d1, minimum-scale\x3d1");
    var b = "true" == getUrlVars().inapp;
    b && (a = document.getElementById("mcTab"), a.style.display =
        "none", a = document.getElementById("topStrip"), a.style.display = "none");
    if (PROFILE.is3g) {
        a = new Image;
        a.src = REMOTE_PATH + "img/prompts/3GS_noplay.jpg";
        a.style.position = "absolute";
        var c = window.innerHeight || document.documentElement.clientHeight;
        a.width = window.innerWidth || document.documentElement.clientWidth;
        a.height = c;
        document.body.style.color = "#FFFFFF";
        document.body.appendChild(a)
    } else {
        var a = PROFILE.needsProfile,
            d = b ? 7 : 5;
        PROFILE.ios && !b && (d = 0);
        PROFILE.ios || (d = 0);
        Modernizr.canvas ? a ? (stressTest = new PIXI.StressTest(function(a) {
                if (a >
                    d) PROFILE.setup(b && PROFILE.ios ? 0 : a), app = new McBites;
                else {
                    a = new Image;
                    PROFILE.ipad ? a.src = REMOTE_PATH + "img/prompts/iPad_noplay.jpg" : (a.src = REMOTE_PATH + "img/prompts/iPhone4_browserPlay.jpg", a.ontouchstart = function() {
                        window.open("http://m.your-website-name.co.uk/spicy", "_blank")
                    });
                    a.style.position = "absolute";
                    var c = window.innerHeight || document.documentElement.clientHeight;
                    a.width = window.innerWidth || document.documentElement.clientWidth;
                    a.height = c;
                    document.body.style.color = "#FFFFFF";
                    document.body.appendChild(a)
                }
            }),
            stressTest.begin()) : (PROFILE.setup(1E4), app = new McBites) : (a = new Image, a.src = REMOTE_PATH + "img/warning_ie8.jpg", a.style.position = "absolute", a.style.top = "50%", a.style.left = "50%", a.style.marginTop = "-400px", a.style.marginLeft = "-640px", document.body.style.color = "#000000", document.body.appendChild(a))
    }
});
$(window).resize(function() {
    var a = window.innerWidth || document.documentElement.clientWidth,
        b = window.innerHeight || document.documentElement.clientHeight;
    app && app.resize(a, b);
    window.scrollTo(0, 0)
});