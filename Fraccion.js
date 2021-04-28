class Fraccion {
    /*
        https://parzibyte.me/blog
    */
    constructor(numerador, denominador) {
        this.setNumerador(numerador);
        this.setDenominador(denominador);
    }

    setNumerador(numerador) {
        this.numerador = numerador;
    }
    setDenominador(denominador) {
        if (denominador === 0) {
            throw "El denominador debe ser distinto de 0";
        }
        this.denominador = denominador;
    }
    // Ayudantes

    maximoComunDivisor(a, b) {
        let temporal;//Para no perder b
        while (b != 0) {
            temporal = b;
            b = a % b;
            a = temporal;
        }
        return a;
    }

    minimoComunMultiplo(a, b) {
        return (a * b) / this.maximoComunDivisor(a, b);
    }
    // Operaciones

    suma(otra) {
        const mcm = this.minimoComunMultiplo(this.denominador, otra.denominador);
        const diferenciaFraccionActual = mcm / this.denominador;
        const diferenciaOtraFraccion = mcm / otra.denominador;
        const resultado = new Fraccion();
        resultado.setNumerador(
            (diferenciaFraccionActual * this.numerador) + (diferenciaOtraFraccion * otra.numerador));
        resultado.setDenominador(mcm);
        return resultado;
    }

    resta(otra) {
        const mcm = this.minimoComunMultiplo(this.denominador, otra.denominador);
        const diferenciaFraccionActual = mcm / this.denominador;
        const diferenciaOtraFraccion = mcm / otra.denominador;
        const resultado = new Fraccion();
        resultado.setNumerador(
            (diferenciaFraccionActual * this.numerador) - (diferenciaOtraFraccion * otra.numerador));
        resultado.setDenominador(mcm);
        return resultado;
    }

    producto(otra) {
        return new Fraccion(this.numerador * otra.numerador, this.denominador * otra.denominador);
    }

    cociente(otra) {
        return new Fraccion(this.numerador * otra.denominador, this.denominador * otra.numerador);
    }

    inversa() {
        return new Fraccion(this.denominador, this.numerador);
    }

    potencia(exponente) {
        return new Fraccion(Math.pow(this.numerador, exponente), Math.pow(this.denominador, exponente));
    }

    simplifica() {
        const mcd = this.maximoComunDivisor(this.numerador, this.denominador);
        return new Fraccion(this.numerador / mcd, this.denominador / mcd);
    }

    aMixta() {
        return FraccionMixta.desdeImpropia(this);
    }

    toString() {
        return `${this.numerador}/${this.denominador}`;
    }

    equals(otra) {
        return this.numerador === otra.numerador && this.denominador === otra.denominador;
    }
}

class FraccionMixta {

    /*
        https://parzibyte.me/blog
    */
    constructor(entero, fraccion) {
        this.entero = entero;
        this.fraccion = fraccion;
    }
    aImpropia() {
        let numerador = this.fraccion.numerador;
        if (this.entero) {
            numerador = numerador + (this.fraccion.denominador * this.entero);
        }
        return new Fraccion(numerador, this.fraccion.denominador);
    }

    static desdeImpropia(fraccion) {
        let entero = 0;
        if (fraccion.numerador >= fraccion.denominador) {
            entero = Math.floor(fraccion.numerador / fraccion.denominador);
            const residuo = fraccion.numerador % fraccion.denominador;
            if (residuo > 0) {
                fraccion = new Fraccion(residuo, fraccion.denominador);
            } else {
                fraccion = null;
            }
        }
        return new FraccionMixta(entero, fraccion);
    }

    toString() {
        let resultado = "";
        if (this.entero) {
            resultado = resultado.concat(this.entero);
            if (this.fraccion) {
                resultado = resultado.concat(" + ");
            }
        }
        if (this.fraccion) {
            resultado = resultado.concat(this.fraccion.toString());
        }
        return resultado;
    }
}