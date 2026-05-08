import { TrashIcon } from "@phosphor-icons/react";
import Btn from "./Btn";

export default function DeletionModal() {
    function deleteData() {
        window.location.href = '/';
    }

    return (
        <div className="fixed z-5 top-0 left-0 w-screen h-screen bg-dark-green-50 backdrop-blur-xs flex items-center justify-center">
            <div className="gap-5 flex flex-col justify-center align-center text-white bg-dark-green p-5 border-secondary border-3 rounded-xl max-w-2/4">
                <h1 className="text-2xl text-center">ATENÇÃO!</h1>
                <p className="text-justify [text-align-last:center]">
                    Nem todos os serviços online oferecem formas reais de apagar seus dados. muitos sites — especialmente os das big techs — não têm maneiras efetivas de exclusão completa, nem sempre sequer por via judicial. Dados podem permanecer em backups, registros internos e sistemas de terceiros; logs e cópias podem ser replicados sem que você saiba. Tenha cuidado com o seu rastro digital: minimize o que compartilha, revise permissões, use contas separadas quando possível e prefira serviços que publiquem políticas claras e mecanismos verificáveis de eliminação de dados.
                </p>
                <Btn Fallback={deleteData} Icon={TrashIcon} Size={26}></Btn>
            </div>
        </div>
    )
}