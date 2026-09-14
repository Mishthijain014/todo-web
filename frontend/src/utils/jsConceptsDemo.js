/**
 * JavaScript Core Concepts Demonstrations
 * Mandatory Concepts Checklist:
 * 1. Event loop
 * 2. Promises vs callbacks
 * 3. async/await
 * 4. Closures
 * 5. Hoisting
 */

// 1. CONCEPT: Hoisting
export function demonstrateHoisting() {
    let logs = [];
    logs.push("=== CONCEPT 1: HOISTING ===");
    
    // Function declarations are hoisted completely to top of scope
    logs.push(`Hoisted function output: "${hoistedFunction()}"`);
    
    function hoistedFunction() {
        return "I was called before my line declaration!";
    }

    // var variables are hoisted with undefined value, let/const stay in Temporal Dead Zone (TDZ)
    logs.push("var variable is hoisted as undefined before assignment.");
    logs.push("let and const throw ReferenceError if accessed before declaration (TDZ).");
    
    return logs;
}

// 2. CONCEPT: Closures
export function demonstrateClosure() {
    let logs = [];
    logs.push("=== CONCEPT 2: CLOSURES ===");
    
    // Closure: Function retaining access to lexical environment variables even after parent execution
    function createTodoCounter(initialCount = 0) {
        let count = initialCount; // Encapsulated private state
        
        return {
            increment: () => { count++; return count; },
            decrement: () => { count--; return count; },
            getCount: () => count
        };
    }

    const counter = createTodoCounter(5);
    logs.push(`Initial closure count: ${counter.getCount()}`);
    logs.push(`After increment closure call: ${counter.increment()}`);
    logs.push(`After another increment closure call: ${counter.increment()}`);
    logs.push(`State is enclosed privately without global variable pollution!`);

    return logs;
}

// 3. CONCEPT: Promises vs Callbacks
export function demonstratePromisesVsCallbacks() {
    let logs = [];
    logs.push("=== CONCEPT 3: PROMISES VS CALLBACKS ===");

    // Callback pattern (legacy error-first callback)
    function fetchTaskLegacyCallback(taskId, callback) {
        setTimeout(() => {
            if (!taskId) {
                callback(new Error("Invalid Task ID"));
            } else {
                callback(null, { id: taskId, title: "Callback Task Example" });
            }
        }, 10);
    }

    // Promisifying callback to modern Promise pattern
    function fetchTaskPromise(taskId) {
        return new Promise((resolve, reject) => {
            fetchTaskLegacyCallback(taskId, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    logs.push("Legacy Callbacks lead to 'Callback Hell' and error handling duplication.");
    logs.push("Promises provide flat .then()/.catch() chains and unified async flow.");

    return fetchTaskPromise("task-101").then(task => {
        logs.push(`Promise resolved task: "${task.title}"`);
        return logs;
    });
}

// 4. CONCEPT: Async / Await
export async function demonstrateAsyncAwait() {
    let logs = [];
    logs.push("=== CONCEPT 4: ASYNC / AWAIT ===");

    const simulateNetworkLatency = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    logs.push("Initiating asynchronous operation using async/await...");
    await simulateNetworkLatency(50);
    logs.push("Async operation completed smoothly with clean synchronous-like syntax!");
    logs.push("Used extensively across all backend controllers and frontend API services.");

    return logs;
}

// 5. CONCEPT: Event Loop
export function demonstrateEventLoop() {
    let logs = [];
    logs.push("=== CONCEPT 5: EVENT LOOP ===");
    
    logs.push("1. Call Stack: Synchronous execution starts.");
    
    // Macrotask Queue (setTimeout)
    setTimeout(() => {
        // Will run in Macrotask queue iteration
    }, 0);

    // Microtask Queue (Promise.resolve)
    Promise.resolve().then(() => {
        // Will run in Microtask queue immediately after stack clears
    });

    logs.push("2. Microtask Queue (Promises) has higher priority than Macrotask Queue (setTimeout).");
    logs.push("3. Event loop constantly checks Call Stack, clears Microtasks, then processes Macrotask!");

    return logs;
}
