import { command, common } from '../data/data.js'

class Chatbot {
    constructor(common, command) {
        this.common = common;
        this.command = command;
    };

    tokenizer(text) {
        let tokeniz = text.replace(/[&\/\\#`,+()$~%.'":*!?<>{}]/g, '').split(" ");
        let corpus = [];

        for (let i = 0; i < tokeniz.length; i++) {
            if (tokeniz[i] == "") continue;
            else corpus[i] = tokeniz[i].toLowerCase();
        }

        return corpus;
    };

    randArr(arr) {
        var rand = Math.random() * arr.length | 0;
        var rValue = arr[rand];
        return rValue;
    }

    createTree(obj = this.command) {
        // если нет дочерних элементов, то вызов возвращает undefined
        // и элемент <ul> не будет создан
        if (typeof Object.keys(obj) === 'number') return 0;

        let ul = [];

        for (let key in obj) {
            if (Object.keys(key).toString() == '0') return 0;
            let li = [];
            li.push(key);

            let childrenUl = this.createTree(obj[key]);

            if (childrenUl) {
                li.push(childrenUl);
            }

            ul.push(li);
        }

        return ul;
    };

    searchAnswer(query, obj = this.common) {
        query = query.toLowerCase();
        for (const key in obj) {
            if (query == key) {
                return this.randArr(obj[key]);
            }
        }
        return null;
    };

    searchTree(tree, obj = this.command) {
        let backed;

        function getProp(o) {
            for (let i = 0; i < tree.length; i++) {
                for (let prop in o) {
                    if (typeof(o[prop]) === 'object' && prop == tree[i]) {
                        if (!Array.isArray(o[prop])) {
                            backed = getProp(o[prop]);
                        } else {
                            o[prop] = o[prop].join(', ');

                            return prop + ': ' + o[prop];
                        }

                        return backed;
                    } else {
                        continue;
                    }
                }
            }
        };

        return getProp(obj);
    };

    getAnswer(talk) {
        const tree = this.tokenizer(talk);
        const res = [];
        let answer;
        let n = 0;

        for (let i = 0; i < tree.length; i++) {
            answer = this.searchAnswer(tree[i])
            if (answer) {
                res[n] = answer;
                n++;
                break;
            }
        };

        res[n] = this.searchTree(tree);

        return res.join(', ');
    };
};

const bot = new Chatbot(common, command);

const trees = bot.createTree();

let text = 'Hi, find me my project';

console.log(bot.getAnswer(text));
