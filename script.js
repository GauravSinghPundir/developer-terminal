////// background and environment setup, theme
////// backend integration and interface in side by side to show what happens when you run the command in the terminal and what happens in the background
////// timestamp
////// priority 
////// note making 
/////  ai summarise
/////  if logout no able to remove todo
///// to add functionality of cd for sturcuture of directories and files in the virtual file system
///// can't go to that path , in cd that doest exists, maybe




// program.
// command('login')
// .description('Login to your account')
// .arguments('<username> <password>', 'enter your username and password to login your account')
// .action((username,password)=>{
//     if(username==="admin" && password==="password"){
//         output.innerHTML+=`<div>Login successful</div>`;
//         ///// animation related to configuring your terminal;
//     }
// })
// let todos={};
// program.
//         command("todo") 
//         .description("todo list management")
//         .arguments("<command> [options]", "Manage your todo list")
//         .options("-a, --add <item>", "Add a new todo item")
//         .options("-r, --remove <item> <index>", "Remove a todo item")
//         .options("-l, --list", "List all todo items")
//         .options("-c, --clear", "Clear all todo items")
//         .options("-u, --update <item>", "Update a todo item")
//         .options("-h, --help", "Display help for todo command")
//         .action((command, options) => {
//             switch (command) {
//                 case "add":
//                     if (options.add) {  
//                         todo.push(args.slice(1).join(" "));
//                         output.innerHTML += `<div>Added todo: ${options.add}</div>`;
//                     }
//                     break;
//                 case "remove":
//                     if(options.remove){
//                         const index=parseInt(options.remove[1]);
//                         if(!isNaN(index) && index>=0 && index<todo.length){
//                             todo.splice(index,1);
//                             output.innerHTML+=`<div>Removed todo at index ${index}</div>`;  
//                         }
//                         break;
//                     }
//                 case "list":
//                     if(options.list){
//                         if(todo.length===0){
//                             output.innerHTML+=`<div>No todos found</div>`;
//                         }
//                         else{
//                             output.innerHTML+=`<div>Todo List:</div>`;
//                             todo.forEach((item,index)=>{
//                                 output.innerHTML+=`<div>${index}: ${item}</div>`;
//                             }); 
//                         }
//                         break;
//                     }
//                 case "clear":
//                     if(options.clear){
//                         todo=[];
//                         output.innerHTML+=`<div>Cleared all todos</div>`;
//                     }
//                     break;

//                 case "update":
//                     if(options.update){
                        
//                     }
//                     break;
                
//                 case "help":
//                     output.innerHTML+=`<div>Usage: todo <command> [options]</div>`;
//                     output.innerHTML+=`<div>Commands:</div>`;
//                     output.innerHTML+=`<div>  add <item> - Add a new todo item</div>`;
//                     output.innerHTML+=`<div>  remove <item> <index> - Remove a todo item</div>`;
//                     output.innerHTML+=`<div>  list - List all todo items</div>`;
//                     output.innerHTML+=`<div>  clear - Clear all todo items</div>`;
//                     output.innerHTML+=`<div>  update <item> - Update a todo item</div>`;
//                     break;

//                 default:
//                     output.innerHTML+=`<div>Invalid command. Use 'todo help' for usage information.</div>`;
//             }       
//                 });
// program.parse(process.argv);
                


const input=document.getElementById('commandInput');
const output=document.getElementById('output');
//////such that data is stored in local storage and when the user comes back to the website the data is still there and not lost
let todos =
JSON.parse(localStorage.getItem("todos"))
|| [];


let loggedIn=false;

// let currentDirectory = "/";
let currentPath = "/";

// to store the directories and files in memory/local storage, so that when the user creates a directory or file, it is saved and can be retrieved later. This is a simple implementation of a virtual file system in the browser.
let filesystem =
JSON.parse(localStorage.getItem("filesystem"))
|| {
    "/": {}
};

let commandHistory =[];
let historyIndex = 0;

let notes=[];

////definig parser for command line arguments

function parseCommand(commandLine){
    return commandLine.trim().split(/\s+/);
}

////login admin password 

function loginCommand(args){
    if(args.length < 3){
    output.innerHTML +=
    `<div>Usage: login &lt;username&gt; &lt;password&gt;</div>`;
    return;
}

    const username=args[1];
    const password=args[2];

    if(username==="admin" && password==="password"){
        loggedIn=true;
        output.innerHTML +=
        `<div>Login successful</div>`;
        ///////// to add sopmething that loads as per the user websites enviornment;
    }
    else{
        output.innerHTML+=`<div>Invalid creadentials</div>`;
    }

}

