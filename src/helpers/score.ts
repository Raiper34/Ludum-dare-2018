const SERVER_URL = 'http://80.211.1.178:5984';
const DB_URL = `${SERVER_URL}/score`;

export class Score {

    static getScore(): void {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${DB_URL}/_all_docs`, true);
        xhr.send();
    }
}
