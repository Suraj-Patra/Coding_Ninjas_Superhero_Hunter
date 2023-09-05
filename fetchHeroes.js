const public_key = '30e67a0ba3425562485c221f8c8c156e'
const private_key = '71f4481440e490fa14b4fb6b2b6016535ab70ce2';


export default async function fetchHeroes() {
    let heroes = [];
    const ts = Date.now();
    const hash = CryptoJS.MD5(ts+private_key+public_key).toString();    // Hashing is correct

    const result = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`);
    const obj = await result.json();
    heroes = obj.data.results;
    return heroes;
}

fetchHeroes();
