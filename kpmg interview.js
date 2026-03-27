/*
- Authentication and authorization diffrence?
- how to create a optimized react application?
- Memory leakage in react application how can idendify that and fix that?
- what is microcomponent? monolithic application?
- what is high performance computing in browaser and backend side?
- if we ahve a multipe api call how do we handle that its is realted to high computing in the browser side?
- what is offline rendering incase network is not available in frontend side?
- waht is non blocking? if method a,b,c is calling wich one will be executed first?
- what is microservice architecture?
- in the frontend side i am not expose my backend url in the network tab or any other way how to secure my backend url?
- how to secure react application whare the security issues will come from the frontend side?
- what is singleton application?
- if my api endpoint some one will loop and continuose hit the api my cpu usage is high how do we prevent that?
- i am having microservice for example i have add product to the card that is one microservice and have its own db and i will buy click that one is one microservice and own db same until payment and completed and tracking in case of any failuer in teh tracsation how doe cancel the whole transaction?
- what is foriegn key in the database? what is primary key? is that table having multiple primary key? is that table having multiple foriegn key?
- what is indexing and what is the type of indexing?
- what is ACID rule?
- how do you secure app with token where it come from
- how to handle a expancive component in the react application?
*/

// =============================================================================
// REACT & NODE.JS INTERVIEW Q&A — Answers, Examples & How It Works
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Authentication vs Authorization
// -----------------------------------------------------------------------------
/*
ANSWER:
- Authentication = "Who are you?" — Verifying identity (login: username/password, JWT, OAuth).
- Authorization = "What can you do?" — Checking permissions after identity is known (roles, RBAC).

HOW IT WORKS:
  User logs in → Server validates credentials (auth) → Returns token/session
  User requests resource → Server checks token + permissions (authorization) → Allow/Deny

EXAMPLE (Node.js - JWT auth + role-based authorization):
*/
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Authentication required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "Forbidden" });
    next();
  };
// Usage: app.get('/admin', authMiddleware, authorize('admin'), adminHandler);

// -----------------------------------------------------------------------------
// 2. How to create an optimized React application?
// -----------------------------------------------------------------------------
/*
ANSWER:
- Code splitting (React.lazy + Suspense) — load only what’s needed per route.
- Memoization — React.memo, useMemo, useCallback to avoid unnecessary re-renders.
- Virtualization — react-window/react-virtualized for long lists.
- Image optimization — lazy loading, WebP, proper sizes.
- Bundle analysis — reduce bundle size (tree-shaking, dynamic imports).
- Avoid inline objects/functions in JSX when they cause re-renders.

EXAMPLE (React - lazy loading + memo):
*/
// const HeavyChart = React.lazy(() => import('./HeavyChart'));
// function App() {
//   return (
//     <Suspense fallback={<Spinner />}>
//       <HeavyChart />
//     </Suspense>
//   );
// }
// const ExpensiveRow = React.memo(({ item }) => <tr>...</tr>);
// const Parent = () => {
//   const [count, setCount] = useState(0);
//   const handleClick = useCallback(() => setCount(c => c + 1), []);
//   const config = useMemo(() => ({ theme: 'dark' }), []);
//   return <ExpensiveRow onClick={handleClick} config={config} />;
// };

// -----------------------------------------------------------------------------
// 3. Memory leakage in React — how to identify and fix?
// -----------------------------------------------------------------------------
/*
ANSWER:
- Causes: Subscriptions (WebSocket, setInterval), listeners, or state updates after unmount.
- Identify: Chrome DevTools → Memory → take heap snapshots before/after navigating away; look for detached DOM or growing listener counts.
- Fix: Clean up in useEffect return (clearInterval, unsubscribe, abort controller).

HOW IT WORKS:
  Component mounts → subscribe/listen → component unmounts but subscription still runs → updates state on unmounted component → leak.

EXAMPLE (React - preventing leak with cleanup):
*/
// function useSubscription(url) {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     let cancelled = false;
//     const sub = subscribe(url, (payload) => {
//       if (!cancelled) setData(payload);
//     });
//     return () => { cancelled = true; sub.unsubscribe(); };
//   }, [url]);
//   return data;
// }

