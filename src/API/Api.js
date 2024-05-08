import axios from 'axios'

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api-exchange.cryptocloud.plus/exchange'
    })
  }
  async getAllCurrency() {
    const res = await this.api.get('/all_currency')
    return res.data
  }
  async profitAmount(input, amount, from, to, signal) {
    let body
    if (input === 'from') {
      body = {
        amount: +amount,
        from_float: from,
        to_float: to
      }
    }
    if (input === 'to') {
      body = {
        amount: +amount,
        from_fixed: from,
        to_fixed: to
      }
    }
    const config = {
      signal: signal
    }
    const res = await this.api.post(`/profit_amount`, body, config)
    return res.data
  }
}
export default new Api()
