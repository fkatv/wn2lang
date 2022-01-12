class Wn() {

    constructor() {
        this._pwn = ['webe', 'weón', 'weon', 'aweo', 'wéa','wéas', 'weá','weás']
        this.conjugaciones = ['yo me ', 'tú te ', 'el se ', 'nosotros nos ', 'ellos se ', 'voh (te) ']
        this.presente_simple = ['o','as / ai' ,'a', 'amos', 'an', 'ai']
        this.conjugaciones_simplepass = ['yo me ', 'tú te ', 'el se ', 'nosotros nos ', 'ellos se ', 'voh (te)']
        this.pasado_simple = ['é','aste', 'ó', 'amos','aron','aste']
        this.preterito_simple = ['é', 'arás', 'ará','aremos', 'arán','ai']
        this.conjugaciones_simplepret = ['yo me ', 'tú te ', 'el se ', 'nosotros nos ', 'ellos se ', 'voh (te) ']

        this._ADVERBIO_PROXIMIDAD = ['aquí', 'acá']
        this._ADVERBIO_LEJANIA = ['allí', 'allá']
        this._ADVERBIO_INTERLOC = ['ahí']

        this.pron_dem = ['éste','ése','ésta','ésa','éstos','ésos','éstas','ésas','ésto','éso',
                'aquél','aquélla','aquéllos','aquéllas','aquéllo']

        this.articulos = 'el,un,al,del,los,unos,la,una,las,unas,les,los'.split(',')

        this._conjugacion_SER = ['ser','soy','eres', 'es', 'somos', 'son',
           'fui','fuiste','fue', 'fuimos','fueron',
            'jui','juiste','jue', 'juimos','jueron',
           'soi', 'eris','erih','erís','erai', 'eramos']

    } function len (obj) {
      return obj.length

    } function includeIn (a,b){
        return b.includes(a)

    } function lexicParser(L) {
        #L = L.replace('ebia','ebe')
        L = L.lower()
        L = L.replace('ahueon', 'aweon')
        L = L.replace('agueon', 'aweon')
        L = L.replace('wueo', 'weo')
        L = L.replace('wueó', 'weó')
        L = L.replace('hueo', 'weo')
        L = L.replace('hueó', 'weó')
        L = L.replace('gueo', 'weo')
        L = L.replace('gueó', 'weó')
        L = L.replace('huebo', 'weo')
        L = L.replace('huebó', 'weó')
        L = L.replace('guebo', 'weo')
        L = L.replace('guebó', 'weó')
        L = L.replace('huebe', 'webe')
        L = L.replace('guebe', 'webea')
        L = L.replace('huebe', 'webea')
        L = L.replace('webi', 'webe')
        L = L.replace('huebi', 'webe')
        L = L.replace('guebi', 'webe')

        _L = L.split(' ')
        _L.map((index, x) => {
            pal = this.borraPuntuacion(x)
            if pal == 'weon' ||  pal == "wéon":
                _L[index] = "weón"
            if pal == 'wea' ||  pal== "weas":
                s = 's' if this.len(pal) == 4 else ''
                _L[index] = "weá" + s  #asumimos weá sobre wéa si no hay tildes.
            if 'awéon' in pal ||  'aweón' in pal :
                _L[index] = "aweon"
            if this.len(pal) > 3 && "nah" in pal ||  'náh' in pal:
                _L[index] = _L[index].replace('nah', 'ná')
                _L[index] = _L[index].replace('náh', 'ná')
        })
        L = " ".join(_L)
        print("[chileno] -> %s"%(L))
        return L

    } function F_split(L, P) {
        F = []
        P.map( p => {
            if (this.includeIn(p,L)){
                ip = L.index(p)
                Ftemp  = L[0:ip]
                F.append(Ftemp)
                L = L[ip+this.len(p) {]
            } else {
                F.append(L)
            }

        if (this.len(L) > 0) {
            F.append(L)
        }
        return F

    } function rho(L) {
        R = []
        particulas = this._pwn
        L.split(' ').map((i, item) => {
            x = this.borraPuntuacion(x)
            if (this.len(x)>=3) {
                if(this.len(x) == 3 && this.includeIn(x,  particulas ) {
                    R.append(x)
                } else {
                    test_p = x[0:4]
                    if (this.includeIn(test_p,particulas)) {
                        R.append(x)
                    }
                }
            }
        })
        return R

    } function borraPuntuacion(x) {
        // return re.sub('[^a-záóíA-Z0-9]+', '', x)
        return x.replace('[^a-záóíA-Z0-9]+', '');

    } function esFraseNula(f) {
        f.map(x => {
            if (x != '') {
                return false
                break
        })
        return true

    } function getOmega(U, P, d) {
        O = []
        d.map((index, item) => {
            y_translate = this.deschilenizar(U[i],P[i])
            O.append(y_translate)
        })
        return O

    } function articulate(F, Omega) {
        trad = F[0]
        // |F|>|O|>1
        Omega.map((index, item) => {
            y = Omega[i]
            if (y!=None)
                trad = trad + y
            if (i+1 < this.len(Omega))
                trad = trad + F[i + 1]
            if (i == this.len(Omega) - 1 && this.len(F)>this.len(Omega) && this.len(F) > 0)
                trad = trad + F[-1]
        }
        return trad

    }
    /*
    function translate(_lambda, lang = "es") {
        L = this.lexicParser(_lambda)
        K = L.split(".")
        trad = ""

        K.map( kappa ==> {
            Pk = this.rho(kappa)
            if (this.len(Pk) == 0) {
                trad = trad + kappa
            } else {
                Fk = this.F_split(kappa, Pk)
                Uk = this.getUpsilon(Fk,Pk)
                // print(Uk)
                Ok = this.getOmega(Uk, Pk, this.len(Pk))
                // print(Ok)
                Ck = this.articulate(Fk,Ok)
                // print(Ck)
                trad = trad + Ck.capitalize() + "."
            }
        })

        to_translate = trad
        translated = GoogleTranslator(source='auto', target=lang).translate(to_translate)
        return translated

    } function translateAndAnalize(_lambda) {
        text = this.translate(_lambda, 'en')
        a = this.getAnalysis(text)
        print(text, a)
        return [text, a]

    } function getUpsilon(F, P) {
        U = []
        P.map(index, pwn) => {
            f = F[index]
            u = this.Upsilon(f, pwn)
            // print(f,pwn , u)
            U.append(u)
        })
        return U

    } function Upsilon(F, pwn) {
        upsilon = []
        f = F.split(' ')
        // f = [this.borraPuntuacion(x) for this.includeIn(x,  f]
        f = f.map(x => this.borraPuntuacion(x))
        f = f.reverse()

        a = this.primerArticulo(f)
        b = this.primerPronombre(f)
        c = this.primerSerConjugado(f)
        u = [0,0,0]
        v = [a,b,c]
        // print(v,f,pwn)
        if (c > -1) {
            c_gn = this.isSerConjugado(f[c], pwn)
            if (c_gn != false && c_gn != None) {
                u = [0,0,1] + c_gn

        if (a >-1  &&  a > b) {
            a_gn = this.isArticuloDem(a, f[a], pwn)
            if (a_gn != false) {
                u = [1,0,0] + a_gn
        if (b >-1  &&  b > a) {
            b_gn = this.isPronomDemost(f[b], pwn)
            if (b_gn != false) {
                u = [0,1,0] + b_gn

        if (-1< a < c) {
            u = [1,0,0] + u[3:]
        if (-1< b < c) {
            u = [0,1,0] + u[3:]

        if (u == [0,0,0] ||  this.esFraseNula(f)) {
            // print('es frase NULA:',f,pwn)
            if (pwn == 'weás') {
                u = [0, 1, 0, 3, 1] #
            if (pwn == 'weá') {
                u = [0, 1, 0, 3, 0] // estúpido
            if (this.includeIn(pwn,  'weón aweonao'.split(' ')) {
                u =  [1, 0, 0, 2, 0] // estúpido
            if (this.includeIn(pwn,  'weones aweonaos'.split(' ')) {
                u =  [1, 0, 0, 2, 1] // estúpido
            if (this.includeIn(pwn,  'weona aweoná'.split(' ')) {
                u = [1, 0, 0, 3, 0] // estúpida
            if (this.includeIn(pwn,  'weonas aweonás'.split(' ')) {
                u = [1, 0, 0, 3, 1] // estúpido
        return u

    } function primerPronombre(f) {
        for (let i=0; i< this.len(f); i++) {
            if (f[i] != '') {
                e = f[i]
                if (e[0] == 'e') {
                    e = 'é' + e[1:]
                }
                if ( e in this.pron_dem) {
                    return i
                }
            }
        }
        return -1

    } function primerArticulo(f) {
        for (let i = 0; i<(this.len(f)); i++) {
            if (f[i] in this.articulos) {
                return i
            }
        }
        return -1

    } function primerSerConjugado(f) {
        for (let i=0; i< this.len(f); i++) {
            if (f[i] in this._conjugacion_SER) {
                return i
        return -1


    } function isArticuloDem(i, x, pwn) {

        if (x !== this.articulos) {
            return false
        if (this.includeIn(x,  'la una'.split(' ') && this.includeIn(pwn,  "weona aweoná".split(' ')) {
            return [1,0]
        if (this.includeIn(x,  'las unas'.split(' ') && this.includeIn(pwn,  "weonas aweonás".split(' ')) {
            return [1,1]
        if (this.includeIn(x,  'la una'.split(' ') && pwn =="weá".split(' ')) {
            return [2,0]
        if (this.includeIn(x,  'las unas'.split(' ') && pwn == "weás".split(' ')) {
            return [2,1]
        if (this.includeIn(x,  'el un al del'.split(' ') && this.includeIn(pwn,  "weón aweonao".split(' ')) {
            return [0,0]
        if (this.includeIn(x,  'el un al del'.split(' ') && this.includeIn(pwn,  "wéa wéas".split(' ')) {
            return [2,0]
        if (this.includeIn(x,  'los unos'.split(' ') && this.includeIn(pwn,  "weones aweonaos".split(' ')) {
            return [0,1]
        if (this.includeIn(x,  'los unos'.split(' ') && pwn =="wéas") {
            return [2,1]
        if (x == 'les') {
            if (i == 0) {
                return 'FALTA ADJETIVO INTERMEDIO*'
            } else {
                if (this.includeIn(pwn,  'weón aweonaos weones wéas'.split(' ')) {
                    return [2, 1]
                if (this.includeIn(pwn,  'weonas aweonás'.split(' ')) {
                    return [3, 1]

        return false


    } function isPronomDemost(x, pwn) {

        if(x[0]=='e') {
            x = 'é' + x[1:]
        if(x[0:4]=='aque') {
            x = 'aqué' + x[4:]

        if (x !== this.pron_dem) {
            return false

        if this.includeIn(x,  'éste ése aquél'.split(' ') && this.includeIn(pwn,  'weón aweonao'.split() {
            return [0,0]
        if this.includeIn(x,  'ésta ésa'.split(' ') && this.includeIn(pwn,  'weona aweoná'.split() {
            return [1,0]
        if this.includeIn(x,  'éstos ésos aquéllos'.split(' ') && this.includeIn(pwn,  'weones aweonaos'.split() {
            return [0,1]
        if this.includeIn(x,  'éstas ésas'.split(' ') && this.includeIn(pwn,  'weonas aweonás'.split() {
            return [1,1]
        if this.includeIn(x,  'ésto éso aquéllo'.split(' ') && this.includeIn(pwn,  'weón wéa aweonao'.split() {
            return [2,0]
        if (this.includeIn(x,  'ésa aquélla') && this.includeIn(pwn,  'weá'.split() {
            return [3,0]
        if (x == 'aquéllas') && this.includeIn(pwn,  'weás'.split() {
            return [3,1]
        if (x == 'aquéllos') && this.includeIn(pwn,  'wéas'.split() {
            return [2,1]
        return false


    } function isSerConjugado(x, pwn) {
        // como es verbo conjugado,, solo se queda con el género neutro del pwn
        if (x !== this._conjugacion_SER) {
            return false
        if (this.includeIn(pwn,  ['weá']) {
            return [3,0]
        if (this.includeIn(pwn,  ['weás']) {
            return [3,1]
        if (this.includeIn(pwn,  ['weón', 'aweonao', 'wéa']) {
            return [2,0]
        if (this.includeIn(pwn,  ['wéas']) {
            return [2,1]
        if (this.includeIn(pwn,  ['weones', 'aweonaos']) {
            return [2,1]
        if (this.includeIn(pwn,  ['weona, aweoná']) {
            return[3,0]
        if (this.includeIn(pwn,  ['weonas, aweonás']) {
            return[3,1]



    } function deschilenizar(u,p) {

        if ( p == "weá") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "#10000weá"
            if (u == [1, 0, 0, 0, 1] ) {
                return "#10001weá"
            if (u == [1, 0, 0, 1, 0] ) {
                return "#10010weá"
            if (u == [1, 0, 0, 1, 1] ) {
                return "#10011weá"
            if (u == [1, 0, 0, 2, 0] ) {
                return "asunto"
            if (u == [1, 0, 0, 2, 1] ) {
                return "asuntos"
            if (u == [1, 0, 0, 3, 0] ) {
                return "situación"
            if (u == [1, 0, 0, 3, 1] ) {
                return "cosas*"

            if (u == [0, 1, 0, 0, 0] ) {
                return "#01001weá"
            if (u == [0, 1, 0, 0, 1] ) {
                return "#01010weá"
            if (u == [0, 1, 0, 1, 0] ) {
                return "#01010weá"
            if (u == [0, 1, 0, 1, 1] ) {
                return "#01011weá"
            if (u == [0, 1, 0, 2, 0] ) {
                return "cosa"
            if (u == [0, 1, 0, 2, 1] ) {
                return "cosas"
            if (u == [0, 1, 0, 3, 0] ) {
                return "cosa"
            if (u == [0, 1, 0, 3, 1] ) {
                return "cosas"


            if (u == [0, 0, 1, 2, 0] ) {
                return "#00120weá"
            if (u == [0, 0, 1, 2, 1] ) {
                return "#00121weá"
            if (u == [0, 0, 1, 3, 0] ) {
                return "definición"
            if (u == [0, 0, 1, 3, 1] ) {
                return "#00131weá"

        if ( p == "weás") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "#10000weás"
            if (u == [1, 0, 0, 0, 1] ) {
                return "#10001weás"
            if (u == [1, 0, 0, 1, 0] ) {
                return "#10010weás"
            if (u == [1, 0, 0, 1, 1] ) {
                return "#10011weás"
            if (u == [1, 0, 0, 2, 0] ) {
                return "tontera"
            if (u == [1, 0, 0, 2, 1] ) {
                return "cizañerías"
            if (u == [1, 0, 0, 3, 0] ) {
                return "tontería"
            if (u == [1, 0, 0, 3, 1] ) {
                return "tonterías"

            if (u == [0, 1, 0, 0, 0] ) {
                return "#01001weás"
            if (u == [0, 1, 0, 0, 1] ) {
                return "#01010weás"
            if (u == [0, 1, 0, 1, 0] ) {
                return "#01010weás"
            if (u == [0, 1, 0, 1, 1] ) {
                return "#01011weás"
            if (u == [0, 1, 0, 2, 0] ) {
                return "#01020weás"
            if (u == [0, 1, 0, 2, 1] ) {
                return "#01021weás"
            if (u == [0, 1, 0, 3, 0] ) {
                return "tontería"
            if (u == [0, 1, 0, 3, 1] ) {
                return "boberías"


            if (u == [0, 0, 1, 2, 0] ) {
                return "#00120weás"
            if (u == [0, 0, 1, 2, 1] ) {
                return "#00121weás"
            if (u == [0, 0, 1, 3, 0] ) {
                return "#00130weás"
            if (u == [0, 0, 1, 3, 1] ) {
                return "#00131weás"


        if ( p == "wéas") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "#10000wéás"
            if (u == [1, 0, 0, 0, 1] ) {
                return "#10001wéás"
            if (u == [1, 0, 0, 1, 0] ) {
                return "#10010wéás"
            if (u == [1, 0, 0, 1, 1] ) {
                return "#10011wéás"
            if (u == [1, 0, 0, 2, 0] ) {
                return "tontera"
            if (u == [1, 0, 0, 2, 1] ) {
                return "cizañerías"
            if (u == [1, 0, 0, 3, 0] ) {
                return "#10030wéás"
            if (u == [1, 0, 0, 3, 1] ) {
                return "#10031wéás"

            if (u == [0, 1, 0, 0, 0] ) {
                return "#01001wéás"
            if (u == [0, 1, 0, 0, 1] ) {
                return "#01010wéás"
            if (u == [0, 1, 0, 1, 0] ) {
                return "#01010wéás"
            if (u == [0, 1, 0, 1, 1] ) {
                return "#01011wéás"
            if (u == [0, 1, 0, 2, 0] ) {
                return "#01020wéás"
            if (u == [0, 1, 0, 2, 1] ) {
                return "#01021wéás"
            if (u == [0, 1, 0, 3, 0] ) {
                return "#01030wéás"
            if (u == [0, 1, 0, 3, 1] ) {
                return "#01031wéás"


            if (u == [0, 0, 1, 2, 0] ) {
                return "#00120wéás"
            if (u == [0, 0, 1, 2, 1] ) {
                return "#00121wéás"
            if (u == [0, 0, 1, 3, 0] ) {
                return "#00130wéas"
            if (u == [0, 0, 1, 3, 1] ) {
                return "#00131wéas"

        if ( p == "aweonao") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "imbécil"
            if (u == [1, 0, 0, 0, 1] ) {
                return "imbéciles"
            if (u == [1, 0, 0, 1, 0] ) {
                return "descerebrado"
            if (u == [1, 0, 0, 1, 1] ) {
                return "malnacidos"
            if (u == [1, 0, 0, 2, 0] ) {
                return ",subnormal"
            if (u == [1, 0, 0, 2, 1] ) {
                return ",subnormales"
            if (u == [1, 0, 0, 3, 0] ) {
                return "tontona"
            if (u == [1, 0, 0, 3, 1] ) {
                return "destartalado!"

            if (u == [0, 1, 0, 0, 0] ) {
                return "inútil"
            if (u == [0, 1, 0, 0, 1] ) {
                return "sucio bueno para nada"
            if (u == [0, 1, 0, 1, 0] ) {
                return "atorrante"
            if (u == [0, 1, 0, 1, 1] ) {
                return "enfermo"
            if (u == [0, 1, 0, 2, 0] ) {
                return "leso de mierda"
            if (u == [0, 1, 0, 2, 1] ) {
                return "idiota"
            if (u == [0, 1, 0, 3, 0] ) {
                return "avíspate!"
            if (u == [0, 1, 0, 3, 1] ) {
                return "enfermo"

            if (u == [0, 0, 1, 2, 0] ) {
                return "estúpido!"
            if (u == [0, 0, 1, 2, 1] ) {
                return "estúpidos!"
            if (u == [0, 0, 1, 3, 0] ) {
                return "!100130aweonao"
            if (u == [0, 0, 1, 3, 1] ) {
                return "!00131aweonao"

        if ( p == "aweoná") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "zorra malparida"
            if (u == [1, 0, 0, 0, 1] ) {
                return "malparida"
            if (u == [1, 0, 0, 1, 0] ) {
                return "descerebrada"
            if (u == [1, 0, 0, 1, 1] ) {
                return "descerebradas"
            if (u == [1, 0, 0, 2, 0] ) {
                return "acéfala"
            if (u == [1, 0, 0, 2, 1] ) {
                return "acéfalas"
            if (u == [1, 0, 0, 3, 0] ) {
                return "tontona!"
            if (u == [1, 0, 0, 3, 1] ) {
                return "destartalada!"

            if (u == [0, 1, 0, 0, 0] ) {
                return "niña"
            if (u == [0, 1, 0, 0, 1] ) {
                return "sucia bueno para nada"
            if (u == [0, 1, 0, 1, 0] ) {
                return "loca"
            if (u == [0, 1, 0, 1, 1] ) {
                return "enferma"
            if (u == [0, 1, 0, 2, 0] ) {
                return "lesa de mierda"
            if (u == [0, 1, 0, 2, 1] ) {
                return "lesa"
            if (u == [0, 1, 0, 3, 0] ) {
                return "avíspate!"
            if (u == [0, 1, 0, 3, 1] ) {
                return "enferma"

            if (u == [0, 0, 1, 2, 0] ) {
                return "estúpida!"
            if (u == [0, 0, 1, 2, 1] ) {
                return "estúpidas!"
            if (u == [0, 0, 1, 3, 0] ) {
                return "!100130aweoná"
            if (u == [0, 0, 1, 3, 1] ) {
                return "!00131aweoná"

        if ( p == "wéa") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "tonto"
            if (u == [1, 0, 0, 0, 1] ) {
                return "tontos"
            if (u == [1, 0, 0, 1, 0] ) {
                return "mamona"
            if (u == [1, 0, 0, 1, 1] ) {
                return "raritas"
            if (u == [1, 0, 0, 2, 0] ) {
                return "jetón"
            if (u == [1, 0, 0, 2, 1] ) {
                return "fracasados"
            if (u == [1, 0, 0, 3, 0] ) {
                return "#10030wéá"
            if (u == [1, 0, 0, 3, 1] ) {
                return "#10031wéá"

            if (u == [0, 1, 0, 0, 0] ) {
                return "#01001wéá"
            if (u == [0, 1, 0, 0, 1] ) {
                return "#01010wéá"
            if (u == [0, 1, 0, 1, 0] ) {
                return "#01010wéá"
            if (u == [0, 1, 0, 1, 1] ) {
                return "#01011wéá"
            if (u == [0, 1, 0, 2, 0] ) {
                return "#01020wéá"
            if (u == [0, 1, 0, 2, 1] ) {
                return "#01021wéá"
            if (u == [0, 1, 0, 3, 0] ) {
                return "#01030wéá"
            if (u == [0, 1, 0, 3, 1] ) {
                return "#01031wéá"


            if (u == [0, 0, 1, 2, 0] ) {
                return "#00120wéá"
            if (u == [0, 0, 1, 2, 1] ) {
                return "#00121wéá"
            if (u == [0, 0, 1, 3, 0] ) {
                return "#00130wéa"
            if (u == [0, 0, 1, 3, 1] ) {
                return "#00131wéa"

        if ( p == "weón") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "bobo"
            if (u == [1, 0, 0, 0, 1] ) {
                return "tarados"
            if (u == [1, 0, 0, 2, 0] ) {
                return "tipejo"
            if (u == [1, 0, 0, 2, 1] ) {
                return "imbéciles!"
            if (u == [0, 1, 0, 0, 0] ) {
                return "zopenco"
            if (u == [0, 1, 0, 0, 1] ) {
                return "malditos buenos para nada"
            if (u == [0, 1, 0, 2, 0] ) {
                return "hijo de perra"
            if (u == [0, 1, 0, 2, 1] ) {
                return "hijos de perra"
            if (u == [0, 0, 1, 2, 0] ) {
                return "inútil"
            if (u == [0, 0, 1, 2, 1] ) {
                return "inútiles"


            } else {
                #weon sería solo una muletilla.
                return 'maldita sea!!'

        if ( p == "weona") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "amiga!"
            if (u == [1, 0, 0, 0, 1] ) {
                return "amiga"
            if (u == [1, 0, 0, 1, 0] ) {
                return "tipeja"
            if (u == [1, 0, 0, 1, 1] ) {
                return "mujeres de mala muerte"
            if (u == [1, 0, 0, 2, 0] ) {
                return "amiga"
            if (u == [1, 0, 0, 2, 1] ) {
                return "amiga"
            if (u == [1, 0, 0, 3, 0] ) {
                return "niña!"
            if (u == [1, 0, 0, 3, 1] ) {
                return "lesas"

            if (u == [0, 1, 0, 0, 0] ) {
                return "boba"
            if (u == [0, 1, 0, 0, 1] ) {
                return "zorras"
            if (u == [0, 1, 0, 1, 0] ) {
                return "trepadora"
            if (u == [0, 1, 0, 1, 1] ) {
                return "culisueltas"
            if (u == [0, 1, 0, 2, 0] ) {
                return "amiga!"
            if (u == [0, 1, 0, 2, 1] ) {
                return "amiga?"
            if (u == [0, 1, 0, 3, 0] ) {
                return "amiga#"
            if (u == [0, 1, 0, 3, 1] ) {
                return "chiquilla"


            if (u == [0, 0, 1, 2, 0] ) {
                return "estúpido"
            if (u == [0, 0, 1, 2, 1] ) {
                return "estúpidos"
            if (u == [0, 0, 1, 3, 0] ) {
                return "ridícula"
            if (u == [0, 0, 1, 3, 1] ) {
                return "ridículas"

        if ( p == "weones") {
            if (u == [1, 0, 0, 0, 0] ) {
                return "giles"
            if (u == [1, 0, 0, 0, 1] ) {
                return "pelagatos"
            if (u == [1, 0, 0, 1, 0] ) {
                return ", #10010wns"
            if (u == [1, 0, 0, 1, 1] ) {
                return "#10011wns"
            if (u == [1, 0, 0, 2, 0] ) {
                return "lerdos"
            if (u == [1, 0, 0, 2, 1] ) {
                return "tipejos"
            if (u == [1, 0, 0, 3, 0] ) {
                return "bastardos"
            if (u == [1, 0, 0, 3, 1] ) {
                return "#10031wns"

            if (u == [0, 1, 0, 0, 0] ) {
                return "#01000wns"
            if (u == [0, 1, 0, 0, 1] ) {
                return "imbéciles"
            if (u == [0, 1, 0, 1, 0] ) {
                return "inútiles"
            if (u == [0, 1, 0, 1, 1] ) {
                return "#01011wns"
            if (u == [0, 1, 0, 2, 0] ) {
                return "pendejos"
            if (u == [0, 1, 0, 2, 1] ) {
                return "pendejos"
            if (u == [0, 1, 0, 3, 0] ) {
                return "feos"
            if (u == [0, 1, 0, 3, 1] ) {
                return "sucios"
            if (u == [0, 0, 1, 2, 0] ) {
                return "estúpidos"
            if (u == [0, 0, 1, 2, 1] ) {
                return "malolientes"
}

const wn = Wn()
export default wn
