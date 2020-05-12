<template>
  <div>
    <div class="car">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgs" :key="index">
          <a :href="item.url?item.url:'#'" >
            <img :src="item.img" class="imgs" alt />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div style="margin-bottom:60px">
      <div class="contain">
        <div class="title">
          随机推荐
          <van-icon
            name="replay"
            size="20"
            style="float:right;margin-top:4px"
            color="#777"
            @click="replay"
          />
        </div>

        <div class="song" v-for="(item,index) in song" :key="index" @click="play(item.id)">
          <img :src="item.images" class="song_img" alt />
          <div class="song_name">{{item.name}}</div>
          <div class="sq">{{item.sound}}</div>
          <div class="song_detail">{{item.details}}</div>
          <van-icon name="arrow" class="song_enter" size="26" color="#777" />
        </div>
      </div>

      <div class="contain">
        <div class="title">
          热门专辑
          <van-icon name="replay" size="20" style="float:right" color="#777" @click="reAlbum" />
        </div>

        <div class="album_list">
          <div
            class="album_one"
            v-for="(item,index) in album"
            :key="index"
            @click="Album(item.id,item.images,item.album)"
          >
            <img :src="item.images" class="album_img" alt />
            <div class="album_name">{{item.album}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav1" @click="seach">
      <van-icon name="search" size="40" color="#fff" />
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
      imgs: [],
      song: [],
      album: [],
      play_id: ""
    };
  },
  components: {
    play
  },
  methods: {
    //获取轮播图
    _getImgs() {
      this.$axios({
        url: "https://api.h234.cn/music/swiper.php"
      })
        .then(res => {
          this.imgs = res.data.data;
        })
        .catch(err => {});
    },
    //获取随机推荐
    _getSong() {
      this.$axios({
        url: "https://api.h234.cn/music/jay.html"
      })
        .then(res => {
          this.song = res.data.data;
        })
        .catch(err => {});
    },
    //获取专辑列表
    _getAlbum() {
      this.$axios({
        url: "https://api.h234.cn/music/jay.html?list=all"
      })
        .then(res => {
          var newAlbum = [];
          for (let i = 0; i < res.data.data.length; ) {
            let j = Math.random() * res.data.data.length; // 获取随机的下标值
            j = ~~j; // 取整
            let item = res.data.data.splice(j, 1)[0]; // 从原数组中剔除选中的元素
            newAlbum.push(item);
          }
          this.album = newAlbum.splice(0, 6);
        })
        .catch(err => {});
    },

    //传值播放
    play(id) {
      this.play_id = id;
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
    },
    //刷新列表
    replay() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this._getSong();
    },
    //刷新专辑
    reAlbum() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this._getAlbum();
    },
    //跳转专辑列表
    Album(id, img, name) {
      this.$router.push("/album?id=" + id + "&img=" + img + "&name=" + name);
    },

    //搜索效果
    seach() {
      this.$router.push("/seach");
    }
  },
  mounted() {
    this._getImgs();
    this._getSong();
    this._getAlbum();
  }
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  border-radius: 10px;
  text-align: center;
}
.car {
  height: 200px;
  padding: 10px;
}
.imgs {
  width: 100%;
  height: 200px;
  border-radius: 10px;
}

.contain {
  background: #fff;
  padding: 20px 15px 10px 15px;
}
.title {
  font-size: 20px;
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
}
.song {
  margin: 10px 0;
  position: relative;
}
.song_img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
}
.song_name {
  width: 80%;
  position: absolute;
  top: 5px;
  left: 70px;
  font-size: 18px;
  color: black;
  white-space: nowrap; /* 一行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出内容显示省略号 */
}
.sq {
  position: absolute;
  bottom: 10px;
  left: 70px;
  padding: 0 4px;
  font-size: 11px;
  border-radius: 4px;
  border: 1px solid orange;
  color: orange;
}
.song_detail {
  position: absolute;
  bottom: 10px;
  left: 108px;
  font-size: 12px;
  color: #888;
}
.song_enter {
  position: absolute;
  top: 14px;
  right: 0;
}

.album_list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.album_one {
  width: 30%;
  height: 130px;
  margin-bottom: 20px;
}
.album_img {
  width: 100%;
  height: 110px;
  border-radius: 10px;
}
.album_name {
  font-size: 18px;
  color: #888;
  white-space: nowrap; /* 一行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 超出内容显示省略号 */
}

.nav1 {
  position: fixed;
  right: 30px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  background: #5dade2;
  box-shadow: 1px 1px 5px #888888;
  padding: 5px;
}
.nav {
  position: fixed;
  right: 30px;
  bottom: 80px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  background: #5dade2;
  box-shadow: 1px 1px 5px #888888;
  /* padding: 5px; */
}
.seach {
  position: fixed;
  bottom: 210px;
  width: 0;
  margin: 0 5%;
  background: #5dade2;
  color: #fff;
  border-radius: 30px;
  box-shadow: 1px 1px 5px #888888;

  transition: width 0.5s;
}
.shows {
  width: 90%;
}
.seach input {
  /* width: 100%; */
  height: 50px;
  margin-left: 48px;
  font-size: 17px;
}
.ico {
  position: absolute;
  top: 7px;
  left: 10px;
}
.hide {
  display: none;
}
</style>