﻿/*! Built with IMPACT - impactjs.com */
(function(window) {
    "use strict";
    Number.prototype.map = function(istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
    };
    Number.prototype.limit = function(min, max) {
        return Math.min(max, Math.max(min, this));
    };
    Number.prototype.round = function(precision) {
        precision = Math.pow(10, precision || 0);
        return Math.round(this * precision) / precision;
    };
    Number.prototype.floor = function() {
        return Math.floor(this);
    };
    Number.prototype.ceil = function() {
        return Math.ceil(this);
    };
    Number.prototype.toInt = function() {
        return (this | 0);
    };
    Number.prototype.toRad = function() {
        return (this / 180) * Math.PI;
    };
    Number.prototype.toDeg = function() {
        return (this * 180) / Math.PI;
    };
    Array.prototype.erase = function(item) {
        for (var i = this.length; i--;) {
            if (this[i] === item) {
                this.splice(i, 1);
            }
        }
        return this;
    };
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)];
    };
    Function.prototype.bind = Function.prototype.bind || function(oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply((this instanceof fNOP && oThis ? this : oThis), aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
    window.ig = {
        game: null,
        debug: null,
        version: '1.23',
        global: window,
        modules: {},
        resources: [],
        ready: false,
        baked: false,
        nocache: '',
        ua: {},
        prefix: (window.ImpactPrefix || ''),
        lib: 'lib/',
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function(selector) {
            return selector.charAt(0) == '#' ? document.getElementById(selector.substr(1)) : document.getElementsByTagName(selector);
        },
        $new: function(name) {
            return document.createElement(name);
        },
        copy: function(object) {
            if (!object || typeof(object) != 'object' || object instanceof HTMLElement || object instanceof ig.Class) {
                return object;
            } else if (object instanceof Array) {
                var c = [];
                for (var i = 0, l = object.length; i < l; i++) {
                    c[i] = ig.copy(object[i]);
                }
                return c;
            } else {
                var c = {};
                for (var i in object) {
                    c[i] = ig.copy(object[i]);
                }
                return c;
            }
        },
        merge: function(original, extended) {
            for (var key in extended) {
                var ext = extended[key];
                if (typeof(ext) != 'object' || ext instanceof HTMLElement || ext instanceof ig.Class || ext === null) {
                    original[key] = ext;
                } else {
                    if (!original[key] || typeof(original[key]) != 'object') {
                        original[key] = (ext instanceof Array) ? [] : {};
                    }
                    ig.merge(original[key], ext);
                }
            }
            return original;
        },
        ksort: function(obj) {
            if (!obj || typeof(obj) != 'object') {
                return [];
            }
            var keys = [],
                values = [];
            for (var i in obj) {
                keys.push(i);
            }
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        },
        setVendorAttribute: function(el, attr, val) {
            var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
            el[attr] = el['ms' + uc] = el['moz' + uc] = el['webkit' + uc] = el['o' + uc] = val;
        },
        getVendorAttribute: function(el, attr) {
            var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
            return el[attr] || el['ms' + uc] || el['moz' + uc] || el['webkit' + uc] || el['o' + uc];
        },
        normalizeVendorAttribute: function(el, attr) {
            var prefixedVal = ig.getVendorAttribute(el, attr);
            if (!el[attr] && prefixedVal) {
                el[attr] = prefixedVal;
            }
        },
        getImagePixels: function(image, x, y, width, height) {
            var canvas = ig.$new('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext('2d');
            ig.System.SCALE.CRISP(canvas, ctx);
            var ratio = ig.getVendorAttribute(ctx, 'backingStorePixelRatio') || 1;
            ig.normalizeVendorAttribute(ctx, 'getImageDataHD');
            var realWidth = image.width / ratio,
                realHeight = image.height / ratio;
            canvas.width = Math.ceil(realWidth);
            canvas.height = Math.ceil(realHeight);
            ctx.drawImage(image, 0, 0, realWidth, realHeight);
            return (ratio === 1) ? ctx.getImageData(x, y, width, height) : ctx.getImageDataHD(x, y, width, height);
        },
        module: function(name) {
            if (ig._current) {
                throw ("Module '" + ig._current.name + "' defines nothing");
            }
            if (ig.modules[name] && ig.modules[name].body) {
                throw ("Module '" + name + "' is already defined");
            }
            ig._current = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            ig.modules[name] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig;
        },
        requires: function() {
            ig._current.requires = Array.prototype.slice.call(arguments);
            return ig;
        },
        defines: function(body) {
            ig._current.body = body;
            ig._current = null;
            ig._initDOMReady();
        },
        addResource: function(resource) {
            ig.resources.push(resource);
        },
        setNocache: function(set) {
            ig.nocache = set ? '?' + Date.now() : '';
        },
        log: function() {},
        assert: function(condition, msg) {},
        show: function(name, number) {},
        mark: function(msg, color) {},
        _loadScript: function(name, requiredFrom) {
            ig.modules[name] = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            ig._waitForOnload++;
            var path = ig.prefix + ig.lib + name.replace(/\./g, '/') + '.js' + ig.nocache;
            var script = ig.$new('script');
            script.type = 'text/javascript';
            script.src = path;
            script.onload = function() {
                ig._waitForOnload--;
                ig._execModules();
            };
            script.onerror = function() {
                throw ('Failed to load module ' + name + ' at ' + path + ' ' + 'required from ' + requiredFrom);
            };
            ig.$('head')[0].appendChild(script);
        },
        _execModules: function() {
            var modulesLoaded = false;
            for (var i = 0; i < ig._loadQueue.length; i++) {
                var m = ig._loadQueue[i];
                var dependenciesLoaded = true;
                for (var j = 0; j < m.requires.length; j++) {
                    var name = m.requires[j];
                    if (!ig.modules[name]) {
                        dependenciesLoaded = false;
                        ig._loadScript(name, m.name);
                    } else if (!ig.modules[name].loaded) {
                        dependenciesLoaded = false;
                    }
                }
                if (dependenciesLoaded && m.body) {
                    ig._loadQueue.splice(i, 1);
                    m.loaded = true;
                    m.body();
                    modulesLoaded = true;
                    i--;
                }
            }
            if (modulesLoaded) {
                ig._execModules();
            } else if (!ig.baked && ig._waitForOnload == 0 && ig._loadQueue.length != 0) {
                var unresolved = [];
                for (var i = 0; i < ig._loadQueue.length; i++) {
                    var unloaded = [];
                    var requires = ig._loadQueue[i].requires;
                    for (var j = 0; j < requires.length; j++) {
                        var m = ig.modules[requires[j]];
                        if (!m || !m.loaded) {
                            unloaded.push(requires[j]);
                        }
                    }
                    unresolved.push(ig._loadQueue[i].name + ' (requires: ' + unloaded.join(', ') + ')');
                }
                throw ("Unresolved (or circular?) dependencies. " + "Most likely there's a name/path mismatch for one of the listed modules " + "or a previous syntax error prevents a module from loading:\n" +
                    unresolved.join('\n'));
            }
        },
        _DOMReady: function() {
            if (!ig.modules['dom.ready'].loaded) {
                if (!document.body) {
                    return setTimeout(ig._DOMReady, 13);
                }
                ig.modules['dom.ready'].loaded = true;
                ig._waitForOnload--;
                ig._execModules();
            }
            return 0;
        },
        _boot: function() {
            if (document.location.href.match(/\?nocache/)) {
                ig.setNocache(true);
            }
            ig.ua.pixelRatio = window.devicePixelRatio || 1;
            ig.ua.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            ig.ua.screen = {
                width: window.screen.availWidth * ig.ua.pixelRatio,
                height: window.screen.availHeight * ig.ua.pixelRatio
            };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = (ig.ua.iPhone && ig.ua.pixelRatio == 2);
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.winPhone || /mobile/i.test(navigator.userAgent);
            ig.ua.touchDevice = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints));
        },
        _initDOMReady: function() {
            if (ig.modules['dom.ready']) {
                ig._execModules();
                return;
            }
            ig._boot();
            ig.modules['dom.ready'] = {
                requires: [],
                loaded: false,
                body: null
            };
            ig._waitForOnload++;
            if (document.readyState === 'complete') {
                ig._DOMReady();
            } else {
                document.addEventListener('DOMContentLoaded', ig._DOMReady, false);
                window.addEventListener('load', ig._DOMReady, false);
            }
        }
    };
    ig.normalizeVendorAttribute(window, 'requestAnimationFrame');
    if (window.requestAnimationFrame) {
        var next = 1,
            anims = {};
        window.ig.setAnimation = function(callback, element) {
            var current = next++;
            anims[current] = true;
            var animate = function() {
                if (!anims[current]) {
                    return;
                }
                window.requestAnimationFrame(animate, element);
                callback();
            };
            window.requestAnimationFrame(animate, element);
            return current;
        };
        window.ig.clearAnimation = function(id) {
            delete anims[id];
        };
    } else {
        window.ig.setAnimation = function(callback, element) {
            return window.setInterval(callback, 1000 / 60);
        };
        window.ig.clearAnimation = function(id) {
            window.clearInterval(id);
        };
    }
    var initializing = false,
        fnTest = /xyz/.test(function() {
            xyz;
        }) ? /\bparent\b/ : /.*/;
    var lastClassId = 0;
    window.ig.Class = function() {};
    var inject = function(prop) {
        var proto = this.prototype;
        var parent = {};
        for (var name in prop) {
            if (typeof(prop[name]) == "function" && typeof(proto[name]) == "function" && fnTest.test(prop[name])) {
                parent[name] = proto[name];
                proto[name] = (function(name, fn) {
                    return function() {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            } else {
                proto[name] = prop[name];
            }
        }
    };
    window.ig.Class.extend = function(prop) {
        var parent = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            if (typeof(prop[name]) == "function" && typeof(parent[name]) == "function" && fnTest.test(prop[name])) {
                prototype[name] = (function(name, fn) {
                    return function() {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            } else {
                prototype[name] = prop[name];
            }
        }

        function Class() {
            if (!initializing) {
                if (this.staticInstantiate) {
                    var obj = this.staticInstantiate.apply(this, arguments);
                    if (obj) {
                        return obj;
                    }
                }
                for (var p in this) {
                    if (typeof(this[p]) == 'object') {
                        this[p] = ig.copy(this[p]);
                    }
                }
                if (this.init) {
                    this.init.apply(this, arguments);
                }
            }
            return this;
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = window.ig.Class.extend;
        Class.inject = inject;
        Class.classId = prototype.classId = ++lastClassId;
        return Class;
    };
    if (window.ImpactMixin) {
        ig.merge(ig, window.ImpactMixin);
    }
})(window); // lib/impact/image.js
ig.baked = true;
ig.module('impact.image').defines(function() {
    "use strict";
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: false,
        failed: false,
        loadCallback: null,
        path: '',
        staticInstantiate: function(path) {
            return ig.Image.cache[path] || null;
        },
        init: function(path) {
            this.path = path;
            this.load();
        },
        load: function(loadCallback) {
            if (this.loaded) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            } else if (!this.loaded && ig.ready) {
                this.loadCallback = loadCallback || null;
                this.data = new Image();
                this.data.onload = this.onload.bind(this);
                this.data.onerror = this.onerror.bind(this);
                this.data.src = ig.prefix + this.path + ig.nocache;
            } else {
                ig.addResource(this);
            }
            ig.Image.cache[this.path] = this;
        },
        reload: function() {
            this.loaded = false;
            this.data = new Image();
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + '?' + Date.now();
        },
        onload: function(event) {
            this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = true;
            if (ig.system.scale != 1) {
                this.resize(ig.system.scale);
            }
            if (this.loadCallback) {
                this.loadCallback(this.path, true);
            }
        },
        onerror: function(event) {
            this.failed = true;
            if (this.loadCallback) {
                this.loadCallback(this.path, false);
            }
        },
        resize: function(scale) {
            var origPixels = ig.getImagePixels(this.data, 0, 0, this.width, this.height);
            var widthScaled = this.width * scale;
            var heightScaled = this.height * scale;
            var scaled = ig.$new('canvas');
            scaled.width = widthScaled;
            scaled.height = heightScaled;
            var scaledCtx = scaled.getContext('2d');
            var scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled);
            for (var y = 0; y < heightScaled; y++) {
                for (var x = 0; x < widthScaled; x++) {
                    var index = (Math.floor(y / scale) * this.width + Math.floor(x / scale)) * 4;
                    var indexScaled = (y * widthScaled + x) * 4;
                    scaledPixels.data[indexScaled] = origPixels.data[index];
                    scaledPixels.data[indexScaled + 1] = origPixels.data[index + 1];
                    scaledPixels.data[indexScaled + 2] = origPixels.data[index + 2];
                    scaledPixels.data[indexScaled + 3] = origPixels.data[index + 3];
                }
            }
            scaledCtx.putImageData(scaledPixels, 0, 0);
            this.data = scaled;
        },
        draw: function(targetX, targetY, sourceX, sourceY, width, height) {
            if (!this.loaded) {
                return;
            }
            var scale = ig.system.scale;
            sourceX = sourceX ? sourceX * scale : 0;
            sourceY = sourceY ? sourceY * scale : 0;
            width = (width ? width : this.width) * scale;
            height = (height ? height : this.height) * scale;
            ig.system.context.drawImage(this.data, sourceX, sourceY, width, height, ig.system.getDrawPos(targetX), ig.system.getDrawPos(targetY), width, height);
            ig.Image.drawCount++;
        },
        drawTile: function(targetX, targetY, tile, tileWidth, tileHeight, flipX, flipY) {
            tileHeight = tileHeight ? tileHeight : tileWidth;
            if (!this.loaded || tileWidth > this.width || tileHeight > this.height) {
                return;
            }
            var scale = ig.system.scale;
            var tileWidthScaled = Math.floor(tileWidth * scale);
            var tileHeightScaled = Math.floor(tileHeight * scale);
            var scaleX = flipX ? -1 : 1;
            var scaleY = flipY ? -1 : 1;
            if (flipX || flipY) {
                ig.system.context.save();
                ig.system.context.scale(scaleX, scaleY);
            }
            ig.system.context.drawImage(this.data, (Math.floor(tile * tileWidth) % this.width) * scale, (Math.floor(tile * tileWidth / this.width) * tileHeight) * scale, tileWidthScaled, tileHeightScaled, ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0), ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0), tileWidthScaled, tileHeightScaled);
            if (flipX || flipY) {
                ig.system.context.restore();
            }
            ig.Image.drawCount++;
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function() {
        for (var path in ig.Image.cache) {
            ig.Image.cache[path].reload();
        }
    };
}); // lib/impact/font.js
ig.baked = true;
ig.module('impact.font').requires('impact.image').defines(function() {
    "use strict";
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function(ev) {
            this._loadMetrics(this.data);
            this.parent(ev);
        },
        widthForString: function(text) {
            if (text.indexOf('\n') !== -1) {
                var lines = text.split('\n');
                var width = 0;
                for (var i = 0; i < lines.length; i++) {
                    width = Math.max(width, this._widthForLine(lines[i]));
                }
                return width;
            } else {
                return this._widthForLine(text);
            }
        },
        _widthForLine: function(text) {
            var width = 0;
            for (var i = 0; i < text.length; i++) {
                width += this.widthMap[text.charCodeAt(i) - this.firstChar] + this.letterSpacing;
            }
            return width;
        },
        heightForString: function(text) {
            return text.split('\n').length * (this.height + this.lineSpacing);
        },
        draw: function(text, x, y, align) {
            if (typeof(text) != 'string') {
                text = text.toString();
            }
            if (text.indexOf('\n') !== -1) {
                var lines = text.split('\n');
                var lineHeight = this.height + this.lineSpacing;
                for (var i = 0; i < lines.length; i++) {
                    this.draw(lines[i], x, y + i * lineHeight, align);
                }
                return;
            }
            if (align == ig.Font.ALIGN.RIGHT || align == ig.Font.ALIGN.CENTER) {
                var width = this._widthForLine(text);
                x -= align == ig.Font.ALIGN.CENTER ? width / 2 : width;
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            for (var i = 0; i < text.length; i++) {
                var c = text.charCodeAt(i);
                x += this._drawChar(c - this.firstChar, x, y);
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = 1;
            }
            ig.Image.drawCount += text.length;
        },
        _drawChar: function(c, targetX, targetY) {
            if (!this.loaded || c < 0 || c >= this.indices.length) {
                return 0;
            }
            var scale = ig.system.scale;
            var charX = this.indices[c] * scale;
            var charY = 0;
            var charWidth = this.widthMap[c] * scale;
            var charHeight = (this.height - 2) * scale;
            ig.system.context.drawImage(this.data, charX, charY, charWidth, charHeight, ig.system.getDrawPos(targetX), ig.system.getDrawPos(targetY), charWidth, charHeight);
            return this.widthMap[c] + this.letterSpacing;
        },
        _loadMetrics: function(image) {
            this.height = image.height - 1;
            this.widthMap = [];
            this.indices = [];
            var px = ig.getImagePixels(image, 0, image.height - 1, image.width, 1);
            var currentChar = 0;
            var currentWidth = 0;
            for (var x = 0; x < image.width; x++) {
                var index = x * 4 + 3;
                if (px.data[index] > 127) {
                    currentWidth++;
                } else if (px.data[index] < 128 && currentWidth) {
                    this.widthMap.push(currentWidth);
                    this.indices.push(x - currentWidth);
                    currentChar++;
                    currentWidth = 0;
                }
            }
            this.widthMap.push(currentWidth);
            this.indices.push(x - currentWidth);
        }
    });
    ig.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    };
}); // lib/impact/sound.js
ig.baked = true;
ig.module('impact.sound').defines(function() {
    "use strict";
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function() {
            if (!ig.Sound.enabled || !window.Audio) {
                ig.Sound.enabled = false;
                return;
            }
            var probe = new Audio();
            for (var i = 0; i < ig.Sound.use.length; i++) {
                var format = ig.Sound.use[i];
                if (probe.canPlayType(format.mime)) {
                    this.format = format;
                    break;
                }
            }
            if (!this.format) {
                ig.Sound.enabled = false;
            }
        },
        load: function(path, multiChannel, loadCallback) {
            var realPath = ig.prefix + path.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[path]) {
                if (multiChannel && this.clips[path].length < ig.Sound.channels) {
                    for (var i = this.clips[path].length; i < ig.Sound.channels; i++) {
                        var a = new Audio(realPath);
                        a.load();
                        this.clips[path].push(a);
                    }
                }
                return this.clips[path][0];
            }
            var clip = new Audio(realPath);
            if (loadCallback) {
                clip.addEventListener('canplaythrough', function cb(ev) {
                    clip.removeEventListener('canplaythrough', cb, false);
                    loadCallback(path, true, ev);
                }, false);
                clip.addEventListener('error', function(ev) {
                    loadCallback(path, false, ev);
                }, false);
            }
            clip.preload = 'auto';
            clip.load();
            this.clips[path] = [clip];
            if (multiChannel) {
                for (var i = 1; i < ig.Sound.channels; i++) {
                    var a = new Audio(realPath);
                    a.load();
                    this.clips[path].push(a);
                }
            }
            return clip;
        },
        get: function(path) {
            var channels = this.clips[path];
            for (var i = 0, clip; clip = channels[i++];) {
                if (clip.paused || clip.ended) {
                    if (clip.ended) {
                        clip.currentTime = 0;
                    }
                    return clip;
                }
            }
            channels[0].pause();
            channels[0].currentTime = 0;
            return channels[0];
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: false,
        _volume: 1,
        _loop: false,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function() {
            this._endedCallbackBound = this._endedCallback.bind(this);
            if (Object.defineProperty) {
                Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                });
                Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                });
            } else if (this.__defineGetter__) {
                this.__defineGetter__('volume', this.getVolume.bind(this));
                this.__defineSetter__('volume', this.setVolume.bind(this));
                this.__defineGetter__('loop', this.getLooping.bind(this));
                this.__defineSetter__('loop', this.setLooping.bind(this));
            }
        },
        add: function(music, name) {
            if (!ig.Sound.enabled) {
                return;
            }
            var path = music instanceof ig.Sound ? music.path : music;
            var track = ig.soundManager.load(path, false);
            track.loop = this._loop;
            track.volume = this._volume;
            track.addEventListener('ended', this._endedCallbackBound, false);
            this.tracks.push(track);
            if (name) {
                this.namedTracks[name] = track;
            }
            if (!this.currentTrack) {
                this.currentTrack = track;
            }
        },
        next: function() {
            if (!this.tracks.length) {
                return;
            }
            this.stop();
            this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length;
            this.currentTrack = this.tracks[this.currentIndex];
            this.play();
        },
        pause: function() {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
        },
        stop: function() {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
        },
        play: function(name) {
            if (name && this.namedTracks[name]) {
                var newTrack = this.namedTracks[name];
                if (newTrack != this.currentTrack) {
                    this.stop();
                    this.currentTrack = newTrack;
                }
            } else if (!this.currentTrack) {
                return;
            }
            this.currentTrack.play();
        },
        getLooping: function() {
            return this._loop;
        },
        setLooping: function(l) {
            this._loop = l;
            for (var i in this.tracks) {
                this.tracks[i].loop = l;
            }
        },
        getVolume: function() {
            return this._volume;
        },
        setVolume: function(v) {
            this._volume = v.limit(0, 1);
            for (var i in this.tracks) {
                this.tracks[i].volume = this._volume;
            }
        },
        fadeOut: function(time) {
            if (!this.currentTrack) {
                return;
            }
            clearInterval(this._fadeInterval);
            this.fadeTimer = new ig.Timer(time);
            this._fadeInterval = setInterval(this._fadeStep.bind(this), 50);
        },
        _fadeStep: function() {
            var v = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            if (v <= 0.01) {
                this.stop();
                this.currentTrack.volume = this._volume;
                clearInterval(this._fadeInterval);
            } else {
                this.currentTrack.volume = v;
            }
        },
        _endedCallback: function() {
            if (this._loop) {
                this.play();
            } else {
                this.next();
            }
        }
    });
    ig.Sound = ig.Class.extend({
        path: '',
        volume: 1,
        currentClip: null,
        multiChannel: true,
        init: function(path, multiChannel) {
            this.path = path;
            this.multiChannel = (multiChannel !== false);
            this.load();
        },
        load: function(loadCallback) {
            if (!ig.Sound.enabled) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            }
            if (ig.ready) {
                ig.soundManager.load(this.path, this.multiChannel, loadCallback);
            } else {
                ig.addResource(this);
            }
        },
        play: function() {
            if (!ig.Sound.enabled) {
                return;
            }
            this.currentClip = ig.soundManager.get(this.path);
            this.currentClip.volume = ig.soundManager.volume * this.volume;
            this.currentClip.play();
        },
        stop: function() {
            if (this.currentClip) {
                this.currentClip.pause();
                this.currentClip.currentTime = 0;
            }
        }
    });
    ig.Sound.FORMAT = {
        MP3: {
            ext: 'mp3',
            mime: 'audio/mpeg'
        },
        M4A: {
            ext: 'm4a',
            mime: 'audio/mp4; codecs=mp4a'
        },
        OGG: {
            ext: 'ogg',
            mime: 'audio/ogg; codecs=vorbis'
        },
        WEBM: {
            ext: 'webm',
            mime: 'audio/webm; codecs=vorbis'
        },
        CAF: {
            ext: 'caf',
            mime: 'audio/x-caf'
        }
    };
    ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
    ig.Sound.channels = 4;
    ig.Sound.enabled = true;
}); // lib/impact/loader.js
ig.baked = true;
ig.module('impact.loader').requires('impact.image', 'impact.font', 'impact.sound').defines(function() {
    "use strict";
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: false,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function(gameClass, resources) {
            this.gameClass = gameClass;
            this.resources = resources;
            for (var i = 0; i < this.resources.length; i++) {
                var tmpPath = this.resources[i].path;
                this.resources[i].path = tmpPath.replace("replaceforlang", ig.global.userLang);
            }
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var i = 0; i < this.resources.length; i++) {
                this._unloaded.push(this.resources[i].path);
            }
        },
        load: function() {
            ig.system.clear('#000');
            if (!this.resources.length) {
                this.end();
                return;
            }
            for (var i = 0; i < this.resources.length; i++) {
                this.loadResource(this.resources[i]);
            }
            this._intervalId = setInterval(this.draw.bind(this), 16);
        },
        loadResource: function(res) {
            res.load(this._loadCallbackBound);
        },
        end: function() {
            if (this.done) {
                return;
            }
            this.done = true;
            clearInterval(this._intervalId);
            ig.system.setGame(this.gameClass);
        },
        draw: function() {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var s = ig.system.scale;
            var w = ig.system.width * 0.6;
            var h = ig.system.height * 0.1;
            var x = ig.system.width * 0.5 - w / 2;
            var y = ig.system.height * 0.5 - h / 2;
            ig.system.context.fillStyle = '#000';
            ig.system.context.fillRect(0, 0, 480, 320);
            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect(x * s, y * s, w * s, h * s);
            ig.system.context.fillStyle = '#000';
            ig.system.context.fillRect(x * s + s, y * s + s, w * s - s - s, h * s - s - s);
            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect(x * s, y * s, w * s * this._drawStatus, h * s);
        },
        _loadCallback: function(path, status) {
            if (status) {
                this._unloaded.erase(path);
            } else {
                throw ('Failed to load resource: ' + path);
            }
            this.status = 1 - (this._unloaded.length / this.resources.length);
            if (this._unloaded.length == 0) {
                setTimeout(this.end.bind(this), 250);
            }
        }
    });
}); // lib/impact/timer.js
ig.baked = true;
ig.module('impact.timer').defines(function() {
    "use strict";
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function(seconds) {
            this.base = ig.Timer.time;
            this.last = ig.Timer.time;
            this.target = seconds || 0;
        },
        set: function(seconds) {
            this.target = seconds || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0;
        },
        reset: function() {
            this.base = ig.Timer.time;
            this.pausedAt = 0;
        },
        tick: function() {
            var delta = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return (this.pausedAt ? 0 : delta);
        },
        delta: function() {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target;
        },
        pause: function() {
            if (!this.pausedAt) {
                this.pausedAt = ig.Timer.time;
            }
        },
        unpause: function() {
            if (this.pausedAt) {
                this.base += ig.Timer.time - this.pausedAt;
                this.pausedAt = 0;
            }
        }
    });
    ig.Timer._last = 0;
    ig.Timer.time = Number.MIN_VALUE;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function() {
        var current = Date.now();
        var delta = (current - ig.Timer._last) / 1000;
        ig.Timer.time += Math.min(delta, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = current;
    };
}); // lib/impact/system.js
ig.baked = true;
ig.module('impact.system').requires('impact.timer', 'impact.image').defines(function() {
    "use strict";
    ig.System = ig.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        animationId: 0,
        newGameClass: null,
        running: false,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function(canvasId, fps, width, height, scale) {
            this.fps = fps;
            this.clock = new ig.Timer();
            this.canvas = ig.$(canvasId);
            this.resize(width, height, scale);
            this.context = this.canvas.getContext('2d');
            this.getDrawPos = ig.System.drawMode;
            if (this.scale != 1) {
                ig.System.scaleMode = ig.System.SCALE.CRISP;
            }
            ig.System.scaleMode(this.canvas, this.context);
        },
        resize: function(width, height, scale) {
            this.width = width;
            this.height = height;
            this.scale = scale || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight;
        },
        setGame: function(gameClass) {
            if (this.running) {
                this.newGameClass = gameClass;
            } else {
                this.setGameNow(gameClass);
            }
        },
        setGameNow: function(gameClass) {
            ig.game = new(gameClass)();
            ig.system.setDelegate(ig.game);
        },
        setDelegate: function(object) {
            if (typeof(object.run) == 'function') {
                this.delegate = object;
                this.startRunLoop();
            } else {
                throw ('System.setDelegate: No run() function in object');
            }
        },
        stopRunLoop: function() {
            ig.clearAnimation(this.animationId);
            this.running = false;
        },
        startRunLoop: function() {
            this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = true;
        },
        clear: function(color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight);
        },
        run: function() {
            ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            if (this.newGameClass) {
                this.setGameNow(this.newGameClass);
                this.newGameClass = null;
            }
        },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function(p) {
            return Math.round(p) * this.scale;
        },
        SMOOTH: function(p) {
            return Math.round(p * this.scale);
        },
        SUBPIXEL: function(p) {
            return p * this.scale;
        }
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.System.SCALE = {
        CRISP: function(canvas, context) {
            ig.setVendorAttribute(context, 'imageSmoothingEnabled', false);
            canvas.style.imageRendering = '-moz-crisp-edges';
            canvas.style.imageRendering = '-o-crisp-edges';
            canvas.style.imageRendering = '-webkit-optimize-contrast';
            canvas.style.imageRendering = 'crisp-edges';
            canvas.style.msInterpolationMode = 'nearest-neighbor';
        },
        SMOOTH: function(canvas, context) {
            ig.setVendorAttribute(context, 'imageSmoothingEnabled', true);
            canvas.style.imageRendering = '';
            canvas.style.msInterpolationMode = '';
        }
    };
    ig.System.scaleMode = ig.System.SCALE.SMOOTH;
}); // lib/impact/input.js
ig.baked = true;
ig.module('impact.input').defines(function() {
    "use strict";
    ig.KEY = {
        'MOUSE1': -1,
        'MOUSE2': -3,
        'MWHEEL_UP': -4,
        'MWHEEL_DOWN': -5,
        'BACKSPACE': 8,
        'TAB': 9,
        'ENTER': 13,
        'PAUSE': 19,
        'CAPS': 20,
        'ESC': 27,
        'SPACE': 32,
        'PAGE_UP': 33,
        'PAGE_DOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT_ARROW': 37,
        'UP_ARROW': 38,
        'RIGHT_ARROW': 39,
        'DOWN_ARROW': 40,
        'INSERT': 45,
        'DELETE': 46,
        '_0': 48,
        '_1': 49,
        '_2': 50,
        '_3': 51,
        '_4': 52,
        '_5': 53,
        '_6': 54,
        '_7': 55,
        '_8': 56,
        '_9': 57,
        'A': 65,
        'B': 66,
        'C': 67,
        'D': 68,
        'E': 69,
        'F': 70,
        'G': 71,
        'H': 72,
        'I': 73,
        'J': 74,
        'K': 75,
        'L': 76,
        'M': 77,
        'N': 78,
        'O': 79,
        'P': 80,
        'Q': 81,
        'R': 82,
        'S': 83,
        'T': 84,
        'U': 85,
        'V': 86,
        'W': 87,
        'X': 88,
        'Y': 89,
        'Z': 90,
        'NUMPAD_0': 96,
        'NUMPAD_1': 97,
        'NUMPAD_2': 98,
        'NUMPAD_3': 99,
        'NUMPAD_4': 100,
        'NUMPAD_5': 101,
        'NUMPAD_6': 102,
        'NUMPAD_7': 103,
        'NUMPAD_8': 104,
        'NUMPAD_9': 105,
        'MULTIPLY': 106,
        'ADD': 107,
        'SUBSTRACT': 109,
        'DECIMAL': 110,
        'DIVIDE': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'SHIFT': 16,
        'CTRL': 17,
        'ALT': 18,
        'PLUS': 187,
        'COMMA': 188,
        'MINUS': 189,
        'PERIOD': 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: false,
        isUsingKeyboard: false,
        isUsingAccelerometer: false,
        mouse: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0,
            z: 0
        },
        initMouse: function() {
            if (this.isUsingMouse) {
                return;
            }
            this.isUsingMouse = true;
            var mouseWheelBound = this.mousewheel.bind(this);
            ig.system.canvas.addEventListener('mousewheel', mouseWheelBound, false);
            ig.system.canvas.addEventListener('DOMMouseScroll', mouseWheelBound, false);
            ig.system.canvas.addEventListener('contextmenu', this.contextmenu.bind(this), false);
            ig.system.canvas.addEventListener('mousedown', this.keydown.bind(this), false);
            ig.system.canvas.addEventListener('mouseup', this.keyup.bind(this), false);
            ig.system.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
            if (ig.ua.touchDevice) {
                ig.system.canvas.addEventListener('touchstart', this.keydown.bind(this), false);
                ig.system.canvas.addEventListener('touchend', this.keyup.bind(this), false);
                ig.system.canvas.addEventListener('touchmove', this.mousemove.bind(this), false);
                ig.system.canvas.addEventListener('MSPointerDown', this.keydown.bind(this), false);
                ig.system.canvas.addEventListener('MSPointerUp', this.keyup.bind(this), false);
                ig.system.canvas.addEventListener('MSPointerMove', this.mousemove.bind(this), false);
                ig.system.canvas.style.msTouchAction = 'none';
            }
        },
        initKeyboard: function() {
            if (this.isUsingKeyboard) {
                return;
            }
            this.isUsingKeyboard = true;
            window.addEventListener('keydown', this.keydown.bind(this), false);
            window.addEventListener('keyup', this.keyup.bind(this), false);
        },
        initAccelerometer: function() {
            if (this.isUsingAccelerometer) {
                return;
            }
            window.addEventListener('devicemotion', this.devicemotion.bind(this), false);
        },
        mousewheel: function(event) {
            var delta = event.wheelDelta ? event.wheelDelta : (event.detail * -1);
            var code = delta > 0 ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN;
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                this.presses[action] = true;
                this.delayedKeyup[action] = true;
                event.stopPropagation();
                event.preventDefault();
            }
        },
        mousemove: function(event) {
            var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
            var scale = ig.system.scale * (internalWidth / ig.system.realWidth);
            var pos = {
                left: 0,
                top: 0
            };
            if (ig.system.canvas.getBoundingClientRect) {
                pos = ig.system.canvas.getBoundingClientRect();
            }
            var ev = event.touches ? event.touches[0] : event;
            this.mouse.x = (ev.clientX - pos.left) / scale;
            this.mouse.y = (ev.clientY - pos.top) / scale;
        },
        contextmenu: function(event) {
            if (this.bindings[ig.KEY.MOUSE2]) {
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keydown: function(event) {
            var tag = event.target.tagName;
            if (tag == 'INPUT' || tag == 'TEXTAREA') {
                return;
            }
            var code = event.type == 'keydown' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
            if (event.type == 'touchstart' || event.type == 'mousedown') {
                this.mousemove(event);
            }
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                if (!this.locks[action]) {
                    this.presses[action] = true;
                    this.locks[action] = true;
                }
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keyup: function(event) {
            var tag = event.target.tagName;
            if (tag == 'INPUT' || tag == 'TEXTAREA') {
                return;
            }
            var code = event.type == 'keyup' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
            var action = this.bindings[code];
            if (action) {
                this.delayedKeyup[action] = true;
                event.stopPropagation();
                event.preventDefault();
            }
        },
        devicemotion: function(event) {
            this.accel = event.accelerationIncludingGravity;
        },
        bind: function(key, action) {
            if (key < 0) {
                this.initMouse();
            } else if (key > 0) {
                this.initKeyboard();
            }
            this.bindings[key] = action;
        },
        bindTouch: function(selector, action) {
            var element = ig.$(selector);
            var that = this;
            element.addEventListener('touchstart', function(ev) {
                that.touchStart(ev, action);
            }, false);
            element.addEventListener('touchend', function(ev) {
                that.touchEnd(ev, action);
            }, false);
            element.addEventListener('MSPointerDown', function(ev) {
                that.touchStart(ev, action);
            }, false);
            element.addEventListener('MSPointerUp', function(ev) {
                that.touchEnd(ev, action);
            }, false);
        },
        unbind: function(key) {
            var action = this.bindings[key];
            this.delayedKeyup[action] = true;
            this.bindings[key] = null;
        },
        unbindAll: function() {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {};
        },
        state: function(action) {
            return this.actions[action];
        },
        pressed: function(action) {
            return this.presses[action];
        },
        released: function(action) {
            return !!this.delayedKeyup[action];
        },
        clearPressed: function() {
            for (var action in this.delayedKeyup) {
                this.actions[action] = false;
                this.locks[action] = false;
            }
            this.delayedKeyup = {};
            this.presses = {};
        },
        touchStart: function(event, action) {
            this.actions[action] = true;
            this.presses[action] = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
        },
        touchEnd: function(event, action) {
            this.delayedKeyup[action] = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    });
}); // lib/impact/impact.js
ig.baked = true;
ig.module('impact.impact').requires('dom.ready', 'impact.loader', 'impact.system', 'impact.input', 'impact.sound').defines(function() {
    "use strict";
    ig.main = function(canvasId, gameClass, fps, width, height, scale, loaderClass) {
        ig.system = new ig.System(canvasId, fps, width, height, scale || 1);
        ig.input = new ig.Input();
        ig.soundManager = new ig.SoundManager();
        ig.music = new ig.Music();
        ig.ready = true;
        var loader = new(loaderClass || ig.Loader)(gameClass, ig.resources);
        loader.load();
    };
});
var frameCount = 0;
var allFPS = 0;
var showFPS = 0;
var averageFPS = 0;
var levels = [];
var currenLevel = 1;

function randomizer(min, max, round) {
    if (round == false) {
        return (Math.random() * (max - min) + min);
    } else return Math.floor(Math.random() * (max - min) + min);
};

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function gotoGame() {
    ig.system.setGame(MyGame);
}

function gotoIntro() {
    ig.system.setGame(Home);
}

function gotoFinish() {
    ig.system.setGame(Greatings);
}

function springMovement(body, aimX, aimY, friction, speedratio) {
    if (typeof(friction) === 'undefined') friction = 0.75;
    if (typeof(speedratio) === 'undefined') speedratio = 7;
    body.speedMoveX = body.speedMoveX * friction + (aimX - body.pos.x) * speedratio / 100;
    body.speedMoveY = body.speedMoveY * friction + (aimY - body.pos.y) * speedratio / 100;
    body.pos.x += body.speedMoveX;
    body.pos.y += body.speedMoveY;
}

function gameOrientationFunction() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
        if (window.orientation == 0 || window.orientation == 180) {
            ig.global.changeOrient = 0;
        } else if (window.orientation == 90 || window.orientation == -90) {
            ig.global.changeOrient = 1;
        }
    } else {
        if (window.orientation == 90 || window.orientation == -90) {
            ig.global.changeOrient = 1;
        } else if (window.orientation == 0 || window.orientation == 180) {
            ig.global.changeOrient = 0;
        }
    }
    gameScreenResized();
}

