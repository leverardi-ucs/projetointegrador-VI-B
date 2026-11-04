
# Agende-se — Geração do APK

## 1. Introdução

O aplicativo Agende-se será desenvolvido utilizando Ionic, Angular e TypeScript, com o Capacitor responsável pela integração com a plataforma Android.

Para disponibilizar o aplicativo para instalação em dispositivos Android, será gerado um arquivo APK, utilizando o Android Studio.

## 2. Ferramentas Necessárias

Para a geração do APK, serão utilizadas as seguintes ferramentas:

- Node.js e npm
- Ionic CLI
- Capacitor
- Android Studio
- Android SDK
- Java Development Kit (JDK), compatível com a versão do Android Gradle Plugin utilizada

## 3. Preparação do Projeto

Inicialmente, será necessário instalar as dependências do projeto e gerar os arquivos da aplicação web.

Na pasta principal do projeto, será executado o comando:

```bash
npm install
```

Em seguida, será realizada a compilação da aplicação:

```bash
ionic build
```

Esse processo gerará os arquivos necessários para a execução da interface do aplicativo.

## 4. Integração com Android

O Capacitor será utilizado para integrar o projeto Ionic à plataforma Android.

Caso a plataforma Android ainda não esteja configurada, serão executados os comandos:

```bash
npm install @capacitor/android
npx cap add android
```

Após a configuração, os arquivos compilados serão sincronizados com o projeto Android:

```bash
npx cap sync android
```

Esse comando atualizará os arquivos e plugins nativos utilizados pelo aplicativo.

## 5. Abertura no Android Studio

Após a sincronização, o projeto Android será aberto utilizando:

```bash
npx cap open android
```

O Android Studio permitirá realizar a compilação, configuração e geração do aplicativo Android.

## 6. Geração do APK

Com o projeto aberto no Android Studio, será utilizado o menu:

**Build > Generate Bundle(s) / APK(s) > Generate APK(s)**

O Android Studio realizará a compilação do projeto e gerará o arquivo APK.

Para testes, poderemos utilizar um APK de debug.

## 7. Localização do Arquivo APK

Após a compilação, o arquivo gerado poderá ser encontrado, normalmente, no seguinte diretório:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

O arquivo poderá ser transferido e instalado em um dispositivo Android compatível.

## 8. Testes do Aplicativo

Após a geração do APK, serão realizados testes para verificar:

- Instalação e inicialização do aplicativo.
- Funcionamento das telas e navegação.
- Cadastro, edição e consulta de tarefas.
- Funcionamento do banco de dados SQLite.
- Persistência das informações após fechar e reabrir o aplicativo.
- Funcionamento sem conexão com a internet.

Os testes offline serão realizados com o dispositivo em modo avião, verificando se as principais funcionalidades permanecem disponíveis.

## 9. Considerações Finais

A utilização do Ionic, Angular e Capacitor permitirá desenvolver o Agende-se utilizando tecnologias web e disponibilizá-lo como um aplicativo Android.

O Android Studio será responsável pela compilação e geração do APK, possibilitando a instalação e execução do aplicativo em dispositivos compatíveis.

