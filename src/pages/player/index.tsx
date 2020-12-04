import * as React from 'react';
import './index.less';
import { PauseCircleOutlined ,PlayCircleOutlined ,StepForwardOutlined ,StepBackwardOutlined} from '@ant-design/icons';
import axios from 'axios'
import data from '../mock'
import defaultAlbum from '../../assets/defaultAlbum.jpg';
import AudioSpectrum from 'react-audio-spectrum';

export interface IAppProps {
}
export default class App extends React.Component<IAppProps> {
  state = {
    data:[], //页面数据
    current:0, //当前正在播放的歌曲的 id
    isPlaying:false, //判断是否正在播放
    defaultAlbum:defaultAlbum, //默认专辑图片
    currentTime:'', // 当前播放时间
    allTime:'', //歌曲总时长
  }
  componentDidMount(){
    console.log(data);
    // console.log(this.state.current);
    axios.get('/mock').then((res:any)=>{
      this.setState({
        data:res.data
      })
      // console.log(this.state.data);
    })
  }

  //双击播放歌曲
  handleDoubleClick = (id:number)=>{
    // console.log(id);
    this.setState({
      current:id,
    })
    if(this.state.isPlaying === false) {
      this.setState({
        isPlaying:true
      })
    } 
    // console.log(this.state.current);
  }
  
  //点击左右按钮切换上、下一首
  handleSwitch = (type:any)=>{
    // console.log(type);
    const id = this.state.current;
      if(type === 'pre' && id > 1) {
        this.setState({
          current:this.state.current - 1,
        })
      } else if(type === 'next' && id <= 14) {
        this.setState({
          current:this.state.current + 1
        })
      } else if(type === 'next' && this.state.current >= 15){
        this.setState({
          current:1
        })
      } else {

      } 
      // console.log(this.state.current);
  }
  //控制播放按钮
  handlePlay = ()=>{
    if(this.state.current === 0) {
      this.setState({
        isPlaying:false
      })
    } else {
      const audioRefs:any = this.refs;
    console.log(audioRefs);
    // console.log(audioRefs);
    this.setState({
      isPlaying:!this.state.isPlaying
    },()=>{
      console.log(this.state.isPlaying)
      if(this.state.isPlaying) {
        audioRefs.audioRef.play();
      } else {
        audioRefs.audioRef.pause();
      }
    }) 
    }  
  }

  //格式化 当前播放时间(currentTime)和歌曲总时长(allTime)
  timeToMinute(time:any) {
    if (time > -1) {
      let timeLength = "";
      const min =
        Math.floor((time / 60) % 60) < 10
          ? "0" + Math.floor((time / 60) % 60)
          : Math.floor((time / 60) % 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? "0" + Math.floor(time % 60)
          : Math.floor(time % 60);
      timeLength = `${min}:${seconds}`;
      return timeLength;
    } else {
      return "00:00";
    }
  }

  //audio标签 onTimeUpdate事件
  onTimeUpdate = ()=>{
    const audioRefs:any= this.refs;
    const currentTime = this.timeToMinute(Number(audioRefs.audioRef.currentTime));
    const allTime = this.timeToMinute(Number(audioRefs.audioRef.duration));
    this.setState({
      currentTime:currentTime,
      allTime:allTime
    })
    if (audioRefs.audioRef.ended) {
      this.handleSwitch("next");
    }
  }
  
  public render() {
    const {data,current,isPlaying} = this.state;
    const currentSong:any = data.find((item:any)=>item.id === current) || {}
    // console.log(currentSong);
    return (
      <div className="container">
        <audio src = {currentSong.url} ref = "audioRef" onTimeUpdate ={this.onTimeUpdate} id="audio-element" autoPlay></audio>
        <div className="player">
          <div className="topBox">
            <div className={`album ${isPlaying ? 'rotate' : ''}`}> {/* 模板字符串 */}
              <img src={currentSong.album ? currentSong.album : this.state.defaultAlbum} alt=""/>
            </div>
            <div className="control">
              <div className="prev"><StepBackwardOutlined style = {{fontSize:28}} onClick={() => this.handleSwitch("pre")} /></div>
              <div className="play" onClick = {this.handlePlay}>
                {isPlaying ? <PauseCircleOutlined style = {{fontSize:28}} /> : <PlayCircleOutlined style = {{fontSize:28}} />}
              </div>
              <div className="next"><StepForwardOutlined style = {{fontSize:28}} onClick={() => this.handleSwitch("next")} /></div>
            </div>
            <div className="progressBar">
              <div className="progress">
                <div className="circle"></div>
              </div>
            </div>
    <div className="playTime">{this.state.currentTime === '' ? '00:00' : this.state.currentTime} / {this.state.allTime === '' ? '00:00' : this.state.allTime}</div>
          </div>
          <div className="bottomBox">
            <div className="left">
            {/* ts定义类型约束 */}
            {
              data.map((item:any,index:number)=>{
                return(
                <p key = {index} className = { `${item.id === current ? 'active rotate':''}`}  onDoubleClick = {()=>this.handleDoubleClick(item.id)}>{index+1} {item.name} - {item.singer}</p>
                )
              })
            }
            </div>
            <div className="right">
            <AudioSpectrum
              id="audio-canvas"
              height={365}
              width={550}
              audioId={'audio-element'}
              capColor={'red'}
              capHeight={2}
              meterWidth={7}
              meterCount={512}
              meterColor={[
                {stop: 0, color: '#f00'},
                {stop: 0.5, color: '#0CD7FD'},
                {stop: 1, color: 'red'}
              ]}
            gap={4}
            />
            </div>
          </div>
        </div>
      </div> 
    );
  }
}
