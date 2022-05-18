import axios from "axios";

import NodeCache from "node-cache";

const paramsObject = {
  stdTTL: 100,
  checkperiod: 300,
  deleteOnExpire: true,
};

class BaseService {
  constructor(){
    this.cacheObject = new NodeCache(paramsObject);
  }
  async validateCep(cep) {
    const validCep = /^[0-9]{8}$/;

    if (validCep.test(cep)) {
      return true;
    }
    return false;
  }

  async callApiViaCep(cep) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.status === 200) {
      const data = response.data;

      this.cacheObject.set(`cache-cep-${cep}`, data);

      return data;
    }
    return false;
  }

  async checkExistCache(cep) {
    
    const existsCache = await this.cacheObject.get(`cache-cep-${cep}`);

    if (existsCache === undefined) {
      return false;
    }
    return existsCache;
  }
}

export default new BaseService();
