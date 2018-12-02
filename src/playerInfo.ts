export class PlayerInfo
{
    static score : number;
    static health : number;

    static reset() : void
    {
        this.score = 0;
        this.health = 100;
    }

    static causeDamage(damage : number)
    {
        this.health -= damage;
    }
}