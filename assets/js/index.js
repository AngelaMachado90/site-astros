      function startOfLocalDayFallback(data) {
        return new Date(
          data.getFullYear(),
          data.getMonth(),
          data.getDate(),
          0,
          0,
          0,
          0,
        );
      }

      function getDatePartsFallback(dateObj, timeZone) {
        const formatter = new Intl.DateTimeFormat("en-CA", {
          timeZone: timeZone || "America/Sao_Paulo",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        const parts = formatter
          .formatToParts(dateObj || new Date())
          .reduce((acc, part) => {
            if (part.type !== "literal") {
              acc[part.type] = part.value;
            }
            return acc;
          }, {});

        const year = String(parts.year || "");
        const month = String(parts.month || "").padStart(2, "0");
        const day = String(parts.day || "").padStart(2, "0");
        const iso = `${year}-${month}-${day}`;

        return { iso, year, month, day };
      }

      function formatDateLongFallback(dateString) {
        const match = String(dateString || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
          return String(dateString || "");
        }

        const [, year, month, day] = match;
        const nomesMeses = [
          "janeiro",
          "fevereiro",
          "março",
          "abril",
          "maio",
          "junho",
          "julho",
          "agosto",
          "setembro",
          "outubro",
          "novembro",
          "dezembro",
        ];
        const mes = nomesMeses[Number(month) - 1] || month;
        return `${Number(day)} de ${mes} de ${year}`;
      }

      const scheduleFallback = {
        BLOG_TIMEZONE: "America/Sao_Paulo",
        getDateParts: (dateObj, timeZone) => getDatePartsFallback(dateObj, timeZone),
        isPostAvailable: (postDateISO, referenceDateISO) => {
          if (!postDateISO) {
            return false;
          }
          const hojeISO = referenceDateISO || getDatePartsFallback(new Date(), "America/Sao_Paulo").iso;
          return String(postDateISO) <= String(hojeISO);
        },
        formatDateLong: formatDateLongFallback,
      };

      const schedule =
        window.AuroraSchedule &&
        typeof window.AuroraSchedule.getDateParts === "function" &&
        typeof window.AuroraSchedule.isPostAvailable === "function" &&
        typeof window.AuroraSchedule.formatDateLong === "function"
          ? window.AuroraSchedule
          : scheduleFallback;
      const dataAtual = schedule.getDateParts(
        new Date(),
        schedule.BLOG_TIMEZONE,
      );
      const hoje = dataAtual.iso;
      const todosPosts = [];
      const arquivosGerados = new Set();

      function normalizarChaveArquivo(arquivo) {
        return String(arquivo || "")
          .trim()
          .replace(/^\/+/, "")
          .replace(/^posts\//, "");
      }

      function adicionarPost(post) {
        const chaveArquivo = normalizarChaveArquivo(post?.arquivo);
        if (!chaveArquivo) {
          console.warn("⚠️ Post ignorado sem arquivo válido:", post);
          return;
        }

        if (arquivosGerados.has(chaveArquivo)) {
          console.warn("⚠️ Tentativa de adicionar duplicata ignorada:", chaveArquivo);
          return;
        }

        arquivosGerados.add(chaveArquivo);
        todosPosts.push({
          ...post,
          arquivo: chaveArquivo,
        });
      }

      const janeiroLua = {
        1: "Virgem",
        2: "Libra",
        3: "Libra",
        4: "Escorpiao",
        5: "Escorpiao",
        6: "Sagitario",
        7: "Sagitario",
        8: "Capricornio",
        9: "Capricornio",
        10: "Aquario",
        11: "Aquario",
        12: "Peixes",
        13: "Peixes",
        14: "Áries",
        15: "Áries",
        16: "Touro",
        17: "Touro",
        18: "Gêmeos",
        19: "Gêmeos",
        20: "Cancer",
        21: "Cancer",
        22: "Leao",
        23: "Leao",
        24: "Virgem",
        25: "Virgem",
        26: "Libra",
        27: "Libra",
        28: "Escorpiao",
        29: "Escorpiao",
        30: "Sagitario",
        31: "Sagitario",
      };

      const fevereiroLua = {
        1: "Capricornio",
        2: "Leao",
        3: "Leao",
        4: "Virgem",
        5: "Virgem",
        6: "Libra",
        7: "Libra",
        8: "Escorpiao",
        9: "Escorpiao",
        10: "Sagitario",
      };

      const marcoPosts = [
        {
          dia: 1,
          lua: "Libra",
          sol: "Peixes",
          titulo: "Previsão Diária - 01 de Março 2026",
          preview: "Lua em Libra traz harmonia para comecar o mes.",
        },
        {
          dia: 2,
          lua: "Libra",
          sol: "Peixes",
          titulo: "Previsão Diária - 02 de Março 2026",
          preview: "Vênus em Peixes ativa a sensibilidade artística.",
        },
        {
          dia: 3,
          lua: "Escorpiao",
          sol: "Peixes",
          titulo: "Previsão Diária - 03 de Março 2026",
          preview: "Intensidade emocional com Lua em Escorpiao.",
        },
        {
          dia: 4,
          lua: "Escorpiao",
          sol: "Peixes",
          titulo: "Previsão Diária - 04 de Março 2026",
          preview: "Plutao em Aquario transforma relacoes.",
        },
        {
          dia: 5,
          lua: "Sagitario",
          sol: "Peixes",
          titulo: "Previsão Diária - 05 de Março 2026",
          preview: "Otimismo e expansao com Lua em Sagitario.",
        },
        {
          dia: 6,
          lua: "Sagitario",
          sol: "Peixes",
          titulo: "Previsão Diária - 06 de Março 2026",
          preview: "Jupiter em Cancer amplia a intuicao.",
        },
        {
          dia: 7,
          lua: "Capricornio",
          sol: "Peixes",
          titulo: "Previsão Diária - 07 de Março 2026",
          preview: "Organização e foco com Lua em Capricornio.",
        },
        {
          dia: 8,
          lua: "Capricornio",
          sol: "Peixes",
          titulo: "Previsão Diária - 08 de Março 2026",
          preview: "Saturno em Peixes estrutura sonhos.",
        },
        {
          dia: 9,
          lua: "Aquario",
          sol: "Peixes",
          titulo: "Previsão Diária - 09 de Março 2026",
          preview: "Inovação e ideias originais.",
        },
        {
          dia: 10,
          lua: "Aquario",
          sol: "Peixes",
          titulo: "Previsão Diária - 10 de Março 2026",
          preview: "Urano em Touro traz revolucoes praticas.",
        },
        {
          dia: 11,
          lua: "Peixes (NOVA)",
          sol: "Peixes",
          titulo: "Lua Nova em Peixes",
          preview: "Lua Nova para renascimento espiritual e novos comecos.",
        },
        {
          dia: 12,
          lua: "Peixes",
          sol: "Peixes",
          titulo: "Previsão Diária - 12 de Março 2026",
          preview: "Intuição elevada no pós-Lua Nova.",
        },
        {
          dia: 13,
          lua: "Áries",
          sol: "Peixes",
          titulo: "Sexta-feira 13: Portal Mistico",
          preview: "Sexta-feira 13: transforme medo em poder.",
          destaque: true,
        },
        {
          dia: 14,
          lua: "Áries",
          sol: "Peixes",
          titulo: "Previsão Diária - 14 de Março 2026",
          preview: "Marte em Gêmeos traz ação comunicativa.",
        },
        {
          dia: 15,
          lua: "Touro",
          sol: "Peixes",
          titulo: "Previsão Diária - 15 de Março 2026",
          preview: "Estabilidade e prazer com Lua em Touro.",
        },
        {
          dia: 16,
          lua: "Touro",
          sol: "Peixes",
          titulo: "Previsão Diária - 16 de Março 2026",
          preview: "Vênus em Peixes inspira amor romântico.",
        },
        {
          dia: 17,
          lua: "Gêmeos",
          sol: "Peixes",
          titulo: "Previsão Diária - 17 de Março 2026",
          preview: "Comunicação acelerada com Lua em Gêmeos.",
        },
        {
          dia: 18,
          lua: "Gêmeos",
          sol: "Peixes",
          titulo: "Previsão Diária - 18 de Março 2026",
          preview: "Mercúrio em Peixes aumenta a intuição.",
        },
        {
          dia: 19,
          lua: "Cancer",
          sol: "Peixes",
          titulo: "Previsão Diária - 19 de Março 2026",
          preview: "Sensibilidade e acolhimento em foco.",
        },
        {
          dia: 20,
          lua: "Cancer",
          sol: "Peixes",
          titulo: "Equinocio de Outono: Sol em Áries",
          preview: "Equinocio de Outono e inicio de novos comecos.",
        },
        {
          dia: 21,
          lua: "Leao",
          sol: "Áries",
          titulo: "Previsão Diária - 21 de Março 2026",
          preview: "Criatividade e autoexpressao.",
        },
        {
          dia: 22,
          lua: "Leao",
          sol: "Áries",
          titulo: "Previsão Diária - 22 de Março 2026",
          preview: "Coragem e iniciativa com Sol em Áries.",
        },
        {
          dia: 23,
          lua: "Virgem",
          sol: "Áries",
          titulo: "Previsão Diária - 23 de Março 2026",
          preview: "Organização e analise.",
        },
        {
          dia: 24,
          lua: "Virgem",
          sol: "Áries",
          titulo: "Previsão Diária - 24 de Março 2026",
          preview: "Mercúrio em Áries traz comunicação direta.",
        },
        {
          dia: 25,
          lua: "Libra",
          sol: "Áries",
          titulo: "Previsão Diária - 25 de Março 2026",
          preview: "Equilibrio nas relacoes.",
        },
        {
          dia: 26,
          lua: "Libra",
          sol: "Áries",
          titulo: "Previsão Diária - 26 de Março 2026",
          preview: "Amor incondicional com Vênus em Peixes.",
        },
        {
          dia: 27,
          lua: "Escorpiao",
          sol: "Áries",
          titulo: "Previsão Diária - 27 de Março 2026",
          preview: "Profundidade emocional e transformação.",
        },
        {
          dia: 28,
          lua: "Escorpiao",
          sol: "Áries",
          titulo: "Previsão Diária - 28 de Março 2026",
          preview: "Plutao transforma o coletivo.",
        },
        {
          dia: 29,
          lua: "Sagitario (CHEIA)",
          sol: "Áries",
          titulo: "Lua Cheia em Sagitario",
          preview: "Lua Cheia com expansao, verdade e liberdade.",
        },
        {
          dia: 30,
          lua: "Sagitario",
          sol: "Áries",
          titulo: "Previsão Diária - 30 de Março 2026",
          preview: "Integração de aprendizados apos a Lua Cheia.",
        },
        {
          dia: 31,
          lua: "Capricornio",
          sol: "Áries",
          titulo: "Previsão Diária - 31 de Março 2026",
          preview: "Encerramento do mes com foco e organização.",
        },
      ];

      for (let dia = 1; dia <= 31; dia += 1) {
        const diaStr = String(dia).padStart(2, "0");
        const sol = dia >= 20 ? "Aquario" : "Capricornio";

        adicionarPost({
          id: `j${diaStr}`,
          arquivo: `01-Janeiro/diario-01-${diaStr}-2026.html`,
          data: `2026-01-${diaStr}`,
          titulo: `Previsão Diária - ${diaStr} de Janeiro de 2026`,
          lua: janeiroLua[dia],
          sol,
          tipo: "diario",
          preview: `Energia de ${janeiroLua[dia]} guiando o dia com foco em consciencia e autoconhecimento.`,
        });
      }

      for (let dia = 1; dia <= 28; dia += 1) {
        const diaStr = String(dia).padStart(2, "0");
        const luaDoDia = fevereiroLua?.[dia] || "—";

        adicionarPost({
          id: `f${diaStr}`,
          arquivo: `02-Fevereiro/diario-02-${diaStr}-2026.html`,
          data: `2026-02-${diaStr}`,
          titulo: `Previsão Diária - ${diaStr} de Fevereiro de 2026`,
          lua: luaDoDia,
          sol: "Aquario",
          tipo: "diario",
          preview: `Dia de ${luaDoDia} com movimento astrológico voltado para clareza e transformação.`,
        });
      }

      marcoPosts.forEach((post) => {
        const diaStr = String(post.dia).padStart(2, "0");
        adicionarPost({
          id: `m${diaStr}`,
          arquivo: `03-Marco/diario-03-${diaStr}-2026.html`,
          data: `2026-03-${diaStr}`,
          titulo: post.titulo,
          lua: post.lua,
          sol: post.sol,
          tipo: "diario",
          preview: post.preview,
          destaque: post.destaque === true,
        });
      });

      const postsDisponiveis = todosPosts
        .filter((post) => schedule.isPostAvailable(post.data, hoje))
        .sort((a, b) => b.data.localeCompare(a.data));
      const postsGrid = document.getElementById("posts-grid");
      const contador = document.getElementById("contador-posts");
      const botaoFiltros = document.querySelectorAll(".month-btn");
      const buscaInput = document.getElementById("busca");
      const calendario = document.getElementById("calendario");

      function formatDatePretty(dateString) {
        return schedule.formatDateLong(dateString);
      }

      const PASTAS_POSTS = {
        "01": "01-Janeiro",
        "02": "02-Fevereiro",
        "03": "03-Marco",
      };

      function gerarLinkPost(post) {
        if (!post?.arquivo) {
          return "#";
        }

        const arquivoNormalizado = String(post.arquivo).replace(/^\/+/, "");
        if (arquivoNormalizado.startsWith("posts/")) {
          return `/${arquivoNormalizado}`;
        }

        if (arquivoNormalizado.includes("/")) {
          return `/posts/${arquivoNormalizado}`;
        }

        if (!post?.data) {
          return `/posts/${arquivoNormalizado}`;
        }

        const [, mes = "03"] = post.data.split("-");
        const pasta = PASTAS_POSTS[mes];
        if (!pasta) {
          return `/posts/${arquivoNormalizado}`;
        }

        return `/posts/${pasta}/${arquivoNormalizado}`;
      }

      function gerarLinkPostPorData(dataISO) {
        if (!dataISO || !/^\d{4}-\d{2}-\d{2}$/.test(dataISO)) {
          return "#";
        }

        const [ano, mes, dia] = dataISO.split("-");
        const pasta = PASTAS_POSTS[mes];
        if (!pasta) {
          return "#";
        }

        return `/posts/${pasta}/diario-${mes}-${dia}-${ano}.html`;
      }

      function escapeHtml(value) {
        return String(value || "")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
      }

      function startOfLocalDay(dateObj) {
        return new Date(
          dateObj.getFullYear(),
          dateObj.getMonth(),
          dateObj.getDate(),
          0,
          0,
          0,
          0,
        );
      }

      function addDays(dateObj, quantidadeDias) {
        const data = startOfLocalDay(dateObj);
        data.setDate(data.getDate() + quantidadeDias);
        return data;
      }

      function toLocalISODate(dateObj) {
        const ano = dateObj.getFullYear();
        const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
        const dia = String(dateObj.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
      }

      function parseISOToLocalDate(dateISO) {
        const match = String(dateISO || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
          return startOfLocalDay(new Date());
        }
        const [, ano, mes, dia] = match;
        return new Date(Number(ano), Number(mes) - 1, Number(dia), 0, 0, 0, 0);
      }

      function formatarDiaMesCurto(dataISO) {
        const match = String(dataISO || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
          return "";
        }

        const [, , mes, dia] = match;
        const meses = [
          "JAN",
          "FEV",
          "MAR",
          "ABR",
          "MAI",
          "JUN",
          "JUL",
          "AGO",
          "SET",
          "OUT",
          "NOV",
          "DEZ",
        ];
        const mesAbrev = meses[Number(mes) - 1] || "MAR";
        return `${dia} ${mesAbrev}`;
      }

      const iconesSignos = {
        aries: "/assets/icons/signos/aries.svg",
        touro: "/assets/icons/signos/touro.svg",
        gemeos: "/assets/icons/signos/gemeos.svg",
        cancer: "/assets/icons/signos/cancer.svg",
        leao: "/assets/icons/signos/leao.svg",
        virgem: "/assets/icons/signos/virgem.svg",
        libra: "/assets/icons/signos/libra.svg",
        escorpiao: "/assets/icons/signos/escorpiao.svg",
        sagitario: "/assets/icons/signos/sagitario.svg",
        capricornio: "/assets/icons/signos/capricornio.svg",
        aquario: "/assets/icons/signos/aquario.svg",
        peixes: "/assets/icons/signos/peixes.svg",
      };

      const iconesElementos = {
        fogo: "bi-fire",
        terra: "bi-tree",
        ar: "bi-wind",
        agua: "bi-droplet",
      };

      const previsoesState = {
        todosSignos: [],
        filtroAtivo: null,
        fallbackAviso: "🌙 As previsões dos signos ainda não foram publicadas.",
      };

      const DATA_PADRAO_ULTIMOS_DIAS = schedule.getDateParts(
        new Date(),
        schedule.BLOG_TIMEZONE,
      ).iso;
      const ANO_PADRAO_ULTIMOS_DIAS = DATA_PADRAO_ULTIMOS_DIAS.slice(0, 4);
      const MESES_NAVEGACAO = {
        JAN: "01",
        FEV: "02",
        MAR: "03",
        ABR: "04",
        MAI: "05",
        JUN: "06",
        JUL: "07",
        AGO: "08",
        SET: "09",
        OUT: "10",
        NOV: "11",
        DEZ: "12",
      };
      const DIAS_SEMANA_NAVEGACAO = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ];
      const postsUltimos7DiasBase = {
        "2026-03-19": {
          data_formatada: "19 MAR",
          lua: "🌙 Lua em Câncer",
          titulo: "Previsão Diária - 19 de Março 2026",
          conteudo:
            "Lua em Câncer e Sol em Peixes reforçam coragem emocional, acolhimento e decisões com sensibilidade prática.",
          lema: "Não se limite a seguir a corrente, arrisque-se também na correnteza.",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        },
        "2026-03-18": {
          data_formatada: "18 MAR",
          lua: "🌙 Lua em Gêmeos",
          titulo: "Previsão Diária - 18 de Março 2026",
          conteudo:
            "Mercúrio em Peixes amplia a intuição. A comunicação flui com mais sensibilidade hoje.",
          lema: "Seja a pessoa capaz de sorrir no pior dos dias",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: "sorrir",
        },
        "2026-03-17": {
          data_formatada: "17 MAR",
          lua: "🌙 Lua em Gêmeos",
          titulo: "Previsão Diária - 17 de Março 2026",
          conteudo:
            "Comunicação acelerada com Lua em Gêmeos. Mente ágil e curiosa.",
          lema: "A pressa pode esperar, a paciência ensina",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        },
        "2026-03-16": {
          data_formatada: "16 MAR",
          lua: "🌙 Lua em Touro",
          titulo: "Previsão Diária - 16 de Março 2026",
          conteudo:
            "Vênus em Peixes inspira amor romântico e conexões profundas.",
          lema: "O amor é a única força que transforma o caos em paz",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        },
        "2026-03-15": {
          data_formatada: "15 MAR",
          lua: "🌙 Lua em Touro",
          titulo: "Previsão Diária - 15 de Março 2026",
          conteudo:
            "Estabilidade e prazer com Lua em Touro. Momento de apreciar as pequenas coisas.",
          lema: "A beleza está nos olhos de quem sabe esperar",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        },
        "2026-03-14": {
          data_formatada: "14 MAR",
          lua: "🌙 Lua em Áries",
          titulo: "Previsão Diária - 14 de Março 2026",
          conteudo: "Marte em Gêmeos traz ação comunicativa. Iniciativa e coragem.",
          lema: "A coragem não é ausência de medo, é ação apesar dele",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        },
        "2026-03-13": {
          data_formatada: "13 MAR",
          lua: "🌙 Lua em Peixes",
          titulo: "Previsão Diária - 13 de Março 2026",
          conteudo:
            "Intuição elevada. Momento de confiar nos pressentimentos.",
          lema: "A intuição é a voz da alma que o medo tenta calar",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        },
        "2026-03-12": {
          data_formatada: "12 MAR",
          lua: "🌙 Lua em Peixes",
          titulo: "Previsão Diária - 12 de Março 2026",
          conteudo:
            "Intuição elevada no pós-Lua Nova. Momento de semear intenções.",
          lema: "Plante hoje o que quer colher amanhã",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        },
      };
      const postsDisponiveisPorData = new Map(
        todosPosts
          .filter((post) => /^\d{4}-\d{2}-\d{2}$/.test(post.data))
          .filter((post) => post.data <= DATA_PADRAO_ULTIMOS_DIAS)
          .map((post) => [post.data, post]),
      );
      let postsUltimos7Dias = {};
      window.postsUltimos7Dias = postsUltimos7Dias;
      const diasComPost = [
        ...new Set(
          [...postsDisponiveisPorData.values()]
            .filter((post) => post.data.startsWith(`${ANO_PADRAO_ULTIMOS_DIAS}-03-`))
            .map((post) => String(Number(post.data.slice(8, 10)))),
        ),
      ];
      const diaAtualCalendario = String(Number(DATA_PADRAO_ULTIMOS_DIAS.slice(8, 10)));
      const signosArquivoData = [
        { nome: "Áries", slug: "aries", icone: "/assets/icons/signos/aries.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Touro", slug: "touro", icone: "/assets/icons/signos/touro.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Gêmeos", slug: "gemeos", icone: "/assets/icons/signos/gemeos.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Câncer", slug: "cancer", icone: "/assets/icons/signos/cancer.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Leão", slug: "leao", icone: "/assets/icons/signos/leao.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Virgem", slug: "virgem", icone: "/assets/icons/signos/virgem.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Libra", slug: "libra", icone: "/assets/icons/signos/libra.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Escorpião", slug: "escorpiao", icone: "/assets/icons/signos/escorpiao.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Sagitário", slug: "sagitario", icone: "/assets/icons/signos/sagitario.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Capricórnio", slug: "capricornio", icone: "/assets/icons/signos/capricornio.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Aquário", slug: "aquario", icone: "/assets/icons/signos/aquario.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
        { nome: "Peixes", slug: "peixes", icone: "/assets/icons/signos/peixes.svg", posts: 12, ultimoPost: DATA_PADRAO_ULTIMOS_DIAS },
      ];

      function normalizarSlugSigno(nome) {
        return String(nome || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      function normalizarTexto(valor) {
        return String(valor || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      }

      function normalizarElemento(elemento) {
        const elementoNormalizado = normalizarTexto(elemento).trim();

        if (elementoNormalizado.includes("fogo")) {
          return "fogo";
        }

        if (elementoNormalizado.includes("terra")) {
          return "terra";
        }

        if (elementoNormalizado.includes("agua")) {
          return "agua";
        }

        return "ar";
      }

      function formatarDataPrevisoes(valorData) {
        const capitalizarMes = (texto) =>
          texto.replace(
            / de ([a-zà-úç]+)/i,
            (_, mes) => ` de ${mes.charAt(0).toUpperCase()}${mes.slice(1)}`,
          );

        if (!valorData) {
          return capitalizarMes(formatDatePretty(hoje));
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(valorData)) {
          return capitalizarMes(formatDatePretty(valorData));
        }

        return valorData;
      }

      // UI/SEO: fallback para quando o JSON de previsões não estiver disponível.
      const FALLBACK_PREVISOES = {
        data: hoje,
        signos: [],
        fallbackAviso:
          "🌟 Em breve: previsões diárias atualizadas. Selecione um signo novamente em alguns instantes.",
      };

      async function carregarPrevisoesDiarias() {
        try {
          const resposta = await fetch("/data/previsoes-diarias.json", {
            cache: "no-store",
          });

          if (!resposta.ok) {
            throw new Error(
              `Falha ao carregar previsões: status ${resposta.status}`,
            );
          }

          const dados = await resposta.json();
          if (!dados || !Array.isArray(dados.signos)) {
            throw new Error("Estrutura de previsões inválida.");
          }

          return dados;
        } catch (erro) {
          console.warn("⚠️ Não foi possível carregar /data/previsoes-diarias.json", erro);
          return { ...FALLBACK_PREVISOES };
        }
      }

      function criarCardSigno(signo) {
        const elementoSlug = normalizarElemento(signo.elemento || "Ar");
        const elementoLabel = {
          fogo: "Fogo",
          terra: "Terra",
          ar: "Ar",
          agua: "Água",
        }[elementoSlug];
        const iconeElemento = iconesElementos[elementoSlug] || "bi-stars";
        const nomeSigno = String(signo.nome || "Signo");
        const slugSigno = normalizarSlugSigno(nomeSigno);
        const urlSigno = `/signos/${slugSigno}/`;
        const iconeSigno = iconesSignos[slugSigno] || "/assets/icons/star.svg";
        const nomeSignoEscapado = escapeHtml(nomeSigno);

        const areas = (signo.areas || [])
          .map((area) => {
            return `<span class="badge text-bg-light border">
      ${escapeHtml(area)}
    </span>`;
          })
          .join("");

        return `
    <div class="previsao-signo card mb-4" data-signo="${slugSigno}" style="display: none;">
      <div class="card-header d-flex align-items-center gap-2 flex-wrap">
        <img src="${iconeSigno}" alt="Símbolo de ${nomeSignoEscapado}" title="Símbolo de ${nomeSignoEscapado}" width="24" height="24" />
        <h3 class="h5 mb-0">${nomeSignoEscapado}</h3>
        <span class="ms-2 text-muted small">
          <i class="bi ${iconeElemento} me-1"></i>${elementoLabel}
        </span>
      </div>
      <div class="card-body">
        <div class="d-flex flex-wrap gap-2 mb-3">
          <span class="badge text-bg-dark"><i class="bi bi-moon-stars me-1"></i>Lua em ${escapeHtml(signo.lua || "—")}</span>
          <span class="badge text-bg-secondary"><i class="bi bi-sun-fill me-1"></i>Sol em ${escapeHtml(signo.sol || "—")}</span>
        </div>
        <p class="mb-3">${escapeHtml(signo.previsao || "")}</p>
        <div class="d-flex flex-wrap gap-2 mb-3">${areas}</div>
        <div class="p-3 bg-light rounded border-start border-4">
          <strong>Dica do dia:</strong> ${escapeHtml(signo.dica || "Siga sua intuição com presença.")}
        </div>
        <div class="mt-3">
          <a href="${urlSigno}" class="btn btn-outline-primary btn-sm">Ver signo completo</a>
        </div>
      </div>
    </div>
  `;
      }

      function renderizarPrevisoesSignos(listaSignos) {
        const lista = document.getElementById("lista-previsoes-signos");
        if (!lista) {
          return;
        }

        lista.innerHTML = "";
        listaSignos.forEach((signo) => {
          lista.insertAdjacentHTML("beforeend", criarCardSigno(signo));
        });
      }

      function inicializarFiltroSignos() {
        const botoes = document.querySelectorAll("#seletor-signos button");
        const previsoes = document.querySelectorAll(".previsao-signo");
        const estadoZero = document.getElementById("estado-zero");
        const btnMostrarTodos =
          document.getElementById("filtro-mostrar-todos") ||
          document.getElementById("mostrar-todos");
        const btnLimparFiltro =
          document.getElementById("filtro-limpar") ||
          document.getElementById("limpar-filtro");
        const usarTemaRoxo = [...botoes].some(
          (botao) =>
            botao.classList.contains("btn-outline-roxo") ||
            botao.classList.contains("btn-roxo"),
        );

        function esconderTodasPrevisoes() {
          previsoes.forEach((previsao) => {
            previsao.style.display = "none";
          });
        }

        function resetarBotoes() {
          botoes.forEach((botao) => {
            botao.classList.remove(
              "btn-primary",
              "btn-roxo",
              "text-white",
              "active",
            );
            if (usarTemaRoxo) {
              botao.classList.remove("btn-outline-primary");
              botao.classList.add("btn-outline-roxo");
            } else {
              botao.classList.remove("btn-outline-roxo");
              botao.classList.add("btn-outline-primary");
            }
          });
        }

        function mostrarEstadoZero() {
          esconderTodasPrevisoes();
          if (estadoZero) {
            estadoZero.style.display = "block";
          }
          resetarBotoes();
        }

        function mostrarTodos() {
          previsoes.forEach((previsao) => {
            previsao.style.display = "block";
          });
          if (estadoZero) {
            estadoZero.style.display = "none";
          }
          resetarBotoes();
        }

        botoes.forEach((botao) => {
          botao.addEventListener("click", function onClickSigno() {
            const { signo } = this.dataset;
            esconderTodasPrevisoes();
            if (estadoZero) {
              estadoZero.style.display = "none";
            }

            const previsaoSelecionada = document.querySelector(
              `.previsao-signo[data-signo="${signo}"]`,
            );

            if (previsaoSelecionada) {
              previsaoSelecionada.style.display = "block";
            }

            resetarBotoes();
            if (usarTemaRoxo) {
              this.classList.remove("btn-outline-roxo");
              this.classList.add("btn-roxo", "active");
            } else {
              this.classList.remove("btn-outline-primary");
              this.classList.add("btn-primary", "text-white");
            }
          });
        });

        if (btnMostrarTodos) {
          btnMostrarTodos.addEventListener("click", mostrarTodos);
        }

        if (btnLimparFiltro) {
          btnLimparFiltro.addEventListener("click", mostrarEstadoZero);
        }

        mostrarEstadoZero();
      }

      async function inicializarPrevisoesSignos() {
        const previsoes = await carregarPrevisoesDiarias();
        previsoesState.todosSignos = Array.isArray(previsoes?.signos)
          ? previsoes.signos
          : [];
        previsoesState.fallbackAviso =
          previsoes?.fallbackAviso || FALLBACK_PREVISOES.fallbackAviso;

        atualizarCabecalhoPrevisoes(previsoes);
        renderizarPrevisoesSignos(previsoesState.todosSignos);
        inicializarFiltroSignos();

        if (!previsoesState.todosSignos.length) {
          const estadoZero = document.getElementById("estado-zero");
          if (estadoZero) {
            estadoZero.innerHTML = `
              <img src="/assets/icons/star.svg" alt="Ícone de estrela" title="Ícone de estrela" width="48" height="48" class="mb-3 opacity-50" />
              <p class="h5 mb-2">Previsões indisponíveis</p>
              <p class="text-muted">${escapeHtml(previsoesState.fallbackAviso)}</p>
            `;
          }
        }
      }
      function atualizarCabecalhoPrevisoes(previsoes) {
        const dataEl = document.getElementById("previsoes-data-atual");
        const luaEl = document.getElementById("previsoes-lua-global");
        const solEl = document.getElementById("previsoes-sol-global");

        if (!dataEl || !luaEl || !solEl) {
          return;
        }

        dataEl.textContent = formatarDataPrevisoes(previsoes?.data || hoje);

        const postReferencia = postsDisponiveis.find(
          (post) => post.data === (previsoes?.data || hoje),
        );
        const luaGlobal = postReferencia?.lua || previsoes?.signos?.[0]?.lua || "—";
        const solGlobal = postReferencia?.sol || previsoes?.signos?.[0]?.sol || "—";

        luaEl.textContent = luaGlobal;
        solEl.textContent = solGlobal;
      }

      function ativarTooltips() {
        if (!window.bootstrap?.Tooltip) {
          return;
        }

        document
          .querySelectorAll('[data-bs-toggle="tooltip"]')
          .forEach((elemento) => {
            window.bootstrap.Tooltip.getOrCreateInstance(elemento, {
              container: "body",
              trigger: "hover focus",
            });
          });
      }

      function montarDadosPostUltimos7Dias(dataISO) {
        const dadosBase = postsUltimos7DiasBase[dataISO];
        if (dadosBase) {
          return dadosBase;
        }

        const postCatalogo = postsDisponiveisPorData.get(dataISO);
        if (!postCatalogo) {
          return null;
        }

        return {
          data_formatada: formatarDiaMesCurto(dataISO),
          lua: postCatalogo.lua ? `Lua em ${postCatalogo.lua}` : "Lua em —",
          titulo: postCatalogo.titulo || `Previsão Diária - ${formatDatePretty(dataISO)}`,
          conteudo:
            postCatalogo.preview ||
            "Confira a previsão completa para alinhar suas escolhas com o céu do dia.",
          lema: "Quando intenção e ação caminham juntas, o céu responde.",
          lema_autor: "Aurora Scorpio",
          destaque_palavra: null,
        };
      }

      function construirJanelaUltimos7Dias() {
        const hojeLocal = parseISOToLocalDate(DATA_PADRAO_ULTIMOS_DIAS);
        const janela = [];

        for (let i = 0; i < 7; i += 1) {
          const dataDia = addDays(hojeLocal, -i);
          const dataISO = toLocalISODate(dataDia);
          const dadosPost = montarDadosPostUltimos7Dias(dataISO);

          janela.push({
            dataISO,
            dataFormatada: formatarDiaMesCurto(dataISO),
            isHoje: i === 0,
            hasPost: Boolean(dadosPost),
            post: dadosPost,
          });
        }

        postsUltimos7Dias = janela.reduce((acc, item) => {
          if (item.post) {
            acc[item.dataISO] = item.post;
          }
          return acc;
        }, {});
        window.postsUltimos7Dias = postsUltimos7Dias;

        return janela;
      }

      function renderizarCardsUltimos7Dias() {
        const container = document.getElementById("cards-dias");
        if (!container) {
          return null;
        }

        const janela = construirJanelaUltimos7Dias();
        const cardsHtml = janela
          .map((item) => {
            const classeBotao = item.isHoje ? "btn-dourado" : "btn-roxo";
            const classeCard = item.hasPost ? "card-signo" : "card-signo opacity-50";
            const labelCard = item.hasPost
              ? `Selecionar dia ${item.dataFormatada}`
              : `Dia ${item.dataFormatada} sem post publicado`;
            const role = item.hasPost ? 'role="button" tabindex="0"' : 'tabindex="-1"';
            const badgeHoje = item.isHoje && item.hasPost
              ? '<span class="badge-dourado d-inline-block mb-2">HOJE</span>'
              : "";
            const textoLua = escapeHtml(item.post?.lua || "Post ainda não publicado");
            const rotuloCta = item.isHoje
              ? "Ver post de hoje"
              : `Ver post de ${item.dataFormatada}`;
            const cta = item.hasPost
              ? `
                      <a href="#previsoes"
                         class="${classeBotao} btn-sm d-inline-flex align-items-center justify-content-center mt-auto btn-ler-dia"
                         data-dia="${item.dataISO}"
                         title="${rotuloCta}"
                         aria-label="${rotuloCta}">
                        <i class="bi bi-eye" aria-hidden="true"></i>
                      </a>
                `
              : `
                      <button type="button"
                              class="${classeBotao} btn-sm d-inline-flex align-items-center justify-content-center mt-auto disabled"
                              disabled
                              aria-label="Post ainda não publicado para ${item.dataFormatada}">
                        <i class="bi bi-eye" aria-hidden="true"></i>
                      </button>
                `;

            return `
                <div class="col-6 col-md-4 col-lg-3">
                  <div class="card ${classeCard} h-100 card-dia"
                       ${role}
                       data-dia="${item.dataISO}"
                       data-disponivel="${item.hasPost ? "1" : "0"}"
                       aria-label="${labelCard}">
                    <div class="card-body p-3 text-center d-flex flex-column">
                      ${badgeHoje}
                      <div class="fw-bold ${item.isHoje ? "fs-4 text-roxo" : "fs-5"}">${item.dataFormatada}</div>
                      <small class="text-muted d-block mb-3">${textoLua}</small>
                      ${cta}
                    </div>
                  </div>
                </div>
            `;
          })
          .join("");

        container.innerHTML = `
          ${cardsHtml}
          <div class="col-12 mt-3 text-end">
            <a href="/posts/diarios.html" class="btn btn-link text-roxo" aria-label="Ver todos os posts diários">
              Ver todos os posts <i class="bi bi-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        `;

        return janela.find((item) => item.hasPost)?.dataISO || null;
      }

      function atualizarDestaqueVisualCardsDia(dataSelecionada) {
        const cards = document.querySelectorAll(".card-dia");
        cards.forEach((card) => {
          card.classList.remove("card-destaque", "card-signo-ativo");
          card.classList.add("card-signo");
          card.setAttribute("aria-pressed", "false");

          card.querySelectorAll(".badge-dourado, .badge").forEach((badge) => {
            badge.remove();
          });
        });

        const cardSelecionado = document.querySelector(
          `.card-dia[data-dia="${dataSelecionada}"]`,
        );
        if (!cardSelecionado) {
          return;
        }

        cardSelecionado.classList.remove("card-signo");
        cardSelecionado.classList.add("card-destaque", "card-signo-ativo");
        cardSelecionado.setAttribute("aria-pressed", "true");

        const corpoCard = cardSelecionado.querySelector(".card-body");
        if (!corpoCard) {
          return;
        }

        const badge = document.createElement("span");
        badge.className = "badge-dourado d-inline-block mb-2";
        badge.textContent =
          dataSelecionada === DATA_PADRAO_ULTIMOS_DIAS ? "HOJE" : "ATUAL";
        corpoCard.insertBefore(badge, corpoCard.firstChild);
      }

      function formatarIndicadorNavegacaoDias(dataISO) {
        if (!dataISO) {
          return null;
        }

        const [ano, mes, dia] = dataISO.split("-").map(Number);
        if (!ano || !mes || !dia) {
          return null;
        }

        const data = new Date(ano, mes - 1, dia, 12);
        const diaSemana = DIAS_SEMANA_NAVEGACAO[data.getDay()] || "Dia";
        const mesAbrev = Object.keys(MESES_NAVEGACAO).find(
          (chave) => MESES_NAVEGACAO[chave] === String(mes).padStart(2, "0"),
        );

        return {
          diaSemana,
          diaNumero: dia,
          mesAno: `${mesAbrev || "MAR"} ${ano}`,
        };
      }

      function extrairDataAtualDoTitulo() {
        const tituloEl = document.getElementById("post-titulo");
        if (!tituloEl) {
          return DATA_PADRAO_ULTIMOS_DIAS;
        }

        const texto = String(tituloEl.textContent || "");
        const match = texto.match(/(\d{1,2})\s+([A-Z]{3})/i);
        if (!match) {
          return DATA_PADRAO_ULTIMOS_DIAS;
        }

        const dia = match[1].padStart(2, "0");
        const mes = MESES_NAVEGACAO[match[2].toUpperCase()] || "03";
        return `${ANO_PADRAO_ULTIMOS_DIAS}-${mes}-${dia}`;
      }

      function criarNavegacaoDiasHTML(dataAtualISO) {
        const dataAtual = new Date(`${dataAtualISO}T12:00:00`);
        if (Number.isNaN(dataAtual.getTime())) {
          return "";
        }

        const diaAnterior = new Date(dataAtual);
        diaAnterior.setDate(diaAnterior.getDate() - 1);
        const diaProximo = new Date(dataAtual);
        diaProximo.setDate(diaProximo.getDate() + 1);

        const formatarISO = (data) =>
          `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
        const formatarRotulo = (data) => {
          const dia = String(data.getDate()).padStart(2, "0");
          const mes = Object.keys(MESES_NAVEGACAO).find(
            (chave) =>
              MESES_NAVEGACAO[chave] === String(data.getMonth() + 1).padStart(2, "0"),
          );
          return `${dia} ${mes || "MAR"}`;
        };

        const isoAnterior = formatarISO(diaAnterior);
        const isoProximo = formatarISO(diaProximo);
        const temAnterior = Boolean(postsUltimos7Dias[isoAnterior]);
        const temProximo = Boolean(postsUltimos7Dias[isoProximo]);
        const indicador = formatarIndicadorNavegacaoDias(dataAtualISO);

        if (!indicador) {
          return "";
        }

        return `
          <nav class="navegacao-dias my-4" aria-label="Navegação entre dias">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
              <button class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 btn-nav-dia"
                      type="button"
                      data-dia="${isoAnterior}"
                      ${!temAnterior ? "disabled" : ""}
                      aria-label="Dia anterior: ${formatarRotulo(diaAnterior)}">
                <i class="bi bi-arrow-left-circle-fill" aria-hidden="true"></i>
                <span>Anterior</span>
                <span class="text-muted">${formatarRotulo(diaAnterior)}</span>
              </button>

              <div class="text-center border rounded px-3 py-2 bg-light flex-grow-1" aria-live="polite">
                <div class="small text-muted">${indicador.diaSemana}</div>
                <div class="h5 mb-0 fw-bold">${indicador.diaNumero}</div>
                <div class="small text-uppercase">${indicador.mesAno}</div>
              </div>

              <button class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 btn-nav-dia"
                      type="button"
                      data-dia="${isoProximo}"
                      ${!temProximo ? "disabled" : ""}
                      aria-label="Próximo dia: ${formatarRotulo(diaProximo)}">
                <span>Próximo</span>
                <span class="text-muted">${formatarRotulo(diaProximo)}</span>
                <i class="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>
              </button>
            </div>
          </nav>
        `;
      }

      function atualizarNavegacaoDias() {
        const lemaContainer = document.getElementById("lema-container");
        if (!lemaContainer) {
          return;
        }

        const navAnterior = document.querySelector(".navegacao-dias");
        if (navAnterior) {
          navAnterior.remove();
        }

        const dataAtualISO = extrairDataAtualDoTitulo();
        const html = criarNavegacaoDiasHTML(dataAtualISO);
        if (html) {
          lemaContainer.insertAdjacentHTML("afterend", html);
        }
      }

      function inicializarEventosNavegacaoDias() {
        document.addEventListener("click", (evento) => {
          const botao = evento.target.closest(".btn-nav-dia:not([disabled])");
          if (!botao) {
            return;
          }

          const dia = botao.dataset.dia;
          if (!dia || !postsUltimos7Dias[dia]) {
            return;
          }

          atualizarPostDinamico(dia);
        });
      }

      // Atualiza o conteúdo principal (post + lema) conforme o dia selecionado.
      function atualizarPostDinamico(dataSelecionada) {
        const post = postsUltimos7Dias[dataSelecionada];
        if (!post) {
          return;
        }

        const tituloEl = document.getElementById("post-titulo");
        const luaEl = document.getElementById("post-lua");
        const subtituloEl = document.getElementById("post-subtitulo");
        const conteudoEl = document.getElementById("post-conteudo");
        const lemaEl = document.getElementById("lema-texto");
        const autorEl = document.getElementById("lema-autor");
        const linkEl = document.getElementById("post-link");

        if (tituloEl) {
          const prefixo =
            dataSelecionada === DATA_PADRAO_ULTIMOS_DIAS ? "HOJE • " : "";
          tituloEl.textContent = `${prefixo}${post.data_formatada}`;
        }
        if (luaEl) {
          luaEl.innerHTML = post.lua;
        }
        if (subtituloEl) {
          subtituloEl.textContent = post.titulo;
        }
        if (conteudoEl) {
          conteudoEl.textContent = post.conteudo;
        }
        if (lemaEl) {
          if (post.destaque_palavra) {
            const palavraEscapada = post.destaque_palavra.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&",
            );
            const regexDestaque = new RegExp(`(${palavraEscapada})`, "gi");
            const lemaComDestaque = escapeHtml(post.lema).replace(
              regexDestaque,
              '<span class="palavra-destaque">$1</span>',
            );
            lemaEl.innerHTML = `"${lemaComDestaque}"`;
          } else {
            lemaEl.innerHTML = `"${escapeHtml(post.lema)}"`;
          }
        }
        if (autorEl) {
          autorEl.textContent = post.lema_autor || "Aurora Scorpio";
        }

        if (linkEl) {
          const postRelacionado = postsDisponiveis.find(
            (postAtual) => postAtual.data === dataSelecionada,
          );
          const href = postRelacionado
            ? gerarLinkPost(postRelacionado)
            : gerarLinkPostPorData(dataSelecionada);
          linkEl.setAttribute("href", href);
          linkEl.setAttribute("title", `Ler post completo de ${post.data_formatada}`);
          linkEl.setAttribute(
            "aria-label",
            `Abrir post completo de ${post.data_formatada}`,
          );
        }

        atualizarDestaqueVisualCardsDia(dataSelecionada);
        atualizarNavegacaoDias();
      }
      window.atualizarPostDinamico = atualizarPostDinamico;
      window.atualizarNavegacaoDias = atualizarNavegacaoDias;

      function inicializarCardsUltimos7Dias() {
        const dataInicial = renderizarCardsUltimos7Dias();
        const cards = document.querySelectorAll(".card-dia");
        if (!cards.length) {
          return;
        }

        cards.forEach((card) => {
          if (card.dataset.disponivel !== "1") {
            return;
          }

          card.addEventListener("click", () => {
            atualizarPostDinamico(card.dataset.dia);
          });

          card.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
              evento.preventDefault();
              atualizarPostDinamico(card.dataset.dia);
            }
          });
        });

        const botoesLer = document.querySelectorAll(".btn-ler-dia");
        botoesLer.forEach((botao) => {
          botao.addEventListener("click", (evento) => {
            evento.preventDefault();
            evento.stopPropagation();

            const dia = botao.dataset.dia || botao.closest(".card-dia")?.dataset.dia;
            if (!dia || !postsUltimos7Dias[dia]) {
              return;
            }

            atualizarPostDinamico(dia);

            const secaoPrevisoes = document.getElementById("previsoes");
            if (secaoPrevisoes) {
              secaoPrevisoes.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });
        });

        if (dataInicial) {
          atualizarPostDinamico(dataInicial);
        }
      }

      function criarCard(post) {
        const isEspecial = post.tipo === "especial";
        const cardClasse = isEspecial ? "special-card" : "";
        const tipoTexto = isEspecial
          ? `<span class="badge-especial"><i class="bi bi-stars"></i> Especial</span>`
          : `<span class="badge-post"><i class="bi bi-calendar3"></i> Post Diário</span><span class="badge-lua"><i class="bi bi-moon-stars"></i> Lua em ${post.lua}</span>`;

        const solInfo = isEspecial
          ? ""
          : `<span class="sol-info"><i class="bi bi-sun-fill meta-icon sun" aria-hidden="true"></i> Sol em ${post.sol || "—"}</span>`;
        const tituloLinkPost = escapeHtml(`Leia o post completo: ${post.titulo}`);

        return `
                <div class="col mb-4" data-data="${post.data}">
                    <article class="mystic-card ${cardClasse} h-100">
                        <div class="card-body d-flex flex-column h-100 p-3 gap-2">
                            <div class="card-badges">
                                ${tipoTexto}
                            </div>
                            <small class="text-muted"><i class="bi bi-calendar3 meta-icon"></i> ${formatDatePretty(post.data)}</small>
                            <h3 class="h5" style="margin-top:8px;">${post.titulo}</h3>
                            <p class="preview">${post.preview}</p>
                            <div class="d-flex justify-content-between align-items-center gap-2 mt-auto pt-2 flex-wrap">
                                ${solInfo}
                                <a href="${gerarLinkPost(post)}" class="btn-card" title="${tituloLinkPost}" aria-label="${tituloLinkPost}">Ler mais <i class="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>
                </div>
            `;
      }

      function renderPosts(lista) {
        postsGrid.innerHTML = "";
        const semDestaque = lista.filter((post) => !post.destaque);

        if (semDestaque.length === 0) {
          postsGrid.innerHTML =
            lista.length > 0
              ? '<div class="col-12"><div class="nenhum-post">🌙 O resultado desta busca está na seção de post do dia.</div></div>'
              : '<div class="col-12"><div class="nenhum-post">🌙 Nenhum post encontrado para este filtro.</div></div>';
          contador.textContent = `${lista.length} publicações`;
          renderCalendario(lista);
          return;
        }

        semDestaque.forEach((post) => {
          postsGrid.insertAdjacentHTML("beforeend", criarCard(post));
        });

        contador.textContent = `${lista.length} publicações`;
        renderCalendario(lista);
      }

      function filtrarPosts() {
        const mesSelecionado =
          document.querySelector(".month-btn.active")?.dataset.mes || "all";
        const busca = (buscaInput.value || "").toLowerCase().trim();

        let filtrados = [...postsDisponiveis];

        if (mesSelecionado !== "all") {
          filtrados = filtrados.filter((post) =>
            post.data.startsWith(mesSelecionado),
          );
        }

        if (busca) {
          filtrados = filtrados.filter((post) => {
            const texto = [
              formatDatePretty(post.data),
              post.data,
              post.lua,
              post.sol,
              post.titulo,
              post.preview,
            ]
              .join(" ")
              .toLowerCase();

            return texto.includes(busca);
          });
        }

        renderPosts(filtrados);
      }

      function renderizarCelulaCalendario(dia) {
        if (!dia) {
          return "<td></td>";
        }

        const diaStr = String(dia);
        if (diaStr === diaAtualCalendario) {
          return `<td class="dia-atual">${diaStr}</td>`;
        }

        if (diasComPost.includes(diaStr)) {
          return `<td class="dia-com-post">${diaStr}</td>`;
        }

        return `<td class="text-muted">${diaStr}</td>`;
      }

      function gerarCalendarioMar2026() {
        const semanas = [
          [1, 2, 3, 4, 5, 6, 7],
          [8, 9, 10, 11, 12, 13, 14],
          [15, 16, 17, 18, 19, 20, 21],
          [22, 23, 24, 25, 26, 27, 28],
          [29, 30, 31, "", "", "", ""],
        ];

        const linhas = semanas
          .map((semana) => {
            const celulas = semana.map((dia) => renderizarCelulaCalendario(dia)).join("");
            return `<tr>${celulas}</tr>`;
          })
          .join("");

        return `
          <table class="table table-bordered text-center mb-0 align-middle">
            <thead>
              <tr>
                <th>DOM</th>
                <th>SEG</th>
                <th>TER</th>
                <th>QUA</th>
                <th>QUI</th>
                <th>SEX</th>
                <th>SÁB</th>
              </tr>
            </thead>
            <tbody>
              ${linhas}
            </tbody>
          </table>
          <div class="mt-3 d-flex gap-3 small">
            <div class="d-flex align-items-center gap-1">
              <span class="dia-com-post" style="width: 20px; height: 20px; display: inline-block;"></span>
              <span>Post publicado</span>
            </div>
            <div class="d-flex align-items-center gap-1">
              <span class="dia-atual" style="width: 20px; height: 20px; display: inline-block;"></span>
              <span>Hoje</span>
            </div>
          </div>
        `;
      }

      function formatarDataCurtaArquivo(dataIso) {
        const [ano, mes, dia] = dataIso.split("-");
        const nomesMes = [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ];
        const mesNome = nomesMes[parseInt(mes, 10) - 1] || "Mar";
        return `${parseInt(dia, 10)} ${mesNome} ${ano}`;
      }

      function renderizarUltimosPostsSignos() {
        const container = document.getElementById("ultimos-posts-signos");
        if (!container) {
          return;
        }

        const html = signosArquivoData
          .slice(0, 6)
          .map((signo) => {
            const badgeHoje =
              signo.ultimoPost === DATA_PADRAO_ULTIMOS_DIAS
                ? '<span class="badge-hoje">Hoje</span>'
                : "";
            const urlSigno = `/signos/${signo.slug}/`;
            return `
              <a href="${urlSigno}" class="signo-arquivo-item" aria-label="Abrir página de ${signo.nome}">
                <img src="${signo.icone}" alt="${signo.nome}" class="icone-signo" width="32" height="32" />
                <div class="info-signo">
                  <span class="nome-signo">${signo.nome}</span>
                  <span class="data-signo"> · ${formatarDataCurtaArquivo(signo.ultimoPost)}</span>
                </div>
                ${badgeHoje}
              </a>
            `;
          })
          .join("");

        container.innerHTML = html;
      }

      function renderizarGridSignosArquivo() {
        const container = document.getElementById("grid-signos-arquivo");
        if (!container) {
          return;
        }

        const html = signosArquivoData
          .map((signo) => {
            const urlSigno = `/signos/${signo.slug}/`;
            return `
              <a href="${urlSigno}" class="arquivo-grid-item" aria-label="Ver arquivo de ${signo.nome}">
                <img src="${signo.icone}" alt="${signo.nome}" class="icone-signo-grid" width="40" height="40" />
                <span class="nome-signo-grid">${signo.nome}</span>
                <span class="qtd-posts">${signo.posts} posts</span>
              </a>
            `;
          })
          .join("");

        container.innerHTML = html;
      }

      function renderCalendario() {
        if (!calendario) {
          return;
        }

        calendario.innerHTML = "";
        calendario.insertAdjacentHTML(
          "beforeend",
          `
            <div class="mb-2">
              ${gerarCalendarioMar2026()}
            </div>
          `,
        );
      }

      botaoFiltros.forEach((btn) => {
        btn.addEventListener("click", () => {
          botaoFiltros.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          filtrarPosts();
        });
      });

      buscaInput.addEventListener("input", filtrarPosts);

      function bindNewsletterForm({ formId, inputId, msgId, successClass }) {
        const form = document.getElementById(formId);
        const input = document.getElementById(inputId);
        const msg = document.getElementById(msgId);

        if (!form || !input || !msg) {
          return;
        }

        form.addEventListener("submit", (evento) => {
          evento.preventDefault();
          const email = input.value.trim();

          if (!email) {
            msg.className = "small mt-2 text-danger";
            msg.textContent =
              "Digite um e-mail válido para receber as previsões.";
            return;
          }

          msg.className = `small mt-2 ${successClass}`;
          msg.textContent = "Inscrição realizada com sucesso! 💫";
          input.value = "";
        });
      }

      bindNewsletterForm({
        formId: "form-newsletter",
        inputId: "email-news",
        msgId: "msg-news",
        successClass: "text-success",
      });

      function aplicarFiltroPadrao() {
        const mesPadrao =
          botaoFiltros &&
          [...botaoFiltros].find((btn) => btn.dataset.mes === hoje.slice(0, 7));
        if (mesPadrao && !mesPadrao.classList.contains("active")) {
          botaoFiltros.forEach((btn) => btn.classList.remove("active"));
          mesPadrao.classList.add("active");
        }
      }

      function verificarDuplicatas() {
        const arquivos = todosPosts.map((post) => post.arquivo);
        const duplicatas = arquivos.filter(
          (item, index) => arquivos.indexOf(item) !== index,
        );

        if (duplicatas.length) {
          console.warn("⚠️ Posts duplicados encontrados:", [
            ...new Set(duplicatas),
          ]);
        }
      }

      verificarDuplicatas();
      inicializarEventosNavegacaoDias();
      inicializarCardsUltimos7Dias();
      atualizarNavegacaoDias();
      aplicarFiltroPadrao();
      filtrarPosts();
      renderizarUltimosPostsSignos();
      renderizarGridSignosArquivo();
      inicializarPrevisoesSignos();

      // Ativar link da home no mesmo layout
      const caminhoAtual = window.location.pathname;
      const menu = document.querySelectorAll(".nav-link-cosmic");
      menu.forEach((link) => {
        if (
          link.getAttribute("href") === caminhoAtual ||
          (caminhoAtual === "/" && link.textContent.includes("Início"))
        ) {
          link.classList.add("active");
        }
      });

      // ===== COOKIE CONSENT - LGPD =====
      function initCookieConsent() {
        const cookieConsent = document.getElementById("cookieConsent");
        const cookiePreferencias = localStorage.getItem("cookieConsent");

        // Verificar se já aceitou antes
        if (!cookiePreferencias) {
          // Mostrar aviso após 1 segundo
          setTimeout(() => {
            cookieConsent.style.display = "block";
          }, 1000);
        } else {
          // Aplicar preferências salvas
          aplicarPreferenciasCookies(JSON.parse(cookiePreferencias));
        }
      }

      function aceitarTodosCookies() {
        const preferencias = {
          necessarios: true,
          analytics: true,
          funcionais: true,
          data: new Date().toISOString(),
        };

        // Salvar no localStorage
        localStorage.setItem("cookieConsent", JSON.stringify(preferencias));

        // Esconder aviso
        document.getElementById("cookieConsent").style.display = "none";

        // Aplicar configurações
        aplicarPreferenciasCookies(preferencias);

        // Mostrar mensagem de sucesso
        mostrarMensagemCookies("✅ Preferências salvas com sucesso!");
      }

      function mostrarConfigCookies() {
        const configPanel = document.getElementById("cookieConfigPanel");
        const overlay = document.getElementById("cookieOverlay");

        // Carregar preferências atuais se existirem
        const cookiePreferencias = localStorage.getItem("cookieConsent");
        if (cookiePreferencias) {
          const prefs = JSON.parse(cookiePreferencias);
          document.getElementById("cookiesAnalytics").checked = prefs.analytics;
          document.getElementById("cookiesFuncionais").checked = prefs.funcionais;
        }

        configPanel.style.display = "block";
        overlay.style.display = "block";
        document.getElementById("cookieConsent").style.display = "none";
      }

      function fecharConfigCookies() {
        document.getElementById("cookieConfigPanel").style.display = "none";
        document.getElementById("cookieOverlay").style.display = "none";

        // Se não tinha preferências antes, mostrar o aviso novamente
        if (!localStorage.getItem("cookieConsent")) {
          document.getElementById("cookieConsent").style.display = "block";
        }
      }

      function salvarConfigCookies() {
        const preferencias = {
          necessarios: true, // Sempre true
          analytics: document.getElementById("cookiesAnalytics").checked,
          funcionais: document.getElementById("cookiesFuncionais").checked,
          data: new Date().toISOString(),
        };

        // Salvar no localStorage
        localStorage.setItem("cookieConsent", JSON.stringify(preferencias));

        // Fechar painel
        fecharConfigCookies();

        // Aplicar configurações
        aplicarPreferenciasCookies(preferencias);

        // Mostrar mensagem de sucesso
        mostrarMensagemCookies("⚙️ Preferências de cookies salvas!");
      }

      function aplicarPreferenciasCookies(prefs) {
        // Controle do Google Analytics baseado na preferência
        if (prefs.analytics) {
          // Ativar Google Analytics (se já estava desativado)
          if (typeof gtag !== "undefined") {
            gtag("consent", "update", {
              analytics_storage: "granted",
            });
          }
          console.log("✅ Analytics ativado");
        } else {
          // Desativar Google Analytics
          if (typeof gtag !== "undefined") {
            gtag("consent", "update", {
              analytics_storage: "denied",
            });
          }
          console.log("🔴 Analytics desativado");
        }

        // Controle do chat (funcionais)
        const chat = document.querySelector(".kodassauro");
        if (chat && prefs.funcionais) {
          chat.style.display = "block";
        } else if (chat) {
          chat.style.display = "block"; // Chat pode funcionar sem cookies? Ajuste conforme necessário
        }
      }

      function mostrarMensagemCookies(texto) {
        // Criar toast temporário
        const toast = document.createElement("div");
        toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--midnight-blue);
    color: var(--soft-gold);
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-size: 0.9rem;
    z-index: 100001;
    border: 1px solid var(--soft-gold);
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease-out;
  `;
        toast.textContent = texto;
        document.body.appendChild(toast);

        // Remover após 3 segundos
        setTimeout(() => {
          toast.style.animation = "slideUp 0.3s reverse ease-out";
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 3000);
      }

      // Inicializar quando a página carregar
      document.addEventListener("DOMContentLoaded", initCookieConsent);

      // Se usar Google Analytics, adicionar consentimento inicial
      if (typeof gtag !== "undefined") {
        gtag("consent", "default", {
          analytics_storage: "denied",
          ad_storage: "denied",
          functionality_storage: "denied",
          personalization_storage: "denied",
          security_storage: "granted", // Sempre necessário
        });
      }
