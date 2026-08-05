const fs = require('fs');
const file = 'src/routes/_authenticated/profile.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `      setLoading(false);
    }
    load();
  }, [user.id]);`;

const replacement = `      setLoading(false);
      
      // Handle hash scrolling for deep linking
      setTimeout(() => {
        if (window.location.hash) {
          const id = window.location.hash.substring(1);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
    load();
  }, [user.id]);`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log('Injected scroll logic');
