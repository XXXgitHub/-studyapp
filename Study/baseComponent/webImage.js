
import RNFetchBlob from 'react-native-fetch-blob'
const __ANDROID__ = (Platform.OS === 'android')
const PATH_PREFIX = __ANDROID__ ? 'file://' : '';

export default class WebImage extends NavComponent{
    constructor(props){
        super(props);
        this.state = {
            isloadFinish:false,
        }
    }

    componentDidMount(){

        var imageInfo = this.props.imageInfo
        if (imageInfo.imageId != '' && imageInfo.imageId !=null) {
            this.getFile(imageInfo)
        }


    }


    getFile(imageInfo)
    {
        if (imageInfo.path != null && imageInfo.path != '') {

            this.setState({isloadFinish:true})
        }
        else
        {
            this.imageStore.getFile([imageInfo.imageId],(res)=>{

                let url = res.Body.List[0].DownloadUrl;
                let fileName = res.Body.List[0].Name;
                let path = RNFetchBlob.fs.dirs.CacheDir +'/'+ fileName;
                if(__ANDROID__){
                    path = RNFetchBlob.fs.dirs.SDCardApplicationDir + '/images/' + fileName;
                }
                RNFetchBlob.fs.exists(path).then((exists)=>{
                    console.log('getFile', path)
                    if (!exists) {
                        this.downloadImage(url,path,()=>{
                            imageInfo.path = path;
                            this.setState({isloadFinish:true})
                        })
                    }
                    else
                    {
                        imageInfo.path = path;
                        this.setState({isloadFinish:true})
                    }
                })

            })
        }

    }

    downloadImage(url,path,callback){

        RNFetchBlob
            .config({
                trusty : true,
                path:path
            })
            .fetch('GET', url, {
                Authorization : 'Bearer access-token...',
            })
            .then((res) => {
                // this.props.imageInfo.imageData = res.base64();
                callback()
                // this.setState({isloadFinish:true,source:{uri:path}})
            })
            // Status code is not 200
            .catch((errorMessage, statusCode) => {
                // error handling
            })

    };


    render(){
        // android 如果在加载时，显示一个Loading, 固定大小
        if(this.state.isloadFinish){
            return <Image source={{uri:PATH_PREFIX+this.props.imageInfo.path}}
                          {...this.props}/>
        }else {
            return <ActivityIndicator style={this.props.style}
                                      color="gray"
                                      size="large"
            />
        }

    }
}