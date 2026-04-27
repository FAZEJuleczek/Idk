let pyodide;
let botRunning = false;

async function init() {
    pyodide = await loadPyodide();
    logBot("System Ready. Silnik załadowany.", "text-blue-400");
    updateClock();
    setInterval(updateClock, 1000);
    renderDorks();
}

function updateClock() {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}

function logBot(msg, color = "text-green-400") {
    const console = document.getElementById('bot-console');
    const entry = document.createElement('div');
    entry.className = color;
    entry.innerHTML = `<span class="opacity-50 text-[9px]">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
    console.appendChild(entry);
    console.scrollTop = console.scrollHeight;
}

const targets = ["prod-server-23", "db-backup", "internal-portal", "dev-api", "staging-auth"];

async function startBot() {
    if(botRunning) return;
    botRunning = true;
    document.getElementById('bot-btn').innerText = "RECON ACTIVE...";
    document.getElementById('bot-btn').classList.replace("bg-green-600", "bg-red-900");

    while(botRunning) {
        let sub = targets[Math.floor(Math.random() * targets.length)];
        logBot(`Skanowanie: ${sub}.google.com...`, "text-green-800");
        await new Promise(r => setTimeout(r, 1500));

        if(Math.random() > 0.9) {
            logBot(`[!!!] ALERT: Wykryto błąd na ${sub}.google.com`, "text-yellow-400 font-bold");
            logBot(`>>> Odnaleziono plik: /backup.sql (Status 200)`, "text-yellow-200 underline");
        }
    }
}

function clearLogs() {
    document.getElementById('bot-console').innerHTML = "";
    botRunning = false;
    document.getElementById('bot-btn').innerText = "START AUTO-RECON";
}

async function runPython() {
    const code = document.getElementById('editor').value;
    const output = document.getElementById('py-output');
    try {
        let result = await pyodide.runPythonAsync(code);
        output.innerText = "> " + result;
    } catch (e) {
        output.innerText = "> Error: " + e.message;
    }
}

const dorkData = [
    { n: "Bazy SQL", d: 'filetype:sql "password" "INSERT INTO"' },
    { name: "Pliki .ENV", d: 'filetype:env "DB_PASSWORD"' },
    { name: "Kamery IP", d: 'inurl:"/view.shtml"' }
];

function renderDorks() {
    const list = document.getElementById('dork-list');
    dorkData.forEach(item => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-2 border border-green-900 hover:bg-green-900/40 text-[10px] rounded";
        btn.innerHTML = `<strong>${item.name || item.n}</strong><br><span class="opacity-40 truncate">${item.d}</span>`;
        btn.onclick = () => window.open(`https://www.google.com/search?q=${encodeURIComponent(item.d)}`);
        list.appendChild(btn);
    });
}

window.onload = init;
