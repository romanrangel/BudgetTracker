const request = window.indexedDB.open("budget_tracker", 1);

request.onupgradeneeded = event => {
    const db = event.target.result;

    // Creates an object store with a listID keypath that can be used to query on.
    const budget_trackerStore = db.createObjectStore("budget_tracker", {keyPath: "id"});
    // Creates a statusIndex that we can query on.
    budget_trackerStore.createIndex("statusIndex", "status");
} 
request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction(["budget_tracker"], "readwrite");
    const budget_trackerStore = transaction.objectStore("budget_tracker");
    const statusIndex = budget_trackerStore.index("statusIndex");

    // Adds data to our objectStore
    budget_trackerStore.add({listID: "1", status: "pending"});

    // Return an item by keyPath
    const getRequest = budget_trackerStore.get("1");
    getRequest.onsuccess = () => {
        console.log(getRequest.result);
    };

    // Return an item by index
    const getRequestIdx = statusIndex.getAll("complete");
    getRequestIdx.onsuccess = () => {
        console.log(getRequestIdx.result);
    };
};