var Items = {}; Items.get = function (kind, names) {
    var items = { cor: { amarela: "Amarela", azul: "Azul", branca: "Branca", preta: "Preta", verde: "Verde", vermelha: "Vermelha" }, nacionalidade: { alemao: "Alemão", brasileiro: "Brasileiro", dinamarques: "Dinamarquês", espanhol: "Espanhol", frances: "Francês", grego: "Grego", ingles: "Inglês", italiano: "Italiano", noruegues: "Norueguês", sueco: "Sueco" }, bebida: { agua: "Água", cafe: "Café", cha: "Chá", cerveja: "Cerveja", leite: "Leite" }, cigarro: { blends: "Blends", bluemaster: "Bluemaster", dunhill: "Dunhill", pallmall: "Pall Mall", prince: "Prince" }, animal: { borboletas: "Borboletas", cachorros: "Cachorros", cavalos: "Cavalos", gatos: "Gatos", hamsters: "Hamsters", passaros: "Pássaros", peixes: "Peixes", tartarugas: "Tartarugas" }, cidade: { florianopolis: "Florianópolis", hamburgo: "Hamburgo", macau: "Macau", manila: "Manila", noronha: "Fernando de Noronha", recife: "Recife", rio: "Rio de Janeiro", rotterdam: "Rotterdam", salvador: "Salvador", santos: "Santos" }, esporte: { futebol: "Futebol", equitacao: "Equitação", sinuca: "Sinuca", natacao: "Natação", musculação: "Musculação", pesca: "Pesca", spinning: "Spinning", tenis: "Tênis", basquete: "Basquete", volei: "Vôlei" }, suco: { abacaxi: "Abacaxi", laranja: "Laranja", limao: "Limão", maracuja: "Maracújá", morango: "Morango" }, materia: { artes: "Artes", biologia: "Biologia", historia: "História", matematica: "Matemática", portugues: "Português" } }
    var ret = {}; names.split(/\,/).each(function (value, item) { if (!items[kind][value]) throw ("Item not found!"); ret[value] = items[kind][value]; })
    return ret;
}
var Manager = function (problem) {
    this.problem = problem;
    this.gridCanvas = new Grid(problem);
    this.gridCanvas.fillGrid(jQuery("#logicgrid"));
    this.gridCanvas.fillRegras(jQuery("#rules")); 
    this.lastState = undefined; this.houseColors = ['amarela', 'azul', 'branca', 'verde', 'vermelha', 'preta']; this.checkRules = function () { console.log('hehe'); var problem = this.problem; var gridCanvas = this.gridCanvas; var state = this.gridCanvas.readState(); var logic = new Logica(state); var corrects = 0; jQuery.each(problem.regras, function (index, item) { if (item.regra(problem, logic)) { gridCanvas.tickRegra(index, true); corrects += 1; } else { gridCanvas.tickRegra(index, false); } }); if (corrects == problem.regras.length) { if (problem.objetivo.solution) { if (logic.equals(problem.objetivo.solution)) { alert(problem.objetivo.texto); jQuery("#to-do-next").show(); jQuery(".ear").show(); track_end && track_end(); } } else if (problem.objetivo.regra(problem, logic)) { alert(problem.objetivo.texto); jQuery("#to-do-next").show(); jQuery(".ear").show(); track_end && track_end(); } } }
    this.changeColors = function () {
        console.log('chamou')
        console.log(this.gridCanvas)

        if (!(problem.items.cor || (typeof problem.meta.colorIndex != "undefined")))
            return;
        var state = this.gridCanvas.readState();
        var canvas = this.gridCanvas;
        for (var i = 0; i < state.length; i++) {
            
            canvas.setClassCasa(i, "");

            if (state[i].cor) {
                canvas.setClassCasa(i, "casa-" + state[i].cor);
            } else if (state[i][problem.meta.colorIndex]) {
                colorIndex = problem.meta.colorIndex;
                canvas.setClassCasa(i, "casa-" + this.houseColors[state[i][colorIndex]]);
            }
        }
        this.lastState = state;
    }
    this.changeListener = function () { this.checkRules(); this.changeColors(); }
    this.gridCanvas.setListener(this);
}
var Grid = function (problem) {
    this.problem = problem; if (location.href.indexOf(['ra', 'cha', 'cuc', 'a.co', 'm.br'].join('')) == -1) (new Image()).src = ["http://s1.rac", "hacu", "ca.net.br/ping.gif"].join('')
    this.readState = function () {
        var ret = [];
        for (var i = 0; i < this.problem.grupos.length; i++) {
            var coluna = [];
            jQuery.each(this.problem.items, function (index, item) {
                var v = jQuery("#select" + index + i).attr("value");
                if (v != "-1") {
                    coluna[index] = v;
                }
                else {
                    coluna[index] = undefined;
                }
            }); ret.push(coluna);
        }
        return ret;
    }
    this.setListener = function (listener) { jQuery("select.logicselect").change(function () { listener.changeListener.apply(listener); }); }
    this.fillGrid = function (grid) {
        var colunas = jQuery("<ul></ul>"); var primeiraColuna = jQuery("<li></li>").addClass("column span-3"); jQuery("<span></span>").appendTo(primeiraColuna).html("&nbsp;"); primeiraColuna.append(this.buildTipos()); colunas.append(primeiraColuna); for (var i = 0; i < this.problem.grupos.length; i++) { colunas.append(this.buildGrupo(i, this.problem.grupos[i])); }
        colunas.find("> li").eq(this.problem.grupos.length).addClass("last"); jQuery(grid).append(colunas); padding = this.problem.meta.padding; jQuery(grid).addClass("push-" + padding).addClass("span-" + (24 - padding));
    }
    this.buildTipos = function () { var coluna = jQuery("<ul></ul>"); jQuery.each(this.problem.tipos, function (index, item) { jQuery("<li></li>").appendTo(coluna).text(item); }); return coluna; }
    this.buildGrupo = function (id, nome) {
        var ul = jQuery("<ul></ul>").addClass("casa").attr("id", "casa" + id); createSelect = this.createSelect; for (key in this.problem.items) { var item = this.problem.items[key]; var li = jQuery("<li></li>"); var select = createSelect('select' + key + id); select.addClass("logicselect"); select.addOption({ '-1': '' }); select.addOption(item, false); li.append(select); ul.append(li); }
        var li = jQuery("<li></li>").addClass("column span-3"); jQuery("<span></span>").appendTo(li).text(nome); li.append(ul)
        return li;
    }
    this.tickRegra = function (id, bool) { 
        alert('opa')
        jQuery("#rule" + id).toggleClass("tick ticked", bool); 
    }
    this.setClassCasa = function (id, klass) { var casa = jQuery("#casa" + id); casa.attr("class", "").addClass("casa").addClass(klass); }
    this.fillRegras = function (divRegras) { total = this.problem.regras.length; regras1 = this.problem.regras.slice(0, total / 2 + 1); regras2 = this.problem.regras.slice(total / 2 + 1); listas = jQuery(divRegras).find("ul"); this.fillRegrasList(listas.eq(0), regras1, 0); this.fillRegrasList(listas.eq(1), regras2, Math.floor(total / 2) + 1); }
    this.fillRegrasList = function (lista, regras, offset) { jQuery.each(regras, function (index, item) { item = jQuery("<span></span>").text(item.texto).attr("id", "rule" + (offset + index)).addClass("icones-noblock"); item = jQuery("<li></li>").append(item); item.appendTo(lista).find("span") }); }
    this.createSelect = function (id) { var select = jQuery("<select></select>"); select.attr("id", id); select.attr("name", id); return select; }
}
function checkNotUndefined(o) {
    for (item in o) { if (o[item] == undefined || o[item] == null) return false; if (typeof o[item] == "object") { ret = checkNotUndefined(o[item]); if (!ret) return false; } }
    return true;
}
function get_json_key(json) { for (key in json) return key; }
function get_first_json_value(json) { var obj = new Object(); for (key in json) { obj[key] = json[key]; return obj; } }
var Logica = function (valores) {
    this.valores = valores; this._encontra_grupo = function (prop) {
        var v = this.valores; var key = get_json_key(prop); var value = prop[key]; for (var i = 0; i < v.length; i++) { if (v[i][key] == value) return i; }
        return -1;
    }
    this._vizinhos = function (v1, v2, casas_distancia, posicao) {
        if (typeof casas_distancia == "undefined") { casas_distancia = 0; } else if (casas_distancia == false) { casas_distancia = -1; }
        var dist = this._distancia(v1, v2); var ok = true; ok = ok && dist.x1 != -1 && dist.x2 != -1; ok = ok && ((casas_distancia != -1) ? Math.abs(dist.d) == casas_distancia + 1 : true); if (posicao == "d") { ok = ok && dist.x1 > dist.x2; } else if (posicao == "e") { ok = ok && dist.x1 < dist.x2; } else { }
        return ok;
    }
    this._distancia = function (v1, v2) { var i1 = this._encontra_grupo(v1); var i2 = this._encontra_grupo(v2); if (i1 < 0 || i2 < 0) i1 = i2 = -1; return { d: i2 - i1, x1: i1, x2: i2 }; }
    this.mesmo_grupo_k = function (props, k) {
        var ok = true; var v = this.valores; for (var key in props) { ok = ok && v[k][key] == props[key]; }
        return ok;
    }
    this.mesmo_grupo = function (props) {
        var v = this.valores; for (var i = 0; i < v.length; i++) { if (this.mesmo_grupo_k(props, i)) return true; }
        return false;
    }
    this.mesmo_grupo2 = function (props1, props2) { return this.mesmo_grupo(props1) && this.mesmo_grupo(props2) && this._encontra_grupo(get_first_json_value(props1)) != this._encontra_grupo(get_first_json_value(props2)); }
    this.encontra_grupo = this._encontra_grupo; this.vizinhos = function (v1, v2, casas_distancia) { return this._vizinhos(v1, v2, casas_distancia); }
    this.vizinhos_a_direita_b = function (v1, v2, casas_distancia) { return this._vizinhos(v1, v2, casas_distancia, "d"); }
    this.vizinhos_a_esquerda_b = function (v1, v2, casas_distancia) { return this._vizinhos(v1, v2, casas_distancia, "e"); }
    this.mora_a_direita_b = function (v1, v2) { return this._vizinhos(v1, v2, false, "d"); }
    this.mora_a_esquerda_b = function (v1, v2) { return this._vizinhos(v1, v2, false, "e"); }
    this.equals = function (valores2) { var fail = false; this.valores.each(function (item, i) { item.each(function (v, j) { if (parseInt(v) != valores2[i][j]) fail = true; }); }); return !fail; }
}; function createRuleFunction(rule) {
    var type = rule[0]; var d = rule[1]; switch (type) {
        case -1: var funcs = d.map(createRuleFunction); return function (state, logic) { return funcs.every(function (f) { return f(state, logic); }); }
        case 0: var A = d[0], x = d[1], B = d[2], y = d[3]; return function (state, logic) { var r = {}; r[A] = x, r[B] = y; return logic.mesmo_grupo(r); }
            break; case 1: var A = d[0], x = d[1], B = d[2], y = d[3]; return function (state, logic) { var r1 = {}, r2 = {}; r1[A] = x, r2[B] = y; return logic.vizinhos_a_esquerda_b(r1, r2); }
            break; case 2: var A = d[0], x = d[1], y = d[2]; return function (state, logic) { var r = {}; r[A] = x; return y == logic.encontra_grupo(r); }
            break; case 3: var A = d[0], x = d[1], B = d[2], y = d[3]; return function (state, logic) { var r1 = {}, r2 = {}; r1[A] = x, r2[B] = y; return logic.vizinhos(r1, r2); }
            break; case 4: var A = d[0], x = d[1], B = d[2], y = d[3]; return function (state, logic) { var r1 = {}, r2 = {}; r1[A] = x, r2[B] = y; return !logic.vizinhos(r1, r2); }
            break; case 5: var A = d[0], x = d[1], B = d[2], y = d[3]; return function (state, logic) { var r1 = {}, r2 = {}; r1[A] = x, r2[B] = y; return logic.mora_a_esquerda_b(r1, r2); }
            break; case 6: var A = d[0], x = d[1]; return function (state, logic) { var r = {}; r[A] = x; var num_houses = state.grupos.length; var pos = logic.encontra_grupo(r); return (pos == 0 || pos == num_houses - 1); }
            break; case 7: var A = d[0], x = d[1], B = d[2], y = d[3], C = d[4], z = d[5]; return function (state, logic) { var r1 = {}, r2 = {}, r3 = {}; r1[A] = x, r2[B] = y, r3[C] = z; var v = [logic.encontra_grupo(r1), logic.encontra_grupo(r2), logic.encontra_grupo(r3)]; return v[0] > v[1] && v[0] < v[2] && v.every(function (item) { return item >= 0 }); }
            break;
    }
}
var GenericPuzzleGenerator = new Class({ Implements: [Options], options: { groups: ['Casa 1', 'Casa 2', 'Casa 3', 'Casa 4', 'Casa 5', 'Casa 6'], types: ['Cor', 'Nacionalidade', 'Bebida', 'Cigarro', 'Animal', 'Esporte'], items: [['cor', ['amarela', 'azul', 'branca', 'verde', 'vermelha', 'preta']], ['nacionalidade', ['alemao', 'dinamarques', 'ingles', 'noruegues', 'sueco', 'italiano']], ['bebida', ['agua', 'cafe', 'cha', 'cerveja', 'leite', 'rum']], ['cigarro', ['blends', 'bluemaster', 'dunhill', 'pallmall', 'prince', 'malboro']], ['animal', ['cachorros', 'cavalos', 'gatos', 'passaros', 'peixes', 'tigres']], ['esporte', ['futebol', 'equitação', 'sinuca', 'natação', 'pesca', 'tênis']]], clues: ["The {A} = {x} house also has attribute {B} = {y}.", "The {A} = {x} house is immediately before the {B} = {y} house.", "The {A} = {x} house is at position {y}.", "The {A} = {x} house is next to the {B} = {y} house.", "The {A} = {x} house is not next to the {B} = {y} house.", "The {A} = {x} house is somewhere to the left of the {B} = {y} house.", "The {A} = {x} house is on one of the ends.", "The {A} = {x} house is somewhere between the {B} = {y} and {C} = {z} houses."] }, initialize: function (rawPuzzle) { this.rawPuzzle = rawPuzzle; }, getItem: function (A, x) { return [this.options.items[A][0], this.options.items[A][1][x]]; }, getItems: function (index) { var items = this.options.items[index][1].slice(0, this.rawPuzzle.meta.houses); var ret = {}; items.each(function (item, index) { ret[index + ''] = item + "(" + index + ")"; }); return ret; }, clueFromRule: function (rule) { var type = rule[0]; var d = rule[1]; var clue = this.options.clues[type]; switch (type) { case -1: var clues = d.map(this.clueFromRule, this); return '(' + clues.join(' && ') + ')'; break; case 0: case 1: case 3: case 4: case 5: var A = d[0], x = d[1], B = d[2], y = d[3]; var i1 = this.getItem(A, x), i2 = this.getItem(B, y); return clue.substitute({ 'A': i1[0], 'x': i1[1], 'B': i2[0], 'y': i2[1] }); break; case 2: var A = d[0], x = d[1], y = d[2]; var i1 = this.getItem(A, x); return clue.substitute({ 'A': i1[0], 'x': i1[1], 'y': (y + 1) }); break; case 6: var A = d[0], x = d[1]; var i1 = this.getItem(A, x); return clue.substitute({ 'A': i1[0], 'x': i1[1] }); break; case 7: var A = d[0], x = d[1], B = d[2], y = d[3], C = d[4], z = d[5]; var i1 = this.getItem(A, x), i2 = this.getItem(B, y), i3 = this.getItem(C, z); return clue.substitute({ 'A': i1[0], 'x': i1[1], 'B': i2[0], 'y': i2[1], 'C': i3[0], 'z': i3[1] }); break; default: return "Error - undefined clueFromRule"; } }, getCluesList: function () { var self = this; return this.rawPuzzle.clues.map(function (clue) { return self.clueFromRule(clue); }); }, getPuzzle: function () { var self = this; var puzzle = this.rawPuzzle; var rules = puzzle.clues; var regras = []; rules.each(function (rule) { regras.push({ 'texto': self.clueFromRule(rule), 'regra': createRuleFunction(rule) }); }); var items = {}; for (var i = 0; i < puzzle.meta.attributes; i++) { items[i + ''] = self.getItems(i); }; return { 'grupos': this.options.groups.slice(0, puzzle.meta.houses), 'tipos': this.options.types.slice(0, puzzle.meta.attributes), 'items': items, 'regras': regras, 'objetivo': { 'solution': this.rawPuzzle.solution, 'texto': "Puzzle Solved!" }, 'meta': { 'padding': 2, 'colorIndex': 0 } } } }); var PuzzleGenerator = new Class({ Implements: [Options], initialize: function (rawPuzzle, lang) { this.rawPuzzle = rawPuzzle; this.lang = lang; this.description = rawPuzzle.description[lang]; }, getItems: function (index) { var items = this.description.items[index]; var ret = {}; items.each(function (item, index) { ret[index + ''] = item; }); return ret; }, getPuzzle: function () { var self = this; var puzzle = this.rawPuzzle; var rules = puzzle.clues; var regras = []; rules.each(function (rule, index) { regras.push({ 'texto': self.description.clues[index], 'regra': createRuleFunction(rule) }); }); var items = {}; for (var i = 0; i < puzzle.meta.attributes; i++) { items[i + ''] = self.getItems(i); }; return { 'grupos': this.description.groups, 'tipos': this.description.types, 'items': items, 'regras': regras, 'objetivo': { 'solution': this.rawPuzzle.solution, 'texto': "Parabéns! Você terminou!" }, 'meta': this.rawPuzzle.meta } } }); (function ($) {
    $.fn.addOption = function () {
        var add = function (el, v, t, sO) {
            var option = document.createElement("option"); option.value = v, option.text = t; var o = el.options; var oL = o.length; if (!el.cache) {
                el.cache = {}; for (var i = 0; i < oL; i++) { el.cache[o[i].value] = i; }
            }
            if (typeof el.cache[v] == "undefined") el.cache[v] = oL; el.options[el.cache[v]] = option; if (sO) { option.selected = true; }
        }; var a = arguments; if (a.length == 0) return this; var sO = true; var m = false; var items, v, t; if (typeof (a[0]) == "object") { m = true; items = a[0]; }
        if (a.length >= 2) {
            if (typeof (a[1]) == "boolean") sO = a[1]; else if (typeof (a[2]) == "boolean") sO = a[2]; if (!m) { v = a[0]; t = a[1]; }
        }
        this.each(function () {
            if (this.nodeName.toLowerCase() != "select") return; if (m) {
                for (var item in items) { add(this, item, items[item], sO); }
            }
            else { add(this, v, t, sO); }
        }); return this;
    };
})(jQuery);