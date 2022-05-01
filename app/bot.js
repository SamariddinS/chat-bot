const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en-min');

(async() => {
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.addLanguage('ru');
    // Adds the utterances and intents for the NLP
    nlp.addDocument('ru', 'пока', 'greetings.bye');
    nlp.addDocument('ru', 'до встречи', 'greetings.bye');
    nlp.addDocument('ru', 'досвидание', 'greetings.bye');
    nlp.addDocument('ru', 'привет', 'greetings.hello');
    nlp.addDocument('ru', 'здравствуете', 'greetings.hello');
    nlp.addDocument('ru', 'добрые день', 'greetings.hello');

    // Train also the NLG
    nlp.addAnswer('ru', 'greetings.bye', 'увидемся');
    nlp.addAnswer('ru', 'greetings.bye', 'до встречи');
    nlp.addAnswer('ru', 'greetings.hello', 'Привет!');
    nlp.addAnswer('ru', 'greetings.hello', 'добрые день!');
    await nlp.train();
    const response = await nlp.process('ru', 'привет');
    console.log(response);
})();
