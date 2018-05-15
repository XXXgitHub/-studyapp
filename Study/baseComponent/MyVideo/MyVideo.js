'use strict';
import React, { Component } from 'react';
import {
    View,
    ListView,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    DeviceEventEmitter,
    Platform,
    ActivityIndicator,
    PanResponder,
    Animated
} from 'react-native';
import _ from 'lodash';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import PropTypes from 'prop-types';
var windowSize = Dimensions.get('window');

export class MyVideo extends Component {

    static propTypes =
        {
            seekEnable: PropTypes.bool,
            lockOrientation: PropTypes.bool,
        };
    static defaultProps = {
        seekEnable: true,
        lockOrientation: false,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.animValue = new Animated.Value(0);
        this.state = {
            paused: true,
            showToolBar: true,
            currentTime: 0,
            seeking: false,
            seekerFillWidth: 0,
            seekerOffset: 0,
            duration: 0,
            loading: false,
            isFullScreen: false,
        };
    }


    setControlTimeout() {
        this.clearControlTimeout();
        this.timer = setTimeout(
            () => {
                this.hiddenToolBar();
            },
            6000
        );
    }

    clearControlTimeout() {
        this.timer && clearTimeout(this.timer);
    }


    hiddenToolBar() {
        Animated.spring(
            this.animValue,
            {
                toValue: 1,
                friction: 8,
            }
        ).start();
        this.setState({ showToolBar: false });
    }

    showToolBar() {
        Animated.spring(
            this.animValue,
            {
                toValue: 0,
                friction: 8,
            }
        ).start();
        this.setState({ showToolBar: true });
    }


    ShowOrHideToolBar = ()=> {
        this.setControlTimeout();
        if (!this.state.showToolBar) {
            this.setControlTimeout();
            this.showToolBar();

        }
        else {
            this.hiddenToolBar();
        }
    }

    onPause = () => {
        if (!this.state.loading) {
            this.setControlTimeout();
            if (this.state.paused) {
                if (this.props.onPlay) {
                    this.props.onPlay();
                }

            }
            this.setState({ paused: !this.state.paused });

        }
    };

    onFullScreen = () => {
        if (this.props.onFullScreen) {
            this.props.onFullScreen(!this.state.isFullScreen);
        }

        this.setControlTimeout();

        if (this.state.isFullScreen) {

            this.setState({ isFullScreen: false });
            Orientation.lockToPortrait();
        }
        else {
            this.setState({ isFullScreen: true });
            Orientation.lockToLandscape();
        }

        // this.player.presentFullscreenPlayer()


    };

    onBack = () => {
        this.setControlTimeout();
        if (this.state.isFullScreen) {
            if (!this.props.lockOrientation) {
                Orientation.lockToPortrait();
            }

            this.setState({ isFullScreen: false });
            if (this.props.onFullScreen) {
                this.props.onFullScreen(false);
            }
        }
        else {
            if (this.props.onBack) {
                this.props.onBack();
            }
        }
    };


