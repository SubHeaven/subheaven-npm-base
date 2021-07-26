const argParse = require('subheaven-arg');
const fs = require('fs');

argParse.init("subheaven-npm-base", "Configura o projeto NPM");
argParse.positional("name", "Node do pacote NPM sendo criado", { required: false, default: "", sample: "subheaven-npm-base" });
(async() => {
    if (argParse.validate()) {
        if (params.name === '') {
            let blocos = __dirname.split('\\');
            params.name = blocos.slice(blocos.length - 1, blocos.length)[0];
        }

        const file_read = fs.readFileSync('package.json', 'utf8');
        let text = file_read.toString();
        const data = JSON.parse(text);
        data.name = params.name;
        delete data.bin['subheaven-npm-base'];
        delete data.scripts['postinstall'];
        data.bin[params.name] = './cli.js';
        data.repository.url = `git+https://github.com/SubHeaven/${params.name}.git`;
        data.bugs.url = `https://github.com/SubHeaven/${params.name}/issues`;
        data.homepage = `https://github.com/SubHeaven/${params.name}#readme`;
        text = JSON.stringify(data, null, 4);
        fs.writeFileSync('package.json', text);
        console.log("configurações do projeto atualizados com sucesso!");
        fs.unlink('config.js', (err) => {
            if (err) {
              console.error(err)
              return
            }
        });
    }
})();