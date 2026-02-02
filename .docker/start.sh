#!/bin/sh

# Caso de algum erro, o "set -e" aborta o processo.
# set -e

# Para usar esse arquivo sh, é necessário rodar no terminal na pasta onde ta o projeto esse comando: chmod +x .docker/start.sh para dar permissão de execução.
# Caso contrário, ao iniciar o docker, ele não funciona.
npm install

# tail -f /dev/null mantém o container vivo, o tail mostra o final do arquivo, o -f acompanha novas linhas e o dev/null simplesmente descarta tudo.
# Ou seja, ele não exibe nada e roda infinitamente.
tail -f /dev/null