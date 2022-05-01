getProp(obj);

function getProp(o) {

    for (let prop in o) {
        if (typeof(o[prop]) === 'object') {
            getProp(o[prop]);
        } else {
            console.log('Answer: ', o[prop]);
        }
    }
}
