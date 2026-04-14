import { SlideShell } from "../components/SlideShell";
import { MInline, MathParagraph } from "../components/Math";

function GeometryScene() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 760 420" className="w-full">
        <rect x="0" y="0" width="760" height="420" fill="#ffffff" />

        <ellipse
          cx="185"
          cy="240"
          rx="120"
          ry="92"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="3"
        />
        <ellipse
          cx="575"
          cy="185"
          rx="124"
          ry="96"
          fill="#fee2e2"
          stroke="#dc2626"
          strokeWidth="3"
        />

        <circle cx="145" cy="225" r="10" fill="#2563eb" />
        <circle cx="190" cy="198" r="10" fill="#2563eb" />
        <circle cx="225" cy="255" r="10" fill="#2563eb" />
        <circle cx="165" cy="290" r="10" fill="#2563eb" />

        <circle cx="525" cy="160" r="10" fill="#dc2626" />
        <circle cx="600" cy="180" r="10" fill="#dc2626" />
        <circle cx="558" cy="242" r="10" fill="#dc2626" />
        <circle cx="625" cy="225" r="10" fill="#dc2626" />

        <line x1="335" y1="95" x2="435" y2="310" stroke="#111827" strokeWidth="5" />
        <line
          x1="297"
          y1="109"
          x2="397"
          y2="324"
          stroke="#10b981"
          strokeWidth="3"
          strokeDasharray="8 8"
        />
        <line
          x1="373"
          y1="81"
          x2="473"
          y2="296"
          stroke="#10b981"
          strokeWidth="3"
          strokeDasharray="8 8"
        />

        <line x1="258" y1="225" x2="503" y2="181" stroke="#7c3aed" strokeWidth="4" />
        <circle cx="305" cy="216" r="9" fill="#7c3aed" />
        <circle cx="454" cy="190" r="9" fill="#7c3aed" />

        <text x="100" y="355" fontSize="24" fill="#1d4ed8" fontWeight="600">
          C₁
        </text>
        <text x="635" y="330" fontSize="24" fill="#b91c1c" fontWeight="600">
          C₂
        </text>
        <text x="360" y="170" fontSize="22" fill="#059669" fontWeight="600">
          margin
        </text>
        <text x="347" y="248" fontSize="22" fill="#6d28d9" fontWeight="600">
          w*
        </text>
      </svg>
    </div>
  );
}

export function GeometryInterpretationSlide() {
  return (
    <SlideShell
      eyebrow="Геометрия"
      title="Геометрическая интерпретация"
      subtitle="Переход от отдельных точек к выпуклым оболочкам двух классов"
    >
      <div className="grid h-full grid-cols-[1.12fr_0.88fr] gap-10 items-center">
        <GeometryScene />

        <div className="space-y-6">
          <MathParagraph>
            Вместо отдельных точек удобно рассматривать выпуклые оболочки двух
            классов, которые обозначаются через <MInline math={String.raw`C_1`} />{" "}
            и <MInline math={String.raw`C_2`} />.
          </MathParagraph>

          <MathParagraph>
            Если классы линейно разделимы, то их выпуклые оболочки не
            пересекаются:
            <span className="ml-2">
              <MInline math={String.raw`C_1 \cap C_2 = \varnothing`} />
            </span>
            .
          </MathParagraph>

          <MathParagraph>
            Тогда между этими множествами существует пара ближайших точек{" "}
            <MInline math={String.raw`w_1^* \in C_1`} /> и{" "}
            <MInline math={String.raw`w_2^* \in C_2`} />.
          </MathParagraph>

          <MathParagraph>
            Вектор{" "}
            <MInline math={String.raw`w^* = w_1^* - w_2^*`} /> соединяет
            ближайшие точки оболочек и задаёт направление нормали к оптимальной
            разделяющей гиперплоскости.
          </MathParagraph>

          <MathParagraph>
            Таким образом, задача максимального зазора получает естественную
            геометрическую интерпретацию через расстояние между двумя выпуклыми
            множествами.
          </MathParagraph>
        </div>
      </div>
    </SlideShell>
  );
}