// -----------------------------------------------------------------------------
// 4. Micro-frontend vs Monolithic application
// -----------------------------------------------------------------------------
/*
ANSWER:
- Monolithic: One codebase, one deployable app (e.g. single React SPA). Simple but scales poorly for large teams.
- Micro-frontend: App split into smaller “micro” apps (e.g. cart, checkout, products), each owned by a team, composed at runtime (iframe, Module Federation, single-spa).

HOW IT WORKS:
  Shell app loads → fetches/loads micro-apps (scripts) → each micro-app renders in its container; teams deploy independently.

EXAMPLE (concept - Module Federation in Webpack):
*/
// Host app: remotes: { cartApp: 'cartApp@https://cdn.example.com/cart/remoteEntry.js' }
// Cart app: exposes: { './Cart': './src/Cart' }
// Host: const Cart = React.lazy(() => import('cartApp/Cart'));

// -----------------------------------------------------------------------------
// 5. What is high performance computing in browser and backend side?
// -----------------------------------------------------------------------------
/*
ANSWER:
- HPC = Using many CPUs/cores, GPUs, or clusters to solve compute-heavy tasks (simulations, ML, big data) in parallel.

BROWSER SIDE:
- Main thread must stay responsive (UI, input). Heavy work blocks it → use Web Workers (separate thread), WebAssembly (faster execution), or GPU via WebGL/WebGPU.
- Avoid long loops on main thread; offload number crunching, parsing, or crypto to a Worker.

BACKEND SIDE:
- Use multiple CPU cores (Node: cluster module, worker_threads; or multiple processes behind a load balancer).
- Use queues (Bull, RabbitMQ) to distribute jobs across workers; use caching (Redis) to reduce repeated work.
- For very heavy compute: dedicated HPC clusters, GPU servers, or serverless functions that scale out.

HOW IT WORKS:
  Browser: Heavy task runs in Worker → result sent via postMessage → main thread stays free. Backend: Master process spawns workers → distributes requests/jobs → each worker uses one core.

EXAMPLE (browser - Web Worker):
*/
// main.js
// const worker = new Worker('./heavyTask.js');
// worker.postMessage({ data: largeArray });
// worker.onmessage = (e) => console.log('Result:', e.data);
// heavyTask.js (runs in separate thread)
// self.onmessage = (e) => { const result = e.data.data.map(x => expensiveCalc(x)); self.postMessage(result); };

// EXAMPLE (backend - Node cluster for multi-core):
// const cluster = require('cluster');
// if (cluster.isPrimary) { for (let i = 0; i < require('os').cpus().length; i++) cluster.fork(); }
// else { require('http').createServer((req, res) => { /* handle request */ }).listen(3000); }

// -----------------------------------------------------------------------------
// 6. Multiple API calls — handling (browser / high compute)
// -----------------------------------------------------------------------------
/*
ANSWER:
- Sequential: await one by one (when order matters).
- Parallel: Promise.all([fetch(a), fetch(b)]) when independent — faster.
- Limit concurrency: p-limit, or batch requests to avoid overwhelming server/browser.

HOW IT WORKS:
  Browser has limited connections per origin; too many parallel calls can queue. Batching + limited concurrency keeps CPU/network sane.

EXAMPLE (Node/React - parallel vs sequential):
*/
async function fetchAllParallel(urls) {
  const results = await Promise.all(
    urls.map((url) => fetch(url).then((r) => r.json())),
  );
  return results;
}
async function fetchSequential(urls) {
  const results = [];
  for (const url of urls) {
    const res = await fetch(url);
    results.push(await res.json());
  }
  return results;
}

// -----------------------------------------------------------------------------
// 7. What is offline rendering in case network is not available in frontend side?
// -----------------------------------------------------------------------------
/*
ANSWER:
- When the network is not available, the frontend can still show UI and work by using cached assets and data — that’s “offline” rendering: rendering from cache instead of from the network.
- Key pieces: Service Worker (caches HTML, JS, CSS, API responses), Cache API / IndexedDB for data, and an offline-first strategy so the app works without connectivity.

HOW IT WORKS:
  On first visit: Service Worker registers → caches static assets (and optionally API responses). When network is off (or slow): fetch events are handled by the Service Worker → it serves from cache, so the app can render the same UI using cached HTML/JS/data. For dynamic data you can queue writes and sync when back online.

EXAMPLE (Service Worker - cache-first for offline):
*/
// In sw.js (Service Worker):
// self.addEventListener('install', (e) => {
//   e.waitUntil(caches.open('v1').then(cache => cache.addAll(['/', '/index.html', '/main.js', '/style.css'])));
// });
// self.addEventListener('fetch', (e) => {
//   e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
// });
// In React app: register the service worker in index.js; use Cache API or IndexedDB (e.g. idb) to cache API responses so lists/data render when offline.

