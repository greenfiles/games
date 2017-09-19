function v() {
    return function() {}
}

function z(w) {
    return function(M) {
        this[w] = M
    }
}

function C(w) {
    return function() {
        return this[w]
    }
}

function I(w) {
        return function() {
            return w
        }
    }
    (function() {
        function w() {}

        function M() {}

        function H() {}

        function Q() {
            this.b = ""
        }

        function u() {}

        function L() {}

        function V() {}

        function p() {}

        function y() {}

        function R(a, k) {
            k = k.split("u").join("");
            this.WH = RegExp(a, k)
        }

        function s(a, k) {
            function d() {}
            d.prototype = a;
            var b = new d,
                c;
            for (c in k) b[c] = k[c];
            k.toString !== Object.prototype.toString && (b.toString = k.toString);
            return b
        }

        function r(a, k) {
            if (null == k) return null;
            null == k.Qt && (k.Qt = Y++);
            var d;
            null == a.Zv ? a.Zv = {} : d = a.Zv[k.Qt];
            null == d && (d = function() {
                return d.method.apply(d.scope,
                    arguments)
            }, d.scope = a, d.method = k, a.Zv[k.Qt] = d);
            return d
        }
        R.q = !0;
        R.prototype = {
            replace: function(a, k) {
                return a.replace(this.WH, k)
            },
            r: R
        };
        y.q = !0;
        y.Oj = function(a, k) {
            var d = a.charCodeAt(k);
            return d != d ? void 0 : d
        };
        y.substr = function(a, k, d) {
            if (null != k && 0 != k && null != d && 0 > d) return "";
            null == d && (d = a.length);
            0 > k ? (k = a.length + k, 0 > k && (k = 0)) : 0 > d && (d = a.length + d - k);
            return a.substr(k, d)
        };
        y.indexOf = function(a, k, d) {
            var b = a.length;
            0 > d && (d += b, 0 > d && (d = 0));
            for (; d < b;) {
                if (a[d] === k) return d;
                d++
            }
            return -1
        };
        y.remove = function(a, k) {
            var d =
                y.indexOf(a, k, 0);
            if (-1 == d) return !1;
            a.splice(d, 1);
            return !0
        };
        p.q = !0;
        p.qG = function() {
            window.runGame = p.J
        };
        p.eK = function() {
            var a = document.createElement("canvas");
            if (null == a.getContext || null == a.getContext("2d").fillText) return !1;
            a = window.audioContextInstance;
            return b.s.dd() && null == a ? !1 : !0
        };
        p.fK = function() {
            return null != A.Pf.qp() && null != A.Pf.rp() && null != navigator.cookieEnabled && navigator.cookieEnabled
        };
        p.J = function() {
            p.eK() ? p.fK() ? (p.Rk = p.wd().createElement("div"), window.iS = "0", p.Rk.style.position = "relative",
                    p.Rk.className = "container", p.Rk.style.width = p.qd + "px", p.Rk.style.height = p.gd + "px", p.Rk.style.overflow = "hidden", b.H.ba.log(p.wd().getElementById("game-content")), p.wd().getElementById("game-content").appendChild(p.Rk), b.k.SoundManager.J(), p.lp = new b.s("kcu_spl_puz_spyops", new f.Km.Xn), p.lp.J(), window.hI = function() {
                        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function() {
                            window.setTimeout(p.update, 1E3 / (b.s.dd() ? p.FC : p.EC))
                        }
                    }(), p.update()) :
                window.location.href = "cookies.html" : window.location.href = "unsupported.html"
        };
        p.update = function() {
            try {
                p.lp.update(), p.lp.sc(), p.lp.Ue(), "1" == b.la.Qa("debugDraw") && p.lp.Fc(), window.hI(p.update)
            } catch (a) {
                window.alert(a)
            }
        };
        p.wd = function() {
            return window.document
        };
        p.hc = function() {
            return window
        };
        p.gc = function() {
            return p.canvas
        };
        p.Va = function() {
            return p.Rk
        };
        p.jO = function() {
            for (var a = p.hc().location.href.split("/"), k = "", d = 0, b = a.length - 1; d < b;) var c = d++,
                k = k + (a[c] + "/");
            return k
        };
        V.q = !0;
        Math.q = !0;
        L.q = !0;
        L.field =
            function(a, k) {
                try {
                    return a[k]
                } catch (d) {
                    return null
                }
            };
        L.setProperty = function(a, k, d) {
            var b;
            if (a.gm && (b = a.gm["set_" + k])) a[b](d);
            else a[k] = d
        };
        L.aw = function(a) {
            return "function" == typeof a && !(a.q || a.rg)
        };
        L.Dz = function(a, k) {
            return a == k ? !0 : L.aw(a) && L.aw(k) ? a.scope == k.scope && a.method == k.method && null != a.method : !1
        };
        u.q = !0;
        u.Ah = function(a) {
            return A.Ja.zo(a, "")
        };
        u["int"] = function(a) {
            return a | 0
        };
        u.gb = function(a) {
            var k = parseInt(a, 10);
            0 != k || 120 != y.Oj(a, 1) && 88 != y.Oj(a, 1) || (k = parseInt(a));
            return isNaN(k) ? null : k
        };
        u.ab =
            function(a) {
                return parseFloat(a)
            };
        Q.q = !0;
        Q.prototype = {
            add: function(a) {
                this.b += u.Ah(a)
            },
            oD: function(a, k, d) {
                this.b = null == d ? this.b + y.substr(a, k, null) : this.b + y.substr(a, k, d)
            },
            r: Q
        };
        H.q = !0;
        H.bC = function(a, k) {
            return a.length >= k.length && y.substr(a, 0, k.length) == k
        };
        H.replace = function(a, k, d) {
            return a.split(k).join(d)
        };
        H.DE = function(a, k) {
            return a.charCodeAt(k)
        };
        M.q = !0;
        M.np = function(a) {
            return null == a ? null : a instanceof Array && null == a.mb ? Array : a.r
        };
        M.wF = function(a) {
            return a.N
        };
        M.WD = function(a, k) {
            var d = L.field(a,
                k);
            if (null == d) throw "No such constructor " + k;
            if (L.aw(d)) throw "Constructor " + k + " need parameters";
            return d
        };
        M.jz = function(a) {
            return a.Ei
        };
        w.q = !0;
        w.parse = function(a) {
            return B.xml.Bi.parse(a)
        };
        w.createElement = function(a) {
            var k = new w;
            k.nodeType = w.$g;
            k.ub = [];
            k.Tt = new B.ee.oe;
            k.$B(a);
            return k
        };
        w.uv = function(a) {
            var k = new w;
            k.nodeType = w.xC;
            k.wn(a);
            return k
        };
        w.TD = function(a) {
            var k = new w;
            k.nodeType = w.tC;
            k.wn(a);
            return k
        };
        w.createComment = function(a) {
            var k = new w;
            k.nodeType = w.uC;
            k.wn(a);
            return k
        };
        w.VD = function(a) {
            var k =
                new w;
            k.nodeType = w.vC;
            k.wn(a);
            return k
        };
        w.createProcessingInstruction = function(a) {
            var k = new w;
            k.nodeType = w.yC;
            k.wn(a);
            return k
        };
        w.createDocument = function() {
            var a = new w;
            a.nodeType = w.Et;
            a.ub = [];
            return a
        };
        w.prototype = {
            Vv: function() {
                if (this.nodeType != w.$g) throw "bad nodeType";
                return this.Du
            },
            $B: function(a) {
                if (this.nodeType != w.$g) throw "bad nodeType";
                return this.Du = a
            },
            Wv: function() {
                if (this.nodeType == w.$g || this.nodeType == w.Et) throw "bad nodeType";
                return this.UC
            },
            wn: function(a) {
                if (this.nodeType == w.$g || this.nodeType ==
                    w.Et) throw "bad nodeType";
                return this.UC = a
            },
            get: function(a) {
                if (this.nodeType != w.$g) throw "bad nodeType";
                return this.Tt.get(a)
            },
            set: function(a, k) {
                if (this.nodeType != w.$g) throw "bad nodeType";
                this.Tt.set(a, k)
            },
            vc: function(a) {
                if (this.nodeType != w.$g) throw "bad nodeType";
                return this.Tt.vc(a)
            },
            za: function(a) {
                if (null == this.ub) throw "bad nodetype";
                return {
                    rs: 0,
                    x: this.ub,
                    wc: function() {
                        for (var k = this.rs, d = this.x.length; k < d;) {
                            var b = this.x[k];
                            if (b.nodeType == w.$g && b.Du == a) break;
                            k++
                        }
                        this.rs = k;
                        return k < d
                    },
                    next: function() {
                        for (var k =
                                this.rs, d = this.x.length; k < d;) {
                            var b = this.x[k];
                            k++;
                            if (b.nodeType == w.$g && b.Du == a) return this.rs = k, b
                        }
                        return null
                    }
                }
            },
            firstChild: function() {
                if (null == this.ub) throw "bad nodetype";
                return this.ub[0]
            },
            HE: function() {
                if (null == this.ub) throw "bad nodetype";
                for (var a = 0, k = this.ub.length; a < k;) {
                    var d = this.ub[a];
                    if (d.nodeType == w.$g) return d;
                    a++
                }
                return null
            },
            ha: function(a) {
                if (null == this.ub) throw "bad nodetype";
                null != a.Je && y.remove(a.Je.ub, a);
                a.Je = this;
                this.ub.push(a)
            },
            r: w,
            gm: {
                wn: "set_nodeValue",
                Wv: "get_nodeValue",
                $B: "set_nodeName",
                Vv: "get_nodeName"
            }
        };
        var c = {
            h: {}
        };
        c.h.ti = function() {
            this.lowerBound = new c.f.g.A;
            this.upperBound = new c.f.g.A
        };
        c.h.ti.q = !0;
        c.h.ti.prototype = {
            an: function() {
                var a = this.upperBound.y - this.lowerBound.y;
                return a = (a = 0 <= this.upperBound.x - this.lowerBound.x && 0 <= a) && this.lowerBound.an() && this.upperBound.an()
            },
            mp: function() {
                return new c.f.g.A((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
            },
            YE: function() {
                return new c.f.g.A((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y -
                    this.lowerBound.y) / 2)
            },
            contains: function(a) {
                var k;
                return k = (k = (k = (k = this.lowerBound.x <= a.lowerBound.x) && this.lowerBound.y <= a.lowerBound.y) && a.upperBound.x <= this.upperBound.x) && a.upperBound.y <= this.upperBound.y
            },
            Qg: function(a, k) {
                var d = -Number.MAX_VALUE,
                    b = Number.MAX_VALUE,
                    c = k.Ae.x,
                    h = k.Ae.y,
                    l = k.Pg.x - k.Ae.x,
                    m = k.Pg.y - k.Ae.y,
                    n = Math.abs(l),
                    q = Math.abs(m),
                    f = a.Gc;
                if (n < Number.MIN_VALUE) {
                    if (c < this.lowerBound.x || this.upperBound.x < c) return !1
                } else if (n = 1 / l, l = (this.lowerBound.x - c) * n, c = (this.upperBound.x - c) * n, n = -1,
                    l > c && (n = l, l = c, c = n, n = 1), l > d && (f.x = n, f.y = 0, d = l), b = Math.min(b, c), d > b) return !1;
                if (q < Number.MIN_VALUE) {
                    if (h < this.lowerBound.y || this.upperBound.y < h) return !1
                } else if (n = 1 / m, l = (this.lowerBound.y - h) * n, c = (this.upperBound.y - h) * n, n = -1, l > c && (n = l, l = c, c = n, n = 1), l > d && (f.y = n, f.x = 0, d = l), b = Math.min(b, c), d > b) return !1;
                a.Ds = d;
                return !0
            },
            lj: function(a) {
                var k = a.lowerBound.y - this.upperBound.y,
                    d = this.lowerBound.y - a.upperBound.y;
                return 0 < a.lowerBound.x - this.upperBound.x || 0 < k || 0 < this.lowerBound.x - a.upperBound.x || 0 < d ? !1 : !0
            },
            ps: function(a,
                k) {
                this.lowerBound.x = Math.min(a.lowerBound.x, k.lowerBound.x);
                this.lowerBound.y = Math.min(a.lowerBound.y, k.lowerBound.y);
                this.upperBound.x = Math.max(a.upperBound.x, k.upperBound.x);
                this.upperBound.y = Math.max(a.upperBound.y, k.upperBound.y)
            },
            r: c.h.ti
        };
        c.f = {};
        c.f.g = {};
        c.f.g.A = function(a, k) {
            null == k && (k = 0);
            null == a && (a = 0);
            this.x = a;
            this.y = k
        };
        c.f.g.A.q = !0;
        c.f.g.A.rG = function() {
            return new c.f.g.A(0, 0)
        };
        c.f.g.A.prototype = {
            hb: function() {
                this.y = this.x = 0
            },
            set: function(a, k) {
                null == k && (k = 0);
                null == a && (a = 0);
                this.x = a;
                this.y =
                    k
            },
            P: function(a) {
                this.x = a.x;
                this.y = a.y
            },
            Wk: function() {
                return new c.f.g.A(-this.x, -this.y)
            },
            eB: function() {
                this.x = -this.x;
                this.y = -this.y
            },
            copy: function() {
                return new c.f.g.A(this.x, this.y)
            },
            add: function(a) {
                this.x += a.x;
                this.y += a.y
            },
            zx: function(a) {
                this.x -= a.x;
                this.y -= a.y
            },
            multiply: function(a) {
                this.x *= a;
                this.y *= a
            },
            Qj: function(a) {
                var k = this.x;
                this.x = a * this.y;
                this.y = -a * k
            },
            ep: function(a) {
                var k = this.x;
                this.x = -a * this.y;
                this.y = a * k
            },
            dB: function(a) {
                this.x = this.x < a.x ? this.x : a.x;
                this.y = this.y < a.y ? this.y : a.y
            },
            cB: function(a) {
                this.x =
                    this.x > a.x ? this.x : a.x;
                this.y = this.y > a.y ? this.y : a.y
            },
            abs: function() {
                0 > this.x && (this.x = -this.x);
                0 > this.y && (this.y = -this.y)
            },
            length: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            Ws: function() {
                return this.x * this.x + this.y * this.y
            },
            normalize: function() {
                var a = Math.sqrt(this.x * this.x + this.y * this.y);
                if (a < Number.MIN_VALUE) return 0;
                var k = 1 / a;
                this.x *= k;
                this.y *= k;
                return a
            },
            an: function() {
                return c.f.g.t.an(this.x) && c.f.g.t.an(this.y)
            },
            r: c.f.g.A
        };
        c.h.ao = function() {
            this.jg = new c.f.g.A;
            this.id = new c.h.mk
        };
        c.h.ao.q = !0;
        c.h.ao.prototype = {
            set: function(a) {
                this.jg.P(a.jg);
                this.id.set(a.id)
            },
            r: c.h.ao
        };
        c.h.mk = function() {
            this.features = new c.h.Iq;
            this.features.Cj = this
        };
        c.h.mk.q = !0;
        c.h.mk.prototype = {
            set: function(a) {
                this.kj(a.jf)
            },
            copy: function() {
                var a = new c.h.mk;
                a.kj(this.Ps());
                return a
            },
            Ps: C("jf"),
            kj: function(a) {
                this.jf = a;
                this.features.Tu = this.jf & 255;
                this.features.lu = (this.jf & 65280) >> 8 & 255;
                this.features.mu = (this.jf & 16711680) >> 16 & 255;
                this.features.eu = (this.jf & -16777216) >> 24 & 255;
                return this.jf
            },
            r: c.h.mk,
            gm: {
                kj: "set_key",
                Ps: "get_key"
            }
        };
        c.h.Iq = v();
        c.h.Iq.q = !0;
        c.h.Iq.prototype = {
            JF: C("Tu"),
            qx: function(a) {
                this.Tu = a;
                this.Cj.jf = this.Cj.jf & -256 | this.Tu & 255;
                return a
            },
            HF: C("lu"),
            ox: function(a) {
                this.lu = a;
                this.Cj.jf = this.Cj.jf & -65281 | this.lu << 8 & 65280;
                return a
            },
            IF: C("mu"),
            px: function(a) {
                this.mu = a;
                this.Cj.jf = this.Cj.jf & -16711681 | this.mu << 16 & 16711680;
                return a
            },
            GF: C("eu"),
            ZB: function(a) {
                this.eu = a;
                this.Cj.jf = this.Cj.jf & 16777215 | this.eu << 24 & -16777216;
                return a
            },
            r: c.h.Iq,
            gm: {
                ZB: "set_flip",
                GF: "get_flip",
                px: "set_incidentVertex",
                IF: "get_incidentVertex",
                ox: "set_incidentEdge",
                HF: "get_incidentEdge",
                qx: "set_referenceEdge",
                JF: "get_referenceEdge"
            }
        };
        c.h.Aa = v();
        c.h.Aa.q = !0;
        c.h.Aa.zz = function(a, k, d, b) {
            var c, h = 0;
            c = k[0];
            var l = c.jg;
            c = k[1];
            var m = c.jg,
                n = d.x * l.x + d.y * l.y - b;
            c = d.x * m.x + d.y * m.y - b;
            0 >= n && a[h++].set(k[0]);
            0 >= c && a[h++].set(k[1]);
            0 > n * c && (d = n / (n - c), c = a[h], c = c.jg, c.x = l.x + d * (m.x - l.x), c.y = l.y + d * (m.y - l.y), c = a[h], c.id = (0 < n ? k[0] : k[1]).id, ++h);
            return h
        };
        c.h.Aa.zs = function(a, k, d, b, c) {
            var h = a.ea;
            a = a.nc;
            var l = b.Sb,
                m = b.ea,
                n, q;
            n = k.G;
            q = a[d];
            a = n.l.x * q.x + n.m.x * q.y;
            b = n.l.y *
                q.x + n.m.y * q.y;
            n = c.G;
            var f = n.l.x * a + n.l.y * b;
            n = n.m.x * a + n.m.y * b;
            for (var x = 0, N = Number.MAX_VALUE, E = 0; E < l;) {
                var p = E++;
                q = m[p];
                q = q.x * f + q.y * n;
                q < N && (N = q, x = p)
            }
            q = h[d];
            n = k.G;
            d = k.position.x + (n.l.x * q.x + n.m.x * q.y);
            k = k.position.y + (n.l.y * q.x + n.m.y * q.y);
            q = m[x];
            n = c.G;
            h = c.position.x + (n.l.x * q.x + n.m.x * q.y);
            c = c.position.y + (n.l.y * q.x + n.m.y * q.y);
            return (h - d) * a + (c - k) * b
        };
        c.h.Aa.Vz = function(a, k, d, b, g) {
            var h = k.Sb,
                l = k.nc,
                m, n;
            n = g.G;
            m = b.$i;
            var q = g.position.x + (n.l.x * m.x + n.m.x * m.y),
                f = g.position.y + (n.l.y * m.x + n.m.y * m.y);
            n = d.G;
            m = k.$i;
            q -=
                d.position.x + (n.l.x * m.x + n.m.x * m.y);
            f -= d.position.y + (n.l.y * m.x + n.m.y * m.y);
            n = q * d.G.l.x + f * d.G.l.y;
            for (var f = q * d.G.m.x + f * d.G.m.y, q = 0, x = -Number.MAX_VALUE, N = 0; N < h;) {
                var E = N++;
                m = l[E];
                m = m.x * n + m.y * f;
                m > x && (x = m, q = E)
            }
            l = c.h.Aa.zs(k, d, q, b, g);
            x = 0 <= q - 1 ? q - 1 : h - 1;
            n = c.h.Aa.zs(k, d, x, b, g);
            N = q + 1 < h ? q + 1 : 0;
            f = c.h.Aa.zs(k, d, N, b, g);
            if (n > l && n > f) m = -1;
            else if (f > l) m = 1, x = N, n = f;
            else return a[0] = q, l;
            for (;;)
                if (q = -1 == m ? 0 <= x - 1 ? x - 1 : h - 1 : x + 1 < h ? x + 1 : 0, l = c.h.Aa.zs(k, d, q, b, g), l > n) x = q, n = l;
                else break;
            a[0] = x;
            return n
        };
        c.h.Aa.FE = function(a, k, d, b,
            c, h) {
            var l = k.nc,
                m = c.Sb;
            k = c.ea;
            c = c.nc;
            var n;
            n = d.G;
            d = l[b];
            var l = n.l.x * d.x + n.m.x * d.y,
                f = n.l.y * d.x + n.m.y * d.y;
            n = h.G;
            d = n.l.x * l + n.l.y * f;
            f = n.m.x * l + n.m.y * f;
            l = d;
            n = 0;
            for (var t = Number.MAX_VALUE, x = 0; x < m;) {
                var N = x++;
                d = c[N];
                d = l * d.x + f * d.y;
                d < t && (t = d, n = N)
            }
            c = n;
            l = c + 1 < m ? c + 1 : 0;
            m = a[0];
            d = k[c];
            n = h.G;
            m.jg.x = h.position.x + (n.l.x * d.x + n.m.x * d.y);
            m.jg.y = h.position.y + (n.l.y * d.x + n.m.y * d.y);
            m.id.features.qx(b);
            m.id.features.ox(c);
            m.id.features.px(0);
            m = a[1];
            d = k[l];
            n = h.G;
            m.jg.x = h.position.x + (n.l.x * d.x + n.m.x * d.y);
            m.jg.y = h.position.y +
                (n.l.y * d.x + n.m.y * d.y);
            m.id.features.qx(b);
            m.id.features.ox(l);
            m.id.features.px(1)
        };
        c.h.Aa.vw = function() {
            var a = [];
            a[0] = new c.h.ao;
            a[1] = new c.h.ao;
            return a
        };
        c.h.Aa.MD = function(a, k, d, b, g) {
            var h;
            a.ed = 0;
            var l = k.Za + b.Za,
                m;
            c.h.Aa.ex[0] = 0;
            var n = c.h.Aa.Vz(c.h.Aa.ex, k, d, b, g);
            m = c.h.Aa.ex[0];
            if (!(n > l)) {
                var f;
                c.h.Aa.fx[0] = 0;
                var t = c.h.Aa.Vz(c.h.Aa.fx, b, g, k, d);
                f = c.h.Aa.fx[0];
                if (!(t > l)) {
                    t > 0.98 * n + 0.001 ? (n = b, b = k, k = g, a.tb = c.h.Cd.rj, m = 1) : (n = k, k = d, d = g, f = m, a.tb = c.h.Cd.og, m = 0);
                    g = c.h.Aa.lI;
                    c.h.Aa.FE(g, n, k, f, b, d);
                    t = n.ea;
                    b = t[f];
                    var x;
                    x = f + 1 < n.Sb ? t[f + 1 | 0] : t[0];
                    n = c.h.Aa.oI;
                    n.set(x.x - b.x, x.y - b.y);
                    n.normalize();
                    t = c.h.Aa.nI;
                    t.x = n.y;
                    t.y = -n.x;
                    var N = c.h.Aa.qI;
                    N.set(0.5 * (b.x + x.x), 0.5 * (b.y + x.y));
                    h = c.h.Aa.wI;
                    f = k.G;
                    h.x = f.l.x * n.x + f.m.x * n.y;
                    h.y = f.l.y * n.x + f.m.y * n.y;
                    var E = c.h.Aa.xI;
                    E.x = -h.x;
                    E.y = -h.y;
                    n = c.h.Aa.pI;
                    n.x = h.y;
                    n.y = -h.x;
                    var p = c.h.Aa.AI,
                        r = c.h.Aa.BI;
                    p.x = k.position.x + (f.l.x * b.x + f.m.x * b.y);
                    p.y = k.position.y + (f.l.y * b.x + f.m.y * b.y);
                    r.x = k.position.x + (f.l.x * x.x + f.m.x * x.y);
                    r.y = k.position.y + (f.l.y * x.x + f.m.y * x.y);
                    k = n.x * p.x + n.y * p.y;
                    f = h.x *
                        r.x + h.y * r.y + l;
                    x = c.h.Aa.jI;
                    b = c.h.Aa.kI;
                    g = c.h.Aa.zz(x, g, E, -h.x * p.x - h.y * p.y + l);
                    if (!(2 > g || (g = c.h.Aa.zz(b, x, h, f), 2 > g))) {
                        a.he.P(t);
                        a.lb.P(N);
                        t = g = 0;
                        for (N = c.f.F.Nj; t < N;) f = t++, h = b[f], n.x * h.jg.x + n.y * h.jg.y - k <= l && (E = a.kb[g], f = d.G, p = h.jg.x - d.position.x, x = h.jg.y - d.position.y, E.lb.x = p * f.l.x + x * f.l.y, E.lb.y = p * f.m.x + x * f.m.y, E.Ng.set(h.id), E.Ng.features.ZB(m), ++g);
                        a.ed = g
                    }
                }
            }
        };
        c.h.Aa.KD = function(a, k, d, b, g) {
            a.ed = 0;
            var h, l;
            h = d.G;
            l = k.Qb;
            var m = d.position.x + (h.l.x * l.x + h.m.x * l.y);
            d = d.position.y + (h.l.y * l.x + h.m.y * l.y);
            h = g.G;
            l = b.Qb;
            m = g.position.x + (h.l.x * l.x + h.m.x * l.y) - m;
            g = g.position.y + (h.l.y * l.x + h.m.y * l.y) - d;
            h = k.Za + b.Za;
            m * m + g * g > h * h || (a.tb = c.h.Cd.Fq, a.lb.P(k.Qb), a.he.hb(), a.ed = 1, a.kb[0].lb.P(b.Qb), a.kb[0].Ng.kj(0))
        };
        c.h.Aa.LD = function(a, k, d, b, g) {
            a.ed = 0;
            var h, l, m, n;
            n = g.G;
            m = b.Qb;
            var f = g.position.y + (n.l.y * m.x + n.m.y * m.y);
            h = g.position.x + (n.l.x * m.x + n.m.x * m.y) - d.position.x;
            l = f - d.position.y;
            n = d.G;
            d = h * n.l.x + l * n.l.y;
            n = h * n.m.x + l * n.m.y;
            var t = 0;
            g = -Number.MAX_VALUE;
            var f = k.Za + b.Za,
                x = k.Sb,
                p = k.ea;
            k = k.nc;
            for (var E = 0; E < x;) {
                var r = E++;
                m =
                    p[r];
                h = d - m.x;
                l = n - m.y;
                m = k[r];
                m = m.x * h + m.y * l;
                if (m > f) return;
                m > g && (g = m, t = r)
            }
            m = t;
            h = p[m];
            x = p[m + 1 < x ? m + 1 : 0];
            g < Number.MIN_VALUE ? (a.ed = 1, a.tb = c.h.Cd.og, a.he.P(k[t]), a.lb.x = 0.5 * (h.x + x.x), a.lb.y = 0.5 * (h.y + x.y), a.kb[0].lb.P(b.Qb), a.kb[0].Ng.kj(0)) : (g = (d - x.x) * (h.x - x.x) + (n - x.y) * (h.y - x.y), 0 >= (d - h.x) * (x.x - h.x) + (n - h.y) * (x.y - h.y) ? (d - h.x) * (d - h.x) + (n - h.y) * (n - h.y) > f * f || (a.ed = 1, a.tb = c.h.Cd.og, a.he.x = d - h.x, a.he.y = n - h.y, a.he.normalize(), a.lb.P(h), a.kb[0].lb.P(b.Qb), a.kb[0].Ng.kj(0)) : 0 >= g ? (d - x.x) * (d - x.x) + (n - x.y) * (n - x.y) > f * f ||
                (a.ed = 1, a.tb = c.h.Cd.og, a.he.x = d - x.x, a.he.y = n - x.y, a.he.normalize(), a.lb.P(x), a.kb[0].lb.P(b.Qb), a.kb[0].Ng.kj(0)) : (t = 0.5 * (h.x + x.x), h = 0.5 * (h.y + x.y), g = (d - t) * k[m].x + (n - h) * k[m].y, g > f || (a.ed = 1, a.tb = c.h.Cd.og, a.he.x = k[m].x, a.he.y = k[m].y, a.he.normalize(), a.lb.set(t, h), a.kb[0].lb.P(b.Qb), a.kb[0].Ng.kj(0))))
        };
        c.h.Aa.lj = function(a, k) {
            var d = k.lowerBound,
                b = a.upperBound,
                c = d.x - b.x,
                h = d.y - b.y,
                d = a.lowerBound,
                b = k.upperBound,
                l = d.y - b.y;
            return 0 < c || 0 < h || 0 < d.x - b.x || 0 < l ? !1 : !0
        };
        c.h.pq = function() {
            this.position = new c.f.g.A;
            this.Gc = new c.f.g.A;
            this.id = new c.h.mk
        };
        c.h.pq.q = !0;
        c.h.pq.prototype = {
            r: c.h.pq
        };
        c.h.Aq = function() {
            this.Ea = new c.h.Gl;
            this.Wa = new c.h.Gl;
            this.Jf = new c.h.Gl;
            this.ea = [];
            this.ea[0] = this.Ea;
            this.ea[1] = this.Wa;
            this.ea[2] = this.Jf
        };
        c.h.Aq.q = !0;
        c.h.Aq.prototype = {
            ZH: function(a, k, d, b, g) {
                c.f.F.Ic(0 <= a.count && 3 >= a.count);
                var h, l;
                this.Yb = a.count;
                for (var m = this.ea, n, f = 0, t = this.Yb; f < t;) h = f++, n = m[h], n.Td = a.Td[h], n.Ud = a.Ud[h], h = k.ue(n.Td), l = b.ue(n.Ud), n.Ce = c.f.g.t.Wc(d, h), n.Sg = c.f.g.t.Wc(g, l), n.fd = c.f.g.t.Ac(n.Sg,
                    n.Ce), n.a = 0;
                1 < this.Yb && (a = a.vG, n = this.oA(), n < 0.5 * a || 2 * a < n || n < Number.MIN_VALUE) && (this.Yb = 0);
                0 == this.Yb && (n = m[0], n.Td = 0, n.Ud = 0, h = k.ue(0), l = b.ue(0), n.Ce = c.f.g.t.Wc(d, h), n.Sg = c.f.g.t.Wc(g, l), n.fd = c.f.g.t.Ac(n.Sg, n.Ce), this.Yb = 1)
            },
            iK: function(a) {
                a.vG = this.oA();
                a.count = this.Yb | 0;
                for (var k = this.ea, d = 0, b = this.Yb; d < b;) {
                    var c = d++;
                    a.Td[c] = k[c].Td | 0;
                    a.Ud[c] = k[c].Ud | 0
                }
            },
            tF: function() {
                switch (this.Yb) {
                    case 1:
                        return this.Ea.fd.Wk();
                    case 2:
                        var a = c.f.g.t.Ac(this.Wa.fd, this.Ea.fd);
                        return 0 < c.f.g.t.Nm(a, this.Ea.fd.Wk()) ?
                            c.f.g.t.ep(1, a) : c.f.g.t.Qj(a, 1);
                    default:
                        return c.f.F.Ic(!1), new c.f.g.A
                }
            },
            Zz: function() {
                switch (this.Yb) {
                    case 0:
                        return c.f.F.Ic(!1), new c.f.g.A;
                    case 1:
                        return this.Ea.fd;
                    case 2:
                        return new c.f.g.A(this.Ea.a * this.Ea.fd.x + this.Wa.a * this.Wa.fd.x, this.Ea.a * this.Ea.fd.y + this.Wa.a * this.Wa.fd.y);
                    default:
                        return c.f.F.Ic(!1), new c.f.g.A
                }
            },
            AF: function(a, k) {
                switch (this.Yb) {
                    case 0:
                        c.f.F.Ic(!1);
                        break;
                    case 1:
                        a.P(this.Ea.Ce);
                        k.P(this.Ea.Sg);
                        break;
                    case 2:
                        a.x = this.Ea.a * this.Ea.Ce.x + this.Wa.a * this.Wa.Ce.x;
                        a.y = this.Ea.a *
                            this.Ea.Ce.y + this.Wa.a * this.Wa.Ce.y;
                        k.x = this.Ea.a * this.Ea.Sg.x + this.Wa.a * this.Wa.Sg.x;
                        k.y = this.Ea.a * this.Ea.Sg.y + this.Wa.a * this.Wa.Sg.y;
                        break;
                    case 3:
                        k.x = a.x = this.Ea.a * this.Ea.Ce.x + this.Wa.a * this.Wa.Ce.x + this.Jf.a * this.Jf.Ce.x;
                        k.y = a.y = this.Ea.a * this.Ea.Ce.y + this.Wa.a * this.Wa.Ce.y + this.Jf.a * this.Jf.Ce.y;
                        break;
                    default:
                        c.f.F.Ic(!1)
                }
            },
            oA: function() {
                switch (this.Yb) {
                    case 0:
                        return c.f.F.Ic(!1), 0;
                    case 1:
                        return 0;
                    case 2:
                        return c.f.g.t.Ac(this.Ea.fd, this.Wa.fd).length();
                    case 3:
                        return c.f.g.t.Nm(c.f.g.t.Ac(this.Wa.fd,
                            this.Ea.fd), c.f.g.t.Ac(this.Jf.fd, this.Ea.fd));
                    default:
                        return c.f.F.Ic(!1), 0
                }
            },
            HJ: function() {
                var a = this.Ea.fd,
                    k = this.Wa.fd,
                    d = c.f.g.t.Ac(k, a),
                    a = -(a.x * d.x + a.y * d.y);
                0 >= a ? this.Yb = this.Ea.a = 1 : (k = k.x * d.x + k.y * d.y, 0 >= k ? (this.Yb = this.Wa.a = 1, this.Ea.set(this.Wa)) : (d = 1 / (k + a), this.Ea.a = k * d, this.Wa.a = a * d, this.Yb = 2))
            },
            IJ: function() {
                var a = this.Ea.fd,
                    k = this.Wa.fd,
                    d = this.Jf.fd,
                    b = c.f.g.t.Ac(k, a),
                    g = c.f.g.t.se(k, b),
                    h = -c.f.g.t.se(a, b),
                    l = c.f.g.t.Ac(d, a),
                    m = c.f.g.t.se(d, l),
                    n = -c.f.g.t.se(a, l),
                    f = c.f.g.t.Ac(d, k),
                    t = c.f.g.t.se(d,
                        f),
                    f = -c.f.g.t.se(k, f),
                    l = c.f.g.t.Nm(b, l),
                    b = l * c.f.g.t.Nm(k, d),
                    d = l * c.f.g.t.Nm(d, a),
                    a = l * c.f.g.t.Nm(a, k);
                0 >= h && 0 >= n ? this.Yb = this.Ea.a = 1 : 0 < g && 0 < h && 0 >= a ? (m = 1 / (g + h), this.Ea.a = g * m, this.Wa.a = h * m, this.Yb = 2) : 0 < m && 0 < n && 0 >= d ? (g = 1 / (m + n), this.Ea.a = m * g, this.Jf.a = n * g, this.Yb = 2, this.Wa.set(this.Jf)) : 0 >= g && 0 >= f ? (this.Yb = this.Wa.a = 1, this.Ea.set(this.Wa)) : 0 >= m && 0 >= t ? (this.Yb = this.Jf.a = 1, this.Ea.set(this.Jf)) : 0 < t && 0 < f && 0 >= b ? (g = 1 / (t + f), this.Wa.a = t * g, this.Jf.a = f * g, this.Yb = 2, this.Ea.set(this.Jf)) : (g = 1 / (b + d + a), this.Ea.a = b *
                    g, this.Wa.a = d * g, this.Jf.a = a * g, this.Yb = 3)
            },
            r: c.h.Aq
        };
        c.h.Gl = v();
        c.h.Gl.q = !0;
        c.h.Gl.prototype = {
            set: function(a) {
                this.Ce.P(a.Ce);
                this.Sg.P(a.Sg);
                this.fd.P(a.fd);
                this.a = a.a;
                this.Td = a.Td;
                this.Ud = a.Ud
            },
            r: c.h.Gl
        };
        c.h.Of = v();
        c.h.Of.q = !0;
        c.h.Of.Dg = function(a, k, d) {
            ++c.h.Of.nN;
            var b = d.gj,
                g = d.hj,
                h = d.UJ,
                l = d.VJ,
                m = c.h.Of.uI;
            m.ZH(k, b, h, g, l);
            var n = m.ea,
                f = c.h.Of.sI,
                t = c.h.Of.tI,
                x = 0;
            m.Zz();
            for (var p = 0; 20 > p;) {
                for (var x = m.Yb, E = 0; E < x;) {
                    var r = E++;
                    f[r] = n[r].Td;
                    t[r] = n[r].Ud
                }
                switch (m.Yb) {
                    case 1:
                        break;
                    case 2:
                        m.HJ();
                        break;
                    case 3:
                        m.IJ();
                        break;
                    default:
                        c.f.F.Ic(!1)
                }
                if (3 == m.Yb) break;
                m.Zz();
                r = m.tF();
                if (r.Ws() < Number.MIN_VALUE * Number.MIN_VALUE) break;
                E = n[m.Yb];
                E.Td = u["int"](b.Tv(c.f.g.t.dk(h.G, r.Wk())));
                E.Ce = c.f.g.t.Wc(h, b.ue(E.Td));
                E.Ud = u["int"](g.Tv(c.f.g.t.dk(l.G, r)));
                E.Sg = c.f.g.t.Wc(l, g.ue(E.Ud));
                E.fd = c.f.g.t.Ac(E.Sg, E.Ce);
                ++p;
                ++c.h.Of.oN;
                for (var r = !1, P = 0; P < x;) {
                    var s = P++;
                    if (E.Td == f[s] && E.Ud == t[s]) {
                        r = !0;
                        break
                    }
                }
                if (r) break;
                ++m.Yb
            }
            c.h.Of.xD = u["int"](c.f.g.t.max(c.h.Of.xD, p));
            m.AF(a.vh, a.wh);
            a.Dg = c.f.g.t.Ac(a.vh, a.wh).length();
            a.zQ = p;
            m.iK(k);
            d.dK && (k = b.Za, g = g.Za, a.Dg > k + g && a.Dg > Number.MIN_VALUE ? (a.Dg -= k + g, d = c.f.g.t.Ac(a.wh, a.vh), d.normalize(), a.vh.x += k * d.x, a.vh.y += k * d.y, a.wh.x -= g * d.x, a.wh.y -= g * d.y) : (g = new c.f.g.A, g.x = 0.5 * (a.vh.x + a.wh.x), g.y = 0.5 * (a.vh.y + a.wh.y), a.vh.x = a.wh.x = g.x, a.vh.y = a.wh.y = g.y, a.Dg = 0))
        };
        c.h.sq = v();
        c.h.sq.q = !0;
        c.h.sq.prototype = {
            r: c.h.sq
        };
        c.h.tq = function() {
            this.vh = new c.f.g.A;
            this.wh = new c.f.g.A
        };
        c.h.tq.q = !0;
        c.h.tq.prototype = {
            r: c.h.tq
        };
        c.h.Fn = function() {
            this.ea = []
        };
        c.h.Fn.q = !0;
        c.h.Fn.prototype = {
            set: function(a) {
                switch (a.Db()[1]) {
                    case 1:
                        a =
                            A.Ja.Fb(a, c.h.S.Nf);
                        this.ea = [];
                        this.ea[0] = a.Qb;
                        this.Yb = 1;
                        this.Za = a.Za;
                        break;
                    case 2:
                        a = A.Ja.Fb(a, c.h.S.Bc);
                        this.ea = a.ea;
                        this.Yb = a.Sb;
                        this.Za = a.Za;
                        break;
                    default:
                        c.f.F.Ic(!1)
                }
            },
            Tv: function(a) {
                for (var k = 0, d = this.ea[0].x * a.x + this.ea[0].y * a.y, b = 1, c = this.Yb; b < c;) {
                    var h = b++,
                        l = this.ea[h].x * a.x + this.ea[h].y * a.y;
                    l > d && (k = h, d = l)
                }
                return k
            },
            tp: function(a) {
                for (var k = 0, d = this.ea[0].x * a.x + this.ea[0].y * a.y, b = 1, c = this.Yb; b < c;) {
                    var h = b++,
                        l = this.ea[h].x * a.x + this.ea[h].y * a.y;
                    l > d && (k = h, d = l)
                }
                return this.ea[k]
            },
            BA: C("Yb"),
            ue: function(a) {
                c.f.F.Ic(0 <= a && a < this.Yb);
                return this.ea[a]
            },
            r: c.h.Fn
        };
        c.h.uq = function() {
            this.Cp = this.Og = null
        };
        c.h.uq.q = !0;
        c.h.uq.prototype = {
            Mm: function(a, k) {
                var d = this.kz(),
                    b = c.f.F.ks,
                    g = c.f.F.ks;
                d.sb.lowerBound.x = a.lowerBound.x - b;
                d.sb.lowerBound.y = a.lowerBound.y - g;
                d.sb.upperBound.x = a.upperBound.x + b;
                d.sb.upperBound.y = a.upperBound.y + g;
                d.mj = k;
                this.GA(d);
                return d
            },
            Om: function(a) {
                this.vB(a);
                this.Dv(a)
            },
            zw: function(a, k, d) {
                c.f.F.Ic(a.wp());
                if (a.sb.contains(k)) return !1;
                this.vB(a);
                var b;
                b = c.f.F.ks + c.f.F.pz *
                    (0 < d.x ? d.x : -d.x);
                d = c.f.F.ks + c.f.F.pz * (0 < d.y ? d.y : -d.y);
                a.sb.lowerBound.x = k.lowerBound.x - b;
                a.sb.lowerBound.y = k.lowerBound.y - d;
                a.sb.upperBound.x = k.upperBound.x + b;
                a.sb.upperBound.y = k.upperBound.y + d;
                this.GA(a);
                return !0
            },
            Um: function(a) {
                return a.sb
            },
            getUserData: function(a) {
                return a.mj
            },
            Ww: function(a, k) {
                if (null != this.Og) {
                    var d = [],
                        b = 0;
                    for (d[b++] = this.Og; 0 < b;) {
                        var c = d[--b];
                        if (c.sb.lj(k))
                            if (c.wp()) {
                                if (!a(c)) break
                            } else d[b++] = c.Ef, d[b++] = c.Rh
                    }
                }
            },
            Qg: function(a, k) {
                if (null != this.Og) {
                    var b = k.Ae,
                        e = k.Pg,
                        g = c.f.g.t.Ac(b,
                            e);
                    g.normalize();
                    var g = c.f.g.t.ep(1, g),
                        h = c.f.g.t.fv(g),
                        l = k.nl,
                        m = new c.h.ti,
                        n;
                    n = b.x + l * (e.x - b.x);
                    l = b.y + l * (e.y - b.y);
                    m.lowerBound.x = Math.min(b.x, n);
                    m.lowerBound.y = Math.min(b.y, l);
                    m.upperBound.x = Math.max(b.x, n);
                    m.upperBound.y = Math.max(b.y, l);
                    var f = [],
                        t = 0;
                    for (f[t++] = this.Og; 0 < t;)
                        if (n = f[--t], !1 != n.sb.lj(m)) {
                            var l = n.sb.mp(),
                                x = n.sb.YE();
                            if (!(0 < Math.abs(g.x * (b.x - l.x) + g.y * (b.y - l.y)) - h.x * x.x - h.y * x.y))
                                if (n.wp()) {
                                    l = new c.h.Tn;
                                    l.Ae = k.Ae;
                                    l.Pg = k.Pg;
                                    l.nl = k.nl;
                                    l = a(l, n);
                                    if (0 == l) break;
                                    n = b.x + l * (e.x - b.x);
                                    l = b.y + l * (e.y - b.y);
                                    m.lowerBound.x = Math.min(b.x, n);
                                    m.lowerBound.y = Math.min(b.y, l);
                                    m.upperBound.x = Math.max(b.x, n);
                                    m.upperBound.y = Math.max(b.y, l)
                                } else f[t++] = n.Ef, f[t++] = n.Rh
                        }
                }
            },
            kz: function() {
                if (null != this.Cp) {
                    var a = this.Cp;
                    this.Cp = a.parent;
                    a.parent = null;
                    a.Ef = null;
                    a.Rh = null;
                    return a
                }
                return new c.h.Cl
            },
            Dv: function(a) {
                a.parent = this.Cp;
                this.Cp = a
            },
            GA: function(a) {
                if (null == this.Og) this.Og = a, this.Og.parent = null;
                else {
                    var k = a.sb.mp(),
                        b = this.Og;
                    if (!1 == b.wp()) {
                        do var c = b.Ef,
                            b = b.Rh,
                            g = Math.abs((c.sb.lowerBound.x + c.sb.upperBound.x) /
                                2 - k.x) + Math.abs((c.sb.lowerBound.y + c.sb.upperBound.y) / 2 - k.y),
                            h = Math.abs((b.sb.lowerBound.x + b.sb.upperBound.x) / 2 - k.x) + Math.abs((b.sb.lowerBound.y + b.sb.upperBound.y) / 2 - k.y),
                            b = g < h ? c : b; while (!1 == b.wp())
                    }
                    k = b.parent;
                    c = this.kz();
                    c.parent = k;
                    c.mj = null;
                    c.sb.ps(a.sb, b.sb);
                    if (null != k) {
                        b.parent.Ef == b ? k.Ef = c : k.Rh = c;
                        c.Ef = b;
                        c.Rh = a;
                        b.parent = c;
                        a.parent = c;
                        do {
                            if (k.sb.contains(c.sb)) break;
                            k.sb.ps(k.Ef.sb, k.Rh.sb);
                            c = k;
                            k = k.parent
                        } while (null != k)
                    } else c.Ef = b, c.Rh = a, b.parent = c, this.Og = a.parent = c
                }
            },
            vB: function(a) {
                if (a == this.Og) this.Og =
                    null;
                else {
                    var k = a.parent,
                        b = k.parent;
                    a = k.Ef == a ? k.Rh : k.Ef;
                    if (null != b)
                        for (b.Ef == k ? b.Ef = a : b.Rh = a, a.parent = b, this.Dv(k); null != b;) {
                            k = b.sb;
                            b.sb = new c.h.ti;
                            b.sb.ps(b.Ef.sb, b.Rh.sb);
                            if (k.contains(b.sb)) break;
                            b = b.parent
                        } else this.Og = a, a.parent = null, this.Dv(k)
                }
            },
            r: c.h.uq
        };
        c.h.Qq = v();
        c.h.Qq.q = !0;
        c.h.Qq.prototype = {
            r: c.h.Qq
        };
        c.h.Gn = function() {
            this.hg = new c.h.uq;
            this.Fp = [];
            this.Gp = [];
            this.il = 0
        };
        c.h.Gn.q = !0;
        c.h.Gn.Ox = [c.h.Qq];
        c.h.Gn.prototype = {
            Mm: function(a, k) {
                var b = this.hg.Mm(a, k);
                this.xz(b);
                return b
            },
            Om: function(a) {
                this.WJ(a);
                this.hg.Om(a)
            },
            zw: function(a, k, b) {
                this.hg.zw(a, k, b) && this.xz(a)
            },
            lj: function(a, k) {
                return this.hg.Um(a).lj(this.hg.Um(k))
            },
            getUserData: function(a) {
                return this.hg.getUserData(a)
            },
            Um: function(a) {
                return this.hg.Um(a)
            },
            bK: function(a) {
                for (var k = this, b = this.il = 0, e = this.Fp; b < e.length;) {
                    var g = [e[b]];
                    ++b;
                    this.hg.Ww(function(a) {
                        return function(b) {
                            if (b == a[0]) return !0;
                            k.il == k.Gp.length && (k.Gp[k.il] = new c.h.vq);
                            var d = k.Gp[k.il];
                            b.id < a[0].id ? (d.gj = b, d.hj = a[0]) : (d.gj = a[0], d.hj = b);
                            ++k.il;
                            return !0
                        }
                    }(g), this.hg.Um(g[0]))
                }
                this.Fp = [];
                b = !0;
                for (e = 0; b;)
                    if (e >= this.il) b = !1;
                    else
                        for (g = this.Gp[e], a(this.hg.getUserData(g.gj), this.hg.getUserData(g.hj)), ++e; e < this.il;) {
                            var h = this.Gp[e];
                            if (h.gj != g.gj || h.hj != g.hj) break;
                            ++e
                        }
            },
            Ww: function(a, k) {
                this.hg.Ww(a, k)
            },
            Qg: function(a, k) {
                this.hg.Qg(a, k)
            },
            qC: v(),
            xz: function(a) {
                this.Fp[this.Fp.length] = a
            },
            WJ: function(a) {
                y.remove(this.Fp, a)
            },
            r: c.h.Gn
        };
        c.h.Cl = function() {
            this.sb = new c.h.ti;
            this.id = c.h.Cl.eE++
        };
        c.h.Cl.q = !0;
        c.h.Cl.prototype = {
            wp: function() {
                return null == this.Ef
            },
            r: c.h.Cl
        };
        c.h.vq = v();
        c.h.vq.q = !0;
        c.h.vq.prototype = {
            r: c.h.vq
        };
        c.h.El = function() {
            this.ed = 0;
            this.kb = [];
            for (var a = 0, k = c.f.F.Nj; a < k;) {
                var b = a++;
                this.kb[b] = new c.h.xq
            }
            this.he = new c.f.g.A;
            this.lb = new c.f.g.A
        };
        c.h.El.q = !0;
        c.h.El.prototype = {
            reset: function() {
                for (var a = 0, k = c.f.F.Nj; a < k;) {
                    var b = a++;
                    this.kb[b].reset()
                }
                this.he.hb();
                this.lb.hb();
                this.tb = c.h.Cd.Fq;
                this.ed = 0
            },
            set: function(a) {
                this.ed = a.ed;
                for (var k = 0, b = c.f.F.Nj; k < b;) {
                    var e = k++;
                    this.kb[e].set(a.kb[e])
                }
                this.he.P(a.he);
                this.lb.P(a.lb);
                this.tb = a.tb
            },
            copy: function() {
                var a = new c.h.El;
                a.set(this);
                return a
            },
            r: c.h.El
        };
        c.h.xq = function() {
            this.lb = new c.f.g.A;
            this.Ng = new c.h.mk;
            this.reset()
        };
        c.h.xq.q = !0;
        c.h.xq.prototype = {
            reset: function() {
                this.lb.hb();
                this.ml = this.hl = 0;
                this.Ng.kj(0)
            },
            set: function(a) {
                this.lb.P(a.lb);
                this.hl = a.hl;
                this.ml = a.ml;
                this.Ng.set(a.Ng)
            },
            r: c.h.xq
        };
        c.h.Cd = {
            rg: !0,
            yj: ["CIRCLES", "FACE_A", "FACE_B"]
        };
        c.h.Cd.Fq = ["CIRCLES", 0];
        c.h.Cd.Fq.mb = c.h.Cd;
        c.h.Cd.og = ["FACE_A", 1];
        c.h.Cd.og.mb = c.h.Cd;
        c.h.Cd.rj = ["FACE_B", 2];
        c.h.Cd.rj.mb = c.h.Cd;
        c.h.Cd.Ei = [c.h.Cd.Fq, c.h.Cd.og, c.h.Cd.rj];
        c.h.Ct = function() {
            this.G = new c.f.g.Ib;
            this.Ag = new c.f.g.A;
            this.Uz = new c.f.g.A
        };
        c.h.Ct.q = !0;
        c.h.Ct.prototype = {
            r: c.h.Ct
        };
        c.h.Tn = function(a, k, b) {
            null == b && (b = 1);
            this.Ae = new c.f.g.A;
            this.Pg = new c.f.g.A;
            null != a && this.Ae.P(a);
            null != k && this.Pg.P(k);
            this.nl = b
        };
        c.h.Tn.q = !0;
        c.h.Tn.prototype = {
            r: c.h.Tn
        };
        c.h.yq = function() {
            this.Gc = new c.f.g.A
        };
        c.h.yq.q = !0;
        c.h.yq.prototype = {
            r: c.h.yq
        };
        c.h.zq = function() {
            this.lb = new c.f.g.A;
            this.fa = new c.f.g.A
        };
        c.h.zq.q = !0;
        c.h.zq.prototype = {
            ge: function(a, k, b, e, g) {
                this.$j = k;
                this.ak =
                    e;
                k = a.count;
                c.f.F.Ic(0 < k && 3 > k);
                var h = new c.f.g.A,
                    l = new c.f.g.A,
                    m, n;
                if (1 == k) this.tb = c.h.je.POINTS, h = this.$j.ue(a.Td[0]), l = this.ak.ue(a.Ud[0]), n = h, m = b.G, h = b.position.x + (m.l.x * n.x + m.m.x * n.y), b = b.position.y + (m.l.y * n.x + m.m.y * n.y), n = l, m = g.G, l = g.position.x + (m.l.x * n.x + m.m.x * n.y), g = g.position.y + (m.l.y * n.x + m.m.y * n.y), this.fa.x = l - h, this.fa.y = g - b, this.fa.normalize();
                else {
                    if (a.Ud[0] == a.Ud[1]) this.tb = c.h.je.og, k = this.$j.ue(a.Td[0]), e = this.$j.ue(a.Td[1]), l = this.ak.ue(a.Ud[0]), this.lb.x = 0.5 * (k.x + e.x), this.lb.y = 0.5 *
                        (k.y + e.y), this.fa = c.f.g.t.Qj(c.f.g.t.Ac(e, k), 1), this.fa.normalize(), n = this.fa, m = b.G, k = m.l.x * n.x + m.m.x * n.y, e = m.l.y * n.x + m.m.y * n.y, n = this.lb, m = b.G, h = b.position.x + (m.l.x * n.x + m.m.x * n.y), b = b.position.y + (m.l.y * n.x + m.m.y * n.y), n = l, m = g.G, l = g.position.x + (m.l.x * n.x + m.m.x * n.y), g = g.position.y + (m.l.y * n.x + m.m.y * n.y), a = (l - h) * k + (g - b) * e;
                    else if (a.Td[0] == a.Td[0]) this.tb = c.h.je.rj, m = this.ak.ue(a.Ud[0]), n = this.ak.ue(a.Ud[1]), h = this.$j.ue(a.Td[0]), this.lb.x = 0.5 * (m.x + n.x), this.lb.y = 0.5 * (m.y + n.y), this.fa = c.f.g.t.Qj(c.f.g.t.Ac(n,
                        m), 1), this.fa.normalize(), n = this.fa, m = g.G, k = m.l.x * n.x + m.m.x * n.y, e = m.l.y * n.x + m.m.y * n.y, n = this.lb, m = g.G, l = g.position.x + (m.l.x * n.x + m.m.x * n.y), g = g.position.y + (m.l.y * n.x + m.m.y * n.y), n = h, m = b.G, h = b.position.x + (m.l.x * n.x + m.m.x * n.y), b = b.position.y + (m.l.y * n.x + m.m.y * n.y), a = (h - l) * k + (b - g) * e;
                    else {
                        k = this.$j.ue(a.Td[0]);
                        e = this.$j.ue(a.Td[1]);
                        m = this.ak.ue(a.Ud[0]);
                        n = this.ak.ue(a.Ud[1]);
                        c.f.g.t.Wc(b, h);
                        h = c.f.g.t.ze(b.G, c.f.g.t.Ac(e, k));
                        c.f.g.t.Wc(g, l);
                        a = c.f.g.t.ze(g.G, c.f.g.t.Ac(n, m));
                        g = h.x * h.x + h.y * h.y;
                        b = a.x * a.x + a.y *
                            a.y;
                        var f = c.f.g.t.Ac(a, h),
                            l = h.x * f.x + h.y * f.y,
                            f = a.x * f.x + a.y * f.y,
                            h = h.x * a.x + h.y * a.y,
                            t = g * b - h * h;
                        a = 0;
                        0 != t && (a = c.f.g.t.Gb((h * f - l * b) / t, 0, 1));
                        0 > (h * a + f) / b && (a = c.f.g.t.Gb((h - l) / g, 0, 1));
                        h = new c.f.g.A;
                        h.x = k.x + a * (e.x - k.x);
                        h.y = k.y + a * (e.y - k.y);
                        l = new c.f.g.A;
                        l.x = m.x + a * (n.x - m.x);
                        l.y = m.y + a * (n.y - m.y);
                        0 == a || 1 == a ? (this.tb = c.h.je.rj, this.fa = c.f.g.t.Qj(c.f.g.t.Ac(n, m), 1), this.fa.normalize(), this.lb = l) : (this.tb = c.h.je.og, this.fa = c.f.g.t.Qj(c.f.g.t.Ac(e, k), 1), this.lb = h)
                    }
                    0 > a && this.fa.eB()
                }
            },
            evaluate: function(a, k) {
                var b, e, g;
                switch (this.tb[1]) {
                    case 0:
                        return b = c.f.g.t.dk(a.G, this.fa), e = c.f.g.t.dk(k.G, this.fa.Wk()), b = this.$j.tp(b), e = this.ak.tp(e), b = c.f.g.t.Wc(a, b), e = c.f.g.t.Wc(k, e), g = (e.x - b.x) * this.fa.x + (e.y - b.y) * this.fa.y;
                    case 1:
                        return g = c.f.g.t.ze(a.G, this.fa), b = c.f.g.t.Wc(a, this.lb), e = c.f.g.t.dk(k.G, g.Wk()), e = this.ak.tp(e), e = c.f.g.t.Wc(k, e), g = (e.x - b.x) * g.x + (e.y - b.y) * g.y;
                    case 2:
                        return g = c.f.g.t.ze(k.G, this.fa), e = c.f.g.t.Wc(k, this.lb), b = c.f.g.t.dk(a.G, g.Wk()), b = this.$j.tp(b), b = c.f.g.t.Wc(a, b), g = (b.x - e.x) * g.x + (b.y - e.y) *
                            g.y
                }
            },
            r: c.h.zq
        };
        c.h.je = {
            rg: !0,
            yj: ["POINTS", "FACE_A", "FACE_B"]
        };
        c.h.je.POINTS = ["POINTS", 0];
        c.h.je.POINTS.mb = c.h.je;
        c.h.je.og = ["FACE_A", 1];
        c.h.je.og.mb = c.h.je;
        c.h.je.rj = ["FACE_B", 2];
        c.h.je.rj.mb = c.h.je;
        c.h.je.Ei = [c.h.je.POINTS, c.h.je.og, c.h.je.rj];
        c.h.Bq = function() {
            this.Td = [];
            this.Ud = []
        };
        c.h.Bq.q = !0;
        c.h.Bq.prototype = {
            r: c.h.Bq
        };
        c.h.Cq = function() {
            this.gj = new c.h.Fn;
            this.hj = new c.h.Fn;
            this.fC = new c.f.g.zi;
            this.gC = new c.f.g.zi
        };
        c.h.Cq.q = !0;
        c.h.Cq.prototype = {
            r: c.h.Cq
        };
        c.f.g.Ch = function(a, k) {
            this.position =
                new c.f.g.A;
            this.G = new c.f.g.Ib;
            null != a && (this.position.P(a), this.G.tl(k))
        };
        c.f.g.Ch.q = !0;
        c.f.g.Ch.prototype = {
            ge: function(a, k) {
                this.position.P(a);
                this.G.tl(k)
            },
            set: function(a) {
                this.position.P(a.position);
                this.G.tl(a.G)
            },
            Fg: function() {
                return Math.atan2(this.G.l.y, this.G.l.x)
            },
            r: c.f.g.Ch
        };
        c.f.g.Ib = function() {
            this.l = new c.f.g.A(0, 1);
            this.m = new c.f.g.A(0, 1)
        };
        c.f.g.Ib.q = !0;
        c.f.g.Ib.Fs = function(a) {
            var k = new c.f.g.Ib;
            k.set(a);
            return k
        };
        c.f.g.Ib.kp = function(a, k) {
            var b = new c.f.g.Ib;
            b.tJ(a, k);
            return b
        };
        c.f.g.Ib.prototype = {
            set: function(a) {
                var k = Math.cos(a);
                a = Math.sin(a);
                this.l.x = k;
                this.m.x = -a;
                this.l.y = a;
                this.m.y = k
            },
            tJ: function(a, k) {
                this.l.P(a);
                this.m.P(k)
            },
            copy: function() {
                var a = new c.f.g.Ib;
                a.tl(this);
                return a
            },
            tl: function(a) {
                this.l.P(a.l);
                this.m.P(a.m)
            },
            hs: function(a) {
                this.l.x += a.l.x;
                this.l.y += a.l.y;
                this.m.x += a.m.x;
                this.m.y += a.m.y
            },
            hb: function() {
                this.l.x = 0;
                this.m.x = 0;
                this.l.y = 0;
                this.m.y = 0
            },
            Fg: function() {
                return Math.atan2(this.l.y, this.l.x)
            },
            Mv: function(a) {
                var k = this.l.x,
                    b = this.m.x,
                    c = this.l.y,
                    g = this.m.y,
                    h = k * g - b * c;
                0 != h && (h = 1 / h);
                a.l.x = h * g;
                a.m.x = -h * b;
                a.l.y = -h * c;
                a.m.y = h * k;
                return a
            },
            wl: function(a, k, b) {
                var c = this.l.x,
                    g = this.m.x,
                    h = this.l.y,
                    l = this.m.y,
                    m = c * l - g * h;
                0 != m && (m = 1 / m);
                a.x = m * (l * k - g * b);
                a.y = m * (c * b - h * k);
                return a
            },
            abs: function() {
                this.l.abs();
                this.m.abs()
            },
            r: c.f.g.Ib
        };
        c.h.Ka = v();
        c.h.Ka.q = !0;
        c.h.Ka.SJ = function(a) {
            ++c.h.Ka.BD;
            var k = a.gj,
                b = a.hj,
                e = a.fC,
                g = a.gC;
            c.f.F.Ic(e.Xd == g.Xd);
            c.f.F.Ic(1 - e.Xd > Number.MIN_VALUE);
            var h = k.Za + b.Za;
            a = a.TJ;
            var l = 0,
                m = 0,
                n = 0;
            c.h.Ka.dx.count = 0;
            for (c.h.Ka.qn.dK = !1;;) {
                e.pf(c.h.Ka.hk, l);
                g.pf(c.h.Ka.ik,
                    l);
                c.h.Ka.qn.gj = k;
                c.h.Ka.qn.hj = b;
                c.h.Ka.qn.UJ = c.h.Ka.hk;
                c.h.Ka.qn.VJ = c.h.Ka.ik;
                c.h.Of.Dg(c.h.Ka.CB, c.h.Ka.dx, c.h.Ka.qn);
                if (0 >= c.h.Ka.CB.Dg) {
                    l = 1;
                    break
                }
                c.h.Ka.lt.ge(c.h.Ka.dx, k, c.h.Ka.hk, b, c.h.Ka.ik);
                var f = c.h.Ka.lt.evaluate(c.h.Ka.hk, c.h.Ka.ik);
                if (0 >= f) {
                    l = 1;
                    break
                }
                0 == m && (n = f > h ? c.f.g.t.max(h - a, 0.75 * h) : c.f.g.t.max(f - a, 0.02 * h));
                if (f - n < 0.5 * a) {
                    if (0 == m) {
                        l = 1;
                        break
                    }
                    break
                }
                var t = l,
                    x = l,
                    p = 1;
                e.pf(c.h.Ka.hk, p);
                g.pf(c.h.Ka.ik, p);
                var E = c.h.Ka.lt.evaluate(c.h.Ka.hk, c.h.Ka.ik);
                if (E >= n) {
                    l = 1;
                    break
                }
                for (var r = 0;;) {
                    var P;
                    P = 0 != (r & 1) ? x + (n - f) * (p - x) / (E - f) : 0.5 * (x + p);
                    e.pf(c.h.Ka.hk, P);
                    g.pf(c.h.Ka.ik, P);
                    var s = c.h.Ka.lt.evaluate(c.h.Ka.hk, c.h.Ka.ik);
                    if (c.f.g.t.abs(s - n) < 0.025 * a) {
                        t = P;
                        break
                    }
                    s > n ? (x = P, f = s) : (p = P, E = s);
                    ++r;
                    ++c.h.Ka.DD;
                    if (50 == r) break
                }
                c.h.Ka.wz = u["int"](c.f.g.t.max(c.h.Ka.wz, r));
                if (t < (1 + 100 * Number.MIN_VALUE) * l) break;
                l = t;
                m++;
                ++c.h.Ka.CD;
                if (1E3 == m) break
            }
            c.h.Ka.vz = u["int"](c.f.g.t.max(c.h.Ka.vz, m));
            return l
        };
        c.h.Dq = function() {
            this.bb = new c.f.g.A;
            this.kb = [];
            for (var a = 0, k = c.f.F.Nj; a < k;) {
                var b = a++;
                this.kb[b] = new c.f.g.A
            }
        };
        c.h.Dq.q = !0;
        c.h.Dq.prototype = {
            ge: function(a, k, b, c, g) {
                if (0 != a.ed) {
                    var h, l, m, n, f, t, x;
                    switch (a.tb[1]) {
                        case 0:
                            l = k.G;
                            h = a.lb;
                            m = k.position.x + l.l.x * h.x + l.m.x * h.y;
                            n = k.position.y + l.l.y * h.x + l.m.y * h.y;
                            l = c.G;
                            h = a.kb[0].lb;
                            a = c.position.x + l.l.x * h.x + l.m.x * h.y;
                            h = c.position.y + l.l.y * h.x + l.m.y * h.y;
                            l = a - m;
                            c = h - n;
                            f = l * l + c * c;
                            f > Number.MIN_VALUE * Number.MIN_VALUE ? (f = Math.sqrt(f), this.bb.x = l / f, this.bb.y = c / f) : (this.bb.x = 1, this.bb.y = 0);
                            l = n + b * this.bb.y;
                            h -= g * this.bb.y;
                            this.kb[0].x = 0.5 * (m + b * this.bb.x + (a - g * this.bb.x));
                            this.kb[0].y = 0.5 *
                                (l + h);
                            break;
                        case 1:
                            l = k.G;
                            h = a.he;
                            m = l.l.x * h.x + l.m.x * h.y;
                            n = l.l.y * h.x + l.m.y * h.y;
                            l = k.G;
                            h = a.lb;
                            f = k.position.x + l.l.x * h.x + l.m.x * h.y;
                            t = k.position.y + l.l.y * h.x + l.m.y * h.y;
                            this.bb.x = m;
                            this.bb.y = n;
                            k = 0;
                            for (var p = a.ed; k < p;) {
                                var E = k++;
                                l = c.G;
                                h = a.kb[E].lb;
                                x = c.position.x + l.l.x * h.x + l.m.x * h.y;
                                h = c.position.y + l.l.y * h.x + l.m.y * h.y;
                                this.kb[E].x = x + 0.5 * (b - (x - f) * m - (h - t) * n - g) * m;
                                this.kb[E].y = h + 0.5 * (b - (x - f) * m - (h - t) * n - g) * n
                            }
                            break;
                        case 2:
                            for (l = c.G, h = a.he, m = l.l.x * h.x + l.m.x * h.y, n = l.l.y * h.x + l.m.y * h.y, l = c.G, h = a.lb, f = c.position.x + l.l.x *
                                h.x + l.m.x * h.y, t = c.position.y + l.l.y * h.x + l.m.y * h.y, this.bb.x = -m, this.bb.y = -n, c = 0, p = a.ed; c < p;) E = c++, l = k.G, h = a.kb[E].lb, x = k.position.x + l.l.x * h.x + l.m.x * h.y, h = k.position.y + l.l.y * h.x + l.m.y * h.y, this.kb[E].x = x + 0.5 * (g - (x - f) * m - (h - t) * n - b) * m, this.kb[E].y = h + 0.5 * (g - (x - f) * m - (h - t) * n - b) * n
                    }
                }
            },
            r: c.h.Dq
        };
        c.h.S = {};
        c.h.S.Yd = function() {
            this.tb = c.h.S.rb.Ot;
            this.Za = c.f.F.Kb
        };
        c.h.S.Yd.q = !0;
        c.h.S.Yd.lj = I(!0);
        c.h.S.Yd.prototype = {
            copy: I(null),
            set: function(a) {
                this.Za = a.Za
            },
            Db: C("tb"),
            hq: I(!1),
            Qg: I(!1),
            Lm: v(),
            dp: v(),
            rv: I(0),
            r: c.h.S.Yd
        };
        c.h.S.Nf = function(a) {
            null == a && (a = 0);
            c.h.S.Yd.call(this);
            this.Qb = new c.f.g.A;
            this.tb = c.h.S.rb.qj;
            this.Za = a
        };
        c.h.S.Nf.q = !0;
        c.h.S.Nf.N = c.h.S.Yd;
        c.h.S.Nf.prototype = s(c.h.S.Yd.prototype, {
            copy: function() {
                var a = new c.h.S.Nf;
                a.set(this);
                return a
            },
            set: function(a) {
                c.h.S.Yd.prototype.set.call(this, a);
                A.Ja.gr(a, c.h.S.Nf) && (a = A.Ja.Fb(a, c.h.S.Nf), this.Qb.P(a.Qb))
            },
            hq: function(a, k) {
                var b = a.G,
                    c = a.position.x + (b.l.x * this.Qb.x + b.m.x * this.Qb.y),
                    b = a.position.y + (b.l.y * this.Qb.x + b.m.y * this.Qb.y),
                    c = k.x - c,
                    b = k.y - b;
                return c *
                    c + b * b <= this.Za * this.Za
            },
            Qg: function(a, k, b) {
                var c = b.G,
                    g = k.Ae.x - (b.position.x + (c.l.x * this.Qb.x + c.m.x * this.Qb.y));
                b = k.Ae.y - (b.position.y + (c.l.y * this.Qb.x + c.m.y * this.Qb.y));
                var c = k.Pg.x - k.Ae.x,
                    h = k.Pg.y - k.Ae.y,
                    l = g * c + b * h,
                    m = c * c + h * h,
                    n = l * l - m * (g * g + b * b - this.Za * this.Za);
                if (0 > n || m < Number.MIN_VALUE) return !1;
                l = -(l + Math.sqrt(n));
                return 0 <= l && l <= k.nl * m ? (l /= m, a.Ds = l, a.Gc.x = g + l * c, a.Gc.y = b + l * h, a.Gc.normalize(), !0) : !1
            },
            Lm: function(a, k) {
                var b = k.G,
                    c = k.position.x + (b.l.x * this.Qb.x + b.m.x * this.Qb.y),
                    b = k.position.y + (b.l.y * this.Qb.x +
                        b.m.y * this.Qb.y);
                a.lowerBound.set(c - this.Za, b - this.Za);
                a.upperBound.set(c + this.Za, b + this.Za)
            },
            dp: function(a, k) {
                a.ni = k * c.f.F.bp * this.Za * this.Za;
                a.Ag.P(this.Qb);
                a.Tl = a.ni * (0.5 * this.Za * this.Za + (this.Qb.x * this.Qb.x + this.Qb.y * this.Qb.y))
            },
            rv: function(a, k, b, e) {
                b = c.f.g.t.Wc(b, this.Qb);
                var g = -(c.f.g.t.se(a, b) - k);
                if (g < -this.Za + Number.MIN_VALUE) return 0;
                if (g > this.Za) return e.P(b), Math.PI * this.Za * this.Za;
                k = this.Za * this.Za;
                var h = g * g,
                    g = k * (Math.asin(g / this.Za) + Math.PI / 2) + g * Math.sqrt(k - h);
                k = -0.6666666666666666 *
                    Math.pow(k - h, 1.5) / g;
                e.x = b.x + a.x * k;
                e.y = b.y + a.y * k;
                return g
            },
            ld: C("Qb"),
            tR: function(a) {
                this.Qb.P(a)
            },
            FP: C("Za"),
            OR: z("Za"),
            r: c.h.S.Nf
        });
        c.h.S.nk = function(a, k) {
            c.h.S.Yd.call(this);
            this.Xp = new c.f.g.A;
            this.Ea = new c.f.g.A;
            this.Wa = new c.f.g.A;
            this.rh = new c.f.g.A;
            this.bl = new c.f.g.A;
            this.bb = new c.f.g.A;
            this.bj = new c.f.g.A;
            this.hw = new c.f.g.A;
            this.iw = new c.f.g.A;
            this.tb = c.h.S.rb.Ml;
            this.ZA = this.$A = null;
            this.Ea = a;
            this.Wa = k;
            this.bj.set(this.Wa.x - this.Ea.x, this.Wa.y - this.Ea.y);
            this.en = this.bj.normalize();
            this.bb.set(this.bj.y, -this.bj.x);
            this.rh.set(-c.f.F.ns * (this.bb.x - this.bj.x) + this.Ea.x, -c.f.F.ns * (this.bb.y - this.bj.y) + this.Ea.y);
            this.bl.set(-c.f.F.ns * (this.bb.x + this.bj.x) + this.Wa.x, -c.f.F.ns * (this.bb.y + this.bj.y) + this.Wa.y);
            this.hw = this.bb;
            this.iw.set(-this.bb.x, -this.bb.y)
        };
        c.h.S.nk.q = !0;
        c.h.S.nk.N = c.h.S.Yd;
        c.h.S.nk.prototype = s(c.h.S.Yd.prototype, {
            hq: I(!1),
            Qg: function(a, k, b) {
                var c, g = k.Pg.x - k.Ae.x,
                    h = k.Pg.y - k.Ae.y;
                c = b.G;
                var l = b.position.x + (c.l.x * this.Ea.x + c.m.x * this.Ea.y),
                    m = b.position.y + (c.l.y * this.Ea.x + c.m.y * this.Ea.y),
                    n = b.position.y + (c.l.y * this.Wa.x + c.m.y * this.Wa.y) - m;
                b = -(b.position.x + (c.l.x * this.Wa.x + c.m.x * this.Wa.y) - l);
                c = 100 * Number.MIN_VALUE;
                var f = -(g * n + h * b);
                if (f > c) {
                    var l = k.Ae.x - l,
                        t = k.Ae.y - m,
                        m = l * n + t * b;
                    if (0 <= m && m <= k.nl * f && (k = -g * t + h * l, -c * f <= k && k <= f * (1 + c))) return a.Ds = m / f, k = Math.sqrt(n * n + b * b), a.Gc.x = n / k, a.Gc.y = b / k, !0
                }
                return !1
            },
            Lm: function(a, k) {
                var b = k.G,
                    c = k.position.x + (b.l.x * this.Ea.x + b.m.x * this.Ea.y),
                    g = k.position.y + (b.l.y * this.Ea.x + b.m.y * this.Ea.y),
                    h = k.position.x + (b.l.x * this.Wa.x + b.m.x * this.Wa.y),
                    b = k.position.y +
                    (b.l.y * this.Wa.x + b.m.y * this.Wa.y);
                c < h ? (a.lowerBound.x = c, a.upperBound.x = h) : (a.lowerBound.x = h, a.upperBound.x = c);
                g < b ? (a.lowerBound.y = g, a.upperBound.y = b) : (a.lowerBound.y = b, a.upperBound.y = g)
            },
            dp: function(a) {
                a.ni = 0;
                a.Ag.P(this.Ea);
                a.Tl = 0
            },
            rv: function(a, k, b, e) {
                var g = new c.f.g.A(a.x * k, a.y * k),
                    h = c.f.g.t.Wc(b, this.Ea);
                b = c.f.g.t.Wc(b, this.Wa);
                var l = c.f.g.t.se(a, h) - k;
                a = c.f.g.t.se(a, b) - k;
                if (0 < l) {
                    if (0 < a) return 0;
                    h.x = -a / (l - a) * h.x + l / (l - a) * b.x;
                    h.y = -a / (l - a) * h.y + l / (l - a) * b.y
                } else 0 < a && (b.x = -a / (l - a) * h.x + l / (l - a) * b.x, b.y = -a / (l - a) * h.y + l / (l - a) * b.y);
                e.x = (g.x + h.x + b.x) / 3;
                e.y = (g.y + h.y + b.y) / 3;
                return 0.5 * ((h.x - g.x) * (b.y - g.y) - (h.y - g.y) * (b.x - g.x))
            },
            xd: C("en"),
            eQ: C("Ea"),
            fQ: C("Wa"),
            AO: C("rh"),
            BO: C("bl"),
            wP: C("bb"),
            IO: C("bj"),
            CO: C("hw"),
            DO: C("iw"),
            yN: C("eG"),
            zN: C("fG"),
            OO: function(a) {
                var k = a.G;
                return new c.f.g.A(a.position.x + (k.l.x * this.rh.x + k.m.x * this.rh.y), a.position.y + (k.l.y * this.rh.x + k.m.y * this.rh.y))
            },
            vP: C("ZA"),
            EP: C("$A"),
            gS: function(a, k, b) {
                var c = a.G,
                    g = a.position.x + (c.l.x * this.rh.x + c.m.x * this.rh.y),
                    h = a.position.y + (c.l.y *
                        this.rh.x + c.m.y * this.rh.y),
                    l = a.position.x + (c.l.x * this.bl.x + c.m.x * this.bl.y);
                a = a.position.y + (c.l.y * this.bl.x + c.m.y * this.bl.y);
                g * k + h * b > l * k + a * b ? (this.Xp.x = g, this.Xp.y = h) : (this.Xp.x = l, this.Xp.y = a);
                return this.Xp
            },
            NR: function(a, k, b, c) {
                this.$A = a;
                this.rh = k;
                this.hw = b;
                this.eG = c
            },
            BR: function(a, k, b, c) {
                this.ZA = a;
                this.bl = k;
                this.iw = b;
                this.fG = c
            },
            r: c.h.S.nk
        });
        c.h.S.On = function() {
            this.ni = 0;
            this.Ag = new c.f.g.A(0, 0);
            this.Tl = 0
        };
        c.h.S.On.q = !0;
        c.h.S.On.prototype = {
            r: c.h.S.On
        };
        c.h.S.Bc = function() {
            c.h.S.Yd.call(this);
            this.tb =
                c.h.S.rb.Ai;
            this.$i = new c.f.g.A;
            this.ea = [];
            this.nc = []
        };
        c.h.S.Bc.q = !0;
        c.h.S.Bc.dN = function(a, k) {
            var b = new c.h.S.Bc;
            b.LI(a, k);
            return b
        };
        c.h.S.Bc.hN = function(a, k) {
            var b = new c.h.S.Bc;
            b.EB(a, k);
            return b
        };
        c.h.S.Bc.eN = function(a, k) {
            var b = new c.h.S.Bc;
            b.MI(a, k);
            return b
        };
        c.h.S.Bc.gN = function(a, k, b, e) {
            null == e && (e = 0);
            var g = new c.h.S.Bc;
            g.OI(a, k, b, e);
            return g
        };
        c.h.S.Bc.fN = function(a, k) {
            var b = new c.h.S.Bc;
            b.NI(a, k);
            return b
        };
        c.h.S.Bc.OD = function(a, k) {
            for (var b = new c.f.g.A, e = 0, g = 0; g < k;) {
                var h = g++,
                    l = a[h],
                    h = h + 1 <
                    k ? a[h + 1 | 0] : a[0],
                    m = 0.5 * ((l.x - 0) * (h.y - 0) - (l.y - 0) * (h.x - 0)),
                    e = e + m;
                b.x += 0.3333333333333333 * m * (0 + l.x + h.x);
                b.y += 0.3333333333333333 * m * (0 + l.y + h.y)
            }
            b.x *= 1 / e;
            b.y *= 1 / e;
            return b
        };
        c.h.S.Bc.xN = function(a, k, b) {
            for (var c = [], g = 0; g < b;) {
                var h = g++;
                c[h] = k[h]
            }
            c[b] = c[0];
            k = Number.MAX_VALUE;
            g = 1;
            for (h = b + 1; g < h;) {
                for (var l = g++, m = c[l - 1 | 0], n = c[l].x - m.x, f = c[l].y - m.y, l = Math.sqrt(n * n + f * f), n = n / l, f = f / l, t = -f, x = n, p = l = Number.MAX_VALUE, E = -Number.MAX_VALUE, r = -Number.MAX_VALUE, s = 0; s < b;) {
                    var u = s++,
                        S = c[u].x - m.x,
                        w = c[u].y - m.y,
                        u = n * S + f * w,
                        S = t * S +
                        x * w;
                    u < l && (l = u);
                    S < p && (p = S);
                    u > E && (E = u);
                    S > r && (r = S)
                }
                s = (E - l) * (r - p);
                s < 0.95 * k && (k = s, a.G.l.x = n, a.G.l.y = f, a.G.m.x = t, a.G.m.y = x, n = 0.5 * (l + E), f = 0.5 * (p + r), t = a.G, a.Ag.x = m.x + (t.l.x * n + t.m.x * f), a.Ag.y = m.y + (t.l.y * n + t.m.y * f), a.Uz.x = 0.5 * (E - l), a.Uz.y = 0.5 * (r - p))
            }
        };
        c.h.S.Bc.N = c.h.S.Yd;
        c.h.S.Bc.prototype = s(c.h.S.Yd.prototype, {
            copy: function() {
                var a = new c.h.S.Bc;
                a.set(this);
                return a
            },
            set: function(a) {
                c.h.S.Yd.prototype.set.call(this, a);
                if (A.Ja.gr(a, c.h.S.Bc)) {
                    a = A.Ja.Fb(a, c.h.S.Bc);
                    this.$i.P(a.$i);
                    this.Sb = a.Sb;
                    this.Wp(this.Sb);
                    for (var k = 0, b = this.Sb; k < b;) {
                        var e = k++;
                        this.ea[e].P(a.ea[e]);
                        this.nc[e].P(a.nc[e])
                    }
                }
            },
            LI: function(a, k) {
                null == k && (k = 0);
                for (var b = [], c = 0; c < a.length;) {
                    var g = a[c];
                    ++c;
                    b.push(g)
                }
                this.EB(b, k)
            },
            EB: function(a, k) {
                null == k && (k = 0);
                0 == k && (k = a.length);
                c.f.F.Ic(2 <= k);
                this.Sb = k | 0;
                this.Wp(k | 0);
                for (var b = 0, e = this.Sb; b < e;) {
                    var g = b++;
                    this.ea[g].P(a[g])
                }
                b = 0;
                for (e = this.Sb; b < e;) {
                    var g = b++,
                        h = c.f.g.t.Ac(this.ea[g + 1 < this.Sb ? g + 1 : 0], this.ea[g]);
                    c.f.F.Ic(h.Ws() > Number.MIN_VALUE);
                    this.nc[g].P(c.f.g.t.Qj(h, 1));
                    this.nc[g].normalize()
                }
                this.$i =
                    c.h.S.Bc.OD(this.ea, this.Sb)
            },
            MI: function(a, k) {
                this.Sb = 4;
                this.Wp(4);
                this.ea[0].set(-a, -k);
                this.ea[1].set(a, -k);
                this.ea[2].set(a, k);
                this.ea[3].set(-a, k);
                this.nc[0].set(0, -1);
                this.nc[1].set(1, 0);
                this.nc[2].set(0, 1);
                this.nc[3].set(-1, 0);
                this.$i.hb()
            },
            OI: function(a, k, b, e) {
                null == e && (e = 0);
                this.Sb = 4;
                this.Wp(4);
                this.ea[0].set(-a, -k);
                this.ea[1].set(a, -k);
                this.ea[2].set(a, k);
                this.ea[3].set(-a, k);
                this.nc[0].set(0, -1);
                this.nc[1].set(1, 0);
                this.nc[2].set(0, 1);
                this.nc[3].set(-1, 0);
                this.$i = b;
                a = new c.f.g.Ch;
                a.position =
                    b;
                a.G.set(e);
                b = 0;
                for (e = this.Sb; b < e;) k = b++, this.ea[k] = c.f.g.t.Wc(a, this.ea[k]), this.nc[k] = c.f.g.t.ze(a.G, this.nc[k])
            },
            NI: function(a, k) {
                this.Sb = 2;
                this.Wp(2);
                this.ea[0].P(a);
                this.ea[1].P(k);
                this.$i.x = 0.5 * (a.x + k.x);
                this.$i.y = 0.5 * (a.y + k.y);
                this.nc[0] = c.f.g.t.Qj(c.f.g.t.Ac(k, a), 1);
                this.nc[0].normalize();
                this.nc[1].x = -this.nc[0].x;
                this.nc[1].y = -this.nc[0].y
            },
            hq: function(a, k) {
                var b;
                b = a.G;
                for (var c = k.x - a.position.x, g = k.y - a.position.y, h = c * b.l.x + g * b.l.y, l = c * b.m.x + g * b.m.y, m = 0, n = this.Sb; m < n;) {
                    var f = m++;
                    b = this.ea[f];
                    c = h - b.x;
                    g = l - b.y;
                    b = this.nc[f];
                    if (0 < b.x * c + b.y * g) return !1
                }
                return !0
            },
            Qg: function(a, k, b) {
                var c = 0,
                    g = k.nl,
                    h, l, m, n;
                h = k.Ae.x - b.position.x;
                l = k.Ae.y - b.position.y;
                m = b.G;
                var f = h * m.l.x + l * m.l.y,
                    t = h * m.m.x + l * m.m.y;
                h = k.Pg.x - b.position.x;
                l = k.Pg.y - b.position.y;
                m = b.G;
                k = h * m.l.x + l * m.l.y - f;
                m = h * m.m.x + l * m.m.y - t;
                for (var x = -1, p = 0, r = this.Sb; p < r;) {
                    var s = p++;
                    n = this.ea[s];
                    h = n.x - f;
                    l = n.y - t;
                    n = this.nc[s];
                    h = n.x * h + n.y * l;
                    l = n.x * k + n.y * m;
                    if (0 == l) {
                        if (0 > h) return !1
                    } else 0 > l && h < c * l ? (c = h / l, x = s) : 0 < l && h < g * l && (g = h / l);
                    if (g < c - Number.MIN_VALUE) return !1
                }
                return 0 <=
                    x ? (a.Ds = c, m = b.G, n = this.nc[x], a.Gc.x = m.l.x * n.x + m.m.x * n.y, a.Gc.y = m.l.y * n.x + m.m.y * n.y, !0) : !1
            },
            Lm: function(a, k) {
                for (var b = k.G, c = this.ea[0], g = k.position.x + (b.l.x * c.x + b.m.x * c.y), h = k.position.y + (b.l.y * c.x + b.m.y * c.y), l = g, m = h, n = 1, f = this.Sb; n < f;) {
                    var t = n++,
                        c = this.ea[t],
                        t = k.position.x + (b.l.x * c.x + b.m.x * c.y),
                        c = k.position.y + (b.l.y * c.x + b.m.y * c.y);
                    g < t || (g = t);
                    h < c || (h = c);
                    l > t || (l = t);
                    m > c || (m = c)
                }
                a.lowerBound.x = g - this.Za;
                a.lowerBound.y = h - this.Za;
                a.upperBound.x = l + this.Za;
                a.upperBound.y = m + this.Za
            },
            dp: function(a, k) {
                if (2 ==
                    this.Sb) a.Ag.x = 0.5 * (this.ea[0].x + this.ea[1].x), a.Ag.y = 0.5 * (this.ea[0].y + this.ea[1].y), a.ni = 0, a.Tl = 0;
                else {
                    for (var b = 0, c = 0, g = 0, h = 0, l = 0, m = this.Sb; l < m;) {
                        var n = l++,
                            f = this.ea[n],
                            t;
                        t = n + 1 < this.Sb ? this.ea[n + 1 | 0] : this.ea[0];
                        var x = f.x - 0,
                            p = f.y - 0,
                            r = t.x - 0,
                            s = t.y - 0,
                            n = x * s - p * r,
                            u = 0.5 * n,
                            g = g + u,
                            b = b + 0.3333333333333333 * u * (0 + f.x + t.x),
                            c = c + 0.3333333333333333 * u * (0 + f.y + t.y),
                            f = x,
                            h = h + n * (0.3333333333333333 * (0.25 * (f * f + r * f + r * r) + (0 * f + 0 * r)) + 0 + (0.3333333333333333 * (0.25 * (p * p + s * p + s * s) + (0 * p + 0 * s)) + 0))
                    }
                    a.ni = k * g;
                    a.Ag.set(b * (1 / g), c * (1 / g));
                    a.Tl = k * h
                }
            },
            rv: function(a, k, b, e) {
                var g = c.f.g.t.dk(b.G, a),
                    h = k - c.f.g.t.se(a, b.position),
                    l = [],
                    m = 0;
                a = k = -1;
                for (var n = !1, f = 0, t = this.Sb; f < t;) {
                    var x = f++;
                    l[x] = c.f.g.t.se(g, this.ea[x]) - h;
                    var p = l[x] < -Number.MIN_VALUE;
                    0 < x && (p ? n || (k = x - 1, m++) : n && (a = x - 1, m++));
                    n = p
                }
                switch (m) {
                    case 0:
                        return n ? (a = new c.h.S.On, this.dp(a, 1), e.P(c.f.g.t.Wc(b, a.Ag)), a.ni) : 0;
                    case 1:
                        -1 == k ? k = this.Sb - 1 : a = this.Sb - 1
                }
                h = (k + 1) % this.Sb;
                g = (a + 1) % this.Sb;
                m = (0 - l[k]) / (l[h] - l[k]);
                l = (0 - l[a]) / (l[g] - l[a]);
                k = new c.f.g.A(this.ea[k].x * (1 - m) + this.ea[h].x * m, this.ea[k].y *
                    (1 - m) + this.ea[h].y * m);
                a = new c.f.g.A(this.ea[a].x * (1 - l) + this.ea[g].x * l, this.ea[a].y * (1 - l) + this.ea[g].y * l);
                l = 0;
                m = new c.f.g.A;
                for (n = this.ea[h]; h != g;) h = (h + 1) % this.Sb, f = h == g ? a : this.ea[h], t = 0.5 * ((n.x - k.x) * (f.y - k.y) - (n.y - k.y) * (f.x - k.x)), l += t, m.x += t * (k.x + n.x + f.x) / 3, m.y += t * (k.y + n.y + f.y) / 3, n = f;
                m.multiply(1 / l);
                e.P(c.f.g.t.Wc(b, m));
                return l
            },
            BA: C("Sb"),
            hQ: C("ea"),
            xP: C("nc"),
            Tv: function(a) {
                for (var k = 0, b = this.ea[0].x * a.x + this.ea[0].y * a.y, c = 1, g = this.Sb; c < g;) {
                    var h = c++,
                        l = this.ea[h].x * a.x + this.ea[h].y * a.y;
                    l > b && (k =
                        h, b = l)
                }
                return k
            },
            tp: function(a) {
                for (var k = 0, b = this.ea[0].x * a.x + this.ea[0].y * a.y, c = 1, g = this.Sb; c < g;) {
                    var h = c++,
                        l = this.ea[h].x * a.x + this.ea[h].y * a.y;
                    l > b && (k = h, b = l)
                }
                return this.ea[k]
            },
            qC: I(!1),
            Wp: function(a) {
                for (var k = this.ea.length; k < a;) {
                    var b = k++;
                    this.ea[b] = new c.f.g.A;
                    this.nc[b] = new c.f.g.A
                }
            },
            r: c.h.S.Bc
        });
        c.h.S.rb = {
            rg: !0,
            yj: ["UNKNOWN_SHAPE", "CIRCLE_SHAPE", "POLYGON_SHAPE", "EDGE_SHAPE"]
        };
        c.h.S.rb.Ot = ["UNKNOWN_SHAPE", 0];
        c.h.S.rb.Ot.mb = c.h.S.rb;
        c.h.S.rb.qj = ["CIRCLE_SHAPE", 1];
        c.h.S.rb.qj.mb = c.h.S.rb;
        c.h.S.rb.Ai = ["POLYGON_SHAPE", 2];
        c.h.S.rb.Ai.mb = c.h.S.rb;
        c.h.S.rb.Ml = ["EDGE_SHAPE", 3];
        c.h.S.rb.Ml.mb = c.h.S.rb;
        c.h.S.rb.Ei = [c.h.S.rb.Ot, c.h.S.rb.qj, c.h.S.rb.Ai, c.h.S.rb.Ml];
        c.f.An = function(a, k, b) {
            this.Dm = u["int"](255 * c.f.g.t.Gb(a, 0, 1));
            this.lm = u["int"](255 * c.f.g.t.Gb(k, 0, 1));
            this.hm = u["int"](255 * c.f.g.t.Gb(b, 0, 1))
        };
        c.f.An.q = !0;
        c.f.An.prototype = {
            set: function(a, k, b) {
                this.Dm = u["int"](255 * c.f.g.t.Gb(a, 0, 1));
                this.lm = u["int"](255 * c.f.g.t.Gb(k, 0, 1));
                this.hm = u["int"](255 * c.f.g.t.Gb(b, 0, 1))
            },
            jC: function() {
                return "#" + this.qv(this.Dm) +
                    this.qv(this.lm) + this.qv(this.hm)
            },
            qv: function(a) {
                a = a.toString(16);
                return "1" == a.length ? "0" + a : a
            },
            xJ: function(a) {
                return this.Dm = u["int"](255 * c.f.g.t.Gb(a, 0, 1))
            },
            wJ: function(a) {
                return this.lm = u["int"](255 * c.f.g.t.Gb(a, 0, 1))
            },
            vJ: function(a) {
                return this.hm = u["int"](255 * c.f.g.t.Gb(a, 0, 1))
            },
            FF: function() {
                return this.Dm << 16 | this.lm << 8 | this.hm
            },
            r: c.f.An,
            gm: {
                FF: "get_color",
                vJ: "set_b",
                wJ: "set_g",
                xJ: "set_r"
            }
        };
        c.f.F = v();
        c.f.F.q = !0;
        c.f.F.sD = function(a, k) {
            return Math.sqrt(a * k)
        };
        c.f.F.tD = function(a, k) {
            return a > k ?
                a : k
        };
        c.f.F.Ic = function(a) {
            if (!a) throw "Assertion Failed";
        };
        c.f.g.nj = function(a, k, b) {
            this.l = new c.f.g.Xe;
            this.m = new c.f.g.Xe;
            this.eb = new c.f.g.Xe;
            null == a && null == k && null == b ? (this.l.hb(), this.m.hb(), this.eb.hb()) : (this.l.P(a), this.m.P(k), this.eb.P(b))
        };
        c.f.g.nj.q = !0;
        c.f.g.nj.prototype = {
            copy: function() {
                return new c.f.g.nj(this.l, this.m, this.eb)
            },
            tl: function(a) {
                this.l.P(a.l);
                this.m.P(a.m);
                this.eb.P(a.eb)
            },
            hs: function(a) {
                this.l.x += a.l.x;
                this.l.y += a.l.y;
                this.l.z += a.l.z;
                this.m.x += a.m.x;
                this.m.y += a.m.y;
                this.m.z +=
                    a.m.z;
                this.eb.x += a.eb.x;
                this.eb.y += a.eb.y;
                this.eb.z += a.eb.z
            },
            hb: function() {
                this.l.x = 0;
                this.m.x = 0;
                this.eb.x = 0;
                this.l.y = 0;
                this.m.y = 0;
                this.eb.y = 0;
                this.l.z = 0;
                this.m.z = 0;
                this.eb.z = 0
            },
            xn: function(a, k, b) {
                var c = this.l.x,
                    g = this.m.x,
                    h = this.l.y,
                    l = this.m.y,
                    m = c * l - g * h;
                0 != m && (m = 1 / m);
                a.x = m * (l * k - g * b);
                a.y = m * (c * b - h * k);
                return a
            },
            gq: function(a, k, b, c) {
                var g = this.l.x,
                    h = this.l.y,
                    l = this.l.z,
                    m = this.m.x,
                    n = this.m.y,
                    f = this.m.z,
                    t = this.eb.x,
                    x = this.eb.y,
                    p = this.eb.z,
                    r = g * (n * p - f * x) + h * (f * t - m * p) + l * (m * x - n * t);
                0 != r && (r = 1 / r);
                a.x = r * (k * (n *
                    p - f * x) + b * (f * t - m * p) + c * (m * x - n * t));
                a.y = r * (g * (b * p - c * x) + h * (c * t - k * p) + l * (k * x - b * t));
                a.z = r * (g * (n * c - f * b) + h * (f * k - m * c) + l * (m * b - n * k));
                return a
            },
            r: c.f.g.nj
        };
        c.f.g.t = v();
        c.f.g.t.q = !0;
        c.f.g.t.gm = {
            DF: "get_MAX_VALUE",
            EF: "get_MIN_VALUE"
        };
        c.f.g.t.an = function(a) {
            return Math.bw(a) || a == Math.NEGATIVE_INFINITY || a == Math.POSITIVE_INFINITY ? !1 : !0
        };
        c.f.g.t.se = function(a, k) {
            return a.x * k.x + a.y * k.y
        };
        c.f.g.t.Nm = function(a, k) {
            return a.x * k.y - a.y * k.x
        };
        c.f.g.t.Qj = function(a, k) {
            return new c.f.g.A(k * a.y, -k * a.x)
        };
        c.f.g.t.ep = function(a, k) {
            return new c.f.g.A(-a *
                k.y, a * k.x)
        };
        c.f.g.t.ze = function(a, k) {
            return new c.f.g.A(a.l.x * k.x + a.m.x * k.y, a.l.y * k.x + a.m.y * k.y)
        };
        c.f.g.t.dk = function(a, k) {
            return new c.f.g.A(c.f.g.t.se(k, a.l), c.f.g.t.se(k, a.m))
        };
        c.f.g.t.Wc = function(a, k) {
            var b = c.f.g.t.ze(a.G, k);
            b.x += a.position.x;
            b.y += a.position.y;
            return b
        };
        c.f.g.t.wG = function(a, k) {
            var b = c.f.g.t.Ac(k, a.position),
                e = b.x * a.G.l.x + b.y * a.G.l.y;
            b.y = b.x * a.G.m.x + b.y * a.G.m.y;
            b.x = e;
            return b
        };
        c.f.g.t.is = function(a, k) {
            return new c.f.g.A(a.x + k.x, a.y + k.y)
        };
        c.f.g.t.Ac = function(a, k) {
            return new c.f.g.A(a.x -
                k.x, a.y - k.y)
        };
        c.f.g.t.Dg = function(a, k) {
            var b = a.x - k.x,
                c = a.y - k.y;
            return Math.sqrt(b * b + c * c)
        };
        c.f.g.t.ON = function(a, k) {
            var b = a.x - k.x,
                c = a.y - k.y;
            return b * b + c * c
        };
        c.f.g.t.FQ = function(a, k) {
            return new c.f.g.A(a * k.x, a * k.y)
        };
        c.f.g.t.aN = function(a, k) {
            return c.f.g.Ib.kp(c.f.g.t.is(a.l, k.l), c.f.g.t.is(a.m, k.m))
        };
        c.f.g.t.GQ = function(a, k) {
            return c.f.g.Ib.kp(c.f.g.t.ze(a, k.l), c.f.g.t.ze(a, k.m))
        };
        c.f.g.t.HQ = function(a, k) {
            return c.f.g.Ib.kp(new c.f.g.A(c.f.g.t.se(a.l, k.l), c.f.g.t.se(a.m, k.l)), new c.f.g.A(c.f.g.t.se(a.l,
                k.m), c.f.g.t.se(a.m, k.m)))
        };
        c.f.g.t.abs = function(a) {
            return 0 < a ? a : -a
        };
        c.f.g.t.fv = function(a) {
            return new c.f.g.A(c.f.g.t.abs(a.x), c.f.g.t.abs(a.y))
        };
        c.f.g.t.ZM = function(a) {
            return c.f.g.Ib.kp(c.f.g.t.fv(a.l), c.f.g.t.fv(a.m))
        };
        c.f.g.t.min = function(a, k) {
            return a < k ? a : k
        };
        c.f.g.t.dB = function(a, k) {
            return new c.f.g.A(c.f.g.t.min(a.x, k.x), c.f.g.t.min(a.y, k.y))
        };
        c.f.g.t.max = function(a, k) {
            return a > k ? a : k
        };
        c.f.g.t.cB = function(a, k) {
            return new c.f.g.A(c.f.g.t.max(a.x, k.x), c.f.g.t.max(a.y, k.y))
        };
        c.f.g.t.Gb = function(a,
            k, b) {
            return a < k ? k : a > b ? b : a
        };
        c.f.g.t.wN = function(a, k, b) {
            return c.f.g.t.cB(k, c.f.g.t.dB(a, b))
        };
        c.f.g.t.hS = function(a, k) {
            var b = a[0];
            a[0] = k[0];
            k[0] = b
        };
        c.f.g.t.random = function() {
            return 2 * Math.random() - 1
        };
        c.f.g.t.UQ = function(a, k) {
            var b = Math.random();
            return (k - a) * b + a
        };
        c.f.g.t.IQ = function(a) {
            a |= a >> 1 & 2147483647;
            a |= a >> 2 & 1073741823;
            a |= a >> 4 & 268435455;
            a |= a >> 8 & 16777215;
            return (a | a >> 16 & 65535) + 1
        };
        c.f.g.t.yQ = function(a) {
            return 0 < a && 0 == (a & a - 1)
        };
        c.f.g.t.EF = function() {
            return Number.MIN_VALUE
        };
        c.f.g.t.DF = function() {
            return Number.MAX_VALUE
        };
        c.f.g.zi = function() {
            this.X = new c.f.g.A;
            this.de = new c.f.g.A;
            this.c = new c.f.g.A
        };
        c.f.g.zi.q = !0;
        c.f.g.zi.prototype = {
            set: function(a) {
                this.X.P(a.X);
                this.de.P(a.de);
                this.c.P(a.c);
                this.zg = a.zg;
                this.a = a.a;
                this.Xd = a.Xd
            },
            copy: function() {
                var a = new c.f.g.zi;
                a.X.P(this.X);
                a.de.P(this.de);
                a.c.P(this.c);
                a.zg = this.zg;
                a.a = this.a;
                a.Xd = this.Xd;
                return a
            },
            pf: function(a, k) {
                a.position.x = (1 - k) * this.de.x + k * this.c.x;
                a.position.y = (1 - k) * this.de.y + k * this.c.y;
                a.G.set((1 - k) * this.zg + k * this.a);
                var b = a.G;
                a.position.x -= b.l.x * this.X.x +
                    b.m.x * this.X.y;
                a.position.y -= b.l.y * this.X.x + b.m.y * this.X.y
            },
            advance: function(a) {
                if (this.Xd < a && 1 - this.Xd > Number.MIN_VALUE) {
                    var k = (a - this.Xd) / (1 - this.Xd);
                    this.de.x = (1 - k) * this.de.x + k * this.c.x;
                    this.de.y = (1 - k) * this.de.y + k * this.c.y;
                    this.zg = (1 - k) * this.zg + k * this.a;
                    this.Xd = a
                }
            },
            r: c.f.g.zi
        };
        c.f.g.Xe = function(a, k, b) {
            null == b && (b = 0);
            null == k && (k = 0);
            null == a && (a = 0);
            this.x = a;
            this.y = k;
            this.z = b
        };
        c.f.g.Xe.q = !0;
        c.f.g.Xe.prototype = {
            hb: function() {
                this.x = this.y = this.z = 0
            },
            set: function(a, k, b) {
                this.x = a;
                this.y = k;
                this.z = b
            },
            P: function(a) {
                this.x =
                    a.x;
                this.y = a.y;
                this.z = a.z
            },
            Wk: function() {
                return new c.f.g.Xe(-this.x, -this.y, -this.z)
            },
            eB: function() {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z
            },
            copy: function() {
                return new c.f.g.Xe(this.x, this.y, this.z)
            },
            add: function(a) {
                this.x += a.x;
                this.y += a.y;
                this.z += a.z
            },
            zx: function(a) {
                this.x -= a.x;
                this.y -= a.y;
                this.z -= a.z
            },
            multiply: function(a) {
                this.x *= a;
                this.y *= a;
                this.z *= a
            },
            r: c.f.g.Xe
        };
        c.e = {};
        c.e.aa = function(a, k) {
            this.K = new c.f.g.Ch;
            this.n = new c.f.g.zi;
            this.B = new c.f.g.A;
            this.Bp = new c.f.g.A;
            this.V = 0;
            a.yz && (this.V |=
                c.e.aa.hp);
            a.Wz && (this.V |= c.e.aa.ws);
            a.lz && (this.V |= c.e.aa.gp);
            a.oz && (this.V |= c.e.aa.Tk);
            a.iD && (this.V |= c.e.aa.Pm);
            this.od = k;
            this.K.position.P(a.position);
            this.K.G.set(a.lv);
            this.n.X.hb();
            this.n.Xd = 1;
            this.n.zg = this.n.a = a.lv;
            var b = this.K.G,
                e = this.n.X;
            this.n.c.x = b.l.x * e.x + b.m.x * e.y;
            this.n.c.y = b.l.y * e.x + b.m.y * e.y;
            this.n.c.x += this.K.position.x;
            this.n.c.y += this.K.position.y;
            this.n.de.P(this.n.c);
            this.Pb = this.aj = this.If = null;
            this.gw = 0;
            this.ya = this.ye = null;
            this.B.P(a.MA);
            this.M = a.nz;
            this.WA = a.LA;
            this.NA =
                a.mz;
            this.Bp.set(0, 0);
            this.ll = this.uw = 0;
            this.tb = a.type;
            this.Y = this.tb == c.e.aa.bg ? this.ga = 1 : this.ga = 0;
            this.ia = this.Jg = 0;
            this.iG = a.NF;
            this.ck = a.mj;
            this.rf = null;
            this.at = 0
        };
        c.e.aa.q = !0;
        c.e.aa.prototype = {
            XD: function(a) {
                if (!0 == this.od.Us()) return null;
                var k = new c.e.pk;
                k.create(this, this.K, a);
                0 != (this.V & c.e.aa.Pm) && k.Mm(this.od.Jd.ei, this.K);
                k.ya = this.rf;
                this.rf = k;
                ++this.at;
                k.Eb = this;
                0 < k.$s && this.ax();
                this.od.V |= c.e.Ub.Av;
                return k
            },
            nx: function(a, k) {
                var b;
                if (!0 != this.od.Us()) {
                    this.K.G.set(k);
                    this.K.position.P(a);
                    b = this.K.G;
                    var c = this.n.X;
                    this.n.c.x = b.l.x * c.x + b.m.x * c.y;
                    this.n.c.y = b.l.y * c.x + b.m.y * c.y;
                    this.n.c.x += this.K.position.x;
                    this.n.c.y += this.K.position.y;
                    this.n.de.P(this.n.c);
                    this.n.zg = this.n.a = k;
                    c = this.od.Jd.ei;
                    for (b = this.rf; null != b;) b.hC(c, this.K, this.K), b = b.ya;
                    this.od.Jd.Bs()
                }
            },
            setTransform: function(a) {
                this.nx(a.position, a.Fg())
            },
            pf: C("K"),
            Q: function() {
                return this.K.position
            },
            setPosition: function(a) {
                this.nx(a, this.Fg())
            },
            Fg: function() {
                return this.n.a
            },
            JI: function(a) {
                this.nx(this.Q(), a)
            },
            MB: function(a) {
                this.tb !=
                    c.e.aa.Df && this.B.P(a)
            },
            sn: function(a) {
                this.tb != c.e.aa.Df && (this.M = a)
            },
            Hv: C("M"),
            UE: function() {
                var a = new c.e.zn;
                a.type = this.Db();
                a.lz = (this.V & c.e.aa.gp) == c.e.aa.gp;
                a.lv = this.Fg();
                a.mz = this.NA;
                a.nz = this.M;
                a.Wz = (this.V & c.e.aa.ws) == c.e.aa.ws;
                a.yz = (this.V & c.e.aa.hp) == c.e.aa.hp;
                a.oz = (this.V & c.e.aa.Tk) == c.e.aa.Tk;
                a.LA = this.WA;
                a.MA.P(this.B);
                a.position = this.Q();
                a.mj = this.getUserData();
                return a
            },
            split: function(a) {
                for (var k = this.B.copy(), b = this.Hv(), e = this.n.c, g = this.od.tv(this.UE()), h = null, l = this.rf; null !=
                    l;)
                    if (a(l)) {
                        var m = l.ya;
                        null != h ? h.ya = m : this.rf = m;
                        this.at--;
                        l.ya = g.rf;
                        g.rf = l;
                        g.at++;
                        l.Eb = g;
                        l = m
                    } else h = l, l = l.ya;
                this.ax();
                g.ax();
                h = g.n.c;
                a = c.f.g.t.is(k, c.f.g.t.ep(b, c.f.g.t.Ac(this.n.c, e)));
                k = c.f.g.t.is(k, c.f.g.t.ep(b, c.f.g.t.Ac(h, e)));
                this.MB(a);
                g.MB(k);
                this.sn(b);
                g.sn(b);
                this.ut();
                g.ut();
                return g
            },
            nA: function(a) {
                a.ni = this.ga;
                a.Tl = this.Jg;
                a.Ag.P(this.n.X)
            },
            ax: function() {
                this.ia = this.Jg = this.Y = this.ga = 0;
                this.n.X.hb();
                if (this.tb != c.e.aa.Df && this.tb != c.e.aa.rz) {
                    for (var a = c.f.g.A.rG(), k = this.rf; null != k;)
                        if (0 !=
                            k.$s) {
                            var b = k.nA();
                            this.ga += b.ni;
                            a.x += b.Ag.x * b.ni;
                            a.y += b.Ag.y * b.ni;
                            this.Jg += b.Tl;
                            k = k.ya
                        }
                    0 < this.ga ? (this.Y = 1 / this.ga, a.x *= this.Y, a.y *= this.Y) : this.Y = this.ga = 1;
                    0 < this.Jg && 0 == (this.V & c.e.aa.ws) ? (this.Jg -= this.ga * (a.x * a.x + a.y * a.y), this.Jg *= this.iG, c.f.F.Ic(0 < this.Jg), this.ia = 1 / this.Jg) : this.ia = this.Jg = 0;
                    k = this.n.c.copy();
                    this.n.X.P(a);
                    this.n.de.P(c.f.g.t.Wc(this.K, this.n.X));
                    this.n.c.P(this.n.de);
                    this.B.x += this.M * -(this.n.c.y - k.y);
                    this.B.y += this.M * (this.n.c.x - k.x)
                }
            },
            md: function(a) {
                var k = this.K.G;
                a = new c.f.g.A(k.l.x *
                    a.x + k.m.x * a.y, k.l.y * a.x + k.m.y * a.y);
                a.x += this.K.position.x;
                a.y += this.K.position.y;
                return a
            },
            Os: function(a) {
                return c.f.g.t.ze(this.K.G, a)
            },
            Ff: function(a) {
                return c.f.g.t.wG(this.K, a)
            },
            lA: function(a) {
                return c.f.g.t.dk(this.K.G, a)
            },
            Db: C("tb"),
            Ts: function() {
                return (this.V & c.e.aa.hp) == c.e.aa.hp
            },
            zb: function(a) {
                a ? (this.V |= c.e.aa.Tk, this.ll = 0) : (this.V &= ~c.e.aa.Tk, this.ll = 0, this.B.hb(), this.M = 0, this.Bp.hb(), this.uw = 0)
            },
            oh: function() {
                return (this.V & c.e.aa.Tk) == c.e.aa.Tk
            },
            setActive: function(a) {
                if (a != this.ai()) {
                    var k;
                    if (a)
                        for (this.V |= c.e.aa.Pm, a = this.od.Jd.ei, k = this.rf; null != k;) k.Mm(a, this.K), k = k.ya;
                    else {
                        this.V &= ~c.e.aa.Pm;
                        a = this.od.Jd.ei;
                        for (k = this.rf; null != k;) k.Om(a), k = k.ya;
                        for (a = this.Pb; null != a;) k = a, a = a.next, this.od.Jd.W(k.uc);
                        this.Pb = null
                    }
                }
            },
            ai: function() {
                return (this.V & c.e.aa.Pm) == c.e.aa.Pm
            },
            getUserData: C("ck"),
            setUserData: z("ck"),
            ut: function() {
                var a = c.e.aa.DI;
                a.G.set(this.n.zg);
                var k = a.G,
                    b = this.n.X;
                a.position.x = this.n.de.x - (k.l.x * b.x + k.m.x * b.y);
                a.position.y = this.n.de.y - (k.l.y * b.x + k.m.y * b.y);
                b = this.od.Jd.ei;
                for (k = this.rf; null != k;) k.hC(b, a, this.K), k = k.ya
            },
            Yc: function() {
                this.K.G.set(this.n.a);
                var a = this.K.G,
                    k = this.n.X;
                this.K.position.x = this.n.c.x - (a.l.x * k.x + a.m.x * k.y);
                this.K.position.y = this.n.c.y - (a.l.y * k.x + a.m.y * k.y)
            },
            fq: function(a) {
                if (this.tb != c.e.aa.bg && a.tb != c.e.aa.bg) return !1;
                for (var k = this.If; null != k;) {
                    if (k.oi == a && !1 == k.Zk.PA) return !1;
                    k = k.next
                }
                return !0
            },
            advance: function(a) {
                this.n.advance(a);
                this.n.c.P(this.n.de);
                this.n.a = this.n.zg;
                this.Yc()
            },
            r: c.e.aa
        };
        c.e.zn = function() {
            this.position = new c.f.g.A;
            this.MA = new c.f.g.A;
            this.mj = null;
            this.mz = this.LA = this.nz = this.lv = 0;
            this.oz = this.lz = !0;
            this.yz = this.Wz = !1;
            this.type = c.e.aa.Df;
            this.iD = !0;
            this.NF = 1
        };
        c.e.zn.q = !0;
        c.e.zn.prototype = {
            r: c.e.zn
        };
        c.e.Bl = v();
        c.e.Bl.q = !0;
        c.e.Bl.prototype = {
            fq: function(a, k) {
                var b = a.dA(),
                    c = k.dA();
                return b.Yk == c.Yk && 0 != b.Yk ? 0 < b.Yk : 0 != (b.Jp & c.cp) && 0 != (b.cp & c.Jp)
            },
            r: c.e.Bl
        };
        c.e.oq = function() {
            this.xG = [];
            this.QJ = []
        };
        c.e.oq.q = !0;
        c.e.oq.prototype = {
            r: c.e.oq
        };
        c.e.Bh = v();
        c.e.Bh.q = !0;
        c.e.Bh.prototype = {
            pv: v(),
            As: v(),
            UH: v(),
            TH: v(),
            r: c.e.Bh
        };
        c.e.Cn = function() {
            this.od = null;
            this.Kg = 0;
            this.RA = c.e.Bl.vD;
            this.cn = c.e.Bh.wD;
            this.QA = new c.e.D.nq(this.Xj);
            this.ei = new c.h.Gn
        };
        c.e.Cn.q = !0;
        c.e.Cn.prototype = {
            mD: function(a, k) {
                var b;
                b = A.Ja.Fb(a, c.e.pk);
                var e;
                e = A.Ja.Fb(k, c.e.pk);
                var g = b.Eb,
                    h = e.Eb;
                if (g != h) {
                    for (var l = h.Pb; null != l;) {
                        if (l.oi == g) {
                            var m = l.uc.Sc,
                                n = l.uc.Tc;
                            if (m == b && n == e || m == e && n == b) return
                        }
                        l = l.next
                    }!1 != h.fq(g) && !1 != this.RA.fq(b, e) && (l = this.QA.create(b, e), b = l.Sc, e = l.Tc, g = b.Eb, h = e.Eb, l.ye = null, l.ya = this.od.Pb, null != this.od.Pb && (this.od.Pb.ye = l),
                        this.od.Pb = l, l.we.uc = l, l.we.oi = h, l.we.pd = null, l.we.next = g.Pb, null != g.Pb && (g.Pb.pd = l.we), g.Pb = l.we, l.xe.uc = l, l.xe.oi = g, l.xe.pd = null, l.xe.next = h.Pb, null != h.Pb && (h.Pb.pd = l.xe), h.Pb = l.xe, ++this.od.Kg)
                }
            },
            Bs: function() {
                this.ei.bK(r(this, this.mD))
            },
            W: function(a) {
                var k = a.Sc.Eb,
                    b = a.Tc.Eb;
                a.Vs() && this.cn.As(a);
                null != a.ye && (a.ye.ya = a.ya);
                null != a.ya && (a.ya.ye = a.ye);
                a == this.od.Pb && (this.od.Pb = a.ya);
                null != a.we.pd && (a.we.pd.next = a.we.next);
                null != a.we.next && (a.we.next.pd = a.we.pd);
                a.we == k.Pb && (k.Pb = a.we.next);
                null !=
                    a.xe.pd && (a.xe.pd.next = a.xe.next);
                null != a.xe.next && (a.xe.next.pd = a.xe.pd);
                a.xe == b.Pb && (b.Pb = a.xe.next);
                this.QA.W(a);
                --this.Kg
            },
            JD: function() {
                for (var a = this.od.Pb; null != a;) {
                    var k = a.Sc,
                        b = a.Tc,
                        e = k.Eb,
                        g = b.Eb;
                    if (!1 == e.oh() && !1 == g.oh()) a = a.ya;
                    else {
                        if (0 != (a.V & c.e.D.ja.yv)) {
                            if (!1 == g.fq(e)) {
                                k = a;
                                a = k.ya;
                                this.W(k);
                                continue
                            }
                            if (!1 == this.RA.fq(k, b)) {
                                k = a;
                                a = k.ya;
                                this.W(k);
                                continue
                            }
                            a.V &= ~c.e.D.ja.yv
                        }!1 == this.ei.lj(k.Zj, b.Zj) ? (k = a, a = k.ya, this.W(k)) : (a.update(this.cn), a = a.ya)
                    }
                }
            },
            r: c.e.Cn
        };
        c.e.De = function() {
            this.et = this.jw =
                this.Yj = this.el = this.xc = 1;
            this.SA = 0
        };
        c.e.De.q = !0;
        c.e.De.prototype = {
            WI: z("SA"),
            qJ: z("$a"),
            UI: z("xc"),
            fJ: z("el"),
            yh: z("Yj"),
            Gs: C("Yj"),
            VI: z("jw"),
            qE: function(a, k, b) {
                console.log("drawPolygon()");
                this.$a.lineWidth = this.el;
                this.$a.strokeStyle = b;
                this.$a.globalAlpha = this.Yj;
                this.$a.beginPath();
                this.$a.moveTo(a[0].x * this.xc, a[0].y * this.xc);
                for (b = 1; b < k;) {
                    var c = b++;
                    this.$a.lineTo(a[c].x * this.xc, a[c].y * this.xc)
                }
                this.$a.lineTo(a[0].x * this.xc, a[0].y * this.xc);
                this.$a.stroke()
            },
            tE: function(a, k, b) {
                this.$a.lineWidth =
                    this.el;
                this.$a.strokeStyle = b.jC();
                this.$a.globalAlpha = this.Yj;
                this.$a.beginPath();
                this.$a.moveTo(a[0].x * this.xc, a[0].y * this.xc);
                this.$a.fillStyle = "rgba(" + b.Dm + "," + b.lm + "," + b.hm + "," + this.jw + ")";
                for (b = 1; b < k;) {
                    var c = b++;
                    this.$a.lineTo(a[c].x * this.xc, a[c].y * this.xc)
                }
                this.$a.lineTo(a[0].x * this.xc, a[0].y * this.xc);
                this.$a.stroke();
                this.$a.fill()
            },
            sE: function(a, k, b, c) {
                this.$a.lineWidth = this.el;
                this.$a.strokeStyle = c.jC();
                this.$a.globalAlpha = this.Yj;
                this.$a.beginPath();
                this.$a.fillStyle = "rgba(" + c.Dm + "," + c.lm +
                    "," + c.hm + "," + this.jw + ")";
                this.$a.arc(a.x * this.xc, a.y * this.xc, k * this.xc, 0, 2 * Math.PI, !1);
                this.$a.stroke();
                this.$a.fill()
            },
            Vh: function(a, k, b) {
                this.$a.lineWidth = this.el;
                this.$a.strokeStyle = b;
                this.$a.globalAlpha = this.Yj;
                this.$a.beginPath();
                this.$a.moveTo(a.x * this.xc, a.y * this.xc);
                this.$a.lineTo(k.x * this.xc, k.y * this.xc);
                this.$a.stroke()
            },
            uE: function(a) {
                this.$a.lineWidth = this.el;
                this.$a.strokeStyle = "#FF0000";
                this.$a.globalAlpha = this.Yj;
                this.$a.beginPath();
                this.$a.moveTo(a.position.x * this.xc, a.position.y *
                    this.xc);
                this.$a.lineTo((a.position.x + this.et * a.G.l.x) * this.xc, (a.position.y + this.et * a.G.l.y) * this.xc);
                this.$a.lineWidth = this.el;
                this.$a.strokeStyle = "#00FF00";
                this.$a.globalAlpha = this.Yj;
                this.$a.moveTo(a.position.x * this.xc, a.position.y * this.xc);
                this.$a.lineTo((a.position.x + this.et * a.G.m.x) * this.xc, (a.position.y + this.et * a.G.m.y) * this.xc);
                this.$a.stroke()
            },
            r: c.e.De
        };
        c.e.At = v();
        c.e.At.q = !0;
        c.e.At.prototype = {
            r: c.e.At
        };
        c.e.Dl = function() {
            this.cp = 1;
            this.Jp = 65535;
            this.Yk = 0
        };
        c.e.Dl.q = !0;
        c.e.Dl.prototype = {
            copy: function() {
                var a =
                    new c.e.Dl;
                a.cp = this.cp;
                a.Jp = this.Jp;
                a.Yk = this.Yk;
                return a
            },
            r: c.e.Dl
        };
        c.e.pk = function() {
            this.TA = new c.e.Dl;
            this.Wj = new c.h.ti;
            this.Jc = this.ya = this.Eb = this.ck = null;
            this.sw = this.kw = this.$s = 0
        };
        c.e.pk.q = !0;
        c.e.pk.prototype = {
            Db: function() {
                return this.Jc.Db()
            },
            Zi: C("jG"),
            dA: function() {
                return this.TA.copy()
            },
            getUserData: C("ck"),
            hq: function(a) {
                return this.Jc.hq(this.Eb.pf(), a)
            },
            Qg: function(a, k) {
                return this.Jc.Qg(a, k, this.Eb.pf())
            },
            nA: function(a) {
                null == a && (a = new c.h.S.On);
                this.Jc.dp(a, this.$s);
                return a
            },
            create: function(a,
                k, b) {
                this.ck = b.mj;
                this.kw = b.Ev;
                this.sw = b.cx;
                this.Eb = a;
                this.ya = null;
                this.TA = b.filter.copy();
                this.jG = b.Zi;
                this.Jc = b.shape.copy();
                this.$s = b.hE
            },
            W: function() {
                this.Jc = null
            },
            Mm: function(a, k) {
                this.Jc.Lm(this.Wj, k);
                this.Zj = a.Mm(this.Wj, this)
            },
            Om: function(a) {
                null != this.Zj && (a.Om(this.Zj), this.Zj = null)
            },
            hC: function(a, k, b) {
                if (null != this.Zj) {
                    var e = new c.h.ti,
                        g = new c.h.ti;
                    this.Jc.Lm(e, k);
                    this.Jc.Lm(g, b);
                    this.Wj.ps(e, g);
                    a.zw(this.Zj, this.Wj, c.f.g.t.Ac(b.position, k.position))
                }
            },
            r: c.e.pk
        };
        c.e.Bt = function() {
            this.filter =
                new c.e.Dl;
            this.mj = this.shape = null;
            this.Ev = 0.2;
            this.hE = this.cx = 0;
            this.filter.cp = 1;
            this.filter.Jp = 65535;
            this.filter.Yk = 0;
            this.Zi = !1
        };
        c.e.Bt.q = !0;
        c.e.Bt.prototype = {
            r: c.e.Bt
        };
        c.e.qk = function() {
            this.di = [];
            this.dn = [];
            this.sh = []
        };
        c.e.qk.q = !0;
        c.e.qk.prototype = {
            ge: function(a, k, b, c, g, h) {
                this.cG = k;
                this.kG = b;
                this.Hf = this.Kg = this.Le = 0;
                this.Xj = c;
                this.lG = g;
                this.al = h;
                for (c = this.di.length; c < a;) g = c++, this.di[g] = null;
                for (a = this.dn.length; a < k;) c = a++, this.dn[c] = null;
                for (k = this.sh.length; k < b;) a = k++, this.sh[a] = null
            },
            clear: function() {
                this.Hf =
                    this.Kg = this.Le = 0
            },
            wl: function(a, k, b) {
                for (var e, g = 0, h = this.Le; g < h;) e = g++, e = this.di[e], e.Db() == c.e.aa.bg && (e.B.x += a.qb * (k.x + e.Y * e.Bp.x), e.B.y += a.qb * (k.y + e.Y * e.Bp.y), e.M += a.qb * e.ia * e.uw, e.B.multiply(c.f.g.t.Gb(1 - a.qb * e.WA, 0, 1)), e.M *= c.f.g.t.Gb(1 - a.qb * e.NA, 0, 1));
                this.al.ge(a, this.dn, this.Kg, this.Xj);
                k = this.al;
                k.fg(a);
                g = 0;
                for (h = this.Hf; g < h;) e = g++, e = this.sh[e], e.fg(a);
                g = 0;
                for (h = a.yn; g < h;) {
                    g++;
                    for (var l = 0, m = this.Hf; l < m;) e = l++, e = this.sh[e], e.Mf(a);
                    k.Mf()
                }
                g = 0;
                for (h = this.Hf; g < h;) e = g++, e = this.sh[e], e.Cv();
                k.Cv();
                g = 0;
                for (h = this.Le; g < h;) e = g++, e = this.di[e], e.Db() != c.e.aa.Df && (l = a.qb * e.B.x, m = a.qb * e.B.y, l * l + m * m > c.f.F.uz && (e.B.normalize(), e.B.x *= c.f.F.Jm * a.Ig, e.B.y *= c.f.F.Jm * a.Ig), l = a.qb * e.M, l * l > c.f.F.tz && (e.M = 0 > e.M ? -c.f.F.Im * a.Ig : c.f.F.Im * a.Ig), e.n.de.P(e.n.c), e.n.zg = e.n.a, e.n.c.x += a.qb * e.B.x, e.n.c.y += a.qb * e.B.y, e.n.a += a.qb * e.M, e.Yc());
                g = 0;
                for (h = a.pn; g < h;) {
                    g++;
                    for (var l = k.Lf(c.f.F.mv), m = !0, n = 0, f = this.Hf; n < f;) e = n++, e = this.sh[e], e = e.Lf(c.f.F.mv), m = m && e;
                    if (l && m) break
                }
                this.yB(k.fi);
                if (b) {
                    b = Number.MAX_VALUE;
                    k = c.f.F.sz * c.f.F.sz;
                    g = c.f.F.qz * c.f.F.qz;
                    h = 0;
                    for (l = this.Le; h < l;) e = h++, e = this.di[e], e.Db() != c.e.aa.Df && (0 == (e.V & c.e.aa.gp) && (b = e.ll = 0), 0 == (e.V & c.e.aa.gp) || e.M * e.M > g || c.f.g.t.se(e.B, e.B) > k ? b = e.ll = 0 : (e.ll += a.qb, b = c.f.g.t.min(b, e.ll)));
                    if (b >= c.f.F.AD)
                        for (a = 0, b = this.Le; a < b;) k = a++, e = this.di[k], e.zb(!1)
                }
            },
            vx: function(a) {
                this.al.ge(a, this.dn, this.Kg, this.Xj);
                for (var b = this.al, d = 0, e = this.Hf; d < e;) {
                    var g = d++;
                    this.sh[g].fg(a)
                }
                d = 0;
                for (e = a.yn; d < e;) {
                    d++;
                    b.Mf();
                    for (var g = 0, h = this.Hf; g < h;) {
                        var l = g++;
                        this.sh[l].Mf(a)
                    }
                }
                d =
                    0;
                for (e = this.Le; d < e;) g = d++, g = this.di[g], g.Db() != c.e.aa.Df && (h = a.qb * g.B.x, l = a.qb * g.B.y, h * h + l * l > c.f.F.uz && (g.B.normalize(), g.B.x *= c.f.F.Jm * a.Ig, g.B.y *= c.f.F.Jm * a.Ig), h = a.qb * g.M, h * h > c.f.F.tz && (g.M = 0 > g.M ? -c.f.F.Im * a.Ig : c.f.F.Im * a.Ig), g.n.de.P(g.n.c), g.n.zg = g.n.a, g.n.c.x += a.qb * g.B.x, g.n.c.y += a.qb * g.B.y, g.n.a += a.qb * g.M, g.Yc());
                d = 0;
                for (a = a.pn; d < a;) {
                    d++;
                    e = b.Lf(0.75);
                    g = !0;
                    h = 0;
                    for (l = this.Hf; h < l;) var m = h++,
                        m = this.sh[m].Lf(c.f.F.mv),
                        g = g && m;
                    if (e && g) break
                }
                this.yB(b.fi)
            },
            yB: function(a) {
                if (null != this.lG)
                    for (var b =
                            0, d = this.Kg; b < d;)
                        for (var e = b++, e = a[e], g = 0, h = e.ig; g < h;) {
                            var l = g++;
                            c.e.qk.DB.xG[l] = e.Ld[l].Kd;
                            c.e.qk.DB.QJ[l] = e.Ld[l].ri
                        }
            },
            iv: function(a) {
                a.BQ = this.Le;
                this.di[this.Le++] = a
            },
            fz: function(a) {
                this.dn[this.Kg++] = a
            },
            hz: function(a) {
                this.sh[this.Hf++] = a
            },
            r: c.e.qk
        };
        c.e.Hl = v();
        c.e.Hl.q = !0;
        c.e.Hl.prototype = {
            set: function(a) {
                this.qb = a.qb;
                this.Ig = a.Ig;
                this.pn = a.pn;
                this.yn = a.yn;
                this.Tg = a.Tg
            },
            r: c.e.Hl
        };
        c.e.Ub = function(a, b) {
            this.vI = [];
            this.Jd = new c.e.Cn;
            this.al = new c.e.D.ie;
            this.VA = new c.e.qk;
            this.aj = this.If = this.Pb =
                this.Vd = this.Me = null;
            this.gw = this.Hf = this.Kg = this.Le = 0;
            c.e.Ub.pG = !0;
            c.e.Ub.dG = !0;
            this.bG = b;
            this.lw = a;
            this.UA = 0;
            this.Jd.od = this;
            this.mw = this.tv(new c.e.zn)
        };
        c.e.Ub.q = !0;
        c.e.Ub.prototype = {
            RI: function(a) {
                this.Jd.cn = a
            },
            TI: z("Me"),
            qC: v(),
            tv: function(a) {
                if (!0 == this.Us()) return null;
                a = new c.e.aa(a, this);
                a.ye = null;
                a.ya = this.Vd;
                null != this.Vd && (this.Vd.ye = a);
                this.Vd = a;
                ++this.Le;
                return a
            },
            iE: function(a) {
                if (!0 != this.Us()) {
                    for (var b = a.If; null != b;) {
                        var d = b,
                            b = b.next;
                        this.kE(d.Zk)
                    }
                    for (b = a.aj; null != b;) d = b, b = b.ej,
                        d.Ez.rB(a);
                    for (b = a.Pb; null != b;) d = b, b = b.next, this.Jd.W(d.uc);
                    a.Pb = null;
                    for (b = a.rf; null != b;) d = b, b = b.ya, d.Om(this.Jd.ei), d.W();
                    a.rf = null;
                    a.at = 0;
                    null != a.ye && (a.ye.ya = a.ya);
                    null != a.ya && (a.ya.ye = a.ye);
                    a == this.Vd && (this.Vd = a.ya);
                    --this.Le
                }
            },
            kE: function(a) {
                var b = a.PA;
                null != a.ye && (a.ye.ya = a.ya);
                null != a.ya && (a.ya.ye = a.ye);
                a == this.If && (this.If = a.ya);
                var d = a.Ca,
                    e = a.na;
                d.zb(!0);
                e.zb(!0);
                null != a.gi.pd && (a.gi.pd.next = a.gi.next);
                null != a.gi.next && (a.gi.next.pd = a.gi.pd);
                a.gi == d.If && (d.If = a.gi.next);
                a.gi.pd = null;
                a.gi.next =
                    null;
                null != a.hi.pd && (a.hi.pd.next = a.hi.next);
                null != a.hi.next && (a.hi.next.pd = a.hi.pd);
                a.hi == e.If && (e.If = a.hi.next);
                a.hi.pd = null;
                a.hi.next = null;
                c.e.p.Hb.W(a, null);
                --this.Hf;
                if (!1 == b)
                    for (a = e.Pb; null != a;) a.oi == d && a.uc.IE(), a = a.next
            },
            jx: z("lw"),
            gA: C("lw"),
            step: function(a, b, d) {
                0 != (this.V & c.e.Ub.Av) && (this.Jd.Bs(), this.V &= ~c.e.Ub.Av);
                this.V |= c.e.Ub.zv;
                var e = c.e.Ub.zI;
                e.qb = a;
                e.yn = b;
                e.pn = d;
                e.Ig = 0 < a ? 1 / a : 0;
                e.cd = this.UA * a;
                e.Tg = c.e.Ub.pG;
                this.Jd.JD();
                0 < e.qb && this.wl(e);
                c.e.Ub.dG && 0 < e.qb && this.vx(e);
                0 < e.qb && (this.UA =
                    e.Ig);
                this.V &= ~c.e.Ub.zv
            },
            HD: function() {
                for (var a = this.Vd; null != a;) a.Bp.hb(), a.uw = 0, a = a.ya
            },
            oE: function() {
                if (null != this.Me) {
                    var a = this.Me.SA,
                        b, d, e, g;
                    g = [new c.f.g.A, new c.f.g.A, new c.f.g.A, new c.f.g.A];
                    var h = new c.f.An(0, 0, 0);
                    if (0 != (a & c.e.De.Qz))
                        for (b = this.Vd; null != b;) {
                            g = b.K;
                            for (d = b.rf; null != d;) e = d.Jc, !1 == b.ai() ? h.set(0.5, 0.5, 0.3) : b.Db() == c.e.aa.Df ? h.set(0.5, 0.9, 0.5) : b.Db() == c.e.aa.rz ? h.set(0.5, 0.5, 0.9) : !1 == b.oh() ? h.set(0.6, 0.6, 0.6) : h.set(0.9, 0.7, 0.7), this.rE(e, g, h), d = d.ya;
                            b = b.ya
                        }
                    if (0 != (a & c.e.De.yE))
                        for (b =
                            this.If; null != b;) this.pE(b), b = b.ya;
                    if (0 != (a & c.e.De.xE))
                        for (b = this.aj; null != b;) b = b.ya;
                    if (0 != (a & c.e.De.zE))
                        for (h.set(0.3, 0.9, 0.9), b = this.Jd.Pb; null != b;) e = b.Tc, d = b.Sc.Wj.mp(), e = e.Wj.mp(), this.Me.Vh(d, e, h), b = b.ya;
                    if (0 != (a & c.e.De.vE))
                        for (e = this.Jd.ei, g = [new c.f.g.A, new c.f.g.A, new c.f.g.A, new c.f.g.A], b = this.Vd; null != b;) {
                            if (!1 != b.ai())
                                for (d = b.rf; null != d;) {
                                    var l = e.Um(d.Zj);
                                    g[0].set(l.lowerBound.x, l.lowerBound.y);
                                    g[1].set(l.upperBound.x, l.lowerBound.y);
                                    g[2].set(l.upperBound.x, l.upperBound.y);
                                    g[3].set(l.lowerBound.x,
                                        l.upperBound.y);
                                    this.Me.qE(g, 4, h);
                                    d = d.ya
                                }
                            b = b.ya
                        }
                    if (0 != (a & c.e.De.wE))
                        for (b = this.Vd; null != b;) g = c.e.Ub.CI, g.G = b.K.G, g.position = b.n.c, this.Me.uE(g), b = b.ya
                }
            },
            Qg: function(a, b, d) {
                var e = this.Jd.ei,
                    g = new c.h.yq,
                    h = new c.h.Tn(b, d);
                e.Qg(function(h, m) {
                    var n;
                    n = A.Ja.Fb(e.getUserData(m), c.e.pk);
                    if (n.Qg(g, h)) {
                        var f = g.Ds;
                        return a(n, new c.f.g.A((1 - f) * b.x + f * d.x, (1 - f) * b.y + f * d.y), g.Gc, f)
                    }
                    return h.nl
                }, h)
            },
            Us: function() {
                return 0 < (this.V & c.e.Ub.zv)
            },
            wl: function(a) {
                for (var b, d = this.aj; null != d;) d.step(a), d = d.ya;
                var e = this.VA;
                e.ge(this.Le, this.Kg, this.Hf, null, this.Jd.cn, this.al);
                for (b = this.Vd; null != b;) b.V &= ~c.e.aa.kd, b = b.ya;
                for (d = this.Pb; null != d;) d.V &= ~c.e.D.ja.kd, d = d.ya;
                for (d = this.If; null != d;) d.dl = !1, d = d.ya;
                for (var d = this.vI, g = this.Vd; null != g;) {
                    if (0 == (g.V & c.e.aa.kd) && !1 != g.oh() && !1 != g.ai() && g.Db() != c.e.aa.Df) {
                        e.clear();
                        var h = 0;
                        d[h++] = g;
                        for (g.V |= c.e.aa.kd; 0 < h;)
                            if (b = d[--h], e.iv(b), !1 == b.oh() && b.zb(!0), b.Db() != c.e.aa.Df) {
                                for (var l, m = b.Pb; null != m;) 0 == (m.uc.V & c.e.D.ja.kd) && (!0 != m.uc.Zi() && !1 != m.uc.isEnabled() && !1 != m.uc.Vs()) &&
                                    (e.fz(m.uc), m.uc.V |= c.e.D.ja.kd, l = m.oi, 0 == (l.V & c.e.aa.kd) && (d[h++] = l, l.V |= c.e.aa.kd)), m = m.next;
                                for (b = b.If; null != b;) !0 != b.Zk.dl && (l = b.oi, !1 != l.ai() && (e.hz(b.Zk), b.Zk.dl = !0, 0 == (l.V & c.e.aa.kd) && (d[h++] = l, l.V |= c.e.aa.kd))), b = b.next
                            }
                        e.wl(a, this.lw, this.bG);
                        h = 0;
                        for (l = e.Le; h < l;) b = h++, b = e.di[b], b.Db() == c.e.aa.Df && (b.V &= ~c.e.aa.kd)
                    }
                    g = g.ya
                }
                a = 0;
                for (e = d.length; a < e;) {
                    g = a++;
                    if (null == d[g]) break;
                    d[g] = null
                }
                for (b = this.Vd; null != b;) !1 != b.oh() && !1 != b.ai() && b.Db() != c.e.aa.Df && b.ut(), b = b.ya;
                this.Jd.Bs()
            },
            vx: function(a) {
                var b,
                    d, e, g, h = this.VA;
                h.ge(this.Le, c.f.F.yD, c.f.F.zD, null, this.Jd.cn, this.al);
                var l = c.e.Ub.rI;
                for (b = this.Vd; null != b;) b.V &= ~c.e.aa.kd, b.n.Xd = 0, b = b.ya;
                for (b = this.Pb; null != b;) b.V &= ~(c.e.D.ja.Qm | c.e.D.ja.kd), b = b.ya;
                for (g = this.If; null != g;) g.dl = !1, g = g.ya;
                for (;;) {
                    g = null;
                    var m = 1;
                    for (b = this.Pb; null != b;) {
                        if (!0 != b.Zi() && !1 != b.isEnabled() && !1 != b.UF()) {
                            d = 1;
                            if (0 != (b.V & c.e.D.ja.Qm)) d = b.oG;
                            else {
                                d = b.Sc;
                                e = b.Tc;
                                d = d.Eb;
                                e = e.Eb;
                                if (!(d.Db() == c.e.aa.bg && !1 != d.oh() || e.Db() == c.e.aa.bg && !1 != e.oh())) {
                                    b = b.ya;
                                    continue
                                }
                                var n = d.n.Xd;
                                d.n.Xd < e.n.Xd ? (n = e.n.Xd, d.n.advance(n)) : e.n.Xd < d.n.Xd && (n = d.n.Xd, e.n.advance(n));
                                d = b.PD(d.n, e.n);
                                c.f.F.Ic(0 <= d && 1 >= d);
                                0 < d && 1 > d && (d = (1 - d) * n + d, 1 < d && (d = 1));
                                b.oG = d;
                                b.V |= c.e.D.ja.Qm
                            }
                            Number.MIN_VALUE < d && d < m && (g = b, m = d)
                        }
                        b = b.ya
                    }
                    if (null == g || 1 - 100 * Number.MIN_VALUE < m) break;
                    d = g.Sc;
                    e = g.Tc;
                    d = d.Eb;
                    e = e.Eb;
                    c.e.Ub.AB.set(d.n);
                    c.e.Ub.BB.set(e.n);
                    d.advance(m);
                    e.advance(m);
                    g.update(this.Jd.cn);
                    g.V &= ~c.e.D.ja.Qm;
                    if (!0 == g.Zi() || !1 == g.isEnabled()) d.n.set(c.e.Ub.AB), e.n.set(c.e.Ub.BB), d.Yc(), e.Yc();
                    else if (!1 != g.Vs()) {
                        b = d;
                        b.Db() != c.e.aa.bg && (b = e);
                        h.clear();
                        e = d = 0;
                        l[d + e++] = b;
                        for (b.V |= c.e.aa.kd; 0 < e;)
                            if (b = l[d++], --e, h.iv(b), !1 == b.oh() && b.zb(!0), b.Db() == c.e.aa.bg) {
                                for (g = b.Pb; null != g && h.Kg != h.cG;) 0 == (g.uc.V & c.e.D.ja.kd) && (!0 != g.uc.Zi() && !1 != g.uc.isEnabled() && !1 != g.uc.Vs()) && (h.fz(g.uc), g.uc.V |= c.e.D.ja.kd, n = g.oi, 0 == (n.V & c.e.aa.kd) && (n.Db() != c.e.aa.Df && (n.advance(m), n.zb(!0)), l[d + e] = n, ++e, n.V |= c.e.aa.kd)), g = g.next;
                                for (b = b.If; null != b;) h.Hf != h.kG && !0 != b.Zk.dl && (n = b.oi, !1 != n.ai() && (h.hz(b.Zk), b.Zk.dl = !0, 0 == (n.V & c.e.aa.kd) &&
                                    (n.Db() != c.e.aa.Df && (n.advance(m), n.zb(!0)), l[d + e] = n, ++e, n.V |= c.e.aa.kd))), b = b.next
                            }
                        b = c.e.Ub.yI;
                        b.Tg = !1;
                        b.qb = (1 - m) * a.qb;
                        b.Ig = 1 / b.qb;
                        b.cd = 0;
                        b.yn = a.yn;
                        b.pn = a.pn;
                        h.vx(b);
                        m = 0;
                        for (d = h.Le; m < d;)
                            if (b = m++, b = h.di[b], b.V &= ~c.e.aa.kd, !1 != b.oh() && b.Db() == c.e.aa.bg)
                                for (b.ut(), g = b.Pb; null != g;) g.uc.V &= ~c.e.D.ja.Qm, g = g.next;
                        m = 0;
                        for (g = h.Kg; m < g;) b = m++, b = h.dn[b], b.V &= ~(c.e.D.ja.Qm | c.e.D.ja.kd);
                        m = 0;
                        for (b = h.Hf; m < b;) g = m++, g = h.sh[g], g.dl = !1;
                        this.Jd.Bs()
                    }
                }
            },
            pE: function(a) {
                var b = a.Ca,
                    d = a.na,
                    e = b.K.position,
                    g = d.K.position,
                    h =
                    a.Xh(),
                    l = a.Yh(),
                    m = c.e.Ub.mI;
                switch (a.tb[1]) {
                    case 3:
                        this.Me.Vh(h, l, m);
                        break;
                    case 4:
                        b = A.Ja.Fb(a, c.e.p.Vg);
                        a = b.$E();
                        b = b.aF();
                        this.Me.Vh(a, h, m);
                        this.Me.Vh(b, l, m);
                        this.Me.Vh(a, b, m);
                        break;
                    case 5:
                        this.Me.Vh(h, l, m);
                        break;
                    default:
                        b != this.mw && this.Me.Vh(e, h, m), this.Me.Vh(h, l, m), d != this.mw && this.Me.Vh(g, l, m)
                }
            },
            rE: function(a, b, d) {
                switch (a.tb[1]) {
                    case 1:
                        a = A.Ja.Fb(a, c.h.S.Nf);
                        var e = c.f.g.t.Wc(b, a.Qb);
                        this.Me.sE(e, a.Za, b.G.l, d);
                        break;
                    case 2:
                        e = A.Ja.Fb(a, c.h.S.Bc);
                        a = e.BA();
                        for (var e = e.ea, g = [], h = 0; h < a;) {
                            var l = h++;
                            g[l] = c.f.g.t.Wc(b, e[l])
                        }
                        this.Me.tE(g, a, d);
                        break;
                    case 3:
                        a = A.Ja.Fb(a, c.h.S.nk), this.Me.Vh(c.f.g.t.Wc(b, a.Ea), c.f.g.t.Wc(b, a.Wa), d)
                }
            },
            r: c.e.Ub
        };
        c.e.D = {};
        c.e.D.ja = function() {
            this.we = new c.e.D.Bn;
            this.xe = new c.e.D.Bn;
            this.gg = new c.h.El;
            this.bt = new c.h.El
        };
        c.e.D.ja.q = !0;
        c.e.D.ja.prototype = {
            Vs: function() {
                return (this.V & c.e.D.ja.Rm) == c.e.D.ja.Rm
            },
            UF: function() {
                return (this.V & c.e.D.ja.ip) == c.e.D.ja.ip
            },
            Zi: function() {
                return (this.V & c.e.D.ja.xs) == c.e.D.ja.xs
            },
            isEnabled: function() {
                return (this.V & c.e.D.ja.vs) == c.e.D.ja.vs
            },
            IE: function() {
                this.V |= c.e.D.ja.yv
            },
            reset: function(a, b) {
                this.V = c.e.D.ja.vs;
                if (null == a || null == b) this.Tc = this.Sc = null;
                else {
                    if (a.Zi() || b.Zi()) this.V |= c.e.D.ja.xs;
                    var d = a.Eb,
                        e = b.Eb;
                    if (d.Db() != c.e.aa.bg || d.Ts() || e.Db() != c.e.aa.bg || e.Ts()) this.V |= c.e.D.ja.ip;
                    this.Sc = a;
                    this.Tc = b;
                    this.gg.ed = 0;
                    this.ya = this.ye = null;
                    this.we.uc = null;
                    this.we.pd = null;
                    this.we.next = null;
                    this.we.oi = null;
                    this.xe.uc = null;
                    this.xe.pd = null;
                    this.xe.next = null;
                    this.xe.oi = null
                }
            },
            update: function(a) {
                var b = this.bt;
                this.bt = this.gg;
                this.gg = b;
                this.V |=
                    c.e.D.ja.vs;
                var d = !1,
                    b = (this.V & c.e.D.ja.Rm) == c.e.D.ja.Rm,
                    e = this.Sc.Eb,
                    g = this.Tc.Eb,
                    h = this.Sc.Wj.lj(this.Tc.Wj);
                if (0 != (this.V & c.e.D.ja.xs)) h && (d = this.Sc.Jc, h = this.Tc.Jc, e = e.pf(), g = g.pf(), d = c.h.S.Yd.lj(d, e, h, g)), this.gg.ed = 0;
                else {
                    this.V = e.Db() != c.e.aa.bg || e.Ts() || g.Db() != c.e.aa.bg || g.Ts() ? this.V | c.e.D.ja.ip : this.V & ~c.e.D.ja.ip;
                    if (h) {
                        this.evaluate();
                        for (var d = 0 < this.gg.ed, h = 0, l = this.gg.ed; h < l;) {
                            var m = h++,
                                m = this.gg.kb[m];
                            m.hl = 0;
                            m.ml = 0;
                            for (var n = m.Ng, f = 0, t = this.bt.ed; f < t;) {
                                var x = f++,
                                    x = this.bt.kb[x];
                                if (x.Ng.Ps() ==
                                    n.Ps()) {
                                    m.hl = x.hl;
                                    m.ml = x.ml;
                                    break
                                }
                            }
                        }
                    } else this.gg.ed = 0;
                    d != b && (e.zb(!0), g.zb(!0))
                }
                this.V = d ? this.V | c.e.D.ja.Rm : this.V & ~c.e.D.ja.Rm;
                !1 == b && !0 == d && a.pv(this);
                !0 == b && !1 == d && a.As(this)
            },
            evaluate: v(),
            PD: function(a, b) {
                c.e.D.ja.rn.gj.set(this.Sc.Jc);
                c.e.D.ja.rn.hj.set(this.Tc.Jc);
                c.e.D.ja.rn.fC = a;
                c.e.D.ja.rn.gC = b;
                c.e.D.ja.rn.TJ = c.f.F.Kb;
                return c.h.Ka.SJ(c.e.D.ja.rn)
            },
            r: c.e.D.ja
        };
        c.e.D.ui = function() {
            c.e.D.ja.call(this)
        };
        c.e.D.ui.q = !0;
        c.e.D.ui.create = function() {
            return new c.e.D.ui
        };
        c.e.D.ui.W = v();
        c.e.D.ui.N =
            c.e.D.ja;
        c.e.D.ui.prototype = s(c.e.D.ja.prototype, {
            reset: function(a, b) {
                c.e.D.ja.prototype.reset.call(this, a, b)
            },
            evaluate: function() {
                var a = this.Sc.Eb,
                    b = this.Tc.Eb;
                c.h.Aa.KD(this.gg, A.Ja.Fb(this.Sc.Jc, c.h.S.Nf), a.K, A.Ja.Fb(this.Tc.Jc, c.h.S.Nf), b.K)
            },
            r: c.e.D.ui
        });
        c.e.D.lq = function() {
            this.Ys = new c.f.g.A;
            this.bi = new c.f.g.A;
            this.Gc = new c.f.g.A;
            this.ln = new c.f.g.Ib;
            this.Zd = new c.f.g.Ib;
            this.Ld = [];
            for (var a = 0, b = c.f.F.Nj; a < b;) {
                var d = a++;
                this.Ld[d] = new c.e.D.mq
            }
        };
        c.e.D.lq.q = !0;
        c.e.D.lq.prototype = {
            r: c.e.D.lq
        };
        c.e.D.mq = function() {
            this.bi = new c.f.g.A;
            this.xb = new c.f.g.A;
            this.yb = new c.f.g.A
        };
        c.e.D.mq.q = !0;
        c.e.D.mq.prototype = {
            r: c.e.D.mq
        };
        c.e.D.Bn = v();
        c.e.D.Bn.q = !0;
        c.e.D.Bn.prototype = {
            r: c.e.D.Bn
        };
        c.e.D.nq = function(a) {
            this.Xj = a;
            this.RF()
        };
        c.e.D.nq.q = !0;
        c.e.D.nq.prototype = {
            $o: function(a, b, d, c) {
                var g = d[1],
                    h = c[1];
                this.mi[g][h].Gz = a;
                this.mi[g][h].Mz = b;
                this.mi[g][h].oB = !0;
                d != c && (this.mi[h][g].Gz = a, this.mi[h][g].Mz = b, this.mi[h][g].oB = !1)
            },
            RF: function() {
                this.mi = [];
                for (var a = 0, b = M.jz(c.h.S.rb).length; a < b;) {
                    var d = a++;
                    this.mi[d] = [];
                    for (var e = 0, g = M.jz(c.h.S.rb).length; e < g;) {
                        var h = e++;
                        this.mi[d][h] = new c.e.D.qq
                    }
                }
                this.$o(c.e.D.ui.create, c.e.D.ui.W, c.h.S.rb.qj, c.h.S.rb.qj);
                this.$o(c.e.D.wi.create, c.e.D.wi.W, c.h.S.rb.Ai, c.h.S.rb.qj);
                this.$o(c.e.D.yi.create, c.e.D.yi.W, c.h.S.rb.Ai, c.h.S.rb.Ai);
                this.$o(c.e.D.vi.create, c.e.D.vi.W, c.h.S.rb.Ml, c.h.S.rb.qj);
                this.$o(c.e.D.xi.create, c.e.D.xi.W, c.h.S.rb.Ai, c.h.S.rb.Ml)
            },
            create: function(a, b) {
                var d = this.mi[a.Db()[1]][b.Db()[1]],
                    c;
                if (null != d.jt) return c = d.jt, d.jt = c.ya, d.SH--, c.reset(a,
                    b), c;
                c = d.Gz;
                return null != c ? (d.oB ? (c = c(this.Xj), c.reset(a, b)) : (c = c(this.Xj), c.reset(b, a)), c) : null
            },
            W: function(a) {
                0 < a.gg.ed && (a.Sc.Eb.zb(!0), a.Tc.Eb.zb(!0));
                var b = this.mi[a.Sc.Db()[1]][a.Tc.Db()[1]];
                b.SH++;
                a.ya = b.jt;
                b.jt = a;
                b = b.Mz;
                b(a, this.Xj)
            },
            r: c.e.D.nq
        };
        c.e.D.qq = v();
        c.e.D.qq.q = !0;
        c.e.D.qq.prototype = {
            r: c.e.D.qq
        };
        c.e.D.Fl = function() {
            this.bb = new c.f.g.A;
            this.dt = [];
            this.kb = [];
            for (var a = 0, b = c.f.F.Nj; a < b;) {
                var d = a++;
                this.kb[d] = new c.f.g.A
            }
        };
        c.e.D.Fl.q = !0;
        c.e.D.Fl.prototype = {
            ge: function(a) {
                c.f.F.Ic(0 < a.ig);
                var b, d, e, g, h;
                switch (a.type[1]) {
                    case 0:
                        e = a.Cb.K.G;
                        d = a.bi;
                        b = a.Cb.K.position.x + (e.l.x * d.x + e.m.x * d.y);
                        g = a.Cb.K.position.y + (e.l.y * d.x + e.m.y * d.y);
                        e = a.Lb.K.G;
                        d = a.Ld[0].bi;
                        h = a.Lb.K.position.x + (e.l.x * d.x + e.m.x * d.y);
                        e = a.Lb.K.position.y + (e.l.y * d.x + e.m.y * d.y);
                        d = h - b;
                        var l = e - g,
                            m = d * d + l * l;
                        m > Number.MIN_VALUE * Number.MIN_VALUE ? (m = Math.sqrt(m), this.bb.x = d / m, this.bb.y = l / m) : (this.bb.x = 1, this.bb.y = 0);
                        this.kb[0].x = 0.5 * (b + h);
                        this.kb[0].y = 0.5 * (g + e);
                        this.dt[0] = d * this.bb.x + l * this.bb.y - a.Xw;
                        break;
                    case 1:
                        e = a.Cb.K.G;
                        d = a.Ys;
                        this.bb.x =
                            e.l.x * d.x + e.m.x * d.y;
                        this.bb.y = e.l.y * d.x + e.m.y * d.y;
                        e = a.Cb.K.G;
                        d = a.bi;
                        g = a.Cb.K.position.x + (e.l.x * d.x + e.m.x * d.y);
                        h = a.Cb.K.position.y + (e.l.y * d.x + e.m.y * d.y);
                        e = a.Lb.K.G;
                        l = 0;
                        for (m = a.ig; l < m;) {
                            var n = l++;
                            d = a.Ld[n].bi;
                            b = a.Lb.K.position.x + (e.l.x * d.x + e.m.x * d.y);
                            d = a.Lb.K.position.y + (e.l.y * d.x + e.m.y * d.y);
                            this.dt[n] = (b - g) * this.bb.x + (d - h) * this.bb.y - a.Xw;
                            this.kb[n].x = b;
                            this.kb[n].y = d
                        }
                        break;
                    case 2:
                        e = a.Lb.K.G;
                        d = a.Ys;
                        this.bb.x = e.l.x * d.x + e.m.x * d.y;
                        this.bb.y = e.l.y * d.x + e.m.y * d.y;
                        e = a.Lb.K.G;
                        d = a.bi;
                        g = a.Lb.K.position.x + (e.l.x *
                            d.x + e.m.x * d.y);
                        h = a.Lb.K.position.y + (e.l.y * d.x + e.m.y * d.y);
                        e = a.Cb.K.G;
                        l = 0;
                        for (m = a.ig; l < m;) n = l++, d = a.Ld[n].bi, b = a.Cb.K.position.x + (e.l.x * d.x + e.m.x * d.y), d = a.Cb.K.position.y + (e.l.y * d.x + e.m.y * d.y), this.dt[n] = (b - g) * this.bb.x + (d - h) * this.bb.y - a.Xw, this.kb[n].set(b, d);
                        this.bb.x *= -1;
                        this.bb.y *= -1
                }
            },
            r: c.e.D.Fl
        };
        c.e.D.ie = function() {
            this.nG = new c.e.Hl;
            this.fi = []
        };
        c.e.D.ie.q = !0;
        c.e.D.ie.prototype = {
            ge: function(a, b, d, e) {
                var g;
                this.nG.set(a);
                this.Xj = e;
                for (this.Ap = d; this.fi.length < this.Ap;) this.fi[this.fi.length] = new c.e.D.lq;
                for (a = 0; a < d;) {
                    e = a++;
                    g = b[e];
                    var h = g.Sc,
                        l = g.Tc,
                        m = h.Jc.Za,
                        n = l.Jc.Za,
                        f = h.Eb,
                        t = l.Eb;
                    g = g.gg;
                    var x = c.f.F.sD(h.kw, l.kw),
                        p = c.f.F.tD(h.sw, l.sw),
                        r = f.B.x,
                        s = f.B.y,
                        u = t.B.x,
                        D = t.B.y,
                        w = f.M,
                        A = t.M;
                    c.f.F.Ic(0 < g.ed);
                    c.e.D.ie.rl.ge(g, f.K, m, t.K, n);
                    h = c.e.D.ie.rl.bb.x;
                    l = c.e.D.ie.rl.bb.y;
                    e = this.fi[e];
                    e.Cb = f;
                    e.Lb = t;
                    e.sG = g;
                    e.Gc.x = h;
                    e.Gc.y = l;
                    e.ig = g.ed;
                    e.Ev = x;
                    e.cx = p;
                    e.Ys.x = g.he.x;
                    e.Ys.y = g.he.y;
                    e.bi.x = g.lb.x;
                    e.bi.y = g.lb.y;
                    e.Xw = m + n;
                    e.type = g.tb;
                    m = 0;
                    for (n = e.ig; m < n;) {
                        var y = m++,
                            p = g.kb[y],
                            x = e.Ld[y];
                        x.Kd = p.hl;
                        x.ri = p.ml;
                        x.bi.P(p.lb);
                        var p =
                            x.xb.x = c.e.D.ie.rl.kb[y].x - f.n.c.x,
                            B = x.xb.y = c.e.D.ie.rl.kb[y].y - f.n.c.y,
                            H = x.yb.x = c.e.D.ie.rl.kb[y].x - t.n.c.x,
                            y = x.yb.y = c.e.D.ie.rl.kb[y].y - t.n.c.y,
                            F = p * l - B * h,
                            G = H * l - y * h,
                            F = F * F,
                            G = G * G;
                        x.ln = 1 / (f.Y + t.Y + f.ia * F + t.ia * G);
                        var K = f.ga * f.Y + t.ga * t.Y,
                            K = K + (f.ga * f.ia * F + t.ga * t.ia * G);
                        x.CE = 1 / K;
                        G = l;
                        K = -h;
                        F = p * K - B * G;
                        G = H * K - y * G;
                        F *= F;
                        G *= G;
                        x.RJ = 1 / (f.Y + t.Y + f.ia * F + t.ia * G);
                        x.jq = 0;
                        p = e.Gc.x * (u + -A * y - r - -w * B) + e.Gc.y * (D + A * H - s - w * p);
                        p < -c.f.F.ED && (x.jq += -e.cx * p)
                    }
                    2 == e.ig && (D = e.Ld[0], u = e.Ld[1], g = f.Y, f = f.ia, r = t.Y, t = t.ia, s = D.xb.x * l - D.xb.y * h,
                        D = D.yb.x * l - D.yb.y * h, w = u.xb.x * l - u.xb.y * h, u = u.yb.x * l - u.yb.y * h, h = g + r + f * s * s + t * D * D, l = g + r + f * w * w + t * u * u, t = g + r + f * s * w + t * D * u, h * h < 100 * (h * l - t * t) ? (e.Zd.l.set(h, t), e.Zd.m.set(t, l), e.Zd.Mv(e.ln)) : e.ig = 1)
                }
            },
            fg: function(a) {
                for (var b = 0, d = this.Ap; b < d;) {
                    var c = b++,
                        c = this.fi[c],
                        g = c.Cb,
                        h = c.Lb,
                        l = g.Y,
                        m = g.ia,
                        f = h.Y,
                        q = h.ia,
                        t = c.Gc.x,
                        x = c.Gc.y,
                        p = x,
                        r = -t,
                        s;
                    if (a.Tg) {
                        s = c.ig;
                        for (var u = 0; u < s;) {
                            var D = u++,
                                D = c.Ld[D];
                            D.Kd *= a.cd;
                            D.ri *= a.cd;
                            var w = D.Kd * t + D.ri * p,
                                y = D.Kd * x + D.ri * r;
                            g.M -= m * (D.xb.x * y - D.xb.y * w);
                            g.B.x -= l * w;
                            g.B.y -= l * y;
                            h.M += q * (D.yb.x *
                                y - D.yb.y * w);
                            h.B.x += f * w;
                            h.B.y += f * y
                        }
                    } else
                        for (s = c.ig, g = 0; g < s;) h = g++, h = c.Ld[h], h.Kd = 0, h.ri = 0
                }
            },
            Mf: function() {
                for (var a, b, d, e, g, h, l, m, f, q, t = 0, x = this.Ap; t < x;) {
                    var p = t++;
                    e = this.fi[p];
                    var p = e.Cb,
                        r = e.Lb,
                        s = p.M,
                        u = r.M,
                        D = p.B,
                        w = r.B,
                        y = p.Y,
                        A = p.ia,
                        B = r.Y,
                        H = r.ia;
                    m = e.Gc.x;
                    var F = f = e.Gc.y,
                        G = -m;
                    q = e.Ev;
                    l = 0;
                    for (h = e.ig; l < h;) a = l++, a = e.Ld[a], b = w.x - u * a.yb.y - D.x + s * a.xb.y, d = w.y + u * a.yb.x - D.y - s * a.xb.x, b = b * F + d * G, b = a.RJ * -b, d = q * a.Kd, d = c.f.g.t.Gb(a.ri + b, -d, d), b = d - a.ri, g = b * F, b *= G, D.x -= y * g, D.y -= y * b, s -= A * (a.xb.x * b - a.xb.y * g), w.x += B * g, w.y +=
                        B * b, u += H * (a.yb.x * b - a.yb.y * g), a.ri = d;
                    if (1 == e.ig) a = e.Ld[0], b = w.x + -u * a.yb.y - D.x - -s * a.xb.y, d = w.y + u * a.yb.x - D.y - s * a.xb.x, e = b * m + d * f, b = -a.ln * (e - a.jq), d = a.Kd + b, 0 < d || (d = 0), b = d - a.Kd, g = b * m, b *= f, D.x -= y * g, D.y -= y * b, s -= A * (a.xb.x * b - a.xb.y * g), w.x += B * g, w.y += B * b, u += H * (a.yb.x * b - a.yb.y * g), a.Kd = d;
                    else {
                        a = e.Ld[0];
                        F = e.Ld[1];
                        h = a.Kd;
                        l = F.Kd;
                        g = (w.x - u * a.yb.y - D.x + s * a.xb.y) * m + (w.y + u * a.yb.x - D.y - s * a.xb.x) * f;
                        var K = (w.x - u * F.yb.y - D.x + s * F.xb.y) * m + (w.y + u * F.yb.x - D.y - s * F.xb.x) * f;
                        b = g - a.jq;
                        d = K - F.jq;
                        q = e.Zd;
                        b -= q.l.x * h + q.m.x * l;
                        for (d -= q.l.y * h +
                            q.m.y * l;;) {
                            q = e.ln;
                            G = -(q.l.x * b + q.m.x * d);
                            q = -(q.l.y * b + q.m.y * d);
                            if (0 <= G && 0 <= q) {
                                h = G - h;
                                l = q - l;
                                e = h * m;
                                h *= f;
                                m *= l;
                                f *= l;
                                D.x -= y * (e + m);
                                D.y -= y * (h + f);
                                s -= A * (a.xb.x * h - a.xb.y * e + F.xb.x * f - F.xb.y * m);
                                w.x += B * (e + m);
                                w.y += B * (h + f);
                                u += H * (a.yb.x * h - a.yb.y * e + F.yb.x * f - F.yb.y * m);
                                a.Kd = G;
                                F.Kd = q;
                                break
                            }
                            G = -a.ln * b;
                            q = 0;
                            K = e.Zd.l.y * G + d;
                            if (0 <= G && 0 <= K) {
                                h = G - h;
                                l = q - l;
                                e = h * m;
                                h *= f;
                                m *= l;
                                f *= l;
                                D.x -= y * (e + m);
                                D.y -= y * (h + f);
                                s -= A * (a.xb.x * h - a.xb.y * e + F.xb.x * f - F.xb.y * m);
                                w.x += B * (e + m);
                                w.y += B * (h + f);
                                u += H * (a.yb.x * h - a.yb.y * e + F.yb.x * f - F.yb.y * m);
                                a.Kd = G;
                                F.Kd = q;
                                break
                            }
                            G =
                                0;
                            q = -F.ln * d;
                            g = e.Zd.m.x * q + b;
                            if (0 <= q && 0 <= g) {
                                h = G - h;
                                l = q - l;
                                e = h * m;
                                h *= f;
                                m *= l;
                                f *= l;
                                D.x -= y * (e + m);
                                D.y -= y * (h + f);
                                s -= A * (a.xb.x * h - a.xb.y * e + F.xb.x * f - F.xb.y * m);
                                w.x += B * (e + m);
                                w.y += B * (h + f);
                                u += H * (a.yb.x * h - a.yb.y * e + F.yb.x * f - F.yb.y * m);
                                a.Kd = G;
                                F.Kd = q;
                                break
                            }
                            q = G = 0;
                            g = b;
                            K = d;
                            if (0 <= g && 0 <= K) {
                                h = G - h;
                                l = q - l;
                                e = h * m;
                                h *= f;
                                m *= l;
                                f *= l;
                                D.x -= y * (e + m);
                                D.y -= y * (h + f);
                                s -= A * (a.xb.x * h - a.xb.y * e + F.xb.x * f - F.xb.y * m);
                                w.x += B * (e + m);
                                w.y += B * (h + f);
                                u += H * (a.yb.x * h - a.yb.y * e + F.yb.x * f - F.yb.y * m);
                                a.Kd = G;
                                F.Kd = q;
                                break
                            }
                            break
                        }
                    }
                    p.M = s;
                    r.M = u
                }
            },
            Cv: function() {
                for (var a = 0, b =
                        this.Ap; a < b;)
                    for (var d = a++, d = this.fi[d], c = d.sG, g = 0, h = d.ig; g < h;) {
                        var l = g++,
                            m = c.kb[l],
                            l = d.Ld[l];
                        m.hl = l.Kd;
                        m.ml = l.ri
                    }
            },
            Lf: function(a) {
                for (var b = 0, d = 0, e = this.Ap; d < e;) {
                    var g = d++,
                        g = this.fi[g],
                        h = g.Cb,
                        l = g.Lb,
                        m = h.ga * h.Y,
                        f = h.ga * h.ia,
                        q = l.ga * l.Y,
                        t = l.ga * l.ia;
                    c.e.D.ie.mt.ge(g);
                    for (var x = c.e.D.ie.mt.bb, p = 0, r = g.ig; p < r;) {
                        var s = p++,
                            u = g.Ld[s],
                            w = c.e.D.ie.mt.kb[s],
                            y = c.e.D.ie.mt.dt[s],
                            s = w.x - h.n.c.x,
                            A = w.y - h.n.c.y,
                            B = w.x - l.n.c.x,
                            w = w.y - l.n.c.y;
                        b < y || (b = y);
                        y = -u.CE * c.f.g.t.Gb(a * (y + c.f.F.Kb), -c.f.F.Cf, 0);
                        u = y * x.x;
                        y *= x.y;
                        h.n.c.x -=
                            m * u;
                        h.n.c.y -= m * y;
                        h.n.a -= f * (s * y - A * u);
                        h.Yc();
                        l.n.c.x += q * u;
                        l.n.c.y += q * y;
                        l.n.a += t * (B * y - w * u);
                        l.Yc()
                    }
                }
                return b > -1.5 * c.f.F.Kb
            },
            r: c.e.D.ie
        };
        c.e.D.vi = function() {
            c.e.D.ja.call(this)
        };
        c.e.D.vi.q = !0;
        c.e.D.vi.create = function() {
            return new c.e.D.vi
        };
        c.e.D.vi.W = v();
        c.e.D.vi.N = c.e.D.ja;
        c.e.D.vi.prototype = s(c.e.D.ja.prototype, {
            reset: function(a, b) {
                c.e.D.ja.prototype.reset.call(this, a, b)
            },
            evaluate: function() {
                A.Ja.Fb(this.Sc.Jc, c.h.S.nk);
                A.Ja.Fb(this.Tc.Jc, c.h.S.Nf)
            },
            iN: v(),
            r: c.e.D.vi
        });
        c.e.D.wi = function() {
            c.e.D.ja.call(this)
        };
        c.e.D.wi.q = !0;
        c.e.D.wi.create = function() {
            return new c.e.D.wi
        };
        c.e.D.wi.W = v();
        c.e.D.wi.N = c.e.D.ja;
        c.e.D.wi.prototype = s(c.e.D.ja.prototype, {
            reset: function(a, b) {
                c.e.D.ja.prototype.reset.call(this, a, b);
                c.f.F.Ic(a.Db() == c.h.S.rb.Ai);
                c.f.F.Ic(b.Db() == c.h.S.rb.qj)
            },
            evaluate: function() {
                var a = this.Sc.Eb,
                    b = this.Tc.Eb;
                c.h.Aa.LD(this.gg, A.Ja.Fb(this.Sc.Jc, c.h.S.Bc), a.K, A.Ja.Fb(this.Tc.Jc, c.h.S.Nf), b.K)
            },
            r: c.e.D.wi
        });
        c.e.D.xi = function() {
            c.e.D.ja.call(this)
        };
        c.e.D.xi.q = !0;
        c.e.D.xi.create = function() {
            return new c.e.D.xi
        };
        c.e.D.xi.W = v();
        c.e.D.xi.N = c.e.D.ja;
        c.e.D.xi.prototype = s(c.e.D.ja.prototype, {
            reset: function(a, b) {
                c.e.D.ja.prototype.reset.call(this, a, b);
                c.f.F.Ic(a.Db() == c.h.S.rb.Ai);
                c.f.F.Ic(b.Db() == c.h.S.rb.Ml)
            },
            evaluate: function() {
                A.Ja.Fb(this.Sc.Jc, c.h.S.Bc);
                A.Ja.Fb(this.Tc.Jc, c.h.S.nk)
            },
            jN: v(),
            r: c.e.D.xi
        });
        c.e.D.yi = function() {
            c.e.D.ja.call(this)
        };
        c.e.D.yi.q = !0;
        c.e.D.yi.create = function() {
            return new c.e.D.yi
        };
        c.e.D.yi.W = v();
        c.e.D.yi.N = c.e.D.ja;
        c.e.D.yi.prototype = s(c.e.D.ja.prototype, {
            reset: function(a, b) {
                c.e.D.ja.prototype.reset.call(this,
                    a, b)
            },
            evaluate: function() {
                var a = this.Sc.Eb,
                    b = this.Tc.Eb;
                c.h.Aa.MD(this.gg, A.Ja.Fb(this.Sc.Jc, c.h.S.Bc), a.K, A.Ja.Fb(this.Tc.Jc, c.h.S.Bc), b.K)
            },
            r: c.e.D.yi
        });
        c.e.controllers = {};
        c.e.controllers.zt = v();
        c.e.controllers.zt.q = !0;
        c.e.controllers.zt.prototype = {
            step: v(),
            iv: function(a) {
                var b = new c.e.controllers.rq;
                b.Ez = this;
                b.body = a;
                b.ol = this.Vd;
                b.Tp = null;
                this.Vd = b;
                null != b.ol && (b.ol.Tp = b);
                this.Le++;
                b.ej = a.aj;
                b.Up = null;
                a.aj = b;
                null != b.ej && (b.ej.Up = b);
                a.gw++
            },
            rB: function(a) {
                for (var b = a.aj; null != b && b.Ez != this;) b =
                    b.ej;
                null != b.Tp && (b.Tp.ol = b.ol);
                null != b.ol && (b.ol.Tp = b.Tp);
                null != b.ej && (b.ej.Up = b.Up);
                null != b.Up && (b.Up.ej = b.ej);
                this.Vd == b && (this.Vd = b.ol);
                a.aj == b && (a.aj = b.ej);
                a.gw--;
                this.Le--
            },
            clear: function() {
                for (; null != this.Vd;) this.rB(this.Vd.body)
            },
            r: c.e.controllers.zt
        };
        c.e.controllers.rq = v();
        c.e.controllers.rq.q = !0;
        c.e.controllers.rq.prototype = {
            r: c.e.controllers.rq
        };
        c.e.p = {};
        c.e.p.Hb = function(a) {
            this.gi = new c.e.p.Ln;
            this.hi = new c.e.p.Ln;
            this.ki = new c.f.g.A;
            this.li = new c.f.g.A;
            c.f.F.Ic(a.Cb != a.Lb);
            this.tb =
                a.type;
            this.ya = this.ye = null;
            this.Ca = a.Cb;
            this.na = a.Lb;
            this.PA = a.Az;
            this.dl = !1;
            this.ck = a.mj
        };
        c.e.p.Hb.q = !0;
        c.e.p.Hb.create = function(a) {
            var b = null;
            switch (a.type[1]) {
                case 3:
                    b = new c.e.p.Dn(A.Ja.Fb(a, c.e.p.En));
                    break;
                case 5:
                    b = new c.e.p.Pn(A.Ja.Fb(a, c.e.p.Qn));
                    break;
                case 2:
                    b = new c.e.p.rk(A.Ja.Fb(a, c.e.p.Rn));
                    break;
                case 1:
                    b = new c.e.p.Wg(A.Ja.Fb(a, c.e.p.Un));
                    break;
                case 4:
                    b = new c.e.p.Vg(A.Ja.Fb(a, c.e.p.Sn));
                    break;
                case 6:
                    b = new c.e.p.Jn(A.Ja.Fb(a, c.e.p.Kn));
                    break;
                case 7:
                    b = new c.e.p.Mn(A.Ja.Fb(a, c.e.p.Nn));
                    break;
                case 8:
                    b = new c.e.p.Vn(A.Ja.Fb(a, c.e.p.Wn));
                    break;
                case 9:
                    b = new c.e.p.Hn(A.Ja.Fb(a, c.e.p.In))
            }
            return b
        };
        c.e.p.Hb.W = v();
        c.e.p.Hb.prototype = {
            Db: C("tb"),
            Xh: I(null),
            Yh: I(null),
            Wi: I(null),
            Xi: I(0),
            getUserData: C("ck"),
            setUserData: z("ck"),
            ai: function() {
                return this.Ca.ai() && this.na.ai()
            },
            fg: v(),
            Mf: v(),
            Cv: v(),
            Lf: I(!1),
            r: c.e.p.Hb
        };
        c.e.p.Dn = function(a) {
            c.e.p.Hb.call(this, a);
            this.ra = new c.f.g.A;
            this.va = new c.f.g.A;
            this.nd = new c.f.g.A;
            this.ra.P(a.yd);
            this.va.P(a.zd);
            this.en = a.length;
            this.cj = a.Es;
            this.cl = a.ss;
            this.OA =
                this.Oe = this.v = 0
        };
        c.e.p.Dn.q = !0;
        c.e.p.Dn.N = c.e.p.Hb;
        c.e.p.Dn.prototype = s(c.e.p.Hb.prototype, {
            Xh: function() {
                return this.Ca.md(this.ra)
            },
            Yh: function() {
                return this.na.md(this.va)
            },
            Wi: function(a) {
                return new c.f.g.A(a * this.v * this.nd.x, a * this.v * this.nd.y)
            },
            Xi: I(0),
            xd: C("en"),
            rR: z("en"),
            ZE: C("cj"),
            YI: z("cj"),
            TE: C("cl"),
            SI: z("cl"),
            fg: function(a) {
                var b, d, e = this.Ca,
                    g = this.na;
                b = e.K.G;
                var h = this.ra.x - e.n.X.x,
                    l = this.ra.y - e.n.X.y;
                d = b.l.x * h + b.m.x * l;
                l = b.l.y * h + b.m.y * l;
                h = d;
                b = g.K.G;
                var m = this.va.x - g.n.X.x,
                    f = this.va.y -
                    g.n.X.y;
                d = b.l.x * m + b.m.x * f;
                f = b.l.y * m + b.m.y * f;
                m = d;
                this.nd.x = g.n.c.x + m - e.n.c.x - h;
                this.nd.y = g.n.c.y + f - e.n.c.y - l;
                d = Math.sqrt(this.nd.x * this.nd.x + this.nd.y * this.nd.y);
                d > c.f.F.Kb ? this.nd.multiply(1 / d) : this.nd.hb();
                b = h * this.nd.y - l * this.nd.x;
                var q = m * this.nd.y - f * this.nd.x;
                b = e.Y + e.ia * b * b + g.Y + g.ia * q * q;
                this.ga = 0 != b ? 1 / b : 0;
                if (0 < this.cj) {
                    d -= this.en;
                    var q = 2 * Math.PI * this.cj,
                        t = this.ga * q * q;
                    this.Oe = a.qb * (2 * this.ga * this.cl * q + a.qb * t);
                    this.Oe = 0 != this.Oe ? 1 / this.Oe : 0;
                    this.OA = d * a.qb * t * this.Oe;
                    this.ga = b + this.Oe;
                    this.ga = 0 != this.ga ?
                        1 / this.ga : 0
                }
                a.Tg ? (this.v *= a.cd, a = this.v * this.nd.x, b = this.v * this.nd.y, e.B.x -= e.Y * a, e.B.y -= e.Y * b, e.M -= e.ia * (h * b - l * a), g.B.x += g.Y * a, g.B.y += g.Y * b, g.M += g.ia * (m * b - f * a)) : this.v = 0
            },
            Mf: function() {
                var a, b = this.Ca,
                    d = this.na;
                a = b.K.G;
                var c = this.ra.x - b.n.X.x,
                    g = this.ra.y - b.n.X.y,
                    h = a.l.x * c + a.m.x * g,
                    g = a.l.y * c + a.m.y * g,
                    c = h;
                a = d.K.G;
                var l = this.va.x - d.n.X.x,
                    m = this.va.y - d.n.X.y,
                    h = a.l.x * l + a.m.x * m,
                    m = a.l.y * l + a.m.y * m,
                    l = h,
                    h = -this.ga * (this.nd.x * (d.B.x + -d.M * m - (b.B.x + -b.M * g)) + this.nd.y * (d.B.y + d.M * l - (b.B.y + b.M * c)) + this.OA + this.Oe *
                        this.v);
                this.v += h;
                a = h * this.nd.x;
                h *= this.nd.y;
                b.B.x -= b.Y * a;
                b.B.y -= b.Y * h;
                b.M -= b.ia * (c * h - g * a);
                d.B.x += d.Y * a;
                d.B.y += d.Y * h;
                d.M += d.ia * (l * h - m * a)
            },
            Lf: function() {
                var a;
                if (0 < this.cj) return !0;
                var b = this.Ca,
                    d = this.na;
                a = b.K.G;
                var e = this.ra.x - b.n.X.x,
                    g = this.ra.y - b.n.X.y,
                    h = a.l.x * e + a.m.x * g,
                    g = a.l.y * e + a.m.y * g,
                    e = h;
                a = d.K.G;
                var l = this.va.x - d.n.X.x,
                    m = this.va.y - d.n.X.y,
                    h = a.l.x * l + a.m.x * m,
                    m = a.l.y * l + a.m.y * m,
                    l = h,
                    f = d.n.c.x + l - b.n.c.x - e,
                    q = d.n.c.y + m - b.n.c.y - g,
                    t = Math.sqrt(f * f + q * q);
                a = t - this.en;
                a = c.f.g.t.Gb(a, -c.f.F.Cf, c.f.F.Cf);
                h = -this.ga * a;
                this.nd.set(f / t, q / t);
                f = h * this.nd.x;
                h *= this.nd.y;
                b.n.c.x -= b.Y * f;
                b.n.c.y -= b.Y * h;
                b.n.a -= b.ia * (e * h - g * f);
                d.n.c.x += d.Y * f;
                d.n.c.y += d.Y * h;
                d.n.a += d.ia * (l * h - m * f);
                b.Yc();
                d.Yc();
                return c.f.g.t.abs(a) < c.f.F.Kb
            },
            r: c.e.p.Dn
        });
        c.e.p.kc = function() {
            this.type = c.e.p.Ia.Nt;
            this.Lb = this.Cb = this.mj = null;
            this.Az = !1
        };
        c.e.p.kc.q = !0;
        c.e.p.kc.prototype = {
            r: c.e.p.kc
        };
        c.e.p.En = function() {
            c.e.p.kc.call(this);
            this.yd = new c.f.g.A;
            this.zd = new c.f.g.A;
            this.type = c.e.p.Ia.Dt;
            this.length = 1;
            this.ss = this.Es = 0
        };
        c.e.p.En.q = !0;
        c.e.p.En.N =
            c.e.p.kc;
        c.e.p.En.prototype = s(c.e.p.kc.prototype, {
            ge: function(a, b, d, c) {
                this.Cb = a;
                this.Lb = b;
                this.yd.P(this.Cb.Ff(d));
                this.zd.P(this.Lb.Ff(c));
                a = c.x - d.x;
                d = c.y - d.y;
                this.length = Math.sqrt(a * a + d * d);
                this.ss = this.Es = 0
            },
            r: c.e.p.En
        });
        c.e.p.Hn = function(a) {
            c.e.p.Hb.call(this, a);
            this.tf = new c.f.g.A;
            this.uf = new c.f.g.A;
            this.pw = new c.f.g.Ib;
            this.sf = new c.f.g.A;
            this.tf.P(a.yd);
            this.uf.P(a.zd);
            this.pw.hb();
            this.zp = 0;
            this.sf.hb();
            this.ci = 0;
            this.gl = a.xw;
            this.rw = a.uG
        };
        c.e.p.Hn.q = !0;
        c.e.p.Hn.N = c.e.p.Hb;
        c.e.p.Hn.prototype =
            s(c.e.p.Hb.prototype, {
                Xh: function() {
                    return this.Ca.md(this.tf)
                },
                Yh: function() {
                    return this.na.md(this.uf)
                },
                Wi: function(a) {
                    return new c.f.g.A(a * this.sf.x, a * this.sf.y)
                },
                Xi: function(a) {
                    return a * this.ci
                },
                iJ: z("gl"),
                kF: C("gl"),
                AR: z("rw"),
                tP: C("rw"),
                fg: function(a) {
                    var b, d, e = this.Ca,
                        g = this.na;
                    b = e.K.G;
                    var h = this.tf.x - e.n.X.x,
                        l = this.tf.y - e.n.X.y;
                    d = b.l.x * h + b.m.x * l;
                    l = b.l.y * h + b.m.y * l;
                    h = d;
                    b = g.K.G;
                    var m = this.uf.x - g.n.X.x,
                        f = this.uf.y - g.n.X.y;
                    d = b.l.x * m + b.m.x * f;
                    f = b.l.y * m + b.m.y * f;
                    m = d;
                    b = e.Y;
                    d = g.Y;
                    var q = e.ia,
                        t = g.ia,
                        x =
                        new c.f.g.Ib;
                    x.l.x = b + d;
                    x.m.x = 0;
                    x.l.y = 0;
                    x.m.y = b + d;
                    x.l.x += q * l * l;
                    x.m.x += -q * h * l;
                    x.l.y += -q * h * l;
                    x.m.y += q * h * h;
                    x.l.x += t * f * f;
                    x.m.x += -t * m * f;
                    x.l.y += -t * m * f;
                    x.m.y += t * m * m;
                    x.Mv(this.pw);
                    this.zp = q + t;
                    0 < this.zp && (this.zp = 1 / this.zp);
                    a.Tg ? (this.sf.x *= a.cd, this.sf.y *= a.cd, this.ci *= a.cd, a = this.sf, e.B.x -= b * a.x, e.B.y -= b * a.y, e.M -= q * (h * a.y - l * a.x + this.ci), g.B.x += d * a.x, g.B.y += d * a.y, g.M += t * (m * a.y - f * a.x + this.ci)) : (this.sf.hb(), this.ci = 0)
                },
                Mf: function(a) {
                    var b, d, e = this.Ca,
                        g = this.na,
                        h = e.B,
                        l = e.M,
                        m = g.B,
                        f = g.M,
                        q = e.Y,
                        t = g.Y,
                        x = e.ia,
                        p =
                        g.ia;
                    b = e.K.G;
                    var r = this.tf.x - e.n.X.x,
                        s = this.tf.y - e.n.X.y;
                    d = b.l.x * r + b.m.x * s;
                    s = b.l.y * r + b.m.y * s;
                    r = d;
                    b = g.K.G;
                    var u = this.uf.x - g.n.X.x,
                        w = this.uf.y - g.n.X.y;
                    d = b.l.x * u + b.m.x * w;
                    w = b.l.y * u + b.m.y * w;
                    u = d;
                    d = -this.zp * (f - l);
                    var y = this.ci;
                    b = a.qb * this.rw;
                    this.ci = c.f.g.t.Gb(this.ci + d, -b, b);
                    d = this.ci - y;
                    l -= x * d;
                    f += p * d;
                    b = c.f.g.t.ze(this.pw, new c.f.g.A(-(m.x - f * w - h.x + l * s), -(m.y + f * u - h.y - l * r)));
                    d = this.sf.copy();
                    this.sf.add(b);
                    b = a.qb * this.gl;
                    this.sf.Ws() > b * b && (this.sf.normalize(), this.sf.multiply(b));
                    b = c.f.g.t.Ac(this.sf, d);
                    h.x -=
                        q * b.x;
                    h.y -= q * b.y;
                    l -= x * (r * b.y - s * b.x);
                    m.x += t * b.x;
                    m.y += t * b.y;
                    f += p * (u * b.y - w * b.x);
                    e.M = l;
                    g.M = f
                },
                Lf: I(!0),
                r: c.e.p.Hn
            });
        c.e.p.In = function() {
            c.e.p.kc.call(this);
            this.yd = new c.f.g.A;
            this.zd = new c.f.g.A;
            this.type = c.e.p.Ia.Gt;
            this.uG = this.xw = 0
        };
        c.e.p.In.q = !0;
        c.e.p.In.N = c.e.p.kc;
        c.e.p.In.prototype = s(c.e.p.kc.prototype, {
            ge: function(a, b, d) {
                this.Cb = a;
                this.Lb = b;
                this.yd.P(this.Cb.Ff(d));
                this.zd.P(this.Lb.Ff(d))
            },
            r: c.e.p.In
        });
        c.e.p.Jn = function(a) {
            c.e.p.Hb.call(this, a);
            this.Lg = new c.f.g.A;
            this.Mg = new c.f.g.A;
            this.ra =
                new c.f.g.A;
            this.va = new c.f.g.A;
            this.ic = new c.e.p.wq;
            var b = a.xp.tb,
                d = a.yp.tb;
            this.kn = this.kl = this.jn = this.jl = null;
            this.gG = a.xp.Ca;
            this.Ca = a.xp.na;
            b == c.e.p.Ia.so ? (this.jl = A.Ja.Fb(a.xp, c.e.p.Wg), this.Lg.P(this.jl.ra), this.ra.P(this.jl.va), b = this.jl.Ks()) : (this.jn = A.Ja.Fb(a.xp, c.e.p.rk), this.Lg.P(this.jn.ra), this.ra.P(this.jn.va), b = this.jn.pp());
            this.hG = a.yp.Ca;
            this.na = a.yp.na;
            d == c.e.p.Ia.so ? (this.kl = A.Ja.Fb(a.yp, c.e.p.Wg), this.Mg.P(this.kl.ra), this.va.P(this.kl.va), d = this.kl.Ks()) : (this.kn = A.Ja.Fb(a.yp,
                c.e.p.rk), this.Mg.P(this.kn.ra), this.va.P(this.kn.va), d = this.kn.pp());
            this.yc = a.ql;
            this.bn = b + this.yc * d;
            this.v = 0
        };
        c.e.p.Jn.q = !0;
        c.e.p.Jn.N = c.e.p.Hb;
        c.e.p.Jn.prototype = s(c.e.p.Hb.prototype, {
            Xh: function() {
                return this.Ca.md(this.ra)
            },
            Yh: function() {
                return this.na.md(this.va)
            },
            Wi: function(a) {
                return new c.f.g.A(a * this.v * this.ic.qf.x, a * this.v * this.ic.qf.y)
            },
            Xi: function(a) {
                var b = this.na.K.G,
                    d = this.ra.x - this.na.n.X.x,
                    c = this.ra.y - this.na.n.X.y,
                    g = b.l.x * d + b.m.x * c,
                    c = b.l.y * d + b.m.y * c;
                return a * (this.v * this.ic.Mj -
                    g * this.v * this.ic.qf.y + c * this.v * this.ic.qf.x)
            },
            sF: C("yc"),
            PR: z("yc"),
            fg: function(a) {
                var b = this.gG,
                    d = this.hG,
                    c = this.Ca,
                    g = this.na,
                    h, l, m, f, q, t = 0;
                this.ic.hb();
                null != this.jl ? (this.ic.Pk = -1, t += c.ia) : (f = b.K.G, h = this.jn.Re, b = f.l.x * h.x + f.m.x * h.y, h = f.l.y * h.x + f.m.y * h.y, f = c.K.G, l = this.ra.x - c.n.X.x, m = this.ra.y - c.n.X.y, q = f.l.x * l + f.m.x * m, m = f.l.y * l + f.m.y * m, f = q * h - m * b, this.ic.ph.set(-b, -h), this.ic.Pk = -f, t += c.Y + c.ia * f * f);
                null != this.kl ? (this.ic.Mj = -this.yc, t += this.yc * this.yc * g.ia) : (f = d.K.G, h = this.kn.Re, b = f.l.x * h.x + f.m.x *
                    h.y, h = f.l.y * h.x + f.m.y * h.y, f = g.K.G, l = this.va.x - g.n.X.x, m = this.va.y - g.n.X.y, q = f.l.x * l + f.m.x * m, m = f.l.y * l + f.m.y * m, f = q * h - m * b, this.ic.qf.set(-this.yc * b, -this.yc * h), this.ic.Mj = -this.yc * f, t += this.yc * this.yc * (g.Y + g.ia * f * f));
                this.ga = 0 < t ? 1 / t : 0;
                a.Tg ? (c.B.x += c.Y * this.v * this.ic.ph.x, c.B.y += c.Y * this.v * this.ic.ph.y, c.M += c.ia * this.v * this.ic.Pk, g.B.x += g.Y * this.v * this.ic.qf.x, g.B.y += g.Y * this.v * this.ic.qf.y, g.M += g.ia * this.v * this.ic.Mj) : this.v = 0
            },
            Mf: function() {
                var a = this.Ca,
                    b = this.na,
                    d = -this.ga * this.ic.ND(a.B, a.M, b.B,
                        b.M);
                this.v += d;
                a.B.x += a.Y * d * this.ic.ph.x;
                a.B.y += a.Y * d * this.ic.ph.y;
                a.M += a.ia * d * this.ic.Pk;
                b.B.x += b.Y * d * this.ic.qf.x;
                b.B.y += b.Y * d * this.ic.qf.y;
                b.M += b.ia * d * this.ic.Mj
            },
            Lf: function() {
                var a = this.Ca,
                    b = this.na,
                    d, e;
                d = null != this.jl ? this.jl.Ks() : this.jn.pp();
                e = null != this.kl ? this.kl.Ks() : this.kn.pp();
                d = -this.ga * (this.bn - (d + this.yc * e));
                a.n.c.x += a.Y * d * this.ic.ph.x;
                a.n.c.y += a.Y * d * this.ic.ph.y;
                a.n.a += a.ia * d * this.ic.Pk;
                b.n.c.x += b.Y * d * this.ic.qf.x;
                b.n.c.y += b.Y * d * this.ic.qf.y;
                b.n.a += b.ia * d * this.ic.Mj;
                a.Yc();
                b.Yc();
                return 0 < c.f.F.Kb
            },
            r: c.e.p.Jn
        });
        c.e.p.Kn = function() {
            c.e.p.kc.call(this);
            this.type = c.e.p.Ia.Ht;
            this.yp = this.xp = null;
            this.ql = 1
        };
        c.e.p.Kn.q = !0;
        c.e.p.Kn.N = c.e.p.kc;
        c.e.p.Kn.prototype = s(c.e.p.kc.prototype, {
            r: c.e.p.Kn
        });
        c.e.p.wq = function() {
            this.ph = new c.f.g.A;
            this.qf = new c.f.g.A
        };
        c.e.p.wq.q = !0;
        c.e.p.wq.prototype = {
            hb: function() {
                this.ph.hb();
                this.Pk = 0;
                this.qf.hb();
                this.Mj = 0
            },
            set: function(a, b, d, c) {
                this.ph.P(a);
                this.Pk = b;
                this.qf.P(d);
                this.Mj = c
            },
            ND: function(a, b, d, c) {
                return this.ph.x * a.x + this.ph.y * a.y + this.Pk *
                    b + (this.qf.x * d.x + this.qf.y * d.y) + this.Mj * c
            },
            r: c.e.p.wq
        };
        c.e.p.Ln = v();
        c.e.p.Ln.q = !0;
        c.e.p.Ln.prototype = {
            r: c.e.p.Ln
        };
        c.e.p.Ia = {
            rg: !0,
            yj: "UNKNOWN_JOINT REVOLUTE_JOINT PRISMATIC_JOINT DISTANCE_JOINT PULLEY_JOINT MOUSE_JOINT GEAR_JOINT LINE_JOINT WELD_JOINT FRICTION_JOINT".split(" ")
        };
        c.e.p.Ia.Nt = ["UNKNOWN_JOINT", 0];
        c.e.p.Ia.Nt.mb = c.e.p.Ia;
        c.e.p.Ia.so = ["REVOLUTE_JOINT", 1];
        c.e.p.Ia.so.mb = c.e.p.Ia;
        c.e.p.Ia.Kt = ["PRISMATIC_JOINT", 2];
        c.e.p.Ia.Kt.mb = c.e.p.Ia;
        c.e.p.Ia.Dt = ["DISTANCE_JOINT", 3];
        c.e.p.Ia.Dt.mb = c.e.p.Ia;
        c.e.p.Ia.Lt = ["PULLEY_JOINT", 4];
        c.e.p.Ia.Lt.mb = c.e.p.Ia;
        c.e.p.Ia.Jt = ["MOUSE_JOINT", 5];
        c.e.p.Ia.Jt.mb = c.e.p.Ia;
        c.e.p.Ia.Ht = ["GEAR_JOINT", 6];
        c.e.p.Ia.Ht.mb = c.e.p.Ia;
        c.e.p.Ia.It = ["LINE_JOINT", 7];
        c.e.p.Ia.It.mb = c.e.p.Ia;
        c.e.p.Ia.Pt = ["WELD_JOINT", 8];
        c.e.p.Ia.Pt.mb = c.e.p.Ia;
        c.e.p.Ia.Gt = ["FRICTION_JOINT", 9];
        c.e.p.Ia.Gt.mb = c.e.p.Ia;
        c.e.p.Ia.Ei = [c.e.p.Ia.Nt, c.e.p.Ia.so, c.e.p.Ia.Kt, c.e.p.Ia.Dt, c.e.p.Ia.Lt, c.e.p.Ia.Jt, c.e.p.Ia.Ht, c.e.p.Ia.It, c.e.p.Ia.Pt, c.e.p.Ia.Gt];
        c.e.p.ka = {
            rg: !0,
            yj: ["INACTIVE_LIMIT", "AT_LOWER_LIMIT",
                "AT_UPPER_LIMIT", "EQUAL_LIMITS"
            ]
        };
        c.e.p.ka.me = ["INACTIVE_LIMIT", 0];
        c.e.p.ka.me.mb = c.e.p.ka;
        c.e.p.ka.kg = ["AT_LOWER_LIMIT", 1];
        c.e.p.ka.kg.mb = c.e.p.ka;
        c.e.p.ka.Ad = ["AT_UPPER_LIMIT", 2];
        c.e.p.ka.Ad.mb = c.e.p.ka;
        c.e.p.ka.Eh = ["EQUAL_LIMITS", 3];
        c.e.p.ka.Eh.mb = c.e.p.ka;
        c.e.p.ka.Ei = [c.e.p.ka.me, c.e.p.ka.kg, c.e.p.ka.Ad, c.e.p.ka.Eh];
        c.e.p.Mn = function(a) {
            c.e.p.Hb.call(this, a);
            this.ra = new c.f.g.A;
            this.va = new c.f.g.A;
            this.Re = new c.f.g.A;
            this.dj = new c.f.g.A;
            this.fa = new c.f.g.A;
            this.Na = new c.f.g.A;
            this.Ma = new c.f.g.Ib;
            this.v = new c.f.g.A;
            this.ra.P(a.yd);
            this.va.P(a.zd);
            this.Re.P(a.$k);
            this.dj.x = -this.Re.y;
            this.dj.y = this.Re.x;
            this.v.hb();
            this.jb = this.cf = 0;
            this.Se = a.ew;
            this.Te = a.Gx;
            this.hn = a.yw;
            this.th = a.Kp;
            this.Ne = a.Sj;
            this.Gf = a.Tj;
            this.nb = c.e.p.ka.me;
            this.fa.hb();
            this.Na.hb()
        };
        c.e.p.Mn.q = !0;
        c.e.p.Mn.N = c.e.p.Hb;
        c.e.p.Mn.prototype = s(c.e.p.Hb.prototype, {
            Xh: function() {
                return this.Ca.md(this.ra)
            },
            Yh: function() {
                return this.na.md(this.va)
            },
            Wi: function(a) {
                return new c.f.g.A(a * (this.v.x * this.Na.x + (this.jb + this.v.y) * this.fa.x),
                    a * (this.v.x * this.Na.y + (this.jb + this.v.y) * this.fa.y))
            },
            Xi: function(a) {
                return a * this.v.y
            },
            pp: function() {
                var a = this.Ca,
                    b = this.na,
                    d = a.md(this.ra),
                    b = b.md(this.va),
                    a = a.Os(this.Re);
                return a.x * (b.x - d.x) + a.y * (b.y - d.y)
            },
            jA: function() {
                var a = this.Ca,
                    b = this.na,
                    d;
                d = a.K.G;
                var c = this.ra.x - a.n.X.x,
                    g = this.ra.y - a.n.X.y,
                    h = d.l.x * c + d.m.x * g,
                    g = d.l.y * c + d.m.y * g,
                    c = h;
                d = b.K.G;
                var l = this.va.x - b.n.X.x,
                    f = this.va.y - b.n.X.y,
                    h = d.l.x * l + d.m.x * f,
                    f = d.l.y * l + d.m.y * f,
                    l = h;
                d = a.Os(this.Re);
                var h = a.B,
                    n = b.B,
                    q = a.M,
                    t = b.M;
                return (b.n.c.x + l - (a.n.c.x +
                    c)) * -q * d.y + (b.n.c.y + f - (a.n.c.y + g)) * q * d.x + (d.x * (n.x + -t * f - h.x - -q * g) + d.y * (n.y + t * l - h.y - q * c))
            },
            JA: C("Ne"),
            Sj: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.Ne = a
            },
            mA: C("Se"),
            zA: C("Te"),
            LB: function(a, b) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.Se = a;
                this.Te = b
            },
            KA: C("Gf"),
            Tj: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.Gf = a
            },
            OB: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.th = a
            },
            pA: C("th"),
            jJ: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.hn = a
            },
            sP: C("hn"),
            mF: C("jb"),
            fg: function(a) {
                var b = this.Ca,
                    d = this.na,
                    e,
                    g;
                this.ki.P(b.n.X);
                this.li.P(d.n.X);
                var h = b.pf();
                d.pf();
                e = b.K.G;
                var l = this.ra.x - this.ki.x,
                    f = this.ra.y - this.ki.y;
                g = e.l.x * l + e.m.x * f;
                f = e.l.y * l + e.m.y * f;
                l = g;
                e = d.K.G;
                var n = this.va.x - this.li.x,
                    q = this.va.y - this.li.y;
                g = e.l.x * n + e.m.x * q;
                q = e.l.y * n + e.m.y * q;
                n = g;
                e = d.n.c.x + n - b.n.c.x - l;
                g = d.n.c.y + q - b.n.c.y - f;
                this.Uc = b.Y;
                this.Vc = d.Y;
                this.Pe = b.ia;
                this.Qe = d.ia;
                this.fa.P(c.f.g.t.ze(h.G, this.Re));
                this.Nb = (e + l) * this.fa.y - (g + f) * this.fa.x;
                this.Ob = n * this.fa.y - q * this.fa.x;
                this.cf = this.Uc + this.Vc + this.Pe * this.Nb * this.Nb + this.Qe *
                    this.Ob * this.Ob;
                this.cf = this.cf > Number.MIN_VALUE ? 1 / this.cf : 0;
                this.Na.P(c.f.g.t.ze(h.G, this.dj));
                this.Zb = (e + l) * this.Na.y - (g + f) * this.Na.x;
                this.$b = n * this.Na.y - q * this.Na.x;
                h = this.Uc;
                l = this.Vc;
                f = this.Pe;
                n = this.Qe;
                this.Ma.l.x = h + l + f * this.Zb * this.Zb + n * this.$b * this.$b;
                this.Ma.l.y = f * this.Zb * this.Nb + n * this.$b * this.Ob;
                this.Ma.m.x = this.Ma.l.y;
                this.Ma.m.y = h + l + f * this.Nb * this.Nb + n * this.Ob * this.Ob;
                this.Ne ? (e = this.fa.x * e + this.fa.y * g, c.f.g.t.abs(this.Te - this.Se) < 2 * c.f.F.Kb ? this.nb = c.e.p.ka.Eh : e <= this.Se ? this.nb != c.e.p.ka.kg &&
                    (this.nb = c.e.p.ka.kg, this.v.y = 0) : e >= this.Te ? this.nb != c.e.p.ka.Ad && (this.nb = c.e.p.ka.Ad, this.v.y = 0) : (this.nb = c.e.p.ka.me, this.v.y = 0)) : this.nb = c.e.p.ka.me;
                !1 == this.Gf && (this.jb = 0);
                a.Tg ? (this.v.x *= a.cd, this.v.y *= a.cd, this.jb *= a.cd, a = this.v.x * this.Na.x + (this.jb + this.v.y) * this.fa.x, e = this.v.x * this.Na.y + (this.jb + this.v.y) * this.fa.y, g = this.v.x * this.Zb + (this.jb + this.v.y) * this.Nb, h = this.v.x * this.$b + (this.jb + this.v.y) * this.Ob, b.B.x -= this.Uc * a, b.B.y -= this.Uc * e, b.M -= this.Pe * g, d.B.x += this.Vc * a, d.B.y += this.Vc *
                    e, d.M += this.Qe * h) : (this.v.hb(), this.jb = 0)
            },
            Mf: function(a) {
                var b = this.Ca,
                    d = this.na,
                    e = b.B,
                    g = b.M,
                    h = d.B,
                    l = d.M,
                    f, n, q;
                this.Gf && this.nb != c.e.p.ka.Eh && (q = this.cf * (this.th - (this.fa.x * (h.x - e.x) + this.fa.y * (h.y - e.y) + this.Ob * l - this.Nb * g)), f = this.jb, a = a.qb * this.hn, this.jb = c.f.g.t.Gb(this.jb + q, -a, a), q = this.jb - f, f = q * this.fa.x, a = q * this.fa.y, n = q * this.Nb, q *= this.Ob, e.x -= this.Uc * f, e.y -= this.Uc * a, g -= this.Pe * n, h.x += this.Vc * f, h.y += this.Vc * a, l += this.Qe * q);
                a = this.Na.x * (h.x - e.x) + this.Na.y * (h.y - e.y) + this.$b * l - this.Zb * g;
                this.Ne &&
                    this.nb != c.e.p.ka.me ? (n = this.fa.x * (h.x - e.x) + this.fa.y * (h.y - e.y) + this.Ob * l - this.Nb * g, f = this.v.copy(), q = this.Ma.wl(new c.f.g.A, -a, -n), this.v.add(q), this.nb == c.e.p.ka.kg ? this.v.y = c.f.g.t.max(this.v.y, 0) : this.nb == c.e.p.ka.Ad && (this.v.y = c.f.g.t.min(this.v.y, 0)), a = -a - (this.v.y - f.y) * this.Ma.m.x, this.v.x = 0 != this.Ma.l.x ? a / this.Ma.l.x + f.x : f.x, q.x = this.v.x - f.x, q.y = this.v.y - f.y, f = q.x * this.Na.x + q.y * this.fa.x, a = q.x * this.Na.y + q.y * this.fa.y, n = q.x * this.Zb + q.y * this.Nb, q = q.x * this.$b + q.y * this.Ob) : (q = 0 != this.Ma.l.x ? -a /
                        this.Ma.l.x : 0, this.v.x += q, f = q * this.Na.x, a = q * this.Na.y, n = q * this.Zb, q *= this.$b);
                e.x -= this.Uc * f;
                e.y -= this.Uc * a;
                g -= this.Pe * n;
                h.x += this.Vc * f;
                h.y += this.Vc * a;
                l += this.Qe * q;
                b.B.P(e);
                b.M = g;
                d.B.P(h);
                d.M = l
            },
            Lf: function() {
                var a = this.Ca,
                    b = this.na,
                    d = a.n.c,
                    e = a.n.a,
                    g = b.n.c,
                    h = b.n.a,
                    l, f, n, q, t, x = 0,
                    p = 0;
                n = !1;
                var r = 0,
                    s = c.f.g.Ib.Fs(e);
                q = c.f.g.Ib.Fs(h);
                l = s;
                var p = this.ra.x - this.ki.x,
                    u = this.ra.y - this.ki.y;
                f = l.l.x * p + l.m.x * u;
                u = l.l.y * p + l.m.y * u;
                p = f;
                l = q;
                q = this.va.x - this.li.x;
                t = this.va.y - this.li.y;
                f = l.l.x * q + l.m.x * t;
                t = l.l.y * q + l.m.y *
                    t;
                q = f;
                l = g.x + q - d.x - p;
                f = g.y + t - d.y - u;
                if (this.Ne) {
                    this.fa = c.f.g.t.ze(s, this.Re);
                    this.Nb = (l + p) * this.fa.y - (f + u) * this.fa.x;
                    this.Ob = q * this.fa.y - t * this.fa.x;
                    var w = this.fa.x * l + this.fa.y * f;
                    c.f.g.t.abs(this.Te - this.Se) < 2 * c.f.F.Kb ? (r = c.f.g.t.Gb(w, -c.f.F.Cf, c.f.F.Cf), x = c.f.g.t.abs(w), n = !0) : w <= this.Se ? (r = c.f.g.t.Gb(w - this.Se + c.f.F.Kb, -c.f.F.Cf, 0), x = this.Se - w, n = !0) : w >= this.Te && (r = c.f.g.t.Gb(w - this.Te + c.f.F.Kb, 0, c.f.F.Cf), x = w - this.Te, n = !0)
                }
                this.Na = c.f.g.t.ze(s, this.dj);
                this.Zb = (l + p) * this.Na.y - (f + u) * this.Na.x;
                this.$b =
                    q * this.Na.y - t * this.Na.x;
                s = new c.f.g.A;
                u = this.Na.x * l + this.Na.y * f;
                x = c.f.g.t.max(x, c.f.g.t.abs(u));
                p = 0;
                n ? (n = this.Uc, q = this.Vc, t = this.Pe, l = this.Qe, this.Ma.l.x = n + q + t * this.Zb * this.Zb + l * this.$b * this.$b, this.Ma.l.y = t * this.Zb * this.Nb + l * this.$b * this.Ob, this.Ma.m.x = this.Ma.l.y, this.Ma.m.y = n + q + t * this.Nb * this.Nb + l * this.Ob * this.Ob, this.Ma.wl(s, -u, -r)) : (n = this.Uc, q = this.Vc, t = this.Pe, l = this.Qe, r = n + q + t * this.Zb * this.Zb + l * this.$b * this.$b, s.x = 0 != r ? -u / r : 0, s.y = 0);
                r = s.x * this.Na.x + s.y * this.fa.x;
                n = s.x * this.Na.y + s.y * this.fa.y;
                u = s.x * this.Zb + s.y * this.Nb;
                s = s.x * this.$b + s.y * this.Ob;
                d.x -= this.Uc * r;
                d.y -= this.Uc * n;
                e -= this.Pe * u;
                g.x += this.Vc * r;
                g.y += this.Vc * n;
                h += this.Qe * s;
                a.n.a = e;
                b.n.a = h;
                a.Yc();
                b.Yc();
                return x <= c.f.F.Kb && p <= c.f.F.Qk
            },
            r: c.e.p.Mn
        });
        c.e.p.Nn = function() {
            c.e.p.kc.call(this)
        };
        c.e.p.Nn.q = !0;
        c.e.p.Nn.N = c.e.p.kc;
        c.e.p.Nn.prototype = s(c.e.p.kc.prototype, {
            lN: function() {
                this.yd = new c.f.g.A;
                this.zd = new c.f.g.A;
                this.$k = new c.f.g.A;
                this.type = c.e.p.Ia.It;
                this.$k.set(1, 0);
                this.Sj = !1;
                this.Gx = this.ew = 0;
                this.Tj = !1;
                this.Kp = this.yw = 0
            },
            ge: function(a, b, d, c) {
                this.Cb = a;
                this.Lb = b;
                this.yd = this.Cb.Ff(d);
                this.zd = this.Lb.Ff(d);
                this.$k = this.Cb.lA(c)
            },
            r: c.e.p.Nn
        });
        c.e.p.Pn = function(a) {
            c.e.p.Hb.call(this, a);
            this.Zd = new c.f.g.Ib;
            this.bh = new c.f.g.Ib;
            this.dh = new c.f.g.Ib;
            this.fl = new c.f.g.A;
            this.bk = new c.f.g.A;
            this.v = new c.f.g.A;
            this.ga = new c.f.g.Ib;
            this.Zs = new c.f.g.A;
            this.bk.P(a.target);
            var b = this.bk.x - this.na.K.position.x,
                d = this.bk.y - this.na.K.position.y,
                e = this.na.K.G;
            this.fl.x = b * e.l.x + d * e.l.y;
            this.fl.y = b * e.m.x + d * e.m.y;
            this.gl = a.xw;
            this.v.hb();
            this.cj = a.Es;
            this.cl = a.ss;
            this.Oe = this.fw = 0
        };
        c.e.p.Pn.q = !0;
        c.e.p.Pn.N = c.e.p.Hb;
        c.e.p.Pn.prototype = s(c.e.p.Hb.prototype, {
            Xh: C("bk"),
            Yh: function() {
                return this.na.md(this.fl)
            },
            Wi: function(a) {
                return new c.f.g.A(a * this.v.x, a * this.v.y)
            },
            Xi: I(0),
            xA: C("bk"),
            eq: function(a) {
                !1 == this.na.oh() && this.na.zb(!0);
                this.bk = a
            },
            kF: C("gl"),
            iJ: z("gl"),
            ZE: C("cj"),
            YI: z("cj"),
            TE: C("cl"),
            SI: z("cl"),
            fg: function(a) {
                var b = this.na,
                    d = b.ga,
                    c = 2 * Math.PI * this.cj,
                    g = d * c * c;
                this.Oe = a.qb * (2 * d * this.cl * c + a.qb * g);
                this.Oe = 0 != this.Oe ? 1 / this.Oe :
                    0;
                this.fw = a.qb * g * this.Oe;
                var g = b.K.G,
                    d = this.fl.x - b.n.X.x,
                    c = this.fl.y - b.n.X.y,
                    h = g.l.x * d + g.m.x * c,
                    c = g.l.y * d + g.m.y * c,
                    d = h,
                    g = b.Y,
                    h = b.ia;
                this.bh.l.x = g;
                this.bh.m.x = 0;
                this.bh.l.y = 0;
                this.bh.m.y = g;
                this.dh.l.x = h * c * c;
                this.dh.m.x = -h * d * c;
                this.dh.l.y = -h * d * c;
                this.dh.m.y = h * d * d;
                this.Zd.tl(this.bh);
                this.Zd.hs(this.dh);
                this.Zd.l.x += this.Oe;
                this.Zd.m.y += this.Oe;
                this.Zd.Mv(this.ga);
                this.Zs.x = b.n.c.x + d - this.bk.x;
                this.Zs.y = b.n.c.y + c - this.bk.y;
                b.M *= 0.98;
                this.v.x *= a.cd;
                this.v.y *= a.cd;
                b.B.x += g * this.v.x;
                b.B.y += g * this.v.y;
                b.M +=
                    h * (d * this.v.y - c * this.v.x)
            },
            Mf: function(a) {
                var b = this.na,
                    d, c, g;
                d = b.K.G;
                var h = this.fl.x - b.n.X.x,
                    l = this.fl.y - b.n.X.y;
                c = d.l.x * h + d.m.x * l;
                l = d.l.y * h + d.m.y * l;
                h = c;
                c = b.B.x + -b.M * l;
                var f = b.B.y + b.M * h;
                d = this.ga;
                c = c + this.fw * this.Zs.x + this.Oe * this.v.x;
                g = f + this.fw * this.Zs.y + this.Oe * this.v.y;
                f = -(d.l.x * c + d.m.x * g);
                g = -(d.l.y * c + d.m.y * g);
                d = this.v.x;
                c = this.v.y;
                this.v.x += f;
                this.v.y += g;
                a = a.qb * this.gl;
                this.v.Ws() > a * a && this.v.multiply(a / this.v.length());
                f = this.v.x - d;
                g = this.v.y - c;
                b.B.x += b.Y * f;
                b.B.y += b.Y * g;
                b.M += b.ia * (h * g - l * f)
            },
            Lf: I(!0),
            r: c.e.p.Pn
        });
        c.e.p.Qn = function() {
            c.e.p.kc.call(this);
            this.target = new c.f.g.A;
            this.type = c.e.p.Ia.Jt;
            this.xw = 0;
            this.Es = 5;
            this.ss = 0.7
        };
        c.e.p.Qn.q = !0;
        c.e.p.Qn.N = c.e.p.kc;
        c.e.p.Qn.prototype = s(c.e.p.kc.prototype, {
            r: c.e.p.Qn
        });
        c.e.p.rk = function(a) {
            c.e.p.Hb.call(this, a);
            this.ra = new c.f.g.A;
            this.va = new c.f.g.A;
            this.Re = new c.f.g.A;
            this.dj = new c.f.g.A;
            this.fa = new c.f.g.A;
            this.Na = new c.f.g.A;
            this.Ma = new c.f.g.nj;
            this.v = new c.f.g.Xe;
            this.ra.P(a.yd);
            this.va.P(a.zd);
            this.Re.P(a.$k);
            this.dj.x = -this.Re.y;
            this.dj.y = this.Re.x;
            this.mG = a.fk;
            this.v.hb();
            this.jb = this.cf = 0;
            this.Se = a.ew;
            this.Te = a.Gx;
            this.hn = a.yw;
            this.th = a.Kp;
            this.Ne = a.Sj;
            this.Gf = a.Tj;
            this.nb = c.e.p.ka.me;
            this.fa.hb();
            this.Na.hb()
        };
        c.e.p.rk.q = !0;
        c.e.p.rk.N = c.e.p.Hb;
        c.e.p.rk.prototype = s(c.e.p.Hb.prototype, {
            Xh: function() {
                return this.Ca.md(this.ra)
            },
            Yh: function() {
                return this.na.md(this.va)
            },
            Wi: function(a) {
                return new c.f.g.A(a * (this.v.x * this.Na.x + (this.jb + this.v.z) * this.fa.x), a * (this.v.x * this.Na.y + (this.jb + this.v.z) * this.fa.y))
            },
            Xi: function(a) {
                return a *
                    this.v.y
            },
            pp: function() {
                var a = this.Ca,
                    b = this.na,
                    d = a.md(this.ra),
                    b = b.md(this.va),
                    a = a.Os(this.Re);
                return a.x * (b.x - d.x) + a.y * (b.y - d.y)
            },
            jA: function() {
                var a = this.Ca,
                    b = this.na,
                    d;
                d = a.K.G;
                var c = this.ra.x - a.n.X.x,
                    g = this.ra.y - a.n.X.y,
                    h = d.l.x * c + d.m.x * g,
                    g = d.l.y * c + d.m.y * g,
                    c = h;
                d = b.K.G;
                var l = this.va.x - b.n.X.x,
                    f = this.va.y - b.n.X.y,
                    h = d.l.x * l + d.m.x * f,
                    f = d.l.y * l + d.m.y * f,
                    l = h;
                d = a.Os(this.Re);
                var h = a.B,
                    n = b.B,
                    q = a.M,
                    t = b.M;
                return (b.n.c.x + l - (a.n.c.x + c)) * -q * d.y + (b.n.c.y + f - (a.n.c.y + g)) * q * d.x + (d.x * (n.x + -t * f - h.x - -q * g) + d.y * (n.y +
                    t * l - h.y - q * c))
            },
            JA: C("Ne"),
            Sj: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.Ne = a
            },
            mA: C("Se"),
            zA: C("Te"),
            LB: function(a, b) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.Se = a;
                this.Te = b
            },
            KA: C("Gf"),
            Tj: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.Gf = a
            },
            OB: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.th = a
            },
            pA: C("th"),
            jJ: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.hn = a
            },
            mF: C("jb"),
            fg: function(a) {
                var b = this.Ca,
                    d = this.na,
                    e, g;
                this.ki.P(b.n.X);
                this.li.P(d.n.X);
                var h = b.pf();
                d.pf();
                e = b.K.G;
                var l = this.ra.x - this.ki.x,
                    f = this.ra.y - this.ki.y;
                g = e.l.x * l + e.m.x * f;
                f = e.l.y * l + e.m.y * f;
                l = g;
                e = d.K.G;
                var n = this.va.x - this.li.x,
                    q = this.va.y - this.li.y;
                g = e.l.x * n + e.m.x * q;
                q = e.l.y * n + e.m.y * q;
                n = g;
                e = d.n.c.x + n - b.n.c.x - l;
                g = d.n.c.y + q - b.n.c.y - f;
                this.Uc = b.Y;
                this.Vc = d.Y;
                this.Pe = b.ia;
                this.Qe = d.ia;
                this.fa.P(c.f.g.t.ze(h.G, this.Re));
                this.Nb = (e + l) * this.fa.y - (g + f) * this.fa.x;
                this.Ob = n * this.fa.y - q * this.fa.x;
                this.cf = this.Uc + this.Vc + this.Pe * this.Nb * this.Nb + this.Qe * this.Ob * this.Ob;
                this.cf > Number.MIN_VALUE && (this.cf = 1 / this.cf);
                this.Na.P(c.f.g.t.ze(h.G,
                    this.dj));
                this.Zb = (e + l) * this.Na.y - (g + f) * this.Na.x;
                this.$b = n * this.Na.y - q * this.Na.x;
                h = this.Uc;
                l = this.Vc;
                f = this.Pe;
                n = this.Qe;
                this.Ma.l.x = h + l + f * this.Zb * this.Zb + n * this.$b * this.$b;
                this.Ma.l.y = f * this.Zb + n * this.$b;
                this.Ma.l.z = f * this.Zb * this.Nb + n * this.$b * this.Ob;
                this.Ma.m.x = this.Ma.l.y;
                this.Ma.m.y = f + n;
                this.Ma.m.z = f * this.Nb + n * this.Ob;
                this.Ma.eb.x = this.Ma.l.z;
                this.Ma.eb.y = this.Ma.m.z;
                this.Ma.eb.z = h + l + f * this.Nb * this.Nb + n * this.Ob * this.Ob;
                this.Ne ? (e = this.fa.x * e + this.fa.y * g, c.f.g.t.abs(this.Te - this.Se) < 2 * c.f.F.Kb ?
                    this.nb = c.e.p.ka.Eh : e <= this.Se ? this.nb != c.e.p.ka.kg && (this.nb = c.e.p.ka.kg, this.v.z = 0) : e >= this.Te ? this.nb != c.e.p.ka.Ad && (this.nb = c.e.p.ka.Ad, this.v.z = 0) : (this.nb = c.e.p.ka.me, this.v.z = 0)) : this.nb = c.e.p.ka.me;
                !1 == this.Gf && (this.jb = 0);
                a.Tg ? (this.v.x *= a.cd, this.v.y *= a.cd, this.jb *= a.cd, a = this.v.x * this.Na.x + (this.jb + this.v.z) * this.fa.x, e = this.v.x * this.Na.y + (this.jb + this.v.z) * this.fa.y, g = this.v.x * this.Zb + this.v.y + (this.jb + this.v.z) * this.Nb, h = this.v.x * this.$b + this.v.y + (this.jb + this.v.z) * this.Ob, b.B.x -= this.Uc *
                    a, b.B.y -= this.Uc * e, b.M -= this.Pe * g, d.B.x += this.Vc * a, d.B.y += this.Vc * e, d.M += this.Qe * h) : (this.v.hb(), this.jb = 0)
            },
            Mf: function(a) {
                var b = this.Ca,
                    d = this.na,
                    e = b.B,
                    g = b.M,
                    h = d.B,
                    l = d.M,
                    f, n, q;
                this.Gf && this.nb != c.e.p.ka.Eh && (q = this.cf * (this.th - (this.fa.x * (h.x - e.x) + this.fa.y * (h.y - e.y) + this.Ob * l - this.Nb * g)), f = this.jb, a = a.qb * this.hn, this.jb = c.f.g.t.Gb(this.jb + q, -a, a), q = this.jb - f, f = q * this.fa.x, a = q * this.fa.y, n = q * this.Nb, q *= this.Ob, e.x -= this.Uc * f, e.y -= this.Uc * a, g -= this.Pe * n, h.x += this.Vc * f, h.y += this.Vc * a, l += this.Qe * q);
                a = this.Na.x * (h.x - e.x) + this.Na.y * (h.y - e.y) + this.$b * l - this.Zb * g;
                n = l - g;
                this.Ne && this.nb != c.e.p.ka.me ? (q = this.fa.x * (h.x - e.x) + this.fa.y * (h.y - e.y) + this.Ob * l - this.Nb * g, f = this.v.copy(), q = this.Ma.gq(new c.f.g.Xe, -a, -n, -q), this.v.add(q), this.nb == c.e.p.ka.kg ? this.v.z = c.f.g.t.max(this.v.z, 0) : this.nb == c.e.p.ka.Ad && (this.v.z = c.f.g.t.min(this.v.z, 0)), a = this.Ma.xn(new c.f.g.A, -a - (this.v.z - f.z) * this.Ma.eb.x, -n - (this.v.z - f.z) * this.Ma.eb.y), a.x += f.x, a.y += f.y, this.v.x = a.x, this.v.y = a.y, q.x = this.v.x - f.x, q.y = this.v.y - f.y,
                    q.z = this.v.z - f.z, f = q.x * this.Na.x + q.z * this.fa.x, a = q.x * this.Na.y + q.z * this.fa.y, n = q.x * this.Zb + q.y + q.z * this.Nb, q = q.x * this.$b + q.y + q.z * this.Ob) : (q = this.Ma.xn(new c.f.g.A, -a, -n), this.v.x += q.x, this.v.y += q.y, f = q.x * this.Na.x, a = q.x * this.Na.y, n = q.x * this.Zb + q.y, q = q.x * this.$b + q.y);
                e.x -= this.Uc * f;
                e.y -= this.Uc * a;
                g -= this.Pe * n;
                h.x += this.Vc * f;
                h.y += this.Vc * a;
                l += this.Qe * q;
                b.B.P(e);
                b.M = g;
                d.B.P(h);
                d.M = l
            },
            Lf: function() {
                var a = this.Ca,
                    b = this.na,
                    d = a.n.c,
                    e = a.n.a,
                    g = b.n.c,
                    h = b.n.a,
                    l, f, n, q, t = 0,
                    x = 0;
                n = !1;
                var p = 0,
                    r = c.f.g.Ib.Fs(e),
                    s = c.f.g.Ib.Fs(h);
                l = r;
                var x = this.ra.x - this.ki.x,
                    u = this.ra.y - this.ki.y;
                f = l.l.x * x + l.m.x * u;
                u = l.l.y * x + l.m.y * u;
                x = f;
                l = s;
                s = this.va.x - this.li.x;
                q = this.va.y - this.li.y;
                f = l.l.x * s + l.m.x * q;
                q = l.l.y * s + l.m.y * q;
                s = f;
                l = g.x + s - d.x - x;
                f = g.y + q - d.y - u;
                if (this.Ne) {
                    this.fa = c.f.g.t.ze(r, this.Re);
                    this.Nb = (l + x) * this.fa.y - (f + u) * this.fa.x;
                    this.Ob = s * this.fa.y - q * this.fa.x;
                    var w = this.fa.x * l + this.fa.y * f;
                    c.f.g.t.abs(this.Te - this.Se) < 2 * c.f.F.Kb ? (p = c.f.g.t.Gb(w, -c.f.F.Cf, c.f.F.Cf), t = c.f.g.t.abs(w), n = !0) : w <= this.Se ? (p = c.f.g.t.Gb(w - this.Se +
                        c.f.F.Kb, -c.f.F.Cf, 0), t = this.Se - w, n = !0) : w >= this.Te && (p = c.f.g.t.Gb(w - this.Te + c.f.F.Kb, 0, c.f.F.Cf), t = w - this.Te, n = !0)
                }
                this.Na = c.f.g.t.ze(r, this.dj);
                this.Zb = (l + x) * this.Na.y - (f + u) * this.Na.x;
                this.$b = s * this.Na.y - q * this.Na.x;
                r = new c.f.g.Xe;
                u = this.Na.x * l + this.Na.y * f;
                s = h - e - this.mG;
                t = c.f.g.t.max(t, c.f.g.t.abs(u));
                x = c.f.g.t.abs(s);
                n ? (n = this.Uc, q = this.Vc, l = this.Pe, f = this.Qe, this.Ma.l.x = n + q + l * this.Zb * this.Zb + f * this.$b * this.$b, this.Ma.l.y = l * this.Zb + f * this.$b, this.Ma.l.z = l * this.Zb * this.Nb + f * this.$b * this.Ob, this.Ma.m.x =
                    this.Ma.l.y, this.Ma.m.y = l + f, this.Ma.m.z = l * this.Nb + f * this.Ob, this.Ma.eb.x = this.Ma.l.z, this.Ma.eb.y = this.Ma.m.z, this.Ma.eb.z = n + q + l * this.Nb * this.Nb + f * this.Ob * this.Ob, this.Ma.gq(r, -u, -s, -p)) : (n = this.Uc, q = this.Vc, l = this.Pe, f = this.Qe, p = l * this.Zb + f * this.$b, w = l + f, this.Ma.l.set(n + q + l * this.Zb * this.Zb + f * this.$b * this.$b, p, 0), this.Ma.m.set(p, w, 0), p = this.Ma.xn(new c.f.g.A, -u, -s), r.x = p.x, r.y = p.y, r.z = 0);
                p = r.x * this.Na.x + r.z * this.fa.x;
                n = r.x * this.Na.y + r.z * this.fa.y;
                u = r.x * this.Zb + r.y + r.z * this.Nb;
                r = r.x * this.$b + r.y + r.z *
                    this.Ob;
                d.x -= this.Uc * p;
                d.y -= this.Uc * n;
                e -= this.Pe * u;
                g.x += this.Vc * p;
                g.y += this.Vc * n;
                h += this.Qe * r;
                a.n.a = e;
                b.n.a = h;
                a.Yc();
                b.Yc();
                return t <= c.f.F.Kb && x <= c.f.F.Qk
            },
            r: c.e.p.rk
        });
        c.e.p.Rn = function() {
            c.e.p.kc.call(this);
            this.yd = new c.f.g.A;
            this.zd = new c.f.g.A;
            this.$k = new c.f.g.A;
            this.type = c.e.p.Ia.Kt;
            this.$k.set(1, 0);
            this.fk = 0;
            this.Sj = !1;
            this.Gx = this.ew = 0;
            this.Tj = !1;
            this.Kp = this.yw = 0
        };
        c.e.p.Rn.q = !0;
        c.e.p.Rn.N = c.e.p.kc;
        c.e.p.Rn.prototype = s(c.e.p.kc.prototype, {
            ge: function(a, b, d, c) {
                this.Cb = a;
                this.Lb = b;
                this.yd =
                    this.Cb.Ff(d);
                this.zd = this.Lb.Ff(d);
                this.$k = this.Cb.lA(c);
                this.fk = this.Lb.Fg() - this.Cb.Fg()
            },
            r: c.e.p.Rn
        });
        c.e.p.Vg = function(a) {
            c.e.p.Hb.call(this, a);
            this.Lg = new c.f.g.A;
            this.Mg = new c.f.g.A;
            this.ra = new c.f.g.A;
            this.va = new c.f.g.A;
            this.jc = new c.f.g.A;
            this.Rb = new c.f.g.A;
            this.ve = this.Ca.od.mw;
            this.Lg.x = a.Qs.x - this.ve.K.position.x;
            this.Lg.y = a.Qs.y - this.ve.K.position.y;
            this.Mg.x = a.Rs.x - this.ve.K.position.x;
            this.Mg.y = a.Rs.y - this.ve.K.position.y;
            this.ra.P(a.yd);
            this.va.P(a.zd);
            this.yc = a.ql;
            this.bn = a.cw +
                this.yc * a.dw;
            this.XA = c.f.g.t.min(a.aB, this.bn - this.yc * c.e.p.Vg.ms);
            this.YA = c.f.g.t.min(a.bB, (this.bn - c.e.p.Vg.ms) / this.yc);
            this.ji = this.ii = this.v = 0
        };
        c.e.p.Vg.q = !0;
        c.e.p.Vg.N = c.e.p.Hb;
        c.e.p.Vg.prototype = s(c.e.p.Hb.prototype, {
            Xh: function() {
                return this.Ca.md(this.ra)
            },
            Yh: function() {
                return this.na.md(this.va)
            },
            Wi: function(a) {
                return new c.f.g.A(a * this.v * this.Rb.x, a * this.v * this.Rb.y)
            },
            Xi: I(0),
            $E: function() {
                var a = this.ve.K.position.copy();
                a.add(this.Lg);
                return a
            },
            aF: function() {
                var a = this.ve.K.position.copy();
                a.add(this.Mg);
                return a
            },
            iP: function() {
                var a = this.Ca.md(this.ra),
                    b = a.x - (this.ve.K.position.x + this.Lg.x),
                    a = a.y - (this.ve.K.position.y + this.Lg.y);
                return Math.sqrt(b * b + a * a)
            },
            jP: function() {
                var a = this.na.md(this.va),
                    b = a.x - (this.ve.K.position.x + this.Mg.x),
                    a = a.y - (this.ve.K.position.y + this.Mg.y);
                return Math.sqrt(b * b + a * a)
            },
            sF: C("yc"),
            fg: function(a) {
                var b = this.Ca,
                    d = this.na,
                    e;
                e = b.K.G;
                var g = this.ra.x - b.n.X.x,
                    h = this.ra.y - b.n.X.y,
                    l = e.l.x * g + e.m.x * h,
                    h = e.l.y * g + e.m.y * h,
                    g = l;
                e = d.K.G;
                var f = this.va.x - d.n.X.x,
                    n = this.va.y -
                    d.n.X.y,
                    l = e.l.x * f + e.m.x * n,
                    n = e.l.y * f + e.m.y * n,
                    f = l;
                e = d.n.c.x + f;
                var l = d.n.c.y + n,
                    q = this.ve.K.position.x + this.Mg.x,
                    t = this.ve.K.position.y + this.Mg.y;
                this.jc.set(b.n.c.x + g - (this.ve.K.position.x + this.Lg.x), b.n.c.y + h - (this.ve.K.position.y + this.Lg.y));
                this.Rb.set(e - q, l - t);
                e = this.jc.length();
                l = this.Rb.length();
                e > c.f.F.Kb ? this.jc.multiply(1 / e) : this.jc.hb();
                l > c.f.F.Kb ? this.Rb.multiply(1 / l) : this.Rb.hb();
                0 < this.bn - e - this.yc * l ? (this.tw = c.e.p.ka.me, this.v = 0) : this.tw = c.e.p.ka.Ad;
                e < this.XA ? (this.nw = c.e.p.ka.me, this.ii =
                    0) : this.nw = c.e.p.ka.Ad;
                l < this.YA ? (this.ow = c.e.p.ka.me, this.ji = 0) : this.ow = c.e.p.ka.Ad;
                e = g * this.jc.y - h * this.jc.x;
                l = f * this.Rb.y - n * this.Rb.x;
                this.Dp = b.Y + b.ia * e * e;
                this.Ep = d.Y + d.ia * l * l;
                this.ct = this.Dp + this.yc * this.yc * this.Ep;
                this.Dp = 1 / this.Dp;
                this.Ep = 1 / this.Ep;
                this.ct = 1 / this.ct;
                a.Tg ? (this.v *= a.cd, this.ii *= a.cd, this.ji *= a.cd, a = (-this.v - this.ii) * this.jc.x, e = (-this.v - this.ii) * this.jc.y, l = (-this.yc * this.v - this.ji) * this.Rb.x, q = (-this.yc * this.v - this.ji) * this.Rb.y, b.B.x += b.Y * a, b.B.y += b.Y * e, b.M += b.ia * (g * e - h * a),
                    d.B.x += d.Y * l, d.B.y += d.Y * q, d.M += d.ia * (f * q - n * l)) : this.ji = this.ii = this.v = 0
            },
            Mf: function() {
                var a = this.Ca,
                    b = this.na,
                    d;
                d = a.K.G;
                var e = this.ra.x - a.n.X.x,
                    g = this.ra.y - a.n.X.y,
                    h = d.l.x * e + d.m.x * g,
                    g = d.l.y * e + d.m.y * g,
                    e = h;
                d = b.K.G;
                var l = this.va.x - b.n.X.x,
                    f = this.va.y - b.n.X.y,
                    h = d.l.x * l + d.m.x * f,
                    f = d.l.y * l + d.m.y * f,
                    l = h,
                    n, q;
                this.tw == c.e.p.ka.Ad && (d = a.B.x + -a.M * g, h = a.B.y + a.M * e, n = b.B.x + -b.M * f, q = b.B.y + b.M * l, d = -(this.jc.x * d + this.jc.y * h) - this.yc * (this.Rb.x * n + this.Rb.y * q), q = this.ct * -d, d = this.v, this.v = c.f.g.t.max(0, this.v + q), q = this.v -
                    d, d = -q * this.jc.x, h = -q * this.jc.y, n = -this.yc * q * this.Rb.x, q = -this.yc * q * this.Rb.y, a.B.x += a.Y * d, a.B.y += a.Y * h, a.M += a.ia * (e * h - g * d), b.B.x += b.Y * n, b.B.y += b.Y * q, b.M += b.ia * (l * q - f * n));
                this.nw == c.e.p.ka.Ad && (d = a.B.x + -a.M * g, h = a.B.y + a.M * e, d = -(this.jc.x * d + this.jc.y * h), q = -this.Dp * d, d = this.ii, this.ii = c.f.g.t.max(0, this.ii + q), q = this.ii - d, d = -q * this.jc.x, h = -q * this.jc.y, a.B.x += a.Y * d, a.B.y += a.Y * h, a.M += a.ia * (e * h - g * d));
                this.ow == c.e.p.ka.Ad && (n = b.B.x + -b.M * f, q = b.B.y + b.M * l, d = -(this.Rb.x * n + this.Rb.y * q), q = -this.Ep * d, d = this.ji,
                    this.ji = c.f.g.t.max(0, this.ji + q), q = this.ji - d, n = -q * this.Rb.x, q = -q * this.Rb.y, b.B.x += b.Y * n, b.B.y += b.Y * q, b.M += b.ia * (l * q - f * n))
            },
            Lf: function() {
                var a = this.Ca,
                    b = this.na,
                    d, e = this.ve.K.position.x + this.Lg.x,
                    g = this.ve.K.position.y + this.Lg.y,
                    h = this.ve.K.position.x + this.Mg.x,
                    l = this.ve.K.position.y + this.Mg.y,
                    f, n, q, t, p, r, s, u = 0;
                this.tw == c.e.p.ka.Ad && (d = a.K.G, f = this.ra.x - a.n.X.x, n = this.ra.y - a.n.X.y, p = d.l.x * f + d.m.x * n, n = d.l.y * f + d.m.y * n, f = p, d = b.K.G, q = this.va.x - b.n.X.x, t = this.va.y - b.n.X.y, p = d.l.x * q + d.m.x * t, t = d.l.y * q + d.m.y *
                    t, q = p, d = a.n.c.x + f, p = a.n.c.y + n, r = b.n.c.x + q, s = b.n.c.y + t, this.jc.set(d - e, p - g), this.Rb.set(r - h, s - l), d = this.jc.length(), p = this.Rb.length(), d > c.f.F.Kb ? this.jc.multiply(1 / d) : this.jc.hb(), p > c.f.F.Kb ? this.Rb.multiply(1 / p) : this.Rb.hb(), d = this.bn - d - this.yc * p, u = c.f.g.t.max(u, -d), d = c.f.g.t.Gb(d + c.f.F.Kb, -c.f.F.Cf, 0), s = -this.ct * d, d = -s * this.jc.x, p = -s * this.jc.y, r = -this.yc * s * this.Rb.x, s = -this.yc * s * this.Rb.y, a.n.c.x += a.Y * d, a.n.c.y += a.Y * p, a.n.a += a.ia * (f * p - n * d), b.n.c.x += b.Y * r, b.n.c.y += b.Y * s, b.n.a += b.ia * (q * s - t * r), a.Yc(),
                    b.Yc());
                this.nw == c.e.p.ka.Ad && (d = a.K.G, f = this.ra.x - a.n.X.x, n = this.ra.y - a.n.X.y, p = d.l.x * f + d.m.x * n, n = d.l.y * f + d.m.y * n, f = p, d = a.n.c.x + f, p = a.n.c.y + n, this.jc.set(d - e, p - g), d = this.jc.length(), d > c.f.F.Kb ? (this.jc.x *= 1 / d, this.jc.y *= 1 / d) : this.jc.hb(), d = this.XA - d, u = c.f.g.t.max(u, -d), d = c.f.g.t.Gb(d + c.f.F.Kb, -c.f.F.Cf, 0), s = -this.Dp * d, d = -s * this.jc.x, p = -s * this.jc.y, a.n.c.x += a.Y * d, a.n.c.y += a.Y * p, a.n.a += a.ia * (f * p - n * d), a.Yc());
                this.ow == c.e.p.ka.Ad && (d = b.K.G, q = this.va.x - b.n.X.x, t = this.va.y - b.n.X.y, p = d.l.x * q + d.m.x * t, t =
                    d.l.y * q + d.m.y * t, q = p, r = b.n.c.x + q, s = b.n.c.y + t, this.Rb.set(r - h, s - l), p = this.Rb.length(), p > c.f.F.Kb ? (this.Rb.x *= 1 / p, this.Rb.y *= 1 / p) : this.Rb.hb(), d = this.YA - p, u = c.f.g.t.max(u, -d), d = c.f.g.t.Gb(d + c.f.F.Kb, -c.f.F.Cf, 0), s = -this.Ep * d, r = -s * this.Rb.x, s = -s * this.Rb.y, b.n.c.x += b.Y * r, b.n.c.y += b.Y * s, b.n.a += b.ia * (q * s - t * r), b.Yc());
                return u < c.f.F.Kb
            },
            r: c.e.p.Vg
        });
        c.e.p.Sn = function() {
            c.e.p.kc.call(this);
            this.Qs = new c.f.g.A;
            this.Rs = new c.f.g.A;
            this.yd = new c.f.g.A;
            this.zd = new c.f.g.A;
            this.type = c.e.p.Ia.Lt;
            this.Qs.set(-1,
                1);
            this.Rs.set(1, 1);
            this.yd.set(-1, 0);
            this.zd.set(1, 0);
            this.bB = this.dw = this.aB = this.cw = 0;
            this.ql = 1;
            this.Az = !0
        };
        c.e.p.Sn.q = !0;
        c.e.p.Sn.N = c.e.p.kc;
        c.e.p.Sn.prototype = s(c.e.p.kc.prototype, {
            ge: function(a, b, d, e, g, h, f) {
                this.Cb = a;
                this.Lb = b;
                this.Qs.P(d);
                this.Rs.P(e);
                this.yd = this.Cb.Ff(g);
                this.zd = this.Lb.Ff(h);
                a = g.x - d.x;
                d = g.y - d.y;
                this.cw = Math.sqrt(a * a + d * d);
                d = h.x - e.x;
                e = h.y - e.y;
                this.dw = Math.sqrt(d * d + e * e);
                this.ql = f;
                f = this.cw + this.ql * this.dw;
                this.aB = f - this.ql * c.e.p.Vg.ms;
                this.bB = (f - c.e.p.Vg.ms) / this.ql
            },
            r: c.e.p.Sn
        });
        c.e.p.Wg = function(a) {
            c.e.p.Hb.call(this, a);
            this.Zd = new c.f.g.Ib;
            this.bh = new c.f.g.Ib;
            this.dh = new c.f.g.Ib;
            this.mo = new c.f.g.Ib;
            this.Sd = new c.f.g.Xe;
            this.nh = new c.f.g.A;
            this.pi = new c.f.g.A;
            this.ra = new c.f.g.A;
            this.va = new c.f.g.A;
            this.v = new c.f.g.Xe;
            this.ga = new c.f.g.nj;
            this.ra.P(a.yd);
            this.va.P(a.zd);
            this.Hp = a.fk;
            this.v.hb();
            this.jb = 0;
            this.gn = a.aG;
            this.Ip = a.cK;
            this.qw = a.tG;
            this.th = a.Kp;
            this.Ne = a.Sj;
            this.Gf = a.Tj;
            this.nb = c.e.p.ka.me
        };
        c.e.p.Wg.q = !0;
        c.e.p.Wg.N = c.e.p.Hb;
        c.e.p.Wg.prototype = s(c.e.p.Hb.prototype, {
            Xh: function() {
                return this.Ca.md(this.ra)
            },
            Yh: function() {
                return this.na.md(this.va)
            },
            Wi: function(a) {
                return new c.f.g.A(a * this.v.x, a * this.v.y)
            },
            Xi: function(a) {
                return a * this.v.z
            },
            Ks: function() {
                return this.na.n.a - this.Ca.n.a - this.Hp
            },
            jA: function() {
                return this.na.M - this.Ca.M
            },
            JA: C("Ne"),
            Sj: z("Ne"),
            mA: C("gn"),
            zA: C("Ip"),
            LB: function(a, b) {
                this.gn = a;
                this.Ip = b
            },
            KA: function() {
                this.Ca.zb(!0);
                this.na.zb(!0);
                return this.Gf
            },
            Tj: z("Gf"),
            OB: function(a) {
                this.Ca.zb(!0);
                this.na.zb(!0);
                this.th = a
            },
            pA: C("th"),
            zR: z("qw"),
            uP: C("qw"),
            fg: function(a) {
                var b = this.Ca,
                    d = this.na,
                    e, g;
                e = b.K.G;
                var h = this.ra.x - b.n.X.x,
                    f = this.ra.y - b.n.X.y;
                g = e.l.x * h + e.m.x * f;
                f = e.l.y * h + e.m.y * f;
                h = g;
                e = d.K.G;
                var m = this.va.x - d.n.X.x,
                    n = this.va.y - d.n.X.y;
                g = e.l.x * m + e.m.x * n;
                n = e.l.y * m + e.m.y * n;
                m = g;
                e = b.Y;
                g = d.Y;
                var q = b.ia,
                    t = d.ia;
                this.ga.l.x = e + g + f * f * q + n * n * t;
                this.ga.m.x = -f * h * q - n * m * t;
                this.ga.eb.x = -f * q - n * t;
                this.ga.l.y = this.ga.m.x;
                this.ga.m.y = e + g + h * h * q + m * m * t;
                this.ga.eb.y = h * q + m * t;
                this.ga.l.z = this.ga.eb.x;
                this.ga.m.z = this.ga.eb.y;
                this.ga.eb.z = q + t;
                this.cf = 1 / (q + t);
                !1 ==
                    this.Gf && (this.jb = 0);
                if (this.Ne) {
                    var p = d.n.a - b.n.a - this.Hp;
                    c.f.g.t.abs(this.Ip - this.gn) < 2 * c.f.F.Qk ? this.nb = c.e.p.ka.Eh : p <= this.gn ? (this.nb != c.e.p.ka.kg && (this.v.z = 0), this.nb = c.e.p.ka.kg) : p >= this.Ip ? (this.nb != c.e.p.ka.Ad && (this.v.z = 0), this.nb = c.e.p.ka.Ad) : (this.nb = c.e.p.ka.me, this.v.z = 0)
                } else this.nb = c.e.p.ka.me;
                a.Tg ? (this.v.x *= a.cd, this.v.y *= a.cd, this.jb *= a.cd, a = this.v.x, p = this.v.y, b.B.x -= e * a, b.B.y -= e * p, b.M -= q * (h * p - f * a + this.jb + this.v.z), d.B.x += g * a, d.B.y += g * p, d.M += t * (m * p - n * a + this.jb + this.v.z)) : (this.v.hb(),
                    this.jb = 0)
            },
            Mf: function(a) {
                var b = this.Ca,
                    d = this.na,
                    e, g, h, f, m, n = b.B,
                    q = b.M,
                    t = d.B,
                    p = d.M,
                    r = b.Y,
                    s = d.Y,
                    u = b.ia,
                    w = d.ia;
                this.Gf && this.nb != c.e.p.ka.Eh && (h = this.cf * -(p - q - this.th), f = this.jb, a = a.qb * this.qw, this.jb = c.f.g.t.Gb(this.jb + h, -a, a), h = this.jb - f, q -= u * h, p += w * h);
                if (this.Ne && this.nb != c.e.p.ka.me) {
                    e = b.K.G;
                    h = this.ra.x - b.n.X.x;
                    f = this.ra.y - b.n.X.y;
                    g = e.l.x * h + e.m.x * f;
                    f = e.l.y * h + e.m.y * f;
                    h = g;
                    e = d.K.G;
                    a = this.va.x - d.n.X.x;
                    m = this.va.y - d.n.X.y;
                    g = e.l.x * a + e.m.x * m;
                    m = e.l.y * a + e.m.y * m;
                    a = g;
                    g = t.x + -p * m - n.x - -q * f;
                    var y = t.y + p * a - n.y -
                        q * h;
                    this.ga.gq(this.Sd, -g, -y, -(p - q));
                    this.nb == c.e.p.ka.Eh ? this.v.add(this.Sd) : this.nb == c.e.p.ka.kg ? (e = this.v.z + this.Sd.z, 0 > e && (this.ga.xn(this.pi, -g, -y), this.Sd.x = this.pi.x, this.Sd.y = this.pi.y, this.Sd.z = -this.v.z, this.v.x += this.pi.x, this.v.y += this.pi.y, this.v.z = 0)) : this.nb == c.e.p.ka.Ad && (e = this.v.z + this.Sd.z, 0 < e && (this.ga.xn(this.pi, -g, -y), this.Sd.x = this.pi.x, this.Sd.y = this.pi.y, this.Sd.z = -this.v.z, this.v.x += this.pi.x, this.v.y += this.pi.y, this.v.z = 0));
                    n.x -= r * this.Sd.x;
                    n.y -= r * this.Sd.y;
                    q -= u * (h * this.Sd.y -
                        f * this.Sd.x + this.Sd.z);
                    t.x += s * this.Sd.x;
                    t.y += s * this.Sd.y;
                    p += w * (a * this.Sd.y - m * this.Sd.x + this.Sd.z)
                } else e = b.K.G, h = this.ra.x - b.n.X.x, f = this.ra.y - b.n.X.y, g = e.l.x * h + e.m.x * f, f = e.l.y * h + e.m.y * f, h = g, e = d.K.G, a = this.va.x - d.n.X.x, m = this.va.y - d.n.X.y, g = e.l.x * a + e.m.x * m, m = e.l.y * a + e.m.y * m, a = g, this.ga.xn(this.nh, -(t.x + -p * m - n.x - -q * f), -(t.y + p * a - n.y - q * h)), this.v.x += this.nh.x, this.v.y += this.nh.y, n.x -= r * this.nh.x, n.y -= r * this.nh.y, q -= u * (h * this.nh.y - f * this.nh.x), t.x += s * this.nh.x, t.y += s * this.nh.y, p += w * (a * this.nh.y - m * this.nh.x);
                b.B.P(n);
                b.M = q;
                d.B.P(t);
                d.M = p
            },
            Lf: function() {
                var a, b, d = this.Ca,
                    e = this.na,
                    g = 0;
                b = 0;
                var h, f, m;
                if (this.Ne && this.nb != c.e.p.ka.me) {
                    a = e.n.a - d.n.a - this.Hp;
                    var n = 0;
                    this.nb == c.e.p.ka.Eh ? (a = c.f.g.t.Gb(a - this.gn, -c.f.F.ls, c.f.F.ls), n = -this.cf * a, g = c.f.g.t.abs(a)) : this.nb == c.e.p.ka.kg ? (a -= this.gn, g = -a, a = c.f.g.t.Gb(a + c.f.F.Qk, -c.f.F.ls, 0), n = -this.cf * a) : this.nb == c.e.p.ka.Ad && (g = a -= this.Ip, a = c.f.g.t.Gb(a - c.f.F.Qk, 0, c.f.F.ls), n = -this.cf * a);
                    d.n.a -= d.ia * n;
                    e.n.a += e.ia * n;
                    d.Yc();
                    e.Yc()
                }
                b = d.K.G;
                n = this.ra.x - d.n.X.x;
                a = this.ra.y -
                    d.n.X.y;
                h = b.l.x * n + b.m.x * a;
                a = b.l.y * n + b.m.y * a;
                n = h;
                b = e.K.G;
                var q = this.va.x - e.n.X.x,
                    t = this.va.y - e.n.X.y;
                h = b.l.x * q + b.m.x * t;
                t = b.l.y * q + b.m.y * t;
                q = h;
                f = e.n.c.x + q - d.n.c.x - n;
                m = e.n.c.y + t - d.n.c.y - a;
                var p = f * f + m * m;
                b = Math.sqrt(p);
                h = d.Y;
                var r = e.Y,
                    s = d.ia,
                    u = e.ia,
                    w = 10 * c.f.F.Kb;
                p > w * w && (p = 1 / (h + r), f = p * -f, m = p * -m, d.n.c.x -= 0.5 * h * f, d.n.c.y -= 0.5 * h * m, e.n.c.x += 0.5 * r * f, e.n.c.y += 0.5 * r * m, f = e.n.c.x + q - d.n.c.x - n, m = e.n.c.y + t - d.n.c.y - a);
                this.bh.l.x = h + r;
                this.bh.m.x = 0;
                this.bh.l.y = 0;
                this.bh.m.y = h + r;
                this.dh.l.x = s * a * a;
                this.dh.m.x = -s * n * a;
                this.dh.l.y = -s * n * a;
                this.dh.m.y = s * n * n;
                this.mo.l.x = u * t * t;
                this.mo.m.x = -u * q * t;
                this.mo.l.y = -u * q * t;
                this.mo.m.y = u * q * q;
                this.Zd.tl(this.bh);
                this.Zd.hs(this.dh);
                this.Zd.hs(this.mo);
                this.Zd.wl(c.e.p.Wg.Bx, -f, -m);
                f = c.e.p.Wg.Bx.x;
                m = c.e.p.Wg.Bx.y;
                d.n.c.x -= d.Y * f;
                d.n.c.y -= d.Y * m;
                d.n.a -= d.ia * (n * m - a * f);
                e.n.c.x += e.Y * f;
                e.n.c.y += e.Y * m;
                e.n.a += e.ia * (q * m - t * f);
                d.Yc();
                e.Yc();
                return b <= c.f.F.Kb && g <= c.f.F.Qk
            },
            r: c.e.p.Wg
        });
        c.e.p.Un = function() {
            c.e.p.kc.call(this);
            this.yd = new c.f.g.A;
            this.zd = new c.f.g.A;
            this.type = c.e.p.Ia.so;
            this.yd.set(0,
                0);
            this.zd.set(0, 0);
            this.Kp = this.tG = this.cK = this.aG = this.fk = 0;
            this.Tj = this.Sj = !1
        };
        c.e.p.Un.q = !0;
        c.e.p.Un.N = c.e.p.kc;
        c.e.p.Un.prototype = s(c.e.p.kc.prototype, {
            ge: function(a, b, d) {
                this.Cb = a;
                this.Lb = b;
                this.yd = this.Cb.Ff(d);
                this.zd = this.Lb.Ff(d);
                this.fk = this.Lb.Fg() - this.Cb.Fg()
            },
            r: c.e.p.Un
        });
        c.e.p.Vn = function(a) {
            c.e.p.Hb.call(this, a);
            this.tf = new c.f.g.A;
            this.uf = new c.f.g.A;
            this.v = new c.f.g.Xe;
            this.ga = new c.f.g.nj;
            this.tf.P(a.yd);
            this.uf.P(a.zd);
            this.Hp = a.fk;
            this.v.hb();
            this.ga = new c.f.g.nj
        };
        c.e.p.Vn.q = !0;
        c.e.p.Vn.N = c.e.p.Hb;
        c.e.p.Vn.prototype = s(c.e.p.Hb.prototype, {
            Xh: function() {
                return this.Ca.md(this.tf)
            },
            Yh: function() {
                return this.na.md(this.uf)
            },
            Wi: function(a) {
                return new c.f.g.A(a * this.v.x, a * this.v.y)
            },
            Xi: function(a) {
                return a * this.v.z
            },
            fg: function(a) {
                var b, d, c = this.Ca,
                    g = this.na;
                b = c.K.G;
                var h = this.tf.x - c.n.X.x,
                    f = this.tf.y - c.n.X.y;
                d = b.l.x * h + b.m.x * f;
                f = b.l.y * h + b.m.y * f;
                h = d;
                b = g.K.G;
                var m = this.uf.x - g.n.X.x,
                    n = this.uf.y - g.n.X.y;
                d = b.l.x * m + b.m.x * n;
                n = b.l.y * m + b.m.y * n;
                m = d;
                b = c.Y;
                d = g.Y;
                var q = c.ia,
                    t = g.ia;
                this.ga.l.x =
                    b + d + f * f * q + n * n * t;
                this.ga.m.x = -f * h * q - n * m * t;
                this.ga.eb.x = -f * q - n * t;
                this.ga.l.y = this.ga.m.x;
                this.ga.m.y = b + d + h * h * q + m * m * t;
                this.ga.eb.y = h * q + m * t;
                this.ga.l.z = this.ga.eb.x;
                this.ga.m.z = this.ga.eb.y;
                this.ga.eb.z = q + t;
                a.Tg ? (this.v.x *= a.cd, this.v.y *= a.cd, this.v.z *= a.cd, c.B.x -= b * this.v.x, c.B.y -= b * this.v.y, c.M -= q * (h * this.v.y - f * this.v.x + this.v.z), g.B.x += d * this.v.x, g.B.y += d * this.v.y, g.M += t * (m * this.v.y - n * this.v.x + this.v.z)) : this.v.hb()
            },
            Mf: function() {
                var a, b, d = this.Ca,
                    e = this.na,
                    g = d.B,
                    h = d.M,
                    f = e.B,
                    m = e.M,
                    n = d.Y,
                    q = e.Y,
                    t = d.ia,
                    p = e.ia;
                a = d.K.G;
                var r = this.tf.x - d.n.X.x,
                    s = this.tf.y - d.n.X.y;
                b = a.l.x * r + a.m.x * s;
                s = a.l.y * r + a.m.y * s;
                r = b;
                a = e.K.G;
                var u = this.uf.x - e.n.X.x,
                    w = this.uf.y - e.n.X.y;
                b = a.l.x * u + a.m.x * w;
                w = a.l.y * u + a.m.y * w;
                u = b;
                a = new c.f.g.Xe;
                this.ga.gq(a, -(f.x - m * w - g.x + h * s), -(f.y + m * u - g.y - h * r), -(m - h));
                this.v.add(a);
                g.x -= n * a.x;
                g.y -= n * a.y;
                h -= t * (r * a.y - s * a.x + a.z);
                f.x += q * a.x;
                f.y += q * a.y;
                m += p * (u * a.y - w * a.x + a.z);
                d.M = h;
                e.M = m
            },
            Lf: function() {
                var a, b, d = this.Ca,
                    e = this.na;
                a = d.K.G;
                var g = this.tf.x - d.n.X.x,
                    h = this.tf.y - d.n.X.y;
                b = a.l.x * g + a.m.x * h;
                h = a.l.y *
                    g + a.m.y * h;
                g = b;
                a = e.K.G;
                var f = this.uf.x - e.n.X.x,
                    m = this.uf.y - e.n.X.y;
                b = a.l.x * f + a.m.x * m;
                m = a.l.y * f + a.m.y * m;
                f = b;
                a = d.Y;
                b = e.Y;
                var n = d.ia,
                    q = e.ia,
                    t = e.n.c.x + f - d.n.c.x - g,
                    p = e.n.c.y + m - d.n.c.y - h,
                    r = e.n.a - d.n.a - this.Hp,
                    s = 10 * c.f.F.Kb,
                    u = Math.sqrt(t * t + p * p),
                    w = c.f.g.t.abs(r);
                u > s && (n *= 1, q *= 1);
                this.ga.l.x = a + b + h * h * n + m * m * q;
                this.ga.m.x = -h * g * n - m * f * q;
                this.ga.eb.x = -h * n - m * q;
                this.ga.l.y = this.ga.m.x;
                this.ga.m.y = a + b + g * g * n + f * f * q;
                this.ga.eb.y = g * n + f * q;
                this.ga.l.z = this.ga.eb.x;
                this.ga.m.z = this.ga.eb.y;
                this.ga.eb.z = n + q;
                s = new c.f.g.Xe;
                this.ga.gq(s, -t, -p, -r);
                d.n.c.x -= a * s.x;
                d.n.c.y -= a * s.y;
                d.n.a -= n * (g * s.y - h * s.x + s.z);
                e.n.c.x += b * s.x;
                e.n.c.y += b * s.y;
                e.n.a += q * (f * s.y - m * s.x + s.z);
                d.Yc();
                e.Yc();
                return u <= c.f.F.Kb && w <= c.f.F.Qk
            },
            r: c.e.p.Vn
        });
        c.e.p.Wn = function() {
            c.e.p.kc.call(this);
            this.yd = new c.f.g.A;
            this.zd = new c.f.g.A;
            this.type = c.e.p.Ia.Pt;
            this.fk = 0
        };
        c.e.p.Wn.q = !0;
        c.e.p.Wn.N = c.e.p.kc;
        c.e.p.Wn.prototype = s(c.e.p.kc.prototype, {
            ge: function(a, b, d) {
                this.Cb = a;
                this.Lb = b;
                this.yd.P(this.Cb.Ff(d));
                this.zd.P(this.Lb.Ff(d));
                this.fk = this.Lb.Fg() - this.Cb.Fg()
            },
            r: c.e.p.Wn
        });
        var b = {
            AssetType: {
                rg: !0,
                yj: ["Image", "Audio", "Other", "Javascript"]
            }
        };
        b.AssetType.Image = ["Image", 0];
        b.AssetType.Image.mb = b.AssetType;
        b.AssetType.Audio = ["Audio", 1];
        b.AssetType.Audio.mb = b.AssetType;
        b.AssetType.Other = ["Other", 2];
        b.AssetType.Other.mb = b.AssetType;
        b.AssetType.Javascript = ["Javascript", 3];
        b.AssetType.Javascript.mb = b.AssetType;
        b.AssetType.Ei = [b.AssetType.Image, b.AssetType.Audio, b.AssetType.Other, b.AssetType.Javascript];
        b.kq = function(a, b, d) {
            this.name = a;
            this.type = d;
            this.source = b
        };
        b.kq.q = !0;
        b.kq.prototype = {
            r: b.kq
        };
        b.L = {};
        b.L.ng = function() {
            this.Kh = []
        };
        b.L.ng.q = !0;
        b.L.ng.prototype = {
            addEventListener: function(a, k) {
                this.DA(a, k) || this.Kh.push(new b.L.Hq(a, k))
            },
            DA: function(a, b) {
                for (var d = this.Kh.length - 1; 0 <= d;) {
                    if (this.Kh[d].Bv == a && L.Dz(this.Kh[d].action, b)) return !0;
                    d--
                }
                return !1
            },
            dispatchEvent: function(a) {
                a.target = this;
                for (var b = this.Kh.length - 1; 0 <= b;) {
                    var d = this.Kh[b];
                    d.Bv == a.getName() && d.action(a);
                    b--
                }
            },
            dI: function() {
                this.Kh = []
            },
            removeEventListener: function(a, b) {
                if (this.DA(a, b))
                    for (var d =
                            this.Kh.length - 1; 0 <= d;) {
                        var c = this.Kh[d];
                        if (c.Bv == a && L.Dz(c.action, b)) {
                            this.Kh.splice(d, 1);
                            break
                        }
                        d--
                    }
            },
            r: b.L.ng
        };
        b.cb = function() {
            this.Er = 0;
            this.qc = this.Mh = !0;
            this.No = this.rm = !1;
            b.L.ng.call(this);
            this.Er = b.cb.MC++;
            this.Kk = new B.ee.oe;
            this.Mk = []
        };
        b.cb.q = !0;
        b.cb.N = b.L.ng;
        b.cb.prototype = s(b.L.ng.prototype, {
            J: function() {
                this.No = !0;
                this.dispatchEvent(new b.L.pg("initialize"))
            },
            update: function() {
                this.No && this.qc || (this.J(), this.qc && this.Ok())
            },
            Ue: v(),
            sc: v(),
            Ok: function() {
                this.qc = !0;
                this.Mp()
            },
            Rj: function() {
                this.qc = !1;
                this.Np()
            },
            Mp: function() {
                this.dispatchEvent(new b.L.pg("activate"))
            },
            Np: function() {
                this.dispatchEvent(new b.L.pg("deactivate"))
            },
            Fc: v(),
            Ke: v(),
            setProperty: function(a, b) {
                this.Kk.set(a, b)
            },
            Qa: function(a) {
                return this.Kk.get(a)
            },
            pQ: function(a) {
                return this.Kk.vc(a)
            },
            fP: C("rm"),
            kv: function(a) {
                this.Mk.push(a)
            },
            YQ: function(a) {
                for (var b = this.Mk.length, d = 0; d < b;) {
                    var c = d++;
                    this.Mk[c] == a && this.Mk.splice(c, 1)
                }
            },
            EA: function(a) {
                for (var b = this.Mk.length, d = 0; d < b;) {
                    var c = d++;
                    if (this.Mk[c] == a) return !0
                }
                return !1
            },
            RP: C("Mk"),
            getName: C("wg"),
            mx: z("wg"),
            dP: C("Er"),
            hF: C("qc"),
            Ve: function(a) {
                this.No || this.J();
                !this.qc && a && this.Ok();
                this.qc && !a && this.Rj();
                this.qc = a
            },
            kx: z("Mh"),
            Vm: C("Mh"),
            W: function() {
                this.Ve(!1);
                this.rm = !0
            },
            Wd: function() {
                this.dispatchEvent(new b.L.pg("destroy"))
            },
            r: b.cb
        });
        b.w = function(a, k) {
            b.cb.call(this);
            a.jD(this);
            this.mx(k)
        };
        b.w.q = !0;
        b.w.N = b.cb;
        b.w.prototype = s(b.cb.prototype, {
            MO: C("u"),
            nt: z("u"),
            sp: function(a) {
                return this.u.fb(a)
            },
            pa: function() {
                return this.u.pa()
            },
            W: function() {
                b.cb.prototype.W.call(this)
            },
            Wd: function() {
                b.cb.prototype.Wd.call(this)
            },
            r: b.w
        });
        b.Fh = function() {
            this.yy = !1;
            this.Jr = !0;
            this.Je = null;
            b.cb.call(this);
            this.qa = new b.Vector3D;
            this.Rd = new b.Vector3D;
            this.oa = new b.Vector3D(1, 1, 1);
            this.Vb = [];
            this.ub = []
        };
        b.Fh.q = !0;
        b.Fh.N = b.cb;
        b.Fh.prototype = s(b.cb.prototype, {
            J: function() {
                b.cb.prototype.J.call(this);
                for (var a = this.Vb.length, k = 0; k < a;) {
                    var d = k++,
                        d = this.Vb[d];
                    d.qc && d.J()
                }
            },
            gP: C("yy"),
            qR: z("yy"),
            pa: C("Cr"),
            $p: z("Cr"),
            oQ: function(a) {
                for (var b = this.ub.length, d = 0; d < b;) {
                    var c = d++;
                    if (this.ub[c] ==
                        a) return !0
                }
                return !1
            },
            removeChild: function(a) {
                for (var b = this.ub.length, d = 0; d < b;) {
                    var c = d++,
                        g = this.ub[c];
                    if (g == a) {
                        g.SB(null);
                        this.ub.splice(c, 1);
                        break
                    }
                }
            },
            ha: function(a) {
                a == this && b.H.ba.log("Cannot parent an Entity to itself.");
                null != a.getParent() && a.getParent().removeChild(a);
                this.ub.push(a);
                a.SB(this)
            },
            LN: function() {
                for (var a = this.ub.length, b = 0; b < a;) {
                    var d = b++;
                    this.ub[d].W()
                }
                this.ub = []
            },
            getParent: C("Je"),
            HP: function() {
                return null != this.getParent() ? this.getParent() : this
            },
            SB: function(a) {
                this.Je = a;
                null !=
                    this.getParent() ? this.dispatchEvent(new b.L.Ab("addedToParent", {
                        parent: this.getParent()
                    })) : this.dispatchEvent(new b.L.Ab("removedFromParent"));
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            Q: function() {
                var a = this.qa.Ua();
                if (null != this.Je) {
                    var b = this.Je.Q(),
                        d = this.Je.Xb(),
                        c = this.Je.Hg(),
                        g = Math.sin(c.z),
                        c = Math.cos(c.z),
                        h = a.x * g + a.y * c;
                    a.x = (a.x * c - a.y * g) * d.x + b.x;
                    a.y = h * d.y + b.y;
                    a.z += b.z
                }
                return a
            },
            Ve: function(a) {
                b.cb.prototype.Ve.call(this, a);
                for (var k = this.ub.length, d = 0; d < k;) {
                    var c = d++;
                    this.ub[c].Ve(a)
                }
            },
            hF: C("qc"),
            oO: C("ub"),
            EE: function(a) {
                for (var b = this.ub.length, d = 0; d < b;) {
                    var c = d++,
                        c = this.ub[c];
                    if (c.getName() == a) return c;
                    c = c.EE(a);
                    if (null != c) return c
                }
                return null
            },
            Wm: function() {
                return null != this.Je ? this.Je.Wm() && this.Jr : this.Jr
            },
            Ok: function() {
                b.cb.prototype.Ok.call(this);
                for (var a = this.ub.length, k = 0; k < a;) {
                    var c = k++;
                    this.ub[c].Ok()
                }
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            Rj: function() {
                b.cb.prototype.Rj.call(this);
                for (var a = this.ub.length, k = 0; k < a;) {
                    var c = k++;
                    this.ub[c].Rj()
                }
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            qi: function(a) {
                (this.Jr = a) ? this.dispatchEvent(new b.L.Ab("visibilityOn")): this.dispatchEvent(new b.L.Ab("visibilityOff"));
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            ld: function() {
                return this.qa.Ua()
            },
            DP: C("qa"),
            setPosition: function(a, k, c) {
                null == c && (c = 0);
                null == k && (k = 0);
                null == a && (a = 0);
                this.qa = new b.Vector3D(a, k, c);
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            translate: function(a, k, c) {
                null == c && (c = 0);
                null == k && (k = 0);
                null == a && (a = 0);
                this.qa.x += a;
                this.qa.y += k;
                this.qa.z += c;
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            JP: C("Rd"),
            iF: function() {
                return this.Rd.Ua()
            },
            Hg: function() {
                var a = this.Rd.Ua();
                if (null != this.Je) {
                    var b = this.Je.Hg();
                    a.x += b.x;
                    a.y += b.y;
                    a.z += b.z
                }
                return a
            },
            tn: function(a, k, c) {
                null == c && (c = 0);
                null == k && (k = 0);
                null == a && (a = 0);
                this.Rd = new b.Vector3D(a, k, c);
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            sA: C("oa"),
            Xb: function() {
                var a = this.oa.Ua();
                if (null != this.Je) {
                    var b = this.Je.Xb();
                    a.x *= b.x;
                    a.y *= b.y;
                    a.z *= b.z
                }
                return a
            },
            Lc: function(a, k, c) {
                null == c && (c = 1);
                null == k && (k = 1);
                null == a && (a = 1);
                this.oa = new b.Vector3D(a,
                    k, c);
                this.dispatchEvent(new b.L.Ab("displayUpdate"))
            },
            update: function() {
                b.cb.prototype.update.call(this);
                for (var a = this.Vb.length; 0 < a--;) {
                    var k = this.Vb[a];
                    k.rm && (k.Wd(), this.Vb.splice(a, 1))
                }
                a = this.Vb.length;
                for (k = 0; k < a;) {
                    var c = k++,
                        c = this.Vb[c];
                    c.qc && c.Vm() && c.update()
                }
            },
            sc: function() {
                b.cb.prototype.sc.call(this);
                for (var a = this.Vb.length, k = 0; k < a;) {
                    var c = k++;
                    this.Vb[c].sc()
                }
            },
            Ue: function() {
                b.cb.prototype.Ue.call(this);
                for (var a = this.Vb.length, k = 0; k < a;) {
                    var c = k++,
                        c = this.Vb[c];
                    c.qc && c.Vm() && c.Ue()
                }
            },
            Fc: function() {
                b.cb.prototype.Fc.call(this);
                for (var a = this.Vb.length, k = 0; k < a;) {
                    var c = k++,
                        c = this.Vb[c];
                    c.qc && c.Fc()
                }
                a = b.s.instance.Pa("debug").gc().getContext("2d");
                a.save();
                null != b.j.Camera.Gg() && (k = b.j.Camera.Gg().u, c = b.j.Camera.Gg()._zoomScale, a.translate(-k.Q().x * c, -k.Q().y * c), a.scale(c, c));
                a.beginPath();
                a.globalAlpha = 0.65;
                a.lineWidth = 1;
                a.strokeStyle = "#44FF44";
                a.moveTo(this.Q().x, this.Q().y - 10);
                a.lineTo(this.Q().x, this.Q().y + 10);
                a.moveTo(this.Q().x - 10, this.Q().y);
                a.lineTo(this.Q().x + 10, this.Q().y);
                a.moveTo(this.Q().x - 10, this.Q().y - 10);
                a.lineTo(this.Q().x + 10, this.Q().y + 10);
                a.moveTo(this.Q().x + 10, this.Q().y - 10);
                a.lineTo(this.Q().x - 10, this.Q().y + 10);
                a.stroke();
                a.restore();
                b.s.instance.Pa("debug").vn(!0)
            },
            jD: function(a) {
                for (var b = this.Vb.length, c = 0; c < b;) {
                    var e = c++;
                    if (this.Vb[e] == a) return null
                }
                this.Vb.push(a);
                a.nt(this);
                return a
            },
            xO: function(a) {
                for (var b = this.Vb.length, c = 0; c < b;) {
                    var e = c++;
                    if (this.Vb[e].getName() == a) return this.Vb[e]
                }
                return null
            },
            fb: function(a) {
                for (var b = this.Vb.length, c = 0; c < b;) {
                    var e =
                        c++;
                    if (M.np(this.Vb[e]) == a) return this.Vb[e]
                }
                return null
            },
            yO: function(a) {
                for (var b = this.Vb.length, c = 0; c < b;) {
                    var e = c++;
                    if (M.wF(M.np(this.Vb[e])) == a) return this.Vb[e]
                }
                return null
            },
            Js: function(a) {
                var b = [],
                    c = this.SE(a);
                null != c && (b = b.concat(c));
                for (var c = this.ub.length, e = 0; e < c;) {
                    var g = e++,
                        g = this.ub[g].Js(a);
                    null != g && (b = b.concat(g))
                }
                return 0 < b.length ? b : null
            },
            SE: function(a) {
                for (var b = [], c = this.Vb.length, e = 0; e < c;) {
                    var g = e++;
                    M.np(this.Vb[g]) == a && b.push(this.Vb[g])
                }
                return 0 < b.length ? b : null
            },
            Ke: function(a, b) {
                for (var c =
                        this.Vb.length - 1; 0 <= c;) {
                    var e = this.Vb[c];
                    e.qc && e.Ke(a, b);
                    c--
                }
            },
            Vm: function() {
                return null != this.Je ? this.Mh && this.Je.Vm() : this.Mh
            },
            W: function() {
                b.cb.prototype.W.call(this);
                null != this.Cr && this.Cr.GI(this);
                null != this.getParent() && this.getParent().removeChild(this);
                for (var a = this.Vb.length; 0 < a--;) {
                    var k = this.Vb[a];
                    k.W();
                    k.Wd()
                }
                for (a = this.ub.length; 0 < a--;) k = this.ub[a], k.W(), k.Wd()
            },
            Wd: function() {
                b.cb.prototype.Wd.call(this);
                this.Cr = null
            },
            r: b.Fh
        });
        b.la = v();
        b.la.q = !0;
        b.la.Qa = function(a) {
            return b.la.Kk.get(a)
        };
        b.la.mh = function() {
            var a = b.la.Qa("rightToLeft"),
                a = a.toUpperCase();
            return "TRUE" == a || "1" == a
        };
        b.la.setProperty = function(a, k) {
            b.la.Kk.set(a, u.Ah(k))
        };
        b.la.NH = function(a) {
            for (a = w.parse(a).za("gameConfig").next().za("property"); a.wc();) {
                var k = a.next(),
                    c = k.get("name"),
                    k = k.get("value");
                b.la.Kk.set(c, k)
            }
        };
        b.la.prototype = {
            r: b.la
        };
        b.sj = function() {
            this.lc = this.zr = this.Br = this.Zf = this.tr = this.Gi = this.pr = this.Ha = this.Ph = this.mr = this.Qd = this.Lk = null;
            b.Fh.call(this)
        };
        b.sj.q = !0;
        b.sj.HA = function(a) {
            return a.O(new b.sj)
        };
        b.sj.N = b.Fh;
        b.sj.prototype = s(b.Fh.prototype, {
            AA: function() {
                var a = this.Ms();
                null == a && (this.Ph = new b.j.Tf(this));
                return a.AA()
            },
            un: function(a, k, c) {
                var e = this.Ms();
                null == e && (this.Ph = new b.j.Tf(this));
                return e.un(a, k, c)
            },
            cO: function() {
                var a = this.Ms();
                null == a && (this.Ph = new b.j.Tf(this));
                return a.Hv().z
            },
            cR: function(a) {
                var k = this.Ms();
                null == k && (this.Ph = new b.j.Tf(this));
                return k.sn(new b.Vector3D(0, 0, a))
            },
            UO: function() {
                return null != this.lc ? this.lc : this.lc = this.fb(b.j.GameImage)
            },
            VO: function() {
                return null !=
                    this.Br ? this.Br : this.Br = this.fb(b.j.jo)
            },
            PO: function() {
                return null != this.zr ? this.zr : this.zr = this.fb(b.fe.FlashAnimation)
            },
            UP: function() {
                return null != this.Zf ? this.Zf : this.Zf = this.fb(b.j.Ba)
            },
            GO: function() {
                return null != this.tr ? this.tr : this.tr = this.fb(b.j.Zg)
            },
            OE: function() {
                return null != this.Gi ? this.Gi : this.Gi = this.fb(b.j.Hc)
            },
            uO: function() {
                return null != this.pr ? this.pr : this.pr = this.fb(b.j.ff)
            },
            YP: function() {
                return null != this.Ha ? this.Ha : this.Ha = this.fb(b.j.Nd)
            },
            Ms: function() {
                return null != this.Ph ? this.Ph :
                    this.Ph = this.fb(b.j.Tf)
            },
            mO: function() {
                return null != this.mr ? this.mr : this.mr = this.fb(b.ua.Yn)
            },
            jS: function(a, k, c, e, g, h) {
                null == this.Ha && (this.Ha = new b.j.Nd(this));
                this.Qd = [];
                this.Qd.push(this.Ha.Ta(this.qa, "x", this.qa.x, a, c, g, e, h));
                this.Qd.push(this.Ha.Ta(this.qa, "y", this.qa.y, k, c, g, e))
            },
            lS: function(a, k, c, e) {
                null == this.Ha && (this.Ha = new b.j.Nd(this));
                this.Qd = [];
                this.Qd.push(this.Ha.Ta(this.Rd, "z", this.Rd.z, b.H.tc.fp(a), k, e, c))
            },
            kS: function(a, c, d, e, g, h, f) {
                null == this.Ha && (this.Ha = new b.j.Nd(this));
                this.Qd = [];
                this.Qd.push(this.Ha.Ta(this.qa, "x", this.qa.x, a, e, h, g, f));
                this.Qd.push(this.Ha.Ta(this.qa, "y", this.qa.y, c, e, h, g));
                this.Qd.push(this.Ha.Ta(this.Rd, "z", this.Rd.z, b.H.tc.fp(d), e, h, g))
            },
            mS: function(a, c, d, e, g, h) {
                null == this.Ha && (this.Ha = new b.j.Nd(this));
                this.Qd = [];
                this.Qd.push(this.Ha.Ta(this.oa, "x", this.oa.x, a, d, g, e, h));
                this.Qd.push(this.Ha.Ta(this.oa, "y", this.oa.y, c, d, g, e))
            },
            rN: function() {
                if (null != this.Qd) {
                    for (var a = this.Qd.length, b = 0; b < a;) {
                        var c = b++;
                        this.Ha.Nz(this.Qd[c])
                    }
                    this.Qd = null
                }
            },
            bS: function() {
                if (null !=
                    this.Qd) {
                    for (var a = this.Qd.length, b = 0; b < a;) {
                        var c = b++;
                        this.Qd[c].aC()
                    }
                    this.Qd = null
                }
            },
            TQ: function(a, c) {
                null == c && (c = !1);
                this.MJ();
                this.Lk = b.k.SoundManager.Xc(a, !1, c)
            },
            MJ: function() {
                null != this.Lk && this.Lk.stop();
                this.Lk = null
            },
            W: function() {
                b.Fh.prototype.W.call(this);
                null != this.Lk && (this.Lk.stop(), this.Lk = null)
            },
            r: b.sj
        });
        b.s = function(a, c) {
            this.Su = this.Qu = 0;
            this.Mh = !0;
            this.Lo = !1;
            this.Gm = null;
            this.Hi = 0;
            this.xy = !1;
            this.ud = this.lf = this.af = this.zf = null;
            this.py = a;
            this.Gm = new b.I(1, 1);
            this.ud = [];
            b.s.instance =
                this;
            this.af = [];
            this.lf = [];
            this.zf = [];
            this.vy = c
        };
        b.s.q = !0;
        b.s.yF = function() {
            return b.s.Zy
        };
        b.s.UR = function(a) {
            b.s.Zy = a
        };
        b.s.Id = function() {
            return Math.min(0.06666666666666667, b.s.ae - b.s.Rr) * b.s.yF()
        };
        b.s.rA = function() {
            return b.s.ae - b.s.Rr
        };
        b.s.TF = function() {
            return window.isStandalone
        };
        b.s.tQ = function() {
            var a = p.hc().navigator.platform;
            return -1 != a.indexOf("iPhone") || -1 != a.indexOf("iPod") || -1 != a.indexOf("iPad") ? !0 : !1
        };
        b.s.dd = function() {
            var a = p.hc().navigator.platform;
            return -1 != a.indexOf("iPhone") || -1 !=
                a.indexOf("iPod") || -1 != a.indexOf("iPad") || -1 != a.indexOf("android") || -1 != a.indexOf("Linux") ? !0 : !1
        };
        b.s.uQ = function() {
            return -1 != navigator.userAgent.toLowerCase().indexOf("msie")
        };
        b.s.WF = function() {
            return -1 < navigator.userAgent.toLowerCase().indexOf("firefox")
        };
        b.s.ZF = function() {
            return -1 < navigator.userAgent.toLowerCase().indexOf("safari/")
        };
        b.s.HO = I(1);
        b.s.prototype = {
            J: function() {
                b.s.Rr = B.wo.xx();
                b.s.ae = B.wo.xx();
                this.Hd(this.vy);
                this.vy.J();
                p.Va().focus();
                this.Su = p.hc().innerWidth;
                this.Qu = p.hc().innerHeight;
                p.hc().addEventListener("orientationchange", r(this, this.pl), !1);
                p.hc().addEventListener("pageshow", r(this, this.pl), !1);
                p.hc().addEventListener("resize", r(this, this.Gw), !1);
                window.onfocus = r(this, this.Bw);
                window.onblur = r(this, this.Cw);
                p.wd().addEventListener("webkitvisibilitychange", r(this, this.IH), !1);
                p.hc().addEventListener("pagehide", r(this, this.Cw), !1);
                if (b.s.dd()) this.pl();
                else {
                    var a = u.ab(b.la.Qa("gameWidth")),
                        c = u.ab(b.la.Qa("gameHeight")),
                        a = a / this.te().x,
                        c = c / this.te().y;
                    this.TB(a, c)
                }
            },
            update: function() {
                b.s.ae =
                    B.wo.xx();
                this.Lo || this.Bw();
                if (this.Mh) {
                    for (var a = 0, a = this.lf.length; 0 < a--;) {
                        var c = this.lf[a];
                        c.rm && (c.Wd(), this.lf.splice(a, 1))
                    }
                    a = this.lf.length;
                    for (c = 0; c < a;) {
                        var d = c++,
                            d = this.lf[d];
                        d.qc && d.update()
                    }
                    b.k.SoundManager.update();
                    for (a = this.ud.length; 0 < a--;) c = this.ud[a], c.rm && (c.Wd(), this.ud.splice(a, 1));
                    a = this.ud.length;
                    for (c = 0; c < a;) d = c++, this.ud[d].qc && this.ud[d].update();
                    a = this.af.length;
                    for (c = 0; c < a;) d = c++, this.af[d].update();
                    if (!this.xy)
                        for (a = this.zf.length; 0 < a--;) c = this.zf[a], null != c && (c.zl -= b.s.Id(),
                            0 >= c.zl && (c.Tw ? c.gv(c.Tw) : c.gv(), this.zf.splice(a, 1)))
                }
                if (this.Su != p.hc().innerWidth || this.Qu != p.hc().innerHeight) this.pl(), this.Su = p.hc().innerWidth, this.Qu = p.hc().innerHeight;
                b.s.Rr = b.s.ae
            },
            Ue: function() {
                for (var a = this.lf.length, b = 0; b < a;) {
                    var c = b++,
                        c = this.lf[c];
                    c.qc && c.Ue()
                }
                a = this.ud.length;
                for (b = 0; b < a;) c = b++, this.ud[c].qc && this.ud[c].Ue()
            },
            $J: function() {
                var a = "container";
                1 == this.Hi && (a += " portrait");
                p.Va().className = a
            },
            sc: function() {
                for (var a = this.af.length, b = 0; b < a;) {
                    var c = b++,
                        c = this.af[c];
                    c.Ut &&
                        c.fs && c.clear()
                }
                a = this.ud.length;
                for (b = 0; b < a;) c = b++, this.ud[c].sc();
                a = this.lf.length;
                for (b = 0; b < a;) c = b++, this.lf[c].sc();
                a = this.af.length;
                for (b = 0; b < a;) c = b++, c = this.af[c], "debug" != c.getName() && c.sc()
            },
            Fc: function() {
                for (var a = this.ud.length, b = 0; b < a;) {
                    var c = b++;
                    this.ud[c].Fc()
                }
                a = this.lf.length;
                for (b = 0; b < a;) c = b++, this.lf[c].Fc();
                a = this.af.length;
                for (b = 0; b < a;) c = b++, c = this.af[c], "debug" == c.getName() && c.sc(), c.Fc()
            },
            Hd: function(a) {
                for (var b = this.ud.length, c = 0; c < b;) {
                    var e = c++;
                    if (a == this.ud[e]) return a
                }
                this.ud.push(a);
                return a
            },
            ij: function(a, b) {
                null == b && (b = !0);
                b && (a.W(), a.Wd());
                for (var c = this.ud.length, e = 0; e < c;) {
                    var g = e++;
                    if (a == this.ud[g]) {
                        this.ud.splice(g, 1);
                        break
                    }
                }
            },
            Lj: function(a) {
                this.lf.push(a);
                a.J()
            },
            bJ: z("xy"),
            ts: function() {
                this.zf = []
            },
            Ax: function(a, b, c) {
                null == c && (c = !0);
                null != a && this.ij(a, c);
                null != b && this.Hd(b)
            },
            ag: function(a) {
                this.af.push(a)
            },
            uB: function(a) {
                a.W();
                y.remove(this.af, a)
            },
            Pa: function(a) {
                for (var b = this.af.length, c = 0; c < b;) {
                    var e = c++,
                        e = this.af[e];
                    if (e.getName() == a) return e
                }
                return null
            },
            Kc: function(a,
                b) {
                for (var c = this.lf.length - 1; 0 <= c;) this.lf[c].Ke(a, b), c--;
                for (c = this.ud.length - 1; 0 <= c;) this.ud[c].Ke(a, b), c--
            },
            $v: function(a, c, d) {
                a = new b.j.fo(a, c, d);
                this.zf.push(a);
                return a
            },
            jE: function(a) {
                y.remove(this.zf, a)
            },
            pl: function() {
                b.H.ba.log("onOrientationChanged()");
                var a = !1,
                    a = b.s.dd() ? 90 == p.hc().orientation || -90 == p.hc().orientation : !0;
                "HORIZONTAL" == b.la.Qa("forceOrientation") ? (this.Hi = 0, a = !0) : "VERTICAL" == b.la.Qa("forceOrientation") ? (this.Hi = 1, a = !1) : this.Hi = a ? 0 : 1;
                this.Gw();
                this.Kc("onOrientationChanged", {
                    XF: a
                });
                b.H.ba.log("~onOrientationChanged()")
            },
            TB: function(a, b) {
                this.$J();
                this.Gm.x = a;
                this.Gm.y = b;
                this.nH()
            },
            wb: function() {
                return b.s.TF() ? new b.I(0.91 * this.Gm.x, 0.91 * this.Gm.y) : this.Gm
            },
            te: function() {
                return 0 == this.Hi ? new b.I(p.qd, p.gd) : new b.I(p.Eq, p.$n)
            },
            vA: function() {
                var a = p.hc().innerWidth,
                    c = p.hc().innerHeight;
                return 0 == this.Hi ? new b.I(a / 2 - p.qd * this.wb().x / 2, c / 2 - p.gd * this.wb().y / 2) : new b.I(a / 2 - p.Eq * this.wb().x / 2, c / 2 - p.$n * this.wb().y / 2)
            },
            IH: function() {
                p.wd().webkitHidden ? this.Cw() : this.Bw()
            },
            Bw: function() {
                b.H.ba.log("onFocusGained()");
                this.Lo || (b.k.rd.U().Oz(), b.k.SoundManager.zB(), this.Mh = this.Lo = !0, this.Kc("onFocusGained"))
            },
            Cw: function() {
                b.H.ba.log("onFocusLost()");
                b.k.SoundManager.nB();
                this.Lo && (b.k.rd.U().AE(), this.Mh = this.Lo = !1, this.Kc("onFocusLost"))
            },
            Gw: function() {
                var a = 1,
                    c = 1;
                if (b.s.dd() || "1" == b.la.Qa("scaleToScreenOnDesktop")) c = a = 0 == this.Hi ? p.hc().innerHeight / p.gd : p.hc().innerHeight / p.$n;
                else var c = u.ab(b.la.Qa("gameWidth")),
                    a = u.ab(b.la.Qa("gameHeight")),
                    c = c / this.te().x,
                    d = a /
                    this.te().y,
                    a = c,
                    c = d;
                this.Kc("onResizedWindow");
                this.TB(a, c)
            },
            nH: function() {
                var a, c;
                a = p.hc().innerWidth;
                c = p.hc().innerHeight;
                b.s.dd() && this.FA();
                0 == this.Hi ? (p.Va().style.width = p.qd + "px", p.Va().style.height = p.gd + "px") : (p.Va().style.width = p.Eq + "px", p.Va().style.height = p.$n + "px");
                for (var d = this.af.length, e = 0; e < d;) {
                    var g = e++,
                        g = this.af[g],
                        h, f;
                    0 == this.Hi ? (g.gc().style.width = 1 * p.qd * this.wb().x + "px", g.gc().style.height = 1 * p.gd * this.wb().y + "px", h = p.qd * this.wb().x, f = p.gd * this.wb().y) : (g.gc().style.width = 1 * p.qd *
                        this.wb().x + "px", g.gc().style.height = 1 * p.gd * this.wb().y + "px", h = p.Eq * this.wb().x, f = p.$n * this.wb().y);
                    g.Va().style.width = h + "px";
                    g.Va().style.height = f + "px";
                    g.Va().style.left = a / 2 - h / 2 + "px";
                    g.Va().style.top = c / 2 - f / 2 + "px"
                }
                this.Kc("onScreenScaleUpdated")
            },
            NJ: function() {
                this.Mh = !1
            },
            iI: function() {
                this.Mh = !0
            },
            FA: function() {
                this.$m() && !window.location.hash && (document.height < window.outerHeight && (document.body.style.height = window.outerHeight + 50 + "px"), setTimeout(function() {
                    window.scrollTo(0, 1)
                }, 50))
            },
            $m: function() {
                return -1 !=
                    navigator.userAgent.toLowerCase().indexOf("iphone") || -1 != navigator.userAgent.toLowerCase().indexOf("ipod") || -1 != navigator.userAgent.toLowerCase().indexOf("android") || -1 != navigator.userAgent.toLowerCase().indexOf("Linux") ? !0 : !1
            },
            r: b.s
        };
        b.ca = function() {
            this.fh = this.Ho = null;
            this.sm = !1;
            this.ae = 0;
            b.cb.call(this);
            this.pc = [];
            this.fh = [];
            this.Ho = []
        };
        b.ca.q = !0;
        b.ca.N = b.cb;
        b.ca.prototype = s(b.cb.prototype, {
            yP: C("sm"),
            J: function() {
                b.cb.prototype.J.call(this)
            },
            JQ: v(),
            update: function() {
                b.cb.prototype.update.call(this);
                for (var a = this.Ho.length, c = 0; c < a;) {
                    var d = c++,
                        d = this.Ho[d];
                    d.Wd();
                    y.remove(this.pc, d)
                }
                b.H.Ug.clear(this.Ho);
                c = 0;
                if (!this.sm) {
                    b.H.Ug.clear(this.fh);
                    a = this.pc.length;
                    for (d = 0; d < a;) {
                        var e = d++,
                            e = this.pc[e];
                        null != e && e.qc && (this.fh.push(e), c++, e.Vm() && e.update())
                    }
                    this.ae += b.s.Id()
                }
                "1" == b.la.Qa("debugCheats") && b.k.rd.U().vp(105) && (b.H.ba.log(this.pc), b.H.ba.log(this.fh), b.H.ba.log("Active entities: " + c))
            },
            Ue: function() {
                b.cb.prototype.Ue.call(this);
                if (!this.sm)
                    for (var a = this.fh.length, c = 0; c < a;) {
                        var d = c++,
                            d =
                            this.fh[d];
                        d.Vm() && d.Ue()
                    }
            },
            sc: function() {
                b.cb.prototype.sc.call(this);
                for (var a = this.fh.length, c = 0; c < a;) {
                    var d = c++,
                        d = this.fh[d];
                    d.Wm() && d.qc && d.sc()
                }
            },
            Fc: function() {
                b.cb.prototype.Fc.call(this);
                for (var a = this.pc.length, c = 0; c < a;) {
                    var d = c++,
                        d = this.pc[d];
                    d.qc && d.Wm() && d.Fc()
                }
            },
            O: function(a) {
                null == a && (a = new b.Fh);
                a.$p(this);
                this.pc.push(a);
                return a
            },
            XQ: function(a) {
                y.remove(this.pc, a)
            },
            XO: function(a) {
                return -1 != b.H.Ug.indexOf(this.pc, a)
            },
            LO: C("pc"),
            XN: function(a) {
                for (var b = this.pc.length, c = 0; c < b;) {
                    var e =
                        c++,
                        e = this.pc[e];
                    if (e.getName() == a) return e
                }
                return null
            },
            XE: function(a, b) {
                null == b && (b = !0);
                for (var c = [], e = this.pc.length, g = 0; g < e;) {
                    var h = g++,
                        h = this.pc[h];
                    (!b || h.qc) && h.EA(a) && c.push(h)
                }
                return c
            },
            rO: function(a, c, d) {
                null == d && (d = !0);
                c = this.XE(c);
                for (var e = -1, g = null, h = c.length, f = 0; f < h;) {
                    var m = f++,
                        m = c[m];
                    if (!d || m.qc) {
                        var n = m.Q(),
                            n = (new b.Vector3D(n.x - a.x, n.y - a.y, n.z - a.z)).xd();
                        if (-1 == e || n < e) e = n, g = m
                    }
                }
                return g
            },
            cS: function() {
                this.pc.sort(function(a, b) {
                    var c = a.Q(),
                        e = b.Q();
                    return c.z == e.z ? a.Er > b.Er ? 1 : -1 : c.z <
                        e.z ? 1 : -1
                })
            },
            Ke: function(a, c) {
                b.cb.prototype.Ke.call(this, a, c);
                if (!this.sm)
                    for (var d = this.fh.length - 1; 0 <= d;) this.fh[d].qc && this.fh[d].Ke(a, c), d--
            },
            pause: function() {
                this.sm = !0
            },
            resume: function() {
                this.sm = !1
            },
            GD: function(a, b) {
                null == b && (b = !1);
                y.remove(this.pc, a) && this.pc.push(a);
                if (b)
                    for (var c = a.ub, e = c.length, g = 0; g < e;) {
                        var h = g++;
                        this.GD(c[h], !0)
                    }
            },
            II: function(a, b) {
                null == b && (b = !1);
                y.remove(this.pc, a) && this.pc.splice(0, 0, a);
                if (b)
                    for (var c = a.ub, e = c.length, g = 0; g < e;) {
                        var h = g++;
                        this.II(c[h], !0)
                    }
            },
            rQ: function(a,
                c) {
                y.remove(this.pc, a) && this.pc.splice(b.H.Ug.indexOf(this.pc, c) + 1, 0, a)
            },
            GI: function(a) {
                this.Ho.push(a)
            },
            W: function() {
                b.cb.prototype.W.call(this);
                for (var a = this.pc.length - 1; 0 <= a;) this.pc[a].W(), this.pc[a].Wd(), a--;
                this.rm = !0
            },
            r: b.ca
        });
        b.$c = function(a, c, d, e, g) {
            null == g && (g = !1);
            this.$x = null;
            this.fs = !1;
            this.Ut = !0;
            b.cb.call(this);
            this.mx(a);
            this.Zx = p.Va();
            this.gh = p.wd().createElement("canvas");
            this.gh.width = c;
            this.gh.height = d;
            this.gh.style.position = "absolute";
            this.$x = this.gh.getContext("2d");
            g ? (b.$c.Or =
                this, this.Zx.appendChild(this.gh)) : this.gh.style.visibility = "hidden"
        };
        b.$c.q = !0;
        b.$c.EQ = function() {
            return b.$c.Or
        };
        b.$c.N = b.cb;
        b.$c.prototype = s(b.cb.prototype, {
            getContext: C("$x"),
            jQ: C("fs"),
            vn: z("fs"),
            clear: function() {
                b.$c.Or != this && (this.gh.getContext("2d").clearRect(0, 0, this.gh.width, this.gh.height), this.fs = !1)
            },
            sc: function() {
                b.cb.prototype.sc.call(this);
                b.$c.Or != this && b.$c.Or.getContext().drawImage(this.gh, 0, 0)
            },
            update: function() {
                b.cb.prototype.update.call(this)
            },
            Va: C("Zx"),
            gc: C("gh"),
            fO: C("Ut"),
            eR: z("Ut"),
            W: function() {
                b.cb.prototype.W.call(this);
                null != this.Va().parentNode && this.Va().parentNode.removeChild(this.Va());
                null != this.gc().parentNode && this.gc().parentNode.removeChild(this.gc())
            },
            r: b.$c
        });
        b.LoadBatch = function(a) {
            null == a && (a = !1);
            this.Qo = !1;
            this.ay = 0;
            this.Lr = !1;
            this.Oc = 0;
            this.Dy = null;
            this.Nc = [];
            a && (this.Qo = !0)
        };
        b.LoadBatch.q = !0;
        b.LoadBatch.prototype = {
            $f: function(a, c, d) {
                this.Nc.push(new b.kq(a, c, d))
            },
            AG: function() {
                this.Oc--;
                this.Bg();
                b.s.instance.Kc("onFileLoaded", {
                    progress: this.Nc.length -
                        this.Oc,
                    total: this.Nc.length
                });
                this.qh()
            },
            Bg: function() {
                b.s.instance.Kc("onFileLoaded", {
                    progress: this.Nc.length - this.Oc,
                    total: this.Nc.length
                });
                !this.Qo || (this.Lr || 0 < this.Oc) || (this.Lr = !0, this.Dy())
            },
            load: function(a) {
                this.Dy = a;
                this.Qo = !1;
                this.Oc = this.Nc.length;
                this.Lr = !1;
                this.ay = 0;
                0 == this.Nc.length ? (a(), this.Lr = !0) : (this.qh(), b.s.instance.bJ(!1), b.s.instance.$v(1.25, r(this, this.YG)))
            },
            qh: function() {
                if (!(0 >= this.Oc && this.Qo)) {
                    for (var a = null; null == a && 0 < this.Oc;) {
                        a = this.Nc[this.ay++];
                        if (null == a) this.Oc--,
                            this.Bg();
                        else break;
                        b.H.ba.log("SKIP")
                    }
                    if (!(0 >= this.Oc)) switch (a.type[1]) {
                        case 1:
                            if (!b.s.dd() || b.k.SoundManager.Xm()) {
                                var c = null,
                                    d = this;
                                if (b.k.Ga.js(a.name)) {
                                    d.Oc--;
                                    d.Bg();
                                    b.s.instance.Kc("onFileLoaded", {
                                        progress: d.Nc.length - d.Oc,
                                        total: d.Nc.length
                                    });
                                    d.qh();
                                    break
                                }
                                c = -1 < navigator.userAgent.toLowerCase().indexOf("firefox");
                                "mp3" == y.substr(a.source, a.source.length - 3, 3) && (c && !b.k.SoundManager.Uv()) && (a.source = H.replace(a.source, "mp3", "ogg"));
                                if (!b.k.SoundManager.Xm() || c) b.k.SoundManager.Uv() ? (c = soundManager.createSound({
                                    id: a.name,
                                    url: a.source,
                                    autoLoad: !0,
                                    onload: function() {
                                        d.Oc--;
                                        d.Bg();
                                        b.s.instance.Kc("onFileLoaded", {
                                            progress: d.Nc.length - d.Oc,
                                            total: d.Nc.length
                                        });
                                        d.qh()
                                    }
                                }), b.k.Ga.gk(a.name, c)) : (b.H.ba.log("Old sound load method"), c = document.createElement("audio"), c.src = a.source, c.preload = !0, c.autoplay = !1, c.id = a.name, c.addEventListener("canplay", function() {
                                    d.Oc--;
                                    d.Bg();
                                    b.s.instance.Kc("onFileLoaded", {
                                        progress: d.Nc.length - d.Oc,
                                        total: d.Nc.length
                                    });
                                    d.qh()
                                }, !1), c.addEventListener("onerror", function() {
                                    d.Oc--;
                                    alert("File not found: " +
                                        a.source);
                                    d.Bg();
                                    b.s.instance.Kc("onFileLoaded", {
                                        progress: d.Nc.length - d.Oc,
                                        total: d.Nc.length
                                    });
                                    d.qh()
                                }), b.k.Ga.gk(a.name, c), c.load(), b.H.ba.log("Load concluded"));
                                else {
                                    b.H.ba.log("New sound load method");
                                    var e = new XMLHttpRequest;
                                    e.open("GET", a.source, !0);
                                    e.responseType = "arraybuffer";
                                    b.k.Ga.gk(a.name + "_src", a.source);
                                    e.onload = function() {
                                        b.k.SoundManager.Xz().decodeAudioData(e.response, function(c) {
                                            b.k.Ga.gk(a.name, c);
                                            d.Oc--;
                                            d.Bg();
                                            b.s.instance.Kc("onFileLoaded", {
                                                progress: d.Nc.length - d.Oc,
                                                total: d.Nc.length
                                            });
                                            d.qh()
                                        })
                                    };
                                    e.send()
                                }
                            } else b.k.Ga.gk(a.name, a.source), this.Oc--, this.Bg(), this.qh();
                            break;
                        case 0:
                            c = p.wd().createElement("img");
                            b.k.Ga.gk(a.name, c);
                            var g = this;
                            c.addEventListener("load", r(this, this.AG));
                            c.addEventListener("onerror", function() {
                                g.Oc--;
                                alert("file not found: " + a.source);
                                g.Bg();
                                b.s.instance.Kc("onFileLoaded", {
                                    progress: g.Nc.length - g.Oc,
                                    total: g.Nc.length
                                });
                                g.qh()
                            });
                            c.id = a.name;
                            c.src = a.source;
                            break;
                        case 2:
                            var h;
                            h = new XMLHttpRequest;
                            var f = this;
                            h.onload = function() {
                                b.k.Ga.gk(a.name, h.responseText);
                                f.Oc--;
                                f.Bg();
                                b.s.instance.Kc("onFileLoaded", {
                                    progress: f.Nc.length - f.Oc,
                                    total: f.Nc.length
                                });
                                f.qh()
                            };
                            h.onerror = function() {
                                f.Oc--;
                                alert("File not found: " + a.source);
                                f.Bg();
                                f.qh()
                            };
                            h.open("GET", a.source, !0);
                            h.send()
                    }
                }
            },
            YG: function() {
                this.Qo = !0;
                this.Bg()
            },
            QD: function(a) {
                for (var b = a.Nc.length, c = 0; c < b;) {
                    var e = c++;
                    this.Nc.push(a.Nc[e])
                }
            },
            r: b.LoadBatch
        };
        b.ma = v();
        b.ma.q = !0;
        b.ma.QF = function() {
            var a = b.k.Ga.fc("strings");
            b.ma.PJ = w.parse(a).za("strings").next()
        };
        b.ma.wa = function(a) {
            try {
                return b.ma.PJ.za(a).next().firstChild().Wv()
            } catch (c) {
                throw "Could not find string: " +
                a;
            }
        };
        b.ma.prototype = {
            r: b.ma
        };
        b.Ya = function() {
            b.cb.call(this)
        };
        b.Ya.q = !0;
        b.Ya.N = b.cb;
        b.Ya.prototype = s(b.cb.prototype, {
            r: b.Ya
        });
        b.Mt = function() {
            this.Gc = null;
            this.Dg = -1;
            this.Cz = this.Bz = null;
            this.Gc = new b.I
        };
        b.Mt.q = !0;
        b.Mt.prototype = {
            r: b.Mt
        };
        b.hf = function(a, c, d, e) {
            null == e && (e = 0);
            null == d && (d = 0);
            null == c && (c = 0);
            null == a && (a = 0);
            this.R = new b.I(a, c);
            this.da = new b.I(d, e)
        };
        b.hf.q = !0;
        b.hf.prototype = {
            Ua: function() {
                return new b.hf(this.R.x, this.R.y, this.da.x, this.da.y)
            },
            fF: function(a) {
                return !(this.R.x > a.R.x + a.da.x ||
                    this.R.x + this.da.x < a.R.x || this.R.y > a.R.y + a.da.y || this.R.y + this.da.y < a.R.y)
            },
            r: b.hf
        };
        b.Uq = function() {
            this.Vf = {};
            this.load()
        };
        b.Uq.q = !0;
        b.Uq.prototype = {
            setItem: function(a, b) {
                this.Vf[a] = b;
                this.save()
            },
            getItem: function(a, b) {
                if (Object.prototype.hasOwnProperty.call(this.Vf, a)) return L.field(this.Vf, a);
                this.setItem(a, b);
                return b
            },
            save: function() {
                var a = b.s.instance.py + "Data";
                if (null != A.Pf.rp()) try {
                    A.Pf.rp().setItem(a, JSON.stringify(this.Vf))
                } catch (c) {
                    b.H.ba.log("Error saving to session storage")
                }
                if (null !=
                    A.Pf.qp()) try {
                    A.Pf.qp().setItem(a, JSON.stringify(this.Vf))
                } catch (d) {
                    b.H.ba.log("Error saving to local storage")
                }
            },
            load: function() {
                var a = b.s.instance.py + "Data";
                if (null != A.Pf.rp() || null != A.Pf.qp()) {
                    var c = null;
                    try {
                        c = A.Pf.rp().getItem(a)
                    } catch (d) {
                        b.H.ba.log("Failed to get item from session storage")
                    }
                    if (null == c) try {
                        c = A.Pf.qp().getItem(a)
                    } catch (e) {
                        b.H.ba.log("Failed to get item from session storage")
                    }
                    null != c && (this.Vf = JSON.parse(c))
                }
            },
            gE: function() {
                this.Vf = {};
                this.save()
            },
            r: b.Uq
        };
        b.I = function(a, b) {
            null ==
                b && (b = 0);
            null == a && (a = 0);
            this.x = this.y = 0;
            this.x = a;
            this.y = b
        };
        b.I.q = !0;
        b.I.prototype = {
            Ua: function() {
                return new b.I(this.x, this.y)
            },
            xd: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            xh: function(a, b) {
                this.x *= a;
                this.y *= b
            },
            Sk: function(a) {
                return this.x * a.x + this.y * a.y
            },
            Ym: function() {
                var a = this.xd();
                return new b.I(this.x / a, this.y / a)
            },
            r: b.I
        };
        b.Vector3D = function(a, b, c) {
            null == c && (c = 0);
            null == b && (b = 0);
            null == a && (a = 0);
            this.x = this.y = this.z = 0;
            this.x = a;
            this.y = b;
            this.z = c
        };
        b.Vector3D.q = !0;
        b.Vector3D.prototype = {
            add: function(a) {
                return new b.Vector3D(this.x + a.x, this.y + a.y, this.z + a.z)
            },
            zx: function(a) {
                return new b.Vector3D(this.x - a.x, this.y - a.y, this.z - a.z)
            },
            xh: function(a) {
                this.x *= a;
                this.y *= a;
                this.z *= a
            },
            xd: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
            },
            Ua: function() {
                return new b.Vector3D(this.x, this.y, this.z)
            },
            Ym: function() {
                var a = this.xd();
                return new b.Vector3D(this.x / a, this.y / a, this.z / a)
            },
            r: b.Vector3D
        };
        b.audio = {};
        b.audio.cc = function(a, b, c) {
            this.Eo = -1;
            this.No = !1;
            this.Fj = a;
            this.es = b;
            this.Pi = c;
            this.J()
        };
        b.audio.cc.q = !0;
        b.audio.cc.prototype = {
            J: function() {
                this.No = !0
            },
            play: v(),
            resume: v(),
            update: function() {
                this.Eo += b.s.rA()
            },
            pause: v(),
            stop: function() {
                b.k.SoundManager.jj(this)
            },
            setVolume: z("es"),
            NB: z("Pi"),
            Qv: I(1),
            r: b.audio.cc
        };
        b.audio.Nl = function(a, c, d) {
            b.audio.cc.call(this, a, c, d)
        };
        b.audio.Nl.q = !0;
        b.audio.Nl.N = b.audio.cc;
        b.audio.Nl.prototype = s(b.audio.cc.prototype, {
            J: function() {
                b.audio.cc.prototype.J.call(this);
                this.pb = soundManager.createSound({
                    id: this.Fj
                });
                this.pb.setVolume(100 *
                    this.es)
            },
            play: function(a) {
                null == a && (a = 0);
                b.audio.cc.prototype.play.call(this, a);
                b.H.ba.log("FlashSoundData::play()");
                var c = this;
                this.pb.play({
                    onfinish: function() {
                        c.Pi && c.play(0);
                        b.k.SoundManager.jj(c)
                    },
                    onstop: function() {
                        b.k.SoundManager.jj(c)
                    }
                })
            },
            pause: function() {
                b.audio.cc.prototype.pause.call(this);
                b.H.ba.log("FlashSoundData::pause()");
                this.pb.pause()
            },
            stop: function() {
                b.audio.cc.prototype.stop.call(this);
                b.H.ba.log("FlashSoundData::stop()");
                this.pb.stop()
            },
            resume: function() {
                b.audio.cc.prototype.resume.call(this);
                this.pb.resume()
            },
            setVolume: function(a) {
                b.audio.cc.prototype.setVolume.call(this, a);
                b.H.ba.log("FlashSoundData::setVolume()");
                this.pb.setVolume(100 * a)
            },
            r: b.audio.Nl
        });
        b.audio.Sl = function(a, c, d) {
            b.audio.cc.call(this, a, c, d)
        };
        b.audio.Sl.q = !0;
        b.audio.Sl.N = b.audio.cc;
        b.audio.Sl.prototype = s(b.audio.cc.prototype, {
            J: function() {
                b.audio.cc.prototype.J.call(this)
            },
            play: function(a) {
                null == a && (a = 0);
                b.audio.cc.prototype.play.call(this, a);
                b.H.ba.log("Html5SoundData::play()");
                this.pb = b.k.Ga.fc(this.Fj);
                this.pb.play();
                this.pb.addEventListener("ended", r(this, this.Nw), !1);
                this.pb.loop = this.Pi;
                this.pb.volume = this.es
            },
            resume: function() {
                b.audio.cc.prototype.resume.call(this);
                b.H.ba.log("Html5SoundData::resume()");
                this.pb.play()
            },
            pause: function() {
                b.audio.cc.prototype.pause.call(this);
                b.H.ba.log("Html5SoundData::pause()");
                this.pb.pause()
            },
            stop: function() {
                b.audio.cc.prototype.stop.call(this);
                b.H.ba.log("Html5SoundData::stop()");
                this.pb.pause()
            },
            Nw: function() {
                b.H.ba.log("Html5SoundData::onSoundComplete()");
                b.k.SoundManager.jj(this)
            },
            setVolume: function(a) {
                b.audio.cc.prototype.setVolume.call(this, a);
                b.H.ba.log("Html5SoundData::setVolume()");
                this.pb.volume = a
            },
            r: b.audio.Sl
        });
        b.audio.fm = function(a, c, d) {
            null == d && (d = !1);
            null == c && (c = 1);
            this.pb = null;
            b.audio.cc.call(this, a, c, d)
        };
        b.audio.fm.q = !0;
        b.audio.fm.N = b.audio.cc;
        b.audio.fm.prototype = s(b.audio.cc.prototype, {
            J: function() {
                b.audio.cc.prototype.J.call(this);
                b.H.ba.log("WebkitSoundData::init()");
                this.Bk = b.k.SoundManager.Xz();
                this.pb = this.Bk.createBufferSource();
                this.pb.buffer = b.k.Ga.fc(this.Fj);
                this.Ar = null != this.Bk.createGain ? this.Bk.createGain() : this.Bk.createGainNode();
                this.pb.connect(this.Ar);
                this.Ar.connect(this.Bk.destination, 0);
                this.pb.loop = this.Pi;
                this.pb.id = this.Fj;
                this.setVolume(this.es)
            },
            play: function(a) {
                null == a && (a = 0);
                b.audio.cc.prototype.play.call(this, a);
                b.H.ba.log("WebkitSoundData::play()");
                this.Eo = a;
                null != this.pb.start ? this.pb.start(a) : 0 == a ? this.pb.noteOn() : this.pb.noteGrainOn(a)
            },
            pause: function() {
                b.audio.cc.prototype.pause.call(this);
                null != this.pb && (b.H.ba.log("WebkitSoundData::pause()"),
                    null != this.pb.stop ? this.pb.stop(0) : this.pb.noteOff(0), this.pb = null, b.k.SoundManager.jj(this))
            },
            resume: function() {
                b.audio.cc.prototype.resume.call(this);
                b.H.ba.log("WebkitSoundData::resume()");
                this.stop();
                this.J();
                this.play(this.Eo)
            },
            stop: function() {
                b.audio.cc.prototype.stop.call(this);
                null != this.pb && (b.H.ba.log("WebkitSoundData::stop()"), null != this.pb.stop ? this.pb.stop(0) : this.pb.noteOff(0), this.pb = null, b.k.SoundManager.jj(this))
            },
            Qv: function() {
                return this.pb.buffer.duration
            },
            update: function() {
                b.audio.cc.prototype.update.call(this);
                this.Eo > this.Qv() && !this.Pi && b.k.SoundManager.jj(this)
            },
            Nw: function() {
                b.H.ba.log("onSoundComplete()")
            },
            setVolume: function(a) {
                b.audio.cc.prototype.setVolume.call(this, a);
                if (null != this.pb && null != this.pb.gain || null != this.Ar) this.Ar.gain.value = a
            },
            r: b.audio.fm
        });
        b.ua = {};
        b.ua.Xg = {
            rg: !0,
            yj: ["FollowBox2dBody", "FollowEntity"]
        };
        b.ua.Xg.Jq = ["FollowBox2dBody", 0];
        b.ua.Xg.Jq.mb = b.ua.Xg;
        b.ua.Xg.Ix = ["FollowEntity", 1];
        b.ua.Xg.Ix.mb = b.ua.Xg;
        b.ua.Xg.Ei = [b.ua.Xg.Jq, b.ua.Xg.Ix];
        b.ua.Yn = function(a, k, d, e) {
            this.ku = !1;
            this.qe =
                this.Tx = this.Ux = this.Vt = null;
            b.w.call(this, a, "Box2dBody");
            this.Xt = b.ua.Xg.Jq;
            this.Tx = k;
            this.Ux = d;
            this.Vt = e;
            b.ua.Ye.U();
            this.qe = b.ua.Ye.U().Jh.tv(this.Tx);
            this.qe.setUserData({
                Eg: this.u
            });
            this.Vt.shape = this.Ux;
            this.qe.XD(this.Vt);
            a = this.u.Q();
            this.qe.setPosition(new c.f.g.A(a.x, a.y))
        };
        b.ua.Yn.q = !0;
        b.ua.Yn.N = b.w;
        b.ua.Yn.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.pC()
            },
            bP: C("ku"),
            oR: z("ku"),
            Np: function() {
                b.w.prototype.Np.call(this);
                this.qe.setActive(!1)
            },
            Mp: function() {
                b.w.prototype.Mp.call(this);
                this.qe.setActive(!0)
            },
            kO: C("Xt"),
            gR: z("Xt"),
            setPosition: function(a, b) {
                this.qe.setPosition(new c.f.g.A(a, b))
            },
            Q: function() {
                return this.qe.Q()
            },
            BP: function() {
                var a = b.ua.Ye.U().Si,
                    c = this.qe.Q();
                return new b.I(c.x / a, c.y / a)
            },
            LR: function(a, k) {
                var d = b.ua.Ye.U().gF();
                this.qe.setPosition(new c.f.g.A(a / d, k / d))
            },
            gO: C("qe"),
            update: function() {
                b.w.prototype.update.call(this);
                var a = this.u;
                if (this.Xt == b.ua.Xg.Jq) this.pC(), this.ku || a.tn(0, 0, this.qe.Fg());
                else {
                    var k = this.u.Q(),
                        k = b.ua.Ye.U().qF(k.x, k.y);
                    this.qe.setPosition(new c.f.g.A(k.x,
                        k.y));
                    this.qe.JI(a.Hg().z)
                }
            },
            pC: function() {
                var a = this.u,
                    c = this.qe.Q(),
                    d = a.Q(),
                    e = b.ua.Ye.U().Si;
                a.setPosition(c.x / e, c.y / e, d.z)
            },
            W: function() {
                b.w.prototype.W.call(this)
            },
            Wd: function() {
                b.w.prototype.Wd.call(this);
                null != this.qe && (b.ua.Ye.U().Jh.iE(this.qe), this.qe = null)
            },
            r: b.ua.Yn
        });
        b.ua.Zn = v();
        b.ua.Zn.q = !0;
        b.ua.Zn.N = c.e.Bh;
        b.ua.Zn.prototype = s(c.e.Bh.prototype, {
            pv: function(a) {
                c.e.Bh.prototype.pv.call(this, a);
                var k = a.Sc.Eb.getUserData().Eg;
                null != k && k.dispatchEvent(new b.ua.Dh("beginContact", {
                    uc: a
                }));
                k =
                    a.Tc.Eb.getUserData().Eg;
                null != k && k.dispatchEvent(new b.ua.Dh("beginContact", {
                    uc: a
                }))
            },
            As: function(a) {
                c.e.Bh.prototype.As.call(this, a);
                var k = a.Sc.Eb.getUserData().Eg;
                null != k && k.dispatchEvent(new b.ua.Dh("endContact", {
                    uc: a
                }));
                k = a.Tc.Eb.getUserData().Eg;
                null != k && k.dispatchEvent(new b.ua.Dh("endContact", {
                    uc: a
                }))
            },
            UH: v(),
            TH: v(),
            r: b.ua.Zn
        });
        b.L.La = z("wg");
        b.L.La.q = !0;
        b.L.La.prototype = {
            getName: C("wg"),
            r: b.L.La
        };
        b.ua.Dh = function(a, c) {
            this.Vf = null;
            b.L.La.call(this, a);
            this.Vf = c
        };
        b.ua.Dh.q = !0;
        b.ua.Dh.N = b.L.La;
        b.ua.Dh.prototype = s(b.L.La.prototype, {
            getData: C("Vf"),
            setData: z("Vf"),
            r: b.ua.Dh
        });
        b.ua.Ye = function(a, k, d, e) {
            null == e && (e = 2);
            null == d && (d = 6);
            null == k && (k = "orientation");
            this.ey = "";
            this.Si = 0.03333333333333333;
            this.Iy = 2;
            this.$y = 6;
            this.Jh = this.ug = null;
            b.Ya.call(this);
            null == a && (a = new b.I(0, 0));
            this.ug = new c.f.g.A(a.x, a.y);
            b.ua.Ye.dc = this;
            this.$y = d;
            this.Iy = e;
            this.ey = k;
            this.Jh = new c.e.Ub(this.ug, !1)
        };
        b.ua.Ye.q = !0;
        b.ua.Ye.U = function() {
            return b.ua.Ye.dc
        };
        b.ua.Ye.N = b.Ya;
        b.ua.Ye.prototype = s(b.Ya.prototype, {
            J: function() {
                b.Ya.prototype.J.call(this);
                this.cy = b.s.instance.Pa(this.ey);
                this.Ek = new c.e.De;
                this.Ek.qJ(this.cy.gc().getContext("2d"));
                this.Ek.UI(30);
                this.Ek.fJ(1);
                this.Ek.yh(0.5);
                this.Ek.VI(0.1);
                this.Ek.WI(c.e.De.Qz);
                this.Jh.TI(this.Ek);
                this.Jh.RI(new b.ua.Zn)
            },
            hO: C("Jh"),
            gA: C("ug"),
            jx: function(a) {
                this.ug = a;
                this.Jh.jx(a);
                return a
            },
            zP: C("Si"),
            gF: function() {
                return 1 / this.Si
            },
            JR: z("Si"),
            update: function() {
                b.Ya.prototype.update.call(this);
                this.dispatchEvent(new b.ua.oj("preUpdate"));
                for (var a = Math.max(1, Math.floor(b.s.Id() / (1 / 60))), c = 0; c < a;) c++,
                    this.Jh.step(1 / 60, this.$y, this.Iy), this.Jh.HD();
                this.dispatchEvent(new b.ua.oj("update"))
            },
            qF: function(a, b) {
                return new c.f.g.A(a * this.Si, b * this.Si)
            },
            kQ: function(a, c) {
                return new b.I(a / this.Si, c / this.Si)
            },
            Fc: function() {
                b.Ya.prototype.Fc.call(this);
                this.Jh.oE();
                this.cy.vn(!0)
            },
            r: b.ua.Ye
        });
        b.ua.oj = function(a) {
            b.L.La.call(this, a)
        };
        b.ua.oj.q = !0;
        b.ua.oj.N = b.L.La;
        b.ua.oj.prototype = s(b.L.La.prototype, {
            r: b.ua.oj
        });
        b.h = {};
        b.h.Yg = function() {
            this.Vj = [];
            this.R = new b.I;
            this.da = new b.I
        };
        b.h.Yg.q = !0;
        b.h.Yg.prototype = {
            Ua: function() {
                var a = new b.h.Yg;
                a.R = this.R.Ua();
                a.da = this.da.Ua();
                for (var c = this.Vj.length, d = 0; d < c;) {
                    var e = d++;
                    a.Vj.push(this.Vj[e])
                }
                return a
            },
            cg: I(!1),
            $h: I(-1),
            r: b.h.Yg
        };
        b.h.sk = function() {
            b.h.Yg.call(this)
        };
        b.h.sk.q = !0;
        b.h.sk.N = b.h.Yg;
        b.h.sk.prototype = s(b.h.Yg.prototype, {
            cg: function(a) {
                b.h.Yg.prototype.cg.call(this, a);
                return a.x >= this.R.x && a.y >= this.R.y && a.x <= this.R.x + this.da.x && a.y <= this.R.y + this.da.y
            },
            tN: I(!0),
            $h: function(a, c, d, e) {
                null == e && (e = !1);
                for (var g = new b.I, h = [new b.I(this.R.x, this.R.y),
                        new b.I(this.R.x + this.da.x, this.R.y), new b.I(this.R.x + this.da.x, this.R.y + this.da.y), new b.I(this.R.x, this.R.y + this.da.y)
                    ], f = -1, m = 0, n = h.length - 1; m < n;) {
                    var q = m++,
                        q = b.H.tc.Xs(a, c, h[q], h[q + 1], g);
                    if (0 < q)
                        if (e) {
                            if (-1 == f || q < f) d.x = g.x, d.y = g.y, f = q
                        } else return d.x = g.x, d.y = g.y, q
                }
                a = b.H.tc.Xs(a, c, h[0], h[h.length - 1], g);
                if (0 < a)
                    if (e) {
                        if (-1 == f || a < f) d.x = g.x, d.y = g.y, f = a
                    } else return d.x = g.x, d.y = g.y, a;
                return f
            },
            Ua: I(null),
            r: b.h.sk
        });
        b.h.ro = function() {
            this.Bj = this.Ik = null;
            b.h.Yg.call(this);
            this.Bj = new b.I(999999, 999999);
            this.Ik = new b.I(-999999, -999999);
            this.Xf = []
        };
        b.h.ro.q = !0;
        b.h.ro.N = b.h.Yg;
        b.h.ro.prototype = s(b.h.Yg.prototype, {
            nD: function(a, c) {
                this.Xf.push(new b.I(a, c));
                a < this.Bj.x && (this.Bj.x = a);
                c < this.Bj.y && (this.Bj.y = c);
                a > this.Ik.x && (this.Ik.x = a);
                c > this.Ik.y && (this.Ik.y = c)
            },
            CP: C("Xf"),
            cg: function(a) {
                for (var b = this.Xf.length, c = 0, e = !1, g = null, h = null; c < b;) {
                    g = this.Xf[c].Ua();
                    h = this.Xf[(c + 1) % b].Ua();
                    g.x += this.R.x;
                    g.y += this.R.y;
                    h.x += this.R.x;
                    h.y += this.R.y;
                    if (0 == c) e = 0 < (a.y - g.y) * (h.x - g.x) - (a.x - g.x) * (h.y - g.y);
                    else if (e &&
                        0 > (a.y - g.y) * (h.x - g.x) - (a.x - g.x) * (h.y - g.y) || !e && 0 < (a.y - g.y) * (h.x - g.x) - (a.x - g.x) * (h.y - g.y)) return !1;
                    c++
                }
                return !0
            },
            $h: function(a, c, d, e, g) {
                null == e && (e = !1);
                var h = new b.hf;
                h.R = this.Bj.Ua();
                h.da = new b.I(this.Ik.x - this.Bj.x, this.Ik.y - this.Bj.y);
                h.R.x += this.R.x;
                h.R.y += this.R.y;
                var f = Math.abs(c.x - a.x),
                    m = Math.abs(c.y - a.y);
                if (!h.fF(new b.hf(a.x < c.x ? a.x : c.x, a.y < c.y ? a.y : c.y, f, m))) return -1;
                for (var h = new b.I, m = this.Xf, f = -1, n = 0, q = m.length - 1; n < q;) {
                    var t = n++,
                        p = m[t].Ua();
                    p.x += this.R.x;
                    p.y += this.R.y;
                    var r = m[t + 1].Ua();
                    r.x += this.R.x;
                    r.y += this.R.y;
                    t = b.H.tc.Xs(a, c, p, r, h);
                    if (0 < t)
                        if (e) {
                            if (-1 == f || t < f) d.x = h.x, d.y = h.y, null != g && (f = (new b.I(r.y - p.y, p.x - r.x)).Ym(), g.x = f.x, g.y = f.y, 0 < (new b.I(c.x - a.x, c.y - a.y)).Sk(g) && (g.x *= -1, g.y *= -1)), f = t
                        } else return d.x = h.x, d.y = h.y, null != g && (d = (new b.I(r.y - p.y, p.x - r.x)).Ym(), g.x = d.x, g.y = d.y, 0 < (new b.I(c.x - a.x, c.y - a.y)).Sk(g) && (g.x *= -1, g.y *= -1)), t
                }
                n = m[0].Ua();
                n.x += this.R.x;
                n.y += this.R.y;
                q = m[m.length - 1].Ua();
                q.x += this.R.x;
                q.y += this.R.y;
                m = b.H.tc.Xs(a, c, n, q, h);
                if (0 < m)
                    if (e) {
                        if (-1 == f || m < f) d.x =
                            h.x, d.y = h.y, null != g && (d = (new b.I(q.y - n.y, n.x - q.x)).Ym(), g.x = d.x, g.y = d.y, 0 < (new b.I(c.x - a.x, c.y - a.y)).Sk(g) && (g.x *= -1, g.y *= -1)), f = m
                    } else return d.x = h.x, d.y = h.y, null != g && (d = (new b.I(q.y - n.y, n.x - q.x)).Ym(), g.x = d.x, g.y = d.y, 0 < (new b.I(c.x - a.x, c.y - a.y)).Sk(g) && (g.x *= -1, g.y *= -1)), m;
                return f
            },
            Ua: I(null),
            r: b.h.ro
        });
        b.j = {};
        b.j.si = function(a, c, d) {
            this.ny = 30;
            this.Pi = !0;
            this.vm = 0;
            this.wg = a;
            this.Ao = [];
            null == d || (this.vm = d);
            this.Wo = c;
            this.vb = new b.I
        };
        b.j.si.q = !0;
        b.j.si.MH = function(a, c) {
            for (var d = w.parse(c), e = d.za("animation").next().get("name"),
                    e = new b.j.si(e, a, d.za("animation").next().get("length")), d = d.za("animation").next().za("keyframe"); d.wc();) {
                var g = d.next(),
                    g = new b.j.fe.Al(g.get("index"), g.get("spriteIndex"));
                e.jv(g)
            }
            b.k.df.U().Zw(e);
            return e
        };
        b.j.si.CQ = function(a, c, d, e) {
            null == e && (e = -1);
            var g = b.ac.ne.U().Xk(c),
                h = 0; - 1 == e && (e = g.Gd.length);
            a = new b.j.si(a, c, e * d);
            for (c = 0; c < e;) g = c++, a.jv(new b.j.fe.Al(h, g)), h += d;
            b.k.df.U().Zw(a);
            return a
        };
        b.j.si.DQ = function(a, c, d, e, g, h) {
            null == h && (h = -1);
            null == g && (g = !1);
            var f = b.ac.ne.U().Xk(c),
                m = 0,
                n = f.Gd.length; - 1 == h && (h = n);
            for (var q = 0, t = 0; t < h;) {
                var p = t++;
                H.bC(f.Sv(p).getName(), d) && q++
            }
            a = new b.j.si(a, c, q * e);
            for (q = c = 0; q < n && !(t = q++, H.bC(f.Sv(t).getName(), d) && (a.jv(new b.j.fe.Al(m, t)), m += e, c++, c >= h)););
            a.NB(g);
            b.k.df.U().Zw(a);
            return a
        };
        b.j.si.prototype = {
            xd: function() {
                return this.vm / this.ny
            },
            getName: C("wg"),
            NB: z("Pi"),
            of: C("vb"),
            Kf: function(a, b) {
                this.vb.x = a;
                this.vb.y = b
            },
            jv: function(a) {
                this.Ao.push(a);
                var b = a.Q();
                this.vm = Math.max(this.vm, a.Q());
                b > this.vm && (this.vm = b)
            },
            uF: function(a) {
                for (var b = this.Ao.length,
                        c = this.Ao[0].$u, e = 0; e < b;) {
                    var g = e++;
                    if (a >= this.Ao[g].Q() / this.ny) c = this.Ao[g].$u;
                    else break
                }
                return c
            },
            r: b.j.si
        };
        b.j.Hc = function(a, c, d, e, g) {
            this.vg = this.vu = this.Dr = !1;
            this.Ko = !0;
            this.Hu = this.Lu = this.Ou = this.Mu = this.Ey = this.Nu = null;
            b.w.call(this, a, "Button");
            this.Bb = new b.h.sk;
            this.Co = c;
            this.jm = d;
            this.Z = g;
            this.rt(e)
        };
        b.j.Hc.q = !0;
        b.j.Hc.GN = function(a) {
            return new b.j.Hc(a.u, a.Mb(), new b.I(0, 0))
        };
        b.j.Hc.HN = function(a, c, d) {
            null == d && (d = 0);
            c = p.wd().getElementById(c);
            var e = c.clientWidth + d,
                g = c.clientHeight +
                d;
            return new b.j.Hc(a, new b.I(e, g), new b.I(c.offsetLeft - a.Q().x - d / 2 + e / 2, c.offsetTop - a.Q().y - d / 2 + g / 2))
        };
        b.j.Hc.FN = function(a, c, d, e) {
            null == e && (e = 0);
            c = p.wd().getElementById(c);
            var g = u.gb(c.style.width) + e,
                h = u.gb(c.style.height) + e,
                f = b.j.Ee.wA(c).y - e / 2;
            return new b.j.Hc(a, new b.I(g, h), new b.I(b.j.Ee.wA(c).x - e / 2 - a.Q().x + g / 2, f - a.Q().y + h / 2), d)
        };
        b.j.Hc.qs = function(a) {
            return new b.j.Hc(a.u, a.Mb(), null)
        };
        b.j.Hc.N = b.w;
        b.j.Hc.prototype = s(b.w.prototype, {
            aQ: C("Ko"),
            XB: z("Ko"),
            DR: z("Hu"),
            rt: z("Lu"),
            HR: z("Mu"),
            RB: z("Ou"),
            IR: z("Nu"),
            hP: C("vu"),
            KB: z("vu"),
            getData: C("Vf"),
            setData: z("Vf"),
            J: function() {
                b.w.prototype.J.call(this);
                this.oC()
            },
            update: function() {
                b.w.prototype.update.call(this);
                this.oC();
                this.Dr = !1;
                !1 == this.u.Wm() && (this.Dr = !0)
            },
            Kf: function(a, c) {
                this.jm = new b.I(a, c)
            },
            of: C("jm"),
            oC: function() {
                this.Bb.R.x = this.u.Q().x - this.Co.x / 2;
                this.Bb.R.y = this.u.Q().y - this.Co.y / 2;
                this.Bb.da.x = this.Co.x;
                this.Bb.da.y = this.Co.y;
                null != this.jm && (this.Bb.R.x += this.jm.x, this.Bb.R.y += this.jm.y);
                if (null != this.Z) {
                    var a = this.Z._zoomScale;
                    this.Bb.R.x *= 1 * a;
                    this.Bb.R.y *= 1 * a;
                    this.Bb.da.x *= 1 * a;
                    this.Bb.da.y *= 1 * a
                }
            },
            Dw: function(a) {
                a = a.Ua();
                if (null != this.Z) {
                    var c = this.Z._zoomScale;
                    a.x += this.Z.u.Q().x * c;
                    a.y += this.Z.u.Q().y * c
                }
                this.Bb.cg(a) && (this.u.dispatchEvent(new b.L.Ab("mouseClick", {
                    button: this,
                    Eg: this.u
                })), null != this.Hu && this.Hu(this))
            },
            uh: function(a) {
                a = a.Ua();
                if (null != this.Z) {
                    var c = this.Z._zoomScale;
                    a.x += this.Z.u.Q().x * c;
                    a.y += this.Z.u.Q().y * c
                }
                return this.Bb.cg(a) ? (this.u.dispatchEvent(new b.L.Ab("mouseDown", {
                        button: this,
                        Eg: this.u
                    })), null !=
                    this.Lu && this.Lu(this), b.s.dd() && (this.vg = !0), !0) : !1
            },
            gt: function(a) {
                a = a.Ua();
                if (null != this.Z) {
                    var c = this.Z._zoomScale;
                    a.x += this.Z.u.Q().x * c;
                    a.y += this.Z.u.Q().y * c
                }
                this.Bb.cg(a) ? (this.u.dispatchEvent(new b.L.Ab("mouseOver", {
                    button: this,
                    Eg: this.u
                })), this.vg || this.ek(a), this.vg = !0, this.u.dispatchEvent(new b.L.Ab("mouseMove", {
                    button: this,
                    Eg: this.u
                })), null != this.Mu && this.Mu(this)) : this.vg && !b.s.dd() && (this.fj(a), this.vg = !1)
            },
            ht: function(a) {
                a = a.Ua();
                if (null != this.Z) {
                    var c = this.Z._zoomScale;
                    a.x += this.Z.u.Q().x *
                        c;
                    a.y += this.Z.u.Q().y * c
                }
                this.Bb.cg(a) && (this.u.dispatchEvent(new b.L.Ab("mouseUp", {
                    button: this,
                    Eg: this.u
                })), null != this.Ou && this.Ou(this))
            },
            ek: function(a) {
                a = a.Ua();
                if (null != this.Z) {
                    var c = this.Z._zoomScale;
                    a.x += this.Z.u.Q().x * c;
                    a.y += this.Z.u.Q().y * c
                }
                this.Ko && (p.wd().body.style.cursor = "pointer");
                this.u.dispatchEvent(new b.L.Ab("mouseOver", {
                    button: this,
                    Eg: this.u
                }));
                null != this.Ey && this.Ey(this);
                this.vg = !0
            },
            fj: function(a) {
                if (null != a) {
                    a = a.Ua();
                    if (null != this.Z) {
                        var c = this.Z._zoomScale;
                        a.x += this.Z.u.Q().x *
                            c;
                        a.y += this.Z.u.Q().y * c
                    }
                    this.Ko && (p.wd().body.style.cursor = "default");
                    this.u.dispatchEvent(new b.L.Ab("mouseOut", {
                        button: this,
                        Eg: this.u
                    }));
                    null != this.Nu && this.Nu(this);
                    this.vg = !1
                }
            },
            gK: function(a) {
                var c = !1;
                if (null != a && null != a.touches) {
                    for (var d = a.touches.length, e = this.Z._zoomScale, g = 0; g < d;) {
                        var h = g++,
                            h = a.touches[h],
                            f = b.s.instance.vA();
                        this.Bb.cg(new b.I((h.pageX - f.x) / b.s.instance.wb().x * e, (h.pageY - f.y) / b.s.instance.wb().y * e)) && (c = !0)
                    }!c && this.vg ? this.fj(null) : c && !this.vg && this.ek(null)
                }
            },
            iR: function(a,
                b) {
                this.Co = a;
                this.jm = b
            },
            Ke: function(a, c) {
                b.w.prototype.Ke.call(this, a, c);
                if ((!c || !c.VF) && (this.u.Wm() && this.qc) && !this.Dr) switch (a) {
                    case "mouseClick":
                        this.Dw(c);
                        break;
                    case "mouseDown":
                        this.uh(c) && this.vu && (c.VF = !0);
                        break;
                    case "mouseUp":
                        this.ht(c);
                        break;
                    case "mouseMove":
                        this.gt(c);
                        break;
                    case "verifyTouches":
                        this.gK(c)
                }
            },
            Ok: function() {
                b.w.prototype.Ok.call(this);
                this.Dr = !0
            },
            Rj: function() {
                b.w.prototype.Rj.call(this);
                this.vg && this.Ko && (p.wd().body.style.cursor = "default");
                this.vg && this.u.dispatchEvent(new b.L.Ab("mouseOut", {
                    button: this,
                    Eg: this.u
                }))
            },
            Fc: function() {
                b.w.prototype.Fc.call(this);
                var a = b.s.instance.Pa("debug").gc().getContext("2d");
                a.save();
                var c = 1,
                    d = new b.I(0, 0);
                null != this.Z && (d = this.Z.u, c = this.Z._zoomScale, d = d.Q(), d = new b.I(-d.x, -d.y), d.xh(c, c));
                this.u.Xb().Ua();
                a.setTransform(1, 0, 0, 1, 1 * Math.floor(d.x), 1 * Math.floor(d.y));
                a.beginPath();
                a.lineWidth = 1;
                a.strokeStyle = "#FF0000";
                a.moveTo(this.Bb.R.x, this.Bb.R.y);
                a.lineTo(this.Bb.R.x + this.Bb.da.x, this.Bb.R.y);
                a.lineTo(this.Bb.R.x + this.Bb.da.x, this.Bb.R.y + this.Bb.da.y);
                a.lineTo(this.Bb.R.x, this.Bb.R.y + this.Bb.da.y);
                a.lineTo(this.Bb.R.x, this.Bb.R.y);
                a.stroke();
                a.restore()
            },
            W: function() {
                b.w.prototype.W.call(this);
                this.vg && this.fj(null)
            },
            r: b.j.Hc
        });
        b.j.Camera = function(a) {
            this.vb = null;
            this._zoomScale = 1;
            this.Qc = this.oc = this.Yr = null;
            b.w.call(this, a, "Camera");
            this.vb = new b.I;
            this.Oi = b.s.instance.te().x;
            this.Ni = b.s.instance.te().y;
            null == b.j.Camera.rr && (b.j.Camera.rr = this)
        };
        b.j.Camera.q = !0;
        b.j.Camera.Gg = function() {
            return b.j.Camera.rr
        };
        b.j.Camera.N = b.w;
        b.j.Camera.prototype =
            s(b.w.prototype, {
                xA: C("Qc"),
                eq: function(a) {
                    null != this.Qc && this.Qc.removeEventListener("destroy", r(this, this.it));
                    this.Qc = a;
                    null != this.Qc && this.Qc.addEventListener("destroy", r(this, this.it))
                },
                Kf: z("vb"),
                of: C("vb"),
                nQ: C("_zoomScale"),
                YB: z("_zoomScale"),
                kP: function() {
                    return new b.I(this.Oi, this.Ni)
                },
                sR: function(a, b) {
                    this.Oi = a;
                    this.Ni = b
                },
                J: function() {
                    b.w.prototype.J.call(this);
                    this.Yr = this.sp(b.j.Ak)
                },
                NP: C("Yr"),
                AQ: function() {
                    null != this.Qc && this.u.setPosition(this.Qc.Q().x - this.Oi / this._zoomScale / 2 + this.vb.x /
                        this._zoomScale, this.Qc.Q().y - this.Ni / this._zoomScale / 2 + this.vb.y / this._zoomScale, this.u.Q().z)
                },
                mp: function() {
                    var a = this.u.Q();
                    return new b.Vector3D(a.x - this.Oi / this._zoomScale / 2, a.y - this.Ni / this._zoomScale / 2, a.z)
                },
                update: function() {
                    b.w.prototype.update.call(this);
                    null != this.Qc && (null == this.Yr ? this.u.setPosition(this.Qc.Q().x - this.Oi / this._zoomScale / 2 + this.vb.x / this._zoomScale, this.Qc.Q().y - this.Ni / this._zoomScale / 2 + this.vb.y / this._zoomScale, this.u.Q().z) : this.Yr.eq(this.Qc.Q().x - this.Oi / this._zoomScale /
                        2 + this.vb.x / this._zoomScale, this.Qc.Q().y - this.Ni / this._zoomScale / 2 + this.vb.y / this._zoomScale, this.u.Q().z));
                    this.ZJ()
                },
                ZJ: function() {
                    if (null != this.oc) {
                        var a = this.u.Q().Ua(),
                            c = this.Oi / 2 / this._zoomScale,
                            d = this.Ni / 2 / this._zoomScale,
                            e = new b.I(a.x + c, a.y + d),
                            g = !1;
                        e.x - c < this.oc.R.x && (e.x = this.oc.R.x + c, g = !0);
                        e.y - d < this.oc.R.y && (e.y = this.oc.R.y + d, g = !0);
                        e.x + c > this.oc.R.x + this.oc.da.x && (e.x = this.oc.R.x + this.oc.da.x - c, g = !0);
                        e.y + d > this.oc.R.y + this.oc.da.y && (e.y = this.oc.R.y + this.oc.da.y - d, g = !0);
                        a.x = e.x - c;
                        a.y = e.y -
                            d;
                        g && this.u.setPosition(a.x, a.y, a.z)
                    }
                },
                rF: function(a, c) {
                    if (null != this.oc) {
                        var d = this.Oi / 2 / this._zoomScale,
                            e = this.Ni / 2 / this._zoomScale,
                            g = new b.I(a, c);
                        g.x - d < this.oc.R.x && (g.x = this.oc.R.x + d);
                        g.y - e < this.oc.R.y && (g.y = this.oc.R.y + e);
                        g.x + d > this.oc.R.x + this.oc.da.x && (g.x = this.oc.R.x + this.oc.da.x - d);
                        g.y + e > this.oc.R.y + this.oc.da.y && (g.y = this.oc.R.y + this.oc.da.y - e);
                        a = g.x;
                        c = g.y
                    }
                    return new b.I(a, c)
                },
                lO: C("oc"),
                FB: function(a, c, d, e) {
                    this.oc = new b.hf(a, c, d - a, e - c)
                },
                zF: function() {
                    var a = this.u.Q();
                    return new b.hf(a.x,
                        a.y, 2 * (this.Oi / 2 / this._zoomScale), 2 * (this.Ni / 2 / this._zoomScale))
                },
                NN: function() {
                    this.oc = null
                },
                W: function() {
                    b.w.prototype.W.call(this);
                    b.j.Camera.rr == this && (b.j.Camera.rr = null)
                },
                it: function() {
                    this.eq(null)
                },
                r: b.j.Camera
            });
        b.j.ff = function(a, c) {
            this.vb = this.Iu = this.Ku = this.Ju = null;
            b.w.call(this, a, "Collider");
            this.vb = c
        };
        b.j.ff.q = !0;
        b.j.ff.N = b.w;
        b.j.ff.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                b.k.Sf.U().aI(this)
            },
            $z: I(null),
            cg: I(!1),
            update: function() {
                b.w.prototype.update.call(this)
            },
            $h: function(a, c) {
                b.k.Sf.U().dispatchEvent(new b.L.Xl("raycastCheck", a, c));
                return -1
            },
            Fc: function() {
                b.w.prototype.Fc.call(this)
            },
            ER: z("Iu"),
            FR: z("Ju"),
            GR: z("Ku"),
            KQ: function(a) {
                this.qc && null != this.Iu && this.Iu(a, this)
            },
            NQ: function(a) {
                this.qc && null != this.Ku && this.Ku(a, this)
            },
            LQ: function(a) {
                this.qc && null != this.Ju && this.Ju(a, this)
            },
            Wd: function() {
                b.w.prototype.Wd.call(this);
                b.k.Sf.U().sB(this)
            },
            r: b.j.ff
        });
        b.j.fo = function(a, b, c, e) {
            null == e && (e = !1);
            this.YF = this.xB = !1;
            this.zl = a;
            this.gv = b;
            this.Tw = c;
            this.xB = e;
            this.duration = a
        };
        b.j.fo.q = !0;
        b.j.fo.prototype = {
            update: function() {
                this.YF || (this.zl -= b.s.Id())
            },
            r: b.j.fo
        };
        b.j.Zg = function(a) {
            b.w.call(this, a, "DeferredActionComponent");
            this.zf = []
        };
        b.j.Zg.q = !0;
        b.j.Zg.N = b.w;
        b.j.Zg.prototype = s(b.w.prototype, {
            update: function() {
                b.w.prototype.update.call(this);
                for (var a = this.zf.length - 1; 0 <= a;) {
                    var c = this.zf[a];
                    c.update();
                    0 >= c.zl && (c.gv(c.Tw), c.xB ? c.zl = c.duration : y.remove(this.zf, c));
                    a--
                }
            },
            Qh: function(a, c, d) {
                a = new b.j.fo(a, c, d);
                this.zf.push(a);
                return a
            },
            WQ: function(a) {
                y.remove(this.zf,
                    a)
            },
            ts: function() {
                this.zf = []
            },
            r: b.j.Zg
        });
        b.j.GameImage = function(a, c, d, e) {
            this.Ti = this.Rd = this.Gd = this.Jb = this.Sa = this.Dc = this.Ck = this.re = null;
            this._alpha = 1;
            this.mf = null;
            this.hd = "";
            this.wC = !1;
            b.w.call(this, a, "GameImage");
            this.hd = c;
            this.T = d;
            this.Fe = new b.I(1, 1);
            this.Am = new b.I;
            this.Z = e;
            this.vb = new b.I;
            this.oa = new b.Vector3D(1, 1, 1);
            this.Ti = new b.I;
            this.Rd = new b.Vector3D(0, 0, 0);
            this.re = null
        };
        b.j.GameImage.q = !0;
        b.j.GameImage.N = b.w;
        b.j.GameImage.prototype = s(b.w.prototype, {
            qO: C("re"),
            ix: function(a) {
                1 > a.da.x &&
                    (a.da.x = 1);
                1 > a.da.y && (a.da.y = 1);
                this.re = a
            },
            PE: C("Z"),
            gx: z("Z"),
            aA: C("Jb"),
            zh: z("Jb"),
            Hg: C("Rd"),
            tn: z("Rd"),
            rJ: z("Gd"),
            ot: function(a) {
                b.k.Ga.js(a) && "" != a && (this.hd = a, this.Dc = this.eF(), this.Ck = null)
            },
            eF: function() {
                return b.k.Ga.fc(this.hd)
            },
            LP: C("Ti"),
            UB: function(a, c) {
                this.Ti = new b.I(a, c)
            },
            RR: z("hd"),
            of: C("vb"),
            Kf: function(a, c) {
                this.vb = new b.I(a, c)
            },
            ec: function() {
                "" != this.hd && (this.Mb(), this.Kf(-this.Dc.width / 2, -this.Dc.height / 2))
            },
            Gs: C("_alpha"),
            yh: z("_alpha"),
            pF: C("Am"),
            nJ: function(a, c) {
                this.Am = new b.I(a,
                    c)
            },
            kA: C("T"),
            qt: function(a) {
                this.T = a;
                this.Sa = null
            },
            iA: C("hd"),
            Mb: function() {
                if (null != this.Ck) return this.Ck;
                null == this.Dc && (this.Dc = b.k.Ga.fc(this.hd));
                var a = this.u.Xb();
                return null != this.Gd ? this.Ck = new b.I(this.Gd.Jb.da.x * Math.abs(a.x * this.oa.x), this.Gd.Jb.da.y * Math.abs(a.y * this.oa.y)) : "" == this.hd ? new b.I(0, 0) : this.Ck = new b.I(this.Dc.width * Math.abs(a.x * this.oa.x), this.Dc.height * Math.abs(a.y * this.oa.y))
            },
            jF: C("mf"),
            hJ: z("mf"),
            Lc: function(a, c, d) {
                null == d && (d = 1);
                null == c && (c = 1);
                null == a && (a = 1);
                this.oa =
                    new b.Vector3D(a, c, d)
            },
            Xb: C("oa"),
            QE: C("Fe"),
            Zp: z("Fe"),
            sc: function() {
                b.w.prototype.sc.call(this);
                var a = this.u,
                    c = a.Q();
                if ("" != this.hd || null != this.Gd) {
                    var d = 1,
                        e = new b.I(0, 0),
                        g = new b.I(1, 1);
                    null != this.Z && (e = this.Z.u, d = this.Z._zoomScale, e = e.Q(), e = new b.I(-(e.x / this.Fe.x) * g.x, -(e.y / this.Fe.y) * g.y), e.xh(d, d));
                    null == this.Sa && (this.Sa = this.T.gc().getContext("2d"));
                    this.Sa.save();
                    null != this.mf && (this.Sa.scale(1, 1), this.Sa.translate(e.x / g.x * d, e.y / g.y * d), this.mf(this.Sa, this), this.Sa.clip(), this.Sa.scale(1 /
                        (1 * b.s.instance.wb().x), 1 / (1 * b.s.instance.wb().y)), this.Sa.translate(-e.x * g.x * d, -e.y * g.y * d));
                    var h = a.Xb().Ua();
                    h.x *= this.oa.x;
                    h.y *= this.oa.y;
                    this.Sa.setTransform(1, this.Ti.x / h.x, this.Ti.y / h.y, 1, 1 * Math.floor(c.x * g.x * d + e.x), 1 * Math.floor(c.y * g.y * d + e.y));
                    this.Sa.rotate(a.Hg().z + this.Rd.z);
                    this.Sa.scale(h.x * d, h.y * d);
                    a = this.vb.Ua();
                    null != this.Gd && (a.x += this.Gd.of().x, a.y += this.Gd.of().y);
                    this.Sa.translate(1 * Math.floor(a.x * g.x), 1 * Math.floor(a.y * g.y));
                    this.Sa.globalAlpha = this._alpha;
                    this.Sa.scale(1 * g.x, 1 *
                        g.y);
                    null == this.Gd && null == this.Jb ? (null == this.Dc && (this.Dc = b.k.Ga.fc(this.hd)), null == this.re ? this.Sa.drawImage(this.Dc, 0, 0) : (this.re.R.x = Math.max(0, this.re.R.x), this.re.R.y = Math.max(0, this.re.R.y), this.re.da.x = Math.min(this.re.da.x, this.Dc.width), this.re.da.y = Math.min(this.re.da.y, this.Dc.height), this.Sa.drawImage(this.Dc, this.re.R.x, this.re.R.y, this.re.da.x, this.re.da.y, 0, 0, this.re.da.x, this.re.da.y))) : null == this.Gd && null != this.Jb ? (null == this.Dc && (this.Dc = b.k.Ga.fc(this.hd)), this.Sa.drawImage(this.Dc,
                        Math.floor(this.Jb.R.x), Math.floor(this.Jb.R.y), Math.floor(this.Jb.da.x), Math.floor(this.Jb.da.y), 0, 0, Math.floor(this.Jb.da.x), Math.floor(this.Jb.da.y))) : (g = this.Gd.Jb, a = b.ac.ne.U().Xk(this.Gd.Wo), this.Sa.drawImage(a.op(), g.R.x, g.R.y, g.da.x, g.da.y, 0, 0, g.da.x, g.da.y));
                    this.T.vn(!0);
                    this.Sa.restore()
                }
            },
            pB: function() {
                b.w.prototype.sc.call(this);
                this.Sa = this.T.gc().getContext("2d");
                null != this.mf && (this.mf(this.Sa, this), this.Sa.clip());
                this.Sa.scale(this.oa.x, this.oa.y);
                this.Sa.rotate(this.Rd.z);
                if (null ==
                    this.Gd && null == this.Jb) null == this.Dc && (this.Dc = b.k.Ga.fc(this.hd));
                else if (null == this.Gd && null != this.Jb) null == this.Dc && (this.Dc = b.k.Ga.fc(this.hd)), this.Sa.drawImage(this.Dc, Math.floor(this.Jb.R.x), Math.floor(this.Jb.R.y), Math.floor(this.Jb.da.x), Math.floor(this.Jb.da.y), this.vb.x, this.vb.y, Math.floor(this.Jb.da.x) + 2, Math.floor(this.Jb.da.y) + 2);
                else {
                    var a = this.Gd.Jb,
                        c = b.ac.ne.U().Xk(this.Gd.Wo);
                    null == this.Dc && (this.Dc = b.k.Ga.fc(c.hd));
                    this.Sa.drawImage(this.Dc, a.R.x, a.R.y, a.da.x, a.da.y, this.vb.x,
                        this.vb.y, a.da.x, a.da.y)
                }
                this.Sa.rotate(-this.Rd.z);
                this.Sa.scale(1 / this.oa.x, this.oa.y);
                this.T.vn(!0)
            },
            W: function() {
                b.w.prototype.W.call(this)
            },
            Wd: function() {
                b.w.prototype.Wd.call(this);
                this.Z = null
            },
            r: b.j.GameImage
        });
        b.j.io = function(a, c, d, e, g) {
            this.pc = this.Z = this.Fe = this.Sa = this.T = this.Gk = null;
            b.w.call(this, a, "GameImageBatch");
            this.pc = c;
            this.Z = g;
            this.Fe = new b.I(1, 1);
            this.Sa = null;
            this.T = d;
            this.Gk = []
        };
        b.j.io.q = !0;
        b.j.io.N = b.w;
        b.j.io.prototype = s(b.w.prototype, {
            QE: C("Fe"),
            Zp: z("Fe"),
            kA: C("T"),
            qt: z("T"),
            J: function() {
                b.w.prototype.J.call(this);
                var a = [],
                    c = this.pc.length;
                b.H.ba.log(c);
                for (var d = 0; d < c;) {
                    var e = d++,
                        e = this.pc[e],
                        g = e.fb(b.j.GameImage),
                        h = e.Q().Ua(),
                        f = e.Xb().Ua(),
                        m = e.Hg().Ua();
                    g.Kf(g.of().x + h.x * f.x, g.of().y + h.y * f.y);
                    g.Lc(f.x, f.y, 1);
                    g.tn(m);
                    g.nt(this.u);
                    g.qt(this.T);
                    e.W();
                    a.push(g)
                }
                this.Gk = a;
                b.H.ba.log("GAME IMAGES: " + this.Gk.length)
            },
            sc: function() {
                b.w.prototype.sc.call(this);
                var a = this.Gk.length;
                if (0 != a)
                    if (null == this.Z) {
                        var c = new b.I(1, 1),
                            d = this.T.gc().getContext("2d");
                        d.save();
                        d.setTransform(1 *
                            c.x, 0, 0, 1 * c.y, 0, 0);
                        for (c = 0; c < a;) {
                            var e = c++;
                            this.Gk[e].pB()
                        }
                        d.restore()
                    } else {
                        var e = 1,
                            g = new b.I(0, 0),
                            h = new b.I(1, 1),
                            d = new b.Vector3D(0, 0);
                        null != this.Z && (d = this.Z.u, e = this.Z._zoomScale, d = d.Q(), g = new b.I(1 * -(d.x / this.Fe.x) * h.x, 1 * -(d.y / this.Fe.y) * h.y), g.xh(e, e));
                        c = this.T.gc().getContext("2d");
                        c.save();
                        c.setTransform(1 * e * h.x, 0, 0, 1 * e * h.y, Math.floor(g.x), Math.floor(g.y));
                        this.Z.zF();
                        this.Gk[0].Mb();
                        for (e = 0; e < a;) {
                            var h = e++,
                                h = this.Gk[h],
                                g = h.of().Ua(),
                                f = h.Xb(),
                                m = h.Mb().x,
                                n = h.Mb().y;
                            g.xh(f.x, f.y);
                            g.x - m > d.x + 800 ||
                                (g.x + m < d.x - 800 || g.y - n > d.y + 600 || g.y + n < d.y - 600) || h.pB()
                        }
                        c.restore()
                    }
            },
            r: b.j.io
        });
        b.j.jo = function(a, c, d, e) {
            this.Sa = null;
            this.St = !1;
            this.Ti = this.Rd = null;
            this._alpha = 1;
            this.Ie = null;
            this.Mi = !0;
            this.Yo = 1;
            this.qa = 0;
            b.w.call(this, a, "GameSprite");
            this.Dd = c;
            this.Fe = new b.I(1, 1);
            this.T = d;
            this.Am = new b.I;
            this.vb = new b.I;
            this.Z = e;
            this.oa = new b.Vector3D(1, 1, 1);
            this.Ti = new b.I;
            this.Rd = new b.Vector3D(0, 0, 0)
        };
        b.j.jo.q = !0;
        b.j.jo.N = b.w;
        b.j.jo.prototype = s(b.w.prototype, {
            nJ: z("Am"),
            pF: C("Am"),
            sA: C("oa"),
            of: C("vb"),
            Kf: function(a,
                b) {
                this.vb.x = a;
                this.vb.y = b
            },
            Hg: C("Rd"),
            tn: function(a, c, d) {
                this.Rd = new b.Vector3D(a, c, d)
            },
            rP: C("mf"),
            xR: z("mf"),
            $P: C("Yo"),
            VR: z("Yo"),
            kA: C("T"),
            qt: function(a) {
                this.T = a;
                this.Sa = null
            },
            update: function() {
                b.w.prototype.update.call(this);
                if (this.Mi) {
                    var a = b.k.df.U().Hs(this.Dd);
                    null == a ? (this.St || b.H.ba.log("WARNING: Animation named '" + this.Dd + "' not found"), this.St = !0) : (this.qa += b.s.Id() * this.Yo, this.qa >= a.xd() && 0 < this.Yo ? (a.Pi ? this.qa -= a.xd() : (this.qa = a.xd(), this.stop()), null != this.Ie && (a = this.Ie, this.Ie =
                        null, a(this.u))) : 0 >= this.qa && 0 > this.Yo && (a.Pi ? this.qa += a.xd() : (this.qa = 0, this.stop()), null != this.Ie && (a = this.Ie, this.Ie = null, a(this.u))))
                }
            },
            Gs: C("_alpha"),
            yh: z("_alpha"),
            Is: function() {
                return b.k.df.U().Hs(this.Dd).xd()
            },
            MR: function(a) {
                a = b.k.df.U().Hs(a);
                null != a && (this.qa = a.xd())
            },
            setPosition: z("qa"),
            Q: C("qa"),
            KI: function(a, b, c) {
                null == c && (c = !1);
                if (this.Dd != a || c) this.qa = 0;
                this.Dd = a;
                this.Ie = b;
                this.Mi = !0;
                this.St = !1
            },
            dO: C("Dd"),
            play: function() {
                this.Mi = !0
            },
            stop: function() {
                this.Mi = !1
            },
            playing: C("Mi"),
            mJ: z("Ie"),
            nF: C("Ie"),
            sc: function() {
                b.w.prototype.sc.call(this);
                var a = this.u,
                    c = a.Q(),
                    d = b.k.df.U().Hs(this.Dd);
                if (null != d) {
                    var e = d.uF(this.qa),
                        e = b.ac.ne.U().Xk(d.Wo).Sv(e),
                        g = 1,
                        h = new b.I(0, 0),
                        f = new b.I(1, 1);
                    this.T.gc().getContext("2d");
                    this.u.Hg();
                    this.u.Xb();
                    null == this.Sa && (this.Sa = this.T.gc().getContext("2d"));
                    this.Sa.save();
                    null != this.mf && (this.Sa.scale(1 * b.s.instance.wb().x, 1 * b.s.instance.wb().y), this.mf(this.Sa, this), this.Sa.clip(), this.Sa.scale(1 / (1 * b.s.instance.wb().x), 1 / (1 * b.s.instance.wb().y)));
                    var m =
                        a.Xb().Ua();
                    m.x *= this.oa.x;
                    m.y *= this.oa.y;
                    null != this.Z && (h = this.Z.u, g = this.Z._zoomScale, h = h.Q(), h = new b.I(-(h.x / this.Fe.x) * f.x, -(h.y / this.Fe.y) * f.y), h.xh(g, g));
                    this.Sa.setTransform(1, this.Ti.x / m.x, this.Ti.y / m.y, 1, 1 * Math.floor(c.x * f.x * g + h.x), 1 * Math.floor(c.y * f.y * g + h.y));
                    this.Sa.rotate(a.Hg().z + this.Rd.z);
                    this.Sa.scale(m.x * g, m.y * g);
                    a = this.vb.Ua();
                    null != e && (a.x += e.of().x + d.of().x, a.y += e.of().y + d.of().y);
                    this.Sa.translate(1 * Math.floor(a.x * f.x), 1 * Math.floor(a.y * f.y));
                    this.Sa.globalAlpha = this._alpha;
                    this.Sa.scale(1 *
                        f.x, 1 * f.y);
                    d = e.Jb;
                    e = b.ac.ne.U().Xk(e.Wo);
                    this.Sa.drawImage(e.op(), d.R.x, d.R.y, d.da.x, d.da.y, 0, 0, d.da.x, d.da.y);
                    this.T.vn(!0);
                    this.Sa.restore()
                }
            },
            r: b.j.jo
        });
        b.j.Ee = function(a, c, d, e) {
            null == e && (e = "");
            null == d && (d = "");
            this.Qx = !1;
            this.Ze = "";
            this.Cc = null;
            this.Gr = !0;
            b.w.call(this, a, "HtmlElements");
            this.Mo = d;
            this.Ze = e;
            this.T = c;
            this.vt()
        };
        b.j.Ee.q = !0;
        b.j.Ee.aS = function(a, c) {
            null == c && (c = !0);
            var d = b.j.Ee.Iv(p.Va(), a);
            null != d ? d.style.display = c ? "block" : "none" : b.H.ba.log("Could not find element with id of " + a + " to " +
                (c ? "show" : "hide"))
        };
        b.j.Ee.wA = function(a) {
            for (var c = u.gb(a.style.top), d = u.gb(a.style.left);;)
                if (null != a.parentNode && Object.prototype.hasOwnProperty.call(a.parentNode, "style") && "layer" != a.parentElement.className) c += u.gb(a.parentElement.style.top), d += u.gb(a.parentElement.style.left), a = a.parentElement;
                else break;
            return new b.I(d, c)
        };
        b.j.Ee.lR = function(a, c) {
            var d = p.wd().getElementById(a);
            null == d ? b.H.ba.log("Could not find '" + a + "' on the page!") : d.innerHTML = c
        };
        b.j.Ee.Iv = function(a, c) {
            for (var d = a.children.length,
                    e = 0; e < d;) {
                var g = e++,
                    g = a.children[g];
                if (g.id == c || g.hasChildNodes() && (g = b.j.Ee.Iv(g, c), null != g)) return g
            }
            return null
        };
        b.j.Ee.N = b.w;
        b.j.Ee.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.u.addEventListener("displayUpdate", r(this, this.on))
            },
            nO: function(a) {
                return p.wd().getElementById(a)
            },
            hR: function(a, c) {
                var d = b.j.Ee.Iv(this.cA(), a);
                null != d && (d.innerHTML = c);
                this.Mo = this.cA().innerHTML
            },
            cA: function() {
                null == this.Cc && this.Gr && this.vt();
                return this.Cc
            },
            update: function() {
                b.w.prototype.update.call(this);
                null != this.Cc && this.Gr && this.vt();
                null != this.Cc && this.Qx && this.Ex();
                this.Cc.style.display = this.u.Wm() ? "block" : "none"
            },
            vt: function() {
                b.H.ba.log("updateHtml");
                null != this.Cc && null != this.Cc.parentNode && this.Cc.parentNode.removeChild(this.Cc);
                this.Gr = !1;
                this.Cc = p.wd().createElement("div");
                this.Cc.className = this.Ze;
                this.Cc.innerHTML = this.Mo;
                this.Cc.style.position = "absolute";
                this.Cc.style.webkitTransform = "translate(0, 0px) scale(" + this.u.Xb().x * b.s.instance.wb().x + "," + this.u.Xb().y * b.s.instance.wb().y + ")";
                this.Cc.style.transform = "translate(0, 0px) scale(" + this.u.Xb().x * b.s.instance.wb().x + "," + this.u.Xb().y * b.s.instance.wb().y + ")";
                this.T.Va().appendChild(this.Cc);
                this.Ex()
            },
            Ex: function() {
                this.Cc.style.left = this.u.Q().x * b.s.instance.wb().x - (this.Wx ? this.Cc.clientWidth / 2 : 0) + "px";
                this.Cc.style.top = this.u.Q().y * b.s.instance.wb().y - (this.Wx ? this.Cc.clientHeight / 2 : 0) + "px"
            },
            nR: function(a) {
                null == this.Cc && this.Gr && this.vt();
                this.ju = a;
                this.Cc.id = a
            },
            dF: C("ju"),
            aP: C("Mo"),
            mR: z("Mo"),
            QI: z("Ze"),
            RE: C("Ze"),
            $M: function(a) {
                this.Ze =
                    0 < this.Ze.length ? this.Ze + (" " + a) : a
            },
            VQ: function(a) {
                this.Ze = H.replace(this.Ze, a, "")
            },
            aO: function() {
                this.Mo = this.Cc.innerHTML
            },
            sN: function(a) {
                null == a && (a = !0);
                this.Wx = a;
                this.Ex()
            },
            Mb: function() {
                return new b.I(this.Cc.clientWidth * b.s.instance.wb().y, this.Cc.clientHeight * b.s.instance.wb().y)
            },
            W: function() {
                b.w.prototype.W.call(this);
                null != this.Cc.parentNode && this.T.Va().removeChild(this.Cc)
            },
            Ke: function(a, c) {
                b.w.prototype.Ke.call(this, a, c)
            },
            on: v(),
            cN: function(a) {
                null == a && (a = !0);
                this.Qx = a
            },
            r: b.j.Ee
        });
        b.j.eh =
            function(a, c, d, e, g, h, f, m, n) {
                null == n && (n = 0);
                null == m && (m = 0);
                null == f && (f = !1);
                this.Nr = 0;
                this.hu = !1;
                this.Cm = "";
                this.Qc = null;
                this.Jj = this.My = this.ir = this.Qi = 0;
                b.w.call(this, a, "PropertySineWave");
                this.ir = e;
                this.Qi = g;
                this.My = h;
                this.Cm = d;
                this.Qc = c;
                this.hu = f;
                this.Jj = m;
                this.Nr = n
            };
        b.j.eh.q = !0;
        b.j.eh.N = b.w;
        b.j.eh.prototype = s(b.w.prototype, {
            oP: C("Qi"),
            vR: z("Qi"),
            pP: C("Nr"),
            wR: z("Nr"),
            iO: C("ir"),
            fR: z("ir"),
            update: function() {
                b.w.prototype.update.call(this);
                0 < this.Qi && (this.Qi -= this.Nr * b.s.Id(), 0 > this.Qi && (this.Qi =
                    0), this.Jj += this.My * b.s.Id(), this.Jj >= (this.hu ? Math.PI : 2 * Math.PI) && (this.Jj = this.hu ? this.Jj - Math.PI : this.Jj - 2 * Math.PI), L.setProperty(this.Qc, this.Cm, this.ir + Math.sin(this.Jj) * this.Qi))
            },
            r: b.j.eh
        });
        b.j.Tf = function(a, c) {
            this.jd = this.hr = this.ug = null;
            b.w.call(this, a, "SimpleMovement");
            this.jd = new b.Vector3D;
            this.hr = new b.Vector3D;
            null != c && (this.ug = c.Ua())
        };
        b.j.Tf.q = !0;
        b.j.Tf.N = b.w;
        b.j.Tf.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this)
            },
            update: function() {
                b.w.prototype.update.call(this);
                null != this.ug && (this.jd.x += this.ug.x * b.s.Id(), this.jd.y += this.ug.y * b.s.Id(), this.jd.z += this.ug.z * b.s.Id());
                var a = this.jd.Ua();
                a.xh(b.s.Id());
                var c = this.hr.Ua();
                c.xh(b.s.Id());
                var d = this.u.ld(),
                    e = this.u.iF();
                this.u.setPosition(d.x + a.x, d.y + a.y, d.z + a.z);
                this.u.tn(e.x + c.x, e.y + c.y, e.z + c.z)
            },
            mQ: function(a) {
                return b.H.tc.ME(a, new b.I(this.jd.x, this.jd.y))
            },
            Rj: function() {
                b.w.prototype.Rj.call(this);
                this.jd.x = 0;
                this.jd.y = 0;
                this.jd.z = 0
            },
            gA: function() {
                return this.ug.Ua()
            },
            jx: function(a) {
                this.ug = new b.Vector3D(a.x,
                    a.y, a.z)
            },
            AA: C("jd"),
            bN: function(a, c, d) {
                null == d && (d = 0);
                null == c && (c = 0);
                null == a && (a = 0);
                this.jd = this.jd.add(new b.Vector3D(a, c, d))
            },
            un: function(a, c, d) {
                null == d && (d = 0);
                null == c && (c = 0);
                null == a && (a = 0);
                this.jd = new b.Vector3D(a, c, d)
            },
            WR: function(a) {
                this.jd.x = a
            },
            XR: function(a) {
                this.jd.y = a
            },
            YR: function(a) {
                this.jd.z = a
            },
            bQ: function() {
                return this.jd.x
            },
            cQ: function() {
                return this.jd.y
            },
            dQ: function() {
                return this.jd.z
            },
            Hv: C("hr"),
            sn: z("hr"),
            r: b.j.Tf
        });
        b.j.Ak = function(a, c) {
            null == c && (c = 0.5);
            this.Xr = 1;
            this.bs = null;
            b.w.call(this,
                a, "SlackMovement");
            this.Xr = c
        };
        b.j.Ak.q = !0;
        b.j.Ak.N = b.w;
        b.j.Ak.prototype = s(b.w.prototype, {
            MP: C("Xr"),
            QR: z("Xr"),
            update: function() {
                b.w.prototype.update.call(this);
                if (null != this.bs) {
                    var a = this.bs.zx(this.u.Q()),
                        c = a.xd();
                    0 != c && (a = a.Ym(), a.xh(c * this.Xr), 5E-5 > a.x && -5E-5 < a.x && (a.x = 0), 5E-5 > a.y && -5E-5 < a.y && (a.y = 0), 5E-5 > a.z && -5E-5 < a.z && (a.z = 0), c = this.u.Q().Ua(), this.u.setPosition(c.x + a.x, c.y + a.y, c.z + a.z))
                }
            },
            xA: C("bs"),
            eq: function(a, c, d) {
                this.bs = new b.Vector3D(a, c, d)
            },
            r: b.j.Ak
        });
        b.j.Ba = function(a, c, d) {
            this.Gj =
                this.$t = null;
            this.ty = "";
            this.mf = null;
            this._alpha = 1;
            this.cz = -1;
            this.wm = 8;
            this.Wf = -1;
            this.cs = "middle";
            this.Bf = "center";
            this.yr = "white";
            this.fu = "Arial";
            this.Lh = "16pt";
            this.Rc = "";
            b.w.call(this, a, "TextField");
            this.T = c;
            this.Am = new b.I;
            this.Z = d;
            null == b.j.Ba.fy && (b.j.Ba.fy = p.hc().getComputedStyle(p.wd().body))
        };
        b.j.Ba.q = !0;
        b.j.Ba.N = b.w;
        b.j.Ba.prototype = s(b.w.prototype, {
            Gs: C("_alpha"),
            yh: z("_alpha"),
            jF: C("mf"),
            hJ: z("mf"),
            eA: function() {
                return this.Lh + " " + this.fu
            },
            RO: C("fu"),
            Xa: z("fu"),
            TO: C("Lh"),
            ob: function(a) {
                this.Lh =
                    a;
                this.eC()
            },
            mP: C("wm"),
            eJ: z("wm"),
            NO: C("yr"),
            sl: z("yr"),
            lF: C("Wf"),
            We: z("Wf"),
            lQ: C("cz"),
            $R: z("cz"),
            xF: C("Rc"),
            Fa: function(a) {
                this.ty = this.Rc = a;
                this.eC()
            },
            TP: C("cs"),
            TR: z("cs"),
            kk: z("Bf"),
            SP: C("Bf"),
            VP: function() {
                var a = this.T.gc().getContext("2d");
                a.font = this.eA();
                a.fillStyle = this.yr;
                a.textAlign = this.Bf;
                a.textBaseline = this.cs;
                a.globalAlpha = this._alpha;
                for (var b = this.Rc.split("\n"), c = b.length, e = 0, g = 0; g < c;) {
                    for (var h = g++, f = "", h = b[h].split(" "), m = this.Lh.substring(0, this.Lh.length - 2), n = 0, q = h.length; n <
                        q;) {
                        var t = n++,
                            f = f + h[t] + " ";
                        a.measureText(f).width > this.Wf && (f = h[t] + " ", e += parseFloat(m) + parseFloat(this.wm))
                    }
                    e += parseFloat(m) + parseFloat(this.wm)
                }
                return e
            },
            hK: function(a, b, c) {
                for (var e = this.Rc.split("\n"), g = e.length, h = 0; h < g;) {
                    for (var f = h++, m = "", f = e[f].split(" "), n = this.Lh.substring(0, this.Lh.length - 2), q = 0, t = f.length; q < t;) {
                        var p = q++,
                            r = m + f[p] + " ";
                        c.measureText(r).width > this.Wf ? (c.fillText(m, a, b), m = f[p] + " ", b += parseFloat(n) + parseFloat(this.wm)) : m = r
                    }
                    c.fillText(m, a, b);
                    b += parseFloat(n) + parseFloat(this.wm)
                }
            },
            sc: function() {
                b.w.prototype.sc.call(this);
                var a = this.T.gc().getContext("2d");
                b.la.Qa("rightToLeft") && p.Va().appendChild(this.T.gc());
                this.u.Q().Ua();
                this.u.Hg();
                this.u.Xb();
                var c = this.u,
                    d = c.Q(),
                    e = 1,
                    g = new b.I(0, 0),
                    h = new b.I(1, 1);
                null != this.Z && (g = this.Z.u, e = this.Z._zoomScale, g = g.Q(), g = new b.I(-(g.x / 1) * h.x, -(g.y / 1) * h.y), g.xh(e, e));
                a.save();
                null != this.mf && (a.scale(1, 1), this.mf(a, this), a.clip(), a.scale(1, 1));
                var f = c.Xb().Ua();
                a.setTransform(1, 0 / f.x, 0 / f.y, 1, 1 * Math.floor(d.x * h.x * e + g.x), 1 * Math.floor(d.y *
                    h.y * e + g.y));
                a.rotate(c.Hg().z);
                a.scale(f.x * e, f.y * e);
                a.pS = !0;
                a.font = this.eA();
                a.fillStyle = this.yr;
                a.textAlign = this.Bf;
                a.textBaseline = this.cs;
                a.globalAlpha = this._alpha; - 1 == this.Wf ? a.fillText(this.Rc, 0, 0) : this.hK(0, 0, a);
                this.T.vn(!0);
                a.restore();
                b.la.Qa("rightToLeft") && p.Va().removeChild(this.T.gc())
            },
            eC: function() {
                var a;
                a = p.wd().createElement("div");
                a.innerHTML = this.ty;
                var c = w.parse(a.outerHTML);
                if (c.za("div").wc()) {
                    c = c.za("div").next();
                    if (c.za("font").wc()) {
                        var d = c.za("font").next();
                        d.vc("size") &&
                            (-1 != d.get("size").indexOf("px") ? this.Lh = u.gb(d.get("size")) + "px" : this.Lh = u.gb(d.get("size")) + "pt")
                    }
                    c.za("span").wc() && (c = c.za("span").next(), c.vc("class") || c.vc("id") || c.vc("style")) && (null == this.Gj && (this.Gj = p.wd().createElement("span"), this.Gj.style.display = "none", c.vc("id") && (this.Gj.id = c.get("id")), c.vc("class") && (this.Gj.className = c.get("class")), c.vc("style") && (this.Gj.style.cssText = c.get("style")), this.$t = p.hc().getComputedStyle(this.Gj), p.Va().appendChild(this.Gj)), this.$t.fontSize != b.j.Ba.fy.fontSize &&
                        (this.Lh = this.$t.fontSize))
                }
                this.Rc = b.s.WF() ? a.textContent : a.innerText
            },
            r: b.j.Ba
        });
        b.j.Nd = function(a) {
            this.Vi = null;
            b.w.call(this, a, "Tweener");
            this.Vi = []
        };
        b.j.Nd.q = !0;
        b.j.Nd.N = b.w;
        b.j.Nd.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this)
            },
            Ta: function(a, c, d, e, g, h, f, m, n) {
                null == f && (f = 0);
                a = new b.j.sa.fr(a, c, d, e, g, h, f, m, n);
                this.Vi.push(a);
                return a
            },
            FJ: function() {
                for (var a = this.Vi.length, b = 0; b < a;) {
                    var c = b++;
                    this.Vi[c].aC()
                }
            },
            Nz: function(a) {
                y.remove(this.Vi, a)
            },
            Lz: function() {
                this.Vi = []
            },
            update: function() {
                b.w.prototype.update.call(this);
                for (var a = this.Vi.length - 1; 0 <= a;) {
                    var c = this.Vi[a];
                    c.update(b.s.Id());
                    c.Fr && this.Vi.splice(a, 1);
                    a--
                }
            },
            r: b.j.Nd
        });
        b.j.buttons = {};
        b.j.buttons.ef = function(a, c, d, e) {
            this.yu = !1;
            this.nu = !0;
            this.Fi = this.ou = this.Od = null;
            this.hy = 0;
            b.w.call(this, a, "ButtonActionDelay");
            this.hy = d;
            this.Fi = c;
            this.ou = e
        };
        b.j.buttons.ef.q = !0;
        b.j.buttons.ef.bA = function() {
            return b.j.buttons.ef.vr
        };
        b.j.buttons.ef.N = b.w;
        b.j.buttons.ef.prototype = s(b.w.prototype, {
            lJ: z("Fi"),
            J: function() {
                b.w.prototype.J.call(this);
                this.Od = new b.j.Zg(this.u);
                this.u.addEventListener("mouseDown", r(this, this.uh))
            },
            uh: function() {
                this.nu && !b.j.buttons.ef.vr && (this.nu = !1, this.yu = !0, null != this.ou && this.ou(), this.Od.Qh(this.hy, r(this, this.ZG)))
            },
            Ue: function() {
                b.w.prototype.update.call(this);
                this.yu && (b.j.buttons.ef.vr = !0);
                this.yu = !1
            },
            ZG: function() {
                b.j.buttons.ef.vr = !1;
                null != this.Fi && this.Fi();
                this.nu = !0
            },
            r: b.j.buttons.ef
        });
        b.j.buttons.Jl = function(a, c, d, e, g) {
            null == g && (g = !0);
            this.Px = !0;
            this.Bo = this.Ha = null;
            this.tu = !1;
            b.w.call(this, a, "ButtonMouseDownPulse");
            this.Tr =
                c;
            this.Ur = d;
            this.Sr = e;
            this.Px = g
        };
        b.j.buttons.Jl.q = !0;
        b.j.buttons.Jl.N = b.w;
        b.j.buttons.Jl.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.Bo = this.sp(b.j.buttons.tk);
                this.Ha = new b.j.Nd(this.u);
                this.u.addEventListener("mouseDown", r(this, this.uh))
            },
            uh: function() {
                if (!this.tu && !b.j.buttons.ef.bA()) {
                    var a = this.u.fb(b.ta.$d);
                    this.tu = !0;
                    null != this.Bo && this.Bo.Ve(!1);
                    null != a ? (this.Ha.Ta(a.oa, "x", this.Tr, this.Ur, this.Sr, b.j.sa.Ra.Wh, 0, r(this, this.jB)), this.Ha.Ta(a.oa, "y", this.Tr, this.Ur,
                        this.Sr, b.j.sa.Ra.Wh, 0)) : (this.Ha.Ta(this.u.oa, "x", this.Tr, this.Ur, this.Sr, b.j.sa.Ra.Wh, 0, r(this, this.jB)), this.Ha.Ta(this.u.oa, "y", this.Tr, this.Ur, this.Sr, b.j.sa.Ra.Wh, 0))
                }
            },
            jB: function() {
                this.Px || (this.tu = !1, null != this.Bo && this.Bo.Ve(!0))
            },
            r: b.j.buttons.Jl
        });
        b.j.buttons.pj = function(a, c, d) {
            this.lc = null;
            b.w.call(this, a, "ButtonMouseOverImage");
            this.sr = c;
            this.Au = d
        };
        b.j.buttons.pj.q = !0;
        b.j.buttons.pj.N = b.w;
        b.j.buttons.pj.prototype = s(b.w.prototype, {
            HB: function(a) {
                this.sr = a;
                this.wt(this.sr)
            },
            PB: function(a) {
                this.Au =
                    a;
                this.wt(this.Au)
            },
            J: function() {
                b.w.prototype.J.call(this);
                this.lc = this.sp(b.j.GameImage);
                this.lc.ot(this.sr);
                this.lc.ec();
                this.u.addEventListener("mouseOver", r(this, this.ek));
                this.u.addEventListener("mouseOut", r(this, this.fj))
            },
            ek: function() {
                this.wt(this.Au)
            },
            fj: function() {
                this.wt(this.sr)
            },
            wt: function(a) {
                if (null == this.lc && (this.lc = this.sp(b.j.GameImage), null == this.lc)) return;
                this.lc.Ve(!0);
                this.lc.ot(a);
                this.lc.ec()
            },
            r: b.j.buttons.pj
        });
        b.j.buttons.tk = function(a, c, d, e, g) {
            null == d && (d = 0.35);
            null ==
                c && (c = 1.25);
            this.jr = this.kr = 1;
            this.Gi = this.Ha = null;
            b.w.call(this, a, "ButtonMouseOverScale");
            this.Wr = c;
            this.Ej = d;
            this.zm = e;
            this.ym = g;
            null == this.zm && (this.zm = b.j.sa.Ra.bf);
            null == this.ym && (this.ym = b.j.sa.Ra.bf);
            this.jr = this.u.oa.x;
            this.kr = this.u.oa.y
        };
        b.j.buttons.tk.q = !0;
        b.j.buttons.tk.N = b.w;
        b.j.buttons.tk.prototype = s(b.w.prototype, {
            Np: function() {
                b.w.prototype.Np.call(this);
                this.Ha.Ve(!1)
            },
            Mp: function() {
                b.w.prototype.Mp.call(this);
                this.Ha.Ve(!0)
            },
            J: function() {
                b.w.prototype.J.call(this);
                this.Ha = new b.j.Nd(this.u);
                this.u.addEventListener("mouseOver", r(this, this.ek));
                this.u.addEventListener("mouseOut", r(this, this.fj));
                var a = this.u.fb(b.ta.$d);
                null != a && (this.jr = a.oa.x, this.kr = a.oa.y)
            },
            ek: function() {
                var a = this.u.fb(b.ta.$d);
                if (!b.j.buttons.ef.bA())
                    if (this.Ha.Lz(), null != a) {
                        var c = a.oa.y;
                        this.Ha.Ta(a.oa, "x", a.oa.x, this.Wr, this.Ej, this.zm);
                        this.Ha.Ta(a.oa, "y", c, this.Wr, this.Ej, this.zm)
                    } else a = this.u.oa.y, this.Ha.Ta(this.u.oa, "x", this.u.oa.x, this.Wr, this.Ej, this.zm), this.Ha.Ta(this.u.oa, "y", a, this.Wr, this.Ej, this.zm)
            },
            fj: function() {
                var a = this.u.fb(b.ta.$d);
                this.Ha.Lz();
                if (null != a) {
                    var c = a.oa.y;
                    this.Ha.Ta(a.oa, "x", a.oa.x, this.jr, this.Ej, this.ym);
                    this.Ha.Ta(a.oa, "y", c, this.kr, this.Ej, this.ym)
                } else a = this.u.oa.y, this.Ha.Ta(this.u.oa, "x", this.u.oa.x, this.jr, this.Ej, this.ym), this.Ha.Ta(this.u.oa, "y", a, this.kr, this.Ej, this.ym)
            },
            r: b.j.buttons.tk
        });
        b.j.buttons.Kl = function(a, c, d) {
            b.w.call(this, a, "ButtonSoundPlay");
            this.Fj = c;
            this.XC = d
        };
        b.j.buttons.Kl.q = !0;
        b.j.buttons.Kl.N = b.w;
        b.j.buttons.Kl.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.u.addEventListener("mouseDown", r(this, this.uh));
                this.u.addEventListener("mouseOver", r(this, this.ek))
            },
            uh: function() {
                "" != this.Fj && b.k.SoundManager.Xc(this.Fj)
            },
            ek: function() {
                "" != this.Fj && b.k.SoundManager.Xc(this.XC)
            },
            W: function() {
                b.w.prototype.W.call(this);
                this.u.removeEventListener("mouseDown", r(this, this.uh))
            },
            r: b.j.buttons.Kl
        });
        b.j.dg = {};
        b.j.dg.Il = function(a, c, d) {
            b.j.ff.call(this, a, d);
            this.ib = c
        };
        b.j.dg.Il.q = !0;
        b.j.dg.Il.N = b.j.ff;
        b.j.dg.Il.prototype = s(b.j.ff.prototype, {
            update: function() {
                b.j.ff.prototype.update.call(this);
                var a = this.u.Q().Ua(),
                    c;
                c = null != this.vb ? this.vb : new b.Vector3D;
                this.ib.R.x = a.x - this.ib.da.x / 2 + c.x * this.u.Xb().x;
                this.ib.R.y = a.y - this.ib.da.y / 2 + c.y * this.u.Xb().y
            },
            cg: function(a) {
                return this.ib.cg(a)
            },
            $h: function(a, b, c, e, g) {
                null == e && (e = !1);
                return this.ib.$h(a, b, c, e, g)
            },
            Fc: function() {
                b.j.ff.prototype.Fc.call(this);
                var a = b.s.instance.Pa("debug").gc().getContext("2d");
                a.save();
                if (null != b.j.Camera.Gg()) {
                    var c = b.j.Camera.Gg().u,
                        d = b.j.Camera.Gg()._zoomScale;
                    a.translate(-c.Q().x * d, -c.Q().y * d);
                    a.scale(d, d)
                }
                a.beginPath();
                a.lineWidth = 1;
                a.strokeStyle = "#FF0000";
                a.moveTo(this.ib.R.x, this.ib.R.y);
                a.lineTo(this.ib.R.x + this.ib.da.x, this.ib.R.y);
                a.lineTo(this.ib.R.x + this.ib.da.x, this.ib.R.y + this.ib.da.y);
                a.lineTo(this.ib.R.x, this.ib.R.y + this.ib.da.y);
                a.lineTo(this.ib.R.x, this.ib.R.y);
                a.stroke();
                a.restore()
            },
            $z: C("ib"),
            r: b.j.dg.Il
        });
        b.j.dg.qo = function(a, c, d) {
            b.j.ff.call(this, a, d);
            this.ib = c
        };
        b.j.dg.qo.q = !0;
        b.j.dg.qo.N = b.j.ff;
        b.j.dg.qo.prototype = s(b.j.ff.prototype, {
            update: function() {
                b.j.ff.prototype.update.call(this);
                var a =
                    this.u.Q().Ua(),
                    c;
                c = null != this.vb ? this.vb : new b.Vector3D;
                this.ib.R.x = a.x - this.ib.da.x / 2 + c.x * this.u.Xb().x;
                this.ib.R.y = a.y - this.ib.da.y / 2 + c.y * this.u.Xb().y
            },
            cg: function(a) {
                return this.ib.cg(a)
            },
            $h: function(a, b, c, e, g) {
                null == e && (e = !1);
                return this.ib.$h(a, b, c, e, g)
            },
            Fc: function() {
                b.j.ff.prototype.Fc.call(this);
                var a = b.s.instance.Pa("debug").gc().getContext("2d");
                a.save();
                if (null != b.j.Camera.Gg()) {
                    var c = b.j.Camera.Gg().u,
                        d = b.j.Camera.Gg()._zoomScale;
                    a.translate(-c.Q().x * d, -c.Q().y * d);
                    a.scale(d, d)
                }
                a.beginPath();
                a.lineWidth = 1;
                a.strokeStyle = "#FF0000";
                c = this.ib.Xf.length;
                for (d = 0; d < c;) {
                    var e = d++;
                    0 == e ? a.moveTo(this.ib.R.x + this.ib.Xf[e].x, this.ib.R.y + this.ib.Xf[e].y) : a.lineTo(this.ib.R.x + this.ib.Xf[e].x, this.ib.R.y + this.ib.Xf[e].y)
                }
                a.lineTo(this.ib.R.x + this.ib.Xf[0].x, this.ib.R.y + this.ib.Xf[0].y);
                a.stroke();
                a.restore()
            },
            $z: C("ib"),
            r: b.j.dg.qo
        });
        b.j.fe = {};
        b.j.fe.Al = function(a, b) {
            this.qa = this.$u = 0;
            this.qa = a;
            this.$u = b
        };
        b.j.fe.Al.q = !0;
        b.j.fe.Al.prototype = {
            Q: C("qa"),
            r: b.j.fe.Al
        };
        b.j.sa = {};
        b.j.sa.Ra = v();
        b.j.sa.Ra.q = !0;
        b.j.sa.Ra.bf = function(a, b, c, e) {
            return b + c * (a / e)
        };
        b.j.sa.Ra.TN = function(a, b, c, e) {
            a /= e;
            return c * a * a * a + b
        };
        b.j.sa.Ra.WN = function(a, b, c, e) {
            a /= e;
            a--;
            return c * (a * a * a + 1) + b
        };
        b.j.sa.Ra.Rz = function(a, b, c, e) {
            a /= e;
            return c * a * a + b
        };
        b.j.sa.Ra.ys = function(a, b, c, e) {
            a /= e;
            return -c * a * (a - 2) + b
        };
        b.j.sa.Ra.UN = function(a, b, c, e) {
            a /= e;
            return c * a * a * a * a * a + b
        };
        b.j.sa.Ra.Sm = function(a, b, c, e) {
            a /= e;
            a--;
            return c * (a * a * a * a * a + 1) + b
        };
        b.j.sa.Ra.VN = function(a, b, c, e) {
            a /= e;
            return 0.36363636363636365 > a ? c * 7.5625 * a * a + b : 0.7272727272727273 > a ?
                c * (7.5625 * (a -= 0.5454545454545454) * a + 0.75) + b : 0.9090909090909091 > a ? c * (7.5625 * (a -= 0.8181818181818182) * a + 0.9375) + b : c * (7.5625 * (a -= 0.9545454545454546) * a + 0.984375) + b
        };
        b.j.sa.Ra.SN = function(a, b, c, e) {
            return c * (a /= e) * a * (2.70158 * a - 1.70158) + b
        };
        b.j.sa.Ra.Wh = function(a, b, c, e) {
            return c * ((a = a / e - 1) * a * (3.70158 * a + 2.70158) + 1) + b
        };
        b.j.sa.wk = function(a) {
            b.w.call(this, a, "GroupFader");
            this.Ha = new b.j.Nd(this.u)
        };
        b.j.sa.wk.q = !0;
        b.j.sa.wk.N = b.w;
        b.j.sa.wk.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this)
            },
            jp: function(a,
                c, d, e, g) {
                this.Ha.FJ();
                null == g && (g = b.j.sa.Ra.bf);
                for (var h = this.u.Js(b.j.GameImage), f = h.length, m = 0; m < f;) {
                    var n = m++;
                    this.Ha.Ta(h[n], "_alpha", a, c, d, g, 0, e)
                }
                h = this.u.Js(b.j.Ba);
                f = h.length;
                for (m = 0; m < f;) n = m++, this.Ha.Ta(h[n], "_alpha", a, c, d, g, 0, e)
            },
            r: b.j.sa.wk
        });
        b.j.sa.fr = function(a, b, c, e, g, h, f, m, n) {
            this.ae = 0;
            this.Fr = !1;
            this.Fi = this.Fy = null;
            this.Xx = this.ur = 0;
            this.Qc = this.jy = null;
            this.Cm = "";
            this.Wt = this.du = this.tg = 0;
            this.Qc = a;
            this.Cm = b;
            this.Wt = c;
            this.du = e;
            this.tg = g;
            this.jy = h;
            this.ur = f;
            this.Fi = m;
            this.Fy = n
        };
        b.j.sa.fr.q = !0;
        b.j.sa.fr.prototype = {
            update: function(a) {
                this.Xx = this.du - this.Wt;
                this.ae += a;
                this.ae < this.ur || (!this.Fr && this.yA() >= this.tg && (this.Fr = !0, this.ae = this.tg + this.ur, null != this.Fi && (a = this.Fi, this.Fi = null, a(this.Fy))), a = 0, a = this.jy(this.yA(), this.Wt, this.Xx, this.tg), L.setProperty(this.Qc, this.Cm, a))
            },
            aC: function() {
                L.setProperty(this.Qc, this.Cm, this.du);
                this.Fr = !0;
                this.ae = this.tg
            },
            yA: function() {
                return Math.max(0, this.ae - this.ur)
            },
            r: b.j.sa.fr
        };
        b.Cg = {};
        b.Cg.co = function(a) {
            this.Eu = 0;
            this.Xo = 1;
            b.Ya.call(this);
            this.T = a
        };
        b.Cg.co.q = !0;
        b.Cg.co.N = b.Ya;
        b.Cg.co.prototype = s(b.Ya.prototype, {
            J: function() {
                b.Ya.prototype.J.call(this);
                this.dy = new b.Cg.eo(this.T);
                b.s.instance.Hd(this.dy)
            },
            update: function() {
                b.Ya.prototype.update.call(this);
                this.Eu++;
                this.Xo -= b.s.rA();
                0 >= this.Xo && (this.dy.XI(this.Eu), this.Eu = 0, this.Xo += 1)
            },
            r: b.Cg.co
        });
        b.Cg.eo = function(a) {
            b.ca.call(this);
            this.T = a
        };
        b.Cg.eo.q = !0;
        b.Cg.eo.N = b.ca;
        b.Cg.eo.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = this.O();
                a.setPosition(20,
                    20);
                this.wu = new b.j.Ba(a, this.T);
                this.wu.Fa("");
                this.wu.kk("left")
            },
            XI: function(a) {
                this.wu.Fa(a + " FPS")
            },
            r: b.Cg.eo
        });
        b.L.Ab = function(a, c) {
            this.data = null;
            b.L.La.call(this, a);
            this.data = c
        };
        b.L.Ab.q = !0;
        b.L.Ab.N = b.L.La;
        b.L.Ab.prototype = s(b.L.La.prototype, {
            r: b.L.Ab
        });
        b.L.Hq = function(a, b) {
            this.Bv = a;
            this.action = b
        };
        b.L.Hq.q = !0;
        b.L.Hq.prototype = {
            r: b.L.Hq
        };
        b.L.pg = function(a) {
            b.L.La.call(this, a)
        };
        b.L.pg.q = !0;
        b.L.pg.N = b.L.La;
        b.L.pg.prototype = s(b.L.La.prototype, {
            r: b.L.pg
        });
        b.L.Xl = function(a, c, d) {
            this.start = this.end =
                null;
            b.L.La.call(this, a);
            this.start = c;
            this.end = d
        };
        b.L.Xl.q = !0;
        b.L.Xl.N = b.L.La;
        b.L.Xl.prototype = s(b.L.La.prototype, {
            r: b.L.Xl
        });
        b.fe = {};
        b.fe.FlashAnimation = function(a, c, d, e, g, h) {
            this.Jy = 0;
            this.Ie = this._parts = this._partInstances = this.Z = null;
            this._alpha = 1;
            this.Ty = null;
            this.Dd = "";
            this.ih = null;
            this.Hr = this.Mi = !0;
            this.oy = 0;
            this.aD = 1;
            this.qa = 0;
            this._animation = null;
            b.w.call(this, a, "FlashAnimation");
            this._animation = JSON.parse(b.k.Ga.fc(c));
            this.Dd = e;
            this.ih = [];
            this._parts = this._animation.parts;
            this._partInstances =
                this._animation.part_instances;
            this.T = g;
            this.Z = h;
            this.Ty = b.ac.ne.U().Xk(d)
        };
        b.fe.FlashAnimation.q = !0;
        b.fe.FlashAnimation.N = b.w;
        b.fe.FlashAnimation.prototype = s(b.w.prototype, {
            nF: C("Ie"),
            mJ: z("Ie"),
            PE: C("Z"),
            gx: z("Z"),
            J: function() {
                b.w.prototype.J.call(this);
                this.oy = this._animation.framerate;
                this.generateEntitiesForFrame(this.Dd, 0)
            },
            eO: function() {
                return this.Xv(this.Dd) ? this.qa / (this.Is() - 1) : 0
            },
            dR: function(a) {
                this.qa = (this.Is() - 1) * a
            },
            Is: function() {
                return this.Xv(this.Dd) ? this._animation.animations[this.Dd].frames.length :
                    0
            },
            Xv: function(a) {
                return null != this._animation.animations[a] && void 0 != this._animation.animations[a]
            },
            Gs: C("_alpha"),
            yh: function(a) {
                this._alpha = a;
                this.generateEntitiesForFrame(this.Dd, Math.floor(this.qa))
            },
            uR: z("Hr"),
            nP: C("Hr"),
            EO: C("Dd"),
            KI: function(a, b, c) {
                null == c && (c = !1);
                null == b && (b = !0);
                if (this.Dd != a || c) this.Hr = b, this.Dd = a, this.qa = 0, this.Mi = !0, this.generateEntitiesForFrame(this.Dd, 0)
            },
            update: function() {
                b.w.prototype.update.call(this);
                if ("" == this.u.getName()) throw "Please name all entities (uniquely by entity 'type') that use the FlashAnimation component!";
                if (this.Mi) {
                    this.qa += b.s.Id() * this.oy * this.aD;
                    var a = this.Is() - 1;
                    if (this.qa > a)
                        if (this.Hr) this.qa -= a, null != this.Ie && this.Ie();
                        else {
                            this.qa = a - 1;
                            this.Mi = !1;
                            null != this.Ie && (a = this.Ie, this.Ie = null, a());
                            if (this.NC) {
                                this.u.W();
                                return
                            }
                            if (this.PC) {
                                this.W();
                                return
                            }
                        }
                    if (null != this.Z) {
                        var a = this.u.Q(),
                            c = this.Z.u.Q();
                        c.x += b.s.instance.te().x / 2;
                        c.y += b.s.instance.te().y / 2;
                        if (1500 < (new b.Vector3D(c.x - a.x, c.y - a.y)).xd()) return
                    }
                    this.generateEntitiesForFrame(this.Dd, Math.floor(this.qa))
                }
            },
            wv: function(a) {
                null == a && (a = !1);
                if (null != this.ih) {
                    for (var c = this.ih.length, d = 0; d < c;) {
                        var e = d++;
                        a && this.ih[e].W()
                    }
                    b.H.Ug.clear(this.ih)
                }
            },
            oF: function(a) {
                return this._parts[this.qA(a)]
            },
            qA: function(a) {
                return this._partInstances[a]
            },
            $N: function() {
                this.generateEntitiesForFrame(this.Dd, Math.floor(this.qa))
            },
            generateEntitiesForFrame: function(a, c) {
                if (this.Xv(a)) {
                    var d = this._animation.animations[a].frames[c];
                    if (null != d) {
                        var e = this.u,
                            g = this.u.getName() + "_" + a + "_" + c;
                        if (!b.fe.FlashAnimation.nr.vc(g)) {
                            this.wv();
                            for (var h = [], f = d.instances.length,
                                    m = 0; m < f;) {
                                var n = m++,
                                    q = d.instances[n],
                                    n = q.i,
                                    t = this.oF(n),
                                    p = this.qA(n),
                                    r;
                                r = null != q.x ? q.x : 0;
                                var s;
                                s = null != q.y ? q.y : 0;
                                var u;
                                u = null != q.a ? q.a : 1;
                                var n = null != q.b ? q.b : 0,
                                    w;
                                w = null != q.c ? q.c : 0;
                                var y;
                                y = null != q.d ? q.d : 1;
                                var q = null != q.o ? q.o : 1,
                                    A = t.regx,
                                    t = t.regy,
                                    B = new b.Fh;
                                B.$p(null);
                                B.setPosition(r, s, 0);
                                B.Lc(u, y);
                                B.kx(!1);
                                r = this.Ty.vF(p + ".png");
                                p = new b.j.GameImage(B, "", this.T, this.Z);
                                p.rJ(r);
                                r = r.Jb;
                                p.Kf(r.da.x * -A, r.da.y * -t);
                                e.Xb();
                                B.setProperty("sX", n);
                                B.setProperty("sY", w);
                                B.setProperty("alpha", q);
                                p.UB(w, n);
                                p.yh(q *
                                    this._alpha);
                                e.ha(B);
                                this.ih.push(B);
                                h.push(B)
                            }
                            b.fe.FlashAnimation.nr.set(g, h)
                        }
                    }
                }
            },
            fI: function() {
                b.w.prototype.sc.call(this);
                var a = this.u.getName() + "_" + this.Dd + "_" + Math.floor(this.qa);
                if (null != this.ih) {
                    if (null != this.Z) {
                        var c = this.u.Q(),
                            d = this.Z.u.Q();
                        d.x += b.s.instance.te().x / 2;
                        d.y += b.s.instance.te().y / 2;
                        if (1500 < (new b.Vector3D(d.x - c.x, d.y - c.y)).xd()) return
                    }
                    if (b.fe.FlashAnimation.nr.vc(a)) {
                        if (Math.floor(this.qa) != this.Jy)
                            for (this.wv(), a = b.fe.FlashAnimation.nr.get(a), c = a.length, d = 0; d < c;) {
                                var e = d++,
                                    e = a[e];
                                e.$p(null);
                                this.ih.push(e)
                            }
                        a = this.ih.length;
                        for (c = 0; c < a;) {
                            d = c++;
                            d = this.ih[d];
                            this.u.ha(d);
                            var e = d.fb(b.j.GameImage),
                                g = d.Qa("sX"),
                                h = d.Qa("sY"),
                                f = d.Qa("alpha"),
                                m = this.u.Xb();
                            d.$p(this.pa());
                            e.yh(this._alpha * f);
                            e.UB(g * m.y, h * m.x);
                            e.nt(d);
                            e.gx(this.Z);
                            d.sc();
                            e.nt(null);
                            e.gx(null);
                            d.$p(null);
                            d.getParent().removeChild(d)
                        }
                    }
                }
            },
            Ue: function() {
                b.w.prototype.Ue.call(this);
                this.Jy = Math.floor(this.qa)
            },
            kR: z("PC"),
            jR: z("NC"),
            sc: function() {
                b.w.prototype.sc.call(this);
                this.fI()
            },
            W: function() {
                b.w.prototype.W.call(this);
                this.wv(!1);
                this.ih = null
            },
            r: b.fe.FlashAnimation
        });
        b.font = {};
        b.font.Kq = function(a, c, d) {
            this.Ii = this.km = this.or = this.Kr = null;
            this.wg = a;
            this.hd = d;
            a = w.parse(b.k.Ga.fc(c));
            this.or = [];
            this.Kr = [];
            this.LH(a)
        };
        b.font.Kq.q = !0;
        b.font.Kq.prototype = {
            getName: C("wg"),
            mx: z("wg"),
            iA: C("hd"),
            LH: function(a) {
                var c = a.za("font").next().za("info").next(),
                    d = new b.font.Oq;
                d.fD = "1" == c.get("aa");
                d.bold = "1" == c.get("bold");
                d.charset = c.get("charset");
                d.face = c.get("face");
                d.$F = "1" == c.get("italic");
                d.outline = "1" == c.get("outline");
                var e = c.get("padding").split(",");
                d.paddingBottom = parseInt(e[0]);
                d.paddingLeft = parseInt(e[1]);
                d.paddingRight = parseInt(e[2]);
                d.paddingTop = parseInt(e[3]);
                d.size = parseInt(c.get("size"));
                d.GJ = "1" == c.get("smooth");
                e = c.get("spacing").split(",");
                d.xl = parseInt(e[0]);
                d.wx = parseInt(e[1]);
                d.OJ = parseInt(c.get("stretchH"));
                d.XJ = "1" == c.get("unicode");
                this.Ii = d;
                c = a.za("font").next().za("common").next();
                d = new b.font.Mq;
                d.pD = parseFloat(c.get("alphaChnl"));
                d.nv = parseInt(c.get("base"));
                d.$H = parseFloat(c.get("redChnl"));
                d.KF = parseFloat(c.get("greenChnl"));
                d.FD = parseFloat(c.get("blueChnl"));
                d.lineHeight = parseFloat(c.get("lineHeight"));
                d.JH = "1" == c.get("packed");
                d.KH = 1;
                d.EI = parseFloat(c.get("scaleH"));
                d.FI = parseFloat(c.get("scaleW"));
                this.km = d;
                for (c = a.za("font").next().za("chars").next().za("char"); c.wc();) d = c.next(), e = new b.font.Lq, e.id = parseInt(d.get("id")), e.x = parseInt(d.get("x")), e.y = parseInt(d.get("y")), e.width = parseInt(d.get("width")), e.height = parseInt(d.get("height")), e.rC = parseInt(d.get("xoffset")), e.sC = parseInt(d.get("yoffset")),
                    e.yt = parseInt(d.get("xadvance")), this.or.push(e);
                if (a.za("font").next().za("kernings").wc())
                    for (a = a.za("font").next().za("kernings").next().za("kerning"); a.wc();) c = a.next(), d = new b.font.Pq, d.GE = parseInt(c.get("first")), d.HI = parseInt(c.get("second")), d.qD = parseInt(c.get("amount")), this.Kr.push(d)
            },
            Yz: function(a) {
                for (var b = this.or.length, c = 0; c < b;) {
                    var e = c++,
                        e = this.or[e];
                    if (e.id == a) return e
                }
                return null
            },
            Nv: function(a, b) {
                for (var c = this.Kr.length, e = 0; e < c;) {
                    var g = e++,
                        g = this.Kr[g];
                    if (g.GE == a && g.HI == b) return g.qD
                }
                return 0
            },
            r: b.font.Kq
        };
        b.font.Lq = function() {
            this.id = this.x = this.y = this.width = this.height = this.rC = this.sC = this.yt = 0
        };
        b.font.Lq.q = !0;
        b.font.Lq.prototype = {
            r: b.font.Lq
        };
        b.font.Mq = function() {
            this.$H = this.KF = this.FD = 0;
            this.pD = 1;
            this.JH = 0;
            this.KH = 1;
            this.FI = this.EI = 1024;
            this.nv = 25;
            this.lineHeight = 32
        };
        b.font.Mq.q = !0;
        b.font.Mq.prototype = {
            r: b.font.Mq
        };
        b.font.Ol = v();
        b.font.Ol.q = !0;
        b.font.Ol.CN = function(a, c, d, e) {
            c = new b.font.Kq(c, d, e);
            a.cI(c);
            return c
        };
        b.font.Ol.DN = function(a, c, d, e) {
            a = a.O();
            new b.font.Pl(a, b.k.le.U().fA(c),
                d, e);
            return a
        };
        b.font.Ol.EN = function(a, c, d, e) {
            if ("0" == b.la.Qa("spriteFontReplace")) return null;
            a = a.O();
            (new b.font.Pl(a, b.k.le.U().fA(c), null, e)).gI(d);
            return a
        };
        b.font.Ol.prototype = {
            r: b.font.Ol
        };
        b.font.Oq = function() {
            this.paddingTop = this.paddingLeft = this.paddingRight = this.paddingBottom = this.wx = this.xl = this.outline = 1;
            this.GJ = this.fD = !0;
            this.OJ = 100;
            this.XJ = !0;
            this.charset = "";
            this.bold = this.$F = !1
        };
        b.font.Oq.q = !0;
        b.font.Oq.prototype = {
            r: b.font.Oq
        };
        b.font.Pq = v();
        b.font.Pq.q = !0;
        b.font.Pq.prototype = {
            r: b.font.Pq
        };
        b.font.Pl = function(a, c, d, e) {
            this.Ky = this.Ly = "";
            this.Io = !1;
            this.Bf = "center";
            this.Po = this.rc = this.Ru = null;
            this.Wf = 375;
            this.Pd = null;
            b.w.call(this, a, "FontRender");
            this.Pd = c;
            this.Rc = "";
            this.T = d;
            this.Z = e;
            this.Po = []
        };
        b.font.Pl.q = !0;
        b.font.Pl.N = b.w;
        b.font.Pl.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.IA()
            },
            update: function() {
                b.w.prototype.update.call(this);
                if (null != this.rc && (this.Fa(this.rc.innerHTML), "none" == this.rc.parentElement.style.display && this.$w(), this.rc.style.left != this.Ky ||
                        this.rc.style.top != this.Ly)) this.on();
                if (this.Ru != this.Rc) this.on();
                this.Io && (this.Io = !1, this.$w(), this.IA())
            },
            xF: C("Rc"),
            Fa: function(a) {
                this.Rc = a;
                this.Rc = H.replace(this.Rc, "&amp;", "&");
                this.Io = !0
            },
            CR: function(a) {
                this.Ru = this.Rc = a;
                this.Io = !0
            },
            IA: function() {
                this.$w();
                for (var a = this.Rc.length, c = new b.I(0, this.Pd.km.nv), d = [], e = 0, g = !1, h = 0; h < a;) {
                    var f = y.Oj(this.Rc, h),
                        m = y.Oj(this.Rc, h + 1);
                    if ("<br>" == this.Rc.substring(h, h + 4) || "<br/>" == this.Rc.substring(h, h + 5)) c.x = 0, c.y += this.Pd.km.lineHeight, h += 4, "center" ==
                        this.Bf ? this.os(d, e) : "right" == this.Bf && this.kt(d, e), e = 0, d = [];
                    else {
                        g && (c.x + this.CF(this.BF(h) + 15) > this.Wf && (c.x = 0, c.y += this.Pd.km.lineHeight + this.Pd.Ii.wx, "center" == this.Bf ? this.os(d, e) : "right" == this.Bf && this.kt(d, e), e = 0, d = []), g = !1);
                        var n = this.u.pa().O();
                        n.kx(!1);
                        this.u.ha(n);
                        n.setPosition(Math.ceil(c.x), Math.ceil(c.y));
                        var q = this.Pd.Yz(f);
                        if (null != q) {
                            var p = new b.j.GameImage(n, this.Pd.hd, this.T, this.Z);
                            p.Kf(q.rC, Math.ceil(q.sC - this.Pd.km.nv));
                            p.zh(new b.hf(q.x, q.y, q.width, q.height));
                            c.x += Math.ceil(q.yt +
                                this.Pd.Ii.xl);
                            e += Math.ceil(q.yt + this.Pd.Ii.xl);
                            d.push(n);
                            h < a - 1 && (c.x += this.Pd.Nv(f, y.Oj(this.Rc, h + 1)) + this.Pd.Ii.xl, e += this.Pd.Nv(f, y.Oj(this.Rc, h + 1)) + this.Pd.Ii.xl);
                            32 != m && c.x + 15 > this.Wf && (c.x = 0, c.y += this.Pd.km.lineHeight + this.Pd.Ii.wx, "center" == this.Bf ? this.os(d, e) : "right" == this.Bf && this.kt(d, e), e = 0, d = []);
                            32 == f && (g = !0)
                        }
                        this.Po.push(n);
                        h++
                    }
                }
                "center" == this.Bf ? this.os(d, e) : "right" == this.Bf && this.kt(d, e);
                this.Ru = this.Rc
            },
            os: function(a, b) {
                for (var c = this.Wf / 2, e = a.length, g = 0; g < e;) {
                    var f = g++,
                        f = a[f];
                    f.setPosition(c -
                        b / 2 + f.ld().x, f.ld().y, f.ld().z)
                }
            },
            kt: function(a, b) {
                for (var c = this.Wf, e = a.length, g = 0; g < e;) {
                    var f = g++,
                        f = a[f];
                    f.setPosition(c - b + f.ld().x, f.ld().y, f.ld().z)
                }
            },
            BF: function(a) {
                for (var b = this.Rc.split(" "), c = 0, e = 0, g = 0; g < a;) g++, c++, c > b[e].length && (c = 0, e++);
                return b[e]
            },
            CF: function(a) {
                for (var b = 0, c = a.length, e = 0; e < c;) {
                    var g = e++,
                        f = y.Oj(a, g),
                        l = this.Pd.Yz(f);
                    null != l && (b += l.yt + this.Pd.Ii.xl, g < c - 1 && (b += this.Pd.Nv(f, y.Oj(a, g + 1)) + this.Pd.Ii.xl))
                }
                return b
            },
            $w: function() {
                for (var a = this.Po.length, b = 0; b < a;) {
                    var c = b++;
                    this.Po[c].W()
                }
                this.Po = []
            },
            sc: function() {
                b.w.prototype.sc.call(this)
            },
            gI: function(a, c) {
                null == c && (c = !0);
                if (b.k.le.U().WE(a)) c && this.u.W();
                else {
                    null != this.T && b.s.instance.uB(this.T);
                    var d = p.wd().getElementById(a);
                    if (null == d) b.H.ba.log("Could not find '" + a + "' on the page!");
                    else {
                        this.rc = d;
                        b.k.le.U().bI(this.rc.id, this);
                        this.Rc = d.innerHTML;
                        d.style.display = "none";
                        var e = new b.$c("temp", u.gb(d.style.width), u.gb(d.style.height) + u.gb(d.style.top));
                        this.T = e;
                        this.T.Va().style.zIndex = d.style.zIndex;
                        b.s.instance.ag(e);
                        this.Bf = d.style.textAlign;
                        this.on()
                    }
                }
            },
            on: function() {
                if (null != this.rc) {
                    this.T.Va().style.left = Math.ceil(u.gb(this.rc.style.left)) + "px";
                    this.T.Va().style.top = Math.ceil(u.gb(this.rc.style.top)) + "px";
                    null != this.rc.style.webkitTransform ? this.T.Va().style.webkitTransform = this.rc.style.webkitTransform : null != this.rc.style.transform && (this.T.Va().style.transform = this.rc.style.transform);
                    this.T.Va().style.width = u.gb(this.rc.style.width) + "px";
                    this.T.Va().style.height = u.gb(this.rc.style.height) + u.gb(this.rc.style.top) +
                        "px";
                    this.T.gc().style.width = u.gb(this.rc.style.width) + "px";
                    this.T.gc().style.height = u.gb(this.rc.style.height) + u.gb(this.rc.style.top) + "px";
                    if ("none" != this.rc.style.transform && null != this.rc.style.transform && ("none" == this.T.Va().style.webkitTransform || null == this.T.Va().style.webkitTransform)) {
                        var a = this.rc.style.transform.split(" ")[0].split(","),
                            c = (new R("^\\D+", "g")).replace(a[0], ""),
                            a = parseInt(a[1]);
                        this.T.Va().style.left = parseInt(c) + "px";
                        this.T.Va().style.top = a + "px"
                    }
                    this.T.gc().width = parseInt(this.T.gc().style.width);
                    this.T.gc().height = parseInt(this.T.gc().style.height);
                    this.u.Lc(1 / b.s.instance.wb().x, 1 / b.s.instance.wb().y);
                    this.Wf = Math.ceil(u.gb(this.rc.style.width));
                    this.Io = !0;
                    this.Ky = this.rc.style.left;
                    this.Ly = this.rc.style.top
                }
            },
            Ke: function(a, c) {
                b.w.prototype.Ke.call(this, a, c);
                switch (a) {
                    case "onScreenScaleUpdated":
                        this.on()
                }
            },
            W: function() {
                b.w.prototype.W.call(this);
                null != this.T && null != this.rc && b.s.instance.uB(this.T);
                null != this.rc && b.k.le.U().YJ(this.rc.id)
            },
            We: z("Wf"),
            lF: C("Wf"),
            r: b.font.Pl
        });
        b.Tm = {};
        b.Tm.po =
            function() {
                this.Ri = null;
                b.ca.call(this)
            };
        b.Tm.po.q = !0;
        b.Tm.po.N = b.ca;
        b.Tm.po.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this)
            },
            pl: function(a) {
                b.s.dd() && !b.s.instance.$m() ? a && 0 == b.la.Qa("isLandscapeAllowedIPad") ? this.tt(1) : a || 0 != b.la.Qa("isPortraitAllowedIPad") ? this.Yv() : this.tt(0) : b.s.dd() && (a && 0 == b.la.Qa("isLandscapeAllowedIPhone") ? this.tt(1) : a || 0 != b.la.Qa("isPortraitAllowedIPhone") ? this.Yv() : this.tt(0))
            },
            tt: function(a) {
                b.H.ba.log("showOrientationScreen()");
                this.Yv(!1);
                b.s.instance.NJ();
                b.k.rd.U().pt(!0);
                b.k.SoundManager.nB();
                switch (a) {
                    case 0:
                        this.Ri = this.O();
                        b.s.instance.$m() ? new b.j.Ee(this.Ri, b.s.instance.Pa("orientation"), b.k.Ga.fc("iphoneLandscapeHtml")) : new b.j.Ee(this.Ri, b.s.instance.Pa("orientation"), b.k.Ga.fc("ipadLandscapeHtml"));
                        break;
                    case 1:
                        this.Ri = this.O(), b.s.instance.$m() ? new b.j.Ee(this.Ri, b.s.instance.Pa("orientation"), b.k.Ga.fc("iphonePortraitHtml")) : new b.j.Ee(this.Ri, b.s.instance.Pa("orientation"), b.k.Ga.fc("ipadPortraitHtml"))
                }
            },
            Yv: function(a) {
                null == a && (a = !0);
                b.H.ba.log("hideOrientationScreen()");
                null != this.Ri && (this.Ri.W(), this.Ri = null);
                a && (b.s.instance.iI(), b.k.rd.U().pt(!1), b.k.SoundManager.zB())
            },
            Ke: function(a, c) {
                b.ca.prototype.Ke.call(this, a, c);
                switch (a) {
                    case "onOrientationChanged":
                        this.pl(c.XF)
                }
            },
            r: b.Tm.po
        });
        b.k = {};
        b.k.df = function() {
            this.Sx = new B.ee.oe
        };
        b.k.df.q = !0;
        b.k.df.U = function() {
            null == b.k.df.dc && (b.k.df.dc = new b.k.df);
            return b.k.df.dc
        };
        b.k.df.prototype = {
            Hs: function(a) {
                return this.Sx.get(a)
            },
            Zw: function(a) {
                this.Sx.set(a.getName(), a)
            },
            r: b.k.df
        };
        b.k.Ga = v();
        b.k.Ga.q = !0;
        b.k.Ga.fc = function(a) {
            if (!b.k.Ga.ap.vc(a)) throw a + " does not exist in asset list!";
            return b.k.Ga.ap.get(a)
        };
        b.k.Ga.js = function(a) {
            return b.k.Ga.ap.vc(a)
        };
        b.k.Ga.gk = function(a, c) {
            b.k.Ga.ap.vc(a) || (b.k.Ga.ap.set(a, c), b.H.ba.log("Registered Asset: " + a))
        };
        b.k.Ga.prototype = {
            r: b.k.Ga
        };
        b.k.gf = function() {
            b.Ya.call(this);
            b.k.gf.dc = this
        };
        b.k.gf.q = !0;
        b.k.gf.U = function() {
            return b.k.gf.dc
        };
        b.k.gf.N = b.Ya;
        b.k.gf.prototype = s(b.Ya.prototype, {
            update: function() {
                b.Ya.prototype.update.call(this);
                "1" == b.la.Qa("debugCheats") && (b.k.rd.U().vp(104) && b.la.setProperty("debugDraw", "1" == b.la.Qa("debugDraw") ? "0" : "1"), b.k.rd.U().vp(101) && this.dispatchEvent(new b.k.mg("beatLevel")), b.k.rd.U().vp(102) && this.dispatchEvent(new b.k.mg("failLevel")), b.k.rd.U().vp(100) && this.dispatchEvent(new b.k.mg("revealObjects")))
            },
            W: function() {
                b.Ya.prototype.W.call(this);
                b.k.gf.dc = null
            },
            r: b.k.gf
        });
        b.k.mg = function(a) {
            b.L.La.call(this, a)
        };
        b.k.mg.q = !0;
        b.k.mg.N = b.L.La;
        b.k.mg.prototype = s(b.L.La.prototype, {
            r: b.k.mg
        });
        b.k.le =
            function() {
                this.Fk = null;
                b.Ya.call(this);
                this.Fk = [];
                b.k.le.dc = this
            };
        b.k.le.q = !0;
        b.k.le.U = function() {
            return b.k.le.dc
        };
        b.k.le.N = b.Ya;
        b.k.le.prototype = s(b.Ya.prototype, {
            cI: function(a) {
                this.bF(a) || this.Fk.push(a)
            },
            nS: function(a) {
                y.remove(this.Fk, a)
            },
            bF: function(a) {
                for (var b = this.Fk.length, c = 0; c < b;) {
                    var e = c++;
                    if (a == this.Fk[e]) return !0
                }
                return !1
            },
            bI: function(a, c) {
                b.k.le.xr.set(a, c)
            },
            SO: function(a) {
                return b.k.le.xr.get(a)
            },
            WE: function(a) {
                return b.k.le.xr.vc(a)
            },
            YJ: function(a) {
                b.k.le.xr.remove(a)
            },
            fA: function(a) {
                for (var b =
                        this.Fk.length, c = 0; c < b;) {
                    var e = c++,
                        e = this.Fk[e];
                    if (e.getName() == a) return e
                }
                return null
            },
            r: b.k.le
        });
        b.k.rd = function() {
            this.tm = this.um = null;
            this.kh = this.qm = !1;
            this.ce = null;
            b.Ya.call(this);
            b.k.rd.dc = this;
            this.ce = new b.I(0, 0);
            this.tm = [];
            this.um = [];
            for (var a = 0; 255 > a;) a++, this.tm.push(!1), this.um.push(!1)
        };
        b.k.rd.q = !0;
        b.k.rd.U = function() {
            return b.k.rd.dc
        };
        b.k.rd.N = b.Ya;
        b.k.rd.prototype = s(b.Ya.prototype, {
            J: function() {
                b.Ya.prototype.J.call(this);
                p.hc().addEventListener("mousemove", r(this, this.gt));
                p.hc().addEventListener("mousedown",
                    r(this, this.uh));
                p.hc().addEventListener("mouseup", r(this, this.ht));
                p.hc().addEventListener("mouseleave", r(this, this.$G));
                p.hc().addEventListener("mouseout", r(this, this.fj));
                p.wd().addEventListener("keydown", r(this, this.PG));
                p.wd().addEventListener("keyup", r(this, this.RG));
                p.wd().addEventListener("keypress", r(this, this.QG));
                p.hc().addEventListener("click", r(this, this.Dw));
                document.addEventListener("touchstart", r(this, this.uh));
                document.addEventListener("touchend", r(this, this.ht));
                document.addEventListener("touchmove",
                    r(this, this.gt))
            },
            update: function() {
                b.Ya.prototype.update.call(this)
            },
            Ue: function() {
                b.Ya.prototype.Ue.call(this);
                for (var a = this.um.length, c = 0; c < a;) {
                    var d = c++;
                    this.um[d] = !1
                }
            },
            Zh: function() {
                var a = b.s.instance.vA();
                return new b.I((this.ce.x - a.x) / b.s.instance.wb().x, (this.ce.y - a.y) / b.s.instance.wb().y)
            },
            gt: function(a) {
                if (!this.kh)
                    if (b.s.dd()) {
                        for (var c = a.changedTouches, d = c.length, e = 0; e < d;) {
                            var g = e++,
                                g = c[g],
                                f = g.pageY - p.Va().offsetParent.offsetTop;
                            this.ce.x = g.pageX - p.Va().offsetParent.offsetLeft;
                            this.ce.y =
                                f;
                            b.s.instance.Kc("mouseMove", this.Zh())
                        }
                        b.s.instance.Kc("verifyTouches", a)
                    } else c = a.pageY - p.Va().offsetParent.offsetTop, this.ce.x = a.pageX - p.Va().offsetParent.offsetLeft, this.ce.y = c, b.s.instance.Kc("mouseMove", this.Zh())
            },
            uh: function(a) {
                b.s.instance.FA();
                if (!this.kh)
                    if (b.s.dd()) {
                        this.qm = !0;
                        a = a.changedTouches;
                        for (var c = a.length, d = 0; d < c;) {
                            var e = d++,
                                e = a[e],
                                g = e.pageY - p.Va().offsetParent.offsetTop;
                            this.ce.x = e.pageX - p.Va().offsetParent.offsetLeft;
                            this.ce.y = g;
                            b.s.instance.Kc("mouseDown", this.Zh())
                        }
                    } else this.qm = !0, c = a.pageY - p.Va().offsetParent.offsetTop, this.ce.x = a.pageX - p.Va().offsetParent.offsetLeft, this.ce.y = c, b.s.instance.Kc("mouseDown", this.Zh())
            },
            ht: function(a) {
                if (!this.kh) {
                    if (b.s.dd()) 0 == a.touches.length && (this.qm = !1);
                    else {
                        this.qm = !1;
                        var c;
                        c = a.pageX - p.Va().offsetParent.offsetLeft;
                        a = a.pageY - p.Va().offsetParent.offsetTop;
                        this.ce.x = c;
                        this.ce.y = a
                    }
                    b.s.instance.Kc("mouseUp", this.Zh())
                }
            },
            Dw: function(a) {
                if (!this.kh) {
                    var c = a.pageY - p.Va().offsetParent.offsetTop;
                    this.ce.x = a.pageX - p.Va().offsetParent.offsetLeft;
                    this.ce.y = c;
                    b.s.instance.Kc("mouseClick", this.Zh())
                }
            },
            $G: function(a) {
                if (!this.kh) {
                    var c = a.pageY - p.Va().offsetParent.offsetTop;
                    this.ce.x = a.pageX - p.Va().offsetParent.offsetLeft;
                    this.ce.y = c;
                    b.s.instance.Kc("mouseLeave", this.Zh())
                }
            },
            fj: function(a) {
                if (!this.kh) {
                    var c = a.pageY - p.Va().offsetParent.offsetTop;
                    this.ce.x = a.pageX - p.Va().offsetParent.offsetLeft;
                    this.ce.y = c;
                    b.s.instance.Kc("mouseOut", this.Zh())
                }
            },
            PG: function(a) {
                a.stopPropagation();
                this.kh || this.tm[a.keyCode] || (this.tm[a.keyCode] = !0, this.um[a.keyCode] = !0, b.s.instance.Kc("keyDown", a.keyCode))
            },
            RG: function(a) {
                this.kh || (this.tm[a.keyCode] = !1, b.s.instance.Kc("keyUp", a.keyCode))
            },
            QG: function(a) {
                a.stopPropagation();
                this.kh || b.s.instance.Kc("keyPressed", a.keyCode)
            },
            Oz: function() {
                document.onkeydown = function(a) {
                    a.preventDefault();
                    return !1
                }
            },
            AE: function() {
                document.onkeydown = null
            },
            cP: C("kh"),
            pt: z("kh"),
            vQ: function(a) {
                return this.tm[a]
            },
            vp: function(a) {
                return this.um[a]
            },
            wQ: C("qm"),
            r: b.k.rd
        });
        b.k.Sq = v();
        b.k.Sq.q = !0;
        b.k.Sq.prototype = {
            r: b.k.Sq
        };
        b.k.Sf = function() {
            this.Ge =
                this.Em = null;
            b.Ya.call(this);
            b.k.Sf.dc = this;
            this.Em = [];
            this.Ge = [];
            this.addEventListener("raycastCheck", r(this, this.iH))
        };
        b.k.Sf.q = !0;
        b.k.Sf.U = function() {
            return b.k.Sf.dc
        };
        b.k.Sf.BN = function(a, c, d, e, g, f, l, m) {
            null == m && (m = !0);
            f = f.O();
            f.setPosition(a, c, d);
            d = new b.h.sk;
            d.R = new b.I(a, c);
            d.da = new b.I(e, g);
            a = new b.j.dg.Il(f, d, m ? new b.Vector3D : new b.Vector3D(0.5 * d.da.x, 0.5 * d.da.y));
            if (null != l)
                for (c = l.length, e = 0; e < c;) g = e++, a.kv(l[g]);
            return f
        };
        b.k.Sf.AN = function(a, c, d, e, g, f, l) {
            null == f && (f = 0);
            null == g && (g = 0);
            null == e && (e = 0);
            var m = new b.h.sk;
            m.da = new b.I(c, d);
            a = new b.j.dg.Il(a, m, new b.Vector3D(e, g, f));
            if (null != l)
                for (c = l.length, d = 0; d < c;) e = d++, a.kv(l[e]);
            return a
        };
        b.k.Sf.N = b.Ya;
        b.k.Sf.prototype = s(b.Ya.prototype, {
            update: function() {
                b.Ya.prototype.update.call(this)
            },
            aI: function(a) {
                for (var b = this.Ge.length, c = 0; c < b;) {
                    var e = c++;
                    if (this.Ge[e] == a) return
                }
                this.Ge.push(a)
            },
            sB: function(a) {
                for (var b = this.Ge.length, c = 0; c < b;) {
                    var e = c++;
                    if (this.Ge[e] == a) {
                        this.Ge.splice(e, 1);
                        break
                    }
                }
            },
            wO: C("Ge"),
            $h: function(a, c, d, e, g) {
                null ==
                    e && (e = !0);
                for (var f = -1, l = null, m = null, n = 0, q = 0, p = this.Ge.length, r = 0; r < p;) {
                    var s = r++;
                    q++;
                    s = this.Ge[s];
                    if (!1 != s.qc) {
                        if (null != g) {
                            for (var u = !1, w = g.length, A = 0; A < w;) {
                                var B = A++;
                                if (s.EA(g[B])) {
                                    u = !0;
                                    break
                                }
                            }
                            if (!u) continue
                        }
                        n++;
                        u = new b.I;
                        if (e) {
                            if (w = new b.I, A = s.$h(a, c, u, e, w), -1 == f && 0 < A || 0 < A && A < f) d.Dg = A, d.Bz = s, d.Cz = u, m = d.Gc = w, l = u, f = A, y.remove(this.Ge, s), this.Ge.unshift(s)
                        } else if (w = new b.I, A = s.$h(a, c, u, e, w), 0 < A) {
                            d.Dg = A;
                            d.Bz = s;
                            d.Cz = u;
                            m = d.Gc = w;
                            l = u;
                            f = A;
                            y.remove(this.Ge, s);
                            this.Ge.unshift(s);
                            break
                        }
                    }
                }
                this.Em.push({
                    start: a,
                    end: c,
                    LF: l,
                    Gc: m
                });
                return f
            },
            Fc: function() {
                b.Ya.prototype.Fc.call(this);
                for (var a = this.Em.length, c = 0; c < a;) {
                    var d = c++,
                        e = this.Em[d],
                        g = e.start,
                        f = e.end,
                        d = e.LF,
                        l = b.s.instance.Pa("debug").gc().getContext("2d");
                    l.save();
                    if (null != b.j.Camera.Gg()) {
                        var m = b.j.Camera.Gg().u,
                            n = b.j.Camera.Gg()._zoomScale;
                        l.translate(-m.Q().x * n, -m.Q().y * n);
                        l.scale(n, n)
                    }
                    null == d ? (l.beginPath(), l.globalAlpha = 1, l.lineWidth = 1, l.strokeStyle = "#AAAAFF", l.moveTo(g.x, g.y), l.lineTo(f.x, f.y), l.stroke()) : (l.beginPath(), l.globalAlpha = 1, l.lineWidth =
                        1, l.strokeStyle = "#AAAAFF", l.moveTo(g.x, g.y), l.lineTo(d.x, d.y), l.stroke(), l.beginPath(), l.globalAlpha = 1, l.lineWidth = 1, l.strokeStyle = "#FFFF00", l.moveTo(d.x, d.y), l.lineTo(f.x, f.y), l.stroke(), null != e.Gc && (g = (new b.I(f.x - d.x, f.y - d.y)).xd(), e = new b.I(d.x + e.Gc.x * g, d.y + e.Gc.y * g), l.beginPath(), l.globalAlpha = 1, l.lineWidth = 1, l.strokeStyle = "#FF00FF", l.moveTo(d.x, d.y), l.lineTo(e.x, e.y), l.stroke()));
                    l.restore()
                }
                this.Em = []
            },
            MN: function() {
                for (var a = this.Ge.length - 1; 0 <= a;) this.sB(this.Ge[a]), a--;
                this.Ge = []
            },
            iH: function(a) {
                this.Em.push({
                    start: a.start,
                    end: a.end
                })
            },
            r: b.k.Sf
        });
        b.k.SoundManager = v();
        b.k.SoundManager.q = !0;
        b.k.SoundManager.J = function() {
            if (b.s.dd()) b.k.SoundManager.Bk = window.audioContextInstance, b.k.SoundManager.uu = null != window.audioContextInstance;
            else try {
                b.s.ZF() ? b.k.SoundManager.Nk = !1 : soundManager.setup({
                    url: "soundmanager2_flash9.swf",
                    flashVersion: 9,
                    onready: b.k.SoundManager.rH,
                    ontimeout: b.k.SoundManager.sH,
                    useHighPerformance: !0
                })
            } catch (a) {
                if (A.Ja.gr(a, String)) b.k.SoundManager.Nk = !1;
                else throw a;
            }
            b.k.SoundManager.He = new b.H.yo(null)
        };
        b.k.SoundManager.rH = function() {
            b.k.SoundManager.Nk = !0 == soundManager.html5.usingFlash
        };
        b.k.SoundManager.sH = function() {
            b.k.SoundManager.Nk = !1 == soundManager.html5.usingFlash
        };
        b.k.SoundManager.QQ = function() {
            b.H.ba.log("onSwfLoaded()")
        };
        b.k.SoundManager.Xz = function() {
            return b.k.SoundManager.Bk
        };
        b.k.SoundManager.Xm = function() {
            return b.k.SoundManager.uu && !b.k.SoundManager.Nk
        };
        b.k.SoundManager.pR = function(a) {
            b.k.SoundManager.uu = a
        };
        b.k.SoundManager.Vk = function() {
            return b.k.SoundManager.Bu
        };
        b.k.SoundManager.QB =
            function(a) {
                b.k.SoundManager.Bu = a;
                b.k.SoundManager.lx(b.k.SoundManager.Ro);
                b.k.SoundManager.Xm() || (b.s.dd() && a ? b.k.SoundManager.He.get().pause() : b.s.dd() && !a && b.k.SoundManager.He.get().play())
            };
        b.k.SoundManager.Rv = function() {
            return b.k.SoundManager.Yu
        };
        b.k.SoundManager.VB = function(a) {
            b.k.SoundManager.Yu = a;
            b.k.SoundManager.WB(b.k.SoundManager.Zr)
        };
        b.k.SoundManager.Uj = function() {
            return b.k.SoundManager.zy
        };
        b.k.SoundManager.yR = function(a) {
            b.k.SoundManager.zy = a;
            b.k.SoundManager.lx(b.k.SoundManager.Ro);
            b.k.SoundManager.WB(b.k.SoundManager.Zr)
        };
        b.k.SoundManager.Ls = function() {
            return b.k.SoundManager.Vk() ? 0 : b.k.SoundManager.Ro
        };
        b.k.SoundManager.lx = function(a) {
            b.k.SoundManager.Ro = a;
            null != b.k.SoundManager.He && null != b.k.SoundManager.He.get() && b.k.SoundManager.He.get().setVolume(b.k.SoundManager.Bu ? 0 : b.k.SoundManager.Ls() * b.k.SoundManager.Uj())
        };
        b.k.SoundManager.Ns = function() {
            return b.k.SoundManager.Rv() ? 0 : b.k.SoundManager.Zr
        };
        b.k.SoundManager.WB = function(a) {
            b.k.SoundManager.Zr = a;
            a = b.k.SoundManager.Yf.length;
            for (var c = 0; c < a;) {
                var d = c++;
                b.k.SoundManager.Yf[d].setVolume(b.k.SoundManager.Yu ? 0 : b.k.SoundManager.Ns() * b.k.SoundManager.Uj())
            }
        };
        b.k.SoundManager.Xc = function(a, c, d) {
            null == d && (d = !1);
            null == c && (c = !1);
            if (!b.k.SoundManager.Xm() && b.s.dd() && !c || !b.k.Ga.js(a)) return null;
            a = b.k.SoundManager.Xm() ? new b.audio.fm(a, b.k.SoundManager.Ns() * b.k.SoundManager.Uj(), d) : b.k.SoundManager.Uv() ? new b.audio.Nl(a, b.k.SoundManager.Uj() * b.k.SoundManager.Ns(), d) : new b.audio.Sl(a, b.k.SoundManager.Uj() * b.k.SoundManager.Ns(), d);
            a.play();
            b.k.SoundManager.Yf.push(a);
            return a
        };
        b.k.SoundManager.update = function() {
            for (var a = b.k.SoundManager.Yf.length, c = 0; c < a;) {
                var d = c++,
                    d = b.k.SoundManager.Yf[d];
                null != d && d.update()
            }
        };
        b.k.SoundManager.Nw = function(a) {
            b.k.SoundManager.jj(a.currentTarget)
        };
        b.k.SoundManager.jj = function(a) {
            y.remove(b.k.SoundManager.Yf, a)
        };
        b.k.SoundManager.nB = function() {
            null != b.k.SoundManager.He.get() && b.k.SoundManager.He.get().pause();
            for (var a = b.k.SoundManager.Yf.length, c = 0; c < a;) {
                var d = c++;
                b.k.SoundManager.Yf[d].pause()
            }
        };
        b.k.SoundManager.zB = function() {
            for (var a = b.k.SoundManager.Yf.length, c = [].concat(b.k.SoundManager.Yf), d = 0; d < a;) {
                var e = d++;
                c[e].resume()
            }
            null != b.k.SoundManager.He.get() && b.k.SoundManager.He.get().resume()
        };
        b.k.SoundManager.QH = function() {
            b.s.dd() && b.k.SoundManager.Sp("music_love2beat_1", !0)
        };
        b.k.SoundManager.Sp = function(a, c) {
            null == c && (c = !0);
            if (!b.s.dd() || c)
                if (b.k.Ga.js(a)) {
                    null != b.k.SoundManager.He.get() && b.k.SoundManager.He.get().stop();
                    var d;
                    b.k.SoundManager.Xm() ? (d = new b.audio.fm(a, b.k.SoundManager.Uj() *
                        b.k.SoundManager.Ls(), !0), d.play(0), b.k.SoundManager.He.set(d)) : b.k.SoundManager.Nk ? (d = new b.audio.Nl(a, b.k.SoundManager.Ls() * b.k.SoundManager.Uj(), !0), d.play(), b.k.SoundManager.He.set(d)) : (b.k.SoundManager.He.set(new b.audio.Sl(a, b.k.SoundManager.Uj() * b.k.SoundManager.Ls(), !0)), b.k.SoundManager.He.get().play());
                    b.k.SoundManager.lx(b.k.SoundManager.Ro)
                } else b.H.ba.log(a + " doesn't exist!")
        };
        b.k.SoundManager.fS = function() {
            b.k.SoundManager.He.get().stop();
            b.k.SoundManager.He = null
        };
        b.k.SoundManager.eS =
            function() {
                for (var a = b.k.SoundManager.Yf.length - 1; 0 <= a;) {
                    var c = b.k.SoundManager.Yf[a];
                    c.stop();
                    b.k.SoundManager.jj(c);
                    a--
                }
                b.k.SoundManager.Yf = []
            };
        b.k.SoundManager.Uv = function() {
            return b.k.SoundManager.Nk
        };
        b.k.SoundManager.QO = function() {
            return b.k.SoundManager.WM
        };
        b.k.SoundManager.Yp = function(a) {
            b.k.SoundManager.Rx = a
        };
        b.k.SoundManager.cC = function() {
            null != b.k.SoundManager.Rx && b.k.SoundManager.Rx.stop()
        };
        b.k.SoundManager.prototype = {
            r: b.k.SoundManager
        };
        b.k.xj = function() {
            this.qu = !1;
            this.yg = null;
            b.Ya.call(this);
            b.k.xj.dc = this
        };
        b.k.xj.q = !0;
        b.k.xj.U = function() {
            return b.k.xj.dc
        };
        b.k.xj.N = b.Ya;
        b.k.xj.prototype = s(b.Ya.prototype, {
            RH: function(a, c, d, e) {
                null == e && (e = !1);
                null == d && (d = !1);
                null == c && (c = !1);
                if (!this.qu || c) this.yx(), this.yg = b.k.SoundManager.Xc(a, d, e), c && (b.s.instance.$v(this.yg.Qv(), r(this, this.NG)), this.qu = !0)
            },
            NG: function() {
                this.qu = !1
            },
            yx: function() {
                null != this.yg && (this.yg.stop(), this.yg = null)
            },
            r: b.k.xj
        });
        b.Be = {};
        b.Be.vj = function(a, c, d) {
            null == d && (d = !0);
            b.ca.call(this);
            this.QC = a;
            this.bD = c;
            this.OC = d;
            b.k.SoundManager.Xc("ui_transition_1")
        };
        b.Be.vj.q = !0;
        b.Be.vj.N = b.ca;
        b.Be.vj.prototype = s(b.ca.prototype, {
            FH: function() {
                this.OC && this.QC.W();
                b.s.instance.Hd(this.bD);
                this.dispatchEvent(new b.Be.wj("midpoint"))
            },
            EH: function() {
                this.W();
                this.dispatchEvent(new b.Be.wj("complete"))
            },
            r: b.Be.vj
        });
        b.Be.wj = function(a) {
            b.L.La.call(this, a)
        };
        b.Be.wj.q = !0;
        b.Be.wj.N = b.L.La;
        b.Be.wj.prototype = s(b.L.La.prototype, {
            r: b.Be.wj
        });
        b.Tb = {};
        b.Tb.Gq = function(a) {
            this.JJ = a;
            this.zc = []
        };
        b.Tb.Gq.q = !0;
        b.Tb.Gq.prototype = {
            r: b.Tb.Gq
        };
        b.Tb.Hh = function(a, c) {
            null == c && (c = !0);
            null == a && (a = !0);
            this.yg = this.Zu = this.qr = null;
            b.Ya.call(this);
            this.Zu = new b.Tb.Vq;
            this.az = a;
            this.Xy = c;
            this.qr = [];
            b.Tb.Hh.dc = this
        };
        b.Tb.Hh.q = !0;
        b.Tb.Hh.U = function() {
            return b.Tb.Hh.dc
        };
        b.Tb.Hh.N = b.Ya;
        b.Tb.Hh.prototype = s(b.Ya.prototype, {
            iQ: C("az"),
            ZR: z("az"),
            QP: C("Xy"),
            SR: z("Xy"),
            J: function() {
                b.Ya.prototype.J.call(this)
            },
            setup: function() {
                this.PH()
            },
            PH: function() {
                for (var a = w.parse(b.k.Ga.fc("speechMap")).za("speech_map").next().za("dialogue"); a.wc();) {
                    for (var c = a.next(), d = new b.Tb.Gq(c.get("soundName")),
                            c = c.za("subtitle"); c.wc();) {
                        var e = c.next(),
                            g = new b.Tb.Wq(e.get("stringId"), u.ab(e.get("time")), u.ab(e.get("duration")));
                        b.H.ba.log(u.ab(e.get("duration")));
                        d.zc.push(g)
                    }
                    this.Zu.us.push(d)
                }
            },
            yx: function() {
                null != this.yg && (this.yg.stop(), this.yg = null)
            },
            RH: function(a) {
                var c = this;
                null != this.yg && this.yx();
                if ("0" == b.la.Qa("speechMode") || "2" == b.la.Qa("speechMode")) this.yg = b.k.SoundManager.Xc(a);
                if ("1" == b.la.Qa("speechMode") || "2" == b.la.Qa("speechMode")) {
                    var d = this.Zu.VE(a);
                    if (null != d) {
                        for (; 0 < this.qr.length;) a =
                            this.qr.pop(), b.s.instance.jE(a);
                        a = d.zc.length;
                        for (var e = 0; e < a;) {
                            var g = e++,
                                g = [d.zc[g]];
                            this.qr.push(b.s.instance.$v(g[0].time, function(a) {
                                return function() {
                                    c.mE(a[0])
                                }
                            }(g)))
                        }
                    } else b.H.ba.log("WARNING: '" + a + "' has no subtitles.")
                }
                return this.yg
            },
            mE: function(a) {
                b.H.ba.log(b.ma.wa(a.dC));
                this.dispatchEvent(new b.Tb.bm("showSubtitle", a.duration, b.ma.wa(a.dC)))
            },
            r: b.Tb.Hh
        });
        b.Tb.Vq = function() {
            this.us = []
        };
        b.Tb.Vq.q = !0;
        b.Tb.Vq.prototype = {
            VE: function(a) {
                for (var b = this.us.length, c = 0; c < b;) {
                    var e = c++;
                    if (this.us[e].JJ ==
                        a) return this.us[e]
                }
                return null
            },
            r: b.Tb.Vq
        };
        b.Tb.Wq = function(a, b, c) {
            this.dC = a;
            this.time = b;
            this.duration = c
        };
        b.Tb.Wq.q = !0;
        b.Tb.Wq.prototype = {
            r: b.Tb.Wq
        };
        b.Tb.bm = function(a, c, d) {
            this.tg = 0;
            b.L.La.call(this, a);
            this.tg = c;
            this.Wy = d
        };
        b.Tb.bm.q = !0;
        b.Tb.bm.N = b.L.La;
        b.Tb.bm.prototype = s(b.L.La.prototype, {
            KO: C("tg"),
            PP: C("Wy"),
            r: b.Tb.bm
        });
        b.ac = {};
        b.ac.vo = function(a, c, d, e) {
            this.wg = a;
            this.Jb = c.Ua();
            this.Wo = d;
            this.vb = null == e || Math.bw(e.x) && Math.bw(e.y) ? new b.I : new b.I(e.x, e.y)
        };
        b.ac.vo.q = !0;
        b.ac.vo.prototype = {
            aA: C("Jb"),
            Kf: function(a, b) {
                this.vb.x = a;
                this.vb.y = b
            },
            of: C("vb"),
            getName: C("wg"),
            r: b.ac.vo
        };
        b.ac.Yl = function(a, c) {
            this.Dc = null;
            this.Gd = [];
            this.Sy = new B.ee.oe;
            this.wg = a;
            null == c ? this.hd = a : (this.hd = c, this.Dc = b.k.Ga.fc(this.hd))
        };
        b.ac.Yl.q = !0;
        b.ac.Yl.MH = function(a, c, d) {
            d = w.parse(d);
            c = new b.ac.Yl(a, c);
            for (d = d.za("TextureAtlas").next().za("sprite"); d.wc();) {
                var e = d.next(),
                    e = new b.ac.vo(e.get("n"), new b.hf(e.get("x"), e.get("y"), e.get("w"), e.get("h")), a, new b.I(u.ab(e.get("oX")), u.ab(e.get("oY"))));
                c.iz(e)
            }
            b.ac.ne.U().qB(c);
            return c
        };
        b.ac.Yl.prototype = {
            getName: C("wg"),
            op: C("Dc"),
            iA: C("hd"),
            iz: function(a) {
                this.Gd.push(a);
                this.Sy.set(a.getName(), a)
            },
            Sv: function(a) {
                return this.Gd[a]
            },
            vF: function(a) {
                return this.Sy.get(a)
            },
            r: b.ac.Yl
        };
        b.ac.ne = function() {
            this.Uy = new B.ee.oe
        };
        b.ac.ne.q = !0;
        b.ac.ne.U = function() {
            null == b.ac.ne.dc && (b.ac.ne.dc = new b.ac.ne);
            return b.ac.ne.dc
        };
        b.ac.ne.JN = function(a, c, d, e, g) {
            var f = b.k.Ga.fc(a),
                l = Math.floor(f.width / d),
                f = Math.floor(f.height / e);
            c = new b.ac.Yl(a, c);
            for (var m = 0; m < f;)
                for (var n = m++, q = 0; q < l;) {
                    var p =
                        q++,
                        p = new b.ac.vo(a + p + "-" + n, new b.hf(p * d, n * e, d, e), a, g);
                    c.iz(p)
                }
            b.ac.ne.U().qB(c)
        };
        b.ac.ne.prototype = {
            Xk: function(a) {
                return this.Uy.get(a)
            },
            qB: function(a) {
                this.Uy.set(a.getName(), a)
            },
            r: b.ac.ne
        };
        b.Da = {};
        b.Da.Rq = v();
        b.Da.Rq.q = !0;
        b.Da.Rq.prototype = {
            r: b.Da.Rq
        };
        b.Da.cm = function() {
            this.Yi = null;
            this.width = this.height = 0;
            this.kC = "#000000";
            this.source = ""
        };
        b.Da.cm.q = !0;
        b.Da.cm.prototype = {
            r: b.Da.cm
        };
        b.Da.Xq = function() {
            this.Yi = null;
            this.width = this.height = 0;
            this.Md = new B.ee.oe
        };
        b.Da.Xq.q = !0;
        b.Da.Xq.prototype = {
            r: b.Da.Xq
        };
        b.Da.Yq = function() {
            this.data = "";
            this.width = this.height = 0;
            this.name = "";
            this.Md = new B.ee.oe;
            this.iC = []
        };
        b.Da.Yq.q = !0;
        b.Da.Yq.prototype = {
            fE: function() {
                for (var a = this.data.split(","), b = a.length, c = 0; c < b;) {
                    var e = c++;
                    this.iC.push(u.gb(a[e]))
                }
            },
            r: b.Da.Yq
        };
        b.Da.Zq = function(a, c, d, e, g, f, l) {
            this.Yy = this.Zt = null;
            this.ru = !1;
            this.T = this.ly = this.Z = this.Pr = null;
            this.yf = "";
            this.Ec = null;
            b.w.call(this, a, "TmxLevel");
            this.Ec = c;
            this.T = e;
            this.ly = g;
            this.Z = f;
            this.yf = d;
            this.Pr = l;
            this.Yy = [];
            this.Zt = [];
            this.af = []
        };
        b.Da.Zq.q = !0;
        b.Da.Zq.N = b.w;
        b.Da.Zq.prototype = s(b.w.prototype, {
            WP: C("Yy"),
            XP: C("Ec"),
            J: function() {
                b.w.prototype.J.call(this);
                for (var a = new b.LoadBatch(!0), c = this.Ec.Rg.length, d = 0; d < c;) {
                    var e = d++,
                        e = this.Ec.Rg[e];
                    0 < e.images.length ? (e = this.yf + e.images[0].source, a.$f("tmxImage" + e, e, b.AssetType.Image)) : (e = this.yf + e.source, a.$f("tmxTileset" + e, e, b.AssetType.Other))
                }
                c = this.Ec.Zm.length;
                for (d = 0; d < c;) e = d++, e = this.Ec.Zm[e], a.$f("tmxImage" + this.yf + e.Yi.source, this.yf + e.Yi.source, b.AssetType.Image);
                a.load(r(this, this.DH))
            },
            DH: function() {
                b.H.ba.log("onTilesetsLoaded()");
                for (var a = new b.LoadBatch(!0), c = this.Ec.Rg.length, d = 0; d < c;) {
                    var e = d++,
                        e = this.Ec.Rg[e];
                    if (0 == e.images.length) {
                        var g = w.parse(b.k.Ga.fc("tmxTileset" + this.yf + e.source)).za("tileset").next();
                        e.name = g.get("name");
                        e.yl = parseInt(g.get("tilewidth"));
                        e.lk = parseInt(g.get("tileheight"));
                        var g = g.za("image").next(),
                            f = g.get("source"),
                            l = new b.Da.cm;
                        l.source = f;
                        l.width = parseInt(g.get("width"));
                        l.height = parseInt(g.get("height"));
                        l.kC = g.get("trans");
                        e.images[0] = l;
                        a.$f("tmxImage" +
                            this.yf + f, this.yf + f, b.AssetType.Image)
                    } else e.images[0].Yi = b.k.Ga.fc("tmxImage" + this.yf + e.images[0].source)
                }
                a.load(r(this, this.CH));
                b.H.ba.log("~onTilesetsLoaded()")
            },
            CH: function() {
                b.H.ba.log("onTilesetImagesLoaded()");
                for (var a = this.Ec.Rg.length, c = 0; c < a;) {
                    var d = c++,
                        d = this.Ec.Rg[d];
                    null == d.images[0].Yi && (d.images[0].Yi = b.k.Ga.fc("tmxImage" + this.yf + d.images[0].source))
                }
                b.H.ba.log("~onTilesetImagesLoaded()");
                this.VG()
            },
            VG: function() {
                this.ru || (this.ru = !0, null != this.Pr && (this.Pr(), this.Pr = null))
            },
            IN: function() {
                this.ru ||
                    b.H.ba.log("Level not loaded; Cannot execute 'createLevel()'!");
                this.SF();
                this.VH()
            },
            SF: function() {
                for (var a = this.Ec.Zm.length, c = 0; c < a;) {
                    var d = c++,
                        e = this.Ec.Zm[d],
                        d = this.u.pa().O(),
                        g = new b.j.GameImage(d, "tmxImage" + this.yf + e.Yi.source, this.T, this.Z);
                    b.H.ba.log("tmxImage" + this.yf + e.Yi.source);
                    if (e.Md.vc("ParallaxX")) {
                        var f = 1 / u.ab(e.Md.get("ParallaxX"));
                        g.Zp(new b.I(f, g.Fe.y))
                    }
                    e.Md.vc("ParallaxY") && (f = 1 / u.ab(e.Md.get("ParallaxY")), g.Zp(new b.I(g.Fe.x, f)));
                    e.Md.vc("OriginX") && (g = u.ab(e.Md.get("OriginX")),
                        d.setPosition(d.Q().x + g * this.Ec.yl, d.Q().y, d.Q().z));
                    e.Md.vc("OriginY") && (e = u.ab(e.Md.get("OriginY")), d.setPosition(d.Q().x, d.Q().y + e * this.Ec.lk, d.Q().z))
                }
                a = this.Ec.Vj.length;
                for (c = 0; c < a;) {
                    for (var d = c++, d = this.Ec.Vj[d], g = d.height, f = d.width, l = this.Ec.yl, m = this.Ec.lk, n = this.Ec.Rg.length, e = [], q = 0; q < n;)
                        for (var p = q++, p = this.Ec.Rg[p], r = "tmxImage" + this.yf + p.images[0].source, s = b.k.Ga.fc("tmxImage" + this.yf + p.images[0].source), w = p.yl, y = p.lk, A = s.width, B = s.height, H = A / w, L = (w - 1) / A, M = (y - 1) / B, Q = 0; Q < g;)
                            for (var R =
                                    Q++, F = 0; F < f;) {
                                var G = F++;
                                if (!d.Md.vc("NoMobile") || !b.s.dd()) {
                                    var K = G * l,
                                        W = R * m,
                                        O = d.iC[R * f + G];
                                    if (0 != O) {
                                        for (var G = O & -2147483648, V = O & 1073741824, X = O & 536870912, O = O & 536870911, T = 1, J = 0; J < n;) {
                                            var U = J++;
                                            O >= this.Ec.Rg[U].Cs && (T = this.Ec.Rg[U].Cs)
                                        }
                                        T == p.Cs && (O -= T, !(0 > O) && (T = O % H * w / A, O = Math.floor(O / H) * y / B, J = this.u.pa().O(), J.kx(!1), J.setPosition(K, W + m, this.u.Q().z), e.push(J), K = new b.j.GameImage(J, r, this.T, this.Z), K.Kf(0, -p.lk), K.zh(new b.hf(Math.round(T * s.width), Math.round(O * s.height), Math.round(L * s.width), Math.round(M *
                                            s.height))), X && (J.tn(0, 0, b.H.tc.fp(-90)), J.setPosition(J.ld().x + w, J.ld().y, J.ld().z)), G && (J.setPosition(J.ld().x + w, J.ld().y, J.ld().z), J.Lc(-J.Xb().x, J.Xb().y, 1)), V && (J.setPosition(J.ld().x, J.ld().y - y, J.ld().z), J.Lc(J.Xb().x, -J.Xb().y, 1)), W = K.Mb(), 1024 < W.x || 1024 < W.y)) && (K.wC = !0)
                                    }
                                }
                            }
                    g = this.u.pa().O();
                    e = new b.j.io(g, e, b.s.instance.Pa("default"), 0, this.Z);
                    d.Md.vc("Foreground") && e.qt(this.ly);
                    d.Md.vc("ParallaxX") && (e.Zp(new b.I(1 / u.ab(d.Md.get("ParallaxX")), e.Fe.y)), g.setProperty("parallaxX", u.ab(d.Md.get("ParallaxX"))));
                    d.Md.vc("ParallaxY") && (e.Zp(new b.I(e.Fe.x, 1 / u.ab(d.Md.get("ParallaxY")))), g.setProperty("parallaxY", u.ab(d.Md.get("ParallaxY"))))
                }
            },
            VH: function() {
                for (var a = this.Ec.mn.length, c = 0; c < a;)
                    for (var d = c++, d = this.Ec.mn[d], e = d.Lp.length, g = 0; g < e;) {
                        var f = g++,
                            f = d.Lp[f],
                            l = f.Vw;
                        if (("Collision" == f.type || "SoftCollision" == f.type) && null != l) {
                            for (var m = this.u.pa().O(), n = new b.h.ro, q = l.Ld.length, p = 0; p < q;) {
                                var r = p++,
                                    r = l.Ld[r];
                                n.nD(Math.floor(r.x), Math.floor(r.y))
                            }(new b.j.dg.qo(m, n)).kv("Collision" == f.type ? "ground" : "softGround");
                            m.setPosition(Math.floor(f.x), Math.floor(f.y));
                            this.Zt.push(m)
                        }
                    }
            },
            bO: function(a) {
                for (var b = this.Gv(), c = [], c = c.concat(b), b = c.length - 1; 0 <= b;) c[b].type != a && c.splice(b, 1), b--;
                return c
            },
            Gv: function() {
                for (var a = [], b = this.Ec.mn.length, c = 0; c < b;)
                    for (var e = c++, e = this.Ec.mn[e], g = e.Lp.length, f = 0; f < g;) {
                        var l = f++;
                        a.push(e.Lp[l])
                    }
                return a
            },
            sO: function(a, c) {
                for (var d = -1, e = null, g = c.length, f = 0; f < g;) {
                    var l = f++,
                        l = c[l],
                        m = new b.I(l.x + l.width / 2, l.y + l.height / 2),
                        m = new b.I(m.x - a.x, m.y - a.y);
                    if (-1 == d || m.xd() < d) d = m.xd(), e = l
                }
                return e
            },
            YN: function(a) {
                for (var b = this.Gv(), c = b.length, e = 0; e < c;) {
                    var g = e++,
                        g = b[g];
                    if (g.name == a) return g
                }
                return null
            },
            ZN: function(a) {
                for (var b = this.Gv(), c = b.length, e = 0; e < c;) {
                    var g = e++,
                        g = b[g];
                    if (g.type == a) return g
                }
                return null
            },
            vO: C("Zt"),
            Wd: function() {
                b.w.prototype.Wd.call(this);
                this.Ec = null
            },
            r: b.Da.Zq
        });
        b.Da.$q = function() {
            this.Rg = this.Vj = this.mn = this.Zm = null;
            this.width = this.height = this.yl = this.lk = 0;
            this.orientation = "orthogonal";
            this.Rg = [];
            this.Vj = [];
            this.mn = [];
            this.Zm = []
        };
        b.Da.$q.q = !0;
        b.Da.$q.prototype = {
            r: b.Da.$q
        };
        b.Da.ar = function() {
            this.Vw = null;
            this.x = this.y = this.width = this.height = 0;
            this.name = this.type = "";
            this.Md = new B.ee.oe
        };
        b.Da.ar.q = !0;
        b.Da.ar.prototype = {
            OH: function(a) {
                this.Vw = new b.Da.cr;
                a = a.split(" ");
                for (var c = a.length, d = 0; d < c;) {
                    var e = d++,
                        e = a[e].split(",");
                    this.Vw.Ld.push(new b.I(u.ab(e[0]), u.ab(e[1])))
                }
            },
            r: b.Da.ar
        };
        b.Da.br = function() {
            this.visible = !0;
            this.width = this.height = 0;
            this.name = "";
            this.Lp = []
        };
        b.Da.br.q = !0;
        b.Da.br.prototype = {
            r: b.Da.br
        };
        b.Da.cr = function() {
            this.Ld = []
        };
        b.Da.cr.q = !0;
        b.Da.cr.prototype = {
            r: b.Da.cr
        };
        b.Da.dr = v();
        b.Da.dr.q = !0;
        b.Da.dr.qP = function(a) {
            var c = new b.Da.$q;
            a = w.parse(a).za("map").next();
            c.yl = u.ab(a.get("tilewidth"));
            c.lk = u.ab(a.get("tileheight"));
            c.width = u.ab(a.get("width"));
            c.height = u.ab(a.get("height"));
            c.orientation = a.get("orientation");
            for (var d = a.za("tileset"); d.wc();) {
                var e = d.next(),
                    g = new b.Da.er;
                g.Cs = u.gb(e.get("firstgid"));
                g.source = e.get("source");
                g.name = e.get("name");
                g.yl = u.gb(e.get("tilewidth"));
                g.lk = u.gb(e.get("tileheight"));
                c.Rg.push(g);
                if (e.za("image").wc()) {
                    var e =
                        e.za("image").next(),
                        f = new b.Da.cm;
                    f.width = u.gb(e.get("width"));
                    f.height = u.gb(e.get("height"));
                    f.source = e.get("source");
                    f.kC = e.get("trans");
                    g.images.push(f)
                }
            }
            for (d = a.za("layer"); d.wc();)
                if (e = d.next(), g = new b.Da.Yq, g.name = e.get("name"), g.width = u.ab(e.get("width")), g.height = u.ab(e.get("height")), e.za("data").wc() ? g.data = e.za("data").next().firstChild().Wv() : g.data = null, g.fE(), c.Vj.push(g), e.za("properties").wc())
                    for (e = e.za("properties").next().za("property"); e.wc();) {
                        var l = e.next(),
                            f = l.get("name"),
                            l = l.get("value");
                        g.Md.set(f, l)
                    }
                for (d = a.za("objectgroup"); d.wc();) {
                    e = d.next();
                    g = new b.Da.br;
                    g.width = u.ab(e.get("width"));
                    g.height = u.ab(e.get("height"));
                    g.visible = 1 == u.gb(e.get("visible"));
                    g.name = e.get("name");
                    for (e = e.za("object"); e.wc();)
                        if (l = e.next(), f = new b.Da.ar, f.name = l.get("name"), f.width = u.ab(l.get("width")), f.height = u.ab(l.get("height")), f.x = u.ab(l.get("x")), f.y = u.ab(l.get("y")), f.type = l.get("type"), g.Lp.push(f), l.za("polygon").wc() && f.OH(l.za("polygon").next().get("points")), l.za("properties").wc())
                            for (l =
                                l.za("properties").next().za("property"); l.wc();) {
                                var m = l.next(),
                                    n = m.get("name"),
                                    m = m.get("value");
                                f.Md.set(n, m)
                            }
                        c.mn.push(g)
                }
            for (a = a.za("imagelayer"); a.wc();) {
                g = a.next();
                d = new b.Da.Xq;
                d.name = g.get("name");
                d.width = u.gb("width");
                d.height = u.gb("height");
                e = new b.Da.cm;
                d.Yi = e;
                e.source = g.za("image").next().get("source");
                if (g.za("properties").wc())
                    for (g = g.za("properties").next().za("property"); g.wc();) f = g.next(), e = f.get("name"), f = f.get("value"), d.Md.set(e, f);
                c.Zm.push(d)
            }
            return c
        };
        b.Da.dr.prototype = {
            r: b.Da.dr
        };
        b.Da.er = function() {
            this.name = "";
            this.yl = this.lk = 0;
            this.source = "";
            this.Cs = 0;
            this.images = []
        };
        b.Da.er.q = !0;
        b.Da.er.prototype = {
            r: b.Da.er
        };
        b.ta = {};
        b.ta.wf = {
            rg: !0,
            yj: ["Left", "Center", "Right"]
        };
        b.ta.wf.Jx = ["Left", 0];
        b.ta.wf.Jx.mb = b.ta.wf;
        b.ta.wf.uk = ["Center", 1];
        b.ta.wf.uk.mb = b.ta.wf;
        b.ta.wf.Kx = ["Right", 2];
        b.ta.wf.Kx.mb = b.ta.wf;
        b.ta.wf.Ei = [b.ta.wf.Jx, b.ta.wf.uk, b.ta.wf.Kx];
        b.ta.xf = {
            rg: !0,
            yj: ["Top", "Center", "Bottom"]
        };
        b.ta.xf.Nx = ["Top", 0];
        b.ta.xf.Nx.mb = b.ta.xf;
        b.ta.xf.uk = ["Center", 1];
        b.ta.xf.uk.mb = b.ta.xf;
        b.ta.xf.Hx = ["Bottom", 2];
        b.ta.xf.Hx.mb = b.ta.xf;
        b.ta.xf.Ei = [b.ta.xf.Nx, b.ta.xf.uk, b.ta.xf.Hx];
        b.ta.$d = function(a, c) {
            this.cD = !0;
            this.To = this.Pu = !1;
            this.bd = this.Jb = this.ad = this.oa = null;
            b.w.call(this, a, "UiElement");
            this.sJ(c);
            this.Jb = new b.I(0, 0);
            this.oa = new b.I(1, 1);
            this.iu = b.ta.wf.uk;
            this.dv = b.ta.xf.uk
        };
        b.ta.$d.q = !0;
        b.ta.$d.N = b.w;
        b.ta.$d.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                if (null == this.ad) {
                    var a = this.sp(b.j.GameImage);
                    null != a ? this.st(a.Mb()) : this.st(new b.I(0, 0))
                }
            },
            sA: C("oa"),
            Mb: C("ad"),
            AP: C("Pu"),
            KR: z("Pu"),
            st: function(a) {
                null == this.ad && (this.ad = new b.I);
                this.ad.x = a.x;
                this.ad.y = a.y
            },
            ZP: C("bd"),
            Lc: function(a, c) {
                null == c && (c = 1);
                null == a && (a = 1);
                this.oa = new b.I(a, c)
            },
            sJ: function(a) {
                null != this.bd && this.bd.removeEventListener("updateDisplay", r(this, this.lB));
                this.bd = a;
                this.bd.addEventListener("updateDisplay", r(this, this.lB));
                this.bd.u.ha(this.u)
            },
            $O: C("iu"),
            aJ: function(a) {
                this.iu = a;
                this.To = !0
            },
            gQ: C("dv"),
            uJ: function(a) {
                this.dv = a;
                this.To = !0
            },
            aA: C("Jb"),
            zO: C("Jb"),
            zh: z("Jb"),
            bR: function(a,
                b) {
                this.aJ(a);
                this.uJ(b)
            },
            update: function() {
                b.w.prototype.update.call(this)
            },
            Ue: function() {
                b.w.prototype.Ue.call(this);
                (this.To || this.cD) && this.Dx()
            },
            lB: function() {
                this.To = !0
            },
            Dx: function() {
                this.bd.Mb();
                b.s.instance.te();
                this.bd.Mb();
                b.s.instance.te();
                var a = this.bd.Mb().x / 2 * this.Jb.x,
                    c = this.bd.Mb().y / 2 * this.Jb.y;
                this.Pu ? this.u.Lc(this.oa.x, this.oa.y) : this.u.Lc(this.oa.x / this.bd.u.Xb().x, this.oa.y / this.bd.u.Xb().y);
                var d = this.ad.Ua();
                switch (this.iu[1]) {
                    case 0:
                        a += d.x / 2 / this.bd.u.Xb().x;
                        break;
                    case 2:
                        a -=
                            d.x / 2 / this.bd.u.Xb().x
                }
                switch (this.dv[1]) {
                    case 0:
                        c += d.y / 2 / this.bd.u.Xb().y;
                        break;
                    case 2:
                        c -= d.y / 2 / this.bd.u.Xb().y
                }
                this.u.setPosition(a, c);
                this.To = !1
            },
            Fc: function() {
                b.w.prototype.Fc.call(this)
            },
            r: b.ta.$d
        });
        b.ta.xo = function(a, c) {
            b.w.call(this, a, "UiPanel");
            this.ad = c;
            this.bz = p.hc()
        };
        b.ta.xo.q = !0;
        b.ta.xo.N = b.w;
        b.ta.xo.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.st(this.ad)
            },
            Mb: C("ad"),
            st: function(a) {
                this.ad = a;
                this.Dx()
            },
            te: function() {
                var a = this.ad.Ua();
                a.x *= this.bz.innerWidth /
                    this.ad.x;
                a.y *= this.bz.innerHeight / this.ad.y;
                return a
            },
            Dx: function() {
                this.dispatchEvent(new b.ta.dm("updateDisplay"));
                this.u.Lc(1 / b.s.instance.wb().x, 1 / b.s.instance.wb().y)
            },
            Fc: function() {
                b.w.prototype.Fc.call(this);
                var a = b.s.instance.Pa("debug").gc().getContext("2d");
                a.save();
                var c = this.u.Q();
                a.beginPath();
                a.lineWidth = 1;
                a.strokeStyle = "#FF0000";
                a.moveTo(c.x - this.ad.x / 2, c.y - this.ad.y / 2);
                a.lineTo(c.x + this.ad.x / 2, c.y - this.ad.y / 2);
                a.lineTo(c.x + this.ad.x / 2, c.y + this.ad.y / 2);
                a.lineTo(c.x - this.ad.x / 2, c.y +
                    this.ad.y / 2);
                a.lineTo(c.x - this.ad.x / 2, c.y - this.ad.y / 2);
                a.stroke();
                a.restore()
            },
            r: b.ta.xo
        });
        b.ta.dm = function(a) {
            b.L.La.call(this, a)
        };
        b.ta.dm.q = !0;
        b.ta.dm.N = b.L.La;
        b.ta.dm.prototype = s(b.L.La.prototype, {
            r: b.ta.dm
        });
        b.H = {};
        b.H.Ug = v();
        b.H.Ug.q = !0;
        b.H.Ug.indexOf = function(a, b) {
            for (var c = a.length, e = 0; e < c;) {
                var g = e++;
                if (a[g] == b) return g
            }
            return -1
        };
        b.H.Ug.clear = function(a) {
            a.length = 0
        };
        b.H.Ug.prototype = {
            r: b.H.Ug
        };
        b.H.ba = v();
        b.H.ba.q = !0;
        b.H.ba.log = v();
        b.H.ba.alert = v();
        b.H.tc = v();
        b.H.tc.q = !0;
        b.H.tc.fp = function(a) {
            return 0.0174532925 *
                a
        };
        b.H.tc.XH = function(a) {
            return 57.2957795 * a
        };
        b.H.tc.YH = function(a) {
            return 0 + Math.random() * (a - 0)
        };
        b.H.tc.Vp = function(a) {
            return Math.floor(b.H.tc.YH(a))
        };
        b.H.tc.tO = function(a, c, d) {
            c = new b.I(c.x - a.x, c.y - a.y);
            d = (new b.I(d.x - a.x, d.y - a.y)).Sk(c) / c.Sk(c);
            0 > d && (d = 0);
            1 < d && (d = 1);
            d = new b.I(c.x * d, c.y * d);
            return new b.I(a.x + d.x, a.y + d.y)
        };
        b.H.tc.Xs = function(a, c, d, e, g) {
            var f = (c.x - a.x) * (e.y - d.y) - (c.y - a.y) * (e.x - d.x),
                l = (c.x - a.x) * (e.y - d.y) - (c.y - a.y) * (e.x - d.x);
            if (0 == f || 0 == l) return -2;
            e = ((a.y - d.y) * (e.x - d.x) - (a.x - d.x) *
                (e.y - d.y)) / f;
            d = ((a.y - d.y) * (c.x - a.x) - (a.x - d.x) * (c.y - a.y)) / l;
            return 0 < e && 1 > e && 0 < d && 1 > d ? (d = (new b.I(a.x - c.x, a.y - c.y)).xd() * e, c = new b.I(c.x - a.x, c.y - a.y), c.xh(e, e), c = new b.I(a.x + c.x, a.y + c.y), g.x = c.x, g.y = c.y, d) : -1
        };
        b.H.tc.Gb = function(a, b, c) {
            return a < b ? b : a > c ? c : a
        };
        b.H.tc.IP = function(a, c) {
            var d = b.H.tc.fp(c),
                e = Math.cos(d),
                d = Math.sin(d),
                g = new b.I(a.x, a.y);
            g.x = g.x * e - g.y * d;
            g.y = g.x * d + g.y * e;
            return g
        };
        b.H.tc.ME = function(a, c) {
            return b.H.tc.XH(Math.atan2(a.x * c.y - a.y * c.x, a.Sk(c)))
        };
        b.H.am = v();
        b.H.am.q = !0;
        b.H.am.Fz =
            function(a) {
                var c = b.ma.wa("GAMEPLAY_SCREEN_TIMER"),
                    c = H.replace(c, "%N", Math.floor(a / 60));
                a = u.Ah(Math.floor(a % 60));
                2 > a.length && (a = "0" + a);
                return c = H.replace(c, "%M", a)
            };
        b.H.am.prototype = {
            r: b.H.am
        };
        b.H.yo = function(a) {
            this.Hm = null;
            b.L.ng.call(this);
            this.Hm = a
        };
        b.H.yo.q = !0;
        b.H.yo.N = b.L.ng;
        b.H.yo.prototype = s(b.L.ng.prototype, {
            set: function(a) {
                var c = this.Hm;
                this.Hm = a;
                this.Hm != c && this.dispatchEvent(new b.H.em("change", this.Hm, c))
            },
            get: C("Hm"),
            r: b.H.yo
        });
        b.H.em = function(a, c, d) {
            b.L.La.call(this, a);
            this.value = c;
            this.oldValue = d
        };
        b.H.em.q = !0;
        b.H.em.N = b.L.La;
        b.H.em.prototype = s(b.L.La.prototype, {
            r: b.H.em
        });
        var f = {
            Bd: function(a, c, d) {
                b.Be.vj.call(this, a, c);
                this.T = d
            }
        };
        f.Bd.q = !0;
        f.Bd.Uh = function(a, c) {
            var d = new f.Bd(a, c, b.s.instance.Pa("transition"));
            b.s.instance.Hd(d)
        };
        f.Bd.N = b.Be.vj;
        f.Bd.prototype = s(b.Be.vj.prototype, {
            J: function() {
                b.Be.vj.prototype.J.call(this);
                b.k.rd.U().pt(!0);
                this.gs = this.O();
                this.Oy = new b.j.Tf(this.gs);
                this.Oy.un(1900, 0);
                this.RC = new b.j.GameImage(this.gs, "animatedTransition", this.T);
                this.gs.setPosition(-this.RC.Mb().x,
                    0);
                this.ev = this.O();
                this.Py = new b.j.Tf(this.ev);
                this.Py.un(-1900, 0);
                this.uy = new b.j.GameImage(this.ev, "animatedTransition", this.T);
                this.uy.yh(0.5);
                this.ev.setPosition(this.uy.Mb().x, 0);
                this.Od = new b.j.Zg(this.gs);
                this.Od.Qh(0.5, r(this, this.GH));
                this.Od.Qh(1, r(this, this.EH))
            },
            GH: function() {
                this.FH();
                this.Oy.un(3E3, 0);
                this.Py.un(-3E3, 0);
                b.k.rd.U().pt(!1)
            },
            r: f.Bd
        });
        f.bo = function(a) {
            b.ca.call(this);
            this.Nh = a
        };
        f.bo.q = !0;
        f.bo.N = b.ca;
        f.bo.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = f.$.eg(this),
                    c = b.s.instance.Pa("ui");
                f.$.Wb(this, a, 0, 0, "overlay", "ui");
                var d = f.$.Wb(this, a, 0.0026666666666666666, 0.048, "popUpBox", "ui"),
                    e = this.O();
                e.setPosition(0, -70);
                var g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("GAMEPLAY_SCREEN_QUIT_CONFIRM_TEXT"));
                g.ob("24px");
                g.Xa("great_escape_rgbold");
                g.We(450);
                d.ha(e);
                d = f.$.Wb(this, a, 0.0026666666666666666, -0.724, "screenHeader", c.getName());
                e = this.O();
                e.setPosition(0, -4);
                g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("GAMEPLAY_SCREEN_QUIT_CONFIRM"));
                g.ob("38px");
                g.Xa("great_escapeblack");
                d.ha(e);
                f.$.vd(a, -0.14666666666666667, 0.3, "checkBtn", "checkBtn", r(this, this.Sw), c, "ui_click_1", "", !1);
                f.$.vd(a, 0.144, 0.3, "menuQuitBtn", "menuQuitBtn", r(this, this.Fw), c, "ui_click_1", "", !1)
            },
            Sw: function() {
                this.W();
                f.Bd.Uh(this.Nh, new f.Di);
                b.k.SoundManager.cC()
            },
            Fw: function() {
                var a = new f.zk(this.Nh);
                b.s.instance.Hd(a);
                b.s.instance.ij(this)
            },
            r: f.bo
        });
        f.vf = function() {
            b.Ya.call(this);
            f.vf.dc = this
        };
        f.vf.q = !0;
        f.vf.U = function() {
            null == f.vf.dc && (f.vf.dc = new f.vf, b.s.instance.Lj(f.vf.dc));
            return f.vf.dc
        };
        f.vf.N =
            b.Ya;
        f.vf.prototype = s(b.Ya.prototype, {
            J: function() {
                b.Ya.prototype.J.call(this);
                this.iy = window.DIBIGameTracking
            },
            Cx: function(a, b) {
                null == b && (b = "");
                null != this.iy && this.iy("" != b ? {
                    action: a,
                    message: b
                } : {
                    action: a
                })
            },
            r: f.vf
        });
        f.ke = v();
        f.ke.q = !0;
        f.ke.UD = function(a) {
            a = a.O();
            a.setPosition(0, 0, 0);
            new b.j.Ak(a, 0.25);
            var c = new b.j.Camera(a);
            c.YB(1);
            c.Kf(new b.I(0, 0));
            new b.j.Nd(a);
            return c
        };
        f.ke.YD = function(a, b) {
            var c = a.O();
            new f.Qf(c, b);
            return c
        };
        f.ke.ZD = function(a, c, d) {
            a = a.O();
            a.setPosition(c, d);
            (new b.j.GameImage(a,
                "hudFrameHighlight", b.s.instance.Pa("ui"))).ec();
            return a
        };
        f.ke.Iz = function(a, c) {
            var d = a.O();
            d.setPosition(-250, 250);
            var e = new b.j.GameImage(d, "sideObjectiveBg", b.s.instance.Pa("ui"));
            e.ec();
            var g = a.O();
            g.setPosition(-10, -50);
            (new b.j.GameImage(g, "spyVisionReticule", b.s.instance.Pa("ui"))).ec();
            d.ha(g);
            var g = b.la.mh(),
                f = a.O();
            f.setPosition(g ? 100 : -100, 40);
            var l = new b.j.Ba(f, b.s.instance.Pa("ui"));
            l.Fa(c);
            l.ob("18px");
            l.kk(g ? "right" : "left");
            l.Xa("great_escape_rgbold");
            l.We(200);
            d.ha(f);
            (new b.j.Nd(d)).Ta(d.qa,
                "x", -250, e.Mb().x / 2, 0.2, b.j.sa.Ra.Rz);
            return d
        };
        f.ke.SD = function(a, c, d, e, g) {
            var f = b.s.instance.Pa("defaultFront"),
                l = a.O();
            l.setPosition(c, d);
            c = a.O();
            c.setPosition(0, 61);
            l.ha(c);
            c = new b.j.GameImage(c, "bonusFanfareShadow", f, e);
            c.ec();
            var m = a.O();
            m.Lc(0.7, 0.7);
            l.ha(m);
            g = new b.j.GameImage(m, "sideObjective" + g.lr + "Icon", f, e);
            g.ec();
            m = a.O();
            m.setPosition(0, 45);
            l.ha(m);
            m = new b.j.Ba(m, f, e);
            m.Xa("great_escapeblack");
            m.ob("16px");
            m.Fa(b.ma.wa("BONUS_POPUP_HEADER"));
            a = a.O();
            a.setPosition(0, 64);
            l.ha(a);
            e = new b.j.Ba(a,
                f, e);
            e.Xa("great_escapeblack");
            e.sl("#3fff29");
            e.ob("32px");
            e.Fa(H.replace(b.ma.wa("BONUS_POPUP_POINTS"), "%N", "2000"));
            f = new b.j.Nd(l);
            f.Ta(l.oa, "x", 0, 1, 0.3, b.j.sa.Ra.Wh);
            f.Ta(l.oa, "y", 0, 1, 0.3, b.j.sa.Ra.Wh);
            f.Ta(l.qa, "y", d, d - 150, 3, b.j.sa.Ra.bf, 0, function() {
                l.W()
            });
            f.Ta(g, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25);
            f.Ta(c, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25);
            f.Ta(m, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25);
            f.Ta(e, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25)
        };
        f.ke.aE = function(a, c, d, e) {
            var g = b.s.instance.Pa("defaultFront"),
                f = a.O();
            f.setPosition(c, d);
            c = a.O();
            c.setPosition(0, 0);
            f.ha(c);
            c = new b.j.GameImage(c, "bonusFanfareShadow", g, e);
            c.ec();
            var l = a.O();
            l.setPosition(0, -16);
            f.ha(l);
            l = new b.j.Ba(l, g, e);
            l.Xa("great_escapeblack");
            l.ob("16px");
            l.Fa(b.ma.wa("POPUP_POINTS_HEADER"));
            a = a.O();
            a.setPosition(0, 3);
            f.ha(a);
            e = new b.j.Ba(a, g, e);
            e.Xa("great_escapeblack");
            e.sl("#3fff29");
            e.ob("32px");
            e.Fa(H.replace(b.ma.wa("POPUP_POINTS"), "%N", "500"));
            g = new b.j.Nd(f);
            g.Ta(f.oa, "x", 0, 1, 0.3, b.j.sa.Ra.Wh);
            g.Ta(f.oa, "y", 0, 1, 0.3, b.j.sa.Ra.Wh);
            g.Ta(f.qa, "y", d, d - 150, 3, b.j.sa.Ra.bf, 0, function() {
                f.W()
            });
            g.Ta(c, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25);
            g.Ta(l, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25);
            g.Ta(e, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25)
        };
        f.ke.dE = function(a, c, d) {
            var e = b.s.instance.Pa("ui"),
                g = a.O();
            g.setPosition(c, d);
            c = a.O();
            c.setPosition(0, 0);
            g.ha(c);
            c = new b.j.GameImage(c, "bonusFanfareShadow", e);
            c.ec();
            var f = a.O();
            f.setPosition(0, -16);
            g.ha(f);
            f = new b.j.Ba(f, e);
            f.Xa("great_escapeblack");
            f.ob("16px");
            f.Fa(b.ma.wa("POPUP_SPYVISION_HEADER"));
            a = a.O();
            a.setPosition(0, 3);
            g.ha(a);
            e = new b.j.Ba(a, e);
            e.Xa("great_escapeblack");
            e.sl("#ff0000");
            e.ob("32px");
            e.Fa("-10");
            a = new b.j.Nd(g);
            a.Ta(g.oa, "x", 0, 1, 0.3, b.j.sa.Ra.Wh);
            a.Ta(g.oa, "y", 0, 1, 0.3, b.j.sa.Ra.Wh);
            a.Ta(g.qa, "y", d, d - 150, 3, b.j.sa.Ra.bf, 0, function() {
                g.W()
            });
            a.Ta(c, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25);
            a.Ta(f, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25);
            a.Ta(e, "_alpha", 1, 0, 0.15, b.j.sa.Ra.bf, 1.25)
        };
        f.ke.prototype = {
            r: f.ke
        };
        f.Nq = v();
        f.Nq.q = !0;
        f.ho = function() {
            b.ca.call(this)
        };
        f.ho.q = !0;
        f.ho.N = b.ca;
        f.ho.prototype =
            s(b.ca.prototype, {
                J: function() {
                    b.ca.prototype.J.call(this);
                    var a = f.$.eg(this),
                        c = b.s.instance.Pa("ui"),
                        d = b.la.mh();
                    f.$.Wb(this, a, 0, 0, "gameCompleteBg", "ui");
                    var e = this.O();
                    (new b.ta.$d(e, a)).zh(new b.I(d ? -0.7333333333333333 : -0.5733333333333334, 0.248));
                    e = new b.j.Ba(e, c);
                    e.Fa(b.ma.wa("GAME_COMPLETE_TOTAL_SCORE"));
                    e.ob("24px");
                    e.Xa("great_escapeblack");
                    e.kk(d ? "left" : "right");
                    for (var e = 0, g = f.xa.U().Ov(), h = 0; h < g;) var l = h++,
                        e = e + f.xa.U().tA(l + 1);
                    g = this.O();
                    (new b.ta.$d(g, a)).zh(new b.I(d ? -0.76 : -0.5466666666666666,
                        0.252));
                    g = new b.j.Ba(g, c);
                    g.Fa(u.Ah(e | 0));
                    g.ob("22px");
                    g.Xa("great_escape_rgbold");
                    g.kk(d ? "right" : "left");
                    e = this.O();
                    (new b.ta.$d(e, a)).zh(new b.I(d ? 0.5333333333333333 : -0.92, 0.44));
                    e = new b.j.Ba(e, c);
                    e.Fa(b.ma.wa("GAME_COMPLETE_TEXT"));
                    e.ob("18px");
                    e.Xa("great_escape_rgbold");
                    e.kk(d ? "right" : "left");
                    e.We(562);
                    f.$.Wb(this, a, -0.7653333333333333, -0.736, "showLogo", "ui");
                    a = f.$.vd(a, 0.7746666666666666, 0.662, "playButton", "playButton", r(this, this.Ew), c, "ui_click_1", "", !1);
                    d && a.fb(b.j.GameImage).Lc(-1, 1);
                    b.k.SoundManager.Sp("music_love2beat_1");
                    f.vf.U().Cx("All Levels Complete")
                },
                Ew: function() {
                    b.s.instance.Ax(this, new f.Di);
                    f.xa.U().ZI(!0)
                },
                r: f.ho
            });
        f.xa = function() {
            this.su = !1;
            this.$e = 1;
            b.L.ng.call(this);
            f.xa.dc = this;
            this.xg = new b.Uq
        };
        f.xa.q = !0;
        f.xa.U = function() {
            null == f.xa.dc && (f.xa.dc = new f.xa);
            return f.xa.dc
        };
        f.xa.uA = function(a) {
            return "levelScore" + (null == a ? "null" : "" + a)
        };
        f.xa.N = b.L.ng;
        f.xa.prototype = s(b.L.ng.prototype, {
            KP: C("xg"),
            hA: function() {
                return this.xg.getItem("hasCompletedTutorial", !1)
            },
            $I: function(a) {
                this.xg.setItem("hasCompletedTutorial",
                    a)
            },
            Ov: function() {
                return u.gb(b.la.Qa("numLevels"))
            },
            Pv: function() {
                return this.xg.getItem("numLevelsUnlocked", 1)
            },
            kJ: function(a) {
                this.xg.setItem("numLevelsUnlocked", Math.min(this.Ov(), Math.max(a, this.Pv())))
            },
            pJ: function(a, b) {
                a > this.tA(b) && this.xg.setItem(f.xa.uA(b), a)
            },
            tA: function(a) {
                return this.xg.getItem(f.xa.uA(a), 0)
            },
            oJ: function(a) {
                this.pJ(a, this.$e)
            },
            GB: z("$e"),
            FO: C("$e"),
            WO: function() {
                return this.xg.getItem("hasBeatenGame", !1)
            },
            ZI: function(a) {
                this.xg.setItem("hasBeatenGame", a)
            },
            Kv: function() {
                return this.xg.getItem("hasStartedGame", !1)
            },
            IB: function(a) {
                this.xg.setItem("hasStartedGame", a)
            },
            xQ: C("su"),
            jk: z("su"),
            r: f.xa
        });
        f.vk = function(a) {
            this.kf = this.Af = this.Pc = null;
            b.ca.call(this);
            this.kf = a
        };
        f.vk.q = !0;
        f.vk.N = b.ca;
        f.vk.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                b.H.ba.log("GameplayScreen::init()");
                f.Bd.Uh(this.kf, this);
                this.Af = new f.Tq;
                var a = this.O();
                this.Pc = new f.Ul(a);
                this.OF();
                this.Pc.addEventListener("win", r(this, this.Aw));
                this.Pc.addEventListener("discover", r(this, this.JG));
                b.k.gf.U().addEventListener("beatLevel",
                    r(this, this.Aw));
                b.k.gf.U().addEventListener("failLevel", r(this, this.gB))
            },
            lP: C("Pc"),
            OF: function() {
                this.nm = f.ke.YD(this, this.Pc);
                this.nm.addEventListener(f.Rf.Lx, r(this, this.CJ));
                this.nm.addEventListener(f.Rf.Mx, r(this, this.uH))
            },
            uH: function() {
                this.Af.cq(Math.max(0, this.Af.Fm + -10));
                this.nm.fb(f.Qf).cq(this.Af.Fm);
                f.ke.dE(this, b.s.instance.te().x / 2, b.s.instance.te().y / 2)
            },
            JG: function(a) {
                this.Af.cq(this.Af.Fm + (a.Oa.om ? 2E3 : 500));
                this.nm.fb(f.Qf).cq(this.Af.Fm)
            },
            CJ: function() {
                this.pause();
                b.s.instance.Hd(new f.zk(this))
            },
            AJ: function() {
                this.nm.W();
                var a = new f.Vl(this.Af);
                b.s.instance.Hd(a);
                a.addEventListener("destroy", r(this, this.hB));
                this.tB()
            },
            BJ: function() {
                this.nm.W();
                var a = new f.no;
                b.s.instance.Hd(a);
                a.addEventListener("destroy", r(this, this.iB));
                this.tB()
            },
            hB: function(a) {
                a.target.removeEventListener("destroy", r(this, this.hB));
                this.W()
            },
            iB: function(a) {
                a.target.removeEventListener("destroy", r(this, this.iB));
                this.W()
            },
            tB: function() {
                b.k.gf.U().removeEventListener("beatLevel", r(this, this.Aw));
                b.k.gf.U().removeEventListener("failLevel",
                    r(this, this.gB))
            },
            Aw: function() {
                this.Af.dJ(this.Pc.cF());
                this.AJ()
            },
            gB: function() {
                this.BJ()
            },
            r: f.vk
        });
        f.Ql = function(a) {
            b.ca.call(this);
            this.Nh = a
        };
        f.Ql.q = !0;
        f.Ql.N = b.ca;
        f.Ql.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = f.$.eg(this);
                f.$.Wb(this, a, 0, 0, "overlay", "ui");
                this.EJ()
            },
            nn: function() {
                var a = new f.zk(this.Nh);
                b.s.instance.Hd(a);
                b.s.instance.ij(this)
            },
            EJ: function() {
                var a = this.O(),
                    a = new f.pe(a);
                a.u.J();
                a.bq(0, 0);
                a.aq(0, 50);
                a.dq(0, 50);
                a.Th(b.ma.wa("TUTORIAL_HEADER_1"),
                    0, -80);
                a.Sh(b.ma.wa("TUTORIAL_BODY_1"), 0, -30);
                a.ul(r(this, this.rx));
                a.vl(r(this, this.nn))
            },
            rx: function() {
                var a = this.O(),
                    a = new f.pe(a);
                a.u.J();
                a.bq(0, 0);
                a.aq(0, 50);
                a.dq(0, 50);
                a.Th(b.ma.wa("TUTORIAL_HEADER_2"), 0, -80);
                a.Sh(b.ma.wa("TUTORIAL_BODY_2"), 0, -30, 350);
                a.ul(r(this, this.sx));
                a.vl(r(this, this.nn))
            },
            sx: function() {
                var a = this.O(),
                    a = new f.pe(a);
                a.u.J();
                a.bq(0, 0);
                a.aq(0, 50);
                a.dq(0, 50);
                a.Th(b.ma.wa("TUTORAIL_HEADER_3"), 0, -80);
                a.Sh(b.ma.wa("TUTORIAL_BODY_3"), 0, -30, 350);
                a.ul(r(this, this.tx));
                a.vl(r(this,
                    this.nn))
            },
            tx: function() {
                var a = this.O(),
                    a = new f.pe(a);
                a.u.J();
                a.bq(0, 0);
                a.aq(0, 50);
                a.dq(0, 50);
                a.Th(b.ma.wa("TUTORIAL_HEADER_4"), 0, -80);
                a.Sh(b.ma.wa("TUTORIAL_BODY_4"), 0, -30, 350);
                a.ul(r(this, this.ux));
                a.vl(r(this, this.nn))
            },
            ux: function() {
                var a = this.O(),
                    a = new f.pe(a);
                a.u.J();
                a.bq(0, 0);
                a.aq(0, 50);
                a.dq(0, 50);
                a.Th(b.ma.wa("TUTORIAL_HEADER_5"), 0, -80);
                a.Sh(b.ma.wa("TUTORIAL_BODY_5"), 0, -30, 350);
                a.ul(r(this, this.nn));
                a.vl(r(this, this.nn))
            },
            r: f.Ql
        });
        f.Qf = function(a, c) {
            b.w.call(this, a, "Hud");
            this.Pc = c
        };
        f.Qf.q = !0;
        f.Qf.N = b.w;
        f.Qf.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.RD();
                this.Pc.addEventListener("spyVisionAvailable", r(this, this.Ow));
                this.Pc.addEventListener("spyVisionUnavailable", r(this, this.Qw));
                this.Pc.addEventListener("shuffleAvailable", r(this, this.Kw));
                this.Pc.addEventListener("shuffleUnavailable", r(this, this.Mw));
                this.Pc.addEventListener("shuffleCooldownTick", r(this, this.Lw));
                this.Pc.addEventListener("spyVisionCooldownTick", r(this, this.Pw));
                this.Pc.addEventListener("addHiddenObject",
                    r(this, this.SG));
                this.Pc.addEventListener("removeHiddenObject", r(this, this.WG));
                this.Pc.addEventListener("discover", r(this, this.Op));
                this.Pc.addEventListener("showTutorial1", r(this, this.Iw));
                this.Pc.addEventListener("roundAdvance", r(this, this.Hw))
            },
            RD: function() {
                var a = f.$.eg(this.pa()),
                    c = b.s.instance.Pa("ui");
                this.Gy = f.$.vd(a, 0.9173333333333333, -0.848, "hudMenuBtn", "hudMenuBtn", r(this, this.dH), c, "ui_click_1", "", !1);
                this.Gy.fb(b.j.Hc).KB(!0);
                var d = f.$.Wb(this.pa(), a, -0.696, -0.854, "hudScoreFooter", c.getName()),
                    e = this.pa().O();
                e.setPosition(25, -12);
                var g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("GAMEPLAY_SCREEN_SCORE"));
                g.ob("12px");
                g.kk("right");
                g.Xa("great_escape_rgbold");
                d.ha(e);
                e = this.pa().O();
                e.setPosition(30, -12);
                this.Oh = new b.j.Ba(e, c);
                this.Oh.Fa("0");
                this.Oh.ob("22px");
                this.Oh.kk("left");
                this.Oh.Xa("great_escapeblack");
                d.ha(e);
                d = f.$.Wb(this.pa(), a, 0, 0.808, "hudFooter", c.getName());
                this.jh = new f.C.ah(d, c);
                this.jh.addEventListener("cyclingComplete", r(this, this.KG));
                this.jh.addEventListener("removeSpyReticule",
                    r(this, this.EG));
                this.jh.addEventListener("showTutorial2", r(this, this.Jw));
                this.jh.addEventListener("tutorial1Destoryed", r(this, this.Qp));
                this.av = f.$.vd(a, -0.7573333333333333, 0.808, "hudSpyVisionBtn", "hudSpyVisionBtn", r(this, this.vH), c, "ui_jessie_1", "", !1);
                this.$r = this.pa().O();
                this.Hj = new b.j.GameImage(this.$r, "hudButtonOverlay", c);
                this.Hj.ec();
                this.Hj.yh(0.8);
                this.av.ha(this.$r);
                this.Uu = f.$.vd(a, 0.76, 0.808, "hudReShuffleBtn", "hudReShuffleBtn", r(this, this.kH), c, "ui_shuffle_1", "", !1);
                this.Vr = this.pa().O();
                this.Uo = new b.j.GameImage(this.Vr, "hudButtonOverlay", c);
                this.Uo.ec();
                this.Uo.yh(0.8);
                this.Uu.ha(this.Vr);
                this.vv();
                this.Kz()
            },
            cq: function(a) {
                this.Oh.Fa(null == a ? "null" : "" + a)
            },
            dH: function() {
                this.u.dispatchEvent(new f.Rf(f.Rf.Lx))
            },
            RQ: function() {
                b.k.SoundManager.QB(!b.k.SoundManager.Vk());
                b.k.SoundManager.VB(!b.k.SoundManager.Rv());
                this.xt()
            },
            xt: function() {
                var a = this.Ry.fb(b.j.buttons.pj);
                a.HB(b.k.SoundManager.Vk() ? "menuSoundBtnOff" : "menuSoundBtnOn");
                a.PB(b.k.SoundManager.Vk() ? "menuSoundBtnOff" : "menuSoundBtnOn")
            },
            oS: function(a) {
                this.YM.Fa(b.H.am.Fz(a))
            },
            SG: function(a) {
                this.jh.kD(a.Oa)
            },
            KG: function(a) {
                b.H.ba.log("Hud::onHiddenObjectDockCyclingComplete");
                this.Pc.hv(a.sy)
            },
            WG: function(a) {
                this.jh.eI(a.Oa)
            },
            Op: function(a) {
                this.jh.LG(a.Oa)
            },
            vH: function() {
                this.jh.Yw();
                this.vv();
                this.u.dispatchEvent(new f.Rf(f.Rf.Mx))
            },
            kH: function() {
                this.Pc.bx()
            },
            hD: function() {
                this.av.fb(b.j.Hc).Ve(!0);
                this.$r.Ve(!1)
            },
            vv: function() {
                b.H.ba.log("deactivateSpyVisionButton");
                this.av.fb(b.j.Hc).Ve(!1);
                this.$r.Ve(!0);
                this.Hj.ix(new b.hf(0,
                    0, this.Hj.Mb().x, this.Hj.Mb().y))
            },
            gD: function() {
                b.H.ba.log("activateShuffleButton()");
                this.Uu.fb(b.j.Hc).Ve(!0);
                this.Vr.Ve(!1)
            },
            Kz: function() {
                b.H.ba.log("deactivateShuffleButton()");
                this.Uu.fb(b.j.Hc).Ve(!1);
                this.Vr.Ve(!0)
            },
            Ow: function() {
                this.hD();
                b.k.SoundManager.Xc("ui_jessie_1")
            },
            EG: function() {
                this.Pc.xv()
            },
            Lw: function(a) {
                a = a.data;
                this.Uo.ix(new b.hf(0, 0, this.Uo.Mb().x, this.Uo.Mb().y * a.Uw))
            },
            Pw: function(a) {
                a = a.data;
                this.Hj.ix(new b.hf(0, 0, this.Hj.Mb().x, this.Hj.Mb().y * a.Uw))
            },
            Kw: function() {
                b.H.ba.log("onShuffleAvailable()");
                this.gD()
            },
            Qw: function() {
                this.vv()
            },
            Mw: function() {
                b.H.ba.log("onShuffleUnavailable()");
                this.Kz();
                this.jh.ID()
            },
            Hw: function() {
                b.H.ba.log("onRoundAdvance");
                this.jh.clear();
                b.s.instance.Hd(new f.oo)
            },
            Iw: function() {
                this.jh.dispatchEvent(new f.C.bc("showTutorial1"))
            },
            Qp: function() {
                this.Pc.dispatchEvent(new f.C.bc("tutorial1Destoryed"))
            },
            Jw: function() {
                this.Pc.dispatchEvent(new f.C.bc("showTutorial2"))
            },
            W: function() {
                b.w.prototype.W.call(this);
                this.Gy.W()
            },
            r: f.Qf
        });
        f.Rf = function(a) {
            b.L.La.call(this, a)
        };
        f.Rf.q = !0;
        f.Rf.N = b.L.La;
        f.Rf.prototype = s(b.L.La.prototype, {
            r: f.Rf
        });
        f.Ul = function(a) {
            this.gy = this.gu = null;
            b.w.call(this, a, "Level")
        };
        f.Ul.q = !0;
        f.Ul.N = b.w;
        f.Ul.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.gy = b.s.instance.Pa("default");
                this.gu = b.s.instance.Pa("defaultFront");
                var a = this.pa().O();
                this.Ed = new f.C.Mc(a, this.gy, this.gu);
                this.Ed.addEventListener("shuffleAvailable", r(this, this.Kw));
                this.Ed.addEventListener("spyVisionAvailable", r(this, this.Ow));
                this.Ed.addEventListener("shuffleUnavailable",
                    r(this, this.Mw));
                this.Ed.addEventListener("spyVisionUnavailable", r(this, this.Qw));
                this.Ed.addEventListener("shuffleCooldownTick", r(this, this.Lw));
                this.Ed.addEventListener("spyVisionCooldownTick", r(this, this.Pw));
                this.Ed.addEventListener("win", r(this, this.MG));
                this.Ed.addEventListener("showTutorial1", r(this, this.Iw));
                this.Ed.addEventListener("roundAdvance", r(this, this.Hw));
                this.Ed.addEventListener("addHiddenObject", r(this, this.yG));
                this.Ed.addEventListener("removeHiddenObject", r(this, this.jH));
                this.Ed.addEventListener("discover",
                    r(this, this.Op));
                this.addEventListener("showTutorial2", r(this, this.Jw));
                this.addEventListener("tutorial1Destoryed", r(this, this.Qp));
                this.Od = new b.j.Zg(this.u);
                this.LJ()
            },
            Iw: function() {
                this.dispatchEvent(new f.C.bc("showTutorial1"))
            },
            Qp: function() {
                this.Ed.dispatchEvent(new f.C.bc("tutorial1Destoryed"))
            },
            Jw: function() {
                this.Ed.dispatchEvent(new f.C.bc("showTutorial2"))
            },
            ov: function() {
                this.Od.Qh(1, r(this, this.BG))
            },
            BG: function() {
                this.dispatchEvent(new f.Wl("win"));
                b.k.SoundManager.cC()
            },
            Op: function(a) {
                this.dispatchEvent(a)
            },
            yG: function(a) {
                this.dispatchEvent(a)
            },
            jH: function(a) {
                this.dispatchEvent(a)
            },
            hv: function(a) {
                b.H.ba.log("Level::activateSpyVision");
                this.Ed.hv(a)
            },
            bx: function() {
                this.Ed.bx()
            },
            xv: function() {
                this.Ed.xv()
            },
            Kw: function(a) {
                b.H.ba.log("onShuffleAvailable()");
                this.dispatchEvent(a)
            },
            Ow: function(a) {
                this.dispatchEvent(a)
            },
            Mw: function(a) {
                this.dispatchEvent(a)
            },
            Qw: function(a) {
                this.dispatchEvent(a)
            },
            Lw: function(a) {
                this.dispatchEvent(a)
            },
            Pw: function(a) {
                this.dispatchEvent(a)
            },
            MG: function() {
                this.ov()
            },
            Hw: function(a) {
                this.dispatchEvent(a)
            },
            cF: function() {
                return this.Ed.Id()
            },
            YO: function() {
                return this.Ed.im
            },
            update: function() {
                b.w.prototype.update.call(this)
            },
            LJ: function() {
                b.k.SoundManager.Sp("music_level_" + f.xa.U().$e);
                switch (f.xa.U().$e) {
                    case 1:
                        b.k.SoundManager.Yp(b.k.SoundManager.Xc("amb_school_1", !0, !0));
                        break;
                    case 2:
                        b.k.SoundManager.Yp(b.k.SoundManager.Xc("crowd_1", !0, !0));
                        break;
                    case 3:
                        b.k.SoundManager.Yp(b.k.SoundManager.Xc("amb_airport_1", !0, !0));
                        break;
                    case 4:
                        b.k.SoundManager.Yp(b.k.SoundManager.Xc("amb_benimama_1", !0, !0));
                        break;
                    case 5:
                        b.k.SoundManager.Yp(b.k.SoundManager.Xc("amb_benimama_1", !0, !0))
                }
            },
            r: f.Ul
        });
        f.Vl = function(a) {
            this.Qy = !1;
            this.Fo = this.iq = 0;
            this.$C = 2;
            this.kf = this.Af = null;
            this.Af = a;
            b.ca.call(this)
        };
        f.Vl.q = !0;
        f.Vl.N = b.ca;
        f.Vl.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                this.iq = Math.max(0, 500 - this.Af.xu * this.$C) + this.Af.Fm;
                var a = f.$.eg(this),
                    c = b.s.instance.Pa("ui");
                f.$.Wb(this, a, 0, 0, "overlay", "ui");
                f.$.Wb(this, a, 0.0026666666666666666, 0.086, "popUpBox", "ui");
                var d = f.$.Wb(this, a, 0.0026666666666666666, -0.722, "screenHeader", c.getName()),
                    e = this.O();
                e.setPosition(0, -3);
                var g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("LEVEL_COMPLETE_HEADER"));
                g.ob("38px");
                g.Xa("great_escapeblack");
                d.ha(e);
                d = f.$.Pj(this, a, 0, -0.4);
                d = new b.j.Ba(d, c);
                d.Fa(b.ma.wa("LEVEL_COMPLETE_TIME_LABEL"));
                d.ob("22px");
                d.Xa("great_escape_rgbold");
                d = f.$.Pj(this, a, 0, -0.24);
                d = new b.j.Ba(d, c);
                d.Fa(b.H.am.Fz(this.Af.xu));
                d.ob("56px");
                d.Xa("great_escape_rgbold");
                d = f.$.Pj(this, a, 0, -0.032);
                d = new b.j.Ba(d, c);
                d.Fa(b.ma.wa("LEVEL_COMPLETE_TOTAL_LABEL"));
                d.ob("22px");
                d.Xa("great_escape_rgbold");
                d = f.$.Pj(this, a, 0, 0.128);
                this.Oh = new b.j.Ba(d, c);
                this.Oh.Fa("0");
                this.Oh.ob("56px");
                this.Oh.Xa("great_escape_rgbold");
                d = f.$.Wb(this, a, -1, 1, "levelCompleteKC", "ui", !1).fb(b.j.GameImage);
                d.Kf(0, -d.Mb().y);
                c = f.$.vd(a, -0.017333333333333333, 0.718, "playButton", "playButton", r(this, this.UG), c, "ui_click_1", "", !1);
                b.la.mh() && c.fb(b.j.GameImage).Lc(-1, 1);
                b.k.SoundManager.Xc("level_win_1");
                f.xa.U().oJ(this.iq);
                f.xa.U().kJ(f.xa.U().$e + 1);
                this.Hk = new b.j.sa.wk(a.u);
                this.Hk.jp(0, 1, 0.35)
            },
            update: function() {
                b.ca.prototype.update.call(this);
                this.Fo += this.iq / 2 * b.s.Id();
                this.Fo >= this.iq ? (this.Fo = this.iq, this.Qy || (b.k.SoundManager.Xc("ui_score_2"), this.Qy = !0)) : b.k.SoundManager.Xc("ui_score_1");
                this.Oh.Fa(u.Ah(this.Fo | 0))
            },
            UG: function() {
                b.k.SoundManager.Xc("ui_select_1");
                f.xa.U().$e >= f.xa.U().Ov() ? f.Bd.Uh(this, new f.ho) : (f.xa.U().GB(f.xa.U().$e + 1), f.Bd.Uh(this, new f.Gh))
            },
            ft: function() {
                b.H.ba.log("onLevelLoadComplete()");
                this.W();
                var a = new f.vk(this.kf);
                b.s.instance.Hd(a)
            },
            r: f.Vl
        });
        f.Wl =
            function(a) {
                b.L.La.call(this, a)
            };
        f.Wl.q = !0;
        f.Wl.N = b.L.La;
        f.Wl.prototype = s(b.L.La.prototype, {
            r: f.Wl
        });
        f.no = function() {
            this.kf = null;
            b.ca.call(this)
        };
        f.no.q = !0;
        f.no.N = b.ca;
        f.no.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = f.$.eg(this),
                    c = b.s.instance.Pa("ui");
                f.$.Wb(this, a, 0, 0, "overlay", "ui");
                f.$.Wb(this, a, 0, 0, "popUpBox", "ui");
                var d = f.$.Wb(this, a, 0.0026666666666666666, -0.736, "screenHeader", c.getName()),
                    e = this.O();
                e.setPosition(0, -4);
                var g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("LEVEL_FAIL_HEADER"));
                g.ob("38px");
                g.Xa("great_escapeblack");
                d.ha(e);
                d = f.$.Pj(this, a, 0, 0);
                d = new b.j.Ba(d, c);
                d.Fa(b.ma.wa("LEVEL_FAIL_BODY"));
                d.ob("24px");
                d.Xa("Arial");
                f.$.vd(a, 0, 0.55, "resumeBtn", "resumeBtn", r(this, this.Ew), c, "ui_click_1", "", !1);
                b.k.SoundManager.Xc("level_retry_1")
            },
            Ew: function() {
                b.k.SoundManager.Xc("ui_select_1");
                var a = b.k.Ga.fc("level" + f.xa.U().$e + "Load");
                this.kf = new f.yk;
                b.s.instance.Ax(this, this.kf);
                a.load(r(this, this.ft))
            },
            ft: function() {
                this.W();
                b.H.ba.log("onLevelLoadComplete()");
                var a = new f.vk(this.kf);
                b.s.instance.Hd(a)
            },
            r: f.no
        });
        f.Gh = function() {
            this.kf = null;
            b.ca.call(this)
        };
        f.Gh.q = !0;
        f.Gh.N = b.ca;
        f.Gh.prototype = s(b.ca.prototype, {
            J: function() {
                var a = this;
                b.ca.prototype.J.call(this);
                var c = f.$.eg(this),
                    d = b.s.instance.Pa("ui");
                b.k.SoundManager.Sp("music_love2beat_1");
                f.$.Wb(this, c, 0, 0, "levelSelectBg", "default");
                var e = f.$.Wb(this, c, 0.0026666666666666666, -0.736, "screenHeader", d.getName()),
                    g = this.O();
                g.setPosition(0, -4);
                var h = new b.j.Ba(g, d);
                h.Fa(b.ma.wa("LEVEL_SELECT_SCREEN_HEADING"));
                h.ob("38px");
                h.Xa("great_escapeblack");
                e.ha(g);
                e = u.gb(b.la.Qa("numLevelsAvailable"));
                for (g = 0; 5 > g;) {
                    h = g++;
                    this.O();
                    var l = f.xa.U().Pv() <= h || h >= e,
                        m;
                    m = !0 == l ? "levelSelectButtonLocked" : "levelSelectButton";
                    var n = f.Gh.LC[h];
                    m = f.$.vd(c, n.x, n.y, m, m, null, d, "ui_click_1", "", !1);
                    f.xa.U().Pv() == h + 1 && h + 1 <= e && (n = this.O(), n.setPosition(0, -32, 0), (new b.j.GameImage(n, "levelSelectButtonHighlight", b.s.instance.Pa("defaultFront"))).ec(), m.ha(n), (new b.j.Tf(n)).sn(new b.Vector3D(0, 0, 1)));
                    if (!l) {
                        n = this.O();
                        n.setPosition(-2, -32);
                        var q = new b.j.Ba(n, d);
                        q.Fa(u.Ah(h +
                            1));
                        q.ob("36px");
                        q.Xa("great_escapeblack");
                        m.ha(n)
                    }
                    n = this.O();
                    n.setPosition(0, 35, 0);
                    q = new b.j.Ba(n, d);
                    h + 1 > e ? q.Fa(b.ma.wa("LEVEL_COMING_SOON")) : q.Fa(b.ma.wa("LEVEL_" + u.Ah(h + 1)));
                    q.ob("14px");
                    q.Xa("great_escape_rgbold");
                    q.We(150);
                    q.eJ(3);
                    m.ha(n);
                    n = [m.fb(b.j.Hc)];
                    n[0].setData(h + 1);
                    l || m.fb(b.j.buttons.ef).lJ(function(b) {
                        return function() {
                            a.TG(b[0])
                        }
                    }(n))
                }
                f.$.vd(c, -0.8653333333333333, -0.718, "homeButton", "homeButton", r(this, this.Rw), d, "ui_click_1")
            },
            MQ: function() {
                p.hc().location.href = b.la.Qa("homeUrl")
            },
            TG: function(a) {
                a = a.getData();
                this.KJ(a)
            },
            KJ: function(a) {
                b.H.ba.log("startLevel()");
                var c = b.k.Ga.fc("gameplayLoad");
                f.xa.U().GB(a);
                this.kf = new f.yk;
                f.Bd.Uh(this, this.kf);
                var d = "level" + f.xa.U().$e + "Load";
                c.QD(b.k.Ga.fc(d));
                c.load(r(this, this.ft));
                f.vf.U().Cx("Level " + a + " Started")
            },
            ft: function() {
                b.H.ba.log("onLevelLoadComplete()");
                b.s.instance.ij(this);
                var a = new f.vk(this.kf);
                b.s.instance.Hd(a)
            },
            Rw: function() {
                f.Bd.Uh(this, new f.Di)
            },
            r: f.Gh
        });
        f.yk = function() {
            b.ca.call(this)
        };
        f.yk.q = !0;
        f.yk.N = b.ca;
        f.yk.prototype =
            s(b.ca.prototype, {
                J: function() {
                    b.ca.prototype.J.call(this);
                    var a = f.$.eg(this),
                        c = b.s.instance.Pa("loading"),
                        d = this.O(),
                        d = new b.j.Ba(d, c);
                    d.Xa("great_escapeblack");
                    d.Fa("abc123");
                    d.sl("#000000");
                    d = this.O();
                    d = new b.j.Ba(d, c);
                    d.Xa("great_escape_rgbold");
                    d.Fa("abc123");
                    d.sl("#000000");
                    this.sd = this.O();
                    (new b.ta.$d(this.sd, a)).zh(new b.I(0, 0));
                    (new b.j.GameImage(this.sd, "loadingBG", c)).ec();
                    this.Mr = this.O();
                    (new b.ta.$d(this.Mr, a)).zh(new b.I(-0.344, 0.532));
                    new b.j.GameImage(this.Mr, "loadingBar", c)
                },
                HG: function(a,
                    b) {
                    null != this.Mr && this.aK(a / b)
                },
                aK: function(a) {
                    this.Mr.fb(b.ta.$d).Lc(Math.min(1, a))
                },
                Ke: function(a, c) {
                    b.ca.prototype.Ke.call(this, a, c);
                    switch (a) {
                        case "onFileLoaded":
                            this.HG(c.progress, c.total)
                    }
                },
                r: f.yk
            });
        f.oo = function() {
            b.ca.call(this)
        };
        f.oo.q = !0;
        f.oo.N = b.ca;
        f.oo.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = f.$.eg(this),
                    c = b.s.instance.Pa("ui");
                f.$.Wb(this, a, 0, -0.156, "popUpBox", "ui").fb(b.ta.$d).Lc(0.9, 0.9);
                var d = this.O();
                d.setPosition(375, 135);
                d = new b.j.Ba(d, b.s.instance.Pa("ui"));
                d.Fa(b.ma.wa("NEW_ITEMS_HEADER"));
                d.ob("28px");
                d.Xa("great_escapeblack");
                d.We(450);
                d = this.O();
                d.setPosition(375, 178);
                d = new b.j.Ba(d, b.s.instance.Pa("ui"));
                d.Fa(b.ma.wa("NEW_ITEMS_BODY"));
                d.ob("17px");
                d.Xa("great_escape_rgbold");
                d.We(400);
                f.$.vd(a, 0.4786666666666667, 0.334, "tutorialNextBtn", "tutorialNextBtn", r(this, this.cH), c, "ui_click_1").OE().KB(!0)
            },
            cH: function() {
                b.s.instance.ij(this)
            },
            r: f.oo
        });
        f.zk = function(a) {
            b.ca.call(this);
            this.Nh = a
        };
        f.zk.q = !0;
        f.zk.N = b.ca;
        f.zk.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = f.$.eg(this),
                    c = b.s.instance.Pa("ui");
                f.$.Wb(this, a, 0, 0, "overlay", "ui");
                f.$.Wb(this, a, 0.0026666666666666666, 0.048, "popUpBox", "ui");
                var d = f.$.Wb(this, a, 0.0026666666666666666, -0.724, "screenHeader", c.getName()),
                    e = this.O();
                e.setPosition(0, -4);
                var g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("PAUSE_SCREEN_HEADER"));
                g.ob("38px");
                g.Xa("great_escapeblack");
                d.ha(e);
                d = f.$.vd(a, -0.3506666666666667, -0.194, "resumeBtn", "resumeBtn", r(this, this.lH), c, "ui_click_1");
                b.la.mh() && d.fb(b.j.GameImage).Lc(-1, 1);
                f.$.vd(a, -0.11333333333333333, -0.194, "menuHelpBtn", "menuHelpBtn", r(this, this.IG), c, "ui_click_1");
                f.$.vd(a, 0.124, -0.194, "menuQuitBtn", "menuQuitBtn", r(this, this.hH), c, "ui_click_1");
                this.Ry = f.$.vd(a, 0.35333333333333333, -0.194, "menuSoundBtnOn", "menuSoundBtnOn", r(this, this.qH), c, "ui_click_1", "", !1);
                d = this.Nh;
                if (0 < d.Pc.Ed.im.length) {
                    var h = f.$.Pj(this, a, 0, 0.152),
                        e = this.O();
                    h.ha(e);
                    e = new b.j.Ba(e, c);
                    e.Xa("great_escape_rgbold");
                    e.ob("28px");
                    e.Fa(b.ma.wa("PAUSE_SCREEN_BONUS_LABEL"));
                    d = d.Pc.Ed.im;
                    e = d.length;
                    g = this.O();
                    g.setPosition(-50 *
                        (e - 1) / 2, 50);
                    h.ha(g);
                    for (h = 0; h < e;) {
                        var l = h++,
                            m = d[l],
                            n = this.O();
                        n.setPosition(50 * l);
                        g.ha(n);
                        (new b.j.GameImage(n, m.ds, c)).ec()
                    }
                }
                this.xt();
                this.Hk = new b.j.sa.wk(a.u);
                this.Hk.jp(0, 1, 0.2)
            },
            lH: function() {
                var a = this;
                this.Nh.resume();
                this.Hk.jp(1, 0, 0.2, function() {
                    return function() {
                        b.s.instance.ij(a)
                    }
                }(this))
            },
            IG: function() {
                f.xa.U().su || (b.s.instance.ij(this), b.s.instance.Hd(new f.Ql(this.Nh)))
            },
            hH: function() {
                b.s.instance.ij(this);
                b.s.instance.Hd(new f.bo(this.Nh))
            },
            qH: function() {
                b.k.SoundManager.QB(!b.k.SoundManager.Vk());
                b.k.SoundManager.VB(!b.k.SoundManager.Rv());
                this.xt()
            },
            xt: function() {
                var a = this.Ry.fb(b.j.buttons.pj);
                a.HB(b.k.SoundManager.Vk() ? "menuSoundBtnOff" : "menuSoundBtnOn");
                a.PB(b.k.SoundManager.Vk() ? "menuSoundBtnOff" : "menuSoundBtnOn")
            },
            r: f.zk
        });
        f.Tq = function() {
            this.Fm = this.xu = 0
        };
        f.Tq.q = !0;
        f.Tq.prototype = {
            cq: function(a) {
                this.Fm = a;
                b.H.ba.log("NEW SCORE: " + a)
            },
            dJ: z("xu"),
            r: f.Tq
        };
        f.uo = function(a) {
            b.ca.call(this);
            this.Nh = a
        };
        f.uo.q = !0;
        f.uo.N = b.ca;
        f.uo.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = f.$.eg(this),
                    c = b.s.instance.Pa("ui");
                f.$.Wb(this, a, 0, 0, "overlay", "ui");
                var d = f.$.Wb(this, a, 0, 0, "popUpBox", "ui"),
                    e = this.O();
                e.setPosition(0, -70);
                var g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("TITLE_SCREEN_RESET_CONFIRM"));
                g.ob("24px");
                g.Xa("great_escape_rgbold");
                g.We(450);
                d.ha(e);
                d = f.$.Wb(this, a, 0.0026666666666666666, -0.736, "screenHeader", c.getName());
                e = this.O();
                e.setPosition(0, -4);
                g = new b.j.Ba(e, c);
                g.Fa(b.ma.wa("TITLE_SCREEN_NEW_GAME_HEADER"));
                g.ob("38px");
                g.Xa("great_escapeblack");
                d.ha(e);
                f.$.vd(a, -0.14666666666666667,
                    0.3, "checkBtn", "checkBtn", r(this, this.Sw), c, "ui_click_1", "", !1);
                f.$.vd(a, 0.144, 0.3, "menuQuitBtn", "menuQuitBtn", r(this, this.Fw), c, "ui_click_1", "", !1);
                this.Hk = new b.j.sa.wk(a.u);
                this.Hk.jp(0, 1, 0.2)
            },
            Sw: function() {
                f.xa.U().xg.gE();
                f.xa.U().IB(!1);
                this.CA()
            },
            Fw: function() {
                this.CA()
            },
            CA: function() {
                var a = this;
                this.Hk.jp(1, 0, 0.2, function() {
                    return function() {
                        a.W()
                    }
                }(this))
            },
            r: f.uo
        });
        f.$l = function() {
            this.hh = 0;
            this.Dj = this.Vo = null;
            b.ca.call(this)
        };
        f.$l.q = !0;
        f.$l.N = b.ca;
        f.$l.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                this.bd = f.$.eg(this);
                var a = b.s.instance.Pa("ui");
                f.$.Wb(this, this.bd, 0, 0, "storyBg", "ui");
                f.$.Wb(this, this.bd, -0.744, -0.708, "showLogo", "ui");
                f.$.Wb(this, this.bd, -0.29333333333333333, -0.688, "gameLogoSmall", "ui");
                this.lc = f.$.Wb(this, this.bd, 0.44, -0.172, "storyPageImage1", "ui").fb(b.j.GameImage);
                var c;
                c = b.la.mh() ? -100 : -340;
                c = f.$.Pj(this, this.bd, c / 375, -0.32);
                this.Ij = new b.j.Ba(c, a);
                this.Ij.Fa(b.ma.wa("STORY_SCREEN_PAGE_" + (this.hh + 1)));
                this.Ij.We(250);
                this.Ij.ob("18px");
                this.Ij.kk(b.la.mh() ? "right" : "left");
                this.Ij.Xa("great_escape_rgbold");
                this.Fx();
                c = f.$.vd(this.bd, -0.010666666666666666, 0.684, "playButton", "playButton", r(this, this.wH), a, "ui_click_1", "", !1);
                b.la.mh() && c.fb(b.j.GameImage).Lc(-1, 1);
                a = f.$.vd(this.bd, 0.8826666666666667, -0.792, "storySkipBtn", "storySkipBtn", r(this, this.yH), a, "ui_click_1");
                b.la.mh() && a.fb(b.j.GameImage).Lc(-1, 1)
            },
            Fx: function() {
                switch (this.hh) {
                    case 0:
                        this.lc.ot("storyPageImage" + (this.hh + 1));
                        this.lc.ec();
                        this.Ij.Fa(b.ma.wa("STORY_SCREEN_PAGE_" + (this.hh + 1)));
                        break;
                    case 1:
                        this.lc.ot("storyPageImage" +
                            (this.hh + 1));
                        this.lc.ec();
                        this.lc.u.fb(b.ta.$d).zh(new b.I(0.5306666666666666, 0.096));
                        this.Ij.Fa(b.ma.wa("STORY_SCREEN_PAGE_" + (this.hh + 1)));
                        break;
                    case 2:
                        this.Ij.Fa(b.ma.wa("STORY_SCREEN_PAGE_" + (this.hh + 1)))
                }
            },
            yH: function() {
                this.Pp()
            },
            PQ: function() {
                this.hh--;
                0 > this.hh ? this.Rw() : this.Fx()
            },
            Rw: function() {
                f.Bd.Uh(this, new f.Di)
            },
            wH: function() {
                this.hh++;
                2 <= this.hh ? this.Pp() : this.Fx()
            },
            Pp: function() {
                f.Bd.Uh(this, new f.Gh)
            },
            r: f.$l
        });
        f.Di = function(a) {
            null == a && (a = !1);
            this.wr = !1;
            this.dz = null;
            this.qy = !1;
            b.ca.call(this);
            this.qy = a
        };
        f.Di.q = !0;
        f.Di.N = b.ca;
        f.Di.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                this.qy ? this.Pp() : this.$D();
                if (null == f.zc.Ci.U()) {
                    var a = new f.zc.Ci;
                    b.s.instance.Hd(a)
                }
                b.k.SoundManager.Sp("music_love2beat_1")
            },
            SQ: function(a) {
                b.H.ba.log(a.value)
            },
            $D: function() {
                var a = f.$.eg(this),
                    c = b.s.instance.Pa("ui");
                f.$.Wb(this, a, 0, 0, "titleScreenBg", "ui");
                f.$.Wb(this, a, -0.7626666666666667, -0.748, "showLogo", "ui");
                f.$.Wb(this, a, 0.5306666666666666, -0.202, "gameLogo", "ui");
                var d = f.$.Wb(this,
                    a, -1, 1, "titleScreenCharacters", "ui").fb(b.j.GameImage);
                d.Kf(0, -d.Mb().y);
                d = f.$.vd(a, 0.7786666666666666, 0.68, "playButton", "playButton", r(this, this.fH), c, "ui_click_1", "", !1);
                b.la.mh() && d.fb(b.j.GameImage).Lc(-1, 1);
                f.xa.U().Kv() && (this.ZC = f.$.vd(a, 0.49866666666666665, 0.764, "resetButton", "resetButton", r(this, this.aH), c, "ui_click_1", "", !1))
            },
            fH: function() {
                this.wr || (f.vf.U().Cx("Game Start"), f.xa.U().Kv() ? this.Pp() : (this.xH(), f.xa.U().IB(!0)), b.k.SoundManager.QH())
            },
            xH: function() {
                f.Bd.Uh(this, new f.$l)
            },
            Pp: function() {
                f.Bd.Uh(this, new f.Gh)
            },
            aH: function() {
                var a = this;
                if (!this.wr) {
                    this.wr = !0;
                    var c = new f.uo(this);
                    b.s.instance.Hd(c);
                    c.addEventListener("destroy", function() {
                        return function() {
                            a.wr = !1;
                            f.xa.U().Kv() || a.ZC.qi(!1)
                        }
                    }(this))
                }
            },
            r: f.Di
        });
        f.pe = function(a) {
            b.w.call(this, a, "TutorialPrompt")
        };
        f.pe.q = !0;
        f.pe.N = b.w;
        f.pe.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.Ji = this.pa().O();
                this.Ji.setPosition(p.qd / 2, p.gd / 2);
                this.Bm = this.pa().O();
                this.Bm.setPosition(0, -50);
                (new b.j.GameImage(this.Bm,
                    "popUpBox", b.s.instance.Pa("ui"))).ec();
                this.Bm.Lc(0.9, 0.9);
                this.Ji.ha(this.Bm);
                this.Vo = this.pa().O();
                this.Vo.setPosition(193, -180);
                var a = new b.j.GameImage(this.Vo, "tutorialCloseBtn", b.s.instance.Pa("ui"));
                a.ec();
                b.j.Hc.qs(a).rt(r(this, this.pH));
                this.Ji.ha(this.Vo);
                this.Dj = this.pa().O();
                this.Dj.setPosition(180, 70);
                a = new b.j.GameImage(this.Dj, "tutorialNextBtn", b.s.instance.Pa("ui"));
                a.ec();
                b.la.mh() && a.Lc(-1, 1);
                b.j.Hc.qs(a).rt(r(this, this.bH));
                this.Ji.ha(this.Dj)
            },
            bH: function() {
                null != this.Cu && (this.Cu(),
                    this.Cu = null);
                b.k.SoundManager.Xc("ui_click_1");
                this.u.W()
            },
            pH: function() {
                this.dI();
                this.Wu && (this.Wu(), this.Wu = null);
                b.k.SoundManager.Xc("ui_click_1");
                this.u.W()
            },
            bq: function(a, b, c, e) {
                null == e && (e = 1);
                null == c && (c = 1);
                this.Bm.setPosition(a, b);
                this.Bm.Lc(c, e)
            },
            Th: function(a, c, d) {
                var e = this.pa().O();
                e.setPosition(c, d);
                c = new b.j.Ba(e, b.s.instance.Pa("ui"));
                c.Fa(a);
                c.ob("28px");
                c.Xa("great_escapeblack");
                c.We(450);
                this.Ji.ha(e)
            },
            Sh: function(a, c, d, e) {
                null == e && (e = 450);
                var g = this.pa().O();
                g.setPosition(c, d);
                c = new b.j.Ba(g, b.s.instance.Pa("ui"));
                c.Fa(a);
                c.ob("17px");
                c.Xa("great_escape_rgbold");
                c.We(e);
                this.Ji.ha(g)
            },
            sv: function(a, c, d, e, g) {
                null == g && (g = !1);
                null != this.Ih && this.Ih.W();
                this.Ih = this.pa().O();
                this.Ih.setPosition(a, c);
                (new b.j.GameImage(this.Ih, "tutorialArrow", b.s.instance.Pa("ui"), e)).ec();
                g && new b.j.eh(this.Ih, this.Ih.qa, "y", c, 3, 5);
                null != d && d.ha(this.Ih)
            },
            ul: z("Cu"),
            vl: z("Wu"),
            dq: function(a, b) {
                this.Vo.setPosition(193 + a, -180 + b)
            },
            aq: function(a, b) {
                this.Dj.setPosition(180 + a, 70 + b)
            },
            lE: function() {
                null !=
                    this.Dj && (this.Dj.W(), this.Dj = null)
            },
            W: function() {
                b.w.prototype.W.call(this);
                null != this.Ih && (this.Ih.W(), this.Ih = null);
                null != this.Ji && (this.Ji.W(), this.Ji = null)
            },
            r: f.pe
        });
        f.$ = v();
        f.$.q = !0;
        f.$.eg = function(a) {
            var c = b.s.instance.te(),
                d = c.Ua();
            c.x *= b.s.instance.wb().x;
            c.y *= b.s.instance.wb().y;
            a = a.O();
            c = new b.ta.xo(a, c);
            a.setPosition(d.x / 2, d.y / 2);
            return c
        };
        f.$.bE = function(a, c, d, e, g, f, l, m, n, q, p) {
            var r = b.sj.HA(a.pa());
            (new b.ta.$d(r, a)).zh(new b.I(c, d));
            a = new b.j.GameImage(r, e, p);
            b.j.Hc.qs(a);
            new b.j.buttons.Jl(r,
                0.35, 1, 0.15, m);
            new b.j.buttons.tk(r, 1.15, 0.35, b.j.sa.Ra.Sm, b.j.sa.Ra.Sm);
            new b.j.buttons.ef(r, f, l, void 0);
            new b.j.buttons.pj(r, e, g);
            new b.j.buttons.Kl(r, n, q);
            return r
        };
        f.$.vd = function(a, b, c, e, g, h, l, m, n, q) {
            var p;
            null == p && (p = 0.35);
            null == q && (q = !0);
            null == n && (n = "");
            null == m && (m = "");
            return f.$.bE(a, b, c, e, g, h, p, q, m, n, l)
        };
        f.$.cE = function(a, c, d, e, g, f, l, m, n, q, p) {
            a = b.sj.HA(a);
            a.setPosition(c, d);
            c = new b.j.GameImage(a, e, p);
            b.j.Hc.qs(c);
            new b.j.buttons.Jl(a, 0.35, 1, 0.15, m);
            new b.j.buttons.tk(a, 1.15, 0.35, b.j.sa.Ra.Sm,
                b.j.sa.Ra.Sm);
            new b.j.buttons.ef(a, f, l, void 0);
            new b.j.buttons.pj(a, e, g);
            new b.j.buttons.Kl(a, n, q);
            return a
        };
        f.$.Hz = function(a, b, c, e, g, h, l, m, n) {
            var q, p = "ui_click_1";
            null == q && (q = 0.35);
            null == n && (n = !0);
            null == m && (m = "");
            null == p && (p = "");
            return f.$.cE(a, b, c, e, g, h, q, n, p, m, l)
        };
        f.$.KN = function(a, c, d, e, g, h, l, m, n, q) {
            null == q && (q = !0);
            null == n && (n = "");
            null == m && (m = "");
            var p = g.pa();
            a = f.$.vd(g, a, c, e, e, l, h, m, n, q);
            p = p.O();
            p.setPosition(0, -5);
            h = new b.j.Ba(p, h);
            h.Fa(b.ma.wa(d));
            h.Xa("Arial");
            h.sl("#000000");
            h.ob("24px");
            a.ha(p);
            return a.fb(b.ta.$d)
        };
        f.$.Pj = function(a, c, d, e) {
            a = a.O();
            (new b.ta.$d(a, c)).zh(new b.I(d, e));
            return a
        };
        f.$.Wb = function(a, c, d, e, g, h, l) {
            null == l && (l = !0);
            null == h && (h = "default");
            a = f.$.Pj(a, c, d, e);
            g = new b.j.GameImage(a, g, b.s.instance.Pa(h));
            l && g.ec();
            return a
        };
        f.$.prototype = {
            r: f.$
        };
        f.Km = {};
        f.Km.Xn = function() {
            b.ca.call(this)
        };
        f.Km.Xn.q = !0;
        f.Km.Xn.N = b.ca;
        f.Km.Xn.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                this.td = b.s.instance;
                var a = new b.k.Sf;
                this.td.Lj(a);
                a = new b.k.rd;
                this.td.Lj(a);
                var c = new b.k.le;
                this.td.Lj(c);
                c = new b.k.gf;
                this.td.Lj(c);
                c = new b.k.xj;
                this.td.Lj(c);
                c = new b.Tb.Hh;
                this.td.Lj(c);
                a.Oz();
                this.PF();
                null != b.s.instance.Pa("debug") && this.td.Lj(new b.Cg.co(b.s.instance.Pa("debug")));
                this.NE()
            },
            NE: function() {
                var a = new b.LoadBatch;
                a.$f("assetList", "asset_list.xml", b.AssetType.Other);
                a.$f("strings", "./media/strings/strings.xml", b.AssetType.Other);
                a.$f("gameConfig", "game_config.xml", b.AssetType.Other);
                a.$f("gameCss", "./css/game.css", b.AssetType.Other);
                a.$f("styleCss", "./css/style.css",
                    b.AssetType.Other);
                a.$f("speechMap", "./media/xml/speech_map.xml", b.AssetType.Other);
                a.$f("ipadLandscapeHtml", "./media/html/ipad_landscape.html", b.AssetType.Other);
                a.$f("iphoneLandscapeHtml", "./media/html/iphone_landscape.html", b.AssetType.Other);
                a.load(r(this, this.zG))
            },
            zG: function() {
                b.la.NH(b.k.Ga.fc("gameConfig"));
                b.ma.QF();
                b.Tb.Hh.U().setup();
                if (b.s.dd() || "NONE" != b.la.Qa("forceOrientation")) {
                    var a = new b.Tm.po;
                    this.td.Hd(a);
                    b.s.instance.pl()
                }
                a = b.k.Ga.fc("assetList");
                for (a = w.parse(a).za("loadBatch"); a.wc();) {
                    for (var c =
                            new b.LoadBatch, d = a.next(), e = d.get("basePath"), g = d.za("asset"); g.wc();) {
                        var f = g.next();
                        c.$f(f.get("name"), e + f.get("path"), M.WD(b.AssetType, f.get("type")))
                    }
                    b.k.Ga.gk(d.get("name"), c)
                }
                b.k.Ga.fc("loadScreenBatchPreload").load(r(this, this.XG))
            },
            XG: function() {
                this.kf = new f.yk;
                this.td.Hd(this.kf);
                this.td.Gw();
                b.k.Ga.fc("loadBatchPreload").load(r(this, this.gH))
            },
            gH: function() {
                this.W();
                b.s.instance.Ax(this.kf, new f.Di)
            },
            PF: function() {
                this.td.ag(new b.$c("masterLayer", p.qd, p.gd, 0, !0));
                this.td.ag(new b.$c("levelBg",
                    p.qd, p.gd));
                this.td.ag(new b.$c("defaultBg", p.qd, p.gd));
                this.td.ag(new b.$c("default", p.qd, p.gd));
                this.td.ag(new b.$c("defaultFront", p.qd, p.gd));
                this.td.ag(new b.$c("ui", p.qd, p.gd));
                this.td.ag(new b.$c("uiFront", p.qd, p.gd));
                this.td.ag(new b.$c("loading", p.qd, p.gd));
                this.td.ag(new b.$c("subtitles", p.qd, p.gd));
                this.td.ag(new b.$c("transition", p.qd, p.gd));
                this.td.ag(new b.$c("orientation", p.qd, p.gd));
                this.td.ag(new b.$c("debug", p.qd, p.gd))
            },
            r: f.Km.Xn
        });
        f.C = {};
        f.C.lg = function(a, c, d) {
            this.ky = !1;
            b.w.call(this,
                a, "BonusObjectPrompt");
            this.Oa = c;
            this.T = d
        };
        f.C.lg.q = !0;
        f.C.lg.N = b.w;
        f.C.lg.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                b.H.ba.log("BonusObjectPrompt::init()");
                var a = this.pa().O();
                new b.j.GameImage(a, "sideObjectiveBg", this.T);
                this.u.ha(a);
                a = this.pa().O();
                a.setPosition(104, 28);
                var c = new b.j.Ba(a, this.T);
                c.Fa(b.ma.wa("SIDE_OBJECTIVE_" + this.Oa.lr.toUpperCase()));
                c.ob("18px");
                c.Xa("great_escape_rgbold");
                this.u.ha(a);
                this.Yt = this.pa().O();
                this.Yt.setPosition(103, 107);
                (new b.j.GameImage(this.Yt,
                    "sideObjective" + this.Oa.lr + "Icon", this.T)).ec();
                this.u.ha(this.Yt);
                this.cv = this.pa().O();
                this.cv.setPosition(104.5, 226);
                (new b.j.GameImage(this.cv, this.Oa.ds, this.T)).ec();
                this.u.ha(this.cv);
                this.bv = this.pa().O();
                this.bv.setPosition(103, 185);
                a = new b.j.Ba(this.bv, this.T);
                a.Fa(b.ma.wa("SIDE_OBJECTIVE_FIND_ITEM"));
                a.ob("12px");
                a.Xa("great_escape_rgbold");
                this.u.ha(this.bv);
                a = f.$.Hz(this.pa(), 226, 0, "sideObjectiveCloseButton", "sideObjectiveCloseButton", r(this, this.DG), this.T);
                this.u.ha(a);
                this.Ha = new b.j.Nd(this.u);
                this.Od = new b.j.Zg(this.u);
                this.BE();
                this.Od.Qh(4, r(this, this.HH))
            },
            HH: function() {
                this.Tz()
            },
            DG: function() {
                this.Tz()
            },
            BE: function() {
                this.Ha.Ta(this.u.qa, "x", -250, 0, 0.5, b.j.sa.Ra.ys);
                this.Ha.Ta(this.u.qa, "y", 85, 85, 0.5, b.j.sa.Ra.ys)
            },
            Tz: function() {
                this.ky || (this.Ha.Ta(this.u.qa, "x", 0, -250, 0.5, b.j.sa.Ra.ys), this.Ha.Ta(this.u.qa, "y", 85, 85, 0.5, b.j.sa.Ra.ys, 0, r(this, this.GG)), this.ky = !0)
            },
            GG: function() {
                this.u.W()
            },
            update: function() {
                b.w.prototype.update.call(this)
            },
            r: f.C.lg
        });
        f.C.Ll = function(a, b) {
            this.JC =
                a;
            this.IC = b;
            this.Oa = []
        };
        f.C.Ll.q = !0;
        f.C.Ll.Jv = function(a) {
            var c = a.get("backgroundName"),
                d = a.get("backgroundBaseName");
            a.get("offsetX");
            a.get("offsetY");
            c = new f.C.Ll(c, d);
            for (a = a.za("hiddenObject"); a.wc();) d = a.next(), d = f.C.Rl.Jv(d), c.lD(d);
            b.H.ba.log(c);
            return c
        };
        f.C.Ll.prototype = {
            lD: function(a) {
                this.Oa.push(a)
            },
            r: f.C.Ll
        };
        f.C.ko = function(a, c, d, e) {
            this.Jo = null;
            this.pm = !1;
            this.pu = !0;
            b.w.call(this, a, "HiddenObject");
            this.Oa = c;
            this.Z = d;
            this.T = e
        };
        f.C.ko.q = !0;
        f.C.ko.N = b.w;
        f.C.ko.prototype = s(b.w.prototype, {
            cJ: z("pm"),
            pO: C("pu"),
            hx: z("pu"),
            Lv: C("Oa"),
            J: function() {
                b.w.prototype.J.call(this);
                this.lc = new b.j.GameImage(this.u, this.Oa.op(), this.T, this.Z);
                this.u.setPosition(this.Oa.Q().x, this.Oa.Q().y);
                var a;
                a = b.s.dd() ? u.gb(b.la.Qa("minHiddenObjectMobileHitboxSizeX")) : u.gb(b.la.Qa("minHiddenObjectHitboxSizeX"));
                var c;
                c = b.s.dd() ? u.gb(b.la.Qa("minHiddenObjectMobileHitboxSizeY")) : u.gb(b.la.Qa("minHiddenObjectHitboxSizeY"));
                a = new b.I(Math.max(a, this.lc.Mb().x), Math.max(c, this.lc.Mb().y));
                this.Gi = new b.j.Hc(this.u,
                    new b.I(a.x, a.y), new b.I(this.lc.Mb().x / 2, this.lc.Mb().y / 2), null, this.Z);
                this.Gi.XB(!1);
                this.Gi.RB(r(this, this.CG))
            },
            CG: function() {
                this.pu && !this.pm && (this.u.dispatchEvent(new f.C.xk("discover", this.Oa)), this.dispatchEvent(new f.C.xk("discover", this.Oa)), this.ww())
            },
            ww: function() {
                if (null == this.Jo) {
                    this.Jo = this.pa().O();
                    this.Jo.setPosition(this.Gi.of().x + this.Oa.xm.x, this.Oa.xm.y, 0);
                    var a = new b.j.GameImage(this.Jo, "foundMarker", this.T, this.Z);
                    a.Kf(-a.Mb().x / 2, -50);
                    this.u.ha(this.Jo)
                }
            },
            r: f.C.ko
        });
        f.C.Rl =
            function(a, b, c, e, f, h, l, m) {
                this.lr = "";
                this.om = !1;
                this.ju = a;
                this.dz = b;
                this.eD = c;
                this.hd = e;
                this.ds = f;
                this.om = h;
                this.lr = l;
                this.Ze = m
            };
        f.C.Rl.q = !0;
        f.C.Rl.Jv = function(a) {
            var b = a.get("id"),
                c = a.get("imageName"),
                e = a.get("thumbnailName"),
                g = u.ab(a.get("x")),
                h = u.ab(a.get("y")),
                l = 1 == u.gb(a.get("isBonus")),
                m = a.get("bonusCharacter"),
                n = a.get("className"),
                q = 0;
            a.vc("markerOffsetX") && (q = u.ab(a.get("markerOffsetX")));
            var p = 0;
            a.vc("markerOffsetY") && (p = u.ab(a.get("markerOffsetY")));
            a = new f.C.Rl(b, g, h, c, e, l, m, n);
            a.gJ(q,
                p);
            return a
        };
        f.C.Rl.prototype = {
            gJ: function(a, c) {
                this.xm = new b.I(a, c)
            },
            RE: C("Ze"),
            QI: z("Ze"),
            dF: C("ju"),
            op: C("hd"),
            Q: function() {
                return new b.I(this.dz, this.eD)
            },
            r: f.C.Rl
        };
        f.C.ah = function(a, c) {
            this.au = -1;
            this.Do = 0;
            b.w.call(this, a, "HiddenObjectDock");
            this.T = c;
            this.be = [];
            this.Od = new b.j.Zg(this.u);
            this.addEventListener("showTutorial1", r(this, this.yJ))
        };
        f.C.ah.q = !0;
        f.C.ah.N = b.w;
        f.C.ah.prototype = s(b.w.prototype, {
            yJ: function() {
                var a = this,
                    c = this.pa().O(),
                    c = new f.pe(c);
                c.u.J();
                c.Th(b.ma.wa("TUTORIAL_HEADER_1"),
                    0, -140);
                c.Sh(b.ma.wa("TUTORIAL_BODY_1"), 0, -90);
                c.ul(r(this, this.rx));
                c.vl(function() {
                    a.dispatchEvent(new f.C.bc("tutorial1Destoryed"))
                });
                this.Od.Qh(0.5, r(this, this.lC), [c, 0]);
                c.u.addEventListener("destroy", r(this, this.Rp));
                f.xa.U().jk(!0)
            },
            lC: function(a) {
                var b = a[0];
                a = a[1];
                a >= this.be.length && (a = 0);
                b.sv(this.be[a].u.Q().x, this.be[a].u.Q().y - 50);
                this.Od.Qh(0.5, r(this, this.lC), [b, a + 1])
            },
            Rp: function() {
                this.Od.ts();
                f.xa.U().jk(!1)
            },
            rx: function() {
                this.Od.ts();
                this.dispatchEvent(new f.C.bc("showTutorial2"))
            },
            kD: function(a) {
                b.H.ba.log("HiddenObjectDock::addDockItem()");
                for (var c = this.be.length, d = c, e = 0; e < c;) {
                    var g = e++;
                    if (null == this.be[g]) {
                        d = g;
                        break
                    }
                }
                c = this.pa().O();
                a = new f.C.lo(c, a, this.T);
                this.u.ha(c);
                b.H.ba.log(d);
                c.setPosition(-150 + 75 * d, 0 + 0 * d);
                this.be[d] = a
            },
            eI: function(a) {
                b.H.ba.log("HiddenObjectDock::removeDockItem()");
                for (var c = -1, d = this.be.length, e = 0; e < d;) {
                    var f = e++,
                        h = this.be[f];
                    null != h && a == h.Oa && (c = f)
                } - 1 != c && (this.be[c].u.W(), this.be[c] = null)
            },
            LG: function(a) {
                for (var b = this.be.length, c = 0; c < b;) {
                    var e =
                        c++,
                        e = this.be[e];
                    a == e.Oa && e.ww()
                }
                null != this.Li && this.bu == a && (this.Li.W(), this.Li = null, this.dispatchEvent(new f.C.tj("removeSpyReticule")))
            },
            clear: function() {
                for (var a = this.be.length, b = 0; b < a;) {
                    var c = b++;
                    this.be[c].u.W()
                }
                this.be = []
            },
            Yw: function() {
                var a = this.be.length;
                if (0 != a)
                    if (1 == a) this.Jz(this.be[0]);
                    else {
                        for (var c = b.H.tc.Vp(a); this.au == c;) c = b.H.tc.Vp(a);
                        this.au = c;
                        for (c = this.be[c]; c.Ir;) this.au = c = b.H.tc.Vp(a), c = this.be[c];
                        a = c.u.Q();
                        null != this.Li && (this.Li.W(), this.Li = null);
                        this.Li = f.ke.ZD(this.pa(),
                            a.x, a.y);
                        b.k.SoundManager.Xc("ui_spy_1");
                        8 <= this.Do ? 6 >= this.Do - 8 ? this.Od.Qh(0.25, r(this, this.Yw)) : (this.Jz(c), this.Do = 0) : this.Od.Qh(0.1, r(this, this.Yw));
                        this.Do++
                    }
            },
            Jz: function(a) {
                b.H.ba.log("HiddenObjectDock::cyclyingThroughObjectsComplete");
                this.bu = a.Oa;
                this.dispatchEvent(new f.C.tj("cyclingComplete", this.bu))
            },
            ID: function() {
                null != this.Li && (this.Li.W(), this.Li = null);
                this.Do = 0;
                this.bu = null
            },
            r: f.C.ah
        });
        f.C.tj = function(a, c) {
            b.L.La.call(this, a);
            this.sy = c
        };
        f.C.tj.q = !0;
        f.C.tj.N = b.L.La;
        f.C.tj.prototype =
            s(b.L.La.prototype, {
                ZO: C("sy"),
                r: f.C.tj
            });
        f.C.lo = function(a, c, d) {
            this.Ir = !1;
            b.w.call(this, a, "HiddenObjectDefinition");
            this.Oa = c;
            this.T = d
        };
        f.C.lo.q = !0;
        f.C.lo.N = b.w;
        f.C.lo.prototype = s(b.w.prototype, {
            eP: C("Ir"),
            Lv: C("Oa"),
            J: function() {
                b.w.prototype.J.call(this);
                (new b.j.GameImage(this.u, "hudItemFrame", this.T)).ec();
                this.lc = new b.j.GameImage(this.u, this.Oa.ds, this.T);
                this.lc.ec()
            },
            ww: function() {
                if (!this.Ir) {
                    this.Ir = !0;
                    var a = this.pa().O();
                    a.setPosition(3, -5, 0);
                    (new b.j.GameImage(a, "foundHighlight", this.T)).ec();
                    this.u.ha(a)
                }
            },
            r: f.C.lo
        });
        f.C.xk = function(a, c) {
            b.L.La.call(this, a);
            this.Oa = c
        };
        f.C.xk.q = !0;
        f.C.xk.N = b.L.La;
        f.C.xk.prototype = s(b.L.La.prototype, {
            Lv: C("Oa"),
            r: f.C.xk
        });
        f.C.Mc = function(a, c, d) {
            this.ae = 0;
            this.Oo = !1;
            this.Go = this.lh = this.Kj = this.Aj = 0;
            this.pm = !1;
            b.w.call(this, a, "HiddenObjectGame");
            this.T = c;
            this.gu = d;
            this.Fd = [];
            this.mm = [];
            this.Ki = [];
            this.sg = [];
            this.im = [];
            this.Vx = [];
            this.KC = [];
            this.addEventListener("showTutorial2", r(this, this.oH));
            this.addEventListener("tutorial1Destoryed", r(this, this.Qp))
        };
        f.C.Mc.q = !0;
        f.C.Mc.JO = function() {
            return f.C.Mc.dD
        };
        f.C.Mc.N = b.w;
        f.C.Mc.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.Dk = this.pa().O();
                this.Z = f.ke.UD(this.pa());
                this.Z.eq(this.Dk);
                this.Ha = new b.j.Nd(this.u);
                this.TC = u.ab(b.la.Qa("cameraMinZoom" + (b.s.instance.$m() ? "Phone" : "")));
                this.Ay = u.ab(b.la.Qa("cameraMaxZoom" + (b.s.instance.$m() ? "Phone" : "")));
                this.ez = u.ab(b.la.Qa("cameraZoomDuration"));
                this.Z.YB(this.Ay);
                this.So = u.gb(b.la.Qa("gameNumObjectsToFind"));
                this.WC = u.gb(b.la.Qa("level" +
                    f.xa.U().$e + "NumRounds"));
                this.as = u.ab(b.la.Qa("spyVisionCooldownDuration"));
                this.Ny = u.ab(b.la.Qa("reshuffleItemsCooldown"));
                this.Fu = u.gb(b.la.Qa("gameNumObjectsToFindToUnlockBonus1"));
                this.Gu = u.gb(b.la.Qa("gameNumObjectsToFindToUnlockBonus2"));
                this.by = 1;
                this.VC = this.So;
                var a = "level" + f.xa.U().$e + "Composition";
                this.LE(w.parse(b.k.Ga.fc(a)));
                a = this.pa().O();
                a.setPosition(375, 300);
                this.cu = new b.j.Hc(a, new b.I(750, 475), null);
                this.cu.rt(r(this, this.FG));
                this.cu.RB(r(this, this.fB));
                this.cu.XB(!1);
                this.Kj =
                    0.05;
                this.lh = this.as;
                a = this.pa().O();
                a.setPosition(p.qd / 2, p.gd / 2);
                new b.j.Hc(a, new b.I(p.qd, p.gd), null, r(this, this.mH));
                b.k.gf.U().addEventListener("revealObjects", r(this, this.kB));
                this.zJ()
            },
            zJ: function() {
                for (var a = [], c = this.sg.length, d = 0; d < c;) {
                    var e = d++;
                    a.push(this.sg[e].Oa)
                }
                this.wy = new f.C.Zc(this.mm, a);
                b.s.instance.Hd(this.wy);
                this.pa().pause();
                this.wy.addEventListener("destroy", r(this, this.OG))
            },
            OG: function() {
                this.pa().resume();
                1 != f.xa.U().$e || f.xa.U().hA() || this.DJ()
            },
            DJ: function() {
                f.xa.U().jk(!0);
                this.dispatchEvent(new f.C.bc("showTutorial1"));
                this.Uk(!1)
            },
            Qp: function() {
                this.Uk(!0)
            },
            oH: function() {
                var a = this.pa().O();
                this.mc = new f.pe(a);
                this.mc.u.J();
                this.mc.Th(b.ma.wa("TUTORIAL_HEADER_2"), 0, -140);
                this.mc.Sh(b.ma.wa("TUTORIAL_BODY_2"), 0, -90, 300);
                this.mc.ul(r(this, this.sx));
                this.mc.vl(r(this, this.mC));
                this.Uk(!1);
                f.xa.U().jk(!0)
            },
            sx: function() {
                var a = this.pa().O();
                this.mc = new f.pe(a);
                this.mc.u.J();
                this.mc.Th(b.ma.wa("TUTORAIL_HEADER_3"), 0, -140);
                this.mc.Sh(b.ma.wa("TUTORIAL_BODY_3"), 0, -90, 350);
                this.mc.u.addEventListener("destroy", r(this, this.Rp));
                this.Uk(!1);
                f.xa.U().jk(!0)
            },
            tx: function() {
                var a = this.pa().O();
                this.mc = new f.pe(a);
                this.mc.u.J();
                this.mc.Th(b.ma.wa("TUTORIAL_HEADER_4"), 0, -140);
                this.mc.Sh(b.ma.wa("TUTORIAL_BODY_4"), 0, -90, 350);
                this.mc.sv(90, 400, null, null, !0);
                this.mc.lE();
                this.lh = 0.1;
                this.mc.u.addEventListener("destroy", r(this, this.Rp));
                this.Uk(!1);
                f.xa.U().jk(!0)
            },
            ux: function() {
                var a = this.pa().O();
                this.mc = new f.pe(a);
                this.mc.u.J();
                this.mc.Th(b.ma.wa("TUTORIAL_HEADER_5"), 0, -140);
                this.mc.Sh(b.ma.wa("TUTORIAL_BODY_5"), 0, -90, 330);
                this.mc.sv(660, 400, null, null, !0);
                this.mc.u.addEventListener("destroy", r(this, this.Rp));
                this.Uk(!1);
                f.xa.U().jk(!0);
                f.xa.U().$I(!0)
            },
            Rp: function() {
                this.mC()
            },
            mC: function() {
                this.Uk(!0);
                f.xa.U().jk(!1);
                this.mc = null
            },
            LE: function(a) {
                this.zj = f.C.Ll.Jv(a.HE());
                a = this.zj.JC;
                if ("" != a) this.sd = this.pa().O(), a = new b.j.GameImage(this.sd, a, this.T, this.Z), this.Z.FB(0, 0, a.Mb().x, a.Mb().y);
                else {
                    var c = this.zj.IC,
                        d = c + "BotLeft";
                    a = c + "BotRight";
                    var e = c + "TopLeft",
                        g = c + "TopRight",
                        h = c = 0;
                    this.sd = this.pa().O();
                    var l = this.pa().O();
                    l.setPosition(0, 0);
                    new b.j.GameImage(l, e, this.T, this.Z);
                    this.sd.ha(l);
                    e = this.pa().O();
                    e.setPosition(749, 0);
                    new b.j.GameImage(e, g, this.T, this.Z);
                    this.sd.ha(e);
                    c += 749;
                    e = this.pa().O();
                    e.setPosition(0, 499);
                    new b.j.GameImage(e, d, this.T, this.Z);
                    this.sd.ha(e);
                    h += 499;
                    d = this.pa().O();
                    d.setPosition(749, 499);
                    new b.j.GameImage(d, a, this.T, this.Z);
                    this.sd.ha(d);
                    this.Z.FB(0, 0, c + 749, h + 499)
                }
                this.JE();
                this.KE();
                this.Fv()
            },
            gz: function(a) {
                var b = this.pa().O(),
                    c = new f.C.ko(b,
                        a, this.Z, this.T);
                c.addEventListener("discover", r(this, this.Op));
                !a.om || -1 < y.indexOf(this.im, a, 0) ? (this.Fd.push(c), this.dispatchEvent(new f.C.uj("addHiddenObject", a))) : (this.sg.push(c), c.hx(!1));
                this.sd.ha(b)
            },
            bx: function() {
                for (var a = this.Fd.length; 0 <= --a;) {
                    var b = this.Fd[a]; - 1 == y.indexOf(this.Ki, b.Oa, 0) && (b.u.W(), y.remove(this.Fd, b), this.dispatchEvent(new f.C.uj("removeHiddenObject", b.Oa)))
                }
                this.Fd = [];
                this.mm = [];
                this.Fv();
                this.dispatchEvent(new f.C.bc("shuffleUnavailable"));
                this.Kj = this.Ny;
                0 >= this.lh &&
                    (this.lh = this.as);
                null != this.nf && (this.nf.u.W(), this.nf = null);
                null != this.mc && (this.mc.u.W(), this.mc = null);
                this.wB()
            },
            KE: function() {
                for (var a = this.zj.Oa.length, b = 0; b < a;) {
                    var c = b++,
                        c = this.zj.Oa[c];
                    c.om && this.gz(c)
                }
            },
            Fv: function() {
                for (var a = [], c = this.zj.Oa.length, d = 0; d < c;) {
                    var e = d++,
                        e = this.zj.Oa[e]; - 1 == y.indexOf(this.Ki, e, 0) && (e.om || a.push(e))
                }
                this.mm = [];
                c = 0;
                for (d = this.So - this.Ki.length; c < d;) c++, e = a[b.H.tc.Vp(a.length)], this.gz(e), y.remove(a, e);
                c = this.Fd.length;
                for (a = 0; a < c;) d = a++, -1 == b.H.Ug.indexOf(this.Ki,
                    this.Fd[d].Oa) && this.mm.push(this.Fd[d].Oa)
            },
            JE: function() {
                for (var a = this.zj.Oa.length, c = 0; c < a;) {
                    var d = c++,
                        d = this.zj.Oa[d],
                        e = this.pa().O();
                    e.setPosition(d.Q().x, d.Q().y);
                    new b.j.GameImage(e, d.op(), this.T, this.Z);
                    this.sd.ha(e)
                }
            },
            Op: function(a) {
                if (!(-1 < y.indexOf(this.Ki, a.Oa, 0) || -1 < y.indexOf(this.Vx, a.Oa, 0))) {
                    var c = a.Oa;
                    this.dispatchEvent(a);
                    b.k.SoundManager.Xc("ui_find_1");
                    var d = c.om; - 1 < y.indexOf(this.mm, c, 0) && (this.Ki.push(a.Oa), y.remove(this.mm, a.Oa), 0 < this.Fu && (this.Fu--, 0 >= this.Fu && this.nC()),
                        0 < this.Gu && (this.Gu--, 0 >= this.Gu && this.nC()));
                    d ? (this.Vx.push(a.Oa), y.remove(this.KC, a.Oa), f.ke.SD(this.pa(), c.Q().x + c.xm.x, c.Q().y + c.xm.y, this.Z, a.Oa)) : f.ke.aE(this.pa(), c.Q().x + c.xm.x, c.Q().y + c.xm.y, this.Z);
                    0 >= this.So - this.Ki.length && (this.WC > this.by ? (this.by++, this.So += this.VC, this.dispatchEvent(new f.C.bc("roundAdvance")), this.Fv()) : this.ov());
                    this.lh = this.as;
                    1 != f.xa.U().$e || f.xa.U().hA() || (2 == this.Ki.length && null == this.nf ? this.tx() : 3 == this.Ki.length && this.ux())
                }
            },
            nC: function() {
                b.H.ba.log("HiddenObjectGame::unlockBonusObject()");
                if (0 != this.sg.length) {
                    var a = this.sg[b.H.tc.Vp(this.sg.length)];
                    a.hx(!0);
                    this.im.push(a.Oa);
                    y.remove(this.sg, a);
                    var c = this.pa().O();
                    new f.C.lg(c, a.Oa, b.s.instance.Pa("ui"))
                }
            },
            update: function() {
                b.w.prototype.update.call(this);
                this.ae += b.s.Id();
                if (this.pm) {
                    var a = b.k.rd.U().Zh(),
                        c = new b.I(a.x - this.Qr.x, a.y - this.Qr.y),
                        d = this.Dk.Q();
                    this.Dk.setPosition(d.x - c.x, d.y - c.y, 0);
                    this.Qr.x = a.x;
                    this.Qr.y = a.y;
                    this.Go += c.xd();
                    5 < this.Go && this.JB(!0);
                    b.k.rd.U().qm || this.fB()
                } else 0 < this.Go && this.JB(!1), this.Go = 0;
                0 < this.Kj &&
                    (this.Kj -= b.s.Id(), this.dispatchEvent(new f.C.bc("shuffleCooldownTick", {
                        Uw: this.Kj / this.Ny
                    })), 0 >= this.Kj && (this.dispatchEvent(new f.C.bc("shuffleAvailable")), this.Kj = 0));
                0 < this.lh && null == this.nf && (this.lh -= b.s.Id(), this.dispatchEvent(new f.C.bc("spyVisionCooldownTick", {
                    Uw: this.lh / this.as
                })), 0 >= this.lh && (this.dispatchEvent(new f.C.bc("spyVisionAvailable")), this.lh = 0));
                0 < this.Aj && (this.Aj -= b.s.Id(), 0 > this.Aj && (this.Aj = 0));
                a = new b.I(this.Dk.Q().x, this.Dk.Q().y);
                a = this.Z.rF(a.x, a.y);
                this.Dk.setPosition(a.x,
                    a.y)
            },
            hv: function(a) {
                null != this.mc && (this.mc.u.W(), this.mc = null);
                if (null == this.nf) {
                    for (var c = null, d = this.Fd.length, e = 0; e < d;) {
                        var g = e++,
                            g = this.Fd[g];
                        if (g.Oa == a) {
                            c = g;
                            break
                        }
                    }
                    null != c && (a = this.pa().O(), a.setPosition(b.s.instance.te().x / 2, b.s.instance.te().y / 2), this.nf = new f.C.Zl(a, this.Dk, c.u, this.T), a.addEventListener("destroy", r(this, this.tH)), this.Oo && (this.nf.u.qi(!1), this.Jk = f.ke.Iz(this.pa(), b.ma.wa("ZOOMED_OUT_SPY_RETICULE"))))
                }
            },
            xv: function() {
                null != this.nf && (this.nf.u.W(), this.nf = null)
            },
            tH: function() {
                this.nf =
                    null
            },
            FG: function() {
                this.pm = !0;
                this.Qr = b.k.rd.U().Zh()
            },
            fB: function() {
                this.pm = !1
            },
            ov: function() {
                this.dispatchEvent(new f.C.bc("win"))
            },
            mH: function() {
                0 < this.Aj ? (this.nE(), this.Aj = 0) : this.Aj = 0.35
            },
            nE: function() {
                null != this.Zo && (this.Ha.Nz(this.Zo), this.Zo = null);
                this.Oo ? (this.Zo = this.Ha.Ta(this.Z, "_zoomScale", this.Z._zoomScale, this.Ay, this.ez, b.j.sa.Ra.Sm, 0, r(this, this.mB)), b.k.SoundManager.Xc("ui_zoom_1")) : (this.Zo = this.Ha.Ta(this.Z, "_zoomScale", this.Z._zoomScale, this.TC, this.ez, b.j.sa.Ra.Sm, 0, r(this,
                    this.mB)), b.k.SoundManager.Xc("ui_zoom_2"));
                (this.Oo = !this.Oo) ? this.kK(): this.jK()
            },
            mB: function() {
                this.Zo = null
            },
            kK: function() {
                null != this.nf && (this.nf.u.qi(!1), this.Jk = f.ke.Iz(this.pa(), b.ma.wa("ZOOMED_OUT_SPY_RETICULE")))
            },
            jK: function() {
                null != this.nf && (this.nf.u.qi(!0), this.wB())
            },
            wB: function() {
                var a = this;
                null != this.Jk && this.Jk.fb(b.j.Nd).Ta(this.Jk.qa, "x", this.Jk.Q().x, -250, 0.2, b.j.sa.Ra.Rz, 0, function() {
                    a.Jk.W();
                    a.Jk = null
                })
            },
            kB: function() {
                b.H.ba.log("onRevealObjects()");
                for (var a = this.Fd.length,
                        c = 0; c < a;) {
                    var d = c++,
                        d = this.Fd[d];
                    b.H.ba.log("?");
                    d = d.u;
                    new b.j.eh(d, d.qa, "y", d.ld().y, 6, 5.5);
                    new b.j.eh(d, d.oa, "y", 2, 0.05, 5.5, !1, Math.PI);
                    new b.j.eh(d, d.oa, "x", 2, 0.05, 5.5, !1, 0)
                }
                a = this.sg.length;
                for (c = 0; c < a;) d = c++, d = this.sg[d], b.H.ba.log("?"), d = d.u, new b.j.eh(d, d.qa, "y", d.ld().y, 6, 5.5), new b.j.eh(d, d.oa, "y", 1, 0.05, 5.5, !1, Math.PI), new b.j.eh(d, d.oa, "x", 1, 0.05, 5.5, !1, 0)
            },
            Id: C("ae"),
            GP: C("im"),
            Uk: function(a) {
                for (var b = 0, c = this.Fd.length; b < c;) {
                    var e = b++;
                    this.Fd[e].hx(a)
                }
            },
            JB: function(a) {
                for (var b = this.Fd.length,
                        c = 0; c < b;) {
                    var e = c++;
                    this.Fd[e].cJ(a)
                }
            },
            W: function() {
                b.w.prototype.W.call(this);
                b.k.gf.U().removeEventListener("revealObjects", r(this, this.kB))
            },
            r: f.C.Mc
        });
        f.C.bc = function(a, c) {
            b.L.La.call(this, a);
            this.data = c
        };
        f.C.bc.q = !0;
        f.C.bc.N = b.L.La;
        f.C.bc.prototype = s(b.L.La.prototype, {
            r: f.C.bc
        });
        f.C.qg = function(a, c, d) {
            b.w.call(this, a, "HiddenObjectList");
            this.Fd = c;
            this.T = d;
            this.Yx = []
        };
        f.C.qg.q = !0;
        f.C.qg.N = b.w;
        f.C.qg.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                for (var a = this.Fd.length, c =
                        a, d = 0; d < a;) {
                    var e = d++; - 1 < y.indexOf(this.Yx, this.Fd[e].Ze, 0) && c--;
                    this.Yx.push(this.Fd[e].Ze)
                }
                for (var d = 0 + -37.5 * (c - 1), c = 0 + -0 * (c - 1), e = [], f = 0; f < a;) {
                    for (var h = f++, h = this.Fd[h], l = !1, m = 0, n = e.length; m < n;) {
                        var q = m++;
                        e[q].Qa("class") == h.Ze && (this.MF(e[q]), l = !0)
                    }
                    l || (l = this.pa().O(), (new b.j.GameImage(l, h.ds, this.T)).ec(), l.setPosition(d, c), this.u.ha(l), d += 75, c += 0, l.setProperty("class", h.Ze), e.push(l))
                }
            },
            MF: function(a) {
                var c = a.Js(b.j.Ba),
                    d = null;
                null == c ? (d = this.pa().O(), d.setPosition(0, 30), a.ha(d), d = new b.j.Ba(d,
                    this.T), d.Xa("18px"), d.Xa("great_escape_rgbold")) : d = c[0];
                a = Math.max(1, u.gb(d.Rc.substring(1, d.Rc.length)));
                a++;
                d.Fa("x" + (null == a ? "null" : "" + a))
            },
            r: f.C.qg
        });
        f.C.uj = function(a, c) {
            b.L.La.call(this, a);
            this.Oa = c
        };
        f.C.uj.q = !0;
        f.C.uj.N = b.L.La;
        f.C.uj.prototype = s(b.L.La.prototype, {
            Lv: C("Oa"),
            r: f.C.uj
        });
        f.C.Zc = function(a, c) {
            b.ca.call(this);
            this.YC = a;
            this.sg = c
        };
        f.C.Zc.q = !0;
        f.C.Zc.N = b.ca;
        f.C.Zc.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                this.Vu = this.O();
                this.Vu.setPosition(375, 250);
                this.T =
                    b.s.instance.Pa("ui");
                var a = this.O();
                (new b.j.GameImage(a, "overlay", this.T)).ec();
                this.sd = this.O();
                (new b.j.GameImage(this.sd, "levelIntroBg", this.T)).ec();
                this.sd.setPosition(0, 0);
                var c = this.O();
                c.setPosition(0, -200);
                (new b.j.GameImage(c, "screenHeader", this.T)).ec();
                var d = this.O();
                d.setPosition(0, -2);
                c.ha(d);
                d = new b.j.Ba(d, this.T);
                d.Fa(H.replace(b.ma.wa("INTRO_LEVEL_NUMBER"), "%N", u.Ah(f.xa.U().$e)));
                d.Xa("great_escapeblack");
                d.ob("36px");
                this.Hy = f.$.Hz(this, 0, 185, "playButton", "playButton", r(this,
                    this.eH), this.T, "", !1);
                b.la.mh() && this.Hy.fb(b.j.GameImage).Lc(-1, 1);
                d = this.O();
                d.setPosition(0, -135);
                var e = new b.j.Ba(d, this.T);
                e.Fa(b.ma.wa("LEVEL_" + f.xa.U().$e));
                e.Xa("great_escape_rgbold");
                e.ob("22px");
                e = this.O();
                e.setPosition(0, -100);
                var g = new b.j.Ba(e, this.T);
                g.Fa(b.ma.wa("INTRO_FIND_THESE_ITEMS"));
                g.Xa("great_escape_rgbold");
                g.ob("28px");
                g = this.O();
                g.setPosition(0, -50);
                new f.C.qg(g, this.YC, this.T);
                if (0 < this.sg.length) {
                    var h = this.O();
                    h.setPosition(0, 30);
                    var l = new b.j.Ba(h, this.T);
                    l.Fa(b.ma.wa("INTRO_SECONDARY"));
                    l.Xa("great_escape_rgbold");
                    l.ob("26px");
                    l = this.O();
                    l.setPosition(0, 78);
                    new f.C.qg(l, this.sg, this.T);
                    this.sd.ha(h);
                    this.sd.ha(l)
                } else e.setPosition(e.ld().x, e.ld().y + 50), g.setPosition(g.ld().x, g.ld().y + 50);
                this.Vu.ha(a);
                this.Vu.ha(this.sd);
                this.sd.ha(d);
                this.sd.ha(e);
                this.sd.ha(c);
                this.sd.ha(this.Hy);
                this.sd.ha(g)
            },
            eH: function() {
                b.s.instance.ij(this)
            },
            r: f.C.Zc
        });
        f.C.Zl = function(a, c, d, e) {
            this.Xu = !1;
            b.w.call(this, a, "SpyVisionReticule");
            this.HC = c;
            this.Qc = d;
            this.T = e;
            this.Qc.addEventListener("discover",
                r(this, this.BH));
            this.Qc.addEventListener("destroy", r(this, this.it))
        };
        f.C.Zl.q = !0;
        f.C.Zl.N = b.w;
        f.C.Zl.prototype = s(b.w.prototype, {
            it: function() {
                this.tg = 0
            },
            BH: function() {
                this.tg = 0
            },
            J: function() {
                b.w.prototype.J.call(this);
                this.Ph = new b.j.Tf(this.u);
                this.tg = u.ab(b.la.Qa("spyVisionDuration"));
                this.Cy = u.ab(b.la.Qa("spyVisionMinSpinSpeed"));
                this.SC = u.ab(b.la.Qa("spyVisionMaxSpinSpeed"));
                this.By = u.ab(b.la.Qa("spyVisionMinSpinDistance"));
                this.zu = u.ab(b.la.Qa("spyVisionMaxSpinDistance"));
                this.lc = new b.j.GameImage(this.u,
                    "spyVisionReticule", this.T);
                this.lc.ec()
            },
            update: function() {
                b.w.prototype.update.call(this);
                var a = this.Qc.Q(),
                    c = this.HC.Q(),
                    a = (new b.Vector3D(a.x - c.x, a.y - c.y)).xd(),
                    c = a - this.By;
                c > this.zu && (c = this.zu);
                this.Ph.sn(new b.Vector3D(0, 0, b.H.tc.fp(this.Cy + (1 - c / (this.zu - this.By)) * (this.SC - this.Cy))));
                c = this.u.Hg().z | 0;
                b.H.ba.log("Rotation? " + c % 3);
                0 == c % 3 ? !1 == this.Xu && (b.k.SoundManager.Xc("ui_spy_2"), this.Xu = !0) : this.Xu = !1;
                a = b.H.tc.Gb(0.005 * a, 0.5, 2);
                this.u.Lc(a, a, a);
                this.lc.yh(a)
            },
            OQ: function() {
                this.u.W()
            },
            r: f.C.Zl
        });
        f.zc = {};
        f.zc.Uf = function(a, c) {
            this.Zf = this.Ui = this.T = this.Od = null;
            b.w.call(this, a, "SubtitleDisplay");
            this.T = c
        };
        f.zc.Uf.q = !0;
        f.zc.Uf.N = b.w;
        f.zc.Uf.prototype = s(b.w.prototype, {
            J: function() {
                b.w.prototype.J.call(this);
                this.ry = this.pa().O();
                this.ry.Lc(1.2666666666666666, 1.2666666666666666);
                this.ry.setPosition(0, -10);
                this.my = this.pa().O();
                this.my.Lc(1.2666666666666666, 1.2666666666666666);
                this.my.setPosition(0, 548);
                var a = this.pa().O();
                a.qi(!1);
                a.setPosition(378, 453);
                this.Ui = new b.j.Ba(a, this.T);
                this.Ui.Xa("Arial Black, Arial");
                this.Ui.sl("#000000");
                this.Ui.We(650);
                a = this.pa().O();
                a.qi(!1);
                a.setPosition(375, 450);
                this.Zf = new b.j.Ba(a, this.T);
                this.Zf.Xa("Arial Black, Arial");
                this.Zf.We(650);
                this.Od = new b.j.Zg(this.u);
                b.Tb.Hh.U().addEventListener("showSubtitle", r(this, this.AH))
            },
            qQ: function() {
                this.Zf.We(950);
                this.Ui.We(950)
            },
            ZQ: function() {
                this.Zf.We(650);
                this.Ui.We(650)
            },
            AH: function(a) {
                this.Od.ts();
                var b = a.Wy;
                this.Zf.Fa(b);
                this.Zf.u.qi(!0);
                this.Ui.Fa(b);
                this.Ui.u.qi(!0);
                this.Od.Qh(a.tg, r(this,
                    this.zH))
            },
            zH: function() {
                this.Zf.u.qi(!1);
                this.Ui.u.qi(!1)
            },
            r: f.zc.Uf
        });
        f.zc.Ci = function() {
            this.Vy = null;
            b.ca.call(this);
            f.zc.Ci.dc = this
        };
        f.zc.Ci.q = !0;
        f.zc.Ci.U = function() {
            return f.zc.Ci.dc
        };
        f.zc.Ci.N = b.ca;
        f.zc.Ci.prototype = s(b.ca.prototype, {
            J: function() {
                b.ca.prototype.J.call(this);
                var a = this.O();
                this.Vy = new f.zc.Uf(a, b.s.instance.Pa("subtitles"))
            },
            OP: C("Vy"),
            r: f.zc.Ci
        });
        var B = {
            wo: v()
        };
        B.wo.q = !0;
        B.wo.xx = function() {
            return (new Date).getTime() / 1E3
        };
        B.ee = {};
        B.ee.oe = function() {
            this.up = {}
        };
        B.ee.oe.q = !0;
        B.ee.oe.Ox = [V];
        B.ee.oe.prototype = {
            set: function(a, b) {
                this.up["$" + a] = b
            },
            get: function(a) {
                return this.up["$" + a]
            },
            vc: function(a) {
                return this.up.hasOwnProperty("$" + a)
            },
            remove: function(a) {
                a = "$" + a;
                if (!this.up.hasOwnProperty(a)) return !1;
                delete this.up[a];
                return !0
            },
            r: B.ee.oe
        };
        B.Ss = {};
        B.Ss.Ft = v();
        B.Ss.Ft.q = !0;
        B.Ss.Ft.prototype = {
            toString: I("Eof"),
            r: B.Ss.Ft
        };
        B.xml = {};
        B.xml.Bi = v();
        B.xml.Bi.q = !0;
        B.xml.Bi.parse = function(a) {
            var b = w.createDocument();
            B.xml.Bi.Pz(a, 0, b);
            return b
        };
        B.xml.Bi.Pz = function(a, b, c) {
            null == b &&
                (b = 0);
            for (var e = null, f = 1, h = 1, l = null, m = 0, n = 0, q = 0, p = a.charCodeAt(b), r = new Q; p == p;) {
                switch (f) {
                    case 0:
                        switch (p) {
                            case 10:
                            case 13:
                            case 9:
                            case 32:
                                break;
                            default:
                                f = h;
                                continue
                        }
                        break;
                    case 1:
                        switch (p) {
                            case 60:
                                f = 0;
                                h = 2;
                                break;
                            default:
                                m = b;
                                f = 13;
                                continue
                        }
                        break;
                    case 13:
                        60 == p ? (h = w.uv(r.b + y.substr(a, m, b - m)), r = new Q, c.ha(h), n++, f = 0, h = 2) : 38 == p && (r.oD(a, m, b - m), f = 18, h = 13, m = b + 1);
                        break;
                    case 17:
                        93 == p && (93 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2)) && (f = w.TD(y.substr(a, m, b - m)), c.ha(f), n++, b += 2, f = 1);
                        break;
                    case 2:
                        switch (p) {
                            case 33:
                                if (91 ==
                                    a.charCodeAt(b + 1)) {
                                    b += 2;
                                    if ("CDATA[" != y.substr(a, b, 6).toUpperCase()) throw "Expected <![CDATA[";
                                    b += 5;
                                    f = 17
                                } else if (68 == a.charCodeAt(b + 1) || 100 == a.charCodeAt(b + 1)) {
                                    if ("OCTYPE" != y.substr(a, b + 2, 6).toUpperCase()) throw "Expected <!DOCTYPE";
                                    b += 8;
                                    f = 16
                                } else {
                                    if (45 != a.charCodeAt(b + 1) || 45 != a.charCodeAt(b + 2)) throw "Expected \x3c!--";
                                    b += 2;
                                    f = 15
                                }
                                m = b + 1;
                                break;
                            case 63:
                                f = 14;
                                m = b;
                                break;
                            case 47:
                                if (null == c) throw "Expected node name";
                                m = b + 1;
                                f = 0;
                                h = 10;
                                break;
                            default:
                                f = 3;
                                m = b;
                                continue
                        }
                        break;
                    case 3:
                        if (!(97 <= p && 122 >= p || 65 <= p && 90 >= p || 48 <=
                                p && 57 >= p || 58 == p || 46 == p || 95 == p || 45 == p)) {
                            if (b == m) throw "Expected node name";
                            e = w.createElement(y.substr(a, m, b - m));
                            c.ha(e);
                            f = 0;
                            h = 4;
                            continue
                        }
                        break;
                    case 4:
                        switch (p) {
                            case 47:
                                f = 11;
                                n++;
                                break;
                            case 62:
                                f = 9;
                                n++;
                                break;
                            default:
                                f = 5;
                                m = b;
                                continue
                        }
                        break;
                    case 5:
                        if (!(97 <= p && 122 >= p || 65 <= p && 90 >= p || 48 <= p && 57 >= p || 58 == p || 46 == p || 95 == p || 45 == p)) {
                            if (m == b) throw "Expected attribute name";
                            l = y.substr(a, m, b - m);
                            if (e.vc(l)) throw "Duplicate attribute";
                            f = 0;
                            h = 6;
                            continue
                        }
                        break;
                    case 6:
                        switch (p) {
                            case 61:
                                f = 0;
                                h = 7;
                                break;
                            default:
                                throw "Expected =";
                        }
                        break;
                    case 7:
                        switch (p) {
                            case 34:
                            case 39:
                                f = 8;
                                m = b;
                                break;
                            default:
                                throw 'Expected "';
                        }
                        break;
                    case 8:
                        p == a.charCodeAt(m) && (e.set(l, y.substr(a, m + 1, b - m - 1)), f = 0, h = 4);
                        break;
                    case 9:
                        m = b = B.xml.Bi.Pz(a, b, e);
                        f = 1;
                        break;
                    case 11:
                        switch (p) {
                            case 62:
                                f = 1;
                                break;
                            default:
                                throw "Expected >";
                        }
                        break;
                    case 12:
                        switch (p) {
                            case 62:
                                return 0 == n && c.ha(w.uv("")), b;
                            default:
                                throw "Expected >";
                        }
                    case 10:
                        if (!(97 <= p && 122 >= p || 65 <= p && 90 >= p || 48 <= p && 57 >= p || 58 == p || 46 == p || 95 == p || 45 == p)) {
                            if (m == b) throw "Expected node name";
                            if (y.substr(a, m, b - m) != c.Vv()) throw "Expected </" +
                                c.Vv() + ">";
                            f = 0;
                            h = 12;
                            continue
                        }
                        break;
                    case 15:
                        45 == p && (45 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2)) && (c.ha(w.createComment(y.substr(a, m, b - m))), b += 2, f = 1);
                        break;
                    case 16:
                        91 == p ? q++ : 93 == p ? q-- : 62 == p && 0 == q && (c.ha(w.VD(y.substr(a, m, b - m))), f = 1);
                        break;
                    case 14:
                        63 == p && 62 == a.charCodeAt(b + 1) && (b++, c.ha(w.createProcessingInstruction(y.substr(a, m + 1, b - m - 2))), f = 1);
                        break;
                    case 18:
                        59 == p && (m = y.substr(a, m, b - m), 35 == m.charCodeAt(0) ? r.add(String.fromCharCode(120 == m.charCodeAt(1) ? u.gb("0" + y.substr(m, 1, m.length - 1)) : u.gb(y.substr(m,
                            1, m.length - 1)))) : B.xml.Bi.Sz.vc(m) ? r.add(B.xml.Bi.Sz.get(m)) : r.b += u.Ah("&" + m + ";"), m = b + 1, f = h)
                }
                p = H.DE(a, ++b)
            }
            1 == f && (m = b, f = 13);
            if (13 == f) return b == m && 0 != n || c.ha(w.uv(r.b + y.substr(a, m, b - m))), b;
            throw "Unexpected end";
        };
        var A = {
            Ja: v()
        };
        A.Ja.q = !0;
        A.Ja.np = function(a) {
            return a instanceof Array && null == a.mb ? Array : a.r
        };
        A.Ja.zo = function(a, b) {
            if (null == a) return "null";
            if (5 <= b.length) return "<...>";
            var c = typeof a;
            "function" == c && (a.q || a.rg) && (c = "object");
            switch (c) {
                case "object":
                    if (a instanceof Array) {
                        if (a.mb) {
                            if (2 == a.length) return a[0];
                            c = a[0] + "(";
                            b += "\t";
                            for (var e = 2, f = a.length; e < f;) var h = e++,
                                c = 2 != h ? c + ("," + A.Ja.zo(a[h], b)) : c + A.Ja.zo(a[h], b);
                            return c + ")"
                        }
                        c = a.length;
                        e = "[";
                        b += "\t";
                        for (f = 0; f < c;) h = f++, e += (0 < h ? "," : "") + A.Ja.zo(a[h], b);
                        return e + "]"
                    }
                    try {
                        e = a.toString
                    } catch (l) {
                        return "???"
                    }
                    if (null != e && e != Object.toString && (c = a.toString(), "[object Object]" != c)) return c;
                    c = null;
                    e = "{\n";
                    b += "\t";
                    f = null != a.hasOwnProperty;
                    for (c in a) f && !a.hasOwnProperty(c) || ("prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c) ||
                        (2 != e.length && (e += ", \n"), e += b + c + " : " + A.Ja.zo(a[c], b));
                    b = b.substring(1);
                    return e + ("\n" + b + "}");
                case "function":
                    return "<function>";
                case "string":
                    return a;
                default:
                    return String(a)
            }
        };
        A.Ja.Rt = function(a, b) {
            if (null == a) return !1;
            if (a == b) return !0;
            var c = a.Ox;
            if (null != c)
                for (var e = 0, f = c.length; e < f;) {
                    var h = e++,
                        h = c[h];
                    if (h == b || A.Ja.Rt(h, b)) return !0
                }
            return A.Ja.Rt(a.N, b)
        };
        A.Ja.gr = function(a, b) {
            if (null == b) return !1;
            switch (b) {
                case Z:
                    return (a | 0) === a;
                case X:
                    return "number" == typeof a;
                case U:
                    return "boolean" == typeof a;
                case String:
                    return "string" == typeof a;
                case Array:
                    return a instanceof Array && null == a.mb;
                case aa:
                    return !0;
                default:
                    if (null != a) {
                        if ("function" == typeof b && (a instanceof b || A.Ja.Rt(A.Ja.np(a), b))) return !0
                    } else return !1;
                    return b == ba && null != a.q || b == ca && null != a.rg ? !0 : a.mb == b
            }
        };
        A.Ja.Fb = function(a, b) {
            if (A.Ja.gr(a, b)) return a;
            throw "Cannot cast " + u.Ah(a) + " to " + u.Ah(b);
        };
        A.Pf = v();
        A.Pf.q = !0;
        A.Pf.qp = function() {
            try {
                var a = window.localStorage;
                a.getItem("");
                return a
            } catch (b) {
                return null
            }
        };
        A.Pf.rp = function() {
            try {
                var a =
                    window.sessionStorage;
                a.getItem("");
                return a
            } catch (b) {
                return null
            }
        };
        var Y = 0;
        Array.prototype.indexOf && (y.indexOf = function(a, b, c) {
            return Array.prototype.indexOf.call(a, b, c)
        });
        Math.NaN = Number.NaN;
        Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
        Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
        Math.sQ = function(a) {
            return isFinite(a)
        };
        Math.bw = function(a) {
            return isNaN(a)
        };
        String.prototype.r = String;
        String.q = !0;
        Array.q = !0;
        Date.prototype.r = Date;
        Date.q = ["Date"];
        var Z = {
                q: ["Int"]
            },
            aa = {
                q: ["Dynamic"]
            },
            X = Number;
        X.q = ["Float"];
        var U = Boolean;
        U.rg = ["Bool"];
        var ba = {
                q: ["Class"]
            },
            ca = {};
        w.$g = "element";
        w.xC = "pcdata";
        w.tC = "cdata";
        w.uC = "comment";
        w.vC = "doctype";
        w.yC = "processingInstruction";
        w.Et = "document";
        A.JQuery = window.jQuery;
        p.EC = 60;
        p.FC = 30;
        p.qd = 750;
        p.gd = 500;
        p.Eq = 640;
        p.$n = 960;
        p.pK = "#000000";
        c.h.Aa.pN = 255;
        c.h.Aa.lI = c.h.Aa.vw();
        c.h.Aa.jI = c.h.Aa.vw();
        c.h.Aa.kI = c.h.Aa.vw();
        c.h.Aa.ex = [];
        c.h.Aa.fx = [];
        c.h.Aa.oI = new c.f.g.A;
        c.h.Aa.nI = new c.f.g.A;
        c.h.Aa.qI = new c.f.g.A;
        c.h.Aa.pI = new c.f.g.A;
        c.h.Aa.wI = new c.f.g.A;
        c.h.Aa.xI = new c.f.g.A;
        c.h.Aa.AI = new c.f.g.A;
        c.h.Aa.BI = new c.f.g.A;
        c.h.Aa.kN = new c.f.g.A;
        c.h.Of.uI = new c.h.Aq;
        c.h.Of.sI = [];
        c.h.Of.tI = [];
        c.h.Cl.eE = 0;
        c.h.Ka.BD = 0;
        c.h.Ka.CD = 0;
        c.h.Ka.vz = 0;
        c.h.Ka.DD = 0;
        c.h.Ka.wz = 0;
        c.h.Ka.dx = new c.h.Bq;
        c.h.Ka.qn = new c.h.sq;
        c.h.Ka.hk = new c.f.g.Ch;
        c.h.Ka.ik = new c.f.g.Ch;
        c.h.Ka.lt = new c.h.zq;
        c.h.Ka.CB = new c.h.tq;
        c.h.S.Yd.PN = 1;
        c.h.S.Yd.QN = 0;
        c.h.S.Yd.RN = -1;
        c.h.S.Bc.aR = new c.f.g.Ib;
        c.f.F.VERSION = "2.1alpha";
        c.f.F.QM = 65535;
        c.f.F.bp = Math.PI;
        c.f.F.Nj = 2;
        c.f.F.ks = 0.1;
        c.f.F.pz = 2;
        c.f.F.qN = 2 * c.f.F.Kb;
        c.f.F.Kb =
            0.005;
        c.f.F.Qk = 0.011111111111111112 * c.f.F.bp;
        c.f.F.ns = 8 * c.f.F.Kb;
        c.f.F.yD = 32;
        c.f.F.zD = 32;
        c.f.F.ED = 1;
        c.f.F.Cf = 0.2;
        c.f.F.ls = 0.044444444444444446 * c.f.F.bp;
        c.f.F.Jm = 2;
        c.f.F.uz = c.f.F.Jm * c.f.F.Jm;
        c.f.F.Im = 0.5 * c.f.F.bp;
        c.f.F.tz = c.f.F.Im * c.f.F.Im;
        c.f.F.mv = 0.2;
        c.f.F.AD = 0.5;
        c.f.F.sz = 0.01;
        c.f.F.qz = 0.011111111111111112 * c.f.F.bp;
        c.f.g.t.uD = new c.f.g.A(0, 0);
        c.f.g.t.rD = c.f.g.Ib.kp(new c.f.g.A(1, 0), new c.f.g.A(0, 1));
        c.f.g.t.mN = new c.f.g.Ch(c.f.g.t.uD, c.f.g.t.rD);
        c.e.aa.DI = new c.f.g.Ch;
        c.e.aa.kd = 1;
        c.e.aa.Tk = 2;
        c.e.aa.gp =
            4;
        c.e.aa.hp = 8;
        c.e.aa.ws = 16;
        c.e.aa.Pm = 32;
        c.e.aa.Df = 0;
        c.e.aa.rz = 1;
        c.e.aa.bg = 2;
        c.e.Bl.vD = new c.e.Bl;
        c.e.Bh.wD = new c.e.Bh;
        c.e.Cn.$Q = new c.h.pq;
        c.e.De.Qz = 1;
        c.e.De.yE = 2;
        c.e.De.vE = 4;
        c.e.De.zE = 8;
        c.e.De.wE = 16;
        c.e.De.xE = 32;
        c.e.qk.DB = new c.e.oq;
        c.e.Ub.zI = new c.e.Hl;
        c.e.Ub.CI = new c.f.g.Ch;
        c.e.Ub.AB = new c.f.g.zi;
        c.e.Ub.BB = new c.f.g.zi;
        c.e.Ub.yI = new c.e.Hl;
        c.e.Ub.rI = [];
        c.e.Ub.mI = new c.f.An(0.5, 0.8, 0.8);
        c.e.Ub.Av = 1;
        c.e.Ub.zv = 2;
        c.e.D.ja.xs = 1;
        c.e.D.ja.ip = 2;
        c.e.D.ja.kd = 4;
        c.e.D.ja.Qm = 8;
        c.e.D.ja.Rm = 16;
        c.e.D.ja.vs = 32;
        c.e.D.ja.yv = 64;
        c.e.D.ja.rn = new c.h.Cq;
        c.e.D.Fl.uN = new c.f.g.A;
        c.e.D.Fl.vN = new c.f.g.A;
        c.e.D.ie.dS = c.f.F.Nj;
        c.e.D.ie.rl = new c.h.Dq;
        c.e.D.ie.mt = new c.e.D.Fl;
        c.e.p.Vg.ms = 2;
        c.e.p.Wg.Bx = new c.f.g.A;
        b.cb.MC = 0;
        b.la.Kk = new B.ee.oe;
        b.s.NL = 0;
        b.s.OL = 1;
        b.s.tL = 0.06666666666666667;
        b.s.QL = 30;
        b.s.Zy = 1;
        b.s.VM = -1;
        b.s.Rr = 0;
        b.s.ae = 0;
        b.$c.UM = 0;
        b.LoadBatch.wL = 1.25;
        b.ua.Dh.yK = "beginContact";
        b.ua.Dh.RK = "endContact";
        b.ua.Ye.PL = 60;
        b.ua.Ye.BM = 1 / 60;
        b.ua.oj.WL = "preUpdate";
        b.ua.oj.OM = "update";
        b.j.Ak.TK = 5E-5;
        b.j.Ba.JK = "white";
        b.j.buttons.ef.vr = !1;
        b.L.Ab.RM = "visibilityOff";
        b.L.Ab.SM = "visibilityOn";
        b.L.Ab.MK = "displayUpdate";
        b.L.Ab.mK = "addedToParent";
        b.L.Ab.$L = "removedFromParent";
        b.L.Ab.yL = "mouseDown";
        b.L.Ab.CL = "mouseUp";
        b.L.Ab.zL = "mouseMove";
        b.L.Ab.AL = "mouseOut";
        b.L.Ab.BL = "mouseOver";
        b.L.Ab.xL = "mouseClick";
        b.L.pg.KK = "destroy";
        b.L.pg.lK = "activate";
        b.L.pg.IK = "deactivate";
        b.L.pg.lL = "initialize";
        b.L.Xl.zC = "raycastCheck";
        b.fe.FlashAnimation.nr = new B.ee.oe;
        b.k.Ga.ap = new B.ee.oe;
        b.k.mg.wK = "beatLevel";
        b.k.mg.VK = "failLevel";
        b.k.mg.IM =
            "turboStart";
        b.k.mg.HM = "turboEnd";
        b.k.mg.eM = "revealObjects";
        b.k.le.xr = new B.ee.oe;
        b.k.Sq.zC = "raycastCheck";
        b.k.SoundManager.zy = 1;
        b.k.SoundManager.Ro = 0.65;
        b.k.SoundManager.Zr = 1;
        b.k.SoundManager.Bu = !1;
        b.k.SoundManager.Yu = !1;
        b.k.SoundManager.Yf = [];
        b.k.SoundManager.uu = !1;
        b.k.SoundManager.Nk = !1;
        b.k.SoundManager.XM = new B.ee.oe;
        b.Be.wj.uL = "midpoint";
        b.Be.wj.GK = "complete";
        b.Tb.bm.iM = "showSubtitle";
        b.Da.Rq.mL = "initialized";
        b.ta.dm.PM = "updateDisplay";
        b.H.em.FK = "change";
        f.Bd.CM = 1;
        f.Bd.ZK = 1900;
        f.Bd.$K = 3E3;
        f.Bd.GM =
            0.5;
        f.Bd.FM = 1;
        f.Nq.oK = "Arial";
        f.Nq.aL = "great_escapeblack";
        f.Nq.bL = "great_escape_rgbold";
        f.xa.IL = "numLevelsUnlocked";
        f.xa.rL = "levelScore";
        f.xa.cL = "hasBeatenGame";
        f.xa.eL = "hasStartedGame";
        f.xa.dL = "hasCompletedTutorial";
        f.Ql.JL = 8;
        f.Qf.jL = 0;
        f.Qf.kL = 0.808;
        f.Qf.uM = -0.7573333333333333;
        f.Qf.vM = 0.808;
        f.Qf.cM = 0.76;
        f.Qf.dM = 0.808;
        f.Rf.Lx = "OnMenu";
        f.Rf.EM = "onToggleMusic";
        f.Rf.Mx = "OnSpyVisionActivated";
        f.Ul.xK = 1;
        f.Vl.wM = 500;
        f.Wl.GC = "win";
        f.Gh.HL = 5;
        f.Gh.LC = [new b.I(-0.656, -0.118), new b.I(-0.552, 0.546), new b.I(-0.042666666666666665, -0.274), new b.I(0.029333333333333333, 0.398), new b.I(0.6426666666666667, -0.218)];
        f.$l.KL = 2;
        f.pe.oM = 193;
        f.pe.pM = -180;
        f.pe.DL = 180;
        f.pe.EL = 70;
        f.C.lg.uK = 0;
        f.C.lg.vK = 85;
        f.C.lg.sK = -250;
        f.C.lg.tK = 85;
        f.C.lg.SK = 0.5;
        f.C.lg.UK = 0.5;
        f.C.lg.TM = 4;
        f.C.ah.CC = -150;
        f.C.ah.DC = 0;
        f.C.ah.AC = 75;
        f.C.ah.BC = 0;
        f.C.ah.WK = 8;
        f.C.ah.qM = 6;
        f.C.tj.HK = "cyclingComplete";
        f.C.tj.bM = "removeSpyReticule";
        f.C.xk.LK = "discover";
        f.C.Mc.zK = 749;
        f.C.Mc.AK = 499;
        f.C.Mc.PK = 375;
        f.C.Mc.QK = 300;
        f.C.Mc.OK = 750;
        f.C.Mc.NK = 475;
        f.C.Mc.DM = 0.35;
        f.C.Mc.UL = 500;
        f.C.Mc.TL =
            2E3;
        f.C.Mc.VL = -10;
        f.C.Mc.nL = 2;
        f.C.Mc.oL = 3;
        f.C.Mc.KM = 90;
        f.C.Mc.LM = 400;
        f.C.Mc.MM = 660;
        f.C.Mc.NM = 400;
        f.C.Mc.vL = 5;
        f.C.Mc.dD = !1;
        f.C.bc.rM = "spyVisionAvailable";
        f.C.bc.lM = "shuffleAvailable";
        f.C.bc.tM = "spyVisionUnavailable";
        f.C.bc.nM = "shuffleUnavailable";
        f.C.bc.sM = "spyVisionCooldownTick";
        f.C.bc.mM = "shuffleCooldownTick";
        f.C.bc.GC = "win";
        f.C.bc.jM = "showTutorial1";
        f.C.bc.JM = "tutorial1Destoryed";
        f.C.bc.kM = "showTutorial2";
        f.C.bc.hM = "roundAdvance";
        f.C.qg.CC = 0;
        f.C.qg.DC = 0;
        f.C.qg.AC = 75;
        f.C.qg.BC = 0;
        f.C.qg.FL = 0;
        f.C.qg.GL =
            30;
        f.C.uj.nK = "addHiddenObject";
        f.C.uj.aM = "removeHiddenObject";
        f.C.Zc.fM = 375;
        f.C.Zc.gM = 250;
        f.C.Zc.qK = 0;
        f.C.Zc.rK = 0;
        f.C.Zc.RL = 0;
        f.C.Zc.SL = 185;
        f.C.Zc.hL = 0;
        f.C.Zc.iL = -200;
        f.C.Zc.pL = 0;
        f.C.Zc.qL = -135;
        f.C.Zc.LL = 0;
        f.C.Zc.ML = -100;
        f.C.Zc.YL = 0;
        f.C.Zc.ZL = -50;
        f.C.Zc.BK = 0;
        f.C.Zc.CK = 30;
        f.C.Zc.DK = 0;
        f.C.Zc.EK = 78;
        f.C.Zc.XL = 50;
        f.C.Zl.sL = 1E3;
        f.zc.Uf.fL = 0;
        f.zc.Uf.gL = -10;
        f.zc.Uf.XK = 0;
        f.zc.Uf.YK = 548;
        f.zc.Uf.zM = 375;
        f.zc.Uf.AM = 450;
        f.zc.Uf.xM = 3;
        f.zc.Uf.yM = 3;
        B.xml.Bi.Sz = function() {
            var a = new B.ee.oe;
            a.set("lt", "<");
            a.set("gt",
                ">");
            a.set("amp", "&");
            a.set("quot", '"');
            a.set("apos", "'");
            a.set("nbsp", String.fromCharCode(160));
            return a
        }(this);
        p.qG()
    })();