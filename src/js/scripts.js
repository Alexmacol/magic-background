document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-group");
  const descricaoInput = document.getElementById("description");
  const btnSend = document.getElementById("generate-btn");
  const btnText = document.getElementById("btn-text");
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const previewSection = document.getElementById("preview-section");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const descricao = descricaoInput.value.trim();
    console.log("Campo de descrição:", descricao);

    if (!descricao) {
      return;
    }

    showLoading(true);

    //** Envio ao n8n **
    try {
      const resposta = await fetch(
        "https://alexmacol.app.n8n.cloud/webhook/projeto-fundo-magico",
        {
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

      // Atualizar a seção de pré-visualização
      previewSection.innerHTML = dados.html || "";

      // Exibe a seção de pré-visualização
      previewSection.style.display = "block";

      // Exibir o card de previsualização
      let styleTag = document.getElementById("dynamic-styles");

      //Se a tag de estilos já existe, removê-la antes de criar uma nova
      if (styleTag) {
        styleTag.remove();
      }

      if (dados.css) {
        styleTag = document.createElement("style");
        styleTag.id = "dynamic-styles";
        styleTag.textContent = dados.css;
        document.head.appendChild(styleTag);
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
      htmlCode.textContent =
        "Não foi possível gerar o código. Tente novamente.";
      cssCode.textContent = "Não foi possível gerar o código. Tente novamente.";
      previewSection.style.display = "none";
    } finally {
      showLoading(false);
    }
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
});
