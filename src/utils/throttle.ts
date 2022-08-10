export function throttle(fn: () => void, ms: number) {
  let timerId: any // 创建一个标记用来存放定时器的id
  return function () {
    // 没有定时器等待执行，则表示可以创建新的定时器来执行函数
    if (!timerId) {
      timerId = setTimeout(() => {
        // 定时器id清空，表示可以执行下一次调用了
        timerId = null
        fn()
      }, ms)
    }
  }
}