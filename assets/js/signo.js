(function () {
  "use strict";

  const signos = {
    aries: {
      nome: "Áries",
      elemento: "Fogo",
      regente: "Marte",
      descricao: "Coragem, iniciativa, impulsividade",
    },
    touro: {
      nome: "Touro",
      elemento: "Terra",
      regente: "Vênus",
      descricao: "Estabilidade, prazer, teimosia",
    },
    gemeos: {
      nome: "Gêmeos",
      elemento: "Ar",
      regente: "Mercúrio",
      descricao: "Comunicação, versatilidade, dualidade",
    },
    cancer: {
      nome: "Câncer",
      elemento: "Água",
      regente: "Lua",
      descricao: "Emoção, intuição, proteção",
    },
    leao: {
      nome: "Leão",
      elemento: "Fogo",
      regente: "Sol",
      descricao: "Criatividade, liderança, ego",
    },
    virgem: {
      nome: "Virgem",
      elemento: "Terra",
      regente: "Mercúrio",
      descricao: "Análise, perfeccionismo, serviço",
    },
    libra: {
      nome: "Libra",
      elemento: "Ar",
      regente: "Vênus",
      descricao: "Equilíbrio, justiça, parcerias",
    },
    escorpiao: {
      nome: "Escorpião",
      elemento: "Água",
      regente: "Plutão",
      descricao: "Intensidade, transformação, mistério",
    },
    sagitario: {
      nome: "Sagitário",
      elemento: "Fogo",
      regente: "Júpiter",
      descricao: "Otimismo, aventura, expansão",
    },
    capricornio: {
      nome: "Capricórnio",
      elemento: "Terra",
      regente: "Saturno",
      descricao: "Disciplina, ambição, responsabilidade",
    },
    aquario: {
      nome: "Aquário",
      elemento: "Ar",
      regente: "Urano",
      descricao: "Inovação, rebeldia, humanitarismo",
    },
    peixes: {
      nome: "Peixes",
      elemento: "Água",
      regente: "Netuno",
      descricao: "Sensibilidade, intuição, compaixão",
    },
  };

  function renderSigno(container) {
    const slug = String(container?.dataset?.signo || "").trim().toLowerCase();
    const signo = signos[slug];

    if (!signo) {
      return;
    }

    container.innerHTML = `
      <section class="signo-page" aria-label="Resumo do signo ${signo.nome}">
        <h2>${signo.nome}</h2>
        <p><strong>Elemento:</strong> ${signo.elemento}</p>
        <p><strong>Regente:</strong> ${signo.regente}</p>
        <p>${signo.descricao}</p>
      </section>
    `;
  }

  document.addEventListener("DOMContentLoaded", function onReady() {
    const container = document.getElementById("previsao-signo");
    if (!container) {
      return;
    }

    renderSigno(container);
  });
})();
