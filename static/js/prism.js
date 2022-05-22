/* PrismJS 1.28.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+graphql+markdown+markup-templating+php+pug+python+regex+yaml&plugins=autolinker+show-language+highlight-keywords+toolbar+copy-to-clipboard+download-button+treeview */
var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function(e) {
        var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
            t = 0,
            r = {},
            a = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof i ? new i(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).slice(8, -1);
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, '__id', {
                            value: ++t
                        }), e.__id;
                    },
                    clone: function e(n, t) {
                        var r, i;
                        switch (t = t || {}, a.util.type(n)) {
                            case 'Object':
                                if (i = a.util.objId(n), t[i]) return t[i];
                                for (var l in r = {}, t[i] = r, n) n.hasOwnProperty(l) && (r[l] = e(n[l], t));
                                return r;
                            case 'Array':
                                return i = a.util.objId(n), t[i] ? t[i] : (r = [], t[i] = r, n.forEach((function(n, a) {
                                    r[a] = e(n, t);
                                })), r);
                            default:
                                return n;
                        }
                    },
                    getLanguage: function(e) {
                        for (; e;) {
                            var t = n.exec(e.className);
                            if (t) return t[1].toLowerCase();
                            e = e.parentElement;
                        }
                        return 'none';
                    },
                    setLanguage: function(e, t) {
                        e.className = e.className.replace(RegExp(n, 'gi'), ''), e.classList.add('language-' + t);
                    },
                    currentScript: function() {
                        if ('undefined' == typeof document) return null;
                        if ('currentScript' in document) return document.currentScript;
                        try {
                            throw new Error;
                        } catch (r) {
                            var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];
                            if (e) {
                                var n = document.getElementsByTagName('script');
                                for (var t in n)
                                    if (n[t].src == e) return n[t];
                            }
                            return null;
                        }
                    },
                    isActive: function(e, n, t) {
                        for (var r = 'no-' + n; e;) {
                            var a = e.classList;
                            if (a.contains(n)) return !0;
                            if (a.contains(r)) return !1;
                            e = e.parentElement;
                        }
                        return !!t;
                    }
                },
                languages: {
                    plain: r,
                    plaintext: r,
                    text: r,
                    txt: r,
                    extend: function(e, n) {
                        var t = a.util.clone(a.languages[e]);
                        for (var r in n) t[r] = n[r];
                        return t;
                    },
                    insertBefore: function(e, n, t, r) {
                        var i = (r = r || a.languages)[e],
                            l = {};
                        for (var o in i)
                            if (i.hasOwnProperty(o)) {
                                if (o == n)
                                    for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
                                t.hasOwnProperty(o) || (l[o] = i[o]);
                            } var u = r[e];
                        return r[e] = l, a.languages.DFS(a.languages, (function(n, t) {
                            t === u && n != e && (this[n] = l);
                        })), l;
                    },
                    DFS: function e(n, t, r, i) {
                        i = i || {};
                        var l = a.util.objId;
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                t.call(n, o, n[o], r || o);
                                var s = n[o],
                                    u = a.util.type(s);
                                'Object' !== u || i[l(s)] ? 'Array' !== u || i[l(s)] || (i[l(s)] = !0, e(s, t, o, i)) : (i[l(s)] = !0, e(s, t, null, i));
                            }
                    }
                },
                plugins: {},
                highlightAll: function(e, n) {
                    a.highlightAllUnder(document, e, n);
                },
                highlightAllUnder: function(e, n, t) {
                    var r = {
                        callback: t,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    a.hooks.run('before-highlightall', r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), a.hooks.run('before-all-elements-highlight', r);
                    for (var i, l = 0; i = r.elements[l++];) a.highlightElement(i, !0 === n, r.callback);
                },
                highlightElement: function(n, t, r) {
                    var i = a.util.getLanguage(n),
                        l = a.languages[i];
                    a.util.setLanguage(n, i);
                    var o = n.parentElement;
                    o && 'pre' === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
                    var s = {
                        element: n,
                        language: i,
                        grammar: l,
                        code: n.textContent
                    };

                    function u(e) {
                        s.highlightedCode = e, a.hooks.run('before-insert', s), s.element.innerHTML = s.highlightedCode, a.hooks.run('after-highlight', s), a.hooks.run('complete', s), r && r.call(s.element);
                    }
                    if (a.hooks.run('before-sanity-check', s), (o = s.element.parentElement) && 'pre' === o.nodeName.toLowerCase() && !o.hasAttribute('tabindex') && o.setAttribute('tabindex', '0'), !s.code) return a.hooks.run('complete', s), void(r && r.call(s.element));
                    if (a.hooks.run('before-highlight', s), s.grammar)
                        if (t && e.Worker) {
                            var c = new Worker(a.filename);
                            c.onmessage = function(e) {
                                u(e.data);
                            }, c.postMessage(JSON.stringify({
                                language: s.language,
                                code: s.code,
                                immediateClose: !0
                            }));
                        } else u(a.highlight(s.code, s.grammar, s.language));
                    else u(a.util.encode(s.code));
                },
                highlight: function(e, n, t) {
                    var r = {
                        code: e,
                        grammar: n,
                        language: t
                    };
                    if (a.hooks.run('before-tokenize', r), !r.grammar) throw new Error('The language "' + r.language + '" has no grammar.');
                    return r.tokens = a.tokenize(r.code, r.grammar), a.hooks.run('after-tokenize', r), i.stringify(a.util.encode(r.tokens), r.language);
                },
                tokenize: function(e, n) {
                    var t = n.rest;
                    if (t) {
                        for (var r in t) n[r] = t[r];
                        delete n.rest;
                    }
                    var a = new s;
                    return u(a, a.head, e), o(e, a, n, a.head, 0),
                        function(e) {
                            for (var n = [], t = e.head.next; t !== e.tail;) n.push(t.value), t = t.next;
                            return n;
                        }(a);
                },
                hooks: {
                    all: {},
                    add: function(e, n) {
                        var t = a.hooks.all;
                        t[e] = t[e] || [], t[e].push(n);
                    },
                    run: function(e, n) {
                        var t = a.hooks.all[e];
                        if (t && t.length)
                            for (var r, i = 0; r = t[i++];) r(n);
                    }
                },
                Token: i
            };

        function i(e, n, t, r) {
            this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || '').length;
        }

        function l(e, n, t, r) {
            e.lastIndex = n;
            var a = e.exec(t);
            if (a && r && a[1]) {
                var i = a[1].length;
                a.index += i, a[0] = a[0].slice(i);
            }
            return a;
        }

        function o(e, n, t, r, s, g) {
            for (var f in t)
                if (t.hasOwnProperty(f) && t[f]) {
                    var h = t[f];
                    h = Array.isArray(h) ? h : [h];
                    for (var d = 0; d < h.length; ++d) {
                        if (g && g.cause == f + ',' + d) return;
                        var v = h[d],
                            p = v.inside,
                            m = !!v.lookbehind,
                            y = !!v.greedy,
                            k = v.alias;
                        if (y && !v.pattern.global) {
                            var x = v.pattern.toString().match(/[imsuy]*$/)[0];
                            v.pattern = RegExp(v.pattern.source, x + 'g');
                        }
                        for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length, w = w.next) {
                            var E = w.value;
                            if (n.length > e.length) return;
                            if (!(E instanceof i)) {
                                var P, L = 1;
                                if (y) {
                                    if (!(P = l(b, A, e, m)) || P.index >= e.length) break;
                                    var S = P.index,
                                        O = P.index + P[0].length,
                                        j = A;
                                    for (j += w.value.length; S >= j;) j += (w = w.next).value.length;
                                    if (A = j -= w.value.length, w.value instanceof i) continue;
                                    for (var C = w; C !== n.tail && (j < O || 'string' == typeof C.value); C = C.next) L++, j += C.value.length;
                                    L--, E = e.slice(A, j), P.index -= A;
                                } else if (!(P = l(b, 0, E, m))) continue;
                                S = P.index;
                                var N = P[0],
                                    _ = E.slice(0, S),
                                    M = E.slice(S + N.length),
                                    W = A + E.length;
                                g && W > g.reach && (g.reach = W);
                                var z = w.prev;
                                if (_ && (z = u(n, z, _), A += _.length), c(n, z, L), w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N)), M && u(n, w, M), L > 1) {
                                    var I = {
                                        cause: f + ',' + d,
                                        reach: W
                                    };
                                    o(e, n, t, w.prev, A, I), g && I.reach > g.reach && (g.reach = I.reach);
                                }
                            }
                        }
                    }
                }
        }

        function s() {
            var e = {
                    value: null,
                    prev: null,
                    next: null
                },
                n = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = n, this.head = e, this.tail = n, this.length = 0;
        }

        function u(e, n, t) {
            var r = n.next,
                a = {
                    value: t,
                    prev: n,
                    next: r
                };
            return n.next = a, r.prev = a, e.length++, a;
        }

        function c(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
            n.next = r, r.prev = n, e.length -= a;
        }
        if (e.Prism = a, i.stringify = function e(n, t) {
                if ('string' == typeof n) return n;
                if (Array.isArray(n)) {
                    var r = '';
                    return n.forEach((function(n) {
                        r += e(n, t);
                    })), r;
                }
                var i = {
                        type: n.type,
                        content: e(n.content, t),
                        tag: 'span',
                        classes: ['token', n.type],
                        attributes: {},
                        language: t
                    },
                    l = n.alias;
                l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)), a.hooks.run('wrap', i);
                var o = '';
                for (var s in i.attributes) o += ' ' + s + '="' + (i.attributes[s] || '').replace(/"/g, '&quot;') + '"';
                return '<' + i.tag + ' class="' + i.classes.join(' ') + '"' + o + '>' + i.content + '</' + i.tag + '>';
            }, !e.document) return e.addEventListener ? (a.disableWorkerMessageHandler || e.addEventListener('message', (function(n) {
            var t = JSON.parse(n.data),
                r = t.language,
                i = t.code,
                l = t.immediateClose;
            e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close();
        }), !1), a) : a;
        var g = a.util.currentScript();

        function f() {
            a.manual || a.highlightAll();
        }
        if (g && (a.filename = g.src, g.hasAttribute('data-manual') && (a.manual = !0)), !a.manual) {
            var h = document.readyState;
            'loading' === h || 'interactive' === h && g && g.defer ? document.addEventListener('DOMContentLoaded', f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16);
        }
        return a;
    }(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
    },
    prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
    },
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            'internal-subset': {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: !0
            },
            punctuation: /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/i,
            name: /[^\s<>'"]+/
        }
    },
    cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
    },
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            'special-attr': [],
            'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [{
                        pattern: /^=/,
                        alias: 'attr-equals'
                    }, {
                        pattern: /^(\s*)["']|["']$/,
                        lookbehind: !0
                    }]
                }
            },
            punctuation: /\/?>/,
            'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: 'named-entity'
    }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup, Prism.hooks.add('wrap', (function(a) {
    'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
})), Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function(a, e) {
        var s = {};
        s['language-' + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var t = {
            'included-cdata': {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: s
            }
        };
        t['language-' + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e]
        };
        var n = {};
        n[a] = {
            pattern: RegExp('(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(/__/g, (function() {
                return a;
            })), 'i'),
            lookbehind: !0,
            greedy: !0,
            inside: t
        }, Prism.languages.insertBefore('markup', 'cdata', n);
    }
}), Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    value: function(a, e) {
        Prism.languages.markup.tag.inside['special-attr'].push({
            pattern: RegExp('(^|["\'\\s])(?:' + a + ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))', 'i'),
            lookbehind: !0,
            inside: {
                'attr-name': /^[^\s=]+/,
                'attr-value': {
                    pattern: /=[\s\S]+/,
                    inside: {
                        value: {
                            pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                            lookbehind: !0,
                            alias: [e, 'language-' + e],
                            inside: Prism.languages[e]
                        },
                        punctuation: [{
                            pattern: /^=/,
                            alias: 'attr-equals'
                        }, /"|'/]
                    }
                }
            }
        });
    }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend('markup', {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
! function(s) {
    var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: RegExp('@[\\w-](?:[^;{\\s"\']|\\s+(?!\\s)|' + e.source + ')*?(?:;|(?=\\s*\\{))'),
            inside: {
                rule: /^@[\w-]+/,
                'selector-function-argument': {
                    pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: !0,
                    alias: 'selector'
                },
                keyword: {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: !0
                }
            }
        },
        url: {
            pattern: RegExp('\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)', 'i'),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: {
                    pattern: RegExp('^' + e.source + '$'),
                    alias: 'url'
                }
            }
        },
        selector: {
            pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + e.source + ')*(?=\\s*\\{)'),
            lookbehind: !0
        },
        string: {
            pattern: e,
            greedy: !0
        },
        property: {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: !0
        },
        important: /!important\b/i,
        function: {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: !0
        },
        punctuation: /[(){};:,]/
    }, s.languages.css.atrule.inside.rest = s.languages.css;
    var t = s.languages.markup;
    t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'));
}(Prism);
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    'class-name': {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [Prism.languages.clike['class-name'], {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
        pattern: RegExp('(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'),
        lookbehind: !0
    },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
        pattern: RegExp('((?:^|[^$\\w\\xA0-\\uFFFF."\'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))'),
        lookbehind: !0,
        greedy: !0,
        inside: {
            'regex-source': {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: !0,
                alias: 'language-regex',
                inside: Prism.languages.regex
            },
            'regex-delimiter': /^\/|\/$/,
            'regex-flags': /^[a-z]+$/
        }
    },
    'function-variable': {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: 'function'
    },
    parameter: [{
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore('javascript', 'string', {
    hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: 'comment'
    },
    'template-string': {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
            'template-punctuation': {
                pattern: /^`|`$/,
                alias: 'string'
            },
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                lookbehind: !0,
                inside: {
                    'interpolation-punctuation': {
                        pattern: /^\$\{|\}$/,
                        alias: 'punctuation'
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    },
    'string-property': {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: 'property'
    }
}), Prism.languages.insertBefore('javascript', 'operator', {
    'literal-property': {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: 'property'
    }
}), Prism.languages.markup && (Prism.languages.markup.tag.addInlined('script', 'javascript'), Prism.languages.markup.tag.addAttribute('on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)', 'javascript')), Prism.languages.js = Prism.languages.javascript;
Prism.languages.graphql = {
    comment: /#.*/,
    description: {
        pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
        greedy: !0,
        alias: 'string',
        inside: {
            'language-markdown': {
                pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
                lookbehind: !0,
                inside: Prism.languages.markdown
            }
        }
    },
    string: {
        pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
        greedy: !0
    },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    boolean: /\b(?:false|true)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: {
        pattern: /@[a-z_]\w*/i,
        alias: 'function'
    },
    'attr-name': {
        pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
        greedy: !0
    },
    'atom-input': {
        pattern: /\b[A-Z]\w*Input\b/,
        alias: 'class-name'
    },
    scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
    constant: /\b[A-Z][A-Z_\d]*\b/,
    'class-name': {
        pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
        lookbehind: !0
    },
    fragment: {
        pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
        lookbehind: !0,
        alias: 'function'
    },
    'definition-mutation': {
        pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
        lookbehind: !0,
        alias: 'function'
    },
    'definition-query': {
        pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
        lookbehind: !0,
        alias: 'function'
    },
    keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
    operator: /[!=|&]|\.{3}/,
    'property-query': /\w+(?=\s*\()/,
    object: /\w+(?=\s*\{)/,
    punctuation: /[!(){}\[\]:=,]/,
    property: /\w+/
}, Prism.hooks.add('after-tokenize', (function(n) {
    if ('graphql' === n.language)
        for (var t = n.tokens.filter((function(n) {
                return 'string' != typeof n && 'comment' !== n.type && 'scalar' !== n.type;
            })), e = 0; e < t.length;) {
            var a = t[e++];
            if ('keyword' === a.type && 'mutation' === a.content) {
                var r = [];
                if (c(['definition-mutation', 'punctuation']) && '(' === l(1).content) {
                    e += 2;
                    var i = f(/^\($/, /^\)$/);
                    if (-1 === i) continue;
                    for (; e < i; e++) {
                        var o = l(0);
                        'variable' === o.type && (b(o, 'variable-input'), r.push(o.content));
                    }
                    e = i + 1;
                }
                if (c(['punctuation', 'property-query']) && '{' === l(0).content && (e++, b(l(0), 'property-mutation'), r.length > 0)) {
                    var s = f(/^\{$/, /^\}$/);
                    if (-1 === s) continue;
                    for (var u = e; u < s; u++) {
                        var p = t[u];
                        'variable' === p.type && r.indexOf(p.content) >= 0 && b(p, 'variable-input');
                    }
                }
            }
        }

    function l(n) {
        return t[e + n];
    }

    function c(n, t) {
        t = t || 0;
        for (var e = 0; e < n.length; e++) {
            var a = l(e + t);
            if (!a || a.type !== n[e]) return !1;
        }
        return !0;
    }

    function f(n, a) {
        for (var r = 1, i = e; i < t.length; i++) {
            var o = t[i],
                s = o.content;
            if ('punctuation' === o.type && 'string' == typeof s)
                if (n.test(s)) r++;
                else if (a.test(s) && 0 == --r) return i;
        }
        return -1;
    }

    function b(n, t) {
        var e = n.alias;
        e ? Array.isArray(e) || (n.alias = e = [e]) : n.alias = e = [], e.push(t);
    }
}));
! function(n) {
    function e(n) {
        return n = n.replace(/<inner>/g, (function() {
            return '(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))';
        })), RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + n + ')');
    }
    var t = '(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+',
        a = '\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))'.replace(/__/g, (function() {
            return t;
        })),
        i = '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)';
    n.languages.markdown = n.languages.extend('markup', {}), n.languages.insertBefore('markdown', 'prolog', {
        'front-matter-block': {
            pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                punctuation: /^---|---$/,
                'front-matter': {
                    pattern: /\S+(?:\s+\S+)*/,
                    alias: ['yaml', 'language-yaml'],
                    inside: n.languages.yaml
                }
            }
        },
        blockquote: {
            pattern: /^>(?:[\t ]*>)*/m,
            alias: 'punctuation'
        },
        table: {
            pattern: RegExp('^' + a + i + '(?:' + a + ')*', 'm'),
            inside: {
                'table-data-rows': {
                    pattern: RegExp('^(' + a + i + ')(?:' + a + ')*$'),
                    lookbehind: !0,
                    inside: {
                        'table-data': {
                            pattern: RegExp(t),
                            inside: n.languages.markdown
                        },
                        punctuation: /\|/
                    }
                },
                'table-line': {
                    pattern: RegExp('^(' + a + ')' + i + '$'),
                    lookbehind: !0,
                    inside: {
                        punctuation: /\||:?-{3,}:?/
                    }
                },
                'table-header-row': {
                    pattern: RegExp('^' + a + '$'),
                    inside: {
                        'table-header': {
                            pattern: RegExp(t),
                            alias: 'important',
                            inside: n.languages.markdown
                        },
                        punctuation: /\|/
                    }
                }
            }
        },
        code: [{
            pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: !0,
            alias: 'keyword'
        }, {
            pattern: /^```[\s\S]*?^```$/m,
            greedy: !0,
            inside: {
                'code-block': {
                    pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                    lookbehind: !0
                },
                'code-language': {
                    pattern: /^(```).+/,
                    lookbehind: !0
                },
                punctuation: /```/
            }
        }],
        title: [{
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: 'important',
            inside: {
                punctuation: /==+$|--+$/
            }
        }, {
            pattern: /(^\s*)#.+/m,
            lookbehind: !0,
            alias: 'important',
            inside: {
                punctuation: /^#+|#+$/
            }
        }],
        hr: {
            pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: !0,
            alias: 'punctuation'
        },
        list: {
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: !0,
            alias: 'punctuation'
        },
        'url-reference': {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
                variable: {
                    pattern: /^(!?\[)[^\]]+/,
                    lookbehind: !0
                },
                string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                punctuation: /^[\[\]!:]|[<>]/
            },
            alias: 'url'
        },
        bold: {
            pattern: e('\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*'),
            lookbehind: !0,
            greedy: !0,
            inside: {
                content: {
                    pattern: /(^..)[\s\S]+(?=..$)/,
                    lookbehind: !0,
                    inside: {}
                },
                punctuation: /\*\*|__/
            }
        },
        italic: {
            pattern: e('\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*'),
            lookbehind: !0,
            greedy: !0,
            inside: {
                content: {
                    pattern: /(^.)[\s\S]+(?=.$)/,
                    lookbehind: !0,
                    inside: {}
                },
                punctuation: /[*_]/
            }
        },
        strike: {
            pattern: e('(~~?)(?:(?!~)<inner>)+\\2'),
            lookbehind: !0,
            greedy: !0,
            inside: {
                content: {
                    pattern: /(^~~?)[\s\S]+(?=\1$)/,
                    lookbehind: !0,
                    inside: {}
                },
                punctuation: /~~?/
            }
        },
        'code-snippet': {
            pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
            lookbehind: !0,
            greedy: !0,
            alias: ['code', 'keyword']
        },
        url: {
            pattern: e('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'),
            lookbehind: !0,
            greedy: !0,
            inside: {
                operator: /^!/,
                content: {
                    pattern: /(^\[)[^\]]+(?=\])/,
                    lookbehind: !0,
                    inside: {}
                },
                variable: {
                    pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                    lookbehind: !0
                },
                url: {
                    pattern: /(^\]\()[^\s)]+/,
                    lookbehind: !0
                },
                string: {
                    pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                    lookbehind: !0
                }
            }
        }
    }), ['url', 'bold', 'italic', 'strike'].forEach((function(e) {
        ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach((function(t) {
            e !== t && (n.languages.markdown[e].inside.content.inside[t] = n.languages.markdown[t]);
        }));
    })), n.hooks.add('after-tokenize', (function(n) {
        'markdown' !== n.language && 'md' !== n.language || function n(e) {
            if (e && 'string' != typeof e)
                for (var t = 0, a = e.length; t < a; t++) {
                    var i = e[t];
                    if ('code' === i.type) {
                        var r = i.content[1],
                            o = i.content[3];
                        if (r && o && 'code-language' === r.type && 'code-block' === o.type && 'string' == typeof r.content) {
                            var l = r.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp'),
                                s = 'language-' + (l = (/[a-z][\w-]*/i.exec(l) || [''])[0].toLowerCase());
                            o.alias ? 'string' == typeof o.alias ? o.alias = [o.alias, s] : o.alias.push(s) : o.alias = [s];
                        }
                    } else n(i.content);
                }
        }(n.tokens);
    })), n.hooks.add('wrap', (function(e) {
        if ('code-block' === e.type) {
            for (var t = '', a = 0, i = e.classes.length; a < i; a++) {
                var s = e.classes[a],
                    d = /language-(.+)/.exec(s);
                if (d) {
                    t = d[1];
                    break;
                }
            }
            var p = n.languages[t];
            if (p) e.content = n.highlight(e.content.replace(r, '').replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, (function(n, e) {
                var t;
                return '#' === (e = e.toLowerCase())[0] ? (t = 'x' === e[1] ? parseInt(e.slice(2), 16) : Number(e.slice(1)), l(t)) : o[e] || n;
            })), p, t);
            else if (t && 'none' !== t && n.plugins.autoloader) {
                var u = 'md-' + (new Date).valueOf() + '-' + Math.floor(1e16 * Math.random());
                e.attributes.id = u, n.plugins.autoloader.loadLanguages(t, (function() {
                    var e = document.getElementById(u);
                    e && (e.innerHTML = n.highlight(e.textContent, n.languages[t], t));
                }));
            }
        }
    }));
    var r = RegExp(n.languages.markup.tag.pattern.source, 'gi'),
        o = {
            amp: '&',
            lt: '<',
            gt: '>',
            quot: '"'
        },
        l = String.fromCodePoint || String.fromCharCode;
    n.languages.md = n.languages.markdown;
}(Prism);
! function(e) {
    function n(e, n) {
        return '___' + e.toUpperCase() + n + '___';
    }
    Object.defineProperties(e.languages['markup-templating'] = {}, {
        buildPlaceholders: {
            value: function(t, a, r, o) {
                if (t.language === a) {
                    var c = t.tokenStack = [];
                    t.code = t.code.replace(r, (function(e) {
                        if ('function' == typeof o && !o(e)) return e;
                        for (var r, i = c.length; - 1 !== t.code.indexOf(r = n(a, i));) ++i;
                        return c[i] = e, r;
                    })), t.grammar = e.languages.markup;
                }
            }
        },
        tokenizePlaceholders: {
            value: function(t, a) {
                if (t.language === a && t.tokenStack) {
                    t.grammar = e.languages[a];
                    var r = 0,
                        o = Object.keys(t.tokenStack);
                    ! function c(i) {
                        for (var u = 0; u < i.length && !(r >= o.length); u++) {
                            var g = i[u];
                            if ('string' == typeof g || g.content && 'string' == typeof g.content) {
                                var l = o[r],
                                    s = t.tokenStack[l],
                                    f = 'string' == typeof g ? g : g.content,
                                    p = n(a, l),
                                    k = f.indexOf(p);
                                if (k > -1) {
                                    ++r;
                                    var m = f.substring(0, k),
                                        d = new e.Token(a, e.tokenize(s, t.grammar), 'language-' + a, s),
                                        h = f.substring(k + p.length),
                                        v = [];
                                    m && v.push.apply(v, c([m])), v.push(d), h && v.push.apply(v, c([h])), 'string' == typeof g ? i.splice.apply(i, [u, 1].concat(v)) : g.content = v;
                                }
                            } else g.content && c(g.content);
                        }
                        return i;
                    }(t.tokens);
                }
            }
        }
    });
}(Prism);
! function(e) {
    var a = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
        t = [{
            pattern: /\b(?:false|true)\b/i,
            alias: 'boolean'
        }, {
            pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
            greedy: !0,
            lookbehind: !0
        }, /\b(?:null)\b/i, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/],
        i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
        s = /[{}\[\](),:;]/;
    e.languages.php = {
        delimiter: {
            pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
            alias: 'important'
        },
        comment: a,
        variable: /\$+(?:\w+\b|(?=\{))/,
        package: {
            pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        },
        'class-name-definition': {
            pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
            lookbehind: !0,
            alias: 'class-name'
        },
        'function-definition': {
            pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
            lookbehind: !0,
            alias: 'function'
        },
        keyword: [{
            pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
            alias: 'type-casting',
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
            alias: 'type-hint',
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
            alias: 'return-type',
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
            alias: 'type-declaration',
            greedy: !0
        }, {
            pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
            alias: 'type-declaration',
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /\b(?:parent|self|static)(?=\s*::)/i,
            alias: 'static-context',
            greedy: !0
        }, {
            pattern: /(\byield\s+)from\b/i,
            lookbehind: !0
        }, /\bclass\b/i, {
            pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
            lookbehind: !0
        }],
        'argument-name': {
            pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
            lookbehind: !0
        },
        'class-name': [{
            pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
            greedy: !0
        }, {
            pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
            alias: 'class-name-fully-qualified',
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
            alias: 'class-name-fully-qualified',
            greedy: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            alias: 'class-name-fully-qualified',
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /\b[a-z_]\w*(?=\s*\$)/i,
            alias: 'type-declaration',
            greedy: !0
        }, {
            pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
            alias: ['class-name-fully-qualified', 'type-declaration'],
            greedy: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /\b[a-z_]\w*(?=\s*::)/i,
            alias: 'static-context',
            greedy: !0
        }, {
            pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
            alias: ['class-name-fully-qualified', 'static-context'],
            greedy: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
            alias: 'type-hint',
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
            alias: ['class-name-fully-qualified', 'type-hint'],
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
            alias: 'return-type',
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            alias: ['class-name-fully-qualified', 'return-type'],
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }],
        constant: t,
        function: {
            pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        },
        property: {
            pattern: /(->\s*)\w+/,
            lookbehind: !0
        },
        number: i,
        operator: n,
        punctuation: s
    };
    var l = {
            pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
            lookbehind: !0,
            inside: e.languages.php
        },
        r = [{
            pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
            alias: 'nowdoc-string',
            greedy: !0,
            inside: {
                delimiter: {
                    pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                    alias: 'symbol',
                    inside: {
                        punctuation: /^<<<'?|[';]$/
                    }
                }
            }
        }, {
            pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
            alias: 'heredoc-string',
            greedy: !0,
            inside: {
                delimiter: {
                    pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                    alias: 'symbol',
                    inside: {
                        punctuation: /^<<<"?|[";]$/
                    }
                },
                interpolation: l
            }
        }, {
            pattern: /`(?:\\[\s\S]|[^\\`])*`/,
            alias: 'backtick-quoted-string',
            greedy: !0
        }, {
            pattern: /'(?:\\[\s\S]|[^\\'])*'/,
            alias: 'single-quoted-string',
            greedy: !0
        }, {
            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
            alias: 'double-quoted-string',
            greedy: !0,
            inside: {
                interpolation: l
            }
        }];
    e.languages.insertBefore('php', 'variable', {
        string: r,
        attribute: {
            pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
            greedy: !0,
            inside: {
                'attribute-content': {
                    pattern: /^(#\[)[\s\S]+(?=\]$)/,
                    lookbehind: !0,
                    inside: {
                        comment: a,
                        string: r,
                        'attribute-class-name': [{
                            pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                            alias: 'class-name',
                            greedy: !0,
                            lookbehind: !0
                        }, {
                            pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                            alias: ['class-name', 'class-name-fully-qualified'],
                            greedy: !0,
                            lookbehind: !0,
                            inside: {
                                punctuation: /\\/
                            }
                        }],
                        constant: t,
                        number: i,
                        operator: n,
                        punctuation: s
                    }
                },
                delimiter: {
                    pattern: /^#\[|\]$/,
                    alias: 'punctuation'
                }
            }
        }
    }), e.hooks.add('before-tokenize', (function(a) {
        /<\?/.test(a.code) && e.languages['markup-templating'].buildPlaceholders(a, 'php', /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g);
    })), e.hooks.add('after-tokenize', (function(a) {
        e.languages['markup-templating'].tokenizePlaceholders(a, 'php');
    }));
}(Prism);
! function(e) {
    e.languages.pug = {
        comment: {
            pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ].+)*/m,
            lookbehind: !0
        },
        'multiline-script': {
            pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0,
            inside: e.languages.javascript
        },
        filter: {
            pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0,
            inside: {
                'filter-name': {
                    pattern: /^:[\w-]+/,
                    alias: 'variable'
                },
                text: /\S[\s\S]*/
            }
        },
        'multiline-plain-text': {
            pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0
        },
        markup: {
            pattern: /(^[\t ]*)<.+/m,
            lookbehind: !0,
            inside: e.languages.markup
        },
        doctype: {
            pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/,
            lookbehind: !0
        },
        'flow-control': {
            pattern: /(^[\t ]*)(?:case|default|each|else|if|unless|when|while)\b(?: .+)?/m,
            lookbehind: !0,
            inside: {
                each: {
                    pattern: /^each .+? in\b/,
                    inside: {
                        keyword: /\b(?:each|in)\b/,
                        punctuation: /,/
                    }
                },
                branch: {
                    pattern: /^(?:case|default|else|if|unless|when|while)\b/,
                    alias: 'keyword'
                },
                rest: e.languages.javascript
            }
        },
        keyword: {
            pattern: /(^[\t ]*)(?:append|block|extends|include|prepend)\b.+/m,
            lookbehind: !0
        },
        mixin: [{
            pattern: /(^[\t ]*)mixin .+/m,
            lookbehind: !0,
            inside: {
                keyword: /^mixin/,
                function: /\w+(?=\s*\(|\s*$)/,
                punctuation: /[(),.]/
            }
        }, {
            pattern: /(^[\t ]*)\+.+/m,
            lookbehind: !0,
            inside: {
                name: {
                    pattern: /^\+\w+/,
                    alias: 'function'
                },
                rest: e.languages.javascript
            }
        }],
        script: {
            pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]).+/m,
            lookbehind: !0,
            inside: e.languages.javascript
        },
        'plain-text': {
            pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]).+/m,
            lookbehind: !0
        },
        tag: {
            pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
            lookbehind: !0,
            inside: {
                attributes: [{
                    pattern: /&[^(]+\([^)]+\)/,
                    inside: e.languages.javascript
                }, {
                    pattern: /\([^)]+\)/,
                    inside: {
                        'attr-value': {
                            pattern: /(=\s*(?!\s))(?:\{[^}]*\}|[^,)\r\n]+)/,
                            lookbehind: !0,
                            inside: e.languages.javascript
                        },
                        'attr-name': /[\w-]+(?=\s*!?=|\s*[,)])/,
                        punctuation: /[!=(),]+/
                    }
                }],
                punctuation: /:/,
                'attr-id': /#[\w\-]+/,
                'attr-class': /\.[\w\-]+/
            }
        },
        code: [{
            pattern: /(^[\t ]*(?:-|!?=)).+/m,
            lookbehind: !0,
            inside: e.languages.javascript
        }],
        punctuation: /[.\-!=|]+/
    };
    for (var t = [{
            filter: 'atpl',
            language: 'twig'
        }, {
            filter: 'coffee',
            language: 'coffeescript'
        }, 'ejs', 'handlebars', 'less', 'livescript', 'markdown', {
            filter: 'sass',
            language: 'scss'
        }, 'stylus'], n = {}, a = 0, i = t.length; a < i; a++) {
        var r = t[a];
        r = 'string' == typeof r ? {
            filter: r,
            language: r
        } : r, e.languages[r.language] && (n['filter-' + r.filter] = {
            pattern: RegExp('(^([\t ]*)):<filter_name>(?:(?:\r?\n|\r(?!\n))(?:\\2[\t ].+|\\s*?(?=\r?\n|\r)))+'.replace('<filter_name>', (function() {
                return r.filter;
            })), 'm'),
            lookbehind: !0,
            inside: {
                'filter-name': {
                    pattern: /^:[\w-]+/,
                    alias: 'variable'
                },
                text: {
                    pattern: /\S[\s\S]*/,
                    alias: [r.language, 'language-' + r.language],
                    inside: e.languages[r.language]
                }
            }
        });
    }
    e.languages.insertBefore('pug', 'filter', n);
}(Prism);
Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0,
        greedy: !0
    },
    'string-interpolation': {
        pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
                lookbehind: !0,
                inside: {
                    'format-spec': {
                        pattern: /(:)[^:(){}]+(?=\}$)/,
                        lookbehind: !0
                    },
                    'conversion-option': {
                        pattern: /![sra](?=[:}]$)/,
                        alias: 'punctuation'
                    },
                    rest: null
                }
            },
            string: /[\s\S]+/
        }
    },
    'triple-quoted-string': {
        pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: 'string'
    },
    string: {
        pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0
    },
    function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0
    },
    'class-name': {
        pattern: /(\bclass\s+)\w+/i,
        lookbehind: !0
    },
    decorator: {
        pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
        lookbehind: !0,
        alias: ['annotation', 'punctuation'],
        inside: {
            punctuation: /\./
        }
    },
    keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:False|None|True)\b/,
    number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/
}, Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python;
! function(a) {
    var e = {
            pattern: /\\[\\(){}[\]^$+*?|.]/,
            alias: 'escape'
        },
        n = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/,
        t = '(?:[^\\\\-]|' + n.source + ')',
        s = RegExp(t + '-' + t),
        i = {
            pattern: /(<|')[^<>']+(?=[>']$)/,
            lookbehind: !0,
            alias: 'variable'
        };
    a.languages.regex = {
        'char-class': {
            pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
            lookbehind: !0,
            inside: {
                'char-class-negation': {
                    pattern: /(^\[)\^/,
                    lookbehind: !0,
                    alias: 'operator'
                },
                'char-class-punctuation': {
                    pattern: /^\[|\]$/,
                    alias: 'punctuation'
                },
                range: {
                    pattern: s,
                    inside: {
                        escape: n,
                        'range-punctuation': {
                            pattern: /-/,
                            alias: 'operator'
                        }
                    }
                },
                'special-escape': e,
                'char-set': {
                    pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
                    alias: 'class-name'
                },
                escape: n
            }
        },
        'special-escape': e,
        'char-set': {
            pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
            alias: 'class-name'
        },
        backreference: [{
            pattern: /\\(?![123][0-7]{2})[1-9]/,
            alias: 'keyword'
        }, {
            pattern: /\\k<[^<>']+>/,
            alias: 'keyword',
            inside: {
                'group-name': i
            }
        }],
        anchor: {
            pattern: /[$^]|\\[ABbGZz]/,
            alias: 'function'
        },
        escape: n,
        group: [{
            pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
            alias: 'punctuation',
            inside: {
                'group-name': i
            }
        }, {
            pattern: /\)/,
            alias: 'punctuation'
        }],
        quantifier: {
            pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
            alias: 'number'
        },
        alternation: {
            pattern: /\|/,
            alias: 'keyword'
        }
    };
}(Prism);
! function(e) {
    var n = /[*&][^\s[\]{},]+/,
        r = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
        t = '(?:' + r.source + '(?:[ \t]+' + n.source + ')?|' + n.source + '(?:[ \t]+' + r.source + ')?)',
        a = '(?:[^\\s\\x00-\\x08\\x0e-\\x1f!"#%&\'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*'.replace(/<PLAIN>/g, (function() {
            return '[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]';
        })),
        d = '"(?:[^"\\\\\r\n]|\\\\.)*"|\'(?:[^\'\\\\\r\n]|\\\\.)*\'';

    function o(e, n) {
        n = (n || '').replace(/m/g, '') + 'm';
        var r = '([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\\]|\\}|(?:[\r\n]\\s*)?#))'.replace(/<<prop>>/g, (function() {
            return t;
        })).replace(/<<value>>/g, (function() {
            return e;
        }));
        return RegExp(r, n);
    }
    e.languages.yaml = {
        scalar: {
            pattern: RegExp('([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)'.replace(/<<prop>>/g, (function() {
                return t;
            }))),
            lookbehind: !0,
            alias: 'string'
        },
        comment: /#.*/,
        key: {
            pattern: RegExp('((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)'.replace(/<<prop>>/g, (function() {
                return t;
            })).replace(/<<key>>/g, (function() {
                return '(?:' + a + '|' + d + ')';
            }))),
            lookbehind: !0,
            greedy: !0,
            alias: 'atrule'
        },
        directive: {
            pattern: /(^[ \t]*)%.+/m,
            lookbehind: !0,
            alias: 'important'
        },
        datetime: {
            pattern: o('\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?'),
            lookbehind: !0,
            alias: 'number'
        },
        boolean: {
            pattern: o('false|true', 'i'),
            lookbehind: !0,
            alias: 'important'
        },
        null: {
            pattern: o('null|~', 'i'),
            lookbehind: !0,
            alias: 'important'
        },
        string: {
            pattern: o(d),
            lookbehind: !0,
            greedy: !0
        },
        number: {
            pattern: o('[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)', 'i'),
            lookbehind: !0
        },
        tag: r,
        important: n,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
    }, e.languages.yml = e.languages.yaml;
}(Prism);
! function() {
    if ('undefined' != typeof Prism) {
        var i = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&!$'()*,;@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
            n = /\b\S+@[\w.]+[a-z]{2}/,
            t = /\[([^\]]+)\]\(([^)]+)\)/,
            e = ['comment', 'url', 'attr-value', 'string'];
        Prism.plugins.autolinker = {
            processGrammar: function(r) {
                r && !r['url-link'] && (Prism.languages.DFS(r, (function(r, a, l) {
                    e.indexOf(l) > -1 && !Array.isArray(a) && (a.pattern || (a = this[r] = {
                        pattern: a
                    }), a.inside = a.inside || {}, 'comment' == l && (a.inside['md-link'] = t), 'attr-value' == l ? Prism.languages.insertBefore('inside', 'punctuation', {
                        'url-link': i
                    }, a) : a.inside['url-link'] = i, a.inside['email-link'] = n);
                })), r['url-link'] = i, r['email-link'] = n);
            }
        }, Prism.hooks.add('before-highlight', (function(i) {
            Prism.plugins.autolinker.processGrammar(i.grammar);
        })), Prism.hooks.add('wrap', (function(i) {
            if (/-link$/.test(i.type)) {
                i.tag = 'a';
                var n = i.content;
                if ('email-link' == i.type && 0 != n.indexOf('mailto:')) n = 'mailto:' + n;
                else if ('md-link' == i.type) {
                    var e = i.content.match(t);
                    n = e[2], i.content = e[1];
                }
                i.attributes.href = n;
                try {
                    i.content = decodeURIComponent(i.content);
                } catch (i) {}
            }
        }));
    }
}();
! function() {
    if ('undefined' != typeof Prism && 'undefined' != typeof document) {
        var e = [],
            t = {},
            n = function() {};
        Prism.plugins.toolbar = {};
        var a = Prism.plugins.toolbar.registerButton = function(n, a) {
                var r;
                r = 'function' == typeof a ? a : function(e) {
                    var t;
                    return 'function' == typeof a.onClick ? ((t = document.createElement('button')).type = 'button', t.addEventListener('click', (function() {
                        a.onClick.call(this, e);
                    }))) : 'string' == typeof a.url ? (t = document.createElement('a')).href = a.url : t = document.createElement('span'), a.className && t.classList.add(a.className), t.textContent = a.text, t;
                }, n in t ? console.warn('There is a button with the key "' + n + '" registered already.') : e.push(t[n] = r);
            },
            r = Prism.plugins.toolbar.hook = function(a) {
                var r = a.element.parentNode;
                if (r && /pre/i.test(r.nodeName) && !r.parentNode.classList.contains('code-toolbar')) {
                    var o = document.createElement('div');
                    o.classList.add('code-toolbar'), r.parentNode.insertBefore(o, r), o.appendChild(r);
                    var i = document.createElement('div');
                    i.classList.add('toolbar');
                    var l = e,
                        d = function(e) {
                            for (; e;) {
                                var t = e.getAttribute('data-toolbar-order');
                                if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                                e = e.parentElement;
                            }
                        }(a.element);
                    d && (l = d.map((function(e) {
                        return t[e] || n;
                    }))), l.forEach((function(e) {
                        var t = e(a);
                        if (t) {
                            var n = document.createElement('div');
                            n.classList.add('toolbar-item'), n.appendChild(t), i.appendChild(n);
                        }
                    })), o.appendChild(i);
                }
            };
        a('label', (function(e) {
            var t = e.element.parentNode;
            if (t && /pre/i.test(t.nodeName) && t.hasAttribute('data-label')) {
                var n, a, r = t.getAttribute('data-label');
                try {
                    a = document.querySelector('template#' + r);
                } catch (e) {}
                return a ? n = a.content : (t.hasAttribute('data-url') ? (n = document.createElement('a')).href = t.getAttribute('data-url') : n = document.createElement('span'), n.textContent = r), n;
            }
        })), Prism.hooks.add('complete', r);
    }
}();
! function() {
    if ('undefined' != typeof Prism && 'undefined' != typeof document)
        if (Prism.plugins.toolbar) {
            var e = {
                none: 'Plain text',
                plain: 'Plain text',
                plaintext: 'Plain text',
                text: 'Plain text',
                txt: 'Plain text',
                html: 'HTML',
                xml: 'XML',
                svg: 'SVG',
                mathml: 'MathML',
                ssml: 'SSML',
                rss: 'RSS',
                css: 'CSS',
                clike: 'C-like',
                js: 'JavaScript',
                abap: 'ABAP',
                abnf: 'ABNF',
                al: 'AL',
                antlr4: 'ANTLR4',
                g4: 'ANTLR4',
                apacheconf: 'Apache Configuration',
                apl: 'APL',
                aql: 'AQL',
                ino: 'Arduino',
                arff: 'ARFF',
                armasm: 'ARM Assembly',
                'arm-asm': 'ARM Assembly',
                art: 'Arturo',
                asciidoc: 'AsciiDoc',
                adoc: 'AsciiDoc',
                aspnet: 'ASP.NET (C#)',
                asm6502: '6502 Assembly',
                asmatmel: 'Atmel AVR Assembly',
                autohotkey: 'AutoHotkey',
                autoit: 'AutoIt',
                avisynth: 'AviSynth',
                avs: 'AviSynth',
                'avro-idl': 'Avro IDL',
                avdl: 'Avro IDL',
                awk: 'AWK',
                gawk: 'GAWK',
                basic: 'BASIC',
                bbcode: 'BBcode',
                bnf: 'BNF',
                rbnf: 'RBNF',
                bsl: 'BSL (1C:Enterprise)',
                oscript: 'OneScript',
                csharp: 'C#',
                cs: 'C#',
                dotnet: 'C#',
                cpp: 'C++',
                cfscript: 'CFScript',
                cfc: 'CFScript',
                cil: 'CIL',
                cmake: 'CMake',
                cobol: 'COBOL',
                coffee: 'CoffeeScript',
                conc: 'Concurnas',
                csp: 'Content-Security-Policy',
                'css-extras': 'CSS Extras',
                csv: 'CSV',
                cue: 'CUE',
                dataweave: 'DataWeave',
                dax: 'DAX',
                django: 'Django/Jinja2',
                jinja2: 'Django/Jinja2',
                'dns-zone-file': 'DNS zone file',
                'dns-zone': 'DNS zone file',
                dockerfile: 'Docker',
                dot: 'DOT (Graphviz)',
                gv: 'DOT (Graphviz)',
                ebnf: 'EBNF',
                editorconfig: 'EditorConfig',
                ejs: 'EJS',
                etlua: 'Embedded Lua templating',
                erb: 'ERB',
                'excel-formula': 'Excel Formula',
                xlsx: 'Excel Formula',
                xls: 'Excel Formula',
                fsharp: 'F#',
                'firestore-security-rules': 'Firestore security rules',
                ftl: 'FreeMarker Template Language',
                gml: 'GameMaker Language',
                gamemakerlanguage: 'GameMaker Language',
                gap: 'GAP (CAS)',
                gcode: 'G-code',
                gdscript: 'GDScript',
                gedcom: 'GEDCOM',
                gettext: 'gettext',
                po: 'gettext',
                glsl: 'GLSL',
                gn: 'GN',
                gni: 'GN',
                'linker-script': 'GNU Linker Script',
                ld: 'GNU Linker Script',
                'go-module': 'Go module',
                'go-mod': 'Go module',
                graphql: 'GraphQL',
                hbs: 'Handlebars',
                hs: 'Haskell',
                hcl: 'HCL',
                hlsl: 'HLSL',
                http: 'HTTP',
                hpkp: 'HTTP Public-Key-Pins',
                hsts: 'HTTP Strict-Transport-Security',
                ichigojam: 'IchigoJam',
                'icu-message-format': 'ICU Message Format',
                idr: 'Idris',
                ignore: '.ignore',
                gitignore: '.gitignore',
                hgignore: '.hgignore',
                npmignore: '.npmignore',
                inform7: 'Inform 7',
                javadoc: 'JavaDoc',
                javadoclike: 'JavaDoc-like',
                javastacktrace: 'Java stack trace',
                jq: 'JQ',
                jsdoc: 'JSDoc',
                'js-extras': 'JS Extras',
                json: 'JSON',
                webmanifest: 'Web App Manifest',
                json5: 'JSON5',
                jsonp: 'JSONP',
                jsstacktrace: 'JS stack trace',
                'js-templates': 'JS Templates',
                keepalived: 'Keepalived Configure',
                kts: 'Kotlin Script',
                kt: 'Kotlin',
                kumir: 'KuMir (КуМир)',
                kum: 'KuMir (КуМир)',
                latex: 'LaTeX',
                tex: 'TeX',
                context: 'ConTeXt',
                lilypond: 'LilyPond',
                ly: 'LilyPond',
                emacs: 'Lisp',
                elisp: 'Lisp',
                'emacs-lisp': 'Lisp',
                llvm: 'LLVM IR',
                log: 'Log file',
                lolcode: 'LOLCODE',
                magma: 'Magma (CAS)',
                md: 'Markdown',
                'markup-templating': 'Markup templating',
                matlab: 'MATLAB',
                maxscript: 'MAXScript',
                mel: 'MEL',
                mongodb: 'MongoDB',
                moon: 'MoonScript',
                n1ql: 'N1QL',
                n4js: 'N4JS',
                n4jsd: 'N4JS',
                'nand2tetris-hdl': 'Nand To Tetris HDL',
                naniscript: 'Naninovel Script',
                nani: 'Naninovel Script',
                nasm: 'NASM',
                neon: 'NEON',
                nginx: 'nginx',
                nsis: 'NSIS',
                objectivec: 'Objective-C',
                objc: 'Objective-C',
                ocaml: 'OCaml',
                opencl: 'OpenCL',
                openqasm: 'OpenQasm',
                qasm: 'OpenQasm',
                parigp: 'PARI/GP',
                objectpascal: 'Object Pascal',
                psl: 'PATROL Scripting Language',
                pcaxis: 'PC-Axis',
                px: 'PC-Axis',
                peoplecode: 'PeopleCode',
                pcode: 'PeopleCode',
                php: 'PHP',
                phpdoc: 'PHPDoc',
                'php-extras': 'PHP Extras',
                'plant-uml': 'PlantUML',
                plantuml: 'PlantUML',
                plsql: 'PL/SQL',
                powerquery: 'PowerQuery',
                pq: 'PowerQuery',
                mscript: 'PowerQuery',
                powershell: 'PowerShell',
                promql: 'PromQL',
                properties: '.properties',
                protobuf: 'Protocol Buffers',
                purebasic: 'PureBasic',
                pbfasm: 'PureBasic',
                purs: 'PureScript',
                py: 'Python',
                qsharp: 'Q#',
                qs: 'Q#',
                q: 'Q (kdb+ database)',
                qml: 'QML',
                rkt: 'Racket',
                cshtml: 'Razor C#',
                razor: 'Razor C#',
                jsx: 'React JSX',
                tsx: 'React TSX',
                renpy: 'Ren\'py',
                rpy: 'Ren\'py',
                res: 'ReScript',
                rest: 'reST (reStructuredText)',
                robotframework: 'Robot Framework',
                robot: 'Robot Framework',
                rb: 'Ruby',
                sas: 'SAS',
                sass: 'Sass (Sass)',
                scss: 'Sass (Scss)',
                'shell-session': 'Shell session',
                'sh-session': 'Shell session',
                shellsession: 'Shell session',
                sml: 'SML',
                smlnj: 'SML/NJ',
                solidity: 'Solidity (Ethereum)',
                sol: 'Solidity (Ethereum)',
                'solution-file': 'Solution file',
                sln: 'Solution file',
                soy: 'Soy (Closure Template)',
                sparql: 'SPARQL',
                rq: 'SPARQL',
                'splunk-spl': 'Splunk SPL',
                sqf: 'SQF: Status Quo Function (Arma 3)',
                sql: 'SQL',
                stata: 'Stata Ado',
                iecst: 'Structured Text (IEC 61131-3)',
                supercollider: 'SuperCollider',
                sclang: 'SuperCollider',
                systemd: 'Systemd configuration file',
                't4-templating': 'T4 templating',
                't4-cs': 'T4 Text Templates (C#)',
                t4: 'T4 Text Templates (C#)',
                't4-vb': 'T4 Text Templates (VB)',
                tap: 'TAP',
                tt2: 'Template Toolkit 2',
                toml: 'TOML',
                trickle: 'trickle',
                troy: 'troy',
                trig: 'TriG',
                ts: 'TypeScript',
                tsconfig: 'TSConfig',
                uscript: 'UnrealScript',
                uc: 'UnrealScript',
                uorazor: 'UO Razor Script',
                uri: 'URI',
                url: 'URL',
                vbnet: 'VB.Net',
                vhdl: 'VHDL',
                vim: 'vim',
                'visual-basic': 'Visual Basic',
                vba: 'VBA',
                vb: 'Visual Basic',
                wasm: 'WebAssembly',
                'web-idl': 'Web IDL',
                webidl: 'Web IDL',
                wgsl: 'WGSL',
                wiki: 'Wiki markup',
                wolfram: 'Wolfram language',
                nb: 'Mathematica Notebook',
                wl: 'Wolfram language',
                xeoracube: 'XeoraCube',
                'xml-doc': 'XML doc (.net)',
                xojo: 'Xojo (REALbasic)',
                xquery: 'XQuery',
                yaml: 'YAML',
                yml: 'YAML',
                yang: 'YANG'
            };
            Prism.plugins.toolbar.registerButton('show-language', (function(a) {
                var t = a.element.parentNode;
                if (t && /pre/i.test(t.nodeName)) {
                    var o, s = t.getAttribute('data-language') || e[a.language] || ((o = a.language) ? (o.substring(0, 1).toUpperCase() + o.substring(1)).replace(/s(?=cript)/, 'S') : o);
                    if (s) {
                        var r = document.createElement('span');
                        return r.textContent = s, r;
                    }
                }
            }));
        } else console.warn('Show Languages plugin loaded before Toolbar plugin.');
}();
'undefined' != typeof Prism && Prism.hooks.add('wrap', (function(e) {
    'keyword' === e.type && e.classes.push('keyword-' + e.content);
}));
! function() {
    function t(t) {
        var e = document.createElement('textarea');
        e.value = t.getText(), e.style.top = '0', e.style.left = '0', e.style.position = 'fixed', document.body.appendChild(e), e.focus(), e.select();
        try {
            var o = document.execCommand('copy');
            setTimeout((function() {
                o ? t.success() : t.error();
            }), 1);
        } catch (e) {
            setTimeout((function() {
                t.error(e);
            }), 1);
        }
        document.body.removeChild(e);
    }
    'undefined' != typeof Prism && 'undefined' != typeof document && (Prism.plugins.toolbar ? Prism.plugins.toolbar.registerButton('copy-to-clipboard', (function(e) {
        var o = e.element,
            n = function(t) {
                var e = {
                    copy: 'Copy',
                    'copy-error': 'Press Ctrl+C to copy',
                    'copy-success': 'Copied!',
                    'copy-timeout': 5e3
                };
                for (var o in e) {
                    for (var n = 'data-prismjs-' + o, c = t; c && !c.hasAttribute(n);) c = c.parentElement;
                    c && (e[o] = c.getAttribute(n));
                }
                return e;
            }(o),
            c = document.createElement('button');
        c.className = 'copy-to-clipboard-button', c.setAttribute('type', 'button');
        var r = document.createElement('span');
        return c.appendChild(r), u('copy'),
            function(e, o) {
                e.addEventListener('click', (function() {
                    ! function(e) {
                        navigator.clipboard ? navigator.clipboard.writeText(e.getText()).then(e.success, (function() {
                            t(e);
                        })) : t(e);
                    }(o);
                }));
            }(c, {
                getText: function() {
                    return o.textContent;
                },
                success: function() {
                    u('copy-success'), i();
                },
                error: function() {
                    u('copy-error'), setTimeout((function() {
                        ! function(t) {
                            window.getSelection().selectAllChildren(t);
                        }(o);
                    }), 1), i();
                }
            }), c;

        function i() {
            setTimeout((function() {
                u('copy');
            }), n['copy-timeout']);
        }

        function u(t) {
            r.textContent = n[t], c.setAttribute('data-copy-state', t);
        }
    })) : console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.'));
}();
'undefined' != typeof Prism && 'undefined' != typeof document && document.querySelector && Prism.plugins.toolbar.registerButton('download-file', (function(t) {
    var e = t.element.parentNode;
    if (e && /pre/i.test(e.nodeName) && e.hasAttribute('data-src') && e.hasAttribute('data-download-link')) {
        var n = e.getAttribute('data-src'),
            a = document.createElement('a');
        return a.textContent = e.getAttribute('data-download-link-label') || 'Download', a.setAttribute('download', ''), a.href = n, a;
    }
}));
'undefined' != typeof Prism && (Prism.languages.treeview = {
    'treeview-part': {
        pattern: /^.+/m,
        inside: {
            'entry-line': [{
                pattern: /\|-- |├── /,
                alias: 'line-h'
            }, {
                pattern: /\| {3}|│ {3}/,
                alias: 'line-v'
            }, {
                pattern: /`-- |└── /,
                alias: 'line-v-last'
            }, {
                pattern: / {4}/,
                alias: 'line-v-gap'
            }],
            'entry-name': {
                pattern: /.*\S.*/,
                inside: {
                    operator: / -> /
                }
            }
        }
    }
}, Prism.hooks.add('wrap', (function(e) {
    if ('treeview' === e.language && 'entry-name' === e.type) {
        var t = e.classes,
            n = /(^|[^\\])\/\s*$/;
        if (n.test(e.content)) e.content = e.content.replace(n, '$1'), t.push('dir');
        else {
            e.content = e.content.replace(/(^|[^\\])[=*|]\s*$/, '$1');
            for (var a = e.content.toLowerCase().replace(/\s+/g, '').split('.'); a.length > 1;) a.shift(), t.push('ext-' + a.join('-'));
        }
        '.' === e.content[0] && t.push('dotfile');
    }
})));

Prism.highlightAll();