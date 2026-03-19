(function () {
  "use strict";

  function getTodayISOFallback() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date())
      .reduce((acc, part) => {
        if (part.type !== "literal") {
          acc[part.type] = part.value;
        }
        return acc;
      }, {});

    return `${parts.year}-${parts.month}-${parts.day}`;
  }

  function isPostAvailableFallback(postDateISO, referenceDateISO) {
    if (!postDateISO) {
      return false;
    }
    const today = referenceDateISO || getTodayISOFallback();
    return String(postDateISO) <= String(today);
  }

  const hasAuroraSchedule =
    typeof window.AuroraSchedule !== "undefined" &&
    typeof window.AuroraSchedule.getTodayISO === "function" &&
    typeof window.AuroraSchedule.isPostAvailable === "function";

  if (!hasAuroraSchedule) {
    console.error("Erro: schedule.js não carregado corretamente (AuroraSchedule indisponível).");
  }

  const schedule = hasAuroraSchedule
    ? window.AuroraSchedule
    : {
      getTodayISO: getTodayISOFallback,
      isPostAvailable: isPostAvailableFallback,
    };

  const YEAR = "2026";
  const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const MONTHS = [
    { num: "01", name: "Janeiro", folder: "01-Janeiro", availableDays: 31 },
    { num: "02", name: "Fevereiro", folder: "02-Fevereiro", availableDays: 28 },
    { num: "03", name: "Março", folder: "03-Marco", availableDays: 31 },
  ];

  const postsList = document.getElementById("posts-list");
  const contadorPosts = document.getElementById("contador-posts");
  const buscaInput = document.getElementById("busca-arquivo");
  const filtroMes = document.getElementById("filtro-mes");
  const filtroOrdem = document.getElementById("filtro-ordem");
  const limparFiltrosBtn = document.getElementById("limpar-filtros");
  const atalhosTags = document.getElementById("atalhos-tags");
  const calendarioBody = document.getElementById("calendario-body");
  const mesCalendarioEl = document.getElementById("mes-calendario");
  const mesAnteriorBtn = document.getElementById("mes-anterior");
  const mesProximoBtn = document.getElementById("mes-proximo");

  if (
    !postsList ||
    !contadorPosts ||
    !buscaInput ||
    !filtroMes ||
    !filtroOrdem ||
    !limparFiltrosBtn ||
    !calendarioBody ||
    !mesCalendarioEl ||
    !mesAnteriorBtn ||
    !mesProximoBtn
  ) {
    return;
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function buildPosts() {
    const posts = [];

    MONTHS.forEach((month, monthIndex) => {
      for (let day = 1; day <= month.availableDays; day += 1) {
        const dd = String(day).padStart(2, "0");
        const iso = `${YEAR}-${month.num}-${dd}`;
        const date = new Date(`${iso}T12:00:00`);
        const weekday = WEEKDAYS[date.getDay()];
        const shortDate = `${dd}/${month.num}`;
        const fullDate = `${dd} de ${month.name} de ${YEAR}`;
        const tags = [
          `#${normalize(month.name)}`,
          `#mes-${month.num}`,
          `#dia-${dd}`,
          `#${YEAR}-${month.num}`,
          "#previsao",
          "#diario",
        ];

        posts.push({
          id: `post-${month.num}-${dd}`,
          iso,
          month: `${YEAR}-${month.num}`,
          monthLabel: month.name,
          day: dd,
          weekday,
          shortDate,
          fullDate,
          title: `Previsão Diária - ${fullDate}`,
          excerpt: `Leitura do dia ${shortDate} com foco em autoconhecimento, ciclos lunares e organização da energia pessoal.`,
          link: `/posts/${month.folder}/diario-${month.num}-${dd}-${YEAR}.html`,
          tags,
          tagsNormalized: tags.map((tag) => normalize(tag.replace("#", ""))),
        });
      }
    });

    return posts;
  }

  const allPosts = buildPosts();
  const todayISO = schedule.getTodayISO();
  const postsDisponiveis = allPosts.filter((post) =>
    schedule.isPostAvailable(post.iso, todayISO),
  );
  const postByDate = new Map(postsDisponiveis.map((post) => [post.iso, post]));
  const defaultCalendarMonth = todayISO.slice(0, 7);

  const state = {
    query: "",
    month: "all",
    sort: "desc",
    selectedDate: "",
    calendarMonth: defaultCalendarMonth,
  };

  function createPostCard(post) {
    return `
      <div class="col-12">
        <article class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
              <h3 class="h6 mb-0">${post.title}</h3>
              <span class="badge text-bg-light border">${post.weekday}, ${post.shortDate}</span>
            </div>
            <p class="text-muted mb-3">${post.excerpt}</p>
            <div class="d-flex flex-wrap gap-2 mb-3">
              ${post.tags
                .slice(0, 3)
                .map((tag) => `<span class="badge rounded-pill text-bg-secondary">${tag}</span>`)
                .join("")}
            </div>
            <div class="d-flex flex-wrap gap-2">
              <a href="${post.link}" class="btn btn-primary btn-sm">Ler post</a>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-filter-date="${post.iso}">
                Filtrar dia
              </button>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function applyFilters() {
    const queryNormalized = normalize(state.query.trim());
    const tokens = queryNormalized.split(/\s+/).filter(Boolean);

    let filtered = [...postsDisponiveis];

    if (state.month !== "all") {
      filtered = filtered.filter((post) => post.month === state.month);
    }

    if (state.selectedDate) {
      filtered = filtered.filter((post) => post.iso === state.selectedDate);
    }

    if (tokens.length) {
      filtered = filtered.filter((post) => {
        const searchable = normalize(
          [
            post.title,
            post.excerpt,
            post.iso,
            post.shortDate,
            post.fullDate,
            post.monthLabel,
            post.weekday,
            post.tags.join(" "),
          ].join(" "),
        );

        return tokens.every((token) => {
          if (token.startsWith("#")) {
            const cleanTag = token.replace(/^#+/, "");
            return post.tagsNormalized.some((tag) => tag.includes(cleanTag));
          }
          return searchable.includes(token);
        });
      });
    }

    filtered.sort((a, b) => {
      if (state.sort === "asc") {
        return a.iso.localeCompare(b.iso);
      }
      return b.iso.localeCompare(a.iso);
    });

    return filtered;
  }

  function renderPosts() {
    const filtered = applyFilters();

    contadorPosts.textContent = `${filtered.length} publicação(ões) encontrada(s)`;

    if (!filtered.length) {
      postsList.innerHTML = `
        <div class="col-12">
          <div class="alert alert-light border mb-0">
            Nenhum resultado para os filtros atuais. Tente outro texto, tag ou mês.
          </div>
        </div>
      `;
      return;
    }

    postsList.innerHTML = filtered.map(createPostCard).join("");
  }

  function renderCalendar() {
    const monthIndex = MONTHS.findIndex((month) => `${YEAR}-${month.num}` === state.calendarMonth);
    const currentMonth = MONTHS[monthIndex] || MONTHS[MONTHS.length - 1];
    const realMonthIndex = Number(currentMonth.num) - 1;
    const firstDay = new Date(Number(YEAR), realMonthIndex, 1).getDay();
    const monthDays = new Date(Number(YEAR), realMonthIndex + 1, 0).getDate();

    mesCalendarioEl.textContent = `${currentMonth.name} ${YEAR}`;
    mesAnteriorBtn.disabled = monthIndex <= 0;
    mesProximoBtn.disabled = monthIndex >= MONTHS.length - 1;

    const cells = [];

    for (let i = 0; i < firstDay; i += 1) {
      cells.push("<td></td>");
    }

    for (let day = 1; day <= monthDays; day += 1) {
      const dd = String(day).padStart(2, "0");
      const iso = `${YEAR}-${currentMonth.num}-${dd}`;
      const post = postByDate.get(iso);
      const isToday = iso === todayISO;
      const isSelected = iso === state.selectedDate;

      if (!post) {
        cells.push(`<td class="text-muted">${day}</td>`);
        continue;
      }

      const dayButtonClass = isSelected
        ? "btn btn-sm btn-primary w-100"
        : isToday
          ? "btn btn-sm btn-warning w-100"
          : "btn btn-sm btn-outline-primary w-100";

      cells.push(`
        <td>
          <button type="button"
                  class="${dayButtonClass}"
                  data-calendar-day="${iso}"
                  aria-label="Filtrar dia ${day} de ${currentMonth.name}">
            ${day}
          </button>
          <a href="${post.link}" class="small d-block mt-1 text-decoration-none">abrir</a>
        </td>
      `);
    }

    while (cells.length % 7 !== 0) {
      cells.push("<td></td>");
    }

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(`<tr>${cells.slice(i, i + 7).join("")}</tr>`);
    }

    calendarioBody.innerHTML = rows.join("");
  }

  function syncFilterMonthWithCalendar() {
    if (state.month !== "all") {
      state.calendarMonth = state.month;
    }
  }

  function refreshUI() {
    syncFilterMonthWithCalendar();
    renderPosts();
    renderCalendar();
  }

  buscaInput.addEventListener("input", (event) => {
    state.query = event.target.value || "";
    refreshUI();
  });

  filtroMes.addEventListener("change", (event) => {
    state.month = event.target.value;
    if (state.month === "all") {
      state.selectedDate = "";
    }
    refreshUI();
  });

  filtroOrdem.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderPosts();
  });

  limparFiltrosBtn.addEventListener("click", () => {
    state.query = "";
    state.month = "all";
    state.sort = "desc";
    state.selectedDate = "";
    state.calendarMonth = defaultCalendarMonth;

    buscaInput.value = "";
    filtroMes.value = "all";
    filtroOrdem.value = "desc";
    refreshUI();
  });

  atalhosTags?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tag]");
    if (!button) {
      return;
    }
    const tag = button.getAttribute("data-tag") || "";
    state.query = tag;
    buscaInput.value = tag;
    refreshUI();
  });

  postsList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter-date]");
    if (!button) {
      return;
    }
    const date = button.getAttribute("data-filter-date");
    if (!date) {
      return;
    }
    state.selectedDate = date;
    state.month = date.slice(0, 7);
    filtroMes.value = state.month;
    refreshUI();
  });

  calendarioBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-calendar-day]");
    if (!button) {
      return;
    }
    const date = button.getAttribute("data-calendar-day");
    if (!date) {
      return;
    }
    state.selectedDate = state.selectedDate === date ? "" : date;
    state.month = date.slice(0, 7);
    filtroMes.value = state.month;
    refreshUI();
  });

  mesAnteriorBtn.addEventListener("click", () => {
    const currentIndex = MONTHS.findIndex((month) => `${YEAR}-${month.num}` === state.calendarMonth);
    if (currentIndex <= 0) {
      return;
    }
    state.calendarMonth = `${YEAR}-${MONTHS[currentIndex - 1].num}`;
    state.month = state.calendarMonth;
    filtroMes.value = state.month;
    refreshUI();
  });

  mesProximoBtn.addEventListener("click", () => {
    const currentIndex = MONTHS.findIndex((month) => `${YEAR}-${month.num}` === state.calendarMonth);
    if (currentIndex < 0 || currentIndex >= MONTHS.length - 1) {
      return;
    }
    state.calendarMonth = `${YEAR}-${MONTHS[currentIndex + 1].num}`;
    state.month = state.calendarMonth;
    filtroMes.value = state.month;
    refreshUI();
  });

  refreshUI();
})();
