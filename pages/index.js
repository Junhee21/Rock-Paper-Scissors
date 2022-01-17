import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {
  const [inputNum, setInputNum] = useState(0);
  const [resultArr, setResultArr] = useState([]);
  const [win, setWin] = useState(0);
  const [draw, setDraw] = useState(0);
  const [defeat, setDefeat] = useState(0);
  const [game, setGame] = useState(0);
  const [round, setRound] = useState(0);
  const [my, setMy] = useState();
  const [computer, setComputer] = useState(-1);
  const [stop, setStop] = useState(true);
  const [cnt, setCnt] = useState(3);
  const [timer, setTimer] = useState();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setGame(0);
  }, []) 

  useEffect(() => {
    if (game > 0) {
      const cp = new Array(game).fill(-1);
      setResultArr(cp);
      setTimeout(function ones() {setRound(1)}, 1000);
    }
  }, [game])

  useEffect(() => {
    if (game > 0)
    {
      setCnt(3);
      setStop(false);
      setMy(-5);
      setComputer(Math.floor(Math.random()*3));
      var _timer = setInterval(function oneSecond() {setCnt(cnt => cnt-1)}, 1000);
      setTimer(_timer)
      if (round > game) {
        clearInterval(_timer);
        setGameOver(true);
      }
    }
  }, [round])

  useEffect(() => {
    if (cnt < 0) {
      clearInterval(timer);
      judge();
      setStop(true);
      setTimeout(function ones() {setRound(round => round + 1)}, 2000)
    }
  }, [cnt])

  const judge = () => {
    if (my === computer) {
      resultArr[round - 1] = 1;
      setDraw(draw => draw + 1);
    } else if ((my-computer === 1) || (my-computer === -2)) {
      resultArr[round - 1] = 0;
      setWin(win => win + 1);
    } else {
      resultArr[round - 1] = 2;
      setDefeat(defeat => defeat + 1);
    }
  }

  const inputGame = (obj) => {
    if (obj ) {
      setGame(obj);
    } else {
      alert("숫자를 입력하세요");
    }
  }

  return (
    <>
      <Head>
        <title>가위바위보</title>
        <meta name="description" content="가위바위보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(gameOver) && 
        <div className={styles.flexColumn}>
          <div className={styles.title}>
            게임 종료
          </div>
          <div className={styles.title}>
            <div>승: {win}, 무: {draw}, 패: {defeat}</div>
            <button
              className={styles.firstButton}
              onClick={() => location.reload()}
            >시작</button>
          </div>
        </div>
      }
      {(!gameOver) && (game === 0) && 
        <div className={styles.flexColumn}>
          <div className={styles.title}>
            게임 횟수를 입력하세요
          </div>
          <div className={styles.title}>
            <textarea
              className={styles.textarea}
              placeholder = {0}
              onChange={(e) => setInputNum(Number(e.target.value))}
            />
            <button
              className={styles.firstButton}
              onClick={() => inputGame((inputNum))}
            >시작</button>
          </div>
        </div>
      }
      {(!gameOver) && (game !== 0) && 
        <div className={styles.body}>
          <div className={styles.play}>
            <div className={styles.head}>안내면 진 거</div>
            <div className={styles.imageBox}>
              <div className={styles.image}>
                <div>나</div>
                {(my == 0) && <img className={styles.scissors} src="/scissors.PNG" />}
                {(my == 1) && <img className={styles.rock} src="/rock.PNG" />}
                {(my == 2) && <img className={styles.paper} src="/paper.PNG" />}
              </div>
              <div className={styles.flexColumn}>
                {stop && <div className={styles.timer}>준비</div>}
                {!stop && <>
                  <div className={styles.round}>{round} 라운드</div>
                  <div className={styles.timerText}>타이머</div>
                  <div className={styles.timer}>{cnt}</div>
                </>}
              </div>
              <div className={styles.image}>
                <div>컴퓨터</div>
                {stop && <>
                    {(computer == 0) && <img className={styles.scissors} src="/scissors.PNG" />}
                    {(computer == 1) && <img className={styles.rock} src="/rock.PNG" />}
                    {(computer == 2) && <img className={styles.paper} src="/paper.PNG" />}
                  </>
                }
              </div>
            </div>
            <div className={styles.buttonBox}>
              <button
                className={styles.button}
                onClick={() => setMy(0)}
                disabled={stop}
              >가위</button>
              <button
                className={styles.button}
                onClick={() => setMy(1)}
                disabled={stop}
              >바위</button>
              <button
                className={styles.button}
                onClick={() => setMy(2)}
                disabled={stop}
              >보</button>
            </div>
          </div>
          <div className={styles.result}>
            <div className={styles.resultTopBar}>
              <div className={styles.resultData}>
                <div>승</div>
                <div>무</div>
                <div>패</div>
              </div>
              <div className={styles.resultData}>
                <div>{win}</div>
                <div>{draw}</div>
                <div>{defeat}</div>
              </div>
              <div className={styles.onlyBottomBorder}></div>
            </div>
            <div className={styles.resultContent}>
              {(resultArr.length > 0) && resultArr.map((object, index) => {
                return <div key = {index} className={styles.resultData}>
                    {index+1}라운드
                    {(resultArr[index]===0) && <div>승</div>}
                    {(resultArr[index]===1) && <div>무</div>}
                    {(resultArr[index]===2) && <div>패</div>}
                  </div>
              })}
              <div className={styles.onlyTopBorder}></div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
