/* eslint-disable no-unused-vars */
import { createStore } from 'vuex'
import { auth, db } from '@/main.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { getDatabase, ref, set, push, onValue, get, child, remove, update } from 'firebase/database'

export default createStore({
  state () {
    return {
      arrayPizza: [],
      arrayProducts: [],
      costPizzas: 0,
      costProducts: 0,
      totalPrice: 0,
      addresses: [
        {
          id: 'id-' + Math.random().toString(16).slice(12),
          title: 'Адрес №1',
          street: 'Невский проспект',
          house: '103',
          flat: '8',
          address: 'Невский проспект 103, кв. 8',
          comment: 'Домофон не работает. Звоните с мобильного от подъезда'
        }
      ],
      addressFromCart: '',
      actualOrder: null,
      orders: [],
      modifyPizza: {},
      flagRedactPizza: 0,
      user: null,
      isAuth: false
    }
  },
  getters: {
    totalPriceOrder (state, getters) {
      const sum = state.costProducts + state.costPizzas
      state.totalPrice = sum
      return sum
    },
    getUserId (state) {
      return state.user
    },
    getAuthUser (state) {
      return state.isAuth
    },
    getAddress (state, getters) {
      return state.addresses.filter((item) => {
        return item.user === state.user
      })
    },
    getOrders (state) {
      return state.orders.filter((item) => {
        return item.user === state.user
      })
    },
    getActualOrder (state, getters) {
      return state.actualOrder
    }
  },
  mutations: {
    addPizza (state, payload) {
      // если пицаа новая то добовляем в массив, если это редактируемая пицца то заменяем элемент в массиве
      const value = state.arrayPizza.find(item => item.keyId === payload.keyId)
      if (typeof value === 'undefined') {
        state.arrayPizza.push(payload)
      } else {
        const ind = state.arrayPizza.findIndex(item => item.keyId === payload.keyId)
        state.arrayPizza.splice(ind, 1, payload)
      }
      // и сразу считаем итоговую стоимость всех пицц и вносим данный в стейт
      state.costPizzas = state.arrayPizza.reduce((sum, elem) => sum + elem.keyTotalPrice, 0)
      state.flagRedactPizza = 0
      for (const key in state.modifyPizza) {
        delete state.modifyPizza[key]
      }
    },
    // получаем данный сизмененной ценой и количеством пиццы и изменяем в обьекте итоговую общую цену. В payload приходят три ключа: id, price, quanity
    changePricePizza (state, payload) {
      const needPizza = state.arrayPizza.find((item) => item.keyId === payload.id)
      needPizza.keyCounter = payload.quantity
      needPizza.keyTotalPrice = payload.price
      // и сразу считаем итоговую стоимость всех пицц и вносим данный в стейт
      state.costPizzas = state.arrayPizza.reduce((sum, elem) => sum + elem.keyTotalPrice, 0)
    },
    // при клике на кнопку "изменить" в корзине
    redactPizza (state, payload) {
      const pizza = state.arrayPizza.find(item => item.keyId === payload)
      for (const key in pizza) {
        state.modifyPizza[key] = pizza[key]
      }
      state.flagRedactPizza = 1
      console.log(state.modifyPizza)
    },
    priceProducts (state, payload) {
      state.costProducts = payload
    },
    addProduct (state, payload) {
      state.arrayProducts = payload
    },
    addAddress (state, payload) {
      state.addresses.push(payload)
    },
    deleteAddress (state, payload) {
      // первый способ удаление из массива с помощью метода filter, возврощаем те элементы у которых id не совпал
      // state.addresses = state.addresses.filter(item => item.id !== payload)
      // второй способ - методом findindex находим индекс элемента который нужно удалить и дальше методом splice удаляем
      const ind = state.addresses.findIndex(item => item.id === payload)
      state.addresses.splice(ind, 1)
    },
    updateAddress (state, adrObj) {
      const ind = state.addresses.findIndex(item => item.id === adrObj.id)
      state.addresses.splice(ind, 1, adrObj)
    },
    selectAddress (state, playload) {
      state.addressFromCart = playload
    },
    loadAddress (state, payload) {
      state.addresses = payload
    },
    buildArrOrders (state) {
      const objOrder = {}
      objOrder.id = Math.random().toString(16).slice(9)
      objOrder.pizzas = state.arrayPizza
      objOrder.products = state.arrayProducts
      objOrder.address = state.addressFromCart
      objOrder.price = state.totalPrice

      state.actualOrder = objOrder
      state.orders.push(objOrder)
    },
    loadOreders (state, payload) {
      state.orders = payload
    },
    deleteOrder (state, payload) {
      const ind = state.orders.findIndex(item => item.key === payload)
      state.orders.splice(ind, 1)
    },
    repeatOrder (state, payload) {
      state.orders.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setAuthUser (state, payload) {
      state.isAuth = payload
    }
  },
  actions: {
    async registerUser (context, { email, password }) {
      try {
        let bool = false
        const user = await createUserWithEmailAndPassword(auth, email, password)
        if (user) {
          bool = true
        }
        const userUid = user.user.uid
        context.commit('setUser', userUid)
        context.commit('setAuthUser', bool)
      } catch (error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    },
    async loginUser (context, { email, password }) {
      try {
        let bool = false
        const user = await signInWithEmailAndPassword(auth, email, password)
        // если юзер существует, то устанавливаем true для открытия страниц для авторизованных пользователей через динамические компоненты в файлеApp.vue
        if (user) {
          bool = true
        }
        const userUid = user.user.uid
        context.commit('setUser', userUid)
        context.commit('setAuthUser', bool)
      } catch (error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    },
    async logoutUser (context) {
      await signOut(auth)
      context.commit('setUser', null)
      context.commit('setAuthUser', false)
    },
    async addAdrress (context, address) {
      const adr = {
        ...address,
        user: this.getters.getUserId
      }
      // с помощью  метода push и ref создаем новую таблицу в базе данных и добавляем адрес, если единичное значение нужно создать то вместо push можно использовать метод set
      const keyAdr = await push(ref(db, 'addresses'), adr)
      // этот шаг отправляет в мутацию созданный адрес,, при этом добавляем новое поле кей , ключ по которому данный адрес хранится в таблице базы данных
      // context.commit('addAddress', {
      //   ...adr,
      //   key: keyAdr.key
      // })
    },
    async loadAddresses (context) {
      // получаем адреса из базы данных при загрузке страницы. Хук created откуда вызывается этот эктшион находится в файле App.vue
      const dbAddress = ref(db, 'addresses')
      onValue(dbAddress, (data) => {
        const addresses = data.val()
        const arrAddresses = []
        Object.keys(addresses).forEach((key) => {
          const adr = addresses[key]
          adr.key = key
          arrAddresses.push(adr)
        })
        context.commit('loadAddress', arrAddresses)
      })
    },
    async deleteAddress (context, keyAdr) {
      try {
        // на этом шаге удаляем адрес из стейта, хотя при удалении из базы данных данный автоматически обновляются этим шагом можно и принебречь
        context.commit('deleteAddress', keyAdr)
        // находим конкретный элемент в базе данных с помощью ключа, и главное не забыть поставить / после addresses
        const refDb = ref(db, 'addresses/' + keyAdr)
        // передаем найденный элемент в метод remove для удаления
        remove(refDb)
      } catch (error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    },
    async redactAddress (context, adr) {
      try {
        context.commit('updateAddress', adr)
        const refDb = ref(db, 'addresses/' + adr.key)
        await update(refDb, adr)
      } catch (error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    },
    async addOrder (context) {
      // вызываем мутацию в которой добовляем сформированный заказ в массив заказов в стейте
      context.commit('buildArrOrders')
      // const order = this.getters.getActualOrder
      const ord = {
        ...this.getters.getActualOrder,
        user: this.getters.getUserId
      }
      await push(ref(db, 'orders'), ord)
    },
    async loadOrders (context) {
      // получаем адреса из базы данных при загрузке страницы. Хук created откуда вызывается этот эктшион находится в файле App.vue
      try {
        const dbOrder = ref(db, 'orders')
        onValue(dbOrder, (data) => {
          const orders = data.val()
          const arrOrders = []
          Object.keys(orders).forEach((key) => {
            const ord = orders[key]
            ord.key = key
            arrOrders.push(ord)
          })
          context.commit('loadOreders', arrOrders)
        })
      } catch (error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    },
    async deleteOrder (context, keyOrd) {
      try {
        // на этом шаге удаляем адрес из стейта, хотя при удалении из базы данных данный автоматически обновляются этим шагом можно и принебречь
        context.commit('deleteOrder', keyOrd)
        // находим конкретный элемент в базе данных с помощью ключа, и главное не забыть поставить / после addresses
        const refDb = ref(db, 'orders/' + keyOrd)
        // передаем найденный элемент в метод remove для удаления
        remove(refDb)
      } catch (error) {
        const errorMessage = error.message
        console.log(errorMessage)
      }
    },
    async repeatOrder (context, order) {
      context.commit('repeatOrder', order)
      await push(ref(db, 'orders'), order)
    }

  }
})
