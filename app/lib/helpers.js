const common = {
    "hello": [
        "hi",
        "hello"
    ],
    "hi": [
        "hi",
        "hello"
    ],
    "who are you": [
        "I'm chatbot"
    ],
    "what can you do": [
        "i can talk with you, until my vocabulary runs out"
    ],
    "nice to meet you": [
        "me too",
        "and me too"
    ],
    "who created you": [
        "My creator is Samariddin Sayfiddinov",
        "his name is Samariddin",
        "My developer is Samariddin"
    ],
    "good bay": [
        "bay bay",
        "see you",
        "have a nice day",
        "ok"
    ],
    "bay": [
        "bay bay",
        "good bay",
        "have a nice day",
        "ok"
    ],
};

const command = {
    "find": {
        "information": {
            "project": {
                "studybook": ["hello world"],
                "student helper": ["Information about student helper project"],
                "native cli on node": ["Information about 'native cli on node' project"]
            },
            "free time": ["on weekend"]
        },
        "project": "studybook, student helper, native cli on node",
        "file": "text.txt, pdf.pdf"
    },

    "create": {
        "project": {
            "react": ["react project was created"],
            "python": ["python project was created"]
        }
    }
};

class Chatbot {
    constructor(dict, common, command) {
        this.dict = dict;
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

    createTree(obj) {
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

    searchAnswer(obj, query) {
        for (const key in obj) {
            if (query == key) {
                return this.randArr(obj[key]);
            }
        }
    };

    searchTree(obj, tree) {
        getProp(obj);

        function getProp(o) {
            for (let i = 0; i < tree.length; i++) {
                for (let prop in o) {
                    if (typeof(o[prop]) === 'object' && prop == tree[i]) {
                        getProp(o[prop]);
                    } else if (prop == tree[i]) {
                        console.log('Answer: ', o[prop]);
                    }
                }
            }
        }
    }

    getAnswer(talk) {
        this.common;
        this.command;
        this.tokenizer(talk);




    };
};

const bot = new Chatbot();

const trees = bot.createTree(command);

let text = 'Hi, please find me information about my project studybook';

console.log(getAnswer(text));
// console.log(bot.searchAnswer(common, text));
// console.log(bot.search(common, tree));
