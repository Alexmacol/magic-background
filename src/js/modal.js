export function showAlert(message) {
  const modal = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");
  const closeBtn = document.getElementById("close-alert");

  alertMessage.textContent = message;
  modal.classList.add("show");

  const closeModal = () => {
    modal.classList.remove("show");
    modal.classList.add("closing");
    
    // Aguarda a animação de saída terminar antes de limpar a classe
    setTimeout(() => {
      modal.classList.remove("closing");
    }, 250);
  };

  closeBtn.onclick = closeModal;

  // Fecha ao clicar fora do conteúdo da modal
  modal.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };
}
