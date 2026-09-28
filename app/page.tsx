"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Calculator,
  CheckCircle2,
  Clock,
  FileText,
  HeartHandshake,
  MapPin,
  Menu,
  Scale,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import GlowingButton from "./components/GlowingButton";

// DADOS DO CLIENTE - JACKSON SANTOS ADVOGADO PREVIDENCIARISTA
const CLIENT_CONFIG = {
  name: "Jackson Santos",
  title: "Advogado Previdenciarista",
  oab: "OAB/MG 226.978",
  city: "São João del-Rei · MG",
  address: "R. Artur Bernardes, 19 - Apto 101 - Centro, São João del Rei - MG, 36300-076",
  googleRating: "5,0",
  reviewsCount: "51",
  // Link oficial do WhatsApp (personalize o número se necessário)
  whatsappNumber: "5532999999999",
  whatsappUrl:
    "https://wa.me/5532999999999?text=Ol%C3%A1%2C%20Dr.%20Jackson!%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20especializada%20sobre%20meu%20benef%C3%ADcio%20do%20INSS.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jackson+Santos+Advogado+Previdenciarista+R.+Artur+Bernardes+19+Centro+Sao+Joao+del+Rei+MG",
};

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ÁREAS DE ATUAÇÃO PREVIDENCIÁRIA
const practiceAreas = [
  {
    id: "planejamento-aposentadoria",
    title: "Planejamento Previdenciário & Aposentadorias",
    tagline: "Conquiste o maior valor de aposentadoria no menor tempo.",
    icon: Calculator,
    summary:
      "Estudo detalhado do seu histórico contributivo (CNIS), simulação de regras de transição pós-Reforma e cálculo da RMI ideal para garantir sua tranquilidade futura.",
    details:
      "Aposentar-se sem planejamento pode custar milhares de reais em perdas financeiras irreversíveis. Nosso trabalho analisa cada vínculo empregatício, períodos sem recolhimento e regras de transição para identificar a data e a categoria mais vantajosa para você.",
    topics: [
      "Aposentadoria por Idade (Urbana e Rural)",
      "Aposentadoria por Tempo de Contribuição",
      "Aposentadoria Especial (Insalubridade e Periculosidade)",
      "Regras de Transição da Reforma da Previdência",
      "Cálculo da Renda Mensal Inicial (RMI)",
    ],
    whatsappQuery:
      "Olá, Dr. Jackson! Gostaria de fazer um Planejamento Previdenciário para minha Aposentadoria.",
  },
  {
    id: "bpc-loas",
    title: "BPC / LOAS (Idosos e Pessoas com Deficiência)",
    tagline: "1 salário mínimo mensal mesmo sem nunca ter contribuído ao INSS.",
    icon: HeartHandshake,
    summary:
      "Assistência jurídica completa para obtenção do BPC/LOAS destinado a idosos a partir de 65 anos ou pessoas com deficiência e doenças graves em situação de vulnerabilidade.",
    details:
      "O Benefício de Prestação Continuada (BPC/LOAS) é uma garantia constitucional fundamental. Auxiliamos na organização do CadÚnico, montagem probatória da composição e renda familiar, e reversão rápida de indeferimentos injustos perante o INSS ou Justiça Federal.",
    topics: [
      "BPC para Idosos a partir de 65 anos",
      "BPC para Pessoas com Deficiência de qualquer idade",
      "Doenças crônicas, incapacitantes ou TEA (Autismo)",
      "Análise de superação do critério de renda per capita",
      "Reversão de benefício bloqueado ou cancelado",
    ],
    whatsappQuery:
      "Olá, Dr. Jackson! Preciso de orientação jurídica sobre o BPC/LOAS.",
  },
  {
    id: "beneficios-incapacidade",
    title: "Benefícios por Incapacidade (Auxílio-Doença & Invalidez)",
    tagline: "Proteção imediata quando a saúde impede o exercício do seu trabalho.",
    icon: ShieldCheck,
    summary:
      "Atuação ágil em auxílio por incapacidade temporária (auxílio-doença), aposentadoria por invalidez e auxílio-acidente, com suporte completo para perícias e laudos médicos.",
    details:
      "Muitos trabalhadores doentes têm seus benefícios sumariamente cortados ou negados pela perícia médica do INSS. Ingressamos com medidas administrativas e judiciais para restabelecer o pagamento com urgência e garantir o recebimento de todos os atrasados devidos.",
    topics: [
      "Auxílio por Incapacidade Temporária (Auxílio-Doença)",
      "Aposentadoria por Incapacidade Permanente (Invalidez)",
      "Auxílio-Acidente (Indenização acumulável com salário)",
      "Adicional de 25% para quem necessita de cuidador",
      "Recurso judicial após corte indevido na perícia médica",
    ],
    whatsappQuery:
      "Olá, Dr. Jackson! Preciso de ajuda com meu Auxílio-Doença / Benefício por Incapacidade que foi negado ou cortado.",
  },
  {
    id: "pensao-por-morte",
    title: "Pensão por Morte & Amparo aos Dependentes",
    tagline: "Segurança financeira para os dependentes em momentos delicados.",
    icon: Scale,
    summary:
      "Concessão rápida da pensão por morte para cônjuges, companheiros, filhos e dependentes, com comprovação sólida de união estável e dependência econômica.",
    details:
      "Em momentos de luto, a burocracia do INSS não pode ser um obstáculo. Cuidamos de todo o processo de comprovação documental da qualidade de segurado do falecido e dos dependentes, revertendo indeferimentos com rapidez e sensibilidade humana.",
    topics: [
      "Pensão por morte para cônjuge ou companheiro(a)",
      "Comprovação de união estável com documentos e testemunhas",
      "Pensão para filhos menores ou inválidos",
      "Pensão para pais dependentes economicamente",
      "Cobrança de valores retroativos desde o óbito",
    ],
    whatsappQuery:
      "Olá, Dr. Jackson! Gostaria de atendimento sobre Pensão por Morte do INSS.",
  },
  {
    id: "revisoes-beneficios",
    title: "Revisão de Benefícios & Cálculo do Melhor Benefício",
    tagline: "Receba o valor justo corrigido e todas as parcelas retroativas.",
    icon: Award,
    summary:
      "Auditoria jurídica e contábil da sua carta de concessão para identificar erros de cálculo, tempo não computado e períodos especiais não convertidos pelo INSS.",
    details:
      "O INSS erra com frequência ao calcular o valor inicial das aposentadorias e pensões. Nossa formação técnica em contabilidade permite recalcular minuciosamente cada salário de contribuição para aumentar seu benefício mensal e cobrar atrasados dos últimos 5 anos.",
    topics: [
      "Inclusão de períodos de trabalho rural, militar ou menor aprendiz",
      "Conversão de tempo especial (atividades insalubres)",
      "Correção de divergências e pendências no CNIS",
      "Revisão do buraco negro, buraco verde e artigo 29",
      "Ação para recebimento de atrasados dos últimos 5 anos",
    ],
    whatsappQuery:
      "Olá, Dr. Jackson! Quero saber se minha aposentadoria/benefício pode ser revisada para aumentar o valor.",
  },
  {
    id: "negativas-mandado-seguranca",
    title: "Destravar Processos & Ações contra o INSS",
    tagline: "Fim da espera na fila sem resposta e combate a negativas abusivas.",
    icon: FileText,
    summary:
      "Uso de Mandado de Segurança para obrigar o INSS a analisar processos atrasados há meses e ações judiciais imediatas contra indeferimentos arbitrários.",
    details:
      "A lei estabelece prazos para o INSS responder aos pedidos, mas muitos processos ficam esquecidos em filas por 6 meses ou mais de 1 ano. Ingressamos com a medida judicial adequada para obrigar a autarquia a decidir imediatamente e pagar o que é seu por direito.",
    topics: [
      "Mandado de Segurança para processos travados na fila",
      "Ação Judicial contra negativa indevida do INSS",
      "Pedido de Tutela de Urgência (Liminar) para pagamento rápido",
      "Acertos de vínculos cadastrais e salariais no Meu INSS",
      "Orientação preventiva antes do protocolo para evitar negativas",
    ],
    whatsappQuery:
      "Olá, Dr. Jackson! Meu processo no INSS está travado há muito tempo / foi negado indevidamente.",
  },
];

