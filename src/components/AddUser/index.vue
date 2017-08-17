<template>
<div class="add-wrapper">
  <div>
    <h3 class="">Add New User</h3>
  </div>
  <div class="panel-body">
    <form id="form" class="form" @submit.prevent="addUser">
      <div class="form-group">
        <label for="userId">Id:</label>
        <input type="text" id="userId" class="form-control" v-model="newUser.id">
      </div>
      <div class="form-group">
        <label for="userName">Name:</label>
        <input type="text" id="userName" class="form-control" v-model="newUser.name">
      </div>
      <div class="form-group">
        <label for="userAge">Age:</label>
        <input type="text" id="userAge" class="form-control" v-model="newUser.age">
      </div>
      <div class="form-group">
        <label for="userCity">City:</label>
        <input type="text" id="userCity" class="form-control" v-model="newUser.city">
      </div>
      <div class="form-group">
        <label for="userImg">Img:</label>
        <input type="text" id="userImg" class="form-control" v-model="newUser.img">
      </div>
      <input type="submit" class="btn btn-primary" value="Add User">
    </form>
  </div>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      newUser: {
        id: '',
        name: '',
        age: '',
        city: '',
        img: 'http://'
      }
    }
  },
  methods: {
    ...mapActions(['creatUser']),
    addUser () {
      const copyUser = Object.assign({}, this.newUser)
      this.$store.dispatch('creatUser', copyUser)
        .then(res => {
          this.newUser.id = ''
          this.newUser.name = ''
          this.newUser.age = ''
          this.newUser.city = ''
          this.newUser.img = 'http://'
          this.$router.push({ name: 'Main Page' })
        })
    }
  }
}
</script>
