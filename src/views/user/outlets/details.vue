<template>
  <div class="dashboard-container">
    <div class="dashboard-management">
      <div class="dashboard-text">网点详情</div>
    </div>
    <div class="user">
      <el-tabs v-model="activeName" @tab-click="addIns">
        <el-tab-pane label="基本信息" name="basic">
          <div class="basic-information">
            <ul class="basic-information-project">
              <li>
                <p>手机号</p>
                <el-input v-model="phone" class="w700" />
              </li>
              <li>
                <p>负责人姓名</p>
                <el-input v-model="name" class="w700" />
              </li>
              <li>
                <p>网点名称</p>
                <el-input v-model="shopName" class="w700" />
              </li>
              <li>
                <p class="information-serial-title">定位</p>
                <el-input
                    v-model="form.longitude"
                    class="w200"
                    style="margin-right:20px;"
                    placeholder="地理经度"
                  maxlength="12"
                />
                <el-input v-model="form.latitude" class="w200" placeholder="地理纬度" maxlength="12" />
                <div class="buttn" @click="displayMap">选择位置</div>
              </li>
              <li>
                <p class="information-serial-title">网点位置</p>
                <v-distpicker
                    :province="placeholders.province"
                    :city="placeholders.city"
                    :area="placeholders.area"
                  @selected="getArea"
            />
                </li>
                <li>
                  <p>网点地址</p>
                  <el-input v-model="address" class="w700" />
                </li>
                <li>
                  <p>所属代理</p>
                   <div>
              <el-radio-group v-model="type" @change="typeChange">
                <el-radio class="radio" :label="'2'">省代</el-radio>
                <el-radio class="radio" :label="'1'">市代({{ agid }})</el-radio>
                <el-radio class="radio" :label="'0'">平台</el-radio>
              </el-radio-group>
            </div>
                </li>
            <!--市代选择-->
                <div v-show="outletsStatus" class="type_PCD">
                  <div class="type_PCD_title">
                    选择市代
                  </div>
                  <div class="threePCD">
                    <v-distpicker
                      :province="placeholdersCity.province"
                      :city="placeholdersCity.city"
                      :area="placeholdersCity.area"
                      @selected="getAreaCity"
                      />
                  </div>
                  <div class="type_PCD_list">
                    <div v-for="(item,index) in outletsList" :key="index" class="type_PCD_item">
                      <div class="PCD_item_name">
                        {{ item.name }}
                      </div>
                      <div class="PCD_item_radio">
                        <el-radio v-model="outletsId" :label="item.id">&nbsp;</el-radio>
                      </div>
                    </div>
                  </div>
                  <div class="type_PCD_btn">
                    <div @click="outletsBtn">确定</div>
                  </div>
                </div>
                <li class="imageAndInput">
                  <div class="imageAndInput-input">
                    <p>门牌照</p>
                    <el-input v-model="doorImgS.length==0?'':doorImgS[0].url" style="width:700px;" disabled />
                    <div class="buttn">更改图片</div>
                  </div>
                  <el-upload
                      :action="uploadUrl"
                      list-type="picture-card"
                      :on-remove="RemoveDoor"
                      :on-success="successDoor"
                      :limit="1"
                      :on-exceed="prompt"
                      :file-list="doorImgS"
                      style="margin-left:7em"
                     >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p>营业执照</p>
                  <el-input v-model="licenseImgS.length==0?'':licenseImgS[0].url" style="width:700px;" disabled />
                  <div class="buttn">更改图片</div>
                </div>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture-card"
                    :on-remove="RemoveLicense"
                    :on-success="successLicense"
                    :limit="1"
                    :on-exceed="prompt"
                    :file-list="licenseImgS"
                    style="margin-left:7em"
                    >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p>法人身份证</p>
                  <el-input v-model="IDcardFrontG.length==0?'':IDcardFrontG[0].url" style="width:700px;" disabled />
                  <div class="buttn">更改图片</div>
                </div>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture-card"
                    :on-remove="RemoveIDcardFront"
                    :on-success="successIDcardFront"
                    :limit="1"
                    :on-exceed="prompt"
                    :file-list="IDcardFrontG"
                    style="margin-left:7em"
                    >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
              <li class="imageAndInput">
                <div class="imageAndInput-input">
                  <p />
                  <el-input v-model="IDcardBackG.length==0?'':IDcardBackG[0].url" style="width:700px;" disabled />
                  <div class="buttn">更改图片</div>
                </div>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture-card"
                    :on-remove="RemoveIDcardBack"
                    :on-success="successIDcardBack"
                    :limit="1"
                    :on-exceed="prompt"
                    :file-list="IDcardBackG"
                    style="margin-left:7em"
                    >
                  <i class="el-icon-plus" />
                </el-upload>
              </li>
            </ul>
            <div class="save-modify" @click="basicT = true">保存修改</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分账管理" name="dividend">
          <div class="module" style="border:0">
            <div class="module-title">现金消费分账</div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账比例</div>
                  <el-input v-model="input1" class="module-w120" maxlength="10" />
                  <el-select v-model="value1" class="module-w70">
                    <el-option v-for="(item,index) in money" :key="index" :value="item" :label="item" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input2" class="module-w120" maxlength="10" />
                  <el-select v-model="value2" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">手续费</div>
                <el-input v-model="input3" class="module-w400" maxlength="10" />
                <el-select v-model="value3" class="module-w70">
                  <el-option v-for="(item,index) in money" :key="item.index" :value="item" />
                </el-select>
              </div>
              <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">免手续费金额区间</div>
                <el-input v-model="input4" class="module-w300">
                  <template slot="prepend">开始金额￥</template>
                </el-input>
                <el-input v-model="input5" class="module-w300">
                  <template slot="prepend">结束金额￥</template>
                </el-input>
              </div>
              <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
                例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
            </div>
          </div>
          <div class="module">
            <div class="module-title">通用会员卡分账</div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">
                    <div>分账比例</div>
                    <p>(500张会员卡前)</p>
                  </div>
                  <el-input v-model="input6" class="module-w120" maxlength="10" />
                  <el-select v-model="value4" class="module-w70">
                    <el-option v-for="(item,index) in money" :key="item.index" :value="item" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input7" class="module-w120" maxlength="10" />
                  <el-select v-model="value5" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">
                    <div>分账比例</div>
                    <p>(500张会员卡后)</p>
                  </div>
                  <el-input v-model="input8" class="module-w120" maxlength="10" />
                  <el-select v-model="value6" class="module-w70">
                    <el-option v-for="(item,index) in money" :key="item.index" :value="item" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input9" class="module-w120" maxlength="10" />
                  <el-select v-model="value7" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">手续费</div>
                <el-input v-model="input10" class="module-w400" maxlength="10" />
                <el-select v-model="value8" class="module-w70">
                  <el-option v-for="(item,index) in money" :key="item.index" :value="item" />
                </el-select>
              </div>
              <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">免手续费金额区间</div>
                <el-input v-model="input11" class="module-w300">
                  <template slot="prepend">开始金额￥</template>
                </el-input>
                <el-input v-model="input12" class="module-w300">
                  <template slot="prepend">结束金额￥</template>
                </el-input>
              </div>
              <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
                例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
            </div>
          </div>
          <div class="module">
            <div class="module-title">专属会员卡分账</div>
            <div class="module-flex">
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账比例</div>
                  <el-input v-model="input13" class="module-w120" maxlength="10" />
                  <el-select v-model="value9" class="module-w70">
                   <el-option v-for="(item,index) in money" :key="item.index" :value="item" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易消费金额或百分比，默认或0则表示不分账</div>
              </div>
              <div>
                <div class="module-flex">
                  <div class="module-p6">分账时间</div>
                  <el-input v-model="input14" class="module-w120" maxlength="10" />
                  <el-select v-model="value10" class="module-w70">
                    <el-option v-for="item in time" :key="item.value" :value="item.value" />
                  </el-select>
                </div>
                <div class="module-description5">设置每笔交易分账时间，默认或0则表示即时分账</div>
              </div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">手续费</div>
                <el-input v-model="input15" class="module-w400" maxlength="10" />
                <el-select v-model="value11" class="module-w70">
                  <el-option v-for="(item,index) in money" :key="index" :value="item" />
                </el-select>
              </div>
              <div class="module-description10">佣金提现时,扣除的提现手续费.空为不扣除提现手续费</div>
            </div>
            <div>
              <div class="module-flex">
                <div class="module-p10">免手续费金额区间</div>
                <el-input v-model="input16" class="module-w300">
                  <template slot="prepend">开始金额￥</template>
                </el-input>
                <el-input v-model="input17" class="module-w300">
                  <template slot="prepend">结束金额￥</template>
                </el-input>
              </div>
              <div class="module-description10">当提现手续费金额在此区间内时,不扣除提现手续费. 结束金额必须大于开始金额才能生效<br>
                例如:设置开始金额0元,结束金额5元,只有提现手续费金额高于5元时,才扣除</div>
            </div>
          </div>
          <div class="module">
            <div class="module-title">分账账户</div>
            <div class="module-flex">
              <div class="module-p6">商户账号</div>
              <el-input v-model="input18" class="module-w400" maxlength="10" />
            </div>
          </div>
          <div class="save" @click="dividendT=true">确认保存</div>
        </el-tab-pane>
        <el-tab-pane label="下属设备" name="device">
          <div style="text-align:right;margin:20px 0">设备数量：{{ commandNumber }}</div>
          <el-row class="top">
            <el-col :span="3">设备名称</el-col>
            <el-col :span="4">编号</el-col>
            <el-col :span="4">使用情况</el-col>
            <el-col :span="3">所属省代</el-col>
            <el-col :span="3">所属市代</el-col>
            <el-col :span="3">洗车价格</el-col>
            <el-col :span="4">二维码</el-col>
          </el-row>
          <el-row v-for="(item,index) in command" :key="index" type="flex" align="middle">
            <el-col :span="3">{{ item.terminal_code }}</el-col>
            <el-col :span="4">{{ item.number }}</el-col>
            <el-col :span="4">
              <div v-if="item.status==1" style="color:#00BC3F;font-weight:700">空闲中</div>
              <div v-else-if="item.status==2" style="color:#d80000;font-weight:700">机器故障</div>
              <div v-else-if="item.status==3" style="color:#FF9900;font-weight:700">使用中</div>
              <div v-else-if="item.status==4" style="color:#7e7e7e;font-weight:700">设备离线</div>
            </el-col>
            <el-col :span="3">{{ item.proname }}</el-col>
            <el-col :span="3">{{ item.cityname }}</el-col>
            <el-col :span="3">{{ item.money }}
              <svg-icon icon-class="hb" @click="CarWashPriceDetails(item.id)" />
            </el-col>
            <el-col :span="4">
               <img :src="item.picture"><i class="el-icon-download" style="cursor: pointer" @click="download(item.picture,item.terminal_code)" />
            </el-col>
          </el-row>
           <el-pagination
            :current-page.sync="commandPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="commandTotal"
            background
            @current-change="getSubordinateEquipment"
            />
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="consumption">
          <div class="module-condition">
            <el-select v-model="consumptionV" @change="getOutletsConsumption(1)">
              <el-option v-for="item in consumption" :key="item.value" :value="item.value" />
            </el-select>
            <el-select v-model="searchTimeV" style="margin:0 20px;" @change="getOutletsConsumption(1)">
              <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
            </el-select>
            <el-date-picker
            v-model="consumptionTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :clearable="false"
            @change="getOutletsConsumption(1)"
            />
          </div>
          <el-row class="top">
            <el-col :span="2">消费顾客</el-col>
            <el-col :span="4">开卡时间</el-col>
            <el-col :span="2">消费金额</el-col>
            <el-col :span="5">订单号</el-col>
            <el-col :span="3">消费项目</el-col>
            <el-col :span="4">会员卡号</el-col>
            <el-col :span="4">消费情况</el-col>
          </el-row>
          <el-row class="body" v-for="(item,index) in consumptionList" :key="index">
            <el-col :span="2">{{ item.realname!==''?item.realname:'无' }}</el-col>
            <el-col :span="4">{{ item.created_at!==''?item.created_at:'无' }}</el-col>
            <el-col :span="2">{{ item.money!==''?item.money:'无' }}</el-col>
            <el-col :span="5">{{ item.order_number!==''?item.order_number:'无' }}</el-col>
            <el-col :span="3">{{ item.content!==''?item.content:'无' }}</el-col>
            <el-col :span="4">{{ item.card_number?item.card_number:'无' }}</el-col>
            <el-col :span="4">
              <div v-show="item.status=='1'">已完成</div>
              <div v-show="item.status=='0'">未完成</div>
            </el-col>
          </el-row>
          <el-pagination
            :current-page.sync="consumptionPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="consumptionTotal"
            background
            @current-change="getOutletsConsumption"
            />
        </el-tab-pane>
        <el-tab-pane label="会员记录" name="member">
          <div class="module-condition">
            <el-select v-model="memberSearchTimeV" style="margin:0 20px 0 0;" @change="getOutletsMember(1)">
              <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
            </el-select>
            <el-date-picker
            v-model="memberTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :clearable="false"
            @change="getOutletsMember(1)"
            />
          </div>
          <el-row class="top">
            <el-col :span="4">会员姓名</el-col>
            <el-col :span="4">开通时间</el-col>
            <el-col :span="4">消费金额</el-col>
            <el-col :span="4">卡号</el-col>
            <el-col :span="4">会员卡类型</el-col>
            <el-col :span="4">剩余次数</el-col>
          </el-row>
          <el-row class="body" v-for="(item,index) in memberList" :key="index">
            <el-col :span="4">{{ item.nickname!==null?item.nickname:'无' }}</el-col>
            <el-col :span="4">{{ item.start_time!==''?item.start_time:'无' }}</el-col>
            <el-col :span="4">{{ item.money!==''?item.money:'无' }}</el-col>
            <el-col :span="4">{{ item.card_number?item.card_number:'无' }}</el-col>
            <el-col :span="4">{{ item.title!==''?item.title:'无' }}</el-col>
            <el-col :span="4">{{ item.surplus_number!==''?item.surplus_number:'无' }}</el-col>
          </el-row>
          <el-pagination
            :current-page.sync="memberPage"
            :page-size="10"
            layout="prev, pager, next,jumper"
            :total="memberTotal"
            background
            @current-change="getOutletsMember"
            />
        </el-tab-pane>
        <el-tab-pane label="结算记录" name="settlement">
          <div class="module-flex" style="justify-content: space-between;">
            <div class="module-condition">
              <el-select v-model="settlementV" @change="getOutletsSettlement(1)">
                <el-option v-for="item in settlement" :key="item.value" :value="item.value" />
              </el-select>
              <el-select v-model="settlementSearchTimeV" style="margin:0 20px;" @change="getOutletsSettlement(1)">
                <el-option v-for="item in searchTime" :key="item.value" :value="item.value" />
              </el-select>
              <el-date-picker
                v-model="settlementTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                @change="getOutletsSettlement(1)"
                />
            </div>
            <div class="module-flex">
              <div style="margin: 1.1em 20px 0;">总收入：{{ income }}</div>
              <div>
                <div>已结算：{{ already }}</div>
                <div>待结算：{{ generation }}</div>
              </div>
            </div>
          </div>
          <el-row class="top">
            <el-col :span="5">结算类型</el-col>
            <el-col :span="4">佣金</el-col>
            <el-col :span="5">消费时间</el-col>
            <el-col :span="5">结算时间</el-col>
            <el-col :span="5">状态</el-col>
          </el-row>
          <el-row class="body" v-for="(item,index) in settlementList" :key="index">
            <el-col :span="5">
              <div v-show="item.type=='1'">现金洗车</div>
              <div v-show="item.type=='2'">会员卡月结</div>
            </el-col>
            <el-col :span="4">{{ item.money!==''?item.money:'无' }}</el-col>
            <el-col :span="5">{{ item.consumer_at!==''?item.consumer_at:'无' }}</el-col>
            <el-col :span="5">{{ item.created_at!==''?item.created_at:'无' }}</el-col>
            <el-col :span="5">
              <div v-show="item.status=='0'">支付失败</div>
              <div v-show="item.status=='1'">待结算</div>
              <div v-show="item.status=='2'">已结算</div>
            </el-col>
          </el-row>
          <el-pagination
            :current-page.sync="settlementPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="settlementTotal"
            background
            @current-change="getOutletsSettlement"
            />
        </el-tab-pane>
        <el-tab-pane label="管理账号" name="account">
          <el-row class="top">
            <el-col :span="5">管理员姓名</el-col>
            <el-col :span="4">手机号</el-col>
            <el-col :span="5">账号</el-col>
            <el-col :span="5">添加时间</el-col>
            <el-col :span="5">操作</el-col>
          </el-row>
          <el-row class="body" v-for="(item,index) in accountList" :key="index" type="flex" align="middle">
            <el-col :span="5">{{ item.realname!==''?item.realname:'无' }}</el-col>
            <el-col :span="4">{{ item.phone!==''?item.phone:'无' }}</el-col>
            <el-col :span="5">{{ item.username!==''?item.username:'无' }}</el-col>
            <el-col :span="5">{{ item.created_at!==''?item.created_at:'无' }}</el-col>
            <el-col :span="5" class="module-F25">
              <svg-icon icon-class="hb" @click="goModify(item.uid)" />
              <svg-icon icon-class="ljt" @click="deleteOutletsW(item.uid)" />
            </el-col>
          </el-row>
          <el-pagination
            :current-page.sync="accountPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="accountTotal"
            background
            @current-change="getOutletsAccount"
            />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="提示" :visible.sync="basicT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="basicT = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dividendT" width="30%">
      <span style="font-size:20px;">是否确定保存?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dividendT = false">取 消</el-button>
        <el-button type="primary" @click="setOutletsS">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deleteOutlets" width="30%">
      <span style="font-size:20px;">是否确定删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteOutlets = false">取 消</el-button>
        <el-button type="primary" @click="deleteOutletsAccount">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 经纬度选择 -->
    <el-dialog title="经纬度选择" :visible.sync="mapDisplay" width="70%">
      <div class="address-search">
        <p>地址搜索</p>
        <el-input id="keyword" v-model="address" style="width:320px;margin:0 20px;" />
        <el-button @click="searchKeyword">搜索</el-button>
      </div>
      <div id="container" style="width:100%;height:500px;" />
    </el-dialog>
    <!-- 修改洗车价钱 -->
    <el-dialog title="洗车价钱" :visible.sync="dialogVisible" width="50%">
      <div>原价钱:
        <span>{{ moneyText }}</span>
      </div>
      <span>修改洗车价钱</span>
      <input v-model="moneyInput"></input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ModifyPriceSave">确 定</el-button>
      </span>
    </el-dialog>
    <div v-show="addIn===1" class="addbtn" @click="goAdd">新增网点管理员</div>
  </div>
