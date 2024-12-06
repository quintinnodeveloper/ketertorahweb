# Demanda:                KETER2024120502114649TORAH
# Objetivo:               Configurar NodeJS no projeto VanillaJS (Ubuntu)
# Pré requisitos:         Ter o NodeJS instalado

sudo apt-get install nala -y

sudo nala install nodejs -y
sudo nala install npm -y

sudo npm install -g live-server

live-server

npm init -y
sudo npm install lite-server --save-dev
