import { observable, computed, action} from 'mobx'
import axios from 'axios';
import { TCurrency } from '../types'

class CurrencyStore { 
    @observable private items: TCurrency[] = [];

    @computed
    get getItems() {
        return this.items;
    }

    @action
    setItems = (items: TCurrency[]): void => {
        this.items = items;
    };
    
    @action
    fetchCurrency = async () => {
        await axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
            .then(({ data }) => {
                const dataCurrency: TCurrency[] =  data.Data.map((currency: any) => {
                    const obj: TCurrency = {
                        name: currency.CoinInfo.Name,
                        fullName: currency.CoinInfo.FullName,
                        imageUrl: `https://www.cryptocompare.com/${currency.CoinInfo.ImageUrl}`,
                        price: currency.RAW.USD.PRICE.toLocaleString('USD', { style: 'currency', currency: 'USD' }),
                        volume24Hour: currency.RAW.USD.VOLUME24HOUR.toLocaleString('USD', { style: 'currency', currency: 'USD' })
                    }

                    return obj;
                });

                this.setItems(dataCurrency);  
            }).catch(() => {
                console.error('не робiт :(');
            });
            
        };
         
};

export default CurrencyStore;