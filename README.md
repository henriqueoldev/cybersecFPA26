# 🔐 FATEC Portas Abertas 2026  
## Simulador de Identidade Digital & Conscientização em Cibersegurança

---

## 📌 Visão Geral

Este projeto é uma experiência interativa que demonstra, na prática, como dados aparentemente simples podem ser utilizados para construir uma **identidade digital altamente detalhada**.

A aplicação simula fluxos comuns da internet — como formulários — e expõe um ponto crítico:

> 🔎 **O dado que você fornece é só a superfície. O valor real está na correlação.**

Ao final da jornada, o sistema reconstrói uma identidade digital baseada em múltiplas fontes:

- Dados inseridos manualmente  
- Informações públicas via APIs  
- Fingerprinting do navegador  
- Análise facial via câmera  

---

## 🎯 Objetivo

Mais do que coletar dados, o projeto busca provocar:

- Consciência sobre exposição digital  
- Entendimento de como dados são correlacionados  
- Reflexão sobre engenharia social  
- Percepção do valor dos próprios dados  

---

## 🧠 Conceito Técnico

O sistema aplica, de forma prática, conceitos usados no mercado:

- **Data Profiling**  
- **Browser Fingerprinting**  
- **Biometria Facial (simplificada)**  
- **Data Enrichment (APIs públicas)**  
- **Correlação de Identidade**  
- **Simulação de Engenharia Social**  

---

## ⚙️ Tecnologias Utilizadas

- **React + TypeScript**  
- **Vite**  
- **MediaPipe Face Mesh (CDN)**  
- **Canvas API**  

### 🌐 APIs externas:
- IBGE (nomes)  
- ViaCEP (endereços)  

---

## 🧩 Funcionalidades

### 📄 Coleta de Dados
- Formulário multi-step interativo  
- Captura estruturada de informações do usuário  

### 🌐 Enriquecimento de Dados
- Integração com APIs públicas  
- Expansão automática das informações fornecidas  

### 🧬 Fingerprint do Navegador
Coleta de características do ambiente:

- User Agent  
- Sistema operacional  
- Idioma  
- Resolução de tela  
- Capacidade do dispositivo  

---

### 🧑‍💻 Reconhecimento Facial (MVP)
- Captura automática via câmera  
- Contagem regressiva (UX controlada)  
- Detecção de **468 landmarks faciais**  
- Renderização com malha facial em tempo real  

---

### 🆔 Geração de Face ID
- Hash baseado na geometria facial  
- Representação simplificada de identidade biométrica  

> ⚠️ Não é um sistema biométrico real — é uma simulação educacional.

---

### 📊 Consolidação da Identidade Digital
- Unificação de todos os dados coletados  
- Visualização final em formato estruturado  
- Simulação de um perfil digital completo  

---

## ⚙️ Como Executar o Projeto

### 📋 Pré-requisitos

- **Node.js v22 ou superior**  
- **npm**  

Verifique:

```bash
node -v
