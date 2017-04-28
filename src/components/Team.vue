<template>
  <div class="team">
    <h1>IPL</h1>
    <h2>History of IPL (2008-2016)</h2>
      <div v-for="match in matchesData">
          <br></br>Match {{match.id}} : {{ match.team1 }} vs {{match.team2}}, {{match.season}}
      </div>
  </div>
</template>

<script>

import matchesData from '../../API/matches.json'

export default {
  name: 'team',
  data () {
    return {
      matchesData: matchesData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
