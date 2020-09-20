<template>
  <div class="login">
    <div class="header">
        <h3>账号登录</h3>
    </div>
    <van-form @submit="onSubmit">
        <van-field
            v-model="form.telephone"
            clearable
            name="手机号码"
            placeholder="请输入您的手机号码"
            :rules="[
                { required: true, message: '请填写手机号码' },
                { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请输入正确的手机号码' }
            ]"
        />
        <van-field
            v-model="form.password"
            clearable
            type="password"
            name="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div>
            <van-button 
                round 
                block 
                native-type="submit"
                color="#40E0D0"
                style="margin-top: 20px;"
            >
            提交
            </van-button>
        </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Form, Field, Button } from 'vant';

@Component({
    components: {
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
    }
})
export default class Login extends Vue {
    private form: object = {
        telephone: null,
        password: null
    }

    onSubmit(values: any) {
      console.log('submit', values);
      this.$router.push({ path: '/home'})
    }
}
</script>

<style lang="scss" scoped>
.login {
    padding: 30px 20px;
}
</style>