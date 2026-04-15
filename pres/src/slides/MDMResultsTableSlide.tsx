import { SlideShell } from "../components/SlideShell";

export function MDMResultsTableSlide() {
  const rows = [
    {
      n: 200,
      accMdm: "1.000",
      accSvm: "1.000",
      cos: "1.000000",
      marginDiff: "0.000424",
      timeMdm: "0.0265",
      timeSvm: "0.0009",
    },
    {
      n: 500,
      accMdm: "1.000",
      accSvm: "1.000",
      cos: "1.000000",
      marginDiff: "0.000075",
      timeMdm: "0.0956",
      timeSvm: "0.0008",
    },
    {
      n: 1000,
      accMdm: "1.000",
      accSvm: "1.000",
      cos: "0.999999",
      marginDiff: "0.000450",
      timeMdm: "0.2951",
      timeSvm: "0.0009",
    },
    {
      n: 2000,
      accMdm: "1.000",
      accSvm: "1.000",
      cos: "1.000000",
      marginDiff: "0.000000",
      timeMdm: "0.9756",
      timeSvm: "0.0012",
    },
  ];

  return (
    <SlideShell title="Результаты сравнения MDM и SVM">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Усреднённые результаты по размеру выборки
          </div>

          <div className="overflow-hidden rounded-[18px] border border-neutral-200">
            <table className="w-full border-collapse text-left">
              <thead className="bg-neutral-50">
                <tr className="text-[15px] uppercase tracking-[0.08em] text-neutral-500">
                  <th className="px-4 py-3 font-semibold">n</th>
                  <th className="px-4 py-3 font-semibold">Acc MDM</th>
                  <th className="px-4 py-3 font-semibold">Acc SVM</th>
                  <th className="px-4 py-3 font-semibold">|cos|</th>
                  <th className="px-4 py-3 font-semibold">Разность ширины полосы</th>
                  <th className="px-4 py-3 font-semibold">time MDM</th>
                  <th className="px-4 py-3 font-semibold">time SVM</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.n}
                    className="border-t border-neutral-200 text-[18px] text-neutral-800"
                  >
                    <td className="px-4 py-3 font-semibold">{row.n}</td>
                    <td className="px-4 py-3">{row.accMdm}</td>
                    <td className="px-4 py-3">{row.accSvm}</td>
                    <td className="px-4 py-3">{row.cos}</td>
                    <td className="px-4 py-3">{row.marginDiff}</td>
                    <td className="px-4 py-3">{row.timeMdm}</td>
                    <td className="px-4 py-3">{row.timeSvm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-[18px] leading-7 text-neutral-700">
          MDM и SVM дают практически совпадающее решение по качеству и геометрии,
          однако реализация SVM из sklearn работает заметно быстрее.
        </div>
      </div>
    </SlideShell>
  );
}