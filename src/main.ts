import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

function renderUnifiedZenPage() {
  // Remove all scroll-related code and keep only this
  document.documentElement.scrollTop = 0;
  
  app.innerHTML = `
    <section class="zen-hero-section" tabindex="0">
      <div class="zen-logo-pro" aria-label="Written Pro Logo">
        <span class="zen-logo-text">written</span>
      </div>
      <div class="zen-hero-desc">
        you and your words
      </div>
      <div class="zen-features">
        <span class="feature-text">distraction-free editor</span>
        <span class="feature-text">auto-save</span>
        <span class="feature-text">easy export options</span>
      </div>
      <footer class="zen-footer">
        created by <a href="https://khaeld.netlify.app" target="_blank">khaled eldahshan</a> | 
        <a href="https://x.com/khaeld90s" target="_blank" aria-label="x profile" class="footer-icon-link">
          <svg class="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </a>
        <span class="copyright">© ${new Date().getFullYear()} Written. All rights reserved.</span>
      </footer>
    </section>
    <section class="zen-editor-section">
      <div class="zen-export-area">
        <div class="zen-export-main">export</div>
        <div class="zen-export-options">
          <button class="zen-export-btn" id="export-txt">txt</button>
          <button class="zen-export-btn" id="export-pdf">pdf</button>
        </div>
      </div>
      <textarea id="editor" placeholder="start writing..."></textarea>
    </section>
  `;
  // Add click handler
  document.querySelector('.zen-export-main')?.addEventListener('click', () => {
    document.querySelector('.zen-export-options')?.classList.toggle('show');
  });
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  if (editor) {
    editor.value = localStorage.getItem('written-note') || '';
    editor.addEventListener('input', () => {
      localStorage.setItem('written-note', editor.value);
    });
    document.getElementById('export-txt')?.addEventListener('click', () => {
      const blob = new Blob([editor.value], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'note.txt';
      a.click();
      URL.revokeObjectURL(url);
    });
    document.getElementById('export-pdf')?.addEventListener('click', () => {
      const win = window.open('', '', 'width=800,height=600');
      if (win) {
        win.document.write('<pre>' + editor.value.replace(/</g, '&lt;') + '</pre>');
        win.print();
        win.close();
      }
    });
  }
  
  // Ensure page starts at hero section
  window.scrollTo(0, 0);
  history.scrollRestoration = 'manual';
  // Prevent scroll jump on load
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });
  // Force scroll to top on initial load
  document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
  });

  // Remove the IntersectionObserver completely
  // Focus editor only when explicitly clicked/tapped
  if (editor) {
    editor.addEventListener('click', () => {
      editor.focus();
    });
  }

  // Add smooth scroll behavior to the body
  document.body.style.scrollBehavior = 'smooth';

  // Ensure page starts at hero section
  window.scrollTo(0, 0);
  history.scrollRestoration = 'manual';
  // Prevent scroll jump on load
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });
  // Force scroll to top on initial load
  document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
  });

  // Focus editor when it becomes visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.id === 'editor') {
        (entry.target as HTMLTextAreaElement).focus();
      }
    });
  });
  
  if (editor) {
    observer.observe(editor);
  }
  
  // Add this after editor setup
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    document.querySelector('.zen-hero-section')?.scrollIntoView();
  }, 50);

  // Release scroll lock after render completes
  setTimeout(() => {
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  }, 100);

  // Simple click focus for editor
  // Remove the duplicate editor declaration below
  // Keep only the first declaration at line 40
  if (editor) {
    editor.addEventListener('click', () => editor.focus());
  }
}

renderUnifiedZenPage();

window.addEventListener('hashchange', () => {
  renderUnifiedZenPage();
});