// -----------------------------------------------------------------------------
// 8. What is non-blocking? If methods A, B, C are called, which runs first?
// -----------------------------------------------------------------------------
/*
ANSWER:
- Blocking: Code runs until done; nothing else runs (e.g. sync file read).
- Non-blocking: Start operation, don’t wait; run other code; get result later via callback/promise (e.g. async I/O in Node).

Execution order with async:
  A, B, C started in order (e.g. setTimeout 0, or three async calls). Whichever completes first finishes first; order of completion is not guaranteed unless you chain (e.g. await A then B then C).

EXAMPLE (Node - non-blocking):
*/
const fs = require("fs");
// Blocking (bad): const data = fs.readFileSync('file.txt');
// Non-blocking (good):
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log("A done", data.length);
});
setImmediate(() => console.log("B"));
setTimeout(() => console.log("C"), 0);
// Typical output order: B or C first, then A (A waits for disk I/O).

// -----------------------------------------------------------------------------
// 9. Microservice architecture
// -----------------------------------------------------------------------------
/*
ANSWER:
- App is split into small services; each has its own process, often its own DB. Services communicate via HTTP/gRPC/message queues.
- Benefits: Independent deploy, scale, and tech stack per service. Drawbacks: distributed complexity, eventual consistency, tracing.

EXAMPLE (Node - simple service calling another):
*/
// Service Cart: POST /cart/items → saves to Cart DB
// Service Order: POST /orders → calls Cart API to get items, then Payment API, then saves Order DB
// const cartRes = await fetch('http://cart-service/cart/items');
// const order = await createOrder(await cartRes.json());

// -----------------------------------------------------------------------------
// 10. Not exposing backend URL in frontend / securing backend URL
// -----------------------------------------------------------------------------
/*
ANSWER:
- Frontend always “exposes” the URL it calls (Network tab). Goal is to protect the backend, not hide the URL.
- Use: (1) Backend behind your own API (same-origin or proxy so frontend calls /api, not third-party URL). (2) Auth (JWT, cookies). (3) Rate limiting, CORS. (4) Sensitive operations only on server; never put API keys in frontend for that backend.

HOW IT WORKS:
  Browser calls your domain (e.g. /api/orders). Your server or BFF proxies/forwards to real backend (server-side); API key stays on server.

EXAMPLE (Next.js API route as proxy — backend URL never in client):
*/
// pages/api/orders.js (server only)
// export default async function handler(req, res) {
//   const response = await fetch(process.env.INTERNAL_API_URL + '/orders', {
//     headers: { 'X-API-Key': process.env.API_KEY },
//   });
//   const data = await response.json();
//   res.json(data);
// }
// Frontend: fetch('/api/orders')  // only your domain seen in Network tab

// -----------------------------------------------------------------------------
// 11. Securing React app — frontend security issues
// -----------------------------------------------------------------------------
/*
ANSWER:
- XSS: Never render raw user input; use React’s default escaping; avoid dangerouslySetInnerHTML with user data.
- Sensitive data: Don’t store tokens in localStorage if you need strong XSS protection (consider httpOnly cookies).
- Dependency audit: npm audit, lockfiles.
- HTTPS, secure headers (CSP, X-Frame-Options), env vars for config (not secrets in client bundle).

EXAMPLE (safe rendering):
*/
// BAD: <div dangerouslySetInnerHTML={{ __html: userInput }} />
// GOOD: <div>{userInput}</div>  // React escapes by default
// For trusted HTML: sanitize first (e.g. DOMPurify) then dangerouslySetInnerHTML if needed.

// -----------------------------------------------------------------------------
// 12. Singleton (application / pattern)
// -----------------------------------------------------------------------------
/*
ANSWER:
- Singleton = One instance of a class (or one connection, one config) shared across the app.
- In Node: single process, so one require('db') is one instance. Useful for DB connection pool.

EXAMPLE (Node - singleton DB connection):
*/
let dbInstance = null;
function getDb() {
  if (!dbInstance) {
    dbInstance = require("mongodb").MongoClient.connect(process.env.MONGO_URI);
  }
  return dbInstance;
}

// -----------------------------------------------------------------------------
// 13. API endpoint hit in a loop — CPU high — how to prevent?
// -----------------------------------------------------------------------------
/*
ANSWER:
- Rate limiting: Limit requests per IP/user per window (e.g. 100/min). Use express-rate-limit, Redis for distributed.
- Throttling: Reject or queue excess requests.
- Auth + quotas: Require API key and enforce per-key limits.
- Identify abuse: Block or cap by IP/user after threshold.

HOW IT WORKS:
  Middleware counts requests per key; when count > limit, return 429 and optionally delay or block.

EXAMPLE (Node - rate limiting):
*/
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: "Too many requests" },
});
// app.use('/api/', limiter);

