import { atom } from 'nanostores';

const count = atom(0);
const answers = atom([]);
function setAnswers(str) {
    answers.set([...answers.get(), str])
}

export { count, answers, setAnswers };