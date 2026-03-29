// 全国ダンスマップ用スクリプト（改善版）

const regionalCSVMap = {
  hokkaido: "data/hokkaido.csv",
  tohoku: "data/tohoku.csv",
  kanto: "data/kanto.csv",
  chubu: "data/chubu.csv",
  kinki: "data/kinki.csv",
  chugoku: "data/chugoku.csv",
  shikoku: "data/shikoku.csv",
  kyushu: "data/kyushu.csv",
  aomori: "data/aomori.csv",
  iwate: "data/iwate.csv",
  miyagi: "data/miyagi.csv",
  akita: "data/akita.csv",
  yamagata: "data/yamagata.csv",
  fukushima: "data/fukushima.csv",
  ibaraki: "data/ibaraki.csv",
  tochigi: "data/tochigi.csv",
  gunma: "data/gunma.csv",
  saitama: "data/saitama.csv",
  chiba: "data/chiba.csv",
  tokyo: "data/tokyo.csv",
  kanagawa: "data/kanagawa.csv",
  niigata: "data/niigata.csv",
  toyama: "data/toyama.csv",
  ishikawa: "data/ishikawa.csv",
  fukui: "data/fukui.csv",
  yamanashi: "data/yamanashi.csv",
  nagano: "data/nagano.csv",
  gifu: "data/gifu.csv",
  shizuoka: "data/shizuoka.csv",
  aichi: "data/aichi.csv",
  mie: "data/mie.csv",
  shiga: "data/shiga.csv",
  kyoto: "data/kyoto.csv",
  osaka: "data/osaka.csv",
  hyogo: "data/hyogo.csv",
  nara: "data/nara.csv",
  wakayama: "data/wakayama.csv",
  tottori: "data/tottori.csv",
  shimane: "data/shimane.csv",
  okayama: "data/okayama.csv",
  hiroshima: "data/hiroshima.csv",
  yamaguchi: "data/yamaguchi.csv",
  tokushima: "data/tokushima.csv",
  kagawa: "data/kagawa.csv",
  ehime: "data/ehime.csv",
  kochi: "data/kochi.csv",
  fukuoka: "data/fukuoka.csv",
  saga: "data/saga.csv",
  nagasaki: "data/nagasaki.csv",
  kumamoto: "data/kumamoto.csv",
  oita: "data/oita.csv",
  miyazaki: "data/miyazaki.csv",
  kagoshima: "data/kagoshima.csv",
  okinawa: "data/okinawa.csv"
};


const regionNameMap = {
  hokkaido: "北海道",
  tohoku: "東北",
  kanto: "関東",
  chubu: "中部",
  kinki: "近畿",
  chugoku: "中国",
  shikoku: "四国",
  kyushu: "九州",
  aomori: "青森", iwate: "岩手",
  miyagi: "宮城", akita: "秋田", yamagata: "山形",
  fukushima: "福島", ibaraki: "茨城", tochigi: "栃木",
  gunma: "群馬", saitama: "埼玉", chiba: "千葉",
  tokyo: "東京", kanagawa: "神奈川", niigata: "新潟",
  toyama: "富山", ishikawa: "石川", fukui: "福井",
  yamanashi: "山梨", nagano: "長野", gifu: "岐阜",
  shizuoka: "静岡", aichi: "愛知", mie: "三重",
  shiga: "滋賀", kyoto: "京都", osaka: "大阪",
  hyogo: "兵庫", nara: "奈良", wakayama: "和歌山",
  tottori: "鳥取", shimane: "島根", okayama: "岡山",
  hiroshima: "広島", yamaguchi: "山口", tokushima: "徳島",
  kagawa: "香川", ehime: "愛媛", kochi: "高知",
  fukuoka: "福岡", saga: "佐賀", nagasaki: "長崎",
  kumamoto: "熊本", oita: "大分", miyazaki: "宮崎",
  kagoshima: "鹿児島", okinawa: "沖縄"
};

