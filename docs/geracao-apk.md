# Agende-se — Geração do APK

## 1. Introdução

O aplicativo Agende-se foi desenvolvido utilizando Ionic, Angular e TypeScript, com o Capacitor responsável pela integração com a plataforma Android.

Para disponibilizar o aplicativo para instalação em dispositivos Android, foi gerado um arquivo APK utilizando o Android Studio.

## 2. Ferramentas Necessárias

Para a geração do APK, foram utilizadas as seguintes ferramentas:

- Node.js e npm
- Ionic CLI
- Capacitor
- Android Studio
- Android SDK
- Java Development Kit (JDK), compatível com a versão do Android Gradle Plugin utilizada

## 3. Preparação do Projeto

O código-fonte do aplicativo está disponível na pasta `app` deste repositório.

Para preparar o ambiente de desenvolvimento, é necessário acessar essa pasta e instalar as dependências do projeto:

```bash
cd app
npm install
```

Em seguida, deve ser realizada a compilação da aplicação:

```bash
ionic build
```

Esse processo gera os arquivos necessários para a execução da interface do aplicativo.

## 4. Integração com Android

O Capacitor é utilizado para integrar o projeto Ionic à plataforma Android.

A plataforma Android já está configurada e disponível no código-fonte deste repositório.

Para sincronizar os arquivos compilados com o projeto Android, deve ser executado o comando:

```bash
npx cap sync android
```

Esse comando atualiza os arquivos e plugins nativos utilizados pelo aplicativo.

## 5. Abertura no Android Studio

Após a sincronização, o projeto Android pode ser aberto utilizando:

```bash
npx cap open android
```

O Android Studio permite realizar a compilação, configuração, execução em emuladores e geração do aplicativo Android.

## 6. Geração do APK

Com o projeto aberto no Android Studio, foi utilizado o menu:

**Build > Generate App Bundles or APKs > Generate APKs**

O Android Studio realizou a compilação do projeto e gerou o arquivo APK.

Para a entrega acadêmica, foi utilizado um APK de debug, permitindo a instalação do aplicativo sem necessidade de publicação na Google Play Store.

## 7. Localização do Arquivo APK

Após a compilação, o arquivo gerado foi disponibilizado no seguinte diretório:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

O arquivo foi renomeado para `agende-se.apk` e disponibilizado na pasta `apk` deste repositório.

## 8. Download e Instalação

O aplicativo está disponível para download no seguinte link:

[Baixar Agende-se APK](../apk/agende-se.apk)

Para instalar o aplicativo:

1. Realizar o download do arquivo APK em um dispositivo Android compatível.
2. Abrir o arquivo baixado.
3. Autorizar a instalação de aplicativos provenientes dessa fonte, caso solicitado pelo Android.
4. Confirmar a instalação.
5. Abrir o aplicativo Agende-se.

Não é necessário instalar ferramentas de desenvolvimento para utilizar o APK.

## 9. Testes do Aplicativo

Durante o desenvolvimento, foram realizados testes utilizando o emulador Android disponibilizado pelo Android Studio.

Foram verificadas as seguintes funcionalidades:

- Inicialização do aplicativo.
- Funcionamento das telas e navegação.
- Cadastro e consulta de usuários.
- Cadastro, edição, consulta e exclusão lógica de tarefas.
- Alteração das situações das tarefas.
- Funcionamento do banco de dados SQLite.
- Persistência das informações após fechar e reabrir o aplicativo.

O armazenamento local permite que as funcionalidades do aplicativo sejam utilizadas sem conexão com a internet.

## 10. Considerações Finais

A utilização do Ionic, Angular e Capacitor possibilitou o desenvolvimento do Agende-se utilizando tecnologias web e sua disponibilização como um aplicativo Android.

O Android Studio foi utilizado para a compilação, realização de testes e geração do APK.

O código-fonte e o arquivo APK estão disponíveis neste repositório, permitindo tanto a instalação do aplicativo quanto a continuidade de
