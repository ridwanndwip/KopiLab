(function () {
  var dl = window.dataLayer = window.dataLayer || [];

  // Panel inspector: menampilkan isi dataLayer secara langsung
  var panel = document.createElement('aside');
  panel.id = 'dl-panel';
  panel.innerHTML = '<header id="dl-toggle"><span>dataLayer (<span id="dl-count">0</span>)</span><span><button id="dl-clear" type="button">Bersihkan</button><button type="button" id="dl-hide">Tutup/Buka</button></span></header><ul id="dl-log"></ul>';
  document.body.appendChild(panel);
  var logEl = panel.querySelector('#dl-log'), countEl = panel.querySelector('#dl-count'), n = 0;

  function add(obj, cls) {
    var li = document.createElement('li');
    if (cls) li.className = cls;
    var txt;
    try { txt = JSON.stringify(obj, null, 1); } catch (e) { txt = String(obj); }
    li.textContent = txt;
    logEl.insertBefore(li, logEl.firstChild);
    countEl.textContent = ++n;
  }
  for (var i = 0; i < dl.length; i++) add(dl[i]);

  var orig = dl.push;
  dl.push = function () {
    var r = orig.apply(dl, arguments);
    for (var j = 0; j < arguments.length; j++) add(arguments[j]);
    return r;
  };
  panel.querySelector('#dl-hide').addEventListener('click', function () { panel.classList.toggle('closed'); });
  panel.querySelector('#dl-clear').addEventListener('click', function () { logEl.innerHTML = ''; n = 0; countEl.textContent = 0; });
  window.addEventListener('error', function (e) { add('Error JS: ' + e.message + ' (baris ' + e.lineno + ')', 'err'); });

  function on(id, fn) { var el = document.getElementById(id); if (el) el.addEventListener('click', fn); }

  // Video 28: push event kustom sederhana
  on('btn-push-simple', function () {
    dl.push({ event: 'klik_cta', cta_name: 'push_simple', cta_location: 'sec-dl' });
  });

  // Video 27: event dengan data nested (ecommerce.items[0].item_name)
  document.querySelectorAll('[data-dl-event]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      dl.push({ ecommerce: null }); // reset objek sebelumnya
      dl.push({
        event: btn.dataset.dlEvent,
        ecommerce: { currency: 'IDR', items: [{ item_name: btn.dataset.item, price: Number(btn.dataset.price), quantity: 1 }] }
      });
    });
  });

  // Video 22: error JavaScript yang tidak tertangkap (memicu trigger JavaScript Error)
  on('btn-error', function () {
    setTimeout(function () { throw new Error('Error uji coba dari tombol Kopi Lab'); }, 0);
  });
})();