const parentRegionMap = {
  hokkaido: 'hokkaido',
  aomori: 'tohoku', iwate: 'tohoku', miyagi: 'tohoku', akita: 'tohoku', yamagata: 'tohoku', fukushima: 'tohoku',
  ibaraki: 'kanto', tochigi: 'kanto', gunma: 'kanto', saitama: 'kanto', chiba: 'kanto', tokyo: 'kanto', kanagawa: 'kanto',
  niigata: 'chubu', toyama: 'chubu', ishikawa: 'chubu', fukui: 'chubu', yamanashi: 'chubu', nagano: 'chubu', gifu: 'chubu', shizuoka: 'chubu', aichi: 'chubu',
  mie: 'kinki', shiga: 'kinki', kyoto: 'kinki', osaka: 'kinki', hyogo: 'kinki', nara: 'kinki', wakayama: 'kinki',
  tottori: 'chugoku', shimane: 'chugoku', okayama: 'chugoku', hiroshima: 'chugoku', yamaguchi: 'chugoku',
  tokushima: 'shikoku', kagawa: 'shikoku', ehime: 'shikoku', kochi: 'shikoku',
  fukuoka: 'kyushu', saga: 'kyushu', nagasaki: 'kyushu', kumamoto: 'kyushu', oita: 'kyushu', miyazaki: 'kyushu', kagoshima: 'kyushu', okinawa: 'kyushu'
};


const sampleImages = [
  { img: 'images/dance_image_1.png', text: '初心者の方にも楽しんでいただける教室です' },
  { img: 'images/dance_image_2.png', text: 'たくさんのダンス仲間が待っています！' },
  { img: 'images/dance_image_3.png', text: 'お気軽にお問い合わせください！' },
  { img: 'images/dance_image_4.png', text: 'ベテランの講師が丁寧にご指導いたします' },
  { img: 'images/dance_image_5.png', text: 'ステップで心と体を元気に！' },
  { img: 'images/dance_image_6.png', text: '目的に合わせてレッスンを行います！' }
];


// 2) グローバル状態
let currentPage = 1;
let currentData = [];
const itemsPerPage = 10;
const selectedTypes = new Set();
const selectedAreas = new Set();

// 3) DOM 要素キャッシュ
const mapContainer = document.getElementById('classroom-map');
if (mapContainer) {
  mapContainer.addEventListener('click', e => {
    // 既存の .region-label クリックは別途処理されるため無視
    if (e.target.closest('.region-label')) return;

    const g = e.target.closest('g.region');
    if (g) {
      hideAllPopups();
      const popup = document.getElementById(`popup-${g.id}`);
      if (popup) {
        // ポップアップがある地方（東北〜九州など）はポップアップを表示
        popup.style.display = 'block';
      } else {
        // ポップアップがない地域（北海道など）は直接データを読み込む
        handleRegionClick(g.id, false);
      }
    }
  });
}
const subTabBtn = document.getElementById('sub-tab-buttons');
const resultsEl = document.getElementById('classroom-results');
const labelEl = document.getElementById('selected-prefecture-label');

// 地域ボタンにイベント登録
document.querySelectorAll('#tab-menu .region').forEach(btn => {
  btn.addEventListener('click', () => handleRegionClick(btn.id, true));
});

// mapContainer が存在する場合だけイベント登録する


// 6) 「全部／タイプ／エリア」フィルターボタン
subTabBtn.addEventListener('click', e => {
  if (!e.target.classList.contains('sub-category')) return;
  const { type: t = "", area: a = "" } = e.target.dataset;
  if (e.target.classList.contains('all')) {
    selectedTypes.clear();
    selectedAreas.clear();
  } else {
    toggle(selectedTypes, t);
    toggle(selectedAreas, a);
  }
  // ボタンの active 切り替え
  subTabBtn.querySelectorAll('.sub-category').forEach(b => {
    const bt = b.dataset.type, ba = b.dataset.area;
    const isAll = !bt && !ba;
    b.classList.toggle('active',
      (bt && selectedTypes.has(bt)) ||
      (ba && selectedAreas.has(ba)) ||
      (isAll && selectedTypes.size === 0 && selectedAreas.size === 0)
    );
  });
  updatePagination();
});

// フリーワード検索のイベント
document.addEventListener('input', e => {
  if (e.target.id === 'free-word-search') {
    currentPage = 1;
    updatePagination();
  }
});

// クリアボタンのイベント
document.addEventListener('click', e => {
  if (e.target.closest('#clear-filters-btn')) {
    selectedTypes.clear();
    selectedAreas.clear();
    const searchInput = document.getElementById('free-word-search');
    if (searchInput) searchInput.value = '';

    // タブのアクティブ状態をリセット
    subTabBtn.querySelectorAll('.sub-category').forEach(b => {
      const isAll = !b.dataset.type && !b.dataset.area;
      b.classList.toggle('active', isAll);
    });

    currentPage = 1;
    updatePagination();
  }
});


