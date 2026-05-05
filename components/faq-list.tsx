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
      className="rounded-lg border border-border bg-card/92 px-6 shadow-sm"
    >
      {items.map((faq, index) => (
        <Reveal key={faq.question} as="div" y={12} amount={0.1}>
          <AccordionItem value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base font-semibold sm:text-lg">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-sm leading-7 text-muted-foreground sm:text-base">{faq.answer}</AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}
