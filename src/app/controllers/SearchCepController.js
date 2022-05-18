import SearchCepService from "../service/SearchCepService";

class SearchCepController {
  async searchCepController(req, res) {
    const response = await SearchCepService.searchCepService(req.body.cep);

    if (response) {
      return res.status(200).json({ status: true, response, infoCache: false });
    }
    return res.status(400).json({ status: false, response });
  }
}

export default new SearchCepController();