///// todo command implementation
function todoCommand(args){

    const subcommand = args[1];

    switch(subcommand){

        case "add":

            const item = args.slice(2).join(" ");

            if(!item){
                output.innerHTML +=
                `<div>Usage: todo add &lt;item&gt;</div>`;
                return;
            }

            todos.push(item);

            localStorage.setItem(
                "todos",
                JSON.stringify(todos)
            );

            output.innerHTML +=
            `<div>Added: ${item}</div>`;

            break;

        case "list":

            if(todos.length === 0){
                output.innerHTML +=
                `<div>No todos found</div>`;
                return;
            }

            output.innerHTML +=
            `<div>Todo List:</div>`;

            todos.forEach((todo,index)=>{
                output.innerHTML +=
                `<div>${index}: ${todo}</div>`;
            });

            break;

        case "remove":

            const removeIndex = parseInt(args[2]);

            if(isNaN(removeIndex)){
                output.innerHTML +=
                `<div>Usage: todo remove &lt;index&gt;</div>`;
                return;
            }

            if(removeIndex < 0 || removeIndex >= todos.length){
                output.innerHTML +=
                `<div>Invalid index</div>`;
                return;
            }

            const removed = todos[removeIndex];

            todos.splice(removeIndex,1);

            localStorage.setItem(
                "todos",
                JSON.stringify(todos)
            );

            output.innerHTML +=
            `<div>Removed: ${removed}</div>`;

            break;

        case "clear":

            todos = [];

            localStorage.setItem(
                "todos",
                JSON.stringify(todos)
            );

            output.innerHTML +=
            `<div>All todos cleared</div>`;

            break;

        case "update":

            const updateIndex = parseInt(args[2]);
            const newValue = args.slice(3).join(" ");

            if(
                isNaN(updateIndex) ||
                updateIndex < 0 ||
                updateIndex >= todos.length
            ){
                output.innerHTML +=
                `<div>Invalid index</div>`;
                return;
            }

            todos[updateIndex] = newValue;
            
            localStorage.setItem(
                "todos",
                JSON.stringify(todos)
            );

            output.innerHTML +=
            `<div>Todo updated</div>`;

            break;

        case "help":

            output.innerHTML += `
                <div>todo add &lt;item&gt;</div>
                <div>todo list</div>
                <div>todo remove &lt;index&gt;</div>
                <div>todo update &lt;index&gt; &lt;new text&gt;</div>
                <div>todo clear</div>
            `;
            break;

        default:

            output.innerHTML +=
            `<div>Unknown todo command</div>`;
    }
}

////help command 

function showHelp(){

    output.innerHTML += `
        <div>============================</div>
        <div>AVAILABLE COMMANDS</div>
        <div>============================</div>

        <div><b>Authentication</b></div>
        <div>login &lt;username&gt; &lt;password&gt;</div>
        <div>logout</div>
        <div>whoami</div>

        <br>

        <div><b>Todo Commands</b></div>
        <div>todo add &lt;task&gt;</div>
        <div>todo list</div>
        <div>todo remove &lt;index&gt;</div>
        <div>todo update &lt;index&gt; &lt;new task&gt;</div>
        <div>todo clear</div>

        <br>

        <div><b>File System Commands</b></div>
        <div>pwd</div>
        <div>ls</div>
        <div>mkdir &lt;foldername&gt;</div>
        <div>touch &lt;filename&gt;</div>
        <div>tree</div>
        <div>search &lt;keyword&gt;</div>
        <div>cat &lt;filename&gt;</div>
        <div>write &lt;filename&gt; &lt;content&gt;</div>

        <br>

        <div><b>Utility Commands</b></div>
        <div>history</div>
        <div>date</div>
        <div>clear</div>
        <div>help</div>

        <br>

        <div><b>Examples</b></div>
        <div>login admin password</div>
        <div>todo add Build internship project</div>
        <div>mkdir projects</div>
        <div>touch notes.txt</div>
        <div>write notes.txt Learn JavaScript</div>
        <div>cat notes.txt</div>
        <div>history</div>
    `;
}

function whoamiCommand() {

    if(loggedIn){
        output.innerHTML += `<div>admin</div>`;
    }
    else{
        output.innerHTML += `<div>guest</div>`;
    }
}

