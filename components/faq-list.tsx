import { Reveal } from "@/components/animations/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-lg border border-border bg-card px-6"
    >
      {items.map((faq, index) => (
        <Reveal key={faq.question} as="div" y={12} amount={0.1}>
          <AccordionItem value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}