    componentWillMount() {
        this.setControlTimeout();
        this.initSeekPanResponder();
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    initSeekPanResponder() {
        this._panResponder = PanResponder.create({

            // Ask to be the responder.
            onStartShouldSetPanResponder: (evt, gestureState) => this.props.seekEnable,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => this.props.seekEnable,
            onMoveShouldSetPanResponder: (evt, gestureState) => this.props.seekEnable,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.props.seekEnable,
            /**
             * When we start the pan tell the machine that we're
             * seeking. This stops it from updating the seekbar
             * position in the onProgress listener.
             */
            onPanResponderGrant: (evt, gestureState) => {

                let state = this.state;
                this.clearControlTimeout();
                state.seeking = true;
                this.setState(state);
            },

            /**
             * When panning, update the seekbar position, duh.
             */
            onPanResponderMove: (evt, gestureState) => {

                const position = this.state.seekerOffset + gestureState.dx;
                this.setSeekerPosition(position);
            },

            /**
             * On release we update the time and seek to it in the video.
             * If you seek to the end of the video we fire the
             * onEnd callback
             */
            onPanResponderRelease: (evt, gestureState) => {
                const time = this.calculateTimeFromSeekerPosition();
                let state = this.state;
                if (time >= state.duration && !state.loading) {
                    state.paused = true;
                    this.onEnd();
                } else {
                    this.seekTo(time);
                    this.setControlTimeout();
                    state.seeking = false;
                }
                this.setState(state);
            }
        });
    }

    _onLoad(data = {}) {
        let duration = data.duration;

        if (this.props.onLoad) {
            this.props.onLoad(duration);
        }
        this.setState({ loading: false, duration });
    }

    onLoadStart() {
        let state = this.state;
        state.currentTime = 0;
        state.loading = true;
        this.setSeekerPosition(0);
    }


    _onProgress(data = {}) {
        let state = this.state;
        state.currentTime = data.currentTime;

        if (!state.seeking) {
            const position = this.calculateSeekerPosition();
            this.setSeekerPosition(position);
        }

        this.setState(state);
    }

    onEnd() {
        if (this.props.repeat) {

            return;
        }
        this.seekTo(0);
        this.setSeekerPosition(0);
        this.setState({ paused: true });


        if (this.props.onEnd) {
            if (this.state.isFullScreen) {
                if (!this.props.lockOrientation) {
                    Orientation.lockToPortrait();
                }

                this.setState({ isFullScreen: false });

                if (this.props.onFullScreen) {
                    this.props.onFullScreen(false);
                }

            }

            this.props.onEnd();
        }
    }

    /**
     * Calculate the time to show in the timer area
     * based on if they want to see time remaining
     * or duration. Formatted to look as 00:00.
     */
    calculateTime(time) {
        return `${ this.formatTime(time) }`;
    }

    /**
     * Format a time string as mm:ss
     *
     * @param {int} time time in milliseconds
     * @return {string} formatted time string in mm:ss format
     */
    formatTime(time = 0) {
        const symbol = this.state.showRemainingTime ? '-' : '';
        time = Math.min(
            Math.max(time, 0),
            this.state.duration
        );
        const minutes = time / 60;
        const seconds = time % 60;

        const formattedMinutes = _.padStart(minutes.toFixed(0), 2, 0);
        const formattedSeconds = _.padStart(seconds.toFixed(0), 2, 0);

        return `${ symbol }${ formattedMinutes }:${ formattedSeconds }`;
    }

    /**
     * Set the position of the seekbar's components
     * (both fill and handle) according to the
     * position supplied.
     *
     * @param {float} position position in px of seeker handle}
     */
    setSeekerPosition(position = 0) {
        position = this.constrainToSeekerMinMax(position);
        let state = this.state;

        state.seekerFillWidth = position;
        state.seekerPosition = position;
        if (!state.seeking) {
            state.seekerOffset = position;
        }
        this.setState(state);
    }

    /**
     * Contrain the location of the seeker to the
     * min/max value based on how big the
     * seeker is.
     *
     * @param {float} val position of seeker handle in px
     * @return {float} contrained position of seeker handle in px
     */
    constrainToSeekerMinMax(val = 0) {
        if (val <= 0) {
            return 0;
        }
        else if (val >= this.seekerWidth) {
            return this.seekerWidth;
        }
        return val;
    }

    /**
     * Calculate the position that the seeker should be
     * at along its track.
     *
     * @return {float} position of seeker handle in px based on currentTime
     */
    calculateSeekerPosition() {
        const percent = this.state.currentTime / this.state.duration;
        return this.seekerWidth * percent;
    }

    /**
     * Return the time that the video should be at
     * based on where the seeker handle is.
     *
     * @return {float} time in ms based on seekerPosition.
     */
    calculateTimeFromSeekerPosition() {
        const percent = this.state.seekerPosition / this.seekerWidth;
        return this.state.duration * percent;
    }

    /**
     * Seek to a time in the video.
     *
     * @param {float} time time to seek to in ms
     */
    seekTo(time = 0) {
        let state = this.state;
        state.currentTime = time;
        this.player.seek(time);
        this.setState(state);
    }

    /**
     * Render the seekbar and attach its handlers
     */
    renderSeekbar() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View
                    style={styles.track}
                    onLayout={event => {
                        this.seekerWidth = event.nativeEvent.layout.width;
                    }}
                >
                    <View style={[
                        styles.fill,
                        {
                            width: this.state.seekerFillWidth,
                            backgroundColor: this.props.seekColor || 'rgba(216,216,216,0.8)'
                        }
                    ]}>

                    </View>
                </View>

                <View
                    style={[
                        styles.handle,
                        {
                            left: this.state.seekerPosition,
                        }
                    ]}
                    {...this._panResponder.panHandlers}
                >
                    <View style={[
                        styles.circle,
                        { backgroundColor: this.props.seekColor || '#FFF' }]}
                    />
                </View>
            </View>

        );
    }

    renderTimer() {
        return (<Text style={{
            marginLeft: 5, marginRight: 5, minWidth: 40, fontSize: 13, backgroundColor: 'transparent',
            color: '#FFF',
        }} allowFontScaling={false}>
            {this.calculateTime(this.state.currentTime)}
        </Text>);
    }

    renderTimer2() {
        return (<Text style={{
            marginLeft: 5, fontSize: 13, backgroundColor: 'transparent',
            color: '#FFF',
        }} allowFontScaling={false}>
            {this.calculateTime(this.state.duration)}
        </Text>);
    }


    renderPlayPause() {
        if (this.state.paused) {
            return (
                <TouchableOpacity style={styles.button} onPress={this.onPause}>
                    <Image source={require('./img/play.png')} style={{ width: 12, height: 19, marginRight: 2 }}>
                    </Image>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={styles.button} onPress={this.onPause}>
                    <Image source={require('./img/pause.png')} style={{ width: 18, height: 18, marginRight: 2 }}>
                    </Image>
                </TouchableOpacity>
            );
        }

    }

    renderFull() {

        var source = this.state.isFullScreen ? require('./img/shrink.png') : require('./img/expand.png');
        return (
            <TouchableOpacity style={styles.button} onPress={this.onFullScreen}>
                <Image source={source} style={{ width: 17, height: 17, marginRight: 2 }}>
                </Image>
            </TouchableOpacity>
        );
    }


    renderBottom() {
        return (<Animated.View style={{
            position: 'absolute', left: 0, bottom: this.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -40],
            }), right: 0, height: 40,
            backgroundColor:'rgba(0,0,0,0.5)'
        }}>

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                {this.renderPlayPause()}
                {this.renderTimer()}
                <View style={{ flex: 1 }}>
                    {this.renderSeekbar()}
                </View>
                {this.renderTimer2()}
                {this.renderFull()}
            </View>

        </Animated.View>);
    }

    renderTop() {
        return (
            <Animated.View style={{
                position: 'absolute', left: 0, top: this.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -40],
                }), right: 0, height: 40
            }}>
                <TouchableOpacity style={{ width: 50, height: 40 }} onPress={this.onBack}>
                    <Image source={require('./img/06.png')}
                           style={{ width: 10, height: 14, marginLeft: 15, marginTop: 23 }}>
                    </Image>
                </TouchableOpacity>
            </Animated.View>
        );

    }

    renderLoad() {
        if (this.props.url == null) {
            var bgStyle = this.props.style != null ? this.props.style : {
                width: windowSize.width,
                height: (512 / 750) * windowSize.width
            };

            return (<TouchableOpacity
                style={{
                    position: 'absolute', left: 0, right: 0,
                    bottom: 0, top: 0, alignItems: 'center', justifyContent: 'center'
                }}
                activeOpacity={1}
                onPress={this.ShowOrHideToolBar}>

                <Image source={require('./img/noVideo.png')} style={bgStyle}/>
            </TouchableOpacity>);
        }
        else {
            if (this.state.loading) {
                return (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}
                        activeOpacity={1}
                        onPress={this.ShowOrHideToolBar}>

                        <ActivityIndicator
                            color="white"
                            size="large"
                        />
                    </TouchableOpacity>

                );
            }
            else {
                if (this.state.paused) {

                    return (<TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}
                        activeOpacity={1}
                        onPress={this.ShowOrHideToolBar}>
                        <TouchableOpacity style={{ width: 50, height: 50 }}
                                          onPress={this.onPause}>
                            <Image source={require('./img/playbtn.png')} style={{ width: 50, height: 50 }}/>
                        </TouchableOpacity>
                    </TouchableOpacity>);
                }
                else {
                    return null;
                }

            }
        }

    }

    onReadyForDisplay = () => {
        // Android 在 onLoad 的时候操作这个
        if (Platform.OS === 'ios') {
            let state = this.state;
            this.state.loading = false;
            this.setState(state);
        }
    };

    renderVideo() {
        var videoView = null;


        if (this.props.url != null) {
            videoView = <Video
                ref={(ref) => {
                    this.player = ref;
                }}
                source={{ uri: this.props.url }} // Can be a URL or a local file.
                rate={1.0}                   // 0 is paused, 1 is normal.
                volume={1.0}                 // 0 is muted, 1 is normal.
                muted={false}                // Mutes the audio entirely.
                paused={this.state.paused}               // Pauses playback entirely.
                resizeMode="contain"           // Fill the whole screen at aspect ratio.
                repeat={false}                // Repeat forever.
                onProgress={this._onProgress.bind(this)}
                onLoad={this._onLoad.bind(this)}
                onEnd={this.onEnd.bind(this)}
                onLoadStart={this.onLoadStart.bind(this)}
                onReadyForDisplay={this.onReadyForDisplay}
                // Callback when video cannot be loaded
                style={styles.backgroundVideo}/>;
        }

        return (<TouchableOpacity style={{ flex: 1 }}
                                  activeOpacity={1}
                                  onPress={this.ShowOrHideToolBar}
        >
            {videoView}

        </TouchableOpacity>);
    }

    render() {
        var bgStyle = this.props.style != null ? this.props.style : {
            width: windowSize.width,
            height: (512 / 750) * windowSize.width,
        };

        return (
            <View style={[this.state.isFullScreen ? {
                width: windowSize.height,
                height: windowSize.width,
                backgroundColor: 'black',
            } : bgStyle,{overflow: 'hidden'}]}>
                {this.renderVideo()}
                {this.renderLoad()}
                {this.state.isFullScreen ? this.renderTop() : null}
                {this.renderBottom()}
            </View>

        );
    }
}


const styles = StyleSheet.create({
    backgroundVideo: {
        flex: 1,
    },
    cell: {
        width: windowSize.width,
        height: 131,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    content: {
        flexDirection: 'row',
        height: 120,
        width: windowSize.width,
        alignItems: 'center',
    },
    button: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centering:
        {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
        },
    track: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'rgba(216,216,216,0.4)',
        borderRadius: 2,
        height: 4,
        marginLeft: 5,
        marginRight: 5,
    },
    fill: {
        alignSelf: 'flex-start',
        height: 4,
        width: 1,
        borderRadius: 2,
    },
    handle: {
        position: 'absolute',
        height: 40,
        width: 40,
    },
    circle: {
        marginTop: 17,
        marginLeft: 5,
        borderRadius: 3,
        height: 6,
        width: 6,
    },
});
