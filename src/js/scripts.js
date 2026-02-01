document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-group");
  const descricaoInput = document.getElementById("description");
  const btnSend = document.getElementById("generate-btn");
  const btnText = document.getElementById("btn-text");
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const previewSection = document.getElementById("preview-section");

  // --- Event Listeners ---
  form.addEventListener("submit", handleFormSubmit);

  // Configurar botões de cópia
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const codeElement = document.getElementById(targetId);
      if (codeElement && codeElement.textContent) {
        copyToClipboard(codeElement.textContent, btn);
      }
    });
  });

  // --- Funções Principais ---
  async function handleFormSubmit(event) {
    event.preventDefault();
    const descricao = descricaoInput.value.trim();

    if (!descricao) return;

    showLoading(true);

    try {
      const dados = await fetchBackgroundData(descricao);
      updateInterface(dados);
    } catch (error) {
      handleError(error);
    } finally {
      showLoading(false);
    }
  }

  // --- Lógica de API ---
  async function fetchBackgroundData(descricao) {
    const resposta = await fetch(
      "https://alexmacol.app.n8n.cloud/webhook/projeto-fundo-magico",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descricao }),
      },
    );

    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.status}`);
    }

    return await resposta.json();
  }

  // --- Lógica de UI ---
  function updateInterface(dados) {
    // Preencher códigos
    htmlCode.textContent = dados.html || "";
    cssCode.textContent = dados.css || "";

    // Atualizar Preview HTML
    previewSection.innerHTML = dados.html || "";
    previewSection.style.display = "block";

    // Atualizar Preview CSS (Style Tag)
    let styleTag = document.getElementById("dynamic-styles");
    if (styleTag) styleTag.remove();

    if (dados.css) {
      styleTag = document.createElement("style");
      styleTag.id = "dynamic-styles";
      styleTag.textContent = dados.css;
      document.head.appendChild(styleTag);
    }
  }

  function handleError(error) {
    console.error("Erro ao enviar a requisição:", error);
    /* Tratamento de erros: Rede, 500, 429, 404, 400 */
    const msgErro = "Não foi possível gerar o código. Tente novamente.";
    htmlCode.textContent = msgErro;
    cssCode.textContent = msgErro;
    previewSection.style.display = "none";
  }

  function showLoading(isLoading) {
    if (isLoading) {
      btnSend.disabled = true;
      btnText.textContent = "Gerando Background...";
      htmlCode.textContent = "";
      cssCode.textContent = "";
    } else {
      btnSend.disabled = false;
      btnText.textContent = "Gerar Background Mágico";
    }
  }

  async function copyToClipboard(text, btnElement) {
    try {
      await navigator.clipboard.writeText(text);
      const originalText = btnElement.textContent;
      btnElement.textContent = "Copiado!";
      setTimeout(() => {
        btnElement.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
      btnElement.textContent = "Erro!";
      setTimeout(() => {
        btnElement.textContent = "Copiar";
      }, 2000);
    }
  }
});
