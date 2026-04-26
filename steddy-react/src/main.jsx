import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// #region agent log
fetch('http://127.0.0.1:7254/ingest/482ad01f-2390-43f9-af2f-0562d0ba1ebf',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'685fee'},body:JSON.stringify({sessionId:'685fee',runId:'pre-fix',hypothesisId:'H3',location:'src/main.jsx:6',message:'React entrypoint loaded',data:{pathname:window.location.pathname},timestamp:Date.now()})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
