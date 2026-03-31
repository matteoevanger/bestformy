export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
              {item.question}
              <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                &#9662;
              </span>
            </summary>
            <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
