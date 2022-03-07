const vscode = require('vscode');
const fs = require('fs');
const config = require('./src/index');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "vue-folder-template" is now active!');
    let disposable = vscode.commands.registerCommand('vue-folder-template.helloWorld', function (args) {
        useExtension(args).then(() => {
            vscode.window.showInformationMessage('创建成功啦');
        }).catch((e) => {
            new Error(e);
        })
    });

    context.subscriptions.push(disposable);
}

const useExtension = (args) => {
    return new Promise((resolve, reject) => {
        try {
            const path = vscode.workspace.rootPath;
            if (!path) {
                vscode.window.showErrorMessage('请先打开一个工作区');
                reject('');
                return;
            }
            const selectPath = args.path.substr(1);
            const targetPath = `${selectPath}/vueTemplate`;
            const targetVuePath = `${selectPath}/vueTemplate/index.vue`;
            const targetJsPath = `${selectPath}/vueTemplate/index.js`;
            const targetCssPath = `${selectPath}/vueTemplate/style.css`;

            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
                fs.writeFileSync(targetVuePath, config.myVueTemplate);
                fs.writeFileSync(targetJsPath, config.myJsTemplate);
                fs.writeFileSync(targetCssPath, config.myCssTemplate);
            } else {
                reject('')
                return;
            }
            resolve('');
        } catch (e) {
            reject(new Error(e));
        }
    })
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
