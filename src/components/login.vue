<template>
  <div class="view login" v-if="state.username === ''">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to SoftChat</h1>
        <label for="username">Username</label>
        <input
            type="text"
            v-model="inputUsername"
            placeholder="Please enter you username..."/>
        <input type="submit" value="Login"/>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import state from '../store/state';

export default {
  name: "login",

  setup() {
    const inputUsername = ref('');

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    }

    return {
      inputUsername,
      Login,
      state
    }
  }
}

</script>

<style scoped>

</style>