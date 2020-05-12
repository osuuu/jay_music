<template>
  <div class="play">
    <img :src="music.images" class="play_img" :class="plays?'animation':''" alt />
    <div class="play_name">{{music.name}}</div>
    <div class="play_detail">{{music.details}}</div>
    <div class="play_ico" :class="plays?'playImg':'stopImg'" @click="stop"></div>
    <div class="play_next" @click="next"></div>

    <audio ref="audio">
      <source :src="music.music" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: ["song"],
  data() {
    return {
      music: {
        images: "http://q2.qlogo.cn/headimg_dl?dst_uin=1750754503&spec=100",
        name: "听见好音乐",
        details: "我偷看着这万物世态炎凉"
      },
      plays: false
    };
  },

  methods: {
    _getSong(id) {
      this.$axios({
        url: "https://api.h234.cn/music/jay.html?id=" + id
      })
        .then(res => {
          this.music = res.data.data[0];
          let audio = this.$refs.audio;
          audio.load();
          audio.play();
          this.plays = true;
          //监听播放结束 执行下一曲
          audio.addEventListener(
            "ended",
            function() {
              this.plays = false;
              this.next()
            },
            false
          );
        })
        .catch(err => {});
    },
    //播放与暂停按钮
    stop() {
      if (this.plays) {
        let audio = this.$refs.audio;

        audio.pause();
        this.plays = false;
      } else if (!this.music.music) {
        Toast.fail("还没有选择歌曲哦");
      } else {
        let audio = this.$refs.audio;

        audio.play();
        this.plays = true;
      }
    },
    //下一曲
    next() {
      let j = Math.random() * (191 - 30) + 30;
      j = ~~j; // 取整
      this._getSong(j);
    }
  },
  watch: {
    song(newVal) {
      this._getSong(newVal);
    }
  }
};
</script>

<style  scoped>
.play {
  width: 92%;
  height: 60px;
  padding: 0 4%;
  position: fixed;
  bottom: 0;
  background: #fff;
  box-shadow: 1px 1px 5px #888888;
}
.play_img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin: 7px 0;
}
.animation {
  -webkit-animation: circle 10s infinite linear;
  animation: circle 10s infinite linear;
}
@-webkit-keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.play_name {
  position: absolute;
  top: 8px;
  left: 80px;
  font-size: 16px;
}
.play_detail {
  position: absolute;
  bottom: 8px;
  left: 80px;
  color: #777;
  font-size: 14px;
}
.play_ico {
  position: absolute;
  right: 70px;
  top: 15px;
  width: 30px;
  height: 30px;
}
.playImg {
  background: url(../assets/img/play.png);
  background-size: 30px 30px;
}
.stopImg {
  background: url(../assets/img/stop.png);
  background-size: 30px 30px;
}
.play_next {
  position: absolute;
  right: 20px;
  top: 13px;
  width: 34px;
  height: 34px;
  background: url(../assets/img/next.png);
  background-size: 34px 34px;
}
</style>