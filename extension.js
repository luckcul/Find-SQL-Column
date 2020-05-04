// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

function extract_column_names(text) { 
	var split_list = text.split("from");
	if(split_list.length < 3) {
		return []; 
	}
	var column_list = split_list[1].split(",");
	column_list = column_list.map(xi => xi.trim());
	column_list = column_list.map(xi => xi.split(" ").reverse()[0]);
	return column_list;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "find-sql-column" is now active! yanfei');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var status_bar;
	let disposable = vscode.commands.registerCommand('find-sql-column.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user 
		var editor = vscode.window.activeTextEditor; 
		if(!editor) {
			console.log('no open files'); 
			vscode.window.showInformationMessage("No open files");
			return ; 
		}
		
		var doc = editor.document;
		var start_position = editor.selection.active;
		var lastLine = doc.lineAt(doc.lineCount - 1);
		var end_position = lastLine.range.end;
		var text = doc.getText( new vscode.Range(start_position, end_position));
		var column_list = extract_column_names(text); 
		if(column_list.length == 0) {
			vscode.window.showInformationMessage("No valid columns");
		}
		else {
			var insert_str = column_list[0]; 
			for(var i=1; i < column_list.length; i++) {
				insert_str += ", "; 
				insert_str += column_list[i]; 
			}
			editor.edit(edit => edit.insert(start_position, insert_str));
		}
		
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
