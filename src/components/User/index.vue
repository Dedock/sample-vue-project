<template>
<div class="user-info">
  <img :src="$route.params.user.img" />
  <div class="info-wrapper">
    <p>
      {{ $route.params.user.name }}
    </p>
    <p>
      {{ $route.params.user.age }}
    </p>
    <p>
      {{ $route.params.user.city }}
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'User'
}
</script>

<style>
.user-info {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}
</style>
