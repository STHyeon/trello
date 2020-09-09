const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createWindow() {
    // 브라우저 창 생성
    const win = new BrowserWindow({
        minWidth: 900,
        width: 1600,
        minHeight: 600,
        height: 790,
        center: true, // 앱 실행 시 윈도우를 하면 정중앙에 위치
        webPreferences: {
            nodeIntegration: true, // node 기반 라이브러리 사용시 필수 true
        },
        // frame: false, // 메뉴바 제거
    });

    // react를 빌드할 경우 결과물은 build 폴더에 생성되기 때문에 loadURL 부분을 아래와 같이 작성
    // const startUrl =
    //     process.env.ELECTRON_START_URL ||
    //     url.format({
    //         pathname: path.join(__dirname, "/../build/index.html"),
    //         protocol: "file:",
    //         slashes: true,
    //     });

    win.loadURL("https://srello.herokuapp.com/");

    // Open the DevTools 개발자 도구 on/off
    // win.webContents.openDevTools();
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// 어떤 API는 이 이벤트가 나타난 이후에만 사용할 수 있습니다.
app.whenReady().then(createWindow);

// 모든 윈도우가 닫히며 종료된다.
app.on("window-all-closed", () => {
    // macOS 에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
    // 애플리케이션이나 메뉴바가 활성화 된 상태로 머물러 있는 것이 일반적이다.
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
    // 앱에서 새로운 창을 다시 여는 것이 일반적입니다..
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