</template>

<script>
import {
    getOutletsBasic, // 获取网点详情资料
    DotMarket, // 网点选择省代
    saveOutletsData, // 修改网点资料
    getOutletsSplit,  // 获取网点分账详情
    setOutletsSplit,  // 修改网点分账详情
    getOutletsConsumption,  // 获取网点消费记录
    getOutletsMember, // 获取网点会员记录
    getOutletsSettlement, // 结算记录
    getOutletsAccount,
    deleteOutletsAccount,  //删除账号管理员
    getSubordinateEquipment, // 获取下属设备
    CarWashPrice, // 洗车价钱详情
    ModifyPrice //修改洗车价格
} from '@/api/user.js'
import FileSaver from 'file-saver/src/FileSaver.js'
export default {
    data() {
        return {
            activeName: 'basic', // 第一个标签页
            total: 0, // 捐款记录总条数
            // radio: '1',
            phone: '', // 手机
            name: '', // 名字
            type:'',  //所属代理
            shopName: '', // 网点名字
            address: '', // 网点地址
            outletsId: '',       // 所属市代id
            placeholdersCity: {
                province: '省', // 选择省
                city: '市', // 选择市
                area: '区' // 选择区
            },
            outletsStatus: false,  // 市代选择是否显示
            outletsList: [],      // 市代列表
            areaSelectStatus: false,  // 地区选择是否显示
            basicT: false, // 修改询问弹窗
            dividendT: false, // 修改询问弹窗
            door: false,
            doorImgS: [],
            license: false,
            licenseImgS: [],
            id: '',
            form: {
                latitude: '', // 纬度
                longitude: '' // 经度
            },
            mapDisplay: true, // 地图弹窗的显示
            markers: [],	// 检索信息
            IDcard: [],
            IDcardFront: false,
            IDcardFrontG: [],
            IDcardBack: false,
            IDcardBackG: [],
            placeholders: {
                province: '浙江省', // 选择省
                city: '杭州市', // 选择市
                area: '余杭区' // 选择区
            },
            money: ['元','%'],
            searchTime: [{ value: '不按时间' }, { value: '消费时间' }],
            time: [{ value: '天' }, { value: '月' }],
            consumption: [{ value: '消费类型' }, { value: '普通洗车' }, { value: '会员洗车' }, { value: '开通会员' }],
            consumptionTime: [], // 消费记录时间数组
            consumptionTimeS: '', // 消费记录开始时间
            consumptionTimeE: '', // 消费记录结束时间
            consumptionV: '消费类型', // 消费记录
            consumptionPage: 1, // 消费记录当前页码
            consumptionTotal: 0, // 消费记录总条数
            consumptionList: [], // 消费记录列表
            searchTimeV: '不按时间', // 消费记录
            memberTime: [], // 会员记录时间数组
            memberTimeS: '', // 会员记录开始时间
            memberTimeE: '', // 会员记录结束时间
            memberPage: 1, // 会员记录当前页码
            memberTotal: 0, // 会员记录总条数
            memberList: [], // 会员记录列表
            memberSearchTimeV: '不按时间', // 会员记录
            settlement: [{ value: '现金洗车' }, { value: '会员卡月结' }],
            settlementTime: [], // 结算记录时间数组
            settlementTimeS: '', // 结算记录开始时间
            settlementTimeE: '', // 结算记录结束时间
            settlementV: '消费类型', // 结算记录
            settlementPage: 1, // 结算记录当前页码
            settlementTotal: 0, // 结算记录总条数
            settlementList: [], // 结算记录列表
            settlementSearchTimeV: '不按时间', // 结算记录
            accountPage: 1, // 管理账号当前页码
            accountTotal: 0, // 管理账号总条数
            accountList: [], // 管理账号列表
            value1: '元', // 现金分账比例单位
            value2: '天', // 现金分账时间单位
            value3: '%', // 现金手续费单位
            value4: '%', // 通用会员卡分账比例单位(500前)
            value5: '月', // 通用会员卡分账时间单位(500前)
            value6: '%', // 通用会员卡分账比例单位(500后)
            value7: '月', // 通用会员卡分账时间单位(500后)
            value8: '%', // 通用会员卡手续费单位
            value9: '%', // 专属会员卡分账比例单位
            value10: '月', // 专属会员卡分账时间单位
            value11: '%', // 专属会员卡手续费单位
            input1: '', // 现金分账比例
            input2: '', // 现金分账时间
            input3: '', // 现金手续费
            input4: '', // 现金免手续费开始
            input5: '', // 现金免手续费结束
            input6: '', // 通用会员卡分账比例(500前)
            input7: '', // 通用会员卡分账时间(500前)
            input8: '', // 通用会员卡分账比例(500后)
            input9: '', // 通用会员卡分账时间(500后)
            input10: '', // 通用会员卡手续费
            input11: '', // 通用会员卡免手续费开始
            input12: '', // 通用会员卡免手续费结束
            input13: '', // 专属会员卡分账比例
            input14: '', // 专属会员卡分账时间
            input15: '', // 专属会员卡手续费
            input16: '', // 专属会员卡免手续费开始
            input17: '', // 专属会员卡免手续费结束
            input18: '', // 商户账号
            addIn: 0,
            deleteOutlets: false,
            D_id: '',
            command: [], // 下属设备
            commandPage:1, // 下属设备 当前页
            commandTotal:0, //下属设备 总条数
            commandNumber:'',  // 下属设备 总数量
            dialogVisible: false, // 修改洗车价钱 删除询问框的是否显示
            price: '', // 原洗车价钱
            moneyText: '', // 现洗车价钱
            moneyInput:'', // 现输入的洗车价钱
            m_id:'',   //当前修改金额id
            uid:'',  //当前点击管理账户的id
            agid:'',    //当前市代
            income:'', //总收入
            generation:'', // 代结算
            already:'',  // 已结算
        }
    },
    mounted() {
        this.mapDisplay = false
        this.id = this.$route.query.id
    },
    created() {
        this.id = this.$route.query.id
        this.getBasic(this.id)
        this.getOutletsS(this.id)
        this.getOutletsConsumption(1)
        this.getOutletsMember(1)   // 会员记录
        this.getOutletsSettlement(1)
        this.getOutletsAccount(1)  // 管理员账号
        this.getSubordinateEquipment(1)  // 下属设备
    },
    methods: {
        // 所属代理的监听事件
        typeChange(e) {
            if (e == 0) {
                this.outletsStatus = false
                this.areaSelectStatus = false
            } else if (e == 1) {
                this.outletsStatus = true
                this.areaSelectStatus = false
            } else if (e == 2) {
                this.areaSelectStatus = true
                this.outletsStatus = false
            }
        },
        // 所属代理  省市区选择及获取所属
        getAreaCity(data) {
            this.placeholdersCity.province = data.province.value
            this.placeholdersCity.city = data.city.value
            this.placeholdersCity.area = data.area.value
            // console.log(this.placeholders.province)
            if (data.province.value == '省' || data.city.value == '市' || data.area.value == '区') {
                this.outletsList = []
            } else {
                DotMarket({
                    province: data.province.value,
                    city: data.city.value,
                    area: data.area.value
                })
                    .then(res => {
                        this.outletsList = res.result
                    })
            }
        },
        //选择完市代点击确定
        outletsBtn() {
            if (this.outletsId == '') {
                this.$message({
                    message: '您未选择市代',
                    type: 'warning'
                })
            } else {
                this.outletsStatus = false
                this.outletsList.forEach(val =>{
                    if (val.id == this.outletsId) {
                        this.agid = val.name
                    }
                })
            }
        },
        // // 获取省市区
        getArea(data) {
            this.placeholders.province = data.province.value
            this.placeholders.city = data.city.value
            this.placeholders.area = data.area.value
        },
        // 地图弹窗
        displayMap() {
            this.map()
            this.mapDisplay = true
        },
        // 上传超出上限的图片触发
        prompt() {
            this.$message('只能上传一张图片')
        },
        // 门牌
        successDoor(response) {
            // this.doorImgS[0].url = response.result.data
            this.doorImgS = [{
                url:response.result.data
            }]
        },
        RemoveDoor(file, fileList) {
            this.doorImgS = []
        },
        // 营业执照
        successLicense(response) {
            this.licenseImgS = [{
                url:response.result.data
            }]
        },
        RemoveLicense(file, fileList) {
            this.licenseImgs = []
        },
        // 身份证正面
        successIDcardFront(response) {
            this.IDcardFrontG = [{
                url:response.result.data
            }]
            console.log(this.IDcardFrontG[0].url)
        },
        RemoveIDcardFront(file, fileList) {
            this.IDcardFrontG = []
        },
        // 身份证反面
        successIDcardBack(response) {
            this.IDcardBackG = [{url:response.result.data}]
            console.log(this.IDcardBackG)
        },
        RemoveIDcardBack(file, fileList) {
            this.IDcardBackG = []
        },
        // 获取网点基本资料
        getBasic(id) {
            getOutletsBasic({ 'id': id }).then(res => {
                this.phone = res.result.phone
                this.name = res.result.realname
                this.shopName = res.result.name
                this.address = res.result.address
                if (res.result.house_images !== '') {
                    this.doorImgS.push({ url: res.result.house_images })
                }
                if (res.result.business_license !== '') {
                    this.licenseImgS.push({ url: res.result.business_license})
                }
                if (res.result.legal_person[0] !== '' && res.result.legal_person !== false) {
                    this.IDcardFrontG.push({ url:res.result.legal_person[0] })
                }
                if (res.result.legal_person[1] !== '' && res.result.legal_person !== false) {
                    this.IDcardBackG.push({ url:res.result.legal_person[1]})
                }
                this.form.latitude = res.result.latitude
                this.form.longitude = res.result.longitude
                this.placeholders.province = res.result.province
                this.placeholders.city = res.result.city
                this.placeholders.area = res.result.area
                this.type = res.result.type
                this.outletsId = res.result.agid
                this.agid = res.result.aname
            })
        },
        // 基本资料保存
        saveData(id) {
            saveOutletsData({
                'id': this.id,
                'name': this.shopName,
                'province': this.placeholders.province,
                'city': this.placeholders.city,
                'area': this.placeholders.area,
                'address': this.address,
                'longitude': this.form.longitude,
                'latitude': this.form.latitude,
                'realname': this.name,
                'phone': this.phone,
                'house_images': this.doorImgS[0].url,
                'business_license': this.licenseImgS[0].url,
                'legal_person': [this.IDcardFrontG[0].url,this.IDcardBackG[0].url],
                'type':this.type,
                'agid':this.outletsId
            }).then(res => {
                this.$message({
                    message: '修改网点基本资料成功',
                    type: 'success'
                })
                this.$router.go(-1)
            })
            this.basicT = false
        },
        // 加载地图
        map() {
            this.center = new qq.maps.LatLng(30.29203, 120.00457)
            this.QQmap = new qq.maps.Map(document.getElementById('container'), {
                center: this.center,
                zoom: 15
            })
            this.marker = new qq.maps.Marker({
                map: this.QQmap,
                position: this.center
            })
            qq.maps.event.addListener(this.QQmap, 'click', (event) => {
                var latLng = event.latLng
                this.form.longitude = latLng.lng
                this.form.latitude = latLng.lat
                this.$set(this.form)
                this.mapDisplay = false
            })
            this.latlngBounds = new qq.maps.LatLngBounds()
            this.searchService = new qq.maps.SearchService({
                // 设置搜索范围为北京
                location: '杭州',
                // 设置搜索页码为1
                pageIndex: 1,
                // 设置每页的结果数为5
                pageCapacity: 50,
                // 设置展现查询结构到infoDIV上
                panel: document.getElementById('infoDiv'),
                // 设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
                autoExtend: true,
                // 检索成功的回调函数
                complete: (results) => {
                    // 设置回调函数参数
                    var pois = results.detail.pois
                    for (var i = 0, l = pois.length; i < l; i++) {
                        var poi = pois[i]
                        // 扩展边界范围，用来包含搜索到的Poi点
                        this.latlngBounds.extend(poi.latLng)
                        this.marker = new qq.maps.Marker({
                            map: this.QQmap,
                            position: poi.latLng
                        })
                        this.marker.setTitle(i + 1)
                        this.markers.push(this.marker)
                        qq.maps.event.addListener(this.marker, 'click', (event) => {
                            var latLng = event.latLng
                            this.form.longitude = latLng.lng
                            this.form.latitude = latLng.lat
                            this.$set(this.form)
                            this.mapDisplay = false
                        })
                    }
                    // 调整地图视野
                    this.QQmap.fitBounds(this.latlngBounds)
                },
                // 若服务请求失败，则运行以下函数
                error: () => {
                    alert('出错了！')
                }
            })
        },
        // 清除地图上的marker
        clearOverlays(overlays) {
            var overlay
            while (overlay = overlays.pop()) {
                overlay.setMap(null)
            }
        },
        // 设置搜索的范围和关键字等属性
        searchKeyword() {
            var keyword = document.getElementById('keyword').value
            this.clearOverlays(this.markers)
            // 根据输入的城市设置搜索范围
            this.searchService.setLocation('杭州')
            // 根据输入的关键字在搜索范围内检索
            this.searchService.search(keyword)
        },
        // 获取分账记录
        getOutletsS(id) {
            getOutletsSplit({ 'id': id }).then(res => {
                if (res.result.cash !== null) {
                    this.input1 = res.result.cash.cash_scale
                    this.input2 = res.result.cash.cash_date
                    this.input3 = res.result.cash.cash_service_fee
                    this.input4 = res.result.cash.cash_start_money
                    this.input5 = res.result.cash.cash_end_money
                    this.value1 = res.result.cash.cash_scale_ === '0' ? '%' : '元'
                    this.value2 = res.result.cash.cash_date_type === '0' ? '天' : '月'
                    this.value3 = res.result.cash.cash_service_fee_type === '0' ? '%' : '元'
                }
                if (res.result.common !== null) {
                    this.input6 = res.result.common.common_card_scale
                    this.input7 = res.result.common.common_date
                    this.input8 = res.result.common.common_card_scale500
                    this.input9 = res.result.common.common_date500
                    this.input10 = res.result.common.common_service_fee
                    this.input11 = res.result.common.common_start_money
                    this.input12 = res.result.common.common_end_money
                    this.value4 = res.result.common.common_card_scale_type === '0' ? '%' : '元'
                    this.value5 = res.result.common.common_date_type === '0' ? '天' : '月'
                    this.value6 = res.result.common.common_card_scale500_type === '0' ? '%' : '元'
                    this.value7 = res.result.common.common_date500_type === '0' ? '天' : '月'
                    this.value8 = res.result.common.common_service_fee_type === '0' ? '%' : '元'
                }
                if (res.result.exclusive !== null) {
                    this.input13 = res.result.exclusive.exclusive_card_scale
                    this.input14 = res.result.exclusive.exclusive_date
                    this.input15 = res.result.exclusive.exclusive_service_fee
                    this.input16 = res.result.exclusive.exclusive_start_money
                    this.input17 = res.result.exclusive.exclusive_end_money
                    this.value9 = res.result.exclusive.exclusive_card_scale_type === '0' ? '%' : '元'
                    this.value10 = res.result.exclusive.exclusive_date_type === '0' ? '天' : '月'
                    this.value11 = res.result.exclusive.exclusive_service_fee_ === '0' ? '%' : '元'
                }
                if (res.result.account !== null) {
                    this.input18 = res.result.account
                }
            })
        },
        setOutletsS(id) {
            if (this.input1 === '' || this.input2 === '' || this.input3 === '' || this.input4 === '' || this.input5 === '' || this.input6 === '' || this.input7 === '' || this.input8 === '' || this.input9 === '' || this.input10 === '' || this.input11 === '' || this.input12 === '' || this.input13 === '' || this.input14 === '' || this.input15 === '' || this.input16 === '' || this.input17 === '' || this.input18 === '') {
                this.$message({
                    message: '必填项不能为空',
                    type: 'warning'
                })
                return
            }
            // 修改分账
            setOutletsSplit({
                'id': this.id,
                'aid': this.$route.query.id,
                'cash_scale': this.input1,
                'cash_scale_type': this.value1 === '元' ? '1' : '0',
                'cash_date': this.input2,
                'cash_date_type': this.value2 === '月' ? '1' : '0',
                'cash_service_fee': this.input3,
                'cash_service_fee_type': this.value3 === '元' ? '1' : '0',
                'cash_start_money': this.input4,
                'cash_end_money': this.input5,
                'common_card_scale': this.input6,
                'common_card_scale_type': this.value4 === '元' ? '1' : '0',
                'common_date': this.input7,
                'common_date_type': this.value5 === '月' ? '1' : '0',
                'common_card_scale500': this.input8,
                'common_card_scale500_type': this.value6 === '元' ? '1' : '0',
                'common_date500': this.input9,
                'common_date500_type': this.value7 === '月' ? '1' : '0',
                'common_service_fee': this.input10,
                'common_service_fee_type': this.value8 === '元' ? '1' : '0',
                'common_start_money': this.input11,
                'common_end_money': this.input12,
                'exclusive_card_scale': this.input13,
                'exclusive_card_scale_type': this.value9 === '元' ? '1' : '0',
                'exclusive_date': this.input14,
                'exclusive_date_type': this.value10 === '月' ? '1' : '0',
                'exclusive_service_fee': this.input15,
                'exclusive_service_fee_type': this.value11 === '元' ? '1' : '0',
                'exclusive_start_money': this.input16,
                'exclusive_end_money': this.input17,
                'account': this.input18
            }).then(res => {
                this.$message({
                    message: '修改分账成功',
                    type: 'success'
                })
            })
            this.dividendT = false
        },
        // 网点的消费记录
        getOutletsConsumption(pages) {
            this.consumptionTimeS = this.consumptionTime[0]
            this.consumptionTimeE = this.consumptionTime[1]
            getOutletsConsumption({
                'id': this.id,
                'pages': pages,
                'content': this.consumptionV === '消费类型' ? '' : this.consumptionV,
                'time': this.searchTimeV === '不按时间' ? 1 : 2,
                'start_time': this.consumptionTimeS,
                'end_time': this.consumptionTimeE
            }).then(res => {
                this.consumptionList = res.result.model
                this.consumptionTotal = res.result.count - 0
            })
        },
        //网点 下属设备
        getSubordinateEquipment(id) {
            getSubordinateEquipment({ 'id':this.id }).then(res => {
                this.command = res.result.model
                this.commandTotal = res.result.count - 0
                this.commandNumber = res.result.count
            })
        },
        // 洗车价钱详情
        CarWashPriceDetails(id) {
            this.dialogVisible = true
            CarWashPrice({ 'id': this.id }).then(res => {
                console.log(res.result)
                this.moneyText = res.result.money
                // this.price = res.result.price
            })
        },
        // 修改洗车价格
        ModifyPriceSave() {
            ModifyPrice({
                'id': this.id,
                'money': this.moneyInput
            }).then(res => {
                this.$message({
                    message: '修改洗车价格成功',
                    type: 'success'
                })
                this.getSubordinateEquipment(1)
            })
            this.dialogVisible = false
            this.moneyInput = ''
        },
        // 会员记录
        getOutletsMember(pages) {
            this.memberTimeS = this.memberTime[0]
            this.memberTimeE = this.memberTime[1]
            getOutletsMember({
                'id': this.id,
                'pages': pages,
                'start_time': this.memberTimeS,
                'end_time': this.memberTimeE,
                //'time': this.memberSearchTimeV === '不按时间' ? 1 : 2
            }).then(res => {
                this.memberList = res.result.model
                this.memberTotal = res.result.count - 0
            })
        },
        //结算记录
        getOutletsSettlement(pages) {
            this.settlementTimeS = this.settlementTime[0]
            this.settlementTimeE = this.settlementTime[1]
            getOutletsSettlement({
                'id': this.id,
                'pages': pages,
                'type': this.settlementV === '消费类型' ? '' : this.settlementV,
                // 'time': this.settlementSearchTimeV === '不按时间' ? 1 : 2,
                'start_time': this.settlementTimeS,
                'end_time': this.settlementTimeE
            }).then(res => {
                this.settlementList = res.result.model
                this.settlementTotal = res.result.count - 0
                this.income = res.result.income
                this.generation = res.result.generation
                this.already = res.result.already
            })
        },
        // 账户管理
        getOutletsAccount(pages) {
            getOutletsAccount({
                'id': this.id,
                'pages': pages
            }).then(res => {
                this.accountList = res.result.model
                this.accountTotal = res.result.count - 0
            })
        },
        addIns(tab) {
            if (tab.name === 'account') {
                this.addIn = 1
            } else {
                this.addIn = 0
            }
        },
        // 添加账户
        goAdd() {
            this.$router.push({ path: '/user/outlets/addAccount', query: { id: this.id }})
        },
        // 修改账户
        goModify(id) {
            this.$router.push({ path: '/user/outlets/modifyAccount', query: { id: id }})
        },
        // 删除账户
        deleteOutletsAccount(uid) {
            deleteOutletsAccount({
                'uid': this.uid
            }).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.deleteOutlets = false
                this.getOutletsAccount(1)
            })
        },
        deleteOutletsW(uid) {
            this.uid = uid
            this.deleteOutlets = true
        },
        download(img,name) {
            FileSaver.saveAs(img, name)
        }

    }
}
</script>
<style lang="scss">
.el-tabs__content {
  overflow: unset;
}
.el-tabs__item {
  color: #222222;
  font-size: 20px;
  font-weight: bold;
}
.el-tabs__item.is-active {
  color: #222222;
}
.el-tabs__active-bar {
  background-color: #2ca9fc;
}
.el-tabs__item:hover {
  color: #2ca9fc;
}
</style>
<style lang="scss" scoped>
.module {
  border-top: 1px solid #cfcdcd;
  margin-bottom: 20px;
  &-condition {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &-title {
    font-weight: bold;
    margin: 20px 0;
  }
  &-flex {
    display: flex;
    align-items: center;
  }
  &-p6 {
    width: 6em;
    text-align: right;
    p {
      font-size: 12px;
      color: #5a5a5a;
    }
  }
  &-p10 {
    width: 10em;
    text-align: right;
  }
  &-w120 {
    width: 120px;
    margin: 0 0.5em 0 1em;
  }
  &-w300 {
    width: 300px;
    margin: 0 0.5em 0 1em;
  }
  &-w400 {
    width: 400px;
    margin: 0 0.5em 0 1em;
  }
  &-w70 {
    width: 70px;
  }
  &-description5 {
    margin: 10px 0 30px 7em;
    color: #979797;
  }
  &-description10 {
    margin: 10px 0 30px 12em;
    color: #979797;
  }
  &-F25 {
    font-size: 25px;
    color: #333333;
    svg {
      cursor: pointer;
    }
  }
}
.addbtn {
  color: white;
  background-color: #2ca9fc;
  padding: 12px 12px;
  width: 160px;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}
.save {
  width: 140px;
  background-color: #2ca9fc;
  color: white;
  border-radius: 5px;
  text-align: center;
  padding: 8px 12px;
  margin: 50px auto 0;
  cursor: pointer;
}
.imageAndInput {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  &-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.address-search {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.buttn {
  background-color: #2ca9fc;
  padding: 8px 13px;
  color: white;
  cursor: pointer;
  border-radius: 2px;
  margin-left: 15px;
}
.w200 {
  width: 200px;
}
.w130 {
  width: 130px;
}
.w700 {
  width: 700px;
}
.el-col {
  text-align: center;
}
.el-row {
  padding: 10px 0;
  border: 1px solid #cbcbcb;
  border-top: 1px solid white;
  color: #757575;
}
.el-row:hover {
  border: 1px solid #2ca9fc;
}
.save-modify {
  border-radius: 5px;
  background-color: #2ca9fc;
  padding: 8px 30px;
  font-size: 20px;
  color: white;
  width: 180px;
  text-align: center;
  margin: 40px auto 20px;
  cursor: pointer;
}
.title {
  margin: 30px;
  font-size: 20px;
  font-weight: bold;
}
.el-pagination {
  right: 0;
  position: absolute;
  bottom: 0;
}
.photoDistance {
  margin-top: 100px;
}
.half {
  width: 50%;
}
.top {
  border-top: 1px solid #cbcbcb;
  font-size: 20px;
  color: #23262f;
}
.top:hover {
  border: 1px solid #2ca9fc;
}
.body{
    height: 64px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    .el-col{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
li {
  list-style-type: none;
}
.dashboard {
  &-container {
    margin: 15px 20px;
    min-height: calc(100vh - 90px);
  }
  &-text {
    font-size: 30px;
    font-weight: bold;
  }
  &-management {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    &-search {
      display: flex;
      align-items: center;
      &-input {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        background-color: white;
        border-radius: 25px;
        font-size: 35px;
        color: #b1b1b1;
        input {
          width: 200px;
          border: 0;
          outline: none;
          font-size: 16px;
          margin-left: 5px;
        }
      }
      &-buttom {
        background-color: #2ca9fc;
        color: white;
        padding: 8px 15px;
        border-radius: 2px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}
.user {
  color: #333333;
  background-color: white;
  padding: 20px 30px;
  min-height: calc(100vh - 200px);
  .el-tab-pane{
        min-height: calc(100vh - 300px);
        padding-bottom: 50px;
  }
}
.basic {
  &-information {
    position: relative;
    font-size: 20px;
    line-height: 23px;
    &-project {
      text-align: right;
      margin: 50px 50px 0 50px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          width: 6em;
          margin-right: 1em;
        }
      }
    }
  }
}
img {
  width: 60px;
  height: 60px;
}
.type_PCD {
  width: 600px;
  padding: 14px 28px;
  margin-top: 20px;
  margin-left: 100px;
  box-sizing: border-box;
  border: 1px solid #e8e7e7;
  border-radius: 20px;
  text-align: left;
  .type_PCD_title {
    color: #7c7c7c;
    font-size: 16px;
    margin-bottom: 20px;
  }
  .type_PCD_list {
    .type_PCD_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
  }
  .type_PCD_btn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    > div {
      width: 80px;
      height: 24px;
      text-align: center;
      border-radius: 16px;
      line-height: 24px;
      font-size: 16px;
      color: #f1f1f1;
      background: #2ca9fc;
      cursor: pointer;
    }
  }
}
</style>