// REVIEWS REAIS DO GOOGLE MAPS
const reviews = [
  {
    name: "Gustavo Santos",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Um advogado muito competente, dedicado e sempre bem recomendado por quem já precisou de seus serviços. Demonstra muito conhecimento na área e compromisso com seus clientes. Sem dúvida, é um profissional que indico com confiança.",
    ownerReply:
      "Muito obrigado pela confiança e pelas palavras, Gustavo! Atuar com ética, dedicação e compromisso na defesa dos direitos de cada cliente é a nossa missão diária.",
  },
  {
    name: "Júlia Sampaio",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente profissional! Muito atencioso com o cliente o processo. Indico de olhos fechados!",
    ownerReply:
      "Agradeço imensamente pela recomendação, Júlia! Manter o cliente seguro e bem orientado em cada fase do processo é prioridade absoluta.",
  },
  {
    name: "Albert Gustavo",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente profissional! Sabe lidar com o cliente de forma clara e objetiva!",
    ownerReply:
      "Muito obrigado, Albert! A clareza e a transparência são essenciais para que cada pessoa entenda perfeitamente seus direitos.",
  },
  {
    name: "Ederaldo José dos Santos",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente advogado! Dá todo o suporte necessário que precisamos. Atencioso, interessado e educado. Recomendo.",
    ownerReply:
      "Agradeço de coração, Ederaldo! Estar sempre presente para dar o suporte que o cliente precisa é o nosso compromisso.",
  },
  {
    name: "Deiller Junio",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente profissional, muito atencioso e claro na condução dos processos.",
    ownerReply:
      "Muito obrigado pela avaliação, Deiller! Saber que nosso atendimento fez a diferença é a maior satisfação.",
  },
  {
    name: "danubia viana macedo",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Atendimento diferenciado, atenção do início ao fim, preocupando sempre com a segurança do cliente.",
    ownerReply:
      "Muito obrigado, Danubia! O acolhimento humano e a segurança jurídica caminham sempre juntos na nossa advocacia.",
  },
  {
    name: "Millena Silva",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Ótimo profissional, muito atencioso, atendimento humanizado. Recomendo!",
    ownerReply:
      "Agradeço de coração pela sua avaliação! 🙏 Saber que consegui te ajudar com seu benefício do INSS é extremamente gratificante. Cada caso é único, e meu objetivo é sempre oferecer um atendimento próximo, claro e seguro para que você se sinta amparada em todo o processo.",
  },
  {
    name: "Karine Oliveira",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente profissional. Atencioso, claro nas orientações e muito ético. Me senti segura e bem assessorada desde o primeiro atendimento.",
    ownerReply:
      "Muito obrigado pela sua avaliação! Desde o primeiro atendimento, meu objetivo é esclarecer todas as dúvidas sobre benefícios do INSS de forma clara e objetiva. Fico feliz que tenha tido uma boa experiência!",
  },
  {
    name: "Danielly Viveiros",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente profissional, fez um ótimo trabalho com rapidez e excelência, indico muito.",
    ownerReply:
      "Muito obrigado pela confiança, Danielly! Trabalho com muita dedicação para garantir agilidade e excelência na conquista dos seus direitos.",
  },
  {
    name: "Lavinia Andrade",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Um excelente profissional, dedicado e responsável super indico!",
    ownerReply:
      "Muito obrigado pela sua avaliação e pelas palavras, Lavinia! 🙏 Trabalhar com direito previdenciário e benefícios do INSS é mais do que uma profissão para mim — é um compromisso em garantir que cada cliente tenha seus direitos respeitados.",
  },
  {
    name: "Dener Cabral",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente advogado. Atendimento personalizado, confiável e resolveu minhas dúvidas de forma clara e objetiva sobre INSS. Recomendo.",
    ownerReply:
      "Agradeço de coração pela sua avaliação! Prezo muito por um atendimento humanizado e transparente, principalmente em questões envolvendo o INSS, que muitas vezes geram dúvidas e insegurança.",
  },
  {
    name: "Sergio Luis dos Santos",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Excelente profissional! Atendimento humanizado e personalizado. Além de sempre manter informado sobre o processo e requerimento. Recomendo!",
    ownerReply:
      "Gratidão pela sua avaliação! A confiança de cada cliente é algo que valorizo muito na minha atuação como advogado previdenciário. Sempre que precisar, pode contar comigo!",
  },
  {
    name: "Gabrielle Almeida",
    tag: "Local Guide",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Ótimo profissional, está sempre muito atualizado, passa as informações de forma clara e precisa e é muito atencioso.",
    ownerReply:
      "Agradeço imensamente pelo feedback, Gabrielle! A constante atualização jurídica é essencial para defender cada cliente com o máximo rigor técnico perante o INSS.",
  },
  {
    name: "Jao",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Perfeito atendimento. Fala de forma clara e coerente buscando sanar as dúvidas da forma mais rápida e informativa possível.",
    ownerReply:
      "Muito obrigado! O atendimento próximo e a linguagem acessível são pilares do nosso trabalho diário.",
  },
  {
    name: "Lucio Paulo",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Ótimo profissional, ótimo atendimento, recomendo!!",
    ownerReply:
      "Trabalho sempre para oferecer um atendimento ágil e eficiente na resolução de questões junto ao INSS. Saber que você ficou satisfeito faz toda a diferença!",
  },
  {
    name: "Paula Souza",
    stars: 5,
    date: "Avaliação no Google",
    comment:
      "Muito bom mesmo, super verdadeiro e uma boa pessoa e como profissional.",
    ownerReply:
      "Agradeço de coração! Cada caso é único e luto pelos direitos de cada cliente com ética e sinceridade absoluta.",
  },
];

