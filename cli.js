import project from './index.js';
import argParse from 'subheaven-arg';

argParse.description("Cumprimenta alguém");
argParse.positional("name", "Nome a ser cumprimentado", { required: true, default: "", sample: "SubHeaven" });
(async() => {
    if (argParse.validate()) {
        await project.hello(`Hello ${params.name}!`);
    }
})();