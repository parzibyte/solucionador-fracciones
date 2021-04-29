/*

  ____          _____               _ _           _       
 |  _ \        |  __ \             (_) |         | |      
 | |_) |_   _  | |__) |_ _ _ __ _____| |__  _   _| |_ ___ 
 |  _ <| | | | |  ___/ _` | '__|_  / | '_ \| | | | __/ _ \
 | |_) | |_| | | |  | (_| | |   / /| | |_) | |_| | ||  __/
 |____/ \__, | |_|   \__,_|_|  /___|_|_.__/ \__, |\__\___|
         __/ |                               __/ |        
        |___/                               |___/         
    
____________________________________
/ Si necesitas ayuda, contáctame en \
\ https://parzibyte.me               /
 ------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
Creado por Parzibyte (https://parzibyte.me).
------------------------------------------------------------------------------------------------
            | IMPORTANTE |
Si vas a borrar este encabezado, considera:
Seguirme: https://parzibyte.me/blog/sigueme/
Y compartir mi blog con tus amigos
También tengo canal de YouTube: https://www.youtube.com/channel/UCroP4BTWjfM0CkGB6AFUoBg?sub_confirmation=1
Twitter: https://twitter.com/parzibyte
Facebook: https://facebook.com/parzibyte.fanpage
Instagram: https://instagram.com/parzibyte
Hacer una donación vía PayPal: https://paypal.me/LuisCabreraBenito
------------------------------------------------------------------------------------------------
*/
new Vue({
    el: "#app",
    data: () => ({
        fraccion1: {
            numerador: null,
            denominador: null,
        },
        fraccion2: {
            numerador: null,
            denominador: null,
        },
        resultado: {
            numerador: null,
            denominador: null,
        },
        resultadoMixto: null,
        operacion: "suma",
    }),
    methods: {
        enfocarDenominador() {
            this.$refs.denominador.focus();
            this.resolverOperacion();
        },
        enfocarSegundoNumerador() {
            this.$refs.segundoNumerador.focus();
            this.resolverOperacion();
        },
        enfocarSegundoDenominador() {
            this.$refs.segundoDenominador.focus();
            this.resolverOperacion();
        },
        validarFraccion(fraccion) {
            if (!fraccion.numerador || !fraccion.denominador) {
                return false;
            }
            return true;
        },
        resolverOperacion() {
            if (!this.validarFraccion(this.fraccion1) || !this.validarFraccion(this.fraccion2)) {
                return;
            }
            const f1 = new Fraccion(this.fraccion1.numerador, this.fraccion1.denominador);
            const f2 = new Fraccion(this.fraccion2.numerador, this.fraccion2.denominador);
            let resultado = null;
            switch (this.operacion) {
                case "suma":
                    resultado = f1.suma(f2);
                    break;
                case "resta":
                    resultado = f1.resta(f2);
                    break;
                case "multiplicacion":
                    resultado = f1.producto(f2);
                    break;
                case "division":
                    resultado = f1.cociente(f2);
                    break;
            }
            this.resultado = resultado.simplifica();
            this.resultadoMixto = FraccionMixta.desdeImpropia(this.resultado);
        }
    }
});