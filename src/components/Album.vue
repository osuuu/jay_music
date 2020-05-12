<template>
  <div>
    <div style="margin-bottom:60px">
      <div class="album_head">
        <div class="bg">
          <img :src="album_img" class="imgs" alt />
          <div class="album_name">{{album_name}}</div>
          <div class="album_auth">周杰伦</div>
          <div class="album_details">未知信息 ></div>
        </div>
        <div class="mask"></div>
      </div>
      <div class="song_list" v-for="(item,index) in song" :key="index" @click="play(item.id)">
        <div class="song_name">{{item.name}}</div>
        <div class="song_sq">{{item.sound}}</div>
        <div class="song_detail">{{item.details}}</div>
        <van-icon name="arrow" class="song_enter" size="26" color="#777" />
        
      </div>
    </div>

    <play :song="play_id"></play>
  </div>
</template>

<script>
import { Toast } from "vant";
import play from "@/components/play";
export default {
  data() {
    return {
      album_img: "",
      album_name: "",
      song: [],
      play_id: ""
    };
  },
  components: {
    play
  },
  mounted() {
    this.album_img = this.$route.query.img;
    this.album_name = this.$route.query.name;
    this._getSong(this.$route.query.id);
  },
  methods: {
    //获取专辑音乐
    _getSong(value) {
      this.$axios({
        url: "https://api.h234.cn/music/jay.html?album=" + value
      })
        .then(res => {
          this.song = res.data.data;
        })
        .catch(err => {});
    },
    play(id) {
        Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
        this.play_id = id;
      
    }
  }
};
</script>

<style scoped>
.album_head {
  position: relative;
  height: 200px;
  
}
.bg {
  position: absolute;
  top: 0;
  width: 100%;
  background: linear-gradient(#3b5870, #696568);
}
.imgs {
  margin: 30px 30px 40px 30px;
  width: 120px;
  height: 120px;
  border-radius: 10px;
}
.album_name {
  position: absolute;
  top: 30px;
  left: 180px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.album_details {
  position: absolute;
  top: 120px;
  left: 180px;
  color: #fff;
  font-size: 14px;
}
.album_auth {
  position: absolute;
  top: 70px;
  left: 180px;
  color: #fff;
  font-size: 14px;
}
.mask {
  position: absolute;
  top: 176px;
  width: 100%;
  height: 40px;
  background: #fff;
  border-radius: 20px;
}

.song_list {
  margin: 10px 15px;
  position: relative;
}
.song_name {
  width: 80%;
  font-size: 18px;
  color: black;
  white-space: nowrap; /* 一行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出内容显示省略号 */
  margin-bottom: 5px;
}
.song_sq {
  display: inline-block;
  padding: 0 4px;
  font-size: 10px;
  border-radius: 4px;
  border: 1px solid orange;
  color: orange;
}
.song_detail {
  display: inline-block;
  margin-left: 16px;
  font-size: 14px;
  color: #888;
}
.song_enter {
  position: absolute;
  top: 14px;
  right: 0;
}
</style>