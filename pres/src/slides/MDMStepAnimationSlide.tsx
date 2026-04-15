import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";
import mdmImage from "../assets/mdmstep.png";

export function MDMStepAnimationSlide() {
  return (
    <SlideShell title="Обобщённый MDM-метод: выбор индексов">
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="grid grid-cols-2 gap-6 text-center text-[16px] text-neutral-800">
          <div className="space-y-4">
            <div>
              <MInline
                math={String.raw`
                  \max_{i\in M_1^+(u_k)} \langle p_i, w_k\rangle
                  =
                  \langle p_{j'_k}, w_k\rangle
                `}
              />
            </div>
            <div>
              <MInline
                math={String.raw`
                  \min_{i\in 1:s} \langle p_i, w_k\rangle
                  =
                  \langle p_{j''_k}, w_k\rangle
                `}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <MInline
                math={String.raw`
                  \max_{i\in M_2^+(u_k)} \langle p_i, -w_k\rangle
                  =
                  \langle p_{l'_k}, -w_k\rangle
                `}
              />
            </div>
            <div>
              <MInline
                math={String.raw`
                  \min_{i\in (s+1):m} \langle p_i, -w_k\rangle
                  =
                  \langle p_{l''_k}, -w_k\rangle
                `}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center overflow-hidden rounded-[20px]">
          <img
            src={mdmImage}
            alt="MDM step"
            className="h-[430px] object-contain scale-[1.03]"
          />
        </div>
      </div>
    </SlideShell>
  );
}