// 7) 地域選択→CSV 読込→フィルタータブ生成→一覧表示
async function handleRegionClick(regionId, includeArea = false) {
  // 地域が切り替わった時に前のフィルター条件をリセットする
  selectedTypes.clear();
  selectedAreas.clear();

  // UI 更新
  labelEl.textContent = regionNameMap[regionId] || regionId;
  document.querySelectorAll('g.region, #tab-menu .region')
    .forEach(el => el.classList.toggle('active', el.id === regionId));

  resultsEl.innerHTML = `<p>${regionNameMap[regionId]} のデータを取得中…</p>`;

  try {
    // 全国のデータがまとまった1つのCSVファイルを読み込む
    let response = await fetch('data/data_2_consolidated_clean.csv');

    if (!response.ok) {
      if (response.status === 404) {
        resultsEl.innerHTML = `<div class="search-results-wrapper">
          <h2>${regionNameMap[regionId]} の教室一覧</h2>
          <div class="search-results">0 件</div>
        </div>
        <p style="margin-top: 20px;">全地域データ（data/教室全部.csv）が見つかりません。</p>`;
        subTabBtn.innerHTML = '';
        return;
      }
      throw new Error(`データの読み込みに失敗しました（HTTPステータス: ${response.status}）`);
    }

    const csv = await response.text();
    let parsedData = parseCSV(csv);

    // 全国データから、該当する都道府県のみに絞り込む
    // 地域ボタン(地方全体)からのクリックか、都道府県からのクリックかを判定
    const isRegionClick = Object.values(parentRegionMap).includes(regionId);

    // 対象となる都道府県IDの配列を作成
    let targetPrefIds = [];
    if (isRegionClick) {
      // 地方全体のデータ抽出
      targetPrefIds = Object.keys(parentRegionMap).filter(k => parentRegionMap[k] === regionId);
    } else {
      // 特定の都道府県だけのデータ抽出
      targetPrefIds = [regionId];
    }

    const targetPrefectureNames = targetPrefIds.map(id => regionNameMap[id]).filter(Boolean);

    parsedData = parsedData.filter(d => {
      // 1. 'region'カラムが存在し、対象の都道府県リストに含まれているか
      if (d.region && targetPrefIds.includes(d.region.trim())) return true;
      // 2. 'area'カラムが存在し、都道府県名と一致するか
      if (d.area && targetPrefectureNames.includes(d.area.trim())) return true;
      // 3. 最終手段として住所で判定
      if (d.address && targetPrefectureNames.some(prefName => d.address.includes(prefName))) return true;
      return false;
    });

    currentData = parsedData;

    // データが0件の場合のメッセージ対応
    if (currentData.length === 0) {
      resultsEl.innerHTML = `<div class="search-results-wrapper">
          <h2>${regionNameMap[regionId]} の教室一覧</h2>
          <div class="search-results">0 件</div>
        </div>
        <p style="margin-top: 20px;">${regionNameMap[regionId]} のデータはまだありません。</p>`;
      subTabBtn.innerHTML = '';
      return;
    }

    currentPage = 1;
    generateSubCategoryTabs(currentData, includeArea);
    updatePagination();
    setTimeout(() => {
      scrollToElement(document.getElementById('sub-tab-menu'));
    }, 50);
  } catch (err) {
    resultsEl.innerHTML = `<p style="color:red; font-weight:bold;">エラー: ${err.message}</p>
    <p style="color:#555; font-size:14px; margin-top:10px;">
      ※「Failed to fetch」と表示される場合、ローカルのファイル（file://）を直接ブラウザで開いているため、セキュリティ制限によりデータ（CSV）が読み込めない状態になっています。<br>
      修正内容を確認するには、簡易ローカルサーバー（Live ServerやPython http.serverなど）を立ち上げてアクセスしてください。
    </p>`;
  }
}

