function createMap(lists,start) {
  const map = new Map();
  for(var i = 0;i<lists.length;i++){
    // Logger.log(lists[i]+":"+start);
    map.set(lists[i], start);
    start++;
  }
  return map;
}
