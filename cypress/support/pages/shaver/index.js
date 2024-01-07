import header from "../../components/header";

class ShaversPage{

    constructor(){
        this.header = header
        //este header é igual ao header que eu estou importando
        //com isso criamos um objeto header dentro da página shaver. Ou seja, faz o que acontece no código: deixa o header disponível na página heaver
        //objetivo: fazer a automação seguir o reflexo visual da página que estamos testando, deixando o header (componente compartilhado) disponível dentre de Shavers
    }

}

export default new ShaversPage