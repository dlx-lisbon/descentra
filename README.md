<div align="center">
    <img style="max-width: 768px; width: 100%" src="logo.webp">
</div>

> dlx é um meetup sobre blockchain ⛓️. Maioritariamente ethereum ⛏️. E as outras coisas todas 🥞 ...

<div align="center">
    <div>
        <a
            href="https://travis-ci.org/dlx-lisbon/dlx-ui"><img
                src="https://travis-ci.org/dlx-lisbon/dlx-ui.svg?branch=master" /></a>&emsp;
        <a
            href="https://app.netlify.com/sites/dlx/deploys"><img
                src="https://api.netlify.com/api/v1/badges/94c365af-2fe5-4534-bbcd-4ada0e592f61/deploy-status" /></a>&emsp;
        <a
            href="https://dependabot.com"><img
                src="https://api.dependabot.com/badges/status?host=github&repo=dlx-lisbon/dlx-ui" /></a>&emsp;
    </div>
</div>


Este repositório contém o código para o frontend do nosso website.

## Contribuir
Lê as instruções de [contribuição](CONTRIBUTING.md).

## Desenvolvimento
Neste projeto utilizamos [OrbitDB](https://orbitdb.org/) e [IPFS](https://ipfs.io/) para gerir as nossas publicações. [React](https://reactjs.org/) como framework UI e [Material UI](https://material-ui.com/) para criar o design.

Para começar a fazer alterações e testar, é necessário preencher o `.env` (duplicar `.env.example` e renomear para `.env` deve ser suficiente) e depois executar a app com `yarn start`.

Recomendamos que utilize `yarn` para instalar dependências.

### libp2p-webrtc-star

Este website requer uma instância de [libp2p-webrtc-star](https://github.com/libp2p/js-libp2p-webrtc-star). Para executar localmente é apenas necessário executar o libp2p como indicado [aqui](https://github.com/libp2p/js-libp2p-webrtc-star#rendezvous-server-aka-signalling-server). Para hospedar num servidor externo, com ssl é necessária alguma configuração extra.


Exemplo de configuração nginx:

```yml
upstream websocket {
   server 127.0.0.1:9090;
}

server {
    listen 80;
    listen [::]:80;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate /etc/letsencrypt/live/(FOLDER-FROM-CERTBOT)/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/(FOLDER-FROM-CERTBOT)/privkey.pem;

    location / {
        proxy_pass http://websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
**NOTA**: Substituir *(FOLDER-FROM-CERTBOT)* pelo caminho completo, dado ao gerar os certificados.

Para adicionar um *daemon service* no servidor linux onde estiver a executar o *webrtc-star* pode usar a seguinte configuração.
```bash
[Unit]
Description=WebRTC service.

[Service]
Type=simple
PIDFile=/run/webrtc.pid
ExecStart=/usr/bin/webrtc-star --port=9090 --host=0.0.0.0
RemainAfterExit=no
Restart=on-failure
RestartSec=5s


[Install]
WantedBy=multi-user.target
```
Exemplos de como fazer isso podem ser encontrados [aqui](https://www.linode.com/docs/quick-answers/linux/start-service-at-boot/) e [aqui](https://singlebrook.com/2017/10/23/auto-restart-crashed-service-systemd/).


## Licença
[GNU General Public License v3](LICENSE)

## Creditos
Peixe palaço no website - Icons made by <a href="https://www.flaticon.com/authors/turkkub" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
