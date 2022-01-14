export default class Wn {

    constructor() {
        this.trad = ""
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

    } len (obj) {
      return obj.length

    } includeIn (a,b){
        let ret = false
        if (typeof a === "string" && typeof b === "object")
          return b.includes(a)
        return ret

    } lexicParser(L) {
        // L = L.replace('ebia','ebe')
        L = L.toLowerCase()
        L = L.replace('ahueon', 'aweon')
        L = L.replace('agueon', 'aweon')
        L = L.replace('wueo', 'weó')
        L = L.replace('wueó', 'weó')
        L = L.replace('hueo', 'weó')
        L = L.replace('hueó', 'weó')
        L = L.replace('gueo', 'weo')
        L = L.replace('gueó', 'weó')
        L = L.replace('huebo', 'weó')
        L = L.replace('huebó', 'weó')
        L = L.replace('guebo', 'weó')
        L = L.replace('guebó', 'weó')
        L = L.replace('huebe', 'webe')
        L = L.replace('guebe', 'webea')
        L = L.replace('huebe', 'webea')
        L = L.replace('webi', 'webe')
        L = L.replace('huebi', 'webe')
        L = L.replace('guebi', 'webe')
        L = L.replace('wéon ', 'weón ')
        L = L.replace('weon ', 'weón ')
        L = L.replace('wea ', 'weá ')
        L = L.replace('aweona ', 'aweoná ')
        L = L.replace('aweón', 'aweon')
        L = L.replace('awéon', 'aweon')
        if (this.len(L) === 3 && 'wea' === L)
          return "weá"

        var _L = L.split(' ')
        _L.map((x, index) => {
            var pal = this.borraPuntuacion(x)
            pal = pal.replace('aweón', 'aweon')
            pal = pal.replace('awéon', 'aweon')
            if (pal === 'wea' ||  pal === "weas") {
                var s = ''
                if (this.len(pal) === 4) {
                  s = 's'
                }
                x = `wea${s}`  // asumimos weá sobre wéa si no hay tildes.
            }

            if (this.len(pal) > 3
              && this.includeIn("nah", pal)
                ||  this.includeIn('náh', pal)) {
                x = x.replace('nah', 'ná')
                x = x.replace('náh', 'ná')
            }
          return x
        })
        L = _L.join(' ')
        return L

    } F_split(L, P) {
        let F = []
        for (let i = 0; i < this.len(P); i++){
            let p = P[i]
            let ip = L.indexOf(p)
            if (ip>-1){
                let Ftemp  = L.slice(0,ip)
                F.push(Ftemp)
                L = L.slice(ip+this.len(p))
            } else {
                F.push(L)
            }
      }
      if (this.len(F) === 0) {
          F.push(L)
      }
      console.log('F=',F)
      return F
    } rho(L) {
        let R = []
        let particulas = this._pwn
        L.split(' ').map((x, i) => {
            x = this.borraPuntuacion(x)
            if (this.len(x)>=3) {
                if(this.len(x) === 3 && this.includeIn(x,  particulas ) ) {
                    R.push(x)
                } else {
                    let test_p = x.slice(0,4)
                    if (this.includeIn(test_p,particulas)) {
                        R.push(x)
                    }
                }
            }
        })
        return R

    } borraPuntuacion(x) {
        // return re.sub('[^a-záóíA-Z0-9]+', '', x)
        let ret = x
        try{
          ret = x.replace(/^[a-zA-Záóí]$/g, '');
        }catch(err){}
        return ret

    } esFraseNula(f) {
        f.map(x => {
            if (x != '') {
                return false
            }
        })
        return true

    } async getOmega(U, P, d) {
        let O = []
        for (let i=0; i < d ; i++){
            let y_translate = await this.deschilenizar(U[i],P[i])
            console.log(i,y_translate)
            O.push(y_translate)
        }
        return O

    } articulate(F, Omega) {
        let trad = F[0]
        // |F|>|O|>1
        Omega.map((y, i) => {
            if (y!=null)
                trad = trad + y
            if (i+1 < this.len(Omega))
                trad = trad + F[i + 1]
            if (i === this.len(Omega) - 1
              && this.len(F) > this.len(Omega)
              && this.len(F) > 0)
                trad = trad + F[-1]
        })
        return trad
    } setTrad(trad){
        this.trad = trad
    } async translate(_lambda, lang = "es") {
        let L = this.lexicParser(_lambda)
        let K = L.split(".")
        this.setTrad('')
        for (let i = 0; i<this.len(K); i++) {
            let kappa = K[i]
            console.log(kappa)
            let trad = this.trad
            let Pk = await this.rho(kappa)
            if (this.len(Pk) === 0) {
                trad = this.trad + kappa
            } else {
                let Fk = await this.F_split(kappa, Pk)
                console.log(Fk)
                let Uk = await this.getUpsilon(Fk,Pk)
                //console.log(Uk)
                let Ok = await this.getOmega(Uk, Pk, this.len(Pk))
                console.log('omega > ',Ok)
                let Ck = await this.articulate(Fk,Ok)
                Ck.replace(/^\w/, (c) => c.toUpperCase()); //capitalize in js
                trad = this.trad + Ck + "."
            }
            this.setTrad(trad)
        }
        let translated = this.trad
        console.log('!"#"#$#/',translated)
        // to_translate = trad
        // translated = GoogleTranslator(source='auto', target=lang).translate(to_translate)
        return translated

    } translateAndAnalize(_lambda) {
        /*text = this.translate(_lambda, 'en')
        a = this.getAnalysis(text)
        console.log(text, a)
        return [text, a]
        */
    } getUpsilon(F, P) {
        let U = []
        P.map((pwn, index) => {
            let f = F[index]
            let u = this.Upsilon(f, pwn)
            // console.log(f,pwn , u)
            U.push(u)
        })
        return U

    } Upsilon(F, pwn) {
        let upsilon = []
        let f = F.split(' ')
        // f = [this.borraPuntuacion(x) for this.includeIn(x,  f]
        f = f.map(x => this.borraPuntuacion(x))
        f = f.reverse()

        let a = this.primerArticulo(f)
        let b = this.primerPronombre(f)
        let c = this.primerSerConjugado(f)
        let u = [0,0,0]

        let c_gn = this.isSerConjugado(f[c], pwn)
        let a_gn = this.isArticuloDem(a, f[a], pwn)
        let b_gn = this.isPronomDemost(f[b], pwn)
        let v = [a_gn, b_gn, c_gn]

        let min = 2
        if (a < b) if (a_gn < c_gn) min = 0
        else if (b_gn < c_gn) min = 1
        else if (a = b = c === -1) min = -1

        if (min === -1 ||  this.esFraseNula(f) ) {
          // console.log('es frase NULA:',f,pwn)
          if (pwn === 'weás')
              u = [0, 1, 0, 3, 1] //
          if (pwn === 'weá')
              u = [0, 1, 0, 3, 0] // estúpido
          if (this.includeIn(pwn,  'weón aweonao'.split(' ')))
              u =  [1, 0, 0, 2, 0] // estúpido
          if (this.includeIn(pwn,  'weones aweonaos'.split(' ')))
              u =  [1, 0, 0, 2, 1] // estúpido9
          if (this.includeIn(pwn,  'weona aweoná'.split(' ')))
              u = [1, 0, 0, 3, 0] // estúpida
          if (this.includeIn(pwn,  'weonas aweonás'.split(' ')))
              u = [1, 0, 0, 3, 1] // estúpido
        } else {
            u[min] = 1
            u = u + v[min]
        }

        /*if (c > -1) {
            let c_gn = this.isSerConjugado(f[c], pwn)
            if (c_gn != false && c_gn != null)
                u = [0,0,1] + c_gn
        }
        if (a >-1  &&  a > b) {
            let a_gn = this.isArticuloDem(a, f[a], pwn)
            if (a_gn != false)
                u = [1,0,0] + a_gn
        }
        if (b >-1  &&  b > a) {
            let b_gn = this.isPronomDemost(f[b], pwn)
            if (b_gn != false)
                u = [0,1,0] + b_gn
        }
        if (-1< a < c)
            u = [1,0,0] + u.slice(3)
        if (-1< b < c)
            u = [0,1,0] + u.slice(3)

        if (u === '[0,0,0] ||  this.esFraseNula(f)) {
            // console.log('es frase NULA:',f,pwn)
            if (pwn === 'weás')
                u = [0, 1, 0, 3, 1] //
            if (pwn === 'weá')
                u = [0, 1, 0, 3, 0] // estúpido
            if (this.includeIn(pwn,  'weón aweonao'.split(' ')))
                u =  [1, 0, 0, 2, 0] // estúpido
            if (this.includeIn(pwn,  'weones aweonaos'.split(' ')))
                u =  [1, 0, 0, 2, 1] // estúpido9
            if (this.includeIn(pwn,  'weona aweoná'.split(' ')))
                u = [1, 0, 0, 3, 0] // estúpida
            if (this.includeIn(pwn,  'weonas aweonás'.split(' ')))
                u = [1, 0, 0, 3, 1] // estúpido
        }*/
        console.log('  u = ', u)
        return u

    } primerPronombre(f) {
        for (let i=0; i< this.len(f); i++) {
            if (f[i] != '') {
                let e = f[i]
                if (e[0] === 'e') {
                    e = 'é' + e.slice(1)
                }
                if ( this.includeIn(e, this.pron_dem)) {
                    return i
                }
            }
        }
        return -1

    } primerArticulo(f) {
        for (let i = 0; i<(this.len(f)); i++) {
            if (this.includeIn(f[i], this.articulos)) {
                return i
            }
        }
        return -1

    } primerSerConjugado(f) {
        for (let i=0; i< this.len(f); i++)
            if ( this.includeIn(f[i], this._conjugacion_SER))
                return i
        return -1


    } isArticuloDem(i, x, pwn) {

        if (x !== this.articulos)
            return false
        if (this.includeIn(x,  'la una'.split(' ') && this.includeIn(pwn,  "weona aweoná".split(' '))))
            return [1,0]
        if (this.includeIn(x,  'las unas'.split(' ') && this.includeIn(pwn,  "weonas aweonás".split(' '))))
            return [1,1]
        if (this.includeIn(x,  'la una'.split(' ') && pwn =="weá".split(' ')))
            return [2,0]
        if (this.includeIn(x,  'las unas'.split(' ') && pwn === "weás".split(' ')))
            return [2,1]
        if (this.includeIn(x,  'el un al del'.split(' ') && this.includeIn(pwn,  "weón aweonao".split(' '))))
            return [0,0]
        if (this.includeIn(x,  'el un al del'.split(' ') && this.includeIn(pwn,  "wéa wéas".split(' '))))
            return [2,0]
        if (this.includeIn(x,  'los unos'.split(' ') && this.includeIn(pwn,  "weones aweonaos".split(' '))))
            return [0,1]
        if (this.includeIn(x,  'los unos'.split(' ') && pwn =="wéas"))
            return [2,1]
        if (x === 'les') {
            if (i === 0)
                return 'FALTA ADJETIVO INTERMEDIO*'
            } else {
                if (this.includeIn(pwn,  'weón aweonaos weones wéas'.split(' ')))
                    return [2, 1]
                if (this.includeIn(pwn,  'weonas aweonás'.split(' ')))
                    return [3, 1]
            }


        return false


    } isPronomDemost(x, pwn) {
        if (!x)  return false

        if(x[0]=='e')
            x = 'é' + x.slice(1)
        if(x.slice(0,4)=='aque')
            x = 'aqué' + x.slice(4)
        if (x !== this.pron_dem)
            return false
        if (this.includeIn(x,  'éste ése aquél'.split(' '))
          && this.includeIn(pwn,  'weón aweonao'.split(' ')))
            return [0,0]
        if (this.includeIn(x,  'ésta ésa'.split(' '))
          && this.includeIn(pwn,  'weona aweoná'.split(' ')))
            return [1,0]
        if (this.includeIn(x,  'éstos ésos aquéllos'.split(' '))
          && this.includeIn(pwn,  'weones aweonaos'.split(' ')))
            return [0,1]
        if (this.includeIn(x,  'éstas ésas'.split(' '))
          && this.includeIn(pwn,  'weonas aweonás'.split(' ')))
            return [1,1]
        if (this.includeIn(x,  'ésto éso aquéllo'.split(' '))
          && this.includeIn(pwn,  'weón wéa aweonao'.split(' ')))
            return [2,0]
        if (this.includeIn(x,  'ésa aquélla')
          && this.includeIn(pwn,  'weá'.split(' ')))
            return [3,0]
        if (x === 'aquéllas' && this.includeIn(pwn,  'weás'.split(' ')))
            return [3,1]
        if (x === 'aquéllos' && this.includeIn(pwn,  'wéas'.split(' ')))
            return [2,1]
        return false

    } isSerConjugado(x, pwn) {
        // como es verbo conjugado,, solo se queda con el género neutro del pwn
        if (x !== this._conjugacion_SER)
            return false
        if (this.includeIn(pwn,  ['weá']))
            return [3,0]
        if (this.includeIn(pwn,  ['weás']))
            return [3,1]
        if (this.includeIn(pwn,  ['weón', 'aweonao', 'wéa']))
            return [2,0]
        if (this.includeIn(pwn,  ['wéas']))
            return [2,1]
        if (this.includeIn(pwn,  ['weones', 'aweonaos']))
            return [2,1]
        if (this.includeIn(pwn,  ['weona, aweoná']))
            return[3,0]
        if (this.includeIn(pwn,  ['weonas, aweonás']))
            return[3,1]



    } deschilenizar(u,p) {
        u = u.toString()
        if ( p === "weá") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "#10000weá"
            if (u === '[1, 0, 0, 0, 1]' )
                return "#10001weá"
            if (u === '[1, 0, 0, 1, 0]' )
                return "#10010weá"
            if (u === '[1, 0, 0, 1, 1]' )
                return "#10011weá"
            if (u === '[1, 0, 0, 2, 0]' )
                return "asunto"
            if (u === '[1, 0, 0, 2, 1]' )
                return "asuntos"
            if (u === '[1, 0, 0, 3, 0]' )
                return "situación"
            if (u === '[1, 0, 0, 3, 1]' )
                return "cosas*"

            if (u === '[0, 1, 0, 0, 0]' )
                return "#01001weá"
            if (u === '[0, 1, 0, 0, 1]' )
                return "#01010weá"
            if (u === '[0, 1, 0, 1, 0]' )
                return "#01010weá"
            if (u === '[0, 1, 0, 1, 1]' )
                return "#01011weá"
            if (u === '[0, 1, 0, 2, 0]' )
                return "cosa"
            if (u === '[0, 1, 0, 2, 1]' )
                return "cosas"
            if (u === '[0, 1, 0, 3, 0]' )
                return "cosa"
            if (u === '[0, 1, 0, 3, 1]' )
                return "cosas"


            if (u === '[0, 0, 1, 2, 0]' )
                return "#00120weá"
            if (u === '[0, 0, 1, 2, 1]' )
                return "#00121weá"
            if (u === '[0, 0, 1, 3, 0]' )
                return "definición"
            if (u === '[0, 0, 1, 3, 1]' )
                return "#00131weá"

        }
        if ( p === "weás") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "#10000weás"
            if (u === '[1, 0, 0, 0, 1]' )
                return "#10001weás"
            if (u === '[1, 0, 0, 1, 0]' )
                return "#10010weás"
            if (u === '[1, 0, 0, 1, 1]' )
                return "#10011weás"
            if (u === '[1, 0, 0, 2, 0]' )
                return "tontera"
            if (u === '[1, 0, 0, 2, 1]' )
                return "cizañerías"
            if (u === '[1, 0, 0, 3, 0]' )
                return "tontería"
            if (u === '[1, 0, 0, 3, 1]' )
                return "tonterías"

            if (u === '[0, 1, 0, 0, 0]' )
                return "#01001weás"
            if (u === '[0, 1, 0, 0, 1]' )
                return "#01010weás"
            if (u === '[0, 1, 0, 1, 0]' )
                return "#01010weás"
            if (u === '[0, 1, 0, 1, 1]' )
                return "#01011weás"
            if (u === '[0, 1, 0, 2, 0]' )
                return "#01020weás"
            if (u === '[0, 1, 0, 2, 1]' )
                return "#01021weás"
            if (u === '[0, 1, 0, 3, 0]' )
                return "tontería"
            if (u === '[0, 1, 0, 3, 1]' )
                return "boberías"


            if (u === '[0, 0, 1, 2, 0]' )
                return "#00120weás"
            if (u === '[0, 0, 1, 2, 1]' )
                return "#00121weás"
            if (u === '[0, 0, 1, 3, 0]' )
                return "#00130weás"
            if (u === '[0, 0, 1, 3, 1]' )
                return "#00131weás"

        }
        if ( p === "wéas") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "#10000wéás"
            if (u === '[1, 0, 0, 0, 1]' )
                return "#10001wéás"
            if (u === '[1, 0, 0, 1, 0]' )
                return "#10010wéás"
            if (u === '[1, 0, 0, 1, 1]' )
                return "#10011wéás"
            if (u === '[1, 0, 0, 2, 0]' )
                return "tontera"
            if (u === '[1, 0, 0, 2, 1]' )
                return "cizañerías"
            if (u === '[1, 0, 0, 3, 0]' )
                return "#10030wéás"
            if (u === '[1, 0, 0, 3, 1]' )
                return "#10031wéás"

            if (u === '[0, 1, 0, 0, 0]' )
                return "#01001wéás"
            if (u === '[0, 1, 0, 0, 1]' )
                return "#01010wéás"
            if (u === '[0, 1, 0, 1, 0]' )
                return "#01010wéás"
            if (u === '[0, 1, 0, 1, 1]' )
                return "#01011wéás"
            if (u === '[0, 1, 0, 2, 0]' )
                return "#01020wéás"
            if (u === '[0, 1, 0, 2, 1]' )
                return "#01021wéás"
            if (u === '[0, 1, 0, 3, 0]' )
                return "#01030wéás"
            if (u === '[0, 1, 0, 3, 1]' )
                return "#01031wéás"


            if (u === '[0, 0, 1, 2, 0]' )
                return "#00120wéás"
            if (u === '[0, 0, 1, 2, 1]' )
                return "#00121wéás"
            if (u === '[0, 0, 1, 3, 0]' )
                return "#00130wéas"
            if (u === '[0, 0, 1, 3, 1]' )
                return "#00131wéas"
        }
        if ( p === "aweonao") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "imbécil"
            if (u === '[1, 0, 0, 0, 1]' )
                return "imbéciles"
            if (u === '[1, 0, 0, 1, 0]' )
                return "descerebrado"
            if (u === '[1, 0, 0, 1, 1]' )
                return "malnacidos"
            if (u === '[1, 0, 0, 2, 0]' )
                return ",subnormal"
            if (u === '[1, 0, 0, 2, 1]' )
                return ",subnormales"
            if (u === '[1, 0, 0, 3, 0]' )
                return "tontona"
            if (u === '[1, 0, 0, 3, 1]' )
                return "destartalado!"

            if (u === '[0, 1, 0, 0, 0]' )
                return "inútil"
            if (u === '[0, 1, 0, 0, 1]' )
                return "sucio bueno para nada"
            if (u === '[0, 1, 0, 1, 0]' )
                return "atorrante"
            if (u === '[0, 1, 0, 1, 1]' )
                return "enfermo"
            if (u === '[0, 1, 0, 2, 0]' )
                return "leso de mierda"
            if (u === '[0, 1, 0, 2, 1]' )
                return "idiota"
            if (u === '[0, 1, 0, 3, 0]' )
                return "avíspate!"
            if (u === '[0, 1, 0, 3, 1]' )
                return "enfermo"

            if (u === '[0, 0, 1, 2, 0]' )
                return "estúpido!"
            if (u === '[0, 0, 1, 2, 1]' )
                return "estúpidos!"
            if (u === '[0, 0, 1, 3, 0]' )
                return "!100130aweonao"
            if (u === '[0, 0, 1, 3, 1]' )
                return "!00131aweonao"
        }
        if ( p === "aweoná") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "zorra malparida"
            if (u === '[1, 0, 0, 0, 1]' )
                return "malparida"
            if (u === '[1, 0, 0, 1, 0]' )
                return "descerebrada"
            if (u === '[1, 0, 0, 1, 1]' )
                return "descerebradas"
            if (u === '[1, 0, 0, 2, 0]' )
                return "acéfala"
            if (u === '[1, 0, 0, 2, 1]' )
                return "acéfalas"
            if (u === '[1, 0, 0, 3, 0]' )
                return "tontona!"
            if (u === '[1, 0, 0, 3, 1]' )
                return "destartalada!"

            if (u === '[0, 1, 0, 0, 0]' )
                return "niña"
            if (u === '[0, 1, 0, 0, 1]' )
                return "sucia bueno para nada"
            if (u === '[0, 1, 0, 1, 0]' )
                return "loca"
            if (u === '[0, 1, 0, 1, 1]' )
                return "enferma"
            if (u === '[0, 1, 0, 2, 0]' )
                return "lesa de mierda"
            if (u === '[0, 1, 0, 2, 1]' )
                return "lesa"
            if (u === '[0, 1, 0, 3, 0]' )
                return "avíspate!"
            if (u === '[0, 1, 0, 3, 1]' )
                return "enferma"

            if (u === '[0, 0, 1, 2, 0]' )
                return "estúpida!"
            if (u === '[0, 0, 1, 2, 1]' )
                return "estúpidas!"
            if (u === '[0, 0, 1, 3, 0]' )
                return "!100130aweoná"
            if (u === '[0, 0, 1, 3, 1]' )
                return "!00131aweoná"
        }
        if ( p === "wéa") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "tonto"
            if (u === '[1, 0, 0, 0, 1]' )
                return "tontos"
            if (u === '[1, 0, 0, 1, 0]' )
                return "mamona"
            if (u === '[1, 0, 0, 1, 1]' )
                return "raritas"
            if (u === '[1, 0, 0, 2, 0]' )
                return "jetón"
            if (u === '[1, 0, 0, 2, 1]' )
                return "fracasados"
            if (u === '[1, 0, 0, 3, 0]' )
                return "#10030wéá"
            if (u === '[1, 0, 0, 3, 1]' )
                return "#10031wéá"

            if (u === '[0, 1, 0, 0, 0]' )
                return "#01001wéá"
            if (u === '[0, 1, 0, 0, 1]' )
                return "#01010wéá"
            if (u === '[0, 1, 0, 1, 0]' )
                return "#01010wéá"
            if (u === '[0, 1, 0, 1, 1]' )
                return "#01011wéá"
            if (u === '[0, 1, 0, 2, 0]' )
                return "#01020wéá"
            if (u === '[0, 1, 0, 2, 1]' )
                return "#01021wéá"
            if (u === '[0, 1, 0, 3, 0]' )
                return "#01030wéá"
            if (u === '[0, 1, 0, 3, 1]' )
                return "#01031wéá"


            if (u === '[0, 0, 1, 2, 0]' )
                return "#00120wéá"
            if (u === '[0, 0, 1, 2, 1]' )
                return "#00121wéá"
            if (u === '[0, 0, 1, 3, 0]' )
                return "#00130wéa"
            if (u === '[0, 0, 1, 3, 1]' )
                return "#00131wéa"
        }
        if ( p === "weón") {
          console.log(u)
          if (u.toString() == [ 1, 0, 0, 2, 0 ].toString() )
              return "tipejo"
            if (u === '[1, 0, 0, 0, 0]' )
                return "bobo"
            if (u === '[1, 0, 0, 0, 1]' )
                return "tarados"

            if (u === '[1, 0, 0, 2, 1]' )
                return "imbéciles!"
            if (u === '[0, 1, 0, 0, 0]' )
                return "zopenco"
            if (u === '[0, 1, 0, 0, 1]' )
                return "malditos buenos para nada"
            if (u === '[0, 1, 0, 2, 0]' )
                return "hijo de perra"
            if (u === '[0, 1, 0, 2, 1]' )
                return "hijos de perra"
            if (u === '[0, 0, 1, 2, 0]' )
                return "inútil"
            if (u === '[0, 0, 1, 2, 1]' )
                return "inútiles"
            else
                return 'maldita sea!!' // weon sería solo una muletilla.
        }

        if ( p === "weona") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "amiga!"
            if (u === '[1, 0, 0, 0, 1]' )
                return "amiga"
            if (u === '[1, 0, 0, 1, 0]' )
                return "tipeja"
            if (u === '[1, 0, 0, 1, 1]' )
                return "mujeres de mala muerte"
            if (u === '[1, 0, 0, 2, 0]' )
                return "amiga"
            if (u === '[1, 0, 0, 2, 1]' )
                return "amiga"
            if (u === '[1, 0, 0, 3, 0]' )
                return "niña!"
            if (u === '[1, 0, 0, 3, 1]' )
                return "lesas"

            if (u === '[0, 1, 0, 0, 0]' )
                return "boba"
            if (u === '[0, 1, 0, 0, 1]' )
                return "zorras"
            if (u === '[0, 1, 0, 1, 0]' )
                return "trepadora"
            if (u === '[0, 1, 0, 1, 1]' )
                return "culisueltas"
            if (u === '[0, 1, 0, 2, 0]' )
                return "amiga!"
            if (u === '[0, 1, 0, 2, 1]' )
                return "amiga?"
            if (u === '[0, 1, 0, 3, 0]' )
                return "amiga#"
            if (u === '[0, 1, 0, 3, 1]' )
                return "chiquilla"


            if (u === '[0, 0, 1, 2, 0]' )
                return "estúpido"
            if (u === '[0, 0, 1, 2, 1]' )
                return "estúpidos"
            if (u === '[0, 0, 1, 3, 0]' )
                return "ridícula"
            if (u === '[0, 0, 1, 3, 1]' )
                return "ridículas"
        }

        if ( p === "weones") {
            if (u === '[1, 0, 0, 0, 0]' )
                return "giles"
            if (u === '[1, 0, 0, 0, 1]' )
                return "pelagatos"
            if (u === '[1, 0, 0, 1, 0]' )
                return ", #10010wns"
            if (u === '[1, 0, 0, 1, 1]' )
                return "#10011wns"
            if (u === '[1, 0, 0, 2, 0]' )
                return "lerdos"
            if (u === '[1, 0, 0, 2, 1]' )
                return "tipejos"
            if (u === '[1, 0, 0, 3, 0]' )
                return "bastardos"
            if (u === '[1, 0, 0, 3, 1]' )
                return "#10031wns"

            if (u === '[0, 1, 0, 0, 0]' )
                return "#01000wns"
            if (u === '[0, 1, 0, 0, 1]' )
                return "imbéciles"
            if (u === '[0, 1, 0, 1, 0]' )
                return "inútiles"
            if (u === '[0, 1, 0, 1, 1]' )
                return "#01011wns"
            if (u === '[0, 1, 0, 2, 0]' )
                return "pendejos"
            if (u === '[0, 1, 0, 2, 1]' )
                return "pendejos"
            if (u === '[0, 1, 0, 3, 0]' )
                return "feos"
            if (u === '[0, 1, 0, 3, 1]' )
                return "sucios"
            if (u === '[0, 0, 1, 2, 0]' )
                return "estúpidos"
            if (u === '[0, 0, 1, 2, 1]' )
                return "malolientes"
      }
    }
}
