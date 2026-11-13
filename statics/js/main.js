
(function() {
  'use strict';

  /* ---------- 导航栏移动端切换 ---------- */
  function initNavToggle() {
    var toggle = document.querySelector('.navbar-toggle');
    var nav = document.querySelector('.navbar-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar')) {
        nav.classList.remove('open');
      }
    });
  }

  /* ---------- 搜索框假搜索 ---------- */
  function initSearch() {
    var forms = document.querySelectorAll('.search-form, .hero-search, .navbar-search');
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = form.querySelector('input');
        var val = input ? input.value.trim() : '';
        if (val) {
          showToast('正在搜索"' + val + '"，蜜桃视频内容加载中...');
        }
      });
      var btn = form.querySelector('button, .search-btn');
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var input = form.querySelector('input');
          var val = input ? input.value.trim() : '';
          if (val) {
            showToast('正在搜索"' + val + '"，蜜桃视频内容加载中...');
          } else {
            showToast('请输入搜索关键词');
          }
        });
      }
    });
  }

  /* ---------- Toast提示 ---------- */
  function showToast(msg) {
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:rgba(233,30,140,0.95);color:#fff;padding:10px 22px;border-radius:24px;font-size:14px;z-index:99999;box-shadow:0 4px 20px rgba(0,0,0,0.3);transition:opacity 0.3s;white-space:nowrap;';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.opacity = '0';
      setTimeout(function() { toast.remove(); }, 300);
    }, 2500);
  }

  /* ---------- FAQ手风琴 ---------- */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function(item) {
      var q = item.querySelector('.faq-question');
      if (!q) return;
      q.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');
        items.forEach(function(i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ---------- 视频卡片点击 ---------- */
  function initVideoCards() {
    var cards = document.querySelectorAll('.video-card');
    cards.forEach(function(card) {
      card.addEventListener('click', function() {
        var title = card.querySelector('.video-title');
        var t = title ? title.textContent : '蜜桃视频';
        openVideoModal(t);
      });
    });
  }

  /* ---------- 视频模态框 ---------- */
  function openVideoModal(title) {
    var overlay = document.getElementById('videoModal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'videoModal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = '<div class="modal-content"><div class="modal-header"><span class="modal-title" style="font-size:15px;font-weight:600;"></span><button class="modal-close" onclick="closeVideoModal()">✕</button></div><div class="modal-video"><div style="width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#0d1b2a,#1a2535);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;"><div style="width:70px;height:70px;background:linear-gradient(135deg,#e91e8c,#7c3aed);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="showToast2(\'蜜桃视频播放功能即将上线，敬请期待！\')"><span style="border-left:22px solid #fff;border-top:14px solid transparent;border-bottom:14px solid transparent;margin-left:6px;display:block;"></span></div><p style="color:#94a3b8;font-size:14px;">点击播放按钮预览蜜桃游戏解说视频</p></div></div></div>';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeVideoModal();
      });
    }
    var t = overlay.querySelector('.modal-title');
    if (t) t.textContent = title;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.closeVideoModal = function() {
    var overlay = document.getElementById('videoModal');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.showToast2 = function(msg) { showToast(msg); };

  /* ---------- 游戏标签切换 ---------- */
  function initGameTabs() {
    var tabs = document.querySelectorAll('.game-tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var group = tab.closest('.game-tabs');
        if (group) {
          group.querySelectorAll('.game-tab').forEach(function(t) { t.classList.remove('active'); });
        }
        tab.classList.add('active');
        var target = tab.dataset.target;
        if (target) {
          var panels = document.querySelectorAll('.game-panel');
          panels.forEach(function(p) {
            p.style.display = p.id === target ? 'grid' : 'none';
          });
        }
      });
    });
  }

  /* ---------- 分享按钮 ---------- */
  function initShare() {
    var btns = document.querySelectorAll('.vjvxei');
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var platform = btn.dataset.platform || '平台';
        showToast('已复制链接，请前往' + platform + '分享蜜桃！');
      });
    });
  }

  /* ---------- 懒加载图片 ---------- */
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      var lazyImages = document.querySelectorAll('img[data-src]');
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      lazyImages.forEach(function(img) { observer.observe(img); });
    } else {
      document.querySelectorAll('img[data-src]').forEach(function(img) {
        img.src = img.dataset.src;
      });
    }
  }

  /* ---------- 数字滚动动画 ---------- */
  function animateNumbers() {
    var nums = document.querySelectorAll('.4vh85z0, .9oo4vlb .num');
    nums.forEach(function(el) {
      var target = el.dataset.target;
      if (!target) return;
      var suffix = el.dataset.suffix || '';
      var start = 0;
      var end = parseFloat(target);
      var duration = 1500;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var val = Math.floor(progress * end);
        el.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- 滚动动画触发 ---------- */
  function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.card, .video-card, .b4qxmh5, .7oobvg8b, .ai-card, .community-card, .9ax65h2').forEach(function(el) {
        observer.observe(el);
      });
    }
    // 数字动画
    var statsSection = document.querySelector('.3dkjpnqb, .hero-stats');
    if (statsSection && 'IntersectionObserver' in window) {
      var statsObs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          animateNumbers();
          statsObs.disconnect();
        }
      }, { threshold: 0.3 });
      statsObs.observe(statsSection);
    }
  }

  /* ---------- 返回顶部 ---------- */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#e91e8c,#7c3aed);color:#fff;border:none;font-size:18px;cursor:pointer;z-index:999;opacity:0;transition:opacity 0.3s;box-shadow:0 4px 15px rgba(233,30,140,0.4);';
    document.body.appendChild(btn);
    window.addEventListener('scroll', function() {
      btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    });
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 视频卡片悬停播放按钮 ---------- */
  function initVideoHover() {
    // 确保所有视频卡片在hover时显示播放按钮（CSS已处理，JS补充键盘可访问性）
    var cards = document.querySelectorAll('.video-card');
    cards.forEach(function(card) {
      var playBtn = card.querySelector('.video-play-btn');
      if (!playBtn) return;
      card.addEventListener('mouseenter', function() {
        playBtn.style.opacity = '1';
        playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
      });
      card.addEventListener('mouseleave', function() {
        playBtn.style.opacity = '';
        playBtn.style.transform = '';
      });
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var title = card.querySelector('.video-title');
          var t = title ? title.textContent : '蜜桃视频';
          openVideoModal(t);
        }
      });
    });
  }

  /* ---------- 初始化 ---------- */
  document.addEventListener('DOMContentLoaded', function() {
    initNavToggle();
    initSearch();
    initFAQ();
    initVideoCards();
    initVideoHover();
    initGameTabs();
    initShare();
    initLazyLoad();
    initScrollAnimations();
    initBackToTop();
  });

})();
