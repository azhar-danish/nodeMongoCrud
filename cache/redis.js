const {Redis} = require('ioredis');

class RedisCache{

    constructor(){
        this.client = new Redis();
    }
    get = async(key) => {
        if(!key) return false;
        let result = await this.client.get(key);
        return JSON.parse(result);
    }

    set = async(key,value,expiry) => {
        if(!key) return false;
        let status = await this.client.set(key,JSON.stringify(value));
        if(expiry && status){
            await this.client.expire(key,expiry);
        }
        return status;
    }
}
module.exports = new RedisCache;