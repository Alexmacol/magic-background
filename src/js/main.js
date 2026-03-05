import { showAlert } from "./modal.js";
import { renderPreview, resetUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", function () {
  const API_ENDPOINT =
    "https://alexmacol1970.app.n8n.cloud/webhook/projeto-fundo-magico";
  const form = document.querySelector(".form-group");
  const descricaoInput = document.getElementById("description");
  const btnSend = document.getElementById("generate-btn");
  const btnText = document.getElementById("btn-text");
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const previewSection = document.getElementById("preview-section");
  const regenerateContainer = document.getElementById("regenerate");
  const regenerateBtn = document.getElementById("regenerate-btn");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const descricao = descricaoInput.value.trim();
    console.log("Campo de descrição:", descricao);

    if (!descricao) {
      showAlert("Digite o background que deseja!");
      return;
    }

    showLoading(true);

    //** Envio ao n8n **
    try {
      const resposta = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ descricao }),
        },
      );

      const dados = await resposta.json();
      
      // Preencher os campos de código com a resposta
      htmlCode.textContent = dados.html || "";
      cssCode.textContent = dados.css || "";

      // Usar a função renderPreview do módulo ui.js
      renderPreview(previewSection, regenerateContainer, dados.html, dados.css);

    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
      htmlCode.textContent =
        "Não foi possível gerar o código. Tente novamente.";
      cssCode.textContent = "Não foi possível gerar o código. Tente novamente.";
      previewSection.style.display = "none";
      regenerateContainer.style.display = "none";
    } finally {
      showLoading(false);
    }
  });

  // Botão Gerar Novo Background (usando resetUI do módulo ui.js)
  regenerateBtn.addEventListener("click", function () {
    resetUI(previewSection, regenerateContainer, descricaoInput, htmlCode, cssCode);
  });

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

  // Funcionalidade de Copiar para a Área de Transferência
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const codeElement = document.getElementById(targetId);

      if (codeElement && codeElement.textContent) {
        navigator.clipboard.writeText(codeElement.textContent).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "Copiado!";
          setTimeout(() => (btn.textContent = originalText), 2000);
        });
      }
    });
  });
});
