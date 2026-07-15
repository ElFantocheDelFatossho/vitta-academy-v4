/**
 * Fonte única de conteúdo da V4 — "Além dos Plantões", 6 telas.
 * Copy emocional aprovada pela equipe (guia de telas 2026-07-15), agora
 * estruturada no padrão CRO validado por pesquisa (Unbounce/CXL/Julian
 * Shapiro/Baymard + invariantes de páginas de webinar 20-50% conv.):
 * CTA em toda dobra, logística explícita, autoridade como seção própria,
 * urgência real (countdown para a data), FAQ de objeções no final.
 *
 * Dados reais: aula 06/08 20h (Brasília), grupo VIP WhatsApp, Dr. Iago
 * Ferreira Carega (Dr. Hair — nome/marca corrigidos em 2026-07-15; a foto
 * de referência mostra "Dr. Hair · restauração capilar" no gorro cirúrgico).
 */
const content = {
  meta: {
    title: "Além dos Plantões | Aula ao vivo para médicos — Vitta Academy",
    description:
      "Aula ao vivo e gratuita, 06 de agosto às 20h: o passo a passo para migrar dos plantões para o Transplante Capilar com segurança. Exclusivo para médicos. Com Dr. Iago Ferreira Carega, Dr. Hair.",
    ogImage: "assets/og-image.svg",
    url: "https://TODO-dominio-da-pagina.com/", // TODO: domínio final
    favicon: "assets/favicon.svg",
  },

  ctaHref: "https://chat.whatsapp.com/F68R10dSGMe59K0V8mgIkS",
  countdownTarget: "2026-08-06T20:00:00-03:00",

  event: {
    dateShort: "06/08",
    dateLong: "06 de agosto",
    time: "20h",
    format: "Online e ao vivo",
    audienceLabel: "Exclusivo para médicos",
  },

  // Linha de confiança que acompanha os CTAs (prova encostada no botão)
  trustLine: "Grupo silencioso · Apenas avisos da aula · Saída livre a qualquer momento",

  // Tela 1 — A Quebra da Ilusão (Hero)
  section1: {
    headline: "Quantos plantões\nfaltam para você\ndesistir?",
    subtitle: "Uma hora a sua paixão platônica pela medicina vai acabar.",
    subtitleAccent: "E ninguém te avisou disso.",
    subheadline:
      "Foram 6 anos de faculdade e mais de 3 anos engolindo plantões de 12, 48, até 72 horas — noites sem dormir, corpo no limite, mente sem conseguir raciocinar. Você está pagando um preço alto demais para manter essa renda.",
    ctaText: "QUERO SAIR DESSE CICLO EXAUSTIVO",
    speaker: {
      name: "Dr. Iago Ferreira Carega",
      credentials: "Dr. Hair · Restauração Capilar",
      // Composição terno + cirurgia (dupla exposição), usada em tela cheia no
      // hero. Extensão (.webp/.jpg) é acrescentada no render (picture + fallback).
      heroPhoto: "assets/dr-iago-hero",
      // Mesma composição, mas enquadrada na vertical (retrato) especificamente
      // para telas estreitas — evita que o object-fit corte a foto ampla.
      heroPhotoMobile: "assets/dr-iago-hero-mobile",
    },
  },

  // Tela 2 — O Custo Invisível
  section2: {
    headline: "Gente, hoje não dá. Tô de plantão.",
    intro:
      "O casamento do seu melhor amigo? Você perdeu. O jantar de família de domingo? Sua única presença foi uma mensagem de desculpa enviada às pressas entre um atendimento e outro.",
    whatsappMockup: {
      message: "Gente, hoje não dá. Tô de plantão.",
    },
    body:
      "Você está vendo sua vida passar no automático enquanto troca seu tempo por dinheiro, sem perspectiva de que isso vá mudar.",
    impactLine:
      "Esse sacrifício desumano foi desenhado para outro tempo. Mas continuam cobrando de você o mesmo preço.",
  },

  // Tela 3 — O Xeque-Mate do Tempo
  section3: {
    headline: "O problema não é o seu plantão de hoje. É o seu daqui a 10 anos.",
    body:
      "Se você não tomar uma atitude hoje, daqui a 10 anos a sua vida pode continuar exatamente igual. Só que você estará mais velho, mais cansado, com a saúde mais debilitada e sem forças para mudar.",
    quote:
      "Quando seu filho tiver 18 anos, você vai lembrar dos plantões exaustivos que fez ou dos momentos da infância dele que você perdeu?",
    closing: "O tempo vai passar de qualquer forma. A única diferença real é onde você escolhe gastar a sua vida.",
  },

  // CTA intermediário (após o pico emocional da Tela 3)
  midCta: {
    text: "Existe uma saída — e ela será apresentada ao vivo, no dia 06/08.",
    ctaText: "GARANTIR MINHA VAGA GRATUITA",
  },

  // Tela 4 — O Ponto de Virada + Autoridade
  section4: {
    headline: "Você não precisa parar de ser médico. Você só precisa parar de procurar o próximo plantão.",
    body:
      "Existe uma rota de fuga segura: uma área procedural em expansão onde sua habilidade técnica é verdadeiramente valorizada e recompensada.",
    authority: {
      name: "Dr. Iago Ferreira Carega",
      credentials: "Dr. Hair · Restauração Capilar",
      // Extensão (.webp/.jpg) é acrescentada no render (picture + fallback).
      photo: "assets/dr-iago-authority",
      quote:
        "Eu também fui plantonista. Vivi essa mesma exaustão, emendei as mesmas noites sem dormir e senti a mesma falta de perspectiva. Eu precisei encontrar uma saída antes que minha paixão pela medicina se apagasse — e encontrei essa liberdade no Transplante Capilar. Agora, vou te mostrar o caminho.",
      bioLine: "Fundador da Dr. Hair e idealizador da metodologia técnica Vitta Academy.",
    },
  },

  // Tela 4.5 — Para quem é esta aula (conteúdo real, reaproveitado de
  // landing-page/content/content.js § audience — mesma oferta, sem alteração
  // de fatos comerciais).
  audienceFit: {
    title: "Este evento foi desenhado exclusivamente para:",
    items: [
      {
        title: "Médicos plantonistas",
        description:
          "Que estão exaustos da rotina hospitalar, buscam uma transição de carreira segura e querem reconquistar o controle sobre suas vidas.",
      },
      {
        title: "Dermatologistas e cirurgiões",
        description:
          "Que querem expandir seu portfólio clínico com o procedimento de maior lucratividade da medicina estética atual.",
      },
      {
        title: "Generalistas e recém-formados",
        description:
          "Que buscam se especializar em um mercado de alta barreira de entrada técnica, garantindo diferenciação rápida e autoridade profissional.",
      },
    ],
  },

  // Tela 5 — A Nova Realidade + logística do evento
  section5: {
    title: "O prestígio e a rotina que você sempre mereceu.",
    pillars: [
      {
        icon: "calendar",
        title: "Agenda sob seu controle",
        description: "Sem emergências, sem chamados de madrugada, sem plantões surpresa.",
      },
      {
        icon: "trending",
        title: "Valorização real",
        description: "Uma área que une procedimento, alta demanda e excelente retorno financeiro.",
      },
      {
        icon: "battery",
        title: "Energia para viver",
        description: "Chegar em casa inteiro, presente de verdade para sua família — e não apenas \"morto\" de sono.",
      },
    ],
    eventCard: {
      title: "A aula ao vivo",
      items: [
        { icon: "calendar", label: "Data", value: "Quinta-feira, 06 de agosto" },
        { icon: "clock", label: "Horário", value: "20h (horário de Brasília)" },
        { icon: "screen", label: "Onde", value: "Online e ao vivo, com tira-dúvidas" },
        { icon: "lock", label: "Acesso", value: "Gratuito · Exclusivo para médicos" },
      ],
      note: "O link de transmissão é enviado apenas no Grupo VIP do WhatsApp.",
    },
    ctaText: "QUERO ENTRAR NO GRUPO VIP",
  },

  // Tela 6 — CTA Final + FAQ
  section6: {
    eyebrow: "06 de agosto · 20h",
    headline: "Sua transição de carreira começa aqui.",
    subtitle:
      "Um evento ao vivo e exclusivo para médicos plantonistas: o passo a passo para migrar do hospital para o Transplante Capilar com segurança.",
    ctaText: "ENTRAR NO GRUPO VIP E GARANTIR MINHA VAGA",
    scarcityNote:
      "Vagas limitadas pela capacidade da sala de transmissão. O acesso será enviado apenas no grupo.",
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          question: "O evento é realmente gratuito?",
          answer: "Sim. A aula do dia 06/08 é 100% gratuita e online, exclusiva para médicos.",
        },
        {
          question: "Preciso já ter experiência em cirurgia?",
          answer:
            "Não. A metodologia da Vitta Academy foi desenhada para construir a base técnica desde o zero, com conceitos anatômicos e práticos estruturados.",
        },
        {
          question: "Não posso assistir no dia 06 às 20h. Ficará gravado?",
          answer:
            "A aula não ficará aberta ao público. O link de reprise (se houver) e os materiais serão enviados apenas no Grupo VIP do WhatsApp.",
        },
        {
          question: "Haverá certificação ou continuidade?",
          answer:
            "Durante a aula será apresentada a esteira completa da Vitta Academy, incluindo o treinamento de entrada e as parcerias para desenvolvimento hands-on.",
        },
      ],
    },
  },

  brand: {
    name: "Vitta Academy",
    parentBrand: "Grupo Vitta · Braço Educacional",
  },
};
