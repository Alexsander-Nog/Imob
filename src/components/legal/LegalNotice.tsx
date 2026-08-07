import { useState } from "react";
import { LegalModal, type LegalDocument } from "./LegalModal";

export function LegalNotice() {
  const [openDocument, setOpenDocument] = useState<LegalDocument | null>(null);

  return (
    <>
      <p className="legal">
        Ao clicar em Prosseguir você concorda com os{" "}
        <button type="button" className="legal__link" onClick={() => setOpenDocument("terms")}>Termos de Uso</button>
        {" "}e a{" "}
        <button type="button" className="legal__link" onClick={() => setOpenDocument("privacy")}>Política de Privacidade</button>.
      </p>
      {openDocument && <LegalModal document={openDocument} onClose={() => setOpenDocument(null)} />}
    </>
  );
}