function Heading({
  eyebrow,
  children,
  description,
  light = false,
}: {
  eyebrow: string;
  children: ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className={light ? "eyebrow-light mb-4" : "eyebrow mb-4"}>{eyebrow}</p>
      <h2
        className={
          light
            ? "font-serif text-3xl leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3.25rem]"
            : "font-serif text-3xl leading-[1.1] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[3.25rem]"
        }
      >
        {children}
      </h2>
      {description && (
        <p
          className={
            light
              ? "mt-5 max-w-xl text-[15px] leading-7 text-white/70"
              : "mt-5 max-w-xl text-[15px] leading-7 text-ink-soft"
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArea, setActiveArea] = useState<(typeof practiceAreas)[number] | null>(null);

  useEffect(() => {
    if (!activeArea) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveArea(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [activeArea]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-hidden bg-ivory text-ink">
        {/* TOP BAR INFORMATIVA */}
        <div className="border-b border-navy-950/10 bg-navy-950 px-4 py-2.5 text-xs text-white/80">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-2 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-medium text-gold-300">
                <ShieldCheck size={14} className="text-gold-400" />
                {CLIENT_CONFIG.oab}
              </span>
              <span className="hidden text-white/30 sm:inline">|</span>
              <span className="hidden items-center gap-1.5 sm:inline-flex text-white/70">
                <MapPin size={13} className="text-gold-400" />
                {CLIENT_CONFIG.city}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span className="hidden items-center gap-1 text-[11px] font-medium text-emerald-400 md:inline-flex">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Atendimento Presencial e On-line em todo o Brasil
              </span>
              <a
                href={CLIENT_CONFIG.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 transition-colors hover:text-white"
              >
                <WhatsAppIcon size={14} /> Falar com o Advogado
              </a>
            </div>
          </div>
        </div>

        {/* HEADER PRINCIPAL */}
        <header className="sticky top-0 z-40 border-b border-navy-950/10 bg-ivory/95 backdrop-blur-xl">
          <div className="mx-auto flex h-[92px] max-w-7xl items-center justify-between gap-5 px-5 sm:h-[105px] sm:px-8 lg:px-12">
            <a
              href="#inicio"
              aria-label="Jackson Santos Advogado Previdenciarista — início"
              onClick={closeMenu}
              className="flex items-center gap-3.5 transition-opacity hover:opacity-90"
            >
              <div className="relative h-[70px] w-[230px] sm:h-[82px] sm:w-[260px]">
                <Image
                  src="/logo-header.png"
                  alt="Jackson Santos Advogado Previdenciarista - OAB/MG 226.978"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 230px, 260px"
                />
              </div>
            </a>

            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-5 xl:gap-8 lg:flex"
            >
              <a className="nav-link" href="#inicio">Início</a>
              <a className="nav-link" href="#atuacao">Áreas de Atuação</a>
              <a className="nav-link" href="#sobre">O Advogado</a>
              <a className="nav-link" href="#diferenciais">Compromisso</a>
              <a className="nav-link" href="#avaliacoes">Avaliações (5,0)</a>
              <a className="nav-link" href="#contato">Contato</a>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <GlowingButton
                href={CLIENT_CONFIG.whatsappUrl}
                target="_blank"
                size="sm"
                variant="gold"
                className="rounded-full shadow-md"
              >
                <WhatsAppIcon size={15} />
                Consultar Benefício
              </GlowingButton>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid size-11 place-items-center rounded-full border border-navy-950/15 text-navy-950 transition-colors hover:border-gold-500 lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* MENU MOBILE */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Navegação móvel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden border-t border-navy-950/10 bg-ivory px-6 shadow-xl lg:hidden"
              >
                <div className="mx-auto flex max-w-7xl flex-col gap-1 py-5">
                  {[
                    ["Início", "#inicio"],
                    ["Áreas de Atuação", "#atuacao"],
                    ["O Advogado", "#sobre"],
                    ["Nosso Compromisso", "#diferenciais"],
                    ["Avaliações no Google", "#avaliacoes"],
                    ["Contato & Localização", "#contato"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      className="border-b border-navy-950/5 py-3.5 text-sm font-medium text-navy-900 hover:text-gold-600"
                    >
                      {label}
                    </a>
                  ))}
                  <div className="pt-3">
                    <a
                      className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-navy-950 shadow-gold"
                      href={CLIENT_CONFIG.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeMenu}
                    >
                      <WhatsAppIcon size={16} /> Consultar meu Caso no WhatsApp
                    </a>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        {/* HERO SECTION */}
        <section
          id="inicio"
          className="relative isolate scroll-mt-24 border-b border-navy-950/10 bg-gradient-to-b from-ivory via-white to-ivory py-14 sm:py-20 lg:py-24"
        >
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -left-20 top-20 -z-10 size-[32rem] rounded-full bg-gold-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-1/3 -z-10 size-[36rem] rounded-full bg-navy-200/25 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:px-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="relative z-10 max-w-2xl"
            >
              {/* Eyebrow badge */}
              <motion.div variants={reveal} className="mb-6 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-gold-800 uppercase shadow-xs">
                  <span className="size-2 rounded-full bg-gold-500 animate-pulse" />
                  Direito Previdenciário Especializado
                </span>
                <span className="text-xs text-ink-soft">· {CLIENT_CONFIG.oab}</span>
              </motion.div>

              <motion.h1
                variants={reveal}
                className="font-serif text-[2.75rem] leading-[1.04] tracking-[-0.04em] text-navy-950 sm:text-5xl lg:text-[4.2rem]"
              >
                O seu benefício do INSS defendido com{" "}
                <span className="italic text-gold-600">técnica contábil, clareza</span> e compromisso real.
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base sm:leading-8"
              >
                Não enfrente a burocracia e as negativas indevidas do INSS sem apoio especializado. 
                Com <strong>13 anos de vivência no Fórum de São João del-Rei</strong>, formação técnica em contabilidade 
                e constante especialização pelo <strong>IEPREV</strong>, luto para que você receba o melhor benefício com rapidez e transparência.
              </motion.p>

              {/* Botões de Ação */}
              <motion.div
                variants={reveal}
                className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
              >
                <GlowingButton
                  href={CLIENT_CONFIG.whatsappUrl}
                  target="_blank"
                  size="lg"
                  variant="gold"
                  className="rounded-full shadow-gold"
                >
                  <WhatsAppIcon size={18} />
                  Falar Diretamente no WhatsApp
                </GlowingButton>
                <a
                  href="#atuacao"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-navy-950/20 bg-white px-6 py-4 text-xs font-semibold tracking-wider text-navy-950 uppercase shadow-xs transition-colors hover:border-gold-600 hover:text-gold-700"
                >
                  Ver Áreas de Atuação
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </motion.div>

              {/* Prova Social Rápida no Hero */}
              <motion.div
                variants={reveal}
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-navy-950/10 pt-6 text-xs text-ink-soft"
              >
                <div className="flex items-center gap-2 font-medium text-navy-950">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span><strong>5,0 no Google</strong> ({CLIENT_CONFIG.reviewsCount} avaliações)</span>
                </div>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  Atendimento Humanizado
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calculator size={15} className="text-gold-600" />
                  Cálculos Previdenciários Exatos
                </span>
              </motion.div>
            </motion.div>

            {/* FOTO DO DR. JACKSON NO ESCRITÓRIO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[480px] lg:ml-auto"
            >
              {/* Moldura elegante com toques de ouro */}
              <div className="absolute -inset-3 -rotate-1 rounded-2xl border-2 border-gold-400/35 sm:-inset-4" />
              <div className="relative aspect-[0.82] overflow-hidden rounded-xl border border-navy-950/15 bg-navy-950 shadow-elevated">
                <Image
                  src="/jackson-santos-escritorio.jpg"
                  alt="Dr. Jackson Santos em seu escritório de advocacia previdenciária"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 42vw"
                  className="object-cover object-[50%_15%] transition-transform duration-700 hover:scale-[1.02]"
                />
                {/* Degradê inferior com informações */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
                  <div>
                    <p className="font-serif text-2xl font-medium tracking-tight text-white">
                      Dr. Jackson Santos
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                      Advogado Previdenciarista · {CLIENT_CONFIG.oab}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-navy-900/80 text-gold-400 shadow-md">
                    <Scale size={20} />
                  </span>
                </div>
              </div>

              {/* Selo flutuante de autoridade */}
              <div className="absolute -left-3 top-6 flex items-center gap-2.5 rounded-full border border-navy-950/10 bg-white/95 px-4 py-2.5 text-[11px] font-bold tracking-wider text-navy-950 uppercase shadow-card backdrop-blur-md sm:-left-8 sm:px-5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                13 Anos de Vivência Jurídica
              </div>

              {/* Selo flutuante de IEPREV */}
              <div className="absolute -right-3 bottom-12 rounded-xl border border-gold-500/40 bg-navy-950/95 p-3 text-white shadow-xl backdrop-blur-md sm:-right-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-gold-300">
                  <Award size={16} /> Especialista IEPREV
                </div>
                <p className="mt-1 text-[10px] text-white/70">Atualização Previdenciária Contínua</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BARRA DE DESTAQUES & NÚMEROS */}
        <section
          aria-label="Destaques do escritório"
          className="border-b border-navy-950/10 bg-white"
        >
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 sm:px-8 lg:px-12">
            {[
              {
                number: "5,0 ★",
                label: "Nota máxima no Google",
                desc: "Avaliado por mais de 50 clientes com atendimento humanizado.",
              },
              {
                number: "13 Anos",
                label: "No Fórum de São João del-Rei",
                desc: "Ampla vivência nos trâmites processuais e da Justiça.",
              },
              {
                number: "Exatidão",
                label: "Técnica em Contabilidade",
                desc: "Cálculos minuciosos de tempo de contribuição e valor de benefício.",
              },
              {
                number: "Nacional",
                label: "Presencial & On-line",
                desc: "Atendimento presencial no Centro de SJDR e digital em todo o Brasil.",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={
                  index > 0
                    ? "flex flex-col justify-center sm:border-l sm:border-navy-950/10 sm:pl-6"
                    : "flex flex-col justify-center"
                }
              >
                <span className="font-serif text-3xl font-semibold text-gold-600 lg:text-4xl">
                  {stat.number}
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-wider text-navy-950">
                  {stat.label}
                </span>
                <span className="mt-1 text-xs leading-5 text-ink-soft">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO ÁREAS DE ATUAÇÃO PREVIDENCIÁRIA */}
        <section
          id="atuacao"
          className="scroll-mt-24 bg-ivory py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <Heading
                eyebrow="PILAREs DE ATUAÇÃO PREVIDENCIÁRIA"
                description="Soluções jurídicas seguras e especializadas para cada etapa do seu relacionamento com o INSS."
              >
                Protegendo o seu direito e o sustento da sua{" "}
                <span className="italic text-gold-600">família.</span>
              </Heading>
              <p className="max-w-[280px] pb-1 text-xs leading-6 text-ink-soft">
                Toque em qualquer área para ver os detalhes, documentos necessários e tirar dúvidas diretamente com o Dr. Jackson.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
              className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {practiceAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <motion.article
                    key={area.id}
                    variants={reveal}
                    className="group relative flex flex-col justify-between rounded-xl border border-navy-950/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-card sm:p-8"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="grid size-12 place-items-center rounded-xl bg-gold-50 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                          <Icon size={24} strokeWidth={1.8} />
                        </span>
                        <span className="font-serif text-2xl font-light text-navy-950/25">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-7 font-serif text-2xl font-medium leading-snug text-navy-950">
                        {area.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                        {area.summary}
                      </p>

                      <ul className="mt-5 space-y-2 border-t border-navy-950/5 pt-4">
                        {area.topics.slice(0, 3).map((topic) => (
                          <li
                            key={topic}
                            className="flex items-center gap-2 text-xs text-navy-900"
                          >
                            <span className="size-1.5 rounded-full bg-gold-500" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-navy-950/10 pt-5">
                      <button
                        type="button"
                        onClick={() => setActiveArea(area)}
                        className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-700 transition-colors hover:text-navy-950"
                      >
                        Saiba mais detalhes
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover/btn:translate-x-1"
                        />
                      </button>
                      <a
                        href={`https://wa.me/${CLIENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(area.whatsappQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Tirar dúvida no WhatsApp"
                        className="grid size-9 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
                      >
                        <WhatsAppIcon size={16} />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* SEÇÃO SOBRE O ADVOGADO (HISTÓRIA REAL & AUTÊNTICA) */}
        <section
          id="sobre"
          className="scroll-mt-24 border-y border-navy-950/10 bg-white py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-12">
            {/* Fotos com destaque para especialização e presença */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="relative aspect-[0.88] overflow-hidden rounded-2xl border border-navy-950/15 bg-navy-950 shadow-elevated">
                <Image
                  src="/jackson-santos-ieprev.jpg"
                  alt="Dr. Jackson Santos no Congresso IEPREV 2025"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover object-[50%_15%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                      Capacitação Contínua
                    </span>
                    <p className="font-serif text-lg">Congresso IEPREV 2025</p>
                  </div>
                  <span className="rounded-full bg-gold-500/20 px-3 py-1 text-[11px] font-semibold text-gold-300">
                    Direito Previdenciário
                  </span>
                </div>
              </div>

              {/* Card sobreposto da OAB */}
              <div className="absolute -bottom-6 -right-3 max-w-[270px] rounded-xl border border-gold-500/30 bg-ivory p-5 shadow-elevated sm:-right-8 sm:p-6">
                <div className="flex items-center gap-3 text-gold-600">
                  <ShieldCheck size={26} />
                  <div>
                    <p className="font-serif text-lg font-semibold text-navy-950">
                      {CLIENT_CONFIG.oab}
                    </p>
                    <p className="text-[11px] text-ink-soft">
                      Inscrição regular e atuação ética
                    </p>
                  </div>
                </div>
              </div>

              {/* Detalhe estético */}
              <span className="absolute -left-4 -top-4 -z-10 size-28 rounded-tl-2xl border-l-2 border-t-2 border-gold-500/40 sm:-left-7 sm:-top-7 sm:size-36" />
            </motion.div>

            {/* Conteúdo Biográfico */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.p variants={reveal} className="eyebrow">
                TRAJETÓRIA & PROPÓSITO
              </motion.p>
              <motion.h2
                variants={reveal}
                className="mt-4 font-serif text-3xl leading-[1.08] tracking-[-0.03em] text-navy-950 sm:text-4xl lg:text-[3.25rem]"
              >
                Da simplicidade das origens à defesa intransigente dos{" "}
                <span className="italic text-gold-600">seus direitos.</span>
              </motion.h2>

              <motion.div
                variants={reveal}
                className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft"
              >
                <p>
                  Minha história com a Justiça começou aos <strong>16 anos</strong>, quando entrei no 
                  <strong> Fórum da Comarca de São João del-Rei/MG</strong> como menor aprendiz. Na época, 
                  meu objetivo era ajudar em casa e comprar carretéis para empinar pipa — uma paixão que guardo 
                  com orgulho até hoje. Eu mal sabia onde ficava o prédio, mas foi ali que nasceu minha vocação.
                </p>
                <p>
                  Após concluir minha formação técnica em contabilidade, tive a oportunidade de retornar ao Fórum, 
                  onde trabalhei por <strong>13 anos consecutivos</strong>. Essa vivência diária no coração do Judiciário, 
                  aliada à base contábil — tão indispensável para o cálculo exato de tempo de contribuição e RMI do INSS —, 
                  me deu uma visão profunda e prática de como a Justiça realmente funciona.
                </p>
                <p>
                  Com muita dedicação dividindo a rotina entre trabalho e estudos, conquistei o diploma em Direito 
                  e a tão sonhada aprovação na <strong>OAB ({CLIENT_CONFIG.oab})</strong>. 
                  Foi no <strong>Direito Previdenciário</strong> que encontrei meu verdadeiro propósito: 
                  ouvir histórias reais, amparar famílias trabalhadoras e fazer a diferença na vida de quem mais precisa.
                </p>
              </motion.div>

              <motion.div
                variants={reveal}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <GlowingButton
                  href={CLIENT_CONFIG.whatsappUrl}
                  target="_blank"
                  size="md"
                  variant="gold"
                  className="rounded-full shadow-gold"
                >
                  <WhatsAppIcon size={16} /> Conversar com o Dr. Jackson
                </GlowingButton>
                <a
                  href="#avaliacoes"
                  className="inline-flex items-center gap-2 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-navy-950 hover:text-gold-600"
                >
                  Ler Depoimentos de Clientes <ArrowRight size={14} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* NOSSO COMPROMISSO / DIFERENCIAIS */}
        <section
          id="diferenciais"
          className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32"
        >
          <div className="pointer-events-none absolute -left-20 top-1/4 size-96 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-10 size-96 rounded-full bg-navy-800/40 blur-3xl" />

          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:px-12">
            <Heading
              eyebrow="POR QUE ESCOLHER NOSSA ADVOCACIA"
              light
              description="Sabemos que por trás de cada processo há uma vida, anos de suor e a esperança de dias mais tranquilos."
            >
              Cuidado humano somado a um rigor técnico{" "}
              <span className="italic text-gold-300">incomparável.</span>
            </Heading>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="divide-y divide-white/10"
            >
              {[
                {
                  number: "01",
                  title: "Linguagem Clara e Sem 'Juridiquês'",
                  description:
                    "Você nunca ficará sem entender o que está acontecendo. Explicamos cada passo de forma transparente, humana e objetiva.",
                },
                {
                  number: "02",
                  title: "Precisão em Cálculos Previdenciários",
                  description:
                    "Nossa formação contábil e especialização contínua pelo IEPREV asseguram que nenhum mês ou centavo de direito seja ignorado pelo INSS.",
                },
                {
                  number: "03",
                  title: "Acompanhamento em Tempo Real",
                  description:
                    "Você é informado sobre cada andamento, exigência ou protocolo. Nosso WhatsApp está sempre à disposição para esclarecimentos.",
                },
                {
                  number: "04",
                  title: "Atendimento Presencial e On-line",
                  description:
                    "Seja no nosso escritório no Centro de São João del-Rei ou através do atendimento digital seguro com assinatura eletrônica para qualquer lugar do país.",
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  variants={reveal}
                  className="grid gap-3 py-7 first:pt-0 sm:grid-cols-[70px_1fr] sm:gap-6 sm:py-8"
                >
                  <span className="font-serif text-3xl font-light text-gold-400">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROVA SOCIAL - AVALIAÇÕES REAIS NO GOOGLE */}
        <section
          id="avaliacoes"
          className="scroll-mt-24 bg-ivory py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid items-end justify-between gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <Heading
                eyebrow="AVALIAÇÕES NO GOOGLE"
                description="Alguns comentários publicados no perfil público. Acesse o Google para consultar as avaliações e informações atualizadas."
              >
                A confiança de quem já conquistou seus{" "}
                <span className="italic text-gold-600">direitos no INSS.</span>
              </Heading>

              {/* Card Resumo do Google */}
              <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-navy-950 p-6 text-white shadow-card sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
                      Perfil Público no Google
                    </span>
                  </div>
                  <div className="flex gap-1 text-amber-400" aria-label="5 estrelas no Google">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={18} fill="#f59e0b" strokeWidth={0} />
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-5xl font-semibold text-white">5,0</span>
                  <div className="text-xs text-white/70">
                    <p className="font-bold text-gold-300">51 avaliações públicas</p>
                    <p>Classificação máxima e 100% de recomendação</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <a
                    href={CLIENT_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-white"
                  >
                    Ver todas as avaliações no Google <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Grid com Depoimentos Reais */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((rev) => (
                <div
                  key={rev.name}
                  className="flex flex-col justify-between rounded-xl border border-navy-950/10 bg-white p-7 shadow-xs transition-all duration-300 hover:border-gold-500/40 hover:shadow-card"
                >
                  <div>
                    {/* Header do Card */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                        GOOGLE · RELATO PÚBLICO
                      </span>
                      <span className="text-[10px] text-ink-muted">
                        {rev.date}
                      </span>
                    </div>

                    {/* As 5 Estrelinhas Douradas */}
                    <div
                      className="my-3.5 flex items-center gap-1.5 text-amber-500"
                      aria-label="5 estrelas"
                    >
                      {Array.from({ length: rev.stars }, (_, i) => (
                        <Star key={i} size={18} fill="#f59e0b" strokeWidth={0} />
                      ))}
                    </div>

                    {/* Texto com fonte ampliada para leitura confortável */}
                    <p className="mt-2 text-[17px] sm:text-[18px] leading-[1.65] font-normal text-navy-950">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-7 border-t border-navy-950/10 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[15px] font-bold text-navy-950">
                          {rev.name}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                          {rev.tag ? `${rev.tag} · AVALIAÇÃO NO GOOGLE` : "AVALIAÇÃO PÚBLICA NO GOOGLE"}
                        </p>
                      </div>
                      <span className="grid size-8 place-items-center rounded-full bg-gold-100 text-gold-800 text-xs font-bold">
                        {rev.name[0]}
                      </span>
                    </div>

                    {/* Resposta atenciosa do proprietário */}
                    {rev.ownerReply && (
                      <div className="mt-4 rounded-lg border-l-2 border-gold-500 bg-gold-50/60 p-3.5 text-xs leading-relaxed text-ink-soft">
                        <span className="font-semibold text-navy-900 block mb-1">
                          Resposta do Dr. Jackson:
                        </span>
                        {rev.ownerReply}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Botão Ver Mais no Google */}
            <div className="mt-12 text-center">
              <a
                href={CLIENT_CONFIG.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy-950/20 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-xs transition-colors hover:border-gold-500 hover:text-gold-700"
              >
                Conferir perfil completo no Google Maps <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA O ATENDIMENTO (PASSO A PASSO) */}
        <section className="border-y border-navy-950/10 bg-ivory py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow justify-center mb-4">PROCESSO TRANSPARENTE</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-medium">
                Como funciona o seu atendimento
              </h2>
              <p className="mt-4 text-sm text-ink-soft">
                Sem complicação ou filas demoradas. Veja como iniciamos a análise do seu caso:
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Contato Inicial",
                  text: "Você entra em contato pelo WhatsApp e relata sua situação ou dúvida sobre o INSS.",
                },
                {
                  step: "02",
                  title: "Análise de Documentos",
                  text: "Avaliamos seu extrato CNIS, laudos, carteiras de trabalho ou motivo de negativa do benefício.",
                },
                {
                  step: "03",
                  title: "Estratégia Clara",
                  text: "Explicamos suas reais chances, o melhor caminho jurídico e o cálculo estimado de valores.",
                },
                {
                  step: "04",
                  title: "Atuação & Conquista",
                  text: "Cuidamos de cada protocolo administrativo ou ação judicial até a liberação do seu benefício.",
                },
              ].map((step) => (
                <div
                  key={step.step}
                  className="relative flex flex-col rounded-xl border border-navy-950/10 bg-white p-6 shadow-xs"
                >
                  <span className="font-serif text-3xl font-light text-gold-600">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-medium text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO & LOCALIZAÇÃO */}
        <section
          id="contato"
          className="scroll-mt-24 bg-white py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
            <div>
              <Heading
                eyebrow="CONTATO & ATENDIMENTO"
                description="Agende uma consulta presencial no Centro de São João del-Rei ou inicie seu atendimento on-line com total segurança de onde estiver."
              >
                Estamos prontos para ouvir a sua{" "}
                <span className="italic text-gold-600">história.</span>
              </Heading>

              <div className="mt-9 flex flex-col items-start gap-4">
                <GlowingButton
                  href={CLIENT_CONFIG.whatsappUrl}
                  target="_blank"
                  size="lg"
                  variant="whatsapp"
                  className="rounded-full shadow-lg"
                >
                  <WhatsAppIcon size={18} />
                  Falar no WhatsApp com o Dr. Jackson
                </GlowingButton>
                <p className="text-xs text-ink-soft">
                  Atendimento ágil de segunda a sexta-feira.
                </p>
              </div>
            </div>

            {/* Card com Informações de Endereço */}
            <div className="relative overflow-hidden rounded-2xl border border-navy-950/10 bg-ivory p-8 sm:p-10 shadow-card">
              <div className="absolute right-0 top-0 h-1.5 w-32 bg-gold-500" />
              
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-gold-100 text-gold-700">
                  <MapPin size={24} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">
                    Sede do Escritório
                  </p>
                  <p className="font-serif text-2xl font-medium text-navy-950">
                    São João del-Rei · MG
                  </p>
                </div>
              </div>

              <address className="mt-6 not-italic text-sm leading-relaxed text-ink-soft">
                <strong>Rua Artur Bernardes, 19 - Apto 101</strong><br />
                Centro, São João del-Rei - MG<br />
                CEP: 36300-076, Brasil
              </address>

              <div className="my-6 h-px bg-navy-950/10" />

              <div className="space-y-3 text-xs text-navy-950">
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-gold-600" />
                  <span>Atendimento com hora marcada (Presencial ou Videoconferência)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-gold-600" />
                  <span>Advogado registrado na OAB/MG sob o nº 226.978</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={CLIENT_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy-950/20 bg-white px-6 py-3.5 text-xs font-semibold tracking-wider text-navy-950 uppercase shadow-xs transition-colors hover:border-gold-600 hover:text-gold-700"
                >
                  Abrir no Google Maps <ArrowUpRight size={14} />
                </a>
                <a
                  href={CLIENT_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <WhatsAppIcon size={15} /> Iniciar conversa
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL DE ALTO IMPACTO */}
        <section className="relative overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
          <div className="pointer-events-none absolute right-0 top-0 size-80 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">
                JACKSON SANTOS · ADVOGADO PREVIDENCIARISTA
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
                Não deixe para depois o benefício que pode mudar a sua vida.
              </h2>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                Tire suas dúvidas diretamente com um especialista e garanta o que é seu por direito.
              </p>
            </div>
            <div className="shrink-0">
              <GlowingButton
                href={CLIENT_CONFIG.whatsappUrl}
                target="_blank"
                size="lg"
                variant="gold"
                className="rounded-full shadow-gold"
              >
                <WhatsAppIcon size={18} />
                Falar com o Dr. Jackson Agora
              </GlowingButton>
            </div>
          </div>
        </section>

        {/* FOOTER INSTITUCIONAL */}
        <footer className="border-t border-navy-950/20 bg-navy-950 px-5 py-14 text-white sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
            <div>
              <div className="inline-flex">
                <Image
                  src="/logo-header.png"
                  width={330}
                  height={110}
                  alt="Jackson Santos Advogado Previdenciarista"
                  className="h-auto w-[270px] brightness-0 invert"
                />
              </div>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/70">
                Advocacia previdenciária ética, humanizada e comprometida em garantir os direitos de aposentados, pensionistas e segurados do INSS.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gold-300">
                <ShieldCheck size={16} />
                <span>{CLIENT_CONFIG.oab}</span>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                Navegação
              </h3>
              <div className="mt-4 flex flex-col items-start gap-2.5 text-xs text-white/70">
                <a className="footer-link" href="#inicio">Início</a>
                <a className="footer-link" href="#atuacao">Áreas de Atuação</a>
                <a className="footer-link" href="#sobre">Trajetória do Advogado</a>
                <a className="footer-link" href="#diferenciais">Nosso Compromisso</a>
                <a className="footer-link" href="#avaliacoes">Avaliações dos Clientes</a>
                <a className="footer-link" href="#contato">Contato e Localização</a>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                Atendimento
              </h3>
              <div className="mt-4 flex flex-col items-start gap-3 text-xs text-white/70">
                <a
                  href={CLIENT_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link inline-flex items-center gap-2 text-gold-300"
                >
                  <WhatsAppIcon size={15} /> Atendimento pelo WhatsApp
                </a>
                <a
                  href={CLIENT_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link inline-flex items-start gap-2"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0 text-gold-400" />
                  <span>{CLIENT_CONFIG.address}</span>
                </a>
                <p className="text-[11px] text-white/50">
                  São João del-Rei · Minas Gerais · Atendimento em todo o Brasil
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Dr. Jackson Santos — Advogado Previdenciarista. Todos os direitos reservados.
            </p>
            <p className="max-w-md text-[10px] text-white/40">
              Este site tem caráter estritamente informativo e não substitui consulta jurídica individual. 
              Em observância ao Código de Ética e Disciplina da OAB (Provimento 205/2021).
            </p>
          </div>
        </footer>

        {/* MODAL DETALHADO DA ÁREA DE ATUAÇÃO */}
        <AnimatePresence>
          {activeArea && (
            <motion.div
              className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/65 p-0 backdrop-blur-sm sm:items-center sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArea(null)}
            >
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="area-dialog-title"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.99 }}
                transition={{ duration: 0.25 }}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-navy-950/10 bg-ivory p-7 shadow-elevated sm:max-w-xl sm:rounded-2xl sm:p-9"
              >
                <button
                  type="button"
                  aria-label="Fechar detalhes da área"
                  onClick={() => setActiveArea(null)}
                  className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-navy-950/15 text-navy-950 hover:bg-navy-950 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>

                <p className="eyebrow">ÁREA DE ATUAÇÃO PREVIDENCIÁRIA</p>
                <h2
                  id="area-dialog-title"
                  className="mt-4 max-w-md pr-8 font-serif text-3xl sm:text-4xl font-medium text-navy-950"
                >
                  {activeArea.title}
                </h2>
                
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gold-700">
                  {activeArea.tagline}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                  {activeArea.details}
                </p>

                <div className="mt-6 border-t border-navy-950/10 pt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                    O que avaliamos no seu caso:
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {activeArea.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center gap-2.5 text-xs text-navy-950"
                      >
                        <CheckCircle2 size={15} className="text-gold-600 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <GlowingButton
                    href={`https://wa.me/${CLIENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(activeArea.whatsappQuery)}`}
                    target="_blank"
                    size="md"
                    variant="whatsapp"
                    className="w-full rounded-full shadow-md"
                  >
                    <WhatsAppIcon size={16} /> Tirar Dúvidas Sobre Este Benefício
                  </GlowingButton>
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTÃO FLUTUANTE DE WHATSAPP */}
        <div className="fixed bottom-6 right-5 z-40 sm:bottom-7 sm:right-7">
          <a
            href={CLIENT_CONFIG.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com Dr. Jackson no WhatsApp"
            className="group relative flex items-center gap-3 rounded-full border border-emerald-400/30 bg-[#25D366] px-4 py-3 text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:bg-[#20ba59]"
          >
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-white" />
            </span>
            <WhatsAppIcon size={22} />
            <span className="hidden text-xs font-bold tracking-wide sm:inline">
              Dúvidas sobre o INSS?
            </span>
          </a>
        </div>
      </main>
    </MotionConfig>
  );
}
