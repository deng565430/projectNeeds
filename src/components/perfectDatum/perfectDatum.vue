<template>
	<transition name="prefect">
		<div id="prefect">
			<my-title title="完善业务资料"></my-title>
			<scroll class="container">
				<div>
					<div class="user-info">
						<div class="row">
							<span class="label">报备单号：</span>
							<span class="text">{{reportid}}</span>
						</div>
						<div class="row">
							<span class="label">带看项目：</span>
							<span class="text">{{projectName}}</span>
						</div>
						<div class="row">
							<span class="label">姓名：</span>
							<span class="text">{{realName}}</span>
						</div>
						<div class="row">
							<span class="label">身份证号码：</span>
							<span class="text">{{idcard}}</span>
						</div>
						<div class="row">
							<span class="label">开户行：</span>
							<span class="text">{{bank}}</span>
						</div>
						<div class="row">
							<span class="label">卡号：</span>
							<span class="text">{{newbank}}</span>
						</div>
						<div class="btn" @click="consummate">完善个人信息</div>
					</div>
					<div class="line"></div>
					<div class="content">
						<div style="width: 100%">
							<div class="title">
								<i class="icon icon-money"></i>
								<span>佣金结算方式</span>
							</div>
							<div class="change">
								<span>垫佣：</span>
								<input type="radio" name="commission" value="1" v-model="picked">是（70%佣金）
								<input type="radio" name="commission" value="2" v-model="picked">否（80%佣金）
							</div>
							<div class="feedback" v-show="">
								<span style="margin-right:0.5rem">反馈</span>
								<span class="feedback-text">此项目不支持垫佣（项目对接：唔继东）</span>
							</div>
						</div>
						<div style="width: 100%">
							<div class="title">
								<i class="icon icon-eye"></i>
								<span>完善带看资料</span>
							</div>
							<div class="content-title">
								<i class="icon-s icon-clock"></i>带看单（限一张图片）
							</div>
							<uploader :max="1" ref="uploader1" @imgid="postimgid_01"></uploader>
							<div class="feedback" v-show="">
								<span style="margin-right:0.5rem">反馈</span>
								<span class="feedback-text">测试测试测试测试测试</span>
							</div>
						</div>
						<div style="width: 100%">
							<div class="title">
								<i class="icon icon-cart"></i>
								<span>完善订购资料</span>
							</div>
							<div class="content-title">
								<i class="icon-s icon-clock"></i>
								<span>订购单（最多2张图片）</span>
							</div>
							<uploader :max="2" ref="uploader2" @imgid="postimgid_02"></uploader>
							<div class="feedback" v-show="">
								<span style="margin-right:0.5rem">反馈</span>
								<span class="feedback-text">收款凭证金额不争取（财务）</span>
							</div>
						</div>
						<div style="width: 100%">
							<div class="title">
								<i class="icon icon-edit"></i>
								<span>完善签约资料</span>
							</div>
							<div class="content-title">
								<i class="icon-s icon-clock"></i>
								<span style="width: 95%">签约（提供合同的访问信息页图片，客户信息页图片，付款方式页，签字页，收款收据或发票，限6张图）
								</span>
							</div>
							<uploader :max="6" ref="uploader3" @imgid="postimgid_03"></uploader>
							<div class="feedback" v-show="">
								<span style="margin-right:0.5rem">反馈</span>
								<span class="feedback-text">收款凭证金额不争取（财务）</span>
							</div>
						</div>
						<div class="btn" @click="_submit">提交</div>
					</div>
				</div>	
			</scroll>
			<confirm ref="confirm" @cancel="cancelConfirm" :text="confirmText" @confirm="confirm"></confirm>
		</div>
	</transition>
