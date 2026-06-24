////// background and environment setup, theme
////// backend integration and interface in side by side to show what happens when you run the command in the terminal and what happens in the background
////// timestamp
////// priority 
////// note making 
/////  ai summarise
/////  if logout no able to remove todo

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

let currentDirectory = "/";

let directories = {
    "/": {
        folders: [],
        files: []
    }
};

let commandHistory = [];
let fileContents = {};
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

            output.innerHTML +=
            `<div>Removed: ${removed}</div>`;

            break;

        case "clear":

            todos = [];

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
    `<div>${currentDirectory}</div>`;
}

function mkdirCommand(args){

    const folderName = args[1];

    if(!folderName){
        output.innerHTML +=
        `<div>Usage: mkdir &lt;foldername&gt;</div>`;
        return;
    }
    if(directories["/"].folders.includes(folderName)){
    output.innerHTML +=
    `<div>Folder already exists</div>`;
    return;
}

    directories["/"].folders.push(folderName);

    output.innerHTML +=
    `<div>Folder created: ${folderName}</div>`;
}

function touchCommand(args){

    const fileName = args[1];

    if(!fileName){
        output.innerHTML +=
        `<div>Usage: touch &lt;filename&gt;</div>`;
        return;
    }
    if(directories["/"].files.includes(fileName)){
    output.innerHTML +=
    `<div>File already exists</div>`;
    return;
}

    directories["/"].files.push(fileName);

    output.innerHTML +=
    `<div>File created: ${fileName}</div>`;
}

function lsCommand(){

    if(
        directories["/"].folders.length === 0 &&
        directories["/"].files.length === 0
    ){
        output.innerHTML +=
        `<div>Directory is empty</div>`;
        return;
    }


    output.innerHTML +=
    `<div>Directories:</div>`;

    directories["/"].folders.forEach(folder=>{
        output.innerHTML +=
        `<div>[DIR] ${folder}</div>`;
    });

    output.innerHTML +=
    `<div>Files:</div>`;

    directories["/"].files.forEach(file=>{
        output.innerHTML +=
        `<div>${file}</div>`;
    });
}

function catCommand(args){

    const fileName = args[1];

    if(!fileName){
        output.innerHTML +=
        `<div>Usage: cat &lt;filename&gt;</div>`;
        return;
    }

    if(fileContents[fileName]){
        output.innerHTML +=
        `<div>${fileContents[fileName]}</div>`;
    }
    else{
        output.innerHTML +=
        `<div>File not found</div>`;
    }
}

function writeCommand(args){

    const fileName = args[1];

    const content =
    args.slice(2).join(" ");

    if(!fileName){
        output.innerHTML +=
        `<div>Usage: write file content</div>`;
        return;
    }

    fileContents[fileName] = content;

    output.innerHTML +=
    `<div>Content written to ${fileName}</div>`;
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

    commandHistory.push(input);

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

        case "cat":
            catCommand(args);
            break;

        case "write":
            writeCommand(args);
            break;

        case "history":
            historyCommand();
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

        const command = input.value;

        output.innerHTML +=
        `<div>> ${command}</div>`;

        executeCommand(command);

        input.value = "";
    }
});