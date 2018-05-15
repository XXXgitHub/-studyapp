import {observable,action,computed} from 'mobx';

export default class LoginStore{
    constructor(store)
    {
        this.store = store;
    }
}
