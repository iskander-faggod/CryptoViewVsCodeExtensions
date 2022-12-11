import * as vscode from 'vscode';
import { TokenData } from '../interfaces/TokenData';
import { CryptoViewPage } from './CryptovViewPage';


export default class CryptoViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;
  public static readonly viewType = "cryptoview.checkview";

  private _extensionUri: vscode.Uri;

  private _tokens : TokenData[];
  constructor(extensionUri: vscode.Uri, tokens: TokenData[]) {
    this._extensionUri = extensionUri;
    this._tokens = tokens;
  }
  
  resolveWebviewView(
    webviewView: vscode.WebviewView
  ): void | Thenable<void> {
    this._view = webviewView;
  
    webviewView.webview.options = {
    // Allow scripts in the webview
    enableScripts: true,
    localResourceRoots: [this._extensionUri],
    };
  
    console.log(this._tokens,'tokens in view')
    webviewView.webview.html = CryptoViewPage.getWebviewContent(this._tokens);
  }

}
