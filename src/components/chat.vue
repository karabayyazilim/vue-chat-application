<template>
  <div class="view chat" v-if="state.username !== ''">
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>
    <section class="chat-box">
      <div
          v-for="message in state.messages"
          :key="message.key"
          :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>
    <footer>
      <form @submit.prevent="SendMessage">
        <input type="text" v-model="inputMessage" placeholder="Write a message..."/>
        <input type="submit" value="Send">
      </form>
    </footer>
  </div>
</template>

<script>
import {reactive, onMounted, ref} from 'vue';
import db from '../store/db';
import state from '../store/state';

export default {
  name: "chat",

  setup() {
    const inputUsername = ref('');
    const inputMessage = ref('');

    const Logout = () => {
      state.username = '';
    }

    const SendMessage = () => {
      const messagesRef = db.database().ref("messages");
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }

      const message = {
        username: state.username,
        content: inputMessage.value
      }

      messagesRef.push(message);
      inputMessage.value = "";
    }

    onMounted(() => {
      const messagesRef = db.database().ref("messages");

      messagesRef.on('value', snapshot => {
        const data = snapshot.val();
        let messages = [];
        if (data) {
          Object.keys(data).forEach(key => {
            messages.push({
              id: key,
              username: data[key].username,
              content: data[key].content
            })
          });
          state.messages = messages;
        }
      })
    });

    return {
      state,
      inputMessage,
      SendMessage,
      Logout
    }
  }
}

</script>

<style scoped>

</style>