// 8) CSV → オブジェクト配列
function parseCSV(text) {
  const result = [];
  let row = [];
  let token = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          token += '"';
          i++; // エスケープされたダブルクォート
        } else {
          inQuotes = false;
        }
      } else {
        token += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(token);
        token = "";
      } else if (char === '\r' || char === '\n') {
        if (char === '\r' && i + 1 < text.length && text[i + 1] === '\n') {
          i++;
        }
        row.push(token);
        result.push(row);
        row = [];
        token = "";
      } else {
        token += char;
      }
    }
  }
  if (token !== "" || row.length > 0) {
    row.push(token);
    result.push(row);
  }

  if (result.length === 0) return [];

  const headersRow = result[0];
  const lines = result.slice(1);

  // ヘッダー名（カラム名）を統一するためのマッピング
  const headerMap = {
    "ダンス教室": "type",
    "allow": "other"
  };

  const keys = headersRow.map(h => {
    let key = h.trim();
    return headerMap[key] || key;
  });

  return lines.map(line => {
    const obj = {};
    keys.forEach((key, index) => {
      let val = (line[index] || "").trim();
      // data_2_consolidated_clean.csv に記載のエリアID('tokyo'等)を日本語('東京'等)に変換
      if (key === 'area' && regionNameMap[val]) {
        val = regionNameMap[val];
      }
      if (val) {
        obj[key] = val;
      } else if (obj[key] === undefined) {
        obj[key] = "";
      }
    });
    return obj;
  });
}

// 9) フィルタータブ生成
function generateSubCategoryTabs(data, includeArea) {
  const allTypes = data.flatMap(d => (d.type || "").split(/[\/／;]+/).map(t => t.trim()).filter(Boolean));
  const types = [...new Set(allTypes)];
  const areas = includeArea
    ? [...new Set(data.map(d => d.area?.trim()).filter(Boolean))]
    : [];
  const btns = ['<button class="sub-category all active" data-type="" data-area="">全部</button>']
    .concat(types.map(t => `<button class="sub-category" data-type="${t}">${t}</button>`))
    .concat(areas.map(a => `<button class="sub-category" data-area="${a}">${a}</button>`))
    .join('');
  subTabBtn.innerHTML = btns;
  document.getElementById('sub-tab-menu').style.display = 'block';
}

// 10) ページネーション＋絞り込み＋リスト描画
function updatePagination() {
  let list = currentData;
  if (selectedTypes.size) {
    list = list.filter(d => {
      const dTypes = (d.type || "").split(/[\/／;]+/).map(t => t.trim()).filter(Boolean);
      return dTypes.some(t => selectedTypes.has(t));
    });
  }
  if (selectedAreas.size) list = list.filter(d => selectedAreas.has(d.area?.trim()));

  // フリーワード検索の絞り込み
  const freeWordInput = document.getElementById('free-word-search');
  const freeWord = freeWordInput ? freeWordInput.value.trim().toLowerCase() : '';
  if (freeWord) {
    list = list.filter(d => {
      const targetText = [
        d.name,
        d.address,
        d.comment,
        d.type,
        d.description
      ].join(' ').toLowerCase();
      // スペース区切りで複数キーワードのAND検索
      const words = freeWord.split(/\s+/);
      return words.every(word => targetText.includes(word));
    });
  }

  // クリアボタンの表示制御
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    if (selectedTypes.size > 0 || selectedAreas.size > 0 || freeWord) {
      clearBtn.style.display = 'inline-flex';
    } else {
      clearBtn.style.display = 'none';
    }
  }

  const total = list.length;
  const pages = Math.ceil(total / itemsPerPage);
  if (currentPage > pages) currentPage = 1;

  const start = (currentPage - 1) * itemsPerPage;
  renderList(list.slice(start, start + itemsPerPage), total);
  renderPagination(pages);
}

function renderPagination(pages) {
  document.querySelectorAll('.pagination').forEach(el => el.remove());
  const container = resultsEl.querySelector('.search-results-wrapper');
  const pag = document.createElement('div');
  pag.className = 'pagination';

  const range = 2; // 現在ページの前後2ページずつ表示
  const start = Math.max(1, currentPage - range);
  const end = Math.min(pages, currentPage + range);

  // 「最初へ」ボタン
  if (currentPage > 1 + range) {
    const firstBtn = document.createElement('button');
    firstBtn.innerHTML = '<<';
    firstBtn.onclick = () => { currentPage = 1; updatePagination(); scrollToFirstCard(); };
    pag.appendChild(firstBtn);
  }

  // 「前へ」ボタン
  if (currentPage > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<';
    prevBtn.onclick = () => { currentPage--; updatePagination(); scrollToFirstCard(); };
    pag.appendChild(prevBtn);
  }

  // ページ番号ボタン
  for (let i = start; i <= end; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => { currentPage = i; updatePagination(); scrollToFirstCard(); };
    pag.appendChild(btn);
  }

  // 「次へ」ボタン
  if (currentPage < pages) {
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '>';
    nextBtn.onclick = () => { currentPage++; updatePagination(); scrollToFirstCard(); };
    pag.appendChild(nextBtn);
  }

  // 「最後へ」ボタン
  if (currentPage < pages - range) {
    const lastBtn = document.createElement('button');
    lastBtn.innerHTML = '>>';
    lastBtn.onclick = () => { currentPage = pages; updatePagination(); scrollToFirstCard(); };
    pag.appendChild(lastBtn);
  }

  container.appendChild(pag);

}

