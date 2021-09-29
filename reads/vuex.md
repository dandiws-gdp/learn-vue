---
marp: false
theme: gaia
---

# Vuex v3 

in usage with Vue 2 + typescript

----------

# Outline

### Intro
- Installation
- Usage

### Core Concepts

- State
- Getters
- Mutations
- Actions
- Modules
  - Namespacing

### Helpers
- mapState
- mapGetters
- mapMutations
- mapActions

----------

# Installation

Using npm or yarn, adding vuex in vue project is simply as :

```
npm install vuex
```
or
```
yarn add vuex
```

----------

# Usage in Vue 2

```ts
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  store,
})
```

----------

# State

```ts
new Vuex.Store({
  state: {
    count: 0
  },
})
```

Vue component has `$store` property that contains store object


```ts
export default Vue.extend({
  computed: {
    count() {
      return this.$store.state.count
    }
  },
})
```

----------
# Getters

Getters is like computed property, it calculated derivative state from original state.

instead of doing 

```ts
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

You should create a getter for `doneTodos`
```ts
Vuex.Store({
  state: {
    todos: [....]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

then use it in computed property like this

```ts
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodos.length
  }
}
```

or you can event create dedicated count getter like this

> note: a getter function receive getters variable in second argument , to access another getter in store

```ts
Vuex.Store({
  getters: {
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
```

then use it in computed property like this

```ts
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

----------
# Mutation

Mutation is a way to update store's state

To define a mutation

```ts
Vuex.Store({
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

To commit a mutation we can use `$store.commit` method 
```ts
export default Vue.extend({
  methods:{
    increment() {
      this.$store.commit('increment')
    }
  }
})
```

## Mutation with payload

```ts
Vuex.Store({
  mutations: {
    incrementBy (state, n: number) {
      state.count += n
    }
  }
})
```

Then use 

```ts
export default Vue.extend({
  data: function() {
    return {
      favoriteNumber: 3
    }
  },
  methods:{
    incrementByFavorite() {
      this.$store.commit('incrementBy', this.favoriteNumber)
    }
  }
})
```
----------

# Actions

Actions are similar to mutations, the differences being that:

- Instead of mutating the state, actions commit mutations.
- Actions can contain arbitrary asynchronous operations, (mutation do not).

```ts
Vuex.Store({
  actions: {
    incrementIfOdd(context) {
      if(context.state.count%2 === 1){
        context.commit('increment')
      }
    }
  }
})
```

## When to use mutation when to use actions?

- Update state directly only with mutation, actions `should` only commit a mutation
- Use actions for business logic
- Use actions if you need to run it asynchronusly, e.g. HTTP Request
