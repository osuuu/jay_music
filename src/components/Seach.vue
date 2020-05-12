<template>
  <div>
      
    <div class="song_seach">
      <van-icon name="search" class="ico" size="30" color="#777" />

      <input
        placeholder="歌曲名(只能周总的哦)"
        v-model="seach"
        @keyup.enter="startSeach"
      />
    </div>
    <div style="margin-bottom:80px">
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
      seach: "",
      play_id: "",
      song: []
    };
  },
  components: {
    play
  },
  methods: {
    _getSong(value) {
      this.$axios({
        url: "https://api.h234.cn/music/jay.html?query=" + this.seach
      })
        .then(res => {
          this.song = res.data.data;
        })
        .catch(err => {});
    },
   
    //搜索音乐
    startSeach() {
      this._getSong(this.seach);
      this.seach = ""
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
.song_seach {
  position: relative;
  margin: 0 3%;
  background: #f5f5f5;
  border-radius: 36px;
  margin-top: 10px;
}
.ico {
  position: absolute;
  top: 5px;
  left: 10px;
}
.song_seach input {
  width: 50%;
  height: 40px;
  margin-left: 48px;
  font-size: 17px;
  color: #777;
  background: #f5f5f5;
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