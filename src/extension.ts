// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as open from "open"
import {NodeDependenciesProvider} from "./view/NodeDependenciesProvider"


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('kyadmin-tool 已激活');

	let viewOnServer = vscode.commands.registerCommand('kyadmin-tool.viewOnServer', (uri) => {
		
		vscode.window.showInformationMessage(`未识别路径：${uri ? uri.fsPath : '空'}`);
		console.log(uri)
		let p = uri && uri.fsPath .indexOf("\\web\\") || -1
		if(p>-1){
			let u = "http://localhost:5009/"+uri.fsPath.slice(p+5);
			open(u)
		}else{
			vscode.window.showInformationMessage(`未识别路径：${uri ? uri.fsPath : '空'}`);
		}
	})
	context.subscriptions.push(viewOnServer);

	const tree = vscode.window.registerTreeDataProvider(
		'nodeDependencies',
		new NodeDependenciesProvider('E:\\MyGit\\vscode-plugin-ky')
	);
    context.subscriptions.push(tree);
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.log('kyadmin-tool 已卸载')
}
