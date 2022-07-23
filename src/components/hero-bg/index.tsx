import style from './hero-bg.module.scss'

const HeroBg = () => {
  return (
    <div className={style['hero']}>
      <div className={style['motto']}>
        <h1>一个正在学走路的小码农</h1>
        <p>愿世界上每一个人都可以找到自己所爱、所喜欢、所向往、所值得付出的人与物</p>
      </div>
    </div>
  )
}

export default HeroBg