function logoutCommand(){

    loggedIn = false;

    output.innerHTML +=
    `<div>Logged out successfully</div>`;
}

function pwdCommand(){

    output.innerHTML +=
    `<div>${currentPath}</div>`;
}

function mkdirCommand(args){

    const folderName = args[1];

    if(!folderName){
        output.innerHTML +=
        `<div>Usage: mkdir folderName</div>`;
        return;
    }

    const current = getCurrentDirectory();

    if(folderName in current){

        output.innerHTML +=
        `<div>Already exists</div>`;

        return;
    }

    current[folderName] = {};

    localStorage.setItem(
        "filesystem",
        JSON.stringify(filesystem)
    );

    output.innerHTML +=
    `<div>Folder created</div>`;
}

function getCurrentDirectory(){

    let pathParts =
        currentPath.split("/")
        .filter(Boolean);

    let current = filesystem["/"];

    for(let part of pathParts){

        if(!(part in current)){
            return null;
        }

        current = current[part];
    }

    return current;
}


function generateTree(node, prefix = "") {

    let result = [];

    const entries = Object.entries(node);

    entries.forEach(([name, value], index) => {

        const isLast =
            index === entries.length - 1;

        const connector =
            isLast ? "└── " : "├── ";

        const displayName =
            typeof value === "object"
            ? `[DIR] ${name}`
            : name;

        result.push(
            prefix + connector + displayName
        );
        if(typeof value === "object") {

            const nextPrefix =
                prefix +
                (isLast
                    ? "    "
                    : "│   ");

            result.push(
                ...generateTree(
                    value,
                    nextPrefix
                )
            );
        }
    });

    return result;
}

function searchFiles(node, currentPath, keyword, results){

    for(const [name, value] of Object.entries(node)){

        // Folder
        if(typeof value === "object" && value !== null){

            searchFiles(
                value,
                currentPath + "/" + name,
                keyword,
                results
            );
        }

        // File
        else{

            if(
                value.toLowerCase().includes(keyword.toLowerCase())
            ){

                results.push({
                    path: currentPath + "/" + name,
                    content: value
                });
            }
        }
    }
}


function touchCommand(args){

    const fileName=args[1];
    if(!fileName){
    output.innerHTML +=
    `<div>Usage: touch &lt;filename&gt;</div>`;
    return;
}

    const current=getCurrentDirectory();

    current[fileName]="";

    localStorage.setItem(
        "filesystem",
        JSON.stringify(filesystem)
    );

    output.innerHTML +=
    `<div>File created</div>`;
}

function lsCommand(){

    const current=getCurrentDirectory();

    Object.keys(current).forEach(item=>{

        if(typeof current[item]==="object"){

            output.innerHTML+=
            `<div>[DIR] ${item}</div>`;
        }
        else{

            output.innerHTML+=
            `<div>${item}</div>`;
        }
    });
}


function treeCommand(){

    output.innerHTML +=
    `<div>/</div>`;

    const lines =
        generateTree(filesystem["/"]);

    lines.forEach(line => {

        output.innerHTML +=
        `<div style="white-space:pre">${line}</div>`;
    });
}

function searchCommand(args){

    const keyword = args.slice(1).join(" ");

    if(!keyword){

        output.innerHTML +=
        `<div>Usage: search &lt;keyword&gt;</div>`;

        return;
    }

    let results = [];

    searchFiles(
        filesystem["/"],
        "",
        keyword,
        results
    );

    if(results.length === 0){

        output.innerHTML +=
        `<div>No matches found.</div>`;

        return;
    }

    output.innerHTML +=
    `<div><b>${results.length} match(es) found:</b></div>`;

    results.forEach(file=>{

        // Show only a short preview instead of the whole file
        const preview =
            file.content.length > 80
            ? file.content.substring(0,80) + "..."
            : file.content;

        output.innerHTML += `
            <div>
                📄 <b>${file.path}</b><br>
                ${preview}
            </div>
        `;
    });
}