// 11) 一覧と「×件」表示
function renderList(items, total) {
  const region = labelEl.textContent;
  resultsEl.innerHTML = `
    <div class="search-results-wrapper">
      <h2>${region} の教室一覧</h2>
      <div class="search-results">${total} 件</div>
    </div>
    <div class="card-container"></div>`;

  const container = resultsEl.querySelector('.card-container');
  items.forEach((d, index) => {
    const typesArray = (d.type || "").split(/[\/／;]+/).map(t => t.trim()).filter(Boolean);
    const types = typesArray.map(t => `<span class="type-box">${t}</span>`).join('');

    // サンプル画像・テキストを順番に使う
    const sample = sampleImages[index % sampleImages.length];
    const imgSrc = d.image_url ? d.image_url : sample.img;
    const imgText = d.description ? d.description : sample.text;

    container.insertAdjacentHTML('beforeend', `
        <div class="card">
          <div class="school-name">
            ${(d.website && d.website !== 'unknown') ? `<a href="${d.website}" target="_blank" rel="noopener noreferrer">${d.name}</a>` : d.name}
          </div>
          <div class="card-content">
            <div class="left-column">
              <div class="type-container">${types}</div>
              <div class="address-tel-wrapper">
                <div class="address">
                  ${d.address && d.address.trim() !== ""
        ? `<a href="https://www.google.com/maps/search/${encodeURIComponent(d.address)}" target="_blank" rel="noopener noreferrer" class="address-link">${d.address}</a>`
        : `<span class="no-address">住所情報なし</span>`}
                </div>
                <div class="tel-hp-wrapper">
                  <div class="tel">${d.tel ? `<a href="tel:${d.tel.replace(/-/g, '')}" class="tel-link">${d.tel}</a>` : ''}</div>
                  ${(d.website && d.website !== 'unknown')
        ? `<div class="homepage-link"><a href="${d.website}" target="_blank" rel="noopener noreferrer" class="homepage-button">ホームページを見る</a></div>`
        : `<div class="homepage-link"><a href="contact.html" class="homepage-button hp-wanted">ホームページの情報をお寄せください</a></div>`
      }
                </div>
              </div>
            </div>
            <div class="right-column">
              <img src="${imgSrc}" alt="教室イメージ" />
              <div class="description">${imgText}</div>
            </div>
          </div>
        </div >
      `);
  });
}



// ────────── ユーティリティ ──────────
function toggle(set, v) { v && (set.has(v) ? set.delete(v) : set.add(v)); }
function scrollToFirstCard() {
  const c = resultsEl.querySelector('.card');
  c && c.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function scrollToElement(el) {
  el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ────────── 新map ──────────
// ポップアップの都道府県名 → CSV読み込み
function setupPopupPrefectureHandlers() {
  document.querySelectorAll('.pref-popup li').forEach(item => {
    item.addEventListener('click', () => {
      const prefId = item.dataset.id;
      hideAllPopups();
      handleRegionClick(prefId, false);
    });
  });
}

// 地方ラベル → ポップアップ表示
function setupRegionLabels() {
  document.querySelectorAll('.region-label').forEach(label => {
    label.addEventListener('click', () => {
      const region = label.dataset.id;
      hideAllPopups();
      const popup = document.getElementById(`popup - ${region}`);
      if (popup) {
        popup.style.display = 'block';
      } else {
        handleRegionClick(region, false);
      }
    });
  });
}


// ページ読み込み時にイベント設定
document.addEventListener("DOMContentLoaded", () => {
  setupRegionLabels();
  setupPopupPrefectureHandlers();

  // ★ スマホ版：県名リストクリック
  document.querySelectorAll('.prefecture-item').forEach(item => {
    item.addEventListener('click', () => {
      const prefectureId = item.dataset.id;
      handleRegionClick(prefectureId, false); // ← ✅ここをhandleRegionClickに！
    });
  });

});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prefId = btn.getAttribute('data-id');
      handleRegionClick(prefId, false); // ← 北海道ボタンクリックで検索できる
    });
  });
});



