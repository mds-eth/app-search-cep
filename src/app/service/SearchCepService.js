import BaseService from "../utils/BaseService";

class SearchCepService {
  /**
   *
   * @param {string} cep
   * @returns {object}
   */
  async searchCepService(cep) {
    try {

      const response = await BaseService.callApiViaCep(cep);

      if(!response) return false;

      return response;
    } catch (error) {
      return false;
    }
  }
}

export default new SearchCepService();
