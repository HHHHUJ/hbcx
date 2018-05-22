<template>
  <div>
      <Ihead/>
      <div class="wrap">
            <div class="page-indexlist-wrapper">
                <keep-alive>    
                    <mt-index-list>
                        <mt-index-section v-for="(item,i) in alphabet" :index="item.initial" :key="i">
                            <mt-cell v-for="(cell,i) in item.cells" :title="cell" :key="i" @click.native="sendplace([cell,placetype])"></mt-cell>
                        </mt-index-section>
                    </mt-index-list>
                </keep-alive>
            </div>
        </div>
  </div>
</template>

<script>
import Pinyin from 'pinyin'
const NAMES = ['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安', '重庆', '青岛', '长沙', '南京', '厦门', '昆明', '大连', '天津', '郑州', '三亚', '济南', '福州', '阿勒泰', '阿克苏', '鞍山', '安庆', '安顺', '阿拉善左旗', '澳门', '阿里', '阿拉善右旗', '阿尔山', '百色', '包头', '毕节', '北海', '博乐', '保山', '白城', '布尔津', '白山', '巴彦淖尔', '昌都', '承德', '常德', '长春', '朝阳', '赤峰', '长治', '沧源', '常州', '池州', '潮州', '潮汕', '大同', '达县', '达州', '稻城', '丹东', '迪庆', '大理', '敦煌', '东营', '大庆', '德令哈', '德宏', '鄂尔多斯', '额济纳旗', '恩施', '二连浩特', '阜阳', '佛山', '抚远', '富蕴', '果洛', '格尔木', '广元', '固原', '高雄', '赣州', '贵阳', '桂林', '红原', '海口', '河池', '邯郸', '黑河', '呼和浩特', '合肥', '淮安', '怀化', '海拉尔', '哈密', '衡阳', '哈尔滨', '和田', '花土沟', '花莲', '霍林郭勒', '惠州', '汉中', '黄山', '嘉义', '景德镇', '加格达奇', '嘉峪关', '井冈山', '景洪', '金昌', '九江', '晋江', '佳木斯', '济宁', '锦州', '建三江', '鸡西', '九寨沟', '金门', '揭阳', '库车', '康定', '喀什', '凯里', '库尔勒', '克拉玛依', '黎平', '澜沧', '龙岩', '临汾', '兰州', '丽江', '荔波', '吕梁', '临沧', '六盘水', '拉萨', '洛阳', '连云港', '临沂', '柳州', '泸州', '林芝', '芒市', '牡丹江', '马祖', '绵阳', '梅州', '马公', '满洲里', '漠河', '南昌', '南竿', '南充', '宁波', '宁蒗', '南宁', '南阳', '南通', '澎湖列岛', '攀枝花', '普洱', '琼海', '秦皇岛', '且末', '庆阳', '黔江', '泉州', '衢州', '齐齐哈尔', '日照', '日喀则', '神农架', '莎车', '沈阳', '石河子', '石家庄', '上饶', '三明', '汕头', '十堰', '邵阳', '松原', '台州', '台中', '塔城', '腾冲', '铜仁', '通辽', '天水', '吐鲁番', '通化', '台南', '台北', '台东', '唐山', '太原', '泰州', '乌兰浩特', '乌兰察布', '乌鲁木齐', '潍坊', '威海', '文山', '温州', '乌海', '武夷山', '无锡', '梧州', '万州', '兴义', '夏河', '香港', '西双版纳', '新源', '忻州', '襄阳', '西昌', '锡林浩特', '西宁', '徐州', '延安', '银川', '伊春', '永州', '榆林', '宜宾', '运城', '宜春', '宜昌', '伊宁', '义乌', '营口', '延吉', '烟台', '盐城', '扬州', '玉树', '张家界', '舟山', '扎兰屯', '遵义茅台', '张掖', '昭通', '湛江', '中卫', '张家口', '珠海', '遵义新舟','奥奇德岛','阿坝'];
import eventBus from '../bus/eventBus.js'
import {mapState,mapActions} from 'vuex'
import Ihead from './ihead.vue'
export default {
    name:'Indexlist',
    props:[
        'placetype' //0是dcity，1是acity
    ],
    data(){
        return {
            alphabet: [],
            place:''
        }
    },
    components:{
        Ihead
    },
    created() {  
        'ABCDEFGHJKLMNPQRSTWXYZ'.split('').forEach(initial => {
                let cells = NAMES.filter(name=>{
                    if(Pinyin(name)[0][0][0].toUpperCase() === initial){
                        return name;
                    }else{
                        return ;
                    }
                }) 
                this.alphabet.push({
                initial,
                cells
                });
        });
    },
    methods:{
        ...mapActions([
            'sendplace'
        ]),
    },
    // destroyed(){
    //     eventBus.$emit('sendFromI',this.place);
    // }
}
</script>

<style scoped>
    .page-indexlist-wrapper{
        width:100%;
    }
    .wrap{
        width:100%;
        padding-top:1.62rem;
    }
</style>
