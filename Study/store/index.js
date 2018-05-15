import {observable, action, runInAction,computed} from 'mobx';
import LoginStore from './LoginStore';
import DataStore from './DataStore';
class RootStore {
    constructor()
    {
        this.login = new LoginStore(this);
        this.data = new DataStore(this);
    }
}

export default new RootStore();