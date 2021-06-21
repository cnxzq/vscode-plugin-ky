/**
 * @file Create the Repository File Tree
 * @author leuisken <leuisken@gmail.com>
 */

 import * as vscode from 'vscode';
 
 class FileTreeView
     implements vscode.TreeDataProvider<FileTreeNode>, vscode.Disposable {
 
     private disposables: vscode.Disposable[] = [];
 
     private _onDidChangeTreeData = new vscode.EventEmitter<FileTreeNode>();
     readonly onDidChangeTreeData? = this._onDidChangeTreeData.event;
 
     private _initialize: boolean = false;
 
     constructor(viewId: string) {
         this.disposables.push(
             vscode.window.registerTreeDataProvider(viewId, this)
         );
     }
 
     async getChildren(node?: FileTreeNode) {
         return await Promise.resolve([
             {name:"1",path:"/1"},
             {name:"2",path:"/2"},
             {name:"3",path:"/3"},
             {name:"4",path:"/4"}
         ]);
     }
 
     getTreeItem(node: FileTreeNode) {
         const uri = vscode.Uri.parse(`http://www.baidu.com?#`+node.name);
         const item = new vscode.TreeItem(uri);
         return item;
     }
 
     update() {
         if (!this._initialize) {
             vscode.commands.executeCommand('setContext', 'githubExplorer:showTreeView', true);
             this._initialize = true;
         }
         else {
             //this._onDidChangeTreeData.fire();
         }
     }
 
     dispose() {
         this.disposables.forEach(disposable => disposable.dispose());
         this.disposables = [];
     }
 }
 
 interface FileTreeNode {
     name: string;
     path: string;
 }
 
 export const provider = new FileTreeView('GithubRepository');