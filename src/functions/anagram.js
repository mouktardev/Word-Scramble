const shuffle = (str) => {
    return str
        .split("")
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join("");
};

const generateWords = (str) => {
    let combinations = [];
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length + 1; j++) {
            if (str.slice(i, j).length >= 3) {
                combinations.push(str.slice(i, j));
            }
        }
    }
    return combinations;
};

const allAnagrams = (dict, arr) => {
    let anagrams = {};
    arr.forEach(function (str) {
        const recurse = (ana, str) => {
            if (str === "" && dict.hasOwnProperty(ana)) anagrams[ana] = 1;
            for (var i = 0; i < str.length; i++)
                recurse(ana + str[i], str.slice(0, i) + str.slice(i + 1));
        };
        recurse("", str);
    });
    return Object.keys(anagrams);
};

export { allAnagrams, generateWords, shuffle }  