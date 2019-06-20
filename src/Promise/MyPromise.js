function MyPromise(func) {
  this.state = 'pending'
  this.onResolvedCallback = []
  this.onRejectedCallback = []
  function resolve(data) {
    if (this.state === 'pending') {
      this.state = 'fullfilled'
      for (let i = 0; i < this.onResolvedCallback.length; i += 1) {
        this.onResolvedCallback[i](data)
      }
    }
  }
  function reject(error) {
    if (this.state === 'pending') {
      this.state = 'rejected'
      for (let i = 0; i < this.onRejectedCallback.length; i += 1) {
        this.onRejectedCallback[i](error)
      }
    }
  }
  try {
    func(resolve.bind(this), reject.bind(this))
  } catch (error) {
    reject.call(this, error)
  }
}
MyPromise.prototype.then = function then(resolveCallback, rejectCallback) {
  this.onResolvedCallback.push(resolveCallback)
  this.onRejectedCallback.push(rejectCallback)
}

const test = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const t = Math.random()
    if (t > 0.5) resolve(t)
    else reject(t)
  }, 500)
})
test.then((data) => {
  console.log('fullfilled', data)
}, (error) => {
  console.log('rejected', error)
})
