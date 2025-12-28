import { Hono } from 'hono'
import { renderer } from './renderer'
import { raw } from 'hono/html'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  const tiles = [
    { id: 1, char: '🀀', name: '東' },
    { id: 2, char: '🀁', name: '南' },
    { id: 3, char: '🀂', name: '西' },
    { id: 4, char: '🀃', name: '北' },
    { id: 5, char: '🀄', name: '中' },
    { id: 6, char: '🀅', name: '發' },
    { id: 7, char: '🀆', name: '白' },
    { id: 8, char: '🀇', name: '一萬' },
    { id: 9, char: '🀈', name: '二萬' },
    { id: 10, char: '🀉', name: '三萬' },
    { id: 11, char: '🀊', name: '四萬' },
    { id: 12, char: '🀋', name: '五萬' },
    { id: 13, char: '🀌', name: '六萬' },
    { id: 14, char: '🀍', name: '七萬' },
    { id: 15, char: '🀎', name: '八萬' },
    { id: 16, char: '🀏', name: '九萬' },
    { id: 17, char: '🀐', name: '一筒' },
    { id: 18, char: '🀑', name: '二筒' },
    { id: 19, char: '🀒', name: '三筒' },
    { id: 20, char: '🀓', name: '四筒' },
    { id: 21, char: '🀔', name: '五筒' },
    { id: 22, char: '🀕', name: '六筒' },
    { id: 23, char: '🀖', name: '七筒' },
    { id: 24, char: '🀗', name: '八筒' },
    { id: 25, char: '🀘', name: '九筒' },
    { id: 26, char: '🀙', name: '一索' },
    { id: 27, char: '🀚', name: '二索' },
    { id: 28, char: '🀛', name: '三索' },
    { id: 29, char: '🀜', name: '四索' },
    { id: 30, char: '🀝', name: '五索' },
    { id: 31, char: '🀞', name: '六索' },
    { id: 32, char: '🀟', name: '七索' },
    { id: 33, char: '🀠', name: '八索' },
    { id: 34, char: '🀡', name: '九索' },
  ]

  return c.render(
    <div>
      <h1>麻雀の基礎 - 手牌を作ってみよう</h1>

      <div class="info-section">
        <div class="info-box">
          <h3>順子（シュンツ）</h3>
          <p>同じ種類の連続した3枚の牌</p>
          <div class="example">例: 🀇🀈🀉 (一二三萬)</div>
        </div>
        <div class="info-box">
          <h3>刻子（コーツ）</h3>
          <p>同じ牌3枚の組み合わせ</p>
          <div class="example">例: 🀐🀐🀐 (一筒×3)</div>
        </div>
        <div class="info-box">
          <h3>雀頭（ジャントウ）</h3>
          <p>同じ牌2枚の組み合わせ（アタマ）</p>
          <div class="example">例: 🀄🀄 (中×2)</div>
        </div>
      </div>

      <div class="hand-section">
        <h2>あなたの手牌 (<span id="hand-count">0</span>/14枚)</h2>
        <div id="hand-container" class="hand-area">
          <p class="placeholder">下のパイをクリックして選んでください</p>
        </div>
        <button id="reset-btn" class="reset-btn">手牌をリセット</button>
      </div>

      <div class="tiles-section">
        <h2>牌の山</h2>
        <div id="tile-container">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              class="tile available-tile"
              data-id={tile.id}
              data-char={tile.char}
              data-name={tile.name}
            >
              {tile.char}
            </div>
          ))}
        </div>
      </div>

      {raw(`
        <script>
          const hand = [];
          const MAX_HAND_SIZE = 14;
          const handContainer = document.getElementById('hand-container');
          const handCount = document.getElementById('hand-count');
          const resetBtn = document.getElementById('reset-btn');
          const availableTiles = document.querySelectorAll('.available-tile');

          function updateHandDisplay() {
            handCount.textContent = hand.length;

            if (hand.length === 0) {
              handContainer.innerHTML = '<p class="placeholder">下のパイをクリックして選んでください</p>';
            } else {
              handContainer.innerHTML = hand.map((tile, index) =>
                '<div class="tile hand-tile" data-index="' + index + '">' + tile.char + '</div>'
              ).join('');

              document.querySelectorAll('.hand-tile').forEach(tile => {
                tile.addEventListener('click', function() {
                  const index = parseInt(this.dataset.index);
                  hand.splice(index, 1);
                  updateHandDisplay();
                });
              });
            }
          }

          availableTiles.forEach(tile => {
            tile.addEventListener('click', function() {
              if (hand.length >= MAX_HAND_SIZE) {
                alert('手牌は14枚までです！');
                return;
              }

              hand.push({
                char: this.dataset.char,
                name: this.dataset.name
              });
              updateHandDisplay();
            });
          });

          resetBtn.addEventListener('click', () => {
            hand.length = 0;
            updateHandDisplay();
          });

          updateHandDisplay();
        </script>
      `)}
    </div>
  )
})

export default app