function gameScreenResized() {
        scale = (window.innerWidth < 600) ? 2 : 1;
        if (!ig.system) {
            return;
        }
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ig.system.resize(window.innerWidth * scale, window.innerHeight * scale);
        if (ig.game && ig.game.setupCamera) {
            ig.game.setupCamera();
        }
        if (window.myTouchButtons) {
            for (var i = 0; i < window.myTouchButtons.buttons.length; i++) {
                curButton = window.myTouchButtons.buttons[i];
                if (curButton.action == 'left' || curButton.action == 'right') {
                    curButton.size.x = (window.innerWidth * ig.ua.pixelRatio) / 2;
                    curButton.size.y = (window.innerHeight * ig.ua.pixelRatio) - window.innerHeight / 5;
                }
            }
            window.myTouchButtons.align();
        }
        if (window.myTouchButtonsMenu) {
            window.myTouchButtonsMenu.align();
        }
    }
    // lib/impact/animation.js
ig.baked = true;
ig.module('impact.animation').requires('impact.timer', 'impact.image').defines(function() {
    "use strict";
    ig.AnimationSheet = ig.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function(path, width, height) {
            this.width = width;
            this.height = height;
            this.image = new ig.Image(path);
        }
    });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: false,
            y: false
        },
        pivot: {
            x: 0,
            y: 0
        },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        init: function(sheet, frameTime, sequence, stop) {
            this.sheet = sheet;
            this.pivot = {
                x: sheet.width / 2,
                y: sheet.height / 2
            };
            this.timer = new ig.Timer();
            this.frameTime = frameTime;
            this.sequence = sequence;
            this.stop = !!stop;
            this.tile = this.sequence[0];
        },
        rewind: function() {
            this.timer.set();
            this.loopCount = 0;
            this.frame = 0;
            this.tile = this.sequence[0];
            return this;
        },
        gotoFrame: function(f) {
            this.timer.set(this.frameTime * -f - 0.0001);
            this.update();
        },
        gotoRandomFrame: function() {
            this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
        },
        update: function() {
            var frameTotal = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(frameTotal / this.sequence.length);
            if (this.stop && this.loopCount > 0) {
                this.frame = this.sequence.length - 1;
            } else {
                this.frame = frameTotal % this.sequence.length;
            }
            this.tile = this.sequence[this.frame];
        },
        draw: function(targetX, targetY) {
            var bbsize = Math.max(this.sheet.width, this.sheet.height);
            if (targetX > ig.system.width || targetY > ig.system.height || targetX + bbsize < 0 || targetY + bbsize < 0) {
                return;
            }
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            if (this.angle == 0) {
                this.sheet.image.drawTile(targetX, targetY, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
            } else {
                ig.system.context.save();
                ig.system.context.translate(ig.system.getDrawPos(targetX + this.pivot.x), ig.system.getDrawPos(targetY + this.pivot.y));
                ig.system.context.rotate(this.angle);
                this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
                ig.system.context.restore();
            }
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = 1;
            }
        }
    });
}); // lib/impact/entity.js
ig.baked = true;
ig.module('impact.entity').requires('impact.animation', 'impact.impact').defines(function() {
    "use strict";
    ig.Entity = ig.Class.extend({
        id: 0,
        settings: {},
        size: {
            x: 16,
            y: 16
        },
        offset: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        last: {
            x: 0,
            y: 0
        },
        vel: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 100,
            y: 100
        },
        zIndex: 0,
        gravityFactor: 1,
        standing: false,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: false,
        slopeStanding: {
            min: (44).toRad(),
            max: (136).toRad()
        },
        init: function(x, y, settings) {
            this.id = ++ig.Entity._lastId;
            this.pos.x = this.last.x = x;
            this.pos.y = this.last.y = y;
            ig.merge(this, settings);
        },
        reset: function(x, y, settings) {
            var proto = this.constructor.prototype;
            this.pos.x = x;
            this.pos.y = y;
            this.last.x = x;
            this.last.y = y;
            this.vel.x = proto.vel.x;
            this.vel.y = proto.vel.y;
            this.accel.x = proto.accel.x;
            this.accel.y = proto.accel.y;
            this.health = proto.health;
            this._killed = proto._killed;
            this.standing = proto.standing;
            this.type = proto.type;
            this.checkAgainst = proto.checkAgainst;
            this.collides = proto.collides;
            ig.merge(this, settings);
        },
        addAnim: function(name, frameTime, sequence, stop) {
            if (!this.animSheet) {
                throw ('No animSheet to add the animation ' + name + ' to.');
            }
            var a = new ig.Animation(this.animSheet, frameTime, sequence, stop);
            this.anims[name] = a;
            if (!this.currentAnim) {
                this.currentAnim = a;
            }
            return a;
        },
        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var mx = this.vel.x * ig.system.tick;
            var my = this.vel.y * ig.system.tick;
            var res = ig.game.collisionMap.trace(this.pos.x, this.pos.y, mx, my, this.size.x, this.size.y);
            this.handleMovementTrace(res);
            if (this.currentAnim) {
                this.currentAnim.update();
            }
        },
        getNewVelocity: function(vel, accel, friction, max) {
            if (accel) {
                return (vel + accel * ig.system.tick).limit(-max, max);
            } else if (friction) {
                var delta = friction * ig.system.tick;
                if (vel - delta > 0) {
                    return vel - delta;
                } else if (vel + delta < 0) {
                    return vel + delta;
                } else {
                    return 0;
                }
            }
            return vel.limit(-max, max);
        },
        handleMovementTrace: function(res) {
            this.standing = false;
            if (res.collision.y) {
                if (this.bounciness > 0 && Math.abs(this.vel.y) > this.minBounceVelocity) {
                    this.vel.y *= -this.bounciness;
                } else {
                    if (this.vel.y > 0) {
                        this.standing = true;
                    }
                    this.vel.y = 0;
                }
            }
            if (res.collision.x) {
                if (this.bounciness > 0 && Math.abs(this.vel.x) > this.minBounceVelocity) {
                    this.vel.x *= -this.bounciness;
                } else {
                    this.vel.x = 0;
                }
            }
            if (res.collision.slope) {
                var s = res.collision.slope;
                if (this.bounciness > 0) {
                    var proj = this.vel.x * s.nx + this.vel.y * s.ny;
                    this.vel.x = (this.vel.x - s.nx * proj * 2) * this.bounciness;
                    this.vel.y = (this.vel.y - s.ny * proj * 2) * this.bounciness;
                } else {
                    var lengthSquared = s.x * s.x + s.y * s.y;
                    var dot = (this.vel.x * s.x + this.vel.y * s.y) / lengthSquared;
                    this.vel.x = s.x * dot;
                    this.vel.y = s.y * dot;
                    var angle = Math.atan2(s.x, s.y);
                    if (angle > this.slopeStanding.min && angle < this.slopeStanding.max) {
                        this.standing = true;
                    }
                }
            }
            this.pos = res.pos;
        },
        draw: function() {
            if (this.currentAnim) {
                this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y);
            }
        },
        kill: function() {
            ig.game.removeEntity(this);
        },
        receiveDamage: function(amount, from) {
            this.health -= amount;
            if (this.health <= 0) {
                this.kill();
            }
        },
        touches: function(other) {
            return !(this.pos.x >= other.pos.x + other.size.x || this.pos.x + this.size.x <= other.pos.x || this.pos.y >= other.pos.y + other.size.y || this.pos.y + this.size.y <= other.pos.y);
        },
        distanceTo: function(other) {
            var xd = (this.pos.x + this.size.x / 2) - (other.pos.x + other.size.x / 2);
            var yd = (this.pos.y + this.size.y / 2) - (other.pos.y + other.size.y / 2);
            return Math.sqrt(xd * xd + yd * yd);
        },
        angleTo: function(other) {
            return Math.atan2((other.pos.y + other.size.y / 2) - (this.pos.y + this.size.y / 2), (other.pos.x + other.size.x / 2) - (this.pos.x + this.size.x / 2));
        },
        check: function(other) {},
        collideWith: function(other, axis) {},
        ready: function() {},
        erase: function() {}
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = {
        NEVER: 0,
        LITE: 1,
        PASSIVE: 2,
        ACTIVE: 4,
        FIXED: 8
    };
    ig.Entity.TYPE = {
        NONE: 0,
        A: 1,
        B: 2,
        BOTH: 3
    };
    ig.Entity.checkPair = function(a, b) {
        if (a.checkAgainst & b.type) {
            a.check(b);
        }
        if (b.checkAgainst & a.type) {
            b.check(a);
        }
        if (a.collides && b.collides && a.collides + b.collides > ig.Entity.COLLIDES.ACTIVE) {
            ig.Entity.solveCollision(a, b);
        }
    };
    ig.Entity.solveCollision = function(a, b) {
        var weak = null;
        if (a.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) {
            weak = a;
        } else if (b.collides == ig.Entity.COLLIDES.LITE || a.collides == ig.Entity.COLLIDES.FIXED) {
            weak = b;
        }
        if (a.last.x + a.size.x > b.last.x && a.last.x < b.last.x + b.size.x) {
            if (a.last.y < b.last.y) {
                ig.Entity.seperateOnYAxis(a, b, weak);
            } else {
                ig.Entity.seperateOnYAxis(b, a, weak);
            }
            a.collideWith(b, 'y');
            b.collideWith(a, 'y');
        } else if (a.last.y + a.size.y > b.last.y && a.last.y < b.last.y + b.size.y) {
            if (a.last.x < b.last.x) {
                ig.Entity.seperateOnXAxis(a, b, weak);
            } else {
                ig.Entity.seperateOnXAxis(b, a, weak);
            }
            a.collideWith(b, 'x');
            b.collideWith(a, 'x');
        }
    };
    ig.Entity.seperateOnXAxis = function(left, right, weak) {
        var nudge = (left.pos.x + left.size.x - right.pos.x);
        if (weak) {
            var strong = left === weak ? right : left;
            weak.vel.x = -weak.vel.x * weak.bounciness + strong.vel.x;
            var resWeak = ig.game.collisionMap.trace(weak.pos.x, weak.pos.y, weak == left ? -nudge : nudge, 0, weak.size.x, weak.size.y);
            weak.pos.x = resWeak.pos.x;
        } else {
            var v2 = (left.vel.x - right.vel.x) / 2;
            left.vel.x = -v2;
            right.vel.x = v2;
            var resLeft = ig.game.collisionMap.trace(left.pos.x, left.pos.y, -nudge / 2, 0, left.size.x, left.size.y);
            left.pos.x = Math.floor(resLeft.pos.x);
            var resRight = ig.game.collisionMap.trace(right.pos.x, right.pos.y, nudge / 2, 0, right.size.x, right.size.y);
            right.pos.x = Math.ceil(resRight.pos.x);
        }
    };
    ig.Entity.seperateOnYAxis = function(top, bottom, weak) {
        var nudge = (top.pos.y + top.size.y - bottom.pos.y);
        if (weak) {
            var strong = top === weak ? bottom : top;
            weak.vel.y = -weak.vel.y * weak.bounciness + strong.vel.y;
            var nudgeX = 0;
            if (weak == top && Math.abs(weak.vel.y - strong.vel.y) < weak.minBounceVelocity) {
                weak.standing = true;
                nudgeX = strong.vel.x * ig.system.tick;
            }
            var resWeak = ig.game.collisionMap.trace(weak.pos.x, weak.pos.y, nudgeX, weak == top ? -nudge : nudge, weak.size.x, weak.size.y);
            weak.pos.y = resWeak.pos.y;
            weak.pos.x = resWeak.pos.x;
        } else if (ig.game.gravity && (bottom.standing || top.vel.y > 0)) {
            var resTop = ig.game.collisionMap.trace(top.pos.x, top.pos.y, 0, -(top.pos.y + top.size.y - bottom.pos.y), top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            if (top.bounciness > 0 && top.vel.y > top.minBounceVelocity) {
                top.vel.y *= -top.bounciness;
            } else {
                top.standing = true;
                top.vel.y = 0;
            }
        } else {
            var v2 = (top.vel.y - bottom.vel.y) / 2;
            top.vel.y = -v2;
            bottom.vel.y = v2;
            var nudgeX = bottom.vel.x * ig.system.tick;
            var resTop = ig.game.collisionMap.trace(top.pos.x, top.pos.y, nudgeX, -nudge / 2, top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            var resBottom = ig.game.collisionMap.trace(bottom.pos.x, bottom.pos.y, 0, nudge / 2, bottom.size.x, bottom.size.y);
            bottom.pos.y = resBottom.pos.y;
        }
    };
}); // lib/impact/map.js
ig.baked = true;
ig.module('impact.map').defines(function() {
    "use strict";
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function(tilesize, data) {
            this.tilesize = tilesize;
            this.data = data;
            this.height = data.length;
            this.width = data[0].length;
            this.pxWidth = this.width * this.tilesize;
            this.pxHeight = this.height * this.tilesize;
        },
        getTile: function(x, y) {
            var tx = Math.floor(x / this.tilesize);
            var ty = Math.floor(y / this.tilesize);
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                return this.data[ty][tx];
            } else {
                return 0;
            }
        },
        setTile: function(x, y, tile) {
            var tx = Math.floor(x / this.tilesize);
            var ty = Math.floor(y / this.tilesize);
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                this.data[ty][tx] = tile;
            }
        }
    });
}); // lib/impact/collision-map.js
ig.baked = true;
ig.module('impact.collision-map').requires('impact.map').defines(function() {
    "use strict";
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function(tilesize, data, tiledef) {
            this.parent(tilesize, data);
            this.tiledef = tiledef || ig.CollisionMap.defaultTileDef;
            for (var t in this.tiledef) {
                if (t | 0 > this.lastSlope) {
                    this.lastSlope = t | 0;
                }
            }
        },
        trace: function(x, y, vx, vy, objectWidth, objectHeight) {
            var res = {
                collision: {
                    x: false,
                    y: false,
                    slope: false
                },
                pos: {
                    x: x,
                    y: y
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
            var steps = Math.ceil(Math.max(Math.abs(vx), Math.abs(vy)) / this.tilesize);
            if (steps > 1) {
                var sx = vx / steps;
                var sy = vy / steps;
                for (var i = 0; i < steps && (sx || sy); i++) {
                    this._traceStep(res, x, y, sx, sy, objectWidth, objectHeight, vx, vy, i);
                    x = res.pos.x;
                    y = res.pos.y;
                    if (res.collision.x) {
                        sx = 0;
                        vx = 0;
                    }
                    if (res.collision.y) {
                        sy = 0;
                        vy = 0;
                    }
                    if (res.collision.slope) {
                        break;
                    }
                }
            } else {
                this._traceStep(res, x, y, vx, vy, objectWidth, objectHeight, vx, vy, 0);
            }
            return res;
        },
        _traceStep: function(res, x, y, vx, vy, width, height, rvx, rvy, step) {
            res.pos.x += vx;
            res.pos.y += vy;
            var t = 0;
            if (vx) {
                var pxOffsetX = (vx > 0 ? width : 0);
                var tileOffsetX = (vx < 0 ? this.tilesize : 0);
                var firstTileY = Math.max(Math.floor(y / this.tilesize), 0);
                var lastTileY = Math.min(Math.ceil((y + height) / this.tilesize), this.height);
                var tileX = Math.floor((res.pos.x + pxOffsetX) / this.tilesize);
                var prevTileX = Math.floor((x + pxOffsetX) / this.tilesize);
                if (step > 0 || tileX == prevTileX || prevTileX < 0 || prevTileX >= this.width) {
                    prevTileX = -1;
                }
                if (tileX >= 0 && tileX < this.width) {
                    for (var tileY = firstTileY; tileY < lastTileY; tileY++) {
                        if (prevTileX != -1) {
                            t = this.data[tileY][prevTileX];
                            if (t > 1 && t <= this.lastSlope && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, prevTileX, tileY)) {
                                break;
                            }
                        }
                        t = this.data[tileY][tileX];
                        if (t == 1 || t > this.lastSlope || (t > 1 && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, tileY))) {
                            if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                                break;
                            }
                            res.collision.x = true;
                            res.tile.x = t;
                            x = res.pos.x = tileX * this.tilesize - pxOffsetX + tileOffsetX;
                            rvx = 0;
                            break;
                        }
                    }
                }
            }
            if (vy) {
                var pxOffsetY = (vy > 0 ? height : 0);
                var tileOffsetY = (vy < 0 ? this.tilesize : 0);
                var firstTileX = Math.max(Math.floor(res.pos.x / this.tilesize), 0);
                var lastTileX = Math.min(Math.ceil((res.pos.x + width) / this.tilesize), this.width);
                var tileY = Math.floor((res.pos.y + pxOffsetY) / this.tilesize);
                var prevTileY = Math.floor((y + pxOffsetY) / this.tilesize);
                if (step > 0 || tileY == prevTileY || prevTileY < 0 || prevTileY >= this.height) {
                    prevTileY = -1;
                }
                if (tileY >= 0 && tileY < this.height) {
                    for (var tileX = firstTileX; tileX < lastTileX; tileX++) {
                        if (prevTileY != -1) {
                            t = this.data[prevTileY][tileX];
                            if (t > 1 && t <= this.lastSlope && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, prevTileY)) {
                                break;
                            }
                        }
                        t = this.data[tileY][tileX];
                        if (t == 1 || t > this.lastSlope || (t > 1 && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, tileY))) {
                            if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                                break;
                            }
                            res.collision.y = true;
                            res.tile.y = t;
                            res.pos.y = tileY * this.tilesize - pxOffsetY + tileOffsetY;
                            break;
                        }
                    }
                }
            }
        },
        _checkTileDef: function(res, t, x, y, vx, vy, width, height, tileX, tileY) {
            var def = this.tiledef[t];
            if (!def) {
                return false;
            }
            var lx = (tileX + def[0]) * this.tilesize,
                ly = (tileY + def[1]) * this.tilesize,
                lvx = (def[2] - def[0]) * this.tilesize,
                lvy = (def[3] - def[1]) * this.tilesize,
                solid = def[4];
            var tx = x + vx + (lvy < 0 ? width : 0) - lx,
                ty = y + vy + (lvx > 0 ? height : 0) - ly;
            if (lvx * ty - lvy * tx > 0) {
                if (vx * -lvy + vy * lvx < 0) {
                    return solid;
                }
                var length = Math.sqrt(lvx * lvx + lvy * lvy);
                var nx = lvy / length,
                    ny = -lvx / length;
                var proj = tx * nx + ty * ny;
                var px = nx * proj,
                    py = ny * proj;
                if (px * px + py * py >= vx * vx + vy * vy) {
                    return solid || (lvx * (ty - vy) - lvy * (tx - vx) < 0.5);
                }
                res.pos.x = x + vx - px;
                res.pos.y = y + vy - py;
                res.collision.slope = {
                    x: lvx,
                    y: lvy,
                    nx: nx,
                    ny: ny
                };
                return true;
            }
            return false;
        }
    });
    var H = 1 / 2,
        N = 1 / 3,
        M = 2 / 3,
        SOLID = true,
        NON_SOLID = false;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, M, SOLID],
        6: [0, M, 1, N, SOLID],
        7: [0, N, 1, 0, SOLID],
        3: [0, 1, 1, H, SOLID],
        4: [0, H, 1, 0, SOLID],
        2: [0, 1, 1, 0, SOLID],
        10: [H, 1, 1, 0, SOLID],
        21: [0, 1, H, 0, SOLID],
        32: [M, 1, 1, 0, SOLID],
        43: [N, 1, M, 0, SOLID],
        54: [0, 1, N, 0, SOLID],
        27: [0, 0, 1, N, SOLID],
        28: [0, N, 1, M, SOLID],
        29: [0, M, 1, 1, SOLID],
        25: [0, 0, 1, H, SOLID],
        26: [0, H, 1, 1, SOLID],
        24: [0, 0, 1, 1, SOLID],
        11: [0, 0, H, 1, SOLID],
        22: [H, 0, 1, 1, SOLID],
        33: [0, 0, N, 1, SOLID],
        44: [N, 0, M, 1, SOLID],
        55: [M, 0, 1, 1, SOLID],
        16: [1, N, 0, 0, SOLID],
        17: [1, M, 0, N, SOLID],
        18: [1, 1, 0, M, SOLID],
        14: [1, H, 0, 0, SOLID],
        15: [1, 1, 0, H, SOLID],
        13: [1, 1, 0, 0, SOLID],
        8: [H, 1, 0, 0, SOLID],
        19: [1, 1, H, 0, SOLID],
        30: [N, 1, 0, 0, SOLID],
        41: [M, 1, N, 0, SOLID],
        52: [1, 1, M, 0, SOLID],
        38: [1, M, 0, 1, SOLID],
        39: [1, N, 0, M, SOLID],
        40: [1, 0, 0, N, SOLID],
        36: [1, H, 0, 1, SOLID],
        37: [1, 0, 0, H, SOLID],
        35: [1, 0, 0, 1, SOLID],
        9: [1, 0, H, 1, SOLID],
        20: [H, 0, 0, 1, SOLID],
        31: [1, 0, M, 1, SOLID],
        42: [M, 0, N, 1, SOLID],
        53: [N, 0, 0, 1, SOLID],
        12: [0, 0, 1, 0, NON_SOLID],
        23: [1, 1, 0, 1, NON_SOLID],
        34: [1, 0, 1, 1, NON_SOLID],
        45: [0, 1, 0, 0, NON_SOLID]
    };
    ig.CollisionMap.staticNoCollision = {
        trace: function(x, y, vx, vy) {
            return {
                collision: {
                    x: false,
                    y: false,
                    slope: false
                },
                pos: {
                    x: x + vx,
                    y: y + vy
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
        }
    };
}); // lib/impact/background-map.js
ig.baked = true;
ig.module('impact.background-map').requires('impact.map', 'impact.image').defines(function() {
    "use strict";
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: false,
        tilesetName: '',
        foreground: false,
        enabled: true,
        preRender: false,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: false,
        moveDown: 2,
        sinWave: 0,
        angle: 0,
        frameCounter: 300,
        waveForm: 1,
        nextWaveCoeff: 1,
        nextDropSpeed: 1,
        curDropSpeed: 1,
        anims: {},
        init: function(tilesize, data, tileset) {
            this.parent(tilesize, data);
            this.setTileset(tileset);
        },
        setTileset: function(tileset) {
            this.tilesetName = tileset instanceof ig.Image ? tileset.path : tileset;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null;
        },
        setScreenPos: function(x, y) {
            this.scroll.x = x / this.distance;
            this.scroll.y = y / this.distance;
            if (this.frameCounter >= 300) {
                this.nextWaveCoeff = randomizer(1, 3);
                this.frameCounter = 0;
            }
            if (this.nextWaveCoeff != this.waveForm) {
                this.waveForm += (this.nextWaveCoeff - this.waveForm) / 15;
            }
            this.angle += ig.system.tick * this.waveForm;
            this.sinWave = (Math.cos(this.angle) + 1) / 5;
            this.moveDown += 1.5;
            if (this.frameCounter >= 100) {
                this.nextDropSpeed = randomizer(1, 3);
            }
            if (this.curDropSpeed != this.nextDropSpeed) {
                this.curDropSpeed += (this.nextDropSpeed - this.curDropSpeed) / 15;
            }
            this.frameCounter += this.curDropSpeed;
            if (this.moveDown >= 1280) this.moveDown = 0;
        },
        preRenderMapToChunks: function() {
            var totalWidth = this.width * this.tilesize * ig.system.scale,
                totalHeight = this.height * this.tilesize * ig.system.scale;
            this.chunkSize = Math.min(Math.max(totalWidth + 250, totalHeight), this.chunkSize);
            var chunkCols = Math.ceil(totalWidth / this.chunkSize),
                chunkRows = Math.ceil(totalHeight / this.chunkSize);
            this.preRenderedChunks = [];
            for (var y = 0; y < chunkRows; y++) {
                this.preRenderedChunks[y] = [];
                for (var x = 0; x < chunkCols; x++) {
                    var chunkWidth = (x == chunkCols - 1) ? totalWidth - x * this.chunkSize : this.chunkSize;
                    var chunkHeight = (y == chunkRows - 1) ? totalHeight - y * this.chunkSize : this.chunkSize;
                    this.preRenderedChunks[y][x] = this.preRenderChunk(x, y, chunkWidth, chunkHeight);
                }
            }
        },
        preRenderChunk: function(cx, cy, w, h) {
            var tw = w / this.tilesize / ig.system.scale + 1,
                th = h / this.tilesize / ig.system.scale + 1;
            var nx = (cx * this.chunkSize / ig.system.scale) % this.tilesize,
                ny = (cy * this.chunkSize / ig.system.scale) % this.tilesize;
            var tx = Math.floor(cx * this.chunkSize / this.tilesize / ig.system.scale),
                ty = Math.floor(cy * this.chunkSize / this.tilesize / ig.system.scale);
            var chunk = ig.$new('canvas');
            chunk.width = w;
            chunk.height = h;
            chunk.retinaResolutionEnabled = false;
            var chunkContext = chunk.getContext('2d');
            ig.System.scaleMode(chunk, chunkContext);
            var screenContext = ig.system.context;
            ig.system.context = chunkContext;
            for (var x = 0; x < tw; x++) {
                for (var y = 0; y < th; y++) {
                    if (x + tx < this.width && y + ty < this.height) {
                        var tile = this.data[y + ty][x + tx];
                        if (tile) {
                            this.tiles.drawTile(x * this.tilesize - nx, y * this.tilesize - ny, tile - 1, this.tilesize);
                        }
                    }
                }
            }
            ig.system.context = screenContext;
            return chunk;
        },
        draw: function() {
            if (!this.tiles.loaded || !this.enabled) {
                return;
            }
            if (this.preRender) {
                this.drawPreRendered();
            } else {
                this.drawTiled();
            }
        },
        drawPreRendered: function() {
            if (!this.preRenderedChunks) {
                this.preRenderMapToChunks();
            }
            var dx = ig.system.getDrawPos(this.scroll.x * this.sinWave),
                dy = ig.system.getDrawPos(this.scroll.y - this.moveDown);
            if (this.repeat) {
                var w = this.width * this.tilesize * ig.system.scale;
                dx = (dx % w + w) % w;
                var h = this.height * this.tilesize * ig.system.scale;
                dy = (dy % h + h) % h;
            }
            var minChunkX = Math.max(Math.floor(dx / this.chunkSize), 0),
                minChunkY = Math.max(Math.floor(dy / this.chunkSize), 0),
                maxChunkX = Math.ceil((dx + ig.system.realWidth) / this.chunkSize),
                maxChunkY = Math.ceil((dy + ig.system.realHeight) / this.chunkSize),
                maxRealChunkX = this.preRenderedChunks[0].length,
                maxRealChunkY = this.preRenderedChunks.length;
            if (!this.repeat) {
                maxChunkX = Math.min(maxChunkX, maxRealChunkX);
                maxChunkY = Math.min(maxChunkY, maxRealChunkY);
            }
            var nudgeY = 0;
            for (var cy = minChunkY; cy < maxChunkY; cy++) {
                var nudgeX = 0;
                for (var cx = minChunkX; cx < maxChunkX; cx++) {
                    var chunk = this.preRenderedChunks[cy % maxRealChunkY][cx % maxRealChunkX];
                    var x = -dx + cx * this.chunkSize - nudgeX;
                    var y = -dy + cy * this.chunkSize - nudgeY;
                    ig.system.context.drawImage(chunk, x, y);
                    ig.Image.drawCount++;
                    if (this.debugChunks) {
                        ig.system.context.strokeStyle = '#f0f';
                        ig.system.context.strokeRect(x, y, this.chunkSize, this.chunkSize);
                    }
                    if (this.repeat && chunk.width < this.chunkSize && x + chunk.width < ig.system.realWidth) {
                        nudgeX += this.chunkSize - chunk.width;
                        maxChunkX++;
                    }
                }
                if (this.repeat && chunk.height < this.chunkSize && y + chunk.height < ig.system.realHeight) {
                    nudgeY += this.chunkSize - chunk.height;
                    maxChunkY++;
                }
            }
        },
        drawTiled: function() {
            var tile = 0,
                anim = null,
                tileOffsetX = (this.scroll.x / this.tilesize).toInt(),
                tileOffsetY = (this.scroll.y / this.tilesize).toInt(),
                pxOffsetX = this.scroll.x % this.tilesize,
                pxOffsetY = this.scroll.y % this.tilesize,
                pxMinX = -pxOffsetX - this.tilesize,
                pxMinY = -pxOffsetY - this.tilesize,
                pxMaxX = ig.system.width + this.tilesize - pxOffsetX,
                pxMaxY = ig.system.height + this.tilesize - pxOffsetY;
            for (var mapY = -1, pxY = pxMinY; pxY < pxMaxY; mapY++, pxY += this.tilesize) {
                var tileY = mapY + tileOffsetY;
                if (tileY >= this.height || tileY < 0) {
                    if (!this.repeat) {
                        continue;
                    }
                    tileY = (tileY % this.height + this.height) % this.height;
                }
                for (var mapX = -1, pxX = pxMinX; pxX < pxMaxX; mapX++, pxX += this.tilesize) {
                    var tileX = mapX + tileOffsetX;
                    if (tileX >= this.width || tileX < 0) {
                        if (!this.repeat) {
                            continue;
                        }
                        tileX = (tileX % this.width + this.width) % this.width;
                    }
                    if ((tile = this.data[tileY][tileX])) {
                        if ((anim = this.anims[tile - 1])) {
                            anim.draw(pxX, pxY);
                        } else {
                            this.tiles.drawTile(pxX, pxY, tile - 1, this.tilesize);
                        }
                    }
                }
            }
        }
    });
}); // lib/impact/game.js
ig.baked = true;
ig.module('impact.game').requires('impact.impact', 'impact.entity', 'impact.collision-map', 'impact.background-map').defines(function() {
    "use strict";
    ig.Game = ig.Class.extend({
        clearColor: '#000000',
        gravity: 0,
        screen: {
            x: 0,
            y: 0
        },
        _rscreen: {
            x: 0,
            y: 0
        },
        entities: [],
        namedEntities: {},
        collisionMap: ig.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        autoSort: false,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: false,
        staticInstantiate: function() {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null;
        },
        loadLevel: function(data) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var i = 0; i < data.entities.length; i++) {
                var ent = data.entities[i];
                this.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
            }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (var i = 0; i < data.layer.length; i++) {
                var ld = data.layer[i];
                if (ld.name == 'collision') {
                    this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
                } else {
                    var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
                    newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                    newMap.repeat = ld.repeat;
                    newMap.distance = ld.distance;
                    newMap.foreground = !!ld.foreground;
                    newMap.preRender = !!ld.preRender;
                    newMap.name = ld.name;
                    this.backgroundMaps.push(newMap);
                }
            }
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].ready();
            }
        },
        loadLevelDeferred: function(data) {
            this._levelToLoad = data;
        },
        getMapByName: function(name) {
            if (name == 'collision') {
                return this.collisionMap;
            }
            for (var i = 0; i < this.backgroundMaps.length; i++) {
                if (this.backgroundMaps[i].name == name) {
                    return this.backgroundMaps[i];
                }
            }
            return null;
        },
        getEntityByName: function(name) {
            return this.namedEntities[name];
        },
        getEntitiesByType: function(type) {
            var entityClass = typeof(type) === 'string' ? ig.global[type] : type;
            var a = [];
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (ent instanceof entityClass && !ent._killed) {
                    a.push(ent);
                }
            }
            return a;
        },
        spawnEntity: function(type, x, y, settings) {
            var entityClass = typeof(type) === 'string' ? ig.global[type] : type;
            if (!entityClass) {
                throw ("Can't spawn entity of type " + type);
            }
            var ent = new(entityClass)(x, y, settings || {});
            this.entities.push(ent);
            if (ent.name) {
                this.namedEntities[ent.name] = ent;
            }
            return ent;
        },
        sortEntities: function() {
            this.entities.sort(this.sortBy);
        },
        sortEntitiesDeferred: function() {
            this._doSortEntities = true;
        },
        removeEntity: function(ent) {
            if (ent.name) {
                delete this.namedEntities[ent.name];
            }
            ent._killed = true;
            ent.type = ig.Entity.TYPE.NONE;
            ent.checkAgainst = ig.Entity.TYPE.NONE;
            ent.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(ent);
        },
        run: function() {
            this.update();
            this.draw();
        },
        update: function() {
            if (this._levelToLoad) {
                this.loadLevel(this._levelToLoad);
                this._levelToLoad = null;
            }
            this.updateEntities();
            this.checkEntities();
            for (var i = 0; i < this._deferredKill.length; i++) {
                this._deferredKill[i].erase();
                this.entities.erase(this._deferredKill[i]);
            }
            this._deferredKill = [];
            if (this._doSortEntities || this.autoSort) {
                this.sortEntities();
                this._doSortEntities = false;
            }
            for (var tileset in this.backgroundAnims) {
                var anims = this.backgroundAnims[tileset];
                for (var a in anims) {
                    anims[a].update();
                }
            }
        },
        updateEntities: function() {
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (!ent._killed) {
                    ent.update();
                }
            }
        },
        draw: function() {
            if (this.clearColor) {
                ig.system.clear(this.clearColor);
            }
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            var mapIndex;
            for (mapIndex = 0; mapIndex < this.backgroundMaps.length; mapIndex++) {
                var map = this.backgroundMaps[mapIndex];
                if (map.foreground) {
                    break;
                }
                map.setScreenPos(this.screen.x, this.screen.y);
                map.draw();
            }
            this.drawEntities();
            for (mapIndex; mapIndex < this.backgroundMaps.length; mapIndex++) {
                var map = this.backgroundMaps[mapIndex];
                map.setScreenPos(this.screen.x, this.screen.y);
                map.draw();
            }
        },
        drawEntities: function() {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        },
        checkEntities: function() {
            var hash = {};
            for (var e = 0; e < this.entities.length; e++) {
                var entity = this.entities[e];
                if (entity.type == ig.Entity.TYPE.NONE && entity.checkAgainst == ig.Entity.TYPE.NONE && entity.collides == ig.Entity.COLLIDES.NEVER) {
                    continue;
                }
                var checked = {},
                    xmin = Math.floor(entity.pos.x / this.cellSize),
                    ymin = Math.floor(entity.pos.y / this.cellSize),
                    xmax = Math.floor((entity.pos.x + entity.size.x) / this.cellSize) + 1,
                    ymax = Math.floor((entity.pos.y + entity.size.y) / this.cellSize) + 1;
                for (var x = xmin; x < xmax; x++) {
                    for (var y = ymin; y < ymax; y++) {
                        if (!hash[x]) {
                            hash[x] = {};
                            hash[x][y] = [entity];
                        } else if (!hash[x][y]) {
                            hash[x][y] = [entity];
                        } else {
                            var cell = hash[x][y];
                            for (var c = 0; c < cell.length; c++) {
                                if (entity.touches(cell[c]) && !checked[cell[c].id]) {
                                    checked[cell[c].id] = true;
                                    ig.Entity.checkPair(entity, cell[c]);
                                }
                            }
                            cell.push(entity);
                        }
                    }
                }
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function(a, b) {
            return a.zIndex - b.zIndex;
        },
        POS_X: function(a, b) {
            return (a.pos.x + a.size.x) - (b.pos.x + b.size.x);
        },
        POS_Y: function(a, b) {
            return (a.pos.y + a.size.y) - (b.pos.y + b.size.y);
        }
    };
}); // lib/plugins/howler.js
ig.baked = true;
ig.module('plugins.howler').requires('impact.game').defines(function() {
    var cache = {};
    var ctx = null,
        usingWebAudio = true,
        noAudio = false;
    try {
        if (typeof AudioContext !== 'undefined') {
            ctx = new AudioContext();
        } else if (typeof webkitAudioContext !== 'undefined') {
            ctx = new webkitAudioContext();
        } else {
            usingWebAudio = false;
        }
    } catch (e) {
        usingWebAudio = false;
    }
    if (!usingWebAudio) {
        if (typeof Audio !== 'undefined') {
            try {
                new Audio();
            } catch (e) {
                noAudio = true;
            }
        } else {
            noAudio = true;
        }
    }
    if (usingWebAudio) {
        var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
        masterGain.gain.value = 1;
        masterGain.connect(ctx.destination);
    }
    var HowlerGlobal = function() {
        this._volume = 1;
        this._muted = false;
        this.usingWebAudio = usingWebAudio;
        this.noAudio = noAudio;
        this._howls = [];
        this._codecs = codecs;
        this.iOSAutoEnable = true;
    };
    HowlerGlobal.prototype = {
        volume: function(vol) {
            var self = this;
            vol = parseFloat(vol);
            if (vol >= 0 && vol <= 1) {
                self._volume = vol;
                if (usingWebAudio) {
                    masterGain.gain.value = vol;
                }
                for (var key in self._howls) {
                    if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
                        for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
                            self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
                        }
                    }
                }
                return self;
            }
            return (usingWebAudio) ? masterGain.gain.value : self._volume;
        },
        mute: function() {
            this._setMuted(true);
            return this;
        },
        unmute: function() {
            this._setMuted(false);
            return this;
        },
        _setMuted: function(muted) {
            var self = this;
            self._muted = muted;
            if (usingWebAudio) {
                masterGain.gain.value = muted ? 0 : self._volume;
            }
            for (var key in self._howls) {
                if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
                    for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
                        self._howls[key]._audioNode[i].muted = muted;
                    }
                }
            }
        },
        _enableiOSAudio: function() {
            var self = this;
            if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
                return;
            }
            self._iOSEnabled = false;
            var unlock = function() {
                var buffer = ctx.createBuffer(1, 1, 22050);
                var source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                if (typeof source.start === 'undefined') {
                    source.noteOn(0);
                } else {
                    source.start(0);
                }
                setTimeout(function() {
                    if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
                        self._iOSEnabled = true;
                        self.iOSAutoEnable = false;
                        window.removeEventListener('touchstart', unlock, false);
                    }
                }, 0);
            };
            window.addEventListener('touchstart', unlock, false);
            return self;
        }
    };
    var audioTest = null;
    var codecs = {};
    if (!noAudio) {
        audioTest = new Audio();
        codecs = {
            mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
            wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
            aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
            m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
            mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
            weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
        };
    }
    var Howler = new HowlerGlobal();
    var Howl = ig.Class.extend({
        init: function(o) {
            var self = this;
            self._autoplay = o.autoplay || false;
            self._buffer = o.buffer || false;
            self._duration = o.duration || 0;
            self._format = o.format || null;
            self._loop = o.loop || false;
            self._loaded = false;
            self._sprite = o.sprite || {};
            self._src = o.src || '';
            self._pos3d = o.pos3d || [0, 0, -0.5];
            self._volume = o.volume !== undefined ? o.volume : 1;
            self._urls = o.urls || [];
            self._rate = o.rate || 1;
            self._model = o.model || null;
            self._onload = [o.onload || function() {}];
            self._onloaderror = [o.onloaderror || function() {}];
            self._onend = [o.onend || function() {}];
            self._onpause = [o.onpause || function() {}];
            self._onplay = [o.onplay || function() {}];
            self._onendTimer = [];
            self._webAudio = usingWebAudio && !self._buffer;
            self._audioNode = [];
            if (self._webAudio) {
                self._setupAudioNode();
            }
            if (typeof ctx !== 'undefined' && Howler.iOSAutoEnable) {
                Howler._enableiOSAudio();
            }
            Howler._howls.push(self);
            self.load();
        }
    });
    Howl.inject({
        load: function() {
            var self = this,
                url = null;
            if (noAudio) {
                self.on('loaderror');
                return;
            }
            var canPlay = {
                mp3: codecs.mp3,
                opus: codecs.opus,
                ogg: codecs.ogg,
                wav: codecs.wav,
                m4a: codecs.m4a,
                weba: codecs.webm
            };
            for (var i = 0; i < self._urls.length; i++) {
                var ext;
                if (self._format) {
                    ext = self._format;
                } else {
                    ext = self._urls[i].toLowerCase().match(/.+\.([^?]+)(\?|$)/);
                    ext = (ext && ext.length >= 2) ? ext[1] : self._urls[i].toLowerCase().match(/data\:audio\/([^?]+);/)[1];
                }
                if (canPlay[ext]) {
                    url = self._urls[i];
                    break;
                }
            }
            if (!url) {
                self.on('loaderror');
                return;
            }
            self._src = url;
            if (self._webAudio) {
                loadBuffer(self, url);
            } else {
                var newNode = new Audio();
                self._audioNode.push(newNode);
                newNode.src = url;
                newNode._pos = 0;
                newNode.preload = 'auto';
                newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();
                cache[url] = self;
                var listener = function() {
                    self._duration = newNode.duration;
                    if (Object.getOwnPropertyNames(self._sprite).length === 0) {
                        self._sprite = {
                            _default: [0, self._duration * 1000]
                        };
                    }
                    if (!self._loaded) {
                        self._loaded = true;
                        self.on('load');
                    }
                    if (self._autoplay) {
                        self.play();
                    }
                    newNode.removeEventListener('canplaythrough', listener, false);
                };
                newNode.addEventListener('canplaythrough', listener, false);
                newNode.load();
            }
            return self;
        },
        urls: function(urls) {
            var self = this;
            if (urls) {
                self.stop();
                self._urls = (typeof urls === 'string') ? [urls] : urls;
                self._loaded = false;
                self.load();
                return self;
            } else {
                return self._urls;
            }
        },
        play: function(sprite, callback) {
            var self = this;
            if (typeof sprite === 'function') {
                callback = sprite;
            }
            if (!sprite || typeof sprite === 'function') {
                sprite = '_default';
            }
            if (!self._loaded) {
                self.on('load', function() {
                    self.play(sprite, callback);
                });
                return self;
            }
            if (!self._sprite[sprite]) {
                if (typeof callback === 'function') callback();
                return self;
            }
            self._inactiveNode(function(node) {
                node._sprite = sprite;
                var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000,
                    duration = self._sprite[sprite][1] / 1000 - node._pos;
                var loop = !!(self._loop || self._sprite[sprite][2]);
                var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
                    timerId;
                (function() {
                    var data = {
                        id: soundId,
                        sprite: sprite,
                        loop: loop
                    };
                    timerId = setTimeout(function() {
                        if (!self._webAudio && loop) {
                            self.stop(data.id, data.timer).play(sprite, data.id);
                        }
                        if (self._webAudio && !loop) {
                            self._nodeById(data.id).paused = true;
                        }
                        if (!self._webAudio && !loop) {
                            self.stop(data.id, data.timer);
                        }
                        self.on('end', soundId);
                    }, duration * 1000);
                    self._onendTimer.push(timerId);
                    data.timer = self._onendTimer[self._onendTimer.length - 1];
                })();
                if (self._webAudio) {
                    var loopStart = self._sprite[sprite][0] / 1000,
                        loopEnd = self._sprite[sprite][1] / 1000;
                    node.id = soundId;
                    node.paused = false;
                    refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
                    self._playStart = ctx.currentTime;
                    node.gain.value = self._volume;
                    if (typeof node.bufferSource.start === 'undefined') {
                        node.bufferSource.noteGrainOn(0, pos, duration);
                    } else {
                        node.bufferSource.start(0, pos, duration);
                    }
                } else {
                    if (node.readyState === 4) {
                        node.id = soundId;
                        node.currentTime = pos;
                        node.muted = Howler._muted;
                        node.volume = self._volume * Howler.volume();
                        setTimeout(function() {
                            node.play();
                        }, 0);
                    } else {
                        self._clearEndTimer(timerId);
                        (function() {
                            var sound = self,
                                playSprite = sprite,
                                fn = callback,
                                newNode = node;
                            var listener = function() {
                                sound.play(playSprite, fn);
                                newNode.removeEventListener('canplaythrough', listener, false);
                            };
                            newNode.addEventListener('canplaythrough', listener, false);
                        })();
                        return self;
                    }
                }
                self.on('play');
                if (typeof callback === 'function') callback(soundId);
                return self;
            });
            return self;
        },
        pause: function(id, timerId) {
            var self = this;
            if (!self._loaded) {
                self.on('play', function() {
                    self.pause(id);
                });
                return self;
            }
            self._clearEndTimer(timerId || 0);
            var activeNode = (id) ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                activeNode._pos = self.pos(null, id);
                if (self._webAudio) {
                    if (!activeNode.bufferSource) {
                        return self;
                    }
                    activeNode.paused = true;
                    if (typeof activeNode.bufferSource.stop === 'undefined') {
                        activeNode.bufferSource.noteOff(0);
                    } else {
                        activeNode.bufferSource.stop(0);
                    }
                } else {
                    activeNode.pause();
                }
            }
            self.on('pause');
            return self;
        },
        stop: function(id, timerId) {
            var self = this;
            if (!self._loaded) {
                self.on('play', function() {
                    self.stop(id);
                });
                return self;
            }
            self._clearEndTimer(timerId || 0);
            var activeNode = (id) ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                activeNode._pos = 0;
                if (self._webAudio) {
                    if (!activeNode.bufferSource) {
                        return self;
                    }
                    activeNode.paused = true;
                    if (typeof activeNode.bufferSource.stop === 'undefined') {
                        activeNode.bufferSource.noteOff(0);
                    } else {
                        activeNode.bufferSource.stop(0);
                    }
                } else {
                    activeNode.pause();
                    activeNode.currentTime = 0;
                }
            }
            return self;
        },
        mute: function(id) {
            var self = this;
            if (!self._loaded) {
                self.on('play', function() {
                    self.mute(id);
                });
                return self;
            }
            var activeNode = (id) ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                if (self._webAudio) {
                    activeNode.gain.value = 0;
                } else {
                    activeNode.volume = 0;
                }
            }
            return self;
        },
        unmute: function(id) {
            var self = this;
            if (!self._loaded) {
                self.on('play', function() {
                    self.unmute(id);
                });
                return self;
            }
            var activeNode = (id) ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                if (self._webAudio) {
                    activeNode.gain.value = self._volume;
                } else {
                    activeNode.volume = self._volume;
                }
            }
            return self;
        },
        volume: function(vol, id) {
            var self = this;
            vol = parseFloat(vol);
            if (vol >= 0 && vol <= 1) {
                self._volume = vol;
                if (!self._loaded) {
                    self.on('play', function() {
                        self.volume(vol, id);
                    });
                    return self;
                }
                var activeNode = (id) ? self._nodeById(id) : self._activeNode();
                if (activeNode) {
                    if (self._webAudio) {
                        activeNode.gain.value = vol;
                    } else {
                        activeNode.volume = vol * Howler.volume();
                    }
                }
                return self;
            } else {
                return self._volume;
            }
        },
        loop: function(loop) {
            var self = this;
            if (typeof loop === 'boolean') {
                self._loop = loop;
                return self;
            } else {
                return self._loop;
            }
        },
        sprite: function(sprite) {
            var self = this;
            if (typeof sprite === 'object') {
                self._sprite = sprite;
                return self;
            } else {
                return self._sprite;
            }
        },
        pos: function(pos, id) {
            var self = this;
            if (!self._loaded) {
                self.on('load', function() {
                    self.pos(pos);
                });
                return typeof pos === 'number' ? self : self._pos || 0;
            }
            pos = parseFloat(pos);
            var activeNode = (id) ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                if (self._webAudio) {
                    if (pos >= 0) {
                        activeNode._pos = pos;
                        self.pause(id).play(activeNode._sprite, id);
                        return self;
                    } else {
                        return activeNode._pos + (ctx.currentTime - self._playStart);
                    }
                } else {
                    if (pos >= 0) {
                        activeNode.currentTime = pos;
                        return self;
                    } else {
                        return activeNode.currentTime;
                    }
                }
            } else if (pos >= 0) {
                return self;
            } else {
                for (var i = 0; i < self._audioNode.length; i++) {
                    if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
                        return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
                    }
                }
            }
        },
        pos3d: function(x, y, z, id) {
            var self = this;
            y = (typeof y === 'undefined' || !y) ? 0 : y;
            z = (typeof z === 'undefined' || !z) ? -0.5 : z;
            if (!self._loaded) {
                self.on('play', function() {
                    self.pos3d(x, y, z, id);
                });
                return self;
            }
            if (x >= 0 || x < 0) {
                if (self._webAudio) {
                    var activeNode = (id) ? self._nodeById(id) : self._activeNode();
                    if (activeNode) {
                        self._pos3d = [x, y, z];
                        activeNode.panner.setPosition(x, y, z);
                    }
                }
            } else {
                return self._pos3d;
            }
            return self;
        },
        fade: function(from, to, len, callback, id) {
            var self = this,
                diff = Math.abs(from - to),
                dir = from > to ? 'down' : 'up',
                steps = diff / 0.01,
                stepTime = len / steps;
            if (!self._loaded) {
                self.on('load', function() {
                    self.fade(from, to, len, callback, id);
                });
                return self;
            }
            self.volume(from, id);
            for (var i = 1; i <= steps; i++) {
                (function() {
                    var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
                        vol = Math.round(1000 * change) / 1000,
                        toVol = to;
                    setTimeout(function() {
                        self.volume(vol, id);
                        if (vol === toVol) {
                            if (callback) callback();
                        }
                    }, stepTime * i);
                })();
            }
        },
        fadeIn: function(to, len, callback) {
            return this.volume(0).play().fade(0, to, len, callback);
        },
        fadeOut: function(to, len, callback, id) {
            var self = this;
            return self.fade(self._volume, to, len, function() {
                if (callback) callback();
                self.pause(id);
                self.on('end');
            }, id);
        },
        _nodeById: function(id) {
            var self = this,
                node = self._audioNode[0];
            for (var i = 0; i < self._audioNode.length; i++) {
                if (self._audioNode[i].id === id) {
                    node = self._audioNode[i];
                    break;
                }
            }
            return node;
        },
        _activeNode: function() {
            var self = this,
                node = null;
            for (var i = 0; i < self._audioNode.length; i++) {
                if (!self._audioNode[i].paused) {
                    node = self._audioNode[i];
                    break;
                }
            }
            self._drainPool();
            return node;
        },
        _inactiveNode: function(callback) {
            var self = this,
                node = null;
            for (var i = 0; i < self._audioNode.length; i++) {
                if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
                    callback(self._audioNode[i]);
                    node = true;
                    break;
                }
            }
            self._drainPool();
            if (node) {
                return;
            }
            var newNode;
            if (self._webAudio) {
                newNode = self._setupAudioNode();
                callback(newNode);
            } else {
                self.load();
                newNode = self._audioNode[self._audioNode.length - 1];
                newNode.addEventListener('loadedmetadata', function() {
                    callback(newNode);
                });
            }
        },
        _drainPool: function() {
            var self = this,
                inactive = 0,
                i;
            for (i = 0; i < self._audioNode.length; i++) {
                if (self._audioNode[i].paused) {
                    inactive++;
                }
            }
            for (i = self._audioNode.length - 1; i >= 0; i--) {
                if (inactive <= 5) {
                    break;
                }
                if (self._audioNode[i].paused) {
                    if (self._webAudio) {
                        self._audioNode[i].disconnect(0);
                    }
                    inactive--;
                    self._audioNode.splice(i, 1);
                }
            }
        },
        _clearEndTimer: function(timerId) {
            var self = this,
                timer = self._onendTimer.indexOf(timerId);
            timer = timer >= 0 ? timer : 0;
            if (self._onendTimer[timer]) {
                clearTimeout(self._onendTimer[timer]);
                self._onendTimer.splice(timer, 1);
            }
        },
        _setupAudioNode: function() {
            var self = this,
                node = self._audioNode,
                index = self._audioNode.length;
            node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
            node[index].gain.value = self._volume;
            node[index].paused = true;
            node[index]._pos = 0;
            node[index].readyState = 4;
            node[index].connect(masterGain);
            node[index].panner = ctx.createPanner();
            node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
            node[index].panner.connect(node[index]);
            return node[index];
        },
        on: function(event, fn) {
            var self = this,
                events = self['_on' + event];
            if (typeof fn === "function") {
                events.push(fn);
            } else {
                for (var i = 0; i < events.length; i++) {
                    if (fn) {
                        events[i].call(self, fn);
                    } else {
                        events[i].call(self);
                    }
                }
            }
            return self;
        },
        off: function(event, fn) {
            var self = this,
                events = self['_on' + event],
                fnString = fn.toString();
            for (var i = 0; i < events.length; i++) {
                if (fnString === events[i].toString()) {
                    events.splice(i, 1);
                    break;
                }
            }
            return self;
        },
        unload: function() {
            var self = this;
            var nodes = self._audioNode;
            for (var i = 0; i < self._audioNode.length; i++) {
                self.stop(nodes[i].id);
                if (!self._webAudio) {
                    nodes[i].src = '';
                } else {
                    nodes[i].disconnect(0);
                }
            }
            var index = Howler._howls.indexOf(self);
            if (index) {
                Howler._howls.splice(index, 1);
            }
            delete cache[self._src];
            self = null;
        }
    });
    if (usingWebAudio) {
        var loadBuffer = function(obj, url) {
            if (url in cache) {
                obj._duration = cache[url].duration;
                loadSound(obj);
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function() {
                    ctx.decodeAudioData(xhr.response, function(buffer) {
                        if (buffer) {
                            cache[url] = buffer;
                            loadSound(obj, buffer);
                        }
                    });
                };
                xhr.onerror = function() {
                    if (obj._webAudio) {
                        obj._buffer = true;
                        obj._webAudio = false;
                        obj._audioNode = [];
                        delete obj._gainNode;
                        obj.load();
                    }
                };
                try {
                    xhr.send();
                } catch (e) {
                    xhr.onerror();
                }
            }
        };
        var loadSound = function(obj, buffer) {
            obj._duration = (buffer) ? buffer.duration : obj._duration;
            if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
                obj._sprite = {
                    _default: [0, obj._duration * 1000]
                };
            }
            if (!obj._loaded) {
                obj._loaded = true;
                obj.on('load');
            }
            if (obj._autoplay) {
                obj.play();
            }
        };
        var refreshBuffer = function(obj, loop, id) {
            var node = obj._nodeById(id);
            node.bufferSource = ctx.createBufferSource();
            node.bufferSource.buffer = cache[obj._src];
            node.bufferSource.connect(node.panner);
            node.bufferSource.loop = loop[0];
            if (loop[0]) {
                node.bufferSource.loopStart = loop[1];
                node.bufferSource.loopEnd = loop[1] + loop[2];
            }
        };
    }
    if (typeof define === 'function' && define.amd) {
        define('Howler', function() {
            return {
                Howler: Howler,
                Howl: Howl
            };
        });
    } else {
        window.Howler = Howler;
        window.Howl = Howl;
    }
}); // lib/plugins/greenish-games-loader.js
ig.baked = true;
ig.module('plugins.greenish-games-loader').requires('impact.loader').defines(function() {
    ig.GreenishGames = ig.Loader.extend({
        endTime: 0,
        fadeToWhiteTime: 500,
        fadeToGameTime: 800,
        logoWidth: 320,
        logoHeight: 185,
        inLink: false,
        title_rotatedevice: new ig.Image('media/rotate_phone.png'),
        canvas: null,
        context: null,
        end: function() {
            this.parent();
            this.endTime = Date.now();
            ig.system.setDelegate(this);
            document.removeEventListener("click", this.on_click, false);
        },
        run: function() {
            var t = Date.now() - this.endTime;
            var alpha = 1;
            if (t < this.fadeToWhiteTime) {
                this.draw();
                alpha = t.map(0, this.fadeToWhiteTime, 0, 1);
            } else if (t < this.fadeToGameTime) {
                ig.game.run();
                alpha = t.map(this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
            } else {
                document.removeEventListener("click", this.on_click, false);
                ig.system.setDelegate(ig.game);
                return;
            }
            ig.system.context.fillStyle = 'rgba(255,255,255,' + alpha + ')';
            ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
            document.addEventListener("click", this.on_click, false);
        },
        on_click: function(ev) {
            if (ev.layerX || ev.layerX == 0) {
                x = ev.layerX;
                y = ev.layerY;
            }
            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
            if (x >= 0 && x <= (ig.system.realWidth) && y <= 100 && y >= 0) {
                window.location = ig.global.link_moregames;
            }
        },
        draw: function() {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var ctx = ig.system.context;
            var w = ig.system.realWidth;
            var h = ig.system.realHeight;
            var scale = w / this.logoWidth / 3;
            var center = (w - this.logoWidth * scale) / 2;
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = 'rgb(128,128,128)';
            ctx.textAlign = 'right';
            ctx.font = '15px Arial';
            ctx.fillText('http://games.greenish.xyz', w - 15, h - 15);
            ctx.textAlign = 'left';
            ctx.save();
            ctx.translate(center, h / 2.5);
            ctx.scale(scale, scale);
            ctx.fillStyle = 'rgb(237, 28, 36)';
            ctx.fillRect(this.logoWidth / 2, this.logoHeight - 85, ig.system.realWidth / (2 * scale) * this._drawStatus, 1);
            ctx.fillRect(this.logoWidth / 2, this.logoHeight - 85, -ig.system.realWidth / (2 * scale) * this._drawStatus, 1);
            this.drawPaths('rgb(0,0,0)', ig.GreenishGames.PATHS_LOGO);
            ctx.restore();
        },
        drawPaths: function(color, paths) {
            var ctx = ig.system.context;
            ctx.fillStyle = color;
            for (var i = 0; i < paths.length; i += 2) {
                ctx[ig.GreenishGames.OPS[paths[i]]].apply(ctx, paths[i + 1]);
            }
        }
    });
    ig.GreenishGames.OPS = {
        bp: 'beginPath',
        cp: 'closePath',
        f: 'fill',
        m: 'moveTo',
        l: 'lineTo',
        bc: 'bezierCurveTo'
    };
    ig.GreenishGames.PATHS_LOGO = ['bp', [], 'm', [136.7, 0.0], 'l', [120.0, 0.0], 'l', [120.0, 66.7], 'l', [120.0, 83.3], 'l', [136.7, 83.3], 'l', [186.7, 83.3], 'l', [186.7, 66.7], 'l', [136.7, 66.7], 'l', [136.7, 0.0], 'cp', [], 'f', [], 'bp', [], 'm', [203.4, 66.7], 'l', [203.4, 83.3], 'l', [220.0, 83.3], 'l', [220.0, 66.7], 'l', [203.4, 66.7], 'cp', [], 'f', [], 'bp', [], 'm', [203.4, 66.7], 'l', [203.4, 16.7], 'l', [203.4, 0.0], 'l', [186.7, 0.0], 'l', [153.4, 0.0], 'l', [153.4, 16.7], 'l', [186.7, 16.7], 'l', [186.7, 66.7], 'l', [203.4, 66.7], 'cp', [], 'f', []];
}); // lib/plugins/camera.js
ig.baked = true;
ig.module('plugins.camera').defines(function() {
    "use strict";
    ig.Camera = ig.Class.extend({
        trap: {
            pos: {
                x: 0,
                y: 0
            },
            size: {
                x: 32,
                y: 32
            }
        },
        max: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        damping: 5,
        lookAhead: {
            x: 0,
            y: 0
        },
        currentLookAhead: {
            x: 0,
            y: 0
        },
        debug: false,
        init: function(offsetX, offsetY, damping) {
            this.offset.x = offsetX;
            this.offset.y = offsetY;
            this.damping = damping;
        },
        set: function(entity) {
            this.trap.pos.x = entity.pos.x - this.trap.size.x / 3;
            this.trap.pos.y = entity.pos.y + entity.size.y - this.trap.size.y;
            this.pos.x = this.trap.pos.x - this.offset.x;
            this.pos.y = this.trap.pos.y - this.offset.y;
            this.currentLookAhead.x = 0;
            this.currentLookAhead.y = 0;
        },
        follow: function(entity) {
            this.pos.x = this.move('x', entity.pos.x, entity.size.x);
            this.pos.y = this.move('y', entity.pos.y, entity.size.y);
            if (ig.system.width >= 640) ig.game.screen.x = this.pos.x + ig.system.width / 2 - 320;
            else ig.game.screen.x = this.pos.x + ig.system.width / 2 - 300;
            ig.game.screen.y = this.pos.y;
        },
        move: function(axis, pos, size) {
            var lookAhead = 5;
            if (pos < this.trap.pos[axis]) {
                this.trap.pos[axis] = pos;
                this.currentLookAhead[axis] = this.lookAhead[axis];
            } else if (pos + size > this.trap.pos[axis] + this.trap.size[axis]) {
                this.trap.pos[axis] = pos + size - this.trap.size[axis];
                this.currentLookAhead[axis] = -this.lookAhead[axis];
            }
            return (this.pos[axis] - (this.pos[axis] - this.trap.pos[axis] + this.offset[axis] + this.currentLookAhead[axis]) * ig.system.tick * this.damping).limit(0, this.max[axis]);
        },
        draw: function() {
            if (this.debug) {
                ig.system.context.fillStyle = 'rgba(255,0,255,0.3)';
                ig.system.context.fillRect((this.trap.pos.x - this.pos.x) * ig.system.scale, (this.trap.pos.y - this.pos.y) * ig.system.scale, this.trap.size.x * ig.system.scale, this.trap.size.y * ig.system.scale);
            }
        }
    });
});﻿
var soundArray = new Array(); // lib/plugins/soundController.js
ig.baked = true;
ig.module('plugins.soundController').defines(function() {
    InGameSoundController = ig.Class.extend({
        myAudioContext: null,
        mySource: null,
        myBuffer: null,
        gameSounds: null,
        gameMusic: null,
        songNumber: 1,
        mute: false,
        init: function() {
            this.gameSounds = new Howl({
                urls: ['media/sounds/sounds.mp3'],
                sprite: {
                    laugh1: [0, 543],
                    laugh2: [1000, 638],
                    laugh3: [2000, 900],
                    laugh4: [3000, 480],
                    laugh5: [4000, 810],
                    hohoho: [5000, 1345],
                    click1: [7000, 400],
                    click2: [8000, 400],
                    click3: [9000, 820],
                    knock1: [10000, 130],
                    knock2: [11000, 130],
                    knock3: [12000, 130],
                    boom1: [13000, 250],
                    boom2: [14000, 650],
                    pad1: [15000, 400],
                    pad2: [16000, 470],
                    speed: [17000, 880]
                }
            });
            this.trackPlay();
        },
        nextTrack: function() {
            if (this.songNumber < 1) {
                this.songNumber++;
            } else this.songNumber = 1;
            this.trackPlay();
        },
        muted: function() {
            if (Howler._muted == true || Howler.usingWebAudio == false) {
                return 1;
            } else {
                return 0;
            }
        },
        muteSwitch: function() {
            if (Howler._muted == true) {
                Howler.unmute();
                this.mute = false;
            } else {
                Howler.mute();
                this.mute = true;
            }
        },
        trackPlay: function() {
            this.gameMusic = new Howl({
                urls: ['media/sounds/song' + this.songNumber + '.mp3'],
                autoplay: true,
                onend: function() {
                    mySound.nextTrack();
                }
            });
        },
        getAudioContext: function() {
            return this.myAudioContext;
        },
        playSound: function(soundName) {
            if (Howler.noAudio == false)
                this.gameSounds.play(soundName);
        }
    });
});﻿ // lib/plugins/datastore.js
ig.baked = true;
ig.module('plugins.datastore').defines(function() {
    GameDataStore = ig.Class.extend({
        init: function() {
            canUseStorage = this.isLocalStorageAvailable();
        },
        isLocalStorageAvailable: function() {
            try {
                return "localStorage" in window && window["localStorage"] !== null;
            } catch (e) {
                return false;
            }
        },
        saveStringData: function(dataName, dataValue) {
            if (canUseStorage != false) {
                localStorage.setItem(dataName, dataValue);
            }
        },
        saveArrayData: function(dataName, dataValue) {
            if (canUseStorage != false) {
                localStorage.setItem(dataName, JSON.stringify(dataValue));
            }
        },
        loadStringData: function(dataName, isString) {
            if (canUseStorage != false) {
                if (isString == true) {
                    return localStorage.getItem(dataName);
                } else {
                    return parseInt(localStorage.getItem(dataName));
                }
            }
        },
        loadArrayData: function(dataName) {
            if (canUseStorage != false) {
                return localStorage[dataName] ? JSON.parse(localStorage[dataName]) : [];
            }
        }
    });
});﻿ // lib/game/scenes/home.js
ig.baked = true;
ig.module('game.scenes.home').requires('impact.game', 'impact.font').defines(function() {
    Home = ig.Game.extend({
        font: new ig.Font('media/fredoka-one.font.png'),
        title_rotatedevice: new ig.Image('media/rotate_phone.png'),
        titleOnScreen: null,
        campivot: null,
        setuped: false,
        wishingButton: null,
        init: function() {
            this.loadLevel(LevelMenu);
            this.clearColor = "#13155E";
            if (ig.ua.iOS) {
                document.ontouchstart = function(e) {
                    ig.input.bind(ig.KEY.MOUSE1, 'click');
                };
            } else {
                ig.input.bind(ig.KEY.MOUSE1, 'click');
            }
            this.checkPlayer();
            this.setupCamera();
            if (this.wishingButton == null) {
                this.wishingButton = ig.game.getEntitiesByType(EntityBtnwishings)[0];
            }
            this.canvas = document.getElementById('canvas');
            this.context = canvas.getContext('2d');
        },
        checkPlayer: function() {
            if (this.campivot == null) {
                this.campivot = ig.game.getEntitiesByType(EntityCamerapivot)[0];
            }
        },
        setupCamera: function() {
            this.camera = new ig.Camera(ig.system.width / 2.3, ig.system.height / 2.5, 8);
            this.camera.trap.size.x = 200;
            this.camera.trap.size.y = 200;
            this.camera.lookAhead.x = 0;
            this.camera.lookAhead.y = 0;
            this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
            this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
            this.camera.set(this.campivot);
        },
        gotoSelection: function() {
            if (this.campivot != null) {
                this.campivot.pos.y += 2500;
            }
        },
        gotoTitle: function() {
            if (this.campivot != null) {
                this.campivot.pos.y -= 2500;
            }
        },
        update: function() {
            if (levels != null && this.setuped == false) {
                lvl2 = ig.game.getEntityByName('lvl2');
                lvl3 = ig.game.getEntityByName('lvl3');
                lvl4 = ig.game.getEntityByName('lvl4');
                lvl5 = ig.game.getEntityByName('lvl5');
                for (var i = 0; i < levels.length; i++) {
                    if (levels[i].levelNumber == 2) lvl2.isOpen = levels[i].unlocked;
                    if (levels[i].levelNumber == 3) lvl3.isOpen = levels[i].unlocked;
                    if (levels[i].levelNumber == 4) lvl4.isOpen = levels[i].unlocked;
                    if (levels[i].levelNumber == 5) {
                        lvl5.isOpen = levels[i].unlocked;
                        if (levels[i].isFinished(5) == false && this.wishingButton != null) {
                            this.wishingButton.kill();
                            this.wishingButton = null;
                        }
                    }
                }
                this.setuped = true;
            }
            this.parent();
            this.camera.follow(this.campivot);
        },
        drawOverlay: function() {
            this.context.beginPath();
            this.context.rect(0, 0, ig.system.width, ig.system.height);
            this.context.fillStyle = 'rgba(0,0,0,0.6)';
            this.context.fill();
        },
        draw: function() {
            if (ig.global.changeOrient == 1) {
                this.drawOverlay();
                this.title_rotatedevice.draw(ig.system.width / 2 - 200, ig.system.height / 2 - 200);
            } else {
                this.parent();
            }
        }
    });
});﻿﻿ // lib/game/entities/santa.js
ig.baked = true;
ig.module('game.entities.santa').requires('impact.entity').defines(function() {
    EntitySanta = ig.Entity.extend({
        size: {
            x: 128,
            y: 128
        },
        offset: {
            x: 9,
            y: 4
        },
        maxVel: {
            x: 15000,
            y: 15000
        },
        type: ig.Entity.TYPE.BOTH,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,
        bounciness: 0.8,
        minBounceVelocity: 100,
        friction: {
            x: 0,
            y: 0
        },
        flySpeed: 0,
        die: false,
        hidden: false,
        started: false,
        moveright: true,
        name: "santa",
        imhappy: 0,
        imhurt: 0,
        startPos: {
            x: 0,
            y: 0
        },
        animSheet: new ig.AnimationSheet('media/santa.png', 145, 135),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.addAnim('hurt', 10, [1]);
            this.addAnim('happy', 10, [2]);
            this.startPos.x = 110;
            this.startPos.y = y;
        },
        addVelocityByAxis: function(x, y, invert) {
            if (invert == false) {
                this.vel.x += x;
                this.vel.y += y;
            } else {
                this.vel.x -= x;
                this.vel.y -= y;
            }
        },
        setVelocityByAngle: function(angle, velocity) {
            this.vel.x = Math.cos(angle) * velocity;
            this.vel.y = Math.sin(angle) * velocity;
        },
        restart: function() {
            this.vel.x = this.vel.y = 0;
            this.currentAnim.angle = 0;
            this.moveright = true;
            this.started = false;
            this.pos.x = 100;
            this.pos.y = this.startPos.y;
        },
        handleMovementTrace: function(res) {
            if (res.collision.x || res.collision.y) {
                mySound.playSound('knock1');
            }
            this.parent(res);
        },
        update: function() {
            this.currentAnim = this.anims.idle;
            if (this.started == false) {
                ig.game.showTapToStart();
                this.gravityFactor = 0;
                if (this.moveright == true && this.startPos.x + 300 > this.pos.x + 2) {
                    this.pos.x += ((this.startPos.x + 300) - this.pos.x) / 10;
                } else {
                    this.moveright = false;
                    this.currentAnim.flip.x = true;
                }
                if (this.moveright == false && this.startPos.x < this.pos.x - 2) {
                    this.pos.x += ((this.startPos.x) - this.pos.x) / 10;
                } else {
                    this.moveright = true;
                    this.currentAnim.flip.x = false;
                }
                if (ig.input.pressed('click') && ig.game.pause == false) {
                    this.gravityFactor = 1;
                    this.started = true;
                }
            } else {
                ig.game.hideTapToStart();
                if (this.vel.x != 0) this.currentAnim.angle += this.vel.x / 6000;
                if (this.vel.x > 0) this.currentAnim.flip.x = true;
                else this.currentAnim.flip.x = false;
                if (this.die == false) {
                    if (this.pos.x > 640 || this.pos.x + this.size.x < 0 || this.pos.x > 640) {
                        this.kill();
                        ig.system.setGame(MyGame);
                    }
                    if (this.vel.y < 0) {
                        curAngle = this.currentAnim.angle;
                        this.currentAnim = this.anims.idle;
                        this.currentAnim.angle = curAngle;
                    }
                } else {
                    if (ig.input.pressed('click')) {
                        ig.system.setGame(MyGame);
                    }
                    this.vel.x = this.vel.y = 0;
                    this.gravityFactor = 0;
                    this.currentAnim = this.anims.idle;
                }
            }
            if (this.imhappy > 0) {
                curAngle = this.currentAnim.angle;
                this.currentAnim = this.anims.happy;
                this.currentAnim.angle = curAngle;
                this.imhappy--;
            }
            if (this.imhurt > 0) {
                curAngle = this.currentAnim.angle;
                this.currentAnim = this.anims.hurt;
                this.currentAnim.angle = curAngle;
                this.imhurt--;
            }
            if (this.hidden == true) {
                this.currentAnim.alpha = 0;
            } else this.currentAnim.alpha = 1;
            this.parent();
        }
    });
}); // lib/game/scenes/game.js
ig.baked = true;
ig.module('game.scenes.game').requires('impact.game', 'game.entities.santa').defines(function() {
    MyGame = ig.Game.extend({
        font: new ig.Font('media/fredoka-one.font.png'),
        title_rotatedevice: new ig.Image('media/rotate_phone.png'),
        score: 0,
        gravity: 1000,
        monkeyOneTime: 1,
        player: null,
        direction: 1,
        currentColor: null,
        randomColor: null,
        increment: null,
        colorReady: false,
        bgColorsArray: ['#13155E', '#75eded', '#98efde', '#bbf1ce', '#def3bf', '#e2e8b5', '#e6dcab', '#ead0a1', '#efc597', '#f3b98d', '#f7ad83', '#f0a279', '#e7966f', '#cb7463', '#814453', '#6c374e', '#572949', '#421b44', '#2d0e40', '#18003b', '#000038', '#05003f', '#0b0a49', '#111453', '#161f5e', '#1c2968', '#223372', '#27468e', '#1a5c9e', '#0d73af', '#0089bf', '#0d97cb', '#1ba5d7', '#28b3e4', '#36c1f0', '#43cffc'],
        bgColorIndex: 0,
        stopBGChanger: 0,
        nowPlayLaught: 0,
        nowPlayEscalator: 0,
        btnPause: null,
        toyslogo: null,
        btnHome: null,
        btnRestart: null,
        btnMoreGames: null,
        btnPlay: null,
        btnSound: null,
        canvas: null,
        context: null,
        overlayAlpha: 0,
        myToys: null,
        loadedToys: [],
        allToysQuantity: 0,
        collectedToys: 0,
        currentBarSize: 0,
        pause: false,
        tutorial: false,
        complete: false,
        unlockedNote: false,
        lblTapTo: null,
        lblFindNote: null,
        lblTutorial: null,
        lblComplete: null,
        toysOnScreen: [],
        padsOnScreen: [],
        noteOnScreen: null,
        oneTime: false,
        paralax: null,
        init: function() {
            curLev = ig.global['LevelLvl' + currenLevel];
            this.loadLevel(curLev);
            this.clearColor = this.bgColorsArray[this.bgColorIndex];
            this.colorCycle();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            this.randomColor = this.getNextBgColor();
            this.checkPlayer();
            this.setupCamera();
            this.canvas = document.getElementById('canvas');
            this.context = canvas.getContext('2d');
            this.myToys = ig.game.getEntitiesByType(EntityToys);
            this.allToysQuantity = this.myToys.length;
            this.loadedToys = dataSaver.loadArrayData('xfevertoys' + currenLevel);
            if (this.loadedToys.length > 0) {
                for (var i = 0; i < this.loadedToys.length; i++) {
                    var iFound = this.findToys(this.myToys, this.loadedToys[i]);
                    if (iFound != -1) {
                        iFound.kill();
                        this.collectedToys++;
                    }
                }
            }
            dataSaver.saveArrayData('xfevertoys' + currenLevel, this.loadedToys);
            if (currenLevel == 1 && this.oneTime == false) {
                this.tutorial = true;
                var tmpToys = ig.game.getEntitiesByType(EntityToys);
                for (var i = 0; i < tmpToys.length; i++) {
                    if (tmpToys[i].pos.y > 7000) {
                        this.toysOnScreen.push(tmpToys[i]);
                    }
                }
                var tmpPads = ig.game.getEntitiesByType(EntityPad);
                for (var i = 0; i < tmpPads.length; i++) {
                    if (tmpPads[i].pos.y > 7000) {
                        this.padsOnScreen.push(tmpPads[i]);
                    }
                }
                this.noteOnScreen = ig.game.getEntitiesByType(EntityNote)[0];
                this.oneTime = true;
            }
            this.canvas = document.getElementById('canvas');
            this.context = canvas.getContext('2d');
        },
        findToys: function(array, posData) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].startPos == posData) return array[i];
            }
            return -1;
        },
        toysStore: function(startPos) {
            this.loadedToys.push(startPos);
            dataSaver.saveArrayData('xfevertoys' + currenLevel, this.loadedToys);
            this.collectedToys++;
        },
        setupCamera: function() {
            this.camera = new ig.Camera(ig.system.width / 2.3, ig.system.height / 2.5, 8);
            this.camera.trap.size.x = 320;
            this.camera.trap.size.y = 200;
            this.camera.lookAhead.x = 0;
            this.camera.lookAhead.y = 0;
            this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
            this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
            this.camera.set(this.player);
        },
        checkPlayer: function() {
            if (this.player == null) {
                this.player = ig.game.getEntitiesByType(EntitySanta)[0];
            }
        },
        getRandomColor: function() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var hexR = r.toString(16);
            var hexG = g.toString(16);
            var hexB = b.toString(16);
            if (hexR.length == 1) {
                hexR = "0" + hexR;
            }
            if (hexG.length == 1) {
                hexG = "0" + hexG;
            }
            if (hexB.length == 1) {
                hexB = "0" + hexB;
            }
            var hexColor = "#" + hexR + hexG + hexB;
            return hexColor.toUpperCase();
        },
        hexToRgb: function(hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                0: parseInt(result[1], 16),
                1: parseInt(result[2], 16),
                2: parseInt(result[3], 16)
            } : null;
        },
        getElementColorArray: function(hexcolor) {
            color = this.hexToRgb(hexcolor);
            return color;
        },
        generateRGB: function() {
            var color = [];
            for (var i = 0; i < 3; i++) {
                color.push(Math.floor(Math.random() * 250));
            }
            return color;
        },
        RGBtoHex: function(color) {
            var hex = [];
            for (var i = 0; i < 3; i++) {
                if (color[i] > 254) color[i] = 255;
                if (color[i] < 0) color[i] = 0;
                hex.push(color[i].toString(16));
                if (hex[i].length < 2) {
                    hex[i] = "0" + hex[i];
                }
            }
            return "#" + hex[0] + hex[1] + hex[2];
        },
        colorDistance: function(cur, next) {
            var distance = [];
            for (var i = 0; i < 3; i++) {
                distance.push(Math.abs(cur[i] - next[i]));
            }
            return distance;
        },
        calculateIncrement: function(distance) {
            var increment = [];
            for (var i = 0; i < 3; i++) {
                increment.push(Math.abs(Math.floor(distance[i] / 200)));
                if (increment[i] == 0) {
                    increment[i] ++;
                }
            }
            return increment;
        },
        getNextBgColor: function() {
            this.bgColorIndex++;
            if (this.bgColorIndex >= this.bgColorsArray.length) this.bgColorIndex = 0;
            return this.hexToRgb(this.bgColorsArray[this.bgColorIndex]);
        },
        colorCycle: function() {
            this.currentColor = this.hexToRgb(this.clearColor);
            this.randomColor = this.getNextBgColor();
            this.increment = this.calculateIncrement(this.colorDistance(this.currentColor, this.randomColor));
        },
        transition: function() {
            if (this.currentColor[0] > this.randomColor[0]) {
                this.currentColor[0] -= this.increment[0];
                if (this.currentColor[0] <= this.randomColor[0]) {
                    this.increment[0] = 0;
                }
            } else {
                this.currentColor[0] += this.increment[0];
                if (this.currentColor[0] >= this.randomColor[0]) {
                    this.increment[0] = 0;
                }
            }
            if (this.currentColor[1] > this.randomColor[1]) {
                this.currentColor[1] -= this.increment[1];
                if (this.currentColor[1] <= this.randomColor[1]) {
                    this.increment[1] = 0;
                }
            } else {
                this.currentColor[1] += this.increment[1];
                if (this.currentColor[1] >= this.randomColor[1]) {
                    this.increment[1] = 0;
                }
            }
            if (this.currentColor[2] > this.randomColor[2]) {
                this.currentColor[2] -= this.increment[2];
                if (this.currentColor[2] <= this.randomColor[2]) {
                    this.increment[2] = 0;
                }
            } else {
                this.currentColor[2] += this.increment[2];
                if (this.currentColor[2] >= this.randomColor[2]) {
                    this.increment[2] = 0;
                }
            }
            this.clearColor = this.RGBtoHex(this.currentColor);
            if (this.increment[0] == 0 && this.increment[1] == 0 && this.increment[2] == 0 && this.colorReady == true) {
                this.colorCycle();
            }
        },
        checkScore: function() {
            var tmpScore = (this.score / 5) - parseInt(this.score / 5);
            if (tmpScore == 0 && this.score >= 5) {
                console.log(this.score);
                this.colorReady = true;
            } else this.colorReady = false;
        },
        updatebar: function() {
            this.currentBarSize += ((119 / this.allToysQuantity) * this.collectedToys - this.currentBarSize) / 10;
            if (this.allToysQuantity <= this.collectedToys) {
                this.unlockedNote = true;
                this.showFindNote();
            }
        },
        showFindNote: function() {
            if (this.lblFindNote == null) {
                this.lblFindNote = ig.game.spawnEntity(EntityLblfindnote, 64, -100);
            }
        },
        showTapToStart: function() {
            if (this.lblTapTo == null) {
                this.lblTapTo = ig.game.spawnEntity(EntityLbltapto, 64, -100);
                this.lblTapTo.pos = {
                    x: 64,
                    y: this.player.pos.y + 160
                };
            }
        },
        showTutorial: function() {
            if (this.lblTutorial == null) {
                this.lblTutorial = ig.game.spawnEntity(EntityLbltutor, 64, -100);
                this.lblTutorial.pos = {
                    x: 0,
                    y: this.player.pos.y - 479
                };
            }
        },
        hideTapToStart: function() {
            if (this.lblTapTo != null) {
                this.lblTapTo.die = true;
                this.lblTapTo = null;
            }
        },
        update: function() {
            this.updatebar();
            if (this.complete == true) {
                this.camera.follow(this.player);
                if (this.lblComplete == null) this.lblComplete = ig.game.spawnEntity(EntityLblcomplete, ig.game.screen.x + ig.system.width / 2 - 175, ig.game.screen.y);
                else {
                    springMovement(this.lblComplete, ig.game.screen.x + ig.system.width / 2 - 175, ig.game.screen.y + 400, randomizer(.5, .75));
                    this.lblComplete.update();
                }
                if (this.btnHome == null) this.btnHome = ig.game.spawnEntity(EntityBtnhome, ig.game.screen.x + ig.system.width / 2 - 180, ig.game.screen.y);
                else {
                    springMovement(this.btnHome, ig.game.screen.x + ig.system.width / 2 - 180, ig.game.screen.y + 450, randomizer(.5, .75));
                    this.btnHome.update();
                }
                if (this.btnMoreGames == null) this.btnMoreGames = ig.game.spawnEntity(EntityBtnmoregames, ig.game.screen.x + ig.system.width / 2 + 120, ig.game.screen.y);
                else {
                    springMovement(this.btnMoreGames, ig.game.screen.x + ig.system.width / 2 + 120, ig.game.screen.y + 400, randomizer(.5, .75));
                    this.btnMoreGames.update();
                }
                if (this.btnPlay == null) this.btnPlay = ig.game.spawnEntity(EntityBtnplay, ig.game.screen.x + ig.system.width / 2 + 10, ig.game.screen.y);
                else {
                    springMovement(this.btnPlay, ig.game.screen.x + ig.system.width / 2 + 10, ig.game.screen.y + 540);
                    this.btnPlay.update();
                }
            } else if (this.tutorial == true) {
                this.camera.follow(this.player);
                if (this.btnPause != null) {
                    this.btnPause.pos.x = ig.game.screen.x + ig.system.width / 2 + 185;
                    this.btnPause.pos.y = ig.game.screen.y + 15;
                } else this.btnPause = ig.game.spawnEntity(EntityBtnpause, -100, -100);
                if (this.toyslogo != null) {
                    this.toyslogo.pos.x = ig.game.screen.x + ig.system.width / 2 - 245;
                    this.toyslogo.pos.y = ig.game.screen.y + 15;
                } else this.toyslogo = ig.game.spawnEntity(EntityToyslogo, -100, -100);
                this.showTutorial();
                if (this.lblTutorial != null) this.lblTutorial.update();
                if (ig.input.pressed('click')) {
                    this.lblTutorial.die = true;
                }
                if (this.toysOnScreen != null) {
                    for (var i = 0; i < this.toysOnScreen.length; i++) {
                        this.toysOnScreen[i].update();
                    }
                }
            } else if (this.pause == false) {
                this.parent();
                if (this.nowPlayEscalator > 0) this.nowPlayEscalator--;
                if (this.nowPlayLaught > 0) this.nowPlayLaught--;
                this.camera.follow(this.player);
                if (this.btnPause != null) {
                    this.btnPause.pos.x = ig.game.screen.x + ig.system.width / 2 + 185;
                    this.btnPause.pos.y = ig.game.screen.y + 15;
                } else this.btnPause = ig.game.spawnEntity(EntityBtnpause, -100, -100);
                if (this.toyslogo != null) {
                    this.toyslogo.pos.x = ig.game.screen.x + ig.system.width / 2 - 245;
                    this.toyslogo.pos.y = ig.game.screen.y + 15;
                } else this.toyslogo = ig.game.spawnEntity(EntityToyslogo, -100, -100);
                if (this.btnHome != null && this.overlayAlpha > 0) springMovement(this.btnHome, ig.game.screen.x + ig.system.width / 2 - 100, ig.game.screen.y - 500, randomizer(50, 75, true) / 100);
                if (this.btnRestart != null && this.overlayAlpha > 0) springMovement(this.btnRestart, ig.game.screen.x + ig.system.width / 2 + 40, ig.game.screen.y - 500, randomizer(50, 75, true) / 100);
                if (this.btnMoreGames != null && this.overlayAlpha > 0) springMovement(this.btnMoreGames, ig.game.screen.x + ig.system.width / 2 + 140, ig.game.screen.y - 500, randomizer(50, 75, true) / 100);
                if (this.btnSound != null && this.overlayAlpha > 0) springMovement(this.btnSound, ig.game.screen.x + ig.system.width / 2 - 180, ig.game.screen.y - 500, randomizer(50, 75, true) / 100);
                if (this.btnPlay != null && this.overlayAlpha > 0) springMovement(this.btnPlay, ig.game.screen.x + ig.system.width / 2 - 40, ig.game.screen.y - 500, .76);
                if (this.overlayAlpha < .01 && this.btnHome != null) this.btnHome.kill();
                if (this.overlayAlpha < .01 && this.btnRestart != null) this.btnRestart.kill();
                if (this.overlayAlpha < .01 && this.btnMoreGames != null) this.btnMoreGames.kill();
                if (this.overlayAlpha < .01 && this.btnSound != null) this.btnSound.kill();
                if (this.overlayAlpha < .01 && this.btnPlay != null) this.btnPlay.kill();
            } else {
                this.camera.follow(this.player);
                if (this.btnPause != null) {
                    this.btnPause.pos.x = ig.game.screen.x + ig.system.width / 2 + 185;
                    this.btnPause.pos.y = ig.game.screen.y + 15;
                } else this.btnPause = ig.game.spawnEntity(EntityBtnpause, -100, -100);
                if (this.toyslogo != null) {
                    this.toyslogo.pos.x = ig.game.screen.x + ig.system.width / 2 - 245;
                    this.toyslogo.pos.y = ig.game.screen.y + 15;
                } else this.toyslogo = ig.game.spawnEntity(EntityToyslogo, -100, -100);
                if (this.btnHome == null) this.btnHome = ig.game.spawnEntity(EntityBtnhome, ig.game.screen.x + ig.system.width / 2 - 100, ig.game.screen.y);
                else {
                    springMovement(this.btnHome, ig.game.screen.x + ig.system.width / 2 - 100, ig.game.screen.y + 300, (randomizer(50, 90, true) / 100), 4);
                    this.btnHome.update();
                }
                if (this.btnRestart == null) this.btnRestart = ig.game.spawnEntity(EntityBtnrestart, ig.game.screen.x + ig.system.width / 2 + 40, ig.game.screen.y);
                else {
                    springMovement(this.btnRestart, ig.game.screen.x + ig.system.width / 2 + 40, ig.game.screen.y + 300, randomizer(50, 80, true) / 100, 4);
                    this.btnRestart.update();
                }
                if (this.btnMoreGames == null) this.btnMoreGames = ig.game.spawnEntity(EntityBtnmoregames, ig.game.screen.x + ig.system.width / 2 + 140, ig.game.screen.y);
                else {
                    springMovement(this.btnMoreGames, ig.game.screen.x + ig.system.width / 2 + 140, ig.game.screen.y + 370, randomizer(50, 90, true) / 100, 4);
                    this.btnMoreGames.update();
                }
                if (this.btnSound == null) this.btnSound = ig.game.spawnEntity(EntityBtnsound, ig.game.screen.x + ig.system.width / 2 - 180, ig.game.screen.y);
                else {
                    springMovement(this.btnSound, ig.game.screen.x + ig.system.width / 2 - 180, ig.game.screen.y + 370, randomizer(50, 90, true) / 100, 4);
                    this.btnSound.update();
                }
                if (this.btnPlay == null) this.btnPlay = ig.game.spawnEntity(EntityBtnplay, ig.game.screen.x + ig.system.width / 2 - 40, ig.game.screen.y);
                else {
                    springMovement(this.btnPlay, ig.game.screen.x + ig.system.width / 2 - 40, ig.game.screen.y + 440, .75, 3);
                    this.btnPlay.update();
                }
            }
        },
        drawOverlay: function() {
            this.context.beginPath();
            this.context.rect(0, 0, ig.system.width, ig.system.height);
            this.context.fillStyle = 'rgba(0,0,0,0.6)';
            this.context.fill();
        },
        draw: function() {
            if (ig.global.changeOrient == 1) {
                this.drawOverlay();
                this.title_rotatedevice.draw(ig.system.width / 2 - 200, ig.system.height / 2 - 200);
            } else {
                this.parent();
                this.context.beginPath();
                this.context.rect((this.toyslogo.pos.x + 59) - ig.game.screen.x, (this.toyslogo.pos.y + 25) - ig.game.screen.y, this.currentBarSize, 10);
                this.context.fillStyle = 'rgba(255,255,255,1)';
                this.context.fill();
                if (this.pause == true || this.tutorial == true || this.complete) {
                    if (this.overlayAlpha < 0.5) this.overlayAlpha += 0.01;
                    this.context.beginPath();
                    this.context.rect(0, 0, ig.system.width, ig.system.height);
                    this.context.fillStyle = 'rgba(0,0,0,' + this.overlayAlpha + ')';
                    this.context.fill();
                    if (this.complete == true) {
                        if (this.btnHome) this.btnHome.draw();
                        if (this.btnPlay) this.btnPlay.draw();
                        if (this.lblComplete) this.lblComplete.draw();
                        if (this.btnMoreGames) this.btnMoreGames.draw();
                    }
                    if (this.pause == true) {
                        if (this.btnRestart) this.btnRestart.draw();
                        if (this.btnHome) this.btnHome.draw();
                        if (this.btnSound) this.btnSound.draw();
                        if (this.btnMoreGames) this.btnMoreGames.draw();
                        if (this.btnPlay) this.btnPlay.draw();
                    }
                    if (this.tutorial == true) {
                        this.lblTutorial.draw();
                        if (this.noteOnScreen != null) this.noteOnScreen.draw();
                        if (this.padsOnScreen != null) {
                            for (var i = 0; i < this.padsOnScreen.length; i++) {
                                this.padsOnScreen[i].draw();
                            }
                        }
                        if (this.toysOnScreen != null) {
                            for (var i = 0; i < this.toysOnScreen.length; i++) {
                                this.toysOnScreen[i].draw();
                            }
                        }
                    }
                } else if (this.overlayAlpha > 0) {
                    if (this.overlayAlpha < 0) this.overlayAlpha = 0;
                    this.context.beginPath();
                    this.context.rect(0, 0, ig.system.width, ig.system.height);
                    this.context.fillStyle = 'rgba(0,0,0,' + this.overlayAlpha + ')';
                    this.context.fill();
                    if (this.btnRestart != null) this.btnRestart.draw();
                    if (this.btnHome != null) this.btnHome.draw();
                    if (this.btnSound != null) this.btnSound.draw();
                    if (this.btnMoreGames != null) this.btnMoreGames.draw();
                    if (this.btnPlay != null) this.btnPlay.draw();
                    this.overlayAlpha -= 0.01;
                }
            }
        }
    });
});﻿ // lib/game/scenes/greatings.js
ig.baked = true;
ig.module('game.scenes.greatings').requires('impact.game', 'impact.font').defines(function() {
    Greatings = ig.Game.extend({
        font: new ig.Font('media/fredoka-one.font.png'),
        title_rotatedevice: new ig.Image('media/rotate_phone.png'),
        titleOnScreen: null,
        campivot: null,
        setuped: false,
        wishYou: null,
        init: function() {
            this.loadLevel(LevelFinish);
            this.clearColor = "#94DED0";
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            this.checkPlayer();
            this.setupCamera();
            this.canvas = document.getElementById('canvas');
            this.context = canvas.getContext('2d');
        },
        checkPlayer: function() {
            if (this.campivot == null) {
                this.campivot = ig.game.getEntitiesByType(EntityCamerapivot)[0];
            }
        },
        setupCamera: function() {
            this.camera = new ig.Camera(ig.system.width / 2.3, ig.system.height / 2.5, 8);
            this.camera.trap.size.x = 200;
            this.camera.trap.size.y = 200;
            this.camera.lookAhead.x = 0;
            this.camera.lookAhead.y = 0;
            this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
            this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
            this.camera.set(this.campivot);
        },
        gotoSelection: function() {
            if (this.campivot != null) {
                this.campivot.pos.y += 2500;
            }
        },
        gotoTitle: function() {
            if (this.campivot != null) {
                this.campivot.pos.y -= 2500;
            }
        },
        update: function() {
            this.parent();
            this.camera.follow(this.campivot);
            if (this.wishYou == null) this.wishYou = ig.game.spawnEntity(EntityLblwishyou, ig.game.screen.x + ig.system.width / 2 - 122, ig.game.screen.y);
            else {
                springMovement(this.wishYou, ig.game.screen.x + ig.system.width / 2 - 122, ig.game.screen.y + 335, randomizer(.5, .75));
                this.wishYou.update();
            }
        },
        drawOverlay: function() {
            this.context.beginPath();
            this.context.rect(0, 0, ig.system.width, ig.system.height);
            this.context.fillStyle = 'rgba(0,0,0,0.6)';
            this.context.fill();
        },
        draw: function() {
            if (ig.global.changeOrient == 1) {
                this.drawOverlay();
                this.title_rotatedevice.draw(ig.system.width / 2 - 200, ig.system.height / 2 - 200);
            } else {
                this.parent();
            }
        }
    });
});﻿ // lib/game/entities/btnpause.js
ig.baked = true;
ig.module('game.entities.btnpause').requires('impact.entity').defines(function() {
    EntityBtnpause = ig.Entity.extend({
        size: {
            x: 62,
            y: 62
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/pause.png', 62, 62),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click1');
                if (ig.game.pause == true) ig.game.pause = false;
                else ig.game.pause = true;
            }
        }
    });
});﻿ // lib/game/entities/btnplay.js
ig.baked = true;
ig.module('game.entities.btnplay').requires('impact.entity').defines(function() {
    EntityBtnplay = ig.Entity.extend({
        size: {
            x: 107,
            y: 111
        },
        offset: {
            x: 0,
            y: 652
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/play.png', 107, 763),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click2');
                if (ig.game.pause == true) ig.game.pause = false;
                else if (ig.game.complete == true) {
                    if (currenLevel < 5) {
                        currenLevel++;
                        gotoGame();
                    } else gotoFinish();
                } else ig.game.gotoSelection();
            }
        }
    });
});﻿ // lib/game/entities/btnrestart.js
ig.baked = true;
ig.module('game.entities.btnrestart').requires('impact.entity').defines(function() {
    EntityBtnrestart = ig.Entity.extend({
        size: {
            x: 87,
            y: 87
        },
        offset: {
            x: 0,
            y: 518
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/restart.png', 87, 605),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click2');
                gotoGame();
            }
        }
    });
});﻿ // lib/game/entities/btnhome.js
ig.baked = true;
ig.module('game.entities.btnhome').requires('impact.entity').defines(function() {
    EntityBtnhome = ig.Entity.extend({
        size: {
            x: 87,
            y: 87
        },
        offset: {
            x: 0,
            y: 518
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/home.png', 87, 605),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click2');
                gotoIntro();
            }
        }
    });
});﻿ // lib/game/entities/toyslogo.js
ig.baked = true;
ig.module('game.entities.toyslogo').requires('impact.entity').defines(function() {
    EntityToyslogo = ig.Entity.extend({
        size: {
            x: 183,
            y: 61
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/gift_bar.png', 183, 61),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
        }
    });
});﻿ // lib/game/entities/levelItemData.js
ig.baked = true;
ig.module('game.entities.levelItemData').defines(function() {
    LevelItemData = ig.Class.extend({
        levelNumber: 0,
        unlocked: false,
        finished: false,
        stars: 0,
        init: function(settings) {
            this.levelNumber = settings.levelNumber;
            this.unlocked = settings.unlocked;
            this.finished = settings.finished;
        },
        unlockLevel: function() {
            this.unlocked = true;
        },
        finishLevel: function() {
            this.finished = true;
        },
        isFinished: function(levelNumber) {
            for (var i = 0; i < levels.length; i++) {
                if (levels[i].levelNumber == levelNumber && levels[i].finished == true) {
                    return true;
                }
            }
            return false;
        }
    });
});﻿ // lib/game/entities/lbltapto.js
ig.baked = true;
ig.module('game.entities.lbltapto').requires('impact.entity').defines(function() {
    EntityLbltapto = ig.Entity.extend({
        size: {
            x: 512,
            y: 70
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        speedMoveX: 0,
        speedMoveY: 0,
        zIndex: -1,
        speed: 5,
        angle: 0,
        die: false,
        animSheet: new ig.AnimationSheet('media/replaceforlang/start.png', 512, 70),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            this.angle += this.speed * ig.system.tick;
            this.currentAnim.alpha = (Math.sin(this.angle) + 1) / 2;
            if (this.die == true && this.currentAnim.alpha <= 0.02) {
                console.log('die');
                this.kill();
            }
            this.parent();
        }
    });
});﻿ // lib/game/entities/lblfindnote.js
ig.baked = true;
ig.module('game.entities.lblfindnote').requires('impact.entity').defines(function() {
    EntityLblfindnote = ig.Entity.extend({
        size: {
            x: 512,
            y: 100
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 1,
        lifeTime: 0,
        alpha: 0,
        die: false,
        animSheet: new ig.AnimationSheet('media/replaceforlang/unfrozen.png', 512, 100),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            this.parent();
            if (this.lifeTime < 180) {
                this.pos.y = ig.game.screen.y + ig.system.height / 2 - 50;
            } else this.die = true;
            if (this.die == false && this.alpha <= 1) {
                this.alpha += 0.01;
                this.currentAnim.alpha = this.alpha;
            } else {
                this.alpha -= 0.01;
                this.currentAnim.alpha = this.alpha;
                if (this.alpha < 0.05) this.kill();
            }
            this.lifeTime++;
        }
    });
});﻿ // lib/game/entities/lbltutor.js
ig.baked = true;
ig.module('game.entities.lbltutor').requires('impact.entity').defines(function() {
    EntityLbltutor = ig.Entity.extend({
        size: {
            x: 640,
            y: 960
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        speedMoveX: 0,
        speedMoveY: 0,
        zIndex: -1,
        alpha: 0,
        die: false,
        animSheet: new ig.AnimationSheet('media/replaceforlang/tutorial_screen.png', 640, 960),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            if (this.die == false) {
                if (this.alpha <= 1) this.alpha += 0.01;
                this.currentAnim.alpha = this.alpha;
            } else {
                this.alpha -= 0.04;
                ig.game.tutorial = false;
                this.currentAnim.alpha = this.alpha;
                if (this.alpha < 0.02) {
                    this.kill();
                }
            }
            this.parent();
        }
    });
});﻿ // lib/game/entities/lblcomplete.js
ig.baked = true;
ig.module('game.entities.lblcomplete').requires('impact.entity').defines(function() {
    EntityLblcomplete = ig.Entity.extend({
        size: {
            x: 350,
            y: 97
        },
        offset: {
            x: 0,
            y: 700
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 110,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/replaceforlang/level_complete.png', 350, 797),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            this.parent();
        }
    });
});﻿ // lib/game/entities/lblwishyou.js
ig.baked = true;
ig.module('game.entities.lblwishyou').requires('impact.entity').defines(function() {
    EntityLblwishyou = ig.Entity.extend({
        size: {
            x: 245,
            y: 34
        },
        offset: {
            x: 0,
            y: 450
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 120,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/replaceforlang/wishing.png', 245, 484),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            this.parent();
        }
    });
});﻿ // lib/game/entities/camerapivot.js
ig.baked = true;
ig.module('game.entities.camerapivot').requires('impact.entity').defines(function() {
    EntityCamerapivot = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        speedMoveX: 0,
        speedMoveY: 0,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },
        update: function() {
            this.parent();
        }
    });
});﻿ // lib/game/entities/selectionbg.js
ig.baked = true;
ig.module('game.entities.selectionbg').requires('impact.entity').defines(function() {
    EntitySelectionbg = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        speedMoveX: 0,
        speedMoveY: 0,
        zIndex: 3,
        animSheet: new ig.AnimationSheet('media/back.png', 640, 290),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            this.parent();
        }
    });
});﻿ // lib/game/entities/btnsound.js
ig.baked = true;
ig.module('game.entities.btnsound').requires('impact.entity').defines(function() {
    EntityBtnsound = ig.Entity.extend({
        size: {
            x: 71,
            y: 75
        },
        offset: {
            x: 0,
            y: 595
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/sound.png', 71, 670),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('on', 10, [0]);
            this.addAnim('off', 10, [1]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click1');
                mySound.muteSwitch();
            }
            if (mySound.mute == true) {
                this.currentAnim = this.anims.off;
                dataSaver.saveStringData('xfeversound', 0);
            } else {
                this.currentAnim = this.anims.on;
                dataSaver.saveStringData('xfeversound', 1);
            }
        }
    });
});﻿ // lib/game/entities/btnmoregames.js
ig.baked = true;
ig.module('game.entities.btnmoregames').requires('impact.entity').defines(function() {
    EntityBtnmoregames = ig.Entity.extend({
        size: {
            x: 70,
            y: 76
        },
        offset: {
            x: 0,
            y: 524
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/replaceforlang/more_games.png', 70, 600),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                window.location.href = ig.global.link_moregames;
            }
        }
    });
});﻿ // lib/game/entities/levelselection.js
ig.baked = true;
ig.module('game.entities.levelselection').requires('impact.entity').defines(function() {
    EntityLevelselection = ig.Entity.extend({
        size: {
            x: 92,
            y: 92
        },
        offset: {
            x: 233,
            y: 130
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        animSheet: new ig.AnimationSheet('media/replaceforlang/choose_level.png', 325, 222),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click1');
                ig.game.gotoTitle();
            }
        }
    });
});﻿ // lib/game/entities/btnwishings.js
ig.baked = true;
ig.module('game.entities.btnwishings').requires('impact.entity').defines(function() {
    EntityBtnwishings = ig.Entity.extend({
        size: {
            x: 208,
            y: 110
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: 5,
        speedMoveX: 0,
        speedMoveY: 0,
        animSheet: new ig.AnimationSheet('media/replaceforlang/wishings.png', 208, 110),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.5, [0, 1]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            this.parent();
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click1');
                gotoFinish();
            }
        }
    });
});﻿ // lib/game/entities/level2.js
ig.baked = true;
ig.module('game.entities.level2').requires('impact.entity').defines(function() {
    EntityLevel2 = ig.Entity.extend({
        size: {
            x: 65,
            y: 95
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        name: 'lvl2',
        gravityFactor: 0,
        zIndex: 6,
        isOpen: false,
        animSheet: new ig.AnimationSheet('media/2.png', 65, 95),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('closed', 10, [0]);
            this.addAnim('open', 10, [1]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            if (this.isOpen) this.currentAnim = this.anims.open;
            if (ig.input.released('click') && this._inButton() && this.isOpen == true) {
                mySound.playSound('click1');
                currenLevel = 2;
                gotoGame();
            }
        }
    });
});﻿ // lib/game/entities/level3.js
ig.baked = true;
ig.module('game.entities.level3').requires('impact.entity').defines(function() {
    EntityLevel3 = ig.Entity.extend({
        size: {
            x: 80,
            y: 117
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        name: 'lvl3',
        gravityFactor: 0,
        zIndex: 6,
        isOpen: false,
        animSheet: new ig.AnimationSheet('media/3.png', 80, 117),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('closed', 10, [0]);
            this.addAnim('open', 10, [1]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            if (this.isOpen) this.currentAnim = this.anims.open;
            if (ig.input.released('click') && this._inButton() && this.isOpen == true) {
                mySound.playSound('click1');
                currenLevel = 3;
                gotoGame();
            }
        }
    });
});﻿ // lib/game/entities/level4.js
ig.baked = true;
ig.module('game.entities.level4').requires('impact.entity').defines(function() {
    EntityLevel4 = ig.Entity.extend({
        size: {
            x: 62,
            y: 111
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        name: 'lvl4',
        gravityFactor: 0,
        zIndex: 6,
        isOpen: false,
        animSheet: new ig.AnimationSheet('media/4.png', 62, 111),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('closed', 10, [0]);
            this.addAnim('open', 10, [1]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            if (this.isOpen) this.currentAnim = this.anims.open;
            if (ig.input.released('click') && this._inButton() && this.isOpen == true) {
                mySound.playSound('click1');
                currenLevel = 4;
                gotoGame();
            }
        }
    });
});﻿ // lib/game/entities/level1.js
ig.baked = true;
ig.module('game.entities.level1').requires('impact.entity').defines(function() {
    EntityLevel1 = ig.Entity.extend({
        size: {
            x: 71,
            y: 90
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        name: 'lvl1',
        gravityFactor: 0,
        zIndex: 6,
        animSheet: new ig.AnimationSheet('media/1.png', 71, 90),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('open', 10, [0]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            if (ig.input.released('click') && this._inButton()) {
                mySound.playSound('click1');
                currenLevel = 1;
                gotoGame();
            }
        }
    });
});﻿ // lib/game/entities/level5.js
ig.baked = true;
ig.module('game.entities.level5').requires('impact.entity').defines(function() {
    EntityLevel5 = ig.Entity.extend({
        size: {
            x: 83,
            y: 84
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        name: 'lvl5',
        gravityFactor: 0,
        zIndex: 6,
        isOpen: false,
        animSheet: new ig.AnimationSheet('media/5.png', 83, 84),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('closed', 10, [0]);
            this.addAnim('open', 10, [1]);
        },
        _inButton: function() {
            return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
        },
        update: function() {
            if (this.isOpen) this.currentAnim = this.anims.open;
            if (ig.input.released('click') && this._inButton() && this.isOpen == true) {
                mySound.playSound('click1');
                currenLevel = 5;
                gotoGame();
            }
        }
    });
});﻿ // lib/game/entities/title.js
ig.baked = true;
ig.module('game.entities.title').requires('impact.entity').defines(function() {
    EntityTitle = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        speedMoveX: 0,
        speedMoveY: 0,
        zIndex: 100,
        animSheet: new ig.AnimationSheet('media/logo.png', 280, 695),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            this.parent();
        }
    });
}); // lib/game/levels/menu.js
ig.baked = true;
ig.module('game.levels.menu').requires('impact.image', 'game.entities.camerapivot', 'game.entities.selectionbg', 'game.entities.btnplay', 'game.entities.btnsound', 'game.entities.btnmoregames', 'game.entities.levelselection', 'game.entities.btnwishings', 'game.entities.level2', 'game.entities.level3', 'game.entities.level4', 'game.entities.level1', 'game.entities.level5', 'game.entities.title').defines(function() {
    LevelMenu = {
        "entities": [{
            "type": "EntityCamerapivot",
            "x": 280,
            "y": 300
        }, {
            "type": "EntitySelectionbg",
            "x": 0,
            "y": 2664
        }, {
            "type": "EntityBtnplay",
            "x": 328,
            "y": 556
        }, {
            "type": "EntityBtnsound",
            "x": 144,
            "y": 451
        }, {
            "type": "EntityBtnmoregames",
            "x": 464,
            "y": 416
        }, {
            "type": "EntityLevelselection",
            "x": 393,
            "y": 2642
        }, {
            "type": "EntityBtnwishings",
            "x": 216,
            "y": 2956
        }, {
            "type": "EntityLevel2",
            "x": 200,
            "y": 2796
        }, {
            "type": "EntityLevel3",
            "x": 292,
            "y": 2812
        }, {
            "type": "EntityLevel4",
            "x": 396,
            "y": 2840
        }, {
            "type": "EntityLevel1",
            "x": 104,
            "y": 2780
        }, {
            "type": "EntityLevel5",
            "x": 472,
            "y": 2804
        }, {
            "type": "EntityTitle",
            "x": 192,
            "y": -140
        }],
        "layer": [{
            "name": "back",
            "width": 10,
            "height": 10,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": true,
            "preRender": true,
            "distance": "1.7",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [56, 0, 0, 0, 0, 27, 0, 0, 30, 0],
                [0, 0, 0, 7, 0, 0, 0, 56, 0, 27],
                [0, 0, 0, 0, 49, 0, 0, 0, 0, 0],
                [0, 0, 56, 0, 0, 0, 0, 0, 49, 0],
                [0, 2, 0, 0, 30, 0, 0, 0, 27, 0],
                [27, 0, 0, 0, 0, 0, 2, 0, 0, 49],
                [0, 0, 0, 0, 27, 0, 0, 56, 0, 0],
                [0, 27, 0, 56, 0, 0, 0, 0, 0, 0],
                [0, 0, 30, 0, 0, 0, 0, 0, 30, 0],
                [0, 0, 0, 0, 0, 0, 0, 2, 0, 0]
            ]
        }, {
            "name": "collision",
            "width": 10,
            "height": 50,
            "linkWithCollision": false,
            "visible": 0,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }, {
            "name": "front",
            "width": 10,
            "height": 50,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [4, 5, 0, 0, 0, 0, 0, 0, 12, 13],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8]
            ]
        }]
    };
    LevelMenuResources = [new ig.Image('media/tiles-64.png'), new ig.Image('media/tiles-64.png')];
});﻿ // lib/game/entities/lights.js
ig.baked = true;
ig.module('game.entities.lights').requires('impact.entity').defines(function() {
    EntityLights = ig.Entity.extend({
        size: {
            x: 507,
            y: 457
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        speedMoveX: 0,
        speedMoveY: 0,
        zIndex: -2,
        animSheet: new ig.AnimationSheet('media/back_panel.png', 507, 457),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.5, [0, 1]);
        },
        update: function() {
            this.parent();
        }
    });
});﻿ // lib/game/entities/lblwishtext.js
ig.baked = true;
ig.module('game.entities.lblwishtext').requires('impact.entity').defines(function() {
    EntityLblwishtext = ig.Entity.extend({
        size: {
            x: 458,
            y: 228
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: "title",
        gravityFactor: 0,
        speedMoveX: 0,
        speedMoveY: 0,
        zIndex: -1,
        animSheet: new ig.AnimationSheet('media/replaceforlang/text.png', 458, 228),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
        },
        update: function() {
            this.parent();
        }
    });
});﻿ // lib/game/entities/houses.js
ig.baked = true;
ig.module('game.entities.houses').requires('impact.entity').defines(function() {
    EntityHouses = ig.Entity.extend({
        size: {
            x: 640,
            y: 313
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,
        bounciness: 0,
        flySpeed: 0,
        subtype: "bonus",
        curNumber: -1,
        animSheet: new ig.AnimationSheet('media/houses.png', 640, 313),
        zIndex: -1,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('blue', 10, [0]);
        },
        update: function() {
            this.parent();
        }
    });
}); // lib/game/levels/finish.js
ig.baked = true;
ig.module('game.levels.finish').requires('impact.image', 'game.entities.lights', 'game.entities.lblwishtext', 'game.entities.houses', 'game.entities.camerapivot', 'game.entities.btnmoregames', 'game.entities.btnhome').defines(function() {
    LevelFinish = {
        "entities": [{
            "type": "EntityLights",
            "x": 64,
            "y": 256
        }, {
            "type": "EntityLblwishtext",
            "x": 96,
            "y": 396
        }, {
            "type": "EntityHouses",
            "x": -636,
            "y": 648
        }, {
            "type": "EntityHouses",
            "x": 4,
            "y": 648
        }, {
            "type": "EntityHouses",
            "x": 644,
            "y": 648
        }, {
            "type": "EntityCamerapivot",
            "x": 288,
            "y": 580
        }, {
            "type": "EntityBtnmoregames",
            "x": 376,
            "y": 172
        }, {
            "type": "EntityBtnhome",
            "x": 448,
            "y": 258
        }],
        "layer": [{
            "name": "back",
            "width": 10,
            "height": 10,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": true,
            "preRender": true,
            "distance": "1.7",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [56, 0, 0, 0, 0, 27, 0, 0, 30, 0],
                [0, 0, 0, 7, 0, 0, 0, 56, 0, 27],
                [0, 0, 0, 0, 49, 0, 0, 0, 0, 0],
                [0, 0, 56, 0, 0, 0, 0, 0, 49, 0],
                [0, 2, 0, 0, 30, 0, 0, 0, 27, 0],
                [27, 0, 0, 0, 0, 0, 2, 0, 0, 49],
                [0, 0, 0, 0, 27, 0, 0, 56, 0, 0],
                [0, 27, 0, 56, 0, 0, 0, 0, 0, 0],
                [0, 0, 30, 0, 0, 0, 0, 0, 30, 0],
                [0, 0, 0, 0, 0, 0, 0, 2, 0, 0]
            ]
        }, {
            "name": "collision",
            "width": 10,
            "height": 15,
            "linkWithCollision": false,
            "visible": 0,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
            ]
        }, {
            "name": "front",
            "width": 10,
            "height": 20,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }]
    };
    LevelFinishResources = [new ig.Image('media/tiles-64.png'), new ig.Image('media/tiles-64.png')];
});﻿ // lib/game/entities/escalator.js
ig.baked = true;
ig.module('game.entities.escalator').requires('impact.entity').defines(function() {
    EntityEscalator = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        offset: {
            x: 32,
            y: 32
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        subtype: "bonus",
        upspeed: 0,
        gravityFactor: 0,
        force: 100,
        zIndex: -1,
        animSheet: new ig.AnimationSheet('media/speed.png', 128, 128),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('up', 10, [0]);
            this.addAnim('down', 10, [1]);
            if (settings.force != null) this.force = settings.force;
        },
        update: function() {
            if (this.force >= 0) {
                this.currentAnim = this.anims.up;
            } else this.currentAnim = this.anims.down;
            this.parent();
        },
        check: function(other) {
            if (other.name == 'santa') {
                if (other.vel.y < 0) {
                    other.addVelocityByAxis(0, this.force, true);
                    if (ig.game.nowPlayEscalator == 0) {
                        mySound.playSound('speed');
                        ig.game.nowPlayEscalator = 10;
                    }
                }
            }
        }
    });
});﻿ // lib/game/entities/note.js
ig.baked = true;
ig.module('game.entities.note').requires('impact.entity').defines(function() {
    EntityNote = ig.Entity.extend({
        size: {
            x: 145,
            y: 145
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,
        subtype: "title",
        gravityFactor: 0,
        zIndex: -1,
        speed: 5,
        angle: 0,
        complete: false,
        animSheet: new ig.AnimationSheet('media/notes.png', 145, 145),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('locked', 10, [0]);
            this.addAnim('unlocked', 10, [1]);
        },
        handleMovementTrace: function(res) {
            this.angle += this.speed * ig.system.tick;
            var dy = Math.sin(this.angle) * (10 * this.speed * ig.system.tick);
            this.pos.y += dy;
        },
        update: function() {
            if (ig.game.unlockedNote == false) {
                this.checkAgainst = ig.Entity.TYPE.NONE;
                this.collides = ig.Entity.COLLIDES.NONE;
                this.currentAnim = this.anims.locked;
            } else if (this.complete == false) {
                this.checkAgainst = ig.Entity.TYPE.A;
                this.collides = ig.Entity.COLLIDES.LITE;
                this.currentAnim = this.anims.unlocked;
            }
            this.parent();
        },
        check: function(other) {
            if (other.name == 'santa') {
                mySound.playSound('hohoho');
                this.checkAgainst = ig.Entity.TYPE.NONE;
                this.collides = ig.Entity.COLLIDES.NONE;
                ig.game.complete = this.complete = true;
                if (currenLevel < 5) {
                    for (var i = 0; i < levels.length; i++) {
                        if (levels[i].levelNumber == currenLevel) levels[i].finishLevel();
                    }
                    var needLevelNumer = currenLevel + 1;
                    for (var i = 0; i < levels.length; i++) {
                        if (levels[i].levelNumber == needLevelNumer) levels[i].unlockLevel();
                    }
                    dataSaver.saveArrayData('xfeverlevels', levels);
                } else {
                    for (var i = 0; i < levels.length; i++) {
                        if (levels[i].levelNumber == currenLevel) levels[i].finishLevel();
                    }
                    dataSaver.saveArrayData('xfeverlevels', levels);
                }
            }
        }
    });
});﻿ // lib/game/entities/toys.js
ig.baked = true;
ig.module('game.entities.toys').requires('impact.entity').defines(function() {
    EntityToys = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        maxVel: {
            x: 1500,
            y: 1500
        },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,
        bounciness: 0.3,
        flySpeed: 0,
        subtype: "toys",
        curNumber: -1,
        gravityFactor: 0,
        picked: -1,
        startPos: '',
        animSheet: new ig.AnimationSheet('media/presents.png', 64, 64),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.startPos = x.toString() + ';' + y.toString();
            this.addAnim('dog', 10, [0]);
            this.addAnim('drum', 10, [1]);
            this.addAnim('candy', 10, [2]);
            this.addAnim('gamepad', 10, [3]);
            this.addAnim('robot', 10, [4]);
            this.addAnim('ball', 10, [5]);
            this.addAnim('duck', 10, [6]);
            this.addAnim('tux', 10, [7]);
            this.addAnim('train', 10, [8]);
            this.addAnim('car', 10, [9]);
            this.addAnim('plane', 10, [10]);
            this.addAnim('horse', 10, [11]);
            this.addAnim('bear', 10, [12]);
            this.addAnim('fball', 10, [13]);
            this.addAnim('rocket', 10, [14]);
        },
        setVelocityByAngle: function(angle, velocity) {
            this.vel.x = Math.cos(angle) * velocity;
            this.vel.y = Math.sin(angle) * velocity;
        },
        update: function() {
            if (this.curNumber < 0) {
                this.curNumber = randomizer(0, 15, true);
            }
            switch (this.curNumber) {
                case 0:
                    this.currentAnim = this.anims.dog;
                    break;
                case 1:
                    this.currentAnim = this.anims.drum;
                    break;
                case 2:
                    this.currentAnim = this.anims.candy;
                    break;
                case 3:
                    this.currentAnim = this.anims.gamepad;
                    break;
                case 4:
                    this.currentAnim = this.anims.robot;
                    break;
                case 5:
                    this.currentAnim = this.anims.ball;
                    break;
                case 6:
                    this.currentAnim = this.anims.duck;
                    break;
                case 7:
                    this.currentAnim = this.anims.tux;
                    break;
                case 8:
                    this.currentAnim = this.anims.train;
                    break;
                case 9:
                    this.currentAnim = this.anims.car;
                    break;
                case 10:
                    this.currentAnim = this.anims.plane;
                    break;
                case 11:
                    this.currentAnim = this.anims.horse;
                    break;
                case 12:
                    this.currentAnim = this.anims.bear;
                    break;
                case 13:
                    this.currentAnim = this.anims.fball;
                    break;
                case 14:
                    this.currentAnim = this.anims.rocket;
                    break;
                default:
                    this.currentAnim = this.anims.bear;
                    break;
            }
            if (this.vel.x != 0) this.currentAnim.angle += this.vel.x / 3000;
            if (this.picked > 0) {
                this.picked--;
                this.currentAnim.alpha -= 0.01;
            }
            if (this.picked == 0) {
                this.kill();
            }
            this.parent();
        },
        check: function(other) {
            if (other.name == 'santa') {
                ig.game.toysStore(this.startPos);
                if (ig.game.nowPlayLaught == 0) {
                    var rndSound = randomizer(1, 6, true);
                    switch (rndSound) {
                        case 1:
                            mySound.playSound('laugh1');
                            break;
                        case 2:
                            mySound.playSound('laugh2');
                            break;
                        case 3:
                            mySound.playSound('laugh3');
                            break;
                        case 4:
                            mySound.playSound('laugh4');
                            break;
                        case 5:
                            mySound.playSound('laugh4');
                            break;
                        default:
                            mySound.playSound('laugh4');
                            break;
                    }
                    ig.game.nowPlayLaught = 20;
                }
                this.setVelocityByAngle(this.angleTo(other), other.vel.y / 3);
                this.gravityFactor = 1;
                this.checkAgainst = ig.Entity.TYPE.NONE;
                this.collides = ig.Entity.COLLIDES.NONE;
                this.picked = 100;
                other.imhappy = 30;
            }
        }
    });
});﻿ // lib/game/entities/pusher.js
ig.baked = true;
ig.module('game.entities.pusher').requires('impact.entity').defines(function() {
    EntityPusher = ig.Entity.extend({
        size: {
            x: 64,
            y: 64
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,
        bounciness: 0,
        flySpeed: 0,
        subtype: "bonus",
        curNumber: -1,
        animSheet: new ig.AnimationSheet('media/pusher.png', 64, 64),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('blue', 10, [0]);
            this.addAnim('yellow', 10, [1]);
            this.addAnim('green', 10, [2]);
        },
        update: function() {
            if (this.curNumber < 0) {
                this.curNumber = randomizer(0, 3, true);
            }
            switch (this.curNumber) {
                case 0:
                    this.currentAnim = this.anims.blue;
                    break;
                case 1:
                    this.currentAnim = this.anims.yellow;
                    break;
                case 2:
                    this.currentAnim = this.anims.green;
                    break;
                default:
                    this.currentAnim = this.anims.blue;
                    break;
            }
            if ((this.distanceTo(ig.game.player) < 96)) {
                mySound.playSound('pad2');
                var angle = this.angleTo(ig.game.player);
                var needVector = 1500;
                ig.game.player.setVelocityByAngle(angle, needVector);
                ig.game.player.imhurt = 10;
            }
            this.parent();
        }
    });
});﻿ // lib/game/entities/bag.js
ig.baked = true;
ig.module('game.entities.bag').requires('impact.entity').defines(function() {
    EntityBag = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0,0,200,0.5)',
        _wmScalable: true,
        checkAgainst: ig.Entity.TYPE.A,
        name: "bag",
        update: function() {},
        check: function(other) {
            if (other.name == 'santa') {
                other.restart();
            }
        }
    });
});﻿ // lib/game/entities/pad.js
ig.baked = true;
ig.module('game.entities.pad').requires('impact.entity').defines(function() {
    EntityPad = ig.Entity.extend({
        size: {
            x: 256,
            y: 256
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,
        bounciness: 0,
        flySpeed: 0,
        subtype: "bonus",
        animSheet: new ig.AnimationSheet('media/pad.png', 256, 256),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('blue', 10, [0]);
            this.addAnim('green', 10, [1]);
            this.addAnim('red', 10, [2]);
        },
        update: function() {
            this.parent();
            this.currentAnim = this.anims.blue;
            if (ig.input.pressed('click')) {
                if ((this.distanceTo(ig.game.player) < 210)) {
                    mySound.playSound('pad1');
                    ig.game.player.vel.y = 0;
                    var angle = this.angleTo(ig.game.player);
                    ig.game.player.imhurt = 10;
                    var needVector = 2000;
                    ig.game.player.setVelocityByAngle(angle, needVector);
                }
            }
            if ((this.distanceTo(ig.game.player) < 180)) {
                var angle = this.angleTo(ig.game.player);
                var needVector = ((Math.abs(ig.game.player.vel.y) + Math.abs(ig.game.player.vel.x)) / 2) * 0.8;
                if (needVector < 200) needVector = 200;
                ig.game.player.setVelocityByAngle(angle, needVector);
            }
        }
    });
});﻿ // lib/game/entities/canon.js
ig.baked = true;
ig.module('game.entities.canon').requires('impact.entity').defines(function() {
    EntityCanon = ig.Entity.extend({
        size: {
            x: 96,
            y: 96
        },
        offset: {
            x: 18,
            y: 47
        },
        maxVel: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,
        bounciness: 0,
        flySpeed: 0,
        playerInside: null,
        releasePlayer: -1,
        stepRotation: 0,
        currentRotation: 0,
        angle: 0,
        animSheet: new ig.AnimationSheet('media/canon.png', 132, 190),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.addAnim('full', 10, [1]);
            if (settings.speed != null) this.stepRotation = settings.speed;
        },
        update: function() {
            if (ig.input.pressed('click') && this.playerInside != null && this.releasePlayer == -1) {
                mySound.playSound('boom2');
                ig.game.player.setVelocityByAngle(this.angle + 4.7, 3000);
                ig.game.player.gravityFactor = 1;
                ig.game.player.hidden = false;
                this.currentAnim = this.anims.idle;
                this.currentAnim.angle = this.angle;
                this.releasePlayer = 30;
            }
            if (this.releasePlayer > -1) {
                this.currentAnim = this.anims.idle;
                this.currentRotation += (0 - this.currentRotation) / 50;
                this.releasePlayer--;
                if (this.releasePlayer == 0) this.playerInside = null;
            }
            if (this.playerInside != null && this.releasePlayer == -1) {
                this.currentAnim = this.anims.full;
                this.currentAnim.angle = this.angle;
                if (this.stepRotation != 0 && Math.abs(this.currentRotation) < Math.abs(this.stepRotation)) {
                    this.currentRotation += (this.stepRotation - this.currentRotation) / 50;
                }
            }
            if (this.currentRotation != 0 && this.playerInside == null) {
                this.currentRotation += (0 - this.currentRotation) / 50;
            }
            this.angle = this.currentAnim.angle += this.currentRotation;
            this.parent();
        },
        check: function(other) {
            if (other instanceof EntitySanta && this.playerInside == null) {
                this.currentAnim.angle = this.angle;
                mySound.playSound('boom1');
                ig.game.player.vel.x = ig.game.player.vel.y = 0;
                ig.game.player.gravityFactor = 0;
                ig.game.player.pos.x = this.pos.x + 1;
                ig.game.player.pos.y = this.pos.y + 31;
                this.playerInside = ig.game.player;
                ig.game.player.hidden = true;
            }
        }
    });
}); // lib/game/levels/lvl1.js
ig.baked = true;
ig.module('game.levels.lvl1').requires('impact.image', 'game.entities.escalator', 'game.entities.note', 'game.entities.toys', 'game.entities.pusher', 'game.entities.bag', 'game.entities.pad', 'game.entities.canon', 'game.entities.santa').defines(function() {
    LevelLvl1 = {
        "entities": [{
            "type": "EntityEscalator",
            "x": 296,
            "y": 3616,
            "settings": {
                "force": -100
            }
        }, {
            "type": "EntityEscalator",
            "x": 420,
            "y": 7988,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityNote",
            "x": 260,
            "y": 8884
        }, {
            "type": "EntityEscalator",
            "x": 460,
            "y": 3468,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 3468,
            "settings": {
                "force": -150
            }
        }, {
            "type": "EntityEscalator",
            "x": 124,
            "y": 3468,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 132,
            "y": 8464,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 380,
            "y": 5440,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 212,
            "y": 5440,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 3316,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 8460,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 252,
            "y": 7984,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityToys",
            "x": 224,
            "y": 4152
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 6712
        }, {
            "type": "EntityToys",
            "x": 260,
            "y": 4244
        }, {
            "type": "EntityPusher",
            "x": 76,
            "y": 8792
        }, {
            "type": "EntityToys",
            "x": 232,
            "y": 1376
        }, {
            "type": "EntityToys",
            "x": 156,
            "y": 7488
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 2884
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 6008
        }, {
            "type": "EntityBag",
            "x": 64,
            "y": 9604,
            "settings": {
                "size": {
                    "x": 512,
                    "y": 188
                }
            }
        }, {
            "type": "EntityToys",
            "x": 364,
            "y": 1272
        }, {
            "type": "EntityToys",
            "x": 360,
            "y": 3080
        }, {
            "type": "EntityPad",
            "x": 352,
            "y": 1504
        }, {
            "type": "EntityToys",
            "x": 500,
            "y": 8892
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 4328
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 4868
        }, {
            "type": "EntityToys",
            "x": 500,
            "y": 9004
        }, {
            "type": "EntityToys",
            "x": 412,
            "y": 7768
        }, {
            "type": "EntityToys",
            "x": 244,
            "y": 3892
        }, {
            "type": "EntityToys",
            "x": 176,
            "y": 1764
        }, {
            "type": "EntityToys",
            "x": 220,
            "y": 4036
        }, {
            "type": "EntityToys",
            "x": 444,
            "y": 3940
        }, {
            "type": "EntityPad",
            "x": 0,
            "y": 9384
        }, {
            "type": "EntityToys",
            "x": 380,
            "y": 4152
        }, {
            "type": "EntityToys",
            "x": 120,
            "y": 1512
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 5120
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 6304
        }, {
            "type": "EntityToys",
            "x": 116,
            "y": 1652
        }, {
            "type": "EntityPusher",
            "x": 516,
            "y": 4580
        }, {
            "type": "EntityPusher",
            "x": 60,
            "y": 4580
        }, {
            "type": "EntityToys",
            "x": 500,
            "y": 8784
        }, {
            "type": "EntityCanon",
            "x": 282,
            "y": 4555,
            "settings": {
                "speed": 0.15
            }
        }, {
            "type": "EntityPusher",
            "x": 56,
            "y": 932
        }, {
            "type": "EntityToys",
            "x": 260,
            "y": 7764
        }, {
            "type": "EntityToys",
            "x": 336,
            "y": 4244
        }, {
            "type": "EntityToys",
            "x": 104,
            "y": 6300
        }, {
            "type": "EntitySanta",
            "x": 110,
            "y": 9124
        }, {
            "type": "EntityToys",
            "x": 416,
            "y": 4984
        }, {
            "type": "EntityToys",
            "x": 236,
            "y": 8292
        }, {
            "type": "EntityPad",
            "x": 420,
            "y": 5632
        }, {
            "type": "EntityPad",
            "x": -48,
            "y": 7700
        }, {
            "type": "EntityPad",
            "x": 384,
            "y": 9384
        }, {
            "type": "EntityPusher",
            "x": 288,
            "y": 312
        }, {
            "type": "EntityToys",
            "x": 220,
            "y": 3080
        }, {
            "type": "EntityToys",
            "x": 232,
            "y": 8160
        }, {
            "type": "EntityToys",
            "x": 124,
            "y": 5116
        }, {
            "type": "EntityPusher",
            "x": 512,
            "y": 940
        }, {
            "type": "EntityPad",
            "x": -36,
            "y": 5644
        }, {
            "type": "EntityPusher",
            "x": 532,
            "y": 7728
        }, {
            "type": "EntityCanon",
            "x": 294,
            "y": 2187,
            "settings": {
                "speed": 0.12
            }
        }, {
            "type": "EntityToys",
            "x": 376,
            "y": 4032
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 6560
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 4000
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 1012
        }, {
            "type": "EntityToys",
            "x": 196,
            "y": 1128
        }, {
            "type": "EntityToys",
            "x": 340,
            "y": 7840
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 2712
        }, {
            "type": "EntityToys",
            "x": 144,
            "y": 3940
        }, {
            "type": "EntityCanon",
            "x": 274,
            "y": 7139,
            "settings": {
                "speed": 0.15
            }
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 6428
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 4136
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 5864
        }, {
            "type": "EntityPusher",
            "x": 408,
            "y": 8260
        }, {
            "type": "EntityToys",
            "x": 336,
            "y": 8164
        }, {
            "type": "EntityToys",
            "x": 336,
            "y": 7692
        }, {
            "type": "EntityToys",
            "x": 188,
            "y": 4980
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 6164
        }, {
            "type": "EntityPusher",
            "x": 64,
            "y": 6404
        }, {
            "type": "EntityToys",
            "x": 136,
            "y": 8296
        }, {
            "type": "EntityToys",
            "x": 348,
            "y": 3892
        }, {
            "type": "EntityToys",
            "x": 420,
            "y": 1128
        }],
        "layer": [{
            "name": "collision",
            "width": 10,
            "height": 150,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 11, 0, 0, 0, 0, 0, 0, 10, 1],
                [1, 22, 0, 0, 0, 0, 0, 0, 21, 1],
                [1, 1, 11, 0, 0, 0, 0, 10, 1, 1],
                [1, 1, 22, 0, 0, 0, 0, 21, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 9, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 20, 0, 0, 0, 0, 1, 1, 1],
                [1, 9, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 20, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 9, 0, 0, 0, 0, 8, 1, 1],
                [1, 1, 20, 0, 0, 0, 0, 19, 1, 1],
                [1, 9, 0, 0, 0, 0, 0, 0, 8, 1],
                [1, 20, 0, 0, 0, 0, 0, 0, 19, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
            ]
        }, {
            "name": "back",
            "width": 20,
            "height": 20,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": true,
            "preRender": true,
            "distance": "1.7",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 49, 0, 0, 0, 0, 30, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 30, 56, 0, 27, 212, 0, 0, 27, 0, 24, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 24, 0, 0, 27, 0],
                [0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 30, 0, 0, 24, 0, 0, 0, 2, 0, 27, 0, 0, 0, 0, 0, 0, 56, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 27, 49, 0, 0, 0, 0, 0, 2, 49, 0, 0, 0],
                [0, 0, 0, 0, 27, 0, 212, 24, 0, 0, 0, 0, 27, 0, 0, 30, 56, 0, 0, 0],
                [0, 0, 196, 197, 198, 0, 0, 56, 0, 0, 0, 0, 0, 0, 24, 0, 27, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 27, 0, 0, 24, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 27, 56, 0, 0, 0, 0, 0, 0, 24, 0, 0, 24, 0, 0, 0],
                [0, 0, 27, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 2, 49, 0, 0, 0, 0, 0, 24, 0],
                [0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 30, 56, 0, 0, 0, 0, 27, 30, 27],
                [0, 0, 0, 0, 2, 0, 0, 0, 56, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 24, 2, 0, 0],
                [0, 27, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 24, 0, 0, 0, 0, 24, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }, {
            "name": "front",
            "width": 10,
            "height": 155,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 71, 71, 71, 71, 71, 71, 71, 71, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 37, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 37, 37, 37, 37, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 3, 0, 0, 0, 0, 0, 0, 6, 8],
                [1, 11, 0, 0, 0, 0, 0, 0, 14, 8],
                [9, 19, 3, 0, 0, 0, 0, 6, 22, 16],
                [9, 10, 11, 0, 0, 0, 0, 14, 10, 16],
                [9, 10, 36, 0, 0, 0, 0, 15, 10, 8],
                [1, 10, 36, 0, 0, 0, 0, 15, 10, 16],
                [9, 10, 20, 0, 0, 0, 0, 15, 10, 16],
                [9, 35, 28, 0, 0, 0, 0, 15, 10, 16],
                [1, 20, 0, 0, 0, 0, 0, 15, 10, 16],
                [1, 28, 0, 0, 0, 0, 0, 15, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 15, 10, 16],
                [9, 0, 0, 0, 0, 0, 0, 15, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 15, 10, 8],
                [9, 37, 37, 0, 0, 0, 0, 15, 10, 8],
                [9, 10, 36, 0, 0, 0, 0, 15, 10, 16],
                [1, 10, 36, 0, 0, 0, 0, 15, 10, 16],
                [1, 10, 36, 0, 0, 0, 0, 15, 10, 16],
                [1, 10, 36, 0, 0, 0, 0, 15, 10, 8],
                [1, 10, 20, 0, 0, 0, 0, 21, 10, 8],
                [9, 35, 28, 0, 0, 0, 0, 29, 38, 16],
                [9, 20, 0, 0, 0, 0, 0, 0, 21, 16],
                [9, 28, 0, 0, 0, 0, 0, 0, 29, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [57, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 37, 37, 37, 37, 37, 37, 37, 37, 16]
            ]
        }]
    };
    LevelLvl1Resources = [new ig.Image('media/tiles-64.png'), new ig.Image('media/tiles-64.png')];
}); // lib/game/levels/lvl2.js
ig.baked = true;
ig.module('game.levels.lvl2').requires('impact.image', 'game.entities.escalator', 'game.entities.note', 'game.entities.toys', 'game.entities.pusher', 'game.entities.bag', 'game.entities.pad', 'game.entities.canon', 'game.entities.santa').defines(function() {
    LevelLvl2 = {
        "entities": [{
            "type": "EntityEscalator",
            "x": 296,
            "y": 7336,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 456,
            "y": 1580,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 312,
            "y": 2040,
            "settings": {
                "force": 150
            }
        }, {
            "type": "EntityEscalator",
            "x": 112,
            "y": 4588,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityNote",
            "x": 256,
            "y": 4856
        }, {
            "type": "EntityEscalator",
            "x": 408,
            "y": 888,
            "settings": {
                "force": 150
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 7052,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 292,
            "y": 5120,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 468,
            "y": 4592,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 292,
            "y": 5592,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 7192,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityToys",
            "x": 116,
            "y": 8168
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 3752
        }, {
            "type": "EntityPusher",
            "x": 292,
            "y": 8748
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 1428
        }, {
            "type": "EntityPusher",
            "x": 68,
            "y": 7812
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 5968
        }, {
            "type": "EntityToys",
            "x": 488,
            "y": 4100
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 3960
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 6824
        }, {
            "type": "EntityToys",
            "x": 88,
            "y": 6200
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 5432
        }, {
            "type": "EntityToys",
            "x": 320,
            "y": 620
        }, {
            "type": "EntityToys",
            "x": 88,
            "y": 6320
        }, {
            "type": "EntityBag",
            "x": 64,
            "y": 9624,
            "settings": {
                "size": {
                    "x": 512,
                    "y": 92
                }
            }
        }, {
            "type": "EntityToys",
            "x": 104,
            "y": 5052
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 7816
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 7660
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 1196
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 5300
        }, {
            "type": "EntityToys",
            "x": 468,
            "y": 3580
        }, {
            "type": "EntityToys",
            "x": 476,
            "y": 6540
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 6080
        }, {
            "type": "EntityToys",
            "x": 96,
            "y": 2844
        }, {
            "type": "EntityToys",
            "x": 184,
            "y": 3232
        }, {
            "type": "EntityPad",
            "x": 424,
            "y": 5152
        }, {
            "type": "EntityToys",
            "x": 108,
            "y": 4752
        }, {
            "type": "EntityToys",
            "x": 488,
            "y": 5056
        }, {
            "type": "EntityToys",
            "x": 188,
            "y": 2732
        }, {
            "type": "EntityToys",
            "x": 108,
            "y": 4904
        }, {
            "type": "EntityToys",
            "x": 392,
            "y": 1796
        }, {
            "type": "EntityToys",
            "x": 428,
            "y": 1704
        }, {
            "type": "EntityCanon",
            "x": 278,
            "y": 8455,
            "settings": {
                "speed": -0.2
            }
        }, {
            "type": "EntityToys",
            "x": 108,
            "y": 2600
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 6684
        }, {
            "type": "EntityToys",
            "x": 184,
            "y": 2964
        }, {
            "type": "EntityToys",
            "x": 348,
            "y": 1892
        }, {
            "type": "EntityToys",
            "x": 460,
            "y": 1076
        }, {
            "type": "EntityCanon",
            "x": 438,
            "y": 3811,
            "settings": {
                "speed": 0.2
            }
        }, {
            "type": "EntityToys",
            "x": 468,
            "y": 8168
        }, {
            "type": "EntityPad",
            "x": 384,
            "y": 9384
        }, {
            "type": "EntityPad",
            "x": 0,
            "y": 9384
        }, {
            "type": "EntityCanon",
            "x": 274,
            "y": 6299,
            "settings": {
                "speed": 0.2
            }
        }, {
            "type": "EntityPad",
            "x": -40,
            "y": 5152
        }, {
            "type": "EntityPusher",
            "x": 296,
            "y": 8236
        }, {
            "type": "EntitySanta",
            "x": 110,
            "y": 9092
        }, {
            "type": "EntityToys",
            "x": 100,
            "y": 3100
        }, {
            "type": "EntityToys",
            "x": 360,
            "y": 716
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 1312
        }, {
            "type": "EntityToys",
            "x": 484,
            "y": 4752
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 3856
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 7988
        }, {
            "type": "EntityPusher",
            "x": 300,
            "y": 4140
        }, {
            "type": "EntityToys",
            "x": 380,
            "y": 4044
        }, {
            "type": "EntityToys",
            "x": 496,
            "y": 6316
        }, {
            "type": "EntityToys",
            "x": 100,
            "y": 4096
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 7496
        }, {
            "type": "EntityPusher",
            "x": 52,
            "y": 464
        }, {
            "type": "EntityPusher",
            "x": 296,
            "y": 3556
        }, {
            "type": "EntityToys",
            "x": 368,
            "y": 3652
        }, {
            "type": "EntityToys",
            "x": 96,
            "y": 6544
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 5872
        }, {
            "type": "EntityCanon",
            "x": 118,
            "y": 3815,
            "settings": {
                "speed": 0.2
            }
        }, {
            "type": "EntityToys",
            "x": 484,
            "y": 4900
        }, {
            "type": "EntityToys",
            "x": 228,
            "y": 3652
        }, {
            "type": "EntityPusher",
            "x": 508,
            "y": 7816
        }, {
            "type": "EntityToys",
            "x": 156,
            "y": 128
        }, {
            "type": "EntityToys",
            "x": 116,
            "y": 3584
        }, {
            "type": "EntityPusher",
            "x": 516,
            "y": 6444
        }, {
            "type": "EntityToys",
            "x": 212,
            "y": 4044
        }, {
            "type": "EntityToys",
            "x": 492,
            "y": 6196
        }, {
            "type": "EntityPusher",
            "x": 60,
            "y": 6440
        }],
        "layer": [{
            "name": "back",
            "width": 20,
            "height": 20,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": true,
            "preRender": true,
            "distance": "1.7",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
                [0, 27, 0, 0, 0, 27, 0, 0, 0, 0, 7, 0, 0, 0, 27, 0, 27, 0, 0, 0],
                [0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0],
                [0, 0, 0, 7, 27, 0, 0, 0, 0, 0, 27, 0, 0, 0, 27, 0, 0, 2, 0, 30],
                [0, 0, 0, 0, 49, 0, 0, 0, 17, 0, 0, 30, 0, 0, 0, 0, 0, 0, 30, 0],
                [0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 7, 27, 0, 0, 0, 0, 2, 0],
                [0, 56, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 27, 7],
                [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 7, 0, 27, 0, 0, 0, 0, 0],
                [0, 17, 0, 0, 0, 17, 27, 7, 0, 0, 0, 0, 0, 30, 56, 2, 30, 0, 0, 0],
                [27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
                [0, 7, 0, 0, 0, 0, 0, 27, 56, 0, 0, 0, 0, 0, 0, 17, 27, 7, 0, 0],
                [0, 56, 2, 27, 0, 24, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 56, 0],
                [0, 0, 0, 2, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
                [27, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 56, 2, 27, 0, 0, 0, 0, 0, 0],
                [0, 56, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 27, 0],
                [0, 0, 0, 30, 0, 0, 0, 0, 0, 27, 0, 0, 0, 2, 56, 0, 0, 0, 0, 0],
                [0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 30, 0, 0, 56, 0],
                [0, 0, 0, 0, 17, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0]
            ]
        }, {
            "name": "collision",
            "width": 10,
            "height": 150,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 30, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 41, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 52, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 30, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 41, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 52, 1, 1, 1],
                [1, 1, 1, 33, 0, 0, 0, 30, 1, 1],
                [1, 1, 1, 44, 0, 0, 0, 41, 1, 1],
                [1, 1, 1, 55, 0, 0, 0, 52, 1, 1],
                [1, 1, 1, 1, 33, 0, 0, 0, 30, 1],
                [1, 1, 1, 1, 44, 0, 0, 0, 41, 1],
                [1, 1, 1, 1, 55, 0, 0, 0, 52, 1],
                [1, 1, 1, 1, 1, 33, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 44, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 55, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 31, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 42, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 53, 0, 0, 32, 1],
                [1, 1, 1, 1, 31, 0, 0, 0, 43, 1],
                [1, 1, 1, 1, 42, 0, 0, 0, 54, 1],
                [1, 1, 1, 1, 53, 0, 0, 32, 1, 1],
                [1, 1, 1, 31, 0, 0, 0, 43, 1, 1],
                [1, 1, 1, 42, 0, 0, 0, 54, 1, 1],
                [1, 1, 1, 53, 0, 0, 32, 1, 1, 1],
                [1, 1, 31, 0, 0, 0, 43, 1, 1, 1],
                [1, 1, 42, 0, 0, 0, 54, 1, 1, 1],
                [1, 1, 53, 0, 0, 0, 1, 1, 1, 1],
                [1, 31, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 42, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 53, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 30, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 41, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 52, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 30, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 41, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 52, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 30, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 41, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 52, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 22, 0, 0, 0, 0, 21, 1, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 9, 0, 0, 0, 0, 8, 1, 1],
                [1, 1, 20, 0, 0, 0, 0, 19, 1, 1],
                [1, 9, 0, 0, 0, 0, 0, 0, 8, 1],
                [1, 20, 0, 0, 0, 0, 0, 0, 19, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
            ]
        }, {
            "name": "front",
            "width": 10,
            "height": 155,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [4, 5, 0, 0, 0, 0, 0, 0, 12, 13],
                [1, 0, 0, 0, 0, 37, 37, 37, 37, 8],
                [9, 0, 0, 0, 0, 15, 10, 10, 10, 16],
                [9, 0, 0, 0, 0, 39, 10, 10, 10, 16],
                [1, 0, 0, 0, 0, 47, 10, 10, 10, 16],
                [1, 0, 0, 0, 0, 55, 31, 10, 10, 16],
                [1, 0, 0, 0, 0, 0, 39, 10, 10, 8],
                [9, 0, 0, 0, 0, 0, 47, 10, 10, 8],
                [1, 37, 37, 0, 0, 0, 55, 31, 10, 16],
                [1, 10, 41, 18, 0, 0, 0, 39, 10, 16],
                [9, 10, 10, 25, 0, 0, 0, 47, 10, 8],
                [1, 10, 10, 33, 0, 0, 0, 55, 31, 16],
                [9, 10, 10, 41, 18, 0, 0, 0, 39, 16],
                [9, 10, 10, 10, 25, 0, 0, 0, 47, 16],
                [1, 10, 10, 10, 33, 0, 0, 0, 55, 16],
                [1, 10, 10, 10, 41, 18, 0, 0, 0, 8],
                [1, 10, 10, 10, 10, 25, 0, 0, 0, 16],
                [1, 10, 10, 10, 10, 33, 0, 0, 0, 16],
                [1, 10, 10, 10, 10, 36, 0, 0, 0, 16],
                [1, 10, 10, 10, 10, 36, 0, 0, 0, 16],
                [9, 10, 10, 10, 10, 36, 0, 0, 0, 16],
                [9, 10, 10, 10, 10, 36, 0, 0, 0, 8],
                [1, 10, 10, 10, 10, 36, 0, 0, 0, 8],
                [1, 10, 10, 10, 10, 36, 0, 0, 0, 16],
                [1, 10, 10, 10, 10, 36, 0, 0, 0, 16],
                [9, 10, 10, 10, 10, 34, 0, 0, 0, 8],
                [1, 10, 10, 10, 10, 42, 0, 0, 0, 16],
                [1, 10, 10, 10, 26, 50, 0, 0, 23, 16],
                [9, 10, 10, 10, 34, 0, 0, 0, 32, 16],
                [1, 10, 10, 10, 42, 0, 0, 0, 40, 16],
                [9, 10, 10, 26, 50, 0, 0, 23, 48, 8],
                [9, 10, 10, 34, 0, 0, 0, 32, 10, 8],
                [1, 10, 10, 42, 0, 0, 0, 40, 10, 16],
                [1, 10, 26, 50, 0, 0, 23, 48, 10, 16],
                [1, 10, 34, 0, 0, 0, 32, 10, 10, 8],
                [1, 10, 42, 0, 0, 0, 40, 10, 10, 16],
                [1, 26, 50, 0, 0, 0, 15, 10, 10, 16],
                [1, 34, 0, 0, 0, 0, 15, 10, 10, 16],
                [9, 42, 0, 0, 0, 0, 15, 10, 10, 16],
                [9, 50, 0, 0, 0, 0, 15, 10, 10, 8],
                [1, 0, 0, 0, 0, 0, 15, 10, 10, 8],
                [1, 0, 0, 0, 0, 0, 39, 10, 10, 16],
                [1, 0, 0, 0, 0, 0, 47, 10, 10, 16],
                [9, 0, 0, 0, 0, 0, 55, 31, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 39, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 47, 10, 8],
                [9, 0, 0, 0, 0, 0, 0, 55, 31, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 39, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 47, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 55, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 10, 11, 0, 0, 0, 0, 14, 10, 8],
                [1, 10, 26, 0, 0, 0, 0, 15, 0, 16],
                [9, 10, 36, 0, 0, 0, 0, 15, 10, 16],
                [9, 10, 36, 0, 0, 0, 0, 15, 10, 8],
                [1, 10, 20, 0, 0, 0, 0, 21, 10, 8],
                [1, 35, 28, 0, 0, 0, 0, 29, 38, 16],
                [1, 20, 0, 0, 0, 0, 0, 0, 21, 16],
                [1, 28, 0, 0, 0, 0, 0, 0, 29, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16]
            ]
        }]
    };
    LevelLvl2Resources = [new ig.Image('media/tiles-64.png'), new ig.Image('media/tiles-64.png')];
}); // lib/game/levels/lvl3.js
ig.baked = true;
ig.module('game.levels.lvl3').requires('impact.image', 'game.entities.escalator', 'game.entities.note', 'game.entities.toys', 'game.entities.pad', 'game.entities.pusher', 'game.entities.canon', 'game.entities.bag', 'game.entities.santa').defines(function() {
    LevelLvl3 = {
        "entities": [{
            "type": "EntityEscalator",
            "x": 452,
            "y": 4592,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 132,
            "y": 7820,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 136,
            "y": 8624,
            "settings": {
                "force": 120
            }
        }, {
            "type": "EntityNote",
            "x": 244,
            "y": 7544
        }, {
            "type": "EntityEscalator",
            "x": 444,
            "y": 8624,
            "settings": {
                "force": 120
            }
        }, {
            "type": "EntityEscalator",
            "x": 124,
            "y": 7324,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 452,
            "y": 7820,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 288,
            "y": 5296,
            "settings": {
                "force": 200
            }
        }, {
            "type": "EntityEscalator",
            "x": 288,
            "y": 5508,
            "settings": {
                "force": 200
            }
        }, {
            "type": "EntityEscalator",
            "x": 124,
            "y": 7480,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 440,
            "y": 1400,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 128,
            "y": 4592,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityToys",
            "x": 128,
            "y": 3064
        }, {
            "type": "EntityPad",
            "x": -28,
            "y": 5152
        }, {
            "type": "EntityToys",
            "x": 144,
            "y": 1024
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 1396
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 7320
        }, {
            "type": "EntityToys",
            "x": 124,
            "y": 7668
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 4760
        }, {
            "type": "EntityPad",
            "x": 384,
            "y": 9384
        }, {
            "type": "EntityToys",
            "x": 492,
            "y": 1764
        }, {
            "type": "EntityPusher",
            "x": 292,
            "y": 8672
        }, {
            "type": "EntityToys",
            "x": 184,
            "y": 3124
        }, {
            "type": "EntityToys",
            "x": 424,
            "y": 4940
        }, {
            "type": "EntityPusher",
            "x": 548,
            "y": 4936
        }, {
            "type": "EntityToys",
            "x": 168,
            "y": 4944
        }, {
            "type": "EntityPusher",
            "x": 512,
            "y": 1596
        }, {
            "type": "EntityToys",
            "x": 420,
            "y": 8220
        }, {
            "type": "EntityToys",
            "x": 424,
            "y": 1832
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 6784
        }, {
            "type": "EntityToys",
            "x": 356,
            "y": 1904
        }, {
            "type": "EntityPad",
            "x": 0,
            "y": 9384
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 5940
        }, {
            "type": "EntityToys",
            "x": 404,
            "y": 3136
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 7436
        }, {
            "type": "EntityPusher",
            "x": 520,
            "y": 3284
        }, {
            "type": "EntityToys",
            "x": 176,
            "y": 8068
        }, {
            "type": "EntityPusher",
            "x": 28,
            "y": 4932
        }, {
            "type": "EntityPusher",
            "x": 292,
            "y": 7200
        }, {
            "type": "EntityPusher",
            "x": 472,
            "y": 5832
        }, {
            "type": "EntityToys",
            "x": 176,
            "y": 4800
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 5696
        }, {
            "type": "EntityToys",
            "x": 332,
            "y": 3164
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 8792
        }, {
            "type": "EntityToys",
            "x": 460,
            "y": 3068
        }, {
            "type": "EntityToys",
            "x": 176,
            "y": 8228
        }, {
            "type": "EntityPusher",
            "x": 88,
            "y": 1136
        }, {
            "type": "EntityToys",
            "x": 420,
            "y": 8064
        }, {
            "type": "EntityToys",
            "x": 232,
            "y": 2988
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 8888
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 6892
        }, {
            "type": "EntityPad",
            "x": 328,
            "y": 2000
        }, {
            "type": "EntityPusher",
            "x": 104,
            "y": 5828
        }, {
            "type": "EntityToys",
            "x": 360,
            "y": 2988
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 8132
        }, {
            "type": "EntityToys",
            "x": 144,
            "y": 808
        }, {
            "type": "EntityPad",
            "x": 412,
            "y": 5156
        }, {
            "type": "EntityToys",
            "x": 420,
            "y": 4796
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 6680
        }, {
            "type": "EntityToys",
            "x": 452,
            "y": 1108
        }, {
            "type": "EntityCanon",
            "x": 282,
            "y": 3859,
            "settings": {
                "speed": -0.18
            }
        }, {
            "type": "EntityToys",
            "x": 144,
            "y": 912
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 8976
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 7084
        }, {
            "type": "EntityToys",
            "x": 452,
            "y": 896
        }, {
            "type": "EntityToys",
            "x": 256,
            "y": 3164
        }, {
            "type": "EntityBag",
            "x": 64,
            "y": 9620,
            "settings": {
                "size": {
                    "x": 512,
                    "y": 92
                }
            }
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 7992
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 4540
        }, {
            "type": "EntityPusher",
            "x": 328,
            "y": 4660
        }, {
            "type": "EntitySanta",
            "x": 110,
            "y": 9092
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 7668
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 6992
        }, {
            "type": "EntityToys",
            "x": 492,
            "y": 1904
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 5820
        }, {
            "type": "EntityPusher",
            "x": 260,
            "y": 4656
        }, {
            "type": "EntityPusher",
            "x": 56,
            "y": 3296
        }, {
            "type": "EntityCanon",
            "x": 278,
            "y": 6343,
            "settings": {
                "speed": 0.15
            }
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 4880
        }, {
            "type": "EntityToys",
            "x": 452,
            "y": 7556
        }],
        "layer": [{
            "name": "collision",
            "width": 10,
            "height": 150,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 31, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 42, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 53, 0, 0, 0, 0, 0, 1],
                [1, 1, 31, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 42, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 53, 0, 0, 0, 0, 0, 0, 1],
                [1, 31, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 42, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 53, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 30, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 41, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 52, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 30, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 41, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 52, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 30, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 41, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 52, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 31, 0, 0, 0, 0, 30, 0, 1],
                [1, 1, 42, 0, 0, 0, 0, 41, 1, 1],
                [1, 1, 53, 0, 0, 0, 0, 52, 1, 1],
                [1, 31, 0, 0, 0, 0, 0, 0, 30, 1],
                [1, 42, 0, 0, 0, 0, 0, 0, 41, 1],
                [1, 53, 0, 0, 0, 0, 0, 0, 52, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 31, 0, 0, 0, 0, 0, 0, 30, 1],
                [1, 42, 0, 0, 0, 0, 0, 0, 41, 1],
                [1, 53, 0, 0, 0, 0, 0, 0, 52, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
            ]
        }, {
            "name": "new_layer_2",
            "width": 20,
            "height": 20,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": true,
            "preRender": true,
            "distance": "1.7",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [27, 27, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0],
                [0, 0, 27, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 24, 56, 17, 27, 0, 0, 0, 0, 30, 0, 0, 0, 0, 2, 0, 0, 0, 56, 0],
                [17, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0],
                [17, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 7, 0, 0, 0, 2, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 30, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 30, 0, 0, 0, 24, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 24, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }, {
            "name": "front",
            "width": 10,
            "height": 155,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [4, 5, 0, 0, 0, 0, 0, 0, 12, 13],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 37, 37, 37, 0, 0, 0, 0, 0, 16],
                [9, 10, 10, 36, 0, 0, 0, 0, 0, 16],
                [1, 10, 10, 36, 0, 0, 0, 0, 0, 8],
                [1, 10, 10, 36, 0, 0, 0, 0, 0, 8],
                [9, 10, 10, 36, 0, 0, 0, 0, 0, 16],
                [9, 10, 10, 34, 0, 0, 0, 0, 0, 16],
                [9, 10, 10, 42, 0, 0, 0, 0, 0, 8],
                [1, 10, 26, 50, 0, 0, 0, 0, 0, 16],
                [1, 10, 34, 0, 0, 0, 0, 0, 0, 16],
                [9, 10, 42, 0, 0, 0, 0, 0, 0, 16],
                [1, 26, 50, 0, 0, 0, 0, 0, 0, 16],
                [9, 34, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 42, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 50, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 10, 10, 16],
                [1, 0, 0, 0, 0, 0, 15, 10, 10, 8],
                [1, 0, 0, 0, 0, 0, 39, 10, 10, 16],
                [1, 0, 0, 0, 0, 0, 47, 10, 10, 16],
                [1, 0, 0, 0, 0, 0, 55, 31, 10, 16],
                [9, 0, 0, 0, 0, 0, 0, 39, 10, 16],
                [9, 0, 0, 0, 0, 0, 0, 47, 10, 8],
                [1, 0, 0, 0, 0, 0, 0, 55, 31, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 39, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 47, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 55, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 26, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 34, 0, 0, 0, 0, 39, 0, 46],
                [1, 10, 42, 0, 0, 0, 0, 47, 10, 8],
                [9, 26, 50, 0, 0, 0, 0, 55, 31, 16],
                [1, 34, 0, 0, 0, 0, 0, 0, 39, 8],
                [1, 42, 0, 0, 0, 0, 0, 0, 47, 16],
                [9, 50, 0, 0, 0, 0, 0, 0, 55, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 37, 37, 0, 0, 0, 16],
                [9, 0, 0, 0, 37, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 37, 37, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 37, 37, 0, 0, 0, 8],
                [1, 0, 0, 0, 37, 37, 0, 0, 0, 8],
                [1, 0, 0, 0, 37, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 37, 0, 0, 0, 0, 0, 0, 37, 8],
                [1, 34, 0, 0, 0, 0, 0, 0, 39, 16],
                [9, 42, 0, 0, 0, 0, 0, 0, 47, 16],
                [1, 50, 0, 0, 0, 0, 0, 0, 55, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 51, 52, 44, 45, 45, 38, 52, 63, 16],
                [1, 58, 59, 58, 53, 54, 58, 58, 58, 8],
                [1, 58, 58, 58, 61, 62, 59, 58, 58, 16],
                [1, 57, 60, 60, 60, 60, 60, 60, 64, 8],
                [1, 37, 37, 37, 37, 37, 37, 37, 37, 16]
            ]
        }]
    };
    LevelLvl3Resources = [new ig.Image('media/tiles-64.png'), new ig.Image('media/tiles-64.png')];
}); // lib/game/levels/lvl4.js
ig.baked = true;
ig.module('game.levels.lvl4').requires('impact.image', 'game.entities.escalator', 'game.entities.note', 'game.entities.pad', 'game.entities.pusher', 'game.entities.toys', 'game.entities.canon', 'game.entities.bag', 'game.entities.santa').defines(function() {
    LevelLvl4 = {
        "entities": [{
            "type": "EntityEscalator",
            "x": 408,
            "y": 1872,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 444,
            "y": 564,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 236,
            "y": 2400,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 5060,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 288,
            "y": 564,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 128,
            "y": 564,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityNote",
            "x": 256,
            "y": 152
        }, {
            "type": "EntityEscalator",
            "x": 152,
            "y": 7376,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 460,
            "y": 8116,
            "settings": {
                "force": -30
            }
        }, {
            "type": "EntityEscalator",
            "x": 456,
            "y": 7528,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 5904,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 120,
            "y": 5060,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 5720,
            "settings": {
                "force": 200
            }
        }, {
            "type": "EntityEscalator",
            "x": 460,
            "y": 5060,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 120,
            "y": 4928,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 460,
            "y": 4924,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 4924,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 296,
            "y": 6064,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityPad",
            "x": 0,
            "y": 9384
        }, {
            "type": "EntityPusher",
            "x": 524,
            "y": 8796
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 3260
        }, {
            "type": "EntityToys",
            "x": 96,
            "y": 2976
        }, {
            "type": "EntityToys",
            "x": 112,
            "y": 4748
        }, {
            "type": "EntityToys",
            "x": 320,
            "y": 7264
        }, {
            "type": "EntityCanon",
            "x": 438,
            "y": 3371,
            "settings": {
                "speed": 0.2
            }
        }, {
            "type": "EntityPusher",
            "x": 524,
            "y": 6356
        }, {
            "type": "EntityToys",
            "x": 180,
            "y": 8964
        }, {
            "type": "EntityToys",
            "x": 320,
            "y": 6764
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 4608
        }, {
            "type": "EntityToys",
            "x": 212,
            "y": 752
        }, {
            "type": "EntityPusher",
            "x": 528,
            "y": 1004
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 2208
        }, {
            "type": "EntityToys",
            "x": 432,
            "y": 1368
        }, {
            "type": "EntityToys",
            "x": 156,
            "y": 1204
        }, {
            "type": "EntityCanon",
            "x": 278,
            "y": 4043,
            "settings": {
                "speed": 0.15
            }
        }, {
            "type": "EntityToys",
            "x": 176,
            "y": 6216
        }, {
            "type": "EntityPad",
            "x": 48,
            "y": 1340
        }, {
            "type": "EntityToys",
            "x": 472,
            "y": 3952
        }, {
            "type": "EntityToys",
            "x": 392,
            "y": 756
        }, {
            "type": "EntityToys",
            "x": 184,
            "y": 4664
        }, {
            "type": "EntityToys",
            "x": 320,
            "y": 7140
        }, {
            "type": "EntityBag",
            "x": 64,
            "y": 9616,
            "settings": {
                "size": {
                    "x": 512,
                    "y": 92
                }
            }
        }, {
            "type": "EntityPusher",
            "x": 60,
            "y": 4596
        }, {
            "type": "EntityPusher",
            "x": 320,
            "y": 7392
        }, {
            "type": "EntityToys",
            "x": 360,
            "y": 2064
        }, {
            "type": "EntityPad",
            "x": -28,
            "y": 5576
        }, {
            "type": "EntityPad",
            "x": 424,
            "y": 5576
        }, {
            "type": "EntityToys",
            "x": 156,
            "y": 8288
        }, {
            "type": "EntityPusher",
            "x": 52,
            "y": 8796
        }, {
            "type": "EntityToys",
            "x": 320,
            "y": 7008
        }, {
            "type": "EntityToys",
            "x": 424,
            "y": 6216
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 5400
        }, {
            "type": "EntityToys",
            "x": 124,
            "y": 3952
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 7864
        }, {
            "type": "EntityPusher",
            "x": 64,
            "y": 6356
        }, {
            "type": "EntityPusher",
            "x": 508,
            "y": 4608
        }, {
            "type": "EntityToys",
            "x": 468,
            "y": 4752
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 2716
        }, {
            "type": "EntityCanon",
            "x": 282,
            "y": 6407,
            "settings": {
                "speed": -0.13
            }
        }, {
            "type": "EntityToys",
            "x": 184,
            "y": 3840
        }, {
            "type": "EntityToys",
            "x": 96,
            "y": 2592
        }, {
            "type": "EntityPusher",
            "x": 52,
            "y": 848
        }, {
            "type": "EntityPusher",
            "x": 60,
            "y": 7756
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 7652
        }, {
            "type": "EntityToys",
            "x": 432,
            "y": 1604
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 7756
        }, {
            "type": "EntityToys",
            "x": 400,
            "y": 4668
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 3120
        }, {
            "type": "EntityPusher",
            "x": 260,
            "y": 8088
        }, {
            "type": "EntityToys",
            "x": 424,
            "y": 3852
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 872
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 2844
        }, {
            "type": "EntityToys",
            "x": 424,
            "y": 8976
        }, {
            "type": "EntityPad",
            "x": 384,
            "y": 9384
        }, {
            "type": "EntityToys",
            "x": 456,
            "y": 7976
        }, {
            "type": "EntitySanta",
            "x": 110,
            "y": 9092
        }, {
            "type": "EntityToys",
            "x": 448,
            "y": 8292
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 4384
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 4500
        }, {
            "type": "EntityCanon",
            "x": 282,
            "y": 8619,
            "settings": {
                "speed": -0.13
            }
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 8892
        }, {
            "type": "EntityToys",
            "x": 436,
            "y": 1480
        }, {
            "type": "EntityToys",
            "x": 320,
            "y": 6880
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 6208
        }, {
            "type": "EntityToys",
            "x": 304,
            "y": 3812
        }],
        "layer": [{
            "name": "back",
            "width": 20,
            "height": 20,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": true,
            "preRender": true,
            "distance": "1.7",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0],
                [0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 49, 0, 17, 0, 0, 0, 0, 0, 30, 0, 0, 2, 0, 0, 0],
                [0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 2, 0, 0, 0, 0, 27, 0, 0, 49, 0],
                [0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 30, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0],
                [0, 0, 27, 0, 0, 30, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0],
                [0, 0, 0, 0, 2, 0, 0, 27, 0, 0, 0, 0, 0, 27, 0, 0, 2, 0, 0, 0],
                [0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 2, 27, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 27, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 2, 0, 0, 0],
                [0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }, {
            "name": "collision",
            "width": 10,
            "height": 150,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 33, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 44, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 55, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 33, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 44, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 55, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 33, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 44, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 55, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 31, 0, 0, 0, 0, 32, 1],
                [1, 1, 1, 42, 0, 0, 0, 0, 43, 1],
                [1, 1, 1, 53, 0, 0, 0, 0, 54, 1],
                [1, 1, 31, 0, 0, 0, 0, 32, 1, 1],
                [1, 1, 42, 0, 0, 0, 0, 43, 1, 1],
                [1, 1, 53, 0, 0, 0, 0, 54, 1, 1],
                [1, 31, 0, 0, 0, 0, 32, 1, 1, 1],
                [1, 42, 0, 0, 0, 0, 43, 1, 1, 1],
                [1, 53, 0, 0, 0, 0, 54, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 30, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 41, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 52, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 30, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 41, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 52, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 30, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 41, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 52, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 42, 0, 0, 0, 0, 41, 1, 1],
                [1, 1, 53, 0, 0, 0, 0, 52, 1, 1],
                [1, 31, 0, 0, 0, 0, 0, 0, 30, 1],
                [1, 42, 0, 0, 0, 0, 0, 0, 41, 1],
                [1, 53, 0, 0, 0, 0, 0, 0, 52, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
            ]
        }, {
            "name": "front",
            "width": 10,
            "height": 155,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [4, 5, 0, 0, 0, 0, 0, 0, 12, 13],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 18, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 25, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 33, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 41, 18, 0, 0, 0, 0, 0, 0, 16],
                [1, 10, 25, 0, 0, 0, 0, 0, 0, 16],
                [9, 10, 33, 0, 0, 0, 0, 0, 0, 8],
                [1, 10, 41, 18, 0, 0, 0, 0, 0, 16],
                [1, 10, 10, 25, 0, 0, 0, 0, 0, 8],
                [9, 10, 10, 33, 0, 0, 0, 0, 0, 16],
                [1, 10, 10, 36, 0, 0, 0, 0, 0, 16],
                [9, 10, 10, 36, 0, 0, 0, 0, 0, 8],
                [9, 10, 10, 34, 0, 0, 0, 0, 23, 8],
                [1, 10, 10, 42, 0, 0, 0, 0, 32, 16],
                [1, 10, 26, 50, 0, 0, 0, 0, 40, 16],
                [1, 10, 34, 0, 0, 0, 0, 23, 48, 8],
                [1, 10, 42, 0, 0, 0, 0, 32, 10, 16],
                [1, 26, 50, 0, 0, 0, 0, 40, 10, 16],
                [1, 34, 0, 0, 0, 0, 23, 48, 10, 16],
                [9, 42, 0, 0, 0, 0, 32, 10, 10, 16],
                [9, 50, 0, 0, 0, 0, 40, 10, 10, 8],
                [1, 0, 0, 0, 0, 0, 15, 10, 10, 8],
                [1, 0, 0, 0, 0, 0, 39, 10, 10, 16],
                [1, 0, 0, 0, 0, 0, 47, 10, 10, 16],
                [9, 0, 0, 0, 0, 0, 55, 31, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 39, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 47, 10, 8],
                [9, 0, 0, 0, 0, 0, 0, 55, 31, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 39, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 47, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 55, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 10, 34, 0, 0, 0, 0, 39, 10, 8],
                [1, 10, 42, 0, 0, 0, 0, 47, 10, 8],
                [1, 26, 50, 0, 0, 0, 0, 55, 31, 8],
                [9, 34, 0, 0, 0, 0, 0, 0, 39, 8],
                [9, 42, 0, 0, 0, 0, 0, 0, 47, 16],
                [1, 50, 0, 0, 0, 0, 0, 0, 55, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 37, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 37, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 37, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16]
            ]
        }]
    };
    LevelLvl4Resources = [new ig.Image('media/tiles-64.png'), new ig.Image('media/tiles-64.png')];
}); // lib/game/levels/lvl5.js
ig.baked = true;
ig.module('game.levels.lvl5').requires('impact.image', 'game.entities.escalator', 'game.entities.note', 'game.entities.toys', 'game.entities.pad', 'game.entities.pusher', 'game.entities.canon', 'game.entities.santa', 'game.entities.bag').defines(function() {
    LevelLvl5 = {
        "entities": [{
            "type": "EntityEscalator",
            "x": 292,
            "y": 6280,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 128,
            "y": 8340,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 140,
            "y": 2272,
            "settings": {
                "force": 150
            }
        }, {
            "type": "EntityEscalator",
            "x": 140,
            "y": 2108,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityEscalator",
            "x": 412,
            "y": 612,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 452,
            "y": 8840,
            "settings": {
                "force": -30
            }
        }, {
            "type": "EntityEscalator",
            "x": 452,
            "y": 8572,
            "settings": {
                "force": -60
            }
        }, {
            "type": "EntityNote",
            "x": 260,
            "y": 396
        }, {
            "type": "EntityEscalator",
            "x": 180,
            "y": 608,
            "settings": {
                "force": -50
            }
        }, {
            "type": "EntityEscalator",
            "x": 128,
            "y": 8484,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 452,
            "y": 8704,
            "settings": {
                "force": -30
            }
        }, {
            "type": "EntityEscalator",
            "x": 128,
            "y": 8196,
            "settings": {
                "force": 100
            }
        }, {
            "type": "EntityEscalator",
            "x": 140,
            "y": 1952,
            "settings": {
                "force": 50
            }
        }, {
            "type": "EntityToys",
            "x": 424,
            "y": 1888
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 5808
        }, {
            "type": "EntityPad",
            "x": 384,
            "y": 9384
        }, {
            "type": "EntityPad",
            "x": 388,
            "y": 8112
        }, {
            "type": "EntityToys",
            "x": 108,
            "y": 4904
        }, {
            "type": "EntityToys",
            "x": 484,
            "y": 4752
        }, {
            "type": "EntityToys",
            "x": 180,
            "y": 3256
        }, {
            "type": "EntityToys",
            "x": 400,
            "y": 2212
        }, {
            "type": "EntityPad",
            "x": -16,
            "y": 7620
        }, {
            "type": "EntityToys",
            "x": 492,
            "y": 2052
        }, {
            "type": "EntityToys",
            "x": 488,
            "y": 6900
        }, {
            "type": "EntityPad",
            "x": 344,
            "y": 2872
        }, {
            "type": "EntityPusher",
            "x": 512,
            "y": 5868
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 5300
        }, {
            "type": "EntityCanon",
            "x": 290,
            "y": 4655,
            "settings": {
                "speed": 0.2
            }
        }, {
            "type": "EntityPusher",
            "x": 72,
            "y": 5576
        }, {
            "type": "EntityPusher",
            "x": 64,
            "y": 5372
        }, {
            "type": "EntityPad",
            "x": 0,
            "y": 9384
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 7680
        }, {
            "type": "EntityToys",
            "x": 112,
            "y": 804
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 8040
        }, {
            "type": "EntityToys",
            "x": 480,
            "y": 812
        }, {
            "type": "EntityToys",
            "x": 488,
            "y": 6536
        }, {
            "type": "EntityToys",
            "x": 440,
            "y": 3384
        }, {
            "type": "EntityToys",
            "x": 436,
            "y": 3540
        }, {
            "type": "EntityToys",
            "x": 476,
            "y": 2680
        }, {
            "type": "EntityPusher",
            "x": 424,
            "y": 1512
        }, {
            "type": "EntityPusher",
            "x": 496,
            "y": 1116
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 6708
        }, {
            "type": "EntityPad",
            "x": 336,
            "y": 4084
        }, {
            "type": "EntityToys",
            "x": 384,
            "y": 2508
        }, {
            "type": "EntitySanta",
            "x": 110,
            "y": 9092
        }, {
            "type": "EntityPusher",
            "x": 512,
            "y": 5480
        }, {
            "type": "EntityToys",
            "x": 104,
            "y": 5052
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 6532
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 7504
        }, {
            "type": "EntityToys",
            "x": 492,
            "y": 2376
        }, {
            "type": "EntityToys",
            "x": 488,
            "y": 6368
        }, {
            "type": "EntityCanon",
            "x": 282,
            "y": 7127,
            "settings": {
                "speed": 0.15
            }
        }, {
            "type": "EntityToys",
            "x": 176,
            "y": 2684
        }, {
            "type": "EntityToys",
            "x": 176,
            "y": 2968
        }, {
            "type": "EntityToys",
            "x": 488,
            "y": 6708
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 5640
        }, {
            "type": "EntityToys",
            "x": 440,
            "y": 3700
        }, {
            "type": "EntityToys",
            "x": 288,
            "y": 5988
        }, {
            "type": "EntityPusher",
            "x": 64,
            "y": 5764
        }, {
            "type": "EntityPusher",
            "x": 64,
            "y": 6120
        }, {
            "type": "EntityToys",
            "x": 484,
            "y": 4900
        }, {
            "type": "EntityToys",
            "x": 108,
            "y": 4752
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 5472
        }, {
            "type": "EntityPusher",
            "x": 512,
            "y": 5664
        }, {
            "type": "EntityToys",
            "x": 292,
            "y": 7856
        }, {
            "type": "EntityToys",
            "x": 196,
            "y": 904
        }, {
            "type": "EntityToys",
            "x": 388,
            "y": 912
        }, {
            "type": "EntityToys",
            "x": 296,
            "y": 788
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 3116
        }, {
            "type": "EntityToys",
            "x": 300,
            "y": 7344
        }, {
            "type": "EntityPusher",
            "x": 64,
            "y": 5932
        }, {
            "type": "EntityPusher",
            "x": 512,
            "y": 6048
        }, {
            "type": "EntityToys",
            "x": 88,
            "y": 6900
        }, {
            "type": "EntityToys",
            "x": 488,
            "y": 5056
        }, {
            "type": "EntityToys",
            "x": 84,
            "y": 2836
        }, {
            "type": "EntityToys",
            "x": 444,
            "y": 3852
        }, {
            "type": "EntityPusher",
            "x": 520,
            "y": 7380
        }, {
            "type": "EntityToys",
            "x": 92,
            "y": 6364
        }, {
            "type": "EntityBag",
            "x": 64,
            "y": 9616,
            "settings": {
                "size": {
                    "x": 512,
                    "y": 92
                }
            }
        }, {
            "type": "EntityPusher",
            "x": 496,
            "y": 1376
        }, {
            "type": "EntityPad",
            "x": 16,
            "y": 3544
        }],
        "layer": [{
            "name": "collision",
            "width": 10,
            "height": 150,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 64,
            "foreground": false,
            "data": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 8, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 19, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 8, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 19, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 8, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 19, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 9, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 20, 0, 0, 0, 0, 0, 1],
                [1, 1, 9, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 20, 0, 0, 0, 0, 0, 0, 1],
                [1, 9, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 20, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 8, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 19, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 8, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 19, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 8, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 19, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 9, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 20, 0, 0, 0, 0, 0, 0, 1],
                [1, 9, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 20, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 8, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 19, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 8, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 19, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
            ]
        }, {
            "name": "back",
            "width": 20,
            "height": 20,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": true,
            "preRender": true,
            "distance": "1.7",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0],
                [0, 0, 0, 0, 27, 0, 17, 0, 0, 0, 0, 0, 0, 27, 0, 17, 0, 56, 0, 0],
                [0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 17, 2, 0],
                [0, 0, 2, 49, 0, 0, 0, 27, 0, 17, 0, 56, 0, 0, 0, 0, 49, 0, 0, 0],
                [0, 0, 27, 0, 56, 0, 0, 0, 0, 0, 0, 17, 2, 0, 27, 0, 0, 0, 27, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 27, 0, 2, 0, 17, 0, 0, 0],
                [0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0],
                [0, 27, 0, 17, 0, 56, 0, 0, 2, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 17, 27, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 17, 0],
                [0, 0, 27, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 27, 0],
                [0, 0, 0, 0, 0, 27, 0, 17, 2, 0, 17, 0, 0, 17, 2, 0, 17, 0, 0, 0],
                [0, 0, 49, 0, 17, 0, 27, 0, 0, 0, 56, 0, 27, 0, 0, 0, 56, 0, 0, 0],
                [0, 0, 0, 0, 56, 0, 0, 56, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 17, 2, 0, 27, 0, 0, 17, 2, 0, 27, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 56, 0, 0],
                [0, 17, 0, 0, 0, 0, 2, 0, 17, 0, 0, 17, 2, 0, 17, 0, 0, 17, 2, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }, {
            "name": "front",
            "width": 10,
            "height": 155,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/tiles-64.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 64,
            "foreground": false,
            "data": [
                [4, 5, 0, 0, 0, 0, 0, 0, 12, 13],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 12, 13, 4, 5, 8],
                [1, 0, 0, 0, 0, 0, 8, 9, 0, 16],
                [1, 0, 0, 0, 0, 0, 37, 37, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 21, 10, 10, 16],
                [9, 0, 0, 0, 0, 0, 29, 38, 10, 8],
                [1, 0, 0, 0, 0, 0, 0, 21, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 29, 38, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 21, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 29, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 10, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 10, 10, 20, 0, 0, 0, 0, 0, 8],
                [1, 10, 35, 28, 0, 0, 0, 0, 0, 16],
                [1, 10, 20, 0, 0, 0, 0, 0, 0, 16],
                [9, 35, 28, 0, 0, 0, 0, 0, 0, 16],
                [1, 20, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 28, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 10, 16],
                [9, 0, 0, 0, 0, 0, 21, 10, 10, 16],
                [1, 0, 0, 0, 0, 0, 29, 38, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 21, 10, 8],
                [1, 0, 0, 0, 0, 0, 0, 29, 38, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 21, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 29, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 10, 20, 0, 0, 0, 0, 0, 0, 8],
                [1, 35, 28, 0, 0, 0, 0, 0, 0, 16],
                [1, 20, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 28, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 15, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 21, 10, 16],
                [1, 0, 0, 0, 0, 0, 0, 29, 38, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 21, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 29, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [9, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 8],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 16]
            ]
        }]
    };
    LevelLvl5Resources = [new ig.Image('media/tiles-64.png'), new ig.Image('media/tiles-64.png')];
}); // lib/game/main.js
ig.baked = true;
ig.module('game.main').requires('impact.game', 'impact.font', 'plugins.howler', 'plugins.greenish-games-loader', 'plugins.camera', 'plugins.soundController', 'plugins.datastore', 'game.scenes.home', 'game.scenes.game', 'game.scenes.greatings', 'game.entities.btnpause', 'game.entities.btnplay', 'game.entities.btnrestart', 'game.entities.btnrestart', 'game.entities.btnhome', 'game.entities.toyslogo', 'game.entities.levelItemData', 'game.entities.lbltapto', 'game.entities.lblfindnote', 'game.entities.lbltutor', 'game.entities.lblcomplete', 'game.entities.lblwishyou', 'game.levels.menu', 'game.levels.finish', 'game.levels.lvl1', 'game.levels.lvl2', 'game.levels.lvl3', 'game.levels.lvl4', 'game.levels.lvl5').defines(function() {
    ig.global.link_moregames = 'https://codecanyon.net/user/GreenishGames';
    ig.global.userLang = navigator.language || navigator.userLanguage;
    var gameLangs = ['en'];
    gameOrientationFunction();
    var iFound = 0;
    for (var i = 0; i < gameLangs.length; i++) {
        if (ig.global.userLang == gameLangs[i]) {
            iFound = 1;
            break;
        }
    }
    if (iFound == 0) {
        ig.global.userLang = 'en';
    }
    window.addEventListener('orientationchange', gameOrientationFunction);
    window.addEventListener('resize', gameScreenResized);
    dataSaver = new GameDataStore();
    tmplevels = dataSaver.loadArrayData('xfeverlevels');
    if (tmplevels.length < 1) {
        for (var i = 0; i < 5; i++) {
            if (i == 0) someLevel = new LevelItemData({
                levelNumber: 1,
                unlocked: true,
                finished: false
            });
            else
                someLevel = new LevelItemData({
                    levelNumber: i + 1,
                    unlocked: false,
                    finished: false
                });
            levels.push(someLevel);
        }
        dataSaver.saveArrayData('xfeverlevels', levels);
    } else {
        for (var i = 0; i < tmplevels.length; i++) {
            levels.push(new LevelItemData({
                levelNumber: tmplevels[i].levelNumber,
                unlocked: tmplevels[i].unlocked,
                finished: tmplevels[i].finished
            }));
        }
    }
    mySound = new InGameSoundController();
    soundInGame = dataSaver.loadStringData('xfeversound');
    if (typeof(soundInGame) === 'undefined') {} else if (soundInGame == "0") mySound.muteSwitch();
    window.addEventListener('focus', function() {
        if (mySound != null && ig.global.muteOnBlur == 1) {
            mySound.muteSwitch();
            ig.global.muteOnBlur = 0;
        }
    });
    window.addEventListener('blur', function() {
        if (mySound != null && mySound.muted() == 0) {
            mySound.muteSwitch();
            ig.global.muteOnBlur = 1;
        }
    });
    var scale = (window.innerWidth < 640) ? 2 : 1;
    var canvas = document.getElementById('canvas');
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    var width = window.innerWidth * scale,
        height = window.innerHeight * scale;
    ig.main('#canvas', Home, 60, width, height, 1, ig.GreenishGames);
});