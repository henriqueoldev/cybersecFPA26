# 🔐 FATEC Portas Abertas 2026  
## Simulador de Identidade Digital & Conscientização em Cibersegurança

---

## 📌 Visão Geral

Este projeto foi desenvolvido como uma experiência interativa para demonstrar, de forma prática, como dados aparentemente simples fornecidos por usuários podem ser utilizados para construir uma **identidade digital detalhada**.

A aplicação simula um fluxo comum de coleta de dados na internet (como formulários), e evidencia que:

> 🔎 O que você digita é apenas uma pequena parte do que pode ser capturado sobre você.

Ao final da interação, o sistema apresenta uma reconstrução da identidade do usuário com base em:

- Dados inseridos manualmente
- Informações públicas obtidas via APIs
- Fingerprinting do navegador
- Análise facial via câmera

---

## 🎯 Objetivo

Conscientizar usuários sobre:

- Exposição de dados na internet
- Técnicas de coleta e correlação de informações
- Riscos de engenharia social e rastreamento digital
- Como múltiplas fontes de dados podem ser combinadas para criar perfis completos

---

## 🧠 Conceito Técnico

A aplicação demonstra, na prática, conceitos utilizados em:

- **Data Profiling**
- **Browser Fingerprinting**
- **Biometria Facial (simplificada)**
- **Correlação de Dados Públicos**
- **Simulação de Engenharia Social**

---

## ⚙️ Tecnologias Utilizadas

- **React + TypeScript**
- **Vite**
- **MediaPipe Face Mesh (via CDN)**
- **Canvas API (renderização de landmarks faciais)**
- **APIs externas:**
  - IBGE (dados de nomes)
  - ViaCEP (dados de endereço)

---

## 🧩 Funcionalidades

### 📄 Coleta de Dados
- Formulário interativo com múltiplas etapas
- Armazenamento temporário das respostas do usuário

### 🌐 Enriquecimento de Dados
- Consulta automática de informações públicas (nome, CEP)

### 🧬 Fingerprint do Navegador
- Coleta de características do ambiente do usuário:
  - User Agent
  - Plataforma
  - Idioma
  - Resolução de tela
  - Entre outros

### 🧑‍💻 Reconhecimento Facial (MVP)
- Captura automática via câmera
- Contagem regressiva para captura
- Detecção de landmarks faciais (468 pontos)
- Renderização da malha facial em tempo real

### 🆔 Geração de Face ID
- Criação de identificador único baseado nos landmarks faciais
- Representação simplificada de uma identidade biométrica

### 📊 Consolidação Final
- Exibição de todos os dados coletados em um único painel
- Simulação de uma "identidade digital completa"

---

## ⚠️ Limitações

Este projeto é um **MVP educacional** e não deve ser utilizado como sistema real de autenticação.

- O Face ID gerado não é robusto (sensível a iluminação, ângulo, expressão)
- Não há persistência de dados
- Não há validação biométrica real

---

## 🔐 Considerações de Segurança

Nenhum dado é armazenado ou enviado para backend.

Toda a execução ocorre **client-side**, com objetivo exclusivamente educacional.

---

## 💡 Possíveis Evoluções

- Comparação entre dois rostos (matching facial)
- Uso de embeddings reais (ex: FaceNet / face-api.js)
- Backend para simulação de armazenamento de perfis
- Dashboard de análise de risco do usuário
- Score de exposição digital

---

## 👨‍💻 Autor

Projeto desenvolvido por:
- Raphael Cardoso  
- Henrique Oliveira
FATEC Zona Leste — Análise e Desenvolvimento de Sistemas

---

## 📣 Reflexão Final

> Se com poucos dados já conseguimos montar um perfil…  
> imagine o que grandes sistemas fazem com anos de coleta contínua.
> Proteja seus dados, eles têm grande valor e por vezes demonstam quem você é. 

