/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// --- STATE MANAGEMENT ---
const state = {
  currentScreen: 'SignUp',
  user: {
    username: '',
    avatar: 'https://cdn.imgurl.ir/uploads/f32084_IMG_20250827_144709_907.jpg',
  },
  avatars: [
    'https://cdn.imgurl.ir/uploads/f32084_IMG_20250827_144709_907.jpg',
    'https://cdn.imgurl.ir/uploads/k49298_IMG_20250827_160949_096.jpg',
    'https://cdn.imgurl.ir/uploads/m87957_IMG_20250827_164921_059.jpg',
    'https://cdn.imgurl.ir/uploads/a519305_IMG_20250827_164946_814.jpg',
  ],
  errorMessage: ''
};

// --- NAVIGATION ---
function navigate(screen: 'SignUp' | 'MainMenu' | 'AvatarSelection') {
  state.currentScreen = screen;
  render();
}

// --- EVENT HANDLERS ---
function handleSignUpSubmit(event: Event) {
  event.preventDefault();
  state.errorMessage = ''; // Clear previous error

  const form = event.target as HTMLFormElement;
  const username = (form.elements.namedItem('username') as HTMLInputElement).value;
  const password = (form.elements.namedItem('password') as HTMLInputElement).value;
  const confirmPassword = (form.elements.namedItem('confirm_password') as HTMLInputElement).value;

  if (!username || !password || !confirmPassword) {
    state.errorMessage = 'لطفاً تمام فیلدها را پر کنید.';
  } else if (password.length < 6) {
    state.errorMessage = 'رمز عبور باید حداقل ۶ رقم باشد.';
  } else if (password !== confirmPassword) {
    state.errorMessage = 'تکرار رمز عبور با رمز عبور مطابقت ندارد.';
  } else {
    state.user.username = username;
    navigate('MainMenu');
    return; // Prevent re-render of signup
  }
  render(); // Re-render to show error message
}

function handleAvatarSelect(avatarUrl: string) {
  state.user.avatar = avatarUrl;
  navigate('MainMenu');
}

function handleProfileClick() {
  navigate('AvatarSelection');
}

function handleGoBackToMenu() {
    navigate('MainMenu');
}


// --- TEMPLATE RENDERERS ---
function renderSignUp(): string {
  return `
    <div class="screen">
      <form id="signup-form" class="signup-form">
        <h1 class="game-title">Winning The Bluff</h1>
        <input type="text" id="username" name="username" class="input-field" placeholder="نام کاربری" required>
        <input type="password" id="password" name="password" class="input-field" placeholder="رمز عبور" required>
        <input type="password" id="confirm_password" name="confirm_password" class="input-field" placeholder="تکرار رمز عبور" required>
        <button type="submit" class="btn">ثبت‌نام</button>
        <p class="error-message">${state.errorMessage}</p>
      </form>
    </div>
  `;
}

function renderMainMenu(): string {
  return `
    <div class="screen main-menu">
      <header class="main-header">
        <div class="player-stats">
          <div class="stat"><i class="icon icon-coin"></i><span>1000</span></div>
          <div class="stat"><i class="icon icon-gem"></i><span>50</span></div>
          <div class="stat"><i class="icon icon-trophy"></i><span>120</span></div>
        </div>
        <div id="profile-header" class="profile-header">
          <span>${state.user.username}</span>
          <img src="${state.user.avatar}" alt="User Avatar" class="profile-avatar">
        </div>
      </header>

      <button class="btn start-game-btn">شروع بازی</button>

      <nav class="main-nav">
        <button class="nav-button"><i class="icon icon-shop"></i><span>فروشگاه</span></button>
        <button class="nav-button"><i class="icon icon-challenge"></i><span>چالش</span></button>
        <button class="nav-button"><i class="icon icon-history"></i><span>تاریخچه</span></button>
      </nav>
    </div>
  `;
}

function renderAvatarSelection(): string {
  const avatarItems = state.avatars.map(avatar => `
    <div 
      class="avatar-item ${state.user.avatar === avatar ? 'selected' : ''}"
      data-avatar-url="${avatar}"
      style="background-image: url('${avatar}')"
    >
        ${state.user.avatar === avatar ? '<div class="selected-indicator"></div>' : ''}
    </div>
  `).join('');

  return `
    <div class="screen avatar-screen-content">
       <header class="screen-header">
         <button id="back-button" class="back-button"><i class="icon icon-back"></i></button>
         <h2 class="screen-title">انتخاب آواتار</h2>
       </header>
        <div class="avatar-selection-container">
            <div class="avatar-grid">
                ${avatarItems}
            </div>
        </div>
    </div>
  `;
}

// --- MAIN RENDER & EVENT BINDING ---
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  // Screen transition effect
  app.classList.add('fade-out');

  setTimeout(() => {
    app.className = ''; // Reset classes
    let content = '';

    switch (state.currentScreen) {
      case 'SignUp':
        app.classList.add('signup-screen');
        content = renderSignUp();
        break;
      case 'MainMenu':
        app.classList.add('main-menu-screen');
        content = renderMainMenu();
        break;
      case 'AvatarSelection':
        app.classList.add('avatar-screen');
        content = renderAvatarSelection();
        break;
    }
    
    app.innerHTML = content;
    attachEventListeners();
    
    // Add a small delay for the fade-in effect to be noticeable
    requestAnimationFrame(() => {
        app.classList.remove('fade-out');
        app.classList.add('fade-in');
    });

  }, 250); // Match this with CSS transition duration
}

function attachEventListeners() {
  if (state.currentScreen === 'SignUp') {
    document.getElementById('signup-form')?.addEventListener('submit', handleSignUpSubmit);
  } else if (state.currentScreen === 'MainMenu') {
    document.getElementById('profile-header')?.addEventListener('click', handleProfileClick);
  } else if (state.currentScreen === 'AvatarSelection') {
     document.getElementById('back-button')?.addEventListener('click', handleGoBackToMenu);
    document.querySelectorAll('.avatar-item').forEach(item => {
      item.addEventListener('click', () => {
        const url = (item as HTMLElement).dataset.avatarUrl;
        if (url) {
          handleAvatarSelect(url);
        }
      });
    });
  }
}

// --- INITIALIZATION ---
main();

function main() {
  render();
}
