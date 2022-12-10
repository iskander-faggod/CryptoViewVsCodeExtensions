// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CryptoParsingService from './Services/CryptoParsingService';
import { CryptoViewPage } from './View/CryptovViewPage';

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "cryptocurrency-view" is now active!');
	
	const cryptoParser = new CryptoParsingService("token");

	let tokens = await cryptoParser.getTokensData();
	const a = vscode.commands.registerCommand("cryptocurrency-view.cryptoView", () => {
		CryptoViewPage.render(tokens);
	});

	const id = setInterval(async () => {
		if (CryptoViewPage.currentPanel) {
			tokens = await cryptoParser.getTokensData();
			CryptoViewPage.currentPanel.setTokens(tokens);
		}
	}, 1000);


// 	let disposable = vscode.commands.registerCommand('cryptocurrency-view.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from cryptocurrency-view!');
// 	});

// 	const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
//   const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);
//   vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
  
// 	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
