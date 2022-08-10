export const debounce = (fn: () => void, ms: number) => {
  // fn:要防抖的函数 ms:时间
  let timerId: any // 创建一个标记用来存放定时器的返回值
  return () => {
    // tslint:disable-next-line: no-unused-expression
    timerId && clearTimeout(timerId); // 每当用户输入的时候把前一个 setTimeout clear 掉
    // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
    timerId = setTimeout(() => {
      fn()
    }, ms)
  }
}



