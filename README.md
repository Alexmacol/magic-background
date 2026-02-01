<h1 align="center">
  <img src="https://placehold.co/600x100/F7DF1E/000000?text=Magic+Background&font=roboto" alt="Magic Background">
</h1>

<p align="center">
  Uma aplicação web interativa que utiliza Inteligência Artificial para transformar descrições textuais em códigos CSS e HTML de backgrounds prontos para uso. Simplifique seu processo criativo gerando fundos visuais únicos instantaneamente com preview em tempo real.
</p>

![Preview da Aplicação](assets\images\project-preview.webp)

## 📖 Sobre o Projeto

O **Magic Background** é uma ferramenta front-end desenvolvida para otimizar o fluxo de trabalho de designers e desenvolvedores. A aplicação atua como uma interface cliente moderna que consome serviços de **automação n8n** para converter linguagem natural em código visual. **DISCLAIMER**: ESTE PROJETO DEPENDE DE AMBIENTE N8N ATIVO (PAGO) PARA FUNCIONAR COMPLETAMENTE.

![Preview da Aplicação](assets\images\projeto-n8n.webp)

O objetivo é abstrair a complexidade da criação de estilos CSS avançados, permitindo que o usuário foque na intenção criativa. Através de uma arquitetura limpa e reativa, o sistema gerencia a comunicação com o backend, trata os estados da aplicação e renderiza os resultados dinamicamente no DOM.

## 🚀 Funcionalidades Principais

- **Geração via Prompt**: Input de texto intuitivo para descrever o background desejado.
- **Renderização Dinâmica**: O código recebido é injetado automaticamente na página para um preview fiel e imediato.
- **Gestão de Feedback**: Indicadores visuais de carregamento ("loading states") e tratamento de erros de requisição para melhor UX.
- **Exportação de Código**: Botões dedicados com funcionalidade de "Copiar para a Área de Transferência" para HTML e CSS separadamente.
- **Interface Responsiva**: Layout adaptável construído com CSS moderno (Flexbox/Grid).

## 🛠 Tecnologias e Métodos

- **Frontend**: HTML5 Semântico e CSS3 (com uso de variáveis e reset CSS).
- **JavaScript (Vanilla)**: Lógica de controle assíncrono (`async/await`), manipulação do DOM e Event Listeners sem dependência de frameworks.
- **Integração de API**: Uso da `Fetch API` para comunicação RESTful.
- **Backend/Automação**: Integração com **n8n** via Webhook para processamento inteligente das descrições.

## 🏗 Arquitetura da API

A aplicação segue um padrão de comunicação cliente-servidor simples e eficiente:

1.  **Endpoint**: O frontend dispara uma requisição `POST` para o webhook configurado no n8n:
    `https://alexmacol.app.n8n.cloud/webhook/projeto-fundo-magico`

2.  **Payload (Envio)**: Os dados são enviados no corpo da requisição em formato JSON:

    ```json
    {
      "descricao": "Sua descrição do background aqui"
    }
    ```

3.  **Response (Recebimento)**: A API processa a solicitação e retorna um objeto JSON contendo os fragmentos de código:
    ```json
    {
      "html": "<div>...</div>",
      "css": ".classe { ... }"
    }
    ```
    _O JavaScript do cliente então injeta o CSS em uma tag `<style>` dinâmica para aplicar o visual instantaneamente._

## ⚡ Como Executar

Este projeto não requer instalação de dependências ou processos de build (como npm ou webpack), pois utiliza tecnologias web nativas.

1.  **Clone o repositório** para sua máquina local.
2.  Navegue até a pasta do projeto:
    ```bash
    cd projeto-fundomagico
    ```
3.  **Abra o arquivo `index.html`** diretamente em seu navegador preferido (Chrome, Firefox, Edge, etc).
    - _Dica_: Para evitar bloqueios de segurança (CORS) que alguns navegadores impõem a arquivos locais, recomenda-se usar uma extensão como o "Live Server" no VS Code.

---

Desenvolvido com 💜 e código.
