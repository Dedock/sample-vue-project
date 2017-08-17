<template>
<div class="wrapper">
  <div class="filter-bar">
    <span class="label">Search by name</span>
    <input v-model="filterValue" />
    <span class="label">Sort by</span>
    <select v-model="sortBy">
      <<option value="default">default</option>
      <<option value="age">age</option>
      <<option value="city">city</option>
    </select>
    <router-link class="add" :to="{ name: 'Add User' }">Add User</router-link>
  </div>
  <div class="table">
    <div class="table-header">
      <span class="name">Name</span>
      <span class="age">Age</span>
      <span class="delete">Delete</span>
    </div>

    <div class="table-wrapper" v-if="changedList.length > 0">
      <paginate name="users" :list="changedList">

        <li class="row" v-for="(item, index) in paginated('users')">
          <router-link :to="{ name: 'User', params: { id: item.id, user: item } }" v-if="item">
            <span class="name">{{ item.name }}</span>
            <span class="age">({{ item.age }})</span>
            </router-link>
            <span class="delete" @click=deleteUser(item.id) v-if="item.id">X</span>
        </li>

      </paginate>
      <paginate-links for="users" :show-step-links="true"></paginate-links>
    </div>
    <p v-else>
      There is no user with such name
    </p>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      paginate: ['users'],
      // users: [{
      //   name: 'ne on',
      //   age: 13,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'olo',
      //   age: 12,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'ne to',
      //   age: 45,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'olo',
      //   age: 12,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'ne to',
      //   age: 45,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'olo',
      //   age: 12,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'ne to',
      //   age: 45,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'olo',
      //   age: 12,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'ne to',
      //   age: 45,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // },
      // {
      //   name: 'olo',
      //   age: 12,
      //   city: 'kif',
      //   img: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/03/03dbe511390bcc7f310c1f8a21e0d821b790117e_full.jpg'
      // }],
      filterValue: '',
      sortBy: 'default'
    }
  },
  computed: {
    ...mapState({
      users: state => state.users
    }),
    changedList () {
      if (this.users) {
        let tempList = []
        if (this.filterValue !== '') {
          tempList = this.users.filter(item => {
            return item.name.toLowerCase().indexOf(this.filterValue.toLowerCase()) !== -1
          })
        } else {
          tempList = this.users.slice()
        }
        if (this.sortBy === 'default') {
          return tempList
        } else if (this.sortBy === 'age') {
          return tempList.sort((a, b) => {
            return a.age > b.age
          })
        } else {
          return tempList.sort((a, b) => {
            return a.city > b.city
          })
        }
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions(['setUsers', 'removeUser']),
    deleteUser (user) {
      this.removeUser(user)
    }
  },
  mounted () {
    this.setUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wrapper {
  max-width: 1000px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
  text-align: left;
}

a {
  color: #42b983;
  display: flex;
}

.filter-bar {
  display: flex;
  justify-content: center;
}

.table-header {
  display: flex;
}

.name, .age, .delete {
  width: 100px;
  text-align: left;
}

.label, input, select, .add {
  padding: 0 15px;
}

.table {
  max-width: 500px;
  margin: 0 auto;
}

.row {
  display: flex;
}

.delete {
  cursor: pointer;
}
</style>
