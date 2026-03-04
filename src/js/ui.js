export function renderPreview(previewSection, regenerateContainer, html, css) {
  // Atualiza o conteúdo HTML do preview
  previewSection.innerHTML = html || "";
  previewSection.style.display = "block";

  // Exibe o botão de gerar novo
  regenerateContainer.style.display = "flex";

  // Gerencia os estilos dinâmicos
  let styleTag = document.getElementById("dynamic-styles");
  if (styleTag) {
    styleTag.remove();
  }

  if (css) {
    styleTag = document.createElement("style");
    styleTag.id = "dynamic-styles";
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  }
}

export function resetUI(previewSection, regenerateContainer, descriptionInput, htmlCode, cssCode) {
  // Limpa os campos de texto e código
  descriptionInput.value = "";
  htmlCode.textContent = "";
  cssCode.textContent = "";
  
  // Limpa e oculta o preview
  previewSection.innerHTML = "";
  previewSection.style.display = "none";
  
  // Oculta o container de regenerar
  regenerateContainer.style.display = "none";

  // Remove estilos dinâmicos
  const styleTag = document.getElementById("dynamic-styles");
  if (styleTag) {
    styleTag.remove();
  }
  
  descriptionInput.focus();
}
