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
            console.log("Resolver");
            if (!this.validarFraccion(this.fraccion1) || !this.validarFraccion(this.fraccion2)) {
                return;
            }
            const f1 = new Fraccion(this.fraccion1.numerador, this.fraccion1.denominador);
            const f2 = new Fraccion(this.fraccion2.numerador, this.fraccion2.denominador);
            let resultado = null;
            switch (this.operacion) {
                case "suma":
                    resultado = f1.suma(f2).simplifica();
                    break;
                case "resta":
                    resultado = f1.resta(f2).simplifica();
                    break;
                case "multiplicacion":
                    resultado = f1.producto(f2).simplifica();
                    break;
                case "division":
                    resultado = f1.cociente(f2).simplifica();
                    break;
            }
            this.resultado = resultado;
            this.resultadoMixto = FraccionMixta.desdeImpropia(resultado);
        }
    }
});