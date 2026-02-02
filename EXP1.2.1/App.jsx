const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [text, setText] = useState('');
  const [words, setWords] = useState(0);
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef();
  const startTimeRef = useRef();
  const animationRef = useRef();

  const limit = 100;

  const updateMetrics = useCallback(() => {
    const count = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    setWords(wordCount);
    document.getElementById('count').textContent = `${count} / ${limit}`;
    document.getElementById('percent').textContent = `${Math.round((count/limit)*100)}%`;
    document.getElementById('words').textContent = wordCount;
    
    // Dynamic styling
    const root = document.documentElement;
    const progress = (count / limit) * 100;
    
    if (count >= limit) {
      root.style.setProperty('--primary-color', '#ff4d4f');
      document.getElementById('status').textContent = 'Limit reached';
    } else if (count > limit * 0.8) {
      root.style.setProperty('--primary-color', '#faad14');
      document.getElementById('status').textContent = 'Almost there';
    } else {
      root.style.setProperty('--primary-color', '#40a9ff');
      document.getElementById('status').textContent = 'Ready';
    }
    
    document.getElementById('progress').style.width = `${progress}%`;
    
    // Particles effect
    if (count > 0 && count % 10 === 0) createParticles(count);
  }, [text]);

  const createParticles = (count) => {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random()*100}%`;
      particle.style.animationDelay = `${Math.random()*0.5}s`;
      particle.textContent = count;
      particles.appendChild(particle);
      
      setTimeout(() => particle.remove(), 2000);
    }
  };

  useEffect(() => {
    updateMetrics();
  }, [text, updateMetrics]);

  const handleInput = useCallback((e) => {
    const value = e.target.value.slice(0, limit);
    setText(value);
    
    if (!isTyping) {
      setIsTyping(true);
      startTimeRef.current = Date.now();
    }
  }, [isTyping]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping && startTimeRef.current) {
        setTime(Math.round((Date.now() - startTimeRef.current) / 1000));
        document.getElementById('time').textContent = Math.round((Date.now() - startTimeRef.current) / 1000);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isTyping]);

  return React.createElement('div', { className: 'app-wrapper' }, [
    React.createElement('div', { key: 'header', className: 'header' }, [
      React.createElement('i', { className: 'fas fa-font' }),
      React.createElement('h1', null, 'Live Character Counter'),
      React.createElement('div', { id: 'status', className: 'status' }, 'Ready')
    ]),
    React.createElement('div', { key: 'input', className: 'input-container' }, [
      React.createElement('textarea', {
        ref: textareaRef,
        rows: 6,
        placeholder: 'Craft your masterpiece... (100 chars max)',
        value: text,
        onInput: handleInput,
        id: 'text'
      }),
      React.createElement('div', { id: 'count', className: 'char-limit' }, '0 / 100')
    ]),
    React.createElement('div', { key: 'metrics', className: 'metrics' }, [
      React.createElement('div', { className: 'metric' }, [
        React.createElement('i', { className: 'fas fa-hashtag' }),
        React.createElement('span', { id: 'words' }, '0'),
        ' words'
      ]),
      React.createElement('div', { className: 'metric' }, [
        React.createElement('i', { className: 'fas fa-clock' }),
        React.createElement('span', { id: 'time' }, '0'),
        's typing'
      ])
    ]),
    React.createElement('div', { key: 'progress', className: 'progress-container' }, [
      React.createElement('div', { className: 'progress-label' }, [
        React.createElement('span', null, 'Progress'),
        React.createElement('span', { id: 'percent' }, '0%')
      ]),
      React.createElement('div', { className: 'progress-bar' }, 
        React.createElement('div', { id: 'progress', className: 'progress' })
      )
    ]),
    React.createElement('div', { key: 'particles', id: 'particles', className: 'particles' })
  ]);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));