// -----------------------------------------------------------------------------
// 14. Microservices: Add to cart → Buy → Payment → Complete → Tracking — failure and cancelling whole transaction
// -----------------------------------------------------------------------------
/*
ANSWER:
- Problem: Each service has its own DB; no single DB transaction across services.
- Patterns: (1) Saga — orchestration or choreography: each step has a compensating action (e.g. “cancel reservation”, “refund”). On failure, run compensations in reverse order. (2) Outbox + idempotency for reliability.

HOW IT WORKS:
  Order Saga: Reserve inventory → Create order → Charge payment → Update tracking. If “Charge payment” fails → compensate: release inventory, cancel order, then return error.

EXAMPLE (saga concept — compensating actions):
*/
async function orderSaga(cartId, paymentDetails) {
  let orderId, reserved;
  try {
    const items = await cartService.getItems(cartId);
    await inventoryService.reserve(items);
    reserved = true;
    orderId = await orderService.create(items);
    await paymentService.charge(paymentDetails, orderId);
    await trackingService.create(orderId);
    return { orderId };
  } catch (err) {
    if (reserved) await inventoryService.release(items);
    if (orderId) await orderService.cancel(orderId);
    throw err;
  }
}

// -----------------------------------------------------------------------------
// 15. Foreign key, Primary key — can a table have multiple?
// -----------------------------------------------------------------------------
/*
ANSWER:
- Primary key (PK): Uniquely identifies a row (one per table in standard SQL). One table can have one primary key; that key can be composite (multiple columns together).
- Foreign key (FK): Column(s) referencing another table’s PK. A table can have many FKs (e.g. order has user_id FK, product_id FK).

EXAMPLE (SQL):
*/
// CREATE TABLE users ( id INT PRIMARY KEY, name VARCHAR(100) );
// CREATE TABLE orders (
//   id INT PRIMARY KEY,
//   user_id INT REFERENCES users(id),   -- one FK
//   product_id INT REFERENCES products(id),  -- another FK
//   UNIQUE(order_id, product_id)  -- composite unique, not “multiple PKs”
// );

// -----------------------------------------------------------------------------
// 16. Indexing and types of indexing
// -----------------------------------------------------------------------------
/*
ANSWER:
- Index = Data structure (often B-tree) that speeds up WHERE, JOIN, ORDER BY on indexed columns; adds write cost and storage.
- Types: (1) B-tree (default in most DBs). (2) Hash (equality only). (3) GIN/GiST (e.g. full-text, JSON, arrays). (4) Composite index (multiple columns). (5) Unique index (enforces uniqueness).

HOW IT WORKS:
  Without index: full table scan. With index: DB finds matching rows via index structure, then fetches rows.

EXAMPLE (SQL):
*/
// CREATE INDEX idx_orders_user ON orders(user_id);
// CREATE UNIQUE INDEX idx_users_email ON users(email);
// CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

// -----------------------------------------------------------------------------
// 17. What is ACID rule?
// -----------------------------------------------------------------------------
/*
ANSWER:
- ACID = Properties of a reliable database transaction.
  - Atomicity: All or nothing (rollback on failure).
  - Consistency: Data stays in valid state (constraints hold).
  - Isolation: Concurrent transactions don’t see each other’s partial state.
  - Durability: Committed data survives crashes (persisted to disk).

HOW IT WORKS:
  BEGIN → UPDATE/INSERT/DELETE → COMMIT (or ROLLBACK on error). DB ensures all four properties (via WAL, locking, etc.).

EXAMPLE (Node + SQL transaction):
*/
// const trx = await db.transaction();
// try {
//   await trx('orders').insert({ user_id: 1, total: 99 });
//   await trx('inventory').where({ id: 1 }).decrement('stock', 1);
//   await trx.commit();
// } catch (e) {
//   await trx.rollback();
// }