function catCommand(args){

    const input = args[1];

    if(!input){
        output.innerHTML +=
        `<div>Usage: cat &lt;filename | path&gt;</div>`;
        return;
    }

    // -----------------------------
    // Case 1: Absolute path
    // -----------------------------
    if(input.startsWith("/")){

        let current = filesystem["/"];

        const parts = input
            .split("/")
            .filter(Boolean);

        const fileName = parts.pop();

        for(const folder of parts){

            if(!(folder in current) ||
               typeof current[folder] !== "object"){

                output.innerHTML +=
                `<div>Directory not found</div>`;
                return;
            }

            current = current[folder];
        }

        if(!(fileName in current)){
            output.innerHTML +=
            `<div>File not found</div>`;
            return;
        }

        output.innerHTML +=
        `<div>${current[fileName]}</div>`;

        return;
    }

    // -----------------------------
    // Case 2: Filename only
    // -----------------------------
    const current = getCurrentDirectory();

    if(!(input in current)){
        output.innerHTML +=
        `<div>File not found</div>`;
        return;
    }

    output.innerHTML +=
    `<div>${current[input]}</div>`;
}

function cdCommand(args){
    console.log(filesystem);
console.log(currentPath);
console.log(getCurrentDirectory());
    const target=args[1];

    if(!target){
        currentPath="/";
        return;
    }

    if(target===".."){

        if(currentPath==="/"){
            return;
        }

        let parts=currentPath
            .split("/")
            .filter(Boolean);

        parts.pop();

        currentPath=
            parts.length===0
            ? "/"
            : "/" + parts.join("/");

        return;
    }

    const current=getCurrentDirectory();

    if(
        !(target in current) ||
        typeof current[target] !== "object"
    ){
        output.innerHTML+=
        `<div>Directory not found</div>`;
        return;
    }

    if(currentPath==="/"){
        currentPath += target;
    }
    else{
        currentPath += "/" + target;
    }
}

function writeCommand(args){

    const fileName=args[1];

    const content=args.slice(2).join(" ");

    const current=getCurrentDirectory();

    if(!(fileName in current)){

        output.innerHTML +=
        `<div>File not found</div>`;

        return;
    }

    current[fileName]=content;

    localStorage.setItem(
        "filesystem",
        JSON.stringify(filesystem)
    );

    output.innerHTML +=
    `<div>Written successfully</div>`;
}

function historyCommand(){

    commandHistory.forEach((cmd,index)=>{

        output.innerHTML +=
        `<div>${index}: ${cmd}</div>`;
    });
}

function clearCommand(){

    output.innerHTML = "";
}

function executeCommand(input){

    if(!input.trim()) return;

    // commandHistory.push(input);

    const args= parseCommand(input);
    const command=args[0];

    switch(command){
        case "login":
            loginCommand(args);
            break;

        case "todo":
            todoCommand(args);
            break;

        case "logout":
            logoutCommand();
            break;

        case "whoami":
            whoamiCommand();
            break;

        case "help":
            showHelp();
            break;

        case "touch":
            touchCommand(args);
            break;

        case "pwd":
            pwdCommand();
            break;

        case "mkdir":
            mkdirCommand(args);
            break;

        case "ls":
            lsCommand();
            break;

        case "tree":
        treeCommand();
        break;
        
        case "search":
        searchCommand(args);
        break;






        case "cat":
            catCommand(args);
            break;

        case "write":
            writeCommand(args);
            break;

        case "history":
            historyCommand();
            break;

        case "cd":
            cdCommand(args);
            break;
        
        case "date":
            output.innerHTML+=`<div>${new Date()}</div>`;
            break;
        
        case "clear":
            clearCommand();
            break;
        
        default:
            output.innerHTML+=`<div>Command not found:${command}</div>`;
    }
}

input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        const command = input.value.trim();

        if(command){

            output.innerHTML +=
            `<div>> ${command}</div>`;

            executeCommand(command);

            commandHistory.push(command);

            historyIndex = commandHistory.length;
        }

        input.value = "";
    }

    else if(e.key === "ArrowUp"){

        e.preventDefault();

        if(historyIndex > 0){

            historyIndex--;

            input.value =
            commandHistory[historyIndex];
            setTimeout(() => {
                input.selectionStart =
                input.selectionEnd =
                input.value.length;
            }, 0);
        }
    }

    else if(e.key === "ArrowDown"){

        e.preventDefault();

        if(
            historyIndex <
            commandHistory.length - 1
        ){

            historyIndex++;

            input.value =
            commandHistory[historyIndex];
            setTimeout(() => {
                input.selectionStart =
                input.selectionEnd =
                input.value.length;
            }, 0);
        }
        else{

            historyIndex =
            commandHistory.length;

            input.value = "";
        }
    }
});