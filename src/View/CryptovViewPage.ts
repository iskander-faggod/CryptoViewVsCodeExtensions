// file: src/panels/HelloWorldPanel.ts

import * as vscode from "vscode";
import { TokenData } from '../interfaces/TokenData';

export class CryptoViewPage {
  public static currentPanel: CryptoViewPage | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private _tokens : TokenData[];
  private _intervalId : NodeJS.Timer | undefined;

  private constructor(panel: vscode.WebviewPanel, tokens: TokenData[]) {
    this._panel = panel;
    this._tokens = tokens;
    this._panel.onDidDispose(this.dispose, null, this._disposables);
    this._intervalId = setInterval(() => {
        this._panel.webview.html = CryptoViewPage.getWebviewContent(this._tokens);
    }, 1000);
    this._panel.webview.html = CryptoViewPage.getWebviewContent(this._tokens);
  }

  public static render(tokens : TokenData[]) {
    if (CryptoViewPage.currentPanel) {
        CryptoViewPage.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel("hello-world", "Текущие курсы криптовалют", vscode.ViewColumn.One, {
      });

      CryptoViewPage.currentPanel = new CryptoViewPage(panel, tokens );
    }
  }

  public setTokens(tokens: TokenData[]) {
    this._tokens = tokens;
  }

  public dispose() {
    CryptoViewPage.currentPanel = undefined;
    if (this._intervalId) {
        clearInterval(this._intervalId);
    }
    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  public static getWebviewContent(tokens: TokenData[]) {
    let body = `<table style="width: 100%, padding: 4px">`;

    tokens.map(token => {
        body += `
            <tr class="crypto-row"> 
                <td class="crypto-row_title" align="center">${token.name}</td>
                <td class="crypto-row_symbol" align="center">${token.symbol}</td>
                <td class="crypto-row_price" align="center">${token.inMomentPrice}</td> 
            </tr>`
    });

    body += '</table>';

    return  `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Актуальные расценки криптовалют</title>
        </head>
        <body>
            <h1>Цены на ${new Date().toLocaleString()}</h1>
          ${body}
        <style>
            .crypto-row{
                width: 100%;    
                justify-content: space-evenly;
            }

            td {
                border: 1px #aaa solid;
            }

            .crypto-row_title{
                color: orange;
                font-weight: 500;
            }
            
            .crypto-row_symbol{
                color: red   
            }

            .crypto-row_price{
                color:green;
                font-weight: 500;

            }
        </style>
        </body>
      </html>
    `;
  }

}