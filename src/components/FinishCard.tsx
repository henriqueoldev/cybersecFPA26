import { useEffect, useState } from "react";
import Btn from "./Btn";
import { TrashIcon } from "@phosphor-icons/react";
import fingerprint from './Fingerprinter'

type Response = { field: string; value: string; };

type Props = {
  Responses: Response[];
  Fallback: () => void;
  FaceId?: string | null;
};

export default function FinishCard({ Responses, Fallback, FaceId }: Props) {
  const [finishText, setFinishText] = useState<string>("");

  useEffect(() => {
    async function getData() {
      const parts: string[] = [];

      parts.push('---------------------------------------DADOS---------------------------------------')

      for (const resp of Responses) {
        if (resp.field.toLowerCase() === "nome" && resp.value) {
          try {
            const r = await fetch(
              `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${encodeURIComponent(resp.value)}`
            );
            const json = await r.json();
            parts.push(
              `${resp.field}: ${resp.value} - Existem ${json?.[0]?.res?.[8]?.frequencia ?? '0'} pessoas com o mesmo nome`
            );
          } catch (err) {
            parts.push(`Error: ${String(err)}`);
          }

        } else if (resp.field.toLowerCase() === "cep" && resp.value) {
          try {
            const r = await fetch(
              `https://viacep.com.br/ws/${encodeURIComponent(resp.value)}/json/`
            );
            const json = await r.json();
            Object.entries(json).forEach(([k, v]) =>
              parts.push(`${k}: ${v}`)
            );
          } catch (err) {
            parts.push(`Error: ${String(err)}`);
          }

        } else {
          parts.push(`${resp.field}: ${resp.value}`);
        }
      }

      parts.push('\n');
      parts.push('------------------------------------FACE ID----------------------------------------')
      parts.push('\n');
      if (FaceId) {
        parts.push(`face_id: ${FaceId}`);
        parts.push('Essa é a sua biometria facial, seu dado mais sensível. Evite que ela seja registrada sempre que possível.');
      } else {
        parts.push('face_id: não capturado');
      }
      
      parts.push('\n');
      parts.push('------------------------------------FINGERPRINT------------------------------------')
      parts.push('\n');
      let fp = await fingerprint();
      Object.entries(fp).forEach(([k, v]) => parts.push(`${k}: ${v}`));

      setFinishText(parts.join("\n\n"));
    }

    getData();
  }, [Responses, FaceId]);

  return (
    <div className="font-[GohuNerdMono] flex flex-col justify-between w-[90vw] text-accent h-[90vh] p-5 bg-black border-secondary border-5 rounded-xl">
      <h1 className="text-center text-3xl font-bold">IDENTIDADE DIGITAL</h1>

      <ul className="text-lg overflow-hidden overflow-y-scroll h-full text-wrap">
        <li>
          <pre className="p-3 word-break leading-[.5]">{finishText}</pre>
        </li>
      </ul>

      <div className="flex justify-end">
        <Btn Fallback={Fallback} Icon={TrashIcon} Text="Excluir" />
      </div>
    </div>
  );
}