// -----------------------------------------------------------------------------
// 18. How do you secure app with token? Where does the token come from?
// -----------------------------------------------------------------------------
/*
ANSWER:
- You secure the app by sending a token (e.g. JWT or session token) with every request that needs auth. The server validates the token and only then allows access.
- Where the token comes from:
  (1) Login: User sends credentials (email/password) → server verifies → server creates a token (JWT or session ID) → server returns it in response body (or Set-Cookie for httpOnly cookie).
  (2) Client stores it: Frontend saves the token (e.g. in memory, localStorage, or receives httpOnly cookie).
  (3) Subsequent requests: Client sends the token (e.g. Authorization: Bearer <token> or Cookie) → server validates token → allows or denies.

HOW IT WORKS:
  Login (POST /login) → Server checks DB → If valid, generates JWT (signed with secret) or creates session in DB/Redis → Returns token.
  API request (e.g. GET /api/orders) → Client adds header Authorization: Bearer <token> → Server middleware verifies signature (JWT) or looks up session → Attaches user to req → Handler runs. If invalid/expired → 401.

EXAMPLE (Node.js — where token comes from + how you secure routes with it):
*/
// ----- Where the token COMES FROM (login endpoint) -----
// POST /api/login
async function login(req, res) {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  // Server CREATES the token here (e.g. JWT)
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.json({ token, user: { id: user.id, email: user.email } });
}

// ----- How you SECURE the app WITH the token (middleware) -----
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Token required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email } — use in routes
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
// app.get('/api/orders', authMiddleware, (req, res) => { ... });  // only allowed with valid token

// ----- Frontend: where client gets and sends the token -----
// 1. On login: token comes FROM the server response
// const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
// const { token } = await res.json();
// 2. Store it (e.g. in memory or localStorage — httpOnly cookie is alternative)
// localStorage.setItem('token', token);   // or useState in React
// 3. Send it with every secured request (token goes TO the server)
// fetch('/api/orders', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

// -----------------------------------------------------------------------------
// 19. How to handle an expensive component in the React application?
// -----------------------------------------------------------------------------
/*
ANSWER:
- Lazy load it: Load the component only when needed (e.g. when route is visited or when user opens a tab) using React.lazy() + Suspense, so the initial bundle stays small and the main thread isn’t blocked by heavy JS on first load.
- Memoize it: Use React.memo() so the component re-renders only when its props change; use useMemo/useCallback for expensive computations and stable callbacks so children don’t re-render unnecessarily.
- Defer or offload work: Use useDeferredValue/useTransition (React 18+) to keep the UI responsive while the expensive component updates; for CPU-heavy logic, move it to a Web Worker so the main thread doesn’t freeze.
- Virtualize lists: If the “expensive” part is rendering many items (e.g. a big list or table), use virtualization (react-window, react-virtualized) so only visible rows are in the DOM.

HOW IT WORKS:
  Lazy: The expensive component is in a separate chunk; when you navigate or show it, the chunk loads and React renders it inside Suspense (fallback shows until ready). Memo: React skips re-rendering the component if props are referentially equal. useDeferredValue/useTransition: React can interrupt rendering and show fallback first, then update the heavy part. Virtualization: Only N items are mounted; as you scroll, items are mounted/unmounted so DOM stays small.

EXAMPLE (React — lazy load + memo + useMemo for expensive component):
*/
// ----- 1. Lazy load: load heavy component only when needed -----
// const ExpensiveChart = React.lazy(() => import('./ExpensiveChart'));
// function Dashboard() {
//   return (
//     <Suspense fallback={<div>Loading chart...</div>}>
//       <ExpensiveChart data={data} />
//     </Suspense>
//   );
// }

// ----- 2. Memoize component so it re-renders only when props change -----
// const ExpensiveList = React.memo(function ExpensiveList({ items, onSelect }) {
//   return items.map(item => <Row key={item.id} item={item} onSelect={onSelect} />);
// });

// ----- 3. useMemo for expensive computation inside component -----
// function ExpensiveComponent({ rawData }) {
//   const processedData = useMemo(() => {
//     return rawData.map(expensiveTransform).sort(byDate);  // only runs when rawData changes
//   }, [rawData]);
//   return <Chart data={processedData} />;
// }

// ----- 4. useCallback so parent doesn’t pass new function every render (avoids breaking memo) -----
// const Parent = () => {
//   const [count, setCount] = useState(0);
//   const handleSelect = useCallback((id) => { /* ... */ }, []);
//   return <ExpensiveList items={items} onSelect={handleSelect} />;
// };

// ----- 5. Virtualization for long lists (only visible rows rendered) -----
// import { FixedSizeList } from 'react-window';
// function BigList({ items }) {
//   return (
//     <FixedSizeList height={400} itemCount={items.length} itemSize={50}>
//       {({ index, style }) => <div style={style}>{items[index].name}</div>}
//     </FixedSizeList>
//   );
// }
