import {observable,action,computed} from 'mobx';
import {windowSize} from "../baseComponent/WindowSize";
let arrKey = ['T1348647909107','T1348649580692','T1348648756099','T1348648037603'];
let hasGet = [];
export default class DataStore{
    constructor(store)
    {
        this.store = store;
    }

    @observable strBodyHtml = null;
    @observable arrList = [[],[],[],[]];
    @observable videoUrl = null;
    contains(obj) {
        var i = hasGet.length;
        while (i--) {
            if (hasGet[i] === obj) {
                return true;
            }
        }
        return false;
    }

    getList(index)
    {
        let key = arrKey[index];
        if (this.contains(key))
        {
            return;
        }

        fetch(`http://c.m.163.com/nc/article/list/${key}/0-20.html`)
            .then((response) => response.json())
            .then((responseJson) => {
                let dict = responseJson[key];
                var arr = [];
                for (let i = 0;i<dict.length;i++)
                {
                    let item = dict[i];
                    if (item.ename != 'androidnews')
                    {
                        arr.push({image:{uri:item.imgsrc},title:item.title,score:30,isRead:false,viewCount:20,commentCount:20,isVideo:false,key:item.postid})
                    }

                }
                this.arrList[index] = arr;
                hasGet.push(key);
            });

    }
    getDetail(key)
    {
        fetch(`http://c.m.163.com/nc/article/${key}/full.html`)
            .then((response) => response.json())
            .then((responseJson) => {
                let dict = responseJson[key];
                let body = dict.body;
                if (dict.img != null)
                {
                    for (let i=0;i<dict.img.length;i++)
                    {
                        let img = dict.img[i];
                        let src = img.src;
                        let width = parseInt(img.pixel.split('*')[0]);
                        let height = parseInt(img.pixel.split('*')[1]);
                        if (width > windowSize.width - 60)
                        {
                            height = height*(windowSize.width-60)/width;
                            width = windowSize.width - 60;
                        }
                        let strImg = `<img src='${src}' width='${width}' height='${height}'>`
                        body = body.replace(img.ref,strImg)
                    }
                }
                if (dict.video != null)
                {
                    for (let i=0;i<dict.video.length;i++)
                    {
                        let video = dict.video[i];
                        let src = video.url_mp4;
                        // let strVideo = `<embed src='${src}' width='${windowSize.width}' height='200'/>`
                        body = body.replace(video.ref,'');
                        this.videoUrl = src;
                    }
                }

                this.strBodyHtml = '<style type=\'text/css\'> p.thicker{font-weight: 900}p.light{font-weight: 0}p{font-size: 108%}h2 {font-size: 120%}h3 {font-size: 80%}</style>'+body;
            });
    }
}
