import Image from "next/image";
import { useRef } from "react";

export default function AgeConsent() {
  const modalRef = useRef(null);
  const memoize = () => {
    setCookie.set("ganjana_store_age_consent", "is18");
    modalRef.current.classList.remove('modal-open');
    modalRef.current.classList.add('modal-close');
  }

  return (
    <>
      <div className="modal modal-open bg-primary z-[9000]" ref={ modalRef }>
        <Image src="/icon.png" className="fixed top-[calc(50% - 320px)] opacity-[0.3]" alt="" width={400} height={400} priority />
        <div className="modal-box border border-secondary shadow-xl" style={{ background: 'rgba(0, 0, 0, 0.85)'}}>
          <h3 className="font-bold text-xl">Are you 20 years of age or older?</h3>
          <p className="py-4">By entering this site you are confirming that your 18 years of age or older. If you are under 20, please EXIT now.</p>
          <div className="modal-action flex gap-4">
            <label htmlFor="my-modal" className="btn flex-1 bg-success border-none" onClick={ memoize }>Yes</label>
            <label htmlFor="my-modal" className="btn flex-1 bg-error border-none" onClick={ () => { return; } }>No</label>
          </div>
        </div>
      </div>
    </>
  )
}