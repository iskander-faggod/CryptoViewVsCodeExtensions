import * as vscode from 'vscode';
import CryptoParsingService from './Services/CryptoParsingService';
import { CryptoViewPage } from './View/CryptovViewPage';
import CryptoViewProvider from './View/CryptoViewProvider';

export async function activate(context: vscode.ExtensionContext) {

	const cryptoParser = new CryptoParsingService("token");
	let tokens = await cryptoParser.getTokensData();
	const provider = new CryptoViewProvider(context.extensionUri, tokens);
	const a = vscode.commands.registerCommand("cryptocurrency-view.cryptoView", () => {
		CryptoViewPage.render(tokens);
	});
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(CryptoViewProvider.viewType,provider)
	);
}