function hideAllPopups() {
  document.querySelectorAll('.pref-popup').forEach(p => p.style.display = 'none');
}

// ===========================
// 📍 現在地周辺から探すボタンの実装
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const findNearbyBtn = document.getElementById('find-nearby-btn');
  if (findNearbyBtn) {
    findNearbyBtn.addEventListener('click', () => {
      const originalText = findNearbyBtn.innerHTML;

      if (!navigator.geolocation) {
        alert("お使いのブラウザや端末は位置情報の取得に対応していません。");
        return;
      }

      findNearbyBtn.innerHTML = '<span class="icon">📍</span> 取得中...';
      findNearbyBtn.disabled = true;

      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // 国土地理院の無料・キー不要の逆ジオコーディングAPIを利用
          const res = await fetch(`https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lon}`);
          const data = await res.json();

          if (data && data.results && data.results.muniCd) {
            // muniCd (市町村コード) の上2桁が都道府県コード
            const prefCode = parseInt(data.results.muniCd.substring(0, 2), 10);

            const prefCodeMap = {
              1: 'hokkaido', 2: 'aomori', 3: 'iwate', 4: 'miyagi', 5: 'akita', 6: 'yamagata', 7: 'fukushima',
              8: 'ibaraki', 9: 'tochigi', 10: 'gunma', 11: 'saitama', 12: 'chiba', 13: 'tokyo', 14: 'kanagawa',
              15: 'niigata', 16: 'toyama', 17: 'ishikawa', 18: 'fukui', 19: 'yamanashi', 20: 'nagano',
              21: 'gifu', 22: 'shizuoka', 23: 'aichi', 24: 'mie', 25: 'shiga', 26: 'kyoto', 27: 'osaka',
              28: 'hyogo', 29: 'nara', 30: 'wakayama', 31: 'tottori', 32: 'shimane', 33: 'okayama',
              34: 'hiroshima', 35: 'yamaguchi', 36: 'tokushima', 37: 'kagawa', 38: 'ehime', 39: 'kochi',
              40: 'fukuoka', 41: 'saga', 42: 'nagasaki', 43: 'kumamoto', 44: 'oita', 45: 'miyazaki',
              46: 'kagoshima', 47: 'okinawa'
            };

            const regionId = prefCodeMap[prefCode];
            if (regionId) {
              const parentRegion = parentRegionMap[regionId];
              if (parentRegion) {
                // 該当の地方単位でデータを読み込み、サブ都道府県タブを生成
                await handleRegionClick(parentRegion, true);

                // 取得した都道府県を自動的に選択状態にする
                const prefName = regionNameMap[regionId];
                selectedAreas.clear();
                selectedTypes.clear();
                selectedAreas.add(prefName);

                // UI上のタブのアクティブ状態を連動
                const subTabBtn = document.getElementById('sub-tab-buttons');
                if (subTabBtn) {
                  subTabBtn.querySelectorAll('.sub-category').forEach(b => {
                    if (b.dataset.area === prefName) {
                      b.classList.add('active');
                    } else {
                      b.classList.remove('active');
                    }
                  });
                }

                // リストを更新して一番上までスクロール
                currentPage = 1;
                updatePagination();
                setTimeout(() => {
                  const targetCard = document.querySelector('.card-container');
                  if (targetCard) {
                    const offset = targetCard.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                  }
                }, 100);
              }
            } else {
              alert("現在地の都道府県をマップで判別できませんでした。");
            }
          } else {
            alert("位置情報から住所データを取得できませんでした。");
          }
        } catch (err) {
          console.error(err);
          alert("位置情報の取得処理中にエラーが発生しました。");
        } finally {
          findNearbyBtn.innerHTML = originalText;
          findNearbyBtn.disabled = false;
        }
      }, (err) => {
        alert("位置情報の取得が許可されていないか、エラーが発生しました。端末の設定をご確認ください。");
        findNearbyBtn.innerHTML = originalText;
        findNearbyBtn.disabled = false;
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  }
});

// ===========================
// ⬆️ ページトップへ戻るボタンの実装
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (backToTopBtn) {
    // スクロール時にボタンの表示/非表示を切り替える
    window.addEventListener('scroll', () => {
      // 300px以上スクロールしたら表示
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // クリック時にスムーズに上へ戻る
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});