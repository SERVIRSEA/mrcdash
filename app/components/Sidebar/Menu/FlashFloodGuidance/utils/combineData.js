const combineData = (data6hrs, data12hrs, data24hrs) => {
    const combined = {};

    // Helper function to insert or update the combined data
    const insertOrUpdate = (data, hours) => {
        data.forEach(item => {
            if (!combined[item.iso]) {
                combined[item.iso] = {};
            }
            combined[item.iso][hours] = item.total_events;
        });
    };

    insertOrUpdate(data6hrs, '6hrs');
    insertOrUpdate(data12hrs, '12hrs');
    insertOrUpdate(data24hrs, '24hrs');

    return combined;
};

export default combineData;