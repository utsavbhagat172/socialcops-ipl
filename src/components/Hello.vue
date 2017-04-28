<template>
  <div class="hello">
    <h1>IPL</h1>
    <h2>History of IPL (2008-2016)</h2>
      <br></br>
      Matches won by teams in IPL 2008-2016<br></br>
      <line-chart :chart-data="g1values" :chart-labels="g1labels"></line-chart>
      <br></br>
      <bar-chart :chart-data="g2values" :chart-labels="g2labels"></bar-chart>
      <br></br>
      {{stadiums}}
      <br></br>
      Stats:
      <div class="flip" v-on:click="flipcard1 = !flipcard1"> 
        <div class="card" v-bind:class="{'flipped': flipcard1}"> 
            <div class="face front"> 
                No of times the toss winning team won the match.
            </div> 
            <div class="face back"> 
                <b>{{tosscount}}</b>
            </div> 
        </div> 
      </div> 
      <div class="flip" v-on:click="flipcard2 = !flipcard2"> 
        <div class="card" v-bind:class="{'flipped': flipcard2}"> 
            <div class="face front"> 
                No of times teams won after choosing to bat.
            </div> 
            <div class="face back"> 
                <b>{{battoss}}</b>
            </div> 
        </div> 
      </div> 
      <div class="flip" v-on:click="flipcard3 = !flipcard3"> 
        <div class="card" v-bind:class="{'flipped': flipcard3}"> 
            <div class="face front"> 
                No of times teams won after choosing to field.
            </div> 
            <div class="face back"> 
                <b>{{fieldtoss}}</b>
            </div> 
        </div> 
      </div> 
      <div v-for="match in matchesData">
          <br></br>Match {{match.id}} : {{ match.team1 }} vs {{match.team2}}, {{match.season}}
      </div>
  </div>
</template>

<script>

import matchesData from '../../API/matches.json'

import LineChart from '../js/LineChart.js'
import BarChart from '../js/BarChart.js'

export default {
  components: {
    LineChart,
    BarChart
  },
  name: 'hello',
  data () {
    let matchCount = matchesData.length
    let flags = []
    let teams = []
    let flags2 = []
    let stadiums = []
    let g1labels = []
    let g1values = []
    let g2labels = []
    let g2values = []
    g2values.batwins = []
    g2values.fieldwins = []
    g2values.ties = []
    let l = matchesData.length
    let i
    let tosscount = 0
    let battoss = 0
    let fieldtoss = 0
    let flipcard1 = false
    let flipcard2 = false
    let flipcard3 = false
    for (i = 0; i < l; i++) {
      if (matchesData[i].toss_winner === matchesData[i].winner) {
        tosscount++
        if (matchesData[i].toss_decision === 'bat') {
          battoss++
        }
        if (matchesData[i].toss_decision === 'field') {
          fieldtoss++
        }
      }
      if (flags[matchesData[i].team1]) {
        continue
      }
      flags[matchesData[i].team1] = true
      teams.push({name: matchesData[i].team1, wins: 0})
    }
    for (i = 0; i < l; i++) {
      if (flags2[matchesData[i].venue]) {
        continue
      }
      flags2[matchesData[i].venue] = true
      stadiums.push({name: matchesData[i].venue, batwins: 0, fieldwins: 0, ties: 0})
    }
    console.log(stadiums)
    for (let i = matchCount - 1; i >= 0; i--) {
      for (let j = 0, jLen = teams.length; j < jLen; j++) {
        if (teams[j].name === matchesData[i].winner) {
          teams[j].wins++
        }
      }
      for (let k = 0, kLen = stadiums.length; k < kLen; k++) {
        if (matchesData[i].result === 'normal') {
          if (matchesData[i].venue === stadiums[k].name) {
            if (matchesData[i].toss_decision === 'bat') {
              stadiums[k].batwins++
            }
            if (matchesData[i].toss_decision === 'field') {
              stadiums[k].fieldwins++
            }
          }
        }
        if (matchesData[i].result === 'tie') {
          if (matchesData[i].venue === stadiums[k].name) {
            stadiums[k].ties++
          }
        }
      }
    }
    for (i = 0, l = teams.length; i < l; i++) {
      g1labels.push(teams[i].name)
      g1values.push(teams[i].wins)
    }
    for (i = 0, l = stadiums.length; i < l; i++) {
      g2labels.push(stadiums[i].name)
      g2values.batwins.push(stadiums[i].batwins)
      g2values.fieldwins.push(stadiums[i].fieldwins)
      g2values.ties.push(stadiums[i].ties)
    }
    console.log(g2labels)
    console.log(g2values)
    return {
      matchesData: matchesData,
      teams: teams,
      g1labels: g1labels,
      g1values: g1values,
      tosscount: tosscount,
      battoss: battoss,
      fieldtoss: fieldtoss,
      stadiums: stadiums,
      flipcard1: flipcard1,
      flipcard2: flipcard2,
      flipcard3: flipcard3,
      g2labels: g2labels,
      g2values: g2values
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
.flip {
  -webkit-perspective: 800;
   width: 400px;
   height: 200px;
    position: relative;
    margin: 50px auto;
}
.flip .card.flipped {
  -webkit-transform: rotatex(-180deg);
}
.flip .card {
  width: 100%;
  height: 100%;
  -webkit-transform-style: preserve-3d;
  -webkit-transition: 0.5s;
}
.flip .card .face {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-backface-visibility: hidden ;
  z-index: 2;
    font-family: Georgia;
    font-size: 3em;
    text-align: center;
    line-height: 200px;
}
.flip .card .front {
  font-size: 16px;
  position: absolute;
  z-index: 1;
    background: black;
    color: white;
    cursor: pointer;
}
.flip .card .back {
  -webkit-transform: rotatex(-180deg);
    background: blue;
    background: red;
    color: black;
    cursor: pointer;
}
</style>
