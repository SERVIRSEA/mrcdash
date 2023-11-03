const countRecordsPerISO = (dataArray, hrs) => {
    const counts = {};
  
    dataArray.forEach(item => {
        if (!counts[item.ISO]) {
            counts[item.ISO] = 0;
        }
        counts[item.ISO]++;
    });
  
    const results = [];
    for (let iso in counts) {
        results.push({
            iso: iso,
            hours: hrs,
            total_events: counts[iso]
        });
    }
    return results;
};

export default countRecordsPerISO;