</template>
<script>
import { showDetail, uploadImg } from 'api/perfectDatum'
import Confirm from 'base/confirm/confirm'
import Uploader from 'base/image-uploader/uploader'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
export default {
  data: () => ({
    files: [],
    reportid: '',
    projectName: '',
    realName: '',
    idcard: '',
    bank: '',
    creditcard: '',
    picked: 2,
    confirmText: '',
    datumDetail: []
  }),
  components: {
    Confirm,
    Uploader,
    MyTitle,
    Scroll
  },
  computed: {
    newbank: function () {
      if (this.creditcard) {
        return this.creditcard.replace(/\s/g, '').replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1')
      }
    }
  },
  created() {
    this._showDetail()
  },
  methods: {
    _showDetail() {
      showDetail(location.search.split('=')[1]).then(res => {
        this.projectName = res.data.data.processdInfo[0].projectName
        this.reportid = res.data.data.processdInfo[0].reportid
        this.realName = res.data.data.processdInfo[0].realName
        this.idcard = res.data.data.processdInfo[0].idcard
        this.bank = res.data.data.processdInfo[0].bank
        this.creditcard = res.data.data.processdInfo[0].creditcard
      })
    },
    submit() {
      this.files = [
        ...this.$refs.uploader1.files,
        ...this.$refs.uploader3.files,
        ...this.$refs.uploader3.files
      ]
      console.log(this.files)
    },
    consummate() {
      window.location.href = 'http://localhost:8080/registration'
    },
    toCompletion() {
      if (!(this.reportid || this.projectName || this.realName || this.idcard || this.bank || this.creditcard)) {
      }
    },
    postimgid_01(msg) {
      let data = {
        serverId: msg,
        reportid: this.reportid,
        flag: '2'
      }
      uploadImg(data).then(res => {
        console.log(res)
      })
    },
    postimgid_02(msg) {
      let data = {
        serverId: msg,
        reportid: this.reportid,
        flag: '3'
      }
      uploadImg(data).then(res => {
        console.log(res)
      })
    },
    postimgid_03(msg) {
      let data = {
        serverId: msg,
        reportid: this.reportid,
        flag: '4'
      }
      uploadImg(data).then(res => {
        console.log(res)
      })
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

#prefect {
	position: fixed;
	width: 100%;
	bottom: 0;
	height: 100%;
	z-index: 10000;
	background: #fff;

	.container {
		position: fixed;
		top: 23px;
		bottom: 55px;
		width: 100%;
		padding-top: 50px;
		z-index: -1

		.icon {
			display: inline-block;
			width: 23px;
			height: 23px;
			background-repeat: no-repeat;
			background-size: contain;
			margin-right: 10px;
		}

		.icon-s {
			display: inline-block;
			width: 16px;
			height: 16px;
			background-repeat: no-repeat;
			background-size: contain;
			margin-right: 5px;
		}

		.icon-clock {
			background-image: url('./../../common/image/clock.png');
		}

		.icon-money {
			background-image: url('./../../common/image/money.png');
		}

		.icon-eye {
			background-image: url('./../../common/image/eye.png');
			margin-top: 8px;
		}

		.icon-cart {
			background-image: url('./../../common/image/cart.png');
		}

		.icon-edit {
			background-image: url('./../../common/image/edit.png');
			width: 20px;
			height: 20px;
		}
	}

	.user-info {
		padding-bottom: 0.8rem;
	}

	.row {
		margin-bottom: 1.6rem;

		.label {
			display: inline-block;
			width: 115px;
			text-align: right;
			color: #666;
		}

		.text {
			color: rgba(0, 0, 0, 0.6);
		}
	}

	.line {
		height: 8px;
		background: #eee;
	}

	.content {
		padding-top: 2rem;
	}

	.change {
		padding-left: 1rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
		color: rgba(0, 0, 0, 0.6);

		input[type='radio'] {
			margin-right: 0.6rem;
		}
	}

	.title {
		height: 45px;
		background: #d2d2d2;
		line-height: 45px;
		font-size: 1rem;
		padding-left: 1rem;
		color: rgba(0, 0, 0, 0.6);
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 100%;

		&::before {
			content: '';
			position: absolute;
			top: 11px;
			right: 2rem;
			width: 12px;
			height: 12px;
			border-top: 2px solid rgba(0, 0, 0, 0.6);
			border-right: 2px solid rgba(0, 0, 0, 0.6);
			transform: rotate(135deg);
		}
	}

	.content-title {
		font-size: 0.85rem;
		line-height: 1.2rem;
		color: rgba(0, 0, 0, 0.6);
		margin-left: 1rem;
		margin-top: 1rem;
		display: inline-flex;
		align-items: center;
	}

	.feedback {
		font-size: 0.9rem;
		line-height: 1.2rem;
		color: rgba(0, 0, 0, 0.6);
		margin-left: 1rem;
		margin-bottom: 2rem;
	}

	.feedback-text {
		color: rgba(243, 107, 67, 0.8);
	}

	.btn {
		background: #f07632;
		width: 96%;
		height: 40px;
		font-size: 1rem;
		color: #fff;
		text-align: center;
		line-height: 40px;
		margin: 0 auto;
		border-radius: 2px;
	}

}
</style>