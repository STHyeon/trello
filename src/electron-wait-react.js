// electron이 react의 완전한 실행을 기다리도록 하는 파일
const net = require("net");
const port = process.env.PORT ? process.env.PORT - 100 : 3000; //  Foreman이 원래 프로세스의 Port에 100만큼 offset을 주는 특성 탓이다.

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;

const tryConnection = () =>
    client.connect({ port: port }, () => {
        client.end();
        if (!startedElectron) {
            console.log("starting electron");
            startedElectron = true;
            const exec = require("child_process").exec;
            exec("yarn run electron");
        }
    });

tryConnection();

client.on("error", (error) => {
    setTimeout(tryConnection, 1